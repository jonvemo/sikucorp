const d = document

// Activador de Service Worker, encargado de la PWA (Progressive Web Apps)
// Comentar este código en caso de modificar elementos hasta haberlos completado, si los cambios no se reflejas elimine los datos de navegación que tenga de la web
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('./sw.js')
  .then(reg=>console.log('Success',reg))
  .catch(err=>console.warn('Error',err))
}

// Generador de categorías
const $main = d.querySelector('main')
const getHTML = (options) => {
  let {url,success,error} = options
  const xhr = new XMLHttpRequest()
  xhr.addEventListener('readystatechange',e=>{
    if(xhr.readyState !==4) return
    if(xhr.status >= 200 && xhr.status < 300){
      let html = xhr.responseText
      success(html)
    } else {
      let message = xhr.statusText || 'Error'
      error(`Error ${xhr.status}: ${message}`)
    }
  })
  
  xhr.open('GET',url)
  xhr.setRequestHeader('Content-type','text/html; charset=utf-8')
  xhr.send()
}
d.addEventListener('DOMContentLoaded',e=>{
  // Contenido que carga por defecto de una categoría, dejar comentado si no quiere cargar contenido por defecto.
  getHTML({
    url: 'assets/home.html',
    success: (html)=>$main.innerHTML = html,
    error: (err)=>$main.innerHTML = `<h1>${err}</h1>`
  })
})
d.addEventListener('click',e=>{
  // Botón del menú en teléfonos.
	if(e.target.matches('#showMenu')){
    const menu = d.querySelector('.header__nav')
    menu.classList.toggle('active')
		showMenu.classList.toggle('fa-bars')
		showMenu.classList.toggle('fa-times')
	}
  // Botones generadores de categorías.
  if(e.target.matches('.header__link')){
    e.preventDefault()
    getHTML({
      url: e.target.href,
      success: (html)=>$main.innerHTML = html,
      error: (err)=>$main.innerHTML = `<h1>${err}</h1>`
    })
  }
})