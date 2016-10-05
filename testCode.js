/*==========================================================================

TEST SCRIPT FOR http://todomvc.com/examples/angularjs/#/ BY DAVID ALLEN

2016-10-05

This test script is written in JavaScript and uses the Node.js selenium-webdriver
node module to drive the browser.

TO USE (Debian-based Linux): Install node.js
$ sudo apt-get install node.js
Then use the NPM to install selenium-webdriver
$ sudo npm install selenium-webdriver

Make sure you have the Chrome browser driver installed on your machine
and that it's included in your $PATH
See: https://christopher.su/2015/selenium-chromedriver-ubuntu/

==========================================================================*/

/******************************
ENVIRONMENT SET-UP
******************************/

/*
  This is brittle, it's pointing to the location of the module on my machine.
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

//poll the browser for change state for 5 sec before declaring failure.
//Not ideal. I hate hard-coding magic numbers
driver.manage().timeouts().implicitlyWait(5000);

/******************************
TESTING FUNCTIONS
******************************/

/*** loads the page we want to test, beginning at http://todomvc.com/ ***/
function loadPage() {

  //navigate to the start page
  if(!(driver.get('http://todomvc.com/'))) {
    console.log('ERROR: Failed to resolve todomvc.com');
    return false
  }

  //click on the link to the page we want to test
  if(!(driver.findElement(By.linkText('AngularJS')).click())) {
    console.log('ERROR: click link "AngularJS" failed');
    return false;
  }

  console.log('loadPage PASSED');
  return true;
}

/*** adds a new item to the todo list ***/
function addToDo(text) {
  loadPage();

  //select 'to do' field and send keystrokes
  driver.findElement(By.id('new-todo')).sendKeys(text + '\n');

  //make sure element is added to list
  var items = driver.findElements(By.className('ng-binding'));
  

}

/******************************
ACTUAL TESTS
******************************/


addToDo("TESTING TEXT ITEM 1");

// driver.quit();
