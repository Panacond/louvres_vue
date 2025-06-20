<script setup>
const department = defineModel()
import {saveToCSVworkshop } from '../utils/saveToCSV.js';

</script>
<template>
    <table>
        <caption>
            Матеріали в цех
        </caption>
        <thead>
            <tr class="row">
                <th class="col">кіл-ть</th>
                <th class="col">ед. ізм.</th>
                <th class="col">кіл-ть полос</th>
                <th class="col">кіл-ть у полосі</th>
                <th class="col">артикул</th>
                <th class="col">найменування</th>
                <th class="col">колір</th>
                <th class="col">примітки</th>
            </tr>
        </thead>
        <tbody v-for="(detail, index) in department" :key="index">
            <tr class="row">
                <td class="col">{{ detail.quantity }}</td>
                <td class="col">{{ detail.units }}</td>
                <td class="col">{{ detail.line }}</td>
                <td class="col">{{ detail.quan_line }}</td>
                <td class="col">{{ detail.articul }}</td>
                <td class="col">{{ detail.name }}</td>
                <td class="col">{{ detail.color }}</td>
                <td class="col">{{ detail.department }}</td>
            </tr>
        </tbody>
    </table>
    <button @click="saveToCSVworkshop(department)">save table matetial</button>
</template>