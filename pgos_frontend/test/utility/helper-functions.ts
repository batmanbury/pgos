import * as async from 'async'
import { $, browser, by, element, protractor } from 'protractor'
import { SearchPageObject } from '../utility/page-objects'

const fs = require('fs')
let chai = require('chai').use(require('chai-as-promised'))

let expect = chai.expect
let search: SearchPageObject = new SearchPageObject()

export class HelperFunctions {
  async waitForElementToBeClickable(elem, timeout = 9999) {
    return await browser.wait(
      protractor.ExpectedConditions.elementToBeClickable(elem),
      timeout,
      'The page element was not clickable after ' + timeout + ' ms'
    )
  }

  async waitForTextToResolve(text, elem, timeout = 9999) {
    return await browser.wait(
      protractor.ExpectedConditions.textToBePresentInElement(elem, text),
      timeout,
      'The text you were looking for, ' + text + ', was not found within ' + timeout + 'ms.'
    )
  }

  async waitForElementToBePresent(elem, timeout = 9999) {
    return await browser.wait(
      protractor.ExpectedConditions.visibilityOf(elem),
      timeout,
      'The element was not present after ' + timeout + ' ms'
    )
  }
}
