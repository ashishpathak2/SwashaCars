// components/HeroContent.jsx
// No "use client" - this is a Server Component
import Image from "next/image";
import Link from "next/link";

export const HeroContent = () => {
  return (
    <section
      className="text-white min-h-screen w-full overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="responsive-container relative mt-20 mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-20">
        {/* Blur Element - Static */}
        <div
          className="absolute top-0 left-0 w-64 h-64 md:w-80 md:h-80 rounded-full bg-blue-500/10 blur-3xl -translate-x-1/4 -translate-y-1/4 z-0"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-5 lg:gap-5 py-3 sm:py-5">
            {/* Left Side */}
            <div className="flex flex-col justify-between h-full">
              <h1
                id="hero-heading"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wide leading-tight sm:leading-tight md:leading-tight"
              >
                Elevate Your Travel Experience with Swasha Cars
              </h1>
              <div className="flex w-full h-full gap-4 sm:gap-4 md:gap-5 mt-3 sm:mt-8 md:mt-10 lg:mt-12">
                <figure className="relative w-1/2 aspect-[4/5] sm:aspect-[3/4] md:aspect-square rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/40 shadow-2xl shadow-white/25 backdrop-blur-lg">
                  <Image
                    src="/hero1.jpg"
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                    alt="Paint Protection Film Service - Swasha Cars"
                    priority
                  />
                  <figcaption className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-white rounded-full px-1.5 sm:px-2 py-[2px] sm:py-[4px] text-black font-bold text-[10px] sm:text-xs whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(100%-16px)]">
                    Paint Protection Films
                  </figcaption>
                </figure>
                <figure className="relative w-1/2 aspect-[4/5] sm:aspect-[3/4] md:aspect-square rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/40 shadow-2xl shadow-white/25 backdrop-blur-lg">
                  <Image
                    src="/hero2.jpg"
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                    alt="Detailing and Interior Cleaning - Swasha Cars"
                    priority
                  />
                  <figcaption className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-white rounded-full px-1.5 sm:px-2 py-[2px] sm:py-[4px] text-black font-bold text-[10px] sm:text-xs whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(100%-16px)]">
                    Detailing and Interior Cleaning
                  </figcaption>
                </figure>
              </div>
            </div>

            {/* Right Side */}
            <figure className="h-full w-full relative mt-4 md:mt-0 aspect-video sm:aspect-auto md:aspect-square lg:aspect-auto rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/40 shadow-2xl shadow-white/25 backdrop-blur-lg">
              <Image
                src="/hero3.jpg"
                width={400}
                height={400}
                className="w-full h-full object-cover"
                alt="Ceramic and Graphene Coating Service - Swasha Cars"
                priority
              />
              <figcaption className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-white rounded-full px-1.5 sm:px-2 py-[2px] sm:py-[4px] text-black font-bold text-[10px] sm:text-xs whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(100%-16px)]">
                Ceramic and Graphene Coatings
              </figcaption>
            </figure>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-5 md:gap-6 mt-6 md:mt-6">
            <p className="text-sm sm:text-base md:text-md lg:text-base font-thin tracking-wide text-center md:text-left w-full md:w-2/3 lg:pr-8">
Drive with confidence across Kolkata's busy streets! At SwashaCars, we provide top-quality car servicing, repairs, and maintenance in Kolkata, using expert technicians and cutting-edge technology to ensure your vehicle runs smoothly and safely through all city conditions, making every journey worry-free.            </p>
            <Link
              href="/contacts"
              className="w-full md:w-auto flex items-center justify-center gap-2 text-xl tracking-widest font-semibold px-8 sm:px-12 lg:px-16 py-3 sm:py-4 lg:py-4 rounded-full bg-primary text-black shadow-lg shadow-primary/30 transition-all whitespace-nowrap mt-4 md:mt-0 hover:scale-105 hover:shadow-xl"
              aria-label="Schedule a car service with Swasha Cars now"
            >
              Schedule Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroContent;