var scene_intro, camera_intro, renderer_intro;

var particles_1_intro, particles_2_intro, particles_3_intro, fogs_intro;

function init_intro(){

	scene_intro = new THREE.Scene();

	renderer_intro = new THREE.WebGLRenderer({antialias:true});
	renderer_intro.setSize( window.innerWidth, 550 );

	var container_intro = document.getElementById("intro_canvas");
	container_intro.appendChild(renderer_intro.domElement);

	// Create camera
	camera_intro = new THREE.PerspectiveCamera( 45, window.innerWidth/550, 0.1, 2000 );
	controls_intro = new THREE.OrbitControls( camera_intro,container_intro );
	controls_intro.maxPolarAngle = Math.PI/2.3; 
	camera_intro.position.set(300, 150, 100);
	controls_intro.userRotate = false;
	scene_intro.add(camera_intro);

	// Scene background
	var backgroundColor = new THREE.Color("rgb(1,1,1)");
	renderer_intro.setClearColor( backgroundColor );

	drawParticles_intro();
	drawPark_intro();

	window.addEventListener( 'resize', onWindowResize_intro, false );
}

// Draw particles
function drawParticles_intro(){

	var total_particles_1_intro = 100, total_particles_2_intro = 100, total_particles_3_intro = 100, total_fogs_intro = 200;

	var far_pos = 350;


	// Create particles geometries
	var particle_1_geometry_intro = new THREE.Geometry(),
		particle_2_geometry_intro = new THREE.Geometry(),
		particle_3_geometry_intro = new THREE.Geometry(),
		fog_geometry_intro = new THREE.Geometry();

	//Add positions for each particle_1
	for (var i = 0; i < total_particles_1_intro; i++ ) {

		var pos_negX = Math.random() < 0.5 ? -1 : 1;
		var pos_negY = Math.random() < 0.5 ? -1 : 1;

		var vertex_particle_1_intro = new THREE.Vector3();
		vertex_particle_1_intro.x = (Math.random() * 400 + 0)*pos_negX;
		vertex_particle_1_intro.y = Math.random() * 160 + 20; // always positive. Bellow the floor.
		vertex_particle_1_intro.z = (Math.random() * 400 + 0)*pos_negY;

		if (vertex_particle_1_intro.x < far_pos && vertex_particle_1_intro.x > -far_pos && vertex_particle_1_intro.z < far_pos && vertex_particle_1_intro.z > -far_pos) {

		} else { particle_1_geometry_intro.vertices.push( vertex_particle_1_intro ); }

	}

	for (var i = 0; i < total_particles_2_intro; i++ ) {

		var pos_negX = Math.random() < 0.5 ? -1 : 1;
		var pos_negY = Math.random() < 0.5 ? -1 : 1;

		var vertex_particle_2_intro = new THREE.Vector3();
		vertex_particle_2_intro.x = (Math.random() * 400 + 0)*pos_negX;
		vertex_particle_2_intro.y = Math.random() * 170 + 30; // always positive. Bellow the floor.
		vertex_particle_2_intro.z = (Math.random() * 400 + 0)*pos_negY;

		if (vertex_particle_2_intro.x < far_pos && vertex_particle_2_intro.x > -far_pos && vertex_particle_2_intro.z < far_pos && vertex_particle_2_intro.z > -far_pos) {

		} else { particle_2_geometry_intro.vertices.push( vertex_particle_2_intro ); }

	}

	for (var i = 0; i < total_particles_3_intro; i++ ) {

		var pos_negX = Math.random() < 0.5 ? -1 : 1;
		var pos_negY = Math.random() < 0.5 ? -1 : 1;

		var vertex_particle_3_intro = new THREE.Vector3();
		vertex_particle_3_intro.x = (Math.random() * 400 + 0)*pos_negX;
		vertex_particle_3_intro.y = Math.random() * 170 + 30; // always positive. Bellow the floor.
		vertex_particle_3_intro.z = (Math.random() * 400 + 0)*pos_negY;

		if (vertex_particle_3_intro.x < far_pos && vertex_particle_3_intro.x > -far_pos && vertex_particle_3_intro.z < far_pos && vertex_particle_3_intro.z > -far_pos) {

		} else { particle_3_geometry_intro.vertices.push( vertex_particle_3_intro ); }

	}

	for (var i = 0; i < total_fogs_intro; i++ ) {

		var fog_posX = Math.random() < 0.5 ? -1 : 1;
		var fog_posY = Math.random() < 0.5 ? -1 : 1;

		var vertex_fog_intro = new THREE.Vector3();
		vertex_fog_intro.x = (Math.random() * 180 + 0)*fog_posX;
		vertex_fog_intro.y = Math.random() * 160 + 10;
		vertex_fog_intro.z = (Math.random() * 180 + 0)*fog_posY;

		if (vertex_fog_intro.x < 150 && vertex_fog_intro.x > -150 && vertex_fog_intro.z < 150 && vertex_fog_intro.z > -150 ) {

		} else { fog_geometry_intro.vertices.push( vertex_fog_intro )};

	}

	// Add texture image, material and to scene
	var particle_sprite = THREE.ImageUtils.loadTexture( ' img/particle3_2.png ');
	var particle_1_material = new THREE.PointCloudMaterial({ size: 128, map: particle_sprite, blending: THREE.AdditiveBlending, depthTest: true, transparent : true, opacity: 0.5});
	particles_1_intro = new THREE.PointCloud( particle_1_geometry_intro, particle_1_material);
	scene_intro.add(particles_1_intro);

	var particle_sprite_2 = THREE.ImageUtils.loadTexture( ' img/particle4.png ');
	var particle_2_material = new THREE.PointCloudMaterial({ size: 128, map: particle_sprite_2, blending: THREE.AdditiveBlending, depthTest: true, transparent : true, opacity: 0.5});
	particles_2_intro = new THREE.PointCloud( particle_2_geometry_intro, particle_2_material);
	scene_intro.add(particles_2_intro)

	var particle_sprite_3 = THREE.ImageUtils.loadTexture( ' img/particle2_2.png ');
	var particle_3_material = new THREE.PointCloudMaterial({ size: 128, map: particle_sprite_3, blending: THREE.AdditiveBlending, depthTest: true, transparent : true, opacity: 0.5});
	particles_3_intro = new THREE.PointCloud( particle_3_geometry_intro, particle_3_material);
	scene_intro.add(particles_3_intro);

	var fog_sprite = THREE.ImageUtils.loadTexture( 'img/smoke.png');
	var fog_material = new THREE.PointCloudMaterial({ size: 256, map: fog_sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent : true, opacity: 0.04});
	fogs_intro = new THREE.PointCloud( fog_geometry_intro, fog_material);
	scene_intro.add(fogs_intro);

}



function drawPark_intro(){
	// small edge --> 40
	// big edge --> 102
	// widht --> 87

	// Landing position z --> 79

	var white_100 = new THREE.Color("rgb(100, 100, 100)");
	var white_100_material = new THREE.MeshBasicMaterial({ color: white_100 });

	var white_150 = new THREE.Color("rgb(150, 150, 150)");
	var white_150_material = new THREE.MeshBasicMaterial({ color: white_150 });

	var white_200 = new THREE.Color("rgb(200, 200, 200)"); 
	var white_200_material = new THREE.MeshBasicMaterial({ color: white_200 });

	var white_250 = new THREE.Color("rgb(250, 250, 250)"); 
	var white_250_material = new THREE.MeshBasicMaterial({ color: white_250 });

	var spriteFloor_intro = THREE.ImageUtils.loadTexture('img/textures/v2/100-1-1.png');
	var floor_material_intro = new THREE.MeshBasicMaterial({ map: spriteFloor_intro });

	var spriteFloor2_intro = THREE.ImageUtils.loadTexture('img/textures/v2/100-2-1.png');
	var floor2_material_intro = new THREE.MeshBasicMaterial({ map: spriteFloor2_intro });

	var spriteleftEdge_intro = THREE.ImageUtils.loadTexture('img/textures/v2/40-2.png');
	var spriteleftEdge_intro_material = new THREE.MeshBasicMaterial({ map: spriteleftEdge_intro });

	var spriteTopEdge_intro = THREE.ImageUtils.loadTexture('img/textures/v2/87-2.png');
	var spriteTopEdge_intro_material = new THREE.MeshBasicMaterial({ map: spriteTopEdge_intro });

	var spriteRightEdge_intro = THREE.ImageUtils.loadTexture('img/textures/v2/102-2.png');
	var spriteRightEdge_intro_material = new THREE.MeshBasicMaterial({ map: spriteRightEdge_intro });


	var elements_center_y_intro = -50;

	// floor
	var floorGeometry = new THREE.PlaneBufferGeometry(100, 1024);
	var floor = new THREE.Mesh(floorGeometry, floor2_material_intro);
	floor.rotation.x = -Math.PI / 2;
	floor.position.y = -23.5+elements_center_y_intro;
	floor.position.x = 93.5;
	floor.position.z = -150;
	//floor.material.side = THREE.DoubleSide;
	scene_intro.add(floor);

	//top level
	var top_level_geometry = new THREE.PlaneBufferGeometry(100, 1024);
	var top_level = new THREE.Mesh(top_level_geometry, floor_material_intro);
	top_level.rotation.x = -Math.PI / 2;
	top_level.position.y = 62-23.5+elements_center_y_intro;
	top_level.position.x = -93.5;
	top_level.position.z = -150;
	scene_intro.add(top_level);

	//edge left wall
	var edge_left_geometry = new THREE.PlaneBufferGeometry(40, 1024);
	var edge_left = new THREE.Mesh(edge_left_geometry, spriteleftEdge_intro_material);
	edge_left.rotation.x = -Math.PI / 2;
	edge_left.rotation.y = -Math.PI / 2;
	edge_left.material.side = THREE.DoubleSide;
	edge_left.position.y = 82-23.5+elements_center_y_intro;
	edge_left.position.x = -43.5;
	edge_left.position.z = -150;
	scene_intro.add(edge_left);

	//edge top wall
	var edge_top_geometry = new THREE.PlaneBufferGeometry(87, 1024);
	var edge_top = new THREE.Mesh(edge_top_geometry, spriteTopEdge_intro_material);
	edge_top.rotation.x = -Math.PI / 2;
	edge_top.position.y = 102-23.5+elements_center_y_intro;
	edge_top.position.z = -150;
	scene_intro.add(edge_top);

	// edge right wall
	var edge_right_geometry = new THREE.PlaneBufferGeometry(102, 1024);
	var edge_right = new THREE.Mesh(edge_right_geometry, spriteRightEdge_intro_material);
	edge_right.rotation.x = -Math.PI / 2;
	edge_right.rotation.y = -Math.PI / 2;
	edge_right.material.side = THREE.DoubleSide;
	edge_right.position.y = 51-23.5+elements_center_y_intro;
	edge_right.position.x = 43.5;
	edge_right.position.z = -150;
	scene_intro.add(edge_right);

}

function animateParticles_intro(){
	particles_1_intro.rotation.y += 0.00025;
	particles_2_intro.rotation.y += 0.00035;
	particles_3_intro.rotation.y += 0.0004;
	fogs_intro.rotation.y += 0.0004;
}


// resize
function onWindowResize_intro() {

	// Scene 1
	camera_intro.aspect = window.innerWidth / 550;
	camera_intro.updateProjectionMatrix();
	renderer_intro.setSize( window.innerWidth, 550 );

}

function render_intro() {

	requestAnimationFrame( render_intro );
	controls_intro.update();
	renderer_intro.render(scene_intro, camera_intro);
	animateParticles_intro();

};