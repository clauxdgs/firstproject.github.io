//creo una variable usuario que lee el usuario almacenado el localStorage y lo muestra en "CAMPO USUARIO" que es un boton agregado en el html
let usuario;
if (localStorage.getItem('Usuario') != null) {
    let htmlContentToAppend="";
    //localStorage.getItem("key del elemento que queremos obtener")
    usuario=localStorage.getItem('Usuario');
    htmlContentToAppend += ` User:` +" "+ usuario + ``;
    document.getElementById('campoUsuario').innerHTML=htmlContentToAppend;
    console.log(usuario);
}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    
});