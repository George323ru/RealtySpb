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
import { cn } from "@/lib/utils";
import { insertLeadSchema } from "@shared/schema";
import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9A-Z]{3}[)])?([-]?[\s]?[0-9A-Z]{3})([-]?[\s]?[0-9A-Z]{2})([-]?[\s]?[0-9A-Z]{2})$/
);

const consultationSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().regex(phoneRegex, "Введите корректный номер телефона"),
  email: z.string().email("Неверный формат email").optional().or(z.literal('')),
  serviceType: z.string().optional(),
  comment: z.string().optional(),
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
    mode: "onBlur",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      serviceType: defaultService || "консультация",
      comment: "",
    },
  });

  const { formState } = form;

  const mutation = useMutation({
    mutationFn: async (data: ConsultationFormData) => {
      const response = await apiRequest("POST", "/api/leads", {
        ...data,
        source: "website",
      });
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast.success({
        title: "Заявка отправлена!",
        description: "Наш специалист свяжется с вами в течение 15 минут.",
      });
    },
    onError: () => {
      toast.error({
        title: "Ошибка отправки",
        description: "Не удалось отправить заявку. Попробуйте еще раз.",
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
                    <Input 
                      placeholder="Введите ваше имя" 
                      {...field} 
                      className={cn(
                        "transition-all duration-300",
                        formState.touchedFields.name && !formState.errors.name && field.value && 'border-green-500 shadow-green-500/20 shadow-sm',
                        formState.touchedFields.name && formState.errors.name && 'border-red-500 shadow-red-500/20 shadow-sm'
                      )}
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
                  <FormLabel>Телефон</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="+7 (___) ___-__-__" 
                      {...field}
                      className={cn(
                        "transition-all duration-300",
                        formState.touchedFields.phone && !formState.errors.phone && field.value && 'border-green-500 shadow-green-500/20 shadow-sm',
                        formState.touchedFields.phone && formState.errors.phone && 'border-red-500 shadow-red-500/20 shadow-sm'
                      )}
                    />
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
                  <Input 
                    placeholder="example@mail.com" 
                    {...field} 
                    className={cn(
                      "transition-all duration-300",
                      formState.touchedFields.email && formState.dirtyFields.email && !formState.errors.email && field.value && 'border-green-500 shadow-green-500/20 shadow-sm',
                      formState.touchedFields.email && formState.errors.email && 'border-red-500 shadow-red-500/20 shadow-sm'
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={!formState.isValid}
            loading={mutation.isPending}
            success={mutation.isSuccess}
            className="w-full py-4 px-6 text-lg transition-all"
            size="lg"
          >
            Получить консультацию
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
