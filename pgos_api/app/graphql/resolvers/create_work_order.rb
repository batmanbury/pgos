# frozen_string_literal: true

class Resolvers::CreateWorkOrder < GraphQL::Function
  argument :coffee_name,  !types.String
  argument :brew_method,  !types.String
  argument :num_cases,    !types.Int
  argument :num_packets,  !types.Int
  argument :ship_date,    !Types::DateType
  argument :priority,     types.Boolean
  argument :notes,        types.String

  type Types::WorkOrderType

  def call(_obj, args, _ctx)
    WorkOrder.create(
      coffee_name:  args[:coffee_name],
      brew_method:  args[:brew_method],
      num_cases:    args[:num_cases],
      num_packets:  args[:num_packets],
      ship_date:    args[:ship_date],
      priority:     args[:priority],
      notes:        args[:notes]
    )
  rescue ActiveRecord::RecordInvalid => e
    error_messages = e.record.errors.full_messages.join("\n")
    GraphQL::ExecutionError.new "Validation failed: #{error_messages}."
  rescue StandardError => e
    GraphQL::ExecutionError.new e.message
  end
end
