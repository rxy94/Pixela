# Etapa 1: Build de dependencias PHP y assets
FROM node:20-alpine AS nodebuild

WORKDIR /app

# Copia solo los archivos necesarios para instalar dependencias y compilar assets
COPY package*.json ./
RUN npm install

# Copia el resto del código para compilar los assets
COPY . .

RUN npm run build

FROM composer:2 AS composerbuild
WORKDIR /app
COPY --from=nodebuild /app /app
RUN composer install --no-dev --optimize-autoloader

# Etapa 2: Imagen final con Apache y PHP
FROM php:8.2-apache

# Instala extensiones necesarias para Laravel y PostgreSQL
RUN apt-get update && apt-get install -y \
    libpq-dev \
    netcat-traditional \
    && docker-php-ext-install pdo pdo_pgsql

# Habilita mod_rewrite de Apache (necesario para Laravel)
RUN a2enmod rewrite

WORKDIR /var/www/html

# Copia el código y los assets ya compilados
COPY --from=composerbuild /app /var/www/html

# Da permisos a storage y bootstrap/cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Expón el puerto 8080 (Render lo requiere)
EXPOSE 8080

# Configura Apache para servir Laravel desde /public
RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# Script de inicio que maneja la configuración de Laravel
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Comando de inicio
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["apache2-foreground"]

