let contenedorFarmacia = document.getElementById('contenedorJuguete')

let dataApi;
let arrayProductos;
let searchBar = document.getElementById('searchBar')
let inputSearch = ''

async function getDataApi() {

   await fetch('https://apipetshop.herokuapp.com/api/articulos')
      .then(response => response.json())
      .then(json => dataApi = json)

   arrayProductos = dataApi.response

   let arrayJuguetes = arrayProductos.filter(element => element.tipo == 'Juguete')

   searchBar.addEventListener('keyup', (e) => {

      inputSearch = e.target.value
      console.log(inputSearch)
      filterCards()

   })

   function filterCards() {
      let arrayFiltros = []
      if (inputSearch !== '') {
         arrayFiltros.push(...arrayJuguetes.filter(element => element.nombre.toLowerCase().includes(inputSearch.trim().toLowerCase())))

      } else {
         arrayFiltros.push(...arrayJuguetes)
      }
      crearCards(arrayFiltros)

   }

   filterCards()

}

getDataApi()


function crearCards(array) {
   let templateCard = ''
   array.forEach(element => {

        templateCard += `
      <div class="col-lg-3 col-md-6 col-sm-12 my-2">
      <div class="card">
      <img
      src="${element.imagen}"
      class="card-img-top border" alt="${element.nombre}">
      <div class="card-body">
      ${element.stock < 5 ? `<p class="ultimas-unidades"><small>ULTIMAS UNIDADES</small></p>` : `<p>STOCK: ${element.stock}</p>`}
      <h4 class="card-title mb-3">$${element.precio}</4>
      <h6 class="card-text mb-3">${element.nombre}</h6>
      <div class="d-flex justify-content-center">
      <a href="./detalles.html?id=${element._id}" class="btn btn-primary">Ver más</a>
      </div>
      </div>
      </div>
      </div>
      
      `
   })
   if (templateCard.length > 0 ){
      contenedorFarmacia.innerHTML = templateCard
   }
   else {
      let newTemplate =`
      <h3 class="text-center">No encontramos resultado de busqueda para "${inputSearch}"</h3>
      `
      contenedorFarmacia.innerHTML = newTemplate
   }
}