<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Página No Encontrada | Pixela</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;900&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    @vite('resources/css/error-pages.css')
</head>
<body class="error-404">
    <!-- Efectos decorativos de fondo -->
    <div class="decorative-glow-1"></div>
    <div class="decorative-glow-2"></div>
    
    <!-- Gradiente de fondo -->
    <div class="background-gradient"></div>
    
    <div class="container">
        <!-- Código de error 404 -->
        <div class="error-code">404</div>
        
        <!-- Título -->
        <h1 class="error-title">¡Página No Encontrada!</h1>
        
        <!-- Descripción -->
        <p class="error-message">
            Parece que la página que buscas se perdió en el multiverso cinematográfico. 
            Tal vez fue cancelada como una secuela que nadie pidió.
        </p>
        
        <!-- Cita cinematográfica -->
        <div class="movie-quote">
            <span class="quote-text">
                "Este lugar es como el recuerdo de alguien de un pueblo, y el recuerdo se está desvaneciendo"
            </span>
            <span class="quote-attribution">
                - True Detective, página perdida en el tiempo
            </span>
        </div>

        <!-- Botones de navegación -->
        <div class="actions">
            <a href="{{ config('app.frontend_url') }}" class="btn btn-primary">
                🏠 {{ __('pixela.back_to_home') }}
            </a>
            
            <a href="javascript:history.back()" class="btn btn-secondary">
                ← {{ __('pixela.go_back') }}
            </a>
        </div>
    </div>
</body>
</html> 