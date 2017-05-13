// ;
(function ($) {
    "use strict";
    $.fn.gsImport = function (options) {
        var defaults = {
            class: {
                cell: "gsCell",
                row: "gsRow",
                header: "gsHeader",
                headerRow: "gsHeaderRow",
                body: "gsBody",
                table: "gsTable table table-responsive table-striped"
            },
            general: {
                searchBar: 0,
                hyperlink: "hyperlink",
            },
            picturizeToggle: 0,
            picturizeImages: {
                image1: ["!", "<i class=\"fa fa-check check-icon\"></i>"],
                image2: ["X", "<i class=\"fa fa-times x-icon\"></i>"],
            },
            customImages: "",
            ignore: {
                column: "",
                trigger: ""
            }
        };

        var settings = $.extend(true, {}, defaults, options);

        var tagClassRE = new RegExp("^[A-Za-z][ -_A-Za-z0-9]+$");

        $.each(settings, function validateOptions(key, val) {
            if (key === "class") {
                if (typeof val.table !== "string" || val.table.match(tagClassRE) === null) {
                    settings.class.table = defaults.class.table;
                    console.warn("GSImport:\t One of your GSImport options might be invalid.\n\t\t\t Resetting to default value for Class.table.");
                }
                if (typeof val.cell !== "string" || val.cell.match(tagClassRE) === null) {
                    settings.class.cell = defaults.class.cell;
                    console.warn("GSImport:\t One of your GSImport options might be invalid.\n\t\t\t Resetting to default value for Class.cell.");
                }
                if (typeof val.row !== "string" || val.row.match(tagClassRE) === null) {
                    settings.class.row = defaults.class.row;
                    console.warn("GSImport:\t One of your GSImport options might be invalid.\n\t\t\t Resetting to default value for Class.row.");
                }
                if (typeof val.header !== "string" || val.header.match(tagClassRE) === null) {
                    settings.class.header = defaults.class.header;
                    console.warn("GSImport:\t One of your GSImport options might be invalid.\n\t\t\t Resetting to default value for Class.header.");
                }
                if (typeof val.headerRow !== "string" || val.headerRow.match(tagClassRE) === null) {
                    settings.class.headerRow = defaults.class.headerRow;
                    console.warn("GSImport:\t One of your GSImport options might be invalid.\n\t\t\t Resetting to default value for Class.headerRow.");
                }
                if (typeof val.body !== "string" || val.body.match(tagClassRE) === null) {
                    settings.class.body = defaults.key.body;
                    console.warn("GSImport:\t One of your GSImport options might be invalid.\n\t\t\t Resetting to default value for Class.body.");
                }
            }
            if (key === "searchBar") {
                if (val !== 1 && val !== 0) {
                    settings.general.searchBar = defaults.general.searchBar;
                    console.warn("GSImport:\t One of your GSImport options might be invalid.\n\t\t\t Resetting to default value for " + key + ".");
                }
            }
        });


        var map = new Map(Object.entries(settings.picturize));
        console.log(map.entries());

        return this.append(function gsImporter() {
            var $me = $(this),
                headers = $me.data("headers"),
                key = $me.data("key"),
                index = $me.data("index");

            if (key === undefined || key === null) {
                console.error("GSImport: No data-key provided for div: " + $me.attr("id"));
                return;
            }

            if (headers === undefined || key === null) {
                console.error("GSImport: No data-headers provided for div: " + $me.attr("id"));
                return;
            }

            if (index === undefined || key === null) {
                console.warn("GSImport: No data-index provided for div: " + $me.attr("id") + "\nDefaulting to od6");
                index = "od6";
            }

            var url = "https://spreadsheets.google.com/feeds/list/" + key + "/" + index + "/public/values?alt=json";

            settings.ignore.trigger.toLowerCase();

            var headerList = headers.replace(/\s/g, "").split(",");

            function picturizeItem(nStr) {

                if (Boolean(settings.picturize.toggle) === false) {
                    var picturizeLog = 0;
                    if (picturizeLog < 1) {
                        console.log("GSImport: Picturize disabled for div: " + $me.attr("id"));
                        picturizeLog += 1;
                    }
                    return nStr;
                }

                /*
                For trigger in picturize
                    If this cell equals trigger#
                    return image#
                    else if cell equals ""
                        return  -
                    else return cell
                */


                switch (nStr) {
                case "":
                    return "-";
                case settings.picturize.trigger1:
                    return settings.picturize.image1;
                case settings.picturize.trigger2:
                    return settings.picturize.image2;
                default:
                    return nStr;
                }
            }

            var sheetHTML = "";

            $.getJSON(url, function (data) {
                var entry = data.feed.entry;

                sheetHTML += "<table class=\"" + settings.class.table + "\"><thead><tr class=\"" + settings.class.headerRow + "\">";

                $.each(headerList, function () {
                    sheetHTML += "<th class=\"" + settings.class.header + "\">" + this.toString() + "</th>";
                });

                var headerCounter = 0;

                $.each(headerList, function () {
                    // var replaceStartingDigits = newReg
                    headerList[headerCounter] = this.replace(/^\d+ */g, "").replace(/\s/g, "");
                    headerList[headerCounter] = headerList[headerCounter].toLowerCase();
                    headerCounter += 1;
                });

                sheetHTML += "</tr></thead><tbody class=\"" + settings.class.body + "\">";

                if (settings.ignore.column !== null && settings.ignore.column !== "" && settings.ignore.trigger !== null && settings.ignore.trigger !== "") {
                    $(entry).each(function () {
                        var $curRow = this;
                        if ($curRow["gsx$" + settings.ignore.column.toLowerCase()].$t.toLowerCase() !== settings.ignore.trigger.toLowerCase()) {
                            sheetHTML += "<tr>";
                            var firstColumnDone = false;
                            $(headerList).each(function () {
                                var thisHeader = this;
                                if (firstColumnDone !== true) {
                                    if ($curRow["gsx$" + settings.general.hyperlink.toLowerCase()].$t !== null) {
                                        sheetHTML += "<td class=\"" + settings.class.cell + "\"><a href='" + $curRow["gsx$" + settings.general.hyperlink.toLowerCase()].$t +"'>" + picturizeItem($curRow["gsx$" + thisHeader.toString().toLowerCase()].$t) + "</a></td>";
                                    } else {
                                        sheetHTML += "<td class=\"" + settings.class.cell + "\">" + picturizeItem($curRow["gsx$" + thisHeader.toString().toLowerCase()].$t) + "</td>";    
                                    }
                                } else {
                                    sheetHTML += "<td class=\"" + settings.class.cell + "\">" + picturizeItem($curRow["gsx$" + thisHeader.toString().toLowerCase()].$t) + "</td>";    
                                }
                                firstColumnDone = true;
                            });
                            sheetHTML += "</tr>";
                        }
                    });
                } else {
                    $(entry).each(function () {
                        var $curRow = this;
                        sheetHTML += "<tr>";
                        $(headerList).each(function () {
                            var thisHeader = this;
                            sheetHTML += "<td class=\"" + settings.class.cell + "\">" + picturizeItem($curRow["gsx$" + thisHeader.toString().toLowerCase()].$t) + "</td>";
                        });
                        sheetHTML += "</tr>";
                    });
                }

                sheetHTML += "</tbody></table>";

                $($me).append(sheetHTML);

                console.log("GS Import: " + $me.attr("id") + " key(" + $me.data("key") + ") loaded");
            });
            return sheetHTML;
        });
    };
}(jQuery));
