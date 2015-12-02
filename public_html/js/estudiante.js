/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global metodosestu, estudiante, paginasestu */


$(document).ready(function (){

      var saludo = JSON.parse(localStorage.getItem('estudiante'));
     
      var html;
      
      html = '<nav>';
      html += '<div class="nav-wrapper light-green">';
      
      html += '<a href="#" class="brand-logo center">Unicesar</a>';
      
      html += '<ul class="right">';
      html += '<li id="btn-salir"><a href="#"><i class="fa fa-times fa-2x"></i></a></li>';
      html += '</ul>';
      
      html += '</div>';
      html += '</nav>';
      
      html += '<div class="container">';
      
      html += '<div class="card center">';
      html += '<p>Bienvenido,'+" "+ '<b>'+ saludo.nombre +" "+ saludo.apellido +'</b>'+'</p>';
      html += '</div>';
      
      html += '<div class="row center">';
      
      html += '<div class="col s4 offset-s1 card" id="btn-perfil">';
      html += '<div class="section">';
      html += '<div><i class="fa fa-user fa-3x espacio-menu"></i></div>';
      html += '<div class="divider"></div>';
      html += '<label>Perfil</label>';
      html += '</div>';
      html += '</div>';     
      
      html += '<div class="col s4 offset-s2 card" id="btn-horario">';
      html += '<div class="section">';
      html += '<div><i class="fa fa-clock-o fa-3x espacio-menu"></i></div>';
      html += '<div class="divider"></div>';
      html += '<label>Horario</label>';
      html += '</div>';
      html += '</div>';
      
      html += '<div class="col s4 offset-s1 card" id="btn-notas">';
      html += '<div class="section">';
      html += '<div><i class="fa fa-check fa-3x espacio-menu"></i></div>';
      html += '<div class="divider"></div>';
      html += '<label>Calificaciones</label>';
      html += '</div>';
      html += '</div>';
      
      html += '<div class="col s4 offset-s2 card" id="btn-calendar">';
      html += '<div class="section">';
      html += '<div><i class="fa fa-calendar fa-3x espacio-menu"></i></div>';
      html += '<div class="divider"></div>';
      html += '<label>Calendario</label>';
      html += '</div>';
      html += '</div>';
      
      html += '<div class="col s4 offset-s1 card" id="btn-oficinas">';
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


      $('#menuestu').append(html);


      $('#btn-perfil').on('click', function (){
          paginasestu.Perfil();
      });
      
      $('#btn-horario').on('click', function (){
          paginasestu.Horario();
      });
      
      $('#btn-notas').on('click', function (){
          paginasestu.Calificaciones();
      });
      
      $('#btn-calendar').on('click', function (){
          paginasestu.Calendario();
      });
      
      $('#btn-oficinas').on('click', function (){
          paginasestu.Oficinas();
      });
      
      $('#btn-salir').on('click', function (){
          estudiante.Salir();
      });
      
});

