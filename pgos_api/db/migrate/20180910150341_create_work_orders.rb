# frozen_string_literal: true

class CreateWorkOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :work_orders do |t|
      t.string :coffee_name
      t.string :brew_method
      t.integer :num_cases
      t.integer :num_packets
      t.date :ship_date
      t.boolean :priority
      t.string :order_number
      t.text :notes

      t.timestamps
    end
  end
end
