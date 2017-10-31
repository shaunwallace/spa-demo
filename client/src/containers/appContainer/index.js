import Preact, { h, Component } from 'preact';
import { connect } from 'preact-redux';

class AppContainer extends Component {

  componentDidMount() {
    // this.props.initialize();
  }

  render() {
    return (
      <main>
        Test
      </main>
    );
  }
}

const mapStateToProps = state => ({
  appState: state.appState
});

const mapDispatchToProps = dispatch => ({
  initialize: () => dispatch(),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
