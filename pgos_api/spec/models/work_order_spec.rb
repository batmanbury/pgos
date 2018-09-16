# frozen_string_literal: true

require 'rails_helper'

# Just some boilerplate model validations
RSpec.describe WorkOrder, type: :model do
  it 'has a valid factory' do
    expect(build(:work_order)).to be_valid
  end

  let(:attributes) do
    {
      coffee_name: 'bella donovan',
      brew_method: 'pour over',
      num_cases: 1,
      num_packets: 25,
      ship_date: Date.today,
      priority: true,
      order_number: '12345'
    }
  end

  let(:work_order) { create(:work_order, **attributes) }

  describe 'model validations' do
    it { expect(work_order).to allow_value(attributes[:coffee_name]).for(:coffee_name) }
    it { expect(work_order).to allow_value(attributes[:brew_method]).for(:brew_method) }
    it { expect(work_order).to allow_value(attributes[:num_cases]).for(:num_cases) }
    it { expect(work_order).to allow_value(attributes[:num_packets]).for(:num_packets) }
    it { expect(work_order).to allow_value(attributes[:ship_date]).for(:ship_date) }
    it { expect(work_order).to allow_value(attributes[:priority]).for(:priority) }
    it { expect(work_order).to allow_value(attributes[:order_number]).for(:order_number) }
    it { expect(work_order).to validate_presence_of(:coffee_name) }
    it { expect(work_order).to validate_presence_of(:brew_method) }
    it { expect(work_order).to validate_presence_of(:num_cases) }
    it { expect(work_order).to validate_presence_of(:num_packets) }
    it { expect(work_order).to validate_presence_of(:ship_date) }
    it { expect(work_order).to validate_uniqueness_of(:order_number).case_insensitive }
  end
end
