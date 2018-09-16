import { $, browser, Config, protractor } from 'protractor'
import { HelperFunctions } from './../utility/helper-functions'
import { SearchPageObject } from '../utility/page-objects'

const { Given, When, Then } = require('cucumber')

let chai = require('chai').use(require('chai-as-promised'))
let expect = chai.expect
let camelCase = require('camelcase')
let search: SearchPageObject = new SearchPageObject()
let helpMe: HelperFunctions = new HelperFunctions()

Given(/^I have loaded the app$/, { timeout: 20 * 1000 }, async () => {
  await expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl)
})

// Universal clicker converts text to camel case
// e.g. I click on the "create work order button"
//   => search["selectStateDropdown"].click()
Then(/^I (?:click|click on) the "(.*?)"$/, async descriptor => {
  let elem = search[camelCase(descriptor)]
  await helpMe.waitForElementToBeClickable(elem).then(async () => {
    await elem.click()
  })
})

// Check for text
Then(/^I see the text "(.*?)" in the element "(.*?)"$/, async (searchText, descriptor) => {
  let elem = search[camelCase(descriptor)]
  await elem.getText().then(async text => {
    if (!text) await elem.getAttribute('value').then(async valueText => text = valueText)
    await expect(text).to.equal(searchText)
  })
})

// Check if element is/is not visible
Then(/^the "(.*?)" (.*?) visible$/, { timeout: 20 * 1000 }, async (descriptor, existence) => {
  let elem = search[camelCase(descriptor)]
  if (existence === 'is') {
    await helpMe.waitForElementToBePresent(elem).then(async elemIsPresent => {
      await expect(elemIsPresent).to.equal(true)
    })
  }
  if (existence === 'is not') {
    await expect(elem.isPresent()).to.become(false)
  }
})

// Input text
Then(/^I type "(.*?)" into the "(.*?)"$/, async (inputText, inputDescriptor) => {
  let inputElem = search[camelCase(inputDescriptor)]
  await inputElem.sendKeys(inputText)
})

// Sort given column by given direction
When(/^I sort the "(.*?)" column in "(.*?)" order$/, async (columnName, sortDirection) => {
  let columnNameCamelCase = camelCase(columnName) + 'ColumnHeader'
  let columnHeader = search[columnNameCamelCase]
  await columnHeader.click()
  if (sortDirection === 'ascending') {
    let columnAscending = search[columnNameCamelCase + 'Asc']
    await helpMe.waitForElementToBePresent(columnAscending).then(async elemIsPresent => {
      await expect(elemIsPresent).to.equal(true)
    })
  } else { // 'descending'
    await columnHeader.click()
    let columnDescending = search[columnNameCamelCase + 'Desc']
    await helpMe.waitForElementToBePresent(columnDescending).then(async elemIsPresent => {
      await expect(elemIsPresent).to.equal(true)
    })
  }
})
