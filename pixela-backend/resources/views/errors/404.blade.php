<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Página No Encontrada | Pixela</title>
    @vite('resources/css/error-pages.css')
</head>
<body class="error-404">
    <div class="background-animation">
        <div class="floating-element">
            <div class="icon">🎬</div>
        </div>
        <div class="floating-element">
            <div class="icon">🎭</div>
        </div>
        <div class="floating-element">
            <div class="icon">🍿</div>
        </div>
        <div class="floating-element">
            <div class="icon">📺</div>
        </div>
    </div>

    <div class="container">
        <div class="error-code">404</div>
        <h1 class="error-title">¡Página No Encontrada!</h1>
        <p class="error-message">
            Parece que la página que buscas se perdió en el multiverso cinematográfico. 
            <br>Tal vez fue cancelada como una secuela que nadie pidió.
        </p>
        
        <div class="movie-quote">
            "Houston, tenemos un problema... pero no es tan grave como en Apollo 13"
            <br><small>- Error 404, página no encontrada</small>
        </div>

        <div class="actions">
            <a href="{{ url('/login') }}" class="btn btn-primary">
                🏠 {{ __('pixela.back_to_login') }}
            </a>
            <a href="{{ url('/api/documentation') }}" class="btn btn-secondary">
                📚 {{ __('pixela.view_api') }}
            </a>
        </div>
    </div>

    <script>
        // Añadir interactividad al código de error
        document.querySelector('.error-code').addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'glow 2s ease-in-out infinite alternate';
            }, 100);
        });

        console.log('🎬 Pixela 404 - Página no encontrada');
        console.log('💡 Tip: Verifica la URL o navega usando los botones disponibles');
    </script>
</body>
</html> 