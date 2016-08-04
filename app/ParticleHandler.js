var ParticleHandler = function () {

    var currentExplosions = [];
    var currentImplosions = [];
    var currentHalos = [];
    var currentShockwaves = [];

    function addShockwave(position, color) {
        var shockwave = new ShockwaveParticleRenderer(color, 20000, fileLoader.get("particle_grey"), 3, position, 1, 30);
        currentShockwaves.push(shockwave);

    }

    function addLittleExplosion(position, lifetime, color, speed, size) {
        if (speed == undefined) speed = 1;
        if (size == undefined) size = 1;

        var explosion = new ExplosionParticleRenderer(color, 2500, fileLoader.get("particle_grey"), lifetime, position, speed, size);

        currentExplosions.push(explosion);

    }

    function addExplosion(position, lifetime, color, speed, size) {


        if (speed == undefined) speed = 1;
        if (size == undefined) size = 1;

        // explosion 15 bewegungsschritte laufen lassen

        var explosion = new ExplosionParticleRenderer(color, 5000, fileLoader.get("particle_grey"), lifetime + 1, position, speed, size);

        for (var i = 0; i < 15; i++) {
            explosion.update();
        }
        currentExplosions.push(explosion);
    }


    function addImplosion(position) {

        var implosion = new ImplosionParticleRenderer(0xffdd33, 10000, fileLoader.get("particle_grey"), position, 1);
        currentImplosions.push(implosion);
    }

    function addHalo(position, lifetime, color) {
        var halo = new HaloParticleRenderer(color, 10000, fileLoader.get("particle_grey"), lifetime, position, 1, 30);
        currentHalos.push(halo);
    }

    return {

        addExplosion: addExplosion,

        addImplosion: addImplosion,

        addHalo: addHalo,

        addShockwave: addShockwave,

        addLittleExplosion: addLittleExplosion,

        update: function () {

            for (var i = 0; i < currentShockwaves.length; i++) {
                var shockwave = currentShockwaves[i];
                var successful = shockwave.update();
                if (!successful) {
                    currentShockwaves.splice(i, 1);
                }
            }

            for (var i = 0; i < currentExplosions.length; i++) {
                var explosion = currentExplosions[i];
                var successful = explosion.update();
                if (!successful) {
                    currentExplosions.splice(i, 1);
                }
            }

            for (var i = 0; i < currentImplosions.length; i++) {
                var implosion = currentImplosions[i];

                var successful = implosion.update();
                if (!successful) {
                    // Explosion starten
                    addExplosion(implosion.startVector, 1, implosion.color, 2, 2);
                    addHalo(implosion.startVector, 2, implosion.color);

                    // Implosion löschen
                    currentImplosions.splice(i, 1);
                }
            }

            for (var i = 0; i < currentHalos.length; i++) {
                var halo = currentHalos[i];
                var successful = halo.update();
                if (!successful) {
                    currentHalos.splice(i, 1);
                }
            }

        }
    };

};
