//Rehusa el local storage
var nombreLocalst = localStorage.getItem('nombre');
nombreLocalst = nombreLocalst.toUpperCase();
console.log(nombreLocalst);

//sacar un alertify al iniciar la pantalla
//modifica el mensaje ganador
//modifica el winner
document.getElementById('ganador__title__id').innerHTML = "¡FELICIDADES "+nombreLocalst+"!";
nombreLocalst += ", Ayuda a los animalitos y llevalos a sus casas.";

//Inicializar varibales

var puntaje = 0; //Determina el puntaje del jugador
var objeto = 0; //Sirve como auxiliar a la hora de saber que objeto fue el seleccionado en el drag and drop
var animales = [{
        nombre: "Abeja",
        imagen: "images/abeja.png",
        codigo: 1
    }, {
        nombre: "Chango",
        imagen: "images/chango.png",
        codigo: 2
    }, {
        nombre: "Hormiga",
        imagen: "images/hormiga.png",
        codigo: 3
    }, {
        nombre: "lobo",
        imagen: "images/lobo.png",
        codigo: 4
    }, {
        nombre: "oso",
        imagen: "images/oso.png",
        codigo: 5
    }, {
        nombre: "serpiente",
        imagen: "images/serpiente.png",
        codigo: 6
    }, {
        nombre: "osoPolar",
        imagen: "images/osoPolar.png",
        codigo: 7
    }, {
        nombre: "pecesito",
        imagen: "images/pecesito.png",
        codigo: 8
    }, {
        nombre: "perro",
        imagen: "images/perro.png",
        codigo: 9
    }, {
        nombre: "rana",
        imagen: "images/rana.png",
        codigo: 10
    }

];

var habitad = [{
    nombre: "Abeja",
    imagen: "images/abeja-habitat.png",
    codigo: 1
}, {
    nombre: "Chango",
    imagen: "images/chango-habitat.png",
    codigo: 2
}, {
    nombre: "Hormiga",
    imagen: "images/hormiga-habitat.png",
    codigo: 3
}, {
    nombre: "lobo",
    imagen: "images/lobo-habitat.png",
    codigo: 4
}, {
    nombre: "oso",
    imagen: "images/oso-habitat.png",
    codigo: 5
}, {
    nombre: "serpiente",
    imagen: "images/serpiente-habitat.png",
    codigo: 6
}, {
    nombre: "osoPolar",
    imagen: "images/osoPolar-habitat.png",
    codigo: 7
}, {
    nombre: "pecesito",
    imagen: "images/pecesito-habitat.png",
    codigo: 8
}, {
    nombre: "perro",
    imagen: "images/perro-habitat.png",
    codigo: 9
}, {
    nombre: "rana",
    imagen: "images/rana-habitat.png",
    codigo: 10
}];

//Funciona unicamente cuando se está en el archivo juego

//Aquí va la programacion del juego (angel)
var ganador = document.getElementById('CartelGanador');

///////////////////////Angel///////////////////////////////

//Las posiciones de los animales se guardan en el localStorage
var posiciones = localStorage.getItem("posiciones");
posiciones = JSON.parse(posiciones);

var posicionesHabitad = []; //Vector auxiliar para guardar las posiciones de los habitats


window.onload = obtenerTablero; //Primero se manda a llamar a la funcion Obtener Tablero


function obtenerTablero() { //Se encarga de obtener y desplegar el tablero aleatorio de los animales y habitats
    //reproducir musiquita
    const music = new Audio("sonidos/fondo.mp3");
    music.play();
    music.loop =true;
    music.volume=.1;
    //Nota: Obtenemos los 6 animales de una, los del nivel 1 y 2.
    swal("Nivel 1",nombreLocalst);

    posiciones == null; //Inicializamos el arreglo en nulo cada que se carga la pagina
    posiciones = [];

    //Obtenemos los 6 animales aleatorios
    for (var i = 0; i < 6; i++) {
        var posicion = Math.floor(Math.random() * 10); //Numero aleatorio del 0 al 9
        if (comprueba(posicion)) { //Funcion que comprueba que NO exista la posicion en el arreglo de posiciones
            //Si es true, entonces agregamos el nuevo dato aleatorio. NO repetido
            posiciones.push(posicion);
            localStorage.setItem("posiciones", JSON.stringify(posiciones));

            var obj = document.getElementById("animal" + i);
            obj.src = animales[posicion].imagen; //Le colocamos la imagen a la etiqueta img

            obj.setAttribute("class", animales[posicion].codigo - 1);
            //El codigo del objeto será su clase (sirve para el Drag&Drop) y se le resta uno para que coincida con el numero aleatorio
            //Ya que los numeros aleatorios van de 0 - 9
            //Y los codigos de los objetos los puse de 1 - 10

        } else {
            i--;
        }
    }
    console.log(posiciones);

    //Colocamos los habitas correspondientes, segun el arreglo "posiciones" que llenamos previamente
    for (var i = 0; i < 6; i++) {
        var animal = posiciones[i]; //Guardamos cada posicion del arreglo para saber que animal es

        var posicionHabitad = Math.floor(Math.random() * 6);
        //En este caso queremos que los habitas se generen en posicione aleatorias, 
        //si no, se van a colocar en el mismo orden que los animales
        if (compruebaHabitad(posicionHabitad)) {
            posicionesHabitad.push(posicionHabitad);

            var obj = document.getElementById("habitat" + posicionHabitad);
            canvas = obj;
            lienzo = canvas.getContext('2d');
            //imagen
            var imag = document.getElementById(habitad[animal].imagen);
            //var img = new Image();
            //img.src = habitad[animal].imagen;
            lienzo.drawImage(imag, 0, 0,300,300);
            //Colocamos la imagen del habitat

            obj.setAttribute("class", habitad[animal].codigo - 1);
            //Le colocamos la misma clase que su correspondiente animal
            //Esto nos servirá en el drag&drop. 

            console.log(posicionHabitad);



        } else {
            i--;
        }
    }
    //Acabado esto, llamamos la siguiente funcion
    inicializaJuego();
}

function compruebaHabitad(posicionHabitad) {
    if (posicionesHabitad == null) {
        return true;
    } else {
        if (posicionesHabitad.includes(posicionHabitad)) {
            return false;
        } else {
            return true;
        }
    }
}

function comprueba(posicion) {
    if (posiciones == null) {
        return true;
    } else {
        if (posiciones.includes(posicion)) {
            return false;
        } else {
            return true;
        }
    }
}


/////////////////////////Funciones drag and drop ///////////////////////////////
function start(e) {
    e.dataTransfer.effecAllowed = 'move'; // Define el efecto como mover (Es el por defecto)
    e.dataTransfer.setData("Data", e.target.className); // Coje el nombre de clase que se va a mover
    objeto = e.target.className; //La guardamos en objeto para poder recuperarlo mas adelante y hacer la comparacion

    console.log(objeto);

    e.dataTransfer.setDragImage(e.target, 130, 130); // Define la imagen que se vera al ser arrastrado el elemento y por donde se coje el elemento que se va a mover (el raton aparece en la esquina sup_izq con 0,0)
    e.target.style.opacity = '0.4';
    monito=e.target; //guardamos en monito el tarjet del la imagen para despues ocultarla
}

function end(e) {
    e.target.style.opacity = ''; // Pone la opacidad del elemento a 1 	
    e.dataTransfer.clearData("Data");


}

function enter(e) {
    e.target.style.border = '3px dotted #555';
}

function leave(e) {
    e.target.style.border = '';
    document.getElementById('CajaJuego').className = "juego";
}

function over(e) {
    // var elemArrastrable = e.dataTransfer.getData("Data"); // Elemento arrastrado
    var id = e.target.className; // Obtebemos la clase del elemento sobre el que se arrastra
    console.log(e.target.className);
    document.getElementById('CajaJuego').className = "juego";
    if (id == objeto) { //Si ambos son iguales, quiere decir que estamos encima del habitat correcto
        console.log("Coincide");
        // document.getElementById('CajaJuego').className = "juego juego__correct";
        aux2=0;
        return false;
    } else { //Si no... pos no
        console.log("No coincide");
        aux2=1;
        return false;
    }


}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function drop(e) {
    if(aux2==1){
        document.getElementById('CajaJuego').className = "juego juego__incorrect";
        const music = new Audio("sonidos/error.mp3");
        music.play();
        music.loop =false;
        music.volume=1;
        e.target.style.border = 'none';
        e.target.appendChild(document.getElementById(elementoArrastrado));
    }
    else{
        document.getElementById('CajaJuego').className = "juego juego__correct";
        puntaje++; //Al activarse esta funcion significa que soltamos el animal en el habitat correcto, asique, sumamos uno al puntaje
        document.getElementById('puntaje').innerHTML = (puntaje * 100) + " / 600 puntos"; // Elemento arrastrado
        monito.style.visibility = 'hidden'; //ocultamos la imagen del animal
        inicializaJuego();
        //imprimimos el nombre del animal
        var nombreAnimal = e.target.className;
        document.getElementById("juego__nombreAnimal").innerHTML = animales[nombreAnimal].nombre;
        //reproducimos sonido
        ruta ="sonidos/";
        ruta += animales[nombreAnimal].nombre;
        ruta +=".mp3";
        const music = new Audio(ruta);
        music.play();
        music.loop =false;
        //agregamos animal a su habitat
        var imagenanimal = document.getElementById(animales[nombreAnimal].imagen);
        //pintamos en el lienzo
        canvas = document.getElementById(e.target.id);
        lienzo = canvas.getContext('2d');
        lienzo.drawImage(imagenanimal,100,100,100,100);
    
        e.target.style.border = 'none'; // Quita el borde
        e.target.appendChild(document.getElementById(elementoArrastrado)); //Donde me da error
        if(puntaje == 3){
            sleep(1000);
        }
    }
}



function inicializaJuego() {
    //Nivel 1
    //Con este for, ocultamos los animales y habitats de la posicion 3 a 5. Para asi quedarnos con 3 animales
    if (puntaje == 0) {
        //muestra el nivel en el que estás
        document.getElementById('juego__txt').innerHTML = "NIVEL 1";
        for (var i = 0; i < 3; i++) {
            var aux = posiciones[i];
            var objetos = document.getElementsByClassName(aux);
            console.log(objetos);
            objetos[0].style.display = "none";
            objetos[1].style.display = "none";
        }
    }
    // Nivel 2
    //Con esstos for hacemos algo similar al anterior. Primero mostramos los 3 animales que estaban ocultos
    //Y despues ocultamos los del nivel anterior
    if (puntaje == 3) {
        const music = new Audio("sonidos/aplausos.mp3");
        music.play();
        music.loop =false;
        swal("NIVEL 2");
        document.getElementById('juego__txt').innerHTML = "NIVEL 2";
        for (var i = 0; i < 3; i++) {
            var aux = posiciones[i];
            var objetos = document.getElementsByClassName(aux);
            console.log(objetos);
            objetos[0].style.display = ''
            objetos[1].style.display = '';
        }
        for (var i = 3; i < 6; i++) {
            var aux = posiciones[i];
            var objetos = document.getElementsByClassName(aux);
            console.log(objetos);
            objetos[0].style.display = "none";
            objetos[1].style.display = "none";
        }

    }
    if (puntaje == 6) {        
        document.getElementById('juego__button').style.opacity = 1;
        document.getElementById('juego__button').classList.add('blurCSS');
        document.getElementById('blured').classList.add('blured');
    }


}

//prueba
//abre el winner
document.getElementById('juego__button').addEventListener('click', function () {
    if (puntaje == 6) {
        ganador.className = 'ganador';
        const music = new Audio("sonidos/fin.mp3");
        music.play();
        music.loop =false;
    } else {
        swal("Te faltan animalitos");
    }
});


//cierra el winner
document.getElementById('ganador__reiniciar').addEventListener('click', function () {
    window.location.href = "index.html";
});


document.getElementById('ganador__creditos').addEventListener('click', function () {
    window.location.href = "creditos.html";
});