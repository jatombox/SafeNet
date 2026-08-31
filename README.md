# 🛡️ SafeNet
> *Aprende. Previene. Protege tu mundo digital.*

---

## 📌 ¿Qué es SafeNet?
**SafeNet** es una plataforma web educativa e interactiva enfocada en la seguridad digital.  
Su propósito es ayudar a los estudiantes a reconocer y prevenir diferentes amenazas presentes en internet mediante información clara, ejemplos prácticos, recursos educativos y actividades interactivas.

---

## 🎯 Problemática
El uso constante de internet, redes sociales y plataformas digitales expone a los estudiantes a riesgos frecuentes como:

* 🎣 **Phishing y estafas digitales.**
* 🔐 **Contraseñas inseguras.**
* 🦠 **Malware.**
* 🔗 **Enlaces maliciosos.**
* 📱 **Riesgos en redes sociales.**
* 🔒 **Uso inadecuado de información personal.**

Muchas personas no cuentan con los conocimientos suficientes para identificar estos riesgos o saber cómo actuar frente a ellos. SafeNet busca solucionar esta problemática mediante una interfaz sencilla, accesible e interactiva.

---

## 💡 Objetivo
Desarrollar una plataforma web educativa que permita a los estudiantes fortalecer sus conocimientos sobre seguridad digital y aprender a identificar, prevenir y actuar frente a diferentes amenazas presentes en internet.

---

## 🚀 Funcionalidades

* **📚 Aprende:** Contenido educativo sobre phishing, gestión de contraseñas, seguridad en redes sociales, malware y protección de datos personales.
* **🚨 Detecta una estafa:** Módulo interactivo para analizar situaciones reales y determinar si representan una amenaza digital.
* **🧠 Evalúa tus conocimientos:** Cuestionarios dinámicos para poner a prueba y validar el aprendizaje adquirido.
* **🆘 ¿Qué hago si me pasó?:** Guías de respuesta rápida y recomendaciones paso a paso ante incidentes de seguridad.
* **📖 Recursos:** Material complementario como guías descargables, videos explicativos, enlaces útiles y checklists.
* **⭐ Favoritos:** Opción para guardar módulos y recursos clave para consulta rápida posterior.

---

## 🌐 Landing Page
La Landing Page sirve como punto de entrada y presentación general del proyecto. Su objetivo es comunicar de forma visual y directa el valor de la plataforma.

### 🖥️ Estructura visual de la Landing Page

```
┌─────────────────────────────────────────────┐
│                    SafeNet                  │
│       Aprende. Previene. Protege.           │
│                                             │
│       [ Comenzar ]    [ Conocer más ]       │
├─────────────────────────────────────────────┤
│              ¿Qué es SafeNet?               │
│                                             │
│  Plataforma educativa sobre seguridad       │
│  digital para estudiantes.                  │
├─────────────────────────────────────────────┤
│              ¿Qué puedes aprender?          │
│                                             │
│  🎣 Phishing     🔐 Contraseñas            │
│  🦠 Malware      📱 Redes sociales         │
│  🛡️ Datos personales                       │
├─────────────────────────────────────────────┤
│              Aprende de forma               │
│                 interactiva                 │
│                                             │
│       [ Explorar SafeNet ]                  │
└─────────────────────────────────────────────┘
```

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Uso |
|------------|-----|
| **HTML5** | Estructuración semántica de las vistas web. |
| **CSS3** | Estilos visuales, diseño responsivo y maquetación. |
| **JavaScript** | Lógica en cliente, validaciones e interactividad. |
| **MySQL** | Gestión del modelo relacional y persistencia de datos. |
| **Git** | Control de versiones distribuido. |
| **GitHub** | Repositorio remoto y trabajo colaborativo. |

---

## 🗄️ Base de Datos

SafeNet utiliza un modelo relacional en **MySQL** estructurado en las siguientes tablas principales:

### 📋 Tablas del modelo de datos

| Tabla | Descripción |
|-------|-------------|
| `usuarios` | Almacena la información de los usuarios registrados. |
| `roles` | Define los roles (admin, estudiante, etc.). |
| `secciones` | Agrupa los temas por categorías educativas. |
| `temas` | Contiene el contenido educativo de cada sección. |
| `ejemplos_estafa` | Ejemplos prácticos de situaciones de estafa o phishing. |
| `detecciones_estafa` | Registro de las detecciones realizadas por los usuarios. |
| `cuestionarios` | Define los cuestionarios de evaluación. |
| `preguntas` | Almacena las preguntas de cada cuestionario. |
| `opciones` | Opciones de respuesta para cada pregunta. |
| `evaluaciones` | Registro de los resultados de los usuarios en los cuestionarios. |
| `situaciones_riesgo` | Describe diferentes escenarios de riesgo digital. |
| `acciones_recomendadas` | Pasos a seguir ante cada situación de riesgo. |
| `categorias_recursos` | Clasificación de los recursos educativos. |
| `recursos` | Material complementario (guías, videos, enlaces, checklists). |
| `favoritos` | Permite a los usuarios guardar recursos o temas como favoritos. |

### 🧩 Modelo Entidad-Relación (Esquema conceptual)

```
usuarios (1) ----< (N) evaluaciones
usuarios (1) ----< (N) favoritos
roles (1) ----< (N) usuarios

secciones (1) ----< (N) temas

cuestionarios (1) ----< (N) preguntas
preguntas (1) ----< (N) opciones
usuarios (1) ----< (N) evaluaciones
cuestionarios (1) ----< (N) evaluaciones

categorias_recursos (1) ----< (N) recursos
usuarios (1) ----< (N) favoritos
recursos (1) ----< (N) favoritos
temas (1) ----< (N) favoritos

situaciones_riesgo (1) ----< (N) acciones_recomendadas
```

### 📄 Script SQL completo

```sql
-- Creación de la base de datos
CREATE DATABASE safenet;
USE safenet;

-- Tabla roles
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    rol_id INT DEFAULT 2,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);

-- Tabla secciones
CREATE TABLE secciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- Tabla temas
CREATE TABLE temas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    seccion_id INT,
    titulo VARCHAR(200) NOT NULL,
    contenido TEXT,
    FOREIGN KEY (seccion_id) REFERENCES secciones(id)
);

-- Tabla cuestionarios
CREATE TABLE cuestionarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    tema_id INT,
    FOREIGN KEY (tema_id) REFERENCES temas(id)
);

-- Tabla preguntas
CREATE TABLE preguntas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cuestionario_id INT,
    enunciado TEXT NOT NULL,
    FOREIGN KEY (cuestionario_id) REFERENCES cuestionarios(id)
);

-- Tabla opciones
CREATE TABLE opciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pregunta_id INT,
    texto TEXT NOT NULL,
    es_correcta BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (pregunta_id) REFERENCES preguntas(id)
);

-- Tabla evaluaciones
CREATE TABLE evaluaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    cuestionario_id INT,
    puntaje DECIMAL(5,2),
    fecha_realizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (cuestionario_id) REFERENCES cuestionarios(id)
);

-- Tabla situaciones_riesgo
CREATE TABLE situaciones_riesgo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT
);

-- Tabla acciones_recomendadas
CREATE TABLE acciones_recomendadas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    situacion_id INT,
    paso INT,
    descripcion TEXT NOT NULL,
    FOREIGN KEY (situacion_id) REFERENCES situaciones_riesgo(id)
);

-- Tabla categorias_recursos
CREATE TABLE categorias_recursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla recursos
CREATE TABLE recursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoria_id INT,
    titulo VARCHAR(200) NOT NULL,
    tipo ENUM('guia', 'video', 'enlace', 'checklist') NOT NULL,
    url VARCHAR(500),
    descripcion TEXT,
    FOREIGN KEY (categoria_id) REFERENCES categorias_recursos(id)
);

-- Tabla favoritos
CREATE TABLE favoritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    recurso_id INT NULL,
    tema_id INT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (recurso_id) REFERENCES recursos(id),
    FOREIGN KEY (tema_id) REFERENCES temas(id)
);

-- Inserción de roles básicos
INSERT INTO roles (nombre) VALUES ('Administrador'), ('Estudiante');
```

---

## 📂 Estructura del Proyecto

```
SafeNet/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── script.js
├── img/
│   └── ...
├── database/
│   └── safenet.sql
└── config/
    └── config.php
```

---

## ⚙️ Instalación y despliegue local

Sigue estos pasos para ejecutar SafeNet en tu entorno local:

### ✅ Requisitos previos

- Tener instalado un servidor local como **XAMPP**, **WAMP** o **MAMP**.
- Tener **MySQL** y **Apache** activos.
- Opcional: editor de código (VS Code, Sublime Text, etc.)

### 📥 Pasos de instalación

1. **Clona el repositorio**  
   Abre tu terminal y ejecuta:
   ```bash
   git clone https://github.com/tu-usuario/safenet.git
   ```

2. **Ubica el proyecto en el servidor local**  
   Copia la carpeta `SafeNet/` dentro del directorio raíz de tu servidor web.  
   - En **XAMPP**: `C:\xampp\htdocs\`
   - En **WAMP**: `C:\wamp64\www\`
   - En **MAMP**: `/Applications/MAMP/htdocs/`

3. **Importa la base de datos**  
   - Abre **phpMyAdmin** desde `http://localhost/phpmyadmin`.
   - Crea una nueva base de datos llamada `safenet`.
   - Ve a la pestaña **Importar**.
   - Selecciona el archivo `database/safenet.sql` desde tu proyecto.
   - Haz clic en **Continuar** para ejecutar la importación.

4. **Configura la conexión a la base de datos**  
   Crea o edita el archivo `config/config.php` con los siguientes datos:
   ```php
   <?php
   define('DB_HOST', 'localhost');
   define('DB_USER', 'root');
   define('DB_PASS', '');
   define('DB_NAME', 'safenet');
   ?>
   ```

5. **Accede al proyecto**  
   Abre tu navegador y ve a:
   ```
   http://localhost/SafeNet/
   ```

¡Listo! Ya deberías tener SafeNet corriendo en tu entorno local.

---

## 👥 Integrantes

- **Jacobo Morales Londoño**
- **Samuel Torres Atehortua**

**Corporación Universitaria Unilasallista**  
**Facultad de Ingenierías**  
**Ingeniería Informática** — 2026

---

## 🎓 Proyecto Académico
SafeNet es un proyecto desarrollado con el propósito de aplicar conocimientos de desarrollo web, modelado de bases de datos y diseño de interfaces frente a problemáticas reales de ciberseguridad.

---

## 📄 Licencia
Este proyecto fue desarrollado exclusivamente con fines académicos y educativos.  
Queda prohibido su uso comercial sin autorización expresa de los autores.

---

**SafeNet** — *Tu aliado en la seguridad digital* 🛡️
