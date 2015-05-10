// Arrays
var $y_Accel_vs = [],
	$z_Accel_vs = [],
	$yaw_vs = [],
	$pitch_vs = [],
	$roll_vs = [],
	$state_vs = [],
	$air_ground_vs = []; // to calculate average. 0 = ground / 1 = air 

// Position arrays
var $total_yaws_vs = [];
var $total_pitchs_vs = [];
var $total_rolls_vs = [];
var $total_x_positions_vs = [];
var $total_y_positions_vs = [];
var $total_z_positions_vs = [];

var $reception_vs = [];

// Booleans for 180
var plus180_vs = false;
var minus180_vs = false;
var halfJump_vs = false;


var airtime_vs = 0;
var total_time_on_air_vs = 0;
var gravity_vs = 9.81;
// [y,z,yaw,pitch, roll]
var data_row_vs;

var totalSpeed_vs;
var elapsed_time_on_air_vs = 0;
var interval_vs = 0;
var air_interval_vs = 0;
var initialYaw_vs ;
var total_angle_diff_vs = 0;
var time = 0.02; // milliseconds to seconds
var pi = 3.14;
var pixelMultiplier_vs = 110;
var pixelMultiplier_z_vs = 80;


// Position variables
var xSpeed_vs, xPosition_vs = 0, xPreviousPosition_vs = 0;
var ySpeed_vs, yPosition_vs = 0, yPreviousPosition_vs = 0;
var zPosition_vs;

var centerYposition_vs = 0;

// Arrays to modify color
var before_jump_vs = 0, after_jump_vs = 0, during_jump_vs = 0;
var $color_state_vs = [];
var jump_ended_vs = false;

function parseData_vs( data, speed ){

	totalSpeed_vs = speed;
	// // Loop throught all the trick data array
	// // Get y,z, yaw, pitch, roll values
	for (var i = 0; i < data.length; i++){

	 	data_row_vs = data[i];
		
		// Reset for small values
		// Reset Y
		if (data_row_vs[0] <= 5 && data_row_vs[0] >= -5){ data_row_vs[0] = 0; }
		// Reset Z
		if (data_row_vs[1] <= 5 && data_row_vs[1] >= -5){ data_row_vs[1] = 0; }


		// Push y,z values to air or ground array to calculate average
		if (data_row_vs[0] !== 0 || data_row_vs[1] !== 0){
			$air_ground_vs.push(1); // air
		} else { $air_ground_vs.push(0); } // ground


		// Push every value to its array
		$y_Accel_vs.push(data_row_vs[0]);
		$z_Accel_vs.push(data_row_vs[1]);
		$yaw_vs.push(data_row_vs[2]);
		$pitch_vs.push(data_row_vs[3]);
		$roll_vs.push(data_row_vs[4]);

	} 

	// Round air/ground values
	// Push air time value
	calculateAverage_vs();

	// Transform air time value to seconds
	total_time_on_air_vs = airtime_vs*0.02;
	// Calculate speed in the air
	airSpeed_vs = 0.5*gravity*total_time_on_air_vs;
	//console.log('airSpeed_vs ' + airSpeed_vs);

	
}


var state_vs;
var k;
// Run onGround / onAir
function switchState_vs(){

	for (k = 0; k < $state_vs.length; k++) {

		state_vs = $state_vs[k];

		if (state_vs == 'ground') {
			onGround_vs();
		} else if (state_vs == 'air') {
			onAir_vs();
		}
	
	}

}



// Calculate position when the skate is on the ground
function onGround_vs(){

	if (jump_ended_vs == false) {
		// before jump
		//console.log('before jump');
		before_jump_vs += 1;
		$color_state_vs.push('before jump')
		//console.log(before_jump);
	} else if (jump_ended_vs == true) {
		// after jump
		after_jump_vs += 1;
		$color_state_vs.push('after jump');
	}
	
	elapsed_time_on_air_vs = 0;
	air_interval_vs = 0;
	interval_vs += 1;

	initialYaw_vs = $yaw_vs[0];
  	//console.log(initialYaw);

	// If there have been 180
	if ( plus180_vs == true ) { $yaw_vs [k] = $yaw_vs[k] + 180; $roll_vs[k] = $roll_vs[k] ; $pitch_vs[k] = $pitch_vs[k] ;}
  	if ( minus180_vs == true ) { $yaw_vs[k] = $yaw_vs[k] - 180; $roll_vs[k] = $roll_vs[k] ; $pitch_vs[k] = $pitch_vs[k] ; }

  	initialYaw_vs = $yaw_vs[0];
  	total_angle_diff_vs = $yaw_vs[k] - initialYaw_vs;
  	// to radians
  	total_angle_diff_vs = total_angle_diff_vs*pi/180;

  	// Calculate x positions
  	xSpeed_vs = totalSpeed_vs*Math.sin(total_angle_diff_vs);
  	xPosition_vs = xPreviousPosition_vs + xSpeed_vs*time;
  	xPreviousPosition_vs = xPosition_vs;

  	// Calculate y positions
  	ySpeed_vs = totalSpeed_vs*Math.cos(total_angle_diff_vs);
  	yPosition_vs = yPreviousPosition_vs + ySpeed_vs*time;
  	yPreviousPosition_vs = yPosition_vs;

  	// Update z: is always 0 on ground
  	zPosition_vs = 0;
  	// Update pitch: is always 0 on ground
  	$pitch_vs[k] = 0;

  	// Push yaw, pitch, roll / x, y, z positions
	$total_yaws_vs.push(total_angle_diff_vs);
	$total_pitchs_vs.push($pitch_vs[k]);
	$total_rolls_vs.push($roll_vs[k]);
	$total_x_positions_vs.push(xPosition_vs);
	$total_y_positions_vs.push(yPosition_vs);
	$total_z_positions_vs.push(zPosition_vs);

	$reception_vs.push(0);
	tailUp_vs = false;
	noseUp_vs = false;

}

var initialYawOnJumping_vs, initial_y_onJumping_vs; 
var final_y_onJumping_vs, jumpDistance_vs;
var yawOnLanding_vs;
var jumpHeight_vs;
var previous_pitch_vs = 0

function onAir_vs(){

	//console.log('air');
	air_interval_vs += 1;
	elapsed_time_on_air_vs = air_interval_vs*time;


	// Detect first moment on jump
	if (elapsed_time_on_air_vs == time) {
		initialYawOnJumping_vs = $yaw_vs[k];
		initial_y_onJumping_vs = yPosition_vs;
	}

	// Detect landing moment
	if (elapsed_time_on_air_vs == total_time_on_air_vs) {
		yawOnLanding_vs = $yaw_vs[k];
		calculateLanding_vs();
		
		final_y_onJumping_vs = yPosition_vs;
		jumpDistance_vs = final_y_onJumping_vs - initial_y_onJumping_vs;
		$reception_vs.push(1);
		jump_ended_vs = true;
		$color_state_vs.push('after jump')
		after_jump_vs += 1;
	} else {
		$reception_vs.push(0);
		$color_state_vs.push('jump');
		during_jump_vs += 1;
	}
	//console.log(elapsed_time_on_air)
	// Calculate z position
	zPosition_vs = airSpeed_vs*elapsed_time_on_air_vs-0.5*gravity*elapsed_time_on_air_vs*elapsed_time_on_air_vs;
	//console.log(zPosition)
	// Calculate x position: keeps constant
	xPosition_vs = xPreviousPosition_vs + xSpeed_vs*time;
	xPreviousPosition_vs = xPosition_vs;

	// Calculate y position: keeps constant
	yPosition_vs = yPreviousPosition_vs + ySpeed_vs*time;
	yPreviousPosition_vs = yPosition_vs;

	interval_vs += 1;

	// Calculate jump height and center y position
	// Detect middle of the jump
	if (elapsed_time_on_air_vs >= total_time_on_air_vs/2 && halfJump_vs == false) {
		halfJump_vs = true;
		jumpHeight_vs = zPosition_vs;
		centerYposition_vs = yPosition_vs*pixelMultiplier_vs*-1;
		// console.log('center position on parse data ' + centerYposition)
	}

	// Calculate total angle dif to rads
	total_angle_diff_vs = $yaw_vs[k] - initialYaw_vs;
	total_angle_diff_vs = total_angle_diff_vs*pi/180;

	// Push yaw, pitch, roll / x, y, z positions
	$total_x_positions_vs.push(xPosition_vs);
	$total_y_positions_vs.push(yPosition_vs);
	$total_z_positions_vs.push(zPosition_vs);
	$total_yaws_vs.push(total_angle_diff_vs);
	$total_pitchs_vs.push($pitch_vs[k]*-1);
	$total_rolls_vs.push($roll_vs[k]*-1);


}

function calculateLanding_vs(){
	// Calculate 180s
	// first case initialYaw < 0 > 90
	if ( initialYawOnJumping_vs > 0 && initialYawOnJumping_vs < 90 ) {
	    if ( -90 + initialYawOnJumping_vs < yawOnLanding_vs && 90 + initialYawOnJumping_vs > yawOnLanding_vs) { yawOnLanding_vs = yawOnLanding_vs; 
	    	console.log("case 1: final yawOnLanding not 180");}
	    else if ( 90 + initialYawOnJumping_vs < yawOnLanding_vs && yawOnLanding_vs < 179 ) { yawOnLanding_vs = yawOnLanding_vs - 180; 
	    	console.log("case 1: final yawOnLanding -180"); minus180_vs = true; plus180_vs = false;}
	    else if ( -90 + initialYawOnJumping_vs > yawOnLanding_vs && yawOnLanding_vs > -179 ) { yawOnLanding_vs = yawOnLanding_vs + 180; 
	    	console.log("case 1: final yawOnLanding +180"); plus180_vs = true; minus180_vs = false;}
  	}

  	// second case initialYaw > 90 < 179
 	if ( initialYawOnJumping_vs > 90 && initialYawOnJumping_vs < 179) {
	    if ( yawOnLanding_vs > 0 && 90 - ( 179 - initialYawOnJumping_vs ) > yawOnLanding_vs ) { yawOnLanding_vs = yawOnLanding_vs - 180 ; 
	    	console.log("case 2: final yawOnLanding -180"); minus180_vs = true; plus180_vs = false;}
	    else if ( -90 - (179 - initialYawOnJumping_vs) < yawOnLanding_vs && yawOnLanding_vs < 0 ) { yawOnLanding_vs = yawOnLanding_vs + 180; 
	    	console.log("case 2: final yawOnLanding + 180"); plus180_vs = true; minus180_vs = false;}
	    else { yawOnLanding_vs = yawOnLanding_vs; 
	    	console.log("case 2: final yawOnLanding not 180");}
  	}

  	// Third case initial yaw < 0 > -90
  	if ( initialYawOnJumping_vs < 0 && initialYawOnJumping_vs > -90 ) {
	    if ( yawOnLanding_vs > -179 && yawOnLanding_vs < -90 + initialYawOnJumping_vs) { yawOnLanding_vs = yawOnLanding_vs + 180; 
	    	console.log("case 3: final yawOnLanding + 180"); plus180_vs = true; minus180_vs = false; }
	    else if ( 90 + initialYawOnJumping_vs < yawOnLanding_vs && yawOnLanding_vs < 179 ) { yawOnLanding_vs = yawOnLanding_vs - 180; 
	    	console.log("case 3: final yawOnLanding - 180"); minus180_vs = true; plus180_vs = false;}
	    else { yawOnLanding_vs = yawOnLanding_vs; 
	    	console.log("case 3: final yawOnLanding not 180");}
  	}

  	// Fourth case initial yaw > -90 < -179
  	if ( initialYawOnJumping_vs < -90 && initialYawOnJumping_vs > -179 ) {
	    if ( yawOnLanding_vs > 0 && 90 + ( 179 + initialYawOnJumping_vs ) > yawOnLanding_vs ) { yawOnLanding_vs = yawOnLanding_vs - 180; 
	    	console.log("case 4: final yawOnLanding - 180"); minus180_vs = true; plus180_vs = false;}
	    else if ( -90 + (179 + initialYawOnJumping_vs ) < yawOnLanding_vs && yawOnLanding_vs < 0 ) { yawOnLanding_vs = yawOnLanding_vs + 180; 
	    	console.log("case 4: final yawOnLanding + 180"); plus180_vs = true; minus180_vs = false;}
	    else { yawOnLanding_vs = yawOnLanding_vs; 
	    	console.log("case 4: final yawOnLanding not 180");}
  	}

}

function calculateAverage_vs(){
	var average = 0, sliced, slice_num = 8, slice_start = 0, target_average = 0.5;

	for (var j = 0; j < $air_ground_vs.length; j++) {

		average = 0;
		slice_start = j >= slice_num/2 ? j-slice_num/2 : 0;
		sliced = $air_ground_vs.slice(slice_start, slice_start + slice_num);
		sliced.forEach(function(value, index) {

			average += value == 0 ? 0 : 1;
		});
		average = average / slice_num;

		if (average >= target_average) {
			$state_vs.push('air');
			airtime_vs += 1;
		} else { $state_vs.push('ground')}
	}
}



function resetValues_vs(){

	total_angle_diff_vs = 0, xSpeed_vs = 0, ySpeed_vs = 0, xPosition_vs = 0, xPreviousPosition_vs = 0,
	yPosition_vs = 0, yPreviousPosition_vs = 0, zPosition_vs = 0;
	minus180_vs = false;
	plus180_vs = false;

	$y_Accel_vs = [],
	$z_Accel_vs = [],
	$yaw_vs = [],
	$pitch_vs = [],
	$roll_vs = [],
	$state_vs = [];
	$air_ground_vs = [];

	$total_x_positions_vs = [];
	$total_y_positions_vs = [];
	$total_z_positions_vs = [];
	$total_yaws_vs = [];
	$total_pitchs_vs = [];
	$total_rolls_vs = [];

	$reception_vs = [];

	interval_vs = 0;
	centerPosition_vs = 0;
	initial_y_onJumping_vs = 0;
	final_y_onJumping_vs = 0;
	halfJump_vs = false;
	jumpDistance_vs = 0;
	jumpHeight_vs = 0;

	tailUp_vs = false;
	noseUp_vs = false;

	airSpeed_vs = 0;
	elapsed_time_on_air_vs = 0;
	air_interval_vs = 0;
	total_time_on_air_vs = 0;
	airtime_vs = 0;

	initialYaw_vs = 0;
	//centerYposition = 0;

	before_jump_vs = 0, after_jump_vs = 0, during_jump_vs = 0;
	jump_ended_vs = false;
	$color_state_vs = [];

}