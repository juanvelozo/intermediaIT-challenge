
# IntermediaIT challenge - Airports distance app

Este proyecto es parte del desafío de proceso de selección para IntermediaIT. El objectivo fue crear una aplicación que conste de

- Autenticación con Firebase.
- Una lista de todos los aeropuertos de los Estados Unidos para poder comparar 2 de ellos y calcular la distancia entre ellos en millas náuticas.
    - Como extra, también incluye el uso de GoogleMaps API para poder mostrar las coordenadas de los aeropuertos en un mapa, junto a una ruta entre ellos dos usando la API de Directions de Google.

## Setup

Este proyecto fue configurado con el gestor de paquetes Yarn. Para poder correr el proyecto en un ambiente de desarrollo, debe ejecutar el siguiente comando:

```
yarn install
```

Una vez la instalación de las dependencias se haya completado, debe ejecutar el siguiente comando:

### Para android:
```
yarn android
```
### Para web (Con expo)
```
yarn web
```
### Para iOS (No testeado)
```
yarn ios
```
> [!WARNING]
> Tenga en cuenta que este proyecto no fue testeado en el entorno de desarrollo nativo de iOS.
## Variables de entorno

Para correr este proyecto, usted va a necesitar agregar las siguientes variables de entorno a un archivo .env en la carpeta raíz del proyecto.

`FIREBASE_API_KEY=AIzaSyAPFqEvlCHID2uhGaltexMLc8q7aNa6I6U`

`GOOGLE_MAPS_API_KEY=AIzaSyAQYqQCCyynaj-vamvzSc2fr5SRr-BH_VI`


## Estructura de archivos
```
📦 intermedia-IT-challenge
├─ assets
├─ components
├─ context
├─ data
├─ helpers
│  ├─ schemas
│  └─ types
├─ hooks
├─ navigation
│  ├─ auth
│  └─ main
├─ provider
├─ screens
│  ├─ auth
│  └─ main
├─ theme
└─ utils
```
©generated by [Project Tree Generator](https://woochanleee.github.io/project-tree-generator)

## Funcionalidades
### Login
Para el login, decidí usar el Context API de React para identificar en el cliente cuando el usuario está autenticado y los métodos que usará para estarlo o dejar de estarlo. \
En este caso, implementé *un estado* (**isAutheticated**:  `boolean`), *una entidad* (**User**: `User`, que en este caso no tiene utilidad pero podríamos escalarlo para implementar un perfil de usuario), y *tres métodos* (**handleSignIn** para logear al usuario, **handleSignUp** para registrar a un usuario, y **handleSignOut** para desautenticar al usuario).  
- **handleSignIn**: Este método se comunica con el método `signInWithEmailAndPassword` de `firebase/auth`, que recibe un usuario y contraseña como credenciales para loguearse a nuestra aplicación.
- **handleSignUp**: Este método recibe un evento de formulario y se comunica con el método `createUserWithEmailAndPassword` de `firebase/auth` para crear nuestro usuario en Firebase y lo carga en nuestra base de datos de Firestore con `setDoc`.
- **handleSignOut**: Este método utiliza el método `signOut` de `firebase/auth` para cerrar la sesión del usuario en el backend. Una vez la operación se haya completado exitósamente, se setea el **User** en null y el estado **isAutheticated** en false, para que la UI devuelva el Navigator del flow de autenticación.
### Aeropuertos
En la home, implementé las funcionalidades principales de la aplicación. Primero, conseguí una lista de todos los aeropuertos de Estados Unidos con sus coordenadas en formato JSON y los definí en un arreglo de tipo `Airport`. 

Luego, implementé dos inputs para buscar en esta lista de aeropuertos, un **input A** y un **input B**. 
Ambos inputs revelan la lista de aeropuertos y un buscador en el que podemos iterar sobre la lista para filtrar por resultado de búsqueda. Una vez presionemos sobre un item de la lista, seleccionaremos nuestro aeropuerto para dicho input (es decir, setearemos el estado `AirportA` o `AirportB`, dependiendo del input en el que hayamos ingresado). Al seleccionar un aeropuerto, la otra lista ya no lo tendrá disponible (Es decir, si usted eligió el *Albuquerque International* en el `inputA`, dicho aeropuerto no estará disponible en la lista del `inputB`). Una vez seleccionemos los dos aeropuertos, se habilitará un botón que nos permitirá comparar las distancias entre si. 

Este botón navegará a la pantalla de `AirportsDistance`, la cual tiene dos características importantes:
- La primera es el uso del método `getDistance` de la librería `geoLib` para calcular la distancia entre estos dos puntos. Al mismo tiempo, este valor numérico será dividido por **1852** para su conversión en millas nauticas.
- La segunda es el uso del componente `mapView` de la librería `react-native-maps` para mostrar los dos puntos en el mapa, el punto de nuestro *Aeropuerto A* y el punto de nuestro *Aeropuerto B*. Al mismo tiempo, utilizamos `MapDirections` de la librería `react-native-maps-directions` para mostrar una ruta del punto A al punto B utilizando la API de direcciones de Google Maps.
Si volvemos hacia atrás, podremos volver a elegir entre dos aeropuertos nuevamente.
## Autor

- [Juan Velozo (Developer)](https://www.github.com/juanvelozo_)


## Feedback

If you have any feedback, please reach out to me at juanvelozomoreno18@gmail.com

