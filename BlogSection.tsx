import { useState, useEffect } from 'react';
import { supabase, type BlogPost } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const categories = ['All', 'Tips & Guides', 'Budgeting'];

export default function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <section className="py-24 bg-gradient-to-b from-veeduway-card to-veeduway-base">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-veeduway-muted text-lg mb-4">
            Expert Insights for Smart Home Builders
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-veeduway-text mb-12">
            Explore the VeeduWay Blog
          </h2>

          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-6 py-2 font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-veeduway-accent hover:bg-veeduway-accentHover text-white shadow-md'
                    : 'bg-veeduway-alt hover:bg-veeduway-border text-veeduway-text border-0'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <Card key={i} className="overflow-hidden border-0 shadow-lg bg-veeduway-card">
                <div className="aspect-[4/3] bg-gray-200 animate-pulse" />
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 rounded animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-veeduway-card">
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif font-semibold text-veeduway-text mb-2 group-hover:text-veeduway-accent transition-colors underline decoration-2 underline-offset-4">
                    {post.title}
                  </h3>
                  <p className="text-veeduway-muted text-sm line-clamp-2">
                    {post.excerpt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-veeduway-muted text-lg">
              No blog posts found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
