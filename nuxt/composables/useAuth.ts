type User = {
  id: number
  name: string
  email: string
}

export const useAuth = () => {
  const runtimeConfig = useRuntimeConfig()
  const apiBase = runtimeConfig.public.apiBase

  const token = useState<string>('auth_token', () => {
    if (process.client) {
      return localStorage.getItem('auth_token') || ''
    }
    return ''
  })

  const user = useState<User | null>('auth_user', () => null)
  const errorMessage = useState<string | null>('auth_error', () => null)
  const submitting = useState<boolean>('auth_submitting', () => false)

  const setToken = (value: string) => {
    token.value = value
    if (process.client) {
      localStorage.setItem('auth_token', value)
    }
  }

  const clearToken = () => {
    token.value = ''
    if (process.client) {
      localStorage.removeItem('auth_token')
    }
  }

  const authHeaders = () => {
    return token.value
      ? { Authorization: `Bearer ${token.value}` }
      : {}
  }

  const register = async (payload: { name: string; email: string; password: string; password_confirmation: string }) => {
    errorMessage.value = null
    submitting.value = true
    try {
      const res = await $fetch<{ user: User; token: string }>(`${apiBase}/auth/register`, {
        method: 'POST',
        body: payload,
        headers: { Accept: 'application/json' },
      })
      setToken(res.token)
      user.value = res.user
      await navigateTo('/profile')
    } catch (error: any) {
      errorMessage.value = parseError(error)
    } finally {
      submitting.value = false
    }
  }

  const login = async (payload: { email: string; password: string }) => {
    errorMessage.value = null
    submitting.value = true
    try {
      const res = await $fetch<{ user: User; token: string }>(`${apiBase}/auth/login`, {
        method: 'POST',
        body: payload,
        headers: { Accept: 'application/json' },
      })
      setToken(res.token)
      user.value = res.user
      await navigateTo('/profile')
    } catch (error: any) {
      errorMessage.value = parseError(error)
    } finally {
      submitting.value = false
    }
  }

  const fetchMe = async () => {
    if (!token.value) return
    try {
      const res = await $fetch<User>(`${apiBase}/auth/me`, {
        headers: {
          Accept: 'application/json',
          ...authHeaders(),
        },
      })
      user.value = res
    } catch (error: any) {
      errorMessage.value = parseError(error)
    }
  }

  const logout = async () => {
    try {
      if (token.value) {
        await $fetch(`${apiBase}/auth/logout`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            ...authHeaders(),
          },
        })
      }
    } catch (error: any) {
      // ignore logout errors
    } finally {
      clearToken()
      user.value = null
      await navigateTo('/login')
    }
  }

  const parseError = (error: any): string => {
    if (error?.data?.message) return error.data.message
    if (error?.data?.errors) {
      const firstKey = Object.keys(error.data.errors)[0]
      return error.data.errors[firstKey][0]
    }
    return 'エラーが発生しました'
  }

  return {
    token,
    user,
    errorMessage,
    submitting,
    register,
    login,
    fetchMe,
    logout,
    authHeaders,
  }
}
