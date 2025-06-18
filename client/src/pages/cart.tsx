import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/components/CartProvider";
import { Trash2, Download, Home, Building, MapPin, DollarSign } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Link } from "wouter";

export default function Cart() {
  const { items, removeFromCart, clearCart } = useCart();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    
    // Simple PDF generation using browser print
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Избранная недвижимость - realtorvspb.ru</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .property { border: 1px solid #ddd; margin-bottom: 20px; padding: 15px; }
            .property h3 { margin: 0 0 10px 0; }
            .property-details { margin: 10px 0; }
            .price { font-size: 18px; font-weight: bold; color: #f97316; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Избранная недвижимость</h1>
            <p>realtorvspb.ru | +7 (812) 123-45-67</p>
            <p>Дата: ${new Date().toLocaleDateString('ru-RU')}</p>
          </div>
          ${items.map(item => {
            const data = item.data;
            const isProperty = item.type === 'property';
            return `
              <div class="property">
                <h3>${isProperty ? (data as any).title : (data as any).name}</h3>
                <div class="property-details">
                  ${isProperty ? `
                    <p><strong>Адрес:</strong> ${(data as any).address}</p>
                    <p><strong>Площадь:</strong> ${(data as any).area} м²</p>
                    <p><strong>Район:</strong> ${(data as any).district}</p>
                    <p><strong>Тип:</strong> ${(data as any).propertyType}</p>
                  ` : `
                    <p><strong>Местоположение:</strong> ${(data as any).location}</p>
                    <p><strong>Застройщик:</strong> ${(data as any).developer}</p>
                    <p><strong>Готовность:</strong> ${(data as any).readiness || 'Уточняется'}</p>
                  `}
                  <p class="price">Цена: ${formatPrice(isProperty ? (data as any).price : (data as any).priceFrom)}</p>
                </div>
              </div>
            `;
          }).join('')}
        </body>
      </html>
    `;
    
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
    
    setIsGeneratingPDF(false);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="p-12">
              <Home className="w-16 h-16 mx-auto text-neutral-400 mb-6" />
              <h1 className="text-3xl font-bold text-text-primary mb-4">
                Корзина пуста
              </h1>
              <p className="text-text-secondary mb-8 text-lg">
                Добавьте интересующие объекты недвижимости в корзину, 
                чтобы создать персональную подборку
              </p>
              <div className="space-y-4">
                <Link href="/buy">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    Смотреть квартиры
                  </Button>
                </Link>
                <Link href="/new-buildings">
                  <Button variant="outline" className="w-full">
                    Новостройки
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Избранная недвижимость
            </h1>
            <p className="text-xl opacity-90">
              {items.length} {items.length === 1 ? 'объект' : 'объекта'} в вашей подборке
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              onClick={generatePDF}
              disabled={isGeneratingPDF}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              {isGeneratingPDF ? 'Создаём PDF...' : 'Скачать PDF'}
            </Button>
            <Button
              variant="outline"
              onClick={clearCart}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Очистить корзину
            </Button>
          </div>

          {/* Items */}
          <div className="space-y-6">
            {items.map((item) => {
              const data = item.data;
              const isProperty = item.type === 'property';
              
              return (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">
                            {isProperty ? 'Недвижимость' : 'Новостройка'}
                          </Badge>
                          <Badge className="bg-orange-100 text-orange-800">
                            {new Date(item.addedAt).toLocaleDateString('ru-RU')}
                          </Badge>
                        </div>
                        
                        <h3 className="text-xl font-bold text-text-primary mb-2">
                          {isProperty ? (data as any).title : (data as any).name}
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          {isProperty ? (
                            <>
                              <div className="flex items-center text-text-secondary">
                                <MapPin className="w-4 h-4 mr-2" />
                                {(data as any).address}
                              </div>
                              <div className="flex items-center text-text-secondary">
                                <Home className="w-4 h-4 mr-2" />
                                {(data as any).area} м² • {(data as any).rooms} комн.
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex items-center text-text-secondary">
                                <MapPin className="w-4 h-4 mr-2" />
                                {(data as any).location}
                              </div>
                              <div className="flex items-center text-text-secondary">
                                <Building className="w-4 h-4 mr-2" />
                                {(data as any).developer}
                              </div>
                            </>
                          )}
                        </div>
                        
                        <div className="flex items-center text-2xl font-bold text-orange-600">
                          <DollarSign className="w-6 h-6 mr-1" />
                          {formatPrice(isProperty ? (data as any).price : (data as any).priceFrom)}
                          {!isProperty && <span className="text-sm font-normal ml-1">от</span>}
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex gap-2">
                      <Link href={isProperty ? `/property/${data.id}` : `/new-buildings`}>
                        <Button variant="outline" size="sm">
                          Подробнее
                        </Button>
                      </Link>
                      <Link href="/contacts">
                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                          Записаться на просмотр
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}