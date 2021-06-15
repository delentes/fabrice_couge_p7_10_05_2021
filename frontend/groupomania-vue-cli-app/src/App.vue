<script>
import NavLink from './components/NavLink.vue'

export default {
	name: 'App',
	components: {
		NavLink
	}
}
</script>

<template>
	<div id="app">
		<nav>
			<NavLink url="/" text="Accueil" />
			<NavLink url="/login" text="S'identifié" />
			<NavLink url="/signup" text="S'enregistré" />
		</nav>
	</div>
</template>