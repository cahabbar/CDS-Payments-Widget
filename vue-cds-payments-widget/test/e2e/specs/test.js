// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

const assertThings = ({ config, browser, visa, mastercard, americanexpress, discovercard, dinnersclub, jcb, billme, cvv }) => {

  browser.execute(function(data){
    CDSGPW.$data.config = arguments[0]
  }, [config], function (result){
    console.log(result);
  })

  visa ? browser.assert.elementPresent('button[id=visaImg]') : browser.assert.elementNotPresent('button[id=visaImg]')
  mastercard ? browser.assert.elementPresent('button[id=MasterCardImg]') : browser.assert.elementNotPresent('button[id=MasterCardImg]')
  americanexpress ? browser.assert.elementPresent('button[id=AmericanExpressImg]') : browser.assert.elementNotPresent('button[id=AmericanExpressImg]')
  discovercard ? browser.assert.elementPresent('button[id=DiscoverCardImg]') : browser.assert.elementNotPresent('button[id=DinersClubImg]')
  jcb ? browser.assert.elementPresent('button[id=JCBImg]') : browser.assert.elementNotPresent('button[id=JCBImg]')

  browser.assert.elementPresent('#cc-number')
  browser.assert.attributeContains('#cc-number', 'type', 'text')
  browser.assert.attributeContains('#cc-number', 'data-cds', 'ccNumber')
  browser.assert.attributeContains('#cc-number', 'placeholder', 'Card Number')
  browser.assert.attributeContains('#cc-number', 'name', 'number')

  browser.assert.elementPresent('input[name=expiry]')
  browser.assert.attributeContains('input[name=expiry]', 'type', 'text')
  browser.assert.attributeContains('input[name=expiry]', 'placeholder', 'Expiration Date (MM/YY)')
  browser.assert.attributeContains('input[name=expiry]', 'name', 'expiry')
  browser.assert.attributeContains('input[name=expiry]', 'value', '')
  browser.expect.element('input[name=expiry]').to.not.have.attribute('data-cds')

  cvv ? browser.assert.elementPresent('input[name=cvc]') : browser.assert.elementNotPresent('input[name=cvc]')
  cvv && browser.assert.attributeContains('input[name=cvc]', 'type', 'text')
  cvv && browser.assert.attributeContains('input[name=cvc]', 'placeholder', 'CVV')
  cvv && browser.assert.attributeContains('input[name=cvc]', 'name', 'cvc')
  cvv && browser.assert.attributeContains('input[name=cvc]', 'value', '')
  cvv && browser.expect.element('input[name=cvc]').to.not.have.attribute('data-cds')

  billme ? browser.assert.elementPresent('input[id=billme]') : browser.assert.elementNotPresent('input[id=billme]')
  billme && browser.assert.attributeContains('input[id=billme]', 'type', 'checkbox')
}

module.exports = {
  'default e2e option': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    console.log('\n\n\n')
    console.log({ devServer })
    console.log('\n\n\n')

    browser.url(devServer).waitForElementVisible('#CDSGPW', 1000)
  },
  'config-default': function (browser) {
    assertThings({ config: 'default', browser: browser, visa: true, mastercard: true, americanexpress: !true, discovercard: true, dinnersclub: true, jcb: !true, billme: true, cvv: true })
  },
  'config-0': function (browser) {
    assertThings({ config: 0, browser: browser, visa: true, mastercard: true, americanexpress: true, discovercard: true, dinnersclub: true, jcb: !true, cvv: !true })
  },
  'config-1': function (browser) {
    assertThings({ config: 1, browser: browser, visa: true, mastercard: true, americanexpress: true, discovercard: !true, dinnersclub: true, jcb: !true })
  },
  'config-2': function (browser) {
    assertThings({ config: 2, browser: browser, visa: true, mastercard: true, americanexpress: !true, discovercard: true, dinnersclub: !true, jcb: !true })
  },
  'config-3': function (browser) {
    assertThings({ config: 3, browser: browser, visa: true, mastercard: true, americanexpress: true, discovercard: true, dinnersclub: !true, jcb: !true, billme: true })
  },
  'config-4': function (browser) {
    assertThings({ config: 4, browser: browser, visa: true, mastercard: true, americanexpress: true, discovercard: !true, dinnersclub: !true, jcb: !true, billme: true })
  },
  'config-5': function (browser) {
    assertThings({ config: 5, browser: browser, visa: true, mastercard: true, americanexpress: !true, discovercard: !true, dinnersclub: !true, jcb: !true, billme: true })
  },
  'config-6': function (browser) {
    assertThings({ config: 6, browser: browser, visa: true, mastercard: true, americanexpress: true, discovercard: !true, dinnersclub: !true, jcb: !true, billme: !true, cvv: true })
  },
  'config-7': function (browser) {
    assertThings({ config: 7, browser: browser, visa: true, mastercard: true, americanexpress: true, discovercard: !true, dinnersclub: !true, jcb: !true, billme: !true, cvv: true })
  },
  'config-8': function (browser) {
    assertThings({ config: 8, browser: browser, visa: true, mastercard: true, americanexpress: !true, discovercard: !true, dinnersclub: !true, jcb: !true, billme: !true, cvv: true })
  },
  'config-9': function (browser) {
    assertThings({ config: 9, browser: browser, visa: true, mastercard: true, americanexpress: true, discovercard: true, dinnersclub: !true, jcb: !true, billme: true, cvv: true })
  },
  'config-10': function (browser) {
    assertThings({ config: 10, browser: browser, visa: true, mastercard: true, americanexpress: true, discovercard: !true, dinnersclub: !true, jcb: !true, billme: true, cvv: true })
  },
  'config-11': function (browser) {
    assertThings({ config: 11, browser: browser, visa: true, mastercard: true, americanexpress: !true, discovercard: true, dinnersclub: !true, jcb: !true, billme: true, cvv: true })
  },
  'config-12': function (browser) {
    assertThings({ config: 12, browser: browser, visa: true, mastercard: true, americanexpress: true, discovercard: !true, dinnersclub: !true, jcb: !true, billme: !true, cvv: !true })
  },
  'config-13': function (browser) {
    assertThings({ config: 13, browser: browser, visa: true, mastercard: true, americanexpress: true, discovercard: !true, dinnersclub: !true, jcb: !true, billme: !true, cvv: !true })
  },
  'config-14': function (browser) {
    assertThings({ config: 14, browser: browser, visa: true, mastercard: true, americanexpress: !true, discovercard: true, dinnersclub: !true, jcb: !true, billme: !true, cvv: !true })
  },
  'config-15': function (browser) {
    assertThings({ config: 15, browser: browser, visa: true, mastercard: true, americanexpress: true, discovercard: !true, dinnersclub: !true, jcb: !true, billme: true, cvv: !true })
  },
  'config-16': function (browser) {
    assertThings({ config: 16, browser: browser, visa: true, mastercard: true, americanexpress: true, discovercard: !true, dinnersclub: !true, jcb: !true, billme: true, cvv: !true })
  },
  'config-17': function (browser) {
    assertThings({ config: 17, browser: browser, visa: true, mastercard: true, americanexpress: !true, discovercard: !true, dinnersclub: !true, jcb: !true, billme: true, cvv: !true })
  },
  'config-18': function (browser) {
    assertThings({ config: 18, browser: browser, visa: true, mastercard: true, americanexpress: true, discovercard: !true, dinnersclub: !true, jcb: !true, billme: !true, cvv: true })
  },
  'config-19': function (browser) {
    assertThings({ config: 19, browser: browser, visa: true, mastercard: true, americanexpress: true, discovercard: !true, dinnersclub: !true, jcb: !true, billme: !true, cvv: true })
  },
  'config-20': function (browser) {
    assertThings({ config: 20, browser: browser, visa: true, mastercard: true, americanexpress: !true, discovercard: !true, dinnersclub: !true, jcb: !true, billme: !true, cvv: true })
  },
  'config-21': function (browser) {
    assertThings({ config: 21, browser: browser, visa: true, mastercard: true, americanexpress: true, discovercard: true, dinnersclub: !true, jcb: !true, billme: true, cvv: true })
  },
  'config-22': function (browser) {
    assertThings({ config: 22, browser: browser, visa: true, mastercard: true, americanexpress: true, discovercard: !true, dinnersclub: !true, jcb: !true, billme: true, cvv: true })
  },
  'config-23': function (browser) {
    assertThings({ config: 23, browser: browser, visa: true, mastercard: true, americanexpress: !true, discovercard: true, dinnersclub: !true, jcb: !true, billme: true, cvv: true })

    browser
      .end()
  }
}
