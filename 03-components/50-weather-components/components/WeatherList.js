import { defineComponent } from 'vue'
import WeatherCard from './WeatherCard'

export default defineComponent({
  name: 'WeatherList',

  components: {
    WeatherCard,
  },

  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },

  template: `
      <ul class="weather-list unstyled-list">
        <WeatherCard v-for="card in data" :card />
      </ul>`,
})
