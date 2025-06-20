<script setup>

const grille = defineModel('grille')
grille.value = [
    {
        height: 623,
        width: 1701,
        quantity: 5,
        color: "RAL 9006",
    },
]
const details = defineModel('details')

details.value = [
    {
        articul: "Закл 3,2*8 нерж отр",
        name: "Заклепка 3,2*8 нерж отрывная",
        units: "шт.",
        quantity: 250,
    },
    {
        articul: "KMD.VR.TL20",
        name: "KMD.VR.TL20 Тримач ламелі решітки",
        units: "шт.",
        quantity: 100,
    },
    {
        articul: "З'єднувач 40*40*23*2",
        name: "З'єднувач 40*40*23*2",
        units: "шт.",
        quantity: 50,
    },
    {
        articul: "KMD.VR.L",
        name: "KMD.VR.L Профіль алюмінієвий ламель вентиляційних решіток 1028",
        length: 1693,
        units: "шт.",
        quantity: 60,
        color: "RAL 9006",
    },
    {
        articul: "KMD.VR.RM26",
        name: "KMD.VR.RM26 Профіль алюмінієвий П-подібний 26*26,4",
        length: 1701,
        units: "шт.",
        quantity: 10,
        color: "RAL 9006",
    },
    {
        articul: "KMD.VR.RM26",
        name: "KMD.VR.RM26 Профіль алюмінієвий П-подібний 26*26,4",
        length: 623,
        units: "шт.",
        quantity: 10,
        color: "RAL 9006",
    }
]

const material = defineModel('material')

material.value = [
    {
        articul: "Закл 3,2*8 нерж отр",
        name: "Заклепка 3,2*8 нерж отрывная",
        units: "шт.",
        quantity: 250,
    },
    {
        articul: "KMD.VR.TL20",
        name: "KMD.VR.TL20 Тримач ламелі решітки",
        units: "шт.",
        quantity: 100,
    },
    {
        articul: "З'єднувач 40*40*23*2",
        name: "З'єднувач 40*40*23*2",
        units: "шт.",
        quantity: 50,
    },
    {
        articul: "KMD.VR.L",
        name: "KMD.VR.L Профіль алюмінієвий ламель вентиляційних решіток 1028",
        length: 1693,
        units: "шт.",
        quantity: 60,
        color: "RAL 9006",
    },
    {
        articul: "KMD.VR.RM26",
        name: "KMD.VR.RM26 Профіль алюмінієвий П-подібний 26*26,4",
        length: 1701,
        units: "п.м.",
        quantity: 150,
        color: "RAL 9006",
    },
    {
        articul: "KMD.VR.RM26",
        name: "KMD.VR.RM26 Профіль алюмінієвий П-подібний 26*26,4",
        length: 623,
        units: "п.м.",
        quantity: 50,
        color: "RAL 9006",
    }
]

const products = defineModel('products')
products.value = [
    {
        articul: "",
        name: "вентиляционная решетка VR1",
        units: "шт.",
        quantity: 5,
        mark: "VR1",
        color: "RAL 9006",
        width: 1701,
        height: 623,
        rigel: "",
        department: "ЦАК",
    },
]

const department = defineModel('department')

function add_property() {
    department.value = material.value.map((profileItem) => {
        const foundOriginalMaterial = this.material.find(
            (mat) => mat.articul === profileItem.articul
        );

        return {
            ...profileItem,
            // color: (item) => { return { foundMaterial: foundOriginalMaterial } }, // Если нужен объект с ключом
            color: foundOriginalMaterial.color, // Если нужна прямая ссылка на объект
            department: "ЦАК",
        };
    });
}


</script>
<template>
    {{ add_property() }}
</template>