import { useState } from 'react'
import InvoiceForm from './components/InvoiceForm'
import InvoicePreview from './components/InvoicePreview'

function App() {
  const [data, setData] = useState({
    company: {
      name: 'CRESHIELDS TECHNOLOGY PTE. LTD',
      billTo: 'Hawkins Cookers Limited\nGST No. - 27AAACH1784M1Z9',
      invoiceNo: '0000075',
      date: 'Nov 1, 2024'
    },
    items: [
      {
        description: 'Hawkins all Web continuous pentest 2nd installment',
        price: '2,50,000 INR',
        gst: '45,000 INR',
        amount: '2,95,000 INR'
      }
    ],
    totals: {
      totalAmount: '2,95,000 INR'
    },
    payment: {
      type: 'bank', // 'bank' or 'crypto'
      accountHolder: 'CRESHIELDS BLOCKCHAIN SECURITY PVT LTD',
      accountNumber: '50200063533279',
      bankName: 'HDFC Bank',
      branch: 'DOMLUR LAYOUT, BENGALURU',
      ifsc: 'HDFC0003882',
      gstNumber: '29AAJCC8008N1Z4',
      crypto: {
        networkInfo: 'USDT or USDC over ETH, Base or Polygon -',
        walletAddress: '0xe661D1c2E8A37Fc94a270Cf6e024B469f5D70Cd9'
      }
    }
  })

  const updateCompany = (field, value) => {
    setData(prev => ({ ...prev, company: { ...prev.company, [field]: value } }))
  }

  const updatePayment = (field, value, isCrypto = false) => {
    if (isCrypto) {
      setData(prev => ({
        ...prev,
        payment: {
          ...prev.payment,
          crypto: { ...prev.payment.crypto, [field]: value }
        }
      }))
    } else {
      setData(prev => ({ ...prev, payment: { ...prev.payment, [field]: value } }))
    }
  }

  const updateItem = (index, field, value) => {
    const newItems = [...data.items]
    newItems[index][field] = value
    setData(prev => ({ ...prev, items: newItems }))
  }

  const addItem = () => {
    setData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', price: '', gst: '', amount: '' }]
    }))
  }

  const removeItem = (index) => {
    setData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="app-container">
      <div className="editor-panel no-print">
        <h2>Invoice Editor</h2>
        <InvoiceForm
          data={data}
          updateCompany={updateCompany}
          updatePayment={updatePayment}
          updateItem={updateItem}
          addItem={addItem}
          removeItem={removeItem}
        />
      </div>
      <div className="preview-panel">
        <InvoicePreview data={data} />
      </div>
    </div>
  )
}

export default App
