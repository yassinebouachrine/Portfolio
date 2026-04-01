export function initContactForm() {
  const form = document.getElementById('contactForm')
  if (!form) return
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const btn=document.getElementById('submitBtn'),btxt=btn.querySelector('.btn-text'),bload=btn.querySelector('.btn-loading'),msg=document.getElementById('formMsg')
    btxt.style.display='none';bload.style.display='inline-flex';btn.disabled=true
    const data=Object.fromEntries(new FormData(form))
    try {
      const res=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
      const json=await res.json()
      msg.style.display='block';msg.className='form-msg '+(json.success?'success':'error')
      msg.innerHTML=`<i class="fas fa-${json.success?'check-circle':'exclamation-circle'}"></i> ${json.message}`
      if(json.success){form.reset();setTimeout(()=>{msg.style.display='none'},5000)}
    } catch {
      msg.style.display='block';msg.className='form-msg error'
      msg.innerHTML='<i class="fas fa-exclamation-circle"></i> Erreur de connexion.'
    }
    btxt.style.display='inline';bload.style.display='none';btn.disabled=false
  })
}