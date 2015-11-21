(function(React, module, undefined) {

  var EntryBox = require('./entrybox.jsx'),
      Dropdown = require('./dropdown.jsx');

  var countries = [
      "Afghanistan",
      "Albania",
      "Algeria",
      "Andorra",
      "Angola",
      "Antigua & Deps",
      "Argentina",
      "Armenia",
      "Australia",
      "Austria",
      "Azerbaijan",
      "Bahamas",
      "Bahrain",
      "Bangladesh",
      "Barbados",
      "Belarus",
      "Belgium",
      "Belize",
      "Benin",
      "Bhutan",
      "Bolivia"
  ];

  module.exports = React.createClass({

      getInitialState: function() {
          return {
            visibleItems: countries, // items currently being shown in the list
            allItems: countries // all available items
          };
      },

      onTextChanged: function(text) {
          var filteredItems = this.state.allItems.filter(function(item) {
              return new RegExp(text, "gi").test(item);
          });
          var newState = {visibleItems: filteredItems, text: text};
          this.setState(newState);
      },

      onEntryBoxKeyDown: function(keyCode) {
          this.refs.dropdown.keyPressedOnEntryBox(keyCode);
      },

      onItemSelected: function(item) {
          console.log("item selected: " + item);
          this.setState({text: item});
      },

      render: function() {
          return (
              <div>
                  <EntryBox text={this.state.text}
                            onTextChanged={this.onTextChanged}
                            onKeyDown={this.onEntryBoxKeyDown} />
                  <Dropdown data={this.state.visibleItems}
                            onItemSelected={this.onItemSelected}
                            ref={'dropdown'}/>
              </div>
          );
      }
  });

}(React, module));
