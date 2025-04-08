APP_NAME=pixela-backend-laravel.test-1

.PHONY: fix-perms refresh seed

fix-perms:
	@echo "Aplicando permisos a los archivos..."
	docker exec -it $(APP_NAME) chown -R www-data:www-data /var/www

refresh:
	@echo "Refrescando la base de datos..."
	docker exec -it $(APP_NAME) php artisan migrate:fresh

seed:
	@echo "Ejecutando seeders..."
	docker exec -it $(APP_NAME) php artisan db:seed 