export function initAnimations() {
  // Counter animation
  const counters = document.querySelectorAll('.stat-num')

  function animateCounter(el, target) {
    let cur = 0
    const inc = target / 40
    const timer = setInterval(() => {
      cur += inc
      if (cur >= target) { el.textContent = target + '+'; clearInterval(timer) }
      else el.textContent = Math.floor(cur)
    }, 40)
  }

  // Skill bar animation
  function animateBars(panel) {
    panel.querySelectorAll('.sk-fill, .lang-fill').forEach(fill => {
      const w = fill.dataset.width
      fill.style.width = '0%'
      setTimeout(() => { fill.style.width = w + '%' }, 300)
    })
  }

  // Listen for panel changes
  let animated = new Set()

  window.addEventListener('panelChanged', (e) => {
    const idx = e.detail.index
    const panel = document.querySelectorAll('.panel')[idx]
    if (!panel || animated.has(idx)) return

    animated.add(idx)

    // Counters (panel 0)
    if (idx === 0) {
      counters.forEach(c => animateCounter(c, parseInt(c.dataset.count)))
    }

    // Skill bars (panel 4 and panel 1 for languages)
    if (idx === 1 || idx === 4) {
      animateBars(panel)
    }

    // Fade in cards
    const cards = panel.querySelectorAll('.bento-card')
    cards.forEach((card, i) => {
      card.style.opacity = '0'
      card.style.transform = 'translateY(30px)'
      setTimeout(() => {
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        card.style.opacity = '1'
        card.style.transform = 'translateY(0)'
      }, 100 + i * 100)
    })
  })

  // Trigger initial panel
  setTimeout(() => {
    window.dispatchEvent(new CustomEvent('panelChanged', { detail: { index: 0 } }))
  }, 100)
}