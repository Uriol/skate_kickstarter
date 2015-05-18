
var selected_trick = trick_one;
var trick_speed = 2.5;
var index;
var tricks_array = [trick_one, trick_two, trick_three, trick_four, trick_five];
var tricks_speeds = [2.5, 2.4, 2.5, 2.4, 2.8];
var tricks_names = ['url(img/fakie_flip.png)', 'url(img/nollie_fs_heelflip.png)','url(img/fs_ollie.png)','url(img/fs_heelflip.png)','url(img/kickflip.png)']

var trick_animation = false;

$(function(){

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
		$('#trick_name').css('background-image', tricks_names[index]);

		//console.log(index);
		trick_speed = tricks_speeds[index];
		selected_trick = tricks_array[index];
		drawTrick();
	})

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



});
