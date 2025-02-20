export const currencyFormat = new Intl.NumberFormat('sp-MX', {
  style: 'currency',
  currency: 'MXN',
})

export function formatCurrency(value: string) {
  let rawValue = value.replace(/[^0-9]/g, '')
  let number = parseInt(rawValue) || 0

  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number)
}

export function currencyToInt(value: string) {
  return parseInt(value.replace(/[^0-9]/g, ''))
}
