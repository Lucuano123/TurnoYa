# Contribuir a TurnosYa

## Tabla de Contenidos
- [Convenciones de Mensajes de Commit](#convenciones-de-mensajes-de-commit)
- [Formato](#formato)
- [Ejemplos](#ejemplos)
- [Reglas](#reglas)

## Convenciones de Mensajes de Commit
Usamos [Conventional Commits](https://www.conventionalcommits.org/) en **inglés** para mensajes claros y semánticos que faciliten la generación de changelogs y la integración con CI/CD.

### Formato
'<type>(<scope>): <short description>
<BLANK LINE>
<optional body>
<BLANK LINE>
<optional footer>'

- **Type**: Uno de:
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
- **Scope**: Módulo o entidad afectada (ej., `auth`, `bookings`, `customer`, `payments`, `availabilities`, `services`, `categories`, `database`, `project`).
- **Short Description**: Concisa (≤50 caracteres), en imperativo y en inglés (ej., "add", "fix", "update").
- **Body** (opcional): Explica *qué* y *por qué* en inglés (≤72 caracteres por línea).
- **Footer** (opcional): Referencia historias de usuario (ej., "Ref: HU04") o cambios críticos (`BREAKING CHANGE: <description>`).

### Ejemplos
```
'feat(bookings): add POST /bookings endpoint for HU04

Implement booking creation with slot validation.
Validate service_id and availability in real-time.
Ref: HU04'
```

```
'fix(auth): fix JWT validation in auth.middleware.ts

Resolve error in handling expired tokens.
Ref: HU13'
```
```
'docs(project): add CONTRIBUTING.md with contribution guidelines

Add documentation for commit conventions in English.'
```
### Reglas
- Mantén los commits atómicos (un cambio lógico por commit).
- Referencia las historias de usuario (HU01-HU15) en el pie de página.
- Usa `!` tras el tipo para cambios críticos (ej., `feat(bookings)!: change date format`).
- Evita mensajes genéricos como "fix bug" o "update code".
- Usa **inglés** para los mensajes de commit.
