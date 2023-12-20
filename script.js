let korabbiKoordinatak = [];
let idozito;
let running;
let vilag = new Vilag("Fold");

leteszbtn.addEventListener("click", start);
startbtn.addEventListener("click", maszkalas);
virusbtn.addEventListener("click", virus_elszabadit);
oltasbtn.addEventListener("click", oltas);
kihalbtn.addEventListener("click", kihal);
egyensulybtn.addEventListener("click", egyensuly);
nyerbtn.addEventListener("click", nyer);
stopbtn.addEventListener("click", () => {
    clearInterval(idozito);
    running = false;
});
function nyer() {
    emberekSzama.value = 500;
    betegekSzama.value = 100;
    betegsegHossza.value = 200;
    oltottakSzama.value = 10;
    oltottakHossz.value = 500;
    atesettHossz.value = 400;
    oltottFertozodes.value = 0.2;
    oltatlanFertozodes.value = 0.9;
    atesettFertozodes.value = 0.7;
}
function kihal() {
    emberekSzama.value = 200;
    betegekSzama.value = 20;
    betegsegHossza.value = 80;
    oltottakSzama.value = 50;
    oltottakHossz.value = 500;
    atesettHossz.value = 300;
    oltottFertozodes.value = 0.2;
    oltatlanFertozodes.value = 0.5;
    atesettFertozodes.value = 0.3;
}
function egyensuly() {
    emberekSzama.value = 200;
    betegekSzama.value = 30;
    betegsegHossza.value = 100;
    oltottakSzama.value = 40;
    oltottakHossz.value = 150;
    atesettHossz.value = 125;
    oltottFertozodes.value = 0.2;
    oltatlanFertozodes.value = 0.5;
    atesettFertozodes.value = 0.3;
}
function oltas() {
    if (vilag.emberei.length > 0) {
        let oltottSzam = 10;
        let oltasIdo = 300;

        if (oltottakSzama.value != "" && oltottakSzama.value > 0) oltottSzam = oltottakSzama.value;
        else oltottakSzama.value = oltottSzam;

        if (oltottakHossz.value != "") oltasIdo = oltottakHossz.value;
        else oltottakHossz.value = oltasIdo;
        if (vilag.emberei.length - vilag.betegei.length - vilag.oltottak.length - vilag.atesettek.length >= oltottSzam)
            vilag.oltas_kezdet(oltottSzam, oltasIdo);
        else alert("Már nincs elég egészséges ember a világon!");
    }
}

function start() {
    let emberSzam = 10;
    if (emberekSzama.value != "" && emberekSzama.value < 4465 && emberekSzama.value > 0) emberSzam = emberekSzama.value;
    else emberekSzama.value = emberSzam;

    if (parseInt(emberekSzama.value) + parseInt(vilag.emberei.length) < 4465) {
        for (let i = 0; i < emberSzam; i++) {
            let randomX, randomY;
            do {
                randomX = generalSzamot(720);

                randomY = generalSzamot(620);
            } while (korabbiKoordinatak.find((e) => e.x == randomX && e.y == randomY));
            korabbiKoordinatak.push({ x: randomX, y: randomY });

            new Ember(i, "#2efc00", "#080808", false, 0, false, 0, false, 0, randomX, randomY, vilag);
        }
    } else alert("Nem lehet több ember a világon!");
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
    let count = 0;
    let oltott = 0.2;
    let oltatlan = 0.5;
    let atesetIdo = 150;
    let beteghossz = 100;
    let atesett = 0.3;

    if (!running && vilag.emberei.length > 0) {
        if (oltottFertozodes.value != "") oltott = oltottFertozodes.value;
        else oltottFertozodes.value = oltott;

        if (oltatlanFertozodes.value != "") oltatlan = oltatlanFertozodes.value;
        else oltatlanFertozodes.value = oltatlan;

        if (atesettHossz.value != "") atesetIdo = atesettHossz.value;
        else atesettHossz.value = atesetIdo;

        if (betegsegHossza.value != "") beteghossz = betegsegHossza.value;
        else betegsegHossza.value = beteghossz;

        if (atesettFertozodes.value != "") atesett = atesettFertozodes.value;
        else atesettFertozodes.value = atesett;

        running = true;

        idozito = setInterval(() => {
            count++;
            vilag.setalas(beteghossz, atesetIdo, oltatlan, oltott, atesett);
            statisztikaNap.innerHTML = count;
            statisztikaEmberek.innerHTML = vilag.emberei.length;
            statisztikaBetegek.innerHTML = vilag.betegei.length;
            statisztikaOltottak.innerHTML = vilag.oltottak.length;
            statisztikaAtesett.innerHTML = vilag.atesettek.length;
        }, 100);
    }
}

function virus_elszabadit() {
    if (vilag.emberei.length > 0) {
        let betegszam = 10;
        let beteghossz = 100;

        if (betegekSzama.value != "" && betegekSzama.value > 0) betegszam = betegekSzama.value;
        else betegekSzama.value = betegszam;

        if (betegsegHossza.value != "") beteghossz = betegsegHossza.value;
        else betegsegHossza.value = beteghossz;

        if (vilag.emberei.length - vilag.betegei.length - vilag.oltottak.length - vilag.atesettek.length >= betegszam)
            vilag.virus_kezdet(betegszam, beteghossz);
        else alert("Már nincs elég egészséges ember a világon!");
    }
}
