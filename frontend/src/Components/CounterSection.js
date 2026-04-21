import React from "react";
import  {ScrollCounter} from "./common/Elements";

function CounterSection() {
  return (
    // fae8b8
    <section className="text-center py-16 text-white bg-gradient-to-r from-[#ffdd8c] via-[#ffa47c] to-[#ffd677] pt-[90px]">
      <div className=""></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-20 lg:gap-8 justify-center items-center w-[80vw] md:w-[58vw] lg:w-[90vw] mx-auto">
        {/* First Card */}
        <div className="mx-auto relative flex flex-col justify-center w-[80vw] sm:w-[250px] h-[280px] rounded-lg bg-[#ffea62] group overflow-hidden">
          <div className="transition-all duration-300 group-hover:mb-32">
            <div className="text-4xl font-bold text-[#272727]">
              <ScrollCounter targetNumber={15} duration={1000} className="counter" />
            </div>
            <div className="text-[#000000]">Years of Expertise</div>
          </div>
        </div>

        {/* Second Card */}
        <div className="relative flex flex-col justify-center w-[80vw] sm:w-[250px] h-[280px] rounded-lg bg-[#ff7f35] group overflow-hidden">
          <div className="transition-all duration-300 group-hover:mb-32">
            <div className="text-4xl font-bold text-[#272727]">
              <ScrollCounter targetNumber={1000} duration={1000} className="counter" />
            </div>
            <div className="text-[#000000]">Products Supplied</div>
          </div>
        </div>

        {/* Third Card */}
        <div className="relative flex flex-col justify-center w-[80vw] sm:w-[250px] h-[280px] rounded-lg bg-[#ffc30e] group overflow-hidden">
          <div className="transition-all duration-300 group-hover:mb-32">
            <div className="text-4xl font-bold text-[#272727]">
              <ScrollCounter targetNumber={500} duration={1000} className="counter" />
            </div>
            <div className="text-[#000000]">Happy Clients</div>
          </div>
        </div>

        {/* Fourth Card */}
        <div className="relative flex flex-col justify-center w-[80vw] sm:w-[250px] h-[280px] rounded-lg bg-[#ff598b] group overflow-hidden">
          <div className="transition-all duration-300 group-hover:mb-32">
            <div className="text-4xl font-bold text-[#272727]">
              <ScrollCounter targetNumber={10} duration={1000} className="counter" />
            </div>
            <div className="text-[#000000]">Certifications & Accreditations</div>
          </div>
        </div>
      </div>

      {/* Slanted Line */}
      {/* <div className="relative w-full h-0 border-t-[150px] border-transparent border-r-[160vw] border-r-white transform rotate-2 -mt-10 -ml-32 -mb-24"></div> */}
    </section>
  );
}

export default CounterSection;
