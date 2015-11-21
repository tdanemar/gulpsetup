(function(React, module, undefined) {

  var EntryBox = require('./entrybox.jsx'),
      Dropdown = require('./dropdown.jsx');

  Array.prototype.any = function(item) {
      return this.indexOf(item) > -1;
  };

  Array.prototype.remove = function(item) {
      var index = this.indexOf(item);
      if (index > -1) {
          this.splice(index, 1);
      }
  };

  Array.prototype.addUnique = function(item) {
    if (!this.any(item)) {
        this.push(item);
    }
  };

  var inputParameters = [
      { displayText: "Afghanistan", id: "1" },
      { displayText: "Albania", id: "2" },
      { displayText: "Algeria", id: "3" },
      { displayText: "Andorra", id: "4" },
      { displayText: "Angola", id: "5" },
      { displayText: "Antigua & Deps", id: "6" },
      { displayText: "Argentina", id: "7" },
      { displayText: "Armenia", id: "8" },
      { displayText: "Australia", id: "9" },
      { displayText: "Austria", id: "10" },
      { displayText: "Azerbaijan", id: "11" },
      { displayText: "Bahamas", id: "12" },
      { displayText: "Bahrain", id: "13" },
      { displayText: "Bangladesh", id: "14" },
      { displayText: "Barbados", id: "15" },
      { displayText: "Belarus", id: "16" },
      { displayText: "Belgium", id: "17" },
      { displayText: "Belize", id: "18" },
      { displayText: "Benin", id: "19" },
      { displayText: "Bhutan", id: "20" },
      { displayText: "Bolivia", id: "21" }
  ];

  module.exports = React.createClass({

      getInitialState: function() {
          return {
              visibleItems: inputParameters, // items currently being shown in the list
              allItems: inputParameters, // all available items
              selectedItems: []
          };
      },

      onTextChanged: function(text) {
          var filteredItems = this.state.allItems.filter(function(item) {
              return new RegExp(text, "gi").test(item.displayText);
          });
          var newState = {
            visibleItems: filteredItems,
            text: text
          };
          this.setState(newState);
      },

      onEntryBoxKeyDown: function(keyCode) {
          this.refs.dropdown.keyPressedOnEntryBox(keyCode);
      },

      onItemSelected: function(item) {
          var items = this.state.selectedItems;
          items.addUnique(item);
          this.setState({selectedItems: items });
      },

      removeSelectedItem: function(item) {
          var items = this.state.selectedItems;
          items.remove(item);
          this.setState({selectedItems: items });
      },

      render: function() {
          return (
              <div className="autoCompleteBox">
                  <EntryBox text={this.state.text}
                            items={this.state.selectedItems}
                            onTextChanged={this.onTextChanged}
                            onKeyDown={this.onEntryBoxKeyDown}
                            removeSelectedItem={this.removeSelectedItem}/>
                  <Dropdown data={this.state.visibleItems}
                            onItemSelected={this.onItemSelected}
                            ref={'dropdown'}/>
              </div>
          );
      }
  });

}(React, module));
