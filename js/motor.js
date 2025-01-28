document.addEventListener("DOMContentLoaded", function () {
    // Crear el contenedor principal
    const contenedor1 = document.createElement("div");
    contenedor1.className = "contenedor1";
    document.body.appendChild(contenedor1);

    // Crear el título principal
    const titulo = document.createElement("h1");
    titulo.className = "titulo";
    titulo.textContent = "Horóscopo y Signos del Zodíaco";
    contenedor1.appendChild(titulo);

    // Contenedor de la información
    const contenedorInfo = document.createElement("div");
    contenedorInfo.className = "contenedorInfo";
    contenedor1.appendChild(contenedorInfo);

    // Contenedor de las imágenes de los signos
    const contenedorImg = document.createElement("div");
    contenedorImg.className = "contenedorImg";
    contenedorInfo.appendChild(contenedorImg);

    // Contenedor de la descripción del signo
    const contenedorDescripcion = document.createElement("div");
    contenedorDescripcion.id = "contenedorDescripcion";
    contenedorDescripcion.className = "contenedorDescripcion";
    contenedorInfo.appendChild(contenedorDescripcion);

    // Cargar datos desde XML
    let conexion = new XMLHttpRequest();
    conexion.open("GET", "zodiaco.xml", true);
    conexion.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const xmlDoc = conexion.responseXML;
            const zodiaco = xmlDoc.querySelectorAll("signo");

            zodiaco.forEach((signo) => {
                const nombre = signo.querySelector("nombre").textContent;
                const imagenSrc = signo.querySelector("imagen").getAttribute("src");
                const fecha = signo.querySelector("fecha").textContent;

                const contenedorSig = document.createElement("div");
                contenedorSig.className = "contenedorSig";

                const img = document.createElement("img");
                img.src = imagenSrc;
                img.alt = nombre;
                img.addEventListener("click", () => mostrarDescripcion(signo));

                const nombreEl = document.createElement("h3");
                nombreEl.textContent = nombre;

                const fechaEl = document.createElement("p");
                fechaEl.textContent = fecha;

                contenedorSig.appendChild(img);
                contenedorSig.appendChild(nombreEl);
                contenedorSig.appendChild(fechaEl);
                contenedorImg.appendChild(contenedorSig);
            });

            function mostrarDescripcion(signo) {
                contenedorDescripcion.innerHTML = "";

                const imagen = signo.querySelector("imagen").getAttribute("src");
                const nombre = signo.querySelector("nombre").textContent;
                const fecha = signo.querySelector("fecha").textContent;
                const prediccion = signo.querySelector("prediccion").textContent;
                const descripcion = signo.querySelector("descripcion").textContent;

                const imagenEl = document.createElement("img");
                imagenEl.src = imagen;
                imagenEl.alt = nombre;

                const nombreEl = document.createElement("h2");
                nombreEl.textContent = nombre;

                const fechaEl = document.createElement("p");
                fechaEl.innerHTML = "<strong>FECHA:</strong><br>" + fecha;

                const prediccionEl = document.createElement("p");
                prediccionEl.innerHTML = "<strong>PREDICCIÓN DE HOY:</strong><br>" + prediccion;

                const descripcionEl = document.createElement("p");
                descripcionEl.innerHTML = "<strong>CARACTERÍSTICAS DEL SIGNO:</strong><br>" + descripcion;

                contenedorDescripcion.appendChild(imagenEl);
                contenedorDescripcion.appendChild(nombreEl);
                contenedorDescripcion.appendChild(fechaEl);
                contenedorDescripcion.appendChild(prediccionEl);
                contenedorDescripcion.appendChild(descripcionEl);
            }
        }
    };
    conexion.send();

    // Crear formulario de entrada para calcular signos
    const contenedor = document.createElement("div");
    contenedor.id = "app";
    document.body.appendChild(contenedor);

    const titulo3 = document.createElement("h2");
    titulo3.textContent = "¿Cuál es mi signo del zodíaco? ¿Y mi horóscopo chino?";
    contenedor.appendChild(titulo3);

    const labelFecha = document.createElement("label");
    labelFecha.textContent = "Introduce tu fecha de nacimiento: ";
    labelFecha.setAttribute("for", "fechaNacimiento");
    contenedor.appendChild(labelFecha);

    const inputFecha = document.createElement("input");
    inputFecha.setAttribute("type", "date");
    inputFecha.setAttribute("id", "fechaNacimiento");
    inputFecha.addEventListener("change", calcularSignos);
    contenedor.appendChild(inputFecha);

    contenedor.appendChild(document.createElement("br"));

    const resultadoZodiaco = document.createElement("p");
    resultadoZodiaco.textContent = "Tu signo del zodíaco es: ";
    contenedor.appendChild(resultadoZodiaco);

    const resultadoChino = document.createElement("p");
    resultadoChino.textContent = "Tu horóscopo chino es: ";
    contenedor.appendChild(resultadoChino);

    function calcularSignos() {
        const fecha = new Date(inputFecha.value);
        const mes = fecha.getMonth() + 1;
        const dia = fecha.getDate();

        const signos = [
            ["Capricornio", 19], ["Acuario", 18], ["Piscis", 20], ["Aries", 19],
            ["Tauro", 20], ["Géminis", 20], ["Cáncer", 22], ["Leo", 22],
            ["Virgo", 22], ["Libra", 22], ["Escorpio", 21], ["Sagitario", 21], ["Capricornio", 31]
        ];

        let signoZodiaco = signos[mes - 1][0];
        if (dia > signos[mes - 1][1]) {
            signoZodiaco = signos[mes][0];
        }

        const añosChinos = ["Mono", "Gallo", "Perro", "Cerdo", "Rata", "Buey",
            "Tigre", "Conejo", "Dragón", "Serpiente", "Caballo", "Cabra"];
        const añoNacimiento = fecha.getFullYear();
        const signoChino = añosChinos[añoNacimiento % 12];

        resultadoZodiaco.textContent = "Tu signo del zodíaco es: " + signoZodiaco;
        resultadoChino.textContent = "Tu horóscopo chino es: " + signoChino;
    }

    // Tabla de horóscopo chino
    const tituloTabla = document.createElement("h3");
    tituloTabla.textContent = "El Horóscopo chino";
    contenedor.appendChild(tituloTabla);

    const tabla = document.createElement("table");
    tabla.style.borderCollapse = "collapse";

    const signosChinos = [
        ["Rata", "Buey", "Tigre"],
        ["Conejo", "Dragón", "Serpiente"],
        ["Caballo", "Cabra", "Mono"],
        ["Gallo", "Perro", "Cerdo"]
    ];

    const imagenes = [
        "img/ico-rata.png", "img/ico-buey.png", "img/ico-tigre.png",
        "img/ico-conejo.png", "img/ico-dragon.png", "img/ico-serpiente.png",
        "img/ico-caballo.png", "img/ico-cabra.png", "img/ico-mono.png",
        "img/ico-gallo.png", "img/ico-perro.png", "img/ico-cerdo.png"
    ];

    let index = 0;
    signosChinos.forEach(filaSignos => {
        const fila = document.createElement("tr");
        filaSignos.forEach(signo => {
            const celda = document.createElement("td");
            const img = document.createElement("img");
            img.src = imagenes[index++];
            img.alt = signo;
            celda.appendChild(img);
            celda.appendChild(document.createTextNode(signo));
            fila.appendChild(celda);
        });
        tabla.appendChild(fila);
    });

    contenedor.appendChild(tabla);
});
