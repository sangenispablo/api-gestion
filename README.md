# API creada con TS, Express con el ORM TypeORM

# Variables de entorno
Usar como ejemplo `.env_sample`

# TypeORM Config
Usar como ejemplo `ormconfig_sample.json`

## Docker - Postgres
Primero que nada hay que ejecutar el docker-compose para crear la imagen en docker y levantar Postgres

`docker-compose up -d`

## Migraciones con TypeORM
Para ejecutar las migraciones de TypeORM:

`yarn typeorm migration:run`

Con esto creamos la tablas en Postgres

## Si quiero crear una tabla via migrations hago lo siguiente:

Ejemplo CreateUser, ejecuto lo siguiente:

`yarn typeorm migration:create -n CreateUser`

Esto crea en `src/shared/typeorm/migrations` un archivo con un hash-CreateUser que se usa para las migraciones. Luego modificar el archivo para crear la estructura de la tabla.