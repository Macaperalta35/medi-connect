# MediConnect  
Tu plataforma web moderna para la gestion integral y facil de pacientes.

---

## Descripcion del problema  
En centros medicos pequenos o consultas independientes, el registro de pacientes y la planificacion de consultas suele realizarse de forma manual o en hojas de calculo, lo que puede generar desorden, perdida de informacion y retrasos en la atencion.

---

## Solucion propuesta  
MediConnect es una aplicacion web SPA que permite a profesionales de la salud:

- Registrar y gestionar facilmente informacion de pacientes.  
- Programar consultas medicas con seguimiento por fecha.  
- Visualizar sintomas, diagnosticos y estadisticas de salud.  
- Consultar en tiempo real datos de salud publica (COVID-19 en Chile).  
- Almacenar toda la informacion de forma segura en el navegador, sin necesidad de conexion a bases de datos externas.

---

## Tecnologias utilizadas

- React: Framework principal (SPA)  
- React Router: Navegacion de multiples vistas  
- localStorage: Persistencia de datos en el navegador  
- Tailwind CSS / CSS: Diseno responsivo y moderno  
- API publica: Datos en tiempo real desde disease.sh (COVID-19 Chile)

---

## Funcionalidades principales

- Registro, edicion y eliminacion de pacientes.  
- Agendamiento de consultas por fecha.  
- Registro de sintomas y comentarios medicos.  
- Estadisticas en tiempo real (casos COVID-19 en Chile).  
- Guardado automatico en localStorage.  
- Multilenguaje con soporte i18next (opcional).

---

## Como ejecutar el proyecto localmente

1. Clonar el repositorio:  
   git clone https://github.com/Macaperalta35/medi-connect.git  
2. Entrar a la carpeta del proyecto:  
   cd medi-connect  
3. Instalar dependencias:  
   npm install  
4. Iniciar el servidor de desarrollo:  
   npm run dev  

Luego abre en el navegador: http://localhost:5173

---

## Estructura del proyecto (simplificada)

medi-connect/  
├── components/  
│   ├── Sidebar.jsx  
│   ├── RegistroPaciente.jsx  
│   ├── ListaPacientes.jsx  
│   ├── CalendarioConsultas.jsx  
│   ├── DiagnosticoSugerido.jsx  
│   ├── ConsultaMedica.jsx  
│   └── EstadisticasSalud.jsx  
├── App.jsx  
├── main.jsx  
├── style.css  
├── index.html  
└── README.md

---

## Criterios de evaluacion cumplidos

- SPA con React y React Router  
- Multiples componentes personalizados  
- Funcionalidad CRUD con localStorage  
- Carga de datos desde API publica (disease.sh)  
- Aplicacion funcional en entorno local  
- Repositorio en GitHub con documentacion

---

## Contacto

Email: soporte@mediconnect.com  
Telefono: +56 9 1234 5678  
Direccion: Av. Salud 1234, Santiago, Chile
