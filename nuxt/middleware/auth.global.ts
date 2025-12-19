export default defineNuxtRouteMiddleware((to) => {
  const { token } = useAuth()
  const { setFlash } = useFlash()

  const isAuthenticated = Boolean(token.value)
  const isAuthPage = to.path === '/login' || to.path === '/register'
  const isVuetifyTest = to.path === '/vuetify-test'

  // 未ログインならログイン/登録以外へはリダイレクト
  if (!isAuthenticated && !isAuthPage && !isVuetifyTest) {
    setFlash('ログインが必要です', 'warning')
    return navigateTo('/login')
  }

  // ログイン済みでログイン/登録へ行こうとしたらプロフィールへ
  if (isAuthenticated && isAuthPage) {
    return navigateTo('/profile')
  }
})
