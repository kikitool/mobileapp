"use strict";

// flagがpen-flagのときpenguinsのターン、bear-flagのときbearのターン
let flag = "pen-flag";

//ターン数カウンター
let counter = 9;

//class="square"を取得
const squares = document.getElementsByClassName("square");

//Arrayに変換
const squaresArray = Array.from(squares);

//squaresの要素を取得
const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

//class="level"を取得
const levels = document.querySelectorAll(".level");

//levelの要素を取得 レベル設定エリア
const level_1 = document.getElementById("level_1");
const level_2 = document.getElementById("level_2");
const level_3 = document.getElementById("level_3");

//levelBoxをグローバルに取得
const levelBox = document.getElementById("levelBox");

//NewGameボタン取得
const newgamebtn_display = document.getElementById("newgame-btn");
const newgamebtn = document.getElementById("btn90");

//Win or Lose judgment Line
const line1 = JudgLine(squaresArray, ["a_1", "a_2", "a_3"]);
const line2 = JudgLine(squaresArray, ["b_1", "b_2", "b_3"]);
const line3 = JudgLine(squaresArray, ["c_1", "c_2", "c_3"]);
const line4 = JudgLine(squaresArray, ["a_1", "b_1", "c_1"]);
const line5 = JudgLine(squaresArray, ["a_2", "b_2", "c_2"]);
const line6 = JudgLine(squaresArray, ["a_3", "b_3", "c_3"]);
const line7 = JudgLine(squaresArray, ["a_1", "b_2", "c_3"]);
const line8 = JudgLine(squaresArray, ["a_3", "b_2", "c_1"]);

const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];

const lineRandom = cornerLine(squaresArray, ["a_1", "a_3", "c_1", "c_3"]);

let winningLine = null;

// メッセージ
const msgtext1 = '<p class="image"><img src = "img/penguins.jpg" width=61px height=61px></p><p class="text">Penguins Attack! (your turn) </p>';
const msgtext2 = '<p class="image"><img src = "img/whitebear.jpg" width=61px height=61px></p><p class="text">WhiteBear Attack! (computer turn) </p>';
const msgtext3 = '<p class="image"><img src = "img/penguins.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInRight">Penginus Win!!</p>';
const msgtext4 = '<p class="image"><img src = "img/whitebear.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInLeft">WhiteBear Win!!</p>';
const msgtext5 = '<p class="image"><img src = "img/penguins.jpg" width=61px height=61px> <img src = "img/whitebear.jpg" width=61px height=61px</p><p class="text animate__bounceIn">Draw!!</p>';

//サウンド
let gameSound = ["sound/click_sound1.mp3", "sound/click_sound2.mp3", "sound/penwin_sound.mp3", "sound/bearwin_sound.mp3", "sound/draw_sound.mp3"];

//ページ本体が読み込まれたタイミングで実行するコード
window.addEventListener("DOMContentLoaded",
    function () {
        //メッセージ（最初はpenguinsのターンから）
        setMessage("pen-turn");

        // squareがクリック可能かを判断するクラスを追加
        squaresArray.forEach(function (square) {
            square.classList.add("js-clickable");
        });

        LevelSetting(0); //levelの要素を取得 レベル１設定
    }, false
);

//レベル設定
let index; //クリックした要素のインデックスを格納する変数
levels.forEach((level) => {
    level.addEventListener("click", () => {
        index = [].slice.call(levels).indexOf(level);
        LevelSetting(index);
    });
});

function LevelSetting(index) {
    //レベル設定ボタン スタイルクリア
    level_1.classList.remove("level-selected");
    level_2.classList.remove("level-selected");
    level_3.classList.remove("level-selected");
    level_1.classList.remove("level-non-selected");
    level_2.classList.remove("level-non-selected");
    level_3.classList.remove("level-non-selected");

    //セッションストレージにkey="tic_tac_toe_access"がある場合は初回ではない
    if (sessionStorage.getItem("tic_tac_toe_access")) {
        switch (index) {
            case 0:
                sessionStorage.setItem("tic_tac_toe_access", "1");
                level_1.classList.add("level-selected");
                level_2.classList.add("level-non-selected");
                level_3.classList.add("level-non-selected");
                break;
            case 1:
                sessionStorage.setItem("tic_tac_toe_access", "2");
                level_1.classList.add("level-non-selected");
                level_2.classList.add("level-selected");
                level_3.classList.add("level-non-selected");
                break;
            case 2:
                sessionStorage.setItem("tic_tac_toe_access", "3");
                level_1.classList.add("level-non-selected");
                level_2.classList.add("level-non-selected");
                level_3.classList.add("level-selected");
                break;
            default:
                level_1.classList.add("level-selected");
                level_2.classList.add("level-non-selected");
                level_3.classList.add("level-non-selected");
                break;
        }
    } else {
        //セッションストレージにkey="tic_tac_toe_access"がない場合は初回実行
        sessionStorage.setItem("tic_tac_toe_access", "1");
        level_1.classList.add("level-selected");
        level_2.classList.add("level-non-selected");
        level_3.classList.add("level-non-selected");
    }
}

//Win or Lose Judgment Lineを配列化
function JudgLine(targetArray, idArray) {
    return targetArray.filter(function (e) {
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
    });
}

//corner Lineを配列化
function cornerLine(targetArray, idArray) {
    return targetArray.filter(function (e) {
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2] || e.id === idArray[3]);
    });
}

//squareをクリックしたときにイベント発火
squaresArray.forEach(function (square) {
    square.addEventListener('click', () => {
        if (counter === 9) {
            levelBox.classList.add("js-unclickable"); //ゲーム途中でlevelBoxをクリックできないようにする
        }
        let gameOverFlg = isSelect(square);  //gameStatusを返却

        //GameOverではない場合、クマのターン(auto)
        if (gameOverFlg === "0") {
            const squaresBox = document.getElementById("squaresBox");
            squaresBox.classList.add("js-unclickable"); //squares-boxをクリックできないようにする
            setTimeout(
                function () {
                    bearTurn();
                },
                2000
            );
        }
    });
});

//クリックしたsquareにはpenguinsかbearを表示
function isSelect(selectSquare) {
    let gameOverFlg = "0";
    if (flag === "pen-flag") {
        //クリックサウンド
        let music = new Audio(gameSound[0]);
        music.currentTime = 0;
        music.play();  //再生

        selectSquare.classList.add("js-pen-checked");  //squareにはpenguinsを表示
        selectSquare.classList.add("js-unclickable");  //suqareをクリックできないようにする
        selectSquare.classList.remove("js-clickable");  //squareがクリック可能かを判断するクラスを削除
        // penguins win
        if (isWinner("penguins")) {
            setMessage("pen-win");
            gameOver("penguins");
            return gameOverFlg = "1";
        }
        setMessage("bear-turn");
        flag = "bear-flag";
    } else {
        //クリックサウンド
        let music = new Audio(gameSound[1]);
        music.currentTime = 0;
        music.play();  //再生

        selectSquare.classList.add("js-bear-checked");
        selectSquare.classList.add("js-unclickable");
        selectSquare.classList.remove("js-clickable");  //squareがクリック可能かを判断するクラスを削除
        // white-bear win
        if (isWinner("bear")) {
            setMessage("bear-win");
            gameOver("bear");
            return gameOverFlg = "1";
        }
        setMessage("pen-turn");
        flag = "pen-flag";
    }

    //ターン数カウンターを-1する
    counter--;
    //ターン数＝０になったらDRAW
    if (counter === 0) {
        setMessage("draw");
        gameOver("draw");
        return gameOverFlg = "1";
    }

    return gameOverFlg = "0";
}

//勝敗判定
function isWinner(symbol) {
    //some:1つでも条件を満たしていればTrueを返す
    const result = lineArray.some(function (line) {
        // every:全て条件を満たしていればTrueを返す
        const subResult = line.every(function (square) {
            if (symbol === "penguins") {
                return square.classList.contains("js-pen-checked");
            }
            if (symbol === "bear") {
                return square.classList.contains("js-bear-checked");
            }
        });
        //trueを返したlineをwinningLineに代入
        if (subResult) { winningLine = line }

        return subResult;
    });
    return result;
}

//メッセージ切り替え関数
function setMessage(id) {
    switch (id) {
        case "pen-turn":
            document.getElementById("msgtext").innerHTML = msgtext1;
            break;
        case "bear-turn":
            document.getElementById("msgtext").innerHTML = msgtext2;
            break;
        case "pen-win":
            document.getElementById("msgtext").innerHTML = msgtext3;
            break;
        case "bear-win":
            document.getElementById("msgtext").innerHTML = msgtext4;
            break;
        case "draw":
            document.getElementById("msgtext").innerHTML = msgtext5;
            break;
        default:
            document.getElementById("msgtext").innerHTML = msgtext1;
    }
}

//ゲーム終了時の処理
function gameOver(status) {
    //GameOverサウンド
    let w_sound;
    switch (status) {
        case "penguins":
            w_sound = gameSound[2];
            break;
        case "bear":
            w_sound = gameSound[3];
            break;
        case "draw":
            w_sound = gameSound[4];
            break;
    }

    let music = new Audio(w_sound);
    music.currentTime = 0;
    music.play();  //再生

    const squaresBox = document.getElementById("squaresBox");
    squaresBox.classList.add("js-unclickable");  //squares-boxをクリックできないようにする

    //display New Game button:display
    newgamebtn_display.classList.remove("js-hidden");

    //winEffect
    if (status === "penguins") {
        //winner-line penguins high-light
        if (winningLine) {
            winningLine.forEach(function (square) {
                square.classList.add("js-pen_highLight");
            });
        }
        //penguins win!! ==> snow color is pink
        $(document).snowfall({
            flakeColor: "rgb(255, 240, 245)",
            maxSpeed: 3,
            minSpeed: 1,
            maxSize: 20,
            minSize: 10,
            round: true
        });
    } else if (status === "bear") {
        //winner-linr bear high-light
        if (winningLine) {
            winningLine.forEach(function (square) {
                square.classList.add("js-bear_highLight");
            });
        }
        //whitebear win!! ==> snow color is blue
        $(document).snowfall({
            flakeColor: "rgb(175, 238, 238)",
            maxSpeed: 3,
            minSpeed: 1,
            maxSize: 20,
            minSize: 10,
            round: true
        });
    }
}

//NewGameボタン クリック時、ゲーム初期化
newgamebtn.addEventListener("click", function () {
    //penguinsのボタン
    flag = "pen-flag";
    //ターン数カウンター
    counter = 9;
    winningLine = null;
    squaresArray.forEach(function (square) {
        square.classList.remove("js-pen-checked");
        square.classList.remove("js-bear-checked");
        square.classList.remove("js-unclickable");
        square.classList.remove("js-pen_highLight");
        square.classList.remove("js-bear_highLight");
        square.classList.add("js-clickable");  //squareがクリック可能かを判断するクラスを追加
    });

    const squaresBox = document.getElementById("squaresBox");
    squaresBox.classList.remove("js-unclickable");  //squares-boxをクリックできるようにする
    levelBox.classList.remove("js-unclickable"); //levelBoxをクリックできるようにする

    setMessage("pen-turn");
    newgamebtn_display.classList.add("js-hidden");

    //snowfall stop
    $(document).snowfall("clear");
});

//クマのターン
function bearTurn() {
    //levelを取得
    let level = sessionStorage.getItem("tic_tac_toe_access");

    let bearTurnEnd = "0";
    let gameOverFlg = "0";

    while (bearTurnEnd === "0") {

        if (level === "1" || level === "2" || level === "3") {
            //クマのリーチ行検索(attack)
            bearTurnEnd = isReach("bear");
            if (bearTurnEnd === "1") { //クマのリーチ行あり...この一手で終わり
                // gameOverFlg = "1"; // isSelect内で判定されるため不要
                break; //whileを終了
            }
        }

        if (level === "2" || level === "3") {
            //ペンギンのリーチ行検索(defence)
            bearTurnEnd = isReach("penguins");
            if (bearTurnEnd === "1") {
                break; //whileを終了
            }
        }

        if (level === "2" || level === "3") {
            //真ん中のマス目b_2が空いていたら選ぶ
            if (b_2.classList.contains("js-clickable")) {
                gameOverFlg = isSelect(b_2);
                bearTurnEnd = "1"; //クマのターン終了
                break; //whileを終了
            }
        }

        if (level === "3") {
            //角のマス目a_1,a_3,c_1,c_3が空いていたら選ぶ
            for (let square of lineRandom) {
                if (square.classList.contains("js-clickable")) {
                    gameOverFlg = isSelect(square);
                    bearTurnEnd = "1"; //クマのターン終了
                    break; //forループを終了
                }
            }
            if (bearTurnEnd === "1") break; //whileを終了
        }

        // ループを抜ける
        break;
    }

    //まだマス目を選んでいない場合　クリックできるマス目をランダムに選ぶ
    if (bearTurnEnd === "0") {
        const bearSquare = squaresArray.filter(function (square) {
            return square.classList.contains("js-clickable");
        });

        if (bearSquare.length > 0) {
            let n = Math.floor(Math.random() * bearSquare.length);
            gameOverFlg = isSelect(bearSquare[n]);
        }
    }

    //GameOverではない場合
    if (gameOverFlg === "0") {
        const squaresBox = document.getElementById("squaresBox");
        squaresBox.classList.remove("js-unclickable");  //squares-boxをクリックできるようにする
    }
}

//リーチ行を探す
function isReach(status) {
    let bearTurnEnd = "0"; //クマのターン "1":終了

    lineArray.some(function (line) {
        let bearCheckCnt = 0; //クマがチェックされている数
        let penCheckCnt = 0; //ペンギンがチェックされている数

        line.forEach(function (square) {
            if (square.classList.contains("js-bear-checked")) {
                bearCheckCnt++; //クマがチェックされている数
            }
            if (square.classList.contains("js-pen-checked")) {
                penCheckCnt++; //ペンギンがチェックされている数
            }
        });

        //クマのリーチ行検索時に、クマのリーチ行あり
        if (status === "bear" && bearCheckCnt === 2 && penCheckCnt === 0) {
            bearTurnEnd = "1"; //クマのリーチ行あり
        }

        //ペンギンのリーチ行検索時に、ペンギンのリーチ行あり
        if (status === "penguins" && bearCheckCnt === 0 && penCheckCnt === 2) {
            bearTurnEnd = "1"; //クマのリーチ行あり
        }

        //クマかペンギンのリーチ行ありの場合、空いているマス目を選択する
        if (bearTurnEnd === "1") {
            line.some(function (square) {
                if (square.classList.contains("js-clickable")) {
                    isSelect(square);
                    return true; //line.someのloopをぬける
                }
            })
            return true; //lineArray.someのloopをぬける
        }
    })

    return bearTurnEnd;
}