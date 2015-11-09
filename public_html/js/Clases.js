/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var estudiante = new Estudiante();

function Estudiante(){
    
    Estudiante.prototype.Informacion = function (data){
        
        var saludo, estu;
        
        //console.log(data);
        
        Info_Estu = {
            carnet_estu: data.estudiante,
            horario_estu: data.materias
        };
        
        estu = data.estudiante;
        
        saludo = {
             nombre: estu.NombEstu,
             apellido: estu.ApelEstu
        };
        
        localStorage.setItem('estudiante', JSON.stringify(saludo));
        
        estudiante.CrearTablas();
    };
    
    Estudiante.prototype.getInformacion = function (){
        return Info_Estu;
    };
        
    Estudiante.prototype.CrearDB = function (){
        
        var nombrecorto = 'DB UNICESAR';
        var version = '1.0';
        var nombrebase = 'db upc';
        var size = 10*1024*1024;    

        var db = openDatabase(nombrecorto, version, nombrebase, size);
        return db;
        
    };
    
    Estudiante.prototype.CrearTablas = function (){
        
        var sqlCarnet, sqlHorarioEs, sqlNotasEs, sqlAgenda, sqlOficinas, db;        
        db = estudiante.CrearDB();
        
        db.transaction(function (tx){
            
            sqlCarnet = 'CREATE TABLE IF NOT EXISTS Estudiante(cedula integer primary key, nombre text,\n\
                         apellido text, rol integer, facultad text, programa text, semestre integer)';
            
            sqlHorarioEs = 'CREATE TABLE IF NOT EXISTS Horario(codigo text primary key, grupo integer,\n\
                            nombre text, creditos integer, dia text, hora text, lugar text, \n\
                            nota1 float, nota2 float, nota3 float)';
            
            sqlNotasEs =  'CREATE TABLE IF NOT EXISTS Calificaciones(nombre text primary key, nota1 float,\n\
                           nota2 float, nota3 float)';
            
            sqlAgenda = 'CREATE TABLE IF NOT EXISTS Tareas(fila integer primary key, tarea text, fecha text)';
            
            sqlOficinas = 'CREATE TABLE IF NOT EXISTS Oficinas(nombre text primary key, director text, \n\
                                                               telefono integer, correo text)';
            
            tx.executeSql(sqlCarnet);
            tx.executeSql(sqlHorarioEs);
            tx.executeSql(sqlNotasEs);
            tx.executeSql(sqlAgenda);
            tx.executeSql(sqlOficinas);
            
        });
        
        estudiante.InsertarPerfil();
    };
    
    Estudiante.prototype.InsertarPerfil = function (){
        
        var db, SqlGuardar, SqlDelete, SqlBuscar, mostrar, Perfil, info;
        
        db = estudiante.CrearDB();
        info = estudiante.getInformacion();
        Perfil = info.carnet_estu;
        SqlBuscar = 'SELECT * FROM Estudiante';
        SqlGuardar = 'INSERT INTO Estudiante(cedula, nombre, apellido, rol, facultad, programa, semestre) VALUES(?,?,?,?,?,?,?)';                                              
        SqlDelete = 'DELETE FROM Estudiante';      
        
        
        db.transaction(function (tx) {
            
            tx.executeSql(SqlBuscar, [], function (tx, results){
                
                mostrar = results.rows.length;
                
                if (mostrar === 0){                      
                    
                    tx.executeSql(SqlGuardar, [Perfil.CeduEstu, Perfil.NombEstu, Perfil.ApelEstu, Perfil.RolEstu, 
                                               Perfil.FacuEstu, Perfil.ProgEstu, Perfil.Semestre]);
                    
                }else{
                    
                    tx.executeSql(SqlDelete);
                    
                    tx.executeSql(SqlGuardar, [Perfil.CeduEstu, Perfil.NombEstu, Perfil.ApelEstu, Perfil.RolEstu, 
                                               Perfil.FacuEstu, Perfil.ProgEstu, Perfil.Semestre]); 
                                        
                }
                
            });
            
        });
        estudiante.ConsultarPerfil();
    };
    
    Estudiante.prototype.ConsultarPerfil = function (){
        
        var db, SqlConsulta, row, perfil;
        
        db = estudiante.CrearDB();
        
        SqlConsulta = 'SELECT * FROM Estudiante';
        
        db.transaction(function (tx) {
            
            tx.executeSql(SqlConsulta, [], function (tx, results){
                
                var numero = results.rows.length;
                //var saludo = new Object();
                
                for (var i=0;i<numero;i++){
                    
                    row = results.rows.item(i);
                    
                    perfil = {
                        
                        cedula: row.cedula, 
                        nombre: row.nombre,
                        apellido: row.apellido,
                        rol: "Estudiante",
                        facultad: row.facultad,
                        programa: row.programa,
                        semestre: row.semestre                       
                        
                    };                
                }
                //console.log(saludo);
                estudiante.setPerfil(perfil);
                                                                              
            });
            
        });
        
    };
    
    Estudiante.prototype.setPerfil = function (perfil){
        perfilestu = perfil;
        estudiante.InsertarHorario();
    };
    
    Estudiante.prototype.getPerfil = function (){
        return perfilestu;
    };
    
    Estudiante.prototype.InsertarHorario = function (){
        
        var db, SqlGuardar, SqlDelete, SqlBuscar, mostrar, largo, horario, info;
        
        db = estudiante.CrearDB();
        info = estudiante.getInformacion();
        horario = info.horario_estu;
        
        SqlBuscar = 'SELECT * FROM Horario';
        
        SqlGuardar = 'INSERT INTO Horario(codigo, grupo, nombre, creditos, dia, hora, lugar, nota1, nota2, nota3) \n\
                      VALUES(?,?,?,?,?,?,?,?,?,?)';                                                                                                 
       
        SqlDelete = 'DELETE FROM Horario';
        largo = horario.length;
        //console.log(horario);
        
        db.transaction(function (tx) {
            
            tx.executeSql(SqlBuscar, [], function (tx, results){
                
                mostrar = results.rows.length;
                
                if (mostrar === 0){

                       for(var i = 0; i < largo; i++){
                            tx.executeSql(SqlGuardar, [horario[i].CodiAsig, horario[i].Grupo, horario[i].NombAsig, horario[i].Creditos,
                                                       horario[i].DiaAsig, horario[i].HoraAsig, horario[i].LugarAsig, 
                                                       horario[i].Nota1, horario[i].Nota2, horario[i].Nota3]);
                       }

                }else{

                       tx.executeSql(SqlDelete);

                       for(var i = 0; i < largo; i++){
                            tx.executeSql(SqlGuardar, [horario[i].CodiAsig, horario[i].Grupo, horario[i].NombAsig, horario[i].Creditos,
                                                       horario[i].DiaAsig, horario[i].HoraAsig, horario[i].LugarAsig, 
                                                       horario[i].Nota1, horario[i].Nota2, horario[i].Nota3]); 
                                                      
                       }
               }
                
            });
            
        });
        estudiante.ConsultarHorario();
    };
    
    Estudiante.prototype.ConsultarHorario = function (){
        
        var db, SqlConsulta;
        
        db = estudiante.CrearDB();
        SqlConsulta = 'SELECT * FROM Horario';
        
        db.transaction(function (tx) {                                   
                                   
           tx.executeSql(SqlConsulta,[],function (tx,results){
               
              var len = results.rows.length, i, k;
              var asignaturas = [];
              //console.log(len);
              var asignatura = {};
              
              
              for(i = 0; i < len; i++){
                                              
                  var row = results.rows.item(i);

                    asignatura = {
                        codigo: row.codigo,
                        grupo: row.grupo,
                        nombre: row.nombre,
                        creditos: row.creditos,
                        dia: row.dia,
                        hora: row.hora,
                        lugar: row.lugar
                    };

                    asignaturas.push(asignatura);                   
               }
                
               estudiante.setHorario(asignaturas);
               
               var calificaciones, notas;
               calificaciones = [];
               notas = {};
               
               for(k = 0; k < len; k++){
                   
                   var row = results.rows.item(k);
                   
                   notas = {
                       nombre: row.nombre,
                       nota1: row.nota1,
                       nota2: row.nota2,
                       nota3: row.nota3
                   };
                   
                   calificaciones.push(notas);
                   
               }
               
               //console.log(calificaciones);
               estudiante.setCalificaciones(calificaciones);
               
           });      
             
        });
        
    };
    
    Estudiante.prototype.setHorario = function (horario){
        horarioestu = horario;
    };
    
    Estudiante.prototype.getHorario = function (){
        return horarioestu;
    };
    
    Estudiante.prototype.setCalificaciones = function (notas){
        calificaciones = notas;
        estudiante.Menu();
    };
    
    Estudiante.prototype.getCalificaciones = function (){
        return calificaciones;
    };
    
    Estudiante.prototype.Salir = function (){
        
        var alumno, horario, calificaciones, tareas, oficinas, db;
        
        db = estudiante.CrearDB();
        
        db.transaction(function (tx){
            
            alumno = 'DROP TABLE Estudiante';
            horario = 'DROP TABLE Horario';
            calificaciones = 'DROP TABLE Calificaciones';
            tareas = 'DROP TABLE Tareas';
            oficinas = 'DROP TABLE Oficinas';
            
            tx.executeSql(alumno);
            tx.executeSql(horario);
            tx.executeSql(calificaciones);
            tx.executeSql(tareas);
            tx.executeSql(oficinas);
            
            $('#contenedor').load('index.html');
            
        });
        
        localStorage.removeItem('estudiante');
    };
    
    Estudiante.prototype.Menu = function (){
        
        var component = 'menuestu.html';
        
        $.ajax({
            mimeType: 'text/html; charset=utf-8', 
            url: component,
            type: 'GET',
            dataType: "html",
            async: true,
            success: function(data) {
                $('#contenedor').html(data);
                $('body').removeClass('loading-page');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
        
    };
    
    Estudiante.prototype.Cargando = function (){
        var component = 'cargando.html';
        
        $.ajax({
            mimeType: 'text/html; charset=utf-8', 
            url: component,
            type: 'GET',
            dataType: "html",
            async: true,
            success: function(data) {
                $('#contenedor').html(data);
                $('body').addClass('loading-page');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    };
    
    var perfilestu, horarioestu, calificaciones, Info_Estu;
}


var paginasestu = new PaginasEstu();

function PaginasEstu(){
    
    PaginasEstu.prototype.Perfil = function (){
        
        var component = 'perfilestu.html';
        
        $.ajax({
            mimeType: 'text/html; charset=utf-8', 
            url: component,
            type: 'GET',
            dataType: "html",
            async: true,
            success: function(data) {
                $('#contenedor').html(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
        
    };
    
    PaginasEstu.prototype.Horario = function (){
        
        var component = 'horarioestu.html';
        
        $.ajax({
            mimeType: 'text/html; charset=utf-8', 
            url: component,
            type: 'GET',
            dataType: "html",
            async: true,
            success: function(data) {
                $('#contenedor').html(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
        
    };
    
    PaginasEstu.prototype.Calificaciones = function (){
        
        var component = 'notasestu.html';
        
        $.ajax({
            mimeType: 'text/html; charset=utf-8', 
            url: component,
            type: 'GET',
            dataType: "html",
            async: true,
            success: function(data) {
                $('#contenedor').html(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
        
    };
    
    PaginasEstu.prototype.Calendario = function (){
        
        var component = 'calendario.html';
        
        $.ajax({
            mimeType: 'text/html; charset=utf-8', 
            url: component,
            type: 'GET',
            dataType: "html",
            async: true,
            success: function(data) {
                $('#contenedor').html(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
        
    };
    
    PaginasEstu.prototype.Oficinas = function (){
        
        var component = 'oficinas.html';
        
        $.ajax({
            mimeType: 'text/html; charset=utf-8', 
            url: component,
            type: 'GET',
            dataType: "html",
            async: true,
            success: function(data) {
                $('#contenedor').html(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
        
    };
    
};


var profesor = new Profesor();

function Profesor(){
    
    Profesor.prototype.Informacion = function (data){
        
        var prof, saludoprof;
        
        console.log(data);
        
        Info_Prof = {
            carnet_prof: data.profesor,
            hora_prof: data.materias
        };
        
        prof = data.profesor;
        
        saludoprof = {
             nombre: prof.NombProf,
             apellido: prof.ApelProf
        };
        
        localStorage.setItem('profesor', JSON.stringify(saludoprof));
        
        profesor.Tablas();
    };
    
    Profesor.prototype.getInformacion = function (){
        return Info_Prof;
    };
    
    Profesor.prototype.CrearDB = function (){
        
        var nombrecorto = 'DB UNICESAR';
        var version = '1.0';
        var nombrebase = 'db upc';
        var size = 10*1024*1024;    

        var db = openDatabase(nombrecorto, version, nombrebase, size);
        return db;
        
    };
    
    Profesor.prototype.Tablas = function (){
        
        var sqlCarnet, sqlHorariop, sqlGrupos, sqlAgenda, sqlOficinas, db;        
        db = profesor.CrearDB();
        
        db.transaction(function (tx){
            
            sqlCarnet = 'CREATE TABLE IF NOT EXISTS Profesor(cedula integer primary key, nombre text,\n\
                         apellido text, rol integer, facultad text, programa text)';
            
            sqlHorariop = 'CREATE TABLE IF NOT EXISTS HorarioP(fila integer primary key, codigo text, grupo integer,\n\
                            nombre text, creditos integer, dia text, hora text, lugar text)';                            
            
            sqlGrupos =  'CREATE TABLE IF NOT EXISTS Grupo(fila integer primary key,cedula integer , nombre text,\n\
                           apellido text, asignatura text, codigo text, nota_1 float, nota_2 float, nota_3 float)';
            
            sqlAgenda = 'CREATE TABLE IF NOT EXISTS Tareas(fila integer primary key, tarea text, fecha text)';
            
            sqlOficinas = 'CREATE TABLE IF NOT EXISTS Oficinas(nombre text primary key, director text, \n\
                                                               telefono integer, correo text)';
            
            tx.executeSql(sqlCarnet);
            tx.executeSql(sqlHorariop);
            tx.executeSql(sqlGrupos);
            tx.executeSql(sqlAgenda);
            tx.executeSql(sqlOficinas);
            
        });   
        profesor.InsertarPerfil();
    };
    
    Profesor.prototype.InsertarPerfil = function (){
        
        var db, SqlGuardar, SqlDelete, SqlBuscar, mostrar, info, Perfilp;
        
        db = profesor.CrearDB();
        info = profesor.getInformacion();
        Perfilp = info.carnet_prof;
        
        SqlBuscar = 'SELECT * FROM Profesor';
        SqlGuardar = 'INSERT INTO Profesor(cedula, nombre, apellido, rol, facultad, programa) VALUES(?,?,?,?,?,?)';                                              
        SqlDelete = 'DELETE FROM Profesor';   
        
        db.transaction(function (tx) {
            
            tx.executeSql(SqlBuscar, [], function (tx, results){
                
                mostrar = results.rows.length;
                
                if (mostrar === 0){                      
                    
                    tx.executeSql(SqlGuardar, [Perfilp.CeduProf, Perfilp.NombProf, Perfilp.ApelProf, 
                                               Perfilp.RolProf, Perfilp.FacuProf, Perfilp.ProgProf]); 
                                               
                    
                    
                    
                }else{
                    
                    tx.executeSql(SqlDelete);
                    
                    tx.executeSql(SqlGuardar, [Perfilp.CeduProf, Perfilp.NombProf, Perfilp.ApelProf, 
                                               Perfilp.RolProf, Perfilp.FacuProf, Perfilp.ProgProf]);
                                                
                                        
                }
                
            });
            
        });
        profesor.ConsultaPerfil();
    };
    
    Profesor.prototype.ConsultaPerfil = function (){
        
        var db, SqlConsulta, row;
        
        db = profesor.CrearDB();
        
        SqlConsulta = 'SELECT * FROM Profesor';
        
        db.transaction(function (tx) {
            
            tx.executeSql(SqlConsulta, [], function (tx, results){
                
                var numero = results.rows.length;
                //var saludo = new Object();
                var perfilp = {};
                
                for (var i=0;i<numero;i++){
                    
                    row = results.rows.item(i);
                    
                    perfilp = {
                        
                        cedula: row.cedula, 
                        nombre: row.nombre,
                        apellido: row.apellido,
                        rol: "Profesor",
                        facultad: row.facultad,
                        programa: row.programa
                        
                    };                
                }
                
                profesor.setPerfil(perfilp);
                                                                              
            });
            
        });
        
    };
    
    Profesor.prototype.setPerfil = function (carnetp){
        perfilprof = carnetp;
        //console.log(perfilprof);
        profesor.InsertarHorario();
    };
    
    Profesor.prototype.getPerfil = function (){
        return perfilprof;
    };
    
    
    Profesor.prototype.InsertarHorario = function (){
        
        var db, SqlGuardar, SqlDelete, SqlDelete_2, SqlBuscar, mostrar, largo,
                auto, lista, asig_grupo, Listado, codigo_asig, nombreasig, nombre, info, horaprof;
        var grupos = [];
        var asignatura = {};
        
        db = profesor.CrearDB();
        info = profesor.getInformacion();
        horaprof = info.hora_prof;
        SqlBuscar = 'SELECT * FROM HorarioP';
        SqlGuardar = 'INSERT INTO HorarioP(fila, codigo, grupo, nombre, creditos, dia, hora, lugar) VALUES(?,?,?,?,?,?,?,?)';       
        SqlDelete = 'DELETE FROM HorarioP';
        SqlDelete_2 = 'DELETE FROM Grupo';
        largo = horaprof.length;
        //console.log(largo);
        
        db.transaction(function (tx) {
            
            tx.executeSql(SqlBuscar, [], function (tx, results){
                
                mostrar = results.rows.length;
                
                if (mostrar === 0){

                       for(var i = 0; i < largo; i++){
                            
                            auto = i + 1;
                            
                            
                            tx.executeSql(SqlGuardar, [auto, horaprof[i].CodiAsig, horaprof[i].Grupo, horaprof[i].NombAsig, horaprof[i].Creditos,
                                                       horaprof[i].DiaAsig, horaprof[i].HoraAsig, horaprof[i].LugarAsig]);
                                                   
                            lista = horaprof[i].Listado.length;
                            nombreasig = horaprof[i].NombAsig;
                            nombre = nombreasig.replace(/\s+/g, '');
                            asig_grupo = (nombre+'-'+horaprof[i].Grupo);
                            Listado = horaprof[i].Listado;
                            codigo_asig = horaprof[i].CodiAsig;
                            
                            asignatura = {
                                nombreasig: asig_grupo,
                                codigoasig: codigo_asig
                            };
                            
                            grupos.push(asignatura);
                            
                            profesor.InsertarGrupos(lista, Listado, asig_grupo, codigo_asig); 

                       }
                       
                       profesor.ConsultaHorario();
                       profesor.setGrupos(grupos);

                }else{

                       tx.executeSql(SqlDelete);
                       tx.executeSql(SqlDelete_2);

                       for(var i = 0; i < largo; i++){
                           
                            auto = i + 1;                            
                            
                            tx.executeSql(SqlGuardar, [auto, horaprof[i].CodiAsig, horaprof[i].Grupo, horaprof[i].NombAsig, horaprof[i].Creditos,
                                                       horaprof[i].DiaAsig, horaprof[i].HoraAsig, horaprof[i].LugarAsig]); 
                            
                            lista = horaprof[i].Listado.length;
                            nombreasig = horaprof[i].NombAsig;
                            nombre = nombreasig.replace(/\s+/g, '');
                            asig_grupo = (nombre+'-'+horaprof[i].Grupo);
                            Listado = horaprof[i].Listado;
                            codigo_asig = horaprof[i].CodiAsig;
                            
                            asignatura = {
                                nombreasig: asig_grupo,
                                codigoasig: codigo_asig
                            };
                            
                            grupos.push(asignatura);
                            
                            profesor.InsertarGrupos(lista, Listado, asig_grupo, codigo_asig);
                            
                       }                       
                       profesor.ConsultaHorario();
                       profesor.setGrupos(grupos);
                }
                
            });
            
        });
        
    };
    
    
    Profesor.prototype.ConsultaHorario = function (){
        
        var db, SqlConsulta, fila, row;
        
        db = profesor.CrearDB();
        SqlConsulta = 'SELECT * FROM HorarioP';
        
        db.transaction(function (tx) {                                   
                                   
           tx.executeSql(SqlConsulta,[],function (tx,results){
               
              var len = results.rows.length, i;
              var asignaturas = [];
              //console.log(len);
              var asignatura = {};
              
              for(i=0 ; i<len ; i++){
                                              
                    row = results.rows.item(i);

                    asignatura = {
                        codigo: row.codigo,
                        grupo: row.grupo,
                        nombre: row.nombre,
                        creditos: row.creditos,
                        dia: row.dia,
                        hora: row.hora,
                        lugar: row.lugar
                    };

                    asignaturas.push(asignatura);

               }
                //console.log(asignaturas);
               profesor.setHorario(asignaturas);  
               
           });      
             
        });
        
    };
    
    
    Profesor.prototype.setHorario = function (horariop){
        horarioprof = horariop;
    };
    
    Profesor.prototype.getHorario = function (){
        return horarioprof;
    };
    
    Profesor.prototype.InsertarGrupos = function (lista, Listado, asig_grupo, codigo_asig){        
        
         //console.log(Listado[0], asig_grupo, Listado[1], asig_grupo);         
        
         var SqlGrupos, SqlSelect, db, j, largo, sum; 
         
         db = profesor.CrearDB();        
         SqlGrupos = 'INSERT INTO Grupo(fila, cedula, nombre, apellido, asignatura, codigo, nota_1, nota_2, nota_3)\n\
                                        VALUES(?,?,?,?,?,?,?,?,?)';  
         SqlSelect = 'SELECT * FROM Grupo';
         
         db.transaction(function (tx) {
             
             tx.executeSql(SqlSelect, [], function (tx, results){
                 
                 largo = results.rows.length;
                 //console.log(largo, lista);
                 
                 if(largo === 0){
                     
                     for(j=0; j<lista; j++){
                        //console.log(Listado[0], asig_grupo);
                        tx.executeSql(SqlGrupos, [j,Listado[j].CeduEstu, Listado[j].NombEstu, Listado[j].ApelEstu,
                                                  asig_grupo, codigo_asig, Listado[j].Nota1, Listado[j].Nota2, Listado[j].Nota3]);

                     }
                     
                 }else{
                     
                     for(j=0; j<lista; j++){
                        sum = largo+j;
                        //console.log(Listado[j], asig_grupo, sum);
                        tx.executeSql(SqlGrupos, [sum,Listado[j].CeduEstu, Listado[j].NombEstu, Listado[j].ApelEstu,
                                                  asig_grupo, codigo_asig, Listado[j].Nota1, Listado[j].Nota2, Listado[j].Nota3]);

                     }
                     
                 }
                 
             });

         });
         
    };
    
    
    Profesor.prototype.ConsultaGrupos = function (){
        
        var sqlConsultar;
        
        sqlConsultar = '';
        
    };
    
    Profesor.prototype.setGrupos = function (grupos){
        gruposprof = grupos;
        profesor.Menu();
    };
    
    Profesor.prototype.getGrupos = function (){
        return gruposprof;
    };
    
    Profesor.prototype.Salir = function (){
        
        var docente, horario, grupos, tareas, oficinas, db;
        
        db = estudiante.CrearDB();
        
        db.transaction(function (tx){
            
            docente = 'DROP TABLE Profesor';
            horario = 'DROP TABLE HorarioP';
            grupos = 'DROP TABLE Grupo';
            tareas = 'DROP TABLE Tareas';
            oficinas = 'DROP TABLE Oficinas';
            
            tx.executeSql(docente);
            tx.executeSql(horario);
            tx.executeSql(grupos);
            tx.executeSql(tareas);
            tx.executeSql(oficinas);
            
            $('#contenedor').load('index.html');
            
        });
        
        localStorage.removeItem('profesor');
        
    };
    
    Profesor.prototype.Menu = function (){
        var component = 'menuprof.html';
        
        $.ajax({
            mimeType: 'text/html; charset=utf-8', 
            url: component,
            type: 'GET',
            dataType: "html",
            async: true,
            success: function(data) {
                $('#contenedor').html(data);
                $('body').removeClass('loading-page');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    };
    
    Profesor.prototype.Cargando = function (){
        
        var component = 'cargando.html';
        
        $.ajax({
            mimeType: 'text/html; charset=utf-8', 
            url: component,
            type: 'GET',
            dataType: "html",
            async: true,
            success: function(data) {
                $('#contenedor').html(data);
                $('body').addClass('loading-page');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
        
    };
    
    var perfilprof, horarioprof, gruposprof, Info_Prof;    
    
}

var paginasprof = new Paginasprof();

function  Paginasprof(){
    
    Paginasprof.prototype.Perfil = function (){
        
        var component = 'perfilprof.html';
        
        $.ajax({
            mimeType: 'text/html; charset=utf-8', 
            url: component,
            type: 'GET',
            dataType: "html",
            async: true,
            success: function(data) {
                $('#contenedor').html(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
        
    };
    
    Paginasprof.prototype.Horario = function (){
        
        var component = 'horarioprof.html';
        
        $.ajax({
            mimeType: 'text/html; charset=utf-8', 
            url: component,
            type: 'GET',
            dataType: "html",
            async: true,
            success: function(data) {
                $('#contenedor').html(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
        
    };
    
    Paginasprof.prototype.Grupos = function (){
        
        var component = 'grupos.html';
        
        $.ajax({
            mimeType: 'text/html; charset=utf-8', 
            url: component,
            type: 'GET',
            dataType: "html",
            async: true,
            success: function(data) {
                $('#contenedor').html(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
        
    };
    
    Paginasprof.prototype.Calendario = function (){
        
        var component = 'calendariop.html';
        
        $.ajax({
            mimeType: 'text/html; charset=utf-8', 
            url: component,
            type: 'GET',
            dataType: "html",
            async: true,
            success: function(data) {
                $('#contenedor').html(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
        
    };
    
    Paginasprof.prototype.Oficinas = function (){
        
        var component = 'oficinasp.html';
        
        $.ajax({
            mimeType: 'text/html; charset=utf-8', 
            url: component,
            type: 'GET',
            dataType: "html",
            async: true,
            success: function(data) {
                $('#contenedor').html(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
        
    };
    
}


//var calendario = new Calendario();
//
//function Calendario(){
//    
//    moment.locale('es', {
//        
//         months : "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split("_"),
//         monthsShort : "Ene._Feb._Mar._Abr._May._Jun._Jul._Ago._Sept._Oct._Nov._Dic.".split("_"),
//         weekdays : "Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado".split("_"),
//         weekdaysShort : "Dom._Lun._Mar._Mier._Jue._Vier._Sab.".split("_"),
//         weekdaysMin : "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_")
//    
//    });   
//    
//}