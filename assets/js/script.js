const URL = 'https://swapi.dev/api/people'

// Opcion 1:
const secciones = [
  {
    id: 'principales',
    color: 'salmon',
    indice: function* generator() {
      for (let i = 1; i < 6; i++) {
        yield i;
      }
    }()
  },
  {
    id: 'secundarios',
    color: 'lightgreen',
    indice: function* generator() {
      for (let i = 6; i < 11; i++) {
        yield i;
      }
    }()
  },
  {
    id: 'otros',
    color: 'lightskyblue',
    indice: function* generator() {
      for (let i = 12; i < 17; i++) {
        yield i;
      }
    }()
  }
]

// Opcion 2:
// const secciones = {
//   principales: {
//     actual: 1,
//     maximo: 5,
//     color: 'salmon',
//   },
//   secundarios: {
//     actual: 6,
//     maximo: 10,
//     color: 'lightgreen'
//   },
//   otros: {
//     actual: 12,
//     maximo: 16,
//     color: 'lightskyblue'
//   }
// }

const dibujarPersonaPorId = (selectorHtml, color, personaje) => {
  const elementoHtml = document.querySelector(selectorHtml)

  elementoHtml.innerHTML = elementoHtml.innerHTML + `
    <div class="col-12 col-md-6 col-lg-4 ">
      <div class="single-timeline-content d-flex wow fadeInLeft 2021" data-wow-delay="0.3s"
           style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;">
        <div class="timeline-icon" style="background-color: ${color};"><i class="fa fa-address-card" aria-hidden="true"></i>
        </div>
        <div class="timeline-text">
          <h6>${personaje.name}</h6>
          <p>Estatura: ${personaje.height} cm. Peso: ${personaje.mass} kg</p>
        </div>
      </div>
    </div>
  `
}

const obtenerPersonajePorId = async (id) => {
  try {
    const response = await fetch(`${URL}/${id}`);
    const jsonData = await response.json();

    if (jsonData.detail === 'Not found') { throw Error('Not found') }

    return jsonData
  } catch (e) {
    throw Error(e)
  }
}

const reproducirSable = () => {
  const audio = new Audio('./assets/saber.mp3');
  audio.play();
}

const cerrarModalBienvenido = () => {
  bootstrap.Modal.getInstance(document.getElementById('modalBienvenido')).hide()
}

const cerrarModalError = () => {
  bootstrap.Modal.getInstance(document.getElementById('modalError')).hide()
}

window.onload = () => {
  new bootstrap.Modal('#modalBienvenido').show()

  // Opcion 1:
  secciones.forEach((seccion) => {
    document.querySelector(`#${seccion.id} .timeline-date`).addEventListener("mouseenter", async () => {
      const indice = seccion.indice.next();
      if (indice.value) {
        try {
          const personaje = await obtenerPersonajePorId(indice.value)
          reproducirSable()
          dibujarPersonaPorId(`#${seccion.id} .row`, seccion.color, personaje)
        } catch (e) {
          new bootstrap.Modal('#modalError').show()
        }
      }
    })
  })

  // Opcion 2:
  // document.querySelector('#principales .timeline-date').addEventListener("mouseenter", async () => {
  //   if (secciones.principales.actual <= secciones.principales.maximo) {
  //     const personajeActual = secciones.principales.actual
  //     secciones.principales.actual++
  //     const personaje = await obtenerPersonajePorId(personajeActual)
  //     reproducirSable()
  //     dibujarPersonaPorId('#principales .row', secciones.principales.color, personaje)
  //   }
  // })
  //
  // document.querySelector('#secundarios .timeline-date').addEventListener("mouseenter", async () => {
  //   if (secciones.secundarios.actual <= secciones.secundarios.maximo) {
  //     const personajeActual = secciones.secundarios.actual
  //     secciones.secundarios.actual++
  //     const personaje = await obtenerPersonajePorId(personajeActual)
  //     reproducirSable()
  //     dibujarPersonaPorId('#secundarios .row', secciones.secundarios.color, personaje)
  //   }
  // })
  //
  // document.querySelector('#otros .timeline-date').addEventListener("mouseenter", async () => {
  //   if (secciones.otros.actual <= secciones.otros.maximo) {
  //     const personajeActual = secciones.otros.actual
  //     secciones.otros.actual++
  //     const personaje = await obtenerPersonajePorId(personajeActual)
  //     reproducirSable()
  //     dibujarPersonaPorId('#otros .row', secciones.otros.color, personaje)
  //   }
  // })
}
