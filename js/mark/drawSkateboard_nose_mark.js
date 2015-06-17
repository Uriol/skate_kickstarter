var skateboard_nose_mark;
var skateboard_nose_tail_pivot_line_mark,
	skateboard_nose_center_pivot_line_mark,
	skateboard_nose_nose_pivot_line_mark;

function drawSkateboard_nose_mark(){
	skateboard_nose_mark = new THREE.Object3D();
	skateboard_nose_mark.name = 'skateboardObject_mark';

	drawLines_nose_mark();
	drawVertices_nose_mark();
	scene_mark.add(skateboard_nose_mark)
}

function drawVertices_nose_mark() {
	
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

	var skateboard_nose_tail_pivot_geometry = new THREE.Geometry();
	skateboard_nose_tail_pivot_line_mark = new THREE.Line(skateboard_nose_tail_pivot_geometry);
	skateboard_nose_tail_pivot_line_mark.position.x = -48;
	skateboard_nose_mark.add(skateboard_nose_tail_pivot_line_mark);

	var skateboard_nose_center_pivot_geometry = new THREE.Geometry();
	skateboard_nose_center_pivot_line_mark = new THREE.Line(skateboard_nose_center_pivot_geometry);
	skateboard_nose_center_pivot_line_mark.position.x = -24;
	skateboard_nose_mark.add(skateboard_nose_center_pivot_line_mark);

	var skateboard_nose_nose_pivot_geometry = new THREE.Geometry();
	skateboard_nose_nose_pivot_line_mark = new THREE.Line(skateboard_nose_nose_pivot_geometry);
	skateboard_nose_nose_pivot_line_mark.position.x = 0;
	skateboard_nose_mark.add(skateboard_nose_nose_pivot_line_mark);



	// Top center
	var topGeometry_nose = new THREE.PlaneBufferGeometry( 40, 20);
	var top_nose_mark = new THREE.Mesh(topGeometry_nose, blackMaterial_mark);
	top_nose_mark.position.x = -24;
	top_nose_mark.rotation.x = -Math.PI / 2;
	top_nose_mark.position.y = 0.5;
	skateboard_nose_mark.add(top_nose_mark);

	// Bottom center
	var bottomGeometry_nose = new THREE.PlaneBufferGeometry( 40, 20);
	var bottom_nose_mark = new THREE.Mesh(topGeometry_nose, blackMaterialBack_mark);
	bottom_nose_mark.position.x = -24;
	bottom_nose_mark.rotation.x = -Math.PI / 2;
	bottom_nose_mark.position.y = -0.2;
	bottom_nose_mark.material.side = THREE.BackSide;
	skateboard_nose_mark.add(bottom_nose_mark);

	// Right edge
	var rightEdgeGeometry_nose = new THREE.PlaneBufferGeometry(40,0.7);
	var rightEdge_nose_mark = new THREE.Mesh(rightEdgeGeometry_nose, yellowMaterial_mark);
	rightEdge_nose_mark.position.z = 10;
	rightEdge_nose_mark.position.y = 0.15;
	rightEdge_nose_mark.position.x = -24;
	skateboard_nose_mark.add(rightEdge_nose_mark);

	// Left edge
	var leftEdgeGeometry_nose = new THREE.PlaneBufferGeometry(40,0.7);
	var leftEdge_nose_mark = new THREE.Mesh(leftEdgeGeometry_nose, blueMaterial_mark);
	leftEdge_nose_mark.position.z = -10;
	leftEdge_nose_mark.rotation.x = -Math.PI;
	leftEdge_nose_mark.position.y = 0.15;
	leftEdge_nose_mark.position.x = -24;
	skateboard_nose_mark.add(leftEdge_nose_mark);


	// Tail right edge concave
	var tail_right_edge_concave_geometry_nose = new THREE.BufferGeometry();
	var vertices = new Float32Array( tail_right_edge_concave_vertices.length * 3 ); 
	for ( var i = 0; i < tail_right_edge_concave_vertices.length; i++ )
	{
		vertices[ i*3 + 0 ] = tail_right_edge_concave_vertices[i][0];
		vertices[ i*3 + 1 ] = tail_right_edge_concave_vertices[i][1];
		vertices[ i*3 + 2 ] = tail_right_edge_concave_vertices[i][2];
		vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]-48;

	}
	tail_right_edge_concave_geometry_nose.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	var tail_right_edge_concave_mesh_nose_mark = new THREE.Mesh( tail_right_edge_concave_geometry_nose, yellowMaterial_mark );
	tail_right_edge_concave_mesh_nose_mark.material.side = THREE.FrontSide;
	skateboard_nose_mark.add(tail_right_edge_concave_mesh_nose_mark);

	// Tail left edge concave
	var tail_left_edge_concave_geometry_nose = new THREE.BufferGeometry();
	var vertices = new Float32Array( tail_right_edge_concave_vertices.length * 3 ); 
	for ( var i = 0; i < tail_right_edge_concave_vertices.length; i++ )
	{
		vertices[ i*3 + 0 ] = tail_right_edge_concave_vertices[i][0];
		vertices[ i*3 + 1 ] = tail_right_edge_concave_vertices[i][1];
		vertices[ i*3 + 2 ] = tail_right_edge_concave_vertices[i][2];
		vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]-48;
		vertices[ i*3 + 2 ] = vertices[ i*3 + 2 ]*-1;
	}
	tail_left_edge_concave_geometry_nose.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	var tail_left_edge_concave_mesh_nose_mark = new THREE.Mesh( tail_left_edge_concave_geometry_nose, blueMaterialBack_mark );
	tail_left_edge_concave_mesh_nose_mark.material.side = THREE.BackSide;
	skateboard_nose_mark.add(tail_left_edge_concave_mesh_nose_mark);


	// Nose right edge concave
	var nose_right_edge_concave_geometry_nose = new THREE.BufferGeometry();
	var vertices = new Float32Array( tail_right_edge_concave_vertices.length * 3 ); 
	for ( var i = 0; i < tail_right_edge_concave_vertices.length; i++ )
	{
		vertices[ i*3 + 0 ] = tail_right_edge_concave_vertices[i][0];
		vertices[ i*3 + 1 ] = tail_right_edge_concave_vertices[i][1];
		vertices[ i*3 + 2 ] = tail_right_edge_concave_vertices[i][2];
		vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]*-1;
		// vertices[ i*3 + 3 ] = vertices[ i*3 + 3 ]*-1;
	}
	nose_right_edge_concave_geometry_nose.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	var nose_right_edge_concave_mesh_nose_mark = new THREE.Mesh( nose_right_edge_concave_geometry_nose, yellowMaterialBack_mark );
	nose_right_edge_concave_mesh_nose_mark.material.side = THREE.BackSide;
	skateboard_nose_mark.add(nose_right_edge_concave_mesh_nose_mark);

	// Nose left edge concave
	var nose_left_edge_concave_geometry_nose = new THREE.BufferGeometry();
	var vertices = new Float32Array( tail_right_edge_concave_vertices.length * 3 ); 
	for ( var i = 0; i < tail_right_edge_concave_vertices.length; i++ )
	{
		vertices[ i*3 + 0 ] = tail_right_edge_concave_vertices[i][0];
		vertices[ i*3 + 1 ] = tail_right_edge_concave_vertices[i][1];
		vertices[ i*3 + 2 ] = tail_right_edge_concave_vertices[i][2];
		vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]*-1;
		vertices[ i*3 + 2 ] = vertices[ i*3 + 2 ]*-1;
	}
	nose_left_edge_concave_geometry_nose.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	var nose_left_edge_concave_mesh_nose_mark = new THREE.Mesh( nose_left_edge_concave_geometry_nose, blueMaterial_mark );
	nose_left_edge_concave_mesh_nose_mark.material.side = THREE.FrontSide;
	skateboard_nose_mark.add(nose_left_edge_concave_mesh_nose_mark);

// // ------------------------------------------------------------------------------------------------

	// Concave tail top
	var tail_top_concave_geometry_nose = new THREE.BufferGeometry();
	var vertices = new Float32Array( tail_top_concave_vertices.length * 3 ); 
	for ( var i = 0; i < tail_top_concave_vertices.length; i++ )
	{
		vertices[ i*3 + 0 ] = tail_top_concave_vertices[i][0];
		vertices[ i*3 + 1 ] = tail_top_concave_vertices[i][1];
		vertices[ i*3 + 2 ] = tail_top_concave_vertices[i][2];
		vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]-48;

	}
	tail_top_concave_geometry_nose.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	var tail_top_concave_mesh_nose_mark = new THREE.Mesh( tail_top_concave_geometry_nose, blackMaterial_mark );
	skateboard_nose_mark.add(tail_top_concave_mesh_nose_mark);

	// Concave tail bottom
	var tail_bottom_concave_geometry_nose = new THREE.BufferGeometry();
	var vertices = new Float32Array( tail_top_concave_vertices.length * 3 ); 
	for ( var i = 0; i < tail_top_concave_vertices.length; i++ )
	{
		vertices[ i*3 + 0 ] = tail_top_concave_vertices[i][0];
		vertices[ i*3 + 1 ] = tail_top_concave_vertices[i][1];
		vertices[ i*3 + 2 ] = tail_top_concave_vertices[i][2];
		vertices[ i*3 + 1 ] = vertices[ i*3 + 1 ] - 0.7;
		vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]-48;

	}
	tail_bottom_concave_geometry_nose.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	var tail_bottom_concave_mesh_nose_mark = new THREE.Mesh( tail_bottom_concave_geometry_nose, blackMaterialBack_mark );
	tail_bottom_concave_mesh_nose_mark.material.side = THREE.BackSide;
	skateboard_nose_mark.add(tail_bottom_concave_mesh_nose_mark);

	// Concave nose top
	var nose_top_concave_geometry_nose = new THREE.BufferGeometry();
	var vertices = new Float32Array( tail_top_concave_vertices.length * 3 ); 
	for ( var i = 0; i < tail_top_concave_vertices.length; i++ )
	{
		vertices[ i*3 + 0 ] = tail_top_concave_vertices[i][0];
		vertices[ i*3 + 1 ] = tail_top_concave_vertices[i][1];
		vertices[ i*3 + 2 ] = tail_top_concave_vertices[i][2];
		vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]*-1;
	}
	nose_top_concave_geometry_nose.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	var nose_top_concave_mesh_nose_mark = new THREE.Mesh( nose_top_concave_geometry_nose, blackMaterialBack_mark );
	nose_top_concave_mesh_nose_mark.material.side = THREE.BackSide;
	skateboard_nose_mark.add(nose_top_concave_mesh_nose_mark);


	// Concave nose bottom
	var nose_bottom_concave_geometry_nose = new THREE.BufferGeometry();
	var vertices = new Float32Array( tail_top_concave_vertices.length * 3 ); 
	for ( var i = 0; i < tail_top_concave_vertices.length; i++ )
	{
		vertices[ i*3 + 0 ] = tail_top_concave_vertices[i][0];
		vertices[ i*3 + 1 ] = tail_top_concave_vertices[i][1];
		vertices[ i*3 + 2 ] = tail_top_concave_vertices[i][2];
		vertices[ i*3 + 1 ] = vertices[ i*3 + 1 ] - 0.7;
		vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]*-1;

	}
	nose_bottom_concave_geometry_nose.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	var nose_bottom_concave_mesh_nose_mark = new THREE.Mesh( nose_bottom_concave_geometry_nose, blackMaterial_mark );
	skateboard_nose_mark.add(nose_bottom_concave_mesh_nose_mark);


// 	// ---------------------------------------------

	// tail top right edge
	var tail_top_right_edge_geometry_nose = new THREE.BufferGeometry();
	var vertices = new Float32Array( tail_top_right_edge_vertices.length * 3);
	for (var i = 0; i < tail_top_right_edge_vertices.length; i++)
	{
		vertices[ i*3 + 0 ] = tail_top_right_edge_vertices[i][0];
		vertices[ i*3 + 1 ] = tail_top_right_edge_vertices[i][1];
		vertices[ i*3 + 2 ] = tail_top_right_edge_vertices[i][2];
		vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]-48;
	}
	tail_top_right_edge_geometry_nose.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	var tail_top_right_edge_mesh_nose_mark = new THREE.Mesh( tail_top_right_edge_geometry_nose, yellowMaterial_mark );
	skateboard_nose_mark.add(tail_top_right_edge_mesh_nose_mark);


	// tail top left edge
	var tail_top_left_edge_geometry_nose = new THREE.BufferGeometry();
	var vertices = new Float32Array( tail_top_right_edge_vertices.length * 3);
	for (var i = 0; i < tail_top_right_edge_vertices.length; i++)
	{
		vertices[ i*3 + 0 ] = tail_top_right_edge_vertices[i][0];
		vertices[ i*3 + 1 ] = tail_top_right_edge_vertices[i][1];
		vertices[ i*3 + 2 ] = tail_top_right_edge_vertices[i][2];
		vertices[ i*3 + 2 ] = vertices[ i*3 + 2 ]*-1;
		vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]-48;
	}
	tail_top_left_edge_geometry_nose.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	var tail_top_left_edge_mesh_nose_mark = new THREE.Mesh( tail_top_left_edge_geometry_nose, blueMaterialBack_mark );
	skateboard_nose_mark.add(tail_top_left_edge_mesh_nose_mark);

	// Tail top
	var tail_top_geometry_nose = new THREE.BufferGeometry();
	var vertices = new Float32Array( tail_top_vertices.length * 3);
	for (var i = 0; i < tail_top_vertices.length; i++)
	{
		vertices[ i*3 + 0 ] = tail_top_vertices[i][0];
		vertices[ i*3 + 1 ] = tail_top_vertices[i][1];
		vertices[ i*3 + 2 ] = tail_top_vertices[i][2];
		vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]-48;
	}
	tail_top_geometry_nose.addAttribute( 'position' , new THREE.BufferAttribute( vertices, 3 ));
	var tail_top_mesh_nose_mark = new THREE.Mesh( tail_top_geometry_nose, blackMaterial_mark);
	skateboard_nose_mark.add(tail_top_mesh_nose_mark);


	// Tail bottom
	var tail_bottom_geometry_nose = new THREE.BufferGeometry();
	var vertices = new Float32Array( tail_top_vertices.length * 3);
	for (var i = 0; i < tail_top_vertices.length; i++)
	{
		vertices[ i*3 + 0 ] = tail_top_vertices[i][0];
		vertices[ i*3 + 1 ] = tail_top_vertices[i][1];
		vertices[ i*3 + 2 ] = tail_top_vertices[i][2];
		vertices[ i*3 + 1 ] = vertices[ i*3 + 1 ]- 0.7;
		vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]-48;
	}
	tail_bottom_geometry_nose.addAttribute( 'position' , new THREE.BufferAttribute( vertices, 3 ));
	var tail_bottom_mesh_nose_mark = new THREE.Mesh( tail_bottom_geometry_nose, blackMaterialBack_mark );
	tail_bottom_mesh_nose_mark.material.side = THREE.BackSide;
	skateboard_nose_mark.add(tail_bottom_mesh_nose_mark);


	// nose right edge
	var nose_right_edge_geometry_nose = new THREE.BufferGeometry();
	var vertices = new Float32Array( tail_top_right_edge_vertices.length * 3);
	for (var i = 0; i < tail_top_right_edge_vertices.length; i++)
	{
		vertices[ i*3 + 0 ] = tail_top_right_edge_vertices[i][0];
		vertices[ i*3 + 1 ] = tail_top_right_edge_vertices[i][1];
		vertices[ i*3 + 2 ] = tail_top_right_edge_vertices[i][2];
		vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]*-1;
	}
	nose_right_edge_geometry_nose.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	var nose_right_edge_mesh_nose_mark = new THREE.Mesh( nose_right_edge_geometry_nose, yellowMaterialBack_mark );
	skateboard_nose_mark.add(nose_right_edge_mesh_nose_mark);


	// nose left edge
	var nose_left_edge_geometry_nose = new THREE.BufferGeometry();
	var vertices = new Float32Array( tail_top_right_edge_vertices.length * 3);
	for (var i = 0; i < tail_top_right_edge_vertices.length; i++)
	{
		vertices[ i*3 + 0 ] = tail_top_right_edge_vertices[i][0];
		vertices[ i*3 + 1 ] = tail_top_right_edge_vertices[i][1];
		vertices[ i*3 + 2 ] = tail_top_right_edge_vertices[i][2];
		vertices[ i*3 + 2 ] = vertices[ i*3 + 2 ]*-1;
		vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]*-1;
	}
	nose_left_edge_geometry_nose.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	var nose_left_edge_mesh_nose_mark = new THREE.Mesh( nose_left_edge_geometry_nose, blueMaterial_mark );
	skateboard_nose_mark.add(nose_left_edge_mesh_nose_mark);


	// nose top
	var nose_top_geometry_nose = new THREE.BufferGeometry();
	var vertices = new Float32Array( tail_top_vertices.length * 3);
	for (var i = 0; i < tail_top_vertices.length; i++)
	{
		vertices[ i*3 + 0 ] = tail_top_vertices[i][0];
		vertices[ i*3 + 1 ] = tail_top_vertices[i][1];
		vertices[ i*3 + 2 ] = tail_top_vertices[i][2];
		vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]*-1;
	}
	nose_top_geometry_nose.addAttribute( 'position' , new THREE.BufferAttribute( vertices, 3 ));
	var nose_top_mesh_nose_mark = new THREE.Mesh( nose_top_geometry_nose, blackMaterialBack_mark);
	skateboard_nose_mark.add(nose_top_mesh_nose_mark);

	// nose bottom
	var nose_bottom_geometry_nose = new THREE.BufferGeometry();
	var vertices = new Float32Array( tail_top_vertices.length * 3);
	for (var i = 0; i < tail_top_vertices.length; i++)
	{
		vertices[ i*3 + 0 ] = tail_top_vertices[i][0];
		vertices[ i*3 + 1 ] = tail_top_vertices[i][1];
		vertices[ i*3 + 2 ] = tail_top_vertices[i][2];
		vertices[ i*3 + 1 ] = vertices[ i*3 + 1 ]- 0.7;
		vertices[ i*3 + 0 ] = vertices[ i*3 + 0 ]*-1;
	}
	nose_bottom_geometry_nose.addAttribute( 'position' , new THREE.BufferAttribute( vertices, 3 ));
	var nose_bottom_mesh_nose_mark = new THREE.Mesh( nose_bottom_geometry_nose, blackMaterial_mark );
	//nose_bottom_mesh.material.side = THREE.BackSide;
	skateboard_nose_mark.add(nose_bottom_mesh_nose_mark);

}