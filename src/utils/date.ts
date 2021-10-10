export const formmatDateOnSlug = (dateValue: string | number) => {
    const date = new Date(dateValue)
    const year = new Intl.DateTimeFormat('en', { year: "numeric"}).format(date)
    const month = new Intl.DateTimeFormat('en', {month: "2-digit"}).format(date)
    const day = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(date)

    return `${day}-${month}-${year}`
}