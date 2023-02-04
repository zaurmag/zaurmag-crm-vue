import { Modal } from 'bootstrap'

export function closeBsModal(id) {
  const modal = Modal.getOrCreateInstance(id)
  modal.hide()
}

export function showBsModal(id) {
  const modal = Modal.getOrCreateInstance(id)
  modal.show()
}

export function hideBsModal(id, callback) {
  const modalEl = document.getElementById(id)
  modalEl.addEventListener('hide.bs.modal', callback)
}
