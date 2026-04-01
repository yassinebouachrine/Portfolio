export function initProjectFilters() {
  const btns = document.querySelectorAll('.filter-btn')
  const cards = document.querySelectorAll('.project-card')

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'))
      btn.classList.add('active')

      const filter = btn.dataset.filter

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = ''
          card.style.opacity = '0'
          card.style.transform = 'scale(0.9)'
          setTimeout(() => {
            card.style.transition = 'all 0.4s ease'
            card.style.opacity = '1'
            card.style.transform = 'scale(1)'
          }, 50)
        } else {
          card.style.display = 'none'
        }
      })
    })
  })
}