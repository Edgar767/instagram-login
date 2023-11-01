// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB50X7VSf3tkbX6KYS7Sk2e-dwGEDEpues",
    authDomain: "instagram-89f75.firebaseapp.com",
    projectId: "instagram-89f75",
    storageBucket: "instagram-89f75.appspot.com",
    messagingSenderId: "84831269113",
    appId: "1:84831269113:web:06c281985de65a3cefb228"
  };

// Inicialización de Firebase
const app = firebase.initializeApp(firebaseConfig);

// Obtiene una instancia de autenticación
const auth = firebase.auth(app);
const db = firebase.firestore(app); // Agregamos Firebase Firestore

document.addEventListener("DOMContentLoaded", function() {
    const correoInput = document.getElementById("correo");
    const contraseñaInput = document.getElementById("contraseña");
    const registro = document.getElementById("registro");

    // Manejar el evento de registro de usuarios
    registro.addEventListener('click', function() {
        const correo = correoInput.value;
        const contraseña = contraseñaInput.value;

        // Crear un nuevo usuario en Firebase Authentication
        firebase.auth().createUserWithEmailAndPassword(correo, contraseña)
            .then((userCredential) => {
                // Usuario registrado con éxito
                const user = userCredential.user;
                console.log('Usuario registrado:', user);

                // Puedes redirigir al usuario a otra página o realizar otras acciones después del registro exitoso.

                // Registrar datos en Firestore
                const usersRef = db.collection('users'); // Cambia 'users' al nombre de tu colección en Firestore
                usersRef.add({
                    correo: correo,
                    contraseña: contraseña
                    // Puedes agregar más campos de información del usuario aquí


                })
                .then((docRef) => {
                    console.log('Datos de usuario registrados en Firestore con ID:', docRef.id);
                })
                .catch((error) => {
                    console.error('Error al registrar datos en Firestore:', error);
                });
            })
            .catch((error) => {
                // Manejar errores de registro
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error al registrar usuario:', errorCode, errorMessage);
            });
    });
});
