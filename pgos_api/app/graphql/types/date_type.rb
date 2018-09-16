#frozen_string_literal: true

module Types
  DateType = GraphQL::ScalarType.define do
    name 'Date'

    coerce_input ->(value, _ctx) { Date.strptime(value, '%m/%d/%Y') }
    coerce_result ->(value, _ctx) { value.strftime('%m/%d/%Y') }
  end
end
