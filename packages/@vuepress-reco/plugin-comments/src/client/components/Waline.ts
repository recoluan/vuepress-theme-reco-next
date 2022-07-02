import { usePageLang, withBase } from '@vuepress/client'
import { Waline } from '@waline/client/dist/component'
import { computed, defineComponent, h, toRefs } from 'vue'
import { useRoute } from 'vue-router'

import type { VNode } from 'vue'

import '@waline/client/dist/waline.css'
import '../styles/waline.css'

type TWalineOptions = Record<string, unknown>

type Tprops = {
  options: TWalineOptions
}

export default defineComponent({
  name: 'Waline',

  props: {
    options: {
      type: Object,
      default() {
        return {}
      },
    },
  },

  setup(props: Tprops) {
    const route = useRoute()
    const { options } = toRefs(props)
    const lang = usePageLang()

    const walineOption = computed(() => ({
      lang: lang.value || 'zh-CN',
      dark: 'html.dark',
      path: withBase(route.path),
      ...options.value,
    }))

    return (): VNode =>
      h(
        'div',
        {
          class: 'reco-waline-wrapper',
        },
        h(Waline, walineOption.value)
      )
  },
})
