import _ from 'lodash';
import reselect from 'reselect';
import Ember from 'ember';

const { createSelector } = reselect;

const initialState = {
  filter: undefined,
  all: undefined,
  configs: {
    allowedCards: ['Visa', 'MasterCard'],
    cards: [
      {
        niceType: "Visa",
        type: 'vi',
        image: "https://cdn.rawgit.com/McCallTech/CDS-Payments-Widget/master/src/images/visa.png",

      },
      {
        niceType: "MasterCard",
        type: 'mc',
        image: "https://cdn.rawgit.com/McCallTech/CDS-Payments-Widget/master/src/images/mastercard.png",
      },
      {
        niceType: "AmericanExpress",
        type: '',
        image: 'https://cdn.rawgit.com/McCallTech/CDS-Payments-Widget/master/src/images/americanexpress.png'
      },
      {
        niceType: "DiscoverCard",
        image: 'https://cdn.rawgit.com/McCallTech/CDS-Payments-Widget/master/src/images/discover.png'
      },
      {
        niceType: "DinnersClub",
        image: 'https://cdn.rawgit.com/McCallTech/CDS-Payments-Widget/master/src/images/dinersclub.png'
      },
      {
        niceType: "JCB",
        image: 'https://cdn.rawgit.com/McCallTech/CDS-Payments-Widget/master/src/images/credit_card.png'
      }
    ],
    cardInfo: {
      number: {
        placeholder: 'Card Number',
        name: 'number',
      },
      name: {
        placeholder: 'Name on Credit Card',
        name: 'name'
      },
      expiry: {
        placeholder: 'Expiration Date (MM/YY)',
        name: 'expiry'
      },
      cvc: {
        placeholder: 'CVC',
        name: 'cvc'
      }
    },
    billMe: false,
    credit: true,
    yourWallet: false,
    payWith: false,
    ccNumber: '',
    demo: false,
    responseCode: '',
    CVVValidationMessage: ''
  }
};

export default function posts(state, action) {
  switch (action.type) {
    case 'POSTS:FETCH_API': {
      //  const children = action.payload.data.children.map(child => child.data);
      //  const all = _.keyBy(children, post => post.id);
      //  const retState = Object.assign(
      //    state,
      //  )
      //  console.log('POSTS:FETCH_API')
      //  console.log({ state })
      //   console.log({ retState });
      logme('POSTS:FETCH_API')
      //return retState;
      return state;
    }
    case 'POSTS:FILTER_POSTS': {
      logme('POSTS:FILTER_POSTS')
      if (state.filter === action.author) {
        return {
          ...state,
          filter: undefined
        }
      }
      return {
        ...state,
        filter: action.author
      }
    }
    case 'myAction': {
      logme('case myAction')
      console.log('\n\n\naction:', action)
      console.log('state:', state)
      const stateToRet = Object.assign({}, state, ...{configs: { cardInfo: { [action.m[0]]: action.m[1] } } });
      console.log('\n\n\n stateToRet', stateToRet)
      return stateToRet;
    }

    default: {
      logme('default')
      return state || initialState;
    }
  }
}

const all = state => state.posts.configs;
const filter = state => state.posts.filter;

export const filterPosts = createSelector(
  all,
  filter,
  (all, filter) => {
    return _.omitBy(all, post => {
      return filter === undefined ? false : post.author !== filter;
    });
  }
);

const logme = m => console.log(m);
