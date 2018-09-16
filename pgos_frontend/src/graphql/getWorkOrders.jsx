import gql from 'graphql-tag';

export const GET_WORK_ORDERS = gql`
  query {
    workOrders(
      orderBy: \"ship_date ASC, priority DESC\"
    ) {
      edges {
        node {
          id
          coffee_name
          brew_method
          num_cases
          num_packets
          ship_date
          priority
          order_number
          notes
        }
        cursor
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`
