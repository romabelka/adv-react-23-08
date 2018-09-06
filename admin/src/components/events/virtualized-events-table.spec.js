import React from 'react'
import Enzyme, { render, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { EventsTable } from './virtualized-events-table'
import Loader from '../common/loader'
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

  it('should fetch chunk events on mount', (done) => {
    shallow(<EventsTable events={[]} fetchChunkEvents={done} />)
  })

  it('should select an event', () => {
    let selectedId = false

    const container = mount(
      <EventsTable
        events={events}
        handleSelect={(id) => (selectedId = id)}
        fetchChunkEvents={() => {}}
      />
    )

    container
      .find('.ReactVirtualized__Table__row')
      .first(0)
      .simulate('click')

    expect(selectedId).toEqual(events[0].id)
  })
})
