import Preact, { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { connect } from 'preact-redux';
import { initialize } from 'Actions';
import ItemList from 'Components/itemList';

class AppContainer extends Component {

  static propTypes = {
    companyNames: PropTypes.array
  }

  static defaultProps = {
    companyNames: []
  }

  componentDidMount() {
    this.props.initialize();
  }

  render() {
    return (
      <main>
        <ItemList items={this.props.companyNames} onClick={(id) => console.log(id) } />
      </main>
    );
  }
}

const mapStateToProps = state => ({
  companyNames: state.appState.companyNames
});

const mapDispatchToProps = dispatch => ({
  initialize: () => dispatch(initialize()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
