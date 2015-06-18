
var scene_mark, camera_mark, renderer_mark;

var elements_center_y = -30;

var scene_2_on = false;


	var black_mark = new THREE.Color("rgb(0,0,0)");
	var blackMaterial_mark = new THREE.MeshBasicMaterial(  {color: black_mark}  );
	var blackMaterialBack_mark = new THREE.MeshBasicMaterial(  {color: black_mark}  );

	var yellowLine_mark = new THREE.Color("rgb(184, 228, 20)");
	var yellow_mark = new THREE.Color("rgb(184, 228, 20)");
	var yellowMaterial_mark = new THREE.MeshBasicMaterial({ color: yellow_mark });
	var yellowMaterialBack_mark = new THREE.MeshBasicMaterial({ color: yellow_mark });

	var blueLine_mark = new THREE.Color("rgb(0, 200, 255)");
	var blue_mark = new THREE.Color("rgb(0, 200, 255)");
	var blueMaterial_mark = new THREE.MeshBasicMaterial({ color:blue_mark });
	var blueMaterialBack_mark = new THREE.MeshBasicMaterial({ color:blue_mark });

	var darkGrey_mark = new THREE.Color("rgb(30, 30, 30)");
	var darkGreyMaterial_mark = new THREE.MeshBasicMaterial({ color: darkGrey_mark });

	var darkerGrey_mark = new THREE.Color("rgb(0, 0, 0)");
	var floorMaterial_mark = new THREE.MeshBasicMaterial({ color: darkerGrey_mark });



function init_mark(){

	scene_mark = new THREE.Scene();

	renderer_mark = new THREE.WebGLRenderer({antialias:true});
	renderer_mark.setSize( window.innerWidth, 720 );

	var container_mark = document.getElementById("mark_canvas");
	container_mark.appendChild(renderer_mark.domElement);

	// Create camera
	camera_mark = new THREE.PerspectiveCamera( 45, window.innerWidth/720, 0.1, 2000 );
	controls_mark = new THREE.OrbitControls( camera_mark,container_mark );
	controls_mark.maxPolarAngle = Math.PI/2.5; 
	camera_mark.position.set(120, 120, 240);
	scene_mark.add(camera_mark);

	// Scene background
	var backgroundColor = new THREE.Color("rgb(1,1,1)");
	renderer_mark.setClearColor( backgroundColor );

	//drawTrick_mark();

	window.addEventListener( 'resize', onWindowResize_mark, false );

}


function drawPark(){


	var white_100 = new THREE.Color("rgb(100, 100, 100)");
	var white_100_material = new THREE.MeshBasicMaterial({ color: white_100 });

	var white_150 = new THREE.Color("rgb(150, 150, 150)");
	var white_150_material = new THREE.MeshBasicMaterial({ color: white_150 });

	var white_200 = new THREE.Color("rgb(200, 200, 200)"); 
	var white_200_material = new THREE.MeshBasicMaterial({ color: white_200 });

	var white_250 = new THREE.Color("rgb(250, 250, 250)"); 
	var white_250_material = new THREE.MeshBasicMaterial({ color: white_250 });

	// floor
	var floorGeometry = new THREE.PlaneBufferGeometry(1024, 1024);
	var floor = new THREE.Mesh(floorGeometry, white_100_material);
	floor.rotation.x = -Math.PI / 2;
	floor.position.y = -23.5+elements_center_y;
	floor.material.side = THREE.DoubleSide;
	scene_mark.add(floor);

	// top level
	var top_level_geometry = new THREE.PlaneBufferGeometry(512, 1024);
	var top_level = new THREE.Mesh(top_level_geometry, white_100_material);
	top_level.rotation.x = -Math.PI / 2;
	top_level.position.y = 40-23.5+elements_center_y;
	top_level.position.x = -512/2;
	scene_mark.add(top_level);

	// edge left wall
	var edge_left_geometry = new THREE.PlaneBufferGeometry(40, 1024);
	var edge_left = new THREE.Mesh(edge_left_geometry, white_250_material);
	edge_left.rotation.x = -Math.PI / 2;
	edge_left.rotation.y = -Math.PI / 2;
	edge_left.material.side = THREE.DoubleSide;
	edge_left.position.y = 60-23.5+elements_center_y;
	edge_left.position.x = -20;
	scene_mark.add(edge_left);

	// edge top wall
	var edge_top_geometry = new THREE.PlaneBufferGeometry(40, 1024);
	var edge_top = new THREE.Mesh(edge_top_geometry, white_150_material);
	edge_top.rotation.x = -Math.PI / 2;
	edge_top.position.y = 80-23.5+elements_center_y;;
	scene_mark.add(edge_top);

	// edge right wall
	var edge_right_geometry = new THREE.PlaneBufferGeometry(80, 1024);
	var edge_right = new THREE.Mesh(edge_right_geometry, white_200_material);
	edge_right.rotation.x = -Math.PI / 2;
	edge_right.rotation.y = -Math.PI / 2;
	edge_right.material.side = THREE.DoubleSide;
	edge_right.position.y = 40-23.5+elements_center_y;
	edge_right.position.x = 20;
	scene_mark.add(edge_right);

}

// resize
function onWindowResize_mark() {

	// Scene 1
	camera_mark.aspect = window.innerWidth / 720;
	camera_mark.updateProjectionMatrix();
	renderer_mark.setSize( window.innerWidth, 720 );

}


function render_mark() {

	requestAnimationFrame( render_mark );
	controls_mark.update();
	renderer_mark.render(scene_mark, camera_mark);

};

$(function(){

	init_mark();
	drawPark();
	render_mark();

})