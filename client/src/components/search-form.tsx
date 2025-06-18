import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Search, SlidersHorizontal } from "lucide-react";
import { PROPERTY_TYPES, TRANSACTION_TYPES, DISTRICTS } from "@/lib/constants";
import { useLocation } from "wouter";

interface SearchFormData {
  transactionType: string;
  propertyType: string;
  district: string;
  priceFrom: string;
  priceTo: string;
  areaFrom: string;
  areaTo: string;
  rooms: string;
}

interface SearchFormProps {
  variant?: "hero" | "compact";
  onSearch?: (filters: SearchFormData) => void;
}

const SearchForm = ({ variant = "hero", onSearch }: SearchFormProps) => {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("sale");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const form = useForm<SearchFormData>({
    defaultValues: {
      transactionType: "sale",
      propertyType: "",
      district: "",
      priceFrom: "",
      priceTo: "",
      areaFrom: "",
      areaTo: "",
      rooms: "",
    },
  });

  const onSubmit = (data: SearchFormData) => {
    const filters = { ...data, transactionType: activeTab };
    
    if (onSearch) {
      onSearch(filters);
    } else {
      // Navigate to search results page with filters
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.set(key, value);
      });
      
      const basePage = activeTab === "sale" ? "/buy" : "/rent";
      setLocation(`${basePage}?${params.toString()}`);
    }
  };

  if (variant === "compact") {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Тип" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PROPERTY_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Район" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DISTRICTS.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-accent-orange hover:bg-orange-600">
              <Search className="w-4 h-4" />
            </Button>
          </form>
        </Form>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
        <button
          type="button"
          onClick={() => setActiveTab("sale")}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            activeTab === "sale"
              ? "bg-accent-orange text-white"
              : "bg-transparent text-text-primary border border-neutral-300 hover:border-accent-orange"
          }`}
        >
          Купить
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("rent")}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            activeTab === "rent"
              ? "bg-accent-orange text-white"
              : "bg-transparent text-text-primary border border-neutral-300 hover:border-accent-orange"
          }`}
        >
          Снять
        </button>
        <button
          type="button"
          onClick={() => setLocation("/sell")}
          className="bg-transparent text-text-primary px-4 py-2 rounded-lg font-medium text-sm border border-neutral-300 hover:border-accent-orange transition-colors"
        >
          Продать
        </button>
        <button
          type="button"
          onClick={() => setLocation("/rent")}
          className="bg-transparent text-text-primary px-4 py-2 rounded-lg font-medium text-sm border border-neutral-300 hover:border-accent-orange transition-colors"
        >
          Сдать
        </button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Search Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-text-primary">
                    Тип недвижимости
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent">
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PROPERTY_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-text-primary">
                    Район
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent">
                        <SelectValue placeholder="Выберите район" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DISTRICTS.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priceFrom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-text-primary">
                    Цена от
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={activeTab === "sale" ? "От 3 000 000 ₽" : "От 30 000 ₽"}
                      className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priceTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-text-primary">
                    Цена до
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={activeTab === "sale" ? "До 15 000 000 ₽" : "До 150 000 ₽"}
                      className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Advanced Search Fields */}
          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-neutral-200">
              <FormField
                control={form.control}
                name="areaFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-text-primary">
                      Площадь от (м²)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="От 30"
                        className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="areaTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-text-primary">
                      Площадь до (м²)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="До 200"
                        className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-text-primary">
                      Количество комнат
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent">
                          <SelectValue placeholder="Любое" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1 комната</SelectItem>
                        <SelectItem value="2">2 комнаты</SelectItem>
                        <SelectItem value="3">3 комнаты</SelectItem>
                        <SelectItem value="4">4 комнаты</SelectItem>
                        <SelectItem value="5">5+ комнат</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="submit"
              className="flex-1 bg-accent-orange text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors"
            >
              <Search className="w-5 h-5 mr-2" />
              Найти недвижимость
            </Button>
            <Button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              variant="outline"
              className="sm:w-auto text-accent-orange py-4 px-6 rounded-lg font-semibold text-lg border-2 border-accent-orange hover:bg-accent-orange hover:text-white transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              {showAdvanced ? "Скрыть фильтры" : "Расширенный поиск"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SearchForm;
