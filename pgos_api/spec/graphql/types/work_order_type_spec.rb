# frozen_string_literal: true

RSpec.describe Types::WorkOrderType do
  types = GraphQL::Define::TypeDefiner.instance

  it 'has a :id field of Int type' do
    expect(subject).to have_field(:id).that_returns(!types.Int)
  end

  it 'has a :coffee_name field of String type' do
    expect(subject).to have_field(:coffee_name).that_returns(!types.String)
  end

  it 'has a :brew_method field of String type' do
    expect(subject).to have_field(:brew_method).that_returns(!types.String)
  end

  it 'has a :num_cases field of Int type' do
    expect(subject).to have_field(:num_cases).that_returns(!types.Int)
  end

  it 'has a :num_packets field of Int type' do
    expect(subject).to have_field(:num_packets).that_returns(!types.Int)
  end

  it 'has a :ship_date field of DateType type' do
    expect(subject).to have_field(:ship_date).that_returns( Types::DateType)
  end

  it 'has a :priority field of Boolean type' do
    expect(subject).to have_field(:priority).that_returns(!types.Boolean)
  end

  it 'has a :order_number field of String type' do
    expect(subject).to have_field(:order_number).that_returns(!types.String)
  end

  it 'has a :notes field of String type' do
    expect(subject).to have_field(:notes).that_returns(types.String)
  end
end
