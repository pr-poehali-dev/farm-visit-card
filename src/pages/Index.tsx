import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    address: '',
    comment: ''
  });

  const products = [
    {
      id: 'chicken-eggs',
      name: 'Яйцо куриное',
      price: 80,
      unit: 'десяток',
      description: 'Свежие домашние куриные яйца от кур свободного выгула',
      icon: 'Egg'
    },
    {
      id: 'quail-eggs',
      name: 'Яйцо перепелиное',
      price: 120,
      unit: '20 шт',
      description: 'Диетические перепелиные яйца, богатые витаминами',
      icon: 'Egg'
    },
    {
      id: 'duck-meat',
      name: 'Мясо уток',
      price: 450,
      unit: 'кг',
      description: 'Нежное мясо домашних уток, выращенных на натуральных кормах',
      icon: 'Bird'
    },
    {
      id: 'berry-juice',
      name: 'Морсы ягодные',
      price: 150,
      unit: '1л',
      description: 'Натуральные морсы из лесных ягод собственного сбора',
      icon: 'Grape'
    },
    {
      id: 'mushrooms',
      name: 'Грибы лесные',
      price: 200,
      unit: 'кг',
      description: 'Свежие лесные грибы: белые, подосиновики, лисички',
      icon: 'TreePine'
    }
  ];

  const reviews = [
    {
      name: 'Мария Ивановна',
      text: 'Покупаю яйца уже полгода. Очень свежие, желток ярко-желтый! Качество отличное.',
      rating: 5
    },
    {
      name: 'Алексей П.',
      text: 'Утятина просто тает во рту. Видно, что птица росла в хороших условиях. Рекомендую!',
      rating: 5
    },
    {
      name: 'Елена С.',
      text: 'Морсы очень вкусные, натуральные. Дети пьют с удовольствием. Спасибо за качество!',
      rating: 5
    }
  ];

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      return total + (product ? product.price * quantity : 0);
    }, 0);
  };

  const getCartItemsCount = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.');
    setCart({});
    setShowOrderForm(false);
    setOrderForm({ name: '', phone: '', address: '', comment: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Фермерское хозяйство "Русские традиции"</h1>
              <p className="text-lg opacity-90">Натуральные продукты с душой</p>
            </div>
            <div className="relative">
              <Button 
                onClick={() => setShowOrderForm(!showOrderForm)}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              >
                <Icon name="ShoppingCart" size={20} />
                <span className="ml-2">Корзина ({getCartItemsCount()})</span>
                {getTotalPrice() > 0 && (
                  <Badge className="ml-2 bg-farm-brown text-white">
                    {getTotalPrice()}₽
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-farm-beige via-background to-farm-beige">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-primary">
            Добро пожаловать на нашу ферму! 🌾
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Мы занимаемся разведением домашней птицы и производством экологически чистых продуктов 
            уже более 15 лет. Наши куры, утки и перепела растут в естественных условиях, 
            что гарантирует высочайшее качество продукции.
          </p>
          <div className="flex justify-center space-x-8 text-primary">
            <div className="text-center">
              <Icon name="Egg" size={48} />
              <p className="mt-2 font-semibold">Свежие яйца</p>
            </div>
            <div className="text-center">
              <Icon name="Bird" size={48} />
              <p className="mt-2 font-semibold">Домашняя птица</p>
            </div>
            <div className="text-center">
              <Icon name="TreePine" size={48} />
              <p className="mt-2 font-semibold">Лесные грибы</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Наша продукция
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 text-primary">
                    <Icon name={product.icon} size={48} />
                  </div>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <div className="text-2xl font-bold text-primary">
                    {product.price}₽
                    <span className="text-sm text-muted-foreground font-normal">
                      /{product.unit}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-center">
                    {product.description}
                  </p>
                  <div className="flex justify-center space-x-2">
                    {cart[product.id] && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFromCart(product.id)}
                        >
                          -
                        </Button>
                        <span className="px-3 py-1 bg-muted rounded text-center min-w-[2rem]">
                          {cart[product.id]}
                        </span>
                      </>
                    )}
                    <Button
                      onClick={() => addToCart(product.id)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      {cart[product.id] ? '+' : 'В корзину'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form */}
      {showOrderForm && getCartItemsCount() > 0 && (
        <section className="py-16 px-4 bg-muted">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Оформить заказ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h3 className="font-semibold mb-4">Ваш заказ:</h3>
                  {Object.entries(cart).map(([productId, quantity]) => {
                    const product = products.find(p => p.id === productId);
                    if (!product) return null;
                    return (
                      <div key={productId} className="flex justify-between items-center py-2">
                        <span>{product.name} × {quantity}</span>
                        <span className="font-semibold">{product.price * quantity}₽</span>
                      </div>
                    );
                  })}
                  <div className="border-t pt-2 mt-4">
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>Итого:</span>
                      <span>{getTotalPrice()}₽</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Имя *</label>
                    <Input
                      required
                      value={orderForm.name}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Телефон *</label>
                    <Input
                      required
                      type="tel"
                      value={orderForm.phone}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+7 (XXX) XXX-XX-XX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Адрес доставки *</label>
                    <Input
                      required
                      value={orderForm.address}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Адрес для доставки"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Комментарий</label>
                    <Textarea
                      value={orderForm.comment}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, comment: e.target.value }))}
                      placeholder="Дополнительные пожелания"
                      rows={3}
                    />
                  </div>
                  <div className="flex space-x-4">
                    <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                      Оформить заказ
                    </Button>
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => setShowOrderForm(false)}
                    >
                      Отмена
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Reviews Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Отзывы наших покупателей
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={20} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{review.text}"</p>
                  <p className="font-semibold text-primary">{review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-6">Свяжитесь с нами</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Icon name="Phone" size={24} className="mx-auto mb-2" />
              <p className="font-semibold">Телефон</p>
              <p>+7 (XXX) XXX-XX-XX</p>
            </div>
            <div>
              <Icon name="MapPin" size={24} className="mx-auto mb-2" />
              <p className="font-semibold">Адрес</p>
              <p>Деревня Традиции, д. 15</p>
            </div>
            <div>
              <Icon name="Clock" size={24} className="mx-auto mb-2" />
              <p className="font-semibold">Время работы</p>
              <p>Ежедневно с 8:00 до 20:00</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-primary-foreground/20">
            <p>&copy; 2024 Фермерское хозяйство "Русские традиции"</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;