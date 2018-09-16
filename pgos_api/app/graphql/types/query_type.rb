# frozen_string_literal: true

Types::QueryType = GraphQL::ObjectType.define do
  name 'Query'
  description 'The query root'

  connection :workOrders, Types::WorkOrderType.connection_type do
    argument :orderBy, types.String

    resolve ->(_obj, args, _ctx) {
      # GraphQL lets us paginate on the client side within the query (!)
      if args && args[:orderBy]
        order_by = args[:orderBy]
        WorkOrder.order("#{order_by}")
      else
        WorkOrder.all
      end
    }
  end

  field :workOrder, Types::WorkOrderType, 'returns the queried work order' do
    argument :id, !types[types.ID]
    resolve ->(_obj, args, _ctx) {
      WorkOrder.find_by!(id: args[:id])
    }
  end
end
