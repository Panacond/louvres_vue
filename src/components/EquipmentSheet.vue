<script setup>
const products = defineModel()
import { saveToCSVproducts } from '../utils/saveToCSV.js';
</script>
<template>
    <table>
        <caption>
            Лист комплектації
        </caption>
        <thead>
            <tr class="row">
                <th class="col">артикул</th>
                <th class="col">найменування</th>
                <th class="col">ед. ізм.</th>
                <th class="col">кіл-ть</th>
                <th class="col">маркування</th>
                <th class="col">колір</th>
                <th class="col">длина</th>
                <th class="col">висота</th>
                <th class="col">ригелей в блоці</th>
                <th class="col">примітки</th>
            </tr>
        </thead>
        <tbody v-for="(detail, index) in products" :key="index">
            <tr class="row">
                <td class="col">{{ detail.articul }}</td>
                <td class="col">{{ detail.name }}</td>
                <td class="col">{{ detail.units }}</td>
                <td class="col">{{ detail.quantity }}</td>
                <td class="col">{{ detail.mark }}</td>
                <td class="col">{{ detail.color }}</td>
                <td class="col">{{ detail.width }}</td>
                <td class="col">{{ detail.height }}</td>
                <td class="col">{{ detail.rigel }}</td>
                <td class="col">{{ detail.department }}</td>
            </tr>
        </tbody>
    </table>
    <button @click="saveToCSVproducts(products)">save table lk</button>
</template>