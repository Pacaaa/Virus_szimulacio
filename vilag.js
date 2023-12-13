class Vilag {
    constructor(nev) {
        this.nev = nev;
        this.emberei = [];
        this.betegei = [];
        this.oltottak = [];
        this.atesettek = [];
    }
    setalas(hossz, atesetIdo, oltatlan, oltott, atesett) {
        this.betegseg_ido_csokkenes(atesetIdo);
        this.oltas_ido_csokkenes();
        this.atesett_ido_csokkenes();
        /*
        1:bal
        2:fel
        3:jobb
        4:le

        map:615x715
        */
        for (const Ember of this.emberei) {
            let irany = iranySzam();

            let x = parseInt(Ember.svgobject.getAttribute("cx"));
            let y = parseInt(Ember.svgobject.getAttribute("cy"));

            switch (irany) {
                case 1:
                    if (x - 10 > 0) {
                        Ember.svgobject.setAttribute("cx", x - 10);
                        Ember.beteggel_egyhelyen(hossz, oltatlan, oltott, atesett);
                    } else {
                        irany = iranySzam();
                    }
                    break;
                case 2:
                    if (y - 10 > 0) {
                        Ember.svgobject.setAttribute("cy", y - 10);
                        Ember.beteggel_egyhelyen(hossz, oltatlan, oltott, atesett);
                    } else {
                        irany = iranySzam();
                    }
                    break;
                case 3:
                    if (x + 10 < 716) {
                        Ember.svgobject.setAttribute("cx", x + 10);
                        Ember.beteggel_egyhelyen(hossz, oltatlan, oltott, atesett);
                    } else {
                        irany = iranySzam();
                    }
                    break;
                case 4:
                    if (y + 10 < 616) {
                        Ember.svgobject.setAttribute("cy", y + 10);
                        Ember.beteggel_egyhelyen(hossz, oltatlan, oltott, atesett);
                    } else {
                        irany = iranySzam();
                    }
                    break;
            }
        }
    }

    virus_kezdet(db, hossz) {
        let virusok = 0;
        let random;
        while (virusok < db) {
            random = Math.floor(Math.random() * this.emberei.length);

            if (!this.emberei[random].beteg && !this.emberei[random].oltott) {
                this.emberei[random].megbetegit(hossz);

                this.betegei.push(this.emberei[random]);
                virusok++;
            }
        }
    }
    oltas_kezdet(db, hossz) {
        let oltottak = 0;
        let random;
        while (oltottak < db) {
            random = Math.floor(Math.random() * this.emberei.length);

            if (!this.emberei[random].oltott && !this.emberei[random].beteg && !this.emberei[random].atesett) {
                this.emberei[random].oltas(hossz);

                this.oltottak.push(this.emberei[random]);
                oltottak++;
            }
        }
    }

    betegseg_ido_csokkenes(atesettIdo) {
        for (const Beteg of this.betegei) {
            Beteg.betegsegHossz--;
            if (Beteg.betegsegHossz == 0) {
                Beteg.beteg = false;
                Beteg.atesett = true;
                Beteg.atesetthossz = atesettIdo;
                Beteg.belszin = "#f4fc03";
                Beteg.svgobject.setAttribute("fill", "#f4fc03");
                this.atesettek.push(Beteg);
                this.betegei.splice(this.betegei.indexOf(Beteg), 1);
            }
        }
    }

    oltas_ido_csokkenes() {
        for (const Oltott of this.oltottak) {
            Oltott.oltashossz--;
            if (Oltott.oltashossz == 0) {
                Oltott.oltott = false;
                Oltott.belszin = "#2efc00";
                Oltott.svgobject.setAttribute("fill", "#2efc00");
                this.oltottak.splice(this.oltottak.indexOf(Oltott), 1);
            }
        }
    }
    atesett_ido_csokkenes() {
        for (const Atesett of this.atesettek) {
            Atesett.atesetthossz--;
            if (Atesett.atesetthossz == 0) {
                Atesett.atesett = false;
                Atesett.belszin = "#2efc00";
                Atesett.svgobject.setAttribute("fill", "#2efc00");
                this.atesettek.splice(this.atesettek.indexOf(Atesett), 1);
            }
        }
    }
}
