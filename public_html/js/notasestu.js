/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global metodosestu, estudiante, paginasestu */



$(document).ready(function (){    
    
    //$('#iden').append("html");
    
    function Calificaciones(){
        
        var html, calificacion, len, i, final, definitiva, cero;
        
        calificacion = estudiante.getCalificaciones();
        //console.log(notas);
        len = calificacion.length;
        cero = 0.0;
        
        for(i=0 ; i<len ; i++){        
                                    
            final = ((calificacion[i].nota1 + calificacion[i].nota2 + calificacion[i].nota3)/3);
            definitiva = final.toFixed(2);
            
            
            html = '<div class="z-depth-1 center white">';
            html += '<div class="container">';

            html += '<div class="section">'+ calificacion[i].nombre +'</div>';
            
            html += '<div class="row">';
            
            html += '<div class="col s4">';
            html += '<div class="section">';
            html += '<label>Periodo 1</label>';
            html += '<p>'+ calificacion[i].nota1 +'</p>';
            html += '<div class="divider"></div>';
            html += '<label>Definitiva</label>';
            html += '<p>'+ definitiva +'</p>';
            html += '</div>';
            html += '</div>';
            
            html += '<div class="col s4">';
            html += '<div class="section">';
            html += '<label>Periodo 2</label>';
            html += '<p>'+ calificacion[i].nota2 +'</p>';
            html += '<div class="divider"></div>';
            html += '<label>Habilitacion</label>';
            html += '<p>'+ cero +'</p>';
            html += '</div>';
            html += '</div>';
            
            html += '<div class="col s4">';
            html += '<div class="section">';
            html += '<label>Periodo 3</label>';
            html += '<p>'+ calificacion[i].nota3 +'</p>';
            html += '<div class="divider"></div>';
            html += '</div>';
            html += '</div>';
            
            html += '</div>';

            html += '</div>';
            html += '</div>';
           
            $('#calificar').append(html);
            
        }  
        
    }
    
    Calificaciones();
    
    $('.collapsible').collapsible({
       accordion : false 
    });
    
    $('.button-collapse').sideNav();
    
    $('#list-menu').on('click', function (){
        
        $('.button-collapse').sideNav('hide');
        estudiante.Menu();

    });
    
    $('#list-perfil').on('click', function (){
        
        $('.button-collapse').sideNav('hide');
        paginasestu.Perfil();

    });
    
    $('#list-horario').on('click', function (){
        
        $('.button-collapse').sideNav('hide'); 
        paginasestu.Horario();

    });
    
    $('#list-calendario').on('click', function (){
        
        $('.button-collapse').sideNav('hide'); 
        paginasestu.Calificaciones();

    });
    
    $('#list-oficinas').on('click', function (){
        
        $('.button-collapse').sideNav('hide'); 
        paginasestu.Oficinas();

    });
    
});
    
    


