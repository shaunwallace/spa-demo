import Preact, { h, Component } from 'preact';
import PropTypes from 'prop-types';
import noop from 'Utils/noop';
import isObject from 'Utils/isObject';
import './itemList.scss'

export default class ItemList extends Component {
  static propTypes = {
    items: PropTypes.array,
    activeItem: PropTypes.string,
    onClick: PropTypes.func,
    idProp: PropTypes.string
  }
  
  static defaultProps = {
    items: [],
    activeItem: '',
    onClick: noop,
    idProp: null
  }

  onClick = id => () => this.props.onClick(id)

  getKey = (instance, idProp) => isObject(instance) && idProp && instance[idProp] || instance

  render() {
    const { items, onClick, idProp, activeItem } = this.props;
    return (
      <ul>
        {
          items.map(item => {
            // optional support for iterating over an array of objects
            // with the ability to choose a different unique identifier
            // for use with the key prop and for lookup
            const id = this.getKey(item, idProp);
            return (
              <li
                key={id}
                className={`${item.id === activeItem ? 'active': ''}`}
                onClick={this.onClick(id)}
              >
                {item.name}
              </li>
            );
          })
        }
      </ul>
    );
  }
}
