const playButton = document.querySelector('.play');
const second = document.querySelector('.sec');
const minutes = document.querySelector('.min');
const restart = document.querySelector('.restart');

const statusWork = document.querySelector('.work');
const statusBreak = document.querySelector('.break');

const longTem = document.querySelector('.long-secion');
const shortTem = document.querySelector('.short-secion');

const decrementSecions = document.querySelector('.decrement');
const incrementSecions = document.querySelector('.increment');
const numSecions = document.querySelector('.num-secions');
const secions = document.querySelector('.secions');

//Iniiamos las variables para establecer los tiempos.
let minutesInitialWork = '25';
let secondInitial = '00';
let minutesInitialBreak = '05';

//Función para establecer el tiempo de una seción
function setTimeSecion() {
	if(this.innerText === 'LONG SECION') {
		longTem.classList.add('active');
		shortTem.classList.remove('active');

		minutesInitialWork = '50';
		minutesInitialBreak = '10';
	} else {
		longTem.classList.remove('active');
		shortTem.classList.add('active');

		minutesInitialWork = '25';
		minutesInitialBreak = '05';
	}


	minutes.innerText = minutesInitialWork;
	second.innerText = secondInitial;

	//Paramos el setInterval 
	clearInterval(timer);

	//Restablecemos los valores de restart
	restart.classList.remove('view');
	restart.disabled = true;

	//Restablecer los valores de pause
	pause = true;
	playButton.innerHTML = 'Play <i class="fa-sharp fa-solid fa-play">';
}

//Función para estabecer en numero de seciones
function setNumSecions(e) {
	if(this.innerText === '-' && Number(numSecions.innerText) <= 10 && Number(numSecions.innerText) > 1) {
		numSecions.innerText = Number(numSecions.innerText) - 1;
	} else if(this.innerText === '+' && Number(numSecions.innerText) < 10 && Number(numSecions.innerText) >= 1) {
		numSecions.innerText = Number(numSecions.innerText) + 1;
	} else {
		alert('El numero de secioones debe ser de 1 a 10');
		return;
	}

	secions.innerText = numSecions.innerText;
}

//Añadimos la función que maneja el tiepo a los respectivos elementos encargados de eso
longTem.addEventListener('click', setTimeSecion);
shortTem.addEventListener('click', setTimeSecion);

//Añadimos la función para establecer el número de seciones a los elementos respectivos
decrementSecions.addEventListener('click', setNumSecions);
incrementSecions.addEventListener('click', setNumSecions);

//Establecemos valores iniciales
minutes.innerText = minutesInitialWork;
second.innerText = secondInitial;
secions.innerText = numSecions.innerText;

//Iniciamos y definimos variables para que sean utilizadas por el botón de play
let pause = true;
let timer;

playButton.addEventListener('click', () => {
	pause = !pause;

	incrementSecions.disabled = true;
	decrementSecions.disabled = true;

	//Manejamos lo cambios de estado dependiendo de si esta en pausa o no
	if(pause) {	
		playButton.innerHTML = 'Play <i class="fa-sharp fa-solid fa-play">';
		clearInterval(timer)
		return;
	} else {
		playButton.innerHTML = 'Pause <i class="fa-sharp fa-solid fa-pause"></i>'
	}

	timer = setInterval(() => {
		let statusActiveBreak = statusBreak.classList.contains('active');

		//Verificamos si el tiempo ya termino 
		if(second.innerText === '00' && minutes.innerText === '00' && statusActiveBreak === false) {
			//Cuando llege a la última seción cuando se acabe el tiepo le indicamos que se termino
			if(secions.innerText === '1') {
				alert('Felicidades, terminaste tu seciones');
				clearInterval(timer);

				//Restablecemos el tiempo al timpo inicial de trabajo
				second.innerText = secondInitial;
				minutes.innerText = minutesInitialWork;

				//Activamos lo botones para definir la cantidad de seciones
				incrementSecions.disabled = false;
				decrementSecions.disabled = false;

				//Ponemos pausa y restablecemos el botón de play
				pause = true;
				playButton.innerHTML = 'Play <i class="fa-sharp fa-solid fa-play">';

				//Deshabilitamos el botón de restart
				restart.disabled = true;
				restart.classList.remove('view');
				return;
			}

			second.innerText = secondInitial;
			minutes.innerText = minutesInitialBreak;
			statusBreak.classList.add('active')
			statusWork.classList.remove('active');

			return;
		} else if(second.innerText === '00' && minutes.innerText === '00' && statusActiveBreak === true) {
			second.innerText = secondInitial;
			minutes.innerText = minutesInitialWork;
			statusBreak.classList.remove('active')
			statusWork.classList.add('active');
			//Restarle uno a el número de seciones
			secions.innerText = Number(secions.innerText) -1;
		}

		if(second.innerText === '00') {
			second.innerText = '59';
			minutes.innerText = Number(minutes.innerText) - 1;

			//Si minutos si son menor que 10 tienen la forma '0x', donde x es un número entre 0 y 9
			if(Number(minutes.innerText) < 10) {
				minutes.innerText = '0' + minutes.innerText;
			}

		} else {
			second.innerText = Number(second.innerText) - 1;
			//Si los segundos son menor que 10 tienen la forma '0x', donde x es un número entre 0 y 9
			if(Number(second.innerText) < 10) {
				second.innerText = '0' + second.innerText;
			}
		}
		
	}, 10)

	//Habilitar el boton de restart
	restart.classList.add('view');
	restart.disabled = false;
})

//Añadimos la funcionalidad al boton de restart
restart.addEventListener('click', () => {
	//Reinicimos el timer a sus valores iniciales
	minutes.innerText = minutesInitialWork;
	second.innerText = secondInitial;

	//Deshabilitamos el botón de restart
	restart.classList.remove('view');
	restart.disabled = true;

	//Cambiamos el valor a pausado
	pause = true;
	clearInterval(timer);

	//Restablecemos lo botones a su valores de inicio
	playButton.innerHTML = 'Play <i class="fa-sharp fa-solid fa-play">';
	playButton.disabled = false; //Esto en caso de que haya llegado al final de la sección
	statusWork.classList.add('active');
	statusBreak.classList.remove('active');
	incrementSecions.disabled = false;
	decrementSecions.disabled = false;
})

//Programar el número de seciones
//Cada seción esta conformada por una etapa de trabaja y una etapa de descanzo
