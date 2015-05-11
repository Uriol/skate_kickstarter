$(function(){

	window.addEventListener( 'scroll', onScroll, false );

	function onScroll(){
		console.log('scrolling');

		var top_view = $(window).scrollTop()
		var bottom_view = top_view + $(window).height();
		console.log('top: ' + top_view + ', bottom: ' + bottom_view);

		// Scene 1 position
		var scene_1 = $('#skateVisuals');
		var scene_1_top = scene_1.offset();
		console.log('scene 1 top: ' + scene_1_top.top);
		var scene_1_height = scene_1.outerHeight();
		var scene_1_bottom = scene_1_top.top + scene_1_height;
		console.log('scene 1 bottom: ' + scene_1_bottom);


		//if (top_view > scene_1_bottom  && bottom_view < scene_1_top ){
		if (scene_1_top <= bottom_view || scene_1_bottom >= top_view ){
			console.log('on view');
		} 
		else {
			console.log('not in view');
		}
	}
})


// ((bounds.top >= viewport.top) && (bounds.bottom <= viewport.bottom));