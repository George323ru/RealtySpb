import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertLeadSchema } from "@shared/schema";
import { Phone, CheckCircle } from "lucide-react";
import { z } from "zod";

const unifiedFormSchema = insertLeadSchema.pick({
  name: true,
  phone: true,
  serviceType: true,
});

type UnifiedFormData = z.infer<typeof unifiedFormSchema>;

interface UnifiedFormProps {
  title?: string;
  description?: string;
  serviceType: string;
  buttonText?: string;
  successTitle?: string;
  successMessage?: string;
  className?: string;
}

export default function UnifiedForm({
  title = "Оставить заявку",
  description = "Заполните форму и мы свяжемся с вами в течение 10 минут",
  serviceType,
  buttonText = "Отправить заявку",
  successTitle = "Заявка отправлена!",
  successMessage = "Мы свяжемся с вами в ближайшее время",
  className = ""
}: UnifiedFormProps) {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<UnifiedFormData>({
    resolver: zodResolver(unifiedFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      serviceType,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: UnifiedFormData) => {
      return apiRequest("POST", "/api/leads", data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: successTitle,
        description: successMessage,
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Попробуйте еще раз.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: UnifiedFormData) => {
    mutation.mutate(data);
  };

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length === 0) return '';
    if (digits.length <= 1) return `+7 (${digits}`;
    if (digits.length <= 4) return `+7 (${digits.slice(1, 4)}`;
    if (digits.length <= 7) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}`;
    if (digits.length <= 9) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}`;
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
  };

  if (isSubmitted) {
    return (
      <Card className={className}>
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 mx-auto text-accent-orange mb-4" />
          <h3 className="text-2xl font-bold text-text-primary mb-2">
            {successTitle}
          </h3>
          <p className="text-text-secondary mb-4">
            {successMessage}
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
          >
            Отправить еще одну заявку
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
        {description && (
          <p className="text-center text-text-secondary">{description}</p>
        )}
      </CardHeader>
      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ваше имя</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Как к вам обращаться?" 
                      {...field} 
                      className="text-lg py-3"
                    />
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
                  <FormLabel>Номер телефона</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+7 (___) ___-__-__"
                      {...field}
                      className="text-lg py-3"
                      onChange={(e) => {
                        const formatted = formatPhoneNumber(e.target.value);
                        field.onChange(formatted);
                      }}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 text-lg font-semibold"
            >
              <Phone className="w-4 h-4 mr-2" />
              {mutation.isPending ? "Отправляем..." : buttonText}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}