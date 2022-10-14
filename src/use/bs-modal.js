import { Modal } from 'bootstrap'

export function closeModal (el) {
  const modal = Modal.getInstance(el)
  modal.hide()
}
