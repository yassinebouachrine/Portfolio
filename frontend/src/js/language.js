import { translations } from './translations.js'

let currentLang = 'fr'

export function initLanguage() {
  const toggle = document.getElementById('langToggle')
  if (!toggle) return

  // Load saved language
  const saved = localStorage.getItem('lang') || 'fr'
  currentLang = saved
  applyLanguage(currentLang)
  updateToggleButton(currentLang)

  toggle.addEventListener('click', () => {
    currentLang = currentLang === 'fr' ? 'en' : 'fr'
    localStorage.setItem('lang', currentLang)
    applyLanguage(currentLang)
    updateToggleButton(currentLang)
  })
}

function updateToggleButton(lang) {
  const toggle = document.getElementById('langToggle')
  const flag = document.getElementById('langFlag')
  if (!toggle || !flag) return

  if (lang === 'fr') {
    flag.textContent = 'EN'
    toggle.title = 'Switch to English'
  } else {
    flag.textContent = 'FR'
    toggle.title = 'Passer en Français'
  }
}

export function getCurrentLang() {
  return currentLang
}

export function t(key) {
  const entry = translations[key]
  if (!entry) return key
  return entry[currentLang] || entry['fr'] || key
}

function applyLanguage(lang) {
  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n')
    const entry = translations[key]
    if (!entry) return

    const text = entry[lang] || entry['fr']
    if (!text) return

    // Check if it contains HTML
    if (text.includes('<')) {
      el.innerHTML = text
    } else {
      el.textContent = text
    }
  })

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder')
    const entry = translations[key]
    if (entry) {
      el.placeholder = entry[lang] || entry['fr']
    }
  })

  // Update html lang attribute
  document.documentElement.lang = lang

  // Dispatch event for other modules to react
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }))
}