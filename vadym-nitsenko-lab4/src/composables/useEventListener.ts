import { onMounted, onUnmounted } from 'vue'

export function useEventListener(
  target: Window | Document | EventTarget,
  event: string,
  handler: EventListener
) {

  onMounted(() => {
    target.addEventListener(event, handler)
  })

  onUnmounted(() => {
    target.removeEventListener(event, handler)
  })
}
