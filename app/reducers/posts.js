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
    cardInfo: [
      {
        placeholder: 'Card Number',
        value: 'creditCard.number',
        name: 'number',
      },
      Ember.Object.create({
        placeholder: 'Name on Credit Card',
        value: 'creditCard.name',
        name: 'name'
      }),
      {
        placeholder: 'Expiration Date (MM/YY)',
        value: 'creditCard.expiration',
        name: 'expiry'
      },
      {
        label: 'CVV'
      }

    ],
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
      logme('myAction');
      //logme({ state });
      //logme({ action });
      return state;
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
