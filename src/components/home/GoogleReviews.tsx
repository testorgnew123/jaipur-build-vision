import { Star } from "lucide-react";
import { reviews, aggregateRating } from "@/data/reviews";

const googleProfileUrl = "https://share.google/6YgEo5rHtYl0JexCO";

export function GoogleReviews() {
  return (
    <section className="py-20 lg:py-28 bg-muted/40">
      <div className="container-px mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
            Google Reviews
          </p>
          <h2 className="mt-3 font-display text-3xl lg:text-5xl font-bold tracking-tight">
            <span className="text-gold">{aggregateRating.rating} stars</span> from {aggregateRating.count} reviews
          </h2>
          <div className="mt-4 flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-gold fill-gold" />
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {reviews.map((r) => (
            <div
              key={r.author}
              className="rounded-2xl bg-background border border-border p-6 hover:shadow-soft transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-gold text-ink grid place-items-center font-display font-bold">
                  {r.initial}
                </div>
                <div>
                  <div className="font-semibold text-sm">{r.author}</div>
                  <div className="text-xs text-muted-foreground">{r.date}</div>
                </div>
              </div>
              <div className="mt-3 flex">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-gold fill-gold" />
                ))}
              </div>
              <div className="mt-3 space-y-3 text-sm text-foreground/85 leading-relaxed">
                {r.text
                  .split(/\n+/)
                  .map((s) => s.trim())
                  .filter(Boolean)
                  .map((para, i, arr) => (
                    <p key={i}>
                      {i === 0 ? `"${para}` : para}
                      {i === arr.length - 1 ? `"` : ""}
                    </p>
                  ))}
              </div>
              {r.project && (
                <div className="mt-3 text-xs text-muted-foreground">- {r.project}</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={googleProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink/90"
          >
            View Google profile
          </a>
        </div>
      </div>
    </section>
  );
}
