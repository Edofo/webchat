FROM node:22 AS build

WORKDIR /app

# Copy files
COPY package.json yarn.lock ./

# Install node modules
RUN yarn install --frozen-lockfile --ignore-scripts

COPY . ./

ENV NODE_ENV=production

# Build app
RUN yarn global add dotenv-cli && dotenv -e .env -- yarn build

FROM nginx:stable-alpine AS run

# Setup Nginx
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
