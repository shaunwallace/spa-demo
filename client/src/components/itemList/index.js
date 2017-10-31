import Preact, { h, Component } from 'preact';
import PropTypes from 'prop-types';
import noop from 'Utils/noop';
import isObject from 'Utils/isObject';

export default class ItemList extends Component {
  static propTypes = {
    items: PropTypes.array,
    onClick: PropTypes.func,
    idProp: PropTypes.string
  }
  
  static defaultProps = {
    items: [],
    onClick: noop,
    idProp: null
  }

  onClick = id => () => this.props.onClick(id)

  render() {
    const { items, onClick, idProp } = this.props;
    return (
      <ul>
        {
          items.map(item => {
            // optional support for iterating over an array of objects
            // with the ability to choose a different unique identifier
            const id = isObject(item) && idProp && item[idProp] || item;
            return <li key={id} onClick={this.onClick(id)}>{ item }</li>
          })
        }
      </ul>
    );
  }
}
