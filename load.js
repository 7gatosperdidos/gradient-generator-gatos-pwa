// navigator es un objeto del navegador que pregunta
// si existe un un "service worker"
// Le pregunta al navegador.. si soporta el serrvice worker
if ("serviceWorker" in navigator) {
	// register recibe como parametro url pero del service worker el archivo
	// retorna una promesa el registar y va el famoso .then 
	navigator.serviceWorker.register("./sw.js").then(
		reg => console.log("Registro Exitoso!")
		).catch(
		err => console.log(err)
		);
						
		
}