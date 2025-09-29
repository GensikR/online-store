import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// --- SVG Icons for Social Media ---
const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm6.406-11.845a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" clipRule="evenodd" />
  </svg>
);
const TikTokIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.85-.38-6.95-1.91-1.83-1.31-3.1-3.1-3.6-5.02-.37-1.42-.38-2.93-.38-4.45 0-1.56.02-3.12.04-4.68.04-1.83.18-3.65.78-5.39 1.12-3.19 3.73-5.49 6.91-6.18 1.03-.22 2.07-.33 3.13-.33zM7.67 15.11c.91.01 1.82.02 2.74-.01.37-.01.74-.02 1.1-.06.27-.03.54-.09.79-.18.42-.14.82-.35 1.18-.61.53-.38.95-.87 1.28-1.43.3-.5.53-1.07.7-1.65.16-.54.26-1.11.31-1.69.04-.47.05-.95.05-1.43-.01-.56-.08-1.11-.21-1.64-.19-.77-.52-1.5-1-2.14-.62-.83-1.45-1.46-2.43-1.84-.23-.09-.47-.16-.71-.22-.6-.15-1.23-.2-1.86-.21-.86-.02-1.72-.01-2.58-.01-1.16 0-2.32.01-3.48.02-1.14.01-2.29.05-3.43.15-.35.03-.7.08-1.04.14-.99.18-1.96.48-2.85.95-.86.44-1.66.99-2.35 1.66-.91.86-1.64 1.88-2.15 3.01-.52 1.14-.81 2.37-.87 3.65-.05 1.21-.03 2.42.02 3.63.1 2.22.67 4.36 1.77 6.28 1.41 2.44 3.53 4.33 6.07 5.27 2.84 1.04 5.86.81 8.52-.61 2.41-1.28 4.28-3.32 5.4-5.78.4-1.02.67-2.11.82-3.22.18-1.34.21-2.71.18-4.06v-4.32c-.02-.1-.03-.2-.05-.3-.02-.08-.04-.16-.06-.24-.03-.11-.07-.22-.11-.32-.04-.1-.08-.19-.13-.28-.29-.56-.7-.99-1.23-1.32-1.14-.7-2.48-1.03-3.88-1.03-1.14 0-2.28-.01-3.42-.02-1.14-.01-2.28-.05-3.42-.15-.35-.03-.7-.08-1.04-.14-.99-.18-1.96-.48-2.85-.95-.86-.44-1.66.99-2.35 1.66-.92-.86-1.65-1.88-2.16-3.01-.52-1.14-.81-2.37-.87-3.65-.05-1.21-.03-2.42.02-3.63.1-2.22.67-4.36 1.77-6.28 1.41-2.44 3.53-4.33 6.07-5.27 2.84-1.04 5.86.81 8.52-.61 2.41-1.28 4.28-3.32 5.4-5.78.4-1.02.67-2.11.82-3.22.18-1.34.21-2.71.18-4.06V.02z" />
    </svg>
);


const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-100 border-t border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16">

          {/* Branding Section */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link href="/" className="mb-4 inline-block">
              <Image
                src="/images/logo.png"
                alt="Lolla's Store Logo"
                width={120}
                height={30}
              />
            </Link>
            <p className="font-sans text-stone-600 max-w-xs">
              {/* FIX 1: Replaced ' with &apos; */}
              Your personal source for this week&apos;s most wanted styles, curated just for you.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-stone-500 hover:text-stone-900 transition-colors"><InstagramIcon /></a>
              <a href="#" className="text-stone-500 hover:text-stone-900 transition-colors"><TikTokIcon /></a>
            </div>
          </div>
          
          {/* Links: Shop */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-stone-900">Shop</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#" className="font-sans text-stone-600 hover:text-brand-primary transition-colors">Clothing</a></li>
              <li><a href="#" className="font-sans text-stone-600 hover:text-brand-primary transition-colors">Accessories</a></li>
              <li><a href="#" className="font-sans text-stone-600 hover:text-brand-primary transition-colors">Shoes</a></li>
              <li><a href="#" className="font-sans text-stone-600 hover:text-brand-primary transition-colors">New Arrivals</a></li>
            </ul>
          </div>
          
          {/* Links: Information */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-stone-900">Information</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#" className="font-sans text-stone-600 hover:text-brand-primary transition-colors">About Us</a></li>
              <li><a href="#" className="font-sans text-stone-600 hover:text-brand-primary transition-colors">Contact</a></li>
              <li><a href="#" className="font-sans text-stone-600 hover:text-brand-primary transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="font-sans text-stone-600 hover:text-brand-primary transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-stone-900">Join Our List</h3>
            <p className="mt-4 font-sans text-stone-600">Get exclusive access to new drops and special offers.</p>
            <form className="mt-4 flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md border border-stone-300 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-colors"
              />
              <button
                type="submit"
                className="flex-shrink-0 px-5 py-2 rounded-md bg-[#d1b49f] text-white font-semibold transition-transform hover:scale-105"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-stone-200 text-center">
          <p className="font-sans text-sm text-stone-500">
            {/* FIX 2: Replaced ' with &apos; */}
            &copy; {new Date().getFullYear()} Lolla&apos;s Store. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;