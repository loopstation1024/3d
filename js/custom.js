var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({
  	alpha: true,
    antialias: true
});
var loader = new THREE.ColladaLoader(); // loader	
var dae;  // graphic

camera.position.set(-5, 12, 10);
camera.lookAt( scene.position );

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

loader.load( './3d/blue_earth.dae', loadCollada);

/////////////////////////////////////////
// Trackball Controller
/////////////////////////////////////////

controls = new THREE.TrackballControls( camera );
controls.rotateSpeed = 5.0;
controls.zoomSpeed = 3.2;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = true;
controls.staticMoving = false;
controls.dynamicDampingFactor = 0.2;

function loadCollada( collada ) {
	console.log("loaded!");
  	dae = collada.scene;
  	dae.position.set(0.4, 0, 0.8);
  	scene.add(dae);
  	render3D();
  	console.log(scene);
  	console.log(dae);
}

function render3D() {
	console.log("rendered!");
  	requestAnimationFrame( render3D );
  	renderer.render(scene, camera);
}
 
// render3D();


