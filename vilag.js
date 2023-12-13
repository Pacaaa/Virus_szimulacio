class Vilag {
    constructor(nev) {
        this.nev = nev;
        this.emberei = [];
        this.betegei = [];
    }
    setalas(hossz) {
        this.betegseg_ido_csokkenes();
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
                        Ember.beteggel_egyhelyen(hossz);
                    } else {
                        irany = iranySzam();
                    }
                    break;
                case 2:
                    if (y - 10 > 0) {
                        Ember.svgobject.setAttribute("cy", y - 10);
                        Ember.beteggel_egyhelyen(hossz);
                    } else {
                        irany = iranySzam();
                    }
                    break;
                case 3:
                    if (x + 10 < 716) {
                        Ember.svgobject.setAttribute("cx", x + 10);
                        Ember.beteggel_egyhelyen(hossz);
                    } else {
                        irany = iranySzam();
                    }
                    break;
                case 4:
                    if (y + 10 < 616) {
                        Ember.svgobject.setAttribute("cy", y + 10);
                        Ember.beteggel_egyhelyen(hossz);
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

            if (!this.emberei[random].beteg) {
                this.emberei[random].megbetegit(hossz);

                this.betegei.push(this.emberei[random]);
                virusok++;
            }
        }
    }
    betegseg_ido_csokkenes() {
        for (const Beteg of this.betegei) {
            Beteg.betegsegHossz--;
            if (Beteg.betegsegHossz == 0) {
                Beteg.beteg = false;
                Beteg.belszin = "#2efc00";
                Beteg.svgobject.setAttribute("fill", "#2efc00");
                this.betegei.splice(this.betegei.indexOf(Beteg), 1);
            }
        }
    }
}
