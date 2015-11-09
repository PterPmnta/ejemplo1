/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global profesor, paginasprof */

$(document).ready(function (){
    
    
    function MenuGrupos(){
        
        var grupos, html, largo, i;
    
        grupos = profesor.getGrupos();
        //console.log(grupos);

        largo = grupos.length;
        //console.log(largo);

        for(i=0 ; i<largo ; i++){

            html = '<li data-codigo=' + grupos[i].nombreasig + '><p>'+ grupos[i].nombreasig +'</p><li>';            
            $('#dropdown1').append(html);
            
        }
        
    }
    
    MenuGrupos();
    
    
//    $('select').material_select();
//    
//    function Menu_Otro(){
//        
//        var grupos, html, largo, i;
//    
//        grupos = profesor.getGrupos();
//        largo = grupos.length;
//        
//        for(i=0 ; i<largo ; i++){
//            
//            html = '<option value=' + grupos[i].nombreasig + '>'+ grupos[i].nombreasig +'</option>';            
//            $('#menugrupos').append(html);
//            
//        }
//        
//    }
//    
//    Menu_Otro();
//    
//    $("#menugrupos").on("change", function (){
//        
//        var grupo, valor, selector;
//        
//        selector = $("#menugrupos");
//        grupo = selector.options[selector.selectedIndex].text;
//        valor = selector.options[selector.selectedIndex].value;
//        
//        console.log(grupo, valor);
//        
//    });
    
   
     
     $('#dropdown1 li').on('click', function (){
         
         Limpiar();
         
         var codigo = $(this).data('codigo');
         $('#opcion').append(codigo);
         
         AsignarGrupo(codigo);
     });
    
    
    function AsignarGrupo(codigo){
        
        var db, SqlConsulta, largo, i, estudiante, html;
        
        db = profesor.CrearDB();
        SqlConsulta = 'SELECT cedula, nombre, apellido FROM Grupo WHERE asignatura = ?';
        
        db.transaction(function (tx){
            
            tx.executeSql(SqlConsulta,[codigo], function (tx, results){
                    
                    largo = results.rows.length;
                    console.log(largo);
                    
                    for(i=0 ; i<largo ; i++){
                        
                        estudiante = results.rows.item(i);                        
                        
                        html = '<tr>';                       
                        html += '<td>'+ estudiante.cedula +'</td>';
                        html += '<td>'+ estudiante.nombre +' '+ estudiante.apellido +'</td>';
                        html += '</tr>';
                        
                        $('#lista-estudiante').append(html);
                        
                    }
            });
            
        });
        
    } 
    
    function Limpiar(){
        $('#opcion').empty();
        $('#lista-estudiante').empty();
    };
    
    
   $('.dropdown-button').dropdown({
//      inDuration: 300,
//      outDuration: 225,
//      constrain_width: false, // Does not change width of dropdown to that of the activator
//      hover: true, // Activate on hover
//      gutter: 0, // Spacing from edge
//      belowOrigin: false, // Displays dropdown below the button
//      alignment: 'left' // Displays dropdown with edge aligned to the left of button
    }
  );
  
  $('.button-collapse').sideNav();
    
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
    
    $('#list-calendario').on('click', function (){
        
        $('.button-collapse').sideNav('hide'); 
        paginasprof.Calendario();

    });
    
    $('#list-oficinas').on('click', function (){
        
        $('.button-collapse').sideNav('hide');
        paginasprof.Oficinas();

    });
    
});


