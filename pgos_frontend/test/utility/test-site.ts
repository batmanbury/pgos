import { $, browser, element, protractor } from 'protractor'

import { until } from 'selenium-webdriver'

export class TestSite {
  // Test Site
  public testSite: any
  public baseURL: any

  constructor() {
    // Test Site
    this.testSite = 'http://localhost:4200/'
    // this.testSite = "https://dev.audiencefinder.spectrumreach.io/"
    // this.testSite = "https://qa.audiencefinder.spectrumreach.io/"
    // this.testSite = 'https://uat.audiencefinder.spectrumreach.io/'
    this.baseURL = this.testSite
  }
}
