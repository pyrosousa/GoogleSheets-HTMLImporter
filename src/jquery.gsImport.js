// The MIT License
// Copyright (c) 2017 Sean Cardwell
// https://raw.githubusercontent.com/pyrosousa/GoogleSheets-HTMLImporter/master/Licence.MIT

//features to add:
//		search-bar
//		custom-Image Cases
//		Ignore row if ...

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
            image1: "<i class=\"fa fa-check check-icon\"></i>",
            image2: "<i class=\"fa fa-times x-icon\"></i>",
            customImages: "",
            ignore: "",
        };

		var settings = $.extend(true, {}, defaults, options );

		var tagClassRE = /^[A-Za-z][ -_A-Za-z0-9]+$/;

		$.each(settings, function validateOptions(key, val) {
			if (key === "class") {
				if (typeof val.table !== "string" || val.table.match(tagClassRE) === null){
					settings.key.table = defaults.key.table;
					console.warn("GSImport: One of your GSImport options might not be valid.");
				}
				if (typeof val.cell !== "string" || val.cell.match(tagClassRE) === null){
					settings.key.cell = defaults.key.cell;
					console.warn("GSImport: One of your GSImport options might not be valid.");
				}
				if (typeof val.row !== "string" || val.row.match(tagClassRE) === null){
					settings.key.row = defaults.key.row;
					console.warn("GSImport: One of your GSImport options might not be valid.");
				}
				if (typeof val.header !== "string" || val.header.match(tagClassRE) === null){
					settings.key.header = defaults.key.header;
					console.warn("GSImport: One of your GSImport options might not be valid.");
				}
				if (typeof val.headerRow !== "string" || val.headerRow.match(tagClassRE) === null){
					settings.key.headerRow = defaults.key.headerRow;
					console.warn("GSImport: One of your GSImport options might not be valid.");
				}
				if (typeof val.body !== "string" || val.body.match(tagClassRE) === null){
					settings.key.body = defaults.key.body;
					console.warn("GSImport: One of your GSImport options might not be valid.");
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

		console.log(url);

		var headerList = headers.split(", ");

		function picturize(nStr) {
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


		$.getJSON(url, function(data) {
			var entry = data.feed.entry;
			$($me).append("<table class=\"" + settings.class.table + "\"><thead></thead><tbody class=\""+ settings.class.body + "\"></tbody></table>");

			$.each(headerList, function(){ // Adds headers
				$($me).find(" table thead").append("<th class=\"" + settings.class.header + "\">" + this.toString()+"</th>");
			});

			$($me).find(" table thead th").wrapAll("<tr class=\"" + settings.class.headerRow + "\"></tr>");

			$(entry).each(function(){

				var $curRow = this;
					$(headerList).each(function () {
							console.log(this.toString());
							$($me).find(" table tbody").append("<td class=\"" + settings.class.cell + "\">" + picturize(eval("$curRow.gsx$"+this.toString().toLowerCase()+".$t")) + "</td>");

				});
			});

			var i = 0,
			    cells = $($me).find(" table tbody td"),
			    group;

			while ((group = cells.slice(i, i += headerList.length)).length) {
			    group.wrapAll("<tr class=\"" + settings.class.row + "\"></tr>");
			}
			console.log("GS Import: " + $me.attr("id") +" key(" + $me.data("key") + ") loaded");
		});
	});
	};
}(jQuery));
