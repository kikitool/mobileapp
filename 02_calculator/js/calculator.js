'use strict';

// DOM要素を取得
const elementSelect = document.getElementById("calcType");
const elementNum1 = document.getElementById("num1");
const elementNum2 = document.getElementById("num2");
const elementResult = document.getElementById("result");

// 計算処理を行う関数
elementSelect.addEventListener("change",
    function () {

        let num1 = Number(elementNum1.value);
        let num2 = Number(elementNum2.value);
        let calcType = elementSelect.value;
        let result;

        switch (calcType) {
            case "type-add":           // 足し算
                result = num1 + num2;
                break;
            case "type-substract":    // 引き算
                result = num1 - num2;
                break;
            case "type-multiply":    // 掛け算
                result = num1 * num2;
                break;
            case "type-divide":      // 割り算
                result = num1 / num2;
                break;
        }

        // 結果をHTMLに表示
        elementResult.innerHTML = result;
    }, false
);

elementNum1.addEventListener("change",
    function () {

        let num1 = Number(elementNum1.value);
        let num2 = Number(elementNum2.value);
        let calcType = elementSelect.value;
        let result;

        switch (calcType) {
            case "type-add":
                result = num1 + num2;
                break;
            case "type-substract":
                result = num1 - num2;
                break;
            case "type-multiply":
                result = num1 * num2;
                break;
            case "type-divide":
                result = num1 / num2;
                break;
        }

        elementResult.innerHTML = result;
    }, false
);

elementNum2.addEventListener("change",
    function () {

        let num1 = Number(elementNum1.value);
        let num2 = Number(elementNum2.value);
        let calcType = elementSelect.value;
        let result;

        switch (calcType) {
            case "type-add":
                result = num1 + num2;
                break;
            case "type-substract":
                result = num1 - num2;
                break;
            case "type-multiply":
                result = num1 * num2;
                break;
            case "type-divide":
                result = num1 / num2;
                break;
        }

        elementResult.innerHTML = result;
    }, false
);