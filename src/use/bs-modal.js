import { Modal } from 'bootstrap'

export function closeModal(id) {
  const modal = Modal.getInstance(id)
  modal.hide()
}

export function hideBsModal(id, callback) {
  const modalEl = document.getElementById(id)
  modalEl.addEventListener('hide.bs.modal', callback)
}
