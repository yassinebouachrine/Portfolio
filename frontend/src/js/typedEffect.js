import { getCurrentLang } from './language.js'
import { translations } from './translations.js'

export function initTypedEffect() {
  const el = document.getElementById('heroTyped')
  if (!el) return

  const keys = ['typed_1', 'typed_2', 'typed_3', 'typed_4', 'typed_5']

  function getTexts() {
    const lang = getCurrentLang()
    return keys.map(k => translations[k]?.[lang] || translations[k]?.['fr'] || '')
  }

  let ti = 0, ci = 0, del = false, sp = 80
  let texts = getTexts()

  // Update texts when language changes
  window.addEventListener('languageChanged', () => {
    texts = getTexts()
    // Reset to start of current text
    ci = 0
    del = false
  })

  function type() {
    const txt = texts[ti]
    if (!txt) { ti = 0; setTimeout(type, 100); return }

    if (!del) {
      el.textContent = txt.substring(0, ci + 1)
      ci++
      if (ci === txt.length) { del = true; sp = 2000 }
      else sp = 50 + Math.random() * 80
    } else {
      el.textContent = txt.substring(0, ci - 1)
      ci--
      if (ci === 0) { del = false; ti = (ti + 1) % texts.length; sp = 300 }
      else sp = 30
    }
    setTimeout(type, sp)
  }

  setTimeout(type, 600)
}