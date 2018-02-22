import { connect } from 'ember-redux';
import { filterPosts } from '../reducers/posts';



const filteredPostsBool = state => filterPosts(state);

const stateToComputed = state => {

  const {
    AmericanExpress,
    CVC,
    DinnersClub,
    DiscoverCard,
    JCB,
    MasterCard,
    Visa,
    billMe,
    billMeToggle,
    nameOnCard,
    payWith,
    savedConfigs,
    selectedConfig,
    wallet,
   } = state.posts;

  return {
    configs: {
      ...filteredPostsBool(state),
    },
    Visa,
    MasterCard,
    AmericanExpress,
    DiscoverCard,
    DinnersClub,
    JCB,
    CVC,
    nameOnCard,
    wallet,
    payWith,
    billMeToggle,
    billMe,
    savedConfigs,
    selectedConfig,
  }
}

const dispatchToActions = dispatch => {
  return {
    filterWith: (author) => dispatch({ type: 'POSTS:FILTER_POSTS', author }),
    myAction: (...m) => {
      console.log('\n\nlogged myAction: ', m)
      dispatch({ type: 'myAction', m })
    },
    toggle: (...m) => {
      console.log('\n\nlogged toggle: ', m)
      //dispatch({ type: 'toggle', m })
      dispatch({ type: 'toggle', m })
    },
    setSelectedConfig: (...m) => {
      console.log('\n\nlogged selectConfig: ', m)
      dispatch({ type: 'selectConfig', m })
    }
  }
}

export default connect(stateToComputed, dispatchToActions)();
