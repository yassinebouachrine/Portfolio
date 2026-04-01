export function initContactForm() {
  const form = document.getElementById('contactForm')
  if (!form) return

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const btn = document.getElementById('submitBtn')
    const btnText = btn.querySelector('.btn-text')
    const btnLoad = btn.querySelector('.btn-loading')
    const msgDiv = document.getElementById('formMsg')

    btnText.style.display = 'none'
    btnLoad.style.display = 'inline-flex'
    btn.disabled = true

    const data = Object.fromEntries(new FormData(form))

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const json = await res.json()

      msgDiv.style.display = 'block'
      msgDiv.className = 'form-msg ' + (json.success ? 'success' : 'error')
      msgDiv.innerHTML = `<i class="fas fa-${json.success ? 'check-circle' : 'exclamation-circle'}"></i> ${json.message}`

      if (json.success) {
        form.reset()
        setTimeout(() => { msgDiv.style.display = 'none' }, 5000)
      }
    } catch {
      msgDiv.style.display = 'block'
      msgDiv.className = 'form-msg error'
      msgDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Erreur de connexion.'
    }

    btnText.style.display = 'inline'
    btnLoad.style.display = 'none'
    btn.disabled = false
  })
}