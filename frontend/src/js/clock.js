import { getCurrentLang } from './language.js'

export function initClock() {
  function update() {
    const now = new Date()
    const lang = getCurrentLang()
    const locale = lang === 'fr' ? 'fr-FR' : 'en-US'

    const t = document.getElementById('clockTime')
    const d = document.getElementById('clockDate')
    if (t) t.textContent = now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
    if (d) d.textContent = now.toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

  function updateGreeting() {
    const h = new Date().getHours()
    const lang = getCurrentLang()
    const g = document.getElementById('greeting')
    if (!g) return

    if (lang === 'fr') {
      g.textContent = h < 12 ? 'Bonjour' : h < 18 ? 'Bon après-midi' : 'Bonsoir'
    } else {
      g.textContent = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
    }
  }

  updateGreeting()
  update()
  setInterval(update, 1000)

  // Update on language change
  window.addEventListener('languageChanged', () => {
    updateGreeting()
    update()
  })
}