import { defineStore } from 'pinia'

export const useLabStore = defineStore('lab', {
  state: () => ({
    apiPlanets: [],
    isLoadingPlanets: false,
    planetsError: null,

    formTitle: '',
    formBody: '',
    formUserId: 1,
    isSubmittingForm: false,
    formSubmissionResult: null,
    formSubmissionError: null
  }),
  actions: {
    async fetchPlanets() {
      this.isLoadingPlanets = true
      this.planetsError = null
      try {
        const response = await fetch('https://api.le-systeme-solaire.net/rest/bodies?filter[]=isPlanet,eq,true&data=id,englishName,bodyType,meanRadius,gravity,avgTemp,moons,discoveredBy,discoveryDate&orderby=englishName,asc')
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Ошибка при загрузке данных о планетах: ${response.status} ${response.statusText}. ${errorData}`);
        }
        const data = await response.json();
        this.apiPlanets = data.bodies;
      } catch (error) {
        this.planetsError = error.message
        console.error("Ошибка fetchPlanets:", error)
      } finally {
        this.isLoadingPlanets = false
      }
    },

    async submitPost() {
      this.isSubmittingForm = true
      this.formSubmissionResult = null
      this.formSubmissionError = null

      const postData = {
        title: this.formTitle,
        body: this.formBody,
        userId: this.formUserId,
      }

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          body: JSON.stringify(postData),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
        if (!response.ok) throw new Error('Ошибка при отправке поста')
        this.formSubmissionResult = await response.json()
        this.formTitle = ''
        this.formBody = ''
      } catch (error) {
        this.formSubmissionError = error.message
        console.error("Ошибка submitPost!!!", error)
      } finally {
        this.isSubmittingForm = false
      }
    }
  }
})
