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
              return <li onClick={that.onItemClicked}
                         key={text}
                         className={that.state.focusedItem==text ? "hover" : ""}
                         onMouseOver={that.onItemMouseOver}
                         onMouseOut={that.onItemMouseOut}>{text}</li>;
          });

          // if the previously focused item is not in the list currently being shown, clear the focusedItem
          if (this.props.data.indexOf(this.state.focusedItem) === -1) {
              this.state.focusedItem = null;
          }

          return <ul className='autoCompleteDropdown' ref={'ul'}>{items}</ul>;
      }
  });

}(React, module));
