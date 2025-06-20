<script setup>
const material = defineModel()
import { saveToCSV_mat } from '../utils/saveToCSV.js';

</script>
<template>
    <table>
        <caption>
            Заявка на матеріали
        </caption>
        <thead>
            <tr class="row">
                <th class="col">артикул</th>
                <th class="col">найменування</th>
                <th class="col">ед. ізм.</th>
                <th class="col">кіл-ть</th>
                <th class="col">колір</th>
            </tr>
        </thead>
        <tbody v-for="(detail, index) in material" :key="index">
            <tr class="row">
                <td class="col">{{ detail.articul }}</td>
                <td class="col">{{ detail.name }}</td>
                <td class="col">{{ detail.units }}</td>
                <td class="col">{{ detail.quantity }}</td>
                <td class="col">{{ detail.color }}</td>
            </tr>
        </tbody>
    </table>
    <button @click="saveToCSV_mat(material)">save table material</button>
</template>