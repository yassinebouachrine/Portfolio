export function initHorizontalScroll() {
  const wrapper = document.getElementById('horizontalWrapper')
  const container = document.getElementById('horizontalContainer')
  const panels = document.querySelectorAll('.panel')
  const dots = document.querySelectorAll('.section-dot')
  const navLinks = document.querySelectorAll('.nav-link')
  const progressBar = document.getElementById('scrollProgress')
  const scrollLeft = document.getElementById('scrollLeft')
  const scrollRight = document.getElementById('scrollRight')

  let currentIndex = 0
  let isScrolling = false
  let touchStartX = 0
  let touchEndX = 0

  // Set panel widths
  function setPanelWidths() {
    const vw = window.innerWidth
    panels.forEach(panel => {
      panel.style.width = vw + 'px'
      panel.style.minWidth = vw + 'px'
    })
    container.style.width = (vw * panels.length) + 'px'
    goToPanel(currentIndex, false)
  }

  setPanelWidths()
  window.addEventListener('resize', setPanelWidths)

  // Navigate to panel
  function goToPanel(index, smooth = true) {
    if (index < 0 || index >= panels.length) return
    currentIndex = index

    const offset = -index * window.innerWidth
    container.style.transition = smooth ? 'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)' : 'none'
    container.style.transform = `translateX(${offset}px)`

    // Update dots
    dots.forEach((d, i) => d.classList.toggle('active', i === index))

    // Update nav links
    navLinks.forEach((l, i) => l.classList.toggle('active', i === index))

    // Update progress
    const progress = (index / (panels.length - 1)) * 100
    if (progressBar) progressBar.style.width = progress + '%'

    // Update arrows
    if (scrollLeft) scrollLeft.classList.toggle('hidden', index === 0)
    if (scrollRight) scrollRight.classList.toggle('hidden', index === panels.length - 1)

    // Trigger section animations
    window.dispatchEvent(new CustomEvent('panelChanged', { detail: { index } }))
  }

  // Wheel scroll → horizontal
  wrapper.addEventListener('wheel', (e) => {
    e.preventDefault()
    if (isScrolling) return

    isScrolling = true
    if (e.deltaY > 30 || e.deltaX > 30) {
      goToPanel(currentIndex + 1)
    } else if (e.deltaY < -30 || e.deltaX < -30) {
      goToPanel(currentIndex - 1)
    }

    setTimeout(() => { isScrolling = false }, 1000)
  }, { passive: false })

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      goToPanel(currentIndex + 1)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      goToPanel(currentIndex - 1)
    }
  })

  // Touch
  wrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX
  }, { passive: true })

  wrapper.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX
    const diff = touchStartX - touchEndX
    if (Math.abs(diff) > 60) {
      if (diff > 0) goToPanel(currentIndex + 1)
      else goToPanel(currentIndex - 1)
    }
  }, { passive: true })

  // Dots click
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToPanel(parseInt(dot.dataset.index))
    })
  })

  // Nav link click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      goToPanel(parseInt(link.dataset.index))
      // close mobile nav
      document.getElementById('navLinks').classList.remove('open')
      document.getElementById('navToggle').classList.remove('active')
    })
  })

  // Scroll arrows
  if (scrollLeft) scrollLeft.addEventListener('click', () => goToPanel(currentIndex - 1))
  if (scrollRight) scrollRight.addEventListener('click', () => goToPanel(currentIndex + 1))

  // Buttons with data-goto
  document.querySelectorAll('[data-goto]').forEach(btn => {
    btn.addEventListener('click', () => {
      goToPanel(parseInt(btn.dataset.goto))
    })
  })

  // Initial
  goToPanel(0, false)
}