import { Play } from "lucide-react";

const videos = [
  {
    name: "Mr. Agarwal",
    project: "Mansarovar Villa",
    thumb: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    quote: "The most professional construction experience in Jaipur.",
  },
  {
    name: "Sharma Family",
    project: "NRI Residence",
    thumb: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=900&q=80",
    quote: "Built our home from Dubai. Live tracking changed everything.",
  },
  {
    name: "Mr. Goyal",
    project: "C-Scheme Heritage",
    thumb: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
    quote: "They preserved our family bungalow's soul. Magical work.",
  },
];

export function VideoTestimonials() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Client Stories</p>
          <h2 className="mt-3 font-display text-3xl lg:text-5xl font-bold tracking-tight">
            Hear it from <span className="text-gold">real clients.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {videos.map((v) => (
            <button
              key={v.name}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-soft hover:shadow-elegant transition-shadow"
            >
              <img src={v.thumb} alt={v.name} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-transparent" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="w-16 h-16 rounded-full bg-gold text-gold-foreground grid place-items-center shadow-gold group-hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 text-left text-white">
                <div className="text-xs text-gold font-semibold tracking-wider uppercase">{v.project}</div>
                <div className="font-display font-bold text-lg mt-1">{v.name}</div>
                <p className="text-sm text-white/80 mt-1.5">"{v.quote}"</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default VideoTestimonials;
