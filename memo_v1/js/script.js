let selectedColor = "yellow";

// 初期化
window.addEventListener('load', function() {
    viewStorage();
    saveLocalStorage();
    deleteLocalStorage();
    allClearLocalStorage();
    selectTable();
    setupColorButtons();
});

// Color button setup
function setupColorButtons() {
    const colorBtns = document.querySelectorAll('.color-btn');
    colorBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            colorBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedColor = this.dataset.color;
        });
    });
    // Set first button as active
    if (colorBtns.length > 0) {
        colorBtns[0].classList.add('active');
    }
}

// 1. LocalStorageへ保存
function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click", function (e) {
        e.preventDefault();
        const textKey = document.getElementById("textKey").value;
        const textMemo = document.getElementById("textMemo").value;
        
        if (textKey === "") {
            Swal.fire({
                title: "Memo v1",
                html: "タイトルを入力してください。",
                type: "warning",
                allowOutsideClick: false
            });
            return;
        }
        
        if (textMemo === "") {
            Swal.fire({
                title: "Memo v1",
                html: "内容を入力してください。",
                type: "warning",
                allowOutsideClick: false
            });
            return;
        }
        
        // Store data with color
        const data = {
            content: textMemo,
            color: selectedColor,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem(textKey, JSON.stringify(data));
        viewStorage();
        
        let w_msg = `「${textKey}」を保存しました！`;
        Swal.fire({
            title: "Memo v1",
            html: w_msg,
            type: "success",
            allowOutsideClick: false
        });
        
        document.getElementById("textKey").value = "";
        document.getElementById("textMemo").value = "";
        document.getElementById("textKey").focus();
    }, false);
}

// 2. LocalStorageから削除（行ごと）
function deleteLocalStorage() {
    const list = document.getElementById("list");
    list.addEventListener("click", function (e) {
        if (e.target.tagName !== "IMG") return;
        
        e.preventDefault();
        const key = e.target.parentNode.parentNode.cells[1].firstChild.data;
        
        let w_delete = `LocalStorageから\n「${key}」\nを削除しますか?`;
        Swal.fire({
            title: "Memo v1",
            html: w_delete,
            type: "question",
            showCancelButton: true
        }).then(result => {
            if (result.value === true) {
                localStorage.removeItem(key);
                viewStorage();
                let w_msg = `「${key}」を削除しました！`;
                Swal.fire({
                    title: "Memo v1",
                    html: w_msg,
                    type: "success",
                    allowOutsideClick: false
                });
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        });
    });
}

// 3. LocalStorageから全て削除
function allClearLocalStorage() {
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click", function (e) {
        e.preventDefault();
        let w_msg = "LocalStorageのデータを全て削除します。\nよろしいでしょうか?";
        Swal.fire({
            title: "Memo v1",
            html: w_msg,
            type: "question",
            showCancelButton: true
        }).then(function (result) {
            if (result.value) {
                localStorage.clear();
                viewStorage();
                let w_msg = "全てのメモを削除しました。";
                Swal.fire({
                    title: "Memo v1",
                    html: w_msg,
                    type: "success",
                    allowOutsideClick: false
                });
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        });
    }, false);
}

// 4. データ選択
function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click", function (e) {
        e.preventDefault();
        selectCheckBox("select");
    }, false);
}

// テーブルからデータ選択
function selectCheckBox(mode) {
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let w_cnt = 0;
    let w_textKey = "";
    let w_textMemo = "";
    let w_color = "";
    
    for (let i = 0; i < chkbox1.length; i++) {
        if (chkbox1[i].checked) {
            if (w_cnt === 0) {
                w_textKey = table1.rows[i + 1].cells[1].firstChild.data;
                const data = JSON.parse(localStorage.getItem(w_textKey));
                w_textMemo = data.content;
                w_color = data.color;
            }
            w_cnt++;
        }
    }
    
    document.getElementById("textKey").value = w_textKey;
    document.getElementById("textMemo").value = w_textMemo;
    
    // Set selected color
    if (w_color) {
        const colorBtns = document.querySelectorAll('.color-btn');
        colorBtns.forEach(btn => {
            if (btn.dataset.color === w_color) {
                btn.click();
            }
        });
    }
    
    if (mode === "select") {
        if (w_cnt === 1) {
            return w_cnt;
        } else {
            Swal.fire({
                title: "Memo v1",
                html: "1つ選択してください。",
                type: "error",
                allowOutsideClick: false
            });
        }
    }
    
    if (mode === "del") {
        if (w_cnt >= 1) {
            const del = document.getElementById("del");
            del.addEventListener("click", function (e) {
                e.preventDefault();
                let w_delete = `選択したメモを削除しますか?`;
                Swal.fire({
                    title: "Memo v1",
                    html: w_delete,
                    type: "question",
                    showCancelButton: true
                }).then(result => {
                    if (result.value === true) {
                        for (let i = 0; i < chkbox1.length; i++) {
                            if (chkbox1[i].checked) {
                                const key = table1.rows[i + 1].cells[1].firstChild.data;
                                localStorage.removeItem(key);
                            }
                        }
                        viewStorage();
                        let w_msg = `選択したメモを削除しました！`;
                        Swal.fire({
                            title: "Memo v1",
                            html: w_msg,
                            type: "success",
                            allowOutsideClick: false
                        });
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                });
            }, false);
            return w_cnt;
        } else {
            Swal.fire({
                title: "Memo v1",
                html: "1つ以上選択してください。",
                type: "error",
                allowOutsideClick: false
            });
        }
    }
}

// LocalStorageからのデータの取得とテーブルへ表示
function viewStorage() {
    const list = document.getElementById("list");
    
    // テーブル初期化
    while (list.rows[0]) list.deleteRow(0);
    
    const colorMap = {
        yellow: '#FFE135',
        pink: '#FF69B4',
        green: '#90EE90',
        blue: '#87CEEB',
        purple: '#DDA0DD'
    };
    
    // LocalStorageすべての情報の取得
    for (let i = 0; i < localStorage.length; i++) {
        let w_key = localStorage.key(i);
        const storedData = localStorage.getItem(w_key);
        
        let data;
        try {
            data = JSON.parse(storedData);
        } catch (e) {
            // Legacy format support
            data = {
                content: storedData,
                color: 'yellow'
            };
        }
        
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");
        
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        
        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = data.content;
        td4.innerHTML = `<span class='color-indicator' style='background-color: ${colorMap[data.color] || colorMap.yellow}'></span>`;
        td5.innerHTML = "<img src='../img/trash.png' class='trash' style='cursor:pointer; width:20px;'>";
    }
    
    // jQueryのplugin tablesorterを使ってテーブルのソート
    $("#table1").tablesorter({
        sortList: [[1, 0]]
    });
    $("#table1").trigger("update");
}

// 削除ボタンの処理
document.addEventListener('DOMContentLoaded', function() {
    const delBtn = document.getElementById("del");
    if (delBtn) {
        delBtn.addEventListener("click", function (e) {
            e.preventDefault();
            selectCheckBox("del");
        }, false);
    }
});
