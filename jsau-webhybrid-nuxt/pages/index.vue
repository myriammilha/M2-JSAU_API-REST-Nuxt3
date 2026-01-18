<template>
    <div class="container">
      <h1>Bienvenue sur jsau-webhybrid-nuxt</h1>
      <p>Ce site permet d'afficher des fichiers HTML récupérés depuis jsau-apiserver.</p>
      
      <div class="links">
        <NuxtLink to="/page1" class="btn">Voir Coree_France.html (Page1)</NuxtLink>
        <NuxtLink to="/page2" class="btn">Voir Maroc_Albanie.html (Page2)</NuxtLink>
      </div>
    </div>
  </template>
  
  <style scoped>
  .container {
    text-align: center;
    margin-top: 50px;
  }
  
  .links {
    margin-top: 20px;
  }
  
  .btn {
    display: inline-block;
    margin: 10px;
    padding: 10px 15px;
    background: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
  }
  
  .btn:hover {
    background: #0056b3;
  }
  </style>
  