(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

  module.exports = React.createClass({displayName: "exports",

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
              React.createElement("div", null, 
                  React.createElement(EntryBox, {text: this.state.text, 
                            onTextChanged: this.onTextChanged, 
                            onKeyDown: this.onEntryBoxKeyDown}), 
                  React.createElement(Dropdown, {data: this.state.visibleItems, 
                            onItemSelected: this.onItemSelected, 
                            ref: 'dropdown'})
              )
          );
      }
  });

}(React, module));

},{"./dropdown.jsx":3,"./entrybox.jsx":4}],2:[function(require,module,exports){
(function(React, module, undefined) {

  var AutoCompleteBox = require('./AutoCompleteBox.jsx');

  module.exports = React.createClass({displayName: "exports",
      render: function() {
          return React.createElement(AutoCompleteBox, null)
      }
  });

}(React, module));

},{"./AutoCompleteBox.jsx":1}],3:[function(require,module,exports){
(function(React, module, undefined) {

  var KEYS = {
          BACKSPACE: 8,
          TAB: 9,
          ENTER: 13,
          ESCAPE: 27,
          ARROW_UP: 38,
          ARROW_DOWN: 40
      };
      
  module.exports = React.createClass({displayName: "exports",
      getInitialState: function() {
          return { focusedItem: null };
      },

      onItemMouseOut: function(event) {
          this.setState({ focusedItem: null });
      },

      onItemMouseOver: function(event) {
          this.setState({focusedItem: event.target.innerText})
      },

      onItemClicked: function(event) {
          this.props.onItemSelected(event.target.innerText);
      },

      keyPressedOnEntryBox: function(keyCode) {
          switch (keyCode) {
              case KEYS.ARROW_UP:
                  this.hoverPrevious();
              break;
              case KEYS.ARROW_DOWN:
                  this.hoverNext();
              break;
              case KEYS.ENTER:
                  if (this.state.focusedItem != null) {
                      this.props.onItemSelected(this.state.focusedItem);
                  }
              break;
          }
      },

      hoverNext: function() {
          var indexOfCurrent = this.props.data.indexOf(this.state.focusedItem);
          var newIndex = indexOfCurrent < this.props.data.length - 1 ? indexOfCurrent + 1 : this.props.data.length - 1;
          this.hover(newIndex);
      },

      hoverPrevious: function() {
        var indexOfCurrent = this.props.data.indexOf(this.state.focusedItem);
        var newIndex = indexOfCurrent > 0 ? indexOfCurrent - 1 : 0;
        this.hover(newIndex);
      },

      hover: function(index) {
          this.setState({ focusedItem: this.props.data[index] });
      },

      componentDidUpdate: function() {
        console.log(this.refs.ul);
        var hoverItems = this.refs.ul.getElementsByClassName("hover");
        if (hoverItems.length > 0) {
            //if (hoverItems[0].offsetTop > 200 - 18)
            this.refs.ul.scrollTop = hoverItems[0].offsetTop;
        }
      },

      render: function() {
          var that = this;
          var items = this.props.data.map(function(text) {
              return React.createElement("li", {onClick: that.onItemClicked, 
                         key: text, 
                         className: that.state.focusedItem==text ? "hover" : "", 
                         onMouseOver: that.onItemMouseOver, 
                         onMouseOut: that.onItemMouseOut}, text);
          });

          // if the previously focused item is not in the list currently being shown, clear the focusedItem
          if (this.props.data.indexOf(this.state.focusedItem) === -1) {
              this.state.focusedItem = null;
          }

          return React.createElement("ul", {className: "autoCompleteDropdown", ref: 'ul'}, items);
      }
  });

}(React, module));

},{}],4:[function(require,module,exports){
(function(React, module, undefined) {
  
  var KEYS = {
          BACKSPACE: 8,
          TAB: 9,
          ENTER: 13,
          ESCAPE: 27,
          ARROW_UP: 38,
          ARROW_DOWN: 40
      };

  module.exports = React.createClass({displayName: "exports",
      getInitialState: function() {
          return { };
      },

      handleInputChange: function(event) {
          this.props.onTextChanged(event.target.value);
      },

      onKeyDown: function(event) {
          var keyCode = event.keyCode;
          if (keyCode === KEYS.ARROW_UP || keyCode === KEYS.ARROW_DOWN) {
              // stop the cursor from moving to the beginning or end of the textbox when arrow up/down is pressed
              event.preventDefault();
          }
          this.props.onKeyDown(event.keyCode);
      },

      render: function() {
          return (
              React.createElement("div", null, 
                 React.createElement("input", {onChange: this.handleInputChange, 
                        onKeyDown: this.onKeyDown, 
                        value: this.props.text})
              )
          );
      }
  });

}(React, module));

},{}],5:[function(require,module,exports){
(function(React, module) {
  var App = require('./components/app.jsx');

  ReactDOM.render(
      React.createElement(App, null),
      document.getElementById('content'));
}(React, module));

},{"./components/app.jsx":2}]},{},[5])