// Resize img to keep aspect ratio
function mobile_img_height(){

	var mobile_width = window.innerWidth;
	console.log(mobile_width);

	var image_height = (mobile_width/4)*3;
	console.log(image_height);

	$('.visuals_imgs').css('height', image_height + 'px');
	$('#sensor_image').css('height', image_height + 'px');
	$('#versus_mobile').css('height', image_height + 'px');
}


$(function(){

	var vs_index;

	// Vs data switch
	$('.vs_data_menu_item').on('click', function(){
		
		vs_index = $(this).data('index');


		if (vs_index == 1){

			$('#speed').removeClass('on').addClass('off');
			$('#airtime').removeClass('on').addClass('off');
			$('#jump_height').removeClass('on').addClass('off');

			$('#jump_distance').removeClass('off').addClass('on');
			$('#score').removeClass('off').addClass('on');

			$('#vs_menu_one').removeClass('vs_on').addClass('vs_off')
			$(this).removeClass('vs_off').addClass('vs_on')

		} else {

			console.log('click')
			$('#vs_menu_two').removeClass('vs_on').addClass('vs_off')
			$(this).removeClass('vs_off').addClass('vs_on')

			$('#jump_distance').removeClass('on').addClass('off')
			$('#score').removeClass('on').addClass('off')

			$('#speed').removeClass('off').addClass('on');
			$('#airtime').removeClass('off').addClass('on');
			$('#jump_height').removeClass('off').addClass('on');
		}
	})
})


