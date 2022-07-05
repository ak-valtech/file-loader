import {BlobServiceClient} from '@azure/storage-blob';

const connectionString = process.env.AZ_CONNECTION_STRING;

export async function get(event) {
	const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

	const containerClient = blobServiceClient.getContainerClient('gtags');

	const result = []
	for await (const blob of containerClient.listBlobsFlat()) {
		if (blob.properties.contentLength)
			result.push({ name: blob.name, userAgent: blob.name.split('.')[0].split('/')[1], time: blob.name.split('.')[0].split('/')[0], size: blob.properties.contentLength });
	}
	return { body: result }
}