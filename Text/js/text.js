var cam, renderer;
//scene.
const scene = new THREE.Scene();
            {
                const color = 0xFFFFFF;
                const intensity = 1;
                const light = new THREE.DirectionalLight(color, intensity);
                light.position.set(-10, 0, 40);
                scene.add(light);
            
            }
//camera.
cam = new THREE.PerspectiveCamera(45, window.innerWidth/innerHeight, 0.1, 1000)
cam.position.z = 800;
            
//camera control.
controls = new THREE.OrbitControls(cam);
controls.addEventListener('change', renderer);

//render.
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
            
//load font.
var loader = new THREE.FontLoader();
loader.load( 'fonts/Cinzel_Regular.json', function ( font ) {
        //text geometry.
        var textGeometry = new THREE.TextGeometry("KSHITIJ", {
            font: font,
            size: 80,
		    height: 5,
            style: "normal",
		    curveSegments: 12,
		    bevelEnabled: true,
		    bevelThickness: 10,
		    bevelSize: 8,
		    bevelOffset: 0,
            bevelSegments: 5
            });
        //text material.
        var textMat = new THREE.MeshPhongMaterial({
            specular: 0xffffff,
            color: 0x907070,
            shininess: 100,
            metal: true
        });
        //text mesh.
        var textMesh = new THREE.Mesh(textGeometry, textMat);
	
	//realigning the center of the text
        textGeometry.computeBoundingBox();
        textGeometry.boundingBox.getCenter(textMesh.position).multiplyScalar(-1);
	
        scene.add(textMesh);
        animate();
});

function animate(){
renderer.render(scene, cam);
requestAnimationFrame(animate);
}
