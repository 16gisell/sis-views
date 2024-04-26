

<h1>Prueba Sisco banck</h1>

<h4 >Componentes Y descripcion</h4>

<p> La aplicación cuenta con los siguientes modulos:
    1	Registro de admin
    2	acceso admin
    3	Registro de usuario
    4	Listado de usuarios
    5	Consulta de usuario
    6   Eliminacion del usuario
    7   Respectivas validaciones al momento de registrar, editar y eliminar el usuario
    Cabe destacar que la aplicación está bajo entorno vuejs para front-End , utiliza servicios independiente para la gestion de usuario y data de la respectiva aplicacion. por lo que sugiero clonar repositorio Back-end y seguir sus respectivos pasos para la instalacion y asi poder verificar la aplicacion 

    ## Rreparacion del entorno
   # Paso1: 
    1	Tener previamnete instalado Nodejs
    2	Tener clonado repositorio backen url: https://github.com/16gisell/sis-api
    3   Tener base de dato postgres instalada
    4   Tener entorno Ruby 3.0.0 he instalado Ruby O rails 7, esto debido a que el entorno del back esta basado en este lenguaje
    
    # Paso2:  
    Iniciamos entorno frond-End 
    - npm install o   yarn install 
    - npm run serve nos posiciona en el Puerto :8080  o  yarn dev  despliega en puerto :8081
    - npm instal <nombre_libreria>  o yarn add <nombre_libreria>  utiliza este comando si requieres instalar una libreria


    Observaciones: 
    -	Para este proyecto he utilizado plantillas para las vista por lo que muchos elementos pertenecen a un creado inicial. Esto con la finalidad de acelerar el proceso de trabajo. Por lo que si algunas librerias generan error se debe a su composicion inicial

    -	Este proyecto contiene peticiones REST y se utilizó postman para verificar las respuestas, sin embargo se requería peticiones al servicio soap la cual no pudieron ser completadas. 

    Importante: 
    - Para el uso de peticiones es obligatorio contar con un api-key y el inicio de sesion del token esto se podra generar gracias a los metodos que proporciona el back-end
    - El proyecto utiliza algunas credenciales el cual solo puedo proporcionarles. el cual para ello deberan utilizar el archivo de credenciales para la apikey y url del servicio de la api

    Mejora:
    - importante tomar en cuenta que el siguiente proyecto fue realizado en limite de tiemo por lo que requerira algunas mejoras entre ellas:
        - mejorar el uso de archivos para las validaciones esto se podria realizar utilizando un unico archivo para simplificar el codigo
        - mejora en el ciclo de vida de algunoas secciones al componente
        - mejoar la simplicidad y llamado de hooks
        - utilizar vuex
        - mejorar el responsivo puesto que falta adaptarse en algunas acciones, en especial la tabla de consulta.
    
"author": "Giss/Gisell Hernández",
</p>

