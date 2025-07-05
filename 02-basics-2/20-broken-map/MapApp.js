import { defineComponent, ref, watchEffect } from 'vue'

export default defineComponent({
  name: 'MapApp',

  setup() {
    // Реактивные переменные для хранения координат метки

    const x = ref(0)
    const y = ref(0)

    const pinRef = ref(null)
    /**
     * Обработчик клика по карте для установки координат метки
     * @param {MouseEvent} event
     */
    function handleClick(event) {
      x.value = event.offsetX
      y.value = event.offsetY
    }

    // Следим за X и Y для установки нового положения
    // watch(
    //   [x, y],
    //   (newCoords, oldCoords) => {
    //     // Находим метку и изменяем её положение
    //     const map = document.querySelector('.pin')
    //     map.style.left = `${newCoords[0]}px`
    //     map.style.top = `${newCoords[1]}px`
    //   },
    //   { deep: true, imediate: true },
    // )

    watchEffect(() => {
      // Находим метку и изменяем её положение
      // const map = document.querySelector('.pin')
      if (pinRef.value) {
        pinRef.value.style.left = `${x.value}px`
        pinRef.value.style.top = `${y.value}px`
      }
    })

    return {
      x,
      y,
      pinRef,
      handleClick,
    }
  },

  template: `
      <div class="map" @click="handleClick">
        <img class="map-image" src="./map.png" alt="Map" draggable="false" />
        <span ref="pinRef" class="pin">📍</span>
      </div>
    `,
})
