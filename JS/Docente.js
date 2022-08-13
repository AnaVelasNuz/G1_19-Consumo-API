var UrlDocentes = 'http://20.216.41.245:90/G1_19/controller/docente.php?op=GetDocentes';
var UrlInsertDocente = 'http://20.216.41.245:90/G1_19/controller/docente.php?op=InsertDocente';
var UrlGetDocente = 'http://20.216.41.245:90/G1_19/controller/docente.php?op=GetDocente';
var UrlUpdateDocente = 'http://20.216.41.245:90/G1_19/controller/docente.php?op=UpdateDocente';
var UrlDeleteDocente = 'http://20.216.41.245:90/G1_19/controller/docente.php?op=DeleteDocente';

$(document).ready(function(){
    CargarDocentes();
});

function  CargarDocentes(){
    $.ajax({
        url: UrlDocentes,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItem = response;
            var Valores = '';

            for(i=0; i< MiItem.length; i++){
                Valores += '<tr>'+
                '<td>'+ MiItem[i].NumeroDocente +'</td>'+
                '<td>'+ MiItem[i].Nombre +'</td>'+
                '<td>'+ MiItem[i].Apellidos +'</td>'+
                '<td>'+ MiItem[i].FechaDeContratacion +'</td>'+
                '<td>'+ MiItem[i].Direccion +'</td>'+
                '<td>'+ MiItem[i].Salario +'</td>'+
                '<td>'+ MiItem[i].Profesion +'</td>'+
                '<td>'+
                '<button class="btn btn-info" onclick="CargarDocente(\''+MiItem[i].NumeroDocente.toString()+'\')"> Editar</button>'+
                '</td>'+
                '<td>'+
                `<button class="btn btn-danger" onclick="EliminarDocente('${MiItem[i].NumeroDocente}')">Eliminar</button>`+
                '</td>'+
            '</tr>';
            $('#DataDocentes').html(Valores);
            }
        }
    });
} 

function AgregarDocente(){
    var datosDocente= {
        NUMERO_DOCENTE: $('#NumeroDocente').val(),
        NOMBRE: $('#Nombre').val(),
        APELLIDOS: $('#Apellidos').val(),
        FECHA_CONTRATACION: $('#FechaDeContratacion').val(),
        DIRECCION: $('#Direccion').val(),
        SALARIO: $('#Salario').val(),
        PROFESION: $('#Profesion').val()
    };
    var datosDocentejson = JSON.stringify(datosDocente);
   
    $.ajax({
        url: UrlInsertDocente,
        type: 'POST',
        data: datosDocentejson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(response){
            console.log(response);
            alert('Docente Agregado Correctamente');
        },
        error: function(textStatus, errorThrown){
            alert('Error al agregar Docente' + textStatus + errorThrown);
        }
    });
    alert('AVISO');
}

function CargarDocente(numerodocente){
    var datosDocente = {
        NUMERO_DOCENTE: numerodocente
    };
    var datosDocentejson = JSON.stringify(datosDocente);
    console.log(datosDocente)
    $.ajax({
        url: UrlGetDocente,
        type: 'POST',
        data: datosDocentejson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response){
            
            var MiItem = response;
            $('#NumeroDocente').val(MiItem[0].NumeroDocente);
            $('#Nombre').val(MiItem[0].Nombre);
            $('#Apellidos').val(MiItem[0].Apellidos);
            $('#FechaDeContratacion').val(MiItem[0].FechaDeContratacion);
            $('#Direccion').val(MiItem[0].Direccion);
            $('#Salario').val(MiItem[0].Salario);
            $('#Profesion').val(MiItem[0].Profesion);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarDocente(\'' + MiItem[0].NumeroDocente +'\')"'+
            'value="Actualizar Docente" class="btn btn-primary"></input>';
            $('#btnagregardocente').html(btnactualizar);
        } 
    });
}

function ActualizarDocente(iddocente){
    var datosDocente = {
        NUMERO_DOCENTE: iddocente,
        NOMBRE:$('#Nombre').val(),
        APELLIDOS:$('#Apellidos').val(),
        FECHA_CONTRATACION:$('#FechaDeContratacion').val(),
        DIRECCION:$('#Direccion').val(),
        SALARIO:$('#Salario').val(),
        PROFESION:$('#Profesion').val()
    };
    var datosDocentejson = JSON.stringify(datosDocente);

    $.ajax({
        url: UrlUpdateDocente,
        type: 'PUT',
        data: datosDocentejson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
            alert("Docente Actualizado");
        },
        error: function(textStatus, errorThrown){
            alert('Error al Actualizar Docente'+ textStatus + errorThrown);
        }
    });
    alert('Aviso');
    
}

function EliminarDocente(iddocente){
    var datosDocente = {
        NUMERO_DOCENTE: iddocente
    };
    var datosDocentejson = JSON.stringify(datosDocente);

    $.ajax({
        url: UrlDeleteDocente,
        type: 'DELETE',
        data: datosDocentejson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
        },
        
    });
    alert("Docente Eliminado");
    
    CargarDocentes();
}
