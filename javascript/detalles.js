let containerMiniDetails = document.getElementById('mini-container-details')
let containedorDetail = document.getElementById('container-detail')
let containerTitulo = document.querySelector('.titulo-detalles')
let dataApi;
let arrayProductos;
let dato
let selected;
let cantidad = 1
let idArticulo = []
let producto

async function getDataApi() {

    await fetch('https://apipetshop.herokuapp.com/api/articulos')
        .then(response => response.json())
        .then(json => dataApi = json)

    arrayProductos = dataApi.response

    dato = location.search.split('?id=')[1]

    producto = arrayProductos.find(element => {

        return element._id == dato
    })

    imprimirDetails(producto)

    let select = document.querySelector('.cantidad')
    select.addEventListener('change', e => {
        cantidad = Number(e.target.value)
    })



    let randomNumber = [Math.floor(Math.random() * arrayProductos.length)]
    let randomNumberDos = [Math.floor(Math.random() * arrayProductos.length)]
    let randomNumberTres = [Math.floor(Math.random() * arrayProductos.length)]

    let arrayRandom = [];
    arrayRandom.push(arrayProductos[randomNumber], arrayProductos[randomNumberDos], arrayProductos[randomNumberTres])


    imprimirMiniDetails(arrayRandom)
}

getDataApi()

function imprimirDetails(producto) {

    let templateDetail2 = ""
    for (i = 0; i < producto.stock; i++) {
        if (i < 10) {
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
    let templateDetail3 = `
    <h1 class="d-flex justify-content-center"><b>${producto.nombre}</b></h1>
    `
    containerTitulo.innerHTML = templateDetail3


}

let arrayCarrito = [];

function clickee() {
    if ((localStorage.getItem("carrito"))) {
        arrayCarrito = JSON.parse(localStorage.getItem("carrito"))
        idArticulo = arrayCarrito.map(e => e.id)
    }
    if (idArticulo.indexOf(dato) !== -1) {
        if (arrayCarrito[idArticulo.indexOf(dato)].stockActualizado <= 0) {
            alert("Llego al limite de stock")
        } else {
            let resultado = arrayCarrito[idArticulo.indexOf(dato)].stockActualizado - cantidad
            if (resultado < 0) {
                ("Llego al limite de stock")
            } else {
                arrayCarrito[idArticulo.indexOf(dato)].cantidad += cantidad
                arrayCarrito[idArticulo.indexOf(dato)].stockActualizado -= cantidad
            }
        }

    } else {
        arrayCarrito.push({
            'id': dato,
            'cantidad': cantidad,
            'stockActualizado': producto.stock - cantidad
        })
    }

    localStorage.setItem('carrito', JSON.stringify(arrayCarrito))

}


function imprimirMiniDetails(array) {
    let templateMini = ''

    array.forEach(element => {

        templateMini += `<div class="mini-card">
    <img src="${element.imagen}" class="card-img-top border" alt="${element.nombre}">
    <div class="card-body">
    <h4 class="card-title pb-3">$${element.precio}</4>
    <h6 class="card-text pb-3">${element.nombre}</h6>
    <div class="d-flex justify-content-center">
    <a href="./detalles.html?id=${element._id}" class="btn btn-primary">Ver más</a>
    </div>
    </div>
    </div>`

        containerMiniDetails.innerHTML = templateMini
    })
}