
$(document).ready(function(){
	$("#csv-file").change(handleFileSelect);
});

var trick_data = [];

// Parse database csv
function handleFileSelect(evt) {
    var file = evt.target.files[0];
 
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: function(result) {
        toArray(result);
      }
    });
}

var x_, z_, yaw_, pitch_, roll_;
var end = ",";
function toArray(result){


	for (var i = 0; i < result.data.length; i++){
		x_ = 0;
		z_ = result.data[i].z;

		if (z_ != 0) {
			z_ = 10;
		}

		yaw_ = Math.round(result.data[i].yaw);
		pitch_ = Math.round(result.data[i].pitch);
		roll_ = Math.round(result.data[i].roll);

		

		// Push to new trick array
		trick_row = [];
		trick_row[0] = '[' + x_;
		trick_row[1] =  z_;
		trick_row[2] =  yaw_ ;
		trick_row[3] =  pitch_ ;
		trick_row[4] =  roll_ + ']/';


		trick_data.push(trick_row);

		
	}

	

	var trick = Papa.unparse(trick_data);

	 console.log(trick);




}

// to Array format
// function toArray(result){
// 	var array = Papa.unparse(result);
// 	console.log(array);
// }