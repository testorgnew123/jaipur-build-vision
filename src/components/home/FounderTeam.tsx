import { Linkedin, Award } from "lucide-react";

const team = [
  {
    name: "Rohit Sharma",
    role: "Founder & Principal Architect",
    bio: "B.Arch (CEPT), 14+ years. Led 100+ residential and commercial projects across Jaipur.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Anjali Mehta",
    role: "Head of Design",
    bio: "M.Des. Specialist in luxury interiors and Vastu-compliant modern homes.",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Vikas Choudhary",
    role: "Head of Construction",
    bio: "Civil engineer with 18+ years on Jaipur sites. Safety-first, deadline-obsessed.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
  },
];

export function FounderTeam() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Leadership</p>
          <h2 className="mt-3 font-display text-3xl lg:text-5xl font-bold tracking-tight">
            People you can <span className="text-gold">trust.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {team.map((m, i) => (
            <div
              key={m.name}
              className={`rounded-2xl overflow-hidden border border-border bg-card hover:shadow-elegant transition-shadow ${
                i === 0 ? "lg:col-span-1 ring-1 ring-gold/30" : ""
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={m.img}
                  alt={m.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg">{m.name}</h3>
                  <Linkedin className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="text-xs font-semibold text-gold tracking-wider uppercase mt-1">
                  {m.role}
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
                {i === 0 && (
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-gold font-semibold">
                    <Award className="w-3.5 h-3.5" /> IIID Award 2023
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
