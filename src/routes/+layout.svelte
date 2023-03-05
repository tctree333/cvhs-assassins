<script lang="ts">
	import './app.css';
</script>

<div class="wrapper">
	<div class="bar" />
	<slot />
</div>
<footer>CVHS Senior Assassins 2023</footer>

<style>
	footer {
		display: grid;
		place-items: center;
		background-color: #365314;
		color: #f5f5f4;
		padding: 64px;
		font-size: 1.1rem;
	}
	div.bar {
		height: 12px;
		background: linear-gradient(
			90deg,
			#065403,
			#316200,
			#516f00,
			#707c00,
			#908809,
			#b1941a,
			#d39e2d,
			#f5a841
		);
	}
	div.wrapper {
		min-height: 100vh;
		padding: 0;
	}
</style>
