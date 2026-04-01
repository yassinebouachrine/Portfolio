export function initTypedEffect() {
  const el = document.getElementById('heroTyped')
  if (!el) return
  const texts = ['Élève Ingénieur en Data Science & IA','Machine Learning & Deep Learning Enthusiast','Big Data & Analytics','Computer Vision','Passionné par l\'IA']
  let ti=0,ci=0,del=false,sp=80
  function type() {
    const t=texts[ti]
    if(!del){el.textContent=t.substring(0,ci+1);ci++;if(ci===t.length){del=true;sp=2000}else sp=50+Math.random()*80}
    else{el.textContent=t.substring(0,ci-1);ci--;if(ci===0){del=false;ti=(ti+1)%texts.length;sp=300}else sp=30}
    setTimeout(type,sp)
  }
  setTimeout(type,600)
}