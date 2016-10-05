/*==========================================================================

TEST SCRIPT FOR http://todomvc.com/examples/angularjs/#/ BY DAVID ALLEN

2016-10-05

This test script is written in JavaScript and uses the Node.js selenium-webdriver
node module to drive the browser.

TO USE:
  * Install node.js
  * Then use the NPM to install selenium-webdriver

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

//poll the DOM for change state for 5 sec before declaring failure.
//Not ideal. I hate hard-coding magic numbers
driver.manage().timeouts().implicitlyWait(5000);

/******************************
TESTING FUNCTIONS
******************************/



/******************************
ACTUAL TESTS
******************************/
//TEST ABILITY TO INPUT TEXT TO LIST
var inputText = "BLAH BLAH BLAH!";
//go to page
driver.get('http://todomvc.com/');
//click link
driver.findElement(By.linkText('AngularJS')).click();
//select text area element and input text
driver.findElement(By.id('new-todo')).sendKeys(inputText + '\n').then(function(){
  //now verify that it's been added to the list
  var toDoItems = driver.findElements(By.className('ng-binding')).then(function(toDoItems){
    for(var i = 0; i < toDoItems.length; i++) {
      toDoItems[i].getText().then(function(text){
        if(text === inputText) {
          console.log("Item '" + inputText + "' successfully added");
        }
      });
    }
  });
});

//kill the browser when done
driver.quit();
