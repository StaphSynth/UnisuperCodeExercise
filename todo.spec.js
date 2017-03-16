describe('test the todomvc', function() {

  beforeEach(function() {
    browser.get('http://todomvc.com/examples/angularjs/#/');
  });

  describe('adding a new todo item', function() {

    it('should add a new item to the list', function() {

      element(by.id('new-todo')).sendKeys('some test text here\n\r');

      var listItems = element.all(by.repeater('todo in todos'));
      expect(listItems.count()).toEqual(1);
      expect(listItems.get(0).element(by.tagName('label')).getText()).toEqual('some test text here');
    });
  });

});
