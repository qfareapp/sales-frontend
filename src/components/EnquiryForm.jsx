import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import api from '../api';
import 'react-datepicker/dist/react-datepicker.css';

const EnquiryFormScreen = () => {
  const [form, setForm] = useState({
    'Enquiry Date': null,
    'Stage': '',
    'Owner': '',
    'Source': '',
    'Client Type': '',
    'Client Name': '',
    'Product': '',
    'Wagon Type': '',
    'No Of Rakes': '',
    'No of Wagons in each Rake': '',
    'Est. Price per Wagon': '',
    'Price per Wagon': '',
    'Estimated Amount': '',
    'Delivery Date(Start)': '',
    'Delivery Date (End)': '',
    'Quoted Price': '',
    'Remark': '',
    'Attachment': []
  });

  const [wagonOptions, setWagonOptions] = useState([]);

  useEffect(() => {
     api.get('/wagons')
      .then(res => {
        const types = res.data.map(w => w.wagonType);
        setWagonOptions(types);
      })
      .catch(err => {
        console.error('❌ Failed to fetch wagon types:', err);
      });
  }, []);

  const handleChange = (key, value) => {
    const updatedForm = { ...form, [key]: value };

    const rakes = parseFloat(
      key === 'No Of Rakes' ? value : updatedForm['No Of Rakes']
    ) || 0;

    const wagons = parseFloat(
      key === 'No of Wagons in each Rake' ? value : updatedForm['No of Wagons in each Rake']
    ) || 0;

    const quotedPrice = parseFloat(
      key === 'Price per Wagon' ? value : updatedForm['Price per Wagon']
    ) || 0;

    const estimatedUnitPrice = parseFloat(
      key === 'Est. Price per Wagon' ? value : updatedForm['Est. Price per Wagon']
    ) || 0;

    if (key === 'Stage' && value === 'Enquiry') {
      updatedForm['Price per Wagon'] = '';
      updatedForm['Delivery Date(Start)'] = '';
      updatedForm['Delivery Date (End)'] = '';
      updatedForm['Quoted Price'] = '';
      updatedForm['No of Wagons in each Rake'] = '';
      updatedForm['Est. Price per Wagon'] = '';
      updatedForm['Estimated Amount'] = '';
    }

    if (updatedForm['Stage'] === 'Quoted') {
      updatedForm['Quoted Price'] = (quotedPrice * rakes * wagons).toFixed(2);
    }

    if (updatedForm['Stage'] === 'Enquiry') {
      updatedForm['Estimated Amount'] = (estimatedUnitPrice * rakes * wagons).toFixed(2);
    }

    setForm(updatedForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        enquiryDate: form['Enquiry Date'] ? form['Enquiry Date'].toISOString().split('T')[0] : '',
        owner: form['Owner'],
        source: form['Source'],
        clientType: form['Client Type'],
        clientName: form['Client Name'],
        product: form['Product'],
        wagonType: form['Wagon Type'],
        noOfRakes: form['No Of Rakes'],
        wagonsPerRake: form['No of Wagons in each Rake'],
        pricePerWagon: form['Price per Wagon'],
        estimatedAmount: form['Estimated Amount'],
        deliveryStart: form['Delivery Date(Start)'],
        deliveryEnd: form['Delivery Date (End)'],
        quotedPrice: form['Quoted Price'],
        remark: form['Remark'],
        stage: form['Stage'],
        attachment: Array.isArray(form['Attachment']) ? form['Attachment'] : []
      };

      const res = await api.post('/enquiries', payload);
      alert(`✅ Enquiry submitted! Your Order ID is ${res.data.orderId}`);

      setForm({
        'Enquiry Date': null,
        'Stage': '',
        'Owner': '',
        'Source': '',
        'Client Type': '',
        'Client Name': '',
        'Product': '',
        'Wagon Type': '',
        'No Of Rakes': '',
        'No of Wagons in each Rake': '',
        'Est. Price per Wagon': '',
        'Price per Wagon': '',
        'Estimated Amount': '',
        'Delivery Date(Start)': '',
        'Delivery Date (End)': '',
        'Quoted Price': '',
        'Remark': '',
        'Attachment': []
      });

    } catch (err) {
      console.error('Submission Error:', err.response ? err.response.data : err.message);
      alert('Error submitting enquiry');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      minHeight: '100vh',
      backgroundColor: '#f2f6fc',
      padding: '40px 0'
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#ffffff',
          padding: 30,
          borderRadius: 12,
          boxShadow: '0 0 12px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: 650
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#2c3e50' }}>
          🚆 Sales Enquiry Form
        </h2>

        {[
          'Enquiry Date',
          'Stage',
          ...Object.keys(form).filter(k => k !== 'Enquiry Date' && k !== 'Stage')
        ].map((key) => {
          const quotedFields = [
            'Price per Wagon',
            'Delivery Date(Start)',
            'Delivery Date (End)',
            'Quoted Price'
          ];

          const enquiryFields = [
            'Est. Price per Wagon',
            'Estimated Amount'
          ];

          if (quotedFields.includes(key) && form['Stage'] !== 'Quoted') return null;
          if (enquiryFields.includes(key) && form['Stage'] !== 'Enquiry') return null;

          if (key === 'Wagon Type') {
            return (
              <div key={key} style={{ marginBottom: 16 }}>
                <label style={{ fontWeight: 'bold', color: '#34495e' }}>Wagon Type</label><br />
                {form['Stage'] === 'Quoted' ? (
                  <select
                    value={form['Wagon Type']}
                    onChange={(e) => handleChange('Wagon Type', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: 6,
                      border: '1px solid #ccc',
                      backgroundColor: '#fdfdfd'
                    }}
                  >
                    <option value="">Select Wagon Type</option>
                    {wagonOptions.map((type, i) => (
                      <option key={i} value={type}>{type}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={form['Wagon Type']}
                    onChange={(e) => handleChange('Wagon Type', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: 6,
                      border: '1px solid #ccc',
                      backgroundColor: '#fdfdfd'
                    }}
                  />
                )}
              </div>
            );
          }

          return (
            <div key={key} style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 'bold', color: '#34495e' }}>{key}</label><br />
              {key === 'Enquiry Date' ? (
                <DatePicker
                  selected={form['Enquiry Date']}
                  onChange={(date) => handleChange('Enquiry Date', date)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select a date"
                  className="form-control"
                  style={{ width: '100%' }}
                />
              ) : ['Client Type', 'Stage', 'Owner'].includes(key) ? (
                <select
                  value={form[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 6,
                    border: '1px solid #ccc',
                    backgroundColor: '#fdfdfd'
                  }}
                >
                  <option value="">-- Select --</option>

                  {key === 'Client Type' && ['Indian Railways', 'Private', 'Export'].map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}

                  {key === 'Stage' && ['Enquiry', 'Quoted', 'Cancelled', 'Confirmed', 'Lost'].map((stage) => (
                    <option key={stage} value={stage}>{stage}</option>
                  ))}

                  {key === 'Owner' && ['TWRL', 'TREL'].map((owner) => (
                    <option key={owner} value={owner}>{owner}</option>
                  ))}
                </select>
              ) : key === 'Attachment' ? (
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const fakeUrl = `/uploads/${file.name}`;
                      handleChange('Attachment', [{ name: file.name, url: fakeUrl }]);
                    } else {
                      handleChange('Attachment', []);
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 6,
                    border: '1px solid #ccc',
                    backgroundColor: '#fdfdfd'
                  }}
                />
              ) : (
                <input
                  type="text"
                  value={form[key] || ''}
                  onChange={(e) => handleChange(key, e.target.value)}
                  disabled={['Estimated Amount', 'Quoted Price'].includes(key)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 6,
                    border: '1px solid #ccc',
                    backgroundColor: '#fdfdfd'
                  }}
                />
              )}
            </div>
          );
        })}

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            fontSize: 16,
            cursor: 'pointer',
            marginTop: 10
          }}
        >
          📩 Submit Enquiry
        </button>
      </form>
    </div>
  );
};

export default EnquiryFormScreen;
