console.log("ACORDEONES V3 CARGADO");
const configuracion = [
    {
        id: "web",
        card: "web-card",
        pregunta: "pregunta-web",
        telefono: "5215624638834"
    },
    {
        id: "diseno",
        card: "diseno-card",
        pregunta: "pregunta-diseno",
        telefono: "5215624638834"
    },
    {
        id: "soporte",
        card: "soporte-card",
        pregunta: "pregunta-soporte",
        telefono: "5215624638834"
    }
];

configuracion.forEach(iniciarServicio);

function iniciarServicio(config){

    const tarjeta = document.getElementById(config.card);

    if(!tarjeta) return;

    const titulo = tarjeta.querySelector(".titulo-acordeon");
    const contenido = tarjeta.querySelector(".contenido-acordeon");
    const contenedor = document.getElementById(config.pregunta);

    let indice = 0;
    let respuestas = [];

    function mostrarPregunta(){

        const pregunta = servicios[config.id].preguntas[indice];

        let html = `
            <p><strong>${pregunta.pregunta}</strong></p>
        `;

        pregunta.opciones.forEach(opcion=>{

            html += `
                <button class="opcion" data-opcion="${opcion}">
                    ${opcion}
                </button>
            `;

        });

        contenedor.innerHTML = html;

        contenedor.querySelectorAll(".opcion").forEach(boton=>{

            boton.addEventListener("click",function(){

                respuestas.push(this.dataset.opcion);

                indice++;

                if(indice < servicios[config.id].preguntas.length){

                    mostrarPregunta();

                }else{

                    let resumen = `<h3>Resumen</h3>`;

                    servicios[config.id].preguntas.forEach((p,i)=>{

                        resumen += `
                            <p>
                                <strong>${p.pregunta}</strong><br>
                                ${respuestas[i]}
                            </p>
                        `;

                    });

                    resumen += `
                        <button id="whatsapp-${config.id}">
                            📲 Enviar por WhatsApp
                        </button>
                    `;

                    contenedor.innerHTML = resumen;

                    document
                    .getElementById(`whatsapp-${config.id}`)
                    .addEventListener("click",function(){

                        let mensaje = `Hola, me interesa el servicio de ${servicios[config.id].titulo}.\n\n`;

                        servicios[config.id].preguntas.forEach((p,i)=>{

                            mensaje += `${p.pregunta}\n${respuestas[i]}\n\n`;

                        });

                        window.open(
                            `https://wa.me/${config.telefono}?text=`+
                            encodeURIComponent(mensaje),
                            "_blank"
                        );

                    });

                }

            });

        });

    }

    titulo.addEventListener("click",function(){

        if(contenido.style.display==="block"){

            contenido.style.display="none";
            titulo.innerHTML=`${servicios[config.id].titulo} ▼`;

        }else{

            contenido.style.display="block";
            titulo.innerHTML=`${servicios[config.id].titulo} ▲`;

            indice=0;
            respuestas=[];

            mostrarPregunta();

        }

    });

}
