(function(React, module, undefined) {
  
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

      render: function() {
          return (
              <div>
                 <input onChange={this.handleInputChange}
                        onKeyDown={this.onKeyDown}
                        value={this.props.text} />
              </div>
          );
      }
  });

}(React, module));
