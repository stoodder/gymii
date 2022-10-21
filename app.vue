<template>
  <div>
    <Header />
    Hello World
    <button @click="callApi">Call API</button>
  </div>
</template>

<script lang="ts">
import TestService from "@/services/TestService";

export default {
  name: 'App',

  methods: {
    async callApi() {
      const response = await TestService.get();

      console.dir(response.data.value);
    }
  }
}
</script>
