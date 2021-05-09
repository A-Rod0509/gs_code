// jsを記述する際はここに記載していく

//アニメーションによるスクロールでのフワッと表示
const targetElement = document.querySelectorAll(".animationTarget");
//スクロール時の位置情報の取得、showクラスの付加
document.addEventListener("scroll", function(){
    for(let i = 0; i < targetElement.length; i++) {
        // アニメーション表示閾値の設定
        const getElementDistance = (targetElement[i].getBoundingClientRect().top) + (targetElement[i].clientHeight * 0.3);
        // 現在の位置がアニメーション表示閾値を超えた場合、showクラスを追加
        if(window.innerHeight > getElementDistance) {
            targetElement[i].classList.add("animationShow");
        }
    }
});

$(function(){
    $(".main_wrapper").fadeIn(1000); //上から降ってくる感じ


    /* 画像のスクロール
    $('.index_btn').click(function(){
        $('.active').removeClass('active');
        var clickedIndex = $('.index_btn').index($(this));
        $('.about_slide').eq(clickedIndex).addClass('active');
    });
    */
    // About画像のスライドショー
    $('.about_slides').slick({
      autoplay: true,
      autoplaySpeed: 3000,
      dots: true,
      centerMode: true,
      variableWidth: true,
    }); 

    // ヘッダーメニューのスクロール
    $('header a').click(function(){
      var id = $(this).attr("href");
      // 固定ヘッダー分位置調整
      var headerheight = 100;
      var position = $(id).offset().top - headerheight;
      $('html,body').animate({
        'scrollTop':position
      }, 500);
    });

    // Submitボタンのアニメーション対応
    $('.button').hover(function(){
        $(this).addClass("hover");
    },
    function() {
        $(this).removeClass("hover");
    });
    $(".button").on("click", function() {
        $(this).addClass("active");
    });

    // Submitボタンのアニメーション対応
    $('.button_more').hover(function(){
        $(this).addClass("hover");
    },
    function() {
        $(this).removeClass("hover");
    });
    $(".button_more").on("click", function() {
        $(this).addClass("active");
    });
    
});

// 卒業生の操縦
function walkLeft(){
    $(".ryu").addClass('walk').css({ marginLeft:'-=7px' });
    console.log("左に移動します")
}
function walkRight(){
    $(".ryu").addClass('walk').css({ marginLeft:'+=7px' });
    console.log("右に移動します")
}
function jump(){
    $(".ryu").addClass('jump');
    setTimeout(function() { $(".ryu").addClass('down'); }, 500); 
    setTimeout(function() { $(".ryu").removeClass('jump down'); }, 1000);
    console.log("ジャンプします") 
}

$(document).on('keydown keyup', function(e) {        
    if (e.type == 'keydown') { 
        //左に移動
        if (e.keyCode == 37) {
            console.log("左矢印が押されました"); 
            walkLeft(); 
        }
        //右に移動
        if (e.keyCode == 39) {
            console.log("右矢印が押されました"); 
            walkRight(); 
        }
        //ジャンプ
        if (e.keyCode == 38) {
            console.log("ジャンプボタンが押されました");
            jump(); 
        }
    }else { // keyup
        $("ryu").removeClass('walk kneel');
    }
});