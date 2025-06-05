<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>500 - Error del Servidor | Pixela</title>
    @vite('resources/css/error-pages.css')
</head>
<body class="error-500">
    <div class="background-animation">
        <div class="floating-element">
            <div class="icon">💥</div>
        </div>
        <div class="floating-element">
            <div class="icon">⚡</div>
        </div>
        <div class="floating-element">
            <div class="icon">🔥</div>
        </div>
        <div class="floating-element">
            <div class="icon">⚠️</div>
        </div>
    </div>
    <div class="container">
        <div class="error-code">500</div>
        <h1 class="error-title">¡Ups! Algo salió mal</h1>
        <div class="security-badge">🚨 ERROR DEL SERVIDOR 🚨</div>
        <p class="error-message">
            Parece que nuestros servidores están teniendo un día difícil.
            <br>Nuestro equipo de técnicos ya está trabajando en solucionarlo.
        </p>
        
        <div class="movie-quote">
            "Houston, tenemos un problema"
            <br><small>- Apollo 13 (Error 500 Edition)</small>
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