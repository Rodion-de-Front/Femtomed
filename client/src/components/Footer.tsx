import { Link } from "wouter";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t" data-testid="footer-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Femtomed" className="h-10" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Передовые технологии офтальмологии для профессионалов
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Продукты</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/products">
                <Button
                  variant="ghost"
                  className="justify-start px-0 h-auto"
                  data-testid="link-footer-femto"
                >
                  FEMTO LDV
                </Button>
              </Link>
              <Link href="/clear">
                <Button
                  variant="ghost"
                  className="justify-start px-0 h-auto"
                  data-testid="link-footer-clear"
                >
                  CLEAR
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  variant="ghost"
                  className="justify-start px-0 h-auto"
                  data-testid="link-footer-galilei"
                >
                  GALILEI
                </Button>
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Компания</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/news">
                <Button
                  variant="ghost"
                  className="justify-start px-0 h-auto"
                  data-testid="link-footer-news"
                >
                  Новости
                </Button>
              </Link>
              <Link href="/vision-test">
                <Button
                  variant="ghost"
                  className="justify-start px-0 h-auto"
                  data-testid="link-footer-test"
                >
                  Тест зрения
                </Button>
              </Link>
              <Link href="/contacts">
                <Button
                  variant="ghost"
                  className="justify-start px-0 h-auto"
                  data-testid="link-footer-contacts"
                >
                  Контакты
                </Button>
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Контакты</h3>
            <div className="space-y-3 text-sm">
              <a
                href="tel:+79153526688"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-phone"
              >
                <Phone className="w-4 h-4" />
                +7 (915) 352-66-88
              </a>
              <a
                href="mailto:office@femtomed.ru"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-email"
              >
                <Mail className="w-4 h-4" />
                office@femtomed.ru
              </a>
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Москва, Россия</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2025 Femtomed. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
