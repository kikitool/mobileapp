"user strict";
window.addEventListener("DOMContentLoaded",
    function () {
        //ページ本体が読み込まれたタイミングで実行するコード

        const item = document.querySelectorAll('.item');  //icon

        item.forEach(function (element, index) {
            // 0.2秒ずつ遅らせて表示
            setTimeout(function () {
                element.classList.add("fade-in");
            }, index * 200);
        });
    }, false
);
