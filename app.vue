<template>
  <div>
    <Header />
    Hello World
    <button @click="increment">
      Count is: {{ count }}
    </button>
  </div>
</template>

<script lang="ts">
type Data = {
  count: number;
};

export default {
  name: 'App',

  data(): Data {
    return {
      count: 0
    }
  },

  methods: {
    increment() {
      this.count++;
    }
  }
}
</script>