/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global metodosestu, estudiante, paginasestu */

$(document).ready(function (){
    
            
    var perfil = estudiante.getPerfil();
    
    var html;
    
    html = '<div>';
    html += '<nav>';
    html += '<div class="nav-wrapper light-green">';
    html += '<a href="#" class="brand-logo center">Perfil</a>';
    html += '<a href="#" class="button-collapse" data-activates="slide-out">';
    html += '<i class="mdi-navigation-menu"></i>';
    html += '</a>';
    html += '<ul class="right hide-on-med-and-down">';
    html += '<li>Menu<li>';
    html += '<li>Perfil<li>';
    html += '<li>Horario<li>';
    html += '<li>Calificaciones<li>';
    html += '<li>Calendario<li>';
    html += '<li>Oficinas<li>';
    html += '</ul>';
    html += '<ul class="side-nav" id="slide-out">';
    html += '<li><p class="menu-text-color" id="list-menu">Menu</p><li>';
    html += '<li><p class="menu-text-color" id="list-perfil">Perfil</p><li>';
    html += '<li><p class="menu-text-color" id="list-horario">Horario</p><li>';
    html += '<li><p class="menu-text-color" id="list-calificaciones">Calificaciones</p><li>';
    html += '<li><p class="menu-text-color" id="list-calendario">Calendario</p><li>';
    html += '<li><p class="menu-text-color" id="list-oficinas">Oficinas</p><li>';
    html += '</ul>';
    html += ' </div>';
    html += '</nav>';
    
    html += '<div class="container">';
    html += '<div class="card">';
    html += '<div class="card-content">';    
    html += '<div class="row">';
    
    html += '<div class="col s2">';
    html += '<div class="section">';
    html += '<i class="small mdi-action-perm-identity"></i>';
    html += '</div>';
    html += '</div>';
    
    html += '<div class="col s9">';
    html += '<div class="section">';
    html += '<label class="text-perfil">Identificacion</label>';
    html += '<p>'+ perfil.cedula +'</p>';
    html += '<div class="divider"></div>';
    html += '<label class="text-perfil">Nombres</label>';
    html += '<p>' + perfil.nombre + '</p>';
    html += '<div class="divider"></div>';
    html += '<label class="text-perfil">Apelidos</label>';
    html += '<p>'+ perfil.apellido +'</p>';
    html += '<div class="divider"></div>';
    html += '</div>';
    html += '</div>';
    
    html += '</div>';
    html += '</div>';
    html += '</div>';
    
    
    html += '<div class="card">';
    html += '<div class="card-content">';    
    html += '<div class="row">';
    
    html += '<div class="col s2">';
    html += '<div class="section">';
    html += '<i class="small mdi-social-school"></i>';
    html += '</div>';
    html += '</div>';
    
    html += '<div class="col s9">';
    html += '<div class="section">';
    html += '<label class="text-perfil">Rol</label>';
    html += '<p>'+ perfil.rol +'</p>';
    html += '<div class="divider"></div>';
    html += '<label class="text-perfil">Facultad</label>';
    html += '<p>'+ perfil.facultad +'</p>';
    html += '<div class="divider"></div>';
    html += '<label class="text-perfil">Programa</label>';
    html += '<p>'+ perfil.programa +'</p>';
    html += '<div class="divider"></div>';
    html += '<label class="text-perfil">Semestre</label>';
    html += '<p>'+ perfil.semestre +'</p>';
    html += '<div class="divider"></div>';
    html += '<label class="text-perfil">Periodo</label>';
    html += '<p></p>';
    html += '<div class="divider"></div>';
    html += '</div>';
    html += '</div>';
    
    html += '</div>';
    html += '</div>';
    html += '</div>';
    
    html += '</div>';
    
    $('#perfilestu').append(html);
    
    $('.button-collapse').sideNav();
    
    $('#list-menu').on('click', function (){
        
        $('.button-collapse').sideNav('hide');
        estudiante.Menu();

    });
    
    $('#list-horario').on('click', function (){
        
        $('.button-collapse').sideNav('hide');
        paginasestu.Horario();

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

