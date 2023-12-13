class Ember {
    constructor(id, belszin, kulszin, beteg, betegsegHossz, x, y, vilag) {
        this.id = id;
        this.belszin = belszin;
        this.kulszin = kulszin;
        this.beteg = beteg;
        this.betegsegHossz = betegsegHossz;
        this.kezdopozicio = [x, y];

        this.vilag = vilag;
        vilag.emberei.push(this);
        this.svgobject = this.svg_ember_letrehozasa();
        this.general();
    }

    svg_ember_letrehozasa() {
        let svgo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        svgo.setAttribute("r", 5);
        svgo.setAttribute("stroke", "#080808");
        svgo.setAttribute("stroke-width", "1");
        svgo.setAttribute("fill", "#2efc00");
        svgo.setAttribute("cx", this.kezdopozicio[0]);
        svgo.setAttribute("cy", this.kezdopozicio[1]);

        return svgo;
    }
    general() {
        vaszon.appendChild(this.svgobject);
    }
    megbetegit(hossz) {
        this.beteg = true;
        this.betegsegHossz = hossz;
        this.belszin = "#ff0505";
        this.svgobject.setAttribute("fill", "#ff0505");
    }
    beteggel_egyhelyen(hossz) {
        let EmberX = this.svgobject.getAttribute("cx");
        let EmberY = this.svgobject.getAttribute("cy");
        for (const Beteg of this.vilag.betegei) {
            let BetegX = Beteg.svgobject.getAttribute("cx");
            let BetegY = Beteg.svgobject.getAttribute("cy");
            if (EmberX == BetegX && EmberY == BetegY && !this.beteg) {
                this.megbetegit(hossz);
                this.vilag.betegei.push(this);
            }
        }
    }
}
