<template>
    <div>
      <h1>Affichage et téléchargement du fichier HTML 2</h1>
      <input v-model="query" placeholder="Nom du fichier" />
      <button @click="fetchDocument">👁️ Afficher</button>
      <button @click="downloadDocument">⬇️ Télécharger</button>
      <button @click="goHome">🏠 Accueil</button> <!-- Bouton retour -->
      <div v-html="htmlContent"></div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'; // Importation du router
  
  const router = useRouter(); // Initialisation du router
  
  const query = ref('Maroc_Albanie.html');
  const htmlContent = ref('');
  
  const fetchDocument = async () => {
    if (!query.value) {
      alert('Veuillez entrer un nom de fichier.');
      return;
    }
    if (!query.value.endsWith('.html')) {
      alert('Le fichier doit être un .html');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8081/documents/${query.value}`);
      console.log('🔍 Réponse serveur:', response);
      if (!response.ok) throw new Error('Fichier non trouvé');
      htmlContent.value = '<p>✅ Fichier existant.</p>';
      htmlContent.value = await response.text();
    } catch (error) {
      console.error('Erreur :', error);
      htmlContent.value = '<p>❌ Fichier non existant.</p>';
    }
  };
  
  const downloadDocument = async () => {
    if (!query.value) {
      alert('Veuillez entrer un nom de fichier.');
      return;
    }
    if (!query.value.endsWith('.html')) {
      alert('Le fichier doit être un .html');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8081/documents/${query.value}`);
      if (!response.ok) throw new Error('Fichier introuvable');
  
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = query.value;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erreur lors du téléchargement :", error);
      alert("❌ Erreur lors du téléchargement du fichier.");
    }
  };
  
  const goHome = () => {
    router.push('/'); // Redirige vers la page d'accueil
  };
  </script>
  