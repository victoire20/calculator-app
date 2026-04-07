export const formatNumber = ( n: string ): string => {
    const [int, dec] = n.split(",")
    const formattedInt = int.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    return dec ? `${formattedInt},${dec}` : formattedInt
}

export const parseFormattedNumber = (str: string): number => {
    const normalizedStr = str.replace(/ /g, '').replace(',', '.')
    return parseFloat(normalizedStr) || 0
}