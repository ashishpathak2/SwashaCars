"use client"
import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, MapPin, Clock } from 'lucide-react';
import Head from 'next/head';
import SwashaGoogleMap from '@/components/SwashaGoogleMap';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.subject) newErrors.subject = "Please select a subject";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    console.log('Form submitted:', formData);
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: "Thank you for your message! We'll get back to you shortly."
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: ''
        });
      }, 5000);
    }, 1000);
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-black via-zinc-800 to-gray-900 text-gray-100">
        <section className="pt-24 pb-20 lg:pt-32" aria-labelledby="contact-heading">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4" aria-hidden="true">
                Get In Touch
              </span>
              <h1 id="contact-heading" className="text-4xl md:text-5xl font-bold mb-6 text-white">Contact Us</h1>
              <p className="text-lg text-gray-300">
                Have questions or need assistance? We're here to help. Reach out to our team for prompt and friendly service.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
              <div className="lg:col-span-3 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700/50">
                <h2 className="text-2xl font-bold mb-6 text-white">Send Us a Message</h2>
                
                {formStatus.submitted && formStatus.success && (
                  <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <p>{formStatus.message}</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">Your Name <span className="text-red-400">*</span></label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={`w-full p-3 bg-gray-700/50 border ${errors.name ? 'border-red-400' : 'border-gray-600'} rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-white placeholder-gray-400`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p id="name-error" className="mt-1 text-sm text-red-400">{errors.name}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">Email Address <span className="text-red-400">*</span></label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={`w-full p-3 bg-gray-700/50 border ${errors.email ? 'border-red-400' : 'border-gray-600'} rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-white placeholder-gray-400`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p id="email-error" className="mt-1 text-sm text-red-400">{errors.email}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-300">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-white placeholder-gray-400"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-300">Subject <span className="text-red-400">*</span></label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? "subject-error" : undefined}
                        className={`w-full p-3 bg-gray-700/50 border ${errors.subject ? 'border-red-400' : 'border-gray-600'} rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-white`}
                      >
                        <option value="" disabled>Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Service Appointment">Service Appointment</option>
                        <option value="Documentation Services">Documentation Services</option>
                        <option value="Repair Services">Repair Services</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.subject && <p id="subject-error" className="mt-1 text-sm text-red-400">{errors.subject}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">Your Message <span className="text-red-400">*</span></label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      rows={5}
                      className={`w-full p-3 bg-gray-700/50 border ${errors.message ? 'border-red-400' : 'border-gray-600'} rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-white placeholder-gray-400`}
                      placeholder="How can we help you today?"
                    ></textarea>
                    {errors.message && <p id="message-error" className="mt-1 text-sm text-red-400">{errors.message}</p>}
                  </div>
                  
                  <button
                    type="submit"
                    className="group w-full py-3 px-4 rounded-lg bg-primary/90 text-white font-medium text-sm shadow-lg shadow-bg-primary hover:bg-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 relative overflow-hidden"
                    aria-label="Send message"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <span>Send Message</span>
                      <MessageSquare className="w-4 h-4 transition-transform " />
                    </span>
                  </button>
                </form>
              </div>
              
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700/50">
                  <h2 className="text-xl font-bold mb-4 text-white">Contact Information</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Mail className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-300">Email</p>
                        <a href="mailto:contact@example.com" className="text-primary hover:text-primary/80 transition-colors">contact@example.com</a>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Phone className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-300">Phone</p>
                        <a href="tel:+1234567890" className="text-primary hover:text-primary/80 transition-colors">(123) 456-7890</a>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <MapPin className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-300">Address</p>
                        <address className="not-italic text-primary">
                          123 Business Street<br />
                          Suite 100<br />
                          City, State 12345
                        </address>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Clock className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-300">Business Hours</p>
                        <p className="text-primary">Monday - Friday: 9AM - 5PM</p>
                        <p className="text-primary">Saturday: 10AM - 2PM</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700/50">
                  <h2 className="text-xl font-bold mb-4 text-white">Connect With Us</h2>
                  <div className="flex gap-4">
                    <a href="#" aria-label="Facebook" className="w-10 h-10 bg-primary/90 rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" aria-label="Twitter" className="w-10 h-10 bg-primary/90 rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" aria-label="LinkedIn" className="w-10 h-10 bg-primary/90 rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" aria-label="Instagram" className="w-10 h-10 bg-primary/90 rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700/50">
                  <h2 className="text-xl font-bold mb-4 text-white">FAQ</h2>
                  <details className="mb-3">
                    <summary className="cursor-pointer text-primary hover:text-primary/80 font-medium">What are your response times?</summary>
                    <p className="mt-2 text-gray-300 pl-4">We aim to respond to all inquiries within 24 hours during business days.</p>
                  </details>
                  <details className="mb-3">
                    <summary className="cursor-pointer text-primary hover:text-primary/80 font-medium">Do you offer emergency services?</summary>
                    <p className="mt-2 text-gray-300 pl-4">Yes, we provide emergency services. Please call our emergency hotline for immediate assistance.</p>
                  </details>
                  <details>
                    <summary className="cursor-pointer text-primary hover:text-primary/80 font-medium">How can I track my service request?</summary>
                    <p className="mt-2 text-gray-300 pl-4">Once your request is submitted, you'll receive a confirmation email with a tracking number you can use on our website.</p>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="pb-14">
          <div className="responsive-container mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="sr-only">Location</h2>
            <div className="rounded-2xl overflow-hidden shadow-xl h-64 md:h-80 lg:h-96">
              <div className="w-full h-full flex items-center justify-center ">
              <SwashaGoogleMap/>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

// Helper component for the success message
const CheckCircle = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default ContactPage;