/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global metodosprof, profesor, paginasprof */

$(document).ready(function (){
    
    var perfilp = profesor.getPerfil();
    
    //console.log(perfilp);
    
    var html;
    
    html = '<div>';
    html += '<nav>';
    html += '<div class="nav-wrapper green">';
    html += '<a href="#" class="brand-logo center">Perfil</a>';
    html += '<a href="#" class="button-collapse" data-activates="slide-out">';
    html += '<i class="mdi-navigation-menu"></i>';
    html += '</a>';
    html += '<ul class="right hide-on-med-and-down">';
    html += '<li>Menu<li>';
    html += '<li>Perfil<li>';
    html += '<li>Horario<li>';
    html += '<li>Grupos<li>';
    html += '<li>Calendario<li>';
    html += '<li>Oficinas<li>';
    html += '</ul>';
    html += '<ul class="side-nav" id="slide-out">';
    html += '<li><p class="menu-text-color" id="list-menu">Menu</p><li>';
    html += '<li><p class="menu-text-color" id="list-perfil">Perfil</p><li>';
    html += '<li><p class="menu-text-color" id="list-horario">Horario</p><li>';
    html += '<li><p class="menu-text-color" id="list-grupos">Grupos</p><li>';
    html += '<li><p class="menu-text-color" id="list-calendario">Calendario</p><li>';
    html += '<li><p class="menu-text-color" id="list-oficinas">Oficinas</p><li>';
    html += '</ul>';
    html += '</div>';
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
    html += '<p>'+ perfilp.cedula +'</p>';
    html += '<div class="divider"></div>';
    html += '<label class="text-perfil">Nombres</label>';
    html += '<p>' + perfilp.nombre + '</p>';
    html += '<div class="divider"></div>';
    html += '<label class="text-perfil">Apelidos</label>';
    html += '<p>'+ perfilp.apellido +'</p>';
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
    html += '<p>'+ perfilp.rol +'</p>';
    html += '<div class="divider"></div>';
    html += '<label class="text-perfil">Facultad</label>';
    html += '<p>'+ perfilp.facultad +'</p>';
    html += '<div class="divider"></div>';
    html += '<label class="text-perfil">Programa</label>';
    html += '<p>'+ perfilp.programa +'</p>';
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
    
    $('#perfilprof').append(html);
    
    $('.button-collapse').sideNav();
    
    $('#list-menu').on('click', function (){
        
        $('.button-collapse').sideNav('hide');
        profesor.Menu();

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
    
    $('#list-oficinas').on('click', function (){
        
        $('.button-collapse').sideNav('hide');
        paginasprof.Oficinas();

    });
    
});


