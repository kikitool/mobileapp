"use strict";

// ページ本体が読み込まれたタイミングで実行するコード
window.addEventListener("DOMContentLoaded",
    function () {

        //1.LocalStorageが使えるか確認
        if (typeof localStorage === "undefined") {
            window.alert("このブラウザはLocal Storage機能が実装されていません");
            return;
        } else {
            viewStorage();   //localStorageからのデータ取得とテーブルへ表示
            saveLocalStorage();  //2.localStorageへの保存
            delLocalStorage();  //3.localStorageから1件削除
            allClearLocalStorage(); //localStorageから全て削除
            selectTable();  //5.データ選択
        }
    }, false
);

//2.localStorageへの保存
function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click",
        function (e) {
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;

            //値の入力チェック
            if (key == "" || value == "") {
                Swal.fire({
                    title: "Memo app"
                    , html: "Key,Memoはいずれも必要です。"
                    , type: "error"
                    , allowOutsideClick: false
                });
                return;
            } else {
                let w_msg = "LocalStorageに\n「" + key + " " + value + "」\nを保存しますか？";
                Swal.fire({
                    title: "Memo app"
                    , html: w_msg
                    , type: "question"
                    , showCancelButton: true
                }).then(function (result) {
                    //確認ダイアログで「OK」を押されたとき、保存する
                    if (result.value === true) {
                        localStorage.setItem(key, value);
                        viewStorage();
                        let w_msg = "LocalStorageに" + key + " " + value + "を保存しました。";
                        Swal.fire({
                            title: "Memo app"
                            , html: w_msg
                            , type: "success"
                            , allowOutsideClick: false
                        });
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                });

            }
        }, false
    );
};

//3.localStorageから選択されている行を削除
function delLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click",
        function (e) {
            e.preventDefault();
            const chkbox1 = document.getElementsByName("chkbox1");
            const table1 = document.getElementById("table1")
            let w_cnt = 0;  //選択されているチェックボックスの数が返却される
            w_cnt = selectCheckBox("del"); //テーブルからデータ選択  

            if (w_cnt >= 1) {
                let w_msg = "LocalStorageから選択されている" + w_cnt + "件を削除しますか？";
                Swal.fire({
                    title: "Memo app"
                    , html: w_msg
                    , type: "question"
                    , showCancelButton: true
                }).then(function (result) {
                    //確認ダイアログで「OK」を押されたとき、削除する
                    if (result.value) {
                        for (let i = 0; i < chkbox1.length; i++) {
                            if (chkbox1[i].checked) {
                                localStorage.removeItem(table1.rows[i + 1].cells[1].firstChild.data);
                            }
                        }
                        viewStorage();  //localStorageからのデータ取得とテーブルへ表示
                        let w_msg = "LocalStorageから" + w_cnt + "件を削除しました。";
                        Swal.fire({
                            title: "Memo app"
                            , html: w_msg
                            , type: "success"
                            , allowOutsideClick: false
                        });
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                });
            }
        }, false
    );

    //クラス「.trash」を持つ(将来の)子のいずれかでクリックイベントが発生すると、
    //そのクリックイベントは親にバブルアップする。
    //親はそのセレクター（'.trash'）に一致する子からイベントが発生したかどうかを確認し、一致した場合、子に直接バインドされているかのように子に対してイベント
    const table1 = document.getElementById("table1");
    table1.addEventListener("click", (e) => {
        if (e.target.classList.contains("trash") === true) {
            let index = e.target.parentNode.parentNode.rowIndex;
            const key = table1.rows[index].cells[1].firstChild.data;
            const value = table1.rows[index].cells[2].firstChild.data;
            let w_delete = `LocalStorageから\n 「${key} ${value}」 \nを削除しますか?`;
            Swal.fire({
                title: "Memo app"
                , html: w_delete
                , type: "question"
                , showCancelButton: true
            }).then(result => {
                if (result.value === true) {
                    localStorage.removeItem(key);
                    viewStorage();
                    let w_msg = `LocalStorageから${key} ${value}を削除しました！`;
                    Swal.fire({
                        title: "Memo app"
                        , html: w_msg
                        , type: "success"
                        , allowOutsideClick: false
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            })
        }
    });
};

//4.localStorageから全て削除
function allClearLocalStorage() {
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_msg = "LocalStorageのデータを全て削除します。\nよろしいでしょうか?";
            Swal.fire({
                title: "Memo app"
                , html: w_msg
                , type: "question"
                , showCancelButton: true  // キャンセルボタンの表示
            }).then(function (result) {
                //確認ダイアログで「OK」を押されたとき、全て削除する
                if (result.value) {
                    localStorage.clear();
                    viewStorage(); //localStorageからのデータ取得とテーブルへ表示
                    let w_msg = "LocalStorageのデータを全て削除しました。";
                    Swal.fire({
                        title: "Memo app"
                        , html: w_msg
                        , type: "success"
                        , allowOutsideClick: false
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });
        }, false
    );
};

//5.データ選択
function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click",
        function (e) {
            e.preventDefault();
            selectCheckBox("select"); //テーブルからデータ選択 
        }, false
    );
};

//テーブルからデータ選択
function selectCheckBox(mode) {
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let w_cnt = 0;    //選択されているチェックボックスの数
    let w_textKey = "";
    let w_textMemo = "";

    for (let i = 0; i < chkbox1.length; i++) {
        if (chkbox1[i].checked) {
            if (w_cnt === 0) {
                w_textKey = table1.rows[i + 1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i + 1].cells[2].firstChild.data;
            }
            w_cnt++;
        }
    }
    document.getElementById("textKey").value = w_textKey;
    document.getElementById("textMemo").value = w_textMemo;

    if (mode === "select") {
        if (w_cnt === 1) {
            return w_cnt;
        } else {
            Swal.fire({
                title: "Memo app"
                , html: "1つ選択してください。"
                , type: "error"
                , allowOutsideClick: false
            });
        }
    }

    if (mode === "del") {
        if (w_cnt >= 1) {
            return w_cnt;
        } else {
            Swal.fire({
                title: "Memo app"  //タイトルをここに設定
                , html: "1つ以上選択してください。"  //メッセージ内容をここに設定
                , type: "error"  //ダイアログにアイコンを表示したい場合に設定する引数 warning,error,success,info,question
                , allowOutsideClick: false  //枠外クリックは許可しない
            });
        }
    }

};



//localStorageからのデータの取得とテーブルへ表示
function viewStorage() {
    const list = document.getElementById("list");
    //htmlのテーブル初期化
    while (list.rows[0]) list.deleteRow(0);
    //localStorageすべての情報の取得
    for (let i = 0; i < localStorage.length; i++) {
        let w_key = localStorage.key(i);
        //localStorageのキーと値を表示
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        td1.innerHTML = "<input name = 'chkbox1' type = 'checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
        td4.innerHTML = "<img src='img/trash_icon.png' class='trash'>";
    }

    //jQueryのplugin tablesorterを使ってテーブルのソート
    //sortList: 引数１．．．最初からソートしておく列を指定、引数２．．．０…昇順，１…降順
    $("#table1").tablesorter({       //tablesort add
        sortList: [[1, 0]]           //tablesort add
    });                              //tablesort add

    $("#table1").trigger("update");  //tablesort add
};
