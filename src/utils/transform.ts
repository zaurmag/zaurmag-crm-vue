interface ITransformData2 {
  electr: number
  gas: number
  id: string
  maintanceGe: number
  people: number
  trash: number
  userId: string
  water: number
}

export const transform = (data: object): Array<object> =>
  data ? Object.keys(data).map(key => ({ ...data[key], id: key })) : []

export const transform2 = (data: ITransformData2): ITransformData2 => {
  const result: object = {}

  for (const key in data) {
    result[key] = {
      ...data[key],
      id: key
    }
  }

  return <ITransformData2>result
  // return (
  //   Object.keys(data).reduce((acc, key) => {
  //     acc = { ...data[key], id: key }
  //
  //     return acc
  //   }, {}) || {}
  // )
}
