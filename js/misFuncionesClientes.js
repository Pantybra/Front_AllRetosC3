/////////Tabla Cliente////////////////////////////

function autoInicioCliente() {
    console.log("se esta ejecutando");
    $.ajax({
        url: "http://129.151.114.113:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuesta2(respuesta);
        },
    });
}
function pintarRespuesta2(respuesta) {
    let myTable = "<table>";
    myTable += "<tr>";
    myTable += "<td>Email</td>";
    myTable += "<td>Contraseña</td>";
    myTable += "<td>Nombre</td>";
    myTable += "<td>Edad</td>";
    ("</tr>");
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";

        myTable += "<td>" + respuesta[i].email + "</td>";
        myTable += "<td>" + respuesta[i].password + "</td>";
        myTable += "<td>" + respuesta[i].name + "</td>";
        myTable += "<td>" + respuesta[i].age + "</td>";
        myTable +=
            "<td> <button onclick=' actualizarInformacionCliente(" +
            respuesta[i].idClient +
            ")'>Actualizar</button>";
        myTable +=
            "<td> <button onclick='cargarDatosCliente(" +
            respuesta[i].idClient +
            ")'>Editar</button>";
        myTable +=
            "<td> <button onclick='borrarCliente(" +
            respuesta[i].idClient +
            ")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado3").html(myTable);
}

function guardarInformacionCliente() {
    let var2 = {
        email: $("#Clemail").val(),
        password: $("#Clpassword").val(),
        name: $("#Clname").val(),
        age: $("#Clage").val(),
    };
    console.log(var2);
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        data: JSON.stringify(var2),

        url: "http://129.151.114.113:8080/api/Client/save",

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

function actualizarInformacionCliente(idElemento) {
    let myData = {
        idClient: idElemento,
        email: $("#Clemail").val(),
        password: $("#Clpassword").val(),
        name: $("#Clname").val(),
        age: $("#Clage").val(),
    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.114.113:8080/api/Client/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado").empty();
            $("#idClient").val("");
            $("#Clemail").val("");
            $("#Clpassword").val("");
            $("#Clname").val("");
            $("#Clage").val("");
            autoInicioCliente();
            alert("Se ha Actualizado Correctamente el cliente");
        },
    });
}

function borrarCliente(idElemento) {
    let myData = {
        idClient: idElemento,
    };
    let dataToSend = JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url: "http://129.151.114.113:8080/api/Client/" + idElemento,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado").empty();
            autoInicioCliente();
            alert("Se ha Eliminado.");
        },
    });
}
//Función para editar Clientes
function cargarDatosCliente(id) {
    $.ajax({
        dataType: "json",
        url: "http://129.151.114.113:8080/api/Client/" + id,
        type: "GET",

        success: function (response) {
            console.log(response);
            var item = response;
            $("#Clemail").val(item.email);
            $("#Clpassword").val(item.password);
            $("#Clname").val(item.name);
            $("#Clage").val(item.age);
        },
        error: function (jqXHR, textStatus, errorThrown) {},
    });
}
