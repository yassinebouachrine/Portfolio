import './styles/main.css'
import { initHorizontalScroll } from './js/horizontalScroll.js'
import { initClock } from './js/clock.js'
import { initTypedEffect } from './js/typedEffect.js'
import { initParticles } from './js/particles.js'
import { initAnimations } from './js/animations.js'
import { initContactForm } from './js/contactForm.js'
import { initProjectFilters } from './js/projectFilters.js'
import { initNavbar } from './js/navbar.js'

document.addEventListener('DOMContentLoaded', () => {
  initHorizontalScroll()
  initClock()
  initTypedEffect()
  initParticles()
  initAnimations()
  initContactForm()
  initProjectFilters()
  initNavbar()
})