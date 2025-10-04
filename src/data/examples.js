export const categories = [
  { id: '1', name: 'Frontend', slug: 'frontend', icon: '🎨' },
  { id: '2', name: 'Backend', slug: 'backend', icon: '⚙️' },
  { id: '3', name: 'DevOps', slug: 'devops', icon: '🚀' },
  { id: '4', name: 'Diseño', slug: 'design', icon: '✨' },
  { id: '5', name: 'Aprendizaje', slug: 'learning', icon: '📚' }
];

export const subcategories = [
  { id: '1', name: 'Framework', categoryId: '1' },
  { id: '2', name: 'Styling', categoryId: '1' },
  { id: '3', name: 'Runtime', categoryId: '2' },
  { id: '4', name: 'Database', categoryId: '2' },
  { id: '5', name: 'Containers', categoryId: '3' },
  { id: '6', name: 'UI/UX', categoryId: '4' },
  { id: '7', name: 'Web', categoryId: '5' }
];

export const resources = [
  { id: '1', title: 'React Documentation', description: 'Documentación oficial de React.', url: 'https://react.dev', categoryId: '1', subcategoryId: '1' },
  { id: '2', title: 'Tailwind CSS', description: 'Framework CSS utility-first.', url: 'https://tailwindcss.com', categoryId: '1', subcategoryId: '2' },
  { id: '3', title: 'Node.js', description: 'Runtime de JavaScript para servidor.', url: 'https://nodejs.org', categoryId: '2', subcategoryId: '3' },
  { id: '4', title: 'PostgreSQL', description: 'Base de datos relacional open source.', url: 'https://www.postgresql.org', categoryId: '2', subcategoryId: '4' },
  { id: '5', title: 'Docker', description: 'Plataforma de contenedores.', url: 'https://www.docker.com', categoryId: '3', subcategoryId: '5' },
  { id: '6', title: 'Figma', description: 'Herramienta de diseño colaborativo.', url: 'https://www.figma.com', categoryId: '4', subcategoryId: '6' },
  { id: '7', title: 'MDN Web Docs', description: 'Documentación sobre tecnologías web.', url: 'https://developer.mozilla.org', categoryId: '5', subcategoryId: '7' },
  { id: '8', title: 'Vue.js', description: 'Framework progresivo para construir interfaces de usuario.', url: 'https://vuejs.org', categoryId: '1', subcategoryId: '1' },
  { id: '9', title: 'Sass', description: 'Preprocesador CSS para estilos avanzados.', url: 'https://sass-lang.com', categoryId: '1', subcategoryId: '2' },
  { id: '10', title: 'Express.js', description: 'Framework web para Node.js.', url: 'https://expressjs.com', categoryId: '2', subcategoryId: '3' },
  { id: '11', title: 'MongoDB', description: 'Base de datos NoSQL orientada a documentos.', url: 'https://mongodb.com', categoryId: '2', subcategoryId: '4' },
  { id: '12', title: 'Kubernetes', description: 'Orquestador de contenedores.', url: 'https://kubernetes.io', categoryId: '3', subcategoryId: '5' },
  { id: '13', title: 'Adobe XD', description: 'Herramienta de diseño y prototipado.', url: 'https://www.adobe.com/products/xd.html', categoryId: '4', subcategoryId: '6' },
  { id: '14', title: 'freeCodeCamp', description: 'Plataforma gratuita para aprender a programar.', url: 'https://www.freecodecamp.org', categoryId: '5', subcategoryId: '7' },
  { id: '15', title: 'Next.js', description: 'Framework React para aplicaciones web modernas.', url: 'https://nextjs.org', categoryId: '1', subcategoryId: '1' },
  { id: '16', title: 'Styled Components', description: 'Utilidad para estilos en React usando CSS-in-JS.', url: 'https://styled-components.com', categoryId: '1', subcategoryId: '2' },
  { id: '17', title: 'Prisma', description: 'ORM para bases de datos en Node.js y TypeScript.', url: 'https://www.prisma.io', categoryId: '2', subcategoryId: '4' },
  { id: '18', title: 'Portainer', description: 'Gestión visual de contenedores Docker.', url: 'https://www.portainer.io', categoryId: '3', subcategoryId: '5' },
  { id: '19', title: 'Sketch', description: 'Herramienta de diseño digital para macOS.', url: 'https://www.sketch.com', categoryId: '4', subcategoryId: '6' },
  { id: '20', title: 'Coursera', description: 'Cursos online de tecnología y programación.', url: 'https://www.coursera.org', categoryId: '5', subcategoryId: '7' }

];
