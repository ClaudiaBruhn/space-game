// HTML Container
var container;

// THREE.js & Grafik
var camera, scene, renderer, clock, delta;
var frames = 0;
var fps = 30;
var now;
var then = Date.now();
var interval = 1000 / fps;

// Module
var fileLoader;
var interface;
var crosshair;
var ship;
var player;
var movement;
var particleHandler;
var collision;
var stats;
var network;
var starfield;
var world;

// Moved here bc pretty much every file uses it
var biggerSphereRadius = 5000;
var biggerSphere = new THREE.Object3D(
    new THREE.SphereGeometry(biggerSphereRadius, 200, 200),
    new THREE.MeshBasicMaterial({transparent: true})
    );

// TODO: eigentlich in Interface
var scoreValues = {
    "itemCollected": 10,
    "enemyDestroyed": 50,
    "asteroidDestroyed": 20
};

// Postprocessing
var composer, glitchPass, glitchPassEnabled;


// Document Ready Function
$(function () {

    // wird ausgeführt, wenn das Dokument geladen ist:

    // Module initialisieren
    network = Network();
    fileLoader = FileLoader();
    LoadingScreen();
    interface = Interface();
    collision = Collision();
    particleHandler = ParticleHandler();


    // alle 50ms prüfen, ob alle Files geladen sind
    var loadingLoop = setInterval(function () {
        if (fileLoader.isReady()) {
            clearInterval(loadingLoop);

            // FileLoader ist fertig, Spiel starten
            init();
            cameraAnimate();
        }
    }, 50);

});


function init() {

    /********** THREE.js initialisieren **********/

    container = document.createElement('div');
    document.body.appendChild(container);

    scene = new THREE.Scene();

    clock = new THREE.Clock();

    /********** Szene füllen **********/

    var light, object;

    scene.add(new THREE.AmbientLight(0x404040));
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 1, 0);
    scene.add(light);

    object = new THREE.AxisHelper(100);
    object.position.set(0, 0, 0);
    scene.add(object);

    /********** Module laden **********/

    player = Player();
    player.init();

/*    world = World();
    world.init();*/

    starfield = new StarfieldParticleRenderer();

    bot = Bot();
    bot.initAI(1);

    movement = Movement();
    movement.init();

    interface.init();

    crosshair = new Crosshairs();
    crosshair.init();

    initializeWeapons();

    stats = new Stats();

    /********** Camera **********/

    camera = new THREE.TargetCamera(75, window.innerWidth / window.innerHeight, 1, biggerSphereRadius);

    camera.addTarget({
        name: 'Target',
        targetObject: ship,
        cameraPosition: new THREE.Vector3(0, 15, 30),
        fixed: false,
        stiffness: 0.15,
        matchRotation: false
    });

    camera.addTarget({
        name: 'Cockpit',
        targetObject: ship,
        cameraPosition: new THREE.Vector3(0, 0, -10),
        fixed: false,
        stiffness: 1,
        matchRotation: true
    });

    camera.addTarget({
        name: 'fTarget',
        targetObject: ship,
        cameraPosition: new THREE.Vector3(0, -1, 40),
        fixed: false,
        stiffness: 0.15,
        matchRotation: false
    });

    camera.addTarget({
        name: 'animation',
       	targetObject: ship,
        cameraPosition: targetPosition ,
        fixed: false,
        stiffness: 0.001,
        matchRotation: false
    });


    var cam = Camera();
    cam.init();

    camera.setTarget('Target');


    /********** Renderer & Post Processing **********/

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.sortObjects = false;

    composer = new THREE.EffectComposer(renderer);
    composer.addPass(new THREE.RenderPass(scene, camera));

    glitchPass = new THREE.GlitchPass();
    glitchPass.renderToScreen = true;
    // TODO: Still needed?
    // glitchPass.goWild = true;
    composer.addPass(glitchPass);

    glitchPassEnabled = false;


    /********** Input **********/

    // Szene in DOM einsetzen
    container.appendChild(renderer.domElement);
    // Event-Listener
    window.addEventListener('resize', onWindowResize, false);


}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

function cameraAnimate() {

    if (frames < 25) {
        frames++;
        requestAnimationFrame(cameraAnimate);
    } else {

        requestAnimationFrame(animate);
    }

    delta = clock.getDelta();
    movement.move(delta);
    camera.update();
    renderer.render(scene, camera);

}


function glitchScreen(duration) {

    glitchPassEnabled = true;
    setTimeout(function () {
        glitchPassEnabled = false;
    }, duration);

}


function animate() {

    // dont touch!
    requestAnimationFrame(animate);
    now = Date.now();
    delta = now - then;
    if (delta > interval) {
        then = now - (delta % interval);
        render();
    }

}

function render() {

    stats.update();
    delta = clock.getDelta();
    if (!Pause) {
        // animation code goes here:

        movement.move(delta);

        renderWeapons();
        bot.updateAI(delta);
        updatePowerUps();
        handleCollision();

        // Partikeleffekte am Raumschiff updaten
        player.updateParticleValues();

        // Explosionen updaten
        particleHandler.update();

        // Sternenstaub bewegen
        if (starfield !== undefined) starfield.update();

        //play music
        backgroundMusic.play();
    }

    camera.update();

    if (glitchPassEnabled) {
        composer.render();
    } else {
        renderer.render(scene, camera);
    }

}
