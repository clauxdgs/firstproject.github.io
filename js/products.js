//Creamos un array para almacenar la cadena de datos que extraemos del JSON de autos.
let car_Array = [];

//creo tres variables que me permiten identificar el criterio por el que ordenaremos la lista
const OPA = "Precio_Ascendente";
const OPD = "Precio_Descendente";
const OPR = "Relevancia";

//llamando los elementos del HTML que nos ayudaran a realizar el filtrado:
let LDPs = document.getElementById('car-list-container');
let btnAsc = document.getElementById('ascendente');
let btnDes = document.getElementById('descendente');
let btnrele = document.getElementById('relevancia');
let min = document.getElementById('inputmin');
let max = document.getElementById('inputmax');
let filtrar = document.getElementById('btn_filtrar');
let limpiar = document.getElementById('btn_limpiar');
let searchBar= document.getElementById('searchBar');


//creo dos variables de costo minimo y maximo para ordenar de los productos
let minCost = undefined;
let maxCost = undefined;


//aumente un mensaje que se muestra cuando la  categoria de productos elegida esta vacia

function showMessage() {
    let htmlcontenido = "";
    htmlcontenido += `<div style="text-align:center;"> Por el momento no contamos con el producto que buscas, sigue explorando en: <a href="categories.html" style="color: #85C1E9;">Categorias</a> o realiza otra búsqueda</div>`;

    LDPs.innerHTML = htmlcontenido;
    LDPs.style.backgroundColor = '#117864';
    LDPs.style.color = 'white';
    LDPs.style.fontSize = '35px';

}


//La funcion ShowCarList se encarga de hacer un recorrido por el array de autos, extrae cada auto con sus propiedades y posteriormente los listamos en un 
function ShowCarList(array) {
    let htmlContentToAppend = "";
    if (array.length < 1) {
        showMessage();
        console.log(array.length);
    } else {
        for (let i = 0; i < array.length; i++) {
            let car = array[i];
            console.log(array.length);

            if (((minCost == undefined) || (minCost != undefined && parseInt(car.cost) >= minCost)) &&
                ((maxCost == undefined) || (maxCost != undefined && parseInt(car.cost) <= maxCost))) {


                htmlContentToAppend += `
                <div class="list-group-item list-group-item-action contenedor_listado">
                <div class="row">
                 
                    <div class="col-10">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1 info_products" style="margin:25px; margin-left: 70px;">
                            
                            <h2  class="name_products">` + car.name + `</h2> 
                            
                            <p class="descripcion_productos" style="font-style:  italic;"> ` + car.description + `</p>
                            <br><br><br><hr>
                            <p class="precio"><strong class="strong_products">Precio: </strong> ` + car.cost + '  <strong class="strong_products">' + car.currency + `</strong>
                            <div>
                             <label style="font-weight:bolder; background-color:rgb(225, 225, 225); border-radius:5px; width: 25%; text-align: center;"><strong style="color: #117A65;">VENDIDOS:</strong>` + car.soldCount + `</label></p>
                            </div> </p >
                            </div>
                          
                            <div class="col-3" style="width :45%; aling-items:center;">
                            <img src="` + car.image + `" alt="product image"  class="img-thumbnail imagen_productos"  id="image_car">
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>
        `
            }
        }

        LDPs.innerHTML = htmlContentToAppend;
    }
}


//Creamos la funcion para ordenar los productos, recive un "criterio", o sea la forma en que queremos hacer el orden;(menor a mayor, mayor a menor o por relevancia); y el array de elementos a ordenar
 
//Utilizamos la funcion Sort y la funcion anonima comparativa que btiene los costos de los objetos del array y los compara y ordena dependiendo del criterio!

//info sacada del siguiente lin: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

function ordenarProductos(criterio, array) {
    console.log(array);

    let arrayOrdenado = [];
//para ordenar de forma ascendente leemos los datos de costo de cada uno de los productos y los ordenamos de mayor a menor

    if (criterio === OPD) {
        arrayOrdenado = array.sort(function (dato1, dato2) {
          return dato1.cost - dato2.cost;
        });
    
    } //para ordenar por costo ascendente obtenemos el costo de los objetos con .cost y los ordenamos de menor a mayor 
    else if (criterio === OPA) {

        arrayOrdenado = array.sort(function (dato1, dato2) {
          return dato2.cost - dato1.cost;
        });
        
    } 
     //para el orden por relevancia lo que hacemos es obtener la cantidad de unidades vendidas de los productos usando el .souldCount y los comparamos para ordenar de mayor cantidad de vendidos a menor cantidad de vendidos
     else if (criterio === OPR) {
        arrayOrdenado = array.sort(function (dato1, dato2) {
                    return dato2.soldCount - dato1.soldCount;})
    }
    ShowCarList(arrayOrdenado);
  
    
}





//llamamos al DOM para y la cadena de datos del URL que tenemos en INIT con el link al JSON de autos, almacenamos estos datos en nuestro array de autos y luego llamamos a la funcion ShowCarList
document.addEventListener("DOMContentLoaded", function (e) {

    //Obetengo la CATID para identificar con que URL trabajar en el listado de productos
    let cat = localStorage.getItem('catID')
    console.log(cat);
    let url;

    if (cat == 101) {
        url = AUTOS_URL;
       
    } else if (cat == 102) {
        url = JUGUETES_URL;
    
    } else if (cat == 103) {
        url = MUEBLES_URL;

    } else if (cat == 104) {
        url = HERRAMIENTAS_URL;

    } else if (cat == 105) {

        url = COMPUTADORAS_URL;

    } else if (cat == 106) {
        url = VESTIMENTA_URL;

    } else if (cat == 107) {
        url = ELECTRODOMESTICOS_URL;

    } else if (cat == 108) {
        url = DEPORTE_URL;
        
    } else {
        url = CELULARES_URL;
    }
    
    getJSONData(url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            car_Array = resultObj.data.products;
            ShowCarList(car_Array);
            let catname= resultObj.data;
            document.getElementById('labelcat').innerHTML= catname.catName;

        }
    });



    //Acciones de los botones para el filtrado
    btnAsc.onclick = () => {
        ordenarProductos(OPA, car_Array);
    };

    btnDes.onclick = () => {
        ordenarProductos(OPD, car_Array);
    };

    btnrele.onclick = () => {
        ordenarProductos(OPR, car_Array);
    };

    //el boton limpiar nos limpia todos los campos de filtrado.
    limpiar.onclick = () => {
        min.value = "";

        max.value = "";

        searchBar.value = "";

        minCost = undefined;
        maxCost = undefined;

        ShowCarList(car_Array);
    };
    //el boton filtrar me ayuda a filtrar leyendo los valores ingresados para el costo minimo y maximo y muestra los elementos que entren dentro de los parametros en el listado.
    filtrar.onclick = () => {
        minCost = min.value;
        maxCost = max.value;

        if (minCost != undefined && minCost != "" && parseInt(minCost) >= 0) {
            minCost = parseInt(minCost);
        } else {
            minCost = undefined;
        }

        if (maxCost != undefined && maxCost != "" && parseInt(maxCost) >= 0) {
            maxCost = parseInt(maxCost);
        } else {
            maxCost = undefined;
        }
           ShowCarList(car_Array);
    };
});


//DESAFIATE BUSQUEDA EN TIEMPO REAL

/*Creamos un evento escuchador que identifique cuando 
empezamos a escribir en la casilla de busqueda gracias a keyup*/

searchBar.addEventListener('keyup', (e) => {
    /*Para que el filtro no falle trabajamos convirtiendo la busqueda y los objetos encontrados en minusculas */
    const busqueda= e.target.value.toLowerCase();
    //console.log(busqueda);
    /* filtramos los objetos del array de autos viendo si incluyen lo que escribimos en el input searchBar */
    const objetosFiltrados= car_Array.filter(objeto => {
        /* nos retorna los objetos del array de autos que incluyan las palabras escritas en el nombre o en la descripcion del producto */
        return objeto.name.toLowerCase().includes(busqueda) || objeto.description.toLowerCase().includes(busqueda);
    });
    console.log(objetosFiltrados);
    /* enviamos el array de objetos filtrados a la funcion showcarlist para mostrarlos */
    ShowCarList(objetosFiltrados);

});
