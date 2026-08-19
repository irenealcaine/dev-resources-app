# Dev Resources

Directorio curado de herramientas, frameworks y referencias para developers. Frontend, backend, DevOps, diseño y aprendizaje, todo organizado en un solo lugar.

Diseño editorial propio sobre HeroUI: paleta lima volt sobre negro cálido, tipografías Archivo + Space Mono, índice lateral por categorías y listado de recursos indexado.

## Características

- Búsqueda por nombre y descripción en tiempo real
- Filtrado por categoría (índice lateral en escritorio, chips en móvil)
- Agrupación de recursos por categoría y subcategoría
- Datos servidos desde Supabase
- Dark mode con tema HeroUI personalizado
- Accesibilidad: WCAG 2.2 (skip link, `aria-current`, regiones `aria-live`, `prefers-reduced-motion`, contraste AA)
- SEO: Open Graph, Twitter Cards, JSON-LD, `robots.txt` y `sitemap.xml`

## Stack

- [React](https://react.dev) 18 + [Vite](https://vitejs.dev) 6
- [HeroUI](https://heroui.com) (v2)
- [Tailwind CSS](https://tailwindcss.com) 4
- [Framer Motion](https://www.framer.com/motion)
- [Supabase](https://supabase.com) (PostgreSQL)
- [React Router](https://reactrouter.com)

## Requisitos

- Node.js 20 o superior
- [pnpm](https://pnpm.io) (el proyecto usa `pnpm-lock.yaml`)

## Instalación

```bash
pnpm install
```

### Configurar Supabase

Crea un archivo `.env` en la raíz con tus credenciales:

```bash
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key
```

El esquema espera tres tablas: `categories`, `subcategories` y `resources` (con `id`, `title`, `description`, `url`, `categoryId`, `subcategoryId`).

## Scripts

| Comando          | Descripción                          |
| ---------------- | ------------------------------------ |
| `pnpm dev`       | Servidor de desarrollo               |
| `pnpm build`     | Typecheck + build de producción      |
| `pnpm preview`   | Previsualizar el build               |
| `pnpm lint`      | Corregir errores de ESLint           |

## Estructura

```
src/
  pages/index.jsx      Página principal (búsqueda, índice, listado)
  layouts/default.jsx  Layout con skip link y footer
  components/          Primitivas de diseño
  styles/globals.css   Tema y estilos globales
supabaseClient.js      Cliente de Supabase
```

## Despliegue

Configurado para Netlify (y Vercel con rewrites SPA en `vercel.json`). El build genera `dist/` con `robots.txt` y `sitemap.xml` listos para servir.

## Licencia

MIT