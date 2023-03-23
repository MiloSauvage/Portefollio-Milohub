console.log("loading JavaScript 3d");

    const model1 = "./model/js/scene.gltf"
	const model2 = "./model/py/scene.gltf"

      //Scene
      var scene1 = new THREE.Scene();

	//Scene 2
	 var scene2 = new THREE.Scene();

      //Camera
		var height = window.innerHeight;
		var width = window.innerWidth;
		var distance = 4000;
		var diag = Math.sqrt((height*height)+(width*width))
		var fov = 1.5 * Math.atan((diag) / (2 * distance)) * (180 / Math.PI); //Field of View
		var camera1 = new THREE.PerspectiveCamera(fov, (window.innerWidth / window.innerHeight) / 2, 0.1, distance);
		camera1.position.set(0, 0, 50);
	//camera 2
		var height2 = window.innerHeight;
		var width2 = window.innerWidth;
		var distance2 = 4000;
		var diag2 = Math.sqrt((height*height)+(width*width))
		var fov2 = 0.140 * Math.atan((diag2) / (1 * distance)) * (180 / Math.PI); //Field of View
		var camera2 = new THREE.PerspectiveCamera(fov2, (window.innerWidth / window.innerHeight) / 2, 0.1, distance2);
		camera2.position.set(0, 10, 50);

    //Canvas 1
      var myCanvas1 = document.getElementById('MyCanvasJS');

	// Canvas 2
		var myCanvas2 = document.getElementById('MyCanvasPy');

    //Renderer 1
      var renderer1 = new THREE.WebGLRenderer({
        antialias: true,
        canvas: myCanvas1,
		alpha: true
      });
	  // renderer.setClearColor(0x000000);
		renderer1.setPixelRatio(window.devicePixelRatio);
		renderer1.setSize(window.innerWidth / 2.5, window.innerHeight / 1.5);
		renderer1.shadowMap.enabled = true;
    	renderer1.shadowMap.type = THREE.PCFSoftShadowMap;
    	renderer1.gammaInput = true;
    	renderer1.gammaOutput = true;
    	renderer1.antialias = true;
		document.body.appendChild( renderer1.domElement );

	//renderer 2
	var renderer2 = new THREE.WebGLRenderer({
        antialias: true,
        canvas: myCanvas2,
		alpha: true
      });
		// renderer2.setClearColor(0x000000);
		renderer2.setPixelRatio(window.devicePixelRatio);
		renderer2.setSize(window.innerWidth / 2.5, window.innerHeight / 1.5);
		renderer2.shadowMap.enabled = true;
    	renderer2.shadowMap.type = THREE.PCFSoftShadowMap;
    	renderer2.gammaInput = true;
    	renderer2.gammaOutput = true;
    	renderer2.antialias = true;
		document.body.appendChild( renderer2.domElement );
		

	//LIGHTS 1
		var light1 = new THREE.AmbientLight(0xffffff, 3);
		light1.power = 6640;  // GE Lumens @ 60W incade.
		light1.decay = 2;
		light1.distance = Infinity;
		light1.position.set(0, 2, 0);
		light1.castShadow = true;
		light1.shadowCameraVisible = true;
		scene1.add(light1);

	//LIGHTS 2
		var light2 = new THREE.AmbientLight(0xffffff, 3);
		light2.power = 6640;  // GE Lumens @ 60W incade.
		light2.decay = 2;
		light2.distance = Infinity;
		light2.position.set(0, 2, 0);
		light2.castShadow = true;
		light2.shadowCameraVisible = true;
		scene2.add(light2);

	//OrbitControlsd 1
		orbit1 = new THREE.OrbitControls(camera1, renderer1.domElement);
		orbit1.maxPolarAngle = Math.PI / 2;
		orbit1.update();

	//OrbitControlsd 2
		orbit2 = new THREE.OrbitControls(camera2, renderer2.domElement);
		orbit2.maxPolarAngle = Math.PI / 2;
		orbit2.update();

		// Instantiate a loader
		var loader1 = new THREE.GLTFLoader();
		loader1.load("./model/js/scene.gltf", handle_load1);

		// var mesh1;
		function handle_load1(gltf)
		{
			mesh1 = gltf.scene;
			scene1.add( mesh1 );
		}
	
	// Instantiate a loader 2
		var loader2 = new THREE.GLTFLoader();
		loader2.load("./model/py/scene.gltf", handle_load2);

		// var mesh2;
		function handle_load2(gltf)
		{
			mesh2 = gltf.scene;
			scene2.add( mesh2 );
		}
		


	//Render loop 1
		render1();
	//Render loop 2
		render2();

		// var delta = 0;
		// var prevTime = Date.now();

		function render1() {
			//exposure
			renderer1.toneMappingExposure = Math.pow(0.7, 5.0);  // -> exposure: 0.168
			renderer1.render(scene1, camera1);

			requestAnimationFrame(render1);
		}

		function render2() {
			//exposure
			renderer2.toneMappingExposure = Math.pow(0.7, 5.0);  // -> exposure: 0.168
			renderer2.render(scene2, camera2);

			requestAnimationFrame(render2);
		}