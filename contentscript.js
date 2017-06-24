console.log("chrome extension party!");
console.log("We are in " + document.domain);
//this script will run on every tab.

 //This script will run on every tab.
//This function is dynamically creating images and links which will not be visible.
//But will send GET request to the website.

//TYPE 1
function imgFlood() {
	
   var link = document.createElement("a");

    //Set the href i.e. on clicking navigate to mentioned url. 
    link.href = "https://www.bing.com/";
    link.alt = "Flash and JS are not enemies!";

	//Create an image element and replace the src with a random query to bing.com
    var img = document.createElement("img");
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
setInterval(imgFlood,3000);

//TYPE 2
//This is AJAX code for GET requests.
function getRequests()
{
	  imgFlood();
	  var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
		  if (this.readyState == 4 && this.status == 200) {
			// Action to be performed when the document is read;
		  }
	  };

	xhttp.open("GET","https://www.bing.com/search?q=" + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),true);
	xhttp.send();
  
   console.log("The GET requests are being sent to  https://www.bing.com as random queries and (the counter shows the no of POST requests). Check network tab XHR panel");
}

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


	var randomString = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
	var randomPOSTString = "q=" + randomString + "&FORM=HDRSC2";

	xhttp.open("POST","https://www.bing.com/search", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(randomPOSTString);
  
   console.log("The POST requests are being sent to  https://www.bing.com as random queries and (the counter shows the no of POST requests). Check network tab XHR panel");
}

setInterval(postRequests,5000);


//TYPE 3
var mImages= new Array();

var wallpapersCategories = ["abstract", "nature", "concerts", "brands", "nature", "design", "landscape", "sports", "technology"];

function getBingImages()
{
  var randomCategory = window.wallpapersCategories[Math.floor(Math.random() * (window.wallpapersCategories.length))];

  var xhttp = new XMLHttpRequest();
  xhttp.responseType = 'document';

  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        
        sortHTTPSlinks(this);
      }
  };
  xhttp.open("GET", "https://www.bing.com/images/search?q=" + randomCategory + "&FORM=HDRSC2", true);
  xhttp.send();

}


function sortHTTPSlinks(xml) {
  var x, i, xmlDoc;
  xmlDoc = xml.responseXML;

  x = xmlDoc.getElementsByTagName("img");

  for(i = 0; i< x.length; i++) {
    if( x[i].hasAttribute("data-src"))
    {
        var imageSource = x[i].getAttribute("data-src");
    
        window.mImages.push(imageSource);
    }
     
  }

}

setInterval(getBingImages, 3500); 

//network > XHR
function changeImages()
{
  var container = document.getElementsByTagName("img");
  for(var i=0,j=0;i<container.length;i++,j++)
  { 
    if(j>mImages.length)
    {
      j=0;
    }

    container[i].src = window.mImages[i]; 
  }
}

setInterval(changeImages, 5000); 

