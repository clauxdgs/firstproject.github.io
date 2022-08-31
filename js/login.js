/* Los labels que avisan si falta la clave o el usuario no se muestran inicialmente */
document.getElementById("label_pass").style.display = 'none'; 
document.getElementById("label_user").style.display = 'none'; 



/* Esta es mi funcion para pintar los borders de los inputs de rojo cuando falta la clave o el usuario */
function changeColor(casilla){
    document.getElementById(casilla).style.borderColor="red";
}

/* Con esta funcion llamamos al DOM, la pagina inicia y extrae los datos del formulario y los valida*/
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formulario").addEventListener('submit', validarFormulario);
  });

//guardo el usuario en localStorage
  function guardarUsuario(){
    let user= document.getElementById('usuario').value;
    console.log('usuario') 
    //localStorage.setItem("KEY","valor que queremos almacenar")
    localStorage.setItem('Usuario',user);
  }


  /* La funcion validar formulario identifica los inputs de nombre y clave, si estan vacios muestra un error, si estan llenos, envia el formulario y nos redirige a la siguiente ventana */
  
  function validarFormulario(evento) {
    evento.preventDefault();
    var usuario = document.getElementById('usuario').value;
    var inputNombre= document.getElementById('usuario');
   
    if(usuario.length == 0) {
     alert('El nombre de Usuario no es correcto, verifica e intenta nuevamente');
     inputNombre.classList.add('is-invalid');
      changeColor("usuario");
      document.getElementById("label_user").style.display = ''; 
      return;
    }
    
    var clave = document.getElementById('password').value;
    var inputPass= document.getElementById('password');
    if (clave.length < 1) {
      alert('La clave no es válida');
      inputPass.classList.add('is-invalid');
      changeColor("password");
      document.getElementById('label_pass').style.display = ''; // show 
      return;
    }
    this.submit();
    guardarUsuario();
  }




 // FUNCION QUE VALIDA EL LOGIN DE GOOGLE Y REDIRIGE A LA PAGINA DE INICIO DEL ECOMMERCE

// function handleCredentialResponse(response) {   
//   console.log("Encoded JWT ID token: " + response.credential);
//   //console.log("HOLA CLAU");
//   window.location.href="screen1.html"
//  }
// window.onload = function () {
//   google.accounts.id.initialize({
//     client_id: "800017163944-am4b22fd7theglhvbg6asgmsn4hhlm1l.apps.googleusercontent.com",
//     callback: handleCredentialResponse
//   });
//     google.accounts.id.prompt(); // also display the One Tap dialog
// }
  