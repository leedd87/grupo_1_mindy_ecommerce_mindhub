let dataApi;
let arrayProductos;
let containedorDetail = document.getElementById('container-detail')
let dato
let cantidad = 1
let idArticulo = []
let producto
async function getDataApi() {

   await fetch('https://apipetshop.herokuapp.com/api/articulos')
      .then(response => response.json())
      .then(json => dataApi = json)

   arrayProductos = dataApi.response

   console.log(arrayProductos)

   dato = location.search.split('?id=')[1]

   producto = arrayProductos.find(element => {

      return element._id == dato
   })

   imprimirDetails(producto)

   let select = document.querySelector('.cantidad')
   select.addEventListener('change', e => {
      cantidad = Number(e.target.value)
   })



}

getDataApi()

function imprimirDetails(producto) {
   let templateDetail2 = ""
   for (i = 0; i < producto.stock ; i++) {
      if (i<10){
         templateDetail2 += `
      <option value="${i + 1}">${i + 1}</option>
      `
      }
   }

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
               <button onclick='clickee()'><a href='carrito.html'>Agregar al Carrito</a></button>
               <select class="form-select cantidad" aria-label="Default select example">
   ${templateDetail2}
   </select>
            </div>
         </div>
      </div>
   </div>
   </div>

   `
   containedorDetail.innerHTML = templateDetail;
}

let arrayCarrito = [];

function clickee(){
   if ((localStorage.getItem("carrito"))){
      arrayCarrito = JSON.parse(localStorage.getItem("carrito"))
      idArticulo = arrayCarrito.map(e=>e.id)
      
   }
// suma un click de mas, pero suma.
   if (idArticulo.indexOf(dato) !== -1)  {
      console.log(arrayCarrito[idArticulo.indexOf(dato)])
      console.log(producto.stock)
      if (arrayCarrito[idArticulo.indexOf(dato)].stockActualizado <= 0){
         alert('Llego al limite de stock')
      }
      else {
         let resultado = arrayCarrito[idArticulo.indexOf(dato)].stockActualizado - cantidad
         if (resultado < 0){
            alert('Llego al limite de stock')
         }
         else {
            arrayCarrito[idArticulo.indexOf(dato)].cantidad += cantidad
            arrayCarrito[idArticulo.indexOf(dato)].stockActualizado -= cantidad
         }

      }
      
   }
   else {
      arrayCarrito.push({
         'id': dato,
         'cantidad': cantidad,
         'stockActualizado': producto.stock - cantidad 
      })
   }

   localStorage.setItem('carrito', JSON.stringify(arrayCarrito))

}
