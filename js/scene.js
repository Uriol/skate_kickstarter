var scene, camera, renderer;
var skateboard;

var particles_1, particles_2, particles_3, fogs;

// var black, blackMaterial, blackMaterialBack;
// var yellow, yellowMaterial, yellowMaterialBack;
// var blue, blueMaterial, blueMaterialBack;
// var darkGrey, lightGreyMaterial;
	// Colors and materials
	var black = new THREE.Color("rgb(0,0,0)");
	var blackMaterial = new THREE.MeshBasicMaterial(  {color: black}  );
	var blackMaterialBack = new THREE.MeshBasicMaterial(  {color: black}  );

	var yellow = new THREE.Color("rgb(221, 255, 0)");
	var yellowMaterial = new THREE.MeshBasicMaterial({ color: yellow });
	var yellowMaterialBack = new THREE.MeshBasicMaterial({ color: yellow });

	var blue = new THREE.Color("rgb(0, 221, 255)");
	var blueMaterial = new THREE.MeshBasicMaterial({ color:blue });
	var blueMaterialBack = new THREE.MeshBasicMaterial({ color:blue });

	var darkGrey = new THREE.Color("rgb(30, 30, 30)");
	var darkGreyMaterial = new THREE.MeshBasicMaterial({ color: darkGrey });

	var darkerGrey = new THREE.Color("rgb(0, 0, 0)");
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
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 2000 );
	controls = new THREE.OrbitControls( camera );
	controls.maxPolarAngle = Math.PI/2; 
	controls.maxDistance = 340;
	camera.position.set(0,50,250);

	scene.add(camera);

	// scene background color
	//var backgroundColor = new THREE.Color("rgb(20,20,20)");
	var backgroundColor = new THREE.Color("rgb(1,1,1)");
	renderer.setClearColor( backgroundColor );

	var spriteFloor = THREE.ImageUtils.loadTexture('img/floor2.jpg');
	var floor_material = new THREE.MeshBasicMaterial({ map: spriteFloor });
	// draw floor
	var floorGeometry = new THREE.PlaneBufferGeometry(1024, 1024);
	var floor = new THREE.Mesh(floorGeometry, floor_material);
	floor.rotation.x = -Math.PI / 2;
	floor.position.y = -23.5;
	floor.material.side = THREE.DoubleSide;
	scene.add(floor);



	var whiteLine = new THREE.Color("rgb(255, 255, 255)");
	var whiteLineMaterial = new THREE.LineBasicMaterial({ color: whiteLine, linewidth: 1.5 });
	// Draw x 0 line
	var centerLineGeometry = new THREE.Geometry();
	centerLineGeometry.vertices.push(new THREE.Vector3(0, -5, 0));
	centerLineGeometry.vertices.push(new THREE.Vector3(0, 5, 0));
	var centerLine = new THREE.Line(centerLineGeometry, whiteLineMaterial);
	//scene.add(centerLine);
	

	drawBackground(); 
	drawParticles();
	//drawSkateboard_tail();
	//drawSkateboard_center();
	//drawSkateboard_nose();
	drawTrick();

	// Resize window
	window.addEventListener( 'resize', onWindowResize, false );
}

function drawBackground(){

	var spriteBackground = THREE.ImageUtils.loadTexture('img/bg_bw2.jpg');
	var bgMaterial = new THREE.MeshBasicMaterial({ map: spriteBackground });
	var bgMaterialBack = new THREE.MeshBasicMaterial({map: spriteBackground});

	// draw wall
	var wallGeometry = new THREE.PlaneBufferGeometry(1024, 459);
	var wall = new THREE.Mesh(wallGeometry, bgMaterial);
	wall.position.z = -512;
	wall.position.y = 229.5-35;
	wall.material.side = THREE.FrontSide;
	scene.add(wall);
	// draw wall left
	var leftWallGeometry = new THREE.PlaneBufferGeometry( 1024, 459);
	var leftWall = new THREE.Mesh(leftWallGeometry, bgMaterial);
	leftWall.rotation.y = Math.PI/2;
	leftWall.position.y = 229.5-35;
	leftWall.position.x = -1024/2;
	scene.add(leftWall);
	// Draw right wall
	var rightWallGeometry = new THREE.PlaneBufferGeometry( 1024, 459);
	var rightWall = new THREE.Mesh(rightWallGeometry, bgMaterialBack);
	rightWall.rotation.y = Math.PI/2;
	rightWall.position.y = 229.5-35;
	rightWall.position.x = 1024/2;
	rightWall.material.side = THREE.BackSide;
	scene.add(rightWall);
	// Front wall
	var frontWallGeometry = new THREE.PlaneBufferGeometry( 1024, 459);
	var frontWall = new THREE.Mesh( frontWallGeometry, bgMaterialBack);
	frontWall.position.y = 229.5-35;
	frontWall.position.z = 512;
	frontWall.material.side = THREE.BackSide;
	scene.add(frontWall);

}

function drawParticles(){

	var total_particles_1 = 80, total_particles_2 = 80, total_particles_3 = 80, total_fogs = 2000;

	// Create particles geometries
	var particle_1_geometry = new THREE.Geometry(),
		particle_2_geometry = new THREE.Geometry(),
		particle_3_geometry = new THREE.Geometry(),
		fog_geometry = new THREE.Geometry();

	// Add positions for each particle_1
	for (var i = 0; i < total_particles_1; i++ ) {

		var pos_negX = Math.random() < 0.5 ? -1 : 1;
		var pos_negY = Math.random() < 0.5 ? -1 : 1;

		var vertex_particle_1 = new THREE.Vector3();
		vertex_particle_1.x = (Math.random() * 350 + 0)*pos_negX;
		vertex_particle_1.y = Math.random() * 160 + 30; // always positive. Bellow the floor.
		vertex_particle_1.z = (Math.random() * 350 + 0)*pos_negY;

		if (vertex_particle_1.x < 300 && vertex_particle_1.x > -300 && vertex_particle_1.z < 300 && vertex_particle_1.z > -300) {

		} else { particle_1_geometry.vertices.push( vertex_particle_1 ); }

	}

	for (var i = 0; i < total_particles_2; i++ ) {

		var pos_negX = Math.random() < 0.5 ? -1 : 1;
		var pos_negY = Math.random() < 0.5 ? -1 : 1;

		var vertex_particle_2 = new THREE.Vector3();
		vertex_particle_2.x = (Math.random() * 350 + 0)*pos_negX;
		vertex_particle_2.y = Math.random() * 170 + 50; // always positive. Bellow the floor.
		vertex_particle_2.z = (Math.random() * 350 + 0)*pos_negY;

		if (vertex_particle_2.x < 300 && vertex_particle_2.x > -300 && vertex_particle_2.z < 300 && vertex_particle_2.z > -300) {

		} else { particle_2_geometry.vertices.push( vertex_particle_2 ); }

	}


	for (var i = 0; i < total_particles_3; i++ ) {

		var pos_negX = Math.random() < 0.5 ? -1 : 1;
		var pos_negY = Math.random() < 0.5 ? -1 : 1;

		var vertex_particle_3 = new THREE.Vector3();
		vertex_particle_3.x = (Math.random() * 350 + 0)*pos_negX;
		vertex_particle_3.y = Math.random() * 170 + 50; // always positive. Bellow the floor.
		vertex_particle_3.z = (Math.random() * 350 + 0)*pos_negY;

		if (vertex_particle_3.x < 300 && vertex_particle_3.x > -300 && vertex_particle_3.z < 300 && vertex_particle_3.z > -300) {

		} else { particle_3_geometry.vertices.push( vertex_particle_3 ); }

	}

	for (var i = 0; i < total_fogs; i++ ) {

		var fog_posX = Math.random() < 0.5 ? -1 : 1;
		var fog_posY = Math.random() < 0.5 ? -1 : 1;

		var vertex_fog = new THREE.Vector3();
		vertex_fog.x = (Math.random() * 380 + 0)*fog_posX;
		vertex_fog.y = Math.random() * 160 + 10;
		vertex_fog.z = (Math.random() * 380 + 0)*fog_posY;

		if (vertex_fog.x < 200 && vertex_fog.x > -200 && vertex_fog.z < 200 && vertex_fog.z > -200 ) {

		} else { fog_geometry.vertices.push( vertex_fog )};

	}


	// Add texture image, material and to scene
	var particle_sprite = THREE.ImageUtils.loadTexture( ' img/particle3.png ');
	var particle_1_material = new THREE.PointCloudMaterial({ size: 128, map: particle_sprite, blending: THREE.AdditiveBlending, depthTest: true, transparent : true});
	particles_1 = new THREE.PointCloud( particle_1_geometry, particle_1_material);
	scene.add(particles_1);

	var particle_sprite_2 = THREE.ImageUtils.loadTexture( ' img/particle4.png ');
	var particle_2_material = new THREE.PointCloudMaterial({ size: 128, map: particle_sprite_2, blending: THREE.AdditiveBlending, depthTest: true, transparent : true});
	particles_2 = new THREE.PointCloud( particle_2_geometry, particle_2_material);
	scene.add(particles_2);

	var particle_sprite_3 = THREE.ImageUtils.loadTexture( ' img/particle2.png ');
	var particle_3_material = new THREE.PointCloudMaterial({ size: 128, map: particle_sprite_3, blending: THREE.AdditiveBlending, depthTest: true, transparent : true});
	particles_3 = new THREE.PointCloud( particle_3_geometry, particle_3_material);
	scene.add(particles_3);

	var fog_sprite = THREE.ImageUtils.loadTexture( 'img/smoke.png');
	var fog_material = new THREE.PointCloudMaterial({ size: 256, map: fog_sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent : true, opacity: 0.01});
	fogs = new THREE.PointCloud( fog_geometry, fog_material);
	scene.add(fogs);

}

function animateParticles(){
	particles_1.rotation.y += 0.00025;
	particles_2.rotation.y += 0.00035;
	particles_3.rotation.y += 0.0004;
	fogs.rotation.y += 0.0004;
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
	animateParticles();
};