import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
    {
        name: "Patricia James",
        text:
            "Nullam orci dui, dictum et magna sollicitudin, tempor blandit erat. Maecenas suscipit tellus sit amet augue placerat fringilla a id lacus. Morbi viverra volutpat ex, id pellentesque felis volutpat eu. Etiam mattis laoreet leo sed accumsan. Fusce tincidunt in leo lacinia condimentum.",
    },
    {
        name: "Patric Stone",
        text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi viverra volutpat ex, id pellentesque felis volutpat eu. Nullam facilisis at turpis eu faucibus. In dignissim, enim eu ornare aliquet, metus ex tempor neque, sit amet efficitur turpis lorem et odio.",
    },
    {
        name: "Hugo James",
        text:
            "Morbi viverra volutpat ex, id pellentesque felis volutpat eu. Duis et tellus imperdiet, lacinia risus id, tincidunt ipsum. Integer euismod elit vel nibh commodo, at consequat nisl rhoncus. Etiam mattis laoreet leo sed accumsan. Aliquam tempor lorem odio, non aliquam nunc egestas in.",
    },
    {
        name: "Stefanie Rashford",
        text:
            "Nullam orci dui, dictum et magna sollicitudin, tempor blandit erat. Maecenas suscipit tellus sit amet augue placerat fringilla a id lacus. Fusce tincidunt in leo lacinia condimentum. Donec placerat, orci vel consequat mattis, sapien lacus pretium mi, sed lacinia dolor nibh non mi.",
    },
    {
        name: "Anastasia Stone",
        text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam facilisis at turpis eu faucibus. In dignissim, enim eu ornare aliquet, metus ex tempor neque, sit amet efficitur turpis lorem et odio.",
    },
];

function TestimonialsSection() {
    return (
        <section
            className="py-20 bg-cover bg-center bg-no-repeat text-white"
            style={{
                backgroundImage: "url('/image/charter.jpg')", // ✅ Use your image
            }}
        >
            <div className="max-w-3xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Testimonials</h2>
                <p className="text-lg font-semibold text-yellow-300 mb-6">
                    What Our Customers Say
                </p>
                <p className="text-sm md:text-base text-black mb-10">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                    facilisis at turpis eu faucibus. In dignissim, enim eu ornare aliquet,
                    metus ex tempor neque, sit amet efficitur turpis lorem et odio.
                </p>

                {/* Swiper Slider */}
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 2000 }}
                    speed={1300}
                    loop
                >
                    {testimonials.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
                                <p className="text-sm md:text-base mb-4">{item.text}</p>
                                <h4 className="font-semibold text-blue-600">{item.name}</h4>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                
            </div>
            <div className="text-center mt-12">
                    <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-blue-700 transition">
                        Read More
                        <ArrowRight size={16} />
                    </button>
                </div>
        </section>
    );
}

export default TestimonialsSection;
