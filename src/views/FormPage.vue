<template>
  <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
    <h1 class="text-3xl font-bold text-teal-700 mb-6 text-center">Сообщить о наблюдении</h1>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label for="observationTitle" class="block text-sm font-medium text-gray-700 mb-1">Что вы наблюдали?</label>
        <input
          type="text"
          id="observationTitle"
          v-model="store.formTitle"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          placeholder="Например: Яркий метеор">
      </div>

      <div>
        <label for="observationBody" class="block text-sm font-medium text-gray-700 mb-1">Подробное описание (где, когда, детали):</label>
        <textarea
          id="observationBody"
          v-model="store.formBody"
          rows="5"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          placeholder="Укажите дату, время, примерное местоположение и другие важные детали вашего наблюдения"></textarea>
      </div>

      <button
        type="submit"
        :disabled="store.isSubmittingForm"
        class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
        <span v-if="store.isSubmittingForm">Отправка данных...</span>
        <span v-else>Отправить сообщение</span>
      </button>
    </form>

    <div v-if="store.formSubmissionResult" class="mt-6 p-4 bg-green-100 text-green-700 rounded-md shadow">
      <h3 class="font-semibold mb-2">Сообщение успешно отправлено!</h3>
      <p class="text-sm"><strong>Присвоенный ID записи:</strong> {{ store.formSubmissionResult.id }}</p>
      <p class="text-xs mt-1">Мы получили ваше наблюдение:</p>
      <pre class="mt-1 text-xs bg-green-50 p-2 rounded overflow-auto">{{ JSON.stringify(store.formSubmissionResult, null, 2) }}</pre>
    </div>

    <div v-if="store.formSubmissionError" class="mt-6 p-4 bg-red-100 text-red-700 rounded-md shadow">
      <h3 class="font-semibold">Ошибка при отправке:</h3>
      <p>{{ store.formSubmissionError }}</p>
    </div>
  </div>
</template>

<script setup>
import { useLabStore } from '@/stores/labStore'

const store = useLabStore()

const handleSubmit = () => {
  store.submitPost()
}
</script>
