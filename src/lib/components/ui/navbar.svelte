<nav>
	<div class="left">
		<a href="/">
			<img src="/logo.svg" alt="Logo" />
			<span>acmForm</span>
		</a>
	</div>
</nav>

<style>
	nav {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1.5rem;
		border-bottom: 2px solid rgb(var(--color-background-400));
	}

	.left > a {
		display: flex;
		align-items: center;
		text-decoration: none;
		color: rgb(var(--color-foreground-700));
		font-weight: 600;
		font-size: 1.125rem;
	}

	.left span {
		margin-left: 0.5rem;
	}

	.left img {
		width: 1.5rem;
	}
</style>
