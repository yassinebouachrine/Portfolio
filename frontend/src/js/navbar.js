export function initNavbar() {
  const toggle=document.getElementById('navToggle'),links=document.getElementById('navLinks')
  if(toggle&&links){toggle.addEventListener('click',()=>{toggle.classList.toggle('active');links.classList.toggle('open')})}
}