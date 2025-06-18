import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const categories = [
    { value: "all", label: "Все статьи" },
    { value: "market", label: "Рынок недвижимости" },
    { value: "buying", label: "Покупка жилья" },
    { value: "selling", label: "Продажа недвижимости" },
    { value: "investment", label: "Инвестиции" },
    { value: "legal", label: "Юридические вопросы" },
    { value: "tips", label: "Советы экспертов" }
  ];

  const filteredPosts = blogPosts?.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts?.[0];
  const regularPosts = filteredPosts?.slice(1);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const getCategoryLabel = (category: string) => {
    return categories.find(cat => cat.value === category)?.label || category;
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-700 to-slate-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Блог о недвижимости 
              <span className="text-yandex-yellow"> СПб</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Экспертные статьи, аналитика рынка и полезные советы от профессионалов недвижимости
            </p>
            
            {/* Search */}
            <div className="max-w-lg mx-auto relative">
              <Input
                type="text"
                placeholder="Поиск по статьям..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-4 text-lg bg-white text-gray-900"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.value)}
                className={selectedCategory === category.value 
                  ? "bg-accent-orange text-white hover:bg-orange-600" 
                  : "border-neutral-300 text-text-primary hover:border-accent-orange hover:text-accent-orange"
                }
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
                Главная статья
              </h2>
              
              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto">
                    <img
                      src={featuredPost.image || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3"}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-accent-orange text-white">
                      {getCategoryLabel(featuredPost.category)}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-8 flex flex-col justify-center">
                    <div className="flex items-center text-sm text-text-secondary mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(featuredPost.createdAt.toString())}
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4 line-clamp-2">
                      {featuredPost.title}
                    </h3>
                    
                    <p className="text-text-secondary mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    
                    <Link href={`/blog/${featuredPost.slug}`}>
                      <Button className="bg-accent-orange text-white hover:bg-orange-600 self-start">
                        Читать далее
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-text-primary">
              {selectedCategory === "all" ? "Все статьи" : getCategoryLabel(selectedCategory)}
            </h2>
            <div className="text-text-secondary">
              {filteredPosts?.length || 0} статей найдено
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                  <div className="bg-gray-300 h-6 rounded mb-2"></div>
                  <div className="bg-gray-300 h-4 rounded mb-4"></div>
                  <div className="bg-gray-300 h-10 rounded"></div>
                </div>
              ))}
            </div>
          ) : regularPosts && regularPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
                  <div className="relative">
                    <img
                      src={post.image || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3"}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-accent-orange text-white">
                      {getCategoryLabel(post.category)}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center text-sm text-text-secondary mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(post.createdAt.toString())}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-text-primary mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-text-secondary mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="outline" className="border-accent-orange text-accent-orange hover:bg-accent-orange hover:text-white w-full">
                        Читать статью
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                Статьи не найдены
              </h3>
              <p className="text-text-secondary mb-8">
                Попробуйте изменить параметры поиска или выбрать другую категорию
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="bg-accent-orange text-white hover:bg-orange-600"
              >
                Сбросить фильтры
              </Button>
            </div>
          )}

          {/* Load More */}
          {regularPosts && regularPosts.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" className="border-accent-orange text-accent-orange hover:bg-accent-orange hover:text-white">
                Загрузить еще статьи
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-gradient-to-r from-accent-orange to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Подпишитесь на рассылку
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Получайте свежие статьи о недвижимости и аналитику рынка прямо на почту
          </p>
          
          <div className="max-w-lg mx-auto flex gap-4">
            <Input
              type="email"
              placeholder="Ваш email"
              className="flex-1 bg-white text-gray-900"
            />
            <Button className="bg-white text-accent-orange hover:bg-gray-100">
              Подписаться
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Tags */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
              Популярные темы
            </h2>
            
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                "ипотека", "новостройки", "инвестиции", "налоги", "документы",
                "оценка", "ремонт", "районы спб", "цены", "прогнозы",
                "аренда", "коммерческая", "дача", "земля"
              ].map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-sm py-2 px-4 hover:bg-accent-orange hover:text-white cursor-pointer transition-colors"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
