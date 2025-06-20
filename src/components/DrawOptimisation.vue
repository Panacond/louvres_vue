<script setup>
const material = defineModel()
</script>
<template>
    <h1>Оптимизация</h1>
    <div v-for="(detail, index) in material" :key="index">
        {{ detail }}
    </div>
</template>