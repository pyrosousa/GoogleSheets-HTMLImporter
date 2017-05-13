(function ($) ) {
	"use strict";
	$.fn.gsImport = function () {
		var defaults = {};

		var settings = $.extend(true, {}, defaults, options);

		// Validate Settings

		return this.append(function () {
			var me = $(this);

			// Validate Data Inputs
			// Construct URL

			// Declare picturize function

			$.getJSON(url, function (data) {
				data = me + settings;
				// Construct sheetHTML
			});

			// Append sheetHTML to me

			//console.log information
			return sheetHTML;
		});

	};
}(jQuery));