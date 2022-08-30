# backend-proyectoFinal

Proyecto Final del Curso Desarrollo Backend de Coderhouse
+-+-+-+ 02-2022 / 08-2022 +-+-+-+

Rutas: 

/ GET => Home, redirige a /productos si se está logueado
/login GET => Pantalla de inicio para autenticarse
/register GET => Muestra el formulario de registro
/productos GET => Muestra una vista con los productos en la base de datos y links hacia el resto de las vistas/funcionalidades
/productos/:categoria/id GET => Muestra los productos cuya categoría o ID coincidan con la especificada
/carritos GET => Muestra el carrito del usuario activo
/ordenes GET => Muestra las órdenes generadas por el usuario activo
/chat GET => Canal de chat en tiempo real
/chat/:email => Muestra solamente los mensajes guardados cuyo mail coincida con el especificado
/config GET => Muestra la configuración de entorno del servidor

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
<table/>



