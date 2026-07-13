# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


🚀 Tecnologías Principales
React: v18+

Vite: Herramienta de compilación y desarrollo.

React Router: v6 (Data Router)

Gestión de Estado: Zustand con persistencia.

Gestor de paquetes: Yarn

⚙️ Configuración del Entorno

Crea los archivos .env en la raíz del proyecto para definir la URL del backend

1. Desarrollo (.env)
Plaintext
VITE_API_BASE_URL=http://localhost:8080/


🛠 Instalación y Ejecución
Clonar y entrar al directorio:

Bash
git clone <url-de-tu-repositorio>
cd <nombre-de-la-carpeta>
Instalar dependencias:

Bash
yarn install
Ejecutar en modo desarrollo:

Bash
yarn dev
Generar compilación para producción:

Bash
yarn build


🔐 Características de Seguridad
Gestión de Sesión: Autenticación mediante cookies HttpOnly (gestionadas por el backend).

Persistencia: Estado de usuario persistido en localStorage mediante Zustand.

AuthGuard: Protección de rutas centralizada para validar la expiración de sesión (4 horas) al navegar o recargar.

API Client: Peticiones centralizadas con credentials: 'include' para asegurar la persistencia de la sesión en cada llamado.


📁 Estructura del Proyecto
src/app: Componentes de negocio (dashboard, ventas, productos, clientes, etc.).

src/common/components: Componentes reutilizables y lógica compartida.

src/common/layout: para la interfas del inicio de sesion

src/common/styles: estilos globles

src/common/api: use de la url de .env

src/features/auth: Lógica de autenticación, stores y servicios de API.

stores: Gestión de estados globales.

src/features: Logica , consumos de apis del backend.


Resolución de Problemas Comunes (FAQ)
Si te ha dado algún error al instalar o al correr, ponlo aquí para ahorrarte tiempo después:

Markdown
## 🛠 Solución de Problemas (Troubleshooting)
- **Error de CORS**: Asegúrate de que el backend tenga configurada la URL de origen permitida.
- **Error de dependencias**: Si `yarn dev` falla tras una actualización, intenta borrar `node_modules` y ejecutar `yarn cache clean && yarn install`.