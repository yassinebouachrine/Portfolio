export function initClock() {
  function update() {
    const now = new Date()
    const timeEl = document.getElementById('clockTime')
    const dateEl = document.getElementById('clockDate')

    if (timeEl) {
      timeEl.textContent = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    }
    if (dateEl) {
      dateEl.textContent = now.toLocaleDateString('fr-FR', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      })
    }
  }

  // Greeting
  const hour = new Date().getHours()
  const g = document.getElementById('greeting')
  if (g) {
    if (hour < 12) g.textContent = 'Bonjour ☀️'
    else if (hour < 18) g.textContent = 'Bon après-midi 🌤️'
    else g.textContent = 'Bonsoir 🌙'
  }

  update()
  setInterval(update, 1000)
}