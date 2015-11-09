/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global paginasestu, estudiante, profesor, paginasprof */

$(document).ready(function (){
    
    $('select').material_select();
    
    $('.button-collapse').sideNav();
    
    var oficinas = new Oficinas;
    
    function Oficinas(){}
    
    Oficinas.prototype.Departamentos = function (){
        
        var departamentos, i, cantidad, html, tabla;
        
        tabla = $('#oficina-tab');
        
        departamentos = [{director:'Alvaro Oñate', oficina:'Dep. de Ing. de Sistemas', telefono:5849233, correo:'alvaroonate@unicesar.edu.co'},
                      {director:'Ada Almenares', oficina:'Dep. de Derecho', telefono:5546706, correo:'derecho@unicesar.edu.co'},
                      {director:'Josefina Cuello', oficina:'Dep. de Sociologia', telefono:5846706, correo:'sociología@unicesar.edu.co'},
                      {director:'Iranis Urbina', oficina:'Dep. de Idiomas', telefono:5850296, correo:'idiomas@unicesar.edu.co'},
                      {director:'Ineris Cuello', oficina:'Dep. de Arte y folclor', telefono:585045, correo:'bellasartes@unicesar.edu.co'},
                      {director:'Doris Celchar', oficina:'Dep. de Enfermeria', telefono:5848935, correo:'enfermería@unicesar.edu.co'},
                      {director:'Aura Parada', oficina:'Dep. de Microbiologia', telefono:5848938, correo:'enfermería@unicesar.edu.co'},
                      {director:'Arquimedez Mendoza', oficina:'Dep. de Contaduria', telefono:0, correo:'*'},
                      {director:'Felix Movilla', oficina:'Dep. de Matematicas', telefono:0, correo:'*'},
                      {director:'Reynaldo Ruiz', oficina:'Dep. de Fisica', telefono:0, correo:'*'},
                      {director:'Trinidad Montero', oficina:'Dep. de Ciencias naturales', telefono:0, correo:'*'},
                      {director:'Omaira Tapia', oficina:'Dep. de Ing. Electronica', telefono:5847328, correo:'*'}];
        
        cantidad = departamentos.length;
        
        tabla.empty();
        
        for (i=0 ; i<cantidad ; i++){
            
            html = '<tr>';            
            html += '<td>';
            html += '<div><b>Dir.</b> '+ departamentos[i].director +'</div>';
            html += '<div><b>Ofi:</b>'+ departamentos[i].oficina +'</div>';
            html += '<div><b>Tel:</b> '+ departamentos[i].telefono +'</div>';
            html += '<div><b>Correo:</b> '+ departamentos[i].correo +'</div>';
            html += '</td>';            
            html += '</tr>';            
            
            tabla.append(html);
            
        }
        
    };
    
    Oficinas.prototype.Decanaturas = function (){
        
        var decanaturas, i, cantidad, html, tabla;
        
        tabla = $('#oficina-tab');
        
        decanaturas = [{director:'Efrain Quintero', oficina:'Dec. de Bellas Artes', telefono:5850411, correo:'efrainquintero@unicesar.edu.co'},
                       {director:'Jaime Maestre', oficina:'Dec. de Ciencias de la educación', telefono:5849456, correo:'faceeducacion@unicesar.edu.co'},
                       {director:'Nancy Hernandez', oficina:'Dec. de Salud', telefono:5850464, correo:'*'}];
                   
        cantidad = decanaturas.length;
        
        tabla.empty();
        
        for (i=0 ; i<cantidad ; i++){
            
            html = '<tr>';            
            html += '<td>';
            html += '<div><b>Dir.</b> '+ decanaturas[i].director +'</div>';
            html += '<div><b>Ofi:</b>'+ decanaturas[i].oficina +'</div>';
            html += '<div><b>Tel:</b> '+ decanaturas[i].telefono +'</div>';
            html += '<div><b>Correo:</b> '+ decanaturas[i].correo +'</div>';
            html += '</td>';            
            html += '</tr>';            
            
            tabla.append(html);
            
        }
        
    };
    
    Oficinas.prototype.Otras = function (){
        
        var otras, i, cantidad, html, tabla;
        
        tabla = $('#oficina-tab');
        
        otras = [{director:'Norberto Diaz', oficina:'Cefontev', telefono:3145357278, correo:'*'},
                 {director:'Norberto Diaz', oficina:'Sala de profesores', telefono:5847128, correo:'*'}];
        
        cantidad = otras.length;
        
        tabla.empty();
        
        for (i=0 ; i<cantidad ; i++){
            
            html = '<tr>';            
            html += '<td>';
            html += '<div><b>Dir.</b> '+ otras[i].director +'</div>';
            html += '<div><b>Ofi:</b>'+ otras[i].oficina +'</div>';
            html += '<div><b>Tel:</b> '+ otras[i].telefono +'</div>';
            html += '<div><b>Correo:</b> '+ otras[i].correo +'</div>';
            html += '</td>';            
            html += '</tr>';            
            
            tabla.append(html);
            
        }
        
    };
    
    
    $("#selector").on("change", function (){
        
        var select, oficina;
        
        select = document.getElementById("selector");
        oficina = select.options[select.selectedIndex].text;
        
        switch (oficina){
            
            case 'Departamentos':
                oficinas.Departamentos();
                //console.log(oficina);
            break
            
            case 'Decanaturas':
                oficinas.Decanaturas();
                //console.log(oficina);
            break
            
            case 'Administrativas':
                oficinas.Otras();
                //console.log(oficina);
            break
            
        }
        
        //console.log(oficina);
        
    });
    
    $('#list-menu').on('click', function (){

        $('.button-collapse').sideNav('hide'); 
        profesor.Menu();

     });

     $('#list-perfil').on('click', function (){

        $('.button-collapse').sideNav('hide'); 
        paginasprof.Perfil();

     });
     
     $('#list-horario').on('click', function (){

        $('.button-collapse').sideNav('hide'); 
        paginasprof.Horario();

     });

     $('#list-grupos').on('click', function (){

        $('.button-collapse').sideNav('hide'); 
        paginasprof.Grupos();

     });
     
     $('#list-calendario').on('click', function (){
        
        $('.button-collapse').sideNav('hide'); 
        paginasprof.Calendario();

     });
    
});
