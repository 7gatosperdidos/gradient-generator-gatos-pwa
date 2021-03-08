// service worker es el encargado de cachear informacion 
// y trabajar de forma "offline"
const CACHE_NAME = "v1_cache_pintadorgatos_app_vue";
const urlToCache = [
	// cachea la pantalla
	"./",
	"./?umt_source=web_app_manifest",
	"./pages/fallback.html",
	"./pages/css/style.css",
	// achea las imagenes
	"./img/favicon.png",
	"./img/icon32.png",
	"./img/icon64.png",
	"./img/icon128.png",
	"./img/icon192.png",
	"./img/icon256.png",
	"./img/icon512.png",
	"./img/icon1024.png",
	// la logica a cachear
	"./js/main.js",
	"./js/mount.js",
	// cachear el css
	"./css/style.css",
	//"https://necolas.github.io/normalize.css/latest/normalize.css",
	// los enlaces que tiene la pp
	"https://unpkg.com/vue@next",
	"./manifest.json"
];

///// tenemos que utilizar eventos ahora

// self se refiere al servidw worker.. al archivo en donde estamos
// arranca a ejecutar todo del lado del navegador
self.addEventListener("install", e => {
	// escucha y va a ejecutar mientras se instala el serviceworker
	e.waitUntil(
		caches.open(CACHE_NAME).then(
			cache => cache.addAll(urlToCache).then(
				// skip es un metodo de nuestro cache
				()=> self.skipWaiting()
			).catch(
				err => console.log(err)
			)
		)
	)
});

// se empieza a comparar el cache.. 

self.addEventListener("activate", e=> {
	// esta variable va a almacenar todo lo que 
	// tengamos en el cache.. 
	const cacheWhiteList = [CACHE_NAME];
	e.waitUntil(
		// keys obtiene todo lo que tiene nombre de cache
		caches.keys().then(
			cacheNames => {
				return Promise.all(
					/// el punto map nos permite ver uno por uno los URL
					cacheNames.map(
						cacheName => {
							if (cacheWhiteList.indexOf(cacheName) === -1) {
								return caches.delete(cacheName);
							}
						}
					)
				)
			} 
		).then(
			()=> self.clients.claim()
		)
	)
})

/// evento fetch para descargar todo

self.addEventListener("fetch", e=>{
	e.respondWith(
		caches.match(e.request).then(
			res => {
				if (res) {
					return res
				}
				// la funcion recibe una entrada y responde informacion
				return fetch(e.request)
			}
		).catch(
			() => caches.match("./pages/fallback.html")
		)
	)
})