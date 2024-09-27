// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a figure1
const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
const material = new THREE.MeshBasicMaterial({ color: 0xffffff , wireframe: true});
const figure1 = new THREE.Mesh(geometry, material);
scene.add(figure1);
// Create a figure2
const geometry1 = new THREE.TorusGeometry( 10, 3, 16, 50 );
const material1 = new THREE.MeshBasicMaterial({ color: 0xffffff , wireframe: true});
const figure2 = new THREE.Mesh(geometry1, material1);
figure2.position.set(0, 0, -100);
scene.add(figure2);
// Create a figure3
const geometry2 = new THREE.SphereGeometry( 15, 32, 16 ); 
const material2 = new THREE.MeshBasicMaterial({ color: 0xffffff , wireframe: true});
const figure3 = new THREE.Mesh(geometry2, material2);
figure3.position.set(0, 0, -300);
scene.add(figure3);

camera.position.z = 5;

function addStar() {
    const geometry = new THREE.IcosahedronGeometry(0.25);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
}

Array(200).fill().forEach(addStar);

// Render loop
var figures = [figure1, figure2, figure3];
function animate() {
    requestAnimationFrame(animate);
    for (var i = 0; i < figures.length; i++) {
        figures[i].rotation.x += 0.01;
        figures[i].rotation.y += 0.01;
    }   
    renderer.render(scene, camera);
}
animate();

var button = document.getElementById("myButton");
button.onclick = function() {
    animateCameraMovement(-295);
};

var button = document.getElementById("myButton0");
button.onclick = function() {
    animateCameraMovement(5);
};

function animateCameraMovement(tarZ) {
    var targetZ = tarZ; // Posición z final deseada
    var initialZ = camera.position.z; // Posición z inicial de la cámara
    var duration = 1000; // Duración de la animación en milisegundos

    var startTime = null;

    function moveCamera(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = timestamp - startTime;
        var ratio = Math.min(progress / duration, 1); 

        camera.position.z = initialZ + (targetZ - initialZ) * ratio;

        renderer.render(scene, camera);

        if (progress < duration) {
            requestAnimationFrame(moveCamera); 
        }
    }

    requestAnimationFrame(moveCamera);
}