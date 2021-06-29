import { Tooltip } from 'bootstrap'

export default {
  mounted (el, { value }) {
    return new Tooltip(el, {
      ...value,
      trigger: 'hover'
    })
  },
  unmounted (el) {
    const tooltip = Tooltip.getInstance(el)

    if (tooltip && tooltip.dispose) {
      tooltip.dispose()
    }
  }
}
