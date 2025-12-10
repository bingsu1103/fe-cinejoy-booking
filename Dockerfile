# ====== BUILD STAGE ======
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Cài dependencies
RUN npm ci

# Copy source
COPY . .

# Build Vite
RUN npm run build


# ====== RUN STAGE ======
FROM nginx:alpine

# Xóa config mặc định
RUN rm -rf /usr/share/nginx/html/*

# Copy build từ stage trước
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config (nếu có)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
