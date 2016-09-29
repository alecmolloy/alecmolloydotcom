# Developing Project Nimbus

Problem:
- Project Nimbus needs to be able to run on browsers and devices
- Project Hello requires we support IE8
- Development tools we're looking at require HTML 5 Canvas or WebGL to run

Solution:
- Use Edge Animate + open source libraries such as Raphaël (http://raphaeljs.com/) or Snap.svg (http://snapsvg.io/) for SVG manipulation. Both are created and maintained by an Adobe Employee
-- Supports browsers back to IE8 and more
- Allows for developers to get the JS flexibility they need, while letting designers handle layout and animation
- If we focus all of our development efforts on producing Illustrator games using Raphaël we can meet the deadlines for Hello, while also building solid modular games that can be used for our full game
- If at any point, it is determined Edge is unable to handle our development needs, all Javascript and SVG assets can be removed from Edge and hand-coded

What this allows us to do:
- Programming on the open web means our libraries and scripts are being actively developed
- Post-May we can possibly start integrating with CC APIs (what if you could have a game that created and saved a real Kuler palette?)