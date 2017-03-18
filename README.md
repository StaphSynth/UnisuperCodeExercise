# UnisuperCodeExercise

An automation testing exercise for Unisuper.

Uses [Protractor](http://www.protractortest.org/#/) to automate testing of [todoMVC](http://todomvc.com/examples/angularjs/#/)

### The brief

To write automation tests for the following scenarios:

1. I want to add a To-do item
2. I want to edit the content of an existing To-do item
3. I can complete a To-do by clicking inside the circle UI to the left of the To-do
4. I can re-activate a completed To-do by clicking inside the circle UI
5. I can add a second To-do
6. I can complete all active To-dos by clicking the down arrow at the top-left of the UI
7. I can filter the visible To-dos by Completed state
8. I can clear a single To-do item from the list completely by clicking the Close icon.
9. I can clear all completed To-do items from the list completely

### Running the tests

* Clone the repository
* Make sure you have Node.js installed
* Make sure you have Chrome installed
* `$ cd path/to/repo`
* `$ npm install`
* `$ node ./node_modules/.bin/webdriver-manager update`
* `$ node ./node_modules/.bin/webdriver-manager start`
* Open a new terminal window
* `$ node ./node_modules/.bin/protractor`
