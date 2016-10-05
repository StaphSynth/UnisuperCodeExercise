/*==========================================================================

TEST SCRIPT FOR http://todomvc.com/examples/angularjs/#/ BY DAVID ALLEN

2016-10-05

This test script is written in JavaScript and uses the Node.js selenium-webdriver
node module to drive the browser.

To USE (Debian-based Linux): Install node.js
$ sudo apt-get install node.js
Then use the NPM to install selenium-webdriver
$ sudo npm install selenium-webdriver

Make sure you have the Chrome browser driver installed on your machine
and that it's included in your $PATH
See: https://christopher.su/2015/selenium-chromedriver-ubuntu/

==========================================================================*/

/*
  This is brittle, it's pointing to  the location of the module on my machine.
  You'll have to change that to
  /PATH/TO/YOUR_NODE_INSTALLATION/selenium-webdriver
  to make this work on your machine
*/
var webdriver = require('/usr/local/node_modules/selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

//new webdriver instance
var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

//navigate to the start page
driver.get('http://todomvc.com/');
//click on the link to the page we want to test
driver.findElement(By.linkText('AngularJS')).click();


// driver.quit();
