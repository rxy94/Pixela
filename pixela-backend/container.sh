#!/bin/bash
set -e

echo "🧹 Limpiando contenedores antiguos..."
docker compose down --remove-orphans

echo "🔨 Reconstruyendo imágenes..."
docker compose build

echo "🚀 Levantando entorno en segundo plano..."
docker compose up -d

echo "Esperando a que los contenedores estén listos..."
sleep 5

echo "✅ Entorno listo. Contenedores corriendo:"
docker ps -a
