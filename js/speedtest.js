const status = document.getElementById("status");
const icone = document.querySelector(".icone");
const hero = document.querySelector(".hero");
const image = "https://speedtest.lucasbrum.net/img/5mb.jpg";
const downloadSize = 4995374; //bytes
let speed = 0;

function convert(unit) {
    if (speed > 0) {
        let inkb, inmb, bytespeed = speed * 8;

        switch(unit) {
            case 'b':
                status.innerHTML = `${speed}bps`;
            break;
            case 'k':
                inkb = (speed / 1024).toFixed(2);
                status.innerHTML = `${inkb}Kbps`;
            break;
            case 'm':
                inkb = (speed / 1024).toFixed(2);
                inmb = (inkb / 1024).toFixed(2);
                status.innerHTML = `${inmb}Mbps`;
            break;
            case 'B':
                status.innerHTML = `${bytespeed}Bps`;
            break;
            case 'K':
                inkb = (bytespeed / 1024).toFixed(2);
                status.innerHTML = `${inkb}KBps`;
            break;
            case 'M':
                inkb = (bytespeed / 1024).toFixed(2);
                inmb = (inkb / 1024).toFixed(2);
                status.innerHTML = `${inmb}MBps`;
            break;
        }
    }
}

function theme(val) {
    switch(true) {
        case (val < 5000000):
            icone.src = 'img/emoji/pessima.svg';
            hero.classList.remove('is-info');
            hero.classList.add('is-danger');
        break;
        case (val < 10000000):
            icone.src = 'img/emoji/ruim.svg';
            hero.classList.remove('is-info');
            hero.classList.add('is-warning');
        break;
        case (val < 20000000):
            icone.src = 'img/emoji/boa.svg';
            hero.classList.remove('is-info');
            hero.classList.add('is-link');
        break;
        default:
            icone.src = 'img/emoji/otima.svg';
            hero.classList.remove('is-info');
            hero.classList.add('is-success');
    }
};

function inicia() {
    icone.src = 'img/emoji/pensativo.svg';
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
        theme(1);
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
        //status.innerHTML = `${mbps}Mbps<br />${kbps}KBps<br />${bps}Bps`;
        status.innerHTML = `${mbps}Mbps`;
        theme(bps);
        speed = (downloadSize / duration).toFixed(2);
    }
}
