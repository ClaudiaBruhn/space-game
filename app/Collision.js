var Collision = function () {



    /************************* MIN AND MAX FUNCTIONS *************************/



    // Calculates the min x value of the vertices of a box
    function minX(box) {

        // array for x values
        var globalXs = [];
        // get the position of each vertex
        for (var vertexIndex = 0; vertexIndex < box.geometry.vertices.length; vertexIndex++) {
            // get the local position of the vertex
            var localVertex = box.geometry.vertices[vertexIndex].clone();
            // transform it into the global position
            var globalVertex = localVertex.applyMatrix4(box.matrix);
            // save x value
            globalXs.push(globalVertex.x);
        }
        // return the min
        return Math.min.apply(Math, globalXs);
    }

    // Calculates the max X value of the vertices of a box
    function maxX(box) {

        var globalXs = [];
        for (var vertexIndex = 0; vertexIndex < box.geometry.vertices.length; vertexIndex++) {
            var localVertex = box.geometry.vertices[vertexIndex].clone();
            var globalVertex = localVertex.applyMatrix4(box.matrix);
            globalXs.push(globalVertex.x);
        }
        return Math.max.apply(Math, globalXs);
    }

    // Calculates the min Y value of the vertices of a box
    function minY(box) {

        var globalYs = [];
        for (var vertexIndex = 0; vertexIndex < box.geometry.vertices.length; vertexIndex++) {
            var localVertex = box.geometry.vertices[vertexIndex].clone();
            var globalVertex = localVertex.applyMatrix4(box.matrix);
            globalYs.push(globalVertex.y);
        }
        return Math.min.apply(Math, globalYs);
    }

    // Calculates the max Y value of the vertices of a box
    function maxY(box) {

        var globalYs = [];
        for (var vertexIndex = 0; vertexIndex < box.geometry.vertices.length; vertexIndex++) {
            var localVertex = box.geometry.vertices[vertexIndex].clone();
            var globalVertex = localVertex.applyMatrix4(box.matrix);
            globalYs.push(globalVertex.y);
        }
        return Math.max.apply(Math, globalYs);
    }

    // Calculates the min Z value of the vertices of a box
    function minZ(box) {

        var globalZs = [];
        for (var vertexIndex = 0; vertexIndex < box.geometry.vertices.length; vertexIndex++) {
            var localVertex = box.geometry.vertices[vertexIndex].clone();
            var globalVertex = localVertex.applyMatrix4(box.matrix);
            globalZs.push(globalVertex.z);
        }
        return Math.min.apply(Math, globalZs);
    }

    // Calculates the max Z value of the vertices of a box
    function maxZ(box) {

        var globalZs = [];
        for (var vertexIndex = 0; vertexIndex < box.geometry.vertices.length; vertexIndex++) {
            var localVertex = box.geometry.vertices[vertexIndex].clone();
            var globalVertex = localVertex.applyMatrix4(box.matrix);
            globalZs.push(globalVertex.z);
        }
        return Math.max.apply(Math, globalZs);
    }

    // Calculates the min x value of the vertices of a box
    function minXship(box) {

        // array for x values
        var globalXs = [];
        // get the position of each vertex
        for (var vertexIndex = 0; vertexIndex < box.geometry.vertices.length; vertexIndex++) {
            globalXs.push(box.geometry.vertices[vertexIndex].x + ship.position.x);
        }
        // return the min
        return Math.min.apply(Math, globalXs);
    }

    // Calculates the max X value of the vertices of a box
    function maxXship(box) {

        var globalXs = [];
        for (var vertexIndex = 0; vertexIndex < box.geometry.vertices.length; vertexIndex++) {
            globalXs.push(box.geometry.vertices[vertexIndex].x + ship.position.x);
        }
        return Math.max.apply(Math, globalXs);
    }

    // Calculates the min Y value of the vertices of a box
    function minYship(box) {

        var globalYs = [];
        for (var vertexIndex = 0; vertexIndex < box.geometry.vertices.length; vertexIndex++) {
            globalYs.push(box.geometry.vertices[vertexIndex].y + ship.position.y);
        }
        return Math.min.apply(Math, globalYs);
    }

    // Calculates the max Y value of the vertices of a box
    function maxYship(box) {

        var globalYs = [];
        for (var vertexIndex = 0; vertexIndex < box.geometry.vertices.length; vertexIndex++) {
            globalYs.push(box.geometry.vertices[vertexIndex].y + ship.position.y);
        }
        return Math.max.apply(Math, globalYs);
    }

    // Calculates the min Z value of the vertices of a box
    function minZship(box) {

        var globalZs = [];
        for (var vertexIndex = 0; vertexIndex < box.geometry.vertices.length; vertexIndex++) {
            globalZs.push(box.geometry.vertices[vertexIndex].z + ship.position.z);
        }
        return Math.min.apply(Math, globalZs);
    }

    // Calculates the max Z value of the vertices of a box
    function maxZship(box) {

        var globalZs = [];
        for (var vertexIndex = 0; vertexIndex < box.geometry.vertices.length; vertexIndex++) {
            globalZs.push(box.geometry.vertices[vertexIndex].z + ship.position.z);
        }
        return Math.max.apply(Math, globalZs);
    }



    /************************* INTERSECTION FUNCTIONS *************************/



    // Checks if there is an intersection between two boxes
    function intersectBoxBox(a, b) {

        // if there is an intersection in every dimension the two boxes intersect
        return (minX(a) <= maxX(b) && maxX(a) >= minX(b) &&
            (minY(a) <= maxY(b) && maxY(a) >= minY(b)) &&
            (minZ(a) <= maxZ(b) && maxZ(a) >= minZ(b)))
    }

    // Checks if there is an intersection between two spheres
    function intersectSphereOther(sphere, other) {
        // distance between the center of the spheres
        var distance = Math.sqrt((sphere.position.x - other.position.x) *
            (sphere.position.x - other.position.x) +
            (sphere.position.y - other.position.y) * (sphere.position.y - other.position.y) +
            (sphere.position.z - other.position.z) * (sphere.position.z - other.position.z));
        // if the distance between the centers is smaller the the sum of the
        // radii the spheres intersect
        return distance < (sphere.geometry.parameters.radius + other.geometry.parameters.radius);
    }

    // Checks if there is an intersection between  a sphere and a box
    function intersectSphereBox(sphere, box) {
        // get box closest point to sphere center by clamping
        var x = Math.max(minX(box), Math.min(sphere.position.x, maxX(box)));
        var y = Math.max(minY(box), Math.min(sphere.position.y, maxY(box)));
        var z = Math.max(minZ(box), Math.min(sphere.position.z, maxZ(box)));

        // distance between the sphere and the closest box-point to the spehere
        var distance = Math.sqrt((x - sphere.position.x) * (x - sphere.position.x) +
            (y - sphere.position.y) * (y - sphere.position.y) +
            (z - sphere.position.z) * (z - sphere.position.z));

        // if the distance is smaller than the radius of the sphere there is an intersection
        return distance < sphere.geometry.parameters.radius;
        //return distance < sphere.geometry.parameters.radius;
    }

    // Checks if there is an intersection between a sphere and a cylinder.
    // Appoximates the cylinder as a box
    function intersectSphereCylinder(sphere, cylinder) {

        // approximate the cylinder as a box
        var hitBox = cylinderAsBox(cylinder);

        // check intersection
        var isIntersect = intersectSphereBox(sphere, hitBox);
        hitBox = undefined;

        return isIntersect;
    }

    // Checks if there is an intersection between a box and a cylinder.
    // Appoximates the cylinder as a box
    function intersectBoxCylinder(box, cylinder) {

        // approximate the cylinder as a box
        var hitBox = cylinderAsBox(cylinder);

        // check intersection
        var isIntersect = intersectBoxBox(box, hitBox);
        hitBox = undefined;

        return isIntersect;
    }

    // Approximates a cylinder with a box
    function cylinderAsBox(cylinder) {

        // parameters for the box
        var x = cylinder.geometry.parameters.radiusTop * 2;
        var y = cylinder.geometry.parameters.height;
        var z = cylinder.geometry.parameters.radiusTop * 2;

        // initialize box
        var boxGeometry = new THREE.BoxGeometry(x, y, z);
        var boxMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
        var hitBox = new THREE.Mesh(boxGeometry, boxMaterial);

        //hitBox.visible = false;

        // transform box to the position of the cylinder
        hitBox.applyMatrix(cylinder.matrix);

        return hitBox;
    }

    // Checks if one of the ShipHitboxes intersects a sphere
    function intersectSphereShipHitBox(sphere, box) {

        // get box closest point to sphere center by clamping
        var x = Math.max(minXship(box), Math.min(sphere.position.x, maxXship(box)));
        var y = Math.max(minYship(box), Math.min(sphere.position.y, maxYship(box)));
        var z = Math.max(minZship(box), Math.min(sphere.position.z, maxZship(box)));

        // distance between the sphere and the closest box-point to the spehere
        var distance = Math.sqrt((x - sphere.position.x) * (x - sphere.position.x) +
            (y - sphere.position.y) * (y - sphere.position.y) +
            (z - sphere.position.z) * (z - sphere.position.z));


        // if the distance is smaller than the radius of the sphere there is an intersection
        return distance < sphere.geometry.parameters.radius;
    }

    // Checks if there is an intersection between a ShipHitbox and another box
    function intersectShipHitBoxBox(a, b) {
        // if there is an intersection in every dimension the two boxes intersect
        return (minXship(a) <= maxX(b) && maxXship(a) >= minX(b) &&
            (minYship(a) <= maxY(b) && maxYship(a) >= minY(b)) &&
            (minZship(a) <= maxZ(b) && maxZship(a) >= minZ(b)));
    }

    // Checks if there is an intersection between a point and sphere
    function intersectPointSphere(point, sphere) {
        var globalPoint = new THREE.Vector3(point.matrixWorld.elements[12], point.matrixWorld.elements[13], point.matrixWorld.elements[14]);
        var distance = Math.sqrt((globalPoint.x - sphere.position.x) * (globalPoint.x - sphere.position.x) +
                           (globalPoint.y - sphere.position.y) * (globalPoint.y - sphere.position.y) +
                           (globalPoint.z - sphere.position.z) * (globalPoint.z - sphere.position.z));
        // if the distance is smaller than the radius of the sphere there is an intersection
        return distance < sphere.geometry.parameters.radius;
    }

    // Checks if there is an intersection between a point and box
    function intersectPointBox(point, box) {
        var globalPoint = new THREE.Vector3(point.matrixWorld.elements[12], point.matrixWorld.elements[13], point.matrixWorld.elements[14]);



        // var dg = new THREE.SphereGeometry(.1,10,10);
        // var dm = new THREE.MeshBasicMaterial({color:0xFF0000});
        // var dot = new THREE.Mesh(dg, dm);
        // dot.position.x = globalPoint.x;
        // dot.position.y = globalPoint.y;
        // dot.position.z = globalPoint.z;
        // scene.add(dot);



        return (globalPoint.x <= maxX(box) && globalPoint.x >= minX(box) &&
            (globalPoint.y <= maxY(box) && globalPoint.y >= minY(box)) &&
            (globalPoint.z <= maxZ(box) && globalPoint.z >= minZ(box)));
    }


    function intersectLineBox(p1, p2, box) {
        var dir = new THREE.Vector3();
        var gp1 =  new THREE.Vector3(p1.matrixWorld.elements[12], p1.matrixWorld.elements[13], p1.matrixWorld.elements[14]);
        var gp2 = new THREE.Vector3(p2.matrixWorld.elements[12], p2.matrixWorld.elements[13], p2.matrixWorld.elements[14]);

        var pointMaterial1 = new THREE.MeshBasicMaterial({color: 0xFFFF00});
        var pointGeometry = new THREE.SphereGeometry(1, 32, 32);
        var point1 = new THREE.Mesh(pointGeometry, pointMaterial1);
        point1.position.x = p1.matrixWorld.elements[12];
        point1.position.y = p1.matrixWorld.elements[13];
        point1.position.z = p1.matrixWorld.elements[14];
        scene.add(point1);

        var pointMaterial2 = new THREE.MeshBasicMaterial({color: 0x00FFFF});
        var point2 = new THREE.Mesh(pointGeometry, pointMaterial2);
        point2.position.x = p2.matrixWorld.elements[12];
        point2.position.y = p2.matrixWorld.elements[13];
        point2.position.z = p2.matrixWorld.elements[14];
        scene.add(point2);


        dir = gp1.clone();
        dir.sub(gp2);
        var dirClone = dir.clone();
        dir.normalize();
        var raycaster = new THREE.Raycaster(gp2, dir, 1, 1000);
        // var intersects = raycaster.intersectObjects(scene.children);
        var intersects = raycaster.intersectObject(box);
      /*  console.log(box);
        console.log(intersects);
        console.log(gp2);
        console.log(gp1);
        console.log(dir);
        console.log(scene.children.length);
        console.log(intersects.length); */
        if (intersects.length < 1) {
            return false;
        }
        else {
            if (intersects[0].distance < 500) {
                console.log(intersects[0]);
                return true;
            }
            else {
                return false;
            }
        }
    }



    return {

        // returns whether there is an intersection between two boxes
        intersectBoxBox: intersectBoxBox,
        // returns whether there is an intersection between two spheres
        intersectSphereOther: intersectSphereOther,
        // returns whether there is an intersection between a sphere and a box
        intersectSphereBox: intersectSphereBox,
        // returns whether there is an intersection between a sphere and a cylinder
        intersectSphereCylinder: intersectSphereCylinder,
        // returns whether there is an intersection between a box and a cylinder
        intersectBoxCylinder: intersectBoxCylinder,
        // returns whether there is an intersection between a sphere and a shipHitBox
        intersectSphereShipHitBox: intersectSphereShipHitBox,
        // returns whether there is an intersection between a shipHitBox and another box
        intersectShipHitBoxBox: intersectShipHitBoxBox,
        // returns whether there is an intersection between a Point and a Sphere
        intersectPointSphere: intersectPointSphere,
        // returns whether there is an intersection between a Point and a Box
        intersectPointBox: intersectPointBox,

        intersectLineBox: intersectLineBox,

        // returns wheter there is a collision between a spehere and any other mesh
        // that is collidable
        sphereCollision: function (sphere) {
            for (var i = 0; i <= collidableMeshList.length - 1; i++) {
                // to prevent collision with itself
                if (sphere !== collidableMeshList[i]) {
                    // collision with a box
                    if (collidableMeshList[i].geometry.type === "BoxGeometry") {
                        if (intersectSphereBox(sphere, collidableMeshList[i])) {
                            return true;
                        }
                    }
                    // collision with another sphere
                    else if (collidableMeshList[i].geometry.type === "SphereGeometry") {
                        if (intersectSphereOther(sphere, collidableMeshList[i])) {
                            return true;
                        }
                    }

                }
            }
            return false;
        },

        // returns wheter there is a collision between a box and any other mesh
        // that is collidable
        boxCollision: function (box) {
            for (var i = 0; i <= collidableMeshList.length - 1; i++) {
                // to prevent collision with itself
                if (box !== collidableMeshList[i]) {
                    // collision with another box
                    if (collidableMeshList[i].geometry.type === "BoxGeometry") {
                        if (intersectBoxBox(box, collidableMeshList[i])) {
                            return true;
                        }
                    }
                    // collision with a sphere
                    else if (collidableMeshList[i].geometry.type === "SphereGeometry") {
                        if (intersectSphereBox(collidableMeshList[i], box)) {
                            return true;
                        }
                    }
                }
            }
        }

    }

}
