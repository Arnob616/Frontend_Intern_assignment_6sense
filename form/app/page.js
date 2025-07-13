// app/page.js
"use client";

import { useState } from 'react';

export default function DynamicForm() {
  const [fields, setFields] = useState([
    { id: 1, inputValue: '', selectValue: '', inputError: '', selectError: '' }
  ]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Add a new field set
  const addField = () => {
    const newId = fields.length > 0 ? Math.max(...fields.map(f => f.id)) + 1 : 1;
    setFields([
      ...fields,
      { id: newId, inputValue: '', selectValue: '', inputError: '', selectError: '' }
    ]);
  };

  // Remove a field set
  const removeField = (id) => {
    if (fields.length > 1) {
      setFields(fields.filter(field => field.id !== id));
    }
  };

  // Handle input change
  const handleInputChange = (id, value) => {
    setFields(fields.map(field => 
      field.id === id ? { 
        ...field, 
        inputValue: value,
        inputError: formSubmitted && !value ? 'This field is required' : '' 
      } : field
    ));
  };

  // Handle select change
  const handleSelectChange = (id, value) => {
    setFields(fields.map(field => 
      field.id === id ? { 
        ...field, 
        selectValue: value,
        selectError: formSubmitted && !value ? 'Please select an option' : '' 
      } : field
    ));
  };

  // Validate form
  const validateForm = () => {
    let isValid = true;
    const updatedFields = fields.map(field => {
      const newField = { ...field };
      if (!newField.inputValue) {
        newField.inputError = 'This field is required';
        isValid = false;
      }
      if (!newField.selectValue) {
        newField.selectError = 'Please select an option';
        isValid = false;
      }
      return newField;
    });
    
    setFields(updatedFields);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    if (validateForm()) {
      // Form is valid, process data
      alert('Form submitted successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-3xl font-bold">Form Builder</h1>
          <p className="mt-2 opacity-90">
            Add multiple fields,validation with real-time form state
          </p>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {fields.map((field) => (
                <div key={field.id} className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label htmlFor={`input-${field.id}`} className="block text-sm font-medium mb-1 text-black">
                        Input Field
                      </label>
                      <input
                        id={`input-${field.id}`}
                        type="text"
                        value={field.inputValue}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none bg-white text-black ${
                          field.inputError 
                            ? 'border-red-500 focus:ring-red-200' 
                            : 'border-blue-300 focus:ring-blue-200 focus:border-blue-500'
                        }`}
                        placeholder="Enter text..."
                      />
                      {field.inputError && (
                        <p className="mt-1 text-sm text-red-600">{field.inputError}</p>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <label htmlFor={`select-${field.id}`} className="block text-sm font-medium text-blue-900 mb-1">
                        Select Option
                      </label>
                      <div className="flex gap-2">
                        <select
                          id={`select-${field.id}`}
                          value={field.selectValue}
                          onChange={(e) => handleSelectChange(field.id, e.target.value)}
                          className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none bg-white text-black ${
                            field.selectError 
                              ? 'border-red-500 focus:ring-red-200' 
                              : 'border-blue-300 focus:ring-blue-200 focus:border-blue-500'
                          }`}
                        >
                          <option value="" className="text-gray-400">Select an option</option>
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                          <option value="option4">Option 4</option>
                        </select>
                        {fields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeField(field.id)}
                            className="px-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center"
                            title="Remove field"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        )}
                      </div>
                      {field.selectError && (
                        <p className="mt-1 text-sm text-red-600">{field.selectError}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={addField}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Field
              </button>
              
              <button
                type="submit"
                className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Submit Form
              </button>
            </div>
          </form>
          
          <div className="mt-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-6 bg-blue-600 rounded-full"></div>
              <h2 className="text-xl font-bold text-blue-900">Form State</h2>
            </div>
            
            <div className="overflow-x-auto rounded-lg border border-blue-200">
              <table className="min-w-full divide-y divide-blue-200">
                <thead className="bg-blue-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black tracking-wider">
                      Input Value
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black tracking-wider">
                      Select Value
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-100">
                  {fields.map((field) => (
                    <tr key={field.id} className="hover:bg-blue-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">
                        {field.id}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                        field.inputValue ? 'text-black' : 'text-black'
                      }`}>
                        {field.inputValue || 'Empty'}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                        field.selectValue ? 'text-black' : 'text-black'
                      }`}>
                        {field.selectValue || 'Not selected'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 px-6 py-4 text-sm text-blue-700 border-t border-blue-200">
          <p>Form contains {fields.length} field set{fields.length !== 1 ? 's' : ''}</p>
        </div>
      </div>
    </div>
  );
}