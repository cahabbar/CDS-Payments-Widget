import { connect } from 'ember-redux';
import { filterPosts } from '../reducers/posts';
import Ember from 'ember';
import cardNumber from 'src/card-number';
import expirationDate from 'src/expiration-date';
import validCvv from 'src/cvv';
import AjaxService from 'ember-ajax/services/ajax';
import { v1, v4 } from "ember-uuid";

const filteredPostsBool = state => filterPosts(state);

const stateToComputed = state => {

  const {
    AmericanExpress,
    CVC,
    DinersClub,
    DiscoverCard,
    JCB,
    MasterCard,
    Visa,
    billMe,
    billMeToggle,
    nameOnCard,
    AlternativePayments,
    savedConfigs,
    selectedConfig,
    wallet,
    newConfigName
  } = state.posts;

  const cardToggle = AmericanExpress || DinersClub || DiscoverCard || JCB || MasterCard || Visa;
  const widgetToggle = wallet || AlternativePayments || cardToggle;
  const filteredPostsBoolRes = filteredPostsBool(state);
  const cardCard = filteredPostsBoolRes.cardInfo;
  const cardCardNumber = cardCard.number;
  const numNoSpaces = cardCardNumber.value.replace(/ /g, "");
  const numberValidation = cardNumber(numNoSpaces);
  const expiration = cardCard.expiry.value
  const cvv = cardCard.cvc.value
  const acceptedCards = [
    Visa && 'visa',
    MasterCard && 'master-card',
    AmericanExpress && 'american-express',
    DiscoverCard && 'discover'
  ].filter(c => !!c)
  const numberValidationNotValid = (!!numberValidation.card && !numberValidation.isValid);
  const notValidOption = numberValidation.card && !(acceptedCards.indexOf(numberValidation.card.type) >= 0);
  const numberTouched = !!cardCardNumber.touched;
  const showNumberValidation = numberTouched && (numberValidationNotValid || notValidOption);
  const valid = {
    numNoSpaces,
    numberValidation,
    showNumberValidation,
    numberLengths: numberValidation.card ? numberValidation.card.lengths.toString() : '',
    cvvLengths: numberValidation.card ? numberValidation.card.code.size : '',
    nameWarning: numberValidation.card && !cardCard.name.value,
    expirationDateWarning: cardCard.expiry.touched && (numberValidation.card && !expirationDate(expiration).isValid),
    validExpiration: expirationDate(expiration),
    cvvWarning: numberValidation.card && !validCvv(cvv).isValid,
    billMeDisabled: !!numberValidation.card,
    notAcceptedCardsString: numberValidation.card && !(acceptedCards.indexOf(numberValidation.card.type) >= 0),
    demo: "display:none",
    visaStyle: !numberValidation.card || (numberValidation.card && numberValidation.card.type === 'visa') ? 'padding:0;' : 'padding:0;opacity: 0.4; filter: alpha(opacity=40);',
    masterStyle: !numberValidation.card || (numberValidation.card && numberValidation.card.type === 'master-card') ? 'padding:0;' : 'padding:0;opacity: 0.4; filter: alpha(opacity=40);',
    americanStyle: !numberValidation.card || (numberValidation.card && numberValidation.card.type === 'american-express') ? 'padding:0;' : 'padding:0;opacity: 0.4; filter: alpha(opacity=40);',
    discoverStyle: !numberValidation.card || (numberValidation.card && numberValidation.card.type === 'discover') ? 'padding:0;' : 'padding:0;opacity: 0.4; filter: alpha(opacity=40);',
  };
  const configs = { ...filteredPostsBoolRes, valid };
  return {
    configs,
    Visa,
    MasterCard,
    AmericanExpress,
    DiscoverCard,
    DinersClub,
    JCB,
    CVC,
    cardToggle,
    nameOnCard,
    wallet,
    AlternativePayments,
    billMeToggle,
    billMe: billMe && !numberValidation.card,
    savedConfigs,
    selectedConfig,
    newConfigName,
    widgetToggle
  }
}

const dispatchToActions = dispatch => {
  return {
    filterWith: (author) => dispatch({ type: 'POSTS:FILTER_POSTS', author }),
    myAction: (...m) => {
      dispatch({ type: 'myAction', m })
    },
    touched: (...m) => {
      dispatch({ type: 'touched', m })
    },
    toggle: (...m) => {
      dispatch({ type: 'toggle', m })
    },
    submiter: (m) => {
      console.log('\n component')
      console.log({ m })
      console.log({ stateToComputed })
      console.log('\n component')
      console.log("Value of CDS.cdsProcess.cdsResponse " + CDS.cdsProcess.cdsResponse.respCode + " " + CDS.cdsProcess.cdsResponse.cardType + " " + CDS.cdsProcess.cdsResponse.cipher);

      if (CDS.cdsProcess.cdsResponse.respCode == "100") {

        return fetch(//'http://foglesok:8080/ws/api/oneTimeAuthorization', {
          'https://ba-service.mycdsglobal.com/ws/api/oneTimeAuthorization/', {

            method: 'POST',
            //    crossDomain: true,
            contentType: 'application/json',
            dataType: 'json',
            mode: 'cors',
            headers: new Headers({
           //   'Authorization': 'Basic Y2RzcGF5bWVudHM6dGVzdHBheW1lbnRz',
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }),

            withCredentials: false,

            body: JSON.stringify({
              prodIdAlias: "FDT", //is going to be in the page
              serviceObject: {
                type: "oneTimeAuthorization",
                actionCode: "auth",
                clientTransactionId: "",  // emply
                transactionType: "7", // 7
                creditCardNumber:  CDS.cdsProcess.cdsResponse.cipher,
                creditCardType: "EN",
                creditCardCVV: m.cvc.value,
                creditCardExpire: m.expiry.value,
                amount: "0.98", // in the page
                merchantOrderID: v1(),  // create it from the PW
                encryptionFlag: "CDS",  //CDS
                AZ: {
                  pmZip: "68123"
                },
              }
            }
            ),
          }).then(r => r.json()).then(payload => {
              dispatch({ type: 'submiter', payload: responseObjects })
      
          }).catch(({ response , jqXHR, payload }) => {
            dispatch({ type: 'submiter', payload: 'false' })
          });

      } else {
        dispatch({ type: 'submiter', payload: 'invalid credit card' })
      }
    },
    setSelectedConfig: (...m) => {
      dispatch({ type: 'selectConfig', m })
    },
    saveNewConfigName: (...m) => {
      dispatch({ type: 'saveNewConfigName', m })
    },
    saveNewConfig: (...m) => {
      dispatch({ type: 'saveNewConfig', m })
    }
  }
}

const comp = Ember.Component.extend({

  didInsertElement() {
    Ember.run.scheduleOnce('afterRender', this, function () {

      Ember.$.getScript("images/cds-process.min.js", function () {
        CDS.cdsProcess.allowedCards = ['MC', 'VI', 'AX', 'DI'];
        CDS.cdsProcess.clientCode('BHG');
      });
    });

    jQuery('#cc-number')[0].setAttribute('data-cds', 'ccNumber');
    jQuery('#cipher')[0].setAttribute('data-cds', 'cipher');

  }

});

export default connect(stateToComputed, dispatchToActions)(comp);
