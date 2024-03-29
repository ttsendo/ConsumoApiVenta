//const url = 'https://api-2670689.onrender.com/usuario'
const url = 'https://backendventas.onrender.com/venta'


const listarVentas = async() => {
    //Objeto del html donde se deslegará la información
    let objectId = document.getElementById('contenido') 
    let contenido = ''//Contiene filas y celdas que se desplegarán en el tbody

    //Fecth permite reaizar peticiones http a una url
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((res) => res.json())//Obtener respuesta de la petición
    .then(function(data){//Se manipulan los datos obtenidos de la url
        let listaVenta = data.msg //msg es el nombre de la lista retorna con json
        console.log(listaVenta)
        listaVenta.map(function (venta) {
            //Configurar el objeto para enviarlo por url
            objetoVenta = Object.keys(venta).map(key => key + '=' + 
            encodeURIComponent(venta[key])).join('&');
            console.log(venta)
            contenido = contenido + `<tr>`+
            `<td style="display: none">`+venta._id+`</td>`+
            `<td>`+venta.id+`</td>`+
            `<td>`+venta.nombre+`</td>`+
            `<td>`+venta.apellido+`</td>`+
            `<td>`+venta.producto+`</td>`+
            `<td>`+venta.precio_dolar+`</td>`+
            `<td><button onclick="redireccionarEditar('${objetoVenta}')">Editar</button></td>`+
            `<td><button onclick="deleteVenta('${venta.id}')">Eliminar</button></td>`+
            `</tr>`
        })
        objectId.innerHTML = contenido
    })

    /*for(i = 1; i<10; i++){
        contenido = contenido + '<tr>'+
        '<td>nombre</td>'+
        '<td>rol</td>'+
        '<td>estado</td>'
    }
    */

}

const registrarVenta = () => {
    
    const id = generateUUID()
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value
    const producto = document.getElementById('producto').value
    const precio_dolar = document.getElementById('precio_dolar').value
    

    // if(registro_envio.length == 0){
    //     alert(333)
    //     document.getElementById('registro_envioHelp').innerHTML = 'Dato requerido'
    //     return false;

    // }
    if(nombre.length == 0){
        document.getElementById('nombreHelp').innerHTML = 'Dato requerido'
        alert(1)
    }  
    if(apellido.length == 0){
        document.getElementById('apellidoHelp').innerHTML = 'Dato requerido'
        alert(2)
    }   
    if(producto.length == 0){
        document.getElementById('productoHelp').innerHTML = 'Dato requerido'
        alert(3)
    } 
    if(precio_dolar.length == 0){
        document.getElementById('precioHelp').innerHTML = 'Dato requerido'
        alert(4)
    } 


    alert('Registrando')
        let venta = {
            id:id,
            nombre: nombre,
            apellido:apellido,
            producto:producto,
            precio_dolar:precio_dolar,
        }
        
        //Fecth permite reaizar peticiones http a una url
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(venta),//Convertir el objeto a JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((res) => res.json())//Obtener respuesta de la petición
        .then(json => {
            alert(json.msg)
            console.info(json); //Imprimir el mensaje de la transacción
            window.location.href='listarVenta.html'
        })
        
 
}

const actualizarVenta = () => {
    const _id = document.getElementById('_id').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value
    const producto = document.getElementById('producto').value
    const precio_dolar = document.getElementById('precio_dolar').value


    // }
    if(nombre.length == 0){
        document.getElementById('nombreHelp').innerHTML = 'Dato requerido'
    }
    else if(apellido.length == 0){
        document.getElementById('apellidoHelp').innerHTML = 'Dato requerido'
    }   
    else if(producto.length == 0){
        document.getElementById('productoHelp').innerHTML = 'Dato requerido'
    } 
    else if(precio_dolar.length == 0){
        document.getElementById('precio_dolarHelp').innerHTML = 'Dato requerido'
    }                                                          

    else{
        let venta = {
            _id: _id,
            nombre: nombre,
            apellido:apellido,
            producto:producto,
            precio_dolar:precio_dolar,
        }
        
        //Fecth permite reaizar peticiones http a una url
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(venta),//Convertir el objeto a JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((res) => res.json())//Obtener respuesta de la petición
        .then(json => {
            alert(JSON.stringify(json.msg)) //Imprimir el mensaje de la transacción
            window.location.href='listarVenta.html?'
        })
        }
}

const redireccionarEditar = (objetoVenta) => {
    document.location.href='editarVenta.html?'+objetoVenta
}

const editarVenta = () => {
    // Obtener datos de la url
    var urlParams = new URLSearchParams(window.location.search);
    //Asignar valores a cajas de texto
    document.getElementById('_id').value = urlParams.get('_id')
    document.getElementById('nombre').value = urlParams.get('nombre')
    document.getElementById('apellido').value = urlParams.get('apellido')
    document.getElementById('producto').value = urlParams.get('producto')
    document.getElementById('precio_dolar').value = urlParams.get('precio_dolar')
}

if(document.querySelector('#btnRegistrar')){ //Si objeto exitste
document.querySelector('#btnRegistrar')
.addEventListener('click', registrarVenta)
}

if(document.querySelector('#btnActualizar')){//Si objeto existe
document.querySelector('#btnActualizar')
.addEventListener('click', actualizarVenta)
}

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function deleteVenta(id){
    console.log(id);

    fetch('http://localhost:3535/venta?id='+id, {
        method: 'DELETE',
        mode: 'cors',
        // body: JSON.stringify(id),//Convertir el objeto a JSON
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((res) => res.json())//Obtener respuesta de la petición
    .then(json => {
        alert(JSON.stringify(json.msg))
        window.location.href='listarVenta.html?' //Imprimir el mensaje de la transacción
    })
    

}

const obtenerDatoEspecifico = async () => {
    const apiUrl = 'https://www.datos.gov.co/resource/mcec-87by.json';
    
    try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    // Supongamos que quieres obtener el primer dato de la respuesta
    const valor = data[0];
    
    // Ahora puedes usar datoEspecifico como necesites
    console.log('Dato específico:', valor);
    
    // Si necesitas realizar alguna acción con este dato, puedes hacerlo aquí
    } catch (error) {
    console.error('Error al obtener dato específico de la API:', error);
    }
    };
    
    // Llama a la función para obtener el dato específico
    obtenerDatoEspecifico();
    
    // ...
    
    // Función para obtener y cargar los datos de la API en el campo precioDolar
    const cargarDatosDeAPI = async () => {
    const apiUrl = 'https://www.datos.gov.co/resource/mcec-87by.json';
    
    try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    // Supongamos que precioDolar es el campo que quieres cargar
    const precio_dolar = document.getElementById('precio_dolar');
    
    // Aquí decides cómo quieres seleccionar el valor de la API, por ejemplo, usando el primer elemento
    const primerElementoDeLaApi = data[0];
    const valor = primerElementoDeLaApi && primerElementoDeLaApi.valor;
    
    // Verificamos si el valor de la API es válido antes de asignarlo al campo
    if (valor !== undefined) {
    precio_dolar.value = valor;
    }
    
    } catch (error) {
    console.error('Error al cargar datos de la API:', error);
    }
    };
    
    // Llamamos a la función para cargar los datos cuando la página se carga
   
    
    // ...
  
  