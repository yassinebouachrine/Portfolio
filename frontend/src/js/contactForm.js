import { getCurrentLang } from './language.js'
import { translations } from './translations.js'

function t(key) {
  const lang = getCurrentLang()
  return translations[key]?.[lang] || translations[key]?.['fr'] || key
}

export function initContactForm() {
  const form = document.getElementById('contactForm')
  if (!form) return

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const btn = document.getElementById('submitBtn')
    const btxt = btn.querySelector('.btn-text')
    const bload = btn.querySelector('.btn-loading')
    const msg = document.getElementById('formMsg')

    btxt.style.display = 'none'
    bload.style.display = 'inline-flex'
    btn.disabled = true

    const data = Object.fromEntries(new FormData(form))

    try {
      const apiBase = import.meta.env.VITE_API_URL || ''
      const res = await fetch(`${apiBase}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const json = await res.json()

      msg.style.display = 'block'

      if (json.success) {
        msg.className = 'form-msg success'
        msg.textContent = json.message
        form.reset()
        setTimeout(() => { msg.style.display = 'none' }, 5000)
      } else {
        msg.className = 'form-msg error'
        msg.textContent = json.message
      }
    } catch {
      msg.style.display = 'block'
      msg.className = 'form-msg error'
      msg.textContent = t('msg_error')
    }

    btxt.style.display = 'inline'
    bload.style.display = 'none'
    btn.disabled = false
  })
}