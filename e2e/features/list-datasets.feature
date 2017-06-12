Feature: List Datasets
  In order to know about available datasets
  As a data user
  I want to list them

  Scenario: List all datasets when none yet
    Given I'm in the home page
    When I click menu option "Datasets"
    Then I see 0 datasets

  Scenario: List all datasets when one created
    Given I sign in as "owner" with password "password"
    And I create a dataset with title "Test" and description "Test dataset"
    When I click menu option "Datasets"
    Then I see 1 datasets
