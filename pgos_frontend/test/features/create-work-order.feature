Feature: Create a work order

  @createWorkOrder
  Scenario: creating a work order and verifying it in the table
    Given I have loaded the app
    And the "create work order button" is visible
    When I click on the "create work order button"
    Then the "create work order modal" is visible
    And the "create work order form" is visible

    Then I click on the "coffee dropdown"
    And I click on the "first coffee dropdown option"

    Then I click on the "brew method dropdown"
    And I click on the "first brew method dropdown option"

    Then I click on the "ship date input"
    And I type "12/12/2099" into the "ship date input"

    Then I click on the "number of cases input"
    And I type "1" into the "number of cases input"

    Then I click on the "number of packets dropdown"
    And I click on the "first packets dropdown option"

    Then I click on the "notes input"
    And I type "TEST WORK ORDER NOTES" into the "notes input"

    Then I click on the "priority checkbox"

    When I click on the "submit work order button"
    Then the "create work order modal" is not visible

    When I sort the "order" column in "descending" order
    And I click the "first row view work order button"
    Then the "view work order modal" is visible
    And I see the text "TEST WORK ORDER NOTES" in the element "read only notes input"
