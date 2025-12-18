<template>
  <div class="page">
    <h1>Nuxt + Laravel Passport Demo</h1>
    <p>シンプルな認証デモです。</p>
    <div class="links">
      <NuxtLink to="/register">新規登録</NuxtLink>
      <NuxtLink to="/login">ログイン</NuxtLink>
      <NuxtLink to="/profile">プロフィール</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: 640px;
  margin: 40px auto;
  padding: 24px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
}
.links {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}
a {
  color: #0f6fff;
}
</style>
