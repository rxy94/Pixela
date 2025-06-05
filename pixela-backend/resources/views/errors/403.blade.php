<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>403 - Acceso Prohibido | Pixela</title>
    @vite('resources/css/error-pages.css')
</head>
<body class="error-403">
    <div class="background-animation">
        <div class="floating-element">
            <div class="icon">🔒</div>
        </div>
        <div class="floating-element">
            <div class="icon">🛡️</div>
        </div>
        <div class="floating-element">
            <div class="icon">⚡</div>
        </div>
        <div class="floating-element">
            <div class="icon">🔐</div>
        </div>
    </div>
    <div class="container">
        <div class="error-code">403</div>
        <h1 class="error-title">¡Acceso Clasificado!</h1>
        <p class="error-message">
            Esta área está más protegida que los secretos de la CIA en las películas de espías. 
            <br>Necesitas los permisos adecuados para acceder a este contenido.
        </p>
        
        <div class="movie-quote">
            "No tienes el nivel de autorización suficiente para esta misión, agente"
            <br><small>- Director de Mission: Impossible (Error 403 Edition)</small>
        </div>

        <div class="actions">
            <a href="{{ config('app.frontend_url') }}" class="btn btn-primary">
                🏠 {{ __('pixela.back_to_home') }}
            </a>
            <a href="{{ url('/api/documentation') }}" class="btn btn-secondary">
                📚 {{ __('pixela.view_api') }}
            </a>
        </div>
    </div>
</body>
</html> 