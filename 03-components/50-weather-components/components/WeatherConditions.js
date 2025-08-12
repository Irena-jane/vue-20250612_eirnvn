import { defineComponent, computed } from 'vue'
import { WeatherConditionIcons } from '../weather.service'

export default defineComponent({
  name: 'WeatherAlert',

  props: {
    temp: {
      type: Number,
      required: true,
    },

    weather: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const temperature = computed(() => {
      return (props.temp - 273.15).toFixed(1)
    })

    const icon = computed(() => {
      return WeatherConditionIcons[props.weather.id]
    })

    return {
      temperature,
      icon,
    }
  },

  template: `<div class="weather-conditions">
            <div class="weather-conditions__icon" :title="weather.description"> {{ icon }}</div>
            <div class="weather-conditions__temp">{{ temperature}} °C</div>
          </div>`,
})
