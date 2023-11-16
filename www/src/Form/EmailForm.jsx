import React, { useState } from 'react';
import { validateEmail } from '../utils/helpers';

function EmailForm() {
  const [email, setEmail] = useState('');

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateEmail(email)) {
      alert('An email was submitted successfully: ' + email);

      fetch(
        'https://sheet.best/api/sheets/7a75b23a-076a-45cb-8fa6-2850e16b6450',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ Email: email }),
        },
      )
        .then((response) => response.json())
        .then((data) => {
          alert('Email saved successfully');
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Failed to save email');
        });
    } else {
      alert('Invalid email: ' + email);
    }
  };

  return (
    <div className="flex flex-col items-center mb-5">
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-2/3 lg:w-1/2 shadow-button rounded-lg"
      >
        <div className="flex flex-wrap">
          <input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="Email address here"
            className="flex-1 px-4 py-2 border-2 border-r-0 border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-black text-white font-bold rounded-r-md sm:px-4 py-2 sm:py-0 hover:bg-gray-800 focus:outline-none active:shadow-lg active:drop-shadow active:translate-x-1 active:translate-y-1"
          >
            Subscribe
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmailForm;
