class DateUtils {
  static formatRegistrationDate(registrationDate: string | undefined): string {
    if (registrationDate !== undefined) {
      const date: Date = new Date(registrationDate)
      const day: number = date.getUTCDate()
      const month: number = date.getMonth() + 1
      const year: number = date.getFullYear()

      return `${this.addZero(day)}/${this.addZero(month)}/${year}`
    }

    return ''
  }

  private static addZero(date: number): string {
    if (date.toString().length === 1)
      return `0${date}`

    return date.toString()
  }
}

export default DateUtils
