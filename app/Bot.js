// Botklasse
var destroyedAsteroids = 0; //f�r die milestones

// Fuer Kollision:
// asteroids und enemies sind nach Abstand zum Spieler sortiert
// -> break-Chance

// Hier aufzurufen:
// - init()
// - update(delta)
var asteroids = [], enemies = [], asteroidHitBoxes = [], enemyHitBoxes = [],
    asteroidHP = [], enemyHP = [], enemy, worldRadius, gameLevel, numOfAsteroids = 100,
    asteroidSpeedVecs = [], asteroidRotVecs = [];
var asteroidsClone = [], enemiesClone = [];


function Bot() {

    var minShipSize = 10;
    var maxShipSize = 20;
    var minAsteroidSize = 10;
    var maxAsteroidSize = 30;
    var guardingRadius = 50;
    var destroyedAsteroids = 0;
    var SHOT = 1;
    var ASTEROID = 2;
    var SHIP = 3;
    Asteroid
    // Sortierfunktion fuer Bots (Enemies und Asteroids)
    // je naeher am Schiff, desto niedriger der Indize
    function compare(a, b) {
        var distanceA = a.position.distanceToSquared(ship.position);
        var distanceB = b.position.distanceToSquared(ship.position)

        if (distanceA < distanceB) {
            return -1;
        } else if (distanceA > distanceB) {
            return 1;
        } else {
            return 0;
        }
    }


    // Testet so, dass sich Gegenstaende beim Erzeugen nicht behindern
    // TODO: Falls es lagt, Spieler - 1/4 - Asteroiden - 5/6 - Enemies
    function farAway(position, size) {
        // ueberpruefe Kollision mit Asteroiden
        var asteroidsLength = asteroids.length;
        for (i = 1; i <= asteroidsLength; i++) {
            asteroid = asteroids[asteroidsLength - i];
            var distanceAsteroid = asteroid.position.distanceTo(position);

            if (distanceAsteroid - size - asteroid.radius < 0) {
                return false;
            }
        }

        // ueberpruefe Kollision mit Enemies
        var enemiesLength = enemies.length;
        for (i = 1; i <= enemiesLength; i++) {
            enemy = enemies[enemiesLength - i];
            var distanceEnemy = enemy.position.distanceTo(position);

            if (distanceEnemy - size - maxShipSize < 0) {
                return false;
            }
        }

        // nichts gefunden
        return true;
    }

    // Respawn der Asteroiden
    function respawnAsteroid(asteroid, index) {
        //console.log("Respawned: "+index);
        var level = asteroid.level;
        // altes Loeschen

        scene.remove(asteroid);
        /*
        asteroids.splice(i,1);
        asteroidHitBoxes.splice(i,1);
        */
        // nachgelagertes behandeln

        //changeScore(scoreValues["asteroidDestroyed"]);
        // gegebenfalls Power-Up zeigen

        // neu erschaffen
        asteroid = createAsteroid(level, index);
        asteroids[index] = asteroid;
        asteroidHitBoxes[index] = asteroid.getHitBox();
        asteroidHitBoxes[index].position.set(asteroids[index].position.x, asteroids[index].position.y, asteroids[index].position.z);
        asteroidHP[index] = (10);
        //console.log("Respawned: " + i);
        scene.add(asteroid);
    }


    // Erschaffe Asteroiden
    function createAsteroid(level, astIndex) {

        var asteroid = new Asteroid(level, astIndex);

        return asteroid;

    }

    // Erschaffe Enemy
    function createEnemy(art, index) {
        var direction, alpha, beta, enemyPosition, radius,
            typ, speed;
        //console.log("Enter Create Enemy");
        // Welt als Kugel -> Setze an den aeusseren 1/2 Rand
        // TODO: spawnRadius setzen
        var spawnRadius = 500;
        radius = spawnRadius / 2 * (1 + Math.random());

        // zufaellig an den Rand positionieren
        do {
            alpha = 2 * Math.PI * Math.random();
            beta = 2 * Math.PI * Math.random();
            enemyPosition = new THREE.Vector3(
                Math.sin(beta) * Math.sin(alpha),
                Math.sin(beta) * Math.cos(alpha),
                Math.cos(beta));
            enemyPosition.multiplyScalar(radius);
            enemyPosition.add(ship.position);
        } while (!farAway(enemyPosition, maxShipSize));
        // TODO: speed abhaengig von Level
        var speed = 15;
        // TODO: weapon
        switch (art) {
            case 0: typ = "SMALL1"; break;
            case 1: typ = "SMALL2"; break;
            case 2: typ = "BOSS1"; break;
            case 3: typ = "BOSS2"; break;
            default: typ = "BOSS1"; // hardest weapon
        }

        speed += Math.round((level + 5) * Math.random());

        enemy = new Enemy(enemyPosition, speed, level, typ, index, art);

        return enemy;
    }

    //Level generieren, wuhu
    function createlevel(enemy1anzahl, enemy2anzahl, boss1anzahl, boss2anzahl) {

        for (var i = 0; i < enemy1anzahl; i++) {
            enemy = createEnemy(0, i);
            enemies.push(enemy);
            enemyHitBoxes.push(enemy.getHitBoxes());
            for (var j = enemyHitBoxes[i].length - 1; j >= 0; j--) {
                enemyHitBoxes[i][j].position.set(enemies[i].position.x, enemies[i].position.y, enemies[i].position.z);
            }
            scene.add(enemy);
        }

        var gegner2 = enemy2anzahl + enemy1anzahl;

        for (var i = enemy1anzahl; i < gegner2; i++) {
            enemy = createEnemy(1, i);
            enemies.push(enemy);
            enemyHitBoxes.push(enemy.getHitBoxes());
            for (var j = enemyHitBoxes[i].length - 1; j >= 0; j--) {
                enemyHitBoxes[i][j].position.set(enemies[i].position.x, enemies[i].position.y, enemies[i].position.z);
            }
            scene.add(enemy);
        }

        var gegner3 = gegner2 + boss1anzahl;
        for (var i = gegner2; i < gegner3; i++) {
            enemy = createEnemy(2, i);
            enemies.push(enemy);
            enemyHitBoxes.push(enemy.getHitBoxes());
            for (var j = enemyHitBoxes[i].length - 1; j >= 0; j--) {
                enemyHitBoxes[i][j].position.set(enemies[i].position.x, enemies[i].position.y, enemies[i].position.z);
            }
            scene.add(enemy);
        }

        var gegner4 = gegner3 + boss2anzahl;
        for (var i = gegner3; i < gegner4; i++) {
            enemy = createEnemy(3, i);
            enemies.push(enemy);
            enemyHitBoxes.push(enemy.getHitBoxes());
            for (var j = enemyHitBoxes[i].length - 1; j >= 0; j--) {
                enemyHitBoxes[i][j].position.set(enemies[i].position.x, enemies[i].position.y, enemies[i].position.z);
            }
            scene.add(enemy);
        }
    }


    // aktualisiere Position der Asteroiden und Gegner
    // Setze direction neu
    function updateLocation(delta) {

        //console.log(asteroids[49].position.distanceTo(ship.position));


        // Ausweichen
        // Asteroiden haben keine Intelligenz -> Bewegung behalten
        // Gegner sind intelligent -> allen vor sie liegenden Asteroiden ausweichen
        //                         -> allen vor sie liegenden Gegnern ausweichen
        // -> vordere updaten und Richtung des naechsten anhand der neuen Position
        //    ausrechnen


        // Asteroiden: Bewegung updaten
        for (var i = asteroids.length - 1; i >= 0; i--) {

            var asteroid = asteroids[i];
            asteroid.move(delta);
            asteroidHitBoxes[i].position.set(asteroid.position.x, asteroid.position.y, asteroid.position.z);

            asteroidsClone[i] = asteroids[i];
        }

        asteroidsClone.sort(compare);

        // Enemies bewegen
        // erst ab bestimmter Distanz d_max ausweichen priorisieren
        // ab d_min auf jeden Fall ausweichen
        for (var i = enemies.length - 1; i >= 0; i--) {
            if (enemyHP[i] <= 0) {
                scene.remove(enemies[i]);
                enemies.splice(i, 1);
                enemyHitBoxes.splice(i, 1);
                enemyHP.splice(i, 1);
            } else {
                enemies[i].move(delta, i);
                for (var j = enemyHitBoxes[i].length - 1; j >= 0; j--) {
                    enemyHitBoxes[i][j].position.set(enemies[i].position.x, enemies[i].position.y, enemies[i].position.z);
                }
            }
        }

        for (var i = 0; i < enemies.length; i++) {
            enemiesClone[i] = enemies[i];
        }

        enemiesClone.sort(compare);

    }

    return {
        // update-Methode, aufzurufen in jedem Durchlauf des Renderers
        updateAI: function (delta) {
            // Asteroiden respawnen
            // respawnEnemies();
            //console.log("AI updated")
            // Gegner und Asteroiden updaten
            updateLocation(delta);
            for (var i = 0; i < enemies.length; i++) {
                for (var j = enemyHitBoxes[i].length - 1; j >= 0; j--) {
                    enemyHitBoxes[i][j].rotation = enemies[i].rotation;
                }
            }
        },


        // Initialisierer der Bots je Level
        initAI: function (level) {
            // setzen unserer externen Faktoren
            worldRadius = 5000;
            gameLevel = level;

            // erstelle Asteroiden nur in Level 1
            // TODO: asteroiden wie loeschen
            if (level == 1) {
                asteroids = [];

                for (var i = 0; i < numOfAsteroids; i++) {
                    var asteroid = createAsteroid(level, i);
                }
            }

            // erstelle Gegner
            if (level == 1) {
                enemies = [];
            }

            for (var i = 0; i < 1 * level; i++) {
                enemy = createEnemy(level, i);
                enemyHP.push(10);
                enemies.push(enemy);
                enemyHitBoxes.push(enemy.getHitBoxes());
                for (var j = enemyHitBoxes[i].length - 1; j >= 0; j--) {
                    enemyHitBoxes[i][j].position.set(enemies[i].position.x, enemies[i].position.y, enemies[i].position.z);
                }
                scene.add(enemy);
            }
        },

        getAsteroids: function () {
            return asteroidsClone;
        },

        getEnemies: function () {
            return enemiesClone;
        },

        createlevel: createlevel
    }
}