// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAX3ml8_9Dk5yotZrYIFPXjeABK4Jh_qqo",
    authDomain: "datos-de-formulario-cb02f.firebaseapp.com",
    projectId: "datos-de-formulario-cb02f",
    storageBucket: "datos-de-formulario-cb02f.appspot.com",
    messagingSenderId: "187499869241",
    appId: "1:187499869241:web:6c101e511650ab7d3e49e8",
    measurementId: "G-WD49ZZ9CCH"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Inicializar Firestore
const db = firebase.firestore();

// Validar campo nombre
function validarNombre() {
    let entradaNombre = document.getElementById('name');
    let errorNombre = document.getElementById('nameError');
    if (entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor rellene el campo';
        errorNombre.classList.add('error-message');
    } else {
        errorNombre.textContent = '';
        errorNombre.classList.remove('error-message');
    }
}

// Validar correo electrónico
function validarEmail() {
    let entradaEmail = document.getElementById('email');
    let errorEmail = document.getElementById('emailError');
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón de validación básico
    if (!emailPattern.test(entradaEmail.value)) {
        errorEmail.textContent = 'Ingrese un correo electrónico válido';
        errorEmail.classList.add('error-message');
    } else {
        errorEmail.textContent = '';
        errorEmail.classList.remove('error-message');
    }
}

// Validar contraseña
function validarContrasena() {
    let contrasenaEntrada = document.getElementById('password');
    let errorContrasena = document.getElementById('passwordError');
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
    if (!contrasenaPattern.test(contrasenaEntrada.value)) {
        errorContrasena.textContent = 'La contraseña debe tener entre 8 y 15 caracteres de longitud, que pueden ser letras (mayúsculas o minúsculas), números y caracteres especiales.';
        errorContrasena.classList.add('error-message');
    } else {
        errorContrasena.textContent = '';
        errorContrasena.classList.remove('error-message');
    }
}

// Envío del formulario
document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault();

    // Validar todos los campos antes de enviar
    validarNombre();
    validarEmail();
    validarContrasena();

    // Si no hay errores, guardar en Firestore
    let errorNombre = document.getElementById('nameError').textContent;
    let errorEmail = document.getElementById('emailError').textContent;
    let errorContrasena = document.getElementById('passwordError').textContent;

    if (!errorNombre && !errorEmail && !errorContrasena) {
        // Guardar en Firestore
        db.collection("users").add({
            nombre: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        })
        .then((docRef) => {
            alert('El formulario se ha enviado con éxito', docRef.id);
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert(error);
        });
    }
});

// Añadir eventos de entrada para validar dinámicamente cada campo
document.getElementById('name').addEventListener('input', validarNombre);
document.getElementById('email').addEventListener('input', validarEmail);
document.getElementById('password').addEventListener('input', validarContrasena);
