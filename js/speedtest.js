const status = document.getElementById("status");
const icone = document.querySelector(".icone");
const image = "https://speedtest.lucasbrum.net/img/5mb.jpg";
const downloadSize = 4995374; //bytes

function icon(val) {
    switch(true) {
        case (val < 1000):
            icone.src = 'img/emoji/pessima.svg';
        break;
        case (val < 2000):
            icone.src = 'img/emoji/ruim.svg';
        break;
        case (val < 3000):
            icone.src = 'img/emoji/boa.svg';
        break;
        default:
            icone.src = 'img/emoji/otima.svg';
    }
};

function inicia() {
    status.innerHTML = "Carregando, aguarde por favor...";
    window.setTimeout(MeasureConnectionSpeed, 1);
};

if (window.addEventListener) {
    window.addEventListener('load', inicia, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', inicia);
}

function MeasureConnectionSpeed() {
    let startTime, endTime;
    let download = new Image();
    download.onload = function () {
        endTime = (new Date()).getTime();
        showResults();
    }

    download.onerror = function (err, msg) {
        status.innerHTML = "Imagem inválida ou erro no download";
    }

    startTime = (new Date()).getTime();
    let cacheBuster = "?v=" + startTime;
    download.src = image + cacheBuster;

    function showResults() {
        let duration = (endTime - startTime) / 1000;
        let bitsLoaded = downloadSize * 8;
        let bps = (bitsLoaded / duration).toFixed(2);
        let kbps = (bps / 1024).toFixed(2);
        let mbps = (kbps / 1024).toFixed(2);
        status.innerHTML = `Sua velocidade: ${mbps}Mbps`;
        icon(bps);
    }
}
