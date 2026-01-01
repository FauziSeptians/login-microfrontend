# Gunakan image Node.js resmi
FROM node:18-alpine

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

# Set environment variable agar Next.js berjalan di port 3001
ENV PORT=3001

# Expose port 3001
EXPOSE 3001

# Jalankan aplikasi Next.js
CMD ["npm", "start"]
