# Pixela.io

Repositorio para proyecto fin de grado. </br>

**Autores:** Ruyi & Pablo | 2ºDAW

Pixela es una plataforma interactiva diseñada para que los usuarios puedan descubrir y explorar sus series y películas favoritas. Permite agregar reseñas, calificar contenidos y gestionar una experiencia completamente personalizada.
El proyecto será desarrollado utilizando NextJS y react por debajo para la interfaz de usuario (frontend) y Laravel para la lógica del servidor (backend), asegurando una experiencia moderna, dinámica y eficiente.

Ante proyecto: [www.notion.es](https://sphenoid-stone-975.notion.site/ANTEPROYECTO-PIXELA-1c2bccfbf6a4800c8945f8c8dfb77095) <br/>

# Historial Pixela <br/>
Historial de commits y pull requests, cuaderno de bitácoras: [Bitácoras Ruyi y Pablo](https://docs.google.com/document/d/1tCagftMIyK-YbXul7YxGf_HXpOOPHqtqO7swChsxbao/edit?tab=t.0) <br/>
Historial del repositorio de commits: [Historial github](https://github.com/envyx10/Pixela/commits/main/) <br/>
Historial de ramas de pixela [Ramas pixela](https://github.com/envyx10/Pixela/branches/active) <br/>

# Video Pixela <br/>
Dado el avance del proyecto, el vídeo necesitaba superar los 5 minutos para cubrir adecuadamente el contenido. Aun así, hemos hecho un gran esfuerzo por resumir al máximo los conceptos y todo lo que hemos desarrollado.
<br>
<br>
**Video dia 30/04/2025 | checkIn:** [Video](https://vimeo.com/1080303986/9f50bbfb83?share=copy)



# Documentación Técnica del Proyecto: Pixela

## 1. Resumen General del Proyecto

**Propósito**: `Pixela` es una aplicación web moderna diseñada para que los usuarios puedan descubrir, explorar, guardar como favoritos y escribir reseñas de películas y series. Actúa como una interfaz de usuario sofisticada que consume datos de una fuente externa (probablemente The Movie Database - TMDB) y gestiona los datos propios de los usuarios (perfiles, favoritos, etc.).

**Arquitectura General**: El proyecto sigue una arquitectura de **API Headless + SPA (Single Page Application)** desacoplada.

*   **Backend**: Una API RESTful robusta construida con **Laravel 12 (PHP)**. Es responsable de la lógica de negocio, la autenticación de usuarios y de actuar como un proxy seguro para la API externa de películas/series.
*   **Frontend**: Una SPA dinámica y reactiva construida con **Next.js 15 (React 19)** y escrita en **TypeScript**. Es responsable de toda la interfaz de usuario y la experiencia de navegación.
*   **Base de Datos**: El backend utiliza un sistema de base de datos relacional gestionado a través del ORM de Laravel, **Eloquent**. Los modelos indican una base de datos con tablas para `users`, `favorites` y `reviews`.
*   **Contenerización**: Todo el entorno de desarrollo está completamente contenerizado con **Docker**, lo que facilita enormemente la configuración y la consistencia entre desarrolladores.

**Tecnologías Principales**:

| Área | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Backend** | Laravel 12, PHP 8.2 | Framework principal de la API |
| | Laravel Sanctum | Autenticación de API para la SPA |
| | Eloquent ORM | Interacción con la base de datos |
| | Guzzle | Peticiones HTTP |
| | l5-swagger | Documentación de API (OpenAPI) |
| **Frontend**| Next.js 15, React 19 | Framework principal de la SPA |
| | TypeScript | Tipado estático para robustez del código |
| | Zustand | Gestión de estado global |
| | Tailwind CSS | Estilizado de la interfaz (Utility-first) |
| | React Hook Form | Gestión de formularios |
| **DevOps** | Docker, Docker Compose | Contenerización y orquestación del entorno |
| | Laravel Sail | Abstracción sobre Docker para Laravel |
| | GitHub | Control de versiones |
| **Despliegue** | AWS | Amazon Web Services|
| | EC2 | Servicio de AWS para alojar la aplicación y la base de datos |
| | Nginx | Manejo de proxies |

## 2. Estructura del Proyecto

El proyecto es un monorepo con una separación clara entre el cliente y el servidor:

```
pixela/
├── pixela-backend/      # Proyecto de la API en Laravel
│   ├── app/             # Núcleo de la aplicación: Modelos, Controladores, etc.
│   │   ├── Http/
│   │   │   └── Controllers/ # Lógica para manejar las peticiones HTTP
│   │   └── Models/        # Modelos de Eloquent (User, Favorite, Review)
│   ├── config/          # Archivos de configuración de Laravel
│   ├── database/        # Migraciones y seeders de la base de datos
│   ├── routes/          # Definición de las rutas (api.php, auth.php)
│   ├── composer.json    # Dependencias de PHP
│   └── Dockerfile.dev   # Definición del contenedor de desarrollo
│
└── pixela-frontend/     # Proyecto de la SPA en Next.js
    ├── src/             # Código fuente del frontend
    │   ├── app/         # Enrutado basado en carpetas (App Router)
    │   │   └── (rutas)/ # Grupo de rutas principal de la aplicación
    │   ├── api/         # Lógica para comunicarse con el backend
    │   ├── features/    # Componentes y lógica agrupados por funcionalidad
    │   ├── stores/      # Stores de Zustand para el estado global
    │   └── shared/      # Componentes y utilidades reutilizables
    ├── package.json     # Dependencias de JavaScript
    └── next.config.js   # Configuración de Next.js
```

## 3. Documentación por Módulos

### Backend (`pixela-backend`)

*   **Rutas (`routes/`)**: Definen todos los endpoints de la aplicación. `api.php` contiene los endpoints de los recursos (películas, reseñas), mientras que `auth.php` maneja las rutas de autenticación (login, registro).
*   **Controladores (`app/Http/Controllers/Api/`)**: Contienen la lógica de negocio para cada petición. Actúan como intermediarios entre las rutas y los modelos. Hay controladores dedicados para `User`, `Favorite`, `Review`, y para interactuar con la API de TMDB.
*   **Controladores (`app/Http/Controllers/Auth/`)**: Contienen la lógica de autenticación del usuario (Login, Register, Forgot-password...)
*   **Modelos (`app/Models/`)**: Representan las tablas de la base de datos (`users`, `favorites`, `reviews`) y definen las relaciones entre ellas (un usuario tiene muchos favoritos y reseñas).
*   **Middleware (`auth:sanctum`, `isAdmin`)**: Filtros que se ejecutan antes de los controladores. `auth:sanctum` protege las rutas que requieren autenticación, y el middleware `isAdmin` (inferido de las rutas) protege las rutas exclusivas para administradores.

### Frontend (`pixela-frontend`)

*   **Enrutado (`src/app/`)**: Utiliza el App Router de Next.js. La estructura de carpetas dentro de `src/app/(rutas)` define las páginas de la aplicación de forma intuitiva (`/movies`, `/profile`, etc.). Las carpetas con corchetes (ej. `[id]`) son rutas dinámicas.
*   **Comunicación API (`src/api/`)**: Módulo responsable de realizar las llamadas HTTP al backend de Laravel. Centraliza la lógica de fetching de datos, manejo de errores y autenticación.
*   **Gestión de Estado (`src/stores/`)**: Usa Zustand para crear "stores" ligeros y reactivos. Probablemente exista un `userStore` para guardar la información del usuario autenticado y un `authStore` para el estado de autenticación.
*   **Features (`src/features/`)**: La arquitectura está orientada a funcionalidades. Cada carpeta en `features` contiene los componentes, hooks y lógica necesarios para una característica específica de la aplicación (ej. `features/authentication`, `features/movie-details`).
*   **Componentes Compartidos (`src/shared/`)**: Contiene componentes de UI genéricos y reutilizables en toda la aplicación, como botones, inputs, layouts, etc.

## 4. Endpoints de la API

Las rutas base son `/api` y las de autenticación no tienen prefijo.

### Autenticación (Público)

| Método | Ruta | Controlador | Propósito |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | `RegisteredUserController@store`| Crear una nueva cuenta de usuario. |
| `POST` | `/login` | `AuthenticatedSessionController@store`| Iniciar sesión y crear la sesión de Sanctum. |
| `POST`|`/forgot-password`| `PasswordResetLinkController@store`| Enviar email para resetear contraseña. |

### Sesión de Usuario (Requiere Auth)

| Método | Ruta | Controlador | Propósito |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/user` | `AuthController@user` | Obtener los datos del usuario autenticado. |
| `POST` | `/api/logout` | `AuthController@logout` | Cerrar la sesión del usuario. |

### Gestión de Usuarios (Requiere Auth)

| Método | Ruta | Middleware | Propósito |
| :--- | :--- | :--- | :--- |
| `GET`| `/api/users` | `isAdmin` | Listar todos los usuarios. |
| `POST` | `/api/users` | `isAdmin` | Crear un nuevo usuario. |
| `PUT` | `/api/users/{user}` | - | Actualizar los datos de un usuario. |
| `DELETE`| `/api/users/{user}` | - | Eliminar un usuario. |

### Favoritos y Reseñas (Requiere Auth)

| Método | Ruta | Propósito |
| :--- | :--- | :--- |
| `POST` | `/api/favorites` | Añadir una película/serie a favoritos. |
| `DELETE`| `/api/favorites/{id}`| Eliminar de favoritos. |
| `GET` | `/api/favorites/details`| Listar los favoritos del usuario con sus detalles. |
| `POST` | `/api/reviews` | Añadir una reseña. |
| `PUT` | `/api/reviews/{id}` | Actualizar una reseña. |
| `DELETE`| `/api/reviews/{id}` | Eliminar una reseña. |

### TMDB, Películas y Series (Público)

Estas rutas actúan como un proxy a la API de TMDB.

*   `GET /api/tmdb/categories`: Obtiene todos los géneros.
*   `GET /api/tmdb/trending`: Obtiene las tendencias generales.
*   `GET /api/movies/trending`: Obtiene las películas en tendencia.
*   `GET /api/movies/{id}`: Obtiene los detalles de una película.
*   `GET /api/movies/{id}/cast`: Obtiene el reparto de una película.
*   `GET /api/movies/search?query=...`: Busca películas.
*   ...y rutas análogas para `/api/series/...`.

## 5. Flujos Principales de la Aplicación

1.  **Flujo de Autenticación**:
    1.  El usuario rellena el formulario de login/registro en el backend de Laravel, en las vistas de Blade.
    2.  Se envía una petición `POST` a `/login` o `/register` en el backend de Laravel.
    3.  Laravel valida los datos, crea el usuario o la sesión, y devuelve una respuesta exitosa, estableciendo una cookie de sesión segura (HTTPOnly) y un XSRF-TOKEN.
    4.  El frontend recibe la respuesta, pide los datos del usuario a `/api/user` y los guarda en el store de Zustand, marcando al usuario como autenticado.
    5.  La UI reacciona al cambio de estado, mostrando el perfil del usuario y el icono de logout, ocultando el icono de "Login".

2.  **Flujo de Añadir a Favoritos**:
    1.  El usuario está en la página de detalles de una película y hace clic en "Añadir a Favoritos".
    2.  El componente de React, al ser una acción que requiere autenticación, comprueba el estado en Zustand.
    3.  Si está autenticado, se envía una petición `POST` a `/api/favorites` con el ID de la película/serie (`tmdb_id`) y su tipo (`item_type`).
    4.  El `FavoriteController` de Laravel crea un nuevo registro en la tabla `favorites`, asociándolo con el `user_id` del usuario autenticado.
    5.  El frontend actualiza la UI para reflejar que el elemento ya es un favorito.


## 6. Convenciones de Código

*   **Backend**: Se utiliza **Laravel Pint**, la herramienta oficial de formateo de Laravel, lo que garantiza un estilo de código PHP consistente y profesional.
*   **Frontend**: Se utiliza **ESLint** con la configuración de Next.js, lo que asegura un código TypeScript/React limpio, consistente y libre de errores comunes.

## 7. Puntos para Onboarding de Nuevos Desarrolladores

Para empezar a trabajar en el proyecto, un nuevo desarrollador debería seguir estos pasos:

1.  Clonar el repositorio de GitHub.
2.  Asegurarse de tener Docker y Docker Compose instalados.
3.  Navegar a la carpeta `pixela-backend` y crear el archivo `.env` a partir de `.env.example`.
4.  Instalar las dependencias del backend: ejecutar `composer install` y `npm install`.
5.  Ejecutar `docker-compose up -d` (o el script personalizado si existe, como `make up`, `sail up` o `./vendor/bin/sail up`). Esto levantará todos los servicios (PHP, Next.js, base de datos).
6.  Una vez levantado, ejecutar las migraciones de la base de datos con `docker-compose exec app php artisan migrate` o si se usa Sail `sail artisan migrate` o `./vendor/bin/sail artisan migrate`.
7.  Instalar las dependencias del frontend: navegar a `pixela-frontend` y ejecutar `npm install`.
8.  Ejecutar el servidor de desarrollo en el backend con `npm run dev`.
9.  El servidor de desarrollo del front ya se ejecuta automáticamente al levantar los contenedores de Docker, si no es así ejecuta `npm run dev`.

## 8. Glosario de Términos

*   **Eloquent**: El ORM (Object-Relational Mapper) de Laravel. Permite interactuar con la base de datos usando objetos y clases de PHP en lugar de SQL crudo.
*   **Sanctum**: El sistema de autenticación de Laravel para SPAs y APIs.
*   **Guzzle**: Cliente PHP HTTP que facilita el envío de peticiones HTTP y hace trivial la integración con servicios web.
*   **Next.js App Router**: El nuevo sistema de enrutado de Next.js basado en la estructura de carpetas dentro de `/app`.
*   **Zustand**: Una librería de gestión de estado para React, conocida por su simplicidad y bajo peso.
*   **TMDB**: The Movie Database, una popular API externa con información sobre películas y series.
*   **Headless API**: Una API que solo se encarga de los datos y la lógica, sin generar ninguna interfaz de usuario. El "head" (frontend) está desacoplado.

## 9. Flujo de Peticiones en el Frontend (Análisis con Ficheros Reales)

Para entender cómo interactúan los ficheros, sigamos el rastro de una acción común: **un usuario hace clic en una película para ver su página de detalles**.

### Paso 1: La Página de Detalles - El Inicio

*   **Archivo**: `pixela-frontend/src/app/(rutas)/movies/[id]/page.tsx`
*   **Qué ocurre**: Cuando el usuario va a `/movies/550`, Next.js renderiza este componente. Es el "cerebro" de la página.
*   **Código clave**:
    ```typescript
    // ...
    const { id } = await params;
    const pelicula = await getMovieData(id);
    // ...
    ```
*   **Flujo**: La página no pide los datos directamente. Llama a una función de servicio, `getMovieData`, delegando la responsabilidad de obtener la información.

### Paso 2: El Servicio - El Intermediario

*   **Archivo**: `pixela-frontend/src/features/media/services/movieService.ts`
*   **Qué ocurre**: Esta capa de servicio actúa como un puente. Su trabajo es orquestar las llamadas a la capa de API.
*   **Código clave**:
    ```typescript
    export async function getMovieData(id: string): Promise<Pelicula> {
      return await getPeliculaById(id);
    }
    ```
*   **Flujo**: El servicio, en este caso, simplemente pasa la petición a la capa inferior, la capa de API, llamando a `getPeliculaById`.

### Paso 3: La Capa de API - El Ejecutor

*   **Archivo**: `pixela-frontend/src/api/peliculas/peliculas.ts`
*   **Qué ocurre**: Aquí se define la lógica para comunicarse con el backend. Esta función es la que realiza el trabajo pesado.
*   **Código clave**:
    ```typescript
    export async function getPeliculaById(id: string): Promise<Pelicula> {
      const apiUrl = API_ENDPOINTS.PELICULAS.GET_BY_ID(id);
      // ...
      const response = await fetch(apiUrl, { // <-- LLAMADA DIRECTA A FETCH
        ...DEFAULT_FETCH_OPTIONS,
      });
      // ...
    }
    ```
*   **Flujo**:
    1.  `getPeliculaById` obtiene la URL del endpoint (ej. `/api/movies/550`).
    2.  **Importante**: En lugar de usar el helper centralizado `fetchFromAPI`, esta función **llama directamente al `fetch` nativo del navegador**.
    3.  Al mismo tiempo, dispara otras llamadas `fetch` para obtener datos adicionales como los actores (`getPeliculaActores`), vídeos y proveedores.
    4.  Una vez que todas las peticiones `fetch` se completan, combina toda la información en un único objeto `pelicula`.

### Paso 4: El Retorno - Actualización de la UI

*   **Flujo**:
    1.  El objeto `pelicula` completo viaja de vuelta desde la capa de API, a través del servicio, hasta llegar al componente inicial (`.../movies/[id]/page.tsx`).
    2.  El componente `MediaPage` recibe este objeto como `props`.
    3.  React renderiza la información en pantalla, mostrando al usuario los detalles de la película.
