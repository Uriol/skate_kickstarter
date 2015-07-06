// Resize img to keep aspect ratio
function mobile_img_height(){

	var mobile_width = window.innerWidth;

	var image_height = (mobile_width/4)*3;
	var tablet_height_AR_16 = (mobile_width/16*9);


	$('.visuals_imgs').css('height', image_height + 'px');
	$('#sensor_image').css('height', image_height + 'px');
	$('#versus_mobile').css('height', image_height + 'px');
	$('#intro').css('height', image_height + 'px');
	$('.mark_image_phone').css('height', image_height + 'px');
	$('#skateVisuals_tablet').css('height', tablet_height_AR_16 + 'px');

	// if landscape
	if (mobile_width >= 400) {
		$('#intro').css('height', tablet_height_AR_16 + 'px');
		$('#mark_images').css('height', tablet_height_AR_16 + 'px');
		$('#versus_mobile').css('height', tablet_height_AR_16 + 'px');
		$('#sensor_image').css('height', tablet_height_AR_16 + 'px');

		$('#skateVisuals_tablet_menu').css('top', tablet_height_AR_16-40 + 'px');
		$('#mark_images_menu').css('top', tablet_height_AR_16-50 + 'px');
	}

}

function tablet_img_height(){

	var tablet_width = window.innerWidth;

	var tablet_height_AR_16 = (tablet_width/16*9);

	$('#skateVisuals_tablet').css('height', tablet_height_AR_16 + 'px');
	$('#versus_mobile').css('height', tablet_height_AR_16 + 'px');
	$('#intro').css('height', tablet_height_AR_16 + 'px');
	$('#mark_images').css('height', tablet_height_AR_16 + 'px');

	// Add menus top
	$('#skateVisuals_tablet_menu').css('top', tablet_height_AR_16-50 + 'px');
	$('#mark_images_menu').css('top', tablet_height_AR_16-50 + 'px');



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



