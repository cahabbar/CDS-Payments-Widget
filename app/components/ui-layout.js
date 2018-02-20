import { connect } from 'ember-redux';
import { filterPosts } from '../reducers/posts';

const stateToComputed = state => {
  const retState = {
    posts: filterPosts(state),
    configs: filterPosts(state),
    filter: state.posts.filter,
  }
  console.log(state)
  console.log(retState)
  return retState;
}

const dispatchToActions = dispatch => {
  return {
    filterWith: (author) => dispatch({type: 'POSTS:FILTER_POSTS', author})
  }
}

export default connect(stateToComputed, dispatchToActions)();
