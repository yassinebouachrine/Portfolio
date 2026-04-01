export function initClock() {
  function update() {
    const now = new Date()
    const t = document.getElementById('clockTime')
    const d = document.getElementById('clockDate')
    if (t) t.textContent = now.toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit' })
    if (d) d.textContent = now.toLocaleDateString('fr-FR', { weekday:'long', year:'numeric', month:'long', day:'numeric' })
  }
  const h = new Date().getHours()
  const g = document.getElementById('greeting')
  if (g) { g.textContent = h < 12 ? 'Bonjour ☀️' : h < 18 ? 'Bon après-midi 🌤️' : 'Bonsoir 🌙' }
  update(); setInterval(update, 1000)
}