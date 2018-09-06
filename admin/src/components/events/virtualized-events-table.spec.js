import React from 'react'
import Enzyme, { render, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { EventsTable } from './virtualized-events-table'
import { Table } from 'react-virtualized'
import Loader from '../common/loader'
import rawEvents from '../../mocks/conferences'
const events = rawEvents.map((event, id) => ({ id, ...event }))

const height = 400
const rowHeight = 50

Enzyme.configure({ adapter: new Adapter() })
describe('EventsTable', () => {
  it('should display loader', () => {
    const container = shallow(<EventsTable loading />, {
      disableLifecycleMethods: true
    })

    expect(container.contains(<Loader />))
  })

  it('should display table', () => {
    const container = shallow(<EventsTable events={events} />, {
      disableLifecycleMethods: true
    })

    expect(
      container.contains(
        <Table
          rowHeight={rowHeight}
          headerHeight={80}
          width={500}
          height={height}
          rowGetter={({ index }) => events[index]}
          rowCount={events.length}
          overscanRowCount={0}
        />
      )
    )
  })

  it('should render list of events', () => {
    const container = render(<EventsTable events={events} />, {
      disableLifecycleMethods: true
    })

    const rows = container.find('.ReactVirtualized__Table__row')
    expect(rows.length).toEqual(height / rowHeight)
  })

  it('should render 3 columns', () => {
    const container = render(<EventsTable events={events} />, {
      disableLifecycleMethods: true
    })

    const columns = container
      .find('.ReactVirtualized__Table__row')
      .first()
      .find('.ReactVirtualized__Table__rowColumn')
    expect(columns.length).toEqual(3)
  })

  it('should fetch all events on mount', (done) => {
    shallow(<EventsTable events={[]} fetchAllEvents={done} />)
  })

  it('should select an event', () => {
    let selectedId = null
    const container = mount(
      <EventsTable
        events={events}
        handleSelect={(id) => (selectedId = id)}
        fetchAllEvents={() => {}}
      />
    )

    container
      .find('.ReactVirtualized__Table__row')
      .first(0)
      .simulate('click')

    expect(selectedId).toEqual(events[0].id)
  })
})
