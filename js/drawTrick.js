
var this_x_position;
var this_y_position;
var this_z_position;


var tailUp = false;
var noseUp = false;

var onGround_bool = false;

// Declare array of skateboard objects
var $skateboards = [];

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



		
		//console.log(previous_pitch + ' ' +$total_pitchs[i]);
		// Save previous pitch
		

		// Declare skateboard object
		var skateboardContainer = new THREE.Object3D();
		skateboardContainer.name = 'skateboardContainer';
		skateboard = new THREE.Object3D();
		skateboard.name = 'skateboardObject';
		// Quaternion rotation
		// 'XYZ', 'YXZ', 'ZXY', 'ZYX', 'YZX', XZY
		var euler =  new THREE.Euler(  $total_rolls[i], $total_yaws[i]*-1,$total_pitchs[i],'YZX');
		var quaternion = new THREE.Quaternion();
		quaternion.setFromEuler(euler, 'YZX');
		skateboard.setRotationFromQuaternion(quaternion);


		// Detect center of rotation
		if (previous_pitch > $total_pitchs[i]) {
			//console.log('tail up')
			noseUp = true;
			tailUp = false;
			//skateboardContainer.rotation.x = +25;
			// skateboard.position.x = this_y_position*(pixelMultiplier-centerYposition*-1);
			// skateboard.position.x = skateboard.position.x+15;
			// skateboard.rotation.z = $total_pitchs[i];
			// skateboard.position.x = skateboard.position.x-15;

		} else if (previous_pitch < $total_pitchs[i]) { 
			//console.log('nose up')
			tailUp = true;
			noseUp = false;
			//skateboardContainer.position.x = -25;
			// skateboard.position.x = this_y_position*(pixelMultiplier-centerYposition*-1);
			// skateboard.position.x = skateboard.position.x-15;
			// skateboard.rotation.z = $total_pitchs[i];
			// skateboard.position.x = skateboard.position.x+15;
		} else {
			//console.log('same pitch')
			//skateboardContainer.position.x = 0;
			noseUp = false;
			tailUp = false;
		}


		//skateboardContainer.position.x = -35;
		previous_pitch = $total_pitchs[i];


		

		// Set quaternion in 3 steps: 1: roll, 2: yaws, 3: pitch
		// var euler =  new THREE.Euler(  $total_rolls[i], 0, 0,'YZX');
		// var quaternion = new THREE.Quaternion();
		// quaternion.setFromEuler(euler, 'YZX');
		// skateboard.setRotationFromQuaternion(quaternion);


		// var euler2 =  new THREE.Euler(  0, $total_yaws[i]*-1, 0,'YZX');
		// var quaternion2 = new THREE.Quaternion();
		// quaternion2.setFromEuler(euler2, 'YZX');
		// skateboard.setRotationFromQuaternion(quaternion2);


		// skateboard.position.x = skateboard.position.x-55;
		// Euler rotation
		//skateboard.rotation.z = $total_pitchs[i];
		//skateboard.rotation.x = $total_rolls[i];
		//skateboard.rotation.y = $total_yaws[i]*-1;
		

		console.log(this_z_position);
		skateboard.position.x = this_y_position*pixelMultiplier-centerYposition*-1; //-2000;
		skateboard.position.z = this_x_position*pixelMultiplier;
		skateboard.position.y = this_z_position*pixelMultiplier;
		// skateboard.matrixAutoUpdate = false;
		// skateboard.updateMatrix();



		
		if ($state[i] == 'air'){
			onGround_bool = false;
			//console.log('air')
		} else { 
			onGround_bool = true;
			//console.log('ground')
		}
		drawSkateboard();

		skateboardContainer.add(skateboard);

		scene.add(skateboardContainer);

	}
	
}