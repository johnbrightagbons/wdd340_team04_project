// Registration Page

'use client';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState } from 'react';
import Link from 'next/link';
import { New_Rocker } from 'next/font/google';
import { setegid } from 'process';

export default function RegistrationPage() {
    //State for form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // State for form error messages
    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validates Inputs
        const newErrors: typeof errors = {};
        if (!name.trim()) newErrors.name = 'Name is Required';
        if (!email.trim()) newErrors.email = 'Email is  Reqired';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email';
        if (!password.trim()) newErrors.password = 'Password is Required';
        else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Submit the form and show success message
            alert('Registration Successful!');
            // The registration are reset
            setName('');
            setEmail('');
            setPassword('');
        }
    };
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      {/* Registration Card */}
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Seller Registration</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block mb-1 font-medium">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition"
          >
            Register
          </button>

          {/* Link to Login */}
          <p className="text-sm text-center text-gray-600">
            Already have an account? <Link href="/login" className="text-indigo-600 hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </main>
  );
}