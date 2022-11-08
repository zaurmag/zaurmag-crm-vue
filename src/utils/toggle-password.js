export default function togglePassword (el) {
  const input = el.parentNode.querySelector('input[type="password"]')
  const icon = el.parentNode.querySelector('use')
  let isToggle = false

  el.addEventListener('click', (event) => {
    event.preventDefault()
    isToggle = !isToggle

    if (isToggle) {
      input.type = 'text'
      icon.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '/images/sprite.svg#eye-slash')
    } else {
      input.type = 'password'
      icon.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '/images/sprite.svg#eye')
    }
  })
}
