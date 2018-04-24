var Formulario_Activo;
var Operacion;
var Tabla_Instrumento;
var Tabla_Proveedor;
var Tabla_Remision;
var Tabla_Estuche;
var Tabla_Accesorios;

$(document).ready(function ()
{   
    swal({title:'Cargando',text: 'Espere por favor',type: 'info', allowOutsideClick: false});
    swal.showLoading();

    
    // Construcción de los formularios de la pagina //
       Inicializacion_Eventos();
       Inicializacion_Tablas();
       Inicializacion_Controles(); 


    // Peticiones Ajax //
    Cargar_Instrumentos();

});



function Inicializacion_Controles()
{

    /* Inicialziación de los controles de los formularios */
    $('.selectpicker').selectpicker({noneResultsText: 'No se encontraron resultados'});
    $("input[name='ID_Instrumento']").TouchSpin({});
    $("input[name='Estante']").TouchSpin({});
    $("input[name='Gaveta']").TouchSpin({});

    $('#Marca_Instrumento').maxlength
    ({
        alwaysShow: true,
        threshold: 25
    });

    $('#Descripcion_Inst').maxlength
    ({
        alwaysShow: true,
        threshold: 25
    });
}

function Inicializacion_Tablas()
{
    /* Inicialización de las tablas de inventario */

    Tabla_Instrumento = $('#Instrumento_T').DataTable
    ({
        "language": 
        {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron datos",
            "info": "Mostrando pagina _PAGE_ de _PAGES_",
            "infoEmpty": "La busqueda no devolvio resultados",
            "infoFiltered": "(Se busco en _MAX_ registros )",
            "sSearch": "Buscar",
            "paginate": 
            {        
                "next":       "Siguiente pagina",
                "previous":   "Pagina anterior"
            },
            "columnDefs": [ {"className": "dt-center", "targets": "_all"}],
            "responsive": true,
            "search": {
                "caseInsensitive": false
            }
        }
    });


    Tabla_Proveedor = $('#Proveedor_T').DataTable
    ({
        "language": 
        {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron datos",
            "info": "Mostrando pagina _PAGE_ de _PAGES_",
            "infoEmpty": "La busqueda no devolvio resultados",
            "infoFiltered": "(Se busco en _MAX_ registros )",
            "sSearch": "Buscar",
            "paginate": 
            {        
                "next":       "Siguiente pagina",
                "previous":   "Pagina anterior"
            },
            "columnDefs": [ {"className": "dt-center", "targets": "_all"}]
        }
    });


     Tabla_Remision = $('#Remision_T').DataTable
     ({
        "language": 
        {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron datos",
            "info": "Mostrando pagina _PAGE_ de _PAGES_",
            "infoEmpty": "La busqueda no devolvio resultados",
            "infoFiltered": "(Se busco en _MAX_ registros )",
            "sSearch": "Buscar",
            "paginate": 
            {        
                "next":       "Siguiente pagina",
                "previous":   "Pagina anterior"
            },
            "columnDefs": [ {"className": "dt-center", "targets": "_all"}]
        }
    });


    Tabla_Estuche = $('#Estuche_T').DataTable
    ({
        "language": 
        {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron datos",
            "info": "Mostrando pagina _PAGE_ de _PAGES_",
            "infoEmpty": "La busqueda no devolvio resultados",
            "infoFiltered": "(Se busco en _MAX_ registros )",
            "sSearch": "Buscar",
            "paginate": 
            {        
                "next":       "Siguiente pagina",
                "previous":   "Pagina anterior"
            },
            "columnDefs": [ {"className": "dt-center", "targets": "_all"}]        
        }
    });

    /* Tablas de Instrumento */

    Tabla_Accesorios = $('#Accesorios_T').DataTable
    ({
        "language": 
        {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron datos",
            "info": "Mostrando pagina _PAGE_ de _PAGES_",
            "infoEmpty": "La busqueda no devolvio resultados",
            "infoFiltered": "(Se busco en _MAX_ registros )",
            "sSearch": "Buscar",
            "paginate": 
            {        
                "next":       "Siguiente pagina",
                "previous":   "Pagina anterior"
            },
            "columnDefs": [ {"className": "dt-center", "targets": "_all"}]        
        }
    });
}


function Inicializacion_Eventos()
{
    /* Eventos : Zona Menu*/
        $('#menuinicio').click(function (event) 
        {
            document.getElementById('Inicio').style.display = 'block';        
            document.getElementById('Instrumentos').style.display = 'none';
            document.getElementById('Proveedores').style.display = 'none';
            document.getElementById('Remisiones').style.display = 'none';
            document.getElementById('Estuches').style.display = 'none';   
            document.getElementById('Instrumento_Detalle').style.display = 'none'; 
            document.getElementById('Estuche_Detalle').style.display = 'none';
        });
       

        $('#instrumentossubmenu').click(function (event) 
        {
            document.getElementById('Inicio').style.display = 'none';
            document.getElementById('Instrumentos').style.display = 'block';
            document.getElementById('Proveedores').style.display = 'none';
            document.getElementById('Remisiones').style.display = 'none';
            document.getElementById('Estuches').style.display = 'none';     
            document.getElementById('Instrumento_Detalle').style.display = 'none';
            document.getElementById('Estuche_Detalle').style.display = 'none';

            Formulario_Activo = 'Instrumento';                       
            $('#ADD').html('<span class="btn-label"><i class="ion-music-note" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Instrumento');
            $('#ADD').show("drop", 50);
            $('#Busqueda_Form').hide("drop",50);
        });

        $('#proveedoressubmenu').click(function (event) {
            document.getElementById('Inicio').style.display = 'none';        
            document.getElementById('Instrumentos').style.display = 'none';
            document.getElementById('Proveedores').style.display = 'block';
            document.getElementById('Remisiones').style.display = 'none';
            document.getElementById('Estuches').style.display = 'none';
            document.getElementById('Instrumento_Detalle').style.display = 'none';
            document.getElementById('Estuche_Detalle').style.display = 'none';
            Formulario_Activo = 'Proveedor';
            $('#ADD').html('<span class="btn-label"><i class="ion-briefcase" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Proveedor');
            $('#ADD').show("drop", 50);  
        });

        $('#remisionessubmenu').click(function (event) {
            document.getElementById('Inicio').style.display = 'none';
            document.getElementById('Instrumentos').style.display = 'none';
            document.getElementById('Proveedores').style.display = 'none';
            document.getElementById('Remisiones').style.display = 'block';
            document.getElementById('Estuches').style.display = 'none';         
            document.getElementById('Instrumento_Detalle').style.display = 'none';
            document.getElementById('Estuche_Detalle').style.display = 'none';
            Formulario_Activo = 'Remision';
            $('#ADD').html('<span class="btn-label"><i class="ion-briefcase" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Remisiones');
            $('#ADD').show("drop", 50);  

        });

        $('#accesoriossubmenu').click(function (event) {
            document.getElementById('Inicio').style.display = 'none';
            document.getElementById('Instrumentos').style.display = 'none';
            document.getElementById('Proveedores').style.display = 'none';
            document.getElementById('Remisiones').style.display = 'none';
            document.getElementById('Estuches').style.display = 'none';
            document.getElementById('Instrumento_Detalle').style.display = 'none';   
            document.getElementById('Estuche_Detalle').style.display = 'none';
            Formulario_Activo = 'Accesorio';
            $('#ADD').html('<span class="btn-label"><i class="ion-briefcase" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Accesorios');
            $('#ADD').show("drop", 50);  
        });

        $('#estuchessubmenu').click(function (event) {
            document.getElementById('Inicio').style.display = 'none';
            document.getElementById('Instrumentos').style.display = 'none';
            document.getElementById('Proveedores').style.display = 'none';
            document.getElementById('Remisiones').style.display = 'none';
            document.getElementById('Estuches').style.display = 'block';
            document.getElementById('Instrumento_Detalle').style.display = 'none';
            document.getElementById('Estuche_Detalle').style.display = 'none';
            Formulario_Activo = 'Estuche';
            $('#ADD').html('<span class="btn-label"><i class="ion-briefcase" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Estuche');
            $('#ADD').show("drop", 50);  

        });

    /* Eventos : uso en formularios de forma global */


         $('#sidebarCollapse').on('click', function () 
         {
             $('#sidebar').toggleClass('active');
             if($('#sidebar').attr('class') == '')
             {
                $('#content').css("margin-left", "253px");
             }
             else
             {
                $('#content').css("margin-left","110px");
             }
        });

        $('#ADD').click(function(event)
        { 
            $('.FlotarDerecha').hide();
            if(Formulario_Activo == 'Instrumento')
            {       
                 Operacion = 'Nuevo';
                 $('#Header_Instrumento_Texto').text('Añadir Instrumento')           
                 Reiniciar_Controles_Instrumento()
                 Habilitar_Deshabilitar_Instrumentos(true);
                 $('#ID_Instrumento').removeAttr('disabled');
                 $('#Instrumentos').hide(300);
                 $('#Instrumento_Detalle').show(400);   
                 $('#Actualizar_Instrumento').html('<span class="btn-label"><i class="ion-upload" data-pack="default" data-tags="storage, cloud"></i></span>Añadir');
                 $('#ID_Instrumento').removeAttr('disabled');
                 $('#Imagen_Instrumento').attr("src","https://i.imgur.com/0oN2F22.png");
            }                
            Base64Imagen($('#Imagen_Instrumento').attr('src'));                                 
            $('#ADD').hide('drop',100);
            $('#Busqueda_Form').hide(400);
            $('#Contenedor_Panel').hide(); 
        });   

        $('#Buscar_Boton').click(function(event)
        {
            if(Formulario_Activo == 'Instrumento')
            {   
                if($('#Descripcion_Instrumento').val() != "")
                {

                    Detallar_Datos_Instrumento($('#Descripcion_Instrumento').val());
                }
                else
                {
                     swal
                     ({
                          title: "Aviso",
                          text: "Debe introducir el identificador del instrumento",
                          type: "warning",
                     });
                }
            }
        });

        $('#Descripcion_Instrumento').keypress(function (e) 
        {             
             if(e.which == 13)  
              {                    
                    $( "#Buscar_Boton" ).trigger( "click" );
                    e.preventDefault();
              }
        });       

        $('#Actualizar').click(function(event)
        {
            swal({title:'Refrescando',text: 'Espere por favor',type: 'info', allowOutsideClick: false});
            Tabla_Instrumento.clear().draw();
            swal.showLoading();
            Cargar_Instrumentos();
        });

    /* Eventos : Formulario Instrumento */

        $('#Switch_Editar').change(function()
        {
            if( $('#Switch_Editar').prop('checked') == true)
            {
                Habilitar_Deshabilitar_Instrumentos(true);
                $('#Busqueda_Form').hide();
            }
            else
            {
                Habilitar_Deshabilitar_Instrumentos(false);
                $('#Busqueda_Form').show();
            }
        });

        $('#Cambiar_Imagen_Instrumento').click(function(event)
        {
              document.getElementById('Imagen_Archivo').click();
        });

        $('#Actualizar_Instrumento').click(function(event)
        {              
              Insertar_Actualizar_Instrumento(Operacion);
        });

        $('#Ubicacion_Instrumento').change(function(event)
        {
            if($('#Ubicacion_Instrumento').val() == 'Bodega')
            { 
                $('#Estante_Aula').text('Estante')
                $('#Form_gaveta').show();
            }
            else
            {
                $('#Estante_Aula').text('ID Aula')
                $('#Form_gaveta').hide()
            }
        }); 
}

