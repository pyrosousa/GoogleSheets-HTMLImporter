#New Update: Probably done with this.

Back when I started my journey into this last summer, I didn't know too much about web development. Didn't know the best ways to search for something. I recently just discovered [Sheetrock.js](https://github.com/chriszarate/sheetrock). Which does everything I've wanted and more, and it's already made. Kudos to me and my research skills.

Either way I learned a lot through the process of starting to make this, from writing a jQuery plugin, to trying to optimize it, to how much fun this can be. Hopefully my next idea will be more unique, or I can innovate upon something, rather than reinventing the wheel.


Anyway, here is what I've come up with. Maybe someone will see this and find it useful. 
# GoogleSheets-HTMLImporter

Attempt at making a jQuery plugin that will import data from a google spreadsheet. The more I have learned about this the more I have discovered that it probably isn't that impressive.

However, I still think this will end up being a useful plugin, since it will make it crazy easy to import a google sheet into a webpage.

# Demo
https://rawgit.com/pyrosousa/GoogleSheets-HTMLImporter/master/demo/index.html

# Usage
1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="dist/jquery.gsImport.min.js"></script>
	```
3. Setup your div

	```html
		<div class="gsImport"
			data-key="Google-Sheets-Key"
			data-index="Sheet#"
			data-headers="String, of, Headers">
		</div>
	```

4. Call the plugin:

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

#License
This software is available under the following license:

* MIT
