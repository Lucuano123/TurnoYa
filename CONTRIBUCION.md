# Contribuir a TurnosYa

Gracias por contribuir a **TurnosYa**, un sistema de reservas en línea desarrollado con Node.js (^18.0.0), Express (^4.18.2), TypeScript (^5.2.2) y PostgreSQL. Esta guía describe los estándares y procesos para contribuir, asegurando un código limpio, seguro y bien documentado, alineado con las historias de usuario (HU01-HU15).

## Tabla de Contenidos
- [Código de Conducta](#código-de-conducta)
- [Cómo Contribuir](#cómo-contribuir)
- [Convenciones de Mensajes de Commit](#convenciones-de-mensajes-de-commit)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Dependencias](#dependencias)

## Código de Conducta
- Sé respetuoso e inclusivo.
- Sigue los estándares de calidad y documentación del proyecto.
- Reporta problemas o sugiere mejoras a través de GitHub Issues.

## Cómo Contribuir
1. Haz un fork del repositorio y clónalo localmente.
2. Instala las dependencias: `npm install`.
3. Crea una nueva rama: `git checkout -b feature/<nombre-funcionalidad>` o `fix/<corrección-error>`.
4. Realiza cambios siguiendo las guías a continuación.
5. Escribe pruebas para nuevas funcionalidades o correcciones.
6. Envía un pull request (PR) a la rama `main`.

## Convenciones de Mensajes de Commit
Usamos [Conventional Commits](https://www.conventionalcommits.org/) para mensajes claros y semánticos que faciliten la generación de changelogs y la integración con CI/CD.

### Formato
<tipo>(&#x3C;área>): &#x3C;descripción breve>
&#x3C;LÍNEA EN BLANCO>
<cuerpo opcional="">
&#x3C;LÍNEA EN BLANCO>
&#x3C;pie de página opcional></cuerpo></tipo>


- **Tipo**: Uno de:
  - `feat`: Nueva funcionalidad (ej., implementar un endpoint para HU04).
  - `fix`: Corrección de errores (ej., corregir validación en `auth.middleware.ts`).
  - `docs`: Actualizaciones en documentación (ej., actualizar contrato API).
  - `style`: Cambios de formato (sin alterar lógica).
  - `refactor`: Reestructuración de código sin cambiar comportamiento.
  - `test`: Agregar o actualizar pruebas.
  - `chore`: Tareas menores (ej., actualizar dependencias).
  - `build`: Cambios en el sistema de compilación (ej., actualizar `tsconfig.json`).
  - `ci`: Cambios en configuración de CI/CD.
  - `perf`: Mejoras de rendimiento.
- **Área**: Módulo o entidad afectada (ej., `auth`, `bookings`, `customer`, `payments`, `availabilities`, `services`, `categories`, `database`).
- **Descripción breve**: Concisa (≤50 caracteres), en imperativo (ej., "agregar", "corregir", "actualizar").
- **Cuerpo** (opcional): Explica *qué* y *por qué* (≤72 caracteres por línea).
- **Pie de página** (opcional): Referencia historias de usuario (ej., "Ref: HU04") o cambios críticos (`BREAKING CHANGE: <descripción>`).

### Ejemplos
`feat(bookings): agregar endpoint POST /bookings para HU04`

Implementar creación de reservas con validación de slots.
Validar service_id y disponibilidad en tiempo real.
Ref: HU04

`fix(auth): corregir validación de JWT en auth.middleware.ts`

Solucionar error en manejo de tokens expirados.
Ref: HU13
`docs(services): actualizar documentación de filtros en GET /services para HU07`


### Reglas
- Mantén los commits atómicos (un cambio lógico por commit).
- Referencia las historias de usuario (HU01-HU15) en el pie de página.
- Usa `!` tras el tipo para cambios críticos (ej., `feat(bookings)!: cambiar formato de fecha`).
- Evita mensajes genéricos como "arreglar error" o "actualizar código".
- Usa español para mensajes de commit, salvo acuerdo contrario.


## Estructura del Proyecto
El proyecto está modularizado por entidad/funcionalidad:


```src/
├── auth/                    # Autenticación (HU01, HU13)
├── bookings/                # Gestión de reservas (HU04-HU06, HU09, HU10)
├── categories/              # Categorías de servicios (HU02, HU07)
├── customer/                # Perfiles de usuarios (HU01, HU03, HU13, HU14)
├── payments/                # Procesamiento de pagos (HU08, HU15)
├── services/                # Catálogo de servicios (HU02, HU04, HU07)
├── availabilities/          # Gestión de disponibilidad (HU11, HU12)
├── middleware/              # Middlewares reutilizables (ej., JWT, manejo de errores)
├── config/                  # Configuración de base de datos y entorno
├── migrations/              # Migraciones de base de datos
├── utils/                   # Utilidades compartidas (ej., notificaciones, logging)
├── types/                   # Tipos globales de TypeScript
├── app.ts                   # Punto de entrada de la aplicación
```

## Dependencias
Usa las versiones estables más recientes:

```Node.js: ^18.0.0
Express: ^4.18.2
TypeScript: ^5.2.2
pg: ^8.11.3
jsonwebtoken: ^9.0.2
bcrypt: ^5.1.1
Zod: ^3.22.4
dotenv: ^16.3.1
Jest: ^29.7.0
Husky: ^8.0.3
```
