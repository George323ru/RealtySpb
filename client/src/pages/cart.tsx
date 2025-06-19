import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Download, Eye, MapPin, Home, Building } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface CartItem {
  id: string;
  type: 'property' | 'newBuilding';
  title: string;
  price: number;
  location: string;
  image: string;
  details: string;
  addedAt: Date;
}

// Mock cart data - in real app this would come from context/state
const mockCartItems: CartItem[] = [
  {
    id: "1",
    type: "property",
    title: "3-комнатная квартира в центре",
    price: 12500000,
    location: "Центральный район",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300",
    details: "120 м², 5 этаж, евроремонт",
    addedAt: new Date()
  },
  {
    id: "2", 
    type: "newBuilding",
    title: "ЖК Северный Парк",
    price: 8900000,
    location: "Приморский район",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300",
    details: "85 м², 12 этаж, сдача в 2025",
    addedAt: new Date()
  }
];

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [clientInfo, setClientInfo] = useState({
    name: "",
    phone: "",
    email: "",
    notes: ""
  });

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const generatePDF = () => {
    // In real app, this would generate actual PDF
    alert("PDF-подборка будет сгенерирована");
  };

  const sendToEmail = () => {
    // In real app, this would send email
    alert("Подборка отправлена на email");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Избранные объекты
          </h1>
          <p className="text-lg text-muted-foreground">
            Ваша персональная подборка недвижимости
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cartItems.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Home className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Подборка пуста
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Добавьте интересующие объекты для создания персональной подборки
                  </p>
                  <Button asChild>
                    <a href="/buy" className="bg-accent hover:bg-orange-600 text-foreground">
                      Найти недвижимость
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-muted-foreground">
                    Объектов в подборке: <span className="font-semibold">{cartItems.length}</span>
                  </p>
                  <Button
                    onClick={clearCart}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Очистить все
                  </Button>
                </div>

                <div className="space-y-4">
                  {cartItems.map(item => (
                    <Card key={item.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                          />
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-foreground">
                                {item.title}
                              </h3>
                              <Button
                                onClick={() => removeItem(item.id)}
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            
                            <div className="flex items-center text-muted-foreground text-sm mb-2">
                              <MapPin className="w-4 h-4 mr-1 text-accent" />
                              {item.location}
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-2">
                              {item.details}
                            </p>
                            
                            <div className="flex justify-between items-center">
                              <p className="font-bold text-lg text-accent">
                                {formatPrice(item.price)}
                              </p>
                              
                              <Badge variant="outline">
                                {item.type === 'property' ? 'Вторичка' : 'Новостройка'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Actions Panel */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Export Actions */}
              {cartItems.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Экспорт подборки</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      onClick={generatePDF}
                      className="w-full bg-accent hover:bg-orange-600 text-foreground"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Скачать PDF
                    </Button>
                    
                    <Button
                      onClick={sendToEmail}
                      variant="outline"
                      className="w-full"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Отправить на email
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Консультация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Имя *</Label>
                    <Input
                      id="name"
                      placeholder="Ваше имя"
                      value={clientInfo.name}
                      onChange={(e) => setClientInfo(prev => ({...prev, name: e.target.value}))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      placeholder="+7 (999) 999-99-99"
                      value={clientInfo.phone}
                      onChange={(e) => setClientInfo(prev => ({...prev, phone: e.target.value}))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={clientInfo.email}
                      onChange={(e) => setClientInfo(prev => ({...prev, email: e.target.value}))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Комментарий</Label>
                    <Textarea
                      id="notes"
                      placeholder="Дополнительные пожелания..."
                      value={clientInfo.notes}
                      onChange={(e) => setClientInfo(prev => ({...prev, notes: e.target.value}))}
                      rows={3}
                    />
                  </div>

                  <Button className="w-full bg-accent hover:bg-orange-600 text-foreground">
                    Получить консультацию
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    Наш специалист свяжется с вами в течение 30 минут
                  </p>
                </CardContent>
              </Card>

              {/* Statistics */}
              {cartItems.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Статистика</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Средняя цена:</span>
                      <span className="font-medium">
                        {formatPrice(cartItems.reduce((sum, item) => sum + item.price, 0) / cartItems.length)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Всего объектов:</span>
                      <span className="font-medium">{cartItems.length}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Новостройки:</span>
                      <span className="font-medium">
                        {cartItems.filter(item => item.type === 'newBuilding').length}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Вторичка:</span>
                      <span className="font-medium">
                        {cartItems.filter(item => item.type === 'property').length}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}