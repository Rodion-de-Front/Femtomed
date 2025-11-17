import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Contacts() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast({
      title: 'Спасибо за обращение!',
      description: 'Мы свяжемся с вами в ближайшее время',
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h1 className="text-5xl sm:text-6xl font-bold">
              Свяжитесь{' '}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                с нами
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Мы готовы ответить на ваши вопросы о продуктах и программе TRADE-IN
            </p>
          </div>
        </div>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Отправьте нам сообщение</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        data-testid="input-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        data-testid="input-email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        data-testid="input-phone"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Сообщение *</Label>
                      <Textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        data-testid="input-message"
                      />
                    </div>
                    <Button type="submit" className="w-full" data-testid="button-submit">
                      <Send className="w-4 h-4 mr-2" />
                      Отправить
                    </Button>
                  </form>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="p-8 bg-gradient-to-br from-primary/10 to-background border-primary/20">
                  <h2 className="text-2xl font-bold mb-6">Программа TRADE-IN</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p className="leading-relaxed">
                      Наша компания предлагает уникальную возможность покупки фемтосекундного лазера FEMTO LDV Z-серии по системе TRADE-IN.
                    </p>
                    <p className="leading-relaxed">
                      Вы сможете заменить старый фемтосекундный лазер на НОВЫЙ СОВРЕМЕННЫЙ фемтосекундный лазер с:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        Гарантийным обслуживанием
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        Обучением ваших специалистов
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        Бесперебойными поставками расходных материалов
                      </li>
                    </ul>
                    <p className="font-semibold text-foreground pt-4">
                      Условия программы индивидуальны
                    </p>
                  </div>
                </Card>

                <div className="space-y-4">
                  <Card className="p-6 hover-elevate transition-all">
                    <a href="tel:+79153526688" className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Телефон</div>
                        <div className="font-semibold">+7 (915) 352-66-88</div>
                      </div>
                    </a>
                  </Card>

                  <Card className="p-6 hover-elevate transition-all">
                    <a href="mailto:office@femtomed.ru" className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Email</div>
                        <div className="font-semibold">office@femtomed.ru</div>
                      </div>
                    </a>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Адрес</div>
                        <div className="font-semibold">Москва, Россия</div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
