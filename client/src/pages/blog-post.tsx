import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Share2, 
  Facebook, 
  Twitter, 
  MessageCircle,
  Tag,
  ArrowRight
} from "lucide-react";
import { useState } from "react";
import type { BlogPost } from "@shared/schema";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug || '';
  const [isSharing, setIsSharing] = useState(false);

  const { data: post, isLoading } = useQuery<BlogPost>({
    queryKey: [`/api/blog/${slug}`],
  });

  const { data: relatedPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
    select: (posts) => posts.filter(p => p.slug !== slug && p.category === post?.category).slice(0, 3),
    enabled: !!post,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const handleShare = (platform: 'facebook' | 'twitter' | 'vk') => {
    const url = window.location.href;
    const title = post?.title || '';
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'vk':
        shareUrl = `https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
        break;
    }
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded mb-8 w-1/4"></div>
              <div className="h-64 bg-muted rounded mb-8"></div>
              <div className="h-6 bg-muted rounded mb-4"></div>
              <div className="h-4 bg-muted rounded mb-8 w-1/2"></div>
              <div className="space-y-3">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="h-4 bg-muted rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Статья не найдена
          </h2>
          <p className="text-muted-foreground mb-4">
            Возможно, статья была удалена или перемещена
          </p>
          <Link href="/blog">
            <Button>Вернуться к блогу</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const tableOfContents = [
    { id: "introduction", title: "Введение" },
    { id: "main-points", title: "Основные моменты" },
    { id: "tips", title: "Полезные советы" },
    { id: "conclusion", title: "Заключение" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-white border-b border">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-accent">Главная</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-accent">Блог</Link>
              <span>/</span>
              <span className="text-foreground">{post.category}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/blog">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад к блогу
            </Button>
          </Link>

          {/* Article Header */}
          <article className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Featured Image */}
            <div className="relative h-64 md:h-96">
              <img
                src={post.image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200"}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-accent text-foreground">
                  {post.category}
                </Badge>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-8">
              {/* Title and Meta */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                  {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{estimateReadingTime(post.content)} мин чтения</span>
                  </div>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Share Buttons */}
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-foreground">Поделиться:</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleShare('facebook')}
                    className="text-blue-600 hover:bg-blue-50"
                  >
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleShare('twitter')}
                    className="text-blue-400 hover:bg-blue-50"
                  >
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleShare('vk')}
                    className="text-blue-700 hover:bg-blue-50"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      setIsSharing(true);
                      setTimeout(() => setIsSharing(false), 2000);
                    }}
                  >
                    <Share2 className="w-4 h-4 mr-1" />
                    {isSharing ? 'Скопировано!' : 'Ссылка'}
                  </Button>
                </div>
              </div>

              <Separator className="my-8" />

              {/* Table of Contents */}
              <Card className="mb-8 bg-background">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">Содержание статьи</h3>
                  <ul className="space-y-2">
                    {tableOfContents.map((item, index) => (
                      <li key={index}>
                        <a 
                          href={`#${item.id}`}
                          className="text-muted-foreground hover:text-accent transition-colors text-sm"
                        >
                          {index + 1}. {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Article Excerpt */}
              <div className="text-lg text-muted-foreground leading-relaxed mb-8 p-6 bg-background rounded-lg border-l-4 border-accent-orange">
                {post.excerpt}
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <div id="introduction" className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Введение</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {post.content.split('\n')[0] || "Основной контент статьи будет отображен здесь. Это введение к теме, которая рассматривается в данной статье."}
                  </p>
                </div>

                <div id="main-points" className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Основные моменты</h2>
                  <div className="text-muted-foreground leading-relaxed space-y-4">
                    {post.content.split('\n').slice(1, 4).map((paragraph, index) => (
                      <p key={index}>{paragraph || `Здесь представлен основной контент статьи "${post.title}". Эта часть содержит детальное рассмотрение темы с практическими примерами и рекомендациями.`}</p>
                    ))}
                  </div>
                </div>

                <div id="tips" className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Полезные советы</h2>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
                    <h3 className="font-semibold text-blue-800 mb-2">💡 Совет эксперта</h3>
                    <p className="text-blue-700">
                      При работе с недвижимостью всегда обращайтесь к проверенным специалистам и тщательно изучайте все документы.
                    </p>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Всегда проверяйте юридическую чистоту объекта</li>
                    <li>Изучайте рынок и сравнивайте цены</li>
                    <li>Обращайтесь к профессиональным риэлторам</li>
                    <li>Не торопитесь с принятием решений</li>
                  </ul>
                </div>

                <div id="conclusion" className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Заключение</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {post.content.split('\n').slice(-1)[0] || `В заключение можно сказать, что тема "${post.title}" требует внимательного изучения и профессионального подхода. Следуйте рекомендациям экспертов и не стесняйтесь обращаться за консультацией.`}
                  </p>
                </div>
              </div>

              <Separator className="my-8" />

              {/* Author Bio */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent-orange to-orange-600 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">Об авторе: {post.author}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Эксперт по недвижимости с многолетним опытом работы на рынке Санкт-Петербурга. 
                        Специализируется на консультировании клиентов по вопросам покупки, продажи и аренды недвижимости.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-foreground mb-8">Похожие статьи</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="group hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={relatedPost.image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400"}
                        alt={relatedPost.title}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-accent text-foreground text-xs">
                          {relatedPost.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2 text-sm">
                        {relatedPost.title}
                      </h3>
                      <p className="text-muted-foreground text-xs mb-3 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <Button variant="ghost" size="sm" className="text-accent hover:text-orange-600 p-0">
                          Читать →
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
