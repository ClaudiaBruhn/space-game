function StarfieldParticleRenderer() {

    var startVector = new THREE.Vector3(0, 0, 0);
    var nebulaGeometry, nebulaTexture, nebula;
    var nebulas = []; 
    this.material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 2,
        map: fileLoader.get("particle"),
        blending: THREE.AdditiveBlending,
        transparent: true
    });
    this.particleCount = 5000;
    this.fieldSize = 2000;
    this.particles = new THREE.Geometry();

    nebulaGeometry = fileLoader.get("spacenebula_red_3D");
    nebulaTexture = fileLoader.get("nebula_red");
    nebula = new THREE.Mesh(nebulaGeometry,   new THREE.MeshBasicMaterial({ map: nebulaTexture, culling: THREE.DoubleSide }));
   nebula.position.set( new THREE.Vector3(
            startVector.x,
            startVector.y ,
            startVector.z
        ));

   nebula.scale.x = nebula.scale.y = nebula.scale.z = 150; 

    nebulas.push (nebula); 
    scene.add(nebula); 

    for (var p = 0; p < this.particleCount; p++) {
        var particle = new THREE.Vector3(
            startVector.x+(Math.random()-0.5)*this.fieldSize,
            startVector.y+(Math.random()-0.5)*this.fieldSize,
            startVector.z+(Math.random()-0.5)*this.fieldSize
        );
        this.particles.vertices.push(particle);
    }
    this.particleSystem = new THREE.Points(this.particles, this.material);
    scene.add(this.particleSystem);
    
    

    this.update = function() {

        var distance = startVector.distanceTo(ship.position);
        if (distance > this.fieldSize/3) {
            startVector = ship.position.clone();

            scene.remove(this.particleSystem);
            this.particles = new THREE.Geometry();
            for (var p = 0; p < this.particleCount; p++) {
                var particle = new THREE.Vector3(
                    startVector.x+(Math.random()-0.5)*this.fieldSize,
                    startVector.y+(Math.random()-0.5)*this.fieldSize,
                    startVector.z+(Math.random()-0.5)*this.fieldSize
                );
                this.particles.vertices.push(particle);
            }
            this.particleSystem = new THREE.Points(this.particles, this.material);
            scene.add(this.particleSystem);


        }

    }

}