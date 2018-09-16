# frozen_string_literal: true

class Resolvers::UpdateWorkOrder < GraphQL::Function
  argument :id,          !types.Int
  argument :coffee_name, types.String
  argument :brew_method, types.String
  argument :num_cases,   types.Int
  argument :num_packets, types.Int
  argument :ship_date,   Types::DateType
  argument :priority,    types.Boolean

  type Types::WorkOrderType

  def call(_obj, args, _ctx)
    work_order = WorkOrder.find_by(id: args[:id])

    attributes = [:coffee_name, :brew_method, :num_cases, :num_packets, :ship_date, :priority]
    attributes.each do |sym|
      if args.key?(sym)
        work_order[sym] = args[sym]
      end
    end

    work_order.save
    work_order
  rescue ActiveRecord::RecordNotFound => e
    nil
  rescue ActiveRecord::RecordInvalid => e
    error_messages = e.record.errors.full_messages.join("\n")
    GraphQL::ExecutionError.new "Validation failed: #{error_messages}."
  rescue StandardError => e
    GraphQL::ExecutionError.new e.message
  end
end
