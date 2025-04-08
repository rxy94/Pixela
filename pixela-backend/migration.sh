#!/bin/bash
set -e

echo "🔄 Aplicando permisos..."
make fix-perms

echo "🔄 Refrescando base de datos..."
make refresh

echo "🔄 Ejecutando seeders..."
make seed
