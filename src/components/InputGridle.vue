<script setup>
const grille = defineModel('grille')
import { saveToCSVgrille } from '../utils/saveToCSV.js';

function addDetail() {
  grille.value.push({
    height: 623,
    width: 1701,
    quantity: 5,
    color: "RAL 9006",
  });
}
function removeDetail(index) {
  grille.value.splice(index, 1);
}

function loadFromCSV(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target.result;
    const rows = text.split("\n").slice(1); // Пропустить заголовок
    rows.forEach((row) => {
      const [height, width, quantity, color] = row.split(",");
      if (height && width && quantity) {
        grille.value.push({
          height: parseInt(height),
          width: parseInt(width),
          quantity: parseInt(quantity),
          color: color.replace(/"/g, ""), // Удаление кавычек
        });
      }
    });
  };
  reader.readAsText(file);
}

</script>

<template>
  <table>
    <caption>
      Основные размеры решеток
    </caption>
    <thead>
      <tr class="row">
        <th class="col">висота, мм</th>
        <th class="col">ширина, мм</th>
        <th class="col">кіл-ть, шт.</th>
        <th class="col">колір</th>
      </tr>
    </thead>
    <tbody v-for="(detail, index) in grille" :key="index">
      <tr class="row">
        <th class="col">
          <input type="number" v-model="detail.height" min="1" />
        </th>
        <td class="col">
          <input type="number" v-model="detail.width" min="1" />
        </td>
        <td class="col">
          <input type="number" v-model="detail.quantity" min="1" />
        </td>
        <td class="col"><input type="text" v-model="detail.color" /></td>
        <td class="col">
          <button @click="removeDetail(index)">remove grille</button>
        </td>
      </tr>
    </tbody>
  </table>
  <button @click="addDetail">add grille</button>
  <input style="width: 10cm" type="file" @change="loadFromCSV" accept=".csv" />
  <button @click="saveToCSVgrille(grille)">save table</button>
</template>