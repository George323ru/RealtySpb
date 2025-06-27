import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, User, Tag, ArrowRight, Filter } from "lucide-react";
import { useState } from "react";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  
  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const categories = [
    "Покупка", "Продажа", "Аренда", "Новостройки", "Инвестиции", 
    "Право", "Дизайн", "Ремонт", "Советы", "Рынок"
  ];

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  const filteredPosts = regularPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (date: string | Date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 py-20 min-h-[70vh] flex items-center">
        {/* Enhanced Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        
        {/* Background Image with Enhanced Contrast */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920')"}}
        ></div>
        
        {/* Additional Gradient Overlay for Better Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-transparent to-blue-900/80"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Enhanced Typography with Better Contrast */}
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight text-white drop-shadow-2xl">
              Блог о{" "}
              <span className="text-yandex-yellow drop-shadow-lg">недвижимости</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-12 font-light text-white/95 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
              Полезные статьи, советы экспертов и новости рынка недвижимости Санкт-Петербурга
            </p>
            
            {/* Enhanced Stats Cards with Better Visibility */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-bold text-yandex-yellow mb-3 drop-shadow-lg">{posts.length}</div>
                <div className="text-base text-white/90 font-medium">Статей в блоге</div>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-bold text-yandex-yellow mb-3 drop-shadow-lg">{categories.length}</div>
                <div className="text-base text-white/90 font-medium">Категорий</div>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-bold text-yandex-yellow mb-3 drop-shadow-lg">2×</div>
                <div className="text-base text-white/90 font-medium">в неделю</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                  Рекомендуемая статья
                </h2>
              </div>
              
              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-full">
                    <img
                      src={featuredPost.image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-accent-orange text-white">
                        {featuredPost.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-text-primary mb-4">
                        {featuredPost.title}
                      </h3>
                      <p className="text-text-secondary mb-6 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center text-sm text-text-secondary mb-6">
                        <User className="w-4 h-4 mr-2" />
                        <span className="mr-4">{featuredPost.author}</span>
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{formatDate(featuredPost.createdAt)}</span>
                      </div>
                    </div>
                    <Link href={`/blog/${featuredPost.slug}`}>
                      <Button className="bg-accent-orange hover:bg-orange-600 text-white">
                        Читать статью
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Search and Filters */}
      <section className="py-8 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-4 h-4" />
                <Input
                  placeholder="Поиск по статьям..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Все категории" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все категории</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">
                Все статьи
              </h2>
              <span className="text-text-secondary">
                Найдено {filteredPosts.length} статей
              </span>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-neutral-200"></div>
                    <CardContent className="p-6">
                      <div className="h-4 bg-neutral-200 rounded mb-2"></div>
                      <div className="h-4 bg-neutral-200 rounded mb-4 w-3/4"></div>
                      <div className="h-16 bg-neutral-200 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredPosts.length === 0 ? (
              <Card className="p-12 text-center">
                <Filter className="w-12 h-12 mx-auto mb-4 opacity-50 text-text-secondary" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Статьи не найдены
                </h3>
                <p className="text-text-secondary">
                  Попробуйте изменить поисковый запрос или фильтры
                </p>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post) => (
                    <Card key={post.id} className="group hover:shadow-xl transition-shadow h-full flex flex-col">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={post.image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400"}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-accent-orange text-white">
                            {post.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardContent className="p-6 flex flex-col flex-1">
                        <h3 className="text-xl font-semibold text-text-primary mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-text-secondary mb-4 text-sm leading-relaxed flex-1">
                          {truncateText(post.excerpt, 120)}
                        </p>
                        
                        <div className="flex items-center text-xs text-text-secondary mb-4">
                          <User className="w-3 h-3 mr-1" />
                          <span className="mr-3">{post.author}</span>
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                        
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-4 min-h-[28px]">
                            {post.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        <Link href={`/blog/${post.slug}`} className="mt-auto">
                          <Button 
                            variant="ghost" 
                            className="w-full text-accent-orange hover:text-orange-600 hover:bg-orange-50"
                          >
                            Читать далее
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-12">
                  <Button variant="outline" className="px-8 py-3">
                    Показать больше статей
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Категории
              </h2>
              <p className="text-lg text-text-secondary">
                Изучайте интересующие вас темы
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((category, index) => (
                <Card 
                  key={index} 
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedCategory(category)}
                >
                  <CardContent className="p-6 text-center">
                    <Tag className="w-8 h-8 mx-auto mb-3 text-accent-orange" />
                    <h3 className="font-semibold text-text-primary mb-2">{category}</h3>
                    <p className="text-sm text-text-secondary">
                      {posts.filter(post => post.category === category).length} статей
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Подписаться на обновления
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Получайте новые статьи и полезные советы о недвижимости на вашу почту
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Ваш email"
                className="bg-white text-text-primary"
              />
              <Button className="bg-white text-purple-600 hover:bg-neutral-100 px-8 font-semibold">
                Подписаться
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
