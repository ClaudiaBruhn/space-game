// Asteroidenklasse
// Hier nichts direkt aufrufen, Aufrufe werden ueber Bot.js geregelt
// (Ausnahme: Collision soll collide aufrufen)
var minShipSize = 10;
var maxShipSize = 20;
var maxAsteroidSize = 30;
var smallityBorder = 120;

var geometryA, textureA;

var despawnDistance = 5000; // aus core.js (Backplane der Camera) (changed)
var asteroidRadius = 4.2;
var defaultAsteroidHP = 10;



function Asteroid(level, astIndex) {
    //console.log("Asteroid init");
    // Mesh setzen
    this.astIndex = astIndex;

    geometryA = fileLoader.get("AsteroidV2");
    textureA = fileLoader.get("AsteroidTex");

    THREE.Mesh.call(this, geometryA,
        new THREE.MeshPhongMaterial({ map: textureA }));

    // setze Groesse
    rndScale = Math.random() * (50 - 20) + 20;
    this.scale.x = this.scale.y = this.scale.z = rndScale;

    this.level = level;
    this.speed = (this.level > 15) ? this.level : 15;

    rndSpeedX = Math.random() * (this.speed + 11) - 11;
    rndSpeedY = Math.random() * (this.speed + 11) - 11;
    rndSpeedZ = Math.random() * (this.speed + 11) - 11;
    this.vecSpeed = new THREE.Vector3(rndSpeedX, rndSpeedY, rndSpeedZ);
    this.direction = this.vecSpeed.clone();
    this.direction.normalize();
    asteroidSpeedVecs.push(this.vecSpeed);

    this.radius = asteroidRadius * rndScale;
    this.isSmall = (this.radius <= smallityBorder) ? true : false;

    this.position.x = ship.position.x + Math.floor(Math.random() * (biggerSphereRadius - (-biggerSphereRadius)) - biggerSphereRadius);
    this.position.y = ship.position.y + Math.floor(Math.random() * (biggerSphereRadius - (-biggerSphereRadius)) - biggerSphereRadius);
    this.position.z = ship.position.z + Math.floor(Math.random() * (biggerSphereRadius - (-biggerSphereRadius)) - biggerSphereRadius);

    // setze Rotation
    rotSpeed = Math.random() * 0.05 - 0.01;
    this.vecRot = new THREE.Vector3(rotSpeed * (Math.random() * (2 - 0) - 0), rotSpeed * (Math.random() * (2 - 0) - 0), rotSpeed * (Math.random() * 2 - 0));
    asteroidRotVecs.push(this.vecRot);

    asteroids.push(this);
    asteroidHitBoxes.push(this.getHitBox(rndScale));
    asteroidHitBoxes[astIndex].position.set(asteroids[astIndex].position.x, asteroids[astIndex].position.y, asteroids[astIndex].position.z);
    asteroidHP.push(defaultAsteroidHP);
    scene.add(this);

}

Asteroid.prototype.constructor = Asteroid;
Asteroid.prototype = new THREE.Mesh;

Asteroid.prototype.move = function (delta) {
    this.direction.multiplyScalar(this.speed * delta);
    this.position.x += asteroidSpeedVecs[this.astIndex].x;
    this.position.y += asteroidSpeedVecs[this.astIndex].y;
    this.position.z += asteroidSpeedVecs[this.astIndex].z;
    this.direction.normalize();

    // console.log("Position asteroid: ("+this.position.x+","+this.position.y+","+this.position.z+")");

    this.rotation.x += asteroidRotVecs[this.astIndex].x;
    this.rotation.y -= asteroidRotVecs[this.astIndex].y;
    this.rotation.z -= asteroidRotVecs[this.astIndex].z;

    // console.log("Rotation asteroid: ("+this.rotation.x+","+this.rotation.y+","+this.rotation.z+")");

    asteroidHitBoxes[this.astIndex].position.x += asteroidSpeedVecs[this.astIndex].x;
    asteroidHitBoxes[this.astIndex].position.y += asteroidSpeedVecs[this.astIndex].y;
    asteroidHitBoxes[this.astIndex].position.z += asteroidSpeedVecs[this.astIndex].z;

    if ((this.position.x < biggerSphere.position.x - biggerSphereRadius || this.position.x > biggerSphere.position.x + biggerSphereRadius || this.position.y < biggerSphere.position.y - biggerSphereRadius || this.position.y > biggerSphere.position.y + biggerSphereRadius || this.position.z < biggerSphere.position.z - biggerSphereRadius || this.position.z > biggerSphere.position.z + biggerSphereRadius)) {

        this.respawn();

    }

}

Asteroid.prototype.collide = function (other, type, index, otherIndex) {
    switch (type) {
        case "ASTEROID": case "asteroid": case "Asteroid":
            if (Math.max(this.radius - other.radius, other.radius - this.radius) <= 5) {
                this.reflect(other);
            } else {
                if (this.radius > other.radius) {
                    asteroidHP[otherIndex] = 0;
                    other.destroy(type);
                    asteroidLowAudio.play();
                    return;
                } else {
                    asteroidHP[index] = 0;
                    this.destroy(type);
                    asteroidLowAudio.play();
                    return;
                }
            }
            break;
        case "SHIP": case "ship": case "Ship":
            // TODO
            break;
        case "PLAYER": case "player": case "Player":
             this.reflectPlayer(ship); 
            break;
        case "LASER": case "laser": case "Laser":
            asteroidHP[index] -= laserDamage;
            particleHandler.addLittleExplosion(asteroids[this.astIndex].position, 3, 0xff0000, 1, 1);
            break;
        case "ROCKET": case "rocket": case "Rocket":
            asteroidHP[index] -= rocketDamage;
            break;
        case "EXPLOSION": case "explosion": case "Explosion":
            asteroidHP[index] -= explosionDamage;
            break;
        case "MACHINEGUN": case "machinegun": case "MachineGun":
            asteroidHP[index] -= MGDamage;
            break;
        
        case "SHOCKWAVE": case "shockwave": case "ShockWave":
            asteroidHP[index] -= shockWaveDamage;
            break;
        default: console.log("Error: Collision with unknown");
    }

    if (asteroidHP[index] <= 0) {
    	asteroidAudio.play();
        this.destroy(type);
    }
    if ((type == "ASTEROID" || type == "asteroid" || type == "Asteroid") && asteroidHP[otherIndex] <= 0) {
        other.destroy(type);
    }
}


Asteroid.prototype.destroy = function (collisionType) {

    // update Highscore
    switch (collisionType) {

        case "LASER": case "laser": case "Laser":
        case "ROCKET": case "rocket": case "Rocket":
        case "EXPLOSION": case "explosion": case "Explosion":
        case "MACHINEGUN": case "machinegun": case "Machinegun":
        case "PLAYER": case "player": case "Player":
            changeScore(scoreValues["asteroidDestroyed"]);
            spawnPowerUp(asteroids[this.astIndex].position.x, asteroids[this.astIndex].position.y, asteroids[this.astIndex].position.z);
			destroyedAsteroids += 1;

			checkMilestones();
            break;

        default:

            break;

    }

    particleHandler.addExplosion(asteroids[this.astIndex].position, 3, 0xcccccc, 1, asteroidHitBoxes[this.astIndex].geometry.parameters.radius / 45);

    this.respawn();

}

Asteroid.prototype.respawn = function () {

    newVec = new THREE.Vector3(Math.random(), Math.random(), Math.random());
    newVec.normalize();

    var rnd1, rnd2, rnd3;

    rnd1 = Math.sign(Math.sign(Math.random() - 0.5) + 0.1);
    rnd2 = Math.sign(Math.sign(Math.random() - 0.5) + 0.1);
    rnd3 = Math.sign(Math.sign(Math.random() - 0.5) + 0.1);

    var newScale = Math.random() * (50 - 20) + 20;

    asteroids[this.astIndex].position.x = ship.position.x + rnd1 * biggerSphereRadius * newVec.x;
    asteroids[this.astIndex].position.y = ship.position.y + rnd2 * biggerSphereRadius * newVec.y;
    asteroids[this.astIndex].position.z = ship.position.z + rnd3 * biggerSphereRadius * newVec.z;

    asteroidHitBoxes[this.astIndex].position.x = ship.position.x + rnd1 * biggerSphereRadius * newVec.x;
    asteroidHitBoxes[this.astIndex].position.y = ship.position.y + rnd2 * biggerSphereRadius * newVec.y;
    asteroidHitBoxes[this.astIndex].position.z = ship.position.z + rnd3 * biggerSphereRadius * newVec.z;

    asteroidHP[this.astIndex] = defaultAsteroidHP;

}

Asteroid.prototype.reflect = function (other) {
    var thisDir = asteroidSpeedVecs[this.astIndex].clone();
    var otherDir = asteroidSpeedVecs[other.astIndex].clone();
    // Reflektiert Asteroiden this und other
    var factor;

    // "Normale" der Reflektion (zeigt von this nach other -> "Normale fuer this")
    var axis = other.position.clone();
    axis.sub(this.position);
    axis.normalize();

    var negAxis = axis.clone().negate();

    // Reflektion fuer Asteroid a
    var axisA = axis.clone();
    factor = 2 * axisA.dot(thisDir);
    thisDir.negate();
    thisDir.add(axis.multiplyScalar(factor));

    // Reflektion fuer Asteroid b
    var axisB = negAxis.clone();
    factor = 2 * axisB.dot(otherDir);
    otherDir.negate();
    otherDir.add(negAxis.multiplyScalar(factor));

    asteroidSpeedVecs[this.astIndex] = thisDir;
    asteroidSpeedVecs[other.astIndex] = otherDir;
    this.direction = thisDir.clone();
    other.direction = otherDir.clone();

}

Asteroid.prototype.reflectPlayer = function (player) {
    var thisDir = asteroidSpeedVecs[this.astIndex].clone();
    var playerDir = this.getMeshDirection(ship);
    // Reflektiert Asteroiden this und other
    var factor;

    // "Normale" der Reflektion (zeigt von this nach other -> "Normale fuer this")
    var axis = player.position.clone();
    axis.sub(this.position);
    axis.normalize();

    var negAxis = axis.clone().negate();

    // Reflektion fuer Asteroid a
    var axisA = axis.clone();
    factor = 2 * axisA.dot(playerDir);
    thisDir.negate();
    thisDir.add(axis.multiplyScalar(factor));

    // Reflektion fuer Asteroid b
    var axisB = negAxis.clone();
    factor = 2 * axisB.dot(playerDir);
    playerDir.negate();
    playerDir.add(negAxis.multiplyScalar(factor));

    asteroidSpeedVecs[this.astIndex] = thisDir;
    this.position.add(asteroidSpeedVecs[this.astIndex].multiplyScalar(3)); 
    ship.position.add(playerDir.multiplyScalar(3));
   // asteroidSpeedVecs[other.astIndex] = playerDir;
    this.direction = thisDir.clone();
    player.direction = playerDir.clone();

}



Asteroid.prototype.getHitBox = function () {
    var mesh, geometry, material;

    geometry = new THREE.SphereGeometry(asteroidRadius * rndScale, 32, 32);

    var material = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.5,
        color: 0xffffff
    });

    mesh = new THREE.Mesh(geometry, material);

    return mesh;
}

Asteroid.prototype.getObstacleHitBox = function () {
    var mesh, geometry, material;

    geometry = new THREE.SphereGeometry(1.2 * 3.5 * this.radius, 32, 32);

    material = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.0,
        color: 0xffffff
    });

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(this.position.x, this.position.y, this.position.z);
    mesh.direction = this.direction;

    return mesh;
}

Asteroid.prototype.getMeshDirection = function (mesh) {

    //Default Front-Facing
    var dir = new THREE.Vector3(0, 0, 1);
    //Apply rotation of Mesh
    dir.applyQuaternion(mesh.quaternion);

    return dir;

}
