var this_x_position_vs;
var this_y_position_vs;
var this_z_position_vs;

var previous_x_position_vs = 0, previous_y_position_vs = 0, previous_z_position_vs = 0;
var actual_x_position_vs = 0, actual_y_position_vs = 0, actual_z_position_vs = 0;
var increment_x_position_vs = 0, increment_y_position_vs = 0, increment_z_position_vs = 0;
var final_x_position_vs = 0, final_y_position_vs = 0 , final_z_position_vs = 0;

var tailUp_vs = false;
var noseUp_vs = false;

var onGround_bool_vs = false;
var reception_vs = false;

var pivot_vs;

var skateboard_vs, skateboard_vs_2;
var skateboard_tail_vs = 0, skateboard_center_vs = 0, skateboard_nose_vs = 0;

var position_tail_vs = new THREE.Vector3(), position_center_vs = new THREE.Vector3(), position_tail_vs = new THREE.Vector3();
var prev_skateboard_tail_vs = new THREE.Vector3(), prev_skateboard_center_vs = new THREE.Vector3(), prev_skateboard_nose_vs = new THREE.Vector3();


var position_tail_vs = 0, position_center_vs = 0, position_nose_vs = 0;

var grey_gradient_before_jump_vs, grey_value_before_jump_vs = 0, total_grey_vs = 40;
var grey_gradient_after_jump_vs, grey_value_after_jump_vs = 40;

var animationInterval_vs;

function drawTrick_vs(selected_trick , trick_speed){

	resetValues_vs();
	parseData_vs(selected_trick , trick_speed);
	switchState_vs();


	//Restart values
	position_tail_vs = new THREE.Vector3();
	position_center_vs = new THREE.Vector3();
	position_nose_vs = new THREE.Vector3();

	prev_skateboard_tail_vs = new THREE.Vector3();
	prev_skateboard_center_vs = new THREE.Vector3();
	prev_skateboard_nose_vs = new THREE.Vector3();
	//console.log(centerYposition);

	previous_x_position_vs = 0;
	previous_y_position_vs = 0;
	previous_z_position_vs = 0;

	// Restart color values
	grey_value_before_jump_vs = 0;
	grey_value_after_jump_vs = 40;
	yellow_value_during_jump_vs = 0;

	// Grey color before jump
	grey_gradient_before_jump_vs = total_grey_vs/before_jump_vs;
	grey_gradient_before_jump_vs = grey_gradient_before_jump_vs.toFixed(0);
	grey_gradient_before_jump_vs = parseInt(grey_gradient_before_jump_vs)
	// Grey color after jump
	grey_gradient_after_jump_vs = total_grey_vs/after_jump_vs;
	grey_gradient_after_jump_vs = grey_gradient_after_jump_vs.toFixed(0);
	grey_gradient_after_jump_vs = parseInt(grey_gradient_after_jump_vs);


	for (var i = 0; i < $total_x_positions_vs.length; i++){

		// Get color
		if ($color_state_vs[i] == 'before jump') {
			//console.log('before jumping')
			grey_value_before_jump_vs += grey_gradient_before_jump_vs;
			darkGrey_vs = new THREE.Color('rgb(' + grey_value_before_jump_vs + ', ' + grey_value_before_jump_vs + ', ' + grey_value_before_jump_vs +')');
			grey_vs = new THREE.Color('rgb(' + grey_value_before_jump_vs + ', ' + grey_value_before_jump_vs + ', ' + grey_value_before_jump_vs +')');
		} else if ($color_state_vs[i] == 'after jump') {
			//console.log('after jumping')
			grey_value_after_jump_vs -= grey_gradient_after_jump_vs;
			if (grey_value_after_jump_vs < 0) { grey_value_after_jump_vs = 0; }
			darkGrey_vs = new THREE.Color('rgb(' + grey_value_after_jump_vs + ', ' + grey_value_after_jump_vs + ', ' + grey_value_after_jump_vs +')');
			grey_vs = new THREE.Color('rgb(' + grey_value_after_jump_vs + ', ' + grey_value_after_jump_vs + ', ' + grey_value_after_jump_vs +')');
		} 


		this_x_position_vs = $total_x_positions_vs[i];
		this_y_position_vs = $total_y_positions_vs[i];
		this_z_position_vs = $total_z_positions_vs[i];

		//console.log( this_z_position_vs);
		//console.log(selected_trick);

		if (this_z_position_vs != 0){
			console.log(this_y_position_vs);
		}

		$total_rolls_vs[i] = $total_rolls_vs[i]*pi/180;
		$total_pitchs_vs[i] = $total_pitchs_vs[i]*pi/180;


		// don't draw the first one as jumping
		if ($state_vs[i] == 'air'){
			onGround_bool_vs = false;
			//console.log('air')
		} else { 
			onGround_bool_vs = true;
			//console.log('ground')
		}

		if ($reception_vs[i] === 1) {
			reception_vs = true;
		} else { reception_vs = false; }


		// detect what trick
		if(selected_trick == trick_one_vs){
			console.log('trick one')
			actual_z_position_vs = (this_x_position_vs*pixelMultiplier_vs)-50;
			increment_z_position_vs = actual_z_position_vs - previous_z_position_vs;
			blue_vs = new THREE.Color("rgb(255, 255, 255)");
			blueLine_vs = new THREE.Color("rgb(255, 255, 255)");
			yellowLine_vs = new THREE.Color("rgb(184, 228, 20)");
			yellow_vs = new THREE.Color("rgb(184, 228, 20)");
			skateboard_vs = skateboard;
		} else {
			//console.log('trick two');
			actual_z_position_vs = (this_x_position_vs*pixelMultiplier_vs)+50;
			increment_z_position_vs = actual_z_position_vs - previous_z_position_vs;
			yellow_vs = new THREE.Color("rgb(255, 255, 255)");
			blue_vs = new THREE.Color("rgb(0, 200, 255)");
			blueLine_vs = new THREE.Color("rgb(0, 200, 255)");
			yellowLine_vs = new THREE.Color("rgb(255, 255, 255)");
			skateboard_vs = skateboard_vs_2;
		}


		// Calculate x pos increment
		actual_x_position_vs = (this_y_position_vs*pixelMultiplier_vs)-centerYposition_vs*-1;

		increment_x_position_vs = actual_x_position_vs - previous_x_position_vs;

		// actual_y_position_vs = this_z_position_vs*pixelMultiplier_vs-20;
		actual_y_position_vs = this_z_position_vs*pixelMultiplier_vs;
		increment_y_position_vs = actual_y_position_vs - previous_y_position_vs;


		//Detect center of rotation
		if (previous_pitch_vs > $total_pitchs_vs[i]) {
			//console.log('tail up')
			drawSkateboard_nose_vs();
			skateboard_vs = skateboard_nose_vs;
			skateboard_nose_vs = skateboard_nose_nose_pivot_line_vs;
			skateboard_center_vs = skateboard_nose_center_pivot_line_vs;
			skateboard_tail_vs = skateboard_nose_tail_pivot_line_vs;
			
			final_x_position_vs = prev_skateboard_nose_vs.x + increment_x_position_vs;
			skateboard_vs.position.x = final_x_position_vs;

			final_y_position_vs = prev_skateboard_nose_vs.y + increment_y_position_vs;
			skateboard_vs.position.y = final_y_position_vs;

			final_z_position_vs = prev_skateboard_nose_vs.z + increment_z_position_vs;
			skateboard_vs.position.z = final_z_position_vs;

		} else if (previous_pitch_vs < $total_pitchs_vs[i]) { 
			//console.log('nose up')
			drawSkateboard_tail_vs()
			skateboard_vs = skateboard_tail_vs;
			skateboard_nose_vs = skateboard_tail_nose_pivot_line_vs;
			skateboard_center_vs = skateboard_tail_center_pivot_line_vs;
			skateboard_tail_vs = skateboard_tail_tail_pivot_line_vs;
			
			final_x_position_vs = prev_skateboard_tail_vs.x + increment_x_position_vs;
			skateboard_vs.position.x = final_x_position_vs;

			final_y_position_vs = prev_skateboard_tail_vs.y + increment_y_position_vs;
			skateboard_vs.position.y = final_y_position_vs;

			final_z_position_vs = prev_skateboard_tail_vs.z + increment_z_position_vs;
			skateboard_vs.position.z = final_z_position_vs;

		 } else {
			//console.log('same pitch')
			drawSkateboard_center_vs();
			skateboard_vs = skateboard_center_vs;
			skateboard_nose_vs = skateboard_center_nose_pivot_line_vs;
			skateboard_center_vs = skateboard_center_center_pivot_line_vs;
			skateboard_tail_vs = skateboard_center_tail_pivot_line_vs;
			
			final_x_position_vs = prev_skateboard_center_vs.x + increment_x_position_vs;
			skateboard_vs.position.x = final_x_position_vs;

			final_y_position_vs = prev_skateboard_center_vs.y + increment_y_position_vs;
			skateboard_vs.position.y = final_y_position_vs;

			final_z_position_vs = prev_skateboard_center_vs.z + increment_z_position_vs;
			skateboard_vs.position.z = final_z_position_vs;
			//console.log('prev world x center: ' + prev_skateboard_center.x)

		 }


		 // 	Save actual position
		previous_x_position_vs = actual_x_position_vs;
		previous_y_position_vs = actual_y_position_vs;
		previous_z_position_vs = actual_z_position_vs;

		// Quaternion rotation
		var euler =  new THREE.Euler(  $total_rolls_vs[i], $total_yaws_vs[i]*-1,$total_pitchs_vs[i],'YZX');
		var quaternion_vs = new THREE.Quaternion();
		quaternion_vs.setFromEuler(euler, 'YZX');
		skateboard_vs.setRotationFromQuaternion(quaternion_vs);

		scene_vs.updateMatrixWorld(true);
		// Tail
		position_tail_vs = new THREE.Vector3();
		position_tail_vs.setFromMatrixPosition( skateboard_tail_vs.matrixWorld )

		// Center
		position_center_vs = new THREE.Vector3();
		position_center_vs.setFromMatrixPosition( skateboard_center_vs.matrixWorld )
		// Nose
		position_nose_vs = new THREE.Vector3();
		position_nose_vs.setFromMatrixPosition( skateboard_nose_vs.matrixWorld );
		

		// save tail, center, nose positions
		prev_skateboard_tail_vs = position_tail_vs;
		prev_skateboard_center_vs = position_center_vs;
		prev_skateboard_nose_vs = position_nose_vs;


	}

}