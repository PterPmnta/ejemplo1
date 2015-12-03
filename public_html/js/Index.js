/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global MetodosEstu, metodos, metodosestu, metodosprof, Estudiante, estudiante, profesor */

//Usando servidor externo



$(document).ready(function (){     

   
   var LocalEstu, LocalProf;

    LocalEstu = JSON.parse(localStorage.getItem('estudiante'));
    LocalProf = JSON.parse(localStorage.getItem('profesor'));
    
    //console.log(LocalEstu);

    if(LocalEstu !== null){        
           estudiante.Menu();            
    }else if(LocalProf !== null){
           profesor.Menu();           
    }else{
        //alert('ninguno');
        LoginPage();
    }
    
    function LoginPage(){
        
        var html;
        
        html = '<br>';
        html += '<br>';
        html += '<div id="logo" class="center">';
        html += '<img src="imagenes/logo2.png" alt="logo" />';
        html += '</div>';
        
        html += '<br>';
        html += '<div class="center caja-mensaje"><label id="mensaje-error" class="mensaje-error"></label></div>';
        
        html += '<br>';
        html += '<div class="input-field">';
        html += '<i class="fa fa-user fa-2x prefix"></i>';
        html += '<input type="text" name="usuario" id="usuariotxt"/>';
        html += '<label for="usuario">Usuario</label>';
        html += '</div>';        
        
        html += '<div class="input-field">';
        html += '<i class="fa fa-key fa-2x prefix"></i>';
        html += '<input type="password" name="pass" id="passwordtxt"/>';
        html += '<label for="Contraseña">Contraseña</label>';
        html += '</div>';
        
        html += '<div class="row">';
        html += '<div class="col s8 offset-s2">';
        html += '<div class="waves-block btn light-green" id="btn-login">Ingresar</div>';
        html += '</div>';
        html += '</div>';
        
        $('#login').append(html);
        
    }

   
      
   $("#btn-login").on('click', function (event){
       
       event.stopPropagation();
       
       var user = $('#usuariotxt').val();
       var pass = $('#passwordtxt').val();  
       
       
       if (user === "" && pass === ""){
           
           var Solicitud;
           
           $('#mensaje-error').empty();
           Solicitud = 'Debe escribir el Usuario y/o Contraseña';
           $('#mensaje-error').append(Solicitud);
           
       }else{
           
           //console.log(user, pass);
           
           var login= {
              Usuario : user,
              Password : pass
           };
           
           $.ajax({
                
              type: 'POST',
              url:  'http://190.109.185.138/Apipedro/api/login',
              data: login,
              datatype: 'json'

            }).done(function(data) {

                    //console.log(data);   

                    if (data.estudiante){

                        //var estu, horaestu; 
                        
                        estudiante.Informacion(data);

                        estudiante.Cargando();
                        

            }else if(data.profesor){

                    //console.log("Profesor"); 
                    
                    profesor.Informacion(data);
                    
                    profesor.Cargando();
                    



            }else if(data === 'Usuario no registrado'){
                
                $('#mensaje-error').empty();
                $('#mensaje-error').append(data);
                
            }else if(data === 'Contraseña incorrecta'){
                
                $('#mensaje-error').empty();
                $('#mensaje-error').append(data);
                
            }


            }).fail(function (){
                $('#mensaje-error').empty();
                var Mensaje = "Fallo el servidor";
                $('#mensaje-error').append(Mensaje);

            });
           
       }      
       
   });
    
});
