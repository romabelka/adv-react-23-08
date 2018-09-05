import React from 'react'
import Enzyme, { shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { EventsTable } from './virtualized-events-table'
import Loader from '../common/loader'
import rawEvents from '../../mocks/conferences'

Enzyme.configure({ adapter: new Adapter() })

const events = rawEvents.slice(0, 10).map((event, id) => ({ id, ...event }))

describe('Virtualized EventsTable', () => {
  it('should display loader', () => {
    const container = shallow(<EventsTable loading />, {
      disableLifecycleMethods: true
    })

    expect(container.contains(<Loader />))
  })

  // because we can't actually simulate scroll and test that table renders all events from first to last, I've decided to do
  // a snapshot test; I've chosen the `render` renderer because its output reflects the exact data contained in the events list
  it('should match the snapshot on render', () => {
    const container = render(<EventsTable events={events} />, {
      disableLifecycleMethods: true
    })

    expect(container).toMatchSnapshot()
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
