import { defineComponent } from 'vue'
export default defineComponent({
  name: 'WeatherDetailsItem',

  props: {
    detail: {
      type: Object,
      required: true,
    },
  },

  template: `<div class="weather-details__item">
              <div class="weather-details__item-label">{{ detail.label }}</div>
              <div class="weather-details__item-value">{{ detail.val }}</div>
            </div>`,
})
