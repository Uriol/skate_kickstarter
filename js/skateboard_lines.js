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

	// Concave tail right top line
	var concave_right_top_line_Geometry = new THREE.Geometry();
	concave_right_top_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 6, yPos_top_dif - 0.5, 0));
	concave_right_top_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 5.75, yPos_top_dif - 0.5, 0));
	concave_right_top_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 4.87, yPos_top_dif - 0.43, 0));
	concave_right_top_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 4.25, yPos_top_dif - 0.37, 0));
	concave_right_top_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 3.62, yPos_top_dif - 0.31, 0));
	concave_right_top_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 3, yPos_top_dif - 0.25, 0));
	concave_right_top_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 2.5, yPos_top_dif - 0.18, 0));
	concave_right_top_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 1.87, yPos_top_dif - 0.12, 0));
	concave_right_top_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 1.25, yPos_top_dif - 0.06, 0));
	concave_right_top_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 0.37, yPos_top_dif - 0.00, 0));
	concave_right_top_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 0.00, yPos_top_dif - 0.00, 0));
	var concave_right_top_line = new THREE.Line(concave_right_top_line_Geometry, yellowLineMaterial);
	concave_right_top_line.position.z = 10;
	scene.add(concave_right_top_line);


	// Concave tail right bottom line
	var concave_right_bottom_line_Geometry = new THREE.Geometry();
	concave_right_bottom_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 6, yPos_bottom_dif - 0.5, 0));
	concave_right_bottom_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 5.75, yPos_bottom_dif - 0.5, 0));
	concave_right_bottom_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 4.87, yPos_bottom_dif - 0.43, 0));
	concave_right_bottom_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 4.25, yPos_bottom_dif - 0.37, 0));
	concave_right_bottom_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 3.62, yPos_bottom_dif - 0.31, 0));
	concave_right_bottom_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 3, yPos_bottom_dif - 0.25, 0));
	concave_right_bottom_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 2.5, yPos_bottom_dif - 0.18, 0));
	concave_right_bottom_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 1.87, yPos_bottom_dif - 0.12, 0));
	concave_right_bottom_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 1.25, yPos_bottom_dif - 0.06, 0));
	concave_right_bottom_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 0.37, yPos_bottom_dif - 0.00, 0));
	concave_right_bottom_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 0.00, yPos_bottom_dif - 0.00, 0));
	var concave_right_bottom_line = new THREE.Line(concave_right_bottom_line_Geometry, yellowLineMaterial);
	concave_right_bottom_line.position.z = 10;
	scene.add(concave_right_bottom_line);

	// Concave nose right top line
	var concave_nose_right_top_line_Geometry = new THREE.Geometry();
	concave_nose_right_top_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 6)*-1, yPos_top_dif - 0.5, 0));
	concave_nose_right_top_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 5.75)*-1, yPos_top_dif - 0.5, 0));
	concave_nose_right_top_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 4.87)*-1, yPos_top_dif - 0.43, 0));
	concave_nose_right_top_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 4.25)*-1, yPos_top_dif - 0.37, 0));
	concave_nose_right_top_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 3.62)*-1, yPos_top_dif - 0.31, 0));
	concave_nose_right_top_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 3)*-1, yPos_top_dif - 0.25, 0));
	concave_nose_right_top_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 2.5)*-1, yPos_top_dif - 0.18, 0));
	concave_nose_right_top_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 1.87)*-1, yPos_top_dif - 0.12, 0));
	concave_nose_right_top_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 1.25)*-1, yPos_top_dif - 0.06, 0));
	concave_nose_right_top_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 0.37)*-1, yPos_top_dif - 0.00, 0));
	concave_nose_right_top_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 0.00)*-1, yPos_top_dif - 0.00, 0));
	var concave_nose_right_top_line = new THREE.Line(concave_nose_right_top_line_Geometry, yellowLineMaterial);
	concave_nose_right_top_line.position.z = 10;
	scene.add(concave_nose_right_top_line);


	// Concave nose right bottom line
	var concave_nose_right_bottom_line_Geometry = new THREE.Geometry();
	concave_nose_right_bottom_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 6)*-1, yPos_bottom_dif - 0.5, 0));
	concave_nose_right_bottom_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 5.75)*-1, yPos_bottom_dif - 0.5, 0));
	concave_nose_right_bottom_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 4.87)*-1, yPos_bottom_dif - 0.43, 0));
	concave_nose_right_bottom_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 4.25)*-1, yPos_bottom_dif - 0.37, 0));
	concave_nose_right_bottom_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 3.62)*-1, yPos_bottom_dif - 0.31, 0));
	concave_nose_right_bottom_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 3)*-1, yPos_bottom_dif - 0.25, 0));
	concave_nose_right_bottom_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 2.5)*-1, yPos_bottom_dif - 0.18, 0));
	concave_nose_right_bottom_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 1.87)*-1, yPos_bottom_dif - 0.12, 0));
	concave_nose_right_bottom_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 1.25)*-1, yPos_bottom_dif - 0.06, 0));
	concave_nose_right_bottom_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 0.37)*-1, yPos_bottom_dif - 0.00, 0));
	concave_nose_right_bottom_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 0.00)*-1, yPos_bottom_dif - 0.00, 0));
	var concave_nose_right_bottom_line = new THREE.Line(concave_nose_right_bottom_line_Geometry, yellowLineMaterial);
	concave_nose_right_bottom_line.position.z = 10;
	scene.add(concave_nose_right_bottom_line);

	// --------------------------------------------------

	// Concave tail left top line
	var concave_left_top_line_Geometry = new THREE.Geometry();
	concave_left_top_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 6, yPos_top_dif - 0.5, 0));
	concave_left_top_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 5.75, yPos_top_dif - 0.5, 0));
	concave_left_top_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 4.87, yPos_top_dif - 0.43, 0));
	concave_left_top_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 4.25, yPos_top_dif - 0.37, 0));
	concave_left_top_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 3.62, yPos_top_dif - 0.31, 0));
	concave_left_top_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 3, yPos_top_dif - 0.25, 0));
	concave_left_top_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 2.5, yPos_top_dif - 0.18, 0));
	concave_left_top_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 1.87, yPos_top_dif - 0.12, 0));
	concave_left_top_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 1.25, yPos_top_dif - 0.06, 0));
	concave_left_top_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 0.37, yPos_top_dif - 0.00, 0));
	concave_left_top_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 0.00, yPos_top_dif - 0.00, 0));
	var concave_left_top_line = new THREE.Line(concave_left_top_line_Geometry, blueLineMaterial);
	concave_left_top_line.position.z = -10;
	scene.add(concave_left_top_line);


	// Concave tail left bottom line
	var concave_left_bottom_line_Geometry = new THREE.Geometry();
	concave_left_bottom_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 6, yPos_bottom_dif - 0.5, 0));
	concave_left_bottom_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 5.75, yPos_bottom_dif - 0.5, 0));
	concave_left_bottom_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 4.87, yPos_bottom_dif - 0.43, 0));
	concave_left_bottom_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 4.25, yPos_bottom_dif - 0.37, 0));
	concave_left_bottom_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 3.62, yPos_bottom_dif - 0.31, 0));
	concave_left_bottom_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 3, yPos_bottom_dif - 0.25, 0));
	concave_left_bottom_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 2.5, yPos_bottom_dif - 0.18, 0));
	concave_left_bottom_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 1.87, yPos_bottom_dif - 0.12, 0));
	concave_left_bottom_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 1.25, yPos_bottom_dif - 0.06, 0));
	concave_left_bottom_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 0.37, yPos_bottom_dif - 0.00, 0));
	concave_left_bottom_line_Geometry.vertices.push(new THREE.Vector3(xPos_dif - 0.00, yPos_bottom_dif - 0.00, 0));
	var concave_left_bottom_line = new THREE.Line(concave_left_bottom_line_Geometry, blueLineMaterial);
	concave_left_bottom_line.position.z = -10;
	scene.add(concave_left_bottom_line);


	// Concave nose left top line
	var concave_nose_left_top_line_Geometry = new THREE.Geometry();
	concave_nose_left_top_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 6)*-1, yPos_top_dif - 0.5, 0));
	concave_nose_left_top_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 5.75)*-1, yPos_top_dif - 0.5, 0));
	concave_nose_left_top_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 4.87)*-1, yPos_top_dif - 0.43, 0));
	concave_nose_left_top_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 4.25)*-1, yPos_top_dif - 0.37, 0));
	concave_nose_left_top_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 3.62)*-1, yPos_top_dif - 0.31, 0));
	concave_nose_left_top_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 3)*-1, yPos_top_dif - 0.25, 0));
	concave_nose_left_top_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 2.5)*-1, yPos_top_dif - 0.18, 0));
	concave_nose_left_top_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 1.87)*-1, yPos_top_dif - 0.12, 0));
	concave_nose_left_top_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 1.25)*-1, yPos_top_dif - 0.06, 0));
	concave_nose_left_top_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 0.37)*-1, yPos_top_dif - 0.00, 0));
	concave_nose_left_top_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 0.00)*-1, yPos_top_dif - 0.00, 0));
	var concave_nose_left_top_line = new THREE.Line(concave_nose_left_top_line_Geometry, blueLineMaterial);
	concave_nose_left_top_line.position.z = -10;
	scene.add(concave_nose_left_top_line);

	// Concave nose left bottom line
	var concave_nose_left_bottom_line_Geometry = new THREE.Geometry();
	concave_nose_left_bottom_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 6)*-1, yPos_bottom_dif - 0.5, 0));
	concave_nose_left_bottom_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 5.75)*-1, yPos_bottom_dif - 0.5, 0));
	concave_nose_left_bottom_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 4.87)*-1, yPos_bottom_dif - 0.43, 0));
	concave_nose_left_bottom_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 4.25)*-1, yPos_bottom_dif - 0.37, 0));
	concave_nose_left_bottom_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 3.62)*-1, yPos_bottom_dif - 0.31, 0));
	concave_nose_left_bottom_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 3)*-1, yPos_bottom_dif - 0.25, 0));
	concave_nose_left_bottom_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 2.5)*-1, yPos_bottom_dif - 0.18, 0));
	concave_nose_left_bottom_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 1.87)*-1, yPos_bottom_dif - 0.12, 0));
	concave_nose_left_bottom_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 1.25)*-1, yPos_bottom_dif - 0.06, 0));
	concave_nose_left_bottom_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 0.37)*-1, yPos_bottom_dif - 0.00, 0));
	concave_nose_left_bottom_line_Geometry.vertices.push(new THREE.Vector3((xPos_dif - 0.00)*-1, yPos_bottom_dif - 0.00, 0));
	var concave_nose_left_bottom_line = new THREE.Line(concave_nose_left_bottom_line_Geometry, blueLineMaterial);
	concave_nose_left_bottom_line.position.z = -10;
	scene.add(concave_nose_left_bottom_line);

}