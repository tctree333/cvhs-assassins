<script lang="ts">
	import './app.css';
</script>

<div class="wrapper">
	<slot />
</div>
<footer>CVHS Senior Assassins 2023</footer>

<style>
	footer {
		display: grid;
		place-items: center;
		background-color: #292524;
		color: #f5f5f4;
		padding: 64px;
		font-size: 1.1rem;
	}
	div.wrapper {
		min-height: 100vh;
		padding: 1px 0;
	}
</style>
