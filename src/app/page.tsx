'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleEmailClick = () => {
    const subject = encodeURIComponent('Custom Setlist Sequence Request');
    const body = encodeURIComponent(`Hi there!

I'm interested in getting a custom setlist sequence for my upcoming show(s). Here are the details:

ARTIST INFORMATION:
- Artist/Band Name: [Your name here]
- Contact Email: [Your email]
- Website/Social Media: [Optional]

SHOW/TOUR DETAILS:
- Type: [ ] Single Link for one Show/Tour [ ] Multiple Links for multiple Shows/Tours
- Show Date(s): [Date or date range]
- Venue(s): [Venue name(s) and city/cities]
- Tour Name: [If applicable]

SETLIST PREFERENCES:
- Maximum number of songs: [e.g., 15, 20, 25]
- Estimated show duration: [e.g., 90 minutes, 2 hours]
- Song list: [Please attach or list your songs - can be sent separately]

CUSTOMIZATION (Optional):
- Preferred color theme: [e.g., "blue and purple", "red and black", or specific hex codes]
- Background image: [Please attach vertical image for background of sharable instagram story graphic]

PRICING:
- [ ] Single Show/Tour Link ($100/month for which link is active)
- [ ] Tour Package with multiple links (Setlist Sequence will provide quote in response to the details of this email)

Additional notes or special requests:
[Any other details you'd like to include]

Thanks!
[Your name]`);
    
    window.location.href = `mailto:setlistsequence@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-secondary via-white to-brand-secondary/30">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-brand-primary">
                  Setlist Sequence
                </h1>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#features" className="text-brand-tertiary/70 hover:text-brand-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Features
                </a>
                <a href="#pricing" className="text-brand-tertiary/70 hover:text-brand-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Pricing
                </a>
                <a href="#examples" className="text-brand-tertiary/70 hover:text-brand-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Examples
                </a>
                <button
                  onClick={handleEmailClick}
                  className="bg-brand-primary text-white px-4 py-2 rounded-lg border-2 border-brand-tertiary hover:opacity-90 transition-opacity font-medium"
                >
                  Get Started
                </button>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-brand-tertiary/70 hover:text-brand-primary p-2"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                <a href="#features" className="text-brand-tertiary/70 hover:text-brand-primary block px-3 py-2 rounded-md text-base font-medium">
                  Features
                </a>
                <a href="#pricing" className="text-brand-tertiary/70 hover:text-brand-primary block px-3 py-2 rounded-md text-base font-medium">
                  Pricing
                </a>
                <a href="#examples" className="text-brand-tertiary/70 hover:text-brand-primary block px-3 py-2 rounded-md text-base font-medium">
                  Examples
                </a>
                <button
                  onClick={handleEmailClick}
                  className="w-full text-left bg-brand-primary text-white px-3 py-2 rounded-lg border-2 border-brand-tertiary hover:opacity-90 transition-opacity font-medium"
                >
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-brand-tertiary mb-6">
              Let Your Fans
              <span className="block text-brand-primary">
                Create Your Setlist
              </span>
            </h1>
            <p className="text-xl text-brand-tertiary/70 mb-8 max-w-3xl mx-auto">
              Give your fans an interactive way to vote on your setlist before the show. 
              Increase engagement, build excitement, and create unforgettable experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleEmailClick}
                className="bg-brand-primary text-white px-8 py-4 rounded-lg border-2 border-brand-tertiary hover:opacity-90 transition-opacity font-semibold text-lg shadow-lg"
              >
                Get Your Custom Link
              </button>
              <a
                href="#examples"
                className="border-2 border-brand-primary text-brand-primary px-8 py-4 rounded-lg hover:bg-brand-secondary/30 transition-colors font-semibold text-lg"
              >
                See Examples
              </a>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-brand-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-brand-secondary/40 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#7F4A16] mb-4">
              Why Artists Love Setlist Sequence
            </h2>
            <p className="text-xl text-[#7F4A16]/70 max-w-2xl mx-auto">
              Engage your fans like never before with interactive setlist creation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#0029FF] border-2 border-[#7F4A16] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#7F4A16] mb-2">Fan Engagement</h3>
              <p className="text-[#7F4A16]/70">
                Let fans vote on their favorite songs and feel involved in creating the perfect setlist for your show.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#0029FF] border-2 border-[#7F4A16] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#7F4A16] mb-2">Mobile Optimized</h3>
              <p className="text-[#7F4A16]/70">
                Beautiful, responsive design that works perfectly on all devices. Easy drag-and-drop or tap-to-add functionality.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#0029FF] border-2 border-[#7F4A16] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#7F4A16] mb-2">Custom Branding</h3>
              <p className="text-[#7F4A16]/70">
                Personalized with your colors, tour information, and branding. Each link is unique to your show or tour.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#0029FF] border-2 border-[#7F4A16] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#7F4A16] mb-2">Social Sharing</h3>
              <p className="text-[#7F4A16]/70">
                Fans can share their created setlists on Instagram, spreading the word about your upcoming show.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#0029FF] border-2 border-[#7F4A16] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#7F4A16] mb-2">Quick Setup</h3>
              <p className="text-[#7F4A16]/70">
                Get your custom setlist sequence up and running in 24-48 hours. Just send us your songs and preferences.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#0029FF] border-2 border-[#7F4A16] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#7F4A16] mb-2">Proven Results</h3>
              <p className="text-[#7F4A16]/70">
                Artists report increased social media engagement and stronger fan connections when using setlist sequences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-br from-[#F9E793]/20 via-white to-[#F9E793]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#7F4A16] mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-[#7F4A16]/70 max-w-2xl mx-auto">
              Choose the option that works best for your shows
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Single Show/Tour Package */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-[#7F4A16] relative">
              {/* <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span> */}
              {/* </div>  */}
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#7F4A16] mb-2">Single Show/Tour</h3>
                <div className="text-4xl font-bold text-[#7F4A16] mb-4">
                  $100
                  <span className="text-lg font-normal text-[#7F4A16]/70">/link/month</span>
                </div>
                <p className="text-[#7F4A16]/70 mb-6">Perfect for one-off shows or tours</p>
                
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-[#0029FF] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#7F4A16]/70">Custom branded setlist sequence</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-[#0029FF] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#7F4A16]/70">Your color theme & branding</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-[#0029FF] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#7F4A16]/70">Instagram sharing feature</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-[#0029FF] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#7F4A16]/70">Link active as long as you want</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-[#0029FF] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#7F4A16]/70">24-48 hour delivery</span>
                  </li>
                </ul>
                
                <button
                  onClick={handleEmailClick}
                  className="w-full bg-[#0029FF] text-white py-3 rounded-lg border-2 border-[#7F4A16] hover:opacity-90 transition-opacity font-semibold"
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* Tour Package */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-[#7F4A16] relative">
              
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#7F4A16] mb-2">Tour Package</h3>
                <div className="text-4xl font-bold text-[#7F4A16] mb-4">
                  Contact
                  <span className="text-lg font-normal text-[#7F4A16]/70"> for pricing</span>
                </div>
                <p className="text-[#7F4A16]/70 mb-6">Multiple active links for various shows</p>
                
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-[#0029FF] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#7F4A16]/70">Multiple custom setlist sequences</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-[#0029FF] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#7F4A16]/70">Different songs per show/venue</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-[#0029FF] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#7F4A16]/70">Consistent branding across tour</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-[#0029FF] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#7F4A16]/70">Volume discounts available</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-[#0029FF] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#7F4A16]/70">Priority support & delivery</span>
                  </li>
                </ul>
                
                <button
                  onClick={handleEmailClick}
                  className="w-full bg-[#0029FF] text-white py-3 rounded-lg border-2 border-[#7F4A16] hover:opacity-90 transition-opacity font-semibold"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section id="examples" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#7F4A16] mb-4">
              See It In Action
            </h2>
            <p className="text-xl text-[#7F4A16]/70 max-w-2xl mx-auto">
              Check out these example setlist sequences for different artists
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/gabrielle-grace/gabrielle-grace-summer-tour" className="group">
              <div className="bg-gradient-to-br from-[#F9E793]/30 to-[#F9E793]/10 rounded-xl p-6 hover:shadow-lg transition-shadow border border-[#7F4A16]">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0029FF] border-2 border-[#7F4A16] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">GG</span>
                  </div>
                  <h3 className="font-semibold text-[#7F4A16] mb-2">Gabrielle Grace</h3>
                  <p className="text-sm text-[#7F4A16]/60 mb-3">Summer Tour</p>
                  <span className="text-xs bg-[#F9E793] text-[#7F4A16] px-2 py-1 rounded-full">
                    View Example →
                  </span>
                </div>
              </div>
            </Link>
            
            <Link href="/the-weeknd/weeknd-toronto-2025" className="group">
              <div className="bg-gradient-to-br from-[#F9E793]/30 to-[#F9E793]/10 rounded-xl p-6 hover:shadow-lg transition-shadow border border-[#7F4A16]">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0029FF] border-2 border-[#7F4A16] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">TW</span>
                  </div>
                  <h3 className="font-semibold text-[#7F4A16] mb-2">The Weeknd</h3>
                  <p className="text-sm text-[#7F4A16]/60 mb-3">Rogers Centre, Toronto</p>
                  <span className="text-xs bg-[#F9E793] text-[#7F4A16] px-2 py-1 rounded-full">
                    View Example →
                  </span>
                </div>
              </div>
            </Link>
            
            <Link href="/taylor-swift/taylor-la-2025" className="group">
              <div className="bg-gradient-to-br from-[#F9E793]/30 to-[#F9E793]/10 rounded-xl p-6 hover:shadow-lg transition-shadow border border-[#7F4A16]">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0029FF] border-2 border-[#7F4A16] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">TS</span>
                  </div>
                  <h3 className="font-semibold text-[#7F4A16] mb-2">Taylor Swift</h3>
                  <p className="text-sm text-[#7F4A16]/60 mb-3">SoFi Stadium</p>
                  <span className="text-xs bg-[#F9E793] text-[#7F4A16] px-2 py-1 rounded-full">
                    View Example →
                  </span>
                </div>
              </div>
            </Link>
            
            <Link href="/taylor-swift/taylor-nyc-2025" className="group">
              <div className="bg-gradient-to-br from-[#F9E793]/30 to-[#F9E793]/10 rounded-xl p-6 hover:shadow-lg transition-shadow border border-[#7F4A16]">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0029FF] border-2 border-[#7F4A16] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">TS</span>
                  </div>
                  <h3 className="font-semibold text-[#7F4A16] mb-2">Taylor Swift</h3>
                  <p className="text-sm text-[#7F4A16]/60 mb-3">Madison Square Garden</p>
                  <span className="text-xs bg-[#F9E793] text-[#7F4A16] px-2 py-1 rounded-full">
                    View Example →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#F9E793]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#7F4A16] mb-4">
            Ready to Engage Your Fans?
          </h2>
          <p className="text-xl text-[#7F4A16]/80 mb-8 max-w-2xl mx-auto">
            Get your custom setlist sequence and start building excitement for your next show
          </p>
          <button
            onClick={handleEmailClick}
            className="bg-[#0029FF] text-white px-8 py-4 rounded-lg border-2 border-[#7F4A16] hover:bg-[#7F4A16] hover:text-white transition-all font-semibold text-lg shadow-lg"
          >
            Get Your Custom Link Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#7F4A16] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#F9E793] mb-4">
              Setlist Sequence
            </h3>
            <p className="text-white/80 mb-6">
              Empowering artists to connect with their fans through interactive setlist creation
            </p>
            <div className="flex justify-center space-x-6">
              <a href="mailto:jimmyshultz3@gmail.com" className="text-white/80 hover:text-[#F9E793] transition-colors">
                Contact
              </a>
              <a href="#" className="text-white/80 hover:text-[#F9E793] transition-colors">
                Privacy
              </a>
              <a href="#" className="text-white/80 hover:text-[#F9E793] transition-colors">
                Terms
              </a>
            </div>
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-white/60 text-sm">
                © 2025 Setlist Sequence. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 