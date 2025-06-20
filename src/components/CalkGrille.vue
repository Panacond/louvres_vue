<script setup>
import { defineModel } from 'vue';
const grille = defineModel('grilleTable')
const details = defineModel('detailsTable')
const material = defineModel('materialTable')
const products = defineModel('productsTable')
const department = defineModel('departmentTable')

/**
 * Округляет число вверх до ближайшего кратного значения.
 * @param {number} value - Число, которое нужно округлить.
 * @param {number} multiple - Кратность, до которой нужно округлить (например, 50).
 * @returns {number} Округленное число.
 */
function roundUpToNearestMultiple(value, koeff) {
    let multiple = 50
    if (value < 20) {
        multiple = 2
    } else if (value < 100) {
        multiple = 10
    } else if (value < 500) {
        multiple = 20
    }
    return Math.ceil((value / multiple) * koeff) * multiple;
}


function calcLk() {
    products.value.length = 0;
    let n = 1;

    grille.value.forEach((detail) => {
        products.value.push({
            articul: "",
            name: "вентиляционная решетка VR" + n,
            units: "шт.",
            quantity: detail.quantity,
            mark: "VR" + n,
            color: detail.color,
            width: detail.width,
            height: detail.height,
            rigel: "",
            department: "ЦАК",
        });
        n += 1;
    });
}



function rivet_calc(detail) {
    const column = detail.width >= 1000 ? 3 : 2;
    const add =
        detail.width >= 1000 ? adaptor_calk(detail) / column : 0;
    return (
        detail.quantity * 4 * 4 +
        (adaptor_calk(detail) / column) * 3 * 2 +
        add
    );
}
function adaptor_calk(detail) {
    const column = detail.width >= 1000 ? 3 : 2;
    return (
        detail.quantity * column * Math.round((detail.height - 50) / 150)
    );
}

function addMaterial(materialList, newMaterial) {
    // Ищем, есть ли материал с таким же артикулом
    const existingMaterialIndex = materialList.findIndex(
        (item) => item.articul === newMaterial.articul
    );

    if (existingMaterialIndex === -1) {
        // Если материала с таким артикулом нет, добавляем его
        materialList.push(newMaterial);
    } else {
        // Материал с таким артикулом существует
        if (newMaterial.hasOwnProperty("length")) {
            // Новый материал имеет свойство 'length'
            // Ищем, есть ли материал с таким же артикулом И такой же длиной
            const existingMaterialWithLengthIndex = materialList.findIndex(
                (item) =>
                    item.articul === newMaterial.articul &&
                    item.length === newMaterial.length
            );

            if (existingMaterialWithLengthIndex === -1) {
                // Нет существующего материала с таким же артикулом И длиной, поэтому добавляем новый
                materialList.push(newMaterial);
            } else {
                // Материал с таким же артикулом И длиной существует, добавляем к его количеству
                materialList[existingMaterialWithLengthIndex].quantity +=
                    newMaterial.quantity;
            }
        } else {
            // Новый материал НЕ имеет свойства 'length', добавляем к количеству первого найденного совпадения по артикулу
            materialList[existingMaterialIndex].quantity +=
                newMaterial.quantity;
        }
    }
}

function corner_calk(detail) {
    return detail.quantity * 4;
}

function lamella_calk(detail) {
    return Math.round((detail.height - 10) / 50) * detail.quantity;
}

function calk_material() {
    details.value.length = 0;
    grille.value.forEach((detail) => {
        const rivet = {
            articul: "Закл 3,2*8 нерж отр",
            name: "Заклепка 3,2*8 нерж отрывная",
            units: "шт.",
            quantity: rivet_calc(detail),
            color: "",
        };
        addMaterial(details.value, rivet);
        const adaptor = {
            articul: "KMD.VR.TL20",
            name: "KMD.VR.TL20 Тримач ламелі решітки",
            units: "шт.",
            quantity: adaptor_calk(detail),
            color: "",
        };
        addMaterial(details.value, adaptor);
        const corner = {
            articul: "З'єднувач 40*40*23*2",
            name: "З'єднувач 40*40*23*2",
            units: "шт.",
            quantity: corner_calk(detail),
            color: "",
        };
        addMaterial(details.value, corner);
        const lamella = {
            articul: "KMD.VR.L",
            name: "KMD.VR.L Профіль алюмінієвий ламель вентиляційних решіток 1028",
            length: detail.width - 8,
            units: "шт.",
            quantity: lamella_calk(detail),
            color: detail.color,
        };
        addMaterial(details.value, lamella);
        const profilWidth = {
            articul: "KMD.VR.RM26",
            name: "KMD.VR.RM26 Профіль алюмінієвий П-подібний 26*26,4",
            length: detail.width,
            units: "шт.",
            quantity: 2 * detail.quantity,
            color: detail.color,
        };
        addMaterial(details.value, profilWidth);
        const profilHeight = {
            articul: "KMD.VR.RM26",
            name: "KMD.VR.RM26 Профіль алюмінієвий П-подібний 26*26,4",
            length: detail.height,
            units: "шт.",
            quantity: 2 * detail.quantity,
            color: detail.color,
        };
        addMaterial(details.value, profilHeight);
    });
}

function /**
           * Функция для выполнения одномерного раскроя.
           * @param {Array<Object>} materials - Исходный массив объектов материалов.
           * @param {string} articulToCut - Артикул, по которому нужно фильтровать материалы.
           * @param {number} stockLength - Длина одной стандартной заготовки (мм).
           * @param {number} gap - Зазор между деталями на заготовке (мм).
           * @returns {Object} Результат раскроя: общее количество заготовок и их детализация.
           */
    cutMaterials(materials, articulToCut, stockLength, gap) {
    // 1. Фильтрация и подготовка данных
    let partsToCut = [];
    materials.forEach((mat) => {
        if (mat.articul === articulToCut) {
            for (let i = 0; i < mat.quantity; i++) {
                partsToCut.push({ length: mat.length, original: mat }); // Сохраняем ссылку на исходный объект, если нужно
            }
        }
    });

    // Сортировка деталей по убыванию длины (для First Fit Decreasing)
    partsToCut.sort((a, b) => b.length - a.length);

    // 2. Алгоритм раскроя (First Fit Decreasing)
    let stockList = []; // Список используемых заготовок

    partsToCut.forEach((part) => {
        let placed = false;
        // Пытаемся разместить деталь на существующей заготовке
        for (let i = 0; i < stockList.length; i++) {
            let currentStock = stockList[i];
            // Проверяем, помещается ли деталь с учетом зазора
            if (
                currentStock.remainingLength >=
                part.length + (currentStock.parts.length > 0 ? gap : 0)
            ) {
                currentStock.parts.push(part);
                currentStock.remainingLength -=
                    part.length + (currentStock.parts.length > 1 ? gap : 0); // Зазор только между деталями
                placed = true;
                break;
            }
        }

        // Если деталь не поместилась ни на одну существующую заготовку, создаем новую
        if (!placed) {
            stockList.push({
                initialLength: stockLength,
                remainingLength: stockLength - part.length,
                parts: [part],
            });
        }
    });

    // 3. Форматирование вывода
    let totalStocksUsed = stockList.length;
    let groupedStocks = {};

    stockList.forEach((stock) => {
        // Создаем уникальный ключ для заготовки на основе длин расположенных на ней деталей
        // Сортируем длины для создания консистентного ключа независимо от порядка добавления
        const partsLengths = stock.parts
            .map((p) => p.length)
            .sort((a, b) => a - b)
            .join(",");
        const stockKey = `[${partsLengths}]_rem:${stock.remainingLength}`;

        if (!groupedStocks[stockKey]) {
            groupedStocks[stockKey] = {
                count: 0,
                details: stock.parts.map((p) => p.length),
                remainingLength: stock.remainingLength,
            };
        }
        groupedStocks[stockKey].count++;
    });

    // Преобразуем сгруппированный список в массив для удобства
    let formattedStocks = Object.keys(groupedStocks).map((key) => {
        const stockInfo = groupedStocks[key];
        return {
            repeatCount: stockInfo.count,
            layout: stockInfo.details, // Массив длин деталей на заготовке
            remainingLength: stockInfo.remainingLength,
        };
    });

    return {
        totalStocks: totalStocksUsed,
        stockDetails: formattedStocks,
    };
}

function findMaterialByArticul(materialsList, targetArticul) {
    // materialsList: ваш массив материалов
    // targetArticul: артикул, который вы ищете
    return materialsList.find(material => material.articul === targetArticul);
}

function callc_profiles() {
    const articulFilterList = [
        "Закл 3,2*8 нерж отр",
        "KMD.VR.TL20",
        "З'єднувач 40*40*23*2",
    ];

    const mat = details.value.filter((material) =>
        articulFilterList.includes(material.articul)
    );
    const articulToCut = "KMD.VR.L";
    const length = 2000;
    let prof = cutMaterials(
        details.value,
        articulToCut,
        length,
        5
    );
    const lamella = {
        articul: "KMD.VR.L",
        name: "KMD.VR.L Профіль алюмінієвий ламель вентиляційних решіток 1028",
        units: "п.м.",
        quantity: (prof.totalStocks * length) / 1000,
        stockDetails: prof.stockDetails,
        color: findMaterialByArticul(details.value, "KMD.VR.L").color
    };
    mat.push(lamella);
    const articulToCut2 = "KMD.VR.RM26";
    // const length = 2000
    let prof2 = cutMaterials(
        details.value,
        articulToCut2,
        length,
        5
    );
    const profil = {
        articul: "KMD.VR.RM26",
        name: "KMD.VR.RM26 Профіль алюмінієвий П-подібний 26*26,4",
        units: "п.м.",
        quantity: (prof2.totalStocks * length) / 1000,
        stockDetails: prof2.stockDetails,
        color: findMaterialByArticul(details.value, "KMD.VR.RM26").color
    };
    mat.push(profil);
    
    material.value = round_profiles(mat)
}

function round_profiles( localMat) {
    let rules = [
        {
            articul: "Закл 3,2*8 нерж отр",
            koeff: 1.1,
        },
        {
            articul: "KMD.VR.TL20",
            koeff: 1.05,
        },
        {
            articul: "З'єднувач 40*40*23*2",
            koeff: 1.05,
        },
        {
            articul: "KMD.VR.L",
            koeff: 1.002,
        },
        {
            articul: "KMD.VR.RM26",
            koeff: 1.002,
        },
    ];
    const addListMat = []
    localMat.forEach((material) => {
        // Находим соответствующее правило для текущего материала
        const rule = rules.find(
            (rule) => rule.articul === material.articul
        );
        // Если правило найдено, применяем функцию roundUpToNearestMultiple
        if (rule) {
            material.quantity = roundUpToNearestMultiple(
                material.quantity,
                rule.koeff
            );
            addListMat.push(material)
        } 
    });
    return addListMat
}

function calcAll() {
    calcLk();
    calk_material();
    callc_profiles();
    // round_profiles();
}
</script>
<template>
    <br />
    <button @click="calcAll">Розрахувати</button>
</template>