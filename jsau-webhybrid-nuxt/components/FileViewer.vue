<template>
    <div v-html="content" class="html-container"></div>
  </template>
  
  <script setup>
  defineProps({
    content: String
  });
  </script>
  
  <style scoped>
  .html-container {
    border: 1px solid #ddd;
    padding: 10px;
    background: #fff;
  }
  </style>
  