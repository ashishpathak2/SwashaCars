import Link from "next/link";
import BrandLogo from "./BrandLogo";
import { BusinessDetails } from "@/AppData/BusinessDetails";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-black text-white pt-16 pb-8 border-t border-slate-800"
    >
      <div className="responsive-container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 md:gap-10 mb-12">
          {/* Brand Section */}
          <div>
            <BrandLogo isFooter={true} />
            <p className="text-slate-400 mb-6">{BusinessDetails.quote}</p>
            <div className="flex gap-4">
              {Object.entries(BusinessDetails.socials).map(
                ([name, { icon, url }]) => (
                  <a
                    key={name}
                    href={url}
                    className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors"
                    aria-label={`Follow us on ${name.charAt(0).toUpperCase() + name.slice(1)}`}
                  >
                    {icon}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {["home", "services", "contacts"].map((item) => (
                <li key={item}>
                  <Link
                    href={`${item === "home" ? "/" : "/" + item}`}
                    className="text-slate-400 hover:text-white transition-colors inline-block"
                  >
                    {item.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>
                  {BusinessDetails.contacts.address},
                  <br />
                  {BusinessDetails.contacts.city},{" "}
                  {BusinessDetails.contacts.state},{" "}
                  {BusinessDetails.contacts.pincode}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-shrink-0 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>+91 {BusinessDetails.contacts.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-shrink-0 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span>{BusinessDetails.contacts.email}</span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-bold mb-6">Business Hours</h3>
            <ul className="space-y-3 text-slate-400">
              {Object.entries(BusinessDetails.timings).map(([days, hours]) => (
                <li key={days} className="flex items-center justify-between">
                  <span>{days}:</span>
                  <span>{hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
            <p className="text-slate-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} SwashaCars. All rights reserved.
            </p>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <a
                href="#"
                className="text-slate-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </a>
              <Link
                href={"/sitemap"}
                className="text-slate-400 hover:text-white text-sm transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;