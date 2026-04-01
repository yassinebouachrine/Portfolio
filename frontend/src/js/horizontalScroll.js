export function initHorizontalScroll() {
  const wrapper = document.getElementById('horizontalWrapper')
  const container = document.getElementById('horizontalContainer')
  const panels = document.querySelectorAll('.panel')
  const dots = document.querySelectorAll('.section-dot')
  const navLinks = document.querySelectorAll('.nav-link')
  const progressBar = document.getElementById('scrollProgress')
  const scrollLeftBtn = document.getElementById('scrollLeft')
  const scrollRightBtn = document.getElementById('scrollRight')

  if (!wrapper || !container || panels.length === 0) return

  let currentIndex = 0
  let isTransitioning = false
  let touchStartX = 0
  let touchStartY = 0
  let accumulatedDelta = 0
  let deltaResetTimer = null

  const SCROLL_THRESHOLD = 80
  const TRANSITION_DURATION = 900
  const DELTA_RESET_DELAY = 200

  // ── Set panel dimensions ──
  function setupLayout() {
    const vw = window.innerWidth
    const vh = window.innerHeight

    // Force body/html no scroll
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.documentElement.style.height = '100%'
    document.body.style.height = '100%'

    // Wrapper takes full viewport
    wrapper.style.position = 'fixed'
    wrapper.style.top = '0'
    wrapper.style.left = '0'
    wrapper.style.width = vw + 'px'
    wrapper.style.height = vh + 'px'
    wrapper.style.overflow = 'hidden'

    // Container is a horizontal strip
    container.style.display = 'flex'
    container.style.flexDirection = 'row'
    container.style.flexWrap = 'nowrap'
    container.style.height = vh + 'px'
    container.style.width = (vw * panels.length) + 'px'
    container.style.willChange = 'transform'

    // Each panel is exactly viewport sized
    panels.forEach(panel => {
      panel.style.width = vw + 'px'
      panel.style.minWidth = vw + 'px'
      panel.style.maxWidth = vw + 'px'
      panel.style.height = vh + 'px'
      panel.style.flexShrink = '0'
      panel.style.overflowY = 'auto'
      panel.style.overflowX = 'hidden'
    })

    // Snap to current panel without animation
    goToPanel(currentIndex, false)
  }

  setupLayout()
  window.addEventListener('resize', setupLayout)

  // ── Navigate to panel ──
  function goToPanel(index, smooth = true) {
    if (index < 0 || index >= panels.length) return
    if (index === currentIndex && smooth) return

    currentIndex = index
    const offset = -index * window.innerWidth

    if (smooth) {
      isTransitioning = true
      container.style.transition = `transform ${TRANSITION_DURATION}ms cubic-bezier(0.65, 0, 0.35, 1)`
      setTimeout(() => {
        isTransitioning = false
      }, TRANSITION_DURATION)
    } else {
      container.style.transition = 'none'
    }

    container.style.transform = `translateX(${offset}px)`

    // Update indicators
    dots.forEach((d, i) => d.classList.toggle('active', i === index))
    navLinks.forEach((l, i) => l.classList.toggle('active', i === index))

    // Progress bar
    const progress = panels.length > 1 ? (index / (panels.length - 1)) * 100 : 0
    if (progressBar) progressBar.style.width = progress + '%'

    // Arrow visibility
    if (scrollLeftBtn) scrollLeftBtn.classList.toggle('hidden', index === 0)
    if (scrollRightBtn) scrollRightBtn.classList.toggle('hidden', index === panels.length - 1)

    // Reset accumulated delta
    accumulatedDelta = 0

    // Scroll panel to top
    if (smooth) {
      panels[index].scrollTop = 0
    }

    // Dispatch event for animations
    window.dispatchEvent(new CustomEvent('panelChanged', { detail: { index } }))
  }

  // ── Check if panel needs internal scroll ──
  function panelCanScrollVertically(panel, direction) {
    if (direction > 0) {
      // Scrolling down — can we scroll down more?
      return panel.scrollTop < (panel.scrollHeight - panel.clientHeight - 5)
    } else {
      // Scrolling up — can we scroll up more?
      return panel.scrollTop > 5
    }
  }

  // ── Wheel event — convert vertical scroll to horizontal navigation ──
  wrapper.addEventListener('wheel', (e) => {
    // Always prevent default to stop page scroll
    e.preventDefault()

    if (isTransitioning) return

    const currentPanel = panels[currentIndex]
    const deltaY = e.deltaY
    const deltaX = e.deltaX

    // If using horizontal scroll (trackpad), use deltaX
    const primaryDelta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY

    // Check if current panel has scrollable content
    const panelHasScroll = currentPanel.scrollHeight > currentPanel.clientHeight + 10

    if (panelHasScroll) {
      // Panel has internal scroll content
      const canScroll = panelCanScrollVertically(currentPanel, primaryDelta)

      if (canScroll) {
        // Let the panel scroll internally — apply scroll manually
        currentPanel.scrollTop += deltaY
        accumulatedDelta = 0
        return
      }
    }

    // Accumulate delta for panel navigation
    accumulatedDelta += primaryDelta

    // Reset accumulated delta after inactivity
    clearTimeout(deltaResetTimer)
    deltaResetTimer = setTimeout(() => {
      accumulatedDelta = 0
    }, DELTA_RESET_DELAY)

    // Navigate when threshold reached
    if (accumulatedDelta > SCROLL_THRESHOLD) {
      goToPanel(currentIndex + 1)
      accumulatedDelta = 0
    } else if (accumulatedDelta < -SCROLL_THRESHOLD) {
      goToPanel(currentIndex - 1)
      accumulatedDelta = 0
    }
  }, { passive: false })

  // ── Keyboard navigation ──
  document.addEventListener('keydown', (e) => {
    if (isTransitioning) return

    // Don't hijack when typing in form
    const tag = e.target.tagName.toLowerCase()
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault()
        goToPanel(currentIndex + 1)
        break
      case 'ArrowLeft':
        e.preventDefault()
        goToPanel(currentIndex - 1)
        break
      case 'ArrowDown':
        // Only navigate if panel can't scroll down
        if (!panelCanScrollVertically(panels[currentIndex], 1)) {
          e.preventDefault()
          goToPanel(currentIndex + 1)
        }
        break
      case 'ArrowUp':
        // Only navigate if panel can't scroll up
        if (!panelCanScrollVertically(panels[currentIndex], -1)) {
          e.preventDefault()
          goToPanel(currentIndex - 1)
        }
        break
      case 'Home':
        e.preventDefault()
        goToPanel(0)
        break
      case 'End':
        e.preventDefault()
        goToPanel(panels.length - 1)
        break
    }
  })

  // ── Touch support (swipe horizontal) ──
  wrapper.addEventListener('touchstart', (e) => {
    if (isTransitioning) return
    touchStartX = e.changedTouches[0].screenX
    touchStartY = e.changedTouches[0].screenY
  }, { passive: true })

  wrapper.addEventListener('touchend', (e) => {
    if (isTransitioning) return

    const touchEndX = e.changedTouches[0].screenX
    const touchEndY = e.changedTouches[0].screenY

    const diffX = touchStartX - touchEndX
    const diffY = touchStartY - touchEndY

    // Only navigate horizontally if swipe is more horizontal than vertical
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 60) {
      if (diffX > 0) {
        goToPanel(currentIndex + 1) // Swipe left → next
      } else {
        goToPanel(currentIndex - 1) // Swipe right → prev
      }
    }
  }, { passive: true })

  // ── Dot navigation ──
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToPanel(parseInt(dot.dataset.index))
    })
  })

  // ── Nav link navigation ──
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      goToPanel(parseInt(link.dataset.index))
      // Close mobile nav
      document.getElementById('navLinks')?.classList.remove('open')
      document.getElementById('navToggle')?.classList.remove('active')
    })
  })

  // ── Arrow buttons ──
  if (scrollLeftBtn) {
    scrollLeftBtn.addEventListener('click', () => goToPanel(currentIndex - 1))
  }
  if (scrollRightBtn) {
    scrollRightBtn.addEventListener('click', () => goToPanel(currentIndex + 1))
  }

  // ── Buttons with data-goto ──
  document.querySelectorAll('[data-goto]').forEach(btn => {
    btn.addEventListener('click', () => {
      goToPanel(parseInt(btn.dataset.goto))
    })
  })

  // ── Prevent any default scroll on body ──
  document.body.addEventListener('wheel', (e) => {
    if (!e.target.closest('.panel')) {
      e.preventDefault()
    }
  }, { passive: false })

  // ── Initialize ──
  goToPanel(0, false)

  // Log for debug
  console.log(`✅ Horizontal scroll initialized — ${panels.length} panels`)
}