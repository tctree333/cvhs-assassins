<script lang="ts">
	import type { PageData } from './$types';
	import Head from '$lib/components/Head.svelte';

	export let data: PageData;
</script>

<Head title="Dashboard | CVHS Senior Assassins" />

<main class="main">
	<header>
		<img src="/logo.png" alt="CVHS Senior Assassins Logo" />
		<a class="btn" href="/logout">Log Out</a>
	</header>
	<h1>Welcome {data.name}!</h1>
	<p>
		Today is {new Date().toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})}. You are on team {data.team}.
	</p>
	<p class="reminders"><strong>Reminders:</strong></p>
	<ul>
		<li>Only use non-battery powered Nerf style guns that fire foam darts with rubber tips.</li>
		<li>
			No assassinations on school grounds, during school events, at the target's workplace/volunteer
			place, in public places of worship, or from moving vehicles.
		</li>
		<li>Do not break into your target's home.</li>
		<li>
			If you legally assassinate someone, <a href="https://forms.gle/KhuwhD45D7xTqeYG6"
				>report it here</a
			>!
		</li>
		<li>
			If you were legally assassinated, <a href="https://forms.gle/PnGuqieJ4qGSWiMs6"
				>report it here</a
			>!
		</li>
		<li>
			Both the assassin and the killer must confirm the assasination. Evidence must include both
			people.
		</li>
		<li>Have fun!</li>
	</ul>

	{#if data.advancing}
		<h2 class="advancing">You are advancing to the next round!</h2>
	{/if}

	{#if data.eliminated}
		<h2 class="removed">You have been eliminated! 💀</h2>
	{:else if data.disqualified}
		<h2 class="removed">You have been disqualified!</h2>
	{:else}
		<h2>Target: {data.targetTeam}</h2>
		<ul class="targets">
			{#each data.targets as target}
				<li class:removed={target.eliminated || target.disqualified}>
					<span>{target.name}:</span>
					{target.eliminated ? 'Eliminated 💀' : target.disqualified ? 'Disqualified' : 'Alive'}
				</li>
			{/each}
		</ul>
	{/if}
</main>

<style>
	img {
		height: 84px;
		/* margin-bottom: 32px; */
	}
	header {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 36px;
		gap: 16px;
	}
	h2 {
		margin-top: 32px;
		margin-bottom: 12px;
	}
	p {
		margin-top: 16px;
		margin-bottom: 4px;
	}
	ul li + li {
		margin-top: 8px;
	}
	strong {
		font-weight: 600;
	}
	ul.targets {
		list-style: none;
		padding: 0;
	}
	ul.targets li + li {
		margin-top: 16px;
	}
	ul.targets li {
		border: 2px solid #4d7c0f;
		background-color: #dcfce7;
		border-radius: 4px;
		padding: 16px 12px;
		display: flex;
		align-items: center;
	}
	ul.targets li.removed {
		border-color: #b91c1c;
		background-color: #fecaca;
	}
	ul.targets li span {
		font-weight: 500;
		font-size: 1.1rem;
		margin: 0 8px;
	}
	h2.removed {
		border: 2px solid #b91c1c;
		background-color: #fecaca;
		border-radius: 4px;
		padding: 12px 16px;
	}
	h2.advancing {
		border: 2px solid #4d7c0f;
		background-color: #dcfce7;
		border-radius: 4px;
		padding: 12px 16px;
	}
</style>
