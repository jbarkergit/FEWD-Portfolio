export const myProjects = [
  {
    key: 'ecommerce',
    projectUrl: 'http://localhost:5173/ecommerce',
    technologies: {
      libraries: ['react', 'react router'],
      webTechnologies: ['html', 'css', 'sass', 'javascript', 'typescript'],
      codeQuality: ['eslint', 'prettier'],
      buildtools: ['vite'],
      packageManagers: ['npm'],
      versionControl: ['git', 'github'],
    },
    projectExtended: true,
    projectSummary: true,
    projectImageSrc: '/src/portfolio/assets/compressed-project-images/eco-landing-page.png',
    projectImageAlt: 'Ecommerce Web Development Project',
    dataStatus: 'active',
  },
  {
    key: 'hyundai',
    projectUrl: '',
    projectTechnology: [],
    projectExtended: false,
    projectSummary: false,
    projectImageSrc: '/src/portfolio/assets/compressed-project-images/hyundai-preview.jpg',
    projectImageAlt: 'Unavailable Web Development Project',
    dataStatus: 'disabled',
  },
];
