
var this_x_position;
var this_y_position;
var this_z_position;

var previous_x_position = 0, previous_y_position = 0, previous_z_position = 0;
var actual_x_position = 0, actual_y_position = 0, actual_z_position = 0;
var increment_x_position = 0, increment_y_position = 0, increment_z_position = 0;
var final_x_position = 0, final_y_position = 0 , final_z_position = 0;


var tailUp = false;
var noseUp = false;

var onGround_bool = false;
var reception = false;

var pivot;

var skateboard;
var skateboard_tail = 0, skateboard_center = 0, skateboard_nose = 0;

var position_tail = new THREE.Vector3(), position_center = new THREE.Vector3(), position_tail = new THREE.Vector3();
var prev_skateboard_tail = new THREE.Vector3(), prev_skateboard_center = new THREE.Vector3(), prev_skateboard_nose = new THREE.Vector3();


var position_tail = 0, position_center = 0, position_nose = 0;

var grey_gradient_before_jump, grey_value_before_jump = 0, total_grey = 40;
var grey_gradient_after_jump, grey_value_after_jump = 40;
// var yellow_gradient_during_jump, yellow_value_during_jump = 0, total_yellow = 140, jump_up, jump_down, jump_interval, initial_red, initial_blue;
// var blue_gradient_during_jump, blue_value_during_jump = 0, initial_red_1, initial_blue_2;
var animationInterval;


function drawTrick(){
	resetValues();
	parseData(selected_trick , trick_speed);
	switchState();

	//Restart values
	position_tail = new THREE.Vector3();
	position_center = new THREE.Vector3();
	position_nose = new THREE.Vector3();

	prev_skateboard_tail = new THREE.Vector3();
	prev_skateboard_center = new THREE.Vector3();
	prev_skateboard_nose = new THREE.Vector3();
	//console.log(centerYposition);

	previous_x_position = 0;
	previous_y_position = 0;
	previous_z_position = 0;

	// console.log('before_jump: ' + before_jump);
	// console.log('during_jump: ' + during_jump);
	// console.log('after_jump: ' + after_jump);

	// Restart color values
	grey_value_before_jump = 0;
	grey_value_after_jump = 40;
	yellow_value_during_jump = 0;

	// Grey color before jump
	grey_gradient_before_jump = total_grey/before_jump;
	grey_gradient_before_jump = grey_gradient_before_jump.toFixed(0);
	grey_gradient_before_jump = parseInt(grey_gradient_before_jump)
	// Grey color after jump
	grey_gradient_after_jump = total_grey/after_jump;
	grey_gradient_after_jump = grey_gradient_after_jump.toFixed(0);
	grey_gradient_after_jump = parseInt(grey_gradient_after_jump);


	// Loop through all positions lengths
	//for (var i = 0; i < $total_x_positions.length; i++) {
		
		// interval animation
		var i = 0;
		animationInterval = setInterval(function(){

		if ($total_x_positions.length == i) {
				trick_animation = false;
				clearInterval(animationInterval);
			}
		trick_animation = true;	
		i++;

		// Get color
		if ($color_state[i] == 'before jump') {
			//console.log('before jumping')
			grey_value_before_jump += grey_gradient_before_jump;
			darkGrey = new THREE.Color('rgb(' + grey_value_before_jump + ', ' + grey_value_before_jump + ', ' + grey_value_before_jump +')');
			grey = new THREE.Color('rgb(' + grey_value_before_jump + ', ' + grey_value_before_jump + ', ' + grey_value_before_jump +')');
		} else if ($color_state[i] == 'after jump') {
			//console.log('after jumping')
			grey_value_after_jump -= grey_gradient_after_jump;
			if (grey_value_after_jump < 0) { grey_value_after_jump = 0; }
			darkGrey = new THREE.Color('rgb(' + grey_value_after_jump + ', ' + grey_value_after_jump + ', ' + grey_value_after_jump +')');
			grey = new THREE.Color('rgb(' + grey_value_after_jump + ', ' + grey_value_after_jump + ', ' + grey_value_after_jump +')');
		} else {
			// jump_interval += 1;
			// if (jump_interval <= jump_up) {
			// 	console.log('going up');
			// 	initial_red += yellow_gradient_during_jump;
			// 	initial_blue += yellow_gradient_during_jump;
			// 	// console.log('red: ' + initial_red);
			// 	// console.log('blue: ' + initial_blue)
				
			// 	initial_blue_1 += yellow_gradient_during_jump;
			// 	initial_blue_2 += yellow_gradient_during_jump;
			// 	//yellow = new THREE.Color("rgb(0, 200, 255)");
			// 	yellow =  new THREE.Color('rgb(' + initial_red + ', ' + initial_blue + ', 0)');
			// 	yellowLine =  new THREE.Color('rgb(' + initial_red + ', ' + initial_blue + ', 0)');
				
			// 	blue =  new THREE.Color('rgb(0,' + initial_blue_1 + ', ' + initial_blue_2 + ')');
			// 	blueLine =  new THREE.Color('rgb(0,' + initial_blue_1 + ', ' + initial_blue_2 + ')');
			// 	console.log(initial_blue_1);
			// 	console.log(initial_blue_2);

			// } else {
			// 	console.log('going down');
			// 	initial_red -= yellow_gradient_during_jump;
			// 	initial_blue -= yellow_gradient_during_jump;
			// 	// console.log('red: ' + initial_red);
			// 	// console.log('blue: ' + initial_blue)
				
			// 	// initial_blue_1 -= yellow_gradient_during_jump;
			// 	// initial_blue_2 -= yellow_gradient_during_jump;
			// 	//yellow = new THREE.Color("rgb(0, 200, 255)");
			// 	yellow =  new THREE.Color('rgb(' + initial_red + ', ' + initial_blue + ', 0)');
			// 	yellowLine =  new THREE.Color('rgb(' + initial_red + ', ' + initial_blue + ', 0)');
			// 	blue = new THREE.Color('rgb( 0,' + initial_blue_1 + ', ' + initial_blue_2 + ')');
			// 	blueLine = new THREE.Color('rgb( 0,' + initial_blue_1 + ', ' + initial_blue_2 + ')');
			// 	blue =  new THREE.Color('rgb(0,' + initial_blue_1 + ', ' + initial_blue_2 + ')');
			// 	blueLine =  new THREE.Color('rgb(0,' + initial_blue_1 + ', ' + initial_blue_2 + ')');
			// }
		}


		this_x_position = $total_x_positions[i];
		this_y_position = $total_y_positions[i];
		this_z_position = $total_z_positions[i];

		$total_rolls[i] = $total_rolls[i]*pi/180;
		$total_pitchs[i] = $total_pitchs[i]*pi/180;


		// don't draw the first one as jumping
		if ($state[i] == 'air'){
			onGround_bool = false;
			//console.log('air')
		} else { 
			onGround_bool = true;
			//console.log('ground')
		}

		if ($reception[i] === 1) {
			reception = true;
		} else { reception = false; }
		//yellow = new THREE.Color("rgb(0, 0, 200)");


		// Calculate x pos increment
		actual_x_position = (this_y_position*pixelMultiplier)-centerYposition*-1;
		//console.log(' actual xpos: ' + actual_x_position);
		increment_x_position = actual_x_position - previous_x_position;
		//console.log('increment xpos: ' + increment_x_position);
		// Caclculate y pos increment
		actual_y_position = this_z_position*pixelMultiplier-20;
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
			skateboard.position.x = final_x_position;

			final_y_position = prev_skateboard_center.y + increment_y_position;
			skateboard.position.y = final_y_position;

			final_z_position = prev_skateboard_center.z + increment_z_position;
			skateboard.position.z = final_z_position;
			//console.log('prev world x center: ' + prev_skateboard_center.x)

		}


		// 	Save actual position
		previous_x_position = actual_x_position;
		previous_y_position = actual_y_position;
		previous_z_position = actual_z_position;

		// Quaternion rotation
		var euler =  new THREE.Euler(  $total_rolls[i], $total_yaws[i]*-1,$total_pitchs[i],'YZX');
		var quaternion = new THREE.Quaternion();
		quaternion.setFromEuler(euler, 'YZX');
		skateboard.setRotationFromQuaternion(quaternion);

		scene.updateMatrixWorld(true);
		// Tail
		position_tail = new THREE.Vector3();
		position_tail.setFromMatrixPosition( skateboard_tail.matrixWorld )

		// Center
		position_center = new THREE.Vector3();
		position_center.setFromMatrixPosition( skateboard_center.matrixWorld )
		// Nose
		position_nose = new THREE.Vector3();
		position_nose.setFromMatrixPosition( skateboard_nose.matrixWorld );
		

		// save tail, center, nose positions
		prev_skateboard_tail = position_tail;
		prev_skateboard_center = position_center;
		prev_skateboard_nose = position_nose;

		//console.log(actual_y_position);


	//}
		}, 20); // interval


}











