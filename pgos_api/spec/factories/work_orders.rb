# frozen_string_literal: true

FactoryBot.define do
  factory :work_order do
    coffee_name { 'bella donovan' }
    brew_method { 'pour over' }
    num_cases { 1 }
    num_packets { 25 }
    ship_date { Date.today }
    priority { true }
    order_number { '12345' }
  end
end
