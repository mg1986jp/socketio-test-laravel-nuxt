<script setup lang="ts">
const { user, fetchMe, logout, token } = useAuth()

onMounted(async () => {
  if (token.value && !user.value) {
    await fetchMe()
  }
})
</script>

<template>
  <div class="page">
    <h1>プロフィール</h1>
    <div v-if="user">
      <p><strong>ID:</strong> {{ user.id }}</p>
      <p><strong>名前:</strong> {{ user.name }}</p>
      <p><strong>メール:</strong> {{ user.email }}</p>
    </div>
    <div v-else>
      <p>ログインが必要です。</p>
      <NuxtLink to="/login">ログインへ</NuxtLink>
    </div>
    <div class="actions">
      <button @click="logout">ログアウト</button>
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: 480px;
  margin: 40px auto;
  padding: 24px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
}
.actions {
  margin-top: 16px;
}
button {
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  background: #d22;
  color: #fff;
  cursor: pointer;
}
a {
  color: #0f6fff;
}
</style>
