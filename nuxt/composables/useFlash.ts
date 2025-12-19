type FlashColor = 'info' | 'success' | 'warning' | 'error'

export const useFlash = () => {
  const message = useState<string>('flash_message', () => '')
  const color = useState<FlashColor>('flash_color', () => 'info')

  const setFlash = (msg: string, lvl: FlashColor = 'info') => {
    message.value = msg
    color.value = lvl
  }

  return {
    message,
    color,
    setFlash,
  }
}
