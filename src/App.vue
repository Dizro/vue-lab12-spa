<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="bg-blue-600 text-white shadow-md">
    <div class="container mx-auto px-4 py-3">
      <nav class="flex items-center justify-between">
        <div class="text-xl font-semibold">Мое SPA</div>
        <div class="space-x-3">
          <RouterLink to="/" class="px-3 py-2 rounded-md hover:bg-blue-700 transition-colors">Главная</RouterLink>
          <RouterLink to="/api-data" class="px-3 py-2 rounded-md hover:bg-blue-700 transition-colors">Данные API</RouterLink>
          <RouterLink to="/form" class="px-3 py-2 rounded-md hover:bg-blue-700 transition-colors">Форма</RouterLink>
        </div>
      </nav>
    </div>
  </header>

  <main class="container mx-auto p-4 sm:p-6 lg:p-8">
    <RouterView />
  </main>

  <footer class="bg-gray-800 text-white text-center p-4 mt-auto">
    <p>{{ new Date().getFullYear() }} Дмитрий Дубина, 8И31. Лабораторная работа №12</p>
  </footer>
</template>
