// Arrays
var $y_Accel = [],
	$z_Accel = [],
	$yaw = [],
	$pitch = [],
	$roll = [],
	$state = [],
	$air_ground = []; // to calculate average. 0 = ground / 1 = air 

// Position arrays
var $total_yaws = [];
var $total_pitchs = [];
var $total_rolls = [];
var $total_x_positions = [];
var $total_y_positions = [];
var $total_z_positions = [];

var $reception = [];

// Booleans for 180
var plus180 = false;
var minus180 = false;
var halfJump = false;

var airtime = 0;
var total_time_on_air = 0;
var gravity = 9.81;
// [y,z,yaw,pitch, roll]
var data_row;

var totalSpeed = 2.5;
var elapsed_time_on_air = 0;
var interval = 0;
var air_interval = 0;
var initialYaw ;
var total_angle_diff = 0;
var time = 0.02; // milliseconds to seconds
var pi = 3.14;
var pixelMultiplier = 110;
var pixelMultiplier_z = 80;


// Position variables
var xSpeed, xPosition = 0, xPreviousPosition = 0;
var ySpeed, yPosition = 0, yPreviousPosition = 0;
var zPosition;

var centerYposition = 0;
// Call functions
// parseData(trick_data);
// switchState();
// resetValues();


function parseData( data ){

	// Loop throught all the trick data array
	// Get y,z, yaw, pitch, roll values
	for (var i = 0; i < data.length; i++){

		data_row = data[i];
		
		// Reset for small values
		// Reset Y
		if (data_row[0] <= 5 && data_row[0] >= -5){ data_row[0] = 0; }
		// Reset Z
		if (data_row[1] <= 5 && data_row[1] >= -5){ data_row[1] = 0; }


		// Push y,z values to air or ground array to calculate average
		if (data_row[0] !== 0 || data_row[1] !== 0){
			$air_ground.push(1); // air
		} else { $air_ground.push(0); } // ground


		// Push every value to its array
		$y_Accel.push(data_row[0]);
		$z_Accel.push(data_row[1]);
		$yaw.push(data_row[2]);
		$pitch.push(data_row[3]);
		$roll.push(data_row[4]);

	} // end of loop

	// Round air/ground values
	// Push air time value
	calculateAverage();

	// Transform air time value to seconds
	total_time_on_air = airtime*0.02;
	// Calculate speed in the air
	airSpeed = 0.5*gravity*total_time_on_air;
	//console.log('airSpeed ' + airSpeed);
	// Run
	
}


var state;
var k;
// Run onGround / onAir
function switchState(){

	for (k = 0; k < $state.length; k++) {

		state = $state[k];

		if (state == 'ground') {
			onGround();
		} else if (state == 'air') {
			onAir();
		}
	
	}

}



// Calculate position when the skate is on the ground
function onGround(){


	elapsed_time_on_air = 0;
	air_interval = 0;
	interval += 1;

	initialYaw = $yaw[0];
  	//console.log(initialYaw);

	// If there have been 180
	if ( plus180 == true ) { $yaw[k] = $yaw[k] + 180; $roll[k] = $roll[k] ; $pitch[k] = $pitch[k] ;}
  	if ( minus180 == true ) { $yaw[k] = $yaw[k] - 180; $roll[k] = $roll[k] ; $pitch[k] = $pitch[k] ; }

  	initialYaw = $yaw[0];
  	total_angle_diff = $yaw[k] - initialYaw;
  	// to radians
  	total_angle_diff = total_angle_diff*pi/180;

  	// Calculate x positions
  	xSpeed = totalSpeed*Math.sin(total_angle_diff);
  	xPosition = xPreviousPosition + xSpeed*time;
  	xPreviousPosition = xPosition;

  	// Calculate y positions
  	ySpeed = totalSpeed*Math.cos(total_angle_diff);
  	yPosition = yPreviousPosition + ySpeed*time;
  	yPreviousPosition = yPosition;

  	// Update z: is always 0 on ground
  	zPosition = 0;
  	// Update pitch: is always 0 on ground
  	$pitch[k] = 0;

  	// Push yaw, pitch, roll / x, y, z positions
	$total_yaws.push(total_angle_diff);
	$total_pitchs.push($pitch[k]);
	$total_rolls.push($roll[k]);
	$total_x_positions.push(xPosition);
	$total_y_positions.push(yPosition);
	$total_z_positions.push(zPosition);

	$reception.push(0);
	tailUp = false;
	noseUp = false;

}

var initialYawOnJumping, initial_y_onJumping; 
var final_y_onJumping, jumpDistance;
var yawOnLanding;
var jumpHeight;
var previous_pitch = 0

function onAir(){

	air_interval += 1;
	elapsed_time_on_air = air_interval*time;


	// Detect first moment on jump
	if (elapsed_time_on_air == time) {
		initialYawOnJumping = $yaw[k];
		initial_y_onJumping = yPosition;
	}

	// Detect landing moment
	if (elapsed_time_on_air == total_time_on_air) {
		yawOnLanding = $yaw[k];
		calculateLanding();
		
		final_y_onJumping = yPosition;
		jumpDistance = final_y_onJumping - initial_y_onJumping;
		$reception.push(1);
	} else {
		$reception.push(0);
	}
	//console.log(elapsed_time_on_air)
	// Calculate z position
	zPosition = airSpeed*elapsed_time_on_air-0.5*gravity*elapsed_time_on_air*elapsed_time_on_air;
	//console.log(zPosition)
	// Calculate x position: keeps constant
	xPosition = xPreviousPosition + xSpeed*time;
	xPreviousPosition = xPosition;

	// Calculate y position: keeps constant
	yPosition = yPreviousPosition + ySpeed*time;
	yPreviousPosition = yPosition;

	interval += 1;

	// Calculate jump height and center y position
	// Detect middle of the jump
	if (elapsed_time_on_air >= total_time_on_air/2 && halfJump == false) {
		halfJump = true;
		jumpHeight = zPosition;
		centerYposition = yPosition*pixelMultiplier*-1;
		// console.log('center position on parse data ' + centerYposition)
	}

	// Calculate total angle dif to rads
	total_angle_diff = $yaw[k] - initialYaw;
	total_angle_diff = total_angle_diff*pi/180;

	// Push yaw, pitch, roll / x, y, z positions
	$total_x_positions.push(xPosition);
	$total_y_positions.push(yPosition);
	$total_z_positions.push(zPosition);
	$total_yaws.push(total_angle_diff);
	$total_pitchs.push($pitch[k]*-1);
	$total_rolls.push($roll[k]*-1);
}

function calculateLanding(){
	// Calculate 180s
	// first case initialYaw < 0 > 90
	if ( initialYawOnJumping > 0 && initialYawOnJumping < 90 ) {
	    if ( -90 + initialYawOnJumping < yawOnLanding && 90 + initialYawOnJumping > yawOnLanding) { yawOnLanding = yawOnLanding; 
	    	console.log("case 1: final yawOnLanding not 180");}
	    else if ( 90 + initialYawOnJumping < yawOnLanding && yawOnLanding < 179 ) { yawOnLanding = yawOnLanding - 180; 
	    	console.log("case 1: final yawOnLanding -180"); minus180 = true; plus180 = false;}
	    else if ( -90 + initialYawOnJumping > yawOnLanding && yawOnLanding > -179 ) { yawOnLanding = yawOnLanding + 180; 
	    	console.log("case 1: final yawOnLanding +180"); plus180 = true; minus180 = false;}
  	}

  	// second case initialYaw > 90 < 179
 	if ( initialYawOnJumping > 90 && initialYawOnJumping < 179) {
	    if ( yawOnLanding > 0 && 90 - ( 179 - initialYawOnJumping ) > yawOnLanding ) { yawOnLanding = yawOnLanding - 180 ; 
	    	console.log("case 2: final yawOnLanding -180"); minus180 = true; plus180 = false;}
	    else if ( -90 - (179 - initialYawOnJumping) < yawOnLanding && yawOnLanding < 0 ) { yawOnLanding = yawOnLanding + 180; 
	    	console.log("case 2: final yawOnLanding + 180"); plus180 = true; minus180 = false;}
	    else { yawOnLanding = yawOnLanding; 
	    	console.log("case 2: final yawOnLanding not 180");}
  	}

  	// Third case initial yaw < 0 > -90
  	if ( initialYawOnJumping < 0 && initialYawOnJumping > -90 ) {
	    if ( yawOnLanding > -179 && yawOnLanding < -90 + initialYawOnJumping) { yawOnLanding = yawOnLanding + 180; 
	    	console.log("case 3: final yawOnLanding + 180"); plus180 = true; minus180 = false; }
	    else if ( 90 + initialYawOnJumping < yawOnLanding && yawOnLanding < 179 ) { yawOnLanding = yawOnLanding - 180; 
	    	console.log("case 3: final yawOnLanding - 180"); minus180 = true; plus180 = false;}
	    else { yawOnLanding = yawOnLanding; 
	    	console.log("case 3: final yawOnLanding not 180");}
  	}

  	// Fourth case initial yaw > -90 < -179
  	if ( initialYawOnJumping < -90 && initialYawOnJumping > -179 ) {
	    if ( yawOnLanding > 0 && 90 + ( 179 + initialYawOnJumping ) > yawOnLanding ) { yawOnLanding = yawOnLanding - 180; 
	    	console.log("case 4: final yawOnLanding - 180"); minus180 = true; plus180 = false;}
	    else if ( -90 + (179 + initialYawOnJumping ) < yawOnLanding && yawOnLanding < 0 ) { yawOnLanding = yawOnLanding + 180; 
	    	console.log("case 4: final yawOnLanding + 180"); plus180 = true; minus180 = false;}
	    else { yawOnLanding = yawOnLanding; 
	    	console.log("case 4: final yawOnLanding not 180");}
  	}

}

function calculateAverage(){
	var average = 0, sliced, slice_num = 8, slice_start = 0, target_average = 0.5;

	for (var j = 0; j < $air_ground.length; j++) {

		average = 0;
		slice_start = j >= slice_num/2 ? j-slice_num/2 : 0;
		sliced = $air_ground.slice(slice_start, slice_start + slice_num);
		sliced.forEach(function(value, index) {

			average += value == 0 ? 0 : 1;
		});
		average = average / slice_num;

		if (average >= target_average) {
			$state.push('air');
			airtime += 1;
		} else { $state.push('ground')}
	}
}


function resetValues(){

	total_angle_diff = 0, xSpeed = 0, ySpeed = 0, xPosition = 0, xPreviousPosition = 0,
	yPosition = 0, yPreviousPosition = 0, zPosition = 0;
	minus180 = false;
	plus180 = false;

	$y_Accel = [],
	$z_Accel = [],
	$yaw = [],
	$pitch = [],
	$roll = [],
	$state = [];
	$air_ground = [];

	$total_x_positions = [];
	$total_y_positions = [];
	$total_z_positions = [];
	$total_yaws = [];
	$total_pitchs = [];
	$total_rolls = [];

	$reception = [];

	interval = 0;
	centerPosition = 0;
	initial_y_onJumping = 0;
	final_y_onJumping = 0;
	halfJump = false;
	jumpDistance = 0;
	jumpHeight = 0;

	tailUp = false;
	noseUp = false;

	airSpeed = 0;
	elapsed_time_on_air = 0;
	air_interval = 0;
	total_time_on_air = 0;
	airtime = 0;

	initialYaw = 0;
	//centerYposition = 0;

}