
var selected_trick = trick_one;
var trick_speed = 2.5;
var index = 0;
var tricks_array = [trick_one, trick_four, trick_five, trick_two, trick_three];
var tricks_speeds = [2.5, 2.4, 2.8, 2.4, 2.5];
var tricks_names = ['url(img/fakie_flip.png)', 'url(img/nollie_fs_heelflip.png)','url(img/fs_ollie.png)','url(img/fs_heelflip.png)','url(img/kickflip.png)']
var tricks_names_text = ['FAKIE FLIP', 'FS HEELFLIP', 'KICKFLIP', 'NOLLIE FS HEELFLIP', 'FS OLLIE'];

var tricks_tablet = ['url(img_tablet/trick1.png)', 'url(img_tablet/trick2.png)','url(img_tablet/trick3.png)','url(img_tablet/trick4.png)','url(img_tablet/trick5.png)']
var mark_tricks_tablet = ['url(img_tablet/mark1.png)', 'url(img_tablet/mark2.png)', 'url(img_tablet/mark3.png)']

var trick_animation = false;
var trick_animation_mark = false;

// Mark tricks
var selected_trick_mark = halfcab;
var tricks_mark_array = [halfcab, ollie180stairs, ollieStairs,  nikoFlip ];
var tricks_mark_centerY_array = [-240, -225, -205];
var tricks_marck_customCenterY = tricks_mark_centerY_array[0]

var tricks_mark_speeds = [3.5, 3.5, 3.4];
var trick_speed_mark = tricks_mark_speeds[0];

var tricks_mark_z_speeds = [3.38, 3.25, 3.4];
var trick_mark_zSpeed = tricks_mark_z_speeds[0];
var trick_center_y = 0;

var tricks_names_mark = ['FAKIE FS HEELFLIP', 'FS 180', 'KICKFLIP'];
var trick_name_mark = tricks_names_mark[0];

var video_sources = ['video/fakieFlip960.mp4', 'video/heel180_960.mp4']
var video, source;

var video_playing = false;

$(function(){

	// Visualize menu 
	$('.menuItem').on('click', function(){

		// Update css classes
		$('.menuItem').removeClass('on').addClass('off');
		$(this).removeClass('off').addClass('on');

		//If trick animation going on
		if (trick_animation == true) {
			trick_animation = false;
			clearInterval(animationInterval);
			console.log('now')
		}

		// Remove previous skateboard objects
		var obj, i;
		for ( i = scene.children.length - 1; i >= 0 ; i -- ) {
		    obj = scene.children[ i ];
		    if ( obj.name == 'skateboardObject') {
		        scene.remove(obj);
		    }
		}

		index = $(this).data('index');

		// Change trick name image
		//$('#trick_name').css('background-image', tricks_names[index]);
		$('#trick_name h1').text(tricks_names_text[index]);

		//console.log(index);
		trick_speed = tricks_speeds[index];
		selected_trick = tricks_array[index];
		drawTrick();
		
		playVideo();
	})

	// Visualize replay
	$('#replay').on('click', function(){

		//If trick animation going on
		if (trick_animation == true) {
			trick_animation = false;
			clearInterval(animationInterval);
			console.log('now')
		}

		// Remove previous skateboard objects
		var obj, i;
		for ( i = scene.children.length - 1; i >= 0 ; i -- ) {
		    obj = scene.children[ i ];
		    if ( obj.name == 'skateboardObject') {
		        scene.remove(obj);
		    }
		}

		drawTrick();

	})


	// Mark menu
	$('.menuItem_mark').on('click', function(){

		// Update css classes
		$('.menuItem_mark').removeClass('on').addClass('off');
		$(this).removeClass('off').addClass('on');

		//If trick animation going on
		if (trick_animation_mark == true) {
			trick_animation_mark = false;
			clearInterval(animationInterval_mark);
			console.log('now')
		}

		// Remove previous skateboard objects
		var obj, i;
		for ( i = scene_mark.children.length - 1; i >= 0 ; i -- ) {
		    obj = scene_mark.children[ i ];
		    if ( obj.name == 'skateboardObject_mark') {
		        scene_mark.remove(obj);
		    }
		}

		index = $(this).data('index');
		$('#trick_name_mark h1').text(tricks_names_mark[index]);

		trick_speed_mark = tricks_mark_speeds[index];
		selected_trick_mark = tricks_mark_array[index];
		trick_mark_zSpeed = tricks_mark_z_speeds[index];
		tricks_marck_customCenterY = tricks_mark_centerY_array[index];
		drawTrick_mark();
	})


	// Visualize replay
	$('#replay_mark').on('click', function(){

		//If trick animation going on
		if (trick_animation_mark == true) {
			trick_animation_mark = false;
			clearInterval(animationInterval_mark);
		}

		// Remove previous skateboard objects
		var obj, i;
		for ( i = scene_mark.children.length - 1; i >= 0 ; i -- ) {
		    obj = scene_mark.children[ i ];
		    if ( obj.name == 'skateboardObject_mark') {
		        scene_mark.remove(obj);
		    }
		}
		drawTrick_mark();
	})

	// Change trick visual on tablet
	$('.skateVisuals_tablet_menu_item').on('click', function(){
		// Update css classes
		$('.skateVisuals_tablet_menu_item').removeClass('on').addClass('off');
		$(this).removeClass('off').addClass('on');

		// get right image
		index = $(this).data('index');
		console.log(index);

		var tablet_trick = tricks_tablet[index];
		$('#skateVisuals_tablet').css('background-image', tablet_trick);
	})	


	// Change leave your mark tricks
	$('.mark_images_menu_item').on('click', function() {
		// Update css classes
		$('.mark_images_menu_item').removeClass('on').addClass('off');
		$(this).removeClass('off').addClass('on');

		// Get right image
		index = $(this).data('index');

		var mark_trick = mark_tricks_tablet[index];
		$('#mark_images').css('background-image', mark_trick);
	})

	declareVideo();
	// declare video
	function declareVideo(){
		video = document.getElementById('video');
		source = document.createElement('source');
	}

	
	
	playVideo();
	// Play videos of tricks
	function playVideo(){
		
		

		console.log(video_sources[index]);

		if (video_sources[index] == undefined) {
			$('#trick_video').hide();
			//console.log('no video for this trick')
			if (video_playing == true) {
				video.pause();
				video_playing = false;
				//console.log('video stopped')
			} 
		} else {
			$('#trick_video').show();
			//console.log('video for this trick')
			source.setAttribute('src', video_sources[index]);
			video.appendChild(source);
			video.loop = true;
			video.load();
			video.play();
			video_playing = true;
		}

		

	}


});

