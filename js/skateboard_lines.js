function drawLines(){

	// Create colors and materials
	var yellowLine = new THREE.Color("rgb(184, 228, 20)");
	var yellowLineMaterial = new THREE.LineBasicMaterial({ color: yellowLine, linewidth: 1.5 });

	var blueLine = new THREE.Color("rgb(0, 200, 255)");
	var blueLineMaterial = new THREE.LineBasicMaterial({ color: blueLine, linewidth: 1.5 });


	

	// Center right top line
	var center_right_top_line_Geometry = new THREE.Geometry();
	center_right_top_line_Geometry.vertices.push(new THREE.Vector3(-20, 0, 0));
	center_right_top_line_Geometry.vertices.push(new THREE.Vector3(20, 0, 0));
	var center_right_top_line = new THREE.Line(center_right_top_line_Geometry, yellowLineMaterial);
	center_right_top_line.position.y = 0.5;
	center_right_top_line.position.z = 10;
	scene.add(center_right_top_line)

	// Center right bottom line
	var center_right_bottom_line_Geometry = new THREE.Geometry();
	center_right_bottom_line_Geometry.vertices.push(new THREE.Vector3(-20, 0, 0));
	center_right_bottom_line_Geometry.vertices.push(new THREE.Vector3(20, 0, 0));
	var center_right_bottom_line = new THREE.Line(center_right_bottom_line_Geometry, yellowLineMaterial);
	center_right_bottom_line.position.y = -0.5;
	center_right_bottom_line.position.z = 10;
	scene.add(center_right_bottom_line)

	// Center left top line
	var center_left_top_line_Geometry = new THREE.Geometry();
	center_left_top_line_Geometry.vertices.push(new THREE.Vector3(-20, 0, 0));
	center_left_top_line_Geometry.vertices.push(new THREE.Vector3(20, 0, 0));
	var center_left_top_line = new THREE.Line(center_left_top_line_Geometry, blueLineMaterial);
	center_left_top_line.position.y = 0.5;
	center_left_top_line.position.z = -10;
	scene.add(center_left_top_line)

	// Center left bottom line
	var center_left_bottom_line_Geometry = new THREE.Geometry();
	center_left_bottom_line_Geometry.vertices.push(new THREE.Vector3(-20, 0, 0));
	center_left_bottom_line_Geometry.vertices.push(new THREE.Vector3(20, 0, 0));
	var center_left_bottom_line = new THREE.Line(center_left_bottom_line_Geometry, blueLineMaterial);
	center_left_bottom_line.position.y = -0.5;
	center_left_bottom_line.position.z = -10;
	scene.add(center_left_bottom_line)
}