import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LeadForm from "@/components/LeadForm";
import { Star, Quote, Filter, TrendingUp } from "lucide-react";
import type { Review } from "@shared/schema";

export default function Reviews() {
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const { data: reviews, isLoading } = useQuery<Review[]>({
    queryKey: ["/api/reviews"],
  });

  const filteredReviews = reviews?.filter(review => {
    if (filterBy === "all") return true;
    if (filterBy === "buy") return review.serviceType === "buy";
    if (filterBy === "sell") return review.serviceType === "sell";
    if (filterBy === "rent") return review.serviceType === "rent";
    if (filterBy === "5stars") return review.rating === 5;
    return true;
  });

  const sortedReviews = filteredReviews?.sort((a, b) => {
    switch (sortBy) {
      case "rating-desc":
        return b.rating - a.rating;
      case "rating-asc":
        return a.rating - b.rating;
      default:
        return b.id - a.id;
    }
  });

  const getServiceTypeLabel = (serviceType: string | null) => {
    const types = {
      buy: "Покупка",
      sell: "Продажа", 
      rent: "Аренда"
    };
    return serviceType ? types[serviceType as keyof typeof types] || serviceType : "Консультация";
  };

  const getPropertyTypeLabel = (propertyType: string | null) => {
    const types = {
      apartment: "Квартира",
      house: "Дом",
      commercial: "Коммерческая",
      land: "Земля"
    };
    return propertyType ? types[propertyType as keyof typeof types] || propertyType : "";
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const averageRating = reviews?.reduce((acc, review) => acc + review.rating, 0) / (reviews?.length || 1);
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews?.filter(r => r.rating === rating).length || 0,
    percentage: ((reviews?.filter(r => r.rating === rating).length || 0) / (reviews?.length || 1)) * 100
  }));

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Отзывы наших 
              <span className="text-yandex-yellow"> клиентов</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Честные отзывы от реальных клиентов о качестве наших услуг и профессионализме команды
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-yandex-yellow text-yandex-black hover:bg-yellow-400 px-8 py-4 text-lg font-semibold">
                Оставить отзыв
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg">
                Получить консультацию
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Overall Rating */}
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-text-primary mb-6">
                  Общая оценка наших услуг
                </h2>
                
                <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-accent-orange mb-2">
                      {averageRating.toFixed(1)}
                    </div>
                    <div className="flex justify-center mb-2">
                      {renderStars(Math.round(averageRating))}
                    </div>
                    <div className="text-text-secondary">
                      на основе {reviews?.length || 0} отзывов
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    {ratingDistribution.map(({ rating, count, percentage }) => (
                      <div key={rating} className="flex items-center gap-3 mb-2">
                        <span className="text-sm text-text-secondary w-8">
                          {rating}★
                        </span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-text-secondary w-8">
                          {count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-green-500 mb-2">98%</div>
                    <div className="text-text-primary font-semibold mb-1">
                      Довольных клиентов
                    </div>
                    <div className="text-sm text-text-secondary">
                      Рекомендуют нас друзьям
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-blue-500 mb-2">4.8</div>
                    <div className="text-text-primary font-semibold mb-1">
                      Средняя оценка
                    </div>
                    <div className="text-sm text-text-secondary">
                      По всем направлениям
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-purple-500 mb-2">95%</div>
                    <div className="text-text-primary font-semibold mb-1">
                      Сделок в срок
                    </div>
                    <div className="text-sm text-text-secondary">
                      Выполняем обязательства
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-orange-500 mb-2">24/7</div>
                    <div className="text-text-primary font-semibold mb-1">
                      Поддержка
                    </div>
                    <div className="text-sm text-text-secondary">
                      Всегда на связи
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews List */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-text-primary">
                {sortedReviews?.length || 0} отзывов
              </h2>
              <p className="text-text-secondary">Читайте опыт наших клиентов</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все отзывы</SelectItem>
                  <SelectItem value="buy">Покупка</SelectItem>
                  <SelectItem value="sell">Продажа</SelectItem>
                  <SelectItem value="rent">Аренда</SelectItem>
                  <SelectItem value="5stars">Только 5 звезд</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Сначала новые</SelectItem>
                  <SelectItem value="rating-desc">Сначала лучшие</SelectItem>
                  <SelectItem value="rating-asc">Сначала худшие</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reviews Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <div>
                      <div className="bg-gray-300 h-4 w-24 rounded mb-1"></div>
                      <div className="bg-gray-300 h-3 w-16 rounded"></div>
                    </div>
                  </div>
                  <div className="bg-gray-300 h-4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
                </div>
              ))}
            </div>
          ) : sortedReviews && sortedReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedReviews.map((review) => (
                <Card key={review.id} className="hover:shadow-lg transition-shadow bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={review.clientPhoto || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=400&h=400"}
                        alt={review.clientName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-text-primary">
                          {review.clientName}
                        </h3>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm text-text-secondary">
                            {review.rating}/5
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mb-4">
                      {review.serviceType && (
                        <Badge variant="outline" className="text-xs">
                          {getServiceTypeLabel(review.serviceType)}
                        </Badge>
                      )}
                      {review.propertyType && (
                        <Badge variant="outline" className="text-xs">
                          {getPropertyTypeLabel(review.propertyType)}
                        </Badge>
                      )}
                    </div>

                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 w-6 h-6 text-accent-orange opacity-50" />
                      <p className="text-text-secondary leading-relaxed pl-4">
                        {review.reviewText}
                      </p>
                    </div>

                    <div className="mt-4 text-xs text-text-secondary">
                      {new Date(review.createdAt).toLocaleDateString("ru-RU", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">⭐</div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                Отзывы не найдены
              </h3>
              <p className="text-text-secondary mb-8">
                Попробуйте изменить фильтры или станьте первым, кто оставит отзыв
              </p>
              <Button 
                onClick={() => {
                  setFilterBy("all");
                  setSortBy("newest");
                }}
                className="bg-accent-orange text-white hover:bg-orange-600"
              >
                Сбросить фильтры
              </Button>
            </div>
          )}

          {/* Load More */}
          {sortedReviews && sortedReviews.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" className="border-accent-orange text-accent-orange hover:bg-accent-orange hover:text-white">
                Показать больше отзывов
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Leave Review CTA */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-500 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Поделитесь своим опытом
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Ваш отзыв поможет другим клиентам сделать правильный выбор
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <LeadForm 
              title="Оставить отзыв"
              description="Расскажите о вашем опыте работы с нашей командой"
              serviceType="Отзыв о работе"
            />
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Нам доверяют
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-8">
                <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Рост числа клиентов
                </h3>
                <p className="text-text-secondary">
                  Более 70% клиентов приходят по рекомендациям
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Высокие оценки
                </h3>
                <p className="text-text-secondary">
                  Средняя оценка 4.8 из 5 на всех платформах
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Quote className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Честные отзывы
                </h3>
                <p className="text-text-secondary">
                  Все отзывы проверены и оставлены реальными клиентами
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
