import _ from 'lodash';
import reselect from 'reselect';

const { createSelector } = reselect;

const initialState = {
  filter: undefined,
  all: undefined,
  ccNumber: '',
  demo: false,
  responseCode: '',
  CVVValidationMessage: '',
  Visa: true,
  MasterCard: true,
  AmericanExpress: true,
  DiscoverCard: true,
  DinnersClub: true,
  JCB: true,
  CVC: true,
  nameOnCard: true,
  billMeToggle: true,
  billMe: false,
  credit: true,
  wallet: true,
  payWith: true,
  savedConfigs: {
    Default: {
      name: "Default",
      Visa: true,
      MasterCard: true,
      AmericanExpress: true,
      DiscoverCard: true,
      DinnersClub: true,
      JCB: true,
      CVC: true,
      nameOnCard: true,
      billMeToggle: true,
      billMe: false,
      credit: true,
      wallet: true,
      payWith: true,
    },
    Minimum: {
      name: "Minimum",
      Visa: false,
      MasterCard: false,
      AmericanExpress: false,
      DiscoverCard: false,
      DinnersClub: false,
      JCB: false,
      CVC: false,
      nameOnCard: false,
      billMeToggle: false,
      billMe: false,
      credit: false,
      wallet: false,
      payWith: false,
    },
    All: {
      name: "All",
      Visa: true,
      MasterCard: true,
      AmericanExpress: true,
      DiscoverCard: true,
      DinnersClub: true,
      JCB: true,
      CVC: true,
      nameOnCard: true,
      billMeToggle: true,
      billMe: true,
      credit: true,
      wallet: true,
      payWith: true,
    }
  },
  configs: {
    cards: {
      Visa: {
        niceType: "Visa",
        type: 'vi',
        image: "https://cdn.rawgit.com/McCallTech/CDS-Payments-Widget/master/src/images/visa.png",
      },
      MasterCard: {
        niceType: "MasterCard",
        type: 'mc',
        image: "https://cdn.rawgit.com/McCallTech/CDS-Payments-Widget/master/src/images/mastercard.png",
      },
      AmericanExpress: {
        niceType: "AmericanExpress",
        type: '',
        image: 'https://cdn.rawgit.com/McCallTech/CDS-Payments-Widget/master/src/images/americanexpress.png'
      },
      DiscoverCard: {
        niceType: "DiscoverCard",
        image: 'https://cdn.rawgit.com/McCallTech/CDS-Payments-Widget/master/src/images/discover.png'
      },
      DinnersClub: {
        niceType: "DinnersClub",
        image: 'https://cdn.rawgit.com/McCallTech/CDS-Payments-Widget/master/src/images/dinersclub.png'
      },
      JCB: {
        niceType: "JCB",
        image: 'https://cdn.rawgit.com/McCallTech/CDS-Payments-Widget/master/src/images/credit_card.png'
      }
    },
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
      const stateToRet = Object.assign({}, state, ...{ configs: { cardInfo: { [action.m[0]]: action.m[1] } } });
      return stateToRet;
    }
    case 'toggle': {
      logme('case toggle', action, state)
      const stateToRet = Object.assign({}, state, { [action.m[0]]: !action.m[1] });
      logme('case toggle stateToRet', stateToRet)
      return stateToRet;
    }

    case 'selectConfig': {
      logme('case setSelectedConfig', action, state)
      const stateToRet = Object.assign({},
        state,
        { 'selectedConfig': action.m[0] },
        { Visa: state.savedConfigs[action.m[0]]['Visa'] },
        { MasterCard: state.savedConfigs[action.m[0]]['MasterCard'] },
        { AmericanExpress: state.savedConfigs[action.m[0]]['AmericanExpress'] },
        { DiscoverCard: state.savedConfigs[action.m[0]]['DiscoverCard'] },
        { DinnersClub: state.savedConfigs[action.m[0]]['DinnersClub'] },
        { JCB: state.savedConfigs[action.m[0]]['JCB'] },
        { CVC: state.savedConfigs[action.m[0]]['CVC'] },
        { nameOnCard: state.savedConfigs[action.m[0]]['nameOnCard'] },
        { billMeToggle: state.savedConfigs[action.m[0]]['billMeToggle'] },
        { billMe: state.savedConfigs[action.m[0]]['billMe'] },
        { credit: state.savedConfigs[action.m[0]]['credit'] },
        { wallet: state.savedConfigs[action.m[0]]['wallet'] },
        { payWith: state.savedConfigs[action.m[0]]['payWith'] },
        { 'flippy': 'whippy' }
      );
      logme('case toggle stateToRet', stateToRet)
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

const logme = (...m) => console.log(...m);
