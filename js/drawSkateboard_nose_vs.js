var skateboard_nose_vs;
var skateboard_nose_tail_pivot_line_vs,
	skateboard_nose_center_pivot_line_vs,
	skateboard_nose_nose_pivot_line_vs;

function drawSkateboard_nose_vs(){
	skateboard_nose_vs = new THREE.Object3D();
	skateboard_nose_vs.name = 'skateboardObject_vs';

	drawLines_nose_vs();
	drawVertices_nose_vs();
	scene_vs.add(skateboard_nose_vs)
}

function drawVertices_nose_vs() {
	
	if (onGround_bool_vs == true || reception_vs == true){
		blueMaterial_vs = new THREE.MeshBasicMaterial({ color: darkGrey_vs });
		yellowMaterial_vs = new THREE.MeshBasicMaterial({ color: darkGrey_vs });
		blueMaterialBack_vs = new THREE.MeshBasicMaterial({ color: darkGrey_vs });
		yellowMaterialBack_vs = new THREE.MeshBasicMaterial({ color: darkGrey_vs });
	} else {
		blueMaterial_vs = new THREE.MeshBasicMaterial({ color:blue_vs });
		yellowMaterial_vs = new THREE.MeshBasicMaterial({ color:yellow_vs });
		blueMaterialBack_vs = new THREE.MeshBasicMaterial({ color:blue_vs });
		yellowMaterialBack_vs = new THREE.MeshBasicMaterial({ color:yellow_vs });
	}

	var skateboard_nose_tail_pivot_geometry_vs = new THREE.Geometry();
	skateboard_nose_tail_pivot_line_vs = new THREE.Line(skateboard_nose_tail_pivot_geometry_vs);
	skateboard_nose_tail_pivot_line_vs.position.x = -48;
	skateboard_nose_vs.add(skateboard_nose_tail_pivot_line_vs);

	var skateboard_nose_center_pivot_geometry_vs = new THREE.Geometry();
	skateboard_nose_center_pivot_line_vs = new THREE.Line(skateboard_nose_center_pivot_geometry_vs);
	skateboard_nose_center_pivot_line_vs.position.x = -24;
	skateboard_nose_vs.add(skateboard_nose_center_pivot_line_vs);

	var skateboard_nose_nose_pivot_geometry_vs = new THREE.Geometry();
	skateboard_nose_nose_pivot_line_vs = new THREE.Line(skateboard_nose_nose_pivot_geometry_vs);
	skateboard_nose_nose_pivot_line_vs.position.x = 0;
	skateboard_nose_vs.add(skateboard_nose_nose_pivot_line_vs);



	// Top center
	var topGeometry_nose_vs = new THREE.PlaneBufferGeometry( 40, 20);
	var top_nose_vs = new THREE.Mesh(topGeometry_nose_vs, blackMaterial_vs);
	top_nose_vs.position.x = -24;
	top_nose_vs.rotation.x = -Math.PI / 2;
	top_nose_vs.position.y = 0.5;
	skateboard_nose_vs.add(top_nose_vs);

	// Bottom center
	var bottomGeometry_nose_vs = new THREE.PlaneBufferGeometry( 40, 20);
	var bottom_nose_vs = new THREE.Mesh(topGeometry_nose_vs, blackMaterialBack_vs);
	bottom_nose_vs.position.x = -24;
	bottom_nose_vs.rotation.x = -Math.PI / 2;
	bottom_nose_vs.position.y = -0.2;
	bottom_nose_vs.material.side = THREE.BackSide;
	skateboard_nose_vs.add(bottom_nose_vs);

	// Right edge
	var rightEdgeGeometry_nose_vs = new THREE.PlaneBufferGeometry(40,0.7);
	var rightEdge_nose_vs = new THREE.Mesh(rightEdgeGeometry_nose_vs, yellowMaterial_vs);
	rightEdge_nose_vs.position.z = 10;
	rightEdge_nose_vs.position.y = 0.15;
	rightEdge_nose_vs.position.x = -24;
	skateboard_nose_vs.add(rightEdge_nose_vs);

	// Left edge
	var leftEdgeGeometry_nose_vs = new THREE.PlaneBufferGeometry(40,0.7);
	var leftEdge_nose_vs = new THREE.Mesh(leftEdgeGeometry_nose_vs, blueMaterial_vs);
	leftEdge_nose_vs.position.z = -10;
	leftEdge_nose_vs.rotation.x = -Math.PI;
	leftEdge_nose_vs.position.y = 0.15;
	leftEdge_nose_vs.position.x = -24;
	skateboard_nose_vs.add(leftEdge_nose_vs);


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
	var tail_right_edge_concave_mesh_nose = new THREE.Mesh( tail_right_edge_concave_geometry_nose, yellowMaterial_vs );
	tail_right_edge_concave_mesh_nose.material.side = THREE.FrontSide;
	skateboard_nose_vs.add(tail_right_edge_concave_mesh_nose);

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
	var tail_left_edge_concave_mesh_nose = new THREE.Mesh( tail_left_edge_concave_geometry_nose, blueMaterialBack_vs );
	tail_left_edge_concave_mesh_nose.material.side = THREE.BackSide;
	skateboard_nose_vs.add(tail_left_edge_concave_mesh_nose);


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
	var nose_right_edge_concave_mesh_nose = new THREE.Mesh( nose_right_edge_concave_geometry_nose, yellowMaterialBack_vs );
	nose_right_edge_concave_mesh_nose.material.side = THREE.BackSide;
	skateboard_nose_vs.add(nose_right_edge_concave_mesh_nose);

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
	var nose_left_edge_concave_mesh_nose = new THREE.Mesh( nose_left_edge_concave_geometry_nose, blueMaterial_vs );
	nose_left_edge_concave_mesh_nose.material.side = THREE.FrontSide;
	skateboard_nose_vs.add(nose_left_edge_concave_mesh_nose);

// // // ------------------------------------------------------------------------------------------------

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
	var tail_top_concave_mesh_nose = new THREE.Mesh( tail_top_concave_geometry_nose, blackMaterial_vs );
	skateboard_nose_vs.add(tail_top_concave_mesh_nose);

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
	var tail_bottom_concave_mesh_nose = new THREE.Mesh( tail_bottom_concave_geometry_nose, blackMaterialBack_vs );
	tail_bottom_concave_mesh_nose.material.side = THREE.BackSide;
	skateboard_nose_vs.add(tail_bottom_concave_mesh_nose);

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
	var nose_top_concave_mesh_nose = new THREE.Mesh( nose_top_concave_geometry_nose, blackMaterialBack_vs );
	nose_top_concave_mesh_nose.material.side = THREE.BackSide;
	skateboard_nose_vs.add(nose_top_concave_mesh_nose);


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
	var nose_bottom_concave_mesh_nose = new THREE.Mesh( nose_bottom_concave_geometry_nose, blackMaterial_vs );
	skateboard_nose_vs.add(nose_bottom_concave_mesh_nose);


// // 	// ---------------------------------------------

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
	var tail_top_right_edge_mesh_nose = new THREE.Mesh( tail_top_right_edge_geometry_nose, yellowMaterial_vs );
	skateboard_nose_vs.add(tail_top_right_edge_mesh_nose);


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
	var tail_top_left_edge_mesh_nose = new THREE.Mesh( tail_top_left_edge_geometry_nose, blueMaterialBack_vs );
	skateboard_nose_vs.add(tail_top_left_edge_mesh_nose);

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
	var tail_top_mesh_nose = new THREE.Mesh( tail_top_geometry_nose, blackMaterial_vs);
	skateboard_nose_vs.add(tail_top_mesh_nose);


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
	var tail_bottom_mesh_nose = new THREE.Mesh( tail_bottom_geometry_nose, blackMaterialBack_vs );
	tail_bottom_mesh_nose.material.side = THREE.BackSide;
	skateboard_nose_vs.add(tail_bottom_mesh_nose);


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
	var nose_right_edge_mesh_nose = new THREE.Mesh( nose_right_edge_geometry_nose, yellowMaterialBack_vs );
	skateboard_nose_vs.add(nose_right_edge_mesh_nose);


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
	var nose_left_edge_mesh_nose = new THREE.Mesh( nose_left_edge_geometry_nose, blueMaterial_vs );
	skateboard_nose_vs.add(nose_left_edge_mesh_nose);


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
	var nose_top_mesh_nose = new THREE.Mesh( nose_top_geometry_nose, blackMaterialBack_vs);
	skateboard_nose_vs.add(nose_top_mesh_nose);

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
	var nose_bottom_mesh_nose = new THREE.Mesh( nose_bottom_geometry_nose, blackMaterial_vs );
	//nose_bottom_mesh.material.side = THREE.BackSide;
	skateboard_nose_vs.add(nose_bottom_mesh_nose);

}