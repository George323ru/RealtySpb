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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { SERVICE_TYPES } from "@/lib/constants";
import { insertLeadSchema } from "@shared/schema";

const leadFormSchema = insertLeadSchema.extend({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
});

type LeadFormData = z.infer<typeof leadFormSchema>;

interface LeadFormProps {
  title?: string;
  description?: string;
  serviceType?: string;
  compact?: boolean;
}

export default function LeadForm({ 
  title = "Получить консультацию", 
  description = "Оставьте заявку и наш специалист свяжется с вами в течение 15 минут",
  serviceType,
  compact = false 
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

  if (compact) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ваше имя</FormLabel>
                    <FormControl>
                      <Input placeholder="Введите имя" {...field} />
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

              <Button 
                type="submit" 
                className="w-full bg-accent-orange text-white hover:bg-accent-orange/90"
                disabled={createLeadMutation.isPending}
              >
                {createLeadMutation.isPending ? "Отправка..." : "Отправить заявку"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl lg:text-3xl font-bold text-text-primary">
          {title}
        </CardTitle>
        <p className="text-text-secondary">{description}</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ваше имя *</FormLabel>
                    <FormControl>
                      <Input placeholder="Введите имя" {...field} />
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
                    <FormLabel>Телефон *</FormLabel>
                    <FormControl>
                      <Input placeholder="+7 (___) ___-__-__" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>



            <Button 
              type="submit" 
              className="w-full bg-accent-orange text-white py-4 hover:bg-accent-orange/90 text-lg"
              disabled={createLeadMutation.isPending}
            >
              {createLeadMutation.isPending ? "Отправка..." : "Получить консультацию"}
            </Button>

            <p className="text-sm text-text-secondary text-center">
              Нажимая кнопку, вы соглашаетесь с{" "}
              <a 
                href="/privacy-policy" 
                className="text-accent-orange hover:underline"
                rel="noopener"
              >
                политикой конфиденциальности
              </a>
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
