# PropManager — Gestión Inmobiliaria Medellín

Aplicación web para gestión de propiedades en arriendo y venta en Medellín, Colombia.

## Fase 1 — UI con Datos Mock

Esta fase implementa el esqueleto visual completo con datos ficticios para validación con el cliente. Todo funciona en el navegador sin base de datos ni autenticación real.

## Inicio rápido

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Estructura del proyecto

```
app/
  (public)/          # Portal público (sin auth)
  (dashboard)/       # Panel asesor (auth mock)
  login/             # Pantalla de acceso
components/
  public/            # Componentes del portal
  dashboard/         # Componentes del panel
  ui/                # Componentes base
lib/
  mock-data/         # Datos ficticios (15 propiedades, contratos, citas)
  utils.ts           # Helpers (formatCOP, formatDate, etc.)
types/
  index.ts           # Tipos TypeScript
```

## Rutas disponibles

| Ruta | Descripción |
|------|-------------|
| `/` | Landing page con buscador y propiedades destacadas |
| `/propiedades` | Listado con filtros |
| `/propiedades/[id]` | Detalle de propiedad |
| `/contacto` | Formulario de contacto |
| `/login` | Pantalla de acceso (demo) |
| `/dashboard` | Panel del asesor |
| `/dashboard/propiedades` | Mis propiedades |
| `/dashboard/propiedades/nueva` | Formulario multi-paso (5 pasos) |
| `/dashboard/contratos` | Gestión de contratos |
| `/dashboard/clientes` | Gestión de clientes |
| `/dashboard/agenda` | Calendario semanal |

## Stack tecnológico

- **Next.js 14** con App Router
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (iconos)
- **React Hook Form** (formularios)
- **Zustand** (estado global)
- **TanStack Table** (tablas)

## Comandos

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run lint     # Linting
```
