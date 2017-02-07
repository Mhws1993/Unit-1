//initialize function called when the script loads
function initialize(){
	cities();
	
};

//function to create a table with cities and their populations
function cities(){
	//define two arrays for cities and population
	var cityPop = [
		{ 
			city: 'Madison',
			population: 233209
		},
		{
			city: 'Milwaukee',
			population: 594833
		},
		{
			city: 'Green Bay',
			population: 104057
		},
		{
			city: 'Superior',
			population: 27244
		}
	];

	//append the table element to the div
	$("#mydiv").append("<table>");

	//append a header row to the table
	$("table").append("<tr>");
	
	//add the "City" and "Population" columns to the header row
	$("tr").append("<th>City</th><th>Population</th>");
	
	//loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
        //assign longer html strings to a variable
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        //add the row's html string to the table
        $("table").append(rowHtml);
    };

    addColumns(cityPop);
    addEvents();
	
};

function addColumns(cityPop){
    
    $('tr').each(function(i){

    	if (i == 0){

    		$(this).append('<th>City Size</th>');
    	} else {

    		var citySize;

    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';
				
    		} else if (cityPop[i-1].population < 500000){
    			citySize = 'Medium';
				
    		} else {
    			citySize = 'Large';
				
    		};
			$(this).append(citySize);
    		/*$(this).append('<td' + citySize + '</td>');*/
    	};
    });
};

function addEvents(){

	$('table').mouseover(function(){
		
		var color = "rgb(";

		for (var i=0; i<3; i++){

			var random = Math.round(Math.random() * 255);

			color += random;

			if (i<2){
				color += ",";
			
			} else {
				color += ")";
			};

		$(this).css('color', color);
		};
	});
	$('table').on('click', clickme);
};
function clickme(){

		alert('Hey, you clicked me!');
	

	//$('table').on('click', clickme);
};
//Module 3 starts
function jsAjax(){
    // Step 1: Create the request 
    var ajaxRequest = new XMLHttpRequest();
	
	//callback
function callback(response){

    var mydata = response;

    //pass data to another function
    nextFunction(mydata);
};

function nextFunction(data){

    console.log(data); //contains response data held by mydata in callback
}; //end of callback
    //Step 2: Create an event handler to send received data to a callback function
    ajaxRequest.onreadystatechange = function(){
        if (ajaxRequest.readyState === 4){
            callback(ajaxRequest.response);
        };
    };

    //Step 3: Open the server connection
									//match the correct geojson
    ajaxRequest.open('GET', 'data/map.geojson', true);

    //Step 4: Set the response data type
    ajaxRequest.responseType = "json";

    //Step 5: Send the request
    ajaxRequest.send();
};

//define callback function
function callback(response){
    //tasks using the data go here
    //console.log(response);
	//translating JSON to string
	console.log(JSON.stringify(response));
};
//should window.onload be at the bottom?
window.onload = jsAjax();
//define AJAX function
function jQueryAjax(){
    //basic jQuery ajax method
	$.getJSON("data/map.geojson", callback);
    $.ajax("data/map.geojson", {
        dataType: "json",
        success: callback
    });
};

//define callback function
function callback(response, status, jqXHRobject){
    //tasks using the data go here
    console.log(response);
};
//an AJAX function
function jQueryAjax(){
    var mydata = $.ajax("data/map.geojson", {
        dataType: "json"
    });
    return mydata;
};

var mydata = jQueryAjax();

console.log(mydata); //the jQuery XMLHttpRequest object

$(document).ready(jQueryAjax);

function debugCallback(response){
	
	$(mydiv).append('GeoJSON data: ' + JSON.stringify(mydata));
};
//debug module 3
function debugAjax(){
	
	var mydata;

	$.ajax("data/map.geojson", {
		dataType: "json",
		success: function(response){
			
			debugCallback(mydata);
		}
	});

	$(mydiv).append('<br>GeoJSON data:<br>' + JSON.stringify(mydata));
};

$(mydiv).append('GeoJSON data: ' + JSON.stringify(mydata));
//call the initialize function when the document has loaded
$(document).ready(initialize);