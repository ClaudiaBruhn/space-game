var ship, frontVector, backVector, directionVector;
var hitBoxCenter, hitBoxLeftWing, hitBoxRightWing;
var playerHitBoxes = [];

var cross;



frontVector = new THREE.Vector3(0, 0, 0);

backVector = new THREE.Vector3(0, 0, 0);
directionVector = new THREE.Vector3(0, 0, 0);


var shield, shieldGeometry, shieldTex, shieldMaterial, rotClock;
var barrelRoll;
var action = {};
var leftWingRot;
var rightWingRot;


function Player() {

    var startVector = new THREE.Vector3(0, 0, 0);
    var endVector = new THREE.Vector3(0, 0, 0);
    var particleRay;


    function createRay() {
        particleRay = new RayParticleRenderer(0x2255ff, 100, fileLoader.get("particle"), startVector, endVector);
    }
    createRay();

    // TODO: auslagern in Mathe-Klasse
    function getOrthognalVector(vector1, vector2) {
        var v1 = vector1.clone();
        var v2 = vector2.clone();
        return new THREE.Vector3().crossVectors(v1, v2);
    }

    return {

        playerHitByAsteroid: function (indexAsteroid, collisionSide) {

            var rotCount = 0;

            switch (collisionSide) {

                    //CenterBox
                    case 0:
                    console.log("CenterWing");
                    if (yAxis < 0 && yAxis >= -6) {



                    } else if (yAxis < -6) {

                            //Schleudere nach hinten
                            var interval = setInterval(function () {

                                lat -= 100;
                                yAxis = 5;
                                setSpeed(yAxis);
                                rotCount += 2;
                               


                                if (rotCount > 10) {

                                    clearInterval(interval);
                                }



                            }, 100);

                            changeHP(-10);

                        }

                    break;

                    //LeftWing
                    case 1:
                    console.log("LinkerWing");
                    if (yAxis < 0 && yAxis >= -6) {

                        changeHP(-1);



                    } else if (yAxis < -6 && yAxis >= -14) {
                        var oldRotX = 0;
                        oldRotX = ship.rotation.x;




                        var interval = setInterval(function () {

                            lon += 100;
                            yAxis = -1;
                            setSpeed(yAxis);
                            rotCount += 2;
                            if (rotCount > 10) {

                                clearInterval(interval);
                            }

                        }, 100);

                        changeHP(-1);

                    }
                    break;


                    //rightWing
                    case 2:
                    console.log("RechterWing");
                    if (yAxis < 0 && yAxis >= -6) {


                        changeHP(-10);

                    } else if (yAxis < -6 && yAxis >= -14) {
                        var oldRotX = 0;
                        oldRotX = ship.rotation.x;

                        var interval = setInterval(function () {

                            lon -= 100;
                            yAxis = -1;
                            setSpeed(yAxis);
                            rotCount += 2;
                            if (rotCount > 10) {

                                clearInterval(interval);
                            }


                        }, 100);

                        changeHP(-10);

                    }

                    break;

                }

            },

            init: function () {

                // Ship erstellen
                var multiMaterial = new THREE.MultiMaterial(shipData.materials);            
                for (var i = 0; i < multiMaterial.materials.length; i++) {
                    multiMaterial.materials[i].skinning = true;
                    multiMaterial.materials[i].map = fileLoader.get("TextureHero");         
                }
                multiMaterial.skinning = true;
                ship = new THREE.SkinnedMesh(shipData.geometry, multiMaterial);

                ship.position.set(0, 0, 0);
                scene.add(ship);

                leftWingRot = ship.skeleton.bones[1].rotation.y;
                rightWingRot = ship.skeleton.bones[2].rotation.y;

                var hitBoxCenterGeometry = new THREE.BoxGeometry(5, 2, 20);
                var hitBoxMaterial = new THREE.MeshBasicMaterial({ transparent:true, color: 0xffff00 });
                hitBoxCenter = new THREE.Mesh(hitBoxCenterGeometry, hitBoxMaterial);

                var hitBoxWingGeometry = new THREE.BoxGeometry(10, 2, 5);
                hitBoxLeftWing = new THREE.Mesh(hitBoxWingGeometry, hitBoxMaterial);
                hitBoxLeftWing.position.x = -5;

                hitBoxRightWing = new THREE.Mesh(hitBoxWingGeometry, hitBoxMaterial);
                hitBoxRightWing.position.x = 5;

                playerHitBoxes.push(hitBoxCenter);
                playerHitBoxes.push(hitBoxLeftWing);
                playerHitBoxes.push(hitBoxRightWing);
            },

            updateParticleValues: function () {
                particleRay.reset();

                // Schiffsposition und Richtingsvektor bestimmen
                var pos = ship.position;
                var dirVector = new THREE.Vector3(0, 0, 1);
                dirVector.applyQuaternion(ship.quaternion);

                // Seitenvektoren bestimmen
                var matrix = new THREE.Matrix4();
                matrix.extractRotation(ship.matrix);
                var upVector = new THREE.Vector3(0, 1, 0);
                upVector.applyMatrix4(matrix);
                var leftVector = getOrthognalVector(dirVector, upVector);
                var rightVector = leftVector.clone().multiplyScalar(-1);

                // Relative Geschwindigkeit des Schiffes
                var relativeSpeed = (-yAxis - 2) / maxVel;

                var startScale = 6 - relativeSpeed * 3;
                // Vector berechnen, auf dem sich der Partikelstrahl bewegen soll
                startVector = new THREE.Vector3(
                    pos.x + startScale * dirVector.x,
                    pos.y + startScale * dirVector.y,
                    pos.z + startScale * dirVector.z
                    );
                var endScale = 12;
                endVector = new THREE.Vector3(
                    pos.x + endScale * dirVector.x,
                    pos.y + endScale * dirVector.y,
                    pos.z + endScale * dirVector.z
                    );

                // Bewegung zur Seite anpassen
                if (moveLeft) {
                    startVector.addScaledVector(leftVector, 2);
                } else if (moveRight) {
                    startVector.addScaledVector(rightVector, 2);
                }

                // Partikel updaten
                createRay();
                particleRay.update();
            },

            updateSpaceshipAnimation: function () {

                var tempo = document.getElementById('speedValue');
                if(tempo.innerHTML >= 200){

                    if(ship.skeleton.bones[1].rotation.y < 1.75){

                        ship.skeleton.bones[1].rotation.y += 0.01 ;
                    }
                    if(ship.skeleton.bones[2].rotation.y > -1.75){    
                        ship.skeleton.bones[2].rotation.y += -0.01;
                    }
                }
                if(tempo.innerHTML < 200){

                    if(ship.skeleton.bones[1].rotation.y > leftWingRot){

                        ship.skeleton.bones[1].rotation.y -= 0.01 ;
                    }
                    if(ship.skeleton.bones[2].rotation.y < rightWingRot){    

                        ship.skeleton.bones[2].rotation.y -= -0.01;
                    }

                }

            // update code (neccessary & important!)
            for (var i = 0; i < ship.skeleton.bones.length; i++) {
                ship.skeleton.bones[i].matrixAutoUpdate = true;
                ship.skeleton.bones[i].matrixWorldNeedsUpdate = true;
            }
            ship.geometry.verticesNeedUpdate = true;
            ship.geometry.normalsNeedUpdate = true;
        },


        activateShield: function () {

            if (shield !== undefined) {
                scene.remove(shield);
                shield = undefined;
            }

            shieldGeometry = fileLoader.get("Kugelschild");
            shieldTex = fileLoader.get("KugelschildTex");

            shield = new THREE.Mesh(shieldGeometry, new THREE.MeshPhongMaterial({ map: shieldTex, transparent: true, opacity: 0.4 }));
            shield.scale.x = shield.scale.y = shield.scale.z = 0.01;
            shield.position.set(ship.position.x, ship.position.y, ship.position.z);
            scene.add(shield);

            var scalingShield = 0.01
            var interval = setInterval(function () {

                            shield.scale.x = shield.scale.y = shield.scale.z = scalingShield;
                            scalingShield += 0.01;
                            if (scalingShield > 1) {

                                clearInterval(interval);
                            }


                        }, 20);

        },

        doABarrelRoll: function(){

            if(barrelRoll == true) {

                ship.skeleton.bones[0].rotation.z += 0.2;



                for (var i = 0; i < ship.skeleton.bones.length; i++) {
                    ship.skeleton.bones[i].matrixAutoUpdate = true;
                    ship.skeleton.bones[i].matrixWorldNeedsUpdate = true;
                }
                ship.geometry.verticesNeedUpdate = true;
                ship.geometry.normalsNeedUpdate = true;

                barrelRoll = false;
                if(ship.skeleton.bones[0].rotation.z < 6.28){
                 barrelRoll = true;
             }
             else{ ship.skeleton.bones[0].rotation.z = 0.0}
         }

 }

};

};
