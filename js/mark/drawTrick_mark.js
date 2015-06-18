
var this_x_position_mark;
var this_y_position_mark;
var this_z_position_mark;

var previous_x_position_mark = 0, previous_y_position_mark = 0, previous_z_position_mark = 0;
var actual_x_position_mark = 0, actual_y_position_mark = 0, actual_z_position_mark = 0;
var increment_x_position_mark = 0, increment_y_position_mark = 0, increment_z_position_mark = 0;
var final_x_position_mark = 0, final_y_position_mark = 0 , final_z_position_mark = 0;


var tailUp_mark = false;
var noseUp_mark = false;

var onGround_bool_mark = false;
var reception_mark = false;

var pivot_mark;

var skateboard_mark;
var skateboard_tail_mark = 0, skateboard_center_mark = 0, skateboard_nose_mark = 0;

var position_tail_mark = new THREE.Vector3(), position_center_mark = new THREE.Vector3(), position_tail_mark = new THREE.Vector3();
var prev_skateboard_tail_mark = new THREE.Vector3(), prev_skateboard_center_mark = new THREE.Vector3(), prev_skateboard_nose_mark = new THREE.Vector3();


var position_tail_mark = 0, position_center_mark = 0, position_nose_mark = 0;

var grey_gradient_before_jump_mark, grey_value_before_jump_mark = 0, total_grey_mark = 40;
var grey_gradient_after_jump_mark, grey_value_after_jump_mark = 40;
// var yellow_gradient_during_jump, yellow_value_during_jump = 0, total_yellow = 140, jump_up, jump_down, jump_interval, initial_red, initial_blue;
// var blue_gradient_during_jump, blue_value_during_jump = 0, initial_red_1, initial_blue_2;
var animationInterval_mark;


function drawTrick_mark(){

	resetValues_mark();
	parseData_mark(selected_trick_mark , trick_speed_mark);
	switchState_mark();

	//Restart values
	position_tail_mark = new THREE.Vector3();
	position_center_mark = new THREE.Vector3();
	position_nose_mark = new THREE.Vector3();

	prev_skateboard_tail_mark = new THREE.Vector3();
	prev_skateboard_center_mark = new THREE.Vector3();
	prev_skateboard_nose_mark = new THREE.Vector3();
	//console.log(centerYposition);

	previous_x_position_mark = 0;
	previous_y_position_mark = 0;
	previous_z_position_mark = 0;

	// console.log('before_jump: ' + before_jump);
	// console.log('during_jump: ' + during_jump);
	// console.log('after_jump: ' + after_jump);

	// Restart color values
	grey_value_before_jump_mark = 0;
	grey_value_after_jump_mark = 40;
	yellow_value_during_jump_mark = 0;

	// Grey color before jump
	grey_gradient_before_jump_mark = total_grey_mark/before_jump_mark;
	grey_gradient_before_jump_mark = grey_gradient_before_jump_mark.toFixed(0);
	grey_gradient_before_jump_mark = parseInt(grey_gradient_before_jump_mark)
	// Grey color after jump
	grey_gradient_after_jump_mark = total_grey_mark/after_jump_mark;
	grey_gradient_after_jump_mark = grey_gradient_after_jump_mark.toFixed(0);
	grey_gradient_after_jump_mark = parseInt(grey_gradient_after_jump_mark);


	// Loop through all positions lengths
	//for (var i = 0; i < $total_x_positions.length; i++) {
		
		// interval animation
		var i = 0;
		animationInterval_mark = setInterval(function(){

		if ($total_x_positions_mark.length == i) {
				trick_animation_mark = false;
				clearInterval(animationInterval_mark);
				console.log('interval cleaned');
			}
		trick_animation_mark = true;	
		i++;

		// Get color
		if ($color_state_mark[i] == 'before jump') {
			//console.log('before jumping')
			grey_value_before_jump_mark += grey_gradient_before_jump_mark;
			darkGrey_mark = new THREE.Color('rgb(' + grey_value_before_jump_mark + ', ' + grey_value_before_jump_mark + ', ' + grey_value_before_jump_mark +')');
			grey_mark = new THREE.Color('rgb(' + grey_value_before_jump_mark + ', ' + grey_value_before_jump_mark + ', ' + grey_value_before_jump_mark +')');
		} else if ($color_state_mark[i] == 'after jump') {
			//console.log('after jumping')
			grey_value_after_jump_mark -= grey_gradient_after_jump_mark;
			if (grey_value_after_jump_mark < 0) { grey_value_after_jump_mark = 0; }
			darkGrey_mark = new THREE.Color('rgb(' + grey_value_after_jump_mark + ', ' + grey_value_after_jump_mark + ', ' + grey_value_after_jump_mark +')');
			grey_mark = new THREE.Color('rgb(' + grey_value_after_jump_mark + ', ' + grey_value_after_jump_mark + ', ' + grey_value_after_jump_mark +')');
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


		this_x_position_mark = $total_x_positions_mark[i];
		this_y_position_mark = $total_y_positions_mark[i];
		this_z_position_mark = $total_z_positions_mark[i];

		$total_rolls_mark[i] = $total_rolls_mark[i]*pi/180;
		$total_pitchs_mark[i] = $total_pitchs_mark[i]*pi/180;


		// don't draw the first one as jumping
		if ($state_mark[i] == 'air'){
			onGround_bool_mark = false;
			//console.log('air')
		} else { 
			onGround_bool_mark = true;
			//console.log('ground')
		}

		if ($reception_mark[i] === 1) {
			reception_mark = true;
		} else { reception_mark = false; }
		//yellow = new THREE.Color("rgb(0, 0, 200)");

		//console.log('center y pos: ' + centerYposition_mark)
		// Calculate x pos increment
		actual_x_position_mark = (this_y_position_mark*pixelMultiplier_mark)-centerYposition_mark*-1;
		//console.log(' actual xpos: ' + actual_x_position);
		increment_x_position_mark = actual_x_position_mark - previous_x_position_mark;
		//console.log('increment xpos: ' + increment_x_position);
		// Caclculate y pos increment
		actual_y_position_mark = this_z_position_mark*pixelMultiplier_mark-20;
		increment_y_position_mark = actual_y_position_mark - previous_y_position_mark;
		// Calculate z pos increment
		actual_z_position_mark = this_x_position_mark*pixelMultiplier_mark;
		increment_z_position_mark = actual_z_position_mark - previous_z_position_mark;

		//Detect center of rotation
		if (previous_pitch_mark > $total_pitchs_mark[i]) {
			//console.log('tail up')
			drawSkateboard_nose_mark();
			skateboard_mark = skateboard_nose_mark;
			skateboard_nose_mark = skateboard_nose_nose_pivot_line_mark;
			skateboard_center_mark = skateboard_nose_center_pivot_line_mark;
			skateboard_tail_mark = skateboard_nose_tail_pivot_line_mark;
			
			final_x_position_mark = prev_skateboard_nose_mark.x + increment_x_position_mark;
			skateboard_mark.position.x = final_x_position_mark;

			final_y_position_mark = prev_skateboard_nose_mark.y + increment_y_position_mark;
			skateboard_mark.position.y = final_y_position_mark;

			final_z_position_mark = prev_skateboard_nose_mark.z + increment_z_position_mark;
			skateboard_mark.position.z = final_z_position_mark;

		} else if (previous_pitch_mark < $total_pitchs_mark[i]) { 
			//console.log('nose up')
			drawSkateboard_tail_mark()
			skateboard_mark = skateboard_tail_mark;
			skateboard_nose_mark = skateboard_tail_nose_pivot_line_mark;
			skateboard_center_mark = skateboard_tail_center_pivot_line_mark;
			skateboard_tail_mark = skateboard_tail_tail_pivot_line_mark;
			
			final_x_position_mark = prev_skateboard_tail_mark.x + increment_x_position_mark;
			skateboard_mark.position.x = final_x_position_mark;

			final_y_position_mark = prev_skateboard_tail_mark.y + increment_y_position_mark;
			skateboard_mark.position.y = final_y_position_mark;

			final_z_position_mark = prev_skateboard_tail_mark.z + increment_z_position_mark;
			skateboard_mark.position.z = final_z_position_mark;

		} else {
			//console.log('same pitch')
			drawSkateboard_center_mark();
			skateboard_mark = skateboard_center_mark;
			skateboard_nose_mark = skateboard_center_nose_pivot_line_mark;
			skateboard_center_mark = skateboard_center_center_pivot_line_mark;
			skateboard_tail_mark = skateboard_center_tail_pivot_line_mark;
			
			final_x_position_mark = prev_skateboard_center_mark.x + increment_x_position_mark;
			skateboard_mark.position.x = final_x_position_mark;

			final_y_position_mark = prev_skateboard_center_mark.y + increment_y_position_mark;
			skateboard_mark.position.y = final_y_position_mark;

			final_z_position_mark = prev_skateboard_center_mark.z + increment_z_position_mark;
			skateboard_mark.position.z = final_z_position_mark;
			//console.log('prev world x center: ' + prev_skateboard_center.x)

		}


		// 	Save actual position
		previous_x_position_mark = actual_x_position_mark;
		previous_y_position_mark = actual_y_position_mark;
		previous_z_position_mark = actual_z_position_mark;

		// Quaternion rotation
		var euler_mark =  new THREE.Euler(  $total_rolls_mark[i], $total_yaws_mark[i]*-1,$total_pitchs_mark[i],'YZX');
		var quaternion_mark = new THREE.Quaternion();
		quaternion_mark.setFromEuler(euler_mark, 'YZX');
		skateboard_mark.setRotationFromQuaternion(quaternion_mark);

		scene_mark.updateMatrixWorld(true);
		// Tail
		position_tail_mark = new THREE.Vector3();
		position_tail_mark.setFromMatrixPosition( skateboard_tail_mark.matrixWorld )

		// Center
		position_center_mark = new THREE.Vector3();
		position_center_mark.setFromMatrixPosition( skateboard_center_mark.matrixWorld )
		// Nose
		position_nose_mark = new THREE.Vector3();
		position_nose_mark.setFromMatrixPosition( skateboard_nose_mark.matrixWorld );
		

		// save tail, center, nose positions
		prev_skateboard_tail_mark = position_tail_mark;
		prev_skateboard_center_mark = position_center_mark;
		prev_skateboard_nose_mark = position_nose_mark;

		//console.log(actual_y_position);


	//}
		}, 20); // interval


}