import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Download, Share2, Heart } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import PropertyCard from "@/components/property-card";
import ConsultationForm from "@/components/consultation-form";

export default function Cart() {
  const { items, removeFromCart, clearCart, getTotalItems } = useCart();
  const [showForm, setShowForm] = useState(false);

  const handleExportPDF = () => {
    // PDF export functionality would be implemented here
    alert("Функция экспорта в PDF будет добавлена");
  };

  const handleShare = () => {
    // Share functionality would be implemented here
    alert("Функция поделиться будет добавлена");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light to-background-secondary">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-accent-orange to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Избранное
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-orange-100">
              Ваш список сохраненных объектов недвижимости
            </p>
            <div className="flex items-center justify-center space-x-8 text-orange-100">
              <div className="flex items-center space-x-2">
                <Heart className="h-6 w-6" />
                <span>{getTotalItems()} объектов</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-8" />
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Список пуст
            </h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              Добавьте понравившиеся объекты в избранное, чтобы легко к ним вернуться
            </p>
            <Button asChild className="bg-accent-orange text-white hover:bg-orange-600">
              <a href="/buy">Посмотреть объекты</a>
            </Button>
          </div>
        ) : (
          <>
            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-text-primary">
                  Избранные объекты ({getTotalItems()})
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={handleExportPDF}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Экспорт в PDF</span>
                </Button>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Поделиться</span>
                </Button>
                <Button
                  onClick={clearCart}
                  variant="outline"
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Очистить все</span>
                </Button>
              </div>
            </div>

            {/* Properties List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {items.map((item) => (
                <div key={item.id} className="relative">
                  <PropertyCard property={item.data} />
                  <Button
                    onClick={() => removeFromCart(item.id)}
                    size="sm"
                    variant="outline"
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Badge className="absolute top-4 left-4 bg-accent-orange text-white">
                    {item.type === 'property' ? 'Объект' : 'Новостройка'}
                  </Badge>
                </div>
              ))}
            </div>

            {/* Consultation Form */}
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  Получить консультацию по выбранным объектам
                </CardTitle>
                <p className="text-center text-text-secondary">
                  Наш специалист поможет вам с выбором и организует просмотры
                </p>
              </CardHeader>
              <CardContent>
                <ConsultationForm defaultService="Консультация по избранным объектам" />
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}