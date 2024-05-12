# Proyecto de libreria online

Este proyecto es una libreria online donde los usuarios pueden explorar y comprar una variedad de libros de informática escogiendo entre dos categorías de libros: programación y base de datos. 

## Introducción

El objetivo de este proyecto es proporcionar una plataforma intuitiva para que los usuarios encuentren y compren libros de informática de manera fácil y conveniente. Todos los libros disponibles en la plataforma tienen un stock fijo, lo que significa que la disponibilidad de los libros no se ve afectada por las compras realizadas por los usuarios. Esto garantiza que los usuarios siempre puedan encontrar los libros que desean comprar.

## Tecnologías utilizadas

El proyecto utiliza Firebase para almacenar los datos de los libros y gestionar las órdenes de compra de los usuarios. Además, se utiliza React.js como biblioteca de interfaz de usuario para crear una experiencia interactiva y receptiva para los usuarios.

## Configuración del Proyecto

Para configurar el proyecto, se requiere el uso de variables de entorno que deben configurarse en un archivo `.env` que deberá ubicarse en la raíz del proyecto. Se proporciona un archivo `.env.example` como plantilla, que debe renombrarse a `.env` y completarse con las credenciales de Firebase proporcionadas por el desarrollador.

Es importante tener en cuenta que el proyecto requiere que se carguen libros en la base de datos. Estos libros se obtienen a través de la API de Google Books y tienen una estructura específica que se espera para el correcto funcionamiento de la aplicación.

## Estructura de los libros

Los libros cargados en la base de datos deben tener la siguiente estructura:

- Título
- Autor(es)
- Descripción
- Precio
- Stock
- Categoría
- Imagen de Portada