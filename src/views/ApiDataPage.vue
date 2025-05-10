<template>
  <div class="bg-white p-6 rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold text-indigo-700 mb-6 text-center">Планеты Солнечной Системы</h1>

    <div v-if="store.isLoadingPlanets" class="text-center text-gray-600">
      <p class="text-xl">Загрузка данных о планетах...</p>
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mt-4"></div>
    </div>

    <div v-else-if="store.planetsError" class="text-center text-red-600 bg-red-100 p-4 rounded-md">
      <p class="font-semibold">Ошибка при загрузке данных:</p>
      <p>{{ store.planetsError }}</p>
      <button @click="retryFetch" class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
        Попробовать снова
      </button>
    </div>

    <div v-else-if="store.apiPlanets && store.apiPlanets.length > 0" class="grid md:grid-cols-2 gap-6">
      <div v-for="planet in store.apiPlanets" :key="planet.id"
           class="border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow bg-gray-50 flex flex-col justify-between">
        <div>
          <h2 class="text-2xl font-semibold text-indigo-600 mb-3">{{ planet.englishName || planet.id.charAt(0).toUpperCase() + planet.id.slice(1) }}</h2>
          <p class="text-sm text-gray-700 mb-1"><strong class="font-medium">Тип:</strong> {{ planet.bodyType }}</p>
          <p v-if="planet.meanRadius" class="text-sm text-gray-700 mb-1"><strong class="font-medium">Средний радиус:</strong> {{ planet.meanRadius.toLocaleString('ru-RU') }} км</p>
          <p v-if="planet.gravity" class="text-sm text-gray-700 mb-1"><strong class="font-medium">Гравитация:</strong> {{ planet.gravity }} м/с²</p>
          <p v-if="planet.avgTemp" class="text-sm text-gray-700 mb-1"><strong class="font-medium">Средняя температура:</strong> {{ planet.avgTemp - 273.15 }} °C ({{ planet.avgTemp }} K)</p>
          <p v-if="planet.moons && planet.moons.length > 0" class="text-sm text-gray-700 mb-1">
            <strong class="font-medium">Количество лун:</strong> {{ planet.moons.length }}
          </p>
          <p v-else-if="planet.moons !== null" class="text-sm text-gray-700 mb-1"><strong class="font-medium">Луны:</strong> Нет</p>
          <p v-if="planet.discoveredBy" class="text-sm text-gray-700 mb-1"><strong class="font-medium">Кем открыта:</strong> {{ planet.discoveredBy }}</p>
          <p v-if="planet.discoveryDate" class="text-sm text-gray-700 mb-1"><strong class="font-medium">Дата открытия:</strong> {{ planet.discoveryDate }}</p>
        </div>
        <a :href="'https://ru.wikipedia.org/wiki/' + (planet.englishName || planet.id)" target="_blank" rel="noopener noreferrer"
           class="mt-4 inline-block text-sm text-indigo-600 hover:text-indigo-800 hover:underline self-start">
          Узнать больше о {{ planet.englishName || planet.id }} &rarr;
        </a>
      </div>
    </div>

    <div v-else class="text-center text-gray-600">
      <p>Нет данных о планетах для отображения.</p>
      <button @click="retryFetch" class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
        Загрузить данные
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useLabStore } from '@/stores/labStore'

const store = useLabStore()

const loadPlanetsData = () => {
  if (!store.apiPlanets || store.apiPlanets.length === 0 || store.planetsError) {
    store.fetchPlanets()
  }
}

const retryFetch = () => {
  store.fetchPlanets();
}

onMounted(() => {
  loadPlanetsData();
})
</script>
