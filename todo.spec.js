describe('test the todomvc', function() {

  var testText = 'some testing text';

  //go to the app home page
  beforeEach(function() {
    browser.get('http://todomvc.com/examples/angularjs/#/');
  });

  //burn the local storage after each test
  afterEach(function() {
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  });

  describe('adding a new todo item', function() {

    it('should add a new item to the list', function() {
      var testText = 'some testing text';

      element(by.id('new-todo')).sendKeys(testText + '\n\r');

      var listItems = element.all(by.repeater('todo in todos'));
      expect(listItems.count()).toEqual(1);
      expect(listItems.get(0).element(by.tagName('label')).getText()).toEqual(testText);
    });
  });


  describe('manipulating todo items that already exist', function() {
    var listItems;
    var firstItemLabel;

    //add some todo items to the list
    function addSomeTodos(number) {
      for(var i = 0; i < number; i++) {
        element(by.id('new-todo')).sendKeys(testText + '\n\r');
      }
    }

    //sets every second item on the list to 'complete'
    function setSecondsComplete() {
      listItems.filter(function(item, index) {
        if((index % 2) === 0)
          return item;
      }).each(function(item) {
        item.$('input.toggle').click();
      });
    }


    //env setup. Add some test data to the list for manipulation
    beforeEach(function() {
      addSomeTodos(1);
      listItems = element.all(by.repeater('todo in todos'));
      firstItemLabel = listItems.get(0).element(by.tagName('label'));
    });


    it('should edit the content of an existing todo item', function() {

      //should start with this text
      expect(firstItemLabel.getText()).toEqual(testText);

      //go to edit mode by double-clicking on the todo
      browser.actions().doubleClick(firstItemLabel).perform();

      //add additional text
      listItems.get(0).element(by.css('input.edit')).sendKeys(testText + '\n\r');

      //validate change
      expect(firstItemLabel.getText()).toEqual(testText + testText);
    });


    it('validates that you can mark a todo as complete', function() {

      //check it's not already complete
      expect(listItems.get(0).getAttribute('class')).not.toMatch('completed');

      //click toggle button to mark as complete
      listItems.get(0).element(by.css('input.toggle')).click();

      //validate the change
      expect(listItems.get(0).getAttribute('class')).toMatch('completed');
    });


    it('validates that you can change a "complete" todo to "incomplete"', function() {

      //click toggle button to mark as complete
      listItems.get(0).element(by.css('input.toggle')).click();

      //check that it is actually marked as complete
      expect(listItems.get(0).getAttribute('class')).toMatch('completed');

      //click it again to toggle it back
      listItems.get(0).$('input.toggle').click();

      //verify that it's no-longer 'complete'
      expect(listItems.get(0).getAttribute('class')).not.toMatch('completed');
    });



    it('adds a second item to the todo list', function() {

      //verify that there's already one item in the list due to env setup above
      expect(listItems.count()).toEqual(1);

      //add another item
      $('#new-todo').sendKeys(testText + '\n\r');

      //verify that there are now two items on the list
      expect(listItems.count()).toEqual(2);
    });


    it('verifies that clicking the master "complete" button marks all items as complete', function() {

      //first add a few additional items to the list
      addSomeTodos(5);

      //verify that the list items are not complete
      listItems.each(function(item) {
        expect(item.getAttribute('class')).not.toMatch('completed');
      });

      //click the button
      $('#toggle-all').click();

      //verify that items are marked as complete
      listItems.each(function(item) {
        expect(item.getAttribute('class')).toMatch('completed');
      });
    });



    it('verifies that you can filter todo items based on their "complete" status', function() {

      //add 5 items, giving a total of 6
      addSomeTodos(5);

      //set every second item to 'complete'
      setSecondsComplete();

      //now click the 'filter by complete' button
      //the incomplete items should disappear
      $('#filters a[href="#/completed"]').click();

      //hiding the incomplete items leaves a total of 3 in the list
      expect(listItems.count()).toEqual(3);

      //expect remaining items to be 'complete'
      listItems.each(function(item) {
        expect(item.getAttribute('class')).toMatch('completed');
      });

      //click the 'active' button and the completed items disappear, leaving the incomplete items on the list
      $('#filters a[href="#/active"]').click();

      //hiding the complete items should leave 3 in the list
      expect(listItems.count()).toEqual(3);

      //expect the remaining items to be incomplete
      listItems.each(function(item) {
        expect(item.getAttribute('class')).not.toMatch('completed');
      });

    });



    // it('verifies that you can delete a single todo item by clicking its delete button', function() {
    //
    //   //total of two
    //   addSomeTodos(1);
    //
    //   //verify
    //   expect(listItems.count()).toEqual(2);
    //
    //   //delete the top item
    //   listItems.get(0).$('button.destroy').click();
    //
    //   //verify that there's only one item on the list now
    //   expect(listItems.count()).toEqual(1);
    // });


    it('verifies that you can clear all completed items on the to-do list by clicking the "clear completed" button', function() {

      //add some items. total 6
      addSomeTodos(5);


      //mark half of them as complete
      setSecondsComplete();

      //verify there are 6 in the list
      expect(listItems.count()).toEqual(6);

      //click the 'clear completed' button
      $('button#clear-completed').click();

      //now there should be only 3 items left in the list
      expect(listItems.count()).toEqual(3);
    });


  });

});
