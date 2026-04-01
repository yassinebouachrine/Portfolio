export function initAnimations() {
  const counters = document.querySelectorAll('.stat-num')
  function animateCounter(el, target) {
    let cur=0; const inc=target/40
    const timer=setInterval(()=>{cur+=inc;if(cur>=target){el.textContent=target+'+';clearInterval(timer)}else el.textContent=Math.floor(cur)},40)
  }
  function animateBars(panel) {
    panel.querySelectorAll('.sk-fill, .lang-fill').forEach(f=>{
      const w=f.dataset.width;f.style.width='0%'
      setTimeout(()=>{f.style.width=w+'%'},300)
    })
  }
  const animated = new Set()
  window.addEventListener('panelChanged',(e)=>{
    const idx=e.detail.index, panel=document.querySelectorAll('.panel')[idx]
    if(!panel||animated.has(idx))return; animated.add(idx)
    if(idx===0) counters.forEach(c=>animateCounter(c,parseInt(c.dataset.count)))
    if(idx===1||idx===4) animateBars(panel)
    panel.querySelectorAll('.bento-card').forEach((card,i)=>{
      card.style.opacity='0';card.style.transform='translateY(20px)'
      setTimeout(()=>{card.style.transition='all 0.5s cubic-bezier(0.4,0,0.2,1)';card.style.opacity='1';card.style.transform='translateY(0)'},80+i*80)
    })
  })
  setTimeout(()=>window.dispatchEvent(new CustomEvent('panelChanged',{detail:{index:0}})),100)
}