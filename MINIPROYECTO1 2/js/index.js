window.onload = imprimir;

function imprimir() {
    canvas = document.getElementById('lienzo');
    lienzo = canvas.getContext('2d');
    //logo
    var img = document.getElementById("logo");
    lienzo.drawImage(img, 345, 70, 700, 250);
    //texto 
    lienzo.textAlign = "center";
    lienzo.font = "30px roboto";
    lienzo.fillText("Ingresa tu nombre: ", 700, 400);
}

document.getElementById('container__button').addEventListener("click", function () {

    //comprueba si existe texto en el input
    if (document.getElementById('container__input').value != "") {
        //Guardar el nombre en el local Storage (arturo)
        localStorage.setItem("nombre", document.getElementById('container__input').value);

        //Redirige a la pestaña juego
        window.location.href = "juego.html";
    } else {
        swal("Datos Erroneos!", "Para jugar escribe tu nombre!", "error");
    }
});