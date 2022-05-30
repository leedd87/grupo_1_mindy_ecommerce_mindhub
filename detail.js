let dataApi;
let arrayProductos;
let containedorDetail = document.getElementById('container-detail')
let dato

async function getDataApi() {

   await fetch('https://apipetshop.herokuapp.com/api/articulos')
      .then(response => response.json())
      .then(json => dataApi = json)

   arrayProductos = dataApi.response

   console.log(arrayProductos)

   dato = location.search.split('?id=')[1]

   let producto = arrayProductos.find(element => {

      return element._id == dato
   })

   imprimirDetails(producto)


}

getDataApi()

function imprimirDetails(producto) {

   let templateDetail = `
   <div class="container d-flex justify-content-center align-items-center mt-5">
   <div class="card mb-3 card-detail">
      <div class="row g-0 align-items-center justify-content-center flex-lg-nowrap ">
         <div class="col-md-6 img-detail">
            <img
               src="${producto.imagen}"
               class="img-fluid rounded-start" alt="${producto.nombre}">
         </div>
         <div class="col-md-6">
            <div class="card-body pb-5 pb-lg-0">
               <h5 class="card-title">${producto.nombre}</h5>
               <p class="card-text">${producto.descripcion}</p>
               <p>$${producto.precio}</p>
               <p>Cantidad: ${producto.stock}</p>
               <a href="#" class="btn btn-primary">Agregar al Carrito</a>
               <button onclick='clickee()'>Agregar al Carrito</button>
            </div>
         </div>
      </div>
   </div>
   </div>

   `
   containedorDetail.innerHTML = templateDetail;



}


//-------------NO COPIAR----------------------//
let arrayCarrito = []

function localStorage() {

   localStorage.setItem('carrito', JSON.stringify(arrayCarrito))

}

function clickee() {
   console.log(dato)
   arrayCarrito.push(dato)
   localStorage.setItem('carrito', JSON.stringify(arrayCarrito))
}