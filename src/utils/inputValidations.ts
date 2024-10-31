export const rfc = [
  'matches',
  /^([A-ZÑ&]{4})(\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[A-Z\d]{3}$/i,
]

export const legalBirthDate = () => {
  const legalYear = new Date().getFullYear() - 18
  const legalBirthDate = new Date(
    legalYear,
    new Date().getMonth(),
    new Date().getDate() + 1,
  )
    .toISOString()
    .split('T')[0]
  return ['date_before', legalBirthDate]
}

export const curp = [
  'matches',
  /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HM]{1}(AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TL|TS|VZ|YN|ZS)[A-Z]{3}[A-Z\d]{1}\d{1}$/i,
]

export const dateBeforeToday = () => {
  const today = new Date().toISOString().split('T')[0]
  return ['date_before', today]
}
