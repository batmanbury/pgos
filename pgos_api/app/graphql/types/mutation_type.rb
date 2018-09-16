# frozen_string_literal: true

Types::MutationType = GraphQL::ObjectType.define do
  name 'Mutation'
  description 'The mutation root'

  # @example
  # mutation {
  #   createWorkOrder(
  #     coffee_name: "giant steps",
  #     brew_method: "pour over",
  #     num_cases: 1,
  #     num_packets: 25,
  #     ship_date: "10/10/2018",
  #     priority: false
  #   ) {
  #     id
  #     coffee_name
  #     brew_method
  #     num_cases
  #     num_packets
  #     ship_date
  #     priority
  #     notes
  #   }
  # }
  field :createWorkOrder, function: Resolvers::CreateWorkOrder.new

  # @example
  # mutation {
  #   updateWorkOrder(
  #     id: 1,
  #     num_cases: 3,
  #     num_packets: 50,
  #     priority: false
  #   ) {
  #     id
  #     coffee_name
  #     brew_method
  #     num_cases
  #     num_packets
  #     ship_date
  #     priority
  #     notes
  #   }
  # }
  field :updateWorkOrder, function: Resolvers::UpdateWorkOrder.new
end
