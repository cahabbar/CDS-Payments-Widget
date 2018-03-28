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

    default: {
      return;
    }
  }
}

export default route({ model })();
