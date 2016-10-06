/*==========================================================================

TEST SCRIPT FOR http://todomvc.com/examples/angularjs/#/ BY DAVID ALLEN

2016-10-05

This test script is written in JavaScript and uses the Node.js selenium-webdriver
node module to drive the browser.

TO USE:
  * Install node.js
  * Then use the NPM to install selenium-webdriver

Note to self: Make sure you have the Chrome browser driver installed on your machine
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

//mocha test environment stuff
//var test = require('/usr/local/node_modules/selenium-webdriver/testing');
//var assert = require('assert');

//poll the DOM for change state for 5 sec before declaring failure.
//Not ideal. I hate hard-coding magic numbers. Need a more robust solution.
driver.manage().timeouts().implicitlyWait(5000);



/******************************
TESTING FUNCTIONS
******************************/

/*** TEST ABILITY TO ADD A TO-DO ITEM ***/
/*Other than a lack of proper testing framework, this is the most complete test
I've been able to write as it doesn't make any silly assumptions*/
function addToDo(inputText){
  //go to page
  driver.get('http://todomvc.com/');
  //click link
  driver.findElement(By.linkText('AngularJS')).click();
  //select text area element and input text
  driver.findElement(By.id('new-todo')).sendKeys(inputText + '\n').then(function(){
    //now verify that it's been added to the list by looping through the list items and checking against innerHTML
    var toDoItems = driver.findElements(By.className('ng-binding')).then(function(toDoItems){
      var promiseArray = [];
      //add promises for unresolved data to array
      for(var i = 0; i < toDoItems.length; i++) {
        promiseArray.push(toDoItems[i].getText());
      }
      /*resolve the unresolved data in the promise array
      pass to anonymous function to perform check against original data
      and return accordingly*/
      Promise.all(promiseArray).then(function(array){
        for(var i = 0; i < array.length; i++) {
          if(array[i] === inputText){
            console.log("ADD-TO-DO PASS: Item '" + inputText + "' successfully added");
            return;
          }
          console.log("ADD-TO-DO FAIL: Item not added to list");
        }
      });
    });
  });
}

/*** TEST ABILITY TO MODIFY AN EXISTING TO-DO ITEM ***/
/*Unfinished as I still can't figure out how to execute a double click event*/
function modifyItem(newValue) {
  var originalValue = "Here's some default text for the list item";
  //first, create an item to modify
  addToDo(originalValue);
    //then find and modify the item
    var toDoItems = driver.findElements(By.className('ng-binding')).then(function(toDoItems){
      for(var i = 0; i < toDoItems.length; i++) {
        toDoItems[i].getText().then(function(itemText){
          if(itemText === originalValue) {
            //do some stuff;
          }
        });
      }
    });
}

/*** TEST ABILITY TO 'COMPLETE' TO-DO ITEM ***/
/*This is obviously not a very robust test. It doesn't check the innerHTML
of the list item to ensure it's actually the one we're looking for,
and assumes there were no previously completed items.
However, I've had all sorts of trouble traversing the DOM to the
child elements to check that.

So here it is, warts and all...*/
function complete() {

  var itemText = "Some list item text";
  //create item to complete
  addToDo(itemText);
  //click the button to mark complete
  driver.findElement(By.className('toggle')).click().then(function(){
  //look for a class with 'completed' which didn't exist in the DOM before
    if(driver.findElement(By.className('completed')))
      console.log("COMPLETE PASS: Task marked as completed");
  });
}

/*** TEST ABILITY TO UN-COMPLETE (RE-ACTIVATE) TO-DO ITEM ***/
/*Again, this is not a robust test and makes the (silly) assumption that
there was only one 'completed' task.

I really wish I was better at traversing the DOM to verify this better,
but I just don't have the time to figure out what's going wrong... I miss jQuery *sniff* ;)*/
function unComplete() {
  var itemText = "Some test data";
  //create item and mark as complete
  complete();

  //now click the button again and see if the 'completed' class disappears
  driver.findElement(By.className('toggle')).click();

  if(!(driver.findElement(By.className('completed'))))
    console.log("Task marked as uncomplete");
}

/******************************
ACTUAL TESTS
******************************/
/** Un-comment out a test function to run it. I've had problems running them
sequentially. There seem to be issues resolving promises after killing the
browser and re-starting it again. Don't have time to trace what's going wrong. **/

//addToDo("some text here");
//driver.quit();

//modifyItem("new list item value");

complete();
driver.quit();
