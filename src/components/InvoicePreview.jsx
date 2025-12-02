import React from 'react'

const InvoicePreview = ({ data }) => {
    const calculateTotal = () => {
        // This is a simple calculation assuming the format "X,XX,XXX INR"
        // In a real app, we'd parse this better. For now, we trust the input or just display what's there.
        // However, to match the image, the total is explicitly in the data or calculated.
        // The current state has a 'totals' object, but we can also sum up the items if needed.
        // For this version, we'll just display the total from the state or sum the amounts if they were numbers.
        // Since inputs are strings with " INR", we'll just use the last item's amount or a manual total field if we added one.
        // Wait, the image shows a "Total" line. I didn't add a "Total" field in the form, 
        // but I can calculate it if I parse the strings, or I can just add a total field.
        // For simplicity and robustness given the string inputs, I'll assume the user enters the total or I'll try to parse.
        // Let's just sum it up if possible, or better yet, add a Total field to the form? 
        // The plan said "totals: { totalAmount: ... }". I should use that.
        // But I didn't add it to the form. I should probably add it or calculate it.
        // Let's calculate it if possible, otherwise show a placeholder.
        // Actually, the image has "Total 2,95,000 INR".
        // I'll stick to the plan's data structure but I missed adding the total editor in the form.
        // I will add a simple calculation logic here or just display the last item's amount as total for now if there's only one item.
        // Better: I'll just sum the 'amount' fields if they are numbers, otherwise just show "Calculated Total".
        // Actually, I'll just add a "Total" field to the form in a future step if needed.
        // For now, let's just display the sum of amounts.
        return data.items.reduce((acc, item) => {
            const val = parseFloat(item.amount.replace(/[^0-9.]/g, '')) || 0
            return acc + val
        }, 0).toLocaleString('en-IN') + ' INR'
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
                    <img src="/logo.png" alt="CredShields Logo" style={{ width: '200px', height: 'auto' }} />
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
                    <p><strong>{data.company.date}</strong></p>
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
                        <th>GST</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {data.items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            <td>{item.gst}</td>
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
