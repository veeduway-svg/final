import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Priya Shankar",
      location: "Chennai",
      quote: "Finally understood the entire home construction process. No more confusion!",
      initials: "PS",
      position: "md:translate-y-0"
    },
    {
      name: "Rajesh Kumar",
      location: "Coimbatore",
      quote: "Clear guidance at every step. Wish I had this when I started planning.",
      initials: "RK",
      position: "md:translate-y-12"
    },
    {
      name: "Anitha Venkat",
      location: "Madurai",
      quote: "The roadmap made everything simple. Now I know exactly what to do next.",
      initials: "AV",
      position: "md:translate-y-6"
    }
  ];

  return (
    <section id="testimonials" className="relative bg-veeduway-alt pt-0 pb-16 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-200 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-veeduway-text mb-6">
            We're Here to Make Things Clear
          </h2>
          <p className="text-xl md:text-2xl text-veeduway-muted max-w-3xl mx-auto">
            Real stories from customers who built their dream home with VeeduWay's guidance
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`${testimonial.position} transition-all duration-300 hover:-translate-y-2`}
            >
              <div className="bg-veeduway-card rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-veeduway-border">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="text-lg font-bold text-white">
                      {testimonial.initials}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-veeduway-text text-lg">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-veeduway-muted">
                      {testimonial.location}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <p className="text-veeduway-text leading-relaxed text-base">
                  "{testimonial.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
