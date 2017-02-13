// $('.device-support-bg').append('<div class="gsImport" data-key="1ONIzM3MkRdn39gLQnfBVkFuP4dMG6TWnf0Jo7NCh8CE" data-headers="name, email, phone, number"><h3>GS Import</h3></div>')

function endsWith(str,suffix) 
{
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

function loadJson(json) {
	console.log("Loaded json");
}

(function( $ ) {
 
    $.fn.gsImport = function( options ) {

    	if ( ! $(this).data("key") ) {
    		console.error("GS-Importer: No key provided for one of the GS-Importer Divs")
    		return;
    	}

    	if ( ! $(this).data("headers") ) {
    		console.error("GS-Importer: No headers provided for one of the GS-Importer Divs")
    		return;
    	}

    	var settings = $.extend({
    		key: $(this).data("key"),
    		index: 1,
    		headers: $(this).data("headers")
    	}, options );

    	if ( $(this).data("index") ) {
    		settings.index = $(this).data("index")
    	}

    	settings.url = "https://spreadsheets.google.com/feeds/list/" + settings.key + "/" + settings.index + "/public/values?alt=json&callback=loadJson";

    	// var json = settings.url;

    	console.log(settings.url);

  //   	$.ajax({
		//     url: settings.url,
		 
		//     // The name of the callback parameter, as specified by the YQL service
		//     jsonp: "callback",
		 
		//     // Tell jQuery we're expecting JSONP
		//     dataType: "jsonp",
		 
		//     // Work with the response
		//     success: function( response ) {
		//     	console.log( response )
		//     }
		// });

    	var final_html = $.getJSON(settings.url, function( json ) {
   			// var headerList = settings.headers.split(', ');
   			headerList = [
   				"name",
   				"email",
   				"phone",
   				"number"
				];

			var pre_html = '<table class="tableSection table table-striped"><thead>';

			for (var y = 0; y<headerList.length; y++)
			{
				pre_html += [ "<th>"+headerList[y].toString()+"</th>" ].join('');
			}
			pre_html += ['</thead><tbody id="swlist"><tr>'].join('');
			
			var actual_html='';
			
			var post_html = '</tr></tbody></table>';
			
			var len = json.feed.entry.length;
			
			for (var i=0; i<len; i++)
			{ 
				if (json.feed.entry[i]["gsx$status"]["$t"] !== "dead")
				{
					actual_html+=['<tr>'].join('')
					
					for (var j = 0; j<headerList.length; j++)
					{
						var curHeader=headerList[j].toString().toLowerCase().replace(" ", "");
						actual_html+=[	
						'<td>',
						picturize(json.feed.entry[i]["gsx$"+curHeader]["$t"]),
						'</td>',
						].join('');
					}
					actual_html+=['</tr>'].join('');
				}
			}
			return pre_html + actual_html + post_html;

		});

    	// console.log(final_html)

        return this.filter(".gsImport").append(function(){
        	final_html
        });

    };
 
}( jQuery ));
