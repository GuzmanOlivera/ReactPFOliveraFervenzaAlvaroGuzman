# Proyecto de libreria online: CodeBook Emporium

Este proyecto es una libreria online donde los usuarios pueden explorar y comprar una variedad de libros de informática escogiendo entre dos categorías de libros: programación y base de datos. 

## Introducción

El objetivo de este proyecto es proporcionar una plataforma intuitiva para que los usuarios encuentren y compren libros de informática de manera fácil y conveniente. Todos los libros disponibles en la plataforma tienen un stock fijo, lo que significa que la disponibilidad de los libros no se ve afectada por las compras realizadas por los usuarios. Esto garantiza que los usuarios siempre puedan encontrar los libros que desean comprar. Sin embargo, el sitio valida el stock al momento de intentar generar la orden de compra.

## Tecnologías utilizadas

El proyecto utiliza Firebase para almacenar los datos de los libros y gestionar las órdenes de compra de los usuarios. Además, se utiliza React.js como biblioteca de interfaz de usuario para crear una experiencia interactiva y receptiva para los usuarios.

## Configuración del proyecto

Para configurar el proyecto, se requiere el uso de variables de entorno que deben configurarse en un archivo `.env` que deberá ubicarse en la raíz del proyecto. Se proporciona un archivo `.env.example` como plantilla, que debe renombrarse a `.env` y completarse con las credenciales de Firebase proporcionadas por el desarrollador.

Es importante destacar que el proyecto requiere cargar libros de programación y bases de datos desde la API de Google Books hacia Firebase. Este proceso se puede llevar a cabo mediante la función fetchAndSaveBooks del archivo firebaseSaveBooks.js. Se incluye este archivo en el proyecto por si es necesario volver a cargar los libros desde la API de Google Books hacia Firebase en algún momento. Cabe destacar que como parte del proyecto final de Coderhouse, los libros ya se encuentran cargados. Solo en casos específicos de necesidad de recarga, se deberá configurar la variable de entorno VITE_GOOGLE_API_KEY en el archivo .env.

## Estructura de los libros

Los libros cargados en la base de datos Firebase, en la colección "items", deben seguir la estructura proporcionada por la API de Google Books. A continuación se enumeran los campos más relevantes:

ID: id
Título: volumeInfo.title
Autor(es): volumeInfo.authors
Descripción: volumeInfo.description
Precio: saleInfo.listPrice.amount (en la moneda especificada por saleInfo.listPrice.currencyCode)
Stock: stock
Categoría: volumeInfo.categories
Imagen de Portada: volumeInfo.imageLinks.thumbnail (o cualquier otra URL de imagen proporcionada)

## Demostraciones

### Compra y finalización

![Compra y Finalización](Codebook_PF1.gif)

En este gif se muestra el flujo para comprar un libro y generar una orden de compra.

### Validación de stock

![Validación de Stock](Codebook_PF2.gif)

En este gif se muestra un ejemplo donde se valida el stock y no se permite comprar un libro porque el stock es menor a la cantidad que se intenta comprar.

## Uso

### Configuración inicial

1. Clona el repositorio desde GitHub a tu máquina local utilizando el siguiente comando:
    ```
    git clone https://github.com/GuzmanOlivera/PFOliveraFervenzaAlvaroGuzman.git
    ```

2. Navega al directorio del proyecto:
    ```
    cd PFOliveraFervenzaAlvaroGuzman
    ```

3. Instala las dependencias necesarias utilizando npm:
    ```
    npm install
    ```

4. Configura las variables de entorno para Firebase en el archivo .env

5. Levanta el servidor

    ```
    cd vite-project
    npm run dev
    ```

6. Abre tu navegador y navega a http://localhost:5173

