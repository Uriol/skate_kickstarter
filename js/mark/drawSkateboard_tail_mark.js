var skateboard_tail_mark;
var skateboard_tail_tail_pivot_line_mark, 
	skateboard_tail_center_pivot_line_mark, 
	skateboard_tail_nose_pivot_line_mark;

function drawSkateboard_tail_mark(){

	skateboard_tail_mark = new THREE.Object3D();
	skateboard_tail_mark.name = 'skateboardObject_mark';
	// Draw the lines in the skateboard
	drawLines_tail_mark();
	// Draw the parts of the skateboard with triangles
	drawVertices_tail_mark();


	scene_mark.add(skateboard_tail_mark);


}


function drawVertices_tail_mark(){

	if (onGround_bool_mark == true || reception_mark == true){
		blueMaterial_mark = new THREE.MeshBasicMaterial({ color: darkGrey_mark });
		yellowMaterial_mark = new THREE.MeshBasicMaterial({ color: darkGrey_mark });
		blueMaterialBack_mark = new THREE.MeshBasicMaterial({ color: darkGrey_mark });
		yellowMaterialBack_mark = new THREE.MeshBasicMaterial({ color: darkGrey_mark });
	} else {
		blueMaterial_mark = new THREE.MeshBasicMaterial({ color:blue_mark });
		yellowMaterial_mark = new THREE.MeshBasicMaterial({ color:yellow_mark });
		blueMaterialBack_mark = new THREE.MeshBasicMaterial({ color:blue_mark });
		yellowMaterialBack_mark = new THREE.MeshBasicMaterial({ color:yellow_mark });
	}
	
	var skateboard_tail_nose_pivot_geometry = new THREE.Geometry();
	skateboard_tail_nose_pivot_line_mark = new THREE.Line(skateboard_tail_center_pivot_geometry);
	skateboard_tail_nose_pivot_line_mark.position.x = 48;
	skateboard_tail_mark.add(skateboard_tail_nose_pivot_line_mark);
	
	var skateboard_tail_center_pivot_geometry = new THREE.Geometry();
	skateboard_tail_center_pivot_line_mark = new THREE.Line(skateboard_tail_nose_pivot_geometry);
	skateboard_tail_center_pivot_line_mark.position.x = 24;
	skateboard_tail_mark.add(skateboard_tail_center_pivot_line_mark);

	var skateboard_tail_tail_pivot_geometry = new THREE.Geometry();
	skateboard_tail_tail_pivot_line_mark = new THREE.Line(skateboard_tail_tail_pivot_geometry);
	skateboard_tail_tail_pivot_line_mark.position.x = 0;
	skateboard_tail_mark.add(skateboard_tail_tail_pivot_line_mark);

	// var whiteLine = new THREE.Color("rgb(255, 255, 255)");
	// var pivotMaterial = new THREE.LineBasicMaterial({ color: whiteLine, linewidth: 1 });
	// var skateboard_tail_tail_pivot_geometry = new THREE.Geometry();
	// skateboard_tail_tail_pivot_geometry.vertices.push(new THREE.Vector3(24, -5, 0));
	// skateboard_tail_tail_pivot_geometry.vertices.push(new THREE.Vector3(24, 5, 0));
	// skateboard_tail_tail_pivot_line = new THREE.Line(skateboard_tail_tail_pivot_geometry, pivotMaterial);
	// skateboard_tail.add(skateboard_tail_tail_pivot_line);

	// var skateboard_tail_nose_pivot_geometry = new THREE.Geometry();
	// skateboard_tail_nose_pivot_geometry.vertices.push(new THREE.Vector3(48, -5, 0));
	// skateboard_tail_nose_pivot_geometry.vertices.push(new THREE.Vector3(48, 5, 0));
	// skateboard_tail_nose_pivot_line = new THREE.Line(skateboard_tail_nose_pivot_geometry, pivotMaterial);
	// skateboard_tail.add(skateboard_tail_nose_pivot_line);

	


	// Top center
	var topGeometry = new THREE.PlaneBufferGeometry( 40,20 );
	var top_mark = new THREE.Mesh(topGeometry, blackMaterial_mark);
	top_mark.position.x = 24;
	top_mark.rotation.x = -Math.PI / 2;
	top_mark.position.y = 0.5;
	skateboard_tail_mark.add(top_mark)

	// Bottom center
	var bottomGeometry = new THREE.PlaneBufferGeometry( 40,20 );
	var bottom_mark = new THREE.Mesh(bottomGeometry, blackMaterial_mark);
	bottom_mark.position.y = -0.2;
	bottom_mark.rotation.x = -Math.PI / 2;
	bottom_mark.position.x = 24;
	bottom_mark.material.side = THREE.DoubleSide;
	skateboard_tail_mark.add(bottom_mark)

	// Right edge
	var rightEdgeGeometry = new THREE.PlaneBufferGeometry(40,0.7);
	var rightEdge_mark = new THREE.Mesh(rightEdgeGeometry, yellowMaterial_mark);
	rightEdge_mark.position.z = 10;
	rightEdge_mark.position.y = 0.15;
	rightEdge_mark.position.x = 24;
	//rightEdge.material.side = THREE.DoubleSide;
	skateboard_tail_mark.add(rightEdge_mark);

	// Left edge
	var leftEdgeGeometry = new THREE.PlaneBufferGeometry(40,0.7);
	var leftEdge_mark = new THREE.Mesh(leftEdgeGeometry, blueMaterial_mark);
	leftEdge_mark.position.z = -10;
	leftEdge_mark.rotation.x = -Math.PI;
	leftEdge_mark.position.y = 0.15;
	leftEdge_mark.position.x = 24;
	skateboard_tail_mark.add(leftEdge_mark);

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
	var tail_right_edge_concave_mesh_mark = new THREE.Mesh( tail_right_edge_concave_geometry, yellowMaterial_mark );
	tail_right_edge_concave_mesh_mark.material.side = THREE.FrontSide;
	skateboard_tail_mark.add(tail_right_edge_concave_mesh_mark);

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
	var tail_left_edge_concave_mesh_mark = new THREE.Mesh( tail_left_edge_concave_geometry, blueMaterialBack_mark );
	tail_left_edge_concave_mesh_mark.material.side = THREE.BackSide;
	skateboard_tail_mark.add(tail_left_edge_concave_mesh_mark);


	// Nose right edge concave
	var nose_right_edge_concave_geometry = new THREE.BufferGeometry();
	var vertices = new Float32Array( tail_right_edge_concave_vertices.length * 3 ); 
	for ( var i = 0; i < tail_right_edge_concave_vertices.length; i++ )
	{
		vertices[ i*3 + 0 ] = tail_right_edge_concave_vertices[i][0];
		vertices[ i*3 + 1 ] = tail_right_edge_concave_vertices[i][1];
		vertices[ i*3 + 2 ] = tail_right_edge_concave_vertices[i][2];
		vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]*-1+48;
		// vertices[ i*3 + 3 ] = vertices[ i*3 + 3 ]*-1;
	}
	nose_right_edge_concave_geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	var nose_right_edge_concave_mesh_mark = new THREE.Mesh( nose_right_edge_concave_geometry, yellowMaterialBack_mark );
	nose_right_edge_concave_mesh_mark.material.side = THREE.BackSide;
	skateboard_tail_mark.add(nose_right_edge_concave_mesh_mark);

	// Nose left edge concave
	var nose_left_edge_concave_geometry = new THREE.BufferGeometry();
	var vertices = new Float32Array( tail_right_edge_concave_vertices.length * 3 ); 
	for ( var i = 0; i < tail_right_edge_concave_vertices.length; i++ )
	{
		vertices[ i*3 + 0 ] = tail_right_edge_concave_vertices[i][0];
		vertices[ i*3 + 1 ] = tail_right_edge_concave_vertices[i][1];
		vertices[ i*3 + 2 ] = tail_right_edge_concave_vertices[i][2];
		vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]*-1+48;
		vertices[ i*3 + 2 ] = vertices[ i*3 + 2 ]*-1;
	}
	nose_left_edge_concave_geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	var nose_left_edge_concave_mesh_mark = new THREE.Mesh( nose_left_edge_concave_geometry, blueMaterial_mark );
	nose_left_edge_concave_mesh_mark.material.side = THREE.FrontSide;
	skateboard_tail_mark.add(nose_left_edge_concave_mesh_mark);


// // // ------------------------------------------------------------------------------------------------

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
	var tail_top_concave_mesh_mark = new THREE.Mesh( tail_top_concave_geometry, blackMaterial_mark );
	skateboard_tail_mark.add(tail_top_concave_mesh_mark);

	// Concave tail bottom
	var tail_bottom_concave_geometry = new THREE.BufferGeometry();
	var vertices = new Float32Array( tail_top_concave_vertices.length * 3 ); 
	for ( var i = 0; i < tail_top_concave_vertices.length; i++ )
	{
		vertices[ i*3 + 0 ] = tail_top_concave_vertices[i][0];
		vertices[ i*3 + 1 ] = tail_top_concave_vertices[i][1];
		vertices[ i*3 + 2 ] = tail_top_concave_vertices[i][2];
		vertices[ i*3 + 1 ] = vertices[ i*3 + 1 ] - 0.7;

	}
	tail_bottom_concave_geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	var tail_bottom_concave_mesh_mark = new THREE.Mesh( tail_bottom_concave_geometry, blackMaterial_mark );
	skateboard_tail_mark.add(tail_bottom_concave_mesh_mark);

	// Concave nose top
	var nose_top_concave_geometry = new THREE.BufferGeometry();
	var vertices = new Float32Array( tail_top_concave_vertices.length * 3 ); 
	for ( var i = 0; i < tail_top_concave_vertices.length; i++ )
	{
		vertices[ i*3 + 0 ] = tail_top_concave_vertices[i][0];
		vertices[ i*3 + 1 ] = tail_top_concave_vertices[i][1];
		vertices[ i*3 + 2 ] = tail_top_concave_vertices[i][2];
		vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]*-1+48;
	}
	nose_top_concave_geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	var nose_top_concave_mesh_mark = new THREE.Mesh( nose_top_concave_geometry, blackMaterial_mark );
	skateboard_tail_mark.add(nose_top_concave_mesh_mark);


	// Concave nose bottom
	var nose_bottom_concave_geometry = new THREE.BufferGeometry();
	var vertices = new Float32Array( tail_top_concave_vertices.length * 3 ); 
	for ( var i = 0; i < tail_top_concave_vertices.length; i++ )
	{
		vertices[ i*3 + 0 ] = tail_top_concave_vertices[i][0];
		vertices[ i*3 + 1 ] = tail_top_concave_vertices[i][1];
		vertices[ i*3 + 2 ] = tail_top_concave_vertices[i][2];
		vertices[ i*3 + 1 ] = vertices[ i*3 + 1 ] - 0.7;
		vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]*-1+48;

	}
	nose_bottom_concave_geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	var nose_bottom_concave_mesh_mark = new THREE.Mesh( nose_bottom_concave_geometry, blackMaterial_mark );
	skateboard_tail_mark.add(nose_bottom_concave_mesh_mark);

// 	// ---------------------------------------------

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
	var tail_top_right_edge_mesh_mark = new THREE.Mesh( tail_top_right_edge_geometry, yellowMaterial_mark );
	skateboard_tail_mark.add(tail_top_right_edge_mesh_mark);


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
	var tail_top_left_edge_mesh_mark = new THREE.Mesh( tail_top_left_edge_geometry, blueMaterialBack_mark );
	skateboard_tail_mark.add(tail_top_left_edge_mesh_mark);


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
	var tail_top_mesh_mark = new THREE.Mesh( tail_top_geometry, blackMaterial_mark);
	skateboard_tail_mark.add(tail_top_mesh_mark);


	// Tail bottom
	var tail_bottom_geometry = new THREE.BufferGeometry();
	var vertices = new Float32Array( tail_top_vertices.length * 3);
	for (var i = 0; i < tail_top_vertices.length; i++)
	{
		vertices[ i*3 + 0 ] = tail_top_vertices[i][0];
		vertices[ i*3 + 1 ] = tail_top_vertices[i][1];
		vertices[ i*3 + 2 ] = tail_top_vertices[i][2];
		vertices[ i*3 + 1 ] = vertices[ i*3 + 1 ]- 0.7;
	}
	tail_bottom_geometry.addAttribute( 'position' , new THREE.BufferAttribute( vertices, 3 ));
	var tail_bottom_mesh_mark = new THREE.Mesh( tail_bottom_geometry, blackMaterialBack_mark );
	tail_bottom_mesh_mark.material.side = THREE.BackSide;
	skateboard_tail_mark.add(tail_bottom_mesh_mark);


	// nose right edge
	var nose_right_edge_geometry = new THREE.BufferGeometry();
	var vertices = new Float32Array( tail_top_right_edge_vertices.length * 3);
	for (var i = 0; i < tail_top_right_edge_vertices.length; i++)
	{
		vertices[ i*3 + 0 ] = tail_top_right_edge_vertices[i][0];
		vertices[ i*3 + 1 ] = tail_top_right_edge_vertices[i][1];
		vertices[ i*3 + 2 ] = tail_top_right_edge_vertices[i][2];
		vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]*-1+48;
	}
	nose_right_edge_geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	var nose_right_edge_mesh_mark = new THREE.Mesh( nose_right_edge_geometry, yellowMaterialBack_mark );
	skateboard_tail_mark.add(nose_right_edge_mesh_mark);


	// nose left edge
	var nose_left_edge_geometry = new THREE.BufferGeometry();
	var vertices = new Float32Array( tail_top_right_edge_vertices.length * 3);
	for (var i = 0; i < tail_top_right_edge_vertices.length; i++)
	{
		vertices[ i*3 + 0 ] = tail_top_right_edge_vertices[i][0];
		vertices[ i*3 + 1 ] = tail_top_right_edge_vertices[i][1];
		vertices[ i*3 + 2 ] = tail_top_right_edge_vertices[i][2];
		vertices[ i*3 + 2 ] = vertices[ i*3 + 2 ]*-1;
		vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]*-1+48;
	}
	nose_left_edge_geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	var nose_left_edge_mesh_mark = new THREE.Mesh( nose_left_edge_geometry, blueMaterial_mark );
	skateboard_tail_mark.add(nose_left_edge_mesh_mark);


	// nose top
	var nose_top_geometry = new THREE.BufferGeometry();
	var vertices = new Float32Array( tail_top_vertices.length * 3);
	for (var i = 0; i < tail_top_vertices.length; i++)
	{
		vertices[ i*3 + 0 ] = tail_top_vertices[i][0];
		vertices[ i*3 + 1 ] = tail_top_vertices[i][1];
		vertices[ i*3 + 2 ] = tail_top_vertices[i][2];
		vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]*-1+48;
	}
	nose_top_geometry.addAttribute( 'position' , new THREE.BufferAttribute( vertices, 3 ));
	var nose_top_mesh_mark = new THREE.Mesh( nose_top_geometry, blackMaterial_mark);
	skateboard_tail_mark.add(nose_top_mesh_mark);


// 	// nose bottom
	var nose_bottom_geometry = new THREE.BufferGeometry();
	var vertices = new Float32Array( tail_top_vertices.length * 3);
	for (var i = 0; i < tail_top_vertices.length; i++)
	{
		vertices[ i*3 + 0 ] = tail_top_vertices[i][0];
		vertices[ i*3 + 1 ] = tail_top_vertices[i][1];
		vertices[ i*3 + 2 ] = tail_top_vertices[i][2];
		vertices[ i*3 + 1 ] = vertices[ i*3 + 1 ]- 0.7;
		vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]*-1+48;
	}
	nose_bottom_geometry.addAttribute( 'position' , new THREE.BufferAttribute( vertices, 3 ));
	var nose_bottom_mesh_mark = new THREE.Mesh( nose_bottom_geometry, blackMaterial_mark );
	//nose_bottom_mesh.material.side = THREE.BackSide;
	skateboard_tail_mark.add(nose_bottom_mesh_mark);


}