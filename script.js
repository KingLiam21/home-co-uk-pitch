// Simple slide navigation + keyboard
document.addEventListener('DOMContentLoaded', ()=>{
  const slides = Array.from(document.querySelectorAll('.slide'))
  let idx = 0
  const show = i => {
    idx = (i + slides.length) % slides.length
    slides.forEach((s, j)=> s.style.display = j===idx? 'flex':'none')
    // focus top for keyboard
    slides[idx].scrollIntoView({behavior:'smooth',block:'center'})
  }
  show(0)

  document.getElementById('next').addEventListener('click', ()=> show(idx+1))
  document.getElementById('prev').addEventListener('click', ()=> show(idx-1))

  document.addEventListener('keydown', e=>{
    if(e.key === 'ArrowRight' || e.key === 'PageDown') show(idx+1)
    if(e.key === 'ArrowLeft' || e.key === 'PageUp') show(idx-1)
  })

  // smooth contact form demo (no backend)
  const form = document.getElementById('contactForm')
  if(form) form.addEventListener('submit', e=>{
    e.preventDefault()
    const btn = form.querySelector('button')
    btn.disabled = true; btn.textContent = 'Sending...'
    setTimeout(()=>{ btn.textContent='Sent'; btn.disabled=false; form.reset() }, 900)
  })
})
