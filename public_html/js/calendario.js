/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global moment, calendario, estudiante, paginasestu */

// nuevo proyecto

$(document).ready(function (){
    
    //Data picker
    
    $('.datepicker').pickadate({
        selectMonths: true, 
        selectYears: 15 
    });
    
    //Collapsible para guardar fechas
    
    $('.collapsible').collapsible({
        accordion : false 
    });
    
    $('textarea#textarea1').characterCounter();
    
    $("#textarea1").keyup(function(){
         $("#contador").text($(this).val().length);
     });    
    
    var cero = 0;
    $('#contador').html(cero);
     
     
    
    moment.locale('es', {
        
         months : "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split("_"),
         monthsShort : "Ene._Feb._Mar._Abr._May._Jun._Jul._Ago._Sept._Oct._Nov._Dic.".split("_"),
         weekdays : "Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado".split("_"),
         weekdaysShort : "Dom._Lun._Mar._Mier._Jue._Vier._Sab.".split("_"),
         weekdaysMin : "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_")
    
    });
     
    
     
     function DiaHoy(){  
         
          var date = moment().format();
         
         var fecha = {
            
            year: moment(new Date(date)).format('YYYY'),
            mes: moment(new Date(date)).format('MMMM'),
            dia: moment(new Date(date)).format('dddd'),
            diafecha: moment(new Date(date)).format('D')
            
         };
         
         $('#diasemana').append(fecha.dia);
         $('#diafecha').append(fecha.diafecha);
         $('#mes').append(fecha.mes);
         $('#year').append(fecha.year);
         
     }
     
     DiaHoy();
     
     $('#btn-prueba').on('click', function (){
         
         var date, text_area, mensaje, hoy, registro, date_2, date_3;        
         
         
         hoy = moment().format('YYYY-MM-DD');
         date = $('#date-campo').val();
         text_area = $('#textarea1').val();
         
         
         date_2 = moment(new Date(date)).format('YYYY-MM-DD');
         //console.log(date_2);         
         
         if( date_2 === 'Invalid date' || text_area === ''){
             
             mensaje = '<label class="mensaje-error-tarea">No hay fecha y/o tarea para guardar</label>';
             
             $('#error-tarea').empty();
             $('#error-tarea').html(mensaje);
             
         }else if(date_2 === hoy){
             //var date2 = moment(new Date(date)).format('YYYY-MM-DD');
             //console.log(date2);
             registro = {
                 tarea: text_area,
                 fecha: date_2                 
             };
             
             tareas.ConsultaFilas(registro);
             //console.log('Iguales');
         }else{
             date_3 = date_2;
             registro = {
                 tarea: text_area,
                 fecha: date_3                 
             };
             tareas.ConsultaFilas(registro);
             //console.log('esta ambos datos fecha de otro dia');
         }
         
     });
     
     
     
     var tareas = new Tareas();
     
     function Tareas(){
         
         Tareas.prototype.ConsultaFilas = function (registro){
             
              var sqlSelect, db, fila;
              
              db = estudiante.CrearDB();
              
              sqlSelect = 'SELECT * FROM Tareas';
              
             db.transaction(function (tx){
                 tx.executeSql(sqlSelect,[], function (tx, results){
                     
                     var largo;                     
                     largo = results.rows.length;
                     //console.log(largo);
                     fila = largo + 1;
                     
                     if(registro.date_2){
                         tareas.RegistrarHoy(fila, registro);
                     }else{
                         tareas.Registrar(fila, registro); 
                     }
                     
                 });
             });
             
         };
         
         Tareas.prototype.RegistrarHoy = function (fila, registro){
             
             //console.log(fila, registro);
             
             var sqlInsert, db, mensaje;
             
             db = estudiante.CrearDB();
             sqlInsert = 'INSERT INTO Tareas(fila, tarea, fecha) VALUES(?,?,?)';
             
             db.transaction(function (tx){
                 tx.executeSql(sqlInsert, [fila, registro.tarea, registro.fecha]);
                 mensaje = '<label class="mensaje-success-tarea">Tarea registrada</label>';
             
                 $('#error-tarea').empty();
                 $('#error-tarea').html(mensaje);
                 
             });
             
             tareas.Limpiar();
             
         };         
         
         
         Tareas.prototype.Registrar = function (fila, registro){
             
             var sqlInsert, db, mensaje;
             
             db = estudiante.CrearDB();
             sqlInsert = 'INSERT INTO Tareas(fila, tarea, fecha) VALUES(?,?,?)';
             
             db.transaction(function (tx){
                 tx.executeSql(sqlInsert, [fila, registro.tarea, registro.fecha]);
                 mensaje = '<label class="mensaje-success-tarea">Tarea registrada</label>';
             
                 $('#error-tarea').empty();
                 $('#error-tarea').html(mensaje);
                 
                 tareas.Limpiar();
             });
             
         };
         
         
         
         Tareas.prototype.Limpiar = function (){
             
             var limpio, cero;
             
             limpio = '';
             cero = 0;
             
             $('#contador').html(cero);
             $('#date-campo').val(limpio);
             $('#textarea1').val(limpio);
             
             tareas.ConsultarHoy();
             
         };
         
         
         Tareas.prototype.ConsultarHoy = function (){
             
             //console.log('sirve');
             var db, sqlSelect, fecha_hoy, cantidad, i, task, html, lista_tareas, hoy;
             
             db = estudiante.CrearDB();
             sqlSelect = 'SELECT * FROM Tareas WHERE fecha = ?';
             lista_tareas = $('#list-task');
             
             //hoy = moment().format();
             fecha_hoy = moment().format('YYYY-MM-DD');             
             
             db.transaction(function (tx){
                 tx.executeSql(sqlSelect,[fecha_hoy], function (tx, results){
                     
                     cantidad = results.rows.length;
                     //console.log(cantidad);
                     
                     if(cantidad === 0){
                         
                         //console.log('sin tareas');
                         lista_tareas.empty();
                         html = '<tr>';
                         html += '<td class="row">';
                         html += '<div class="col s12">No hay tareas</div>';
                         html += '</td>';
                         html += '</tr>';
                         
                         lista_tareas.append(html);
                         
                     }else{
                         
                         lista_tareas.empty();
                     
                         for(i=0 ; i< cantidad ; i++){

                             task = results.rows.item(i);
                             //console.log(task);

                             html = '<tr>';
                             html += '<td class="row">';
                             html += '<div class="col s10">'+ task.tarea +'</div>';
                             html += '<button class="col s2 btn-flat" data-fila="'+ task.fila +'" data-fecha="'+ task.fecha +'">';
                             html += '<i class="fa fa-times fa-lg"></i>';
                             html += '</button>';
                             html += '</td>';
                             html += '</tr>';

                             lista_tareas.append(html);
                         } 
                         
                     }
                     
                                         
                     
                 });
             });
             
             
         };
         
         Tareas.prototype.Consulta = function (fecha){
             
             var db, sqlConsulta, cantidad, lista_tareas, html, task;
             
             db = estudiante.CrearDB();
             sqlConsulta = 'SELECT * FROM Tareas WHERE fecha = ?';
             lista_tareas = $('#list-task');
             
             db.transaction(function (tx){
                 tx.executeSql(sqlConsulta, [fecha], function (tx, results){
                     
                     cantidad = results.rows.length;
                     //console.log(cantidad);
                     lista_tareas.empty();
                     
                     for(i=0 ; i< cantidad ; i++){
                         
                         task = results.rows.item(i);
                         //console.log(task);
                         
                         html = '<tr>';
                         html += '<td class="row">';
                         html += '<div class="col s10">'+ task.tarea +'</div>';
                         html += '<button class="col s2 btn-flat" data-fila="'+ task.fila +'" data-fecha="'+ task.fecha +'">';
                         html += '<i class="fa fa-times fa-lg"></i>';
                         html += '</button>';
                         html += '</td>';
                         html += '</tr>';
                         
                         lista_tareas.append(html);
                     }
                     
                 });
             });
             
         };
         
         Tareas.prototype.Eliminar = function (fila, fecha){
             
             var db, sqlDelete, fecha_hoy;
             //console.log(fila);
             
             db = estudiante.CrearDB();
             sqlDelete = 'DELETE FROM Tareas WHERE fila = ?';
             fecha_hoy = moment().format('YYYY-MM-DD');
             
             db.transaction(function(tx){
                 
                 if(fecha === fecha_hoy){
                     tx.executeSql(sqlDelete, [fila]);
                     tareas.ConsultarHoy();
                 }else{
                     tx.executeSql(sqlDelete, [fila]);
                     tareas.Consulta(fecha);
                 }                 
                 
             });
         };
         
         
     }
     
     tareas.ConsultarHoy();     
     
     $(document).on('click', '#list-task button', function(){
         
         var fecha, fila;
         
         fecha = $(this).data('fecha');
         fila = $(this).data('fila');         
         
         tareas.Eliminar(fila, fecha);
         
     }); 
         
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

     $('#list-calificaciones').on('click', function (){

        $('.button-collapse').sideNav('hide'); 
        paginasestu.Calificaciones();

     });
     
     $('#list-oficinas').on('click', function (){
        
        $('.button-collapse').sideNav('hide'); 
        paginasestu.Oficinas();

    });
    
});