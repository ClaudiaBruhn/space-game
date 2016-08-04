# Space Game

In dieser Gruppe soll ein 3D-Space-Shooter entwickelt werden, in dem der Spieler ein Raumschiff steuern und sich – ähnlich wie bei Asteroids – gegen Wellen verschiedener Feinde wehren muss, um dabei möglichst lange zu überleben.

Verschiedene Waffen und Waffenstärken sowie unterschiedliche Gegnertypen (z. B. unterschieden durch bewaffnet/unbewaffnet) sollen für Abwechslung und die Abgrenzung zu oben genanntem Spiel sorgen. Durch die drei Dimensionen ist es wichtig, auf unterschiedlichste Kollisionen und auf möglichst realistische Bewegungsmuster zu achten. Sollte das Grundgerüst einmal stehen, wären mögliche Erweiterungen z. B. ein Shop-System oder dynamische Spawns/Spawnpositionen.

Dieses Spiel wird in JavaScript mit three.js entwickelt. Teilweise wird auch mit Blender gearbeitet werden; diese Arbeit wird aber nicht im Vordergrund stehen. 


# How To

## Pull from git

Normalerweise sollte mit `git pull upstream dev` der neueste Stand gepullt werden.

Wollt ihr aber versuchen den Stand eines anderen bei euch einzupflegen, dann geht ihr folgendermaßen vor:

`git checkout -b testStuff dev`

-> Erstellt einen Branch mit dem Namen "testStuff" auf Basis eures dev-branches und wechselt in diesen.

`git pull https://github.com/GITHUBLOGIN/space-game.git BRANCH`

-> Pullt den Stand des anderen Nutzers mit dem Namen GITHUBLOGIN anhand dessen BRANCH-Branches in euren soeben erstellten Branch.

Hier könnt ihr nun tun und lassen was ihr wollt, ohne eure Code-Basis (bzw. die eures Gegenparts) zu verändern.

Seit ihr fertig, diese zu übernehmen und alles was ihr tun wolltet funktioniert nun, dann merged ihr die Veränderungen wieder in euren dev mit:

`git checkout dev`

`git merge testStuff`

Um den nun überflüssigen anderen Branch wieder zu entfernen gebt ihr dann noch `git branch -D testStuff` ein.

## Setting up a server

Um das Spiel zu starten muss ein HTTP-Server laufen:

1. im Basisordner des Projektes folgende Zeile in der Konsole ausführen (Python 2.7, sonst siehe unten!): `python -m SimpleHTTPServer 8080`
2. Webbrowser öffnen und folgende Adresse aufrufen: `http://localhost:8080`
3. Läuft!
4. Server beenden mit `Strg+C` in der Konsole

Alternativ: Skript benutzen

1. (einmalig) Ausführberechtigungen für das Skript: `chmod +x start_server`
2. im Basisordner Skript ausführen mit `./start_server`
3. ... wie oben

Befehl für Python 3.x:

`python3 -m http.server`


## Use the repositories structure

`app/` ist der **Hauptordner**, in dem sich das Spiel befindet

`app/game.html` und `app/core.js` sind die **Hauptdateien des Spiels** (bislang mit Beispielcode)

`res/` ist der **Resourcenordner** für statische Files (CSS-Stylesheets, Texturen, Sounds, ...) und 3rd Party Plugins für Javascript
 
`index.html` ist die Website mit dem **Hauptmenü**


also: Sachen mit Three.js werden in `app/core.js` programmiert  




## Präsentation mit Google Documents

Hier nochmal der öffentliche Link für alle als Schnellzugriff : 

`https://docs.google.com/presentation/d/15jw0dD_tXASoDftU6TKWNFPWwzB60vHCI_PKZc9N6iQ/edit?usp=sharing`


Im Ordner **PowerPoint** in unserem Repo habt ihr die Möglichkeit Ressourcen für die Präsentation aufzubewahren. 

