import groupBy from 'lodash/groupBy'

export const objectsGroupByProp = (prop) => (entityName) => (obj) => {
  const list = Object.entries(obj).map(([id, item]) => ({
    id,
    ...item
  }))

  const grouped = groupBy(list, (item) =>
    String(item[prop])
      .toUpperCase()
      .charAt(0)
  )

  return Object.entries(grouped).map(([letter, list]) => ({
    title: `${letter}, (${list.length})`,
    data: list.map((item) => ({ key: item.id, [entityName]: item }))
  }))
}

export const eventsToSectionList = objectsGroupByProp('title')('event')
export const peopleToSectionList = objectsGroupByProp('firstName')('person')
