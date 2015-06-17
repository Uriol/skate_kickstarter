//$(function(){

	// window.addEventListener( 'scroll', onScroll, false );

	function onScroll(){
		//console.log('scrolling');

		var top_view = $(window).scrollTop()
		var bottom_view = top_view + $(window).height();
		//console.log('top: ' + top_view + ', bottom: ' + bottom_view);

		// Scene 1 position
		var scene_1 = $('#skateVisuals');
		var scene_1_top = scene_1.offset();
		var scene_1_height = scene_1.outerHeight();
		var scene_1_bottom = scene_1_top.top + scene_1_height;


		// Scene 2 position
		var scene_2 = $('#mark_canvas');
		var scene_2_top = scene_2.offset();
		var scene_2_height = scene_2.outerHeight();
		var scene_2_bottom = scene_2_top.top + scene_2_height;

		// Scene 3 position
		var scene_3 = $('#versus_3d');
		var scene_3_top = scene_3.offset();
		var scene_3_height = scene_3.outerHeight();
		var scene_3_bottom = scene_3_top.top + scene_3_height;


		// If scene 1 is one view
		if ((bottom_view >= scene_1_bottom && top_view <= scene_1_bottom) ||
			(bottom_view >= scene_1_top.top && top_view <= scene_1_top.top) ||
			(bottom_view <= scene_1_bottom && top_view >= scene_1_top.top)) {
			//console.log('scene 1 on view');
			if (scene_1_on == false) {

				//If trick animation going on
				if (trick_animation == true) {
					trick_animation = false;
					clearInterval(animationInterval);
				}

				drawTrick();
				scene_1_on = true;
			}
		} else  {
			//console.log('scene 1 on not in view');
			delete_scene_1();
			scene_1_on = false;
		}


		//If scene 2 is one view
		if ((bottom_view >= scene_2_bottom && top_view <= scene_2_bottom) ||
			(bottom_view >= scene_2_top.top && top_view <= scene_2_top.top) ||
			(bottom_view <= scene_2_bottom && top_view >= scene_2_top.top)) {

			if (scene_2_on == false) {
				
				//If trick animation going on
				if (trick_animation_mark == true) {
					trick_animation_mark = false;
					clearInterval(animationInterval_mark);
				}
				

				drawTrick_mark();
				scene_2_on = true;
			}

		} else {
			delete_scene_2();
			scene_2_on = false;
		}


		// If scene 2 is one view
		if ((bottom_view >= scene_3_bottom && top_view <= scene_3_bottom) ||
			(bottom_view >= scene_3_top.top && top_view <= scene_3_top.top) ||
			(bottom_view <= scene_3_bottom && top_view >= scene_3_top.top)) {
			//console.log('scene 2 on view');

			if (scene_3_on == false){
				drawTrick_vs(trick_one_vs , 2.5);
				drawTrick_vs(trick_two_vs , 2.3);
				scene_3_on = true;
			}
			
		// } else if (scene_1_on == true) {
		// 	//console.log('scene 2 on not in view');
		// 	delete_scene_3();
		// 	scene_3_on = false;

		// }
		} else {
			delete_scene_3();
		 	scene_3_on = false;
		}



	}



	function delete_scene_1(){
		var obj, i;
		for ( i = scene.children.length - 1; i >= 0 ; i -- ) {
		    obj = scene.children[ i ];
		    if ( obj.name == 'skateboardObject') {
		        scene.remove(obj);
		    }
		}
	}


	function delete_scene_2(){
		var obj, i;
		for ( i = scene_mark.children.length - 1; i >= 0 ; i -- ) {
		    obj = scene_mark.children[ i ];
		    if ( obj.name == 'skateboardObject_mark') {
		        scene_mark.remove(obj);
		    }
		}
	}



	function delete_scene_3(){
		var obj, i;
		for ( i = scene_vs.children.length - 1; i >= 0 ; i -- ) {
		    obj = scene_vs.children[ i ];
		    if ( obj.name == 'skateboardObject_vs') {
		        scene_vs.remove(obj);
		    }
		}
	}
//})



