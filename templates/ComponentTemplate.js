export const ComponentTemplate = (templateName, lang = '', scss = false, scoped = false) => {
  return `<template>
    <div class="${templateName.toLowerCase()}">
      <h1>${templateName}</h1>
    </div>
  </template>
  
  <script${lang ? ` lang="${lang}"` : ''} setup>
    // Scripts here
  </script>
  
  <style${scss ? ` lang="scss"` : ''} ${scoped ? ' scoped' : ''}>
    .${templateName.toLowerCase()}{
      /* Styling here */
    }
  </style>
  `;
};
