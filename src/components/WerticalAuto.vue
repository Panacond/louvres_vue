<template>
    <div
      ref="myContentDiv"
      :style="{ height: dynamicHeight }"
      class="content-div"
    >
      <p>Это какой-то контент внутри div.</p>
      <p>Добавим еще немного текста, чтобы высота увеличилась.</p>
      <p>Возможно, тут будет несколько строк или даже абзацев.</p>
      <p>Чем больше контента, тем больше будет высота.</p>
      <p>JS будет корректировать высоту до ближайшего кратного 4 см.</p>
      <template v-if="moreContent">
        <p v-for="n in 5" :key="n">Дополнительный контент {{ n }}.</p>
      </template>
    </div>
  
    <button @click="addMoreContent">Добавить/удалить контент</button>
    <button @click="updateDivHeight">Обновить высоту вручную</button>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dynamicHeight: 'auto', // Изначально 'auto', чтобы контент определил высоту
        moreContent: false, // Флаг для демонстрации динамического контента
      };
    },
    mounted() {
      // Вызываем расчет высоты после монтирования компонента
      this.$nextTick(() => {
        this.updateDivHeight();
      });
  
      // Опционально: пересчитывать высоту при изменении размера окна
      window.addEventListener('resize', this.updateDivHeight);
    },
    beforeUnmount() {
      // Очищаем слушатель события при размонтировании компонента
      window.removeEventListener('resize', this.updateDivHeight);
    },
    methods: {
      updateDivHeight() {
        const div = this.$refs.myContentDiv;
        if (!div) {
          return; // Если реф еще не доступен
        }
  
        const targetUnitCm = 4; // Единица, которой должна быть кратна высота в см
        // Приблизительное количество пикселей в 1 см (96 dpi).
        // Более точное значение можно получить, измерив 1cm элемент
        const pxPerCm = 37.795275591;
  
        // Сбрасываем высоту, чтобы div мог адаптироваться к контенту перед измерением
        this.dynamicHeight = 'auto';
  
        // Используем $nextTick, чтобы Vue успел обновить DOM после установки 'auto'
        this.$nextTick(() => {
          // Получаем вычисленную высоту элемента в пикселях
          const currentHeightPx = div.offsetHeight; // offsetHeight включает padding и border
  
          // Переводим текущую высоту в см
          const currentHeightCm = currentHeightPx / pxPerCm;
  
          // Вычисляем ближайшее большее кратное 4 см
          const desiredHeightCm = Math.ceil(currentHeightCm / targetUnitCm) * targetUnitCm;
  
          // Переводим желаемую высоту обратно в пиксели
          const desiredHeightPx = desiredHeightCm * pxPerCm;
  
          // Устанавливаем новую высоту
          this.dynamicHeight = `${desiredHeightPx}px`;
  
          console.log(`Текущая высота (px): ${currentHeightPx.toFixed(2)}`);
          console.log(`Текущая высота (cm): ${currentHeightCm.toFixed(2)}`);
          console.log(`Желаемая высота (cm, кратная ${targetUnitCm}): ${desiredHeightCm.toFixed(2)}`);
          console.log(`Установленная высота (px): ${desiredHeightPx.toFixed(2)}`);
        });
      },
      addMoreContent() {
        this.moreContent = !this.moreContent; // Переключаем видимость доп. контента
        // После изменения данных, которые влияют на контент,
        // вызываем пересчет высоты в $nextTick
        this.$nextTick(() => {
          this.updateDivHeight();
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .content-div {
    border: 1px solid blue;
    background-color: lightblue;
    padding: 10px;
    box-sizing: border-box; /* Важно для правильного расчета высоты с padding и border */
    /* transition: height 0.3s ease; /* Для плавной анимации изменения высоты */
  }
  p {
    margin-top: 0;
    margin-bottom: 5px;
  }
  </style>