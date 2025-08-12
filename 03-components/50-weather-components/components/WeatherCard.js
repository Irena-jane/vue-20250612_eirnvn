import { defineComponent, computed } from 'vue'

import WeatherAlert from './WeatherAlert'
import WeatherConditions from './WeatherConditions'
import WeatherDetailsItem from './WeatherDetailsItem'

export default defineComponent({
  name: 'WeatherCard',

  components: {
    WeatherAlert,
    WeatherConditions,
    WeatherDetailsItem,
  },

  props: {
    card: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const isNight = computed(() => {
      return props.card.current.dt < props.card.current.sunrise || props.card.current.dt >= props.card.current.sunset
    })

    const weather_details = computed(() => {
      return [
        {
          label: 'Давление, мм рт. ст.',
          val: (props.card.current.pressure * 0.75).toFixed(0),
        },
        {
          label: 'Влажность, %',
          val: props.card.current.humidity,
        },
        {
          label: 'Облачность, %',
          val: props.card.current.clouds,
        },
        {
          label: 'Ветер, м/с',
          val: props.card.current.wind_speed,
        },
      ]
    })
    return {
      isNight,
      weather_details,
    }
  },

  template: `<li class="weather-card" :class="{ 'weather-card--night': isNight }">
  {{card.current.dt}}  {{card.current.sunrise}} {{card.current.sunset}}
          <WeatherAlert v-if="card.alert" :alert="card.alert" />
          <div>
            <h2 class="weather-card__name">
              {{card.geographic_name}}
            </h2>
            <div class="weather-card__time">
              {{ card.current.dt }}
            </div>
          </div>
          <WeatherConditions :temp="card.current.temp" :weather="card.current.weather"/>

          <div class="weather-details">
            <WeatherDetailsItem v-for="detail in weather_details" :detail="detail" />
          </div>
        </li>`,
})
