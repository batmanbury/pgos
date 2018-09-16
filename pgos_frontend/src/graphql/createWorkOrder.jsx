import gql from 'graphql-tag';

export const CREATE_WORK_ORDER = gql`
  mutation
    CreateWorkOrder(
      $coffee_name: String!,
      $brew_method: String!,
      $num_cases: Int!,
      $num_packets: Int!,
      $ship_date: Date!,
      $priority: Boolean,
      $notes: String,
    ) {
    createWorkOrder(
      coffee_name: $coffee_name,
      brew_method: $brew_method,
      num_cases: $num_cases,
      num_packets: $num_packets,
      ship_date: $ship_date,
      priority: $priority,
      notes: $notes
    ) {
      id
      coffee_name
      brew_method
      num_cases
      num_packets
      ship_date
      priority
      notes
    }
  }
`
