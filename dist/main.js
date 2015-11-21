(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

  module.exports = React.createClass({displayName: "exports",

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
              React.createElement("div", {className: "autoCompleteBox"}, 
                  React.createElement(EntryBox, {text: this.state.text, 
                            items: this.state.selectedItems, 
                            onTextChanged: this.onTextChanged, 
                            onKeyDown: this.onEntryBoxKeyDown, 
                            removeSelectedItem: this.removeSelectedItem}), 
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

      onItemMouseOut: function(item) {
          this.setState({ focusedItem: null });
      },

      onItemMouseOver: function(item) {
          this.setState({focusedItem: item})
      },

      onItemClicked: function(item) {
          this.props.onItemSelected(item);
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
          this.scrollDirection = 'down';
          this.hover(newIndex);
      },

      hoverPrevious: function() {
          var indexOfCurrent = this.props.data.indexOf(this.state.focusedItem);
          var newIndex = indexOfCurrent > 0 ? indexOfCurrent - 1 : 0;
          this.scrollDirection = 'up';
          this.hover(newIndex);
      },

      hover: function(index) {
          this.setState({ focusedItem: this.props.data[index] });
      },

      setScrollPosition: function() {
          var hoverItems = this.refs.ul.getElementsByClassName("hover");
          if (hoverItems.length > 0) {
              var containerHeight = this.refs.ul.clientHeight;
              var itemOffsetTop = hoverItems[0].offsetTop;
              var container = this.refs.ul;

              // case for scrolling by pressing the 'down' key
              if (this.scrollDirection === 'down' && itemOffsetTop >= (container.scrollTop + containerHeight)){
                  container.scrollTop = (itemOffsetTop - containerHeight + hoverItems[0].clientHeight);
              }

              // case for scrolling by pressing 'up' OR pressing down in the entry box when the list is already scrolled below the top
              if (itemOffsetTop < container.scrollTop) {
                  container.scrollTop = itemOffsetTop;
              }
              this.scrollDirection = null;
          }
      },

      componentDidUpdate: function() {
          this.setScrollPosition();
      },

      render: function() {
          var that = this;
          var listItems = this.props.data.map(function(item) {
              return React.createElement("li", {onClick: that.onItemClicked.bind(null, item), 
                         key: item.id, 
                         className: that.state.focusedItem && that.state.focusedItem.id===item.id ? "hover" : "", 
                         onMouseOver: that.onItemMouseOver.bind(null, item), 
                         onMouseOut: that.onItemMouseOut}, item.displayText);
          });

          // if the previously focused item is not in the list currently being shown (e.g. after filtering), clear the focusedItem
          if (this.props.data.indexOf(this.state.focusedItem) === -1) {
              this.state.focusedItem = null;
          }

          return React.createElement("ul", {className: "autoCompleteDropdown", ref: 'ul'}, listItems);
      }
  });

}(React, module));

},{}],4:[function(require,module,exports){
(function(React, ReactDOM, module, undefined) {

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

      onItemClicked: function(item) {
          // event.stopPropagation();
          this.props.removeSelectedItem(item); // ehm.
      },

      focus: function() {
          ReactDOM.findDOMNode(this.refs.input).focus();
      },

      onEntryBoxClicked: function() {
         this.focus();
      },

      render: function() {
          var that = this;
          var items = this.props.items.map(function(item) {
              return React.createElement("a", {key: item.id, 
                         className: "selectedItem ui label transition "}, item.displayText, React.createElement("i", {className: "delete icon", onClick: that.onItemClicked.bind(null, item)}));
          });
          return (
              React.createElement("div", {className: "entryBox  ui fluid search dropdown selection multiple", 
                  onClick: this.onEntryBoxClicked}, 
                  items, 
                  React.createElement("input", {className: "search", onChange: this.handleInputChange, 
                             onKeyDown: this.onKeyDown, 
                             value: this.props.text, 
                             ref: 'input'})
              )
          );
      }
  });

}(React, ReactDOM, module));

},{}],5:[function(require,module,exports){
(function(React, module) {
  var App = require('./components/app.jsx');

  ReactDOM.render(
      React.createElement(App, null),
      document.getElementById('content'));
}(React, module));

},{"./components/app.jsx":2}]},{},[5])