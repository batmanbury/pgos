# frozen_string_literal: true

module Types
  WorkOrderType = GraphQL::ObjectType.define do
    name 'WorkOrderType'
    description 'Work order details'

    field :id,           !types.Int
    field :coffee_name,  !types.String
    field :brew_method,  !types.String
    field :num_cases,    !types.Int
    field :num_packets,  !types.Int
    field :ship_date,    Types::DateType
    field :priority,     !types.Boolean
    field :order_number, !types.String
    field :notes,        types.String
  end
end
