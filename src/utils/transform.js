export function transform(data) {
  return data ? Object.keys(data).map(key => ({ ...data[key], id: key })) : []
}

export function transform2(data) {
  return (
    Object.keys(data).reduce((acc, key) => {
      acc = { ...data[key], id: key }

      return acc
    }, {}) || {}
  )
}
