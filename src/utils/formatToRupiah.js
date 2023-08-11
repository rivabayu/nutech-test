function formatCurrency(amount) {
    if (typeof amount !== 'number') {
        return "Invalid djadja";
    }
    const formattedAmount = amount.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR'
    });

    return formattedAmount;
}
export default formatCurrency
