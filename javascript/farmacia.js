let contenedorFarmacia = document.getElementById('contenedorFarmacia')

let templateCard = ''
let dataApi;
let arrayProductos;


async function getDataApi() {

   await fetch('https://apipetshop.herokuapp.com/api/articulos')
      .then(response => response.json())
      .then(json => dataApi = json)

   arrayProductos = dataApi.response

   let arrayMedicamentos = arrayProductos.filter(element => element.tipo == 'Medicamento')

   arrayMedicamentos.forEach(element => {

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
                  <a href="./details.html?id=${element._id}" class="btn btn-primary">Ver más</a>
               </div>
         </div>
      </div>
   </div>
      
      `
      contenedorFarmacia.innerHTML = templateCard
   })

}

getDataApi()