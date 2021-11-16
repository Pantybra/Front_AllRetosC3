function autoInicioRelacionCliente() {
    $.ajax({
        url: "http://129.151.114.113:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            let $select = $("#select-client");
            $.each(respuesta, function (id, name) {
                $select.append(
                    "<option value=" +
                        name.idClient +
                        ">" +
                        name.name +
                        "</option>"
                );
            });
        },
    });
}
function autoInicioCabin() {
    $.ajax({
        url: "http://129.151.114.113:8080/api/Cabin/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            let $select = $("#select-cabin");
            $.each(respuesta, function (id, name) {
                $select.append(
                    "<option value=" + name.id + ">" + name.name + "</option>"
                );
            });
        },
    });
}

function autoInicioMensajes() {
    console.log("Se está ejecutando");
    $.ajax({
        url: "http://129.151.114.113:8080/api/Message/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaMensajes(respuesta);
        },
    });
}

function pintarRespuestaMensajes(respuesta) {
    let myTable = "<table>";
    myTable += "<tr>";
    myTable += "<td>Mensaje</td>";
    myTable += "<td>Cabaña</td>";
    myTable += "<td>Cliente</td>";
    ("</tr>");
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";

        myTable += "<td>" + respuesta[i].messageText + "</td>";
        myTable += "<td>" + respuesta[i].cabin.name + "</td>";
        myTable += "<td>" + respuesta[i].client.name + "</td>";
        myTable +=
            "<td> <button onclick=' actualizarInformacionMensaje(" +
            respuesta[i].idMessage +
            ")'>Actualizar</button>";
        myTable +=
            "<td> <button onclick='cargarDatosMensajes(" +
            respuesta[i].idMessage +
            ")'>Editar</button>";
        myTable +=
            "<td> <button onclick='borrarMensaje(" +
            respuesta[i].idMessage +
            ")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoMensajes").html(myTable);
}

function guardarInformacionMensajes() {
    if ($("#messagetext").val().length == 0) {
        alert("Todos los campos son Obligatorios");
    } else {
        let var2 = {
            messageText: $("#messagetext").val(),
            cabin: { id: +$("#select-cabin").val() },
            client: { idClient: +$("#select-client").val() },
        };
        console.log(var2);
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "JSON",
            data: JSON.stringify(var2),

            url: "http://129.151.114.113:8080/api/Message/save",

            success: function (response) {
                console.log(response);
                console.log("Se Guardó Correctamente");
                alert("Se Guardó Correctamente");
                window.location.reload();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                window.location.reload();
                alert("NO se guardó correctamente");
            },
        });
    }
}

function actualizarInformacionMensaje(idElemento) {
    let myData = {
        idMessage: idElemento,
        messageText: $("#messagetext").val(),
        //cabin:{id: +$("#select-cabin").val()},
        client: { idClient: +$("#select-client").val() },
    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.114.113:8080/api/Message/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado").empty();
            $("#messagetext").val("");
            autoInicioMensajes();
            alert("Se ha Actualizado Correctamente el Mensaje");
        },
    });
}

function borrarMensaje(idElemento) {
    let myData = {
        idMessage: idElemento,
    };
    let dataToSend = JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url: "http://129.151.114.113:8080/api/Message/" + idElemento,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado").empty();
            autoInicioMensajes();
            alert("Se ha Eliminado");
        },
    });
}

//Función para editar Mensajes
function cargarDatosMensajes(id) {
    $.ajax({
        dataType: "json",
        url: "http://129.151.114.113:8080/api/Message/" + id,
        type: "GET",

        success: function (response) {
            console.log(response);
            var item = response;
            $("#messagetext").val(item.messageText);
        },
        error: function (jqXHR, textStatus, errorThrown) {},
    });
}
