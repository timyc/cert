# Certitude App

Mobile App for Certitude. Certitude allows students to keep verified university credentials in one place for faster verifications.

## Pre-requisites

* RHEL-based Linux Server
* 10GB of SSD Disk Space
* 6GB of DDR4 RAM
* 1 Intel Xeon CPU (2.0GHz+)
* node.js 16+
* PHP 8.0+
* NGINX 1.20+ compiled with the Shibboleth module
* MariaDB 10.5+/MySQL 8+

## Installation Instructions

1. Build this app and add a basic config to your NGINX webserver
   ```
   # Sample Code
    server {
        root /usr/share/nginx/cert-m;

        index index.html;
        server_name MOBILE.YOURDOMAIN.TLD;


        location / {
                try_files $uri $uri/ /index.html =404;
        }

        listen 443 ssl;
        ssl_certificate /path/to/your/certificate;
        ssl_certificate_key /path/to/your/private/key;

    }
    server {
        if ($host = MOBILE.YOURDOMAIN.TLD) {
            return 301 https://$host$request_uri;
        }
        listen 80 ;
        listen [::]:80 ;
        server_name MOBILE.YOURDOMAIN.TLD;
        return 404;
    }
   ```
2. Install the latest Shibboleth Service Provider
3. Build the [Certitude desktop app](https://github.com/timyc/cert-desktop) and add another config to your NGINX webserver. Adjust reverse proxies accordingly.
   ```
   # Sample config
   server {
        root /usr/share/nginx/cert-d;

        index index.html;
        server_name YOURDOMAIN.TLD;

        #add_header 'Access-Control-Allow-Origin' "${scheme}://MOBILE.YOURDOMAIN.TLD" always;
        include /etc/nginx/default.d/*.conf;
        location / {
                if ($http_user_agent ~* '(iPhone|iPod|android|blackberry)') {
                        return 307 https://MOBILE.YOURDOMAIN.TLD/;
                }
                try_files $uri $uri/ /index.html =404;
        }

        location /circinus/ {
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_pass http://127.0.0.1:6969/;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
        # Shibboleth

        location = /shibauthorizer {
          internal;
          include fastcgi_params;
          fastcgi_pass unix:/etc/shibboleth/shibauthorizer.sock;
        }

        location /Shibboleth.sso {
          include fastcgi_params;
          fastcgi_pass unix:/etc/shibboleth/shibresponder.sock;
        }

        location /shibboleth-sp {
          alias /usr/share/shibboleth/;
        }

        # Login location configuration
        location /secret {
                shib_request /shibauthorizer;
                shib_request_use_headers on;
        }
        location ^~ /php/ {
            shib_request_use_headers on;
            shib_request /shibauthorizer;
            shib_request_set $shib_remote_user $upstream_http_variable_remote_user;
            add_header X-TEST $shib_remote_user;
            fastcgi_index  shib.php;
            include        fastcgi_params;
            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
            fastcgi_pass   unix:/run/php-fpm/www.sock;
        }
        listen 443 ssl;
        ssl_certificate /path/to/your/certificate;
        ssl_certificate_key /path/to/your/private/key;

    }
    server {
        if ($host = YOURDOMAIN.TLD) {
            return 301 https://$host$request_uri;
        }
        listen 80 ;
        listen [::]:80 ;
        server_name YOURDOMAIN.TLD;
        return 404;
    }
   ```
4. Configure the MariaDB/MySQL server and upload the provided SQL file in the [Certitude server](https://github.com/timyc/cert-server) repo.
5. Build the [Certitude server](https://github.com/timyc/cert-server) and run it using something like PM2
6. Beg a university to configure and install the [Certitude Service Provider](https://github.com/timyc/cert-daemon) on their server.