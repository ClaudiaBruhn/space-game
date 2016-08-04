/*var sphere = new THREE.Object3D();
var biggerSphere = new THREE.Object3D();
var stars = [];

/*var asteroids = [];
>>>>>>> 106e7f639ff0f7197b7976b29414f702ecf4f6fb
var asteroidsHP = [];
var asteroidSpeedVecs = [];
var asteroidRotVecs = [];
//var asteroidHitBoxes = [];
var smallSphereRadius = 1000;
var biggerSphereRadius = 5000;
var asteroidRadius = 3.5;
var defaultAsteroidHP = 10;
var destroyedAsteroids = 0; //für die milestones
var asteroidRadius = 4.2;
var defaultAsteroidHP = 10;*/


//starStuff
/*function createStars() {

    var star, material, alpha;

    for (var count = 0; count < 300; count++) {

        material = new THREE.MeshBasicMaterial({
            transparent: true,
            combine: THREE.MixOperation,
            blending: THREE.AdditiveBlending,

            color: 0xffffff
        });

        var sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

        // make the star
        star = new THREE.Mesh(sphereGeometry, material);

        star.position.x = ship.position.x + Math.floor(Math.random() * (smallSphereRadius - (-smallSphereRadius)) - smallSphereRadius);
        star.position.y = ship.position.y + Math.floor(Math.random() * (smallSphereRadius - (-smallSphereRadius)) - smallSphereRadius);
        star.position.z = ship.position.z + Math.floor(Math.random() * (smallSphereRadius - (-smallSphereRadius)) - smallSphereRadius);
        star.scale.x = star.scale.y = star.scale.z = Math.random() * 3 - 2;

        scene.add(star);
        stars.push(star);
    }

}*/


//AsteroidStuff
/*
function createAsteroids() {

    var rndSpeedX, rndSpeedY, rndSpeedZ, rotSpeed, rndScale;

    var materialAst, astHitBox, hitGeometry;
    var astTexture, astOriginal;*/
/*
    astGeometry = fileLoader.get("AsteroidV2");
    astTexture = fileLoader.get("AsteroidTex");

    for (countAst = 0; countAst < 150; countAst++) {*/

/*        rndSpeedX = Math.random() * 15 - 11;
        rndSpeedY = Math.random() * 15 - 11;
        rndSpeedZ = Math.random() * 15 - 11;*/
        /*rotSpeed = Math.random() * 0.05 - 0.01;*/
        /*rndScale = Math.random() * 30;*/
/*
        var vecSpeed = new THREE.Vector3(rndSpeedX, rndSpeedY, rndSpeedZ);
        var vecRot = new THREE.Vector3(rotSpeed * (Math.random() * (2 - 0) - 0), rotSpeed * (Math.random() * (2 - 0) - 0), rotSpeed * (Math.random() * 2 - 0));
        asteroidSpeedVecs.push(vecSpeed);
        asteroidRotVecs.push(vecRot);*/

  /*      astOriginal = new THREE.Mesh(astGeometry, new THREE.MeshPhongMaterial({ map: astTexture }));
*/
/*        astOriginal.position.x = ship.position.x + Math.floor(Math.random() * (biggerSphereRadius - (-biggerSphereRadius)) - biggerSphereRadius);
        astOriginal.position.y = ship.position.y + Math.floor(Math.random() * (biggerSphereRadius - (-biggerSphereRadius)) - biggerSphereRadius);
        astOriginal.position.z = ship.position.z + Math.floor(Math.random() * (biggerSphereRadius - (-biggerSphereRadius)) - biggerSphereRadius);*/

/*        astOriginal.scale.x = astOriginal.scale.y = astOriginal.scale.z = rndScale;
*//*        hitGeometry = new THREE.SphereGeometry(asteroidRadius * rndScale, 32, 32);

        var colSphereMaterial = new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0.5,
            color: 0xffffff
        });*/

/*        astHitBox = new THREE.Mesh(hitGeometry, colSphereMaterial);
        astHitBox.position.set(astOriginal.position.x, astOriginal.position.y, astOriginal.position.z);
*/
/*        asteroidsHP.push(defaultAsteroidHP);
        asteroids.push(astOriginal);
        asteroidHitBoxes.push(astHitBox);
        scene.add(astOriginal);*/
 /*   }

}*/


//Update asteroid-position and their hitboxes with randomized speed and rotation;
/*function updateAsteroids() {

    var tmpAsteroid, newVec, rndAngle2;
    var tmpHitBox;

    for (countAst = 0; countAst < asteroids.length; countAst++) {

        tmpAsteroid = asteroids[countAst];
        tmpHitBox = asteroidHitBoxes[countAst];*/
        //Update RotationValue
/*        tmpAsteroid.rotation.x += asteroidRotVecs[countAst].x;
        tmpAsteroid.rotation.y -= asteroidRotVecs[countAst].y;
        tmpAsteroid.rotation.z -= asteroidRotVecs[countAst].z;
*/
        //Update SpeedValue
/*        tmpAsteroid.position.x += asteroidSpeedVecs[countAst].x;
        tmpAsteroid.position.y += asteroidSpeedVecs[countAst].y;
        tmpAsteroid.position.z += asteroidSpeedVecs[countAst].z;
*/
        //Update SpeedValue Hitbox
/*        tmpHitBox.position.x += asteroidSpeedVecs[countAst].x;
        tmpHitBox.position.y += asteroidSpeedVecs[countAst].y;
        tmpHitBox.position.z += asteroidSpeedVecs[countAst].z;

        if ((tmpAsteroid.position.x < biggerSphere.position.x - biggerSphereRadius || tmpAsteroid.position.x > biggerSphere.position.x + biggerSphereRadius || tmpAsteroid.position.y < biggerSphere.position.y - biggerSphereRadius || tmpAsteroid.position.y > biggerSphere.position.y + biggerSphereRadius || tmpAsteroid.position.z < biggerSphere.position.z - biggerSphereRadius || tmpAsteroid.position.z > biggerSphere.position.z + biggerSphereRadius)) {

            newVec = new THREE.Vector3(Math.random(), Math.random(), Math.random());
            newVec.normalize();

            var rnd1, rnd2, rnd3;

            rnd1 = Math.sign(Math.sign(Math.random() - 0.5) + 0.1);
            rnd2 = Math.sign(Math.sign(Math.random() - 0.5) + 0.1);
            rnd3 = Math.sign(Math.sign(Math.random() - 0.5) + 0.1);

            tmpAsteroid.position.x = ship.position.x + rnd1 * biggerSphereRadius * newVec.x;
            tmpAsteroid.position.y = ship.position.y + rnd2 * biggerSphereRadius * newVec.y;
            tmpAsteroid.position.z = ship.position.z + rnd3 * biggerSphereRadius * newVec.z;

            tmpHitBox.position.x = ship.position.x + rnd1 * biggerSphereRadius * newVec.x;
            tmpHitBox.position.y = ship.position.y + rnd2 * biggerSphereRadius * newVec.y;
            tmpHitBox.position.z = ship.position.z + rnd3 * biggerSphereRadius * newVec.z;
        }*/
/*    }

}*/


//Function to trigger if asteroids collide
/*function asteroidCollision(ast1Index, ast2Index) {

    var ast1 = asteroids[ast1Index];
    var ast2 = asteroids[ast2Index];
    var ast1Dir = asteroidSpeedVecs[ast1Index];
    var ast2Dir = asteroidSpeedVecs[ast2Index];

    if (asteroidHitBoxes[ast1Index].geometry.parameters.radius > 55 && asteroidHitBoxes[ast2Index].geometry.parameters.radius > 55) {
        var axis = ast2.position.clone();
        axis.sub(ast1.position);

        var negAxis = ast1.position.clone();
        negAxis.sub(ast2.position);

        axis.normalize();
        negAxis.normalize();

        ast1Dir = ast1Dir.sub(axis.multiplyScalar(2 * ast1Dir.dot(axis)));
        ast2Dir = ast2Dir.sub(negAxis.multiplyScalar(2 * ast2Dir.dot(negAxis)));

        asteroidSpeedVecs[ast1Index] = ast1Dir;
        asteroidSpeedVecs[ast2Index] = ast2Dir;
    }

    else if (asteroidHitBoxes[ast1Index].geometry.parameters.radius < 55 && asteroidHitBoxes[ast2Index].geometry.parameters.radius > 55) {
        destroyAsteroid(ast1Index, "AsteroidAsteroidCollision");
    } else if (asteroidHitBoxes[ast1Index].geometry.parameters.radius > 55 && asteroidHitBoxes[ast2Index].geometry.parameters.radius < 55) {
        destroyAsteroid(ast2Index, "AsteroidAsteroidCollision");
    } else if (asteroidHitBoxes[ast1Index].geometry.parameters.radius < 55 && asteroidHitBoxes[ast2Index].geometry.parameters.radius < 55) {
        destroyAsteroid(ast1Index, "AsteroidAsteroidCollision");
        destroyAsteroid(ast2Index, "AsteroidAsteroidCollision");
    }

}*/


/*function hitAsteroid(asteroidNumber, collisionType) {

    switch (collisionType) {

        case "Laser":
            asteroidsHP[asteroidNumber] -= laserDamage;

            // particleHandler.addShockwave(asteroids[asteroidNumber].position, 0xff6611);
            particleHandler.addLittleExplosion(asteroids[asteroidNumber].position, 3, 0xff0000, 1, 1);
            particleHandler.addLittleExplosion(asteroids[asteroidNumber].position, 3, 0xffffff, 1, 1);
            
            break;

        case "Rocket":

            asteroidsHP[asteroidNumber] -= rocketDamage;

            break;

        case "Explosion":

          asteroidsHP[asteroidNumber] -= explosionDamage;
          break;

        case "MachineGun":

            asteroidsHP[asteroidNumber] -= MGDamage;
            break;

        case "ShockWave":

            asteroidsHP[asteroidNumber] -= shockWaveDamage;
            break;

        default:

            break;

    }

    if (asteroidsHP[asteroidNumber] <= 0) {
        destroyAsteroid(asteroidNumber, collisionType);
    }

}*/



/*function changeAsteroidDirection (asteroidNumber){

  var newRotVal = Math.random() * (2 +1) - 1;

   asteroidSpeedVecs[asteroidNumber] = asteroidSpeedVecs[asteroidNumber].multiplyScalar(-1) ;
   asteroidSpeedVecs[asteroidNumber] = asteroidSpeedVecs[asteroidNumber].add(3) ;

   asteroidRotVecs[asteroidNumber] = asteroidRotVecs[asteroidNumber].multiplyScalar(newRotVal);



}*/


/*//Function to trigger if Asteroid get destroyed
function destroyAsteroid(asteroidNumber, collisionType) {

	//für die Milestones
	destroyedAsteroids++;
	checkMilestones(); 
	
    asteroidAudio.play();

    // update Highscore
    switch (collisionType) {

        case "Laser":
        case "Rocket":
        case "Explosion":
            changeScore(scoreValues["asteroidDestroyed"]);

            break;

        default:

            break;

    }

    newVec = new THREE.Vector3(Math.random(), Math.random(), Math.random());
    newVec.normalize();

    var rnd1, rnd2, rnd3;

    rnd1 = Math.sign(Math.sign(Math.random() - 0.5) + 0.1);
    rnd2 = Math.sign(Math.sign(Math.random() - 0.5) + 0.1);
    rnd3 = Math.sign(Math.sign(Math.random() - 0.5) + 0.1);

    particleHandler.addExplosion(asteroids[asteroidNumber].position, 2, 0xcccccc, 1, asteroidHitBoxes[asteroidNumber].geometry.parameters.radius / 45);

    var newScale = Math.random() * 30;

    spawnPowerUp(asteroids[asteroidNumber].position.x, asteroids[asteroidNumber].position.y, asteroids[asteroidNumber].position.z);
    asteroids[asteroidNumber].position.x = ship.position.x + rnd1 * biggerSphereRadius * newVec.x;
    asteroids[asteroidNumber].position.y = ship.position.y + rnd2 * biggerSphereRadius * newVec.y;
    asteroids[asteroidNumber].position.z = ship.position.z + rnd3 * biggerSphereRadius * newVec.z;

    asteroidHitBoxes[asteroidNumber].position.x = ship.position.x + rnd1 * biggerSphereRadius * newVec.x;
    asteroidHitBoxes[asteroidNumber].position.y = ship.position.y + rnd2 * biggerSphereRadius * newVec.y;
    asteroidHitBoxes[asteroidNumber].position.z = ship.position.z + rnd3 * biggerSphereRadius * newVec.z;

    asteroidsHP[asteroidNumber] = defaultAsteroidHP;

}*/
/*
//Function to create the Spheres around the player
function World() {

    return {
        init: function () {

            var geometry = new THREE.SphereGeometry(smallSphereRadius, 200, 200);
            var biggerGeometry = new THREE.SphereGeometry(biggerSphereRadius, 200, 200);

            var material = new THREE.MeshBasicMaterial({
                transparent: true

            });

            sphere = new THREE.Mesh(geometry, material);
            biggerSphere = new THREE.Mesh(biggerGeometry, material);
            biggerSphere.position.set(0, 0, 0);
            sphere.position.set(0, 0, 0);
        }
    }

}

//Update stars- check if they are inside Sphere. Else randomize Position
function updateStars() {

    // iterate through every star
    for (var i = 0; i < stars.length; i++) {
        star = stars[i];

        var temp = Math.sin(clock.getElapsedTime());
        temp = temp == 0 ? 0.00001 : temp;

        star.scale.x = star.scale.y = star.scale.z = temp;

        if ((star.position.x < sphere.position.x - smallSphereRadius || star.position.x > sphere.position.x + smallSphereRadius || star.position.y < sphere.position.y - smallSphereRadius || star.position.y > sphere.position.y + smallSphereRadius || star.position.z < sphere.position.z - smallSphereRadius || star.position.z > sphere.position.z + smallSphereRadius)) {
            star.position.x = ship.position.x + Math.floor(Math.random() * (smallSphereRadius - (-smallSphereRadius)) - smallSphereRadius);
            star.position.y = ship.position.y + Math.floor(Math.random() * (smallSphereRadius - (-smallSphereRadius)) - smallSphereRadius);
            star.position.z = ship.position.z + Math.floor(Math.random() * (smallSphereRadius - (-smallSphereRadius)) - smallSphereRadius);
        }
    }

}

//function to get the directionVector of a Mesh
function getMeshDirection(mesh) {

    //Default Front-Facing
    var dir = new THREE.Vector3(0, 0, 1);
    //Apply rotation of Mesh
    dir.applyQuaternion(mesh.quaternion);

    return dir;
}*/

