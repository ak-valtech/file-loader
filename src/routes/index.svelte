<script>
	import {onMount} from 'svelte';

	let records = [];

	onMount(async () => {
		records = await (await fetch('/api/get-files')).json();
	});
</script>

<h1>File Comparison</h1>

<div>
	<ul>
		{#each records as record}
			<li>
				<a href={`https://akvaltech.blob.core.windows.net/gtags/${record.name}`}>
				   {record.userAgent}
				</a>
				<span>
					{new Date(parseInt(record.time)).toUTCString()}
				</span>
				<span>
					{record.size}
				</span>
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
		display: flex;
		justify-content: space-between;
		padding: 0.15rem 0.5rem;
	}

	li:nth-child(odd) {
		background: lightgrey;
	}

	a {
		width: 50%;
	}
</style>