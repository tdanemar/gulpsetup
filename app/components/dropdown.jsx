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
              return <li onClick={that.onItemClicked.bind(null, item)}
                         key={item.id}
                         className={that.state.focusedItem && that.state.focusedItem.id===item.id ? "hover" : ""}
                         onMouseOver={that.onItemMouseOver.bind(null, item)}
                         onMouseOut={that.onItemMouseOut}>{item.displayText}</li>;
          });

          // if the previously focused item is not in the list currently being shown (e.g. after filtering), clear the focusedItem
          if (this.props.data.indexOf(this.state.focusedItem) === -1) {
              this.state.focusedItem = null;
          }

          return <ul className='autoCompleteDropdown' ref={'ul'}>{listItems}</ul>;
      }
  });

}(React, module));
