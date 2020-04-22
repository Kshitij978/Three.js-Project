var scene, cam, renderer;
            function init (){
                //Scene
                scene = new THREE.Scene();

                //Camera
                cam = new THREE.PerspectiveCamera(40, window.innerWidth/innerHeight, 1, 50000);
                cam.rotation.y = 45/180 * Math.PI;
                cam.position.set(-10,0,10);
                cam.lookAt(new THREE.Vector3(0,0,0));

                controls = new THREE.OrbitControls(cam);
                controls.addEventListener('change', renderer);
                
                //Render
                renderer = new THREE.WebGLRenderer();
                renderer.setSize(window.innerWidth, window.innerHeight);
                document.body.appendChild(renderer.domElement);

                
                var loader = new THREE.GLTFLoader();
                loader.load('Experiment.glb', function(gltf){
                    
                    scene.add(gltf.scene);
                    animate();
                
                });
            }

            function animate()
            {
                renderer.render(scene, cam);
                requestAnimationFrame(animate);
            }
            init();

           // Event Listeners
            //resize the scene on window resize.
            // -----------------------------------------------------------------------------
            window.addEventListener( 'resize', onWindowResize, false );

            function onWindowResize( event ) {
                cam.aspect = window.innerWidth / window.innerHeight;
                cam.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
