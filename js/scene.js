
var scene, camera, renderer;
var skateboard;


// var black, blackMaterial, blackMaterialBack;
// var yellow, yellowMaterial, yellowMaterialBack;
// var blue, blueMaterial, blueMaterialBack;
// var darkGrey, lightGreyMaterial;
	// Colors and materials
	var black = new THREE.Color("rgb(20,20,20)");
	var blackMaterial = new THREE.MeshBasicMaterial(  {color: black}  );
	var blackMaterialBack = new THREE.MeshBasicMaterial(  {color: black}  );

	var yellow = new THREE.Color("rgb(184, 228, 20)");
	var yellowMaterial = new THREE.MeshBasicMaterial({ color: yellow });
	var yellowMaterialBack = new THREE.MeshBasicMaterial({ color: yellow });

	var blue = new THREE.Color("rgb(0, 200, 255)");
	var blueMaterial = new THREE.MeshBasicMaterial({ color:blue });
	var blueMaterialBack = new THREE.MeshBasicMaterial({ color:blue });

	var darkGrey = new THREE.Color("rgb(30, 30, 30)");
	var darkGreyMaterial = new THREE.MeshBasicMaterial({ color: darkGrey });

	var darkerGrey = new THREE.Color("rgb(20, 20, 20)");
	var floorMaterial = new THREE.MeshBasicMaterial({ color: darkerGrey });
	// var red = new THREE.Color("rgb(250, 0, 0)");
	// var redMaterial = new THREE.MeshBasicMaterial({ color: red });
	// var redMaterial2 = new THREE.MeshBasicMaterial({ color: red });


$(document).ready(function(){
	init();
	render();
})





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
	camera.position.set(0,150,200);

	scene.add(camera);

	// scene background color
	//var backgroundColor = new THREE.Color("rgb(20,20,20)");
	var backgroundColor = new THREE.Color("rgb(30,30,30)");
	renderer.setClearColor( backgroundColor );

	// draw floor
	var floorGeometry = new THREE.PlaneBufferGeometry(800, 600);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.rotation.x = -Math.PI / 2;
	floor.position.y = -3.5;
	floor.material.side = THREE.DoubleSide;
	scene.add(floor);

	
	
	drawTrick();


	// Resize window
	window.addEventListener( 'resize', onWindowResize, false );
}






// resize
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}


function render() {
	requestAnimationFrame( render );
	controls.update();
	renderer.render(scene, camera);
};

