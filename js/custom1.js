
/////////////////////////////////////////
// Scene Setup
/////////////////////////////////////////


var scene,
		camera,
		renderer,
		controls;

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera( 5, window.innerWidth / window.innerHeight, 10, 100 );
camera.position.set(15, 10, - 15);
camera.lookAt( scene.position );

renderer = new THREE.WebGLRenderer({
	alpha: true,
		antialias: true
});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

/////////////////////////////////////////
// Trackball Controller
/////////////////////////////////////////

controls = new THREE.OrbitControls( camera, renderer.domElement );
	// controls.screenSpacePanning = true;
	// controls.minDistance = 5;
	// controls.maxDistance = 40;
	controls.enableZoom = false;
	// controls.target.set( 0, 2, 0 );
	// controls.update();
	controls.minPolarAngle = Math.PI/2;
	controls.maxPolarAngle = Math.PI/2;
	controls.update();

/////////////////////////////////////////
// Lighting
/////////////////////////////////////////

var iphone_color  = '#FAFAFA',
	ambientLight  = new THREE.AmbientLight( '#EEEEEE' ),
	hemiLight     = new THREE.HemisphereLight( iphone_color, iphone_color, 0 ),
	light         = new THREE.PointLight( iphone_color, 1, 100 );

hemiLight.position.set( 0, 50, 0 );
light.position.set( 0, 20, 10 );

scene.add( ambientLight );
scene.add( hemiLight );
scene.add( light );


/////////////////////////////////////////
// Utilities
/////////////////////////////////////////

// var axisHelper = new THREE.AxisHelper( 1.25 );
// scene.add( axisHelper );
// var gridHelper = new THREE.GridHelper( 10, 20 );
// scene.add( gridHelper );

/////////////////////////////////////////
// Render Loop
/////////////////////////////////////////

function renderPhone() {
	renderer.render( scene, camera );
}

// Render the scene when the controls have changed.
// If you don’t have other animations or changes in your scene,
// you won’t be draining system resources every frame to render a scene.
controls.addEventListener( 'change', renderPhone );

// Avoid constantly rendering the scene by only 
// updating the controls every requestAnimationFrame
function animationLoop() {
	requestAnimationFrame(animationLoop);
	controls.update();
}

animationLoop();


/////////////////////////////////////////
// Window Resizing
/////////////////////////////////////////

window.addEventListener( 'resize', function () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	// console.log(controls);
	// controls.handleResize();
	renderPhone();
}, false );


/////////////////////////////////////////
// Object Loader
/////////////////////////////////////////

var dae,
	loader = new THREE.ColladaLoader();

function loadCollada( collada ) {
	dae = collada.scene;
	dae.position.set(0, 0, 0);
	scene.add(dae);
	renderPhone();
}

// loader.options.convertUpAxis = true;
// loader.load( 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/392/iphone6.dae', loadCollada);
window.onload = function (){
	document.getElementById("3d-container").appendChild( renderer.domElement );
	loader.load( './3d/blue_earth.dae', loadCollada);
}
