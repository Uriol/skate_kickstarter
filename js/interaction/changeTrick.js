
var selected_trick = trick_one;
var trick_speed = 2.5;
var index;
var tricks_array = [trick_one, trick_two, trick_three, trick_four, trick_five];
var tricks_speeds = [2.5, 2.4, 2.5, 2.4, 2.8];
var tricks_names = ['url(img/fakie_flip.png)', 'url(img/nollie_fs_heelflip.png)','url(img/fs_ollie.png)','url(img/fs_heelflip.png)','url(img/kickflip.png)']
var tricks_names_text = ['FAKIE FLIP', 'NOLLIE FS HEELFLIP', 'FS OLLIE', 'FS HEELFLIP', 'KICKFLIP'];

var tricks_tablet = ['url(img_tablet/trick1.png)', 'url(img_tablet/trick2.png)','url(img_tablet/trick3.png)','url(img_tablet/trick4.png)','url(img_tablet/trick5.png)']

var trick_animation = false;
var trick_animation_mark = false;

// Mark tricks
var selected_trick_mark = halfcab;
var tricks_mark_array = [halfcab, ollieStairs,  nikoFlip, ollie180stairs ];
var tricks_mark_speeds = [4, 2.4, 2.5, 2.4, 2.8];
var trick_speed_mark = tricks_mark_speeds[0];
var trick_center_y = 0;


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
		$('#trick_name_mark h1').text(tricks_names_text[index]);

		trick_speed_mark = tricks_mark_speeds[index];
		selected_trick_mark = tricks_mark_array[index];
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

		var mark_trick = tricks_tablet[index];
		$('#mark_images').css('background-image', mark_trick);
	})

});

