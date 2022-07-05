import {BlobServiceClient} from '@azure/storage-blob';

const url = 'https://www.googletagmanager.com/gtag/js?id=123';
const connectionString = process.env.AZ_CONNECTION_STRING;
const userAgents = [
	{
		name: 'chrome-windows',
		userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36'
	},
	{
		name: 'firefox-windows',
		userAgent: 'Mozilla/5.0 (Windows NT 5.1; rv:7.0.1) Gecko/20100101 Firefox/7.0.1'
	},
	{
		name: 'edge-windows',
		userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36 Edge/15.15063'
	},
	{
		name: 'safari-osx',
		userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7'
	},
	{
		name: 'safari-ios',
		userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1'
	},
	{
		name: 'android-browser',
		userAgent: 'Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SCH-I535 Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30'
	}
];

export async function get(event) {
	const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

	const containerClient = blobServiceClient.getContainerClient('gtags');
	await containerClient.createIfNotExists();

	const time = Date.now();
	for (const userAgent of userAgents) {
		const headers = new Headers({
			'Accept': 'application/javascript',
			'Content-Type': 'application/javascript',
			'User-Agent': userAgent.userAgent,
		});

		const response = await fetch(url, {
			method : 'GET',
			headers
		});
		const body = await response.text()
		const blobClient = containerClient.getBlockBlobClient(time + '/' + userAgent.name + '.js');
		await blobClient.upload(body, body.length);
	}

	return { body: { time } }
}