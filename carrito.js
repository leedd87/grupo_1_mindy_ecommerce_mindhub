let articulos=[]
let idArticulo

let artCarrito = []
async function getDatafromAPI() {
    articulos= []
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
    artCarrito.forEach(e=>{
        articul = local.filter(i =>e._id == i.id)[0]
        e.cantidadSeleccionada = articul.cantidad;
    } )
    console.log(artCarrito)
    console.log(articul)
    displayCarrito(artCarrito,local)

}
getDatafromAPI()


function displayCarrito(articulos){
    let templateHtml = ''
    let sumatoria = 0
    articulos.forEach(e=>{
        sumatoria += e.precio*e.cantidadSeleccionada
        console.log(e)
        templateHtml += `
            <tr>
                <td>${e.nombre}</td>
                <td>${e.precio}</>
                <td>${e.stock}</td>
                <td>${e.cantidadSeleccionada}</td>
                <td>${e.precio*e.cantidadSeleccionada}</td>
                <td><button class="btnBorrar" onclick="carrito('${e._id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                </svg></button></td>
            </tr>
        `
    })
    templateHtml += `
            <tr>
                <td>Total</td>
                <td></td>
                <td></td>
                <td></td>
                <td>${sumatoria}</td>
                <td><button class="btnBorrar" onclick="limpiarCarrito()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                </svg></button></td>
            </tr>
    `
    document.querySelector('#carrito').innerHTML = templateHtml

}

function carrito(art){
    let arrayCarrito = JSON.parse(localStorage.getItem("carrito"))
    idArticulo = arrayCarrito.map(e=>e.id)
    if (idArticulo.indexOf(art) !== -1) {
        arrayCarrito.splice(idArticulo.indexOf(art),1)
    }

    localStorage.setItem('carrito', JSON.stringify(arrayCarrito))
    getDatafromAPI()
}

function limpiarCarrito(){
    localStorage.clear()
    getDatafromAPI()
}