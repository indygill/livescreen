# LiveScreen
#### A small extension for devices.css created by [marvelapp](https://github.com/marvelapp/devices.css)
#### Completely styled using CSS, implemented using JavaScript for ease of use and installation.
##### You can see a [demo here](https://developerb.in/livescreen)
##### I was tasked with creating an iOS12 interface for a client. Turned into a bit of fun to see how far I can take it.

## Installation
1. Include **livescreen.min.css** in your project's <head> (you will need the fonts from /assets/css/fonts)
2. Add an ID attribute to your marvel-device
3. Include **livescreen.min.js** in your project's <head>
4. Add the following javascript after your marvel-device mark-up:
    ````<script>  const device = new LiveScreen("marvel-device-id");  </script>````
    
## ToDo
1. User definded notification content
2. Interfaces for older OS versions (KitKat for Nexus5, iOS7 for iPhone5s etc)
3. Interchangable OS rendering (Run iOS on the Note8 Device)
