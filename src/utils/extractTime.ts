export function extractTime(dateString: string) {
  const date = new Date(dateString)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? "PM" : "AM"
  const hours12 = hours % 12 || 12
  const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`
  const strTime = `${hours12}:${minutesString} ${ampm}`
  return strTime
}
