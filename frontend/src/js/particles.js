export function initParticles() {
  const c = document.getElementById('particles')
  if (!c) return

  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div')
    p.classList.add('particle')
    p.style.left = Math.random() * 100 + '%'
    p.style.animationDelay = Math.random() * 8 + 's'
    p.style.animationDuration = (6 + Math.random() * 6) + 's'
    const size = 2 + Math.random() * 4
    p.style.width = size + 'px'
    p.style.height = size + 'px'
    c.appendChild(p)
  }
}