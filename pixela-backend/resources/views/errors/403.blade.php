<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>403 - Acceso Prohibido | Pixela</title>
    @vite('resources/css/error-pages.css')
</head>
<body class="error-403">
    <div class="container">
        <div class="lock-animation">🔒</div>
        <div class="error-code">403</div>
        <h1 class="error-title">¡Acceso Clasificado!</h1>
        <div class="security-badge">🕵️ ÁREA RESTRINGIDA 🕵️</div>
        <p class="error-message">
            Esta área está más protegida que los secretos de la CIA en las películas de espías. 
            <br>Necesitas los permisos adecuados para acceder a este contenido.
        </p>
        
        <div class="movie-quote">
            "No tienes el nivel de autorización suficiente para esta misión, agente"
            <br><small>- Director de Mission: Impossible (Error 403 Edition)</small>
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
        console.log('🔒 Pixela 403 - Acceso prohibido');
        console.log('🔑 Asegúrate de tener los permisos necesarios');
        
        // Efecto de "escaneado de seguridad"
        function createScanLine() {
            const scanLine = document.createElement('div');
            scanLine.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background: linear-gradient(90deg, transparent, #ff9500, transparent);
                animation: scan 3s linear infinite;
                z-index: 1000;
            `;
            
            document.body.appendChild(scanLine);
            setTimeout(() => scanLine.remove(), 3000);
        }
        
        // Ejecutar escaneo cada 5 segundos
        setInterval(createScanLine, 5000);
        createScanLine(); // Ejecutar inmediatamente
    </script>
</body>
</html> 