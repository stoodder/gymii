<template>
	<form @submit.prevent="register">
		<header>Login</header>
		<label>
			Email
			<input type="text" placeholder="Username" v-model="email" />
		</label>
		<label>
			Name
			<input type="text" placeholder="Name" v-model="name" />
		</label>
		<label>
			Password
			<input type="password" placeholder="Password" v-model="password" />
		</label>
		<button type="submit">Register</button>
		<nuxt-link to="/login">login</nuxt-link>
	</form>
</template>

<script lang="ts">
import { UserService } from "@/services";

export default {
	data: () => ({
		email: "test@test.com",
		name: "Tester",
		password: "password"
	}),

  methods: {
    async register() {
      const user = await UserService.create({
				email: this.email,
				name: this.name,
				password: this.password
			});

			console.dir(user);
    }
  }
}
</script>
