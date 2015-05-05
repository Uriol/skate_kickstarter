
var this_x_position;
var this_y_position;
var this_z_position;

var previous_x_position = 0, previous_y_position = 0, previous_z_position = 0;
var actual_x_position, actual_y_position, actual_z_position;
var increment_x_position = 0, increment_y_position = 0, increment_z_position = 0;
var final_x_position = 0, final_y_position = 0 , final_z_position = 0;


var tailUp = false;
var noseUp = false;

var onGround_bool = false;

var pivot;

var skateboard;
var skateboard_tail, skateboard_center, skateboard_nose;

var position_tail = new THREE.Vector3(), position_center = new THREE.Vector3(), position_tail = new THREE.Vector3();
var prev_skateboard_tail = new THREE.Vector3(), prev_skateboard_center = new THREE.Vector3(), prev_skateboard_nose = new THREE.Vector3();


var position_tail = 0, position_center = 0, position_nose = 0;

function drawTrick(){
	resetValues();
	parseData(selected_trick);
	switchState();

	// Loop through all positions lengths
	for (var i = 0; i < $total_x_positions.length; i++) {
		
		this_x_position = $total_x_positions[i];
		this_y_position = $total_y_positions[i];
		this_z_position = $total_z_positions[i];

		$total_rolls[i] = $total_rolls[i]*pi/180;
		$total_pitchs[i] = $total_pitchs[i]*pi/180;

		 //console.log('this_y_position: ' + this_y_position);


		//console.log(previous_pitch + ' ' +$total_pitchs[i]);
		// Save previous pitch




		// don't draw the first one as jumping
		if ($state[i] == 'air'){
			onGround_bool = false;
			console.log('air')
		} else { 
			onGround_bool = true;
			//console.log('ground')
		}


		
		//Detect center of rotation
		// if (previous_pitch > $total_pitchs[i]) {
		// 	console.log('tail up')
		// 	drawSkateboard_nose();
		// 	skateboard = skateboard_nose;
		// 	skateboard_nose = skateboard_nose_nose_pivot_line;
		// 	skateboard_center = skateboard_nose_center_pivot_line;
		// 	skateboard_tail = skateboard_nose_tail_pivot_line;
		

		// } else if (previous_pitch < $total_pitchs[i]) { 
		// 	console.log('nose up')
		// 	drawSkateboard_tail()
		// 	skateboard = skateboard_tail;
		// 	skateboard_nose = skateboard_tail_nose_pivot_line;
		// 	skateboard_center = skateboard_tail_center_pivot_line;
		// 	skateboard_tail = skateboard_tail_tail_pivot_line;

		// } else {
		// 	console.log('same pitch')
		// 	drawSkateboard_center();
		// 	skateboard = skateboard_center;
		// 	skateboard_nose = skateboard_center_nose_pivot_line;
		// 	skateboard_center = skateboard_center_center_pivot_line;
		// 	skateboard_tail = skateboard_center_tail_pivot_line;
		// }

		// drawSkateboard_center();
		// skateboard = skateboard_center;
		// skateboard_nose = skateboard_center_nose_pivot_line;
		// skateboard_center = skateboard_center_center_pivot_line;
		// skateboard_tail = skateboard_center_tail_pivot_line;

		// Calculate x pos increment
		actual_x_position = (this_y_position*pixelMultiplier)-centerYposition*-1;
		//console.log(' actual xpos: ' + actual_x_position);
		increment_x_position = actual_x_position - previous_x_position;
		//console.log('increment xpos: ' + increment_x_position);
		// Caclculate y pos increment
		actual_y_position = this_z_position*pixelMultiplier;
		increment_y_position = actual_y_position - previous_y_position;
		// Calculate z pos increment
		actual_z_position = this_x_position*pixelMultiplier;
		increment_z_position = actual_z_position - previous_z_position;

		//Detect center of rotation
		if (previous_pitch > $total_pitchs[i]) {
			//console.log('tail up')
			drawSkateboard_nose();
			skateboard = skateboard_nose;
			skateboard_nose = skateboard_nose_nose_pivot_line;
			skateboard_center = skateboard_nose_center_pivot_line;
			skateboard_tail = skateboard_nose_tail_pivot_line;
			
			final_x_position = prev_skateboard_nose.x + increment_x_position;
			//console.log('final xpos: ' + final_x_position);
			skateboard.position.x = final_x_position;

			final_y_position = prev_skateboard_nose.y + increment_y_position;
			skateboard.position.y = final_y_position;

			final_z_position = prev_skateboard_nose.z + increment_z_position;
			skateboard.position.z = final_z_position;

		} else if (previous_pitch < $total_pitchs[i]) { 
			//console.log('nose up')
			drawSkateboard_tail()
			skateboard = skateboard_tail;
			skateboard_nose = skateboard_tail_nose_pivot_line;
			skateboard_center = skateboard_tail_center_pivot_line;
			skateboard_tail = skateboard_tail_tail_pivot_line;
			
			final_x_position = prev_skateboard_tail.x + increment_x_position;
			//console.log('final xpos: ' + final_x_position);
			skateboard.position.x = final_x_position;

			final_y_position = prev_skateboard_tail.y + increment_y_position;
			skateboard.position.y = final_y_position;

			final_z_position = prev_skateboard_tail.z + increment_z_position;
			skateboard.position.z = final_z_position;

		} else {
			//console.log('same pitch')
			drawSkateboard_center();
			skateboard = skateboard_center;
			skateboard_nose = skateboard_center_nose_pivot_line;
			skateboard_center = skateboard_center_center_pivot_line;
			skateboard_tail = skateboard_center_tail_pivot_line;
			
			final_x_position = prev_skateboard_center.x + increment_x_position;
			//console.log('final xpos: ' + final_x_position);
			skateboard.position.x = final_x_position;

			final_y_position = prev_skateboard_center.y + increment_y_position;
			skateboard.position.y = final_y_position;

			final_z_position = prev_skateboard_center.z + increment_z_position;
			skateboard.position.z = final_z_position;
		}


		// Add podition to skate object
		//skateboard.position.x = final_x_position;

		previous_x_position = actual_x_position;
		previous_y_position = actual_y_position;
		previous_z_position = actual_z_position;

		// Quaternion rotation
		// 'XYZ', 'YXZ', 'ZXY', 'ZYX', 'YZX', XZY
		//console.log('yaw: ' + $total_yaws[i]*-1)
		var euler =  new THREE.Euler(  $total_rolls[i], $total_yaws[i]*-1,$total_pitchs[i],'YZX');
		var quaternion = new THREE.Quaternion();
		quaternion.setFromEuler(euler, 'YZX');
		skateboard.setRotationFromQuaternion(quaternion);


		





		scene.updateMatrixWorld(true);
		//console.log('skate: ' + skateboard_center.position.x + ', ' + skateboard_center.position.y + ', ' + skateboard_center.position.z)
		//var this_tail_pos = skateboard_center_tail_pivot_line.matrixWorld.getPosition();
		position_tail = new THREE.Vector3();
		position_tail.setFromMatrixPosition( skateboard_tail.matrixWorld )
		//console.log('tail: ' + position_tail.x + ', ' + position_tail.y + ', ' + position_tail.z);

		position_center = new THREE.Vector3();
		position_center.setFromMatrixPosition( skateboard_center.matrixWorld )
		//console.log('center world pos x: ' + position_center.x);

		position_nose = new THREE.Vector3();
		position_nose.setFromMatrixPosition( skateboard_nose.matrixWorld )
		//console.log('nose world pos x: ' + position_nose.x);
		


		// //Detect center of rotation
		// if (previous_pitch > $total_pitchs[i]) {
			
		// 	skateboard.position.x = (prev_skateboard_nose.x + increment_x_position)*pixelMultiplier-centerYposition*-1;
		// 	skateboard.position.y = (prev_skateboard_nose.y + increment_y_position)*pixelMultiplier;
		// 	skateboard.position.z = (prev_skateboard_nose.z + increment_z_position)*pixelMultiplier;
		// 	scene.add(skateboard_nose);
		// 	//console.log('nose: ' + prev_skateboard_nose.x )
		// 	//console.log('increment x: ' + increment_x_position)

		// } else if (previous_pitch < $total_pitchs[i]) { 
			
		// 	 skateboard.position.x = (prev_skateboard_tail.x + increment_x_position)*pixelMultiplier-centerYposition*-1;
		// 	skateboard.position.y = (prev_skateboard_tail.y + increment_y_position)*pixelMultiplier;
		// 	 skateboard.position.z = (prev_skateboard_tail.z + increment_z_position)*pixelMultiplier;
		// 	scene.add(skateboard_tail);
		// 	//console.log('nose: ' + prev_skateboard_nose.x )
		// 	//console.log('increment x: ' + increment_x_position)

		// } else {
		// 	 skateboard.position.x = (prev_skateboard_center.x + increment_x_position)*pixelMultiplier-centerYposition*-1;
		// 	 skateboard.position.y = (prev_skateboard_center.y + increment_y_position)*pixelMultiplier;
		// 	 skateboard.position.z = (prev_skateboard_center.z + increment_z_position)*pixelMultiplier;
		// 	scene.add(skateboard_center);
		// 	//console.log('nose: ' + prev_skateboard_nose.x )
		// 	//console.log('increment x: ' + increment_x_position)
		// 	// console.log('xpos: ' + skateboard.position.x)
		// 	// console.log('prev pos center pivot: ' + prev_skateboard_center.x)

		// }


		// //skateboardContainer.position.x = -35;
		// previous_pitch = $total_pitchs[i];

		// save tail, center, nose positions
		prev_skateboard_tail = position_tail;
		prev_skateboard_center = position_center;
		prev_skateboard_nose = position_nose;




	}
	
}




// TO DO:
// 1: Start drawing the center skateboard
// 2: Check the previous positions plus actual: calculate increment
// 








