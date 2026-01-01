# Gunakan image Node.js terbaru (21.7)
FROM node:21.7-alpine

# Set direktori kerja di dalam container
WORKDIR /app

# Copy file konfigurasi package
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy seluruh source code ke dalam container
COPY . .

# Build aplikasi Next.js
RUN npm run build

# Set environment variable agar Next.js berjalan di port 3002
ENV PORT=3002

# Expose port 3002
EXPOSE 3002

# Jalankan aplikasi Next.js
CMD ["npm", "start"]
