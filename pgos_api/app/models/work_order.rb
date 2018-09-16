# frozen_string_literal: true

class WorkOrder < ApplicationRecord
  validates_presence_of :coffee_name, :brew_method, :num_cases,
    :num_packets, :ship_date
  validates_uniqueness_of :order_number, case_sensitive: false

  after_create :generate_order_number

  ORDER_NUMBER_BASE = 10_000

  private def generate_order_number
    new_order_number = self.id + ORDER_NUMBER_BASE
    loop do
      self.order_number = new_order_number
      break if self.save
      new_order_number += 1
    end
  end
end
