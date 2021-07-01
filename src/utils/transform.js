export function transform (data) {
  return data ? Object.keys(data).map(key => ({ ...data[key], id: key })) : []
}
