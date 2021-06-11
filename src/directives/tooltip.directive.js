import { Tooltip } from 'bootstrap'

export default {
  mounted (el, { value }) {
    const tooltip = new Tooltip(el, {
      title: value.title,
      placement: value.placement,
      trigger: 'hover'
    })
    return tooltip
  },
  unmounted (el) {
    const tooltip = Tooltip.getInstance(el)

    if (tooltip && tooltip.dispose) {
      tooltip.dispose()
    }
  }
}
