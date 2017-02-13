# GoogleSheets-HTMLImporter
Attempt at making a jQuery plugin that will import data from a google spreadsheet. The more I have learned about this the more I have discovered that it probably isn't that impressive.

However, I still think this will end up being a useful plugin, since it will make it crazy easy to import a google sheet into a webpage.

# Usage
```html
	<div class="gsImport"
		data-key="Google-Sheets-Key"
		data-index="Sheet#"
		data-headers="String, of, Headers">
	</div>
```
```html
	<script>
		$(".gsImport").gsImport();
	</script>
```


# Research and Such

####Main Reference/Source
http://michelleminkoff.com/2010/11/22/using-google-spreadsheets-as-your-database/
This originally was the base script that I was using. I have since adapted it to jQuery, and then to this jQuery plugin. 

####Grouping DOM elements
http://stackoverflow.com/questions/4247188/how-do-i-group-a-certain-number-of-elements-with-jquery

####Parsing json from google sheet
https://coderwall.com/p/duapqq/use-a-google-spreadsheet-as-your-json-backend
