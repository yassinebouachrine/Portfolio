export function initTypedEffect() {
  const el = document.getElementById('heroTyped')
  if (!el) return

  const texts = [
    'Élève Ingénieur en Data Science & IA',
    'Machine Learning Enthusiast',
    'Big Data & Analytics',
    'Full Stack Developer',
    'NLP & Deep Learning'
  ]

  let ti = 0, ci = 0, deleting = false, speed = 80

  function type() {
    const txt = texts[ti]
    if (!deleting) {
      el.textContent = txt.substring(0, ci + 1)
      ci++
      if (ci === txt.length) { deleting = true; speed = 2000 }
      else speed = 50 + Math.random() * 80
    } else {
      el.textContent = txt.substring(0, ci - 1)
      ci--
      if (ci === 0) { deleting = false; ti = (ti + 1) % texts.length; speed = 300 }
      else speed = 30
    }
    setTimeout(type, speed)
  }

  setTimeout(type, 600)
}