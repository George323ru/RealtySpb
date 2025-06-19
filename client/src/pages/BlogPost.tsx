import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  User,
  Eye,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  BookOpen,
  Clock,
  Tag
} from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function BlogPostPage() {
  const { slug } = useParams();

  const { data: blogPost, isLoading, error } = useQuery<BlogPost>({
    queryKey: [`/api/blog/${slug}`],
    enabled: !!slug,
  });

  const { data: relatedPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog", { published: true }],
    queryFn: async () => {
      const response = await fetch("/api/blog?published=true");
      if (!response.ok) throw new Error('Failed to fetch blog posts');
      return response.json();
    },
    enabled: !!blogPost,
    select: (posts) => posts.filter(post => 
      post.id !== blogPost?.id && 
      post.category === blogPost?.category
    ).slice(0, 3),
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Рынок недвижимости": "bg-blue-100 text-blue-600",
      "Инвестиции": "bg-green-100 text-green-600",
      "Законодательство": "bg-purple-100 text-purple-600",
      "Новостройки": "bg-orange-100 text-orange-600",
      "Ипотека": "bg-yellow-100 text-yellow-600",
      "Советы покупателям": "bg-cyan-100 text-cyan-600",
      "Советы продавцам": "bg-red-100 text-red-600",
      "Аренда": "bg-indigo-100 text-indigo-600",
    };
    return colors[category] || "bg-gray-100 text-gray-600";
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = blogPost?.title || '';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
            <div className="max-w-4xl mx-auto">
              <div className="h-96 bg-gray-200 rounded-2xl mb-8"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <div className="text-gray-400 mb-4">
              <BookOpen className="w-16 h-16 mx-auto" />
            </div>
            <h1 className="text-2xl font-bold text-primary mb-2">Статья не найдена</h1>
            <p className="text-secondary mb-6">
              Возможно, статья была удалена или перемещена
            </p>
            <Link href="/blog">
              <Button className="bg-accent-orange hover:bg-orange-600">
                Вернуться к блогу
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-secondary mb-6">
          <Link href="/" className="hover:text-accent-orange">Главная</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-accent-orange">Блог</Link>
          <span>/</span>
          <span className="text-primary">{blogPost.title}</span>
        </nav>

        {/* Back Button */}
        <Button variant="outline" className="mb-6" onClick={() => window.history.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад к блогу
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-3">
            {/* Header Image */}
            {blogPost.image && (
              <div className="aspect-video rounded-2xl overflow-hidden mb-8">
                <img
                  src={blogPost.image}
                  alt={blogPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article Header */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <Badge className={getCategoryColor(blogPost.category)}>
                  {blogPost.category}
                </Badge>
                {blogPost.tags && blogPost.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-4 leading-tight">
                {blogPost.title}
              </h1>

              <p className="text-lg text-secondary leading-relaxed mb-6">
                {blogPost.excerpt}
              </p>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-secondary">
                {blogPost.createdAt && (
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(blogPost.createdAt)}
                  </div>
                )}
                
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {getReadingTime(blogPost.content)} мин чтения
                </div>
                
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  {Math.floor(Math.random() * 1000) + 100} просмотров
                </div>
              </div>
            </header>

            <Separator className="mb-8" />

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-secondary leading-relaxed whitespace-pre-line">
                {blogPost.content}
              </div>
            </div>

            <Separator className="my-8" />

            {/* Share Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-secondary">Поделиться:</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank')}
                >
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`, '_blank')}
                >
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank')}
                >
                  <Linkedin className="w-4 h-4" />
                </Button>
              </div>

              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Обсудить
              </Button>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Author Info */}
              {blogPost.authorId && (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Эксперт компании</h3>
                        <p className="text-sm text-secondary">Автор статьи</p>
                      </div>
                    </div>
                    <p className="text-sm text-secondary">
                      Специалист с многолетним опытом работы в сфере недвижимости
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Related Articles */}
              {relatedPosts.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Похожие статьи</h3>
                    <div className="space-y-4">
                      {relatedPosts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`}>
                          <div className="group cursor-pointer">
                            <h4 className="text-sm font-medium text-primary group-hover:text-accent-orange transition-colors line-clamp-2 mb-2">
                              {post.title}
                            </h4>
                            <p className="text-xs text-secondary">
                              {post.createdAt && formatDate(post.createdAt)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Categories */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Категории</h3>
                  <div className="space-y-2">
                    {[
                      "Рынок недвижимости",
                      "Инвестиции",
                      "Законодательство",
                      "Новостройки",
                      "Ипотека"
                    ].map((category) => (
                      <Link key={category} href={`/blog?category=${category}`}>
                        <div className="text-sm text-secondary hover:text-accent-orange transition-colors cursor-pointer">
                          {category}
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="bg-gradient-to-br from-accent-orange to-orange-600 text-text-primary">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-2">Нужна консультация?</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Получите экспертную помощь по недвижимости
                  </p>
                  <Link href="/contact">
                    <Button variant="secondary" size="sm" className="bg-white text-accent-orange hover:bg-gray-100">
                      Связаться с нами
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
