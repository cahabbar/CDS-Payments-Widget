import { connect } from 'ember-redux';
import { filterPosts } from '../reducers/posts';



const filteredPostsBool = state => filterPosts(state);

const stateToComputed = state => {
  const retState = {
    configs: {
      ...filteredPostsBool(state),
    },
    Visa: state.posts.Visa,
    MasterCard: state.posts.MasterCard,
    AmericanExpress: state.posts.AmericanExpress,
    DiscoverCard: state.posts.DiscoverCard,
    DinnersClub: state.posts.DinnersClub,
    JCB: state.posts.JCB,
    CVC: state.posts.CVC,
    nameOnCard: state.posts.nameOnCard,
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
      dispatch({ type: 'toggle', m })
    }
  }
}

export default connect(stateToComputed, dispatchToActions)();
