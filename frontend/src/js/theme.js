export function initTheme() {
  const toggle = document.getElementById('themeToggle')
  const icon = document.getElementById('themeIcon')
  const html = document.documentElement

  // Load saved preference
  const saved = localStorage.getItem('theme') || 'dark'
  html.setAttribute('data-theme', saved)
  updateIcon(saved)

  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme')
    const next = current === 'dark' ? 'light' : 'dark'
    html.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
    updateIcon(next)
  })

  function updateIcon(theme) {
    if (theme === 'dark') {
      icon.className = 'fas fa-moon'
      toggle.title = 'Mode clair'
    } else {
      icon.className = 'fas fa-sun'
      toggle.title = 'Mode sombre'
    }
  }
}