# frozen_string_literal: true

# Import for faster seeding
require 'activerecord-import'

WorkOrder.skip_callback(:create, :after, :generate_order_number)

# Build work orders
work_orders = []
100.times do |n|
  x_days_ago = Time.zone.now - rand(1..3).days
  y_days_from_now = Date.today + rand(1..3).days
  work_orders.push WorkOrder.new(
    coffee_name: ['bella donovan', 'giant steps'].sample,
    brew_method: ['aeropress', 'coffee maker', 'cold brew', 'french press', 'pour over'].sample,
    num_cases: rand(1..5),
    num_packets: [25, 50].sample,
    ship_date: y_days_from_now,
    priority: [false, false, false, true].sample,
    order_number: (WorkOrder::ORDER_NUMBER_BASE + n + 1).to_s,
    created_at: x_days_ago,
    updated_at: x_days_ago
  )
end

puts "Importing #{work_orders.count} seed work_orders"
WorkOrder.import work_orders

puts "\nDone!"

WorkOrder.set_callback(:create, :after, :generate_order_number)
