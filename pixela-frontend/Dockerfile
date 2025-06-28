# Etapa 1: Build de la aplicación
FROM node:20-alpine AS builder

WORKDIR /app

# Copia archivos de dependencias
COPY package*.json ./
RUN npm ci

# Copia el código fuente
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Etapa 2: Imagen de producción
FROM node:20-alpine AS runner

WORKDIR /app

# Copia la aplicación construida y archivos necesarios
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Crea usuario no-root para seguridad
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Cambia la propiedad de los archivos
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expone el puerto 3000 (estándar de Next.js)
EXPOSE 3000

# Variable de entorno para el puerto (Render puede cambiarla a 8080)
ENV PORT=3000

# Comando de inicio para producción
CMD ["npm", "start"] 