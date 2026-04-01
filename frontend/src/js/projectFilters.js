export function initProjectFilters() {
  const btns=document.querySelectorAll('.filter-btn'),cards=document.querySelectorAll('.project-card')
  btns.forEach(btn=>{btn.addEventListener('click',()=>{
    btns.forEach(b=>b.classList.remove('active'));btn.classList.add('active')
    const f=btn.dataset.filter
    cards.forEach(c=>{
      if(f==='all'||c.dataset.category===f){c.style.display='';c.style.opacity='0';c.style.transform='scale(0.95)'
        setTimeout(()=>{c.style.transition='all 0.4s ease';c.style.opacity='1';c.style.transform='scale(1)'},50)
      } else c.style.display='none'
    })
  })})
}