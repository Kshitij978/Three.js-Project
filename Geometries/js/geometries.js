//TODO: Experiment with more shapes and geometries.

let scene, camera, renderer;

//scene setup
scene = new THREE.Scene();
scene.background = new THREE.Color(0x555555);

//camera setup
const fov = 45, aspect = window.innerWidth/innerHeight, near = 1, far = 1000;
camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 120;

//renderer setup
renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//light setup
const color = 0xffffff;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);


let objects= [];
let spread = 15;

const addObjects = (x, y, obj) => {
    obj.position.x = x * spread;
    obj.position.y = y * spread;

    scene.add(obj);
    objects.push(obj);
}

const setMaterial = () => {
    const material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
    });

    const hue = Math.random();
    const saturation = 1;
    const luminance = 0.5;
    material.color.setHSL(hue, saturation, luminance);

    return material;
}

const solidMesh = (x, y, geometry) => {
    const mesh = new THREE.Mesh(geometry, setMaterial());
    addObjects(x, y, mesh);
}

const lineMesh = (x, y, geometry) => {
    const material = new THREE.LineBasicMaterial({color: 0xffffff});
    const mesh = new THREE.LineSegments(geometry, material);
    addObjects(x, y, mesh);
}

{
    const width = 8;
    const height = 8;
    const depth = 8;
    solidMesh(-2, 2, new THREE.BoxBufferGeometry(width, height, depth));
}

{
    const radius = 7;
    const segment = 26;
    solidMesh(-1, 2, new THREE.CircleBufferGeometry(radius, segment));
}

{
    const radius = 5;
    const height = 10;
    const radialSegment = 11;
    solidMesh(0, 2, new THREE.ConeBufferGeometry(radius, height, radialSegment));
}

{
    const radiusTop = 5;
    const radiusBottom = 5;
    const height = 10;
    const radialSegment = 11;
    solidMesh(1, 2, new THREE.CylinderBufferGeometry(radiusTop, radiusBottom, height, radialSegment)); 
}

{
    const radius = 5;
    solidMesh(2, 2, new THREE.DodecahedronBufferGeometry(radius));
}

{
    const width = 8;
    const height = 8;
    const depth = 8;
    edges = new THREE.EdgesGeometry(new THREE.BoxBufferGeometry(width, height, depth));
    lineMesh(-2, 1, edges);
}

{
    let shape = new THREE.Shape();
    shape.moveTo(0,0);
    shape.lineTo(-6, 2);
    shape.lineTo(0, 4);
    shape.lineTo(6, 2);
    shape.lineTo(0, 0);

    let extrude = {
        steps: 2,
        depth: 2,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegment: 1
    }

    solidMesh(-1, 1, new THREE.ExtrudeBufferGeometry(shape, extrude));
}

{
    const pts = [];
    for(let i = 0; i<10; i++)
    {
        pts.push(new THREE.Vector2(Math.sin(i * 0.2) * 6 + Math.cos(i * 0.3) , (i - 5)));
    }
    solidMesh(0, 1, new THREE.LatheBufferGeometry(pts));
}

const render = (time) => {
    time *= 0.001;

    objects.forEach((obj) => {
      const rot = time;
      obj.rotation.x = rot;
      obj.rotation.y = rot;
    });
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render(5);

