//Audio-Variables
var laserAudio;
var rocketAudio;
var explosionAudio;
var MGAudio;
var powerUpAudioSource;
var powerUpAudio;
var asteroidAudio;
var asteroidLowAudio;
var gameOverAudio;
var shockwaveAudio;
var backgroundMusic;
var powerUpSoundtrackAudio;
var shipData = {};

var FileLoader = function (full) {

    if (full === undefined) full = true;

    console.log("FileLoader running ...");

    /************************* Get all files to load *************************/

    var files = [
        /************************* Texturen *************************/
        "../res/textures/AsteroidTex.jpg",
        "../res/textures/Boss_Bright.jpg",
        "../res/textures/Boss_Textures_Combined_V1.jpg",
        "../res/textures/Coin_Texture.jpg",
        "../res/textures/Crosshair1.png",
        "../res/textures/Crosshair2.png",
        "../res/textures/Crosshair3.png",
        "../res/textures/Crosshair4.png",
        "../res/textures/Crosshair5.png",
        "../res/textures/Crosshair6.png",
        "../res/textures/Crosshair7.png",
        "../res/textures/Crosshair8.png",
        "../res/textures/Crosshair9.png",
        "../res/textures/Crosshair10.png",
        "../res/textures/Crosshair11.png",
        "../res/textures/Crosshair12.png",
        "../res/textures/Crosshair13.png",
        "../res/textures/Crosshair14.png",
        "../res/textures/Crosshair15.png",
        "../res/textures/Crosshair16.png",
		"../res/textures/Crosshair17.png",
        "../res/textures/eso_dark.jpg",
        "../res/textures/GeldsackFacePalmTex.jpg",
        "../res/textures/GeldsackTex.jpg",
        "../res/textures/KugelschildTex.png",
        "../res/textures/Laser_Triangle.jpg",
        "../res/textures/lensflare1.png",
        "../res/textures/lensflare2.png",
        "../res/textures/lensflare3.png",
        "../res/textures/MinigunAmmoUp.png",
        "../res/textures/MinishipTex.png",
        "../res/textures/particle.png",
        "../res/textures/particle_grey.png",
        "../res/textures/placeholder_background.jpg",
        "../res/textures/Planet.png",
        "../res/textures/PowerUpHealthBadTex.png",
        "../res/textures/PowerUpHealthTex.png",
        "../res/textures/PowerUpMinigunTex.png",
        "../res/textures/PowerUpMinigunDamageTex.png",
        "../res/textures/PowerUpRocket2BadTex.png",
        "../res/textures/PowerUpRocket2Tex.png",
        "../res/textures/PowerUpRocket4BadTex.png",
        "../res/textures/PowerUpRocket4Tex.png",
        "../res/textures/PowerUpRocket8BadTex.png",
        "../res/textures/PowerUpRocket8Tex.png",
        "../res/textures/PowerUpRocketBadTex.png",
        "../res/textures/PowerUpRocketTex.png",
        "../res/textures/PowerUpShieldBadTex.png",
        "../res/textures/PowerUpShieldTex.png",
        "../res/textures/RocketV2Tex.png",
        "../res/textures/sky_sphere_map.jpg",
        "../res/textures/sky_sphere_map2.png",
        "../res/textures/Spartan_Laser_Combined_V1.jpg",
        "../res/textures/tex.jpg",
        "../res/textures/TextureEnemyShipOne.png",
        "../res/textures/TextureHero.png",
        "../res/textures/VengeanceMaterial.png",
        "../res/img/nebula_red.jpeg",

        /************************* Meshes *************************/
        "../res/meshes/AsteroidV2.json",
        "../res/meshes/AsteroidV2Part1.json",
        "../res/meshes/AsteroidV2Part2.json",
        "../res/meshes/AsteroidV2Part3.json",
        "../res/meshes/Boss_Mothership_TITAN.json",
        "../res/meshes/BossCruiserV1.json",
        "../res/meshes/Coin.json",
        "../res/meshes/Coin3.json",
        "../res/meshes/EnemyShipOne.json",
        "../res/meshes/Geldsack.json",
        "../res/meshes/GeldsackFacePalm.json",
        "../res/meshes/HeroShipV6.json",
        "../res/meshes/Kugelschild.json",
        "../res/meshes/MiniEnemyShip.json",
        "../res/meshes/MinigunV2.json",
        "../res/meshes/PowerUpHealth.json",
        "../res/meshes/PowerUpLaser.json",
        "../res/meshes/PowerUpMinigun.json",
        "../res/meshes/PowerUpMinigun200.json",
        "../res/meshes/PowerUpMinigun400.json",
        "../res/meshes/PowerUpMinigun600.json",
        "../res/meshes/PowerUpMinigunDamage.json",
        "../res/meshes/PowerUpRocket.json",
        "../res/meshes/PowerUpRocket2.json",
        "../res/meshes/PowerUpRocket4.json",
        "../res/meshes/PowerUpRocket8.json",
        "../res/meshes/PowerUpShield.json",
        "../res/meshes/RocketV2.json",
        "../res/meshes/spacenebula_red_3D.json",
        "../res/meshes/PowerUpRocketDamage.json",
        "../res/meshes/PowerUp_Shockwave.json",
        "../res/meshes/PowerUp_ShockwaveDamageUp.json"
    ];

    if (!full) {
        files = [
            /************************* Texturen *************************/
            "../res/textures/lensflare1.png",
            "../res/textures/lensflare2.png",
            "../res/textures/lensflare3.png",
            "../res/textures/particle.png",
            "../res/textures/particle_grey.png",
            "../res/textures/Planet.png",
            "../res/textures/sky_sphere_map.jpg",
            "../res/textures/tex.jpg",
            "../res/textures/TextureHero.png",

            /************************* Meshes *************************/
            "../res/meshes/HeroShipV6.json"
        ];
    }

    // Key-Value-Store für die geladenen Dateien (Key: Name => Value: Inhalt)
    var loadedFiles = {};

    // Status des FileLoaders
    var filesSuccessfullyLoaded = 0;

    function loadJson(file, name) {
        var jsonLoader = new THREE.JSONLoader();
        jsonLoader.load(file,
            function (geometry) {
                // on success:
                loadedFiles[name] = geometry;
                filesSuccessfullyLoaded += 1;
            },
            // on progress
            function () { },
            // on error
            function () {
                console.log("FileLoader couldn't find file " + file);
            }
        );
    }

    function loadImage(file, name) {
        var textureLoader = new THREE.TextureLoader();
        textureLoader.setCrossOrigin('anonymous');
        // load texture
        textureLoader.load(file,
            // on load
            function (texture) {
                //console.log("got:"+name);
                loadedFiles[name] = texture;
                filesSuccessfullyLoaded += 1;
            },
            // on progress
            function () { },
            // on error
            function () {
                console.log("FileLoader couldn't find file " + file);
            }

        );
    }

    /************************* load Files *************************/

    for (var i = 0; i < files.length; i++) {
        var file = files[i];

        //console.log("looking for:"+file);

        var h = file.split("/");
        var name = h[h.length - 1].split(".")[0];
        var type = h[h.length - 1].split(".")[1];

        // abhängig vom Dateityp: korrekten Loader auswählen
        switch (type) {
            case "json":
                loadJson(file, name);
                break;
            case "png": // no break!
            case "jpg": // no break!
            case "jpeg":
                loadImage(file, name);
                break;
            default:
                console.log("Error: unknown file format: " + file);
        }
    }

    /************************* initialize Audio-files *************************/

    //Main-laser audio
    laserAudio = document.createElement('audio');
    var laserAudioSource = document.createElement('source');
    laserAudioSource.src = '../res/sounds/gun.wav';
    laserAudio.appendChild(laserAudioSource);

    //asteroid destruction audio
    asteroidAudio = document.createElement('audio');
    var asteroidAudioSource = document.createElement('source');
    asteroidAudioSource.src = '../res/sounds/asteroid.wav';
    asteroidAudio.appendChild(asteroidAudioSource);

    //asteroid destruction audio
    asteroidLowAudio = document.createElement('audio');
    var asteroidLowAudioSource = document.createElement('source');
    asteroidLowAudioSource.src = '../res/sounds/asteroidLow.wav';
    asteroidLowAudio.appendChild(asteroidLowAudioSource);

    //audio for powerup
    powerUpAudio = document.createElement('audio');
    powerUpAudioSource = document.createElement('source');
    powerUpAudioSource.src = '../res/sounds/powerup.wav';
    powerUpAudio.appendChild(powerUpAudioSource);

    //rocket audio
    rocketAudio = document.createElement('audio');
    var rocketAudioSource = document.createElement('source');
    rocketAudioSource.src = '../res/sounds/rocket.wav';
    rocketAudio.appendChild(rocketAudioSource);

    //explosion audio
    explosionAudio = document.createElement('audio');
    var explosionAudioSource = document.createElement('source');
    explosionAudioSource.src = '../res/sounds/explosion.wav';
    explosionAudio.appendChild(explosionAudioSource);

    //MG audio
    MGAudio = document.createElement('audio');
    var MGAudioSource = document.createElement('source');
    MGAudioSource.src = '../res/sounds/mg.wav';
    MGAudio.appendChild(MGAudioSource);
	
	//caching1 shop audio
    cachingAudio1 = document.createElement('audio');
    var cachingAudioSource1 = document.createElement('source');
    cachingAudioSource1.src = '../res/sounds/caching.wav';
    cachingAudio1.appendChild(cachingAudioSource1);
	
	//caching2 shop audio
    cachingAudio2 = document.createElement('audio');
    var cachingAudioSource2 = document.createElement('source');
    cachingAudioSource2.src = '../res/sounds/caching.wav';
    cachingAudio2.appendChild(cachingAudioSource2);
	
	//caching3 shop audio
    cachingAudio3 = document.createElement('audio');
    var cachingAudioSource3 = document.createElement('source');
    cachingAudioSource3.src = '../res/sounds/caching.wav';
    cachingAudio3.appendChild(cachingAudioSource3);
	
	//button hover audio
    buttonAudio1 = document.createElement('audio');
    var buttonAudioSource1 = document.createElement('source');
    buttonAudioSource1.src = '../res/sounds/button.wav';
    buttonAudio1.appendChild(buttonAudioSource1);
	
	buttonAudio2 = document.createElement('audio');
    var buttonAudioSource2 = document.createElement('source');
    buttonAudioSource2.src = '../res/sounds/button.wav';
    buttonAudio2.appendChild(buttonAudioSource2);
	
	//achievement audio
    achievementAudio = document.createElement('audio');
    var achievementAudioSrc = document.createElement('source');
    achievementAudioSrc.src = '../res/sounds/achievement.wav';
    achievementAudio.appendChild(achievementAudioSrc);

    //Game Over audio
    gameOverAudio = document.createElement('audio');
    var gameOverAudioSource = document.createElement('source');
    gameOverAudioSource.src = '../res/sounds/GameOver.wav';
    gameOverAudio.appendChild(gameOverAudioSource);

    //Shockwave audio
    shockwaveAudio = document.createElement('audio');
    var shockwaveAudioSource = document.createElement('source');
    shockwaveAudioSource.src = '../res/sounds/shockwave.wav';
    shockwaveAudio.appendChild(shockwaveAudioSource);

    // Background Music
    backgroundMusic = document.createElement('audio');
    var backgroundMusicSource = document.createElement('source');
    backgroundMusicSource.src = '../res/sounds/soundtrack.mp3';
    backgroundMusic.appendChild(backgroundMusicSource);

    // Soundtrack für die zeitlich begrenzen Powerups
    powerUpSoundtrackAudio = document.createElement('audio');
    var powerUpSoundtrackAudioSource = document.createElement('source');
    powerUpSoundtrackAudioSource.src = '../res/sounds/soundtrack_powerup.mp3';
    powerUpSoundtrackAudio.appendChild(powerUpSoundtrackAudioSource);

    /********** Player Ship laden (Workaround! TODO) **********/
    
    var shipDataLoader = new THREE.JSONLoader();
    shipDataLoader.load("../res/meshes/HeroShipV6.json", function(geometry, materials) {
        shipData.geometry = geometry;
        shipData.materials = materials;                 
    }
    );

    console.log("FileLoader done.");

    function isReady() {
        // gibt true zurück, wenn alle Files geladen wurden
    // TODO: Workaround für ShipData entfernen
        return (filesSuccessfullyLoaded == files.length) && (shipData.materials !== undefined && shipData.geometry !== undefined);
    }


    // "public" Methoden:
    return {
        isReady: isReady,
        getAll: function () {
            // gibt alle geladenen Dateien zurück
            return isReady() ? loadedFiles : undefined;
        },
        get: function (name) {
            var result = isReady() ? loadedFiles[name] : undefined;
            if (result == undefined) {
                console.log("FileLoader could not find texture '" + name + "'");
            }
            return result;
        }
    }
};
