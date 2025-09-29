import React from "react";

interface LandingHeroProps {
  storeName?: string;
  tagline?: string;
  phoneNumberHref?: string; // e.g., +15551234567
  phoneNumberDisplay?: string; // e.g., (555) 123-4567
}

const LandingHero: React.FC<LandingHeroProps> = ({
  storeName = "LOLASS",
  tagline = "Your personal source for the latest viral looks. We hand-pick the must-have clothes and purses from the biggest trend sites so you don't have to.",
  phoneNumberHref = "+12145517710",
  phoneNumberDisplay = "(214) 551-7710",
}) => {
  const prefilledMessage =
    "Hi Lolla! I'm interested in an item from your store.";

  return (
    <section
      className="relative h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/header.png')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center p-6 text-center text-white">
        {/* Store name */}
        <h1 className="font-serif text-6xl font-bold tracking-wide drop-shadow-lg md:text-8xl">
          {storeName}
        </h1>

        {/* Tagline */}
        <p className="mt-4 max-w-2xl font-sans text-lg font-light drop-shadow-md md:text-xl">
          {tagline}
        </p>

        {/* Call-to-action buttons */}
        <div className="mt-8 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
          {/* Text Us */}
          <a
            href={`sms:${phoneNumberHref}?&body=${encodeURIComponent(
              prefilledMessage
            )}`}
            aria-label="Text us"
            className="flex items-center justify-center gap-2 rounded-md bg-[#d1b49f] px-8 py-3 font-sans text-sm font-bold uppercase tracking-widest text-white shadow-lg transition-all duration-300 sm:w-auto hover:bg-[#a08c78] hover:-translate-y-1 hover:shadow-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                clipRule="evenodd"
              />
            </svg>
            Text Us
          </a>

          {/* Call Us */}
          <a
            href={`tel:${phoneNumberHref}`}
            aria-label="Call us"
            className="flex items-center justify-center gap-2 rounded-md border border-[#d1b49f] bg-transparent px-8 py-3 font-sans text-sm font-bold uppercase tracking-widest text-white shadow-lg transition-all duration-300 sm:w-auto hover:bg-[#d1b49f]/20 hover:shadow-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Call Us
          </a>
        </div>

        {/* Visible phone number */}
        <p className="mt-6 font-sans text-base tracking-wide text-white/90">
          Ready to find your look? Reach us at {phoneNumberDisplay}
        </p>
      </div>
    </section>
  );
};

export default LandingHero;
