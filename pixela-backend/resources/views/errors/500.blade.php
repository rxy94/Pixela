<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>500 - Error del Servidor | Pixela</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;900&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    @vite('resources/css/error-pages.css')
</head>
<body class="error-500">
    <!-- Efectos decorativos de fondo -->
    <div class="decorative-glow-1"></div>
    <div class="decorative-glow-2"></div>
    
    <!-- Gradiente de fondo -->
    <div class="background-gradient"></div>
    
    <div class="container">
        <!-- Código de error 500 -->
        <div class="error-code">500</div>
        
        <!-- Título -->
        <h1 class="error-title">¡Error Interno del Servidor!</h1>
        
        <!-- Descripción -->
        <p class="error-message">
            Algo salió mal en los engranajes del multiverso cinematográfico. 
            Nuestros técnicos están trabajando para restaurar la continuidad temporal.
        </p>
        
        <!-- Cita cinematográfica -->
        <div class="movie-quote">
            <span class="quote-text">
                "El tiempo es un círculo plano. Todo lo que hemos hecho o haremos, lo haremos una y otra vez"
            </span>
            <span class="quote-attribution">
                - True Detective, error en el bucle temporal
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