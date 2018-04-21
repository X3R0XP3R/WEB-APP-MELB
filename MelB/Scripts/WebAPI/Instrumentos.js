﻿var IDEstuche = []; 
var IDProveedor = [];

// Retorna toda la colección de instrumentos que estan almacenados en la base de datos //
function Cargar_Instrumentos() 
{
    $.ajax
    ({
        url: 'http://melbws.azurewebsites.net/api/Instrumentos',
        type: 'GET',
        success: function (Resultado) 
        {
            Resultado = JSON.parse(Resultado);
            for (i = 0; i < Resultado.length; i++) 
            {      
                    var Bodega_HTML = (Resultado[i].Tipo_Ubicacion == 'Bodega') ? '<span class="label label-warning ">Bodega</span>' : '<span class="label label-info">Aula</span>'
                    var Imagen = '<img width = "65" height = "65" src= "https://k62.kn3.net/C5E61EEF4.png" ></img>'
                    Tabla_Instrumento.row.add
                    ([
                            Resultado[i].ID_Instrumento,
                            Imagen,
                            Resultado[i].Nombre,
                            Resultado[i].Marca,                    
                            Resultado[i].Tipo_Ubicacion,
                            '<button type="button" class="btn btn-success" onclick ="Detallar_Datos_Instrumento('+Resultado[i].ID_Instrumento+')"><i class="ion-navicon-round" data-pack="default"></i></button>',
                            '<button type="button" class="btn btn-danger"><i class="ion-close-round" data-pack="default" data-tags="delete, trash, kill, x"></li></button>'
                    ] ).draw( false );
            }
            Cargar_Estuches();                   
        },
        error: function (Mensaje) 
        {
            swal
            ({
                  title: "Error listando instrumentos",
                  text: "No se pudo conectar con el servidor.",
                  type: "error",
            });
        }
    });
}


/* Funcionalidad de detalle de instrumento */

function Detallar_Datos_Instrumento(ID)
{
    $('#Instrumentos').hide(300);
    $('#Instrumento_Detalle').show(400);
    $('#ADD').hide('drop',400);
    $('#Busqueda_Form').show(400);
    $('#Busqueda_Form').css('display','inline-flex');


}