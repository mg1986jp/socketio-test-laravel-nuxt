<template>
  <div class="layout">
    <header class="header">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/register">Register</NuxtLink>
      <NuxtLink to="/login">Login</NuxtLink>
      <NuxtLink to="/profile">Profile</NuxtLink>
    </header>
    <main>
      <NuxtPage />
    </main>
  </div>
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
