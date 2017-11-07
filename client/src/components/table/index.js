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

  render() {
    const { name, updated, created, children = [] } = this.props.data;
    const createdDate = new Date(created);

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
                <Date dateString={created} />
              </th>
              <th>
                <Date dateString={updated} />
              </th>
            </tr>
          </thead>
        </table>
        <div className="scrollable-table">
          <table>
            <tbody>
              {
                children.map(child => {
                  return (
                    <tr onClick={this.onClick(child.id)}>
                      <td>{child.name}</td>
                      <td><Date dateString={created} /></td>
                      <td><Date dateString={updated} /></td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
