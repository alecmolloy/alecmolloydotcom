var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer, windowResize;
var camera, scene;

var directionalLight, pointLight;

function init() {
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        gammaInput: true,
        gammaOutput: true,
    });
    renderer.setClearColor(0xffffff);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 1000);
    camera.position.set(150, 150, 150);

    windowResize = THREEx.WindowResize(renderer, camera);

    controls = new THREE.OrbitControls(camera);
    controls.target.set(0, 0, 0);

    scene = new THREE.Scene();

    // LIGHTS
    scene.add(new THREE.AmbientLight(0x333333));

    directionalLight = new THREE.DirectionalLight(0xaaaaaa, 1.15);
    directionalLight.position.set(500, 200, 0);
    scene.add(directionalLight);

    var cubeGeo = new THREE.BoxGeometry(100, 100, 100);
    var material = new THREE.MeshPhongMaterial({
        color: 0xaaaaaa
    });

    var cubeMesh = new THREE.Mesh(cubeGeo, material);
    scene.add(cubeMesh);

    animate();
}

init();

function animate() {

    requestAnimationFrame(animate);
    renderer.render(scene, camera);

}
