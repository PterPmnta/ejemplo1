/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global metodosestu, estudiante, paginasestu */

$(document).ready(function (){
    
    //var nuevo = metodosestu.gethora();
    //console.log(nuevo);
    
    function HorarioEstu(){
        
        var html, horario, len, i;
        
        horario = estudiante.getHorario();
        //console.log(horario);
        len = horario.length;       
        
        
        for(i=0 ; i<len ; i++){  
            
            html = '<div class="z-depth-1 center white">';
            html += '<div class="container">';

            html += '<div class="section">'+ horario[i].nombre +'</div>';
            
            html += '<div class="row">';
            
            html += '<div class="col s4">';
            html += '<div class="section">';
            html += '<label>Codigo</label>';
            html += '<p>'+ horario[i].codigo +'</p>';
            html += '<div class="divider"></div>';
            html += '<label>Lugar(es)</label>';
            html += '<p>'+ horario[i].lugar +'</p>';
            html += '</div>';
            html += '</div>';
            
            html += '<div class="col s4">';
            html += '<div class="section">';
            html += '<label>Grupo</label>';
            html += '<p>'+ horario[i].grupo +'</p>';
            html += '<div class="divider"></div>';
            html += '<label>Dia(s)</label>';
            html += '<p>'+ horario[i].dia +'</p>';
            html += '</div>';
            html += '</div>';
            
            html += '<div class="col s4">';
            html += '<div class="section">';
            html += '<label>Credito(s)</label>';
            html += '<p>'+ horario[i].creditos +'</p>';
            html += '<div class="divider"></div>';
            html += '<label>DHora(s)</label>';
            html += '<p>'+ horario[i].hora +'</p>';
            html += '</div>';
            html += '</div>';
            
            html += '</div>';

            html += '</div>';
            html += '</div>';        

           
            $('#asignaturas').append(html);
            
        }        
       
    }
    
    HorarioEstu();    
    
    
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
    
    $('#list-calificaciones').on('click', function (){
        
        $('.button-collapse').sideNav('hide'); 
        paginasestu.Calificaciones();

    });
    
    $('#list-calendario').on('click', function (){
        
        $('.button-collapse').sideNav('hide');
        paginasestu.Calendario();

    });
    
    $('#list-oficinas').on('click', function (){
        
        $('.button-collapse').sideNav('hide'); 
        paginasestu.Oficinas();

    });
    
        
    
});



