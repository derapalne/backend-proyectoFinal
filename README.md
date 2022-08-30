# backend-proyectoFinal

Proyecto Final del Curso Desarrollo Backend de Coderhouse
+-+-+-+ 02-2022 / 08-2022 +-+-+-+

Rutas:

<table>
    <tr>
        <th>Ruta<th/>
        <th>Método<th/>
        <th>Info<th/>
    <tr/>
    <tr>
        <td>/<td/>
        <td>GET<td/>
        <td>Home, redirige a /productos si se está logueado<td/>
    <tr/>
    <tr>
        <td>/login<td/>
        <td>GET<td/>
        <td>Pantalla de inicio para autenticarse<td/>
    <tr/>
    <tr>
        <td>/login<td/>
        <td>POST<td/>
        <td>Recibe un body con {email: string, password: string} y autentica al usuario<td/>
    <tr/>
    <tr>
        <td>/register<td/>
        <td>GET<td/>
        <td>Muestra el formulario de registro<td/>
    <tr/>
    <tr>
        <td>/register<td/>
        <td>POST<td/>
        <td>Recibe un body con {email, nombre, apellido, direccion, password: string, telefono: number} y registra al usuario<td/>
    <tr/>
    <tr>
        <td>/productos<td/>
        <td>GET<td/>
        <td>Muestra una vista con los productos en la base de datos y links hacia el resto de las vistas/funcionalidades<td/>
    <tr/>
    <tr>
        <td>/productos/:categoria | id<td/>
        <td>GET<td/>
        <td>Muestra los productos cuya categoría o ID coincidan con la especificada<td/>
    <tr/>
    <tr>
        <td>/api/productos<td/>
        <td>GET<td/>
        <td>Muestra una vista con los productos en la base de datos en formato JSON<td/>
    <tr/>
    <tr>
        <td>/api/productos/:categoria | id<td/>
        <td>GET<td/>
        <td>Muestra los productos cuya categoría o ID coincidan con la especificada en formato JSON<td/>
    <tr/>
    <tr>
        <td>/api/productos<td/>
        <td>POST<td/>
        <td>Recibe un body con {producto: {nombre, descripcion, categoria, thumbnail: string, precio: number}} y agrega el producto<td/>
    <tr/>
    <tr>
        <td>/api/productos/:id<td/>
        <td>PUT<td/>
        <td>Recibe un body con {producto: {nombre, descripcion, categoria, thumbnail: string, precio: number}} y actualiza el producto cuya id coincida con la de los params<td/>
    <tr/>
    <tr>
        <td>/api/productos/:id<td/>
        <td>DELETE<td/>
        <td>Recibe una id por los params y borra el producto que coincida con ella<td/>
    <tr/>
    <tr>
        <td>/carritos<td/>
        <td>GET<td/>
        <td>Muestra el carrito del usuario activo<td/>
    <tr/>
    <tr>
        <td>/api/carritos<td/>
        <td>GET<td/>
        <td>Muestra el carrito del usuario activo en formato JSON<td/>
    <tr/>
    <tr>
        <td>/api/carritos<td/>
        <td>POST<td/>
        <td>Recibe {email: string, idProd: number} a través del body y agrega el producto al carrito del usuario activo<td/>
    <tr/>
    <tr>
        <td>/api/carritos/:id<td/>
        <td>DELETE<td/>
        <td>Recibe id por params y elimina el producto del carrito del usuario activo<td/>
    <tr/>
    <tr>
        <td>/ordenes<td/>
        <td>GET<td/>
        <td>Muestra las órdenes generadas por el usuario activo<td/>
    <tr/>
    <tr>
        <td>/api/ordenes<td/>
        <td>GET<td/>
        <td>Muestra las órdenes generadas por el usuario activo en formato JSON<td/>
    <tr/>
    <tr>
        <td>/api/ordenes<td/>
        <td>POST<td/>
        <td>Recibe {email: string} a través del body y agrega el contenido del carrito activo a una órden, vaciando el carrito en el proceso<td/>
    <tr/>
    <tr>
        <td>/api/ordenes<td/>
        <td>PUT<td/>
        <td>Recibe {estado: string, id: number} a través del body y modifica el estado de la orden cuyo ID coincida con el especificado<td/>
    <tr/>
    <tr>
        <td>/chat<td/>
        <td>GET<td/>
        <td>Canal de chat en tiempo real<td/>
    <tr/>
    <tr>
        <td>/chat/:email<td/>
        <td>GET<td/>
        <td>Muestra solamente los mensajes guardados cuyo mail coincida con el especificado<td/>
    <tr/>
    <tr>
        <td>/config<td/>
        <td>GET<td/>
        <td>Muestra la configuración de entorno del servidor<td/>
    <tr/>
<table/>
