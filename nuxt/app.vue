<script setup lang="ts">
const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/register', label: 'Register' },
  { to: '/login', label: 'Login' },
  { to: '/profile', label: 'Profile' },
]

const { message, color } = useFlash()
const snack = ref(false)

watch(message, (val) => {
  if (val) {
    snack.value = true
  }
})

const closeSnack = () => {
  snack.value = false
  message.value = ''
}
</script>

<template>
  <v-app>
    <div class="layout">
      <header class="header">
        <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to">
          {{ link.label }}
        </NuxtLink>
      </header>
      <main>
        <NuxtPage />
      </main>
      <client-only>
        <v-snackbar
          v-model="snack"
          :color="color"
          timeout="3000"
          multi-line
          location="top"
        >
          {{ message }}
          <template #actions>
            <v-btn icon="mdi-close" variant="text" @click="closeSnack" />
          </template>
        </v-snackbar>
      </client-only>
    </div>
  </v-app>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  background: #f6f7fb;
}
.header {
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  background: #111827;
}
.header a {
  color: #e5e7eb;
  text-decoration: none;
}
.header a:hover {
  text-decoration: underline;
}
main {
  padding: 20px;
}
</style>
