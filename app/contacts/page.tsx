"use client";
import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import SwashaGoogleMap from "@/components/SwashaGoogleMap";
import { BusinessDetails } from "@/AppData/BusinessDetails";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});

  const validateForm = () => {
      const newErrors: { [key: string]: string | undefined } = {};
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
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("Form submitted:", formData);

    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: "Thank you for your message! We'll get back to you shortly.",
      });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => {
        setFormStatus({ submitted: false, success: false, message: "" });
      }, 5000);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-800 to-gray-900 text-gray-100">
      <section className="pt-24 pb-20 lg:pt-32" aria-labelledby="contact-heading">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span
              className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4"
              aria-hidden="true"
            >
              Get In Touch
            </span>
            <h1
              id="contact-heading"
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
            >
              Contact Us
            </h1>
            <p className="text-lg text-gray-300">
              Have questions or need assistance? We're here to help. Reach out
              to our team for prompt and friendly service.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form Section */}
            <div className="lg:col-span-3 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700/50">
              <h2 className="text-2xl font-bold mb-6 text-white">
                Send Us a Message
              </h2>
              {formStatus.submitted && formStatus.success && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <p>{formStatus.message}</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2 text-gray-300"
                    >
                      Your Name <span className="text-red-400">*</span>
                    </label>
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
                      className={`w-full p-3 bg-gray-700/50 border ${
                        errors.name ? "border-red-400" : "border-gray-600"
                      } rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-white placeholder-gray-400`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-sm text-red-400">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2 text-gray-300"
                    >
                      Email Address <span className="text-red-400">*</span>
                    </label>
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
                      className={`w-full p-3 bg-gray-700/50 border ${
                        errors.email ? "border-red-400" : "border-gray-600"
                      } rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-white placeholder-gray-400`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2 text-gray-300"
                    >
                      Phone Number
                    </label>
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
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2 text-gray-300"
                    >
                      Subject <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      aria-invalid={!!errors.subject}
                      aria-describedby={
                        errors.subject ? "subject-error" : undefined
                      }
                      className={`w-full p-3 bg-gray-700/50 border ${
                        errors.subject ? "border-red-400" : "border-gray-600"
                      } rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-white`}
                    >
                      <option value="" disabled>
                        Select a subject
                      </option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Service Appointment">
                        Service Appointment
                      </option>
                      <option value="Documentation Services">
                        Documentation Services
                      </option>
                      <option value="Repair Services">Repair Services</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.subject && (
                      <p id="subject-error" className="mt-1 text-sm text-red-400">
                        {errors.subject}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-gray-300"
                  >
                    Your Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    rows={5}
                    className={`w-full p-3 bg-gray-700/50 border ${
                      errors.message ? "border-red-400" : "border-gray-600"
                    } rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-white placeholder-gray-400`}
                    placeholder="How can we help you today?"
                  ></textarea>
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="group w-full py-3 px-4 rounded-lg bg-primary/90 text-white font-medium text-sm shadow-lg shadow-bg-primary hover:bg-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 relative overflow-hidden"
                  aria-label="Send message"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>Send Message</span>
                  </span>
                </button>
              </form>
            </div>

            {/* Contact Info and Socials */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700/50">
                <h2 className="text-xl font-bold mb-4 text-white">
                  Contact Information
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Mail className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-300">Email</p>
                      <a
                        href={`mailto:${BusinessDetails.contacts.email}`}
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        {BusinessDetails.contacts.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Phone className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-300">Phone</p>
                      <a
                        href={`tel:${BusinessDetails.contacts.phone}`}
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        {BusinessDetails.contacts.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-300">
                        Address
                      </p>
                      <address className="not-italic text-primary">
                        {BusinessDetails.contacts.address}
                        <br />
                        {BusinessDetails.contacts.city},{" "}
                        {BusinessDetails.contacts.state}{" "}
                        {BusinessDetails.contacts.pincode}
                      </address>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Clock className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-300">
                        Business Hours
                      </p>
                      {Object.entries(BusinessDetails.timings).map(
                        ([days, hours]) => (
                          <p key={days} className="text-primary">
                            {days}: {hours}
                          </p>
                        )
                      )}
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700/50">
                <h2 className="text-xl font-bold mb-4 text-white">
                  Connect With Us
                </h2>
                <div className="flex gap-4">
                  {Object.entries(BusinessDetails.socials).map(
                    ([name, { icon, url }]) => (
                      <a
                        key={name}
                        href={url}
                        aria-label={name.charAt(0).toUpperCase() + name.slice(1)}
                        className="w-10 h-10 bg-primary/90 rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors"
                      >
                        {icon}
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-14">
        <div className="responsive-container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="sr-only">Location</h2>
          <div className="rounded-2xl overflow-hidden shadow-xl h-64 md:h-80 lg:h-96">
            <div className="w-full h-full flex items-center justify-center">
              <SwashaGoogleMap />
            </div>
          </div>
        </div>
      </section>
    </main>
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