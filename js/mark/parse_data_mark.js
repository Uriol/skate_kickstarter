// Arrays
var $y_Accel_mark = [],
	$z_Accel_mark = [],
	$yaw_mark = [],
	$pitch_mark = [],
	$roll_mark = [],
	$state_mark = [],
	$air_ground_mark = []; // to calculate average. 0 = ground / 1 = air 

// Position arrays
var $total_yaws_mark = [];
var $total_pitchs_mark = [];
var $total_rolls_mark = [];
var $total_x_positions_mark = [];
var $total_y_positions_mark = [];
var $total_z_positions_mark = [];

var $reception_mark = [];

// Booleans for 180
var plus180_mark = false;
var minus180_mark = false;
var halfJump_mark = false;

var airtime_mark = 0;
var total_time_on_air_mark = 0;
var gravity_mark = 9.81;
// [y,z,yaw,pitch, roll]
var data_row_mark;

var totalSpeed_mark = 2.5;
var elapsed_time_on_air_mark = 0;
var interval_mark = 0;
var air_interval_mark = 0;
var initialYaw_mark ;
var total_angle_diff_mark = 0;
var time_mark = 0.02; // milliseconds to seconds
var pi_mark = 3.14;
var pixelMultiplier_mark = 110;
var pixelMultiplier_z_mark = 80;


// Position variables
var xSpeed_mark, xPosition_mark = 0, xPreviousPosition_mark = 0;
var ySpeed_mark, yPosition_mark = 0, yPreviousPosition_mark = 0;


var centerYposition_mark = 0;
// Call functions
// parseData(trick_data);
// switchState();
// resetValues();


// Arrays to modify color
var before_jump_mark = 0, after_jump_mark = 0, during_jump_mark = 0;
var $color_state_mark = [];
var jump_ended_mark = false;

var zPosition_mark = 0;
var zInitialPosition_mark = 0;
var zPosition_increment = 0.40;

function parseData_mark( data , speed ){
	
	zPosition_mark = 0.40, zInitialPosition_mark = 0.40;


	totalSpeed_mark = speed ;
	// Loop throught all the trick data array
	// Get y,z, yaw, pitch, roll values
	for (var i = 0; i < data.length; i++){

		data_row_mark = data[i];
		
		// Reset for small values
		// Reset Y
		if (data_row_mark[0] <= 5 && data_row_mark[0] >= -5){ data_row_mark[0] = 0; }
		// Reset Z
		if (data_row_mark[1] <= 5 && data_row_mark[1] >= -5){ data_row_mark[1] = 0; }


		// Push y,z values to air or ground array to calculate average
		if (data_row_mark[0] !== 0 || data_row_mark[1] !== 0){
			$air_ground_mark.push(1); // air
		} else { $air_ground_mark.push(0); } // ground


		// Push every value to its array
		$y_Accel_mark.push(data_row_mark[0]);
		$z_Accel_mark.push(data_row_mark[1]);
		$yaw_mark.push(data_row_mark[2]);
		$pitch_mark.push(data_row_mark[3]);
		$roll_mark.push(data_row_mark[4]);

	} // end of loop
	console.log('end loop')
	// Round air/ground values
	// Push air time value
	calculateAverage_mark();

	// Transform air time value to seconds
	total_time_on_air_mark = airtime_mark*0.02;
	// Calculate speed in the air
	airSpeed_mark = 0.5*gravity_mark*total_time_on_air_mark;
	console.log('airSpeed_mark ' + airSpeed_mark);
	// Run

	console.log('zPosition_mark: ' + zPosition_mark)
	
}


var state_mark;
var k;
// Run onGround / onAir
function switchState_mark(){

	for (k = 0; k < $state_mark.length; k++) {

		state_mark = $state_mark[k];

		if (state_mark == 'ground') {
			onGround_mark();
		} else if (state_mark == 'air') {
			onAir_mark();
		}
	
	}

}



// Calculate position when the skate is on the ground
function onGround_mark(){

	if (jump_ended_mark == false) {
		// before jump
		//console.log('before jump');
		before_jump_mark += 1;
		$color_state_mark.push('before jump')
		//console.log(before_jump);
	} else if (jump_ended_mark == true) {
		// after jump
		after_jump_mark += 1;
		$color_state_mark.push('after jump');
	}
	
	elapsed_time_on_air_mark = 0;
	air_interval_mark = 0;
	interval_mark += 1;

	initialYaw_mark = $yaw_mark[0];
  	//console.log(initialYaw);

	// If there have been 180
	if ( plus180_mark == true ) { $yaw_mark[k] = $yaw_mark[k] + 180; $roll_mark[k] = $roll_mark[k] ; $pitch_mark[k] = $pitch_mark[k] ;}
  	if ( minus180_mark == true ) { $yaw_mark[k] = $yaw_mark[k] - 180; $roll_mark[k] = $roll_mark[k] ; $pitch_mark[k] = $pitch_mark[k] ; }

  	initialYaw_mark = $yaw_mark[0];
  	total_angle_diff_mark = $yaw_mark[k] - initialYaw_mark;
  	// to radians
  	total_angle_diff_mark = total_angle_diff_mark*pi/180;

  	// Calculate x positions
  	xSpeed_mark = totalSpeed_mark*Math.sin(total_angle_diff_mark);
  	xPosition_mark = xPreviousPosition_mark + xSpeed_mark*time_mark;
  	xPreviousPosition_mark = xPosition_mark;

  	// Calculate y positions
  	ySpeed_mark = totalSpeed_mark*Math.cos(total_angle_diff_mark);
  	yPosition_mark = yPreviousPosition_mark + ySpeed_mark*time_mark;
  	yPreviousPosition_mark = yPosition_mark;

  	// Update z: is always 0 on ground
  	zPosition_mark = zPosition_mark;
  	console.log('zPosition_mark: ' + zPosition_mark)
  	// Update pitch: is always 0 on ground
  	$pitch_mark[k] = 0;

  	// Push yaw, pitch, roll / x, y, z positions
	$total_yaws_mark.push(total_angle_diff_mark);
	$total_pitchs_mark.push($pitch_mark[k]);
	$total_rolls_mark.push($roll_mark[k]);
	$total_x_positions_mark.push(xPosition_mark);
	$total_y_positions_mark.push(yPosition_mark);
	$total_z_positions_mark.push(zPosition_mark);

	$reception_mark.push(0);
	tailUp_mark = false;
	noseUp_mark = false;

}

var initialYawOnJumping_mark, initial_y_onJumping_mark; 
var final_y_onJumping_mark, jumpDistance_mark;
var yawOnLanding_mark;
var jumpHeight_mark;
var previous_pitch_mark = 0

function onAir_mark(){

	//console.log('air');
	air_interval_mark += 1;
	elapsed_time_on_air_mark = air_interval_mark*time_mark;


	// Detect first moment on jump
	if (elapsed_time_on_air_mark == time_mark) {
		initialYawOnJumping_mark = $yaw_mark[k];
		initial_y_onJumping_mark = yPosition_mark;
	}

	// Detect landing moment
	if (elapsed_time_on_air_mark == total_time_on_air_mark) {
		yawOnLanding_mark = $yaw_mark[k];
		calculateLanding_mark();
		
		final_y_onJumping_mark = yPosition_mark;
		jumpDistance_mark = final_y_onJumping_mark - initial_y_onJumping_mark;
		$reception_mark.push(1);
		jump_ended_mark = true;
		$color_state_mark.push('after jump')
		after_jump_mark += 1;
	} else {
		$reception_mark.push(0);
		$color_state_mark.push('jump');
		during_jump_mark += 1;
	}

	// Calculate z position
	//zPosition_mark = airSpeed_mark*elapsed_time_on_air_mark-0.5*gravity_mark*elapsed_time_on_air_mark*elapsed_time_on_air_mark;
	var z_speed_mark = 3;
   	zPosition_mark = zInitialPosition_mark + z_speed_mark*elapsed_time_on_air_mark - 0.5*9.8*elapsed_time_on_air_mark*elapsed_time_on_air_mark ;
   	//zPosition_mark = zPosition_mark+zPosition_increment;
   	console.log('zPosition_mark: ' + zPosition_mark)

	//console.log(zPosition)
	// Calculate x position: keeps constant
	xPosition_mark = xPreviousPosition_mark + xSpeed_mark*time_mark;
	xPreviousPosition_mark = xPosition_mark;

	// Calculate y position: keeps constant
	yPosition_mark = yPreviousPosition_mark + ySpeed_mark*time_mark;
	yPreviousPosition_mark = yPosition_mark;

	interval_mark += 1;

	// Calculate jump height and center y position
	// Detect middle of the jump
	if (elapsed_time_on_air_mark >= total_time_on_air_mark/2 && halfJump_mark == false) {
		halfJump_mark = true;
		jumpHeight_mark = zPosition_mark;
		centerYposition_mark = yPosition_mark*pixelMultiplier_mark*-1;
		// console.log('center position on parse data ' + centerYposition)
	}

	// Calculate total angle dif to rads
	total_angle_diff_mark = $yaw_mark[k] - initialYaw_mark;
	total_angle_diff_mark = total_angle_diff_mark*pi/180;

	// Push yaw, pitch, roll / x, y, z positions
	$total_x_positions_mark.push(xPosition_mark);
	$total_y_positions_mark.push(yPosition_mark);
	$total_z_positions_mark.push(zPosition_mark);
	$total_yaws_mark.push(total_angle_diff_mark);
	$total_pitchs_mark.push($pitch_mark[k]*-1);
	$total_rolls_mark.push($roll_mark[k]*-1);


}

function calculateLanding_mark(){
	// Calculate 180s
	// first case initialYaw < 0 > 90
	if ( initialYawOnJumping_mark > 0 && initialYawOnJumping_mark < 90 ) {
	    if ( -90 + initialYawOnJumping_mark < yawOnLanding_mark && 90 + initialYawOnJumping_mark > yawOnLanding_mark) { yawOnLanding_mark = yawOnLanding_mark; 
	    	console.log("case 1: final yawOnLanding not 180");}
	    else if ( 90 + initialYawOnJumping_mark < yawOnLanding_mark && yawOnLanding_mark < 179 ) { yawOnLanding_mark = yawOnLanding_mark - 180; 
	    	console.log("case 1: final yawOnLanding -180"); minus180_mark = true; plus180_mark = false;}
	    else if ( -90 + initialYawOnJumping_mark > yawOnLanding_mark && yawOnLanding_mark > -179 ) { yawOnLanding_mark = yawOnLanding_mark + 180; 
	    	console.log("case 1: final yawOnLanding +180"); plus180_mark = true; minus180_mark = false;}
  	}

  	// second case initialYaw > 90 < 179
 	if ( initialYawOnJumping_mark > 90 && initialYawOnJumping_mark < 179) {
	    if ( yawOnLanding_mark > 0 && 90 - ( 179 - initialYawOnJumping_mark ) > yawOnLanding_mark ) { yawOnLanding_mark = yawOnLanding_mark - 180 ; 
	    	console.log("case 2: final yawOnLanding -180"); minus180_mark = true; plus180_mark = false;}
	    else if ( -90 - (179 - initialYawOnJumping_mark) < yawOnLanding_mark && yawOnLanding_mark < 0 ) { yawOnLanding_mark = yawOnLanding_mark + 180; 
	    	console.log("case 2: final yawOnLanding + 180"); plus180_mark = true; minus180_mark = false;}
	    else { yawOnLanding_mark = yawOnLanding_mark; 
	    	console.log("case 2: final yawOnLanding not 180");}
  	}

  	// Third case initial yaw < 0 > -90
  	if ( initialYawOnJumping_mark < 0 && initialYawOnJumping_mark > -90 ) {
	    if ( yawOnLanding_mark > -179 && yawOnLanding_mark < -90 + initialYawOnJumping_mark) { yawOnLanding_mark = yawOnLanding_mark + 180; 
	    	console.log("case 3: final yawOnLanding + 180"); plus180_mark = true; minus180_mark = false; }
	    else if ( 90 + initialYawOnJumping_mark < yawOnLanding_mark && yawOnLanding_mark < 179 ) { yawOnLanding_mark = yawOnLanding_mark - 180; 
	    	console.log("case 3: final yawOnLanding - 180"); minus180_mark = true; plus180_mark = false;}
	    else { yawOnLanding_mark = yawOnLanding_mark; 
	    	console.log("case 3: final yawOnLanding not 180");}
  	}

  	// Fourth case initial yaw > -90 < -179
  	if ( initialYawOnJumping_mark < -90 && initialYawOnJumping_mark > -179 ) {
	    if ( yawOnLanding_mark > 0 && 90 + ( 179 + initialYawOnJumping_mark ) > yawOnLanding_mark ) { yawOnLanding_mark = yawOnLanding_mark - 180; 
	    	console.log("case 4: final yawOnLanding - 180"); minus180_mark = true; plus180_mark = false;}
	    else if ( -90 + (179 + initialYawOnJumping_mark ) < yawOnLanding_mark && yawOnLanding_mark < 0 ) { yawOnLanding_mark = yawOnLanding_mark + 180; 
	    	console.log("case 4: final yawOnLanding + 180"); plus180_mark = true; minus180_mark = false;}
	    else { yawOnLanding_mark = yawOnLanding_mark; 
	    	console.log("case 4: final yawOnLanding not 180");}
  	}

}

function calculateAverage_mark(){
	var average = 0, sliced, slice_num = 8, slice_start = 0, target_average = 0.5;

	for (var j = 0; j < $air_ground_mark.length; j++) {

		average = 0;
		slice_start = j >= slice_num/2 ? j-slice_num/2 : 0;
		sliced = $air_ground_mark.slice(slice_start, slice_start + slice_num);
		sliced.forEach(function(value, index) {

			average += value == 0 ? 0 : 1;
		});
		average = average / slice_num;

		if (average >= target_average) {
			$state_mark.push('air');
			airtime_mark += 1;
		} else { $state_mark.push('ground')}
	}
}


function resetValues_mark(){

	total_angle_diff_mark = 0, xSpeed_mark = 0, ySpeed_mark = 0, xPosition_mark = 0, xPreviousPosition_mark = 0,
	yPosition_mark = 0, yPreviousPosition_mark = 0, zPosition_mark = 0;
	minus180_mark = false;
	plus180_mark = false;

	$y_Accel_mark = [],
	$z_Accel_mark = [],
	$yaw_mark = [],
	$pitch_mark = [],
	$roll_mark = [],
	$state_mark = [];
	$air_ground_mark = [];

	$total_x_positions_mark = [];
	$total_y_positions_mark = [];
	$total_z_positions_mark = [];
	$total_yaws_mark = [];
	$total_pitchs_mark = [];
	$total_rolls_mark = [];

	$reception_mark = [];

	interval_mark = 0;
	centerPosition_mark = 0;
	initial_y_onJumping_mark = 0;
	final_y_onJumping_mark = 0;
	halfJump_mark = false;
	jumpDistance_mark = 0;
	jumpHeight_mark = 0;

	tailUp_mark = false;
	noseUp_mark = false;

	airSpeed_mark = 0;
	elapsed_time_on_air_mark = 0;
	air_interval_mark = 0;
	total_time_on_air_mark = 0;
	airtime_mark = 0;

	initialYaw_mark = 0;
	//centerYposition = 0;

	before_jump_mark = 0, after_jump_mark = 0, during_jump_mark = 0;
	jump_ended_mark = false;
	$color_state_mark = [];

}