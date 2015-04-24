
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
	var backgroundColor = new THREE.Color("rgb(40,40,40)");
	renderer.setClearColor( backgroundColor );

	// Resize window
	window.addEventListener( 'resize', onWindowResize, false );
}


	// Colors and materials
	var black = new THREE.Color("rgb(30,30,30)");
	var blackMaterial = new THREE.MeshBasicMaterial(  {color: black}  );
	var blackMaterialBack = new THREE.MeshBasicMaterial(  {color: black}  );

	var yellow = new THREE.Color("rgb(184, 228, 20)");
	var yellowMaterial = new THREE.MeshBasicMaterial({ color: yellow });
	var yellowMaterialBack = new THREE.MeshBasicMaterial({ color: yellow });

	var blue = new THREE.Color("rgb(0, 200, 255)");
	var blueMaterial = new THREE.MeshBasicMaterial({ color:blue });
	var blueMaterialBack = new THREE.MeshBasicMaterial({ color:blue });

	var darkGrey = new THREE.Color("rgb(150, 150, 150)");
	var lightGreyMaterial = new THREE.MeshBasicMaterial({ color: darkGrey });

	var red = new THREE.Color("rgb(250, 0, 0)");
	var redMaterial = new THREE.MeshBasicMaterial({ color: red });
	var redMaterial2 = new THREE.MeshBasicMaterial({ color: red });


drawSkateboard();
function drawSkateboard(){




	// draw floor
	var floorGeometry = new THREE.PlaneBufferGeometry(500, 400);
	var floor = new THREE.Mesh(floorGeometry, lightGreyMaterial);
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
	// Draw the parts of the skateboard with triangles
	//drawVertices();

}


function drawVertices(){

// Tail right edge concave
var tail_right_edge_concave_geometry = new THREE.BufferGeometry();
var vertices = new Float32Array( tail_right_edge_concave_vertices.length * 3 ); 
for ( var i = 0; i < tail_right_edge_concave_vertices.length; i++ )
{
	vertices[ i*3 + 0 ] = tail_right_edge_concave_vertices[i][0];
	vertices[ i*3 + 1 ] = tail_right_edge_concave_vertices[i][1];
	vertices[ i*3 + 2 ] = tail_right_edge_concave_vertices[i][2];
}
tail_right_edge_concave_geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
var tail_right_edge_concave_mesh = new THREE.Mesh( tail_right_edge_concave_geometry, yellowMaterial );
tail_right_edge_concave_mesh.material.side = THREE.FrontSide;
scene.add(tail_right_edge_concave_mesh);

// Tail left edge concave
var tail_left_edge_concave_geometry = new THREE.BufferGeometry();
var vertices = new Float32Array( tail_right_edge_concave_vertices.length * 3 ); 
for ( var i = 0; i < tail_right_edge_concave_vertices.length; i++ )
{
	vertices[ i*3 + 0 ] = tail_right_edge_concave_vertices[i][0];
	vertices[ i*3 + 1 ] = tail_right_edge_concave_vertices[i][1];
	vertices[ i*3 + 2 ] = tail_right_edge_concave_vertices[i][2];
	vertices[ i*3 + 2 ] = vertices[ i*3 + 2 ]*-1;
}
tail_left_edge_concave_geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
var tail_left_edge_concave_mesh = new THREE.Mesh( tail_left_edge_concave_geometry, blueMaterialBack );
tail_left_edge_concave_mesh.material.side = THREE.BackSide;
scene.add(tail_left_edge_concave_mesh);


// Nose right edge concave
var nose_right_edge_concave_geometry = new THREE.BufferGeometry();
var vertices = new Float32Array( tail_right_edge_concave_vertices.length * 3 ); 
for ( var i = 0; i < tail_right_edge_concave_vertices.length; i++ )
{
	vertices[ i*3 + 0 ] = tail_right_edge_concave_vertices[i][0];
	vertices[ i*3 + 1 ] = tail_right_edge_concave_vertices[i][1];
	vertices[ i*3 + 2 ] = tail_right_edge_concave_vertices[i][2];
	vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]*-1;
	// vertices[ i*3 + 3 ] = vertices[ i*3 + 3 ]*-1;
}
nose_right_edge_concave_geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
var nose_right_edge_concave_mesh = new THREE.Mesh( nose_right_edge_concave_geometry, yellowMaterialBack );
nose_right_edge_concave_mesh.material.side = THREE.BackSide;
scene.add(nose_right_edge_concave_mesh);

// Nose left edge concave
var nose_left_edge_concave_geometry = new THREE.BufferGeometry();
var vertices = new Float32Array( tail_right_edge_concave_vertices.length * 3 ); 
for ( var i = 0; i < tail_right_edge_concave_vertices.length; i++ )
{
	vertices[ i*3 + 0 ] = tail_right_edge_concave_vertices[i][0];
	vertices[ i*3 + 1 ] = tail_right_edge_concave_vertices[i][1];
	vertices[ i*3 + 2 ] = tail_right_edge_concave_vertices[i][2];
	vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]*-1;
	vertices[ i*3 + 2 ] = vertices[ i*3 + 2 ]*-1;
}
nose_left_edge_concave_geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
var nose_left_edge_concave_mesh = new THREE.Mesh( nose_left_edge_concave_geometry, blueMaterial );
nose_left_edge_concave_mesh.material.side = THREE.FrontSide;
scene.add(nose_left_edge_concave_mesh);


// ------------------------------------------------------------------------------------------------

// Concave tail top
var tail_top_concave_geometry = new THREE.BufferGeometry();
var vertices = new Float32Array( tail_top_concave_vertices.length * 3 ); 
for ( var i = 0; i < tail_top_concave_vertices.length; i++ )
{
	vertices[ i*3 + 0 ] = tail_top_concave_vertices[i][0];
	vertices[ i*3 + 1 ] = tail_top_concave_vertices[i][1];
	vertices[ i*3 + 2 ] = tail_top_concave_vertices[i][2];

}
tail_top_concave_geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
var tail_top_concave_mesh = new THREE.Mesh( tail_top_concave_geometry, blackMaterial );
scene.add(tail_top_concave_mesh);

// Concave tail bottom
var tail_bottom_concave_geometry = new THREE.BufferGeometry();
var vertices = new Float32Array( tail_top_concave_vertices.length * 3 ); 
for ( var i = 0; i < tail_top_concave_vertices.length; i++ )
{
	vertices[ i*3 + 0 ] = tail_top_concave_vertices[i][0];
	vertices[ i*3 + 1 ] = tail_top_concave_vertices[i][1];
	vertices[ i*3 + 2 ] = tail_top_concave_vertices[i][2];
	vertices[ i*3 + 1 ] = vertices[ i*3 + 1 ] - 1;

}
tail_bottom_concave_geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
var tail_bottom_concave_mesh = new THREE.Mesh( tail_bottom_concave_geometry, blackMaterial );
scene.add(tail_bottom_concave_mesh);

// Concave nose top
var nose_top_concave_geometry = new THREE.BufferGeometry();
var vertices = new Float32Array( tail_top_concave_vertices.length * 3 ); 
for ( var i = 0; i < tail_top_concave_vertices.length; i++ )
{
	vertices[ i*3 + 0 ] = tail_top_concave_vertices[i][0];
	vertices[ i*3 + 1 ] = tail_top_concave_vertices[i][1];
	vertices[ i*3 + 2 ] = tail_top_concave_vertices[i][2];
	vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]*-1;
}
nose_top_concave_geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
var nose_top_concave_mesh = new THREE.Mesh( nose_top_concave_geometry, blackMaterial );
scene.add(nose_top_concave_mesh);


// Concave nose bottom
var nose_bottom_concave_geometry = new THREE.BufferGeometry();
var vertices = new Float32Array( tail_top_concave_vertices.length * 3 ); 
for ( var i = 0; i < tail_top_concave_vertices.length; i++ )
{
	vertices[ i*3 + 0 ] = tail_top_concave_vertices[i][0];
	vertices[ i*3 + 1 ] = tail_top_concave_vertices[i][1];
	vertices[ i*3 + 2 ] = tail_top_concave_vertices[i][2];
	vertices[ i*3 + 1 ] = vertices[ i*3 + 1 ] - 1;
	vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]*-1;

}
nose_bottom_concave_geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
var nose_bottom_concave_mesh = new THREE.Mesh( nose_bottom_concave_geometry, blackMaterial );
scene.add(nose_bottom_concave_mesh);

// ---------------------------------------------

// tail top right edge
var tail_top_right_edge_geometry = new THREE.BufferGeometry();
var vertices = new Float32Array( tail_top_right_edge_vertices.length * 3);
for (var i = 0; i < tail_top_right_edge_vertices.length; i++)
{
	vertices[ i*3 + 0 ] = tail_top_right_edge_vertices[i][0];
	vertices[ i*3 + 1 ] = tail_top_right_edge_vertices[i][1];
	vertices[ i*3 + 2 ] = tail_top_right_edge_vertices[i][2];
}
tail_top_right_edge_geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
var tail_top_right_edge_mesh = new THREE.Mesh( tail_top_right_edge_geometry, yellowMaterial );
scene.add(tail_top_right_edge_mesh);


// tail top left edge
var tail_top_left_edge_geometry = new THREE.BufferGeometry();
var vertices = new Float32Array( tail_top_right_edge_vertices.length * 3);
for (var i = 0; i < tail_top_right_edge_vertices.length; i++)
{
	vertices[ i*3 + 0 ] = tail_top_right_edge_vertices[i][0];
	vertices[ i*3 + 1 ] = tail_top_right_edge_vertices[i][1];
	vertices[ i*3 + 2 ] = tail_top_right_edge_vertices[i][2];
	vertices[ i*3 + 2 ] = vertices[ i*3 + 2 ]*-1;
}
tail_top_left_edge_geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
var tail_top_left_edge_mesh = new THREE.Mesh( tail_top_left_edge_geometry, blueMaterialBack );
scene.add(tail_top_left_edge_mesh);


// Tail top
var tail_top_geometry = new THREE.BufferGeometry();
var vertices = new Float32Array( tail_top_vertices.length * 3);
for (var i = 0; i < tail_top_vertices.length; i++)
{
	vertices[ i*3 + 0 ] = tail_top_vertices[i][0];
	vertices[ i*3 + 1 ] = tail_top_vertices[i][1];
	vertices[ i*3 + 2 ] = tail_top_vertices[i][2];
}
tail_top_geometry.addAttribute( 'position' , new THREE.BufferAttribute( vertices, 3 ));
var tail_top_mesh = new THREE.Mesh( tail_top_geometry, blackMaterial);
scene.add(tail_top_mesh);


// Tail bottom
var tail_bottom_geometry = new THREE.BufferGeometry();
var vertices = new Float32Array( tail_top_vertices.length * 3);
for (var i = 0; i < tail_top_vertices.length; i++)
{
	vertices[ i*3 + 0 ] = tail_top_vertices[i][0];
	vertices[ i*3 + 1 ] = tail_top_vertices[i][1];
	vertices[ i*3 + 2 ] = tail_top_vertices[i][2];
	vertices[ i*3 + 1 ] = vertices[ i*3 + 1 ]-1;
}
tail_bottom_geometry.addAttribute( 'position' , new THREE.BufferAttribute( vertices, 3 ));
var tail_bottom_mesh = new THREE.Mesh( tail_bottom_geometry, blackMaterialBack );
tail_bottom_mesh.material.side = THREE.BackSide;
scene.add(tail_bottom_mesh);


// nose right edge
var nose_right_edge_geometry = new THREE.BufferGeometry();
var vertices = new Float32Array( tail_top_right_edge_vertices.length * 3);
for (var i = 0; i < tail_top_right_edge_vertices.length; i++)
{
	vertices[ i*3 + 0 ] = tail_top_right_edge_vertices[i][0];
	vertices[ i*3 + 1 ] = tail_top_right_edge_vertices[i][1];
	vertices[ i*3 + 2 ] = tail_top_right_edge_vertices[i][2];
	vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]*-1;
}
nose_right_edge_geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
var nose_right_edge_mesh = new THREE.Mesh( nose_right_edge_geometry, yellowMaterialBack );
scene.add(nose_right_edge_mesh);


// nose left edge
var nose_left_edge_geometry = new THREE.BufferGeometry();
var vertices = new Float32Array( tail_top_right_edge_vertices.length * 3);
for (var i = 0; i < tail_top_right_edge_vertices.length; i++)
{
	vertices[ i*3 + 0 ] = tail_top_right_edge_vertices[i][0];
	vertices[ i*3 + 1 ] = tail_top_right_edge_vertices[i][1];
	vertices[ i*3 + 2 ] = tail_top_right_edge_vertices[i][2];
	vertices[ i*3 + 2 ] = vertices[ i*3 + 2 ]*-1;
	vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]*-1;
}
nose_left_edge_geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
var nose_left_edge_mesh = new THREE.Mesh( nose_left_edge_geometry, blueMaterial );
scene.add(nose_left_edge_mesh);


// nose top
var nose_top_geometry = new THREE.BufferGeometry();
var vertices = new Float32Array( tail_top_vertices.length * 3);
for (var i = 0; i < tail_top_vertices.length; i++)
{
	vertices[ i*3 + 0 ] = tail_top_vertices[i][0];
	vertices[ i*3 + 1 ] = tail_top_vertices[i][1];
	vertices[ i*3 + 2 ] = tail_top_vertices[i][2];
	vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]*-1;
}
nose_top_geometry.addAttribute( 'position' , new THREE.BufferAttribute( vertices, 3 ));
var nose_top_mesh = new THREE.Mesh( nose_top_geometry, blackMaterial);
scene.add(nose_top_mesh);


// nose bottom
var nose_bottom_geometry = new THREE.BufferGeometry();
var vertices = new Float32Array( tail_top_vertices.length * 3);
for (var i = 0; i < tail_top_vertices.length; i++)
{
	vertices[ i*3 + 0 ] = tail_top_vertices[i][0];
	vertices[ i*3 + 1 ] = tail_top_vertices[i][1];
	vertices[ i*3 + 2 ] = tail_top_vertices[i][2];
	vertices[ i*3 + 1 ] = vertices[ i*3 + 1 ]-1;
	vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]*-1;
}
nose_bottom_geometry.addAttribute( 'position' , new THREE.BufferAttribute( vertices, 3 ));
var nose_bottom_mesh = new THREE.Mesh( nose_bottom_geometry, blackMaterial );
//nose_bottom_mesh.material.side = THREE.BackSide;
scene.add(nose_bottom_mesh);


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

