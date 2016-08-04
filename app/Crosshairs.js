var cross1, cross2, cross3, cross4, cross5, cross6, cross7, cross8, cross9, cross10, cross11, cross12, cross13, cross14, cross15, cross16;
var crosses = [];
var pos = 0;
var old = 0;
function Crosshairs() {

    return {

        init: function () {

            var mapA = fileLoader.get("Crosshair1");

            var materialA = new THREE.SpriteMaterial({ map: mapA });

            cross1 = new THREE.Sprite(materialA);
            cross1.position.set(0, 10, -40);
            cross1.scale.set(6.0, 6.0, 1.0);
            cross1.visible = false;
            crosses.push(cross1);


            mapA = fileLoader.get("Crosshair2");

            materialA = new THREE.SpriteMaterial({ map: mapA });

            cross2 = new THREE.Sprite(materialA);
            cross2.position.set(0, 10, -40);
            cross2.scale.set(6.0, 6.0, 1.0);
            cross2.visible = false;
            crosses.push(cross2);

            mapA = fileLoader.get("Crosshair3");

            materialA = new THREE.SpriteMaterial({ map: mapA });

            cross3 = new THREE.Sprite(materialA);
            cross3.position.set(0, 10, -40);
            cross3.scale.set(6.0, 6.0, 1.0);
            cross3.visible = false;
            crosses.push(cross3);

            mapA = fileLoader.get("Crosshair4");

            materialA = new THREE.SpriteMaterial({ map: mapA });

            cross4 = new THREE.Sprite(materialA);
            cross4.position.set(0, 10, -40);
            cross4.scale.set(6.0, 6.0, 1.0);
            cross4.visible = false;
            crosses.push(cross4);

            mapA = fileLoader.get("Crosshair5");

            materialA = new THREE.SpriteMaterial({ map: mapA });

            cross5 = new THREE.Sprite(materialA);
            cross5.position.set(0, 10, -40);
            cross5.scale.set(6.0, 6.0, 1.0);
            cross5.visible = false;
            crosses.push(cross5);

            mapA = fileLoader.get("Crosshair6");

            materialA = new THREE.SpriteMaterial({ map: mapA });

            cross6 = new THREE.Sprite(materialA);
            cross6.position.set(0, 10, -40);
            cross6.scale.set(6.0, 6.0, 1.0);
            cross6.visible = false;
            crosses.push(cross6);

            mapA = fileLoader.get("Crosshair7");

            materialA = new THREE.SpriteMaterial({ map: mapA });

            cross7 = new THREE.Sprite(materialA);
            cross7.position.set(0, 10, -40);
            cross7.scale.set(6.0, 6.0, 1.0);
            cross7.visible = false;
            crosses.push(cross7);

            mapA = fileLoader.get("Crosshair8");

            materialA = new THREE.SpriteMaterial({ map: mapA });

            cross8 = new THREE.Sprite(materialA);
            cross8.position.set(0, 10, -40);
            cross8.scale.set(6.0, 6.0, 1.0);
            cross8.visible = false;
            crosses.push(cross8);

            mapA = fileLoader.get("Crosshair9");

            materialA = new THREE.SpriteMaterial({ map: mapA });

            cross9 = new THREE.Sprite(materialA);
            cross9.position.set(0, 10, -40);
            cross9.scale.set(6.0, 6.0, 1.0);
            cross9.visible = false;
            crosses.push(cross9);

            mapA = fileLoader.get("Crosshair10");

            materialA = new THREE.SpriteMaterial({ map: mapA });

            cross10 = new THREE.Sprite(materialA);
            cross10.position.set(0, 10, -40);
            cross10.scale.set(6.0, 6.0, 1.0);
            cross10.visible = false;
            crosses.push(cross10);

            mapA = fileLoader.get("Crosshair11");

            materialA = new THREE.SpriteMaterial({ map: mapA });

            cross11 = new THREE.Sprite(materialA);
            cross11.position.set(0, 10, -40);
            cross11.scale.set(6.0, 6.0, 1.0);
            cross11.visible = false;
            crosses.push(cross11);

            mapA = fileLoader.get("Crosshair12");

            materialA = new THREE.SpriteMaterial({ map: mapA });

            cross12 = new THREE.Sprite(materialA);
            cross12.position.set(0, 10, -40);
            cross12.scale.set(6.0, 6.0, 1.0);
            cross12.visible = false;
            crosses.push(cross12);

            mapA = fileLoader.get("Crosshair13");

            materialA = new THREE.SpriteMaterial({ map: mapA });

            cross13 = new THREE.Sprite(materialA);
            cross13.position.set(0, 10, -40);
            cross13.scale.set(6.0, 6.0, 1.0);
            cross13.visible = false;
            crosses.push(cross13);

            mapA = fileLoader.get("Crosshair14");

            materialA = new THREE.SpriteMaterial({ map: mapA });

            cross14 = new THREE.Sprite(materialA);
            cross14.position.set(0, 10, -40);
            cross14.scale.set(6.0, 6.0, 1.0);
            cross14.visible = false;
            crosses.push(cross14);

            mapA = fileLoader.get("Crosshair15");

            materialA = new THREE.SpriteMaterial({ map: mapA });

            cross15 = new THREE.Sprite(materialA);
            cross15.position.set(0, 10, -40);
            cross15.scale.set(6.0, 6.0, 1.0);
            cross15.visible = false;
            crosses.push(cross15);

            mapA = fileLoader.get("Crosshair16");

            materialA = new THREE.SpriteMaterial({ map: mapA });

            cross16 = new THREE.Sprite(materialA);
            cross16.position.set(0, 10, -40);
            cross16.scale.set(6.0, 6.0, 1.0);
            cross16.visible = false;
            crosses.push(cross16);
			
			mapA = fileLoader.get("Crosshair17");

            materialA = new THREE.SpriteMaterial({ map: mapA });

            cross17 = new THREE.Sprite(materialA);
            cross17.position.set(0, 10, -40);
            cross17.scale.set(6.0, 6.0, 1.0);
            cross17.visible = false;
            crosses.push(cross17);

            cross1.visible = true;
            ship.add(cross1);

        },

        switch: function () {
            if (pos == crosses.length - 1) {
                old = crosses.length - 1;
                pos = 0;
            }
            else {
                old = pos;
                pos++;
            }
            if (isFirstPerson) {
                crosses[pos].position.set(0, 0, -40);
            }
            else {
                crosses[pos].position.set(0, 10, -40);
            }
            crosses[old].visible = false;
            ship.remove(crosses[old]);
            ship.add(crosses[pos]);
            crosses[pos].visible = true;

        }

    }

}

function switchCross(neuPos){
      old=pos;
      pos=neuPos;

      crosses[pos].position.set(0,10,-40);
      crosses[old].visible = false;
      ship.remove(crosses[old]);
      ship.add(crosses[pos]);
      crosses[pos].visible = true;
      checkActiveCross();
}