
var selected_trick = trick_one;
var trick_speed = 2.5;
var index;
var tricks_array = [trick_one, trick_two, trick_three];
var tricks_speeds = [2.5, 3.7, 2.5];

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
