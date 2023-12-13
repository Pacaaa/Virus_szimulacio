let korabbiKoordinatak = [];
let idozito;
let running;
let vilag = new Vilag("Fold");

leteszbtn.addEventListener("click", start);
startbtn.addEventListener("click", maszkalas);
virusbtn.addEventListener("click", virus_elszabadit);
stopbtn.addEventListener("click", () => {
    clearInterval(idozito);
    running = false;
});

function start() {
    let emberSzam = 10;
    if (emberekSzama.value != "" && emberekSzama.value < 4465 && emberekSzama.value > 0) {
        emberSzam = emberekSzama.value;
    } else {
        emberekSzama.value = emberSzam;
    }
    for (let i = 0; i < emberSzam; i++) {
        let randomX, randomY;
        do {
            randomX = generalSzamot(720);

            randomY = generalSzamot(620);
        } while (korabbiKoordinatak.find((e) => e.x == randomX && e.y == randomY));
        korabbiKoordinatak.push({ x: randomX, y: randomY });

        new Ember(i, "#2efc00", "#080808", false, 0, randomX, randomY, vilag);
    }
}

function generalSzamot(vege) {
    let elsoResz = Math.floor(Math.random() * vege);
    let vegsoResz = 5; // Az utolsó számjegy mindig 5

    let vegzodoSzam = elsoResz;

    vegzodoSzam += vegsoResz - (elsoResz % 10);

    return vegzodoSzam;
}

function iranySzam() {
    let random = Math.floor(Math.random() * 4) + 1;

    return random;
}
function maszkalas() {
    if (!running) {
        running = true;
        idozito = setInterval(() => {
            vilag.setalas(100);
            document.getElementById("statisztikaBetegek").innerHTML = vilag.betegei.length;
        }, 100);

    }
}

function virus_elszabadit() {
    if (vilag.emberei.length > 0) {
        let betegszam = 10;
        let beteghossz = 100;
        if (betegekSzama.value != "" && betegekSzama.value < vilag.emberei.length + 1 && betegekSzama.value > 0) {
            betegszam = betegekSzama.value;
        } else {
            betegekSzama.value = betegszam;
        }

        if (betegsegHossza.value != "") {
            beteghossz = betegsegHossza.value;
        } else {
            betegsegHossza.value = beteghossz;
        }

        vilag.virus_kezdet(betegszam, beteghossz);
    }
}
