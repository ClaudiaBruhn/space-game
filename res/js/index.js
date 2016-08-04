var camera, scene, renderer;

var spaceshipGroup, sphere, planet;

var rayParticleRenderer, rayStart, rayEnd;

var fileLoader = FileLoader(false);
var network = Network();



$(function () {

    // Background Music
    backgroundMusic = document.createElement('audio');
    var backgroundMusicSource = document.createElement('source');
    backgroundMusicSource.src = '../res/sounds/soundtrackMenu.mp3';
    backgroundMusic.appendChild(backgroundMusicSource);
    backgroundMusic.play();

    var container;
    var tick;
    var clock = new THREE.Clock(true);

    // start
    setTimeout(function() {
        var loadingLoop = setInterval(function() {
            console.log("loading");
            if (fileLoader.isReady()) {
                console.log("done");
                clearInterval(loadingLoop);
                loadHighscore();
                init();
                fadeOutLoadingOverlay();
                animate();
            }
        }, 50);
    }, 1500);

    function init() {

        // HTML-Container erzeugen
        container = document.createElement('div');
        document.body.appendChild(container);

        // Kamera und Szene erzeugen
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.0009);
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
        camera.position.set(12, 15, -20);
        camera.lookAt(scene.position);

        // Renderer
        renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // Licht
        var light = new THREE.DirectionalLight(0xffffff);
        light.position.set(3, 6, 0);
        scene.add(light);

        // lens flares
        var dirLight = new THREE.DirectionalLight( 0xffffff, 0.05 );
        dirLight.position.set( 5, 5, 5 );
        dirLight.color.setHSL( 0.1, 0.7, 0.5 );
        scene.add( dirLight );

        var textureLensflare1 = fileLoader.get("lensflare1");
        var textureLensflare2 = fileLoader.get("lensflare2");
        var textureLensflare3 = fileLoader.get("lensflare3");

        var pointLight = new THREE.PointLight( 0xffffff, 1.5, 2000 );
        pointLight.color.setHSL( 32/255, 1, 0.5 );
        pointLight.position.set( 5, 5, 5 );
        scene.add( pointLight );

        var flareColor = new THREE.Color( 0xffffff );
        flareColor.setHSL( 0.55, 0.9, 1);
        var lensFlare = new THREE.LensFlare(textureLensflare1, 700, 0.0, THREE.AdditiveBlending, flareColor );

        lensFlare.add( textureLensflare2, 512, 0.0, THREE.AdditiveBlending );
        lensFlare.add( textureLensflare2, 512, 0.0, THREE.AdditiveBlending );
        lensFlare.add( textureLensflare2, 512, 0.0, THREE.AdditiveBlending );

        lensFlare.add( textureLensflare3, 60, 0.6, THREE.AdditiveBlending );
        lensFlare.add( textureLensflare3, 70, 0.7, THREE.AdditiveBlending );
        lensFlare.add( textureLensflare3, 120, 0.9, THREE.AdditiveBlending );
        lensFlare.add( textureLensflare3, 70, 1.0, THREE.AdditiveBlending );

        lensFlare.position.copy( pointLight.position );

        scene.add( lensFlare );


        // Skybox
        var geometrySkysphere = new THREE.SphereGeometry(1000, 256, 256);
        var materialSkysphere = new THREE.MeshBasicMaterial({
            map: fileLoader.get("sky_sphere_map"),
            side: THREE.DoubleSide
        });
        sphere = new THREE.Mesh(geometrySkysphere, materialSkysphere);
        scene.add(sphere);

        // Planet
        var geometryPlanet = new THREE.SphereGeometry(100, 128, 128);
        var materialPlanet = new THREE.MeshPhongMaterial({
            map: fileLoader.get("Planet"),
            side: THREE.DoubleSide
        });
        planet = new THREE.Mesh(geometryPlanet, materialPlanet);
        planet.position.set(-500, -500, 300);
        planet.rotateZ(0.5);
        planet.castShadow = true;
        scene.add(planet);

        // Spaceship Group (= space ship + particle ray)
        var modelShip = fileLoader.get("HeroShipV6");
        var textureShip = fileLoader.get("TextureHero");
        var spaceship = new THREE.Mesh(modelShip, new THREE.MeshPhongMaterial({map:textureShip}));
        spaceship.position.set(0, 0, 0);
        spaceship.rotateY(-1.571);

        var sphereGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        var materialBasic =  new THREE.MeshBasicMaterial();

        rayStart = new THREE.Mesh(sphereGeometry, materialBasic);
        rayStart.translateX(-5);
        rayStart.visible = false;

        rayEnd = new THREE.Mesh(sphereGeometry, materialBasic);
        rayEnd.translateX(-8);
        rayEnd.visible = false;

        spaceshipGroup = new THREE.Group();
        spaceshipGroup.add(spaceship);
        spaceshipGroup.add(rayStart);
        spaceshipGroup.add(rayEnd);
        scene.add(spaceshipGroup);

        rayParticleRenderer = new RayParticleRenderer(
            0x2255ff,1000, fileLoader.get("particle"), rayStart.position, rayEnd.position, 0.2
        );


        // Event-Listener
        window.addEventListener("resize", onWindowResize, false);
        window.addEventListener("mousemove", onMouseMove, false);

        // Klick auf Spiel starten: player speichern
        $("#formSubmit").on("click", function (e) {
            localStorage.setItem("player", $("#player").val());
        });
		
        $("#formTutorial").on("click", function () {
            $("#tutorialClose").show();
            $("#loading-message").hide();
            $("#loading-overlay").fadeIn();
        });
        
        $("#tutorialClose").on("click", function () {
            $("#loading-overlay").fadeOut();   
        });
    }
    


    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onMouseMove(e) {
        if (e.isTrusted) {
            var x = Math.abs(e.clientX/window.innerWidth)-0.5;
            var y = Math.abs(e.clientY/window.innerHeight)-0.5;
            //console.log(x+"/"+y);

            var scaling = 20;
            $("#overlay-highscore").css("margin-right", 50+x*scaling+"px");
            $("#overlay-highscore").css("padding-top", 50-y*scaling+"px");
            $("#overlay-menu").css("margin-left", 50-x*scaling+"px");
            $("#overlay-menu").css("padding-top", 50-y*scaling+"px");
        }
    }

    function loadHighscore() {
        network.loadTop10(function (highscore) {
            for (var i = 0; i < highscore.length; i++) {
                var score = highscore[i];
                var tableTag =
                    "<div class='row highscore-body'>" +
                        "<div class='col-md-2'>"+(i+1)+"</div>" +
                        "<div class='col-md-4'>"+score.player+"</div>" +
                        "<div class='col-md-2'>"+score.level+"</div>" +
                        "<div class='col-md-3'>"+score.score+"</div>" +
                    "</div>";
                $("#overlay-highscore").html($("#overlay-highscore").html()+tableTag);
                //console.log("append");
            }
        });
    }


    function animate() {
        requestAnimationFrame(animate);
        render();

        // animation goes here
        moveSpaceship();
        backgroundMusic.play();
    }


    function render() {
        // dont touch!
        renderer.render(scene, camera);

    }

    function fadeOutLoadingOverlay() {
        setTimeout(function() {
            $("#loading-overlay").fadeOut('slow');
        }, 1000);
    }

    function moveSpaceship() {
        if (spaceshipGroup !== undefined && rayParticleRenderer !== undefined) {

            var time = new Date().getTime() * 0.0005;

            spaceshipGroup.position.set(
                -Math.sin(time) + Math.pow(Math.cos(time), 2),
                -Math.pow(Math.abs(Math.cos(time)) * 0.5, 2),
                Math.sin(time)
            );

            var angle = -Math.sin(time) * 0.0015;
            spaceshipGroup.rotateX(angle);
            spaceshipGroup.rotateZ(angle * 0.1);

            var newStart = new THREE.Vector3(
                spaceshipGroup.position.x+rayStart.position.x,
                spaceshipGroup.position.y+rayStart.position.y,
                spaceshipGroup.position.z+rayStart.position.z
            );
            var newEnd = new THREE.Vector3(
                spaceshipGroup.position.x+rayEnd.position.x,
                spaceshipGroup.position.y+rayEnd.position.y,
                spaceshipGroup.position.z+rayEnd.position.z
            );

            
            rayParticleRenderer.updateStartAndEndpoint(newStart, newEnd);
            rayParticleRenderer.update();
        }

        if (planet !== undefined) {
            planet.rotateX(0.0002);
            planet.rotateY(0.0002);
        }

    }


});