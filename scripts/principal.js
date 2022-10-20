var imagens = ["img/banner1.png", "img/banner2.png", "img/banner3.png", "img/banner4.png"];
var imagematual = 0;

function trocaimagem() {
    imagematual = (imagematual + 1) % 4;
    document.querySelector('.bannermov img'). src = imagens[imagematual];
}
setInterval(trocaimagem, 1500);