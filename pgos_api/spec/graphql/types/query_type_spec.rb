# frozen_string_literal: true

RSpec.describe Types::QueryType do
  types = GraphQL::Define::TypeDefiner.instance
  let!(:work_orders) { create_list(:work_order, 5) }

  describe 'querying all work orders' do

    it 'has a :workOrders connection that returns a WorkOrder connection type' do
      expect(subject).to have_field(:workOrders).that_returns(Types::WorkOrderType.connection_type)
    end

    it 'returns all our created work orders' do
      query_result = subject.fields['workOrders'].resolve(nil, nil, nil)

      # ensure each work order exists
      work_orders.each do |list|
        expect(query_result.to_a).to include(list)
      end

      expect(query_result.count).to eq(work_orders.count)
    end
  end

  describe 'querying a specific work order by ID' do
    it 'returns the queried work order' do
      id = work_orders.first.id
      args = { id: id }
      query_result = subject.fields['workOrder'].resolve(nil, args, nil)
      expect(query_result).to eq(work_orders.first)
    end
  end
end
