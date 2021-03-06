var ID_Aula = [];
var Aula_Seleccionada = 0;
var Ultimo_IDAula;

 function Cargar_Aulas(BanderaGrafica)  
 {        
     Tabla_Aula.clear().draw();
        $.ajax({

            url: 'http://melbws.azurewebsites.net/api/Aula',                
            type: 'GET',

            success: function (Resultado) 
            {    
                ID_Aula = [];
                $('#Aula_Clase').html(''); 
                if(Resultado.Codigo == null)
                {                               
                    Resultado = JSON.parse(Resultado);
                    Ultimo_IDAula = Resultado[Resultado.length - 1].ID_Aula + 1;
                    for (i = 0; i < Resultado.length; i++) 
                    {  
                       ID_Aula.push({ID:Resultado[i].ID_Aula , Numero:Resultado[i].Numero, Piso:Resultado[i].Piso});                                                                               
                       $('#Aula_Clase').append('<option data-subtext="Numero:' + Resultado[i].Numero + ' Piso:' + Resultado[i].Piso + '">#' + Resultado[i].ID_Aula + '</option>');                                                                                                     

                       Tabla_Aula.row.add
                           ([
                               Resultado[i].ID_Aula,
                               '#' + Resultado[i].Numero,
                               '#' + Resultado[i].Piso,
                               '<button type="button" class="btn waves-effect waves-light btn-primary btn-color" onclick ="Proceso_Insercion_Aula(\'Actualizar\',' + Resultado[i].ID_Aula + ',' + Resultado[i].Numero + ',' + Resultado[i].Piso+')"><i class="ion-compose" data-pack="default"></i></button>',
                               '<button type="button" class="btn btn-danger" onclick ="Eliminar_Aula(' + Resultado[i].ID_Aula + ')"><i class="ion-close-round" data-pack="default" data-tags="delete, trash, kill, x"></li></button>'
                           ]).draw(false);  
                    }                     
                }
                
                ID_Proveedor.forEach(function(Elemento) 
                {
                    $('#ID_Filtro_Instrumento').append('<option data-subtext="'+ Elemento.Nombre+'">#'+Elemento.ID+'</option>');                                                   
                });                 
                $('.selectpicker').selectpicker('refresh');
                if (BanderaGrafica == null)
                {                
                     EstadisticasInstrumentos("1");
                     EstadisticasInstrumentos("0");
                }
                CargarEmpleados();
            },

            error: function (Mensaje) 
            {
                swal
                ({
                      title: "Error listando aulas",
                      text: "No se pudo conectar con el servidor.",
                      type: "error"
                });
        }

        });
}

function Eliminar_Aula(ID)
 {
    swal
    ({
            title: "¿Estas seguro?",
            text: "Una vez que lo borres, no hay marcha atras",
            type: "question",
            showCancelButton: true
    })
    .then((willDelete) => 
    {
            if (willDelete) 
            {
                swal({ title: 'Eliminando', text: 'Espere por favor', type: 'info', allowOutsideClick: false});
                swal.showLoading();
                $.ajax
                ({

                    url: 'http://melbws.azurewebsites.net/api/Aula/' + ID,                      
                    type: 'DELETE',
                    success: function(Resultado)
                    {
                        swal.closeModal();
                        Resultado = JSON.parse(Resultado);
                        if (Resultado.Codigo == 5)
                        {                                    
                            swal(Resultado.Mensaje_Cabecera, Resultado.Mensaje_Usuario, "success");
                        }
                        else if (Resultado.Codigo == 1)
                        {
                            swal(Resultado.Mensaje_Cabecera, Resultado.Mensaje_Usuario, "error");
                        }
                        else if (Resultado.Codigo == -1) {
                            swal(Resultado.Mensaje_Cabecera, Resultado.Mensaje_Usuario, "error");
                        }
                        else
                        {
                            var Cadena_Errores = "";
                            for (var I = 0; I < Resultado.Errores.length; I++) 
                            {
                                Cadena_Errores = (I+1) +" - "+ Resultado.Errores[I].Mensaje;
                            }
                            swal(Resultado.Mensaje_Cabecera,Cadena_Errores, "warning");
                        }
                        Cargar_Aulas();
                        
                    },
                    error: function(Respuesta)
                    {
                        swal("Error", "No es posible eliminar el aula", "error");
                    },
                });
            }    
    });            
 }

function Insertar_Actualizar_Aula(Comando, ID_Aula, Numero, Piso)
{
    var Aula_BBDD = { ID_Aula: ID_Aula, Numero: Numero, Piso: Piso };
                                       
    if(Comando == 'Nuevo')
            {                                                
                $.ajax
                ({
                        url: 'https://melbws.azurewebsites.net:53603/api/Aula/',
                      type: 'POST',
                      data: Aula_BBDD,
                      success: function(Resultado)
                      {
                         Resultado = JSON.parse(Resultado);
                         if(Resultado.Codigo == 5)
                         {                                    
                             swal(Resultado.Mensaje_Cabecera, Resultado.Mensaje_Usuario, "success");
                         }
                         else
                         {
                             try
                                {
                                     var Cadena_Errores = "";
                                     for (var I = 0; I < Resultado.Errores.length; I++) 
                                     {
                                          Cadena_Errores = (I+1) +" - "+ Resultado.Errores[I].Mensaje;
                                     }
                                     swal(Resultado.Mensaje_Cabecera, Cadena_Errores, "warning");
                                }
                             catch (Error)
                             {
                                 swal(Resultado.Mensaje_Cabecera, Resultado.Mensaje_Usuario, "error");
                             }
                         }
                        Cargar_Aulas(3);
                      },
                      error: function(Respuesta)
                      {
                         swal("Error", "Ocurrio un error al insertar el Aula", "error");
                      },
                });
            }
    else        
            {
                $.ajax
                ({
                      url: 'https://melbws.azurewebsites.net/api/Aula/',
                      type: 'PUT',
                      data: Aula_BBDD,
                      success: function(Resultado)
                      {
                          Resultado = JSON.parse(Resultado);

                          if (Resultado.Codigo == 5)
                          {
                              swal(Resultado.Mensaje_Cabecera, Resultado.Mensaje_Usuario, "success");
                              document.getElementById("Aula_T").rows[Aula_Seleccionada + 1].cells[0].innerHTML = ID_Aula;
                              document.getElementById("Aula_T").rows[Aula_Seleccionada + 1].cells[1].innerHTML = '#' + Numero;
                              document.getElementById("Aula_T").rows[Aula_Seleccionada + 1].cells[2].innerHTML = '#' + Piso;
                          }
                          else
                          {
                              try
                              {
                                  var Cadena_Errores = "";
                              
                                  for (var I = 0; I < Resultado.Errores.length; I++)
                                  {
                                      Cadena_Errores = (I + 1) + " - " + Resultado.Errores[I].Mensaje;
                                  }
                                  swal(Resultado.Mensaje_Cabecera, Cadena_Errores, "warning");
                              }
                              catch (Error)
                              {
                                  swal
                                      ({
                                          title: Resultado.Mensaje_Cabecera,
                                          text: Resultado.Mensaje_Usuario                                          ,
                                          type: "error"
                                      });
                              }
                          }
                         Cargar_Aulas(3);
                      },
                      error: function(Error)
                      {
                         swal("Error", "Ocurrio un error al actualizar el Aula", "error");
                      },
                      
                });
            }
}

function Proceso_Insercion_Aula(Comando,ID_Aula,Numero,Piso) {
    var Titulo;
    var Error;
    swal.setDefaults
        ({
            confirmButtonText: 'Siguiente',
            cancelButtonText: 'Cancelar',
            showCancelButton: true,
            animation: true,
            allowOutsideClick: false
        });

    if (Comando == 'Nuevo') {
        Titulo = 'Añadiendo Aula';
        Error = 'Ocurrio un inconveniente al añadir el Aula.';
        var Pasos =
            [              
                {
                    title: 'Añadir Aula',
                    text: 'Numero de Aula',
                    input: 'number',
                    inputAttributes:
                    {
                        min: 1
                    },
                    inputClass: 'form-control'
                },
                {
                    title: 'Añadir Aula',
                    text: 'Piso del Aula',
                    input: 'number',
                    inputAttributes:
                    {
                        min: 1
                    },
                    inputClass: 'form-control'
                }
            ]
    }
    else
        {
        Titulo = 'Actualizando Aula';
        Error = 'Ocurrio un inconveniente al actualizar el aula.';

        var Pasos =
            [
                
                {
                    title: 'Actualizar Aula',
                    text: 'Numero de Aula',
                    input: 'number',
                    inputValue: Numero,
                    inputAttributes:
                    {
                        min: 1
                    },
                    inputClass: 'form-control'
                },
                {
                    title: 'Actualizar Aula',
                    text: 'Piso del Aula',
                    input: 'number',
                    inputValue: Piso,
                    inputAttributes:
                    {
                        min: 1
                    },
                    inputClass: 'form-control'
                }
            ]
    }
    

    swal.queue(Pasos).then(function (Modal) {

        if (Modal[0] != '' && Modal[1] != '')  {
            swal.resetDefaults();
            swal({ title: Titulo, text: 'Espere por favor', type: 'info', allowOutsideClick: false });
            swal.showLoading();

            if (Comando == 'Nuevo') {
                Insertar_Actualizar_Aula(Comando, Ultimo_IDAula, Modal[0], Modal[1]);

            }
            else
            {
                Insertar_Actualizar_Aula(Comando, ID_Aula, Modal[0], Modal[1]);
            }
        }
        else {
            swal.resetDefaults();
            swal
                ({
                    title: "Aviso",
                    text: "Revise que haya introducido los campos correctamente",
                    type: "warning",
                });
        }
    })
}