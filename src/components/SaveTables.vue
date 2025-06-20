<script setup>
const grille = defineModel('grille')
const details = defineModel('details')
const material = defineModel('material')
const products = defineModel('products')
const department = defineModel('department')

import { saveToCSVgrille, saveToCSVdetails, saveToCSV_mat, saveToCSVproducts, saveToCSVworkshop } from '../utils/saveToCSV.js';


function saveAllTable() {
    saveToCSVgrille(grille.value)
    saveToCSVdetails(details.value)
    saveToCSV_mat(material.value)
    saveToCSVproducts(products.value)
    saveToCSVworkshop(department.value)
}
</script>
<template>
    <br />
    <button @click="saveAllTable">save all tables</button>
</template>