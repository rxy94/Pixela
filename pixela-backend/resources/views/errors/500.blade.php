<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>500 - Error del Servidor | Pixela</title>
    @vite('resources/css/error-pages.css')
</head>
<body class="error-500">
    <div class="container">
        <div class="error-code">500</div>
        <h1 class="error-title">¡El Servidor Está en Mantenimiento!</h1>
        <p class="error-message">
            Algo salió mal en nuestros servidores. Es como si hubiera habido una explosión 
            en el set de grabación. <br>Nuestro equipo técnico ya está trabajando para solucionarlo.
        </p>
        
        <div class="movie-quote">
            "I'll be back... después de que arreglemos este problema técnico"
            <br><small>- Terminator (Error 500 Edition)</small>
        </div>

        @if(config('app.debug'))
        <div class="technical-info">
            <strong>🔧 Información Técnica (Modo Debug):</strong><br>
            <small>Esta información solo es visible porque APP_DEBUG=true</small><br><br>
            - Timestamp: {{ now()->format('Y-m-d H:i:s') }}<br>
            - Environment: {{ app()->environment() }}<br>
            - Laravel Version: {{ app()->version() }}<br>
            - PHP Version: {{ phpversion() }}
        </div>
        @endif

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
        console.log('🚨 Pixela 500 - Error interno del servidor');
        console.log('💻 Si eres desarrollador, revisa los logs del servidor');
        
        // Auto-refresh cada 30 segundos
        let refreshCounter = 30;
        const refreshElement = document.createElement('div');
        refreshElement.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0,0,0,0.7);
            color: white;
            padding: 10px;
            border-radius: 5px;
            font-size: 0.8rem;
        `;
        document.body.appendChild(refreshElement);
        
        const countdown = setInterval(() => {
            refreshElement.textContent = `Auto-refresh en ${refreshCounter}s`;
            refreshCounter--;
            
            if (refreshCounter < 0) {
                location.reload();
            }
        }, 1000);
        
        // Cancelar auto-refresh si el usuario interactúa
        document.addEventListener('click', () => {
            clearInterval(countdown);
            refreshElement.textContent = 'Auto-refresh cancelado';
            setTimeout(() => refreshElement.remove(), 3000);
        });
    </script>
</body>
</html> 