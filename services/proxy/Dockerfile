FROM nginx

ARG NODE_ENV

# Copy config
COPY services/proxy/nginx-${NODE_ENV}.conf /etc/nginx/conf.d/default.conf

# Copy origin cert
COPY services/proxy/hashauth.io.pem /etc/nginx/hashauth.io.pem
