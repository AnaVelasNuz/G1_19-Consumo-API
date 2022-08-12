var UrlAsignaturas = 'http://20.216.41.245:90/G1_19/controller/asignatura.php?op=GetAsignaturas';
var UrlInsertAsignatura = 'http://20.216.41.245:90/G1_19/controller/asignatura.php?op=InsertAsignatura';
var UrlGetAsignatura = 'http://20.216.41.245:90/G1_19/controller/asignatura.php?op=GetAsignatura';
var UrlUpdatAsignatura = 'http://20.216.41.245:90/G1_19/controller/asignatura.php?op=UpdateAsignatura';
var UrlDeleteAsignatura = 'http://20.216.41.245:90/G1_19/controller/asignatura.php?op=DeleteAsignatura';

$(document).ready(function(){
    CargarAsignaturas();
});

function CargarAsignaturas(){
    $.ajax({
        url: UrlAsignaturas,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItem = response;
            var Valores = '';

            for(i=0; i< MiItem.length; i++){
                Valores += '<tr>'+
                '<td>'+ MiItem[i].CodigoAsignatura +'</td>'+
                '<td>'+ MiItem[i].NombreAsignatura +'</td>'+
                '<td>'+ MiItem[i].Carrera +'</td>'+
                '<td>'+ MiItem[i].FechaCreacion +'</td>'+
                '<td>'+ MiItem[i].UnidadesValorativas +'</td>'+
                '<td>'+ MiItem[i].PromedioAprobacion +'</td>'+
                '<td>'+ MiItem[i].NumeroEdificio +'</td>'+
                '<td>'+
                '<button class="btn btn-info" onclick="CargarAsignatura(\''+MiItem[i].CodigoAsignatura.toString()+'\')">Editar</button>'+
                '</td>'+
                '<td>'+
                `<button class="btn btn-danger" onclick="EliminarAsignatura('${MiItem[i].CodigoAsignatura}')">Eliminar</button>`+
                '</td>'+
            '</tr>';
            $('#DataAsignaturas').html(Valores);
            }
        }
    });
} 

function AgregarAsignatura(){
    var datosasignatura = {
        CodigoAsignatura: $('#CodigoAsignatura').val(),
        NombreAsignatura: $('#NombreAsignatura').val(),
        Carrera: $('#Carrera').val(),
        FechaCreacion: $('#FechaCreacion').val(),
        UnidadesValorativas: $('#UnidadesValorativas').val(),
        PromedioAprobacion: $('#PromedioAprobacion').val(),
        NumeroEdificio: $('#NumeroEdificio').val()
    };
    var datosasignaturajson = JSON.stringify(datosasignatura);
    //console.log('hola');
    $.ajax({
        url: UrlInsertAsignatura,
        type: 'POST',
        data: datosasignaturajson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(response){
            console.log(response);
            alert('Asignatura Agregada Correctamente');
        },
        error: function(textStatus, errorThrown){
            alert('Error al agregar asignatura' + textStatus + errorThrown);
        }
    });
    alert('AVISO');
}

function CargarAsignatura(idasignatura){
    var datosasignatura = {
        CodigoAsignatura: idasignatura
    };
    var datosasignaturajson = JSON.stringify(datosasignatura);
    console.log(datosasignatura)
    $.ajax({
        url: UrlGetAsignatura,
        type: 'POST',
        data: datosasignaturajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response){
            
            var MiItem = response;
            $('#CodigoAsignatura').val(MiItem[0].CodigoAsignatura);
            $('#NombreAsignatura').val(MiItem[0].NombreAsignatura);
            $('#Carrera').val(MiItem[0].Carrera);
            $('#FechaCreacion').val(MiItem[0].FechaCreacion);
            $('#UnidadesValorativas').val(MiItem[0].UnidadesValorativas);
            $('#PromedioAprobacion').val(MiItem[0].PromedioAprobacion);
            $('#NumeroEdificio').val(MiItem[0].NumeroEdificio);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarAsignatura(\'' + MiItem[0].CodigoAsignatura +'\')"'+
            'value="Actualizar Asignatura" class="btn btn-primary"></input>';
            $('#btnagregarasignatura').html(btnactualizar);
        } 
    });
}

function ActualizarAsignatura(idasignatura){
    var datosasignatura = {
        CodigoAsignatura: idasignatura,
        NombreAsignatura:$('#NombreAsignatura').val(),
        Carrera:$('#Carrera').val(),
        FechaCreacion:$('#FechaCreacion').val(),
        UnidadesValorativas:$('#UnidadesValorativas').val(),
        PromedioAprobacion:$('#PromedioAprobacion').val(),
        NumeroEdificio:$('#NumeroEdificio').val()
    };
    var datosasignaturajson = JSON.stringify(datosasignatura);

    $.ajax({
        url: UrlUpdatAsignatura,
        type: 'PUT',
        data: datosasignaturajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
            alert("Asignatura Actualizada");
        },
        error: function(textStatus, errorThrown){
            alert('Error al Actualizar Asignatura'+ textStatus + errorThrown);
        }
    });
    alert('Aviso');
    
}

function EliminarAsignatura(idasignatura){
    var datosasignatura = {
        CodigoAsignatura: idasignatura
    };
    var datosasignaturajson = JSON.stringify(datosasignatura);

    $.ajax({
        url: UrlDeleteAsignatura,
        type: 'DELETE',
        data: datosasignaturajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
        },
        
    });
    alert("Asignatura Eliminada");
    
    CargarAsignaturas();
}

