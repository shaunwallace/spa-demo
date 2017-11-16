import Preact, { h, Component } from 'preact';
import PropTypes from 'prop-types';
import FormattedDate from 'Components/date';
import noop from 'Utils/noop';
import isObject from 'Utils/isObject';

import './table.scss';

export default class ItemList extends Component {
  static propTypes = {
    data: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      updated: PropTypes.string,
      created: PropTypes.string,
      children: PropTypes.array
    }),
    onClick: PropTypes.func
  }
  
  static defaultProps = {
    data: {
      name: '',
      id: '',
      updated: '',
      created: '',
      children: []
    },
    onClick: noop
  }

  onClick = id => () => this.props.onClick(id)

  renderChildren = (children, nested) => {
    return children.map((child, i) => {
      const hasNested = nested.indexOf(child.id) !== -1 && child.children && child.children.length;
      return (
        <tr className={`${hasNested ? 'nested' : ''}`}>
          <div>
            <tr style={{ display: 'flex' }} onClick={this.onClick(child.id)}>
              <td>{child.name}</td>
              <td><FormattedDate dateString={child.created} /></td>
              <td><FormattedDate dateString={child.updated} /></td>
            </tr>
            {hasNested ?
              <table>
                <tbody>
                  {this.renderChildren(child.children, nested.slice(1))}
                </tbody>
              </table> : null
            }
          </div>
        </tr>
      );
    })
  }

  render() {
    const { name, updated, created, children = [] } = this.props.data;
    const { nested } = this.props;

    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Created</th>
              <th>Updated</th>
            </tr>
            <tr>
              <th>{name}</th>
              <th>
                <FormattedDate dateString={created} />
              </th>
              <th>
                <FormattedDate dateString={updated} />
              </th>
            </tr>
          </thead>
        </table>
        <div className="scrollable-table">
          <table>
            <tbody>
              {this.renderChildren(children, nested.slice(1))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
