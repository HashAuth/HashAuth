FROM nginx

ARG NODE_ENV

# Copy config
COPY services/proxy/nginx-${NODE_ENV}.conf /etc/nginx/conf.d/default.conf

# Copy origin cert
#COPY services/proxy/hashnames.com.pem /etc/nginx/hashnames.com.pem
