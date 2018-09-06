import React from 'react'
import Enzyme, { mount, render, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Loader from '../common/loader'
import { EventsTable } from './virtualized-events-table'
import rawEvents from '../../mocks/conferences'

const events = rawEvents.map((event, id) => ({ id, ...event }))

Enzyme.configure({ adapter: new Adapter() })

describe('VirtualizedEventsTable', () => {
  it('should display loader', () => {
    const container = shallow(<EventsTable loading />, {
      disableLifecycleMethods: true
    })

    expect(container.contains(<Loader />))
  })

  it('should render list of events', () => {
    const container = render(
      <EventsTable events={events} selected={[]} count={events.length} />,
      {
        disableLifecycleMethods: true
      }
    )

    const rows = container.find('.ReactVirtualized__Table__row')
    expect(rows.length).toEqual(8)
  })

  it('should select an event', () => {
    let selectedId = null
    const container = mount(
      <EventsTable
        events={events}
        selected={[]}
        indices={[]}
        count={events.length}
        handleSelect={(id) => (selectedId = id)}
        fetchEvents={() => {}}
      />
    )

    container
      .find('.ReactVirtualized__Table__row')
      .first(0)
      .simulate('click')

    expect(selectedId).toEqual(events[0].id)
  })
})
