import _ from 'lodash';
import reselect from 'reselect';
import rest from 'ember-data/adapters/rest';

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
  responseMessage:'',
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
      billMeToggle: true,
      billMe: false,
      credit: true,
      wallet: false,
      AlternativePayments: false,
    },

    "VISA, MasterCard, American Express, Discover, CVV": {
      name: "VISA, MasterCard, American Express, Discover, CVV",
      Visa: true,
      MasterCard: true,
      AmericanExpress: true,
      DiscoverCard: true,
      DinersClub: false,
      JCB: false,
      CVC: true,
      billMeToggle: false,
      billMe: false,
      credit: true,
      wallet: false,
      AlternativePayments: false,
      CVV: true,
    },
    "VISA, MasterCard, American Express, CVV": {
      name: "VISA, MasterCard, American Express, CVV",
      Visa: true,
      MasterCard: true,
      AmericanExpress: true,
      DiscoverCard: false,
      DinersClub: false,
      JCB: false,
      CVC: true,
      billMeToggle: false,
      billMe: false,
      credit: true,
      wallet: false,
      AlternativePayments: false,
      CVV: true,
    },
    "VISA, MasterCard, Discover, CVV": {
      name: "VISA, MasterCard, Discover, CVV",
      Visa: true,
      MasterCard: true,
      AmericanExpress: false,
      DiscoverCard: true,
      DinersClub: false,
      JCB: false,
      CVC: true,
      billMeToggle: false,
      billMe: false,
      credit: true,
      wallet: false,
      AlternativePayments: false,
      CVV: true,
    },
    "VISA, MasterCard, American Express, Discover, Bill-me, CVV": {
      name: "VISA, MasterCard, American Express, Discover, Bill-me, CVV",
      Visa: true,
      MasterCard: true,
      AmericanExpress: true,
      DiscoverCard: true,
      DinersClub: false,
      JCB: false,
      CVC: true,
      billMeToggle: true,
      billMe: false,
      credit: true,
      wallet: false,
      AlternativePayments: false,
      CVV: true,
    },
    "VISA, MasterCard, American Express, Bill-me, CVV": {
      name: "VISA, MasterCard, American Express, Bill-me, CVV",
      Visa: true,
      MasterCard: true,
      AmericanExpress: true,
      DiscoverCard: false,
      DinersClub: false,
      JCB: false,
      CVC: true,
      billMeToggle: true,
      billMe: false,
      credit: true,
      wallet: false,
      AlternativePayments: false,
      CVV: true,
    },
    "VISA, MasterCard, Discover, Bill-me, CVV": {
      name: "VISA, MasterCard, Discover, Bill-me, CVV",
      Visa: true,
      MasterCard: true,
      AmericanExpress: false,
      DiscoverCard: true,
      DinersClub: false,
      JCB: false,
      CVC: true,
      billMeToggle: true,
      billMe: false,
      credit: true,
      wallet: false,
      AlternativePayments: false,
      CVV: true,
    },

    "VISA, MasterCard, American Express, Discover, AVS": {
      name: "VISA, MasterCard, American Express, Discover, AVS",
      Visa: true,
      MasterCard: true,
      AmericanExpress: true,
      DiscoverCard: true,
      DinersClub: false,
      JCB: false,
      billMeToggle: false,
      billMe: false,
      credit: true,
      wallet: false,
      AlternativePayments: false,
      AVS: true,
    },
    "VISA, MasterCard, American Express, AVS": {
      name: "VISA, MasterCard, American Express, AVS",
      Visa: true,
      MasterCard: true,
      AmericanExpress: true,
      DiscoverCard: false,
      DinersClub: false,
      JCB: false,
      billMeToggle: false,
      billMe: false,
      credit: true,
      wallet: false,
      AlternativePayments: false,
      AVS: true,
    },
    "VISA, MasterCard, Discover, AVS": {
      name: "VISA, MasterCard, Discover, AVS",
      Visa: true,
      MasterCard: true,
      AmericanExpress: false,
      DiscoverCard: true,
      DinersClub: false,
      JCB: false,
      billMeToggle: false,
      billMe: false,
      credit: true,
      wallet: false,
      AlternativePayments: false,
      AVS: true,
    },
    "VISA, MasterCard, American Express, Discover, Bill-me, AVS": {
      name: "VISA, MasterCard, American Express, Discover, Bill-me, AVS",
      Visa: true,
      MasterCard: true,
      AmericanExpress: true,
      DiscoverCard: true,
      DinersClub: false,
      JCB: false,
      billMeToggle: true,
      billMe: false,
      credit: true,
      wallet: false,
      AlternativePayments: false,
      AVS: true,
    },
    "VISA, MasterCard, American Express, Bill-me, AVS": {
      name: "VISA, MasterCard, American Express, Bill-me, AVS",
      Visa: true,
      MasterCard: true,
      AmericanExpress: true,
      DiscoverCard: false,
      DinersClub: false,
      JCB: false,
      billMeToggle: true,
      billMe: false,
      credit: true,
      wallet: false,
      AlternativePayments: false,
      AVS: true,
    },
    "VISA, MasterCard, Discover, Bill-me, AVS": {
      name: "VISA, MasterCard, Discover, Bill-me, AVS",
      Visa: true,
      MasterCard: true,
      AmericanExpress: false,
      DiscoverCard: true,
      DinersClub: false,
      JCB: false,
      billMeToggle: true,
      billMe: false,
      credit: true,
      wallet: false,
      AlternativePayments: false,
      AVS: true,
    },





    "VISA, MasterCard, American Express, Discover, CVV, AVS": {
      name: "VISA, MasterCard, American Express, Discover, CVV, AVS",
      Visa: true,
      MasterCard: true,
      AmericanExpress: true,
      DiscoverCard: true,
      DinersClub: false,
      JCB: false,
      CVC: true,
      billMeToggle: false,
      billMe: false,
      credit: true,
      wallet: false,
      AlternativePayments: false,
      CVV: true,
    },
    "VISA, MasterCard, American Express, CVV, AVS": {
      name: "VISA, MasterCard, American Express, CVV, AVS",
      Visa: true,
      MasterCard: true,
      AmericanExpress: true,
      DiscoverCard: false,
      DinersClub: false,
      JCB: false,
      CVC: true,
      billMeToggle: false,
      billMe: false,
      credit: true,
      wallet: false,
      AlternativePayments: false,
      CVV: true,
    },
    "VISA, MasterCard, Discover, CVV, AVS": {
      name: "VISA, MasterCard, Discover, CVV, AVS",
      Visa: true,
      MasterCard: true,
      AmericanExpress: false,
      DiscoverCard: true,
      DinersClub: false,
      JCB: false,
      CVC: true,
      billMeToggle: false,
      billMe: false,
      credit: true,
      wallet: false,
      AlternativePayments: false,
      CVV: true,
    },
    "VISA, MasterCard, American Express, Discover, Bill-me, CVV, AVS": {
      name: "VISA, MasterCard, American Express, Discover, Bill-me, CVV, AVS",
      Visa: true,
      MasterCard: true,
      AmericanExpress: true,
      DiscoverCard: true,
      DinersClub: false,
      JCB: false,
      CVC: true,
      billMeToggle: true,
      billMe: false,
      credit: true,
      wallet: false,
      AlternativePayments: false,
      CVV: true,
    },
    "VISA, MasterCard, American Express, Bill-me, CVV, AVS": {
      name: "VISA, MasterCard, American Express, Bill-me, CVV, AVS",
      Visa: true,
      MasterCard: true,
      AmericanExpress: true,
      DiscoverCard: false,
      DinersClub: false,
      JCB: false,
      CVC: true,
      billMeToggle: true,
      billMe: false,
      credit: true,
      wallet: false,
      AlternativePayments: false,
      CVV: true,
    },
    "VISA, MasterCard, Discover, Bill-me, CVV, AVS": {
      name: "VISA, MasterCard, Discover, Bill-me, CVV, AVS",
      Visa: true,
      MasterCard: true,
      AmericanExpress: false,
      DiscoverCard: true,
      DinersClub: false,
      JCB: false,
      CVC: true,
      billMeToggle: true,
      billMe: false,
      credit: true,
      wallet: false,
      AlternativePayments: false,
      CVV: true,
    },
  },
  configs: {
    cards: {
      Visa: {
        niceType: "Visa",
        type: 'vi',
        image: "images/visa.png",
      },
      MasterCard: {
        niceType: "MasterCard",
        type: 'mc',
        image: "images/mastercard.png",
      },
      AmericanExpress: {
        niceType: "AmericanExpress",
        type: '',
        image: 'images/americanexpress.png'
      },
      DiscoverCard: {
        niceType: "DiscoverCard",
        image: 'images/discover.png'
      },
      DinersClub: {
        niceType: "DinersClub",
        image: 'images/dinersclub.png'
      },
      JCB: {
        niceType: "JCB",
        image: 'images/credit_card.png'
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
        placeholder: 'CVV',
        name: 'cvc',
        value: ''
      }
    },
    responseMessage:{
      value: ''
    },
  }
};

export default function posts(state, action) {
  switch (action.type) {
    case 'POSTS:FILTER_POSTS': {
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
    case 'touched': {
      const { configs } = state;
      const { cardInfo } = configs;
      const update = cardInfo[action.m[0]]

      const stateToRet = {
        ...state,
        ...{
          configs: {
            ...configs,
            cardInfo: {
              ...cardInfo,
              ...{
                [action.m[0]]: {
                  ...update,
                  value: action.m[2].target.value,
                  touched: true
                }
              }
            }
          }
        }
      }
      return stateToRet;
    }
    case 'myAction': {

      const { configs } = state;
      const { cardInfo } = configs;
      const update = cardInfo[action.m[0]]

      const stateToRet = {
        ...state,
        ...{
          configs: {
            ...configs,
            cardInfo: {
              ...cardInfo,
              ...{
                [action.m[0]]: {
                  ...update,
                  value: action.m[2].target.value,
                }
              }
            }
          }
        }
      }
      return stateToRet;
    }
    case 'toggle': {
      return {
        ...state,
        ...{ [action.m[0]]: !action.m[1] }
      };
    }

    case 'selectConfig': {
      const stateToRet = {
        ...state,
        ...{ 'selectedConfig': action.m[0] },
        ...{ Visa: state.savedConfigs[action.m[0]]['Visa'] },
        ...{ MasterCard: state.savedConfigs[action.m[0]]['MasterCard'] },
        ...{ AmericanExpress: state.savedConfigs[action.m[0]]['AmericanExpress'] },
        ...{ DiscoverCard: state.savedConfigs[action.m[0]]['DiscoverCard'] },
        ...{ DinersClub: state.savedConfigs[action.m[0]]['DinersClub'] },
        ...{ JCB: state.savedConfigs[action.m[0]]['JCB'] },
        ...{ CVC: state.savedConfigs[action.m[0]]['CVC'] },
        ...{ nameOnCard: state.savedConfigs[action.m[0]]['nameOnCard'] },
        ...{ billMeToggle: state.savedConfigs[action.m[0]]['billMeToggle'] },
        ...{ billMe: state.savedConfigs[action.m[0]]['billMe'] },
        ...{ credit: state.savedConfigs[action.m[0]]['credit'] },
        ...{ wallet: state.savedConfigs[action.m[0]]['wallet'] },
        ...{ AlternativePayments: state.savedConfigs[action.m[0]]['AlternativePayments'] },
        ...{ 'flippy': 'whippy' },
        ...{
          newConfigName: {
            name: action.m[0],
            value: action.m[0],
          }
        }
      };
      return stateToRet;
    }
    case 'saveNewConfigName': {
      const { newConfigName } = state;
      const stateToRet = ({
        ...state,
        ...{
          [newConfigName.name]: {
            name: newConfigName.name,
            value: newConfigName.value
          }
        }
      });
      return stateToRet;
    }
    case 'submiter': {

      const { configs } = state;
      const { cardInfo } = configs;
      // responseCode = '',
   
      console.log("Value of CDS.cdsProcess.cdsResponse "
        + CDS.cdsProcess.cdsResponse.respCode + " "
        + CDS.cdsProcess.cdsResponse.cardType + " "
        + CDS.cdsProcess.cdsResponse.cipher);
      if (CDS.cdsProcess.cdsResponse.respCode == "100") {

        var { configs } = state;


       
        const retObject = Ember.$.ajax({
          // url: 'http://localhost:8000/authorize',
          url: 'https://qa-cps.buysub.com:8000/authorize',
          type: 'POST',
          crossDomain: true,
          // headers: {
          //   'Access-Control-Allow-Origin': '*'
          // },
          contentType: 'application/json;charset=utf-8',
          dataType: 'json',
          data: JSON.stringify({
            systemID: "CPS",
            TokenizeAccountNumber: "1",
            Amount: "100",
            clientCompanyID: "MAG1",
            merchantID: "020594",
            apiPassword: "Apple016",
            apiUserName: "CPSTest",
            transactionType: "7",
            pmType: "EN",
            countryCode: "US",
            actionCode: "AU",
            MerchantOrderID: "TESTPWAU000010",
            pmExpirationDate: cardInfo.expiry.value,
            currencyCode: "840",
            gatewayID: "TESTPWAU000001",
            pmAccountNumber: CDS.cdsProcess.cdsResponse.cipher,
            encryptionFlag: "CDS",
            cid: cardInfo.cvc.value,
            AZ: {
              pmZip: "68123"
            },

          })
        }).then((response) =>{
              console.log("CPSRealTimeAPI response: "
              + JSON.stringify(response));
              console.log(" response state  "+state.configs.responseMessage.value);
              const stateToRet = {
            
                ...state,
                ...{
                  configs: {
                    ...configs,
      
                      ...{
                        responseMessage: {
                         
                          value: `Card Information`,
                        }
                      }
      
                  }
                }
              }
              return stateToRet;
            
         
         
          })
          // .catch(function(error) {
          //   console.log(error);
          // })

          // success: function (response) {

          // //  configs.responseMessage = `responseCode: `,+ response.responseCode +' '+ 'avsResponse: '
          // //             + response.avsResponse,
      
          //  // state = stateToRet
          //   console.log("CPSRealTimeAPI response: "
          //     + JSON.stringify(response));
          //   console.log("responseCode: "
          //     + response.responseCode);
          //   console.log("avsResponse: "
          //     + response.avsResponse);
              
          //   $("#responseMessage").empty();
          //   $("#responseMessage").append($(response.avsResponse));
          // },
          // error: function (jqXHR, textStatus, errorThrown) {
          //   alert("You can not send Cross Domain AJAX requests: " + errorThrown.value);
          // }
      // });
      console.log("retObject response: "
      + JSON.stringify(retObject));

      return retObject;
   
    }else{
     // console.log("state  "+ initialState.configs.touched);
          const stateToRet = {
            
            ...state,
            ...{
              configs: {
                ...configs,

                  ...{
                    responseMessage: {
                     
                      value: `Invalid Card Information`,
                    }
                  }

              }
            }
          }
          return stateToRet;
   }

      return {
        ...state,
      };
    }
    case 'saveNewConfig': {
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
      return stateToRet;
    }
    default: {
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