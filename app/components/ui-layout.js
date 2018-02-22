import { connect } from 'ember-redux';
import { filterPosts } from '../reducers/posts';



const filteredPostsBool = state => filterPosts(state);

const stateToComputed = state => {

  const { selectedConfig, savedConfigs } = state.posts;
  //const getConfig = (attr) => selectedConfig ? savedConfigs.filter(config => config.name === selectedConfig)[0][attr] : state.posts[attr];//savedConfigs[0][attr];
  const getConfig = (attr) =>  selectedConfig ?state.posts[attr] :state.posts[attr];//savedConfigs[0][attr];
  const retState = {
    configs: {
      ...filteredPostsBool(state),
    },
    Visa:  getConfig('Visa'),
    MasterCard: getConfig('MasterCard'),
    AmericanExpress: getConfig('AmericanExpress'),
    DiscoverCard: getConfig('DiscoverCard'),
    DinnersClub: getConfig('DinnersClub'),
    JCB: getConfig('JCB'),
    CVC: getConfig('CVC'),
    nameOnCard: getConfig('nameOnCard'),
    wallet: getConfig('wallet'),
    payWith: getConfig('payWith'),
    billMeToggle: getConfig('billMeToggle'),
    billMe: state.posts.billMe,
    savedConfigs: state.posts.savedConfigs,
    selectedConfig: selectedConfig,
  }
  return retState;
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
