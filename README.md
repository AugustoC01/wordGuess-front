# Word Guess Frontend

## 1. Descripción General del Proyecto

**Word Guess Frontend**  
Este proyecto es el frontend de una aplicación de adivinanza de palabras en la que los jugadores intentan descubrir palabras generadas en el backend y reciben el resultado en tiempo real. Desarrollado en React, el frontend se conecta con una API en Node.js para gestionar las palabras y resultados de cada intento.

## 2. Requisitos Previos

- **Node.js** v14 o superior
- **npm** v6 o superior

## 3. Instalación

Para instalar y configurar el proyecto localmente, sigue estos pasos:

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/AugustoC01/wordGuess-front.git
   cd word_guess_front
   ```

2. **Instala las dependencias**:

   ```bash
   npm install
   ```

3. **Configura las variables de entorno**:

   Si deseas conectarte a un backend en una URL distinta de http://localhost:8080, crea un archivo .env en la raíz del proyecto y añade la siguiente línea, reemplazando la URL según corresponda:

   ```bash
   VITE_API_URL=http://tu-backend-url.com
   ```

## 4. Ejecución del Proyecto

Para ejecutar el proyecto, utiliza el siguiente comando:

- Modo de desarrollo:

  ```bash
  npm run dev
  ```

  Esto iniciará el proyecto en modo desarrollo con Vite. La aplicación estará disponible en http://localhost:5173 (o el puerto que Vite asigne).

- Previsualización del proyecto después de la compilación:

  ```bash
  npm run preview
  ```

  Esto permite ver la aplicación ya compilada en modo producción.

- Compilación para producción:

  ```bash
  npm run build
  ```

## 5. Uso de la Aplicación

Al iniciar el proyecto, el usuario verá un teclado y una lista de espacios en los que se mostrarán las letras que ingrese. Para jugar, el usuario debe escribir una palabra usando el teclado virtual o el físico y luego presionar Enter para enviarla. En ese momento, el backend evaluará el intento y devolverá el resultado:

Las letras verdes indican que están en la posición correcta. :green_square:

Las letras amarillas indican que están en la palabra pero en otra posición. :yellow_square:

Las letras grises indican que no pertenecen a la palabra. :black_large_square:

## 6. Estructura del Proyecto

La estructura básica del proyecto es la siguiente:

```bash
word_guess_front
├── public
├── src
│ ├── components
│ │ ├── Board.jsx // Componente para mostrar las palabras ingresadas
│ │ ├── Keyboard.jsx // Componente para el teclado virtual
│ │ └── ... // Otros componentes
│ ├── App.css // Estilos globales de la aplicación
│ ├── App.js // Componente raíz
│ ├── config.js // Configuraciones de la aplicación
│ ├── main.jsx // Punto de entrada de la aplicación
│ └── ... // Otros archivos
├── .env // Variables de entorno
├── package.json // Dependencias y scripts del proyecto
├── README.md // Documentación del proyecto
└── ... // Otros archivos
```

## 7. Conexión con el Backend

La aplicación utiliza Axios para realizar solicitudes al backend. La URL del backend puede configurarse en un archivo .env con la variable VITE_API_URL. En caso de que no se indique una URL en .env, el frontend intentará conectarse a http://localhost:8080 de forma predeterminada.

## 8. Futuras Mejoras

Las próximas características que se planean agregar son:

- Modo multijugador para que varios usuarios puedan competir en la misma partida.
- Tema claro y oscuro para mejorar la experiencia visual del usuario.
- Soporte móvil para mejorar la experiencia en dispositivos móviles.
