import React from 'react'

const InvoiceForm = ({ data, updateCompany, updatePayment, updateItem, addItem, removeItem }) => {
    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="invoice-form">
            <div className="form-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Edit Invoice</h2>
                <button onClick={handlePrint} style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
                    Print / Save PDF
                </button>
            </div>

            <div className="form-section">
                <h3>Company Details</h3>
                <div className="form-group">
                    <label>Company Name</label>
                    <input
                        type="text"
                        value={data.company.name}
                        onChange={(e) => updateCompany('name', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Bill To (Multiline)</label>
                    <textarea
                        value={data.company.billTo}
                        onChange={(e) => updateCompany('billTo', e.target.value)}
                        rows="3"
                    />
                </div>
                <div className="form-group">
                    <label>Invoice Number</label>
                    <input
                        type="text"
                        value={data.company.invoiceNo}
                        onChange={(e) => updateCompany('invoiceNo', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <input
                        type="text"
                        value={data.company.date}
                        onChange={(e) => updateCompany('date', e.target.value)}
                    />
                </div>
            </div>

            <div className="form-section">
                <h3>Items</h3>
                {data.items.map((item, index) => (
                    <div key={index} className="item-row">
                        <div className="form-group">
                            <label>Description</label>
                            <input
                                type="text"
                                value={item.description}
                                onChange={(e) => updateItem(index, 'description', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input
                                type="text"
                                value={item.price}
                                onChange={(e) => updateItem(index, 'price', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>GST</label>
                            <input
                                type="text"
                                value={item.gst}
                                onChange={(e) => updateItem(index, 'gst', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Amount</label>
                            <input
                                type="text"
                                value={item.amount}
                                onChange={(e) => updateItem(index, 'amount', e.target.value)}
                            />
                        </div>
                        <button className="btn-remove" onClick={() => removeItem(index)}>Remove</button>
                    </div>
                ))}
                <button className="btn-add" onClick={addItem}>Add Item</button>
            </div>

            <div className="form-section">
                <h3>Payment Details</h3>
                <div className="form-group">
                    <label>Payment Type</label>
                    <select
                        value={data.payment.type}
                        onChange={(e) => updatePayment('type', e.target.value)}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                    >
                        <option value="bank">Bank Transfer</option>
                        <option value="crypto">Crypto Payment</option>
                    </select>
                </div>

                {data.payment.type === 'bank' ? (
                    <>
                        <div className="form-group">
                            <label>Account Holder</label>
                            <input
                                type="text"
                                value={data.payment.accountHolder}
                                onChange={(e) => updatePayment('accountHolder', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Account Number</label>
                            <input
                                type="text"
                                value={data.payment.accountNumber}
                                onChange={(e) => updatePayment('accountNumber', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Bank Name</label>
                            <input
                                type="text"
                                value={data.payment.bankName}
                                onChange={(e) => updatePayment('bankName', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Branch</label>
                            <input
                                type="text"
                                value={data.payment.branch}
                                onChange={(e) => updatePayment('branch', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>IFSC Code</label>
                            <input
                                type="text"
                                value={data.payment.ifsc}
                                onChange={(e) => updatePayment('ifsc', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>GST Number</label>
                            <input
                                type="text"
                                value={data.payment.gstNumber}
                                onChange={(e) => updatePayment('gstNumber', e.target.value)}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="form-group">
                            <label>Network Info</label>
                            <input
                                type="text"
                                value={data.payment.crypto.networkInfo}
                                onChange={(e) => updatePayment('networkInfo', e.target.value, true)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Wallet Address</label>
                            <input
                                type="text"
                                value={data.payment.crypto.walletAddress}
                                onChange={(e) => updatePayment('walletAddress', e.target.value, true)}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default InvoiceForm
