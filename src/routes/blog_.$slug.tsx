import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_URL, articleSchema } from "@/lib/schema";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  author: string;
  published_at: string;
  reading_time: string;
  tags: string[];
  content: string;
}

export const Route = createFileRoute("/blog_/$slug")({
  loader: async ({ params }) => {
    const [postRes, allRes] = await Promise.all([
      fetch(`/api/posts/${params.slug}`),
      fetch("/api/posts"),
    ]);
    if (postRes.status === 404) throw notFound();
    if (!postRes.ok) throw new Error("Failed to load post");
    const post = (await postRes.json()) as Post;
    const allPosts = allRes.ok ? ((await allRes.json()) as Post[]) : [];
    const related = allPosts.filter((p) => p.slug !== params.slug).slice(0, 3);
    return { post, related };
  },
  head: ({ loaderData, params }) => {
    const p = loaderData?.post;
    const canonical = `${SITE_URL}/blog/${params.slug}`;
    if (!p) {
      return { meta: [{ title: "Article — SingleStop" }], links: [{ rel: "canonical", href: canonical }] };
    }
    const title = `${p.title} | SingleStop Blog`;
    return {
      meta: [
        { title },
        { name: "description", content: p.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt },
        { property: "og:image", content: p.cover },
        { property: "og:url", content: canonical },
        { name: "twitter:image", content: p.cover },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            articleSchema({
              title: p.title,
              description: p.excerpt,
              image: p.cover,
              author: p.author,
              publishedAt: p.published_at,
              slug: p.slug,
            }),
          ),
        },
      ],
    };
  },
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="min-h-screen grid place-items-center px-4 text-center">
        <div>
          <p className="text-destructive">{error.message}</p>
          <Button onClick={() => { router.invalidate(); reset(); }} className="mt-4">Retry</Button>
        </div>
      </div>
    );
  },
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center px-4 text-center">
      <div>
        <h1 className="font-display text-4xl font-bold">Article not found</h1>
        <Button asChild className="mt-6 bg-gold text-gold-foreground hover:bg-gold/90">
          <Link to="/blog">Back to blog</Link>
        </Button>
      </div>
    </div>
  ),
  component: PostPage,
});

function PostPage() {
  const { post: p, related } = Route.useLoaderData();

  return (
    <>
      <article className="pt-32 lg:pt-40 pb-20">
        <div className="container-px mx-auto max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-gold">
            <ArrowLeft className="w-4 h-4" /> All articles
          </Link>
          <div className="mt-6 flex flex-wrap gap-2">
            {p.tags.map((t: string) => (
              <span key={t} className="px-2.5 py-1 rounded-full bg-gold-soft text-gold text-xs font-bold uppercase tracking-wider">{t}</span>
            ))}
          </div>
          <h1 className="mt-4 font-display text-4xl lg:text-6xl font-bold tracking-tight leading-[1.05]">{p.title}</h1>
          <p className="mt-5 text-lg text-muted-foreground">{p.excerpt}</p>
          <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
            <span>By <span className="font-semibold text-foreground">{p.author}</span></span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(p.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {p.reading_time}</span>
          </div>
        </div>

        <div className="container-px mx-auto max-w-5xl mt-10">
          <div className="rounded-2xl overflow-hidden aspect-[16/9] shadow-elegant">
            <img src={p.cover} alt={p.title} className="w-full h-full object-cover" fetchPriority="high" />
          </div>
        </div>

        <div className="container-px mx-auto max-w-3xl mt-12">
          <div
            className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-h2:mt-10 prose-a:text-gold"
            dangerouslySetInnerHTML={{ __html: p.content }}
          />
        </div>
      </article>

      {related.length > 0 && (
        <section className="py-20 bg-muted/40">
          <div className="container-px mx-auto max-w-7xl">
            <h2 className="font-display text-3xl font-bold mb-8">Keep reading</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link key={r.slug} to="/blog/$slug" params={{ slug: r.slug }} className="block rounded-2xl overflow-hidden bg-background border border-border hover:shadow-soft transition-shadow">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={r.cover} alt={r.title} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-base">{r.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
