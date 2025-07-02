import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { SERVICE_TYPES } from "@/lib/constants";
import { insertLeadSchema } from "@shared/schema";
import { cn } from "@/lib/utils";

const leadFormSchema = insertLeadSchema.extend({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
});

type LeadFormData = z.infer<typeof leadFormSchema>;

interface LeadFormProps {
  title: string;
  description: string;
  serviceType: string;
  theme?: 'light' | 'dark';
}

export default function LeadForm({ 
  title, 
  description,
  serviceType,
  theme = 'light'
}: LeadFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  const createLeadMutation = useMutation({
    mutationFn: async (data: LeadFormData) => {
      const response = await apiRequest("POST", "/api/leads", {
        ...data,
        serviceType: serviceType || "консультация",
        source: "website",
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Заявка отправлена!",
        description: "Наш специалист свяжется с вами в ближайшее время.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
    },
    onError: () => {
      toast({
        title: "Ошибка отправки",
        description: "Попробуйте еще раз или свяжитесь с нами по телефону.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LeadFormData) => {
    createLeadMutation.mutate(data);
  };

  const cardClasses = cn(
    'w-full max-w-md mx-auto transition-all',
    theme === 'dark'
      ? 'bg-neutral-800 border-neutral-700 text-white'
      : 'bg-white',
  );

  const inputClasses = cn(
    theme === 'dark' 
      ? 'bg-neutral-700 border-neutral-600 text-white placeholder:text-neutral-400 focus:border-accent-orange'
      : 'bg-white'
  );

  const labelClasses = cn(
    theme === 'dark' ? 'text-neutral-300' : 'text-text-primary'
  );

  return (
    <Card className={cardClasses}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription className={cn(theme === 'dark' && 'text-neutral-400')}>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className={labelClasses}>Имя</Label>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="Как к вам обращаться?"
                        {...field}
                        required
                        className={inputClasses}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className={labelClasses}>Телефон</Label>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        {...field}
                        required
                        className={inputClasses}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-accent-orange text-white hover:bg-orange-600 font-bold text-base py-3"
              disabled={createLeadMutation.isPending}
            >
              {createLeadMutation.isPending ? "Отправка..." : "Получить консультацию"}
            </Button>
          </form>
          <p className={cn("text-xs text-center mt-4", theme === 'dark' ? 'text-neutral-500' : 'text-text-secondary')}>
            Нажимая кнопку, вы соглашаетесь с{" "}
            <a 
              href="/privacy-policy" 
              className="text-accent-orange hover:underline"
              rel="noopener"
            >
              политикой конфиденциальности
            </a>
          </p>
        </Form>
      </CardContent>
    </Card>
  );
}
