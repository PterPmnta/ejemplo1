/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global metodosprof, profesor, paginasprof */

$(document).ready(function (){    
    
    
    function HorarioProf(){
        
        var html, horario, len, i;
        
        horario = profesor.getHorario();
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
    
    HorarioProf();    
    
    
    $('.collapsible').collapsible({
      accordion : false 
    });
    
    $('.button-collapse').sideNav();
    
    $('#list-menu').on('click', function (){
        
        $('.button-collapse').sideNav('hide');
        profesor.Menu();

    });
    
    $('#list-perfil').on('click', function (){
        
        $('.button-collapse').sideNav('hide'); 
        paginasprof.Perfil();

    });
    
    $('#list-grupos').on('click', function (){
        
        $('.button-collapse').sideNav('hide');
        paginasprof.Grupos();

    });
    
    $('#list-calendario').on('click', function (){
        
        $('.button-collapse').sideNav('hide');
        paginasprof.Calendario();

    });
    
    $('#list-oficinas').on('click', function (){
        
        $('.button-collapse').sideNav('hide');
        paginasprof.Oficinas();

    });
});


