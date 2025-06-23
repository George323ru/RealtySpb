import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertReviewSchema } from "@shared/schema";
import { Star, Quote, User, Calendar, Filter } from "lucide-react";
import { z } from "zod";
import type { Review } from "@shared/schema";

const reviewFormSchema = insertReviewSchema.extend({
  rating: z.number().min(1, "Выберите оценку").max(5),
}).omit({ serviceType: true, propertyType: true }).extend({
  serviceType: z.string().min(1, "Выберите тип услуги"),
  propertyType: z.string().min(1, "Выберите тип недвижимости"),
});

type ReviewFormData = z.infer<typeof reviewFormSchema>;

export default function Reviews() {
  // Schema.org микроразметка для отзывов
  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Риэлтор в СПб",
    "url": "https://realtorvspb.ru",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "156",
      "bestRating": "5",
      "worstRating": "1"
    }
  };
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [filterRating, setFilterRating] = useState<string>("");
  const [filterService, setFilterService] = useState<string>("");

  const { data: reviews = [], isLoading } = useQuery<Review[]>({
    queryKey: ["/api/reviews"],
  });

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      clientName: "",
      rating: 5,
      review: "",
      propertyType: "",
      serviceType: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ReviewFormData) => {
      return apiRequest("POST", "/api/reviews", data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/reviews"] });
      toast({
        title: "Отзыв отправлен!",
        description: "Спасибо за ваш отзыв. Он будет опубликован после модерации.",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить отзыв. Попробуйте еще раз.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ReviewFormData) => {
    mutation.mutate(data);
  };

  const filteredReviews = reviews.filter(review => {
    if (filterRating && review.rating !== parseInt(filterRating)) return false;
    if (filterService && review.serviceType !== filterService) return false;
    return true;
  });

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: reviews.length > 0 
      ? (reviews.filter(review => review.rating === rating).length / reviews.length) * 100 
      : 0
  }));

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md") => {
    const starSize = size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6";
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating 
                ? "text-yellow-400 fill-current" 
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Микроразметка Schema.org для отзывов */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-900 via-green-900 to-teal-900 py-20 min-h-[70vh] flex items-center">
        {/* Enhanced Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        
        {/* Background Image with Enhanced Contrast */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920')"}}
        ></div>
        
        {/* Additional Gradient Overlay for Better Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 via-transparent to-teal-900/80"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Enhanced Typography with Better Contrast */}
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight text-white drop-shadow-2xl">
              Отзывы{" "}
              <span className="text-yandex-yellow drop-shadow-lg">клиентов</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-12 font-light text-white/95 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
              Узнайте, что говорят наши клиенты о качестве наших услуг
            </p>
            
            {/* Enhanced Stats Cards with Better Visibility */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center justify-center mb-3">
                  {renderStars(Math.round(averageRating), "lg")}
                </div>
                <div className="text-4xl font-bold text-yandex-yellow mb-2 drop-shadow-lg">
                  {averageRating.toFixed(1)}
                </div>
                <div className="text-base text-white/90 font-medium">Средняя оценка</div>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-bold text-yandex-yellow mb-3 drop-shadow-lg">{reviews.length}</div>
                <div className="text-base text-white/90 font-medium">Всего отзывов</div>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-bold text-yandex-yellow mb-3 drop-shadow-lg">98%</div>
                <div className="text-base text-white/90 font-medium">Довольных клиентов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rating Distribution */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Распределение оценок
              </h2>
            </div>

            <Card>
              <CardContent className="p-8">
                <div className="space-y-4">
                  {ratingDistribution.map((item) => (
                    <div key={item.rating} className="flex items-center">
                      <div className="flex items-center w-20">
                        <span className="text-sm font-medium mr-2">{item.rating}</span>
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="bg-neutral-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm text-text-secondary w-12">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reviews List */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4 lg:mb-0">
                Все отзывы
              </h2>
              
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={filterRating} onValueChange={setFilterRating}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Оценка" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все оценки</SelectItem>
                    <SelectItem value="5">5 звезд</SelectItem>
                    <SelectItem value="4">4 звезды</SelectItem>
                    <SelectItem value="3">3 звезды</SelectItem>
                    <SelectItem value="2">2 звезды</SelectItem>
                    <SelectItem value="1">1 звезда</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filterService} onValueChange={setFilterService}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Тип услуги" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все услуги</SelectItem>
                    <SelectItem value="продажа">Продажа</SelectItem>
                    <SelectItem value="покупка">Покупка</SelectItem>
                    <SelectItem value="аренда">Аренда</SelectItem>
                    <SelectItem value="оценка">Оценка</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-neutral-200 rounded-full mr-4"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-neutral-200 rounded mb-2"></div>
                          <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
                        </div>
                      </div>
                      <div className="h-20 bg-neutral-200 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredReviews.length === 0 ? (
              <Card className="p-12 text-center">
                <Filter className="w-12 h-12 mx-auto mb-4 opacity-50 text-text-secondary" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Отзывы не найдены
                </h3>
                <p className="text-text-secondary">
                  Попробуйте изменить фильтры поиска
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredReviews.map((review) => (
                  <Card key={review.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-accent-orange to-orange-600 rounded-full flex items-center justify-center mr-4">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-text-primary">{review.clientName}</h3>
                            <div className="flex items-center space-x-2">
                              {renderStars(review.rating, "sm")}
                              <span className="text-sm text-text-secondary">
                                {new Date(review.createdAt).toLocaleDateString('ru-RU')}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Quote className="w-6 h-6 text-neutral-300" />
                      </div>
                      
                      <p className="text-text-secondary leading-relaxed mb-4">
                        {review.review}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {review.serviceType && (
                          <Badge variant="outline">{review.serviceType}</Badge>
                        )}
                        {review.propertyType && (
                          <Badge variant="outline">{review.propertyType}</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Add Review Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Оставить отзыв
              </h2>
              <p className="text-lg text-text-secondary">
                Поделитесь своим опытом работы с нашей компанией
              </p>
            </div>

            {isSubmitted ? (
              <Card className="p-12 text-center">
                <div className="text-green-500 text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">
                  Спасибо за отзыв!
                </h3>
                <p className="text-text-secondary">
                  Ваш отзыв будет опубликован после модерации.
                </p>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Форма отзыва</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="clientName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ваше имя</FormLabel>
                              <FormControl>
                                <Input placeholder="Как к вам обращаться?" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="rating"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Оценка</FormLabel>
                              <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Выберите оценку" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="5">⭐⭐⭐⭐⭐ Отлично</SelectItem>
                                  <SelectItem value="4">⭐⭐⭐⭐ Хорошо</SelectItem>
                                  <SelectItem value="3">⭐⭐⭐ Удовлетворительно</SelectItem>
                                  <SelectItem value="2">⭐⭐ Плохо</SelectItem>
                                  <SelectItem value="1">⭐ Очень плохо</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="serviceType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Тип услуги</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Выберите услугу" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="продажа">Продажа недвижимости</SelectItem>
                                  <SelectItem value="покупка">Покупка недвижимости</SelectItem>
                                  <SelectItem value="аренда">Аренда</SelectItem>
                                  <SelectItem value="оценка">Оценка недвижимости</SelectItem>
                                  <SelectItem value="консультация">Консультация</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="propertyType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Тип недвижимости</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Выберите тип" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="квартира">Квартира</SelectItem>
                                  <SelectItem value="дом">Дом</SelectItem>
                                  <SelectItem value="коммерческая">Коммерческая</SelectItem>
                                  <SelectItem value="земля">Земля</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="review"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ваш отзыв</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Расскажите о вашем опыте работы с нашей компанией..."
                                rows={5}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-4 text-lg font-semibold"
                      >
                        {mutation.isPending ? "Отправляем..." : "Отправить отзыв"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
