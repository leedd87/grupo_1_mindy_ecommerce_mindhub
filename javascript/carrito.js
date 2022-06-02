let articulos = []
let idArticulo

let artCarrito = []
async function getDatafromAPI() {
    articulos = []
    artCarrito = []
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then(response => response.json())
        .then(json => json.response.map(e =>
            articulos.push(e)));

    let local = JSON.parse(localStorage.getItem("carrito"))

    if (localStorage.getItem("carrito")) {
        local.forEach(artic => {
            artCarrito.push(...articulos.filter(articulos => articulos._id == artic.id))
        });
    }
    else { artCarrito = [] }

    console.log(artCarrito)

    let articul = []
    artCarrito.forEach(e => {
        articul = local.filter(i => e._id == i.id)[0]
        e.cantidadSeleccionada = articul.cantidad;
    })
    console.log(artCarrito)
    console.log(articul)
    displayCarrito(artCarrito, local)

}
getDatafromAPI()


function displayCarrito(articulos) {
    let templateHtml = ''
    let sumatoria = 0
    articulos.forEach(e => {
        sumatoria += e.precio * e.cantidadSeleccionada
        console.log(e)
        templateHtml += `
        <div class="card-carrito">
        <a href="./detalles.html?id=${e._id}""><img
        src="${e.imagen}"
        class="" alt="${e.nombre}"></a>
        <div class="card-body-carrito">
        <h6 class="card-text mb-3">${e.nombre}</h6>
        <p>$${e.precio}</p>
        <p>Cantidad<br>${e.cantidadSeleccionada}<p>
        <p>$${e.precio * e.cantidadSeleccionada}</p>
        <button class="btnBorrar" onclick="carrito('${e._id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                </svg></button>
        </div>
        </div>
        `
    })



    templateHtml += `
    <div class="total-carrito">
                <p>Total : $${sumatoria}</p>
                <button class="btnBorrar" onclick="limpiarCarrito()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-x-fill" viewBox="0 0 16 16">
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7.354 5.646 8.5 6.793l1.146-1.147a.5.5 0 0 1 .708.708L9.207 7.5l1.147 1.146a.5.5 0 0 1-.708.708L8.5 8.207 7.354 9.354a.5.5 0 1 1-.708-.708L7.793 7.5 6.646 6.354a.5.5 0 1 1 .708-.708z"/>
                </svg></button>
    </div>
    </div>
    `

    if (articulos.length > 0) {
        document.querySelector('#carrito').innerHTML = templateHtml
    }
    else {
        let newTemplate = `
        <div class="total-carrito">
                    <p>Su carrito esta vacio!</p>
        </div>
        </div>
        `
        document.querySelector('#carrito').innerHTML = newTemplate
    }


}

function carrito(art) {
    let arrayCarrito = JSON.parse(localStorage.getItem("carrito"))
    idArticulo = arrayCarrito.map(e => e.id)
    if (idArticulo.indexOf(art) !== -1) {
        arrayCarrito.splice(idArticulo.indexOf(art), 1)
    }

    localStorage.setItem('carrito', JSON.stringify(arrayCarrito))
    getDatafromAPI()
}

function limpiarCarrito() {
    localStorage.clear()
    getDatafromAPI()
}