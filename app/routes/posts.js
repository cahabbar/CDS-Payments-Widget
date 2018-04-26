import fetch from 'fetch';
import { route } from 'ember-redux';

const model = (dispatch) => {
  const cardOptions = jQuery('#CDSGPW')[0].getAttribute('data-card-options');
  switch (cardOptions) {


    case '1': {
      return dispatch({
        type: 'selectConfig', m: [
          "VISA, MasterCard, American Express, Discover"
        ]
      })
    }
    case '2': {
      return dispatch({
        type: 'selectConfig', m: [
          "VISA, MasterCard, American Express"
        ]
      })
    }
    case '3': {
      return dispatch({
        type: 'selectConfig', m: [
          "VISA, MasterCard, Discover"
        ]
      })
    }
    case '4': {
      return dispatch({
        type: 'selectConfig', m: [
          "VISA, MasterCard, American Express, Discover, Bill-me"
        ]
      })
    }
    case '5': {
      return dispatch({
        type: 'selectConfig', m: [
          "VISA, MasterCard, American Express, Bill-me"
        ]
      })
    }
    case '6': {
      return dispatch({
        type: 'selectConfig', m: [
          "VISA, MasterCard, Discover, Bill-me"
        ]
      })
    }


    case '7': {
      return dispatch({
        type: 'selectConfig', m: [
          "VISA, MasterCard, American Express, Discover, CVV"
        ]
      })
    }
    case '8': {
      return dispatch({
        type: 'selectConfig', m: [
          "VISA, MasterCard, American Express, CVV"
        ]
      })
    }
    case '9': {
      return dispatch({
        type: 'selectConfig', m: [
          "VISA, MasterCard, Discover, CVV"
        ]
      })
    }
    case '10': {
      return dispatch({
        type: 'selectConfig', m: [
          "VISA, MasterCard, American Express, Discover, Bill-me, CVV"
        ]
      })
    }
    case '11': {
      return dispatch({
        type: 'selectConfig', m: [
          "VISA, MasterCard, American Express, Bill-me, CVV"
        ]
      })
    }
    case '12': {
      return dispatch({
        type: 'selectConfig', m: [
          "VISA, MasterCard, Discover, Bill-me, CVV"
        ]
      })
    }


    case '13': {
      return dispatch({
        type: 'selectConfig', m: [
          "VISA, MasterCard, American Express, Discover, AVS"
        ]
      })
    }
    case '14': {
      return dispatch({
        type: 'selectConfig', m: [
          "VISA, MasterCard, American Express, AVS"
        ]
      })
    }
    case '15': {
      return dispatch({
        type: 'selectConfig', m: [
          "VISA, MasterCard, Discover, AVS"
        ]
      })
    }
    case '16': {
      return dispatch({
        type: 'selectConfig', m: [
          "VISA, MasterCard, American Express, Discover, Bill-me, AVS"
        ]
      })
    }
    case '17': {
      return dispatch({
        type: 'selectConfig', m: [
          "VISA, MasterCard, American Express, Bill-me, AVS"
        ]
      })
    }
    case '18': {
      return dispatch({
        type: 'selectConfig', m: [
          "VISA, MasterCard, Discover, Bill-me, AVS"
        ]
      })
    }



    case '19': {
      return dispatch({
        type: 'selectConfig', m: [
          "VISA, MasterCard, American Express, Discover, CVV, AVS"
        ]
      })
    }
    case '20': {
      return dispatch({
        type: 'selectConfig', m: [
          "VISA, MasterCard, American Express, CVV, AVS"
        ]
      })
    }
    case '21': {
      return dispatch({
        type: 'selectConfig', m: [
          "VISA, MasterCard, Discover, CVV, AVS"
        ]
      })
    }
    case '22': {
      return dispatch({
        type: 'selectConfig', m: [
          "VISA, MasterCard, American Express, Discover, Bill-me, CVV, AVS"
        ]
      })
    }
    case '23': {
      return dispatch({
        type: 'selectConfig', m: [
          "VISA, MasterCard, American Express, Bill-me, CVV, AVS"
        ]
      })
    }
    case '24': {
      return dispatch({
        type: 'selectConfig', m: [
          "VISA, MasterCard, Discover, Bill-me, CVV, AVS"
        ]
      })
    }

    default: {
      return;
    }
  }
}

export default route({ model })();
