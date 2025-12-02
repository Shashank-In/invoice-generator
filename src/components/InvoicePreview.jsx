import React from 'react'

const InvoicePreview = ({ data }) => {
    const calculateTotal = () => {
        const currency = data.settings?.currency || 'INR'
        return data.items.reduce((acc, item) => {
            const val = parseFloat(item.amount.replace(/[^0-9.]/g, '')) || 0
            return acc + val
        }, 0).toLocaleString('en-IN') + ' ' + currency
    }

    const formatDate = (dateString) => {
        if (!dateString) return ''
        // Check if it's already in the desired format (e.g. "Nov 1, 2024")
        if (dateString.includes(',')) return dateString

        // Otherwise assume YYYY-MM-DD from date input
        const date = new Date(dateString)
        if (isNaN(date.getTime())) return dateString

        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    }

    return (
        <div className="invoice-box">
            <header className="header">
                <div className="company-info">
                    <h1>{data.company.name}</h1>
                </div>
                <div className="logo">
                    {/* Improved CredShields Logo */}
                    {/* CredShields Logo Image */}
                    <img src={`${import.meta.env.BASE_URL}logo.png`} alt="CredShields Logo" style={{ width: '200px', height: 'auto' }} />
                </div>
            </header>

            <div className="invoice-meta">
                <div className="bill-to">
                    <p>Bill to: {data.company.billTo}</p>
                </div>
                <div className="invoice-details">
                    <p>Invoice #<br /><strong>{data.company.invoiceNo}</strong></p>
                </div>
                <div className="invoice-date">
                    <p><strong>{formatDate(data.company.date)}</strong></p>
                </div>
            </div>

            <div className="invoice-title">
                <h2>INVOICE</h2>
            </div>

            <table className="invoice-table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Price</th>
                        {(data.settings?.showGst ?? true) && <th>GST</th>}
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {data.items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            {(data.settings?.showGst ?? true) && <td>{item.gst}</td>}
                            <td>{item.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="invoice-total">
                <div className="total-label">Total</div>
                <div className="total-amount">{calculateTotal()}</div>
            </div>

            <div className="payment-details">
                <h3>Payment Details:</h3>
                {data.payment.type === 'bank' ? (
                    <div className="payment-grid">
                        <div className="label">Account holder name</div>
                        <div className="value">{data.payment.accountHolder}</div>

                        <div className="label">Account number</div>
                        <div className="value">{data.payment.accountNumber}</div>

                        <div className="label">Bank name</div>
                        <div className="value">{data.payment.bankName}</div>

                        <div className="label">Branch</div>
                        <div className="value">{data.payment.branch}</div>

                        <div className="label">IFSC Code</div>
                        <div className="value">{data.payment.ifsc}</div>

                        <div className="label">GST Number</div>
                        <div className="value">{data.payment.gstNumber}</div>
                    </div>
                ) : (
                    <div className="payment-grid" style={{ gridTemplateColumns: '1fr' }}>
                        <div className="value" style={{ marginBottom: '5px' }}>
                            {data.payment.crypto.networkInfo}
                        </div>
                        <div className="value" style={{ wordBreak: 'break-all' }}>
                            {data.payment.crypto.walletAddress}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default InvoicePreview
