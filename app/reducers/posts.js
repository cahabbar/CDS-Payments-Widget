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
  DinersClub: false,
  JCB: false,
  CVC: true,
  nameOnCard: true,
  billMeToggle: false,
  billMe: false,
  credit: true,
  wallet: false,
  AlternativePayments: false,
  newConfigName: {
    name: 'newConfigName',
    value: 'Default Config'
  },
  savedConfigs: {
    "VISA, MasterCard, American Express, Discover": {
      name: "VISA, MasterCard, American Express, Discover",
      Visa: true,
      MasterCard: true,
      AmericanExpress: true,
      DiscoverCard: true,
      DinersClub: false,
      JCB: false,
      CVC: true,
      nameOnCard: true,
      billMeToggle: false,
      billMe: false,
      credit: true,
      wallet: false,
      AlternativePayments: false,
    },
    "VISA, MasterCard, American Express": {
      name: "VISA, MasterCard, American Express",
      Visa: true,
      MasterCard: true,
      AmericanExpress: true,
      DiscoverCard: false,
      DinersClub: false,
      JCB: false,
      CVC: true,
      nameOnCard: true,
      billMeToggle: false,
      billMe: false,
      credit: true,
      wallet: false,
      AlternativePayments: false,
    },
    "VISA, MasterCard, Discover": {
      name: "VISA, MasterCard, Discover",
      Visa: true,
      MasterCard: true,
      AmericanExpress: false,
      DiscoverCard: true,
      DinersClub: false,
      JCB: false,
      CVC: true,
      nameOnCard: true,
      billMeToggle: false,
      billMe: false,
      credit: true,
      wallet: false,
      AlternativePayments: false,
    },
    "VISA, MasterCard, American Express, Discover, Bill-me": {
      name: "VISA, MasterCard, American Express, Discover, Bill-me",
      Visa: true,
      MasterCard: true,
      AmericanExpress: true,
      DiscoverCard: true,
      DinersClub: false,
      JCB: false,
      CVC: true,
      nameOnCard: true,
      billMeToggle: true,
      billMe: false,
      credit: true,
      wallet: false,
      AlternativePayments: false,
    },
    "VISA, MasterCard, American Express, Bill-me": {
      name: "VISA, MasterCard, American Express, Bill-me",
      Visa: true,
      MasterCard: true,
      AmericanExpress: true,
      DiscoverCard: false,
      DinersClub: false,
      JCB: false,
      CVC: true,
      nameOnCard: true,
      billMeToggle: true,
      billMe: false,
      credit: true,
      wallet: false,
      AlternativePayments: false,
    },
    "VISA, MasterCard, Discover, Bill-me": {
      name: "VISA, MasterCard, Discover, Bill-me",
      Visa: true,
      MasterCard: true,
      AmericanExpress: false,
      DiscoverCard: true,
      DinersClub: false,
      JCB: false,
      CVC: true,
      nameOnCard: true,
      billMeToggle: true,
      billMe: false,
      credit: true,
      wallet: false,
      AlternativePayments: false,
    },

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
      DinersClub: {
        niceType: "DinersClub",
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
        value: ''
      },
      name: {
        placeholder: 'Name on Credit Card',
        name: 'name',
        value: ''
      },
      expiry: {
        placeholder: 'Expiration Date (MM/YY)',
        name: 'expiry',
        value: ''
      },
      cvc: {
        placeholder: 'CVC',
        name: 'cvc',
        value: ''
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
      //logme('POSTS:FETCH_API')
      //return retState;
      return state;
    }
    case 'POSTS:FILTER_POSTS': {
      //logme('POSTS:FILTER_POSTS')
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
      //cdsEncryption();
      //console.log(
      //  '\nccnumber',
      //  //window.CDS.cdsProcess.call(jQuery('input[id = "cc-number"]')[0], ["jjjjj",'kkk']),
      //  '\nccnumber'
      //)
      //if (jQuery('input[id = "cc-number"]')[0].value.length <= 16){
      //  jQuery('#cipher')[0].value = ''
      //  jQuery('#cardType')[0].value = ''
      //  jQuery('#responseCode')[0].value = ''

      //}
      //if (jQuery('input[id = "cc-number"]')[0].value.length == 1) {
      //  console.log('\nhere')
      //  jQuery('#cc-number')[0].setAttribute('data-cds', 'ccNumber')
      //  window.CDS.cdsProcess.call(jQuery('input[id = "cc-number"]')[0], "formatCardNumber")
      //}

      //console.log('\n\n\nmyAction', action.m[0], action.m[1], '\n\n\nmyAction')
      const stateToRet = Object.assign({}, state, ...{
        configs: {
          cardInfo: {
            [action.m[0]]: action.m[1],
          }
        }
      });
      //console.log('\n\n\n stateToRet', action.m[0], action.m[1], '\n\n\nstate')
      return stateToRet;
    }
    case 'toggle': {
      //logme('case toggle', action, state)
      const stateToRet = Object.assign({}, state, { [action.m[0]]: !action.m[1] });
      //logme('case toggle stateToRet', stateToRet)
      return stateToRet;
    }

    case 'selectConfig': {
      //logme('case setSelectedConfig', action, state)
      const stateToRet = Object.assign({},
        state,
        { 'selectedConfig': action.m[0] },
        { Visa: state.savedConfigs[action.m[0]]['Visa'] },
        { MasterCard: state.savedConfigs[action.m[0]]['MasterCard'] },
        { AmericanExpress: state.savedConfigs[action.m[0]]['AmericanExpress'] },
        { DiscoverCard: state.savedConfigs[action.m[0]]['DiscoverCard'] },
        { DinersClub: state.savedConfigs[action.m[0]]['DinersClub'] },
        { JCB: state.savedConfigs[action.m[0]]['JCB'] },
        { CVC: state.savedConfigs[action.m[0]]['CVC'] },
        { nameOnCard: state.savedConfigs[action.m[0]]['nameOnCard'] },
        { billMeToggle: state.savedConfigs[action.m[0]]['billMeToggle'] },
        { billMe: state.savedConfigs[action.m[0]]['billMe'] },
        { credit: state.savedConfigs[action.m[0]]['credit'] },
        { wallet: state.savedConfigs[action.m[0]]['wallet'] },
        { AlternativePayments: state.savedConfigs[action.m[0]]['AlternativePayments'] },
        { 'flippy': 'whippy' },
        {
          newConfigName: {
            name: action.m[0],
            value: action.m[0],
          }
        }
      );
      //logme('case toggle stateToRet', stateToRet)
      return stateToRet;
    }
    case 'saveNewConfigName': {
      const { newConfigName } = state;
      //logme('case saveNewConfigName', action, state, newConfigName)
      const stateToRet = ({
        ...state,
        ...{
          [newConfigName.name]: {
            name: newConfigName.name,
            value: newConfigName.value
          }
        }
      });
      //logme('case toggle stateToRet', stateToRet)
      return stateToRet;
    }
    case 'saveNewConfig': {
      //logme('case saveNewConfig', action, state)
      const { savedConfigs, Visa, MasterCard, AmericanExpress, DiscoverCard, DinersClub, JCB, CVC, nameOnCard, billMeToggle,
        billMe, credit, wallet, AlternativePayments, } = state;
      const stateToRet = ({
        ...state,
        ...{
          savedConfigs: {
            ...savedConfigs,
            ...{
              [action.m[0]]: {
                name: action.m[0], Visa, MasterCard, AmericanExpress, DiscoverCard, DinersClub,
                JCB, CVC, nameOnCard, billMeToggle, billMe, credit, wallet, AlternativePayments,
              }
            }
          }
        }
      });
      //logme('case toggle stateToRet', stateToRet)
      return stateToRet;
    }
    default: {
      //logme('default')
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
