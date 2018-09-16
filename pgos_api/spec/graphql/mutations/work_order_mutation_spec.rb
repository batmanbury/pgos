# frozen_string_literal: true

RSpec.describe Types::MutationType do
  describe 'creating a new work order' do
    let(:args) do
      {
        coffee_name: 'bella donovan',
        brew_method: 'pour over',
        num_cases:   '1',
        num_packets: '50',
        ship_date:   Date.today,
        priority:    true,
        notes:       'Test notes'
      }
    end

    it 'increases the work order count by 1' do
      mutation = subject.fields['createWorkOrder']
      expect {
        mutation.resolve(nil, args, nil)
      }.to change {
        WorkOrder.count
      }.by 1
    end
  end

  describe 'editing a work order' do
    let!(:work_order) { create(:work_order) }

    it 'updates a work order' do
      args = {
        id: work_order.id,
        coffee_name: 'ethiopian yirgacheffe'
      }

      mutation = subject.fields['updateWorkOrder']

      expect {
        mutation.resolve(nil, args, nil)
        work_order.reload
      }.to change {
        work_order.coffee_name
      }

      expect(work_order.coffee_name).to eq(args[:coffee_name])
    end
  end
end
