
var scene_vs, camera_vs, renderer_vs;
var skateboard_vs;

var scene_2_on = false;


	var black_vs = new THREE.Color("rgb(0,0,0)");
	var blackMaterial_vs = new THREE.MeshBasicMaterial(  {color: black_vs}  );
	var blackMaterialBack_vs = new THREE.MeshBasicMaterial(  {color: black_vs}  );

	var yellowLine_vs = new THREE.Color("rgb(184, 228, 20)");
	var yellow_vs = new THREE.Color("rgb(184, 228, 20)");
	var yellowMaterial_vs = new THREE.MeshBasicMaterial({ color: yellow_vs });
	var yellowMaterialBack_vs = new THREE.MeshBasicMaterial({ color: yellow_vs });

	var blueLine_vs = new THREE.Color("rgb(0, 200, 255)");
	var blue_vs = new THREE.Color("rgb(0, 200, 255)");
	var blueMaterial_vs = new THREE.MeshBasicMaterial({ color:blue_vs });
	var blueMaterialBack_vs = new THREE.MeshBasicMaterial({ color:blue_vs });

	var darkGrey_vs = new THREE.Color("rgb(30, 30, 30)");
	var darkGreyMaterial_vs = new THREE.MeshBasicMaterial({ color: darkGrey_vs });

	var darkerGrey_vs = new THREE.Color("rgb(0, 0, 0)");
	var floorMaterial_vs = new THREE.MeshBasicMaterial({ color: darkerGrey_vs });


var particles_1_vs, particles_2_vs, particles_3_vs, fogs_vs;

$(document).ready(function(){
	init_vs();
	render_vs();
})


function init_vs(){

	scene_vs = new THREE.Scene();

	// Create renderer and add it to the DOM
	renderer_vs = new THREE.WebGLRenderer({antialias:true});
	renderer_vs.setSize( window.innerWidth, 700 );
	//document.body.appendChild( renderer.domElement );
	//$('#skateVisuals').appendChild( renderer.domElement );
	var container_vs = document.getElementById("versus_3d");
	container_vs.appendChild(renderer_vs.domElement);

	// Create camera
	camera_vs = new THREE.PerspectiveCamera( 45, window.innerWidth/700, 0.1, 2000 );
	controls_vs = new THREE.OrbitControls( camera_vs,container_vs );
	controls_vs.maxPolarAngle = Math.PI/2; 
	camera_vs.position.set(0,150,300);
	scene.add(camera_vs);

	// Scene background
	var backgroundColor = new THREE.Color("rgb(1,1,1)");
	renderer_vs.setClearColor( backgroundColor );

	// Add floor
	var spriteFloor = THREE.ImageUtils.loadTexture('img/floor3.jpg');
	var floor_material = new THREE.MeshBasicMaterial({ map: spriteFloor });
	var floorGeometry = new THREE.PlaneBufferGeometry(1024, 1024);
	var floor = new THREE.Mesh(floorGeometry, floor_material);
	floor.rotation.x = -Math.PI / 2;
	floor.position.y = -23.5;
	floor.material.side = THREE.DoubleSide;
	scene_vs.add(floor);


	drawBackground_vs();
	drawParticles_vs();
	//drawTrick_vs(trick_one_vs , 2.6);
	//drawTrick_vs(trick_two_vs , 2.3);

	window.addEventListener( 'resize', onWindowResize, false );
}

function drawBackground_vs(){

	var spriteBackground = THREE.ImageUtils.loadTexture('img/bg_black.jpg');
	var bgMaterial = new THREE.MeshBasicMaterial({ map: spriteBackground });
	var bgMaterialBack = new THREE.MeshBasicMaterial({map: spriteBackground});

	// draw wall
	var wallGeometry = new THREE.PlaneBufferGeometry(1024, 459);
	var wall = new THREE.Mesh(wallGeometry, bgMaterial);
	wall.position.z = -512;
	wall.position.y = 229.5-35;
	wall.material.side = THREE.FrontSide;
	scene_vs.add(wall);
	// draw wall left
	var leftWallGeometry = new THREE.PlaneBufferGeometry( 1024, 459);
	var leftWall = new THREE.Mesh(leftWallGeometry, bgMaterial);
	leftWall.rotation.y = Math.PI/2;
	leftWall.position.y = 229.5-35;
	leftWall.position.x = -1024/2;
	scene_vs.add(leftWall);
	// Draw right wall
	var rightWallGeometry = new THREE.PlaneBufferGeometry( 1024, 459);
	var rightWall = new THREE.Mesh(rightWallGeometry, bgMaterialBack);
	rightWall.rotation.y = Math.PI/2;
	rightWall.position.y = 229.5-35;
	rightWall.position.x = 1024/2;
	rightWall.material.side = THREE.BackSide;
	scene_vs.add(rightWall);
	// Front wall
	var frontWallGeometry = new THREE.PlaneBufferGeometry( 1024, 459);
	var frontWall = new THREE.Mesh( frontWallGeometry, bgMaterialBack);
	frontWall.position.y = 229.5-35;
	frontWall.position.z = 512;
	frontWall.material.side = THREE.BackSide;
	scene_vs.add(frontWall);
}


function drawParticles_vs(){

	var total_particles_1 = 80, total_particles_2 = 80, total_particles_3 = 80, total_fogs = 400;

	// Create particles geometries
	var particle_1_geometry_vs = new THREE.Geometry(),
		particle_2_geometry_vs = new THREE.Geometry(),
		particle_3_geometry_vs = new THREE.Geometry(),
		fog_geometry_vs = new THREE.Geometry();

	// Add positions for each particle_1
	for (var i = 0; i < total_particles_1; i++ ) {

		var pos_negX = Math.random() < 0.5 ? -1 : 1;
		var pos_negY = Math.random() < 0.5 ? -1 : 1;

		var vertex_particle_1 = new THREE.Vector3();
		vertex_particle_1.x = (Math.random() * 350 + 0)*pos_negX;
		vertex_particle_1.y = Math.random() * 160 + 20; // always positive. Bellow the floor.
		vertex_particle_1.z = (Math.random() * 350 + 0)*pos_negY;

		if (vertex_particle_1.x < 320 && vertex_particle_1.x > -320 && vertex_particle_1.z < 320 && vertex_particle_1.z > -320) {

		} else { particle_1_geometry_vs.vertices.push( vertex_particle_1 ); }

	}

	for (var i = 0; i < total_particles_2; i++ ) {

		var pos_negX = Math.random() < 0.5 ? -1 : 1;
		var pos_negY = Math.random() < 0.5 ? -1 : 1;

		var vertex_particle_2 = new THREE.Vector3();
		vertex_particle_2.x = (Math.random() * 350 + 0)*pos_negX;
		vertex_particle_2.y = Math.random() * 170 + 30; // always positive. Bellow the floor.
		vertex_particle_2.z = (Math.random() * 350 + 0)*pos_negY;

		if (vertex_particle_2.x < 320 && vertex_particle_2.x > -320 && vertex_particle_2.z < 320 && vertex_particle_2.z > -320) {

		} else { particle_2_geometry_vs.vertices.push( vertex_particle_2 ); }

	}


	for (var i = 0; i < total_particles_3; i++ ) {

		var pos_negX = Math.random() < 0.5 ? -1 : 1;
		var pos_negY = Math.random() < 0.5 ? -1 : 1;

		var vertex_particle_3 = new THREE.Vector3();
		vertex_particle_3.x = (Math.random() * 350 + 0)*pos_negX;
		vertex_particle_3.y = Math.random() * 170 + 30; // always positive. Bellow the floor.
		vertex_particle_3.z = (Math.random() * 350 + 0)*pos_negY;

		if (vertex_particle_3.x < 320 && vertex_particle_3.x > -320 && vertex_particle_3.z < 320 && vertex_particle_3.z > -320) {

		} else { particle_3_geometry_vs.vertices.push( vertex_particle_3 ); }

	}

	for (var i = 0; i < total_fogs; i++ ) {

		var fog_posX = Math.random() < 0.5 ? -1 : 1;
		var fog_posY = Math.random() < 0.5 ? -1 : 1;

		var vertex_fog = new THREE.Vector3();
		vertex_fog.x = (Math.random() * 380 + 0)*fog_posX;
		vertex_fog.y = Math.random() * 160 + 10;
		vertex_fog.z = (Math.random() * 380 + 0)*fog_posY;

		if (vertex_fog.x < 180 && vertex_fog.x > -180 && vertex_fog.z < 180 && vertex_fog.z > -180 ) {

		} else { fog_geometry_vs.vertices.push( vertex_fog )};

	}


	// Add texture image, material and to scene
	var particle_sprite = THREE.ImageUtils.loadTexture( ' img/particle3_2.png ');
	var particle_1_material = new THREE.PointCloudMaterial({ size: 128, map: particle_sprite, blending: THREE.AdditiveBlending, depthTest: true, transparent : true, opacity: 0.5});
	particles_1_vs = new THREE.PointCloud( particle_1_geometry_vs, particle_1_material);
	scene_vs.add(particles_1_vs);

	var particle_sprite_2 = THREE.ImageUtils.loadTexture( ' img/particle4.png ');
	var particle_2_material = new THREE.PointCloudMaterial({ size: 128, map: particle_sprite_2, blending: THREE.AdditiveBlending, depthTest: true, transparent : true});
	particles_2_vs = new THREE.PointCloud( particle_2_geometry_vs, particle_2_material);
	scene_vs.add(particles_2_vs);

	var particle_sprite_3 = THREE.ImageUtils.loadTexture( ' img/particle2_2.png ');
	var particle_3_material = new THREE.PointCloudMaterial({ size: 128, map: particle_sprite_3, blending: THREE.AdditiveBlending, depthTest: true, transparent : true});
	particles_3_vs = new THREE.PointCloud( particle_3_geometry_vs, particle_3_material);
	scene_vs.add(particles_3_vs);

	var fog_sprite = THREE.ImageUtils.loadTexture( 'img/smoke.png');
	var fog_material = new THREE.PointCloudMaterial({ size: 256, map: fog_sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent : true, opacity: 0.035});
	fogs_vs = new THREE.PointCloud( fog_geometry_vs, fog_material);
	scene_vs.add(fogs_vs);

}

function animateParticles_vs(){
	particles_1_vs.rotation.y += 0.00025;
	particles_2_vs.rotation.y += 0.00035;
	particles_3_vs.rotation.y += 0.0004;
	fogs_vs.rotation.y += 0.0004;
}


// resize
function onWindowResize() {

	// Scene 1
	camera.aspect = window.innerWidth / 700;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, 700 );

	// Scene 2
	camera_vs.aspect = window.innerWidth / 700;
	camera_vs.updateProjectionMatrix();
	renderer_vs.setSize( window.innerWidth, 700 );
}


function render_vs() {

	//requestAnimationFrame( render );
	controls.update();
	renderer.render(scene, camera);
	animateParticles();


	requestAnimationFrame( render_vs );
	controls_vs.update();
	renderer_vs.render(scene_vs, camera_vs);
	animateParticles_vs();

};