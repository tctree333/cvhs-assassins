<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<Head title="Login | CVHS Senior Assassins" />

<main class="main">
	<div>
		<img src="/logo.png" alt="CVHS Senior Assassins Logo" />
	</div>
	<h1>CVHS Senior Assassins Login</h1>
	<form method="post">
		<label>
			User ID: <input type="text" name="user" required />
		</label>
		<label>
			Password: <input type="password" name="password" required />
		</label>
		<button class="btn" type="submit">Login</button>
	</form>
	{#if form?.errorMessage}
		<p class="error"><strong>Error:</strong> {form.errorMessage}</p>
	{/if}
</main>

<style>
	main.main {
		max-width: 540px;
	}
	div {
		display: flex;
		justify-content: center;
	}
	img {
		height: 96px;
		margin: 32px 0;
	}
	h1 {
		margin-bottom: 32px;
	}
	input {
		display: block;
		font-size: 1rem;

		color: inherit;
		background-color: transparent;

		border: 2px solid #57534e;
		border-radius: 4px;
		margin-top: 6px;
		padding: 8px 16px;

		width: 100%;
	}
	label {
		display: block;
	}
	form * + * {
		margin-top: 24px;
	}

	.error {
		background-color: #fecaca;
		color: #991b1b;
		border: 2px solid #991b1b;
		border-radius: 4px;

		padding: 8px 16px;
		margin-top: 32px;
	}
</style>
