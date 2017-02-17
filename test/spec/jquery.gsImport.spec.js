;(function($) {
	"use strict";

	$.fn.gsImport = function( options ) {

		var defaults = {
			class: {
	            "cell": "gsCell",
	            "row": "gsRow",
	            "header": "gsHeader",
	            "headerRow": "gsHeaderRow",
	            "body": "gsBody",
	            "table": "gsTable table table-responsive table-striped",
			},
			searchBar: 0,
			picturize: true,
            image1: "<i class=\"fa fa-check check-icon\"></i>",
            image2: "<i class=\"fa fa-times x-icon\"></i>",
            customImages: "",
            ignore: {
            	"toggle": 0,
            	"column": "",
            	"trigger": "",
            }
        };

		var settings = $.extend(true, {}, defaults, options );

		var tagClassRE = /^[A-Za-z][ -_A-Za-z0-9]+$/;

		$.each(settings, function validateOptions(key, val) {

			if (key === "class") {

				if (typeof val.table !== "string" || val.table.match(tagClassRE) === null){
					settings.class.table = defaults.class.table;
					console.warn("GSImport:\t One of your GSImport options might be invalid.\n\t\t\t Resetting to default value for Class.table.");
				}
				if (typeof val.cell !== "string" || val.cell.match(tagClassRE) === null){
					settings.class.cell = defaults.class.cell;
					console.warn("GSImport:\t One of your GSImport options might be invalid.\n\t\t\t Resetting to default value for Class.cell.");
				}
				if (typeof val.row !== "string" || val.row.match(tagClassRE) === null){
					settings.class.row = defaults.class.row;
					console.warn("GSImport:\t One of your GSImport options might be invalid.\n\t\t\t Resetting to default value for Class.row.");
				}
				if (typeof val.header !== "string" || val.header.match(tagClassRE) === null){
					settings.class.header = defaults.class.header;
					console.warn("GSImport:\t One of your GSImport options might be invalid.\n\t\t\t Resetting to default value for Class.header.");
				}
				if (typeof val.headerRow !== "string" || val.headerRow.match(tagClassRE) === null){
					settings.class.headerRow = defaults.class.headerRow;
					console.warn("GSImport:\t One of your GSImport options might be invalid.\n\t\t\t Resetting to default value for Class.headerRow.");
				}
				if (typeof val.body !== "string" || val.body.match(tagClassRE) === null){
					settings.class.body = defaults.key.body;
					console.warn("GSImport:\t One of your GSImport options might be invalid.\n\t\t\t Resetting to default value for Class.body.");
				}
			}
			if (key === "searchBar"){
				if (val !== 1 && val !== 0){
					settings.searchBar = defaults.searchBar;
					console.warn("GSImport:\t One of your GSImport options might be invalid.\n\t\t\t Resetting to default value for " + key + ".");
				}	
			}
			if (key === "picturize"){
				if (typeof(val) !== "boolean") {
					settings.picturize = defaults.picturize;
					console.warn("GSImport:\t One of your GSImport options might be invalid.\n\t\t\t Resetting to default value for " + key + ".");
				}	
			}
			
		});

        return this.append(function gsImporter() {
			var $me = $(this),
				headers = $me.data("headers"),
				key = $me.data("key"),
				index = $me.data("index");

			if (typeof key === "undefined") {
			    console.error("GSImport: No data-key provided for div: " + $me.attr("id"));
			    return;
			}

			if (typeof headers === "undefined") {
			    console.error("GSImport: No data-headers provided for div: " + $me.attr("id"));
			    return;
			}

			if (typeof index === "undefined") {
			    console.warn("GSImport: No data-index provided for div: " + $me.attr("id") + "\nDefaulting to od6");
			    index = "od6";
			}

			var url = "https://spreadsheets.google.com/feeds/list/" + key + "/" + index + "/public/values?alt=json";

			settings.ignore.trigger.toLowerCase();
			
			// console.log(url);

			var headerList = headers.split(", ");

			function picturize(nStr) {

				if ( Boolean(settings.picturize) === false ){
					if (picturizeLog < 1){
						console.log("GSImport: Picturize disabled for div: " + $me.attr("id"));
						picturizeLog += 1;
					}
					return nStr;
				}

				switch (nStr)
				{
					case "":
						return "-";
					case "!":
						return settings.image1;
					case "X":
						return settings.image2;
					default:
						return nStr;
				}
			}

			var sheetHTML = "";

			$.getJSON(url, function(data) {
				var entry = data.feed.entry;
				sheetHTML += "<table class=\"" + settings.class.table + "\"><thead><tr class=\"" + settings.class.headerRow + "\">";

				$.each(headerList, function() {
					sheetHTML += "<th class=\"" + settings.class.header + "\">" + this.toString()+"</th>";
				});

				var headerCounter = 0;
				$.each(headerList, function () {
					headerList[headerCounter] = this.replace(/^\d+ */g, "").replace(/\s/g, "");
					headerCounter ++;
				});

				sheetHTML += "</tr></thead><tbody class=\""+ settings.class.body + "\">";

				$(entry).each(function(){
					var $curRow = this;
					// if ( $curRow["gsx$" + settings.ignore.column].$t.toLowerCase() !== settings.ignore.trigger ) {
						sheetHTML += "<tr>";
						$(headerList).each(function () {
							sheetHTML += "<td class=\"" + settings.class.cell + "\">" + picturize($curRow["gsx$"+this.toString().toLowerCase()].$t) + "</td>";
						});
						sheetHTML+="</tr>";
					// }
				});
				sheetHTML += "</tbody></table>";
				$($me).append(sheetHTML);
				console.log("GS Import: " + $me.attr("id") +" key(" + $me.data("key") + ") loaded");
			});				

		return sheetHTML;
		});
	};
}(jQuery));
