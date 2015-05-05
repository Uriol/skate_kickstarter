
var selected_trick = trick_one;
var index;
var tricks_array = [trick_one, trick_two]


$('.menuItem').on('click', function(){

	// Update css classes
	$('.menuItem').removeClass('on').addClass('off');
	$(this).removeClass('off').addClass('on');

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
	
	selected_trick = tricks_array[index];
	//console.log(selected_trick);
	drawTrick();
})

function changeTrick(){

	console.log(tricks_array[index]);
	
}


