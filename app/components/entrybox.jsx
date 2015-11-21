(function(React, ReactDOM, module, undefined) {

  var KEYS = {
          BACKSPACE: 8,
          TAB: 9,
          ENTER: 13,
          ESCAPE: 27,
          ARROW_UP: 38,
          ARROW_DOWN: 40
      };

  module.exports = React.createClass({
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
              return <li key={item.id}
                         className="selectedItem">{item.displayText}<span onClick={that.onItemClicked.bind(null, item)}>[x]</span></li>;
          });
          return (
              <ul className="entryBox"
                  onClick={this.onEntryBoxClicked}>
                  {items}
                  <li>
                      <input onChange={this.handleInputChange}
                             onKeyDown={this.onKeyDown}
                             value={this.props.text}
                             ref={'input'} />
                  </li>

              </ul>
          );
      }
  });

}(React, ReactDOM, module));
