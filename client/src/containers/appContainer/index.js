import Preact, { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { connect } from 'preact-redux';
import { initialize, getSelectedCompany, getSelectedChild } from 'Actions';
import Sidebar from 'Components/sidebar';
import ItemList from 'Components/itemList';
import Table from 'Components/table';

class AppContainer extends Component {

  static propTypes = {
    companyNames: PropTypes.array,
    activeCompany: PropTypes.shape({
      updated: PropTypes.string,
      created: PropTypes.string,
      children: PropTypes.arrayOf(PropTypes.object),
      id: PropTypes.string,
      name: PropTypes.string
    })
  }

  static defaultProps = {
    companyNames: [],
    activeCompany: null
  }

  componentDidMount() {
    this.props.initialize();
  }

  render() {
    const {
      companyNames,
      activeParent,
      activeCompany,
      getSelectedCompany,
      getSelectedChild 
    } = this.props;

    return (
      <main>
        <Sidebar>
          <ItemList
            items={companyNames}
            activeItem={activeParent && activeParent.id}
            idProp="id"
            onClick={id => getSelectedCompany(id) }
          />
        </Sidebar>
        { activeCompany ? <Table data={activeCompany} onClick={id => getSelectedChild(id) } /> :
          <div className="table-placeholder">
            <h2>Please selected a company</h2>
          </div>
        }
      </main>
    );
  }
}

const mapStateToProps = state => ({
  companyNames: state.appState.companyNames,
  activeCompany: state.appState.activeCompany,
  activeParent: state.appState.activeParent,
});

const mapDispatchToProps = dispatch => ({
  initialize: () => dispatch(initialize()),
  getSelectedCompany: id => dispatch(getSelectedCompany(id)),
  getSelectedChild: id => dispatch(getSelectedChild(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
