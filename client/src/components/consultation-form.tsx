import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertLeadSchema } from "@shared/schema";
import { z } from "zod";

const consultationSchema = insertLeadSchema.extend({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
});

type ConsultationFormData = z.infer<typeof consultationSchema>;

interface ConsultationFormProps {
  className?: string;
  defaultService?: string;
}

export default function ConsultationForm({ className, defaultService }: ConsultationFormProps) {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ConsultationFormData) => {
      const response = await apiRequest("POST", "/api/leads", {
        ...data,
        serviceType: defaultService || "консультация",
        source: "website",
      });
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Заявка отправлена!",
        description: "Наш специалист свяжется с вами в течение 15 минут.",
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

  const onSubmit = (data: ConsultationFormData) => {
    mutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className={`card-unified p-lg text-center animate-scale-in ${className || ''}`}>
        <div className="text-green-500 text-5xl mb-4">✓</div>
        <h3 className="text-2xl font-bold text-text-primary mb-2">
          Заявка отправлена!
        </h3>
        <p className="text-text-secondary">
          Наш специалист свяжется с вами в течение 15 минут.
        </p>
      </div>
    );
  }

  return (
    <div className={`card-unified p-lg animate-fade-in ${className || ''}`}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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



          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-4 px-6 text-lg"
            size="lg"
          >
            {mutation.isPending ? "Отправляем..." : "Получить консультацию"}
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
    </div>
  );
}
