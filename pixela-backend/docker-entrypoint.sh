#!/bin/bash
set -e

# Función para esperar a que la base de datos esté lista (opcional)
wait_for_db() {
    if [ -n "$DB_HOST" ] && [ -n "$DB_PORT" ]; then
        echo "Esperando a que la base de datos esté lista..."
        while ! nc -z $DB_HOST $DB_PORT; do
            sleep 1
        done
        echo "Base de datos lista!"
    fi
}

# Configurar Laravel para producción
setup_laravel() {
    echo "Configurando Laravel..."
    
    # Generar APP_KEY si no está configurada
    if [ -z "$APP_KEY" ] || [ "$APP_KEY" = "" ]; then
        echo "Generando APP_KEY..."
        php artisan key:generate --force
    fi
    
    # Cachear configuración, rutas y vistas para producción
    echo "Cacheando configuración de Laravel..."
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
    
    # Limpiar cachés antiguos
    php artisan cache:clear
    php artisan config:clear
    
    # Volver a cachear (esto asegura que se use la configuración correcta)
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
    
    echo "Laravel configurado correctamente!"
}

# Función principal
main() {
    echo "Iniciando aplicación Laravel..."
    
    # Cambiar al directorio de la aplicación
    cd /var/www/html
    
    # Asegurar permisos
    chown -R www-data:www-data storage bootstrap/cache
    chmod -R 775 storage bootstrap/cache
    
    # Esperar a la base de datos (opcional)
    wait_for_db
    
    # Configurar Laravel
    setup_laravel
    
    echo "Aplicación lista para ejecutar!"
    
    # Ejecutar el comando original
    exec "$@"
}

# Ejecutar función principal
main "$@" 