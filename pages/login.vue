<template>
	<form @submit.prevent="login">
		<header>Login</header>
		<label>
			Email
			<input type="text" placeholder="Username" v-model="email" />
		</label>
		<label>
			Password
			<input type="password" placeholder="Password" v-model="password" />
		</label>
		<button type="submit">Login</button>
		<nuxt-link to="/register">Register</nuxt-link>
	</form>
</template>

<script lang="ts">
import { SessionService } from "@/services";

export default {
	data: () => ({
		email: "test@test.com",
		password: "test"
	}),

  methods: {
    async login() {
      const session = await SessionService.create({
				email: this.email,
				password: this.password
			});

			console.dir(session);
    }
  }
}
</script>
