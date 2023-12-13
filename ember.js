class Ember {
    constructor(id, belszin, kulszin, beteg, oltott, oltashossz, betegsegHossz, atesett, atesetthossz, x, y, vilag) {
        this.id = id;
        this.belszin = belszin;
        this.kulszin = kulszin;
        this.beteg = beteg;
        this.betegsegHossz = betegsegHossz;
        this.oltott = oltott;
        this.oltashossz = oltashossz;
        this.atesett = atesett;
        this.atesetthossz = atesetthossz;
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
        this.atesett = false;
        this.atesetthossz = 0;
        this.oltott = false;
        this.oltashossz = 0;
        this.betegsegHossz = hossz;
        this.belszin = "#ff0505";
        this.svgobject.setAttribute("fill", "#ff0505");
    }
    oltas(hossz) {
        this.oltott = true;
        this.oltashossz = hossz;
        this.belszin = "#031cfc";
        this.svgobject.setAttribute("fill", "#031cfc");
    }
    beteggel_egyhelyen(hossz, oltatlan, oltott, atesett) {
        let EmberX = this.svgobject.getAttribute("cx");
        let EmberY = this.svgobject.getAttribute("cy");
        for (const Beteg of this.vilag.betegei) {
            let BetegX = Beteg.svgobject.getAttribute("cx");
            let BetegY = Beteg.svgobject.getAttribute("cy");
            if (EmberX == BetegX && EmberY == BetegY && !this.beteg) {
                if (this.oltott && Math.random() < oltott) {
                    this.megbetegit(hossz);
                    this.vilag.oltottak.splice(this.vilag.oltottak.indexOf(this), 1);
                    this.vilag.betegei.push(this);
                } else if (!this.oltott && Math.random() < oltatlan) {
                    this.megbetegit(hossz);
                    this.vilag.betegei.push(this);
                } else if (this.atesett && Math.random() < atesett) {
                    this.megbetegit(hossz);
                    this.vilag.atesettek.splice(this.vilag.atesettek.indexOf(this), 1);
                    this.vilag.betegei.push(this);
                }
            }
        }
    }
}
