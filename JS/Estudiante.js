var UrlEstudiantes = 'http://20.216.41.245:90/G1_19/controller/estudiante.php?op=GetEstudiantes';
var UrlInsertEstudiante = 'http://20.216.41.245:90/G1_19/controller/estudiante.php?op=InsertEstudiante';
var UrlGetEstudiante = 'http://20.216.41.245:90/G1_19/controller/estudiante.php?op=GetEstudiante';
var UrlUpdatEstudiante = 'http://20.216.41.245:90/G1_19/controller/estudiante.php?op=UpdateEstudiante';
var UrlDeleteEstudiante = 'http://20.216.41.245:90/G1_19/controller/estudiante.php?op=DeleteEstudiante';

$(document).ready(function(){
    CargarEstudiantes();
});

function CargarEstudiantes(){
    $.ajax({
        url: UrlEstudiantes,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItem = response;
            var Valores = '';

            for(i=0; i< MiItem.length; i++){
                Valores += '<tr>'+
                '<td>'+ MiItem[i].NumeroAlumno +'</td>'+
                '<td>'+ MiItem[i].Nombre +'</td>'+
                '<td>'+ MiItem[i].Apellidos +'</td>'+
                '<td>'+ MiItem[i].FechaNacimiento +'</td>'+
                '<td>'+ MiItem[i].Direccion +'</td>'+
                '<td>'+ MiItem[i].Altura +'</td>'+
                '<td>'+ MiItem[i].Carrera +'</td>'+
                '<td>'+
                '<button class="btn btn-info" onclick="CargarEstudiante(\''+MiItem[i].NumeroAlumno.toString()+'\')"> Editar</button>'+
                '</td>'+
                '<td>'+
                `<button class="btn btn-danger" onclick="EliminarEstudiante('${MiItem[i].NumeroAlumno}')">Eliminar</button>`+
                '</td>'+
            '</tr>';
            $('#DataEstudiantes').html(Valores);
            }
        }
    });
} 

function AgregarEstudiante(){
    var datosEstudiante = {
        NUMERO_ALUMNO: $('#NumeroAlumno').val(),
        NOMBRE: $('#Nombre').val(),
        APELLIDOS: $('#Apellidos').val(),
        FECHA_NACIMIENTO: $('#FechaNacimiento').val(),
        DIRECCION: $('#Direccion').val(),
        ALTURA: $('#Altura').val(),
        CARRERA: $('#Carrera').val()
    };
    var datosEstudiantejson = JSON.stringify(datosEstudiante);
   
    $.ajax({
        url: UrlInsertEstudiante,
        type: 'POST',
        data: datosEstudiantejson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(response){
            console.log(response);
            alert('Estudiante Agregado Correctamente');
        },
        error: function(textStatus, errorThrown){
            alert('Error al agregar Estudiante' + textStatus + errorThrown);
        }
    });
    alert('AVISO');
}

function CargarEstudiante(numeroestudiante){
    var datosEstudiante = {
        NUMERO_ALUMNO: numeroestudiante
    };
    var datosEstudiantejson = JSON.stringify(datosEstudiante);
    console.log(datosEstudiante)
    $.ajax({
        url: UrlGetEstudiante,
        type: 'POST',
        data: datosEstudiantejson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response){
            
            var MiItem = response;
            $('#NumeroAlumno').val(MiItem[0].NumeroAlumno);
            $('#Nombre').val(MiItem[0].Nombre);
            $('#Apellidos').val(MiItem[0].Apellidos);
            $('#FechaNacimiento').val(MiItem[0].FechaNacimiento);
            $('#Direccion').val(MiItem[0].Direccion);
            $('#Altura').val(MiItem[0].Altura);
            $('#Carrera').val(MiItem[0].Carrera);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarEstudiante(\'' + MiItem[0].NumeroAlumno +'\')"'+
            'value="Actualizar Estudiante" class="btn btn-primary"></input>';
            $('#btnagregarestudiante').html(btnactualizar);
        } 
    });
}

function ActualizarEstudiante(idaestudiante){
    var datosEstudiante = {
        NUMERO_ALUMNO: idaestudiante,
        NOMBRE:$('#Nombre').val(),
        APELLIDOS:$('#Apellidos').val(),
        FECHA_NACIMIENTO:$('#FechaNacimiento').val(),
        DIRECCION:$('#Direccion').val(),
        ALTURA:$('#Altura').val(),
        CARRERA:$('#Carrera').val()
    };
    var datosEstudiantejson = JSON.stringify(datosEstudiante);

    $.ajax({
        url: UrlUpdatEstudiante,
        type: 'PUT',
        data: datosEstudiantejson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
            alert("Estudiante Actualizado");
        },
        error: function(textStatus, errorThrown){
            alert('Error al Actualizar Estudiante'+ textStatus + errorThrown);
        }
    });
    alert('Aviso');
    
}

function EliminarEstudiante(idaestudiante){
    var datosEstudiante = {
        NUMERO_ALUMNO: idaestudiante
    };
    var datosEstudiantejson = JSON.stringify(datosEstudiante);

    $.ajax({
        url: UrlDeleteEstudiante,
        type: 'DELETE',
        data: datosEstudiantejson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
        },
        
    });
    alert("Estudiante Eliminado");
    
    CargarEstudiantes();
}
