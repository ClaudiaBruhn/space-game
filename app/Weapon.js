//Are the weapons active?
var weaponsActive = false;

//Available ammunition, maximal ammunition
var rocketAmmo = 1000;
var MaxRocketAmmo = 1000;

var MGAmmo = 600  ;
var MaxMGAmmo = 600;

var shockwaveAmmo = 5;
var maxShockwaveAmmo = 5;

var guidedMissileAmmo = 10;
var maxGuidedMissileAmmo = 10;

//Max distance covered by rocket
var rocketMaxDistance = 1500;

//Weaponcooldown
var laserReloadTime = 0.4;
var rocketReloadTime = 0.8;
var MGReloadTime = 1.2;
var shockwaveReloadTime = 4;
var guidedMissileReloadTime = 2;

//Weapondamage
var rocketDamage = 50;
var laserDamage = 2;
var explosionDamage = 100;

var explosionRadius = 500;
var shockwaveRadius = 500;

var MGDamage = 1;
var shockWaveDamage = 5;

// Which secundary Weapon is active? Rocket: 0, MG: 1
var activeSecWeapon = 0;

//List of rendered projectiles (rockets, laser, MG and explosion), also for Colision
var projectiles = [];

//Clock for weapons
var weaponClock;

//time since last shot was fired
var timeSinceShoot = 0;
var timeSinceRocket = 0;
var timeSinceMG = 0;
var timeSinceShockwave = 0;
var timeSinceGuidedMissile = 0;

//time Explosion is existing
var explosionTime = 0;

//time shockwave is existing
var shockwaveTime = 0;

//time for flying straight guided missile
var guidedMissileStartTime = 0;

//Counter for limiting MG single shootings
var mgCounter = 0;

//Geometries for bullets etc.
var shootGeometry;
var rocketGeometry;
var explosionGeometry;
var MGGeometry;
var hitBoxGeometry;
var shockGeometry;

//Textures for bullets
var rocketTexture;

//Materials for bullets etc.
var shootMaterial;
var explosionMaterial;
var rocketMaterial;
var hitBoxMaterial;
var guidedMissileMaterial;

//var dummyEnemy;

//Initialize, sp: the controlled Spaceship; cms: the List of Objects checked for collisions (CollidableMeshLists)
function initializeWeapons() {

    //var dummyGeo = new THREE.SphereGeometry(10, 32, 32);
    //var dummyMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
    //dummyEnemy = new THREE.Mesh(dummyGeo, dummyMaterial);

    //scene.add(dummyEnemy);

    //initialize Geometrys
    shootGeometry = new THREE.CylinderGeometry(1, 1, 500);

    rocketGeometry = fileLoader.get("RocketV2");

    explosionGeometry = new THREE.SphereGeometry(explosionRadius, 32, 32);

    MGGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    shockGeometry = new THREE.SphereGeometry(shockwaveRadius, 32, 32);

    hitBoxGeometry = new THREE.CylinderGeometry(1, 1, 1000);

    //initialize Materials
    rocketTexture = fileLoader.get("TextureHero");
    rocketMaterial = new THREE.MeshPhongMaterial({ map: rocketTexture });
    guidedMissileMaterial = new THREE.MeshPhongMaterial({ color: 0xFFcccc });

    shootMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000 });

    explosionMaterial = new THREE.MeshBasicMaterial({ color: 0xFF2F05 });
    hitBoxMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 });

    //initialize clock for time-control
    weaponClock = new THREE.Clock();

    //add Listener for left and rigth mouseclick
    document.body.addEventListener('click', shoot, false);

}

//One MG-firering burst (5 Bullets). 6 Bursts in one mg shot
function MGShoot() {

    //create bullet mesh
    var bullet1 = new THREE.Mesh(MGGeometry, shootMaterial);
    bullet1.name = "MachineGun";

    //translate bullet to Position of the spaceship. Then spread a little for MG-effect
    bullet1.position.x = ship.position.x;
    bullet1.position.y = ship.position.y;
    bullet1.position.z = ship.position.z;

    bullet1.lookAt(targetPosition);

    bullet1.translateZ(-30);
    bullet1.translateX(1);

    var dummyDot1 = new THREE.Object3D();
    dummyDot1.name = "BoxPoint";
    bullet1.add(dummyDot1);

    //add bullet to scene
    scene.add(bullet1);

    //add to projectiles list for rendering
    projectiles.push(bullet1);

    //repeat 4 times with spread

    var bullet2 = new THREE.Mesh(MGGeometry, shootMaterial);
    bullet2.name = "MachineGun";


    bullet2.position.x = ship.position.x;
    bullet2.position.y = ship.position.y;
    bullet2.position.z = ship.position.z;

    bullet2.lookAt(targetPosition);

    bullet2.translateZ(-15);
    bullet2.translateX(-1);

    var dummyDot2 = new THREE.Object3D();
    dummyDot2.name = "BoxPoint";
    bullet2.add(dummyDot2);

    scene.add(bullet2);
    projectiles.push(bullet2);

    //create bullet mesh
    var bullet3 = new THREE.Mesh(MGGeometry, shootMaterial);
    bullet3.name = "MachineGun";

    //translate bullet to Position of the spaceship. Then spread a little for MG-effect
    bullet3.position.x = ship.position.x;
    bullet3.position.y = ship.position.y;
    bullet3.position.z = ship.position.z;

    bullet3.lookAt(targetPosition);

    bullet3.translateZ(+15);
    bullet3.translateX(1);

    var dummyDot3 = new THREE.Object3D();
    dummyDot3.name = "BoxPoint";
    bullet3.add(dummyDot3);

    //add bullet to scene
    scene.add(bullet3);

    //add to projectiles list for rendering
    projectiles.push(bullet3);

    //repeat 4 times with spread

    var bullet4 = new THREE.Mesh(MGGeometry, shootMaterial);
    bullet4.name = "MachineGun";

    bullet4.position.x = ship.position.x;
    bullet4.position.y = ship.position.y;
    bullet4.position.z = ship.position.z;

    bullet4.lookAt(targetPosition);

    bullet4.translateZ(+30);
    bullet4.translateX(-1);

    var dummyDot4 = new THREE.Object3D();
    dummyDot4.name = "BoxPoint";
    bullet4.add(dummyDot4);

    scene.add(bullet4);
    projectiles.push(bullet4);

    //reset Timer
    timeSinceMG = 0;
}


//called by EventListener when mouse clicked: leftclick: e.button == 0; rightclick e.button = 2 (ZWEI)
function shoot(e) {
    if (weaponsActive == true){
        if (e.button === 0) {
            shootLaser();
            //enemyShootLaser(dummyEnemy, ship.position);
        }
        else if (activeSecWeapon == 0) {
            shootRocket();
        }
        else if (activeSecWeapon == 1) {
            if (timeSinceMG > MGReloadTime && MGAmmo > 0) {
                MGAudio.play();
                MGShoot();
                mgCounter = 6;
                MGAmmo -= 25;
                updateWeaponInterface();
            }
        }
        else if (activeSecWeapon == 2) {
            sendShockWave();
        }
        else {
            shootGuidedMissile();
        }
    }
}


function sendShockWave() {

    if (timeSinceShockwave > shockwaveReloadTime && shockwaveAmmo > 0) {
        shockwaveAudio.play();

        particleHandler.addShockwave(ship.position, 0xFF11AA);

        var shockWave = new THREE.Mesh(shockGeometry, shootMaterial);
        //translate bullet to ship position
        shockWave.position.x = ship.position.x;
        shockWave.position.y = ship.position.y;
        shockWave.position.z = ship.position.z;

        shockWave.name = "Shockwave";

        shockWave.visible = false;

        //add bullet to scene
        scene.add(shockWave);

        //add laser to projectiles list so it will be moved
        projectiles.push(shockWave);

        timeSinceShockwave = 0;
    }
}

//Firering main-laser
function shootLaser() {

    //if for limiting shooting frequency
    if (timeSinceShoot > laserReloadTime) {

        //play lazer-sound
        laserAudio.play();

        //reset timer
        timeSinceShoot = 0;

        //create mesh
        var laser = new THREE.Mesh(shootGeometry, shootMaterial);

        //set name for recognition in render-function
        laser.name = "Laser";

        //translate bullet to ship position
        laser.position.x = ship.position.x;
        laser.position.y = ship.position.y;
        laser.position.z = ship.position.z;

        //set orientation of the bullet according to ship orientation
        laser.lookAt(targetPosition);

        //rotate: laser beam would be pointing up otherwise
        laser.rotateX(1.57);

        //rotate: HitBox would start behind spaceship otherwise
        laser.translateY(-200);

        var numberDummyDots = 100;
        for (var i = 0; i <= numberDummyDots; i++) {
          var dummyDot = new THREE.Object3D();
          dummyDot.position.y = laser.geometry.parameters.height / numberDummyDots * i;
          dummyDot.name = "BoxPoint" + i;
          laser.add(dummyDot);

        }

        //add bullet to scene
        scene.add(laser);

        //add laser to projectiles list so it will be moved
        projectiles.push(laser);
    }

}

//Firering main-laser
function enemyShootLaser(laserShootingBotPosition, laserShootingTarget) {

    //play lazer-sound
    laserAudio.play();

    //create mesh
    var laser = new THREE.Mesh(shootGeometry, shootMaterial);

    //set name for recognition in render-function
    laser.name = "Laser";

    //translate bullet to ship position
    laser.position.x = laserShootingBotPosition.x;
    laser.position.y = laserShootingBotPosition.y;
    laser.position.z = laserShootingBotPosition.z;

    //set orientation of the bullet according to ship orientation
    laser.lookAt(laserShootingTarget);

    //rotate: laser beam would be pointing up otherwise
    laser.rotateX(-1.57);

    //translate so that laser starts in front of ship
    laser.translateY(-85);

    var numberDummyDots = 100;
    for (var i = 0; i <= numberDummyDots; i++) {
        var dummyDot = new THREE.Object3D();
        dummyDot.position.y = laser.geometry.parameters.height / numberDummyDots * i;
        dummyDot.name = "BoxPoint" + i;
        laser.add(dummyDot);
    }

    //add bullet to scene
    scene.add(laser);

    //add laser to projectiles list so it will be moved
    projectiles.push(laser);

}


//projectileIndex: Index in projectile list of laser hitbox
function successLaser(projectileIndex) {
    //remove laser and laserbeam from scene
    for(var i = 0; i<=projectiles[projectileIndex].children.length; i++){
      projectiles[projectileIndex].remove(projectiles[projectileIndex].children[i]);
    }
    projectiles[projectileIndex].geometry.dispose();
    projectiles[projectileIndex].material.dispose();
    scene.remove(projectiles[projectileIndex]);
    //remove laser from projectiles
    projectiles.splice(projectileIndex, 1);
}
function successRocket(projectileIndex){

  for(var i = 0; i<=projectiles[projectileIndex].children.length; i++){
      projectiles[projectileIndex].remove(projectiles[projectileIndex].children[i]);
  }
  projectiles[projectileIndex].geometry.dispose();
  projectiles[projectileIndex].material.dispose();
	//get rocket
	var rocket = projectiles[projectileIndex];
	//start explosion
	rocketExplode(rocket);
  //remove rocket from scene
  scene.remove(rocket);

  //remove rocket from projectiles
  projectiles.splice(projectileIndex, 1);
}

function successMachineGunBullet(projectileIndex) {
    scene.remove(projectiles[projectileIndex]);
    projectiles.splice(projectileIndex, 1);
}

//Shooting Rocket
function shootRocket() {

    //if for limiting rocket-shooting frequence
    if (timeSinceRocket > rocketReloadTime && rocketAmmo > 0) {
        rocketAmmo -= 1;
        updateWeaponInterface();

        //play rocket-sound
        rocketAudio.play();

        // create rocket
        var rocket = new THREE.Mesh(rocketGeometry, rocketMaterial);
        //set name for recognition in render-function
  	 	 rocket.name = "Rocket";

        //scaling the rocket
        rocket.scale.x = rocket.scale.y = rocket.scale.z = 5;

        //set position at position of the spaceship
        rocket.position.x = ship.position.x;
        rocket.position.y = ship.position.y;
        rocket.position.z = ship.position.z;

        //orientate rocket like spaceship
        rocket.lookAt(targetPosition);

        //rotate rocket; rocket would fly backwards otherwise
        rocket.rotateY(Math.PI);

        //add rocket to list for rendering and collision
        projectiles.push(rocket);

        var numberDummyDots = 100;
        // dummy points to check collision with rocket
        for (var i = 0; i <= numberDummyDots; i++) {
            var dummyDot = new THREE.Object3D();
            dummyDot.position.z = hitBoxGeometry.parameters.height / numberDummyDots * i;
            dummyDot.name = "BoxPoint" + i;
            rocket.add(dummyDot);
        }

        //add rocket to scene
        scene.add(rocket);
        //reset timer
        timeSinceRocket = 0;
    }

}

//Shooting Rocket
function shootGuidedMissile() {

    //if for limiting guidedMissile-shooting frequence
    if (timeSinceGuidedMissile > guidedMissileReloadTime && guidedMissileAmmo > 0) {

    	guidedMissileStartTime = 0;
        guidedMissileAmmo -= 1;
        updateWeaponInterface();

        //play guidedMissile-sound
        rocketAudio.play();

        // create guidedMissile
        var guidedMissile = new THREE.Mesh(rocketGeometry, guidedMissileMaterial);
        //calculate closest enemy
        var closestDis = 10000;
        var closestEnemy = undefined;
        for (var enemy in enemies) {
            var dis = calculateDistanceToShip(enemies[enemy]);
            if (closestDis > dis) {
                closestDis = dis;
                closestEnemy = enemy;
            }
        }
        //If no enemy is in sight, render as rocket
        if(closestEnemy == undefined){
            //set name for recognition in render-function
            guidedMissile.name = "Rocket";
        }
        //else as guided missile
        else{
            //save closest enemy in userData for rendering
            guidedMissile.userData = enemies[closestEnemy];
            //set name for recognition in render-function
            guidedMissile.name = "GuidedMissile";
        }

        //scaling the guidedMissile
        guidedMissile.scale.x = guidedMissile.scale.y = guidedMissile.scale.z = 10;

        //set position at position of the spaceship
        guidedMissile.position.x = ship.position.x;
        guidedMissile.position.y = ship.position.y;
        guidedMissile.position.z = ship.position.z;

        //orientate guidedMissile like spaceship
        guidedMissile.lookAt(targetPosition);

        //rotate guidedMissile; guidedMissile would fly backwards otherwise
        guidedMissile.rotateY(Math.PI);

        // dummy points to check collision with GuidedMissile
        var numberDummyDots = 100;
        // dummy points to check collision with rocket
        for (var i = 0; i <= numberDummyDots; i++) {
            var dummyDot = new THREE.Object3D();
            dummyDot.position.z = hitBoxGeometry.parameters.height / numberDummyDots * i;
            dummyDot.name = "BoxPoint" + i;
            guidedMissile.add(dummyDot);
        }

        //add guidedMissile to scene
        scene.add(guidedMissile);

        //add guidedMissile to list for rendering and collision
        projectiles.push(guidedMissile);

        //reset timer
        timeSinceGuidedMissile = 0;
    }

}

//Explosion of the rocket at specific distance
function rocketExplode(rocket) {

    //play explosion time
    explosionAudio.play();

    //the explosion is a big sphere (dummy)
    var explosion = new THREE.Mesh(explosionGeometry, explosionMaterial);

    //set rocket back for realistic detonation point
    rocket.translateZ(-40);
    //set position at position of the exploding rocket
    explosion.position.x = rocket.position.x;
    explosion.position.y = rocket.position.y;
    explosion.position.z = rocket.position.z;

    var particleAnimationPosition = new THREE.Vector3(explosion.position.x,
        explosion.position.y,
        explosion.position.z);

    //name for identification in rendering
    explosion.name = "Explosion";
    explosion.visible = false;
    //add explosion to scene
    scene.add(explosion);

    //reset explosion timer for ending explosion after specific time
    explosionTime = 0;

    //add explision to projetiles list for rendering and collision
    projectiles.push(explosion);

    // starte Particle: Implosion -> Explosion -> Halo
    particleHandler.addImplosion(particleAnimationPosition);

}

//calculates the distance between an Object and the spaceship
function calculateDistanceToShip(obj) {

    var dx = obj.position.x - ship.position.x;
    var dy = obj.position.y - ship.position.y;
    var dz = obj.position.z - ship.position.z;

    return Math.sqrt(dx * dx + dy * dy + dz * dz);

}


//funtion for mooving weapons and destruction of rocket/explosion
function renderWeapons(){


	//Variable for adding the past time since last call to all Weapon-Time-Counters
	var add = weaponClock.getDelta();

	//increment time counters for limiting shooting frequence
	timeSinceShoot         += add;
	timeSinceMG            += add;
	timeSinceRocket        += add;
	timeSinceShockwave     += add;
	timeSinceGuidedMissile += add;
	guidedMissileStartTime += add;
	//variable for limiting explosion lifespan
	explosionTime += add;
	shockwaveTime += add;

	//function for limiting single shootings while MG-shooting
	if(mgCounter > 0){
	    if(timeSinceMG >0.05){
	    	timeSinceMG = 0;
	    	MGShoot();
	    	mgCounter -= 1;
	    }
	}

	//Translate all projectiles and check for end of existance
	for( var bul in projectiles){

		//calculate distance between projectile and spaceship
		var dis = calculateDistanceToShip(projectiles[bul]);

		//check name and proceed accordingly

	   	//if projectile is a laser hitbox:
		if(projectiles[bul].name == "Laser"){

			//translate in mooving direction
	    	projectiles[bul].translateY(-4000 * add);

	    	//translate to hitbox belonging laser-beam
	    	if (dis > biggerSphereRadius){
    			successLaser(bul);
    		}
	    }

  		//if projectile is a rocket Hitbox:
	    else if(projectiles[bul].name == "Rocket"){
			  //translate in mooving direction (translateZ becouse of different orientation then laser)
	    	projectiles[bul].translateZ(2000 * add);

	    	if (dis > 1500){
    			successRocket(bul);
    		}
	    }
	    //if projectile is an Explosion:
	    else if(projectiles[bul].name == "Explosion"){
	    	//Check if Explosion
	    	if (explosionTime > 0.15){
        		scene.remove(projectiles[bul]);
        		projectiles.splice(bul, 1);
    		}
	    }
	    else if (projectiles[bul].name == "MachineGun") {
            //translate in mooving direction
            projectiles[bul].translateZ(-1000 * add);

            if (dis > 800) {
               	successMachineGunBullet(bul);
            }
        }
        else if (projectiles[bul].name == "Shockwave") {
            //Check if Explosion
            if (shockwaveTime > 0.15) {
                scene.remove(projectiles[bul]);
                projectiles.splice(bul, 1);
            }
        }
        else if (projectiles[bul].name == "GuidedMissile") {

        	if(guidedMissileStartTime > 0.5){
	    		projectiles[bul].lookAt(projectiles[bul].userData.position);
      		}

	    	projectiles[bul].translateZ(400 * add);

            if (dis > 1500 || inRange(projectiles[bul], projectiles[bul].userData)) {
                successRocket(bul);
            }
        }

    }

}

function inRange(rkt, enemy) {
    console.log(enemy);
    if (rkt.position.x < enemy.position.x + 10
        && rkt.position.x > enemy.position.x - 10
        && rkt.position.y < enemy.position.y + 10
        && rkt.position.y > enemy.position.x - 10
        && rkt.position.z < enemy.position.z + 10
        && rkt.position.x > enemy.position.x - 10) {

        return true;
    }
    return false;
}

function toggleWeapons() {

    if (weaponsActive === true) {
        document.removeEventListener('click', shoot, false);
        weaponsActive = false;
    } else {
        document.addEventListener('click', shoot, false);
        weaponsActive = true;
    }

}
