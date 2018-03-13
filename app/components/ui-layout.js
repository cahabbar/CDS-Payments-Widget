import { connect } from 'ember-redux';
import { filterPosts } from '../reducers/posts';
import Ember from 'ember';



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

  return {
    configs: {
      ...filteredPostsBool(state),
    },
    numNoSpaces:
      filteredPostsBool(state).cardInfo.number.value.replace(/\s/g, ''),
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
    billMe,
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
    },
    saveNewConfigName: (...m) => {
      console.log('\n\nlogged saveNewConfigName: ', m)
      dispatch({ type: 'saveNewConfigName', m })
    },
    saveNewConfig: (...m) => {
      console.log('\n\nlogged saveNewConfig: ', m)
      dispatch({ type: 'saveNewConfig', m })
    }
  }
}

const cdsCypher = () => {

  "use strict";

  var CDS = {};
  var cardTypeFromCNum;
  var cards, cdsCard, restrictNumeric, restricPaste, __slice = [].slice, encryptedCcNum, cardType, getPemFile, setPublicKey, encryptCardNumber, validCardNum = false, validateCardNumber, alertExchDataToClient, clearClientExchData, clearCardNumValidation, processCacheOnLoad = false, clientCode, processCachedCreditCardNumber, clearClientExchDataInProgressResp, reportResponseOnFocusOut, reportEncryptionResponse, cdsCardDetails, triggerChangeEvent, encryptCachedOnload, passLuhnCheck, isCardNumberOfAllowedCardTypes, isCDSProcessConfigured = false, isCardTypeConfigValidated = false, validateAllowedCardTypesConfiguration, validateEachCardType, overrideToErrorResponse = false, iscardNumberOfSupportedCardType = false, allowedCardType = false, clearClientExchCipher, cdsResponse, updateCdsResponse;

  // QA URL for public key
  var cdsurl = 'https://qa-tznservice.buysub.com/getkey';

  var defaultKey = "-----BEGIN PUBLIC KEY----- MIGJAoGBANfWaaUdVnwKOn8yM/gp+PTqleHwAcxRKPDdkZbsMzcCAa069B7q5gFYS6BBSLOBjhzS4QPtmsYJtgncXZu4W1bBnhVNd5FCli8LVNbC1PkeUId65bwDGURjBdNM+ilsLIwNfSOLfNhCjv8+DkBlJKDeB/JYECzrHPWfgFkojyUnAgMBAAE= -----END PUBLIC KEY-----";

  window.CDS = CDS;


  CDS.cdsProcess = function () {
    var args, method;
    method = arguments[0], args = 2 <= arguments.length ? __slice.call(
      arguments, 1) : [];
    return CDS.cdsProcess.prototype[method].apply(this, args);
  };

  CDS.cdsProcess.cards = cards = [{
    type: 'MC', /* MASTERCARD */
    patterns: [2, 5],
    lengthRange: [16, 16]
  }, {
    type: 'VI', /* VISA */
    patterns: [4],
    lengthRange: [16, 19]
  }, {
    type: 'JC', /* JCB */
    patterns: [3],
    lengthRange: [16, 19]
  }, {
    type: 'AX', /* AMEX */
    patterns: [3],
    lengthRange: [15, 15],
  }, {
    type: 'DC', /* DINERSCLUB */
    patterns: [3],
    lengthRange: [14, 14]
  }, {
    type: 'DI', /* DISCOVER */
    patterns: [6],
    lengthRange: [16, 16]
  }];

  CDS.cdsProcess.cdsResponse = cdsResponse = {};



  /**
   * Registers events on credit card number for processing based on user input
   */
  CDS.cdsProcess.prototype.formatCardNumber = function () {
    this.addEventListener('keypress', restrictNumeric);
    this.addEventListener('paste', restricPaste);
    this.addEventListener('keyup', validateCardNumber);
    this.addEventListener('focusout', reportResponseOnFocusOut);
    this.setAttribute('maxlength', '19');
    return this;
  };

  CDS.cdsProcess.clientCode = function (code) {
    if (code) {
      isCDSProcessConfigured = true;
    } else {
      return false;
    }
    clientCode = code;
    console.time("publicKeyLoadTime");
    getPemFile();
    ;
  };

  CDS.cdsProcess.reportEncryptionResponse = function () {
    var respCode = reportEncryptionResponse();
    cdsCard.fireEvent('cdsCardRespChange', [cdsResponse]);
    return respCode;
  };

  /**
   * Restricts user to enter any other character other than digits
   */
  restrictNumeric = function (e) {
    console
      .log("restrictNumeric event triggered and handler started execution");
    var input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      e.preventDefault();
      return false;
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    if (!/[\d\s]/.test(input)) {
      e.preventDefault();
    }
    return !!/[\d\s]/.test(input);
  };

  getPemFile = function () {
    console.log("This is the public key value when getPemFile is called "
      + CDS.cdsProcess.publicKey + " Its Boolean value: "
      + Boolean(CDS.cdsProcess.publicKey)
      + " toProcessCacheOnLoad value " + processCacheOnLoad);
    if (!CDS.cdsProcess.publicKey) {
      var xhr = window.XMLHttpRequest ? new XMLHttpRequest()
        : new ActiveXObject("Microsoft.XMLHTTP");
      xhr.open('POST', cdsurl);
      xhr.withCredentials = true;
      xhr.setRequestHeader('Content-Type',
        'application/x-www-form-urlencoded');
      xhr.setRequestHeader('dataType', 'json');
      xhr.onload = function () {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 400) {
            clearTimeout(xmlHttpTimeout);
            var responsedata = xhr.response;
            var data = JSON.parse(responsedata);
            if (data) {
              setPublicKey(data.key);
              if (processCacheOnLoad) {
                console.timeEnd("publicKeyLoadTimeForCache");
                processCachedCreditCardNumber();
              } else {
                console.timeEnd("publicKeyLoadTime");
              }
            } else {
              console.error("Public key not found");
              overrideToErrorResponse = true;
              reportEncryptionResponse();
            }
          } else {

            console
              .log("Received Exception while loading public key");
            overrideToErrorResponse = true;
            reportEncryptionResponse();
          }
        }
      };
      xhr.onerror = function () {
        console
          .error("Exception occurred while loading public key due to connection error, so default key will be used");
        /*overrideToErrorResponse = true;
        reportEncryptionResponse();*/
      };
      xhr.send(encodeURI('pubcode=' + clientCode));
      var xmlHttpTimeout = setTimeout(
        function () {
          xhr.abort();
          console
            .log("Request to get public key aborted due to connection error");
          // Default key is set in case of connection error
          setPublicKey(defaultKey);
          processCachedCreditCardNumber();
        }, 3000); // 3 seconds
      // timeout
    }

  };

  processCachedCreditCardNumber = function () {
    if (document.querySelector('input[data-cds = "ccNumber"]').value) {
      console
        .log("encryptedCcNum is either undefined or null though credit card number present");
      validateCardNumber.call(document
        .querySelector('input[data-cds = "ccNumber"]'));
      reportEncryptionResponse();
      return;
    }
  };
  CDS.cdsProcess.processCachedCreditCardNumber = processCachedCreditCardNumber;

  setPublicKey = function (key) {
    if (key) {
      CDS.cdsProcess.publicKey = key;
      console.log("Base64 key: " + CDS.cdsProcess.publicKey);
    } else {
      console.error("Public Key missing");
      overrideToErrorResponse = true;
      reportEncryptionResponse();
    }
  };

  encryptCardNumber = function () {
    console.time("EncryptionCardNumber");
    if (isCDSProcessConfigured && CDS.cdsProcess.publicKey) {
      debugger;
      var encrypt = new CDS.JSEncrypt();
      encrypt.setPublicKey(CDS.cdsProcess.publicKey);
      var encryptedCcNum = encrypt.encryptToHex(document
        .querySelector('input[data-cds = "ccNumber"]').value);
      if (encryptedCcNum) {
        console.timeEnd("EncryptionCardNumber");
        return encryptedCcNum;
      }
    } else if (!isCDSProcessConfigured) {
      console
        .error("Either clientCode/allowed Card Types is not configured correctly");
      overrideToErrorResponse = true;
      reportEncryptionResponse();
    } else {
      console.warn("Public key missing ");
      overrideToErrorResponse = true;
      reportEncryptionResponse();
    }
  };
  CDS.cdsProcess.encryptCardNumber = encryptCardNumber;

  restricPaste = function (e) {
    console
      .log("restricPaste event triggered and handler started execution");
    e.preventDefault();
  };

  validateCardNumber = function () {
    console.log("started validating card number entered"
      + document.querySelector('input[data-cds = "ccNumber"]').value);
    console.time("ValidateCardNumberEachTime");
    encryptedCcNum = null;
    cardType = null;
    allowedCardType = false;
    clearClientExchDataInProgressResp();
    var cNumLen = this.value.length;
    var cNumFirstDigit = this.value.charAt(0);
    if (iscardNumberOfSupportedCardType(cNumFirstDigit, cNumLen)) {
      validCardNum = passLuhnCheck();
      if (validCardNum
        && isCardNumberOfAllowedCardTypes(cNumFirstDigit, cNumLen)) {
        allowedCardType = true;
        // Resulting token may need to be rendered to the client page..
        console.log("Card number encrypted as it is now valid & allowed card type : "
          + encryptedCcNum);
      }
    } else {
      validCardNum = false;
    }
    console.timeEnd("ValidateCardNumberEachTime");
  };
  CDS.cdsProcess.validateCardNumber = validateCardNumber;

  cardTypeFromCNum = function (cNumFirstDigit, cNumLen) {
    for (var i = 0; i < cards.length; i++) {
      var patterns = cards[i].patterns;
      var cardLengthRange = cards[i].lengthRange;
      for (var j = 0; j < patterns.length; j++) {
        if (cNumFirstDigit == patterns[j]
          && cNumLen >= cardLengthRange[0]
          && cNumLen <= cardLengthRange[1]) {
          return cards[i].type;
        }
      }
    }
  };

  clearClientExchData = function () {
    var cipherField = document.querySelector('input[data-cds = "cipher"]');
    var cardTypeField = document
      .querySelector('input[data-cds = "cardType"]');
    if (cipherField) {
      cipherField.value = '';
      triggerChangeEvent(cipherField);
    }
    if (cardTypeField) {
      cardTypeField.value = '';
      triggerChangeEvent(cardTypeField);
    }
  };

  clearClientExchCipher = function () {
    var cipherField = document.querySelector('input[data-cds = "cipher"]');
    if (cipherField) {
      cipherField.value = '';
      triggerChangeEvent(cipherField);
    }
  };

  updateCdsResponse = function (cardType, cipher, respCode) {
    cdsResponse.cardType = cardType;
    cdsResponse.cipher = cipher;
    cdsResponse.respCode = respCode;
  };

  clearClientExchDataInProgressResp = function () {
    clearClientExchData();
    var responseCodeField = document
      .querySelector('input[data-cds = "responseCode"]');
    if (responseCodeField) {
      responseCodeField.value = '074';
      triggerChangeEvent(responseCodeField);
    }
    updateCdsResponse('', '', '074');
    cdsCard.fireEvent('cdsCardValChange', [cdsResponse]);
  };

  iscardNumberOfSupportedCardType = function (cNumFirstDigit, cNumLen) {
    if (!isCardTypeConfigValidated) {
      isCDSProcessConfigured = false;
      overrideToErrorResponse = true;
      reportEncryptionResponse();
      return false;
    }
    cardType = cardTypeFromCNum(cNumFirstDigit, cNumLen);
    if (cardType) {
      return true;
    } else {
      return false;
    }
  };

  isCardNumberOfAllowedCardTypes = function (cNumFirstDigit, cNumLen) {
    var allowedCards = CDS.cdsProcess.allowedCards;
    if (cardType && allowedCards) {
      for (var i = 0; i < allowedCards.length; i++) {
        if (allowedCards[i] == cardType) {
          return true;
        }
      }
    }
    return false;
  };

  validateAllowedCardTypesConfiguration = function () {
    var config = CDS.cdsProcess.allowedCards;
    if (config && config.constructor === Array && config.length > 0
      && config.every(validateEachCardType)) {
      isCardTypeConfigValidated = true;
      return isCardTypeConfigValidated;
    }
    isCDSProcessConfigured = false;
    return isCDSProcessConfigured;
  };

  validateEachCardType = function (eachCardType) {
    if (!(typeof eachCardType == 'string' || eachCardType instanceof String)) {
      return false;
    }
    return true;
  };

  reportResponseOnFocusOut = function () {
    console
      .log("reportResponseOnFocusOut event triggered and handler started execution");
    reportEncryptionResponse();
  };

  reportEncryptionResponse = function () {
    var responseCode = '';
    var responseCodeField = document.querySelector('input[data-cds = "responseCode"]');
    var cardTypeField = document.querySelector('input[data-cds = "cardType"]');
    var cipherField = document.querySelector('input[data-cds = "cipher"]');

    if (overrideToErrorResponse) {
      if (!isCDSProcessConfigured) {
        responseCode = '075';
        updateCdsResponse('', '', '075');
      } else {
        responseCode = '099';
        updateCdsResponse('', '', '099');
      }
    } else if (document.querySelector('input[data-cds = "ccNumber"]').value == '') {
      // To identify if the credit card number field is left empty
      responseCode = '';
      updateCdsResponse('', '', '');
    } else if (!validCardNum) {
      responseCode = '003';
      clearClientExchData();
      updateCdsResponse('', '', '003');
    } else if (validCardNum && !allowedCardType) {
      responseCode = '753';
      clearClientExchCipher();
      if (cardTypeField) {
        cardTypeField.value = cardType;
        // Trigger change event on card type hidden field and also fire
        // event "cardTypeChange" on cdsCard object
        triggerChangeEvent(cardTypeField);
      }
      updateCdsResponse(cardType, '', '753');
    } else if (validCardNum && allowedCardType && encryptedCcNum) {
      responseCode = '100';
      if (cardTypeField) {
        cardTypeField.value = cardType;
        triggerChangeEvent(cardTypeField);
      }
      if (cipherField) {
        cipherField.value = encryptedCcNum;
        triggerChangeEvent(cipherField);
      }
      updateCdsResponse(cardType, encryptedCcNum, '100');
    } else {
      responseCode = '099';
      clearClientExchData();
      updateCdsResponse('', '', '100');
    }
    if (responseCodeField) {
      responseCodeField.value = responseCode;
      triggerChangeEvent(responseCodeField); // added
    }
    cdsCard.fireEvent('cdsCardValChange', [cdsResponse]);
    return responseCode;
  };

  cdsCardDetails = function () {
    this.events = {};
    this.addEventListener = function (name, handler) {
      if (this.events.hasOwnProperty(name))
        this.events[name].push(handler);
      else
        this.events[name] = [handler];
    };
    this.removeEventListener = function (name, handler) {
      if (!this.events.hasOwnProperty(name))
        return;
      var index = this.events[name].indexOf(handler);
      if (index != -1)
        this.events[name].splice(index, 1);
    };
    this.fireEvent = function (name, args) {
      if (!this.events.hasOwnProperty(name))
        return;
      if (!args || !args.length)
        args = [];
      var evs = this.events[name], l = evs.length;
      for (var i = 0; i < l; i++) {
        evs[i].apply(null, args);
      }
    };
  };

  CDS.cdsProcess.cdsCard = cdsCard = new cdsCardDetails();

  passLuhnCheck = function () {
    var ccNum = document.querySelector('input[data-cds = "ccNumber"]').value;
    var sum = 0, check = false, i = ccNum.length - 1;
    while (i >= 0) {
      var d = parseInt(ccNum.charAt(i), 10);
      if (isNaN(d)) {
        return false;
      }
      if (check) {
        d *= 2;
        if (d > 9) {
          d = (d % 10) + 1;
        }
      }
      check = !check;
      sum += d;
      i--;
    }
    return (sum % 10 == 0);
  };

  triggerChangeEvent = function (element) {
    if ("createEvent" in document) {
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent("change", false, true);
      element.dispatchEvent(evt);
    } else
      element.fireEvent("onchange");
  };


  encryptCachedOnload = function () {
    console.time("publicKeyLoadTimeForCache");
    if (document.querySelector('input[data-cds = "ccNumber"]').value) {
      processCacheOnLoad = true;
      getPemFile();
      console.log("There is a card number detected could be from cache while page is loaded");
    }
  };
  CDS.cdsProcess.allowedCards = ['MC', 'VI', 'AX', 'DI', 'DC', 'JCB'];
  CDS.cdsProcess.clientCode('ws3');
  // document.addEventListener("DOMContentLoaded",
  const eventListener = function () {

    console.log('\n\n\nccNumber', document.querySelector('input[data-cds = "ccNumber"]'))
    CDS.cdsProcess.call(document.querySelector('input[data-cds = "ccNumber"]'), 'formatCardNumber');
    console.log('\n\n\n', { isCDSProcessConfigured })
    if (!isCDSProcessConfigured
      || !validateAllowedCardTypesConfiguration()) {
      overrideToErrorResponse = true;
      ;
      reportEncryptionResponse();
    } else {
      ;
      encryptCachedOnload();
    }

  }
  // );
  eventListener();

};

const comp = Ember.Component.extend({

  didRender() {
    console.log('\ndidRender Component',
      jQuery('#cc-number')[0],
      jQuery('#cc-number')[0].setAttribute('data-cds', 'ccNumber'),
      jQuery('#cipher')[0].setAttribute('data-cds', 'cipher'),
      jQuery('#cc-number')[0],
      '\ndidRender Component\n')
    console.log('\ndidRender window.CDS',
      window.CDS,
      'didRender window\n')
    console.log('\ndidRender window.CDS_BAK',
      window.CDS_BAK,
      'didRender window\n')

    cdsCypher();
    window.CDS.JSEncrypt = window.CDS_BAK.JSEncrypt;

    console.log('\ndidRender window.CDS',
      window.CDS,
      'didRender window\n')
    console.log('\ndidRender window.CDS_BAK',
      window.CDS_BAK,
      'didRender window\n')
    setTimeout(function () {

      console.log('\ndidRender cipher',
        jQuery('#cipher'),
        jQuery('#cipher')[0],
        jQuery('#cipher')[0].value,
        window.CDS.cdsProcess.encryptCardNumber(),
        'didRender cipher\n')
      const encryptedCardNumber = window.CDS.cdsProcess.encryptCardNumber()
      console.log('\n\n\nencryptedCardNumber',encryptedCardNumber)
      jQuery('#cipher')[0].value = encryptedCardNumber;
    }, 4000)
    // // //window.CDS = window.CDS_BAK;
    // // //window.CDS.cdsProcess.allowedCards = ['MC', 'VI', 'AX', 'DI', 'DC', 'JCB'];
    // // //window.CDS.cdsProcess.clientCode('abc');
    // // //console.log("\ndidRender document.querySelector('input[data-cds = \"ccNumber\"]') ",
    // // //  document.querySelector('input[data-cds = "ccNumber"]'),
    // // //  'didRender window\n')
    // // //window.CDS.cdsProcess.call(document.querySelector('input[data-cds = "ccNumber"]'), "formatCardNumber");
  }
});

export default connect(stateToComputed, dispatchToActions)(comp);
