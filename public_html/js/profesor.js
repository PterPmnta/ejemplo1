/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global profesor, paginasprof */

$(document).ready(function (){
    
     var saludoprof = JSON.parse(localStorage.getItem('profesor')); 
     
      var html;
      
      html = '<nav>';
      html += '<div class="nav-wrapper green">';
      
      html += '<a href="#" class="brand-logo center">Unicesar</a>';
      
      html += '<ul class="right">';
      html += '<li id="btn-salir"><a href="#"><i class="fa fa-times fa-2x"></i></a></li>';
      html += '</ul>';
      
      html += '</div>';
      html += '</nav>';
      
      html += '<div class="container">';
      
      html += '<div class="card center">';
      html += '<p>Bienvenido,'+" "+ '<b>'+ saludoprof.nombre +" "+ saludoprof.apellido +'</b>'+'</p>';
      html += '</div>';
      
      html += '<div class="row center">';
      
      html += '<div class="col s4 offset-s1 card" id="btn-perfilp">';
      html += '<div class="section">';
      html += '<div><i class="fa fa-user fa-3x espacio-menu"></i></div>';
      html += '<div class="divider"></div>';
      html += '<label>Perfil</label>';
      html += '</div>';
      html += '</div>';     
      
      html += '<div class="col s4 offset-s2 card" id="btn-horariop">';
      html += '<div class="section">';
      html += '<div><i class="fa fa-clock-o fa-3x espacio-menu"></i></div>';
      html += '<div class="divider"></div>';
      html += '<label>Horario</label>';
      html += '</div>';
      html += '</div>';
      
      html += '<div class="col s4 offset-s1 card" id="btn-grupos">';
      html += '<div class="section">';
      html += '<div><i class="fa fa-users fa-3x espacio-menu"></i></div>';
      html += '<div class="divider"></div>';
      html += '<label>Grupos</label>';
      html += '</div>';
      html += '</div>';
      
      html += '<div class="col s4 offset-s2 card" id="btn-calendarp">';
      html += '<div class="section">';
      html += '<div><i class="fa fa-calendar fa-3x espacio-menu"></i></div>';
      html += '<div class="divider"></div>';
      html += '<label>Calendario</label>';
      html += '</div>';
      html += '</div>';
      
      html += '<div class="col s4 offset-s1 card">';
      html += '<div class="section">';
      html += '<div><i class="fa fa-briefcase fa-3x espacio-menu"></i></div>';
      html += '<div class="divider"></div>';
      html += '<label>Info. Admon.</label>';
      html += '</div>';
      html += '</div>';
      
      html += '<div class="col s4 offset-s2 card">';
      html += '<div class="section">';
      html += '<div><i class="fa fa-newspaper-o fa-3x espacio-menu"></i></div>';
      html += '<div class="divider"></div>';
      html += '<label>Noticias</label>';
      html += '</div>';
      html += '</div>';
      
      html += '<div class="col s4 offset-s1 card">';
      html += '<div class="section">';
      html += '<div><i class="fa fa-university fa-3x espacio-menu"></i></div>';
      html += '<div class="divider"></div>';
      html += '<label>Mi UPC</label>';
      html += '</div>';
      html += '</div>';
      
      html += '</div>';
      
      html += '</div>'; 
      


      $('#menuprof').append(html);


      $('#btn-perfilp').on('click', function (){
          paginasprof.Perfil();
      });
      
      $('#btn-horariop').on('click', function (){
          paginasprof.Horario();
      });
      
      $('#btn-grupos').on('click', function (){
          paginasprof.Grupos();
      });
      
      $('#btn-calendarp').on('click', function (){
          paginasprof.Calendario();
      });
      
      $('#btn-salir').on('click', function (){
          profesor.Salir();
      });
    
});

