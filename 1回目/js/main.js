let global_heroHp = 0;
let global_monsterHp = 0;
//利用頻度が高いためグローバル変数化
const hp = document.getElementById('HitPoint');
//バイキルトフラグ
let isOomph = false;
var msg_buff = '';

// ランダム関数でコンピュータが出すジャンケンの手を生成
function pc_hands(){
    const num = Math.ceil(Math.random() * 3);
    return num;
}

// ダメージを受けた際画像を点滅させる。
function imageBlinking(){
    setInterval(function(){
        $('.blink').fadeOut(1200, function(){$(this).fadeIn(200)});
    }, 1400);
}
    
// ジャンケンの結果を判定する関数
function judge(user_hand, pc_hand){
    let result = "";
    var music = new Audio();
    if(user_hand == pc_hand){
        //あいこの場合
        result = 1;
    }else if( ((user_hand == 1) && (pc_hand == 2)) ||
              ((user_hand == 2) && (pc_hand == 3)) ||
              ((user_hand == 3) && (pc_hand == 1)) ){
            //勝ちの場合
            result = 2;
    }else{
        // 負けの場合
        result = 3;
    }
    // resultに応じて処理を実行
    switch (result) {
        case 1: //勝ち
            if(isOomph == true){
                isOomph = false;
                music.src = "./bgm/heroAttack.mp3";
                music.play();
                message("モンスターに２のダメージ！！");
                $('.heroImg').addClass('blink');
                imageBlinking();
                $('.heroImg').removeClass('blink');
                global_monsterHp = global_monsterHp -2;
                message("バイキルトの効果が解けた！");
            }else{
                message("モンスターに１のダメージ！！");
                imageBlinking();
                global_monsterHp = global_monsterHp -1;
            }
            break;
        case 2: //あいこ
            music.src = "./bgm/miss.mp3";
            music.play();
            message("モンスターは攻撃をかわした！");
            if(isOomph == true){
                isOomph = false;
                message("バイキルトの効果が解けた！");
            }
            break;
        case 3: //負け
            music.src = "./bgm/monsterAttack.mp3";
            music.play();
            message("勇者は１のダメージ！！");
            $('.enemyImg').addClass('blink');
            imageBlinking();
            $('.enemyImg').removeClass('blink');
            global_heroHp = global_heroHp -1;
            hp.innerHTML = `HP:${global_heroHp}`;
            break;
        default:
            break;
    }    
    if( (global_monsterHp <= 0) ||
        (global_heroHp <= 0)){
        //戦闘終了のBGMを流す。
        music.src = "./bgm/battleOver.mp3";
        music.play();
        if(global_monsterHp <= 0){
            message("モンスターをやっつけた！！");
        }else{
            message("勇者は負けてしまった！！");
        }
        // GameOver画面をポップアップ
        
        $('#element_to_pop_up').bPopup();
        $("#element_to_pop_up").click(function() {
            $('.joke').fadeIn('slow');
        });
        $("#element_to_pop_up").click(function() {
            $('.joke_02').fadeIn('slow');
        });
    }
}

//メッセージを表示する関数
function message(msg)
{
    if (msg_buff == '') {
        msg_buff += msg + "\n";
        message_char();
    } else {
        msg_buff += msg + "\n";
    }

}
//表示した文字履歴を残しながら表示
function message_char()
{
    if (msg_buff == '') {
        //メッセージバッファに文字がなければ何もしない
        return;
    }
    //メッセージバッファの先頭1文字を取得
    var c = msg_buff.slice(0, 1)
    if (c == "\n") {
        c = '<br>';//改行の場合はタグへ変換
        var obj = document.getElementById('message_window');
        obj.scrollTop = obj.scrollHeight;
    }
    document.getElementById('message_window').innerHTML += c;
    //メッセージバッファから先頭1文字を削除
    msg_buff = msg_buff.slice(1);
    //
    setTimeout('message_char()', 30);
}

$('.command').click(function() {

    
    //クリックした要素からid名を取得
    let commandId = $(this).attr('id');
    let user_hand = 0;
    switch (commandId) {
        case "command1": 
            //グーは1とする。
            user_hand = 1;
            break;
        case "command2": 
            //チョキは2とする。
            user_hand = 2;
            break;
        case "command3": 
            //パーは3とする。
            user_hand = 3;
            break;
        case "command4": 
            //バイキルトフラグを立ててリターン
            isOomph = true;
            message("勇者はバイキルトを唱えた！！");
            return 1;
        default:
            break;
    }
    //コンピュータの手を乱数で取得
    let pc_hand = pc_hands();
    const result = judge(user_hand, pc_hand);
});

// ゲーム開始時に勇者のHPを設定
$('#HitPoint').ready(function(){
    //モンスターのHP(5～10)
    global_heroHp = Math.floor(Math.random() * 5) + 5;
    hp.innerHTML = `HP:${global_heroHp}`;
});

// ゲーム開始時にモンスターの画像、HPを設定
$('#enemyImg').ready(function(){
    //モンスターのHP(1～5)
    global_monsterHp = Math.floor(Math.random() * 1) + 4;

    //モンスターの画像をランダムに設定
    const enemyImage = document.getElementById('enemyImg');
    const imgs = ["img/monster_01.jpg", "img/monster_02.jpg", "img/monster_03.jpg"];
    const imgNo = Math.floor( Math.random() * imgs.length);
    enemyImage.src =imgs[imgNo];
    message("モンスターがあらわれた！！");
});

// 背景画像をランダムで設定
$('.main_wrapper').ready(function(){
    const bgimgs = ["dqwalk.jpg", "zwild_01.jpg", "zwild_02.jpg"];
    const imgNo = Math.floor( Math.random() * bgimgs.length);
    // background-imageのURLを更新
    $('body').css({
        backgroundImage: $('body').css('background-image').replace("dqwalk.jpg", bgimgs[imgNo])
    });
});
