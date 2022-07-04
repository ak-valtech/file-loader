<script>
	const records = [
		{
			time: new Date(),
			files: [
				{ name: 'test', agent: '', size: 12312, href: '' },
				{ name: 'test', agent: '', size: 12312, href: '' },
				{ name: 'test', agent: '', size: 12312, href: '' },
				{ name: 'test', agent: '', size: 12312, href: '' },
			]
		},
		{
			time: new Date(),
			files: [
				{ name: 'test', agent: '', size: 12312, href: '' },
				{ name: 'test', agent: '', size: 12312, href: '' },
				{ name: 'test', agent: '', size: 12312, href: '' },
				{ name: 'test', agent: '', size: 12312, href: '' },
			]
		}
	]
</script>

<h1>File Comparison</h1>

<div>
	<ul>
		{#each records as record}
		<li>
			<h4>{record.time}</h4>
			{#each record.files as file}
				<div class="agent-file">
					<a href={file.href}>{file.name}</a>
					<span>{file.size}B</span>
				</div>
			{/each}
		</li>
		{/each}
	</ul>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}

	h1 {
		background: black;
		color: white;
		margin: 0;
		padding: 0.5rem;
	}

	h4 {
		background: black;
		color: white;
		margin: 0;
		padding: 0.5rem;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0 2rem;
	}

	li {
		border: 1px solid black;
		margin-top: 1rem;
	}

	.agent-file {
		display: flex;
		justify-content: space-between;
		padding: 0.15rem 0.5rem;
	}

	.agent-file:nth-child(odd) {
		background: lightgrey;
	}
</style>