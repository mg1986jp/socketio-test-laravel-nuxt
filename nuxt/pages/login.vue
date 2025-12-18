<script setup lang="ts">
const { login, errorMessage } = useAuth()

const form = reactive({
  email: '',
  password: '',
})

const submitting = ref(false)

const onSubmit = async () => {
  submitting.value = true
  await login({ ...form })
  submitting.value = false
}
</script>

<template>
  <div class="page">
    <h1>ログイン</h1>
    <form class="form" @submit.prevent="onSubmit">
      <label>
        メールアドレス
        <input v-model="form.email" type="email" required />
      </label>

      <label>
        パスワード
        <input v-model="form.password" type="password" minlength="8" required />
      </label>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <button type="submit" :disabled="submitting">
        {{ submitting ? '送信中…' : 'ログイン' }}
      </button>
    </form>

    <p class="helper">
      アカウントがない場合は <NuxtLink to="/register">新規登録</NuxtLink>
    </p>
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
.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-weight: 600;
}
input {
  padding: 10px;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  font-size: 14px;
}
button {
  margin-top: 8px;
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  background: #0f6fff;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.error {
  color: #d22;
}
.helper {
  margin-top: 12px;
}
a {
  color: #0f6fff;
}
</style>
