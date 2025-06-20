<script setup>
const details = defineModel()
import { saveToCSVdetails } from '../utils/saveToCSV.js';

</script>
<template>
    <table>
        <caption>
            Деталі рішіток
        </caption>
        <thead>
            <tr class="row">
                <th class="col">артикул</th>
                <th class="col">найменування</th>
                <th class="col">довжина, мм</th>
                <th class="col">ед. ізм.</th>
                <th class="col">кіл-ть</th>
                <th class="col">колір</th>
            </tr>
        </thead>
        <tbody v-for="(detail, index) in details" :key="index">
            <tr class="row">
                <td class="col">{{ detail.articul }}</td>
                <td class="col">{{ detail.name }}</td>
                <td class="col">{{ detail.length }}</td>
                <td class="col">{{ detail.units }}</td>
                <td class="col">{{ detail.quantity }}</td>
                <td class="col">{{ detail.color }}</td>
            </tr>
        </tbody>
    </table>
    <button @click="saveToCSVdetails(details)">save table details</button>
</template>