//Creamos un array para almacenar la cadena de datos que extraemos del JSON de autos.
let car_Array = [];

//La funcion ShowCarList se encarga de hacer un recorrido por el array de autos, extrae cada auto con sus propiedades y posteriormente los listamos en un 
function ShowCarList(array){
    let htmlContentToAppend = "";
    console.log(array);
    for(let i = 0; i < array.products.length; i++){ 
        let car = array.products[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action" style="max-width:95%;" border-color: #117A65;">
            <div class="row">
             
                <div class="col-10">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1" style="margin:25px; margin-left: 70px;">
                        <h2  style=" font-weight: bolder; color: #117A65;">`+ car.name  +`</h2> 
                        <p style="font-style:  italic;"> `+ car.description +`</p> 
                        <p><strong style="color: #117A65;">Precio: </strong> ` + car.cost +'  <strong style="color: #117A65;">' + car.currency+ `</strong>  </p>
                        </div>
                        <div class="col-3" style="width :45%; aling-items:center;">
                        <img src="` + car.image + `" alt="product image"  class="img-thumbnail" style="background-color:#117A65; width=50%" id="image_car">
                        </div> 
                </div>
                

                </div>
            </div>
        </div>
        `
           document.getElementById('car-list-container').innerHTML = htmlContentToAppend; //error '' y container
    }
}


//llamamos al DOM para y la cadena de datos del URL que tenemos en INIT con el link al JSON de autos, almacenamos estos datos en nuestro array de autos y luego llamamos a la funcion ShowCarList
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(AUTOS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            car_Array = resultObj.data;
            ShowCarList(car_Array); //error en el nombre de la variable
        }
    });
});