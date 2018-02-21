import { connect } from 'ember-redux';
import { filterPosts } from '../reducers/posts';



const filteredPostsBool = state => filterPosts(state);

const stateToComputed = state => {
  const retState = {
    posts: filterPosts(state),
    configs: {
      ...filteredPostsBool(state),
      cards: filteredPostsBool(state).cards.filter(card => filteredPostsBool(state).allowedCards.indexOf(card.niceType) >= 0),
    },
    filter: state.posts.filter,
  }
  return retState;
}

const dispatchToActions = dispatch => {
  return {
    filterWith: (author) => dispatch({ type: 'POSTS:FILTER_POSTS', author }),
    myAction: (...m) => {
      console.log('myAction','\n\n\n', {m})
      dispatch({ type: 'myAction', m})
    }
  }
}

export default connect(stateToComputed, dispatchToActions)();
