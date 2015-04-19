
var scene, camera, renderer;

init();
// Set up the scen
function init(){

	scene = new THREE.Scene();
	
	// Create renderer and add it to the DOM
	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	// Create camera
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
	controls = new THREE.OrbitControls( camera );
	camera.position.set(0,0,60);

	scene.add(camera);

	// scene background color
	//var backgroundColor = new THREE.Color("rgb(20,20,20)");
	var backgroundColor = new THREE.Color("rgb(60,60,60)");
	renderer.setClearColor( backgroundColor );

	// Resize window
	window.addEventListener( 'resize', onWindowResize, false );
}


drawSkateboard();
function drawSkateboard(){

	// Colors and materials
	var black = new THREE.Color("rgb(20,20,20)");
	var blackMaterial = new THREE.MeshBasicMaterial(  {color: black}  );

	var yellow = new THREE.Color("rgb(184, 228, 20)");
	var yellowMaterial = new THREE.MeshBasicMaterial({ color: yellow });

	var blue = new THREE.Color("rgb(0, 200, 255)");
	var blueMaterial = new THREE.MeshBasicMaterial({ color:blue });

	var darkGrey = new THREE.Color("rgb(200, 200, 200)");
	var darkGreyMaterial = new THREE.MeshBasicMaterial({ color: darkGrey });


	// draw floor
	var floorGeometry = new THREE.PlaneBufferGeometry(500, 400);
	var floor = new THREE.Mesh(floorGeometry, darkGreyMaterial);
	floor.rotation.x = -Math.PI / 2;
	floor.position.y = -3.5;
	floor.material.side = THREE.DoubleSide;
	scene.add(floor);

	// Top center
	var topGeometry = new THREE.PlaneBufferGeometry( 40,20 );
	var top = new THREE.Mesh(topGeometry, blackMaterial);
	top.position.y = 0.5;
	top.rotation.x = -Math.PI / 2;
	scene.add(top)

	// Bottom center
	var bottomGeometry = new THREE.PlaneBufferGeometry( 40,20 );
	var bottom = new THREE.Mesh(bottomGeometry, blackMaterial);
	bottom.position.y = -0.5;
	bottom.rotation.x = -Math.PI / 2;
	bottom.material.side = THREE.DoubleSide;
	scene.add(bottom)

	// Right edge
	var rightEdgeGeometry = new THREE.PlaneBufferGeometry(40,1);
	var rightEdge = new THREE.Mesh(rightEdgeGeometry, yellowMaterial);
	rightEdge.position.z = 10;
	//rightEdge.material.side = THREE.DoubleSide;
	scene.add(rightEdge);

	// Left edge
	var leftEdgeGeometry = new THREE.PlaneBufferGeometry(40,1);
	var leftEdge = new THREE.Mesh(leftEdgeGeometry, blueMaterial);
	leftEdge.position.z = -10;
	leftEdge.rotation.x = -Math.PI;
	scene.add(leftEdge);

	// Draw the lines in the skateboard
	drawLines();
	addLights() ;


}

function addLights() {
    var spotLight = new THREE.SpotLight("rgb(255,0,0)", 1, 200, 20, 10);
spotLight.position.set( 0, 25, 0 );
  
var spotTarget = new THREE.Object3D();
spotTarget.position.set(0, 0, 0);
spotLight.target = spotTarget;
  
scene.add(spotLight);
scene.add(new THREE.PointLightHelper(spotLight, 1));
}

// resize
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

render();
function render() {
	requestAnimationFrame( render );
	controls.update();
	renderer.render(scene, camera);
};

