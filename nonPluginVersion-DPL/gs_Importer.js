"use strict";

// ==============================================
// =============IMPORT GOOGLE SHEETS=============
// ==============================================	

function endsWith(str, suffix)
{
	/* This function returns the last letter of a string.
	This is used for checking if a cell ends with a ?
	That way you can ask questions in the Google Sheet without changing the output on the live site
	*/

    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function picturize(nStr) 
{
	switch (nStr)
	{
		case "":
			return '-';
			break;
		default:
			return nStr;
			break;
	}
}

function displaySW(json, swType) 
{
	//Figure out which div to target, based on input
	if (swType == "digital") {
		var thisHeader = digitalHeaders;
		var thisDiv = "digsw"
	}

	if (swType == "film") {
		var thisHeader = filmHeaders;
		var thisDiv = "filmsw"
	}

	if (swType == "audio") {
		var thisHeader = audioHeaders;
		var thisDiv = "audiosw"
	}

	console.log("Loading " + swType + " software"); // Log which sw chart is loading

	var pre_html = '<table class="tableSection table table-striped"><thead>'; // start the beginning of the HTML Table
	for (var y = 0; y<thisHeader.length; y++) //For each header, add HTML to the pre_html variable.
	{
		pre_html += [ "<th>"+thisHeader[y].toString()+"</th>" ].join('');
	}
	pre_html += ['</thead><tbody id="swlist"><tr>'].join(''); // end the pre_html HTML table tags.
	
	var actual_html=''; // Prep the actual_html variable for parsing the json.
	
	var post_html = '</tr></tbody></table>'; // Closing tags for HTML table
	
	var len = json.feed.entry.length; // set len to length of json.
	
	for (var i=0; i<len; i++) // for each entry in len
	{ 
		if (json.feed.entry[i]["gsx$status"]["$t"] !== "dead") // if the row isn't marked as dead in the Google Sheet
		{
			actual_html+=['<tr>'].join('');// start row
			
			for (var j = 0; j<thisHeader.length; j++) // for each column
			{
				var curHeader=thisHeader[j].toString().toLowerCase().replace(" ", ""); // convert header to lower case, and remove spaces
				actual_html+=[	
				'<td>', // start cell tag
				picturize(json.feed.entry[i]["gsx$"+curHeader]["$t"]), // run pictureize function on the individual element of the json
				'</td>', // end cell tag
				].join(''); // concatenate with previous cells, with no spaces
			}
			actual_html+=['</tr>'].join(''); // end row
		}
	}
	document.getElementById(thisDiv).innerHTML = pre_html + actual_html + post_html; // put the resulting HTML into the corresponding div
}  

// Input handlers, each passes the input json, and a string to the displaySW function
function displayDigital (json) {
	displaySW(json, "digital")
}

function displayAudio (json) {
	displaySW(json, "audio")
}

function displayFilm (json) {
	displaySW(json, "film")
}