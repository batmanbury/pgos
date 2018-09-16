import { $, $$ } from 'protractor'

export class SearchPageObject {
  // Create work order controls
  public createWorkOrderButton: any
  public createWorkOrderModal: any
  public createWorkOrderForm: any
  // Create work order form
  public coffeeDropdown: any
  public brewMethodDropdown: any
  public shipDateInput: any
  public numberOfCasesInput: any
  public numberOfPacketsDropdown: any
  public notesInput: any
  public priorityCheckbox: any
  public firstCoffeeDropdownOption: any
  public firstBrewMethodDropdownOption: any
  public firstPacketsDropdownOption: any
  public submitWorkOrderButton: any
  // Table controls
  public shipDateColumnHeader: any
  public shipDateColumnHeaderAsc: any
  public shipDateColumnHeaderDesc: any
  public orderColumnHeader: any
  public orderColumnHeaderAsc: any
  public orderColumnHeaderDesc: any
  // View work order controls
  public firstRowViewWorkOrderButton: any
  public viewWorkOrderModal: any
  public readOnlyNotesInput: any

  constructor() {
    // Create work order controls
    this.createWorkOrderButton = $('header button.create-work-order-btn')
    this.createWorkOrderModal = $('.ReactModalPortal .ReactModal__Content.ReactModal__Content--after-open')
    this.createWorkOrderForm = $('#create-work-order-form')
    // Create work order form
    this.coffeeDropdown = $('#create-work-order-form .coffee-select')
    this.brewMethodDropdown = $('#create-work-order-form .brew-select')
    this.shipDateInput = $('#create-work-order-form .ship-date-input')
    this.numberOfCasesInput = $('#create-work-order-form .cases-input')
    this.numberOfPacketsDropdown = $('#create-work-order-form .packets-select')
    this.notesInput = $('#create-work-order-form .notes-input')
    this.priorityCheckbox = $('#create-work-order-form .priority-checkbox')
    this.submitWorkOrderButton = $('#submit-work-order-btn')
    this.firstCoffeeDropdownOption = $('#create-work-order-form select.coffee-select option:nth-child(2)') // 2nd child because first <option> is blank
    this.firstBrewMethodDropdownOption = $('#create-work-order-form select.brew-select option:nth-child(2)')
    this.firstPacketsDropdownOption = $('#create-work-order-form select.packets-select option:nth-child(2)')
    // Table controls
    this.shipDateColumnHeader = $('.ReactTable .rt-thead .rt-tr .rt-th:nth-child(5)')
    this.shipDateColumnHeaderAsc = $('.ReactTable .rt-thead .rt-tr .rt-th:nth-child(5).-sort-asc')
    this.shipDateColumnHeaderDesc = $('.ReactTable .rt-thead .rt-tr .rt-th:nth-child(5).-sort-desc')
    this.orderColumnHeader = $('.ReactTable .rt-thead .rt-tr .rt-th:nth-child(6)')
    this.orderColumnHeaderAsc = $('.ReactTable .rt-thead .rt-tr .rt-th:nth-child(6).-sort-asc')
    this.orderColumnHeaderDesc = $('.ReactTable .rt-thead .rt-tr .rt-th:nth-child(6).-sort-desc')
    // View work order controls
    this.firstRowViewWorkOrderButton = $('.ReactTable .rt-tbody .rt-tr-group:nth-child(1) .rt-tr .rt-td:last-child')
    this.viewWorkOrderModal = this.createWorkOrderModal
    this.readOnlyNotesInput = $('.readonly-notes-input')
  }
}
