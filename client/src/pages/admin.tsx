import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Users, 
  Building, 
  Home, 
  Settings, 
  MessageSquare, 
  FileText, 
  Star,
  UserCheck,
  Phone
} from "lucide-react";
import CartButton from "@/components/layout/header/CartButton";

// Типы для админки
interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  address: string;
  district: string;
  propertyType: string;
  rooms?: number;
  area: string;
  floor?: number;
  totalFloors?: number;
  buildingType?: string;
  images: string[];
  features: string[];
  isActive: boolean;
  createdAt: Date;
}

interface NewBuilding {
  id: number;
  name: string;
  description: string;
  location: string;
  developer: string;
  completionYear?: number;
  priceFrom: number;
  pricePerMeter?: number;
  totalFlats?: number;
  readiness?: string;
  images: string[];
  features: string[];
  isActive: boolean;
  createdAt: Date;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("properties");
  
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-text-primary">
            Панель администратора
          </h1>
          <p className="text-text-secondary mt-2">
            Управление базой данных недвижимости
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Tabs Navigation */}
          <TabsList className="grid w-full grid-cols-7 h-auto p-1">
            <TabsTrigger value="properties" className="flex flex-col items-center gap-2 py-3">
              <Home className="w-5 h-5" />
              <span>Недвижимость</span>
            </TabsTrigger>
            <TabsTrigger value="new-buildings" className="flex flex-col items-center gap-2 py-3">
              <Building className="w-5 h-5" />
              <span>Новостройки</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex flex-col items-center gap-2 py-3">
              <Settings className="w-5 h-5" />
              <span>Услуги</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex flex-col items-center gap-2 py-3">
              <Users className="w-5 h-5" />
              <span>Команда</span>
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex flex-col items-center gap-2 py-3">
              <UserCheck className="w-5 h-5" />
              <span>Заявки</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex flex-col items-center gap-2 py-3">
              <MessageSquare className="w-5 h-5" />
              <span>Отзывы</span>
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex flex-col items-center gap-2 py-3">
              <FileText className="w-5 h-5" />
              <span>Блог</span>
            </TabsTrigger>
          </TabsList>

          {/* Properties Tab */}
          <TabsContent value="properties">
            <PropertiesAdmin />
          </TabsContent>

          {/* Other tabs would be implemented similarly */}
          <TabsContent value="new-buildings">
            <NewBuildingsAdmin />
          </TabsContent>

          <TabsContent value="services">
            <ServicesAdmin />
          </TabsContent>

          <TabsContent value="team">
            <TeamAdmin />
          </TabsContent>

          <TabsContent value="leads">
            <LeadsAdmin />
          </TabsContent>

          <TabsContent value="reviews">
            <ReviewsAdmin />
          </TabsContent>

          <TabsContent value="blog">
            <BlogAdmin />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// Компонент для управления недвижимостью
function PropertiesAdmin() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  // Получение данных
  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/admin/properties"],
    queryFn: async () => {
      const response = await fetch("/api/admin/properties");
      if (!response.ok) throw new Error('Failed to fetch properties');
      return response.json();
    },
  });

  // Мутация для создания/обновления
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const url = editingProperty 
        ? `/api/admin/properties/${editingProperty.id}`
        : '/api/admin/properties';
      const method = editingProperty ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Failed to save property');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/properties"] });
      setIsDialogOpen(false);
      setEditingProperty(null);
    },
  });

  // Мутация для удаления
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/properties/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete property');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/properties"] });
    },
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Загрузка...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Home className="w-6 h-6" />
          Управление недвижимостью
        </CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProperty(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Добавить объект
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProperty ? 'Редактировать объект' : 'Добавить новый объект'}
              </DialogTitle>
            </DialogHeader>
            <PropertyForm 
              property={editingProperty}
              onSubmit={mutation.mutate}
              isLoading={mutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">
                {properties.length}
              </div>
              <div className="text-sm text-blue-600">Всего объектов</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">
                {properties.filter(p => p.isActive).length}
              </div>
              <div className="text-sm text-green-600">Активных</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">
                {properties.filter(p => p.propertyType === 'apartment').length}
              </div>
              <div className="text-sm text-purple-600">Квартир</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="text-2xl font-bold text-orange-600">
                {properties.filter(p => p.propertyType === 'house').length}
              </div>
              <div className="text-sm text-orange-600">Домов</div>
            </div>
          </div>

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Название</TableHead>
                  <TableHead>Тип</TableHead>
                  <TableHead>Район</TableHead>
                  <TableHead>Цена</TableHead>
                  <TableHead>Площадь</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {properties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell className="font-mono">{property.id}</TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate">{property.title}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {property.propertyType}
                      </Badge>
                    </TableCell>
                    <TableCell>{property.district}</TableCell>
                    <TableCell className="font-semibold">
                      {formatPrice(property.price)}
                    </TableCell>
                    <TableCell>{property.area} м²</TableCell>
                    <TableCell>
                      <Badge variant={property.isActive ? "default" : "secondary"}>
                        {property.isActive ? "Активен" : "Неактивен"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingProperty(property);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Удалить объект?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Это действие нельзя отменить. Объект будет полностью удален.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Отмена</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteMutation.mutate(property.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Удалить
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Форма для создания/редактирования объекта недвижимости
function PropertyForm({ 
  property, 
  onSubmit, 
  isLoading 
}: { 
  property: Property | null; 
  onSubmit: (data: any) => void; 
  isLoading: boolean; 
}) {
  const [formData, setFormData] = useState({
    title: property?.title || '',
    description: property?.description || '',
    price: property?.price || 0,
    address: property?.address || '',
    district: property?.district || '',
    propertyType: property?.propertyType || 'apartment',
    rooms: property?.rooms || 1,
    area: property?.area || '',
    floor: property?.floor || 1,
    totalFloors: property?.totalFloors || 1,
    buildingType: property?.buildingType || '',
    images: property?.images?.join('\n') || '',
    features: property?.features?.join('\n') || '',
    isActive: property?.isActive ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      images: formData.images.split('\n').filter(Boolean),
      features: formData.features.split('\n').filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Название</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="propertyType">Тип недвижимости</Label>
          <select
            id="propertyType"
            value={formData.propertyType}
            onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="apartment">Квартира</option>
            <option value="house">Дом</option>
            <option value="office">Офис</option>
            <option value="retail">Торговое помещение</option>
            <option value="warehouse">Склад</option>
          </select>
        </div>

        <div>
          <Label htmlFor="price">Цена (₽)</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
            required
          />
        </div>

        <div>
          <Label htmlFor="area">Площадь (м²)</Label>
          <Input
            id="area"
            value={formData.area}
            onChange={(e) => setFormData({...formData, area: e.target.value})}
            required
          />
        </div>

        <div>
          <Label htmlFor="address">Адрес</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            required
          />
        </div>

        <div>
          <Label htmlFor="district">Район</Label>
          <Input
            id="district"
            value={formData.district}
            onChange={(e) => setFormData({...formData, district: e.target.value})}
            required
          />
        </div>

        <div>
          <Label htmlFor="rooms">Комнат</Label>
          <Input
            id="rooms"
            type="number"
            value={formData.rooms}
            onChange={(e) => setFormData({...formData, rooms: Number(e.target.value)})}
          />
        </div>

        <div>
          <Label htmlFor="floor">Этаж</Label>
          <Input
            id="floor"
            type="number"
            value={formData.floor}
            onChange={(e) => setFormData({...formData, floor: Number(e.target.value)})}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Описание</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows={3}
          required
        />
      </div>

      <div>
        <Label htmlFor="images">Изображения (по одной ссылке на строку)</Label>
        <Textarea
          id="images"
          value={formData.images}
          onChange={(e) => setFormData({...formData, images: e.target.value})}
          rows={3}
          placeholder="https://example.com/image1.jpg"
        />
      </div>

      <div>
        <Label htmlFor="features">Особенности (по одной на строку)</Label>
        <Textarea
          id="features"
          value={formData.features}
          onChange={(e) => setFormData({...formData, features: e.target.value})}
          rows={3}
          placeholder="Евроремонт"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isActive"
          checked={formData.isActive}
          onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
        />
        <Label htmlFor="isActive">Активен</Label>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </div>
    </form>
  );
}

// Placeholder компоненты для других разделов
function NewBuildingsAdmin() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBuilding, setEditingBuilding] = useState<NewBuilding | null>(null);

  const { data: buildings = [], isLoading } = useQuery<NewBuilding[]>({
    queryKey: ["/api/admin/new-buildings"],
    queryFn: async () => {
      const response = await fetch("/api/admin/new-buildings");
      if (!response.ok) throw new Error('Failed to fetch new buildings');
      return response.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const url = editingBuilding
        ? `/api/admin/new-buildings/${editingBuilding.id}`
        : '/api/admin/new-buildings';
      const method = editingBuilding ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to save new building');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/new-buildings"] });
      setIsDialogOpen(false);
      setEditingBuilding(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/new-buildings/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete new building');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/new-buildings"] });
    },
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Загрузка...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Building className="w-6 h-6" />
          Управление новостройками
        </CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingBuilding(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Добавить ЖК
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingBuilding ? 'Редактировать ЖК' : 'Добавить новый ЖК'}
              </DialogTitle>
            </DialogHeader>
            <NewBuildingForm
              building={editingBuilding}
              onSubmit={mutation.mutate}
              isLoading={mutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Застройщик</TableHead>
                <TableHead>Цена от</TableHead>
                <TableHead>Готовность</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {buildings.map((building) => (
                <TableRow key={building.id}>
                  <TableCell className="font-mono">{building.id}</TableCell>
                  <TableCell className="max-w-xs truncate">{building.name}</TableCell>
                  <TableCell>{building.developer}</TableCell>
                  <TableCell className="font-semibold">{formatPrice(building.priceFrom)}</TableCell>
                  <TableCell>{building.readiness}</TableCell>
                  <TableCell>
                    <Badge variant={building.isActive ? "default" : "secondary"}>
                      {building.isActive ? "Активен" : "Неактивен"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingBuilding(building);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm"><Trash2 className="w-4 h-4" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Удалить новостройку?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Это действие нельзя отменить. ЖК будет полностью удален.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteMutation.mutate(building.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Удалить
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function NewBuildingForm({
  building,
  onSubmit,
  isLoading
}: {
  building: NewBuilding | null;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState({
    name: building?.name || '',
    description: building?.description || '',
    location: building?.location || '',
    developer: building?.developer || '',
    completionYear: building?.completionYear || new Date().getFullYear() + 2,
    priceFrom: building?.priceFrom || 0,
    pricePerMeter: building?.pricePerMeter || 0,
    totalFlats: building?.totalFlats || 0,
    readiness: building?.readiness || '',
    images: building?.images?.join('\n') || '',
    features: building?.features?.join('\n') || '',
    isActive: building?.isActive ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      images: formData.images.split('\n').filter(Boolean),
      features: formData.features.split('\n').filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Название ЖК</Label>
          <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        </div>
        <div>
          <Label htmlFor="developer">Застройщик</Label>
          <Input id="developer" value={formData.developer} onChange={(e) => setFormData({ ...formData, developer: e.target.value })} required />
        </div>
        <div>
          <Label htmlFor="location">Локация</Label>
          <Input id="location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
        </div>
        <div>
          <Label htmlFor="priceFrom">Цена от (₽)</Label>
          <Input id="priceFrom" type="number" value={formData.priceFrom} onChange={(e) => setFormData({ ...formData, priceFrom: Number(e.target.value) })} required />
        </div>
        <div>
          <Label htmlFor="completionYear">Год сдачи</Label>
          <Input id="completionYear" type="number" value={formData.completionYear} onChange={(e) => setFormData({ ...formData, completionYear: Number(e.target.value) })} />
        </div>
        <div>
          <Label htmlFor="readiness">Готовность</Label>
          <Input id="readiness" value={formData.readiness} onChange={(e) => setFormData({ ...formData, readiness: e.target.value })} placeholder="Например: 85% или Сдан"/>
        </div>
      </div>
      <div>
        <Label htmlFor="description">Описание</Label>
        <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} required />
      </div>
      <div>
        <Label htmlFor="images">Изображения (по одной ссылке на строку)</Label>
        <Textarea id="images" value={formData.images} onChange={(e) => setFormData({ ...formData, images: e.target.value })} rows={3} />
      </div>
      <div>
        <Label htmlFor="features">Особенности (по одной на строку)</Label>
        <Textarea id="features" value={formData.features} onChange={(e) => setFormData({ ...formData, features: e.target.value })} rows={3} />
      </div>
      <div className="flex items-center space-x-2">
        <input type="checkbox" id="isActive" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} />
        <Label htmlFor="isActive">Активен</Label>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="submit" disabled={isLoading}>{isLoading ? 'Сохранение...' : 'Сохранить'}</Button>
      </div>
    </form>
  );
}

function ServicesAdmin() {
  return <div>Управление услугами - в разработке</div>;
}

function TeamAdmin() {
  return <div>Управление командой - в разработке</div>;
}

function LeadsAdmin() {
  return <div>Управление заявками - в разработке</div>;
}

function ReviewsAdmin() {
  return <div>Управление отзывами - в разработке</div>;
}

function BlogAdmin() {
  return <div>Управление блогом - в разработке</div>;
} 