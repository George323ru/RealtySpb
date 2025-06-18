import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Loader2 } from "lucide-react";

const consultationSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  email: z.string().email("Введите корректный email").optional().or(z.literal("")),
  service: z.string().min(1, "Выберите услугу"),
  message: z.string().optional(),
});

type ConsultationFormData = z.infer<typeof consultationSchema>;

interface ConsultationFormProps {
  title?: string;
  description?: string;
  onSuccess?: () => void;
  propertyId?: number;
}

const ConsultationForm = ({ 
  title = "Получите консультацию эксперта бесплатно",
  description = "Оставьте заявку и наш специалист свяжется с вами в течение 15 минут",
  onSuccess,
  propertyId
}: ConsultationFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "",
      message: "",
    },
  });

  const createLeadMutation = useMutation({
    mutationFn: async (data: ConsultationFormData) => {
      const leadData = {
        ...data,
        email: data.email || undefined,
        propertyId,
        source: "website",
      };
      return apiRequest("POST", "/api/leads", leadData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в ближайшее время.",
      });
      form.reset();
      onSuccess?.();
    },
    onError: (error: any) => {
      toast({
        title: "Ошибка отправки",
        description: error.message || "Попробуйте еще раз позже",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ConsultationFormData) => {
    createLeadMutation.mutate(data);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-3">
          {title}
        </h2>
        <p className="text-text-secondary">
          {description}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ваше имя</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите ваше имя" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Телефон</FormLabel>
                  <FormControl>
                    <Input placeholder="+7 (___) ___-__-__" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email (необязательно)</FormLabel>
                <FormControl>
                  <Input placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Выберите услугу</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите услугу" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="buy">Хочу купить недвижимость</SelectItem>
                    <SelectItem value="sell">Хочу продать недвижимость</SelectItem>
                    <SelectItem value="rent">Хочу сдать в аренду</SelectItem>
                    <SelectItem value="evaluation">Оценка недвижимости</SelectItem>
                    <SelectItem value="legal">Юридическая консультация</SelectItem>
                    <SelectItem value="design">Дизайн и ремонт</SelectItem>
                    <SelectItem value="other">Другое</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Сообщение (необязательно)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Опишите ваш вопрос подробнее" 
                    className="resize-none"
                    rows={3}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full bg-accent-orange hover:bg-orange-600 text-white"
            disabled={createLeadMutation.isPending}
          >
            {createLeadMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Отправляем...
              </>
            ) : (
              "Получить консультацию"
            )}
          </Button>

          <p className="text-sm text-text-secondary text-center">
            Нажимая кнопку, вы соглашаетесь с{" "}
            <a href="#" className="text-accent-orange hover:underline">
              политикой конфиденциальности
            </a>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default ConsultationForm;
