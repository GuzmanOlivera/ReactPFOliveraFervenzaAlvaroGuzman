# Proyecto React con Vite y Google API Key

Este proyecto React utiliza Vite como bundler y necesita una API key de Google para funcionar correctamente.

## Uso de la API Key de Google

Para que este proyecto funcione correctamente, necesitas obtener una API key de Google Books y configurarla en un archivo `config.js`. Aquí está cómo hacerlo:

1. **Obtener una API Key de Google**:
   - Visita la [consola de desarrolladores de Google](https://console.developers.google.com/).
   - Crea un nuevo proyecto o selecciona uno existente.
   - Habilita la API de Google Books.
   - Genera una nueva API key en la sección de credenciales.

2. **Crear el archivo `config.js`**:
   - Crea un nuevo archivo llamado `config.js` dentro de la carpeta `src`, la cual ya está creada dentro de la carpeta `vite-project`.
   - Copia y pega el siguiente código en `config.js`:

   ```javascript
   // src/config.js
   const config = {
     apiKey: 'TU_API_KEY_AQUI'
   };

   export default config;
