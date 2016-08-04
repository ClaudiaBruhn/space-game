function ImplosionParticleRenderer(particleColor, nParticles, particleTexture, startVector, size) {

    this.startVector = startVector;
    this.particleCount = nParticles;
    this.color = particleColor;

    this.running = true;
    this.clock = new THREE.Clock();
    this.clock.start();

    this.particles = new THREE.Geometry();

    this.material = new THREE.PointsMaterial(
        {
            color: particleColor,
            size: size,
            map: particleTexture,
            blending: THREE.AdditiveBlending,
            transparent: true
        }
    );

    for (var p = 0; p < this.particleCount; p++) {
        var particle = new THREE.Vector3(
            startVector.x,
            startVector.y,
            startVector.z
        );

        var radius = 10;
        var lambda = Math.PI * 2 * Math.random();
        var angle = Math.PI * 2 * Math.random();

        particle.x += Math.cos(angle) * Math.cos(lambda) * radius;
        particle.y += Math.cos(angle) * Math.sin(lambda) * radius;
        particle.z += Math.sin(angle) * radius;


        particle.velocity = particle.clone().sub(startVector.clone());
        particle.velocity.x += Math.random();
        particle.velocity.y += Math.random();
        particle.velocity.z += Math.random();

        this.particles.vertices.push(particle);
    }

    this.particleimploSystem = new THREE.Points(this.particles, this.material);

    this.currentMovement = 1;

    // zur Szene hinzufügen
    scene.add(this.particleimploSystem);

    this.update = function () {

        if (this.running) {

            var pCount = this.particleCount;

            while (pCount--) {
                
                var particle = this.particles.vertices[pCount];

                particle.x += particle.velocity.x * this.currentMovement * 4;
                particle.y += particle.velocity.y * this.currentMovement * 4;
                particle.z += particle.velocity.z * this.currentMovement * 4;

                this.particleimploSystem.geometry.__dirtyVertices = true;
            }

            if (this.currentMovement > -1) {
                this.currentMovement -= 0.1;    
            } else if (this.currentMovement <= -1) {
                this.running = false;
            }

            this.particles.verticesNeedUpdate = true;

            // weitermachen
            return true;
        } else {
            scene.remove(this.particleimploSystem);
            return false; //aufhören
        }
    };

}