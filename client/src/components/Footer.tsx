import { Link } from "wouter";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t" data-testid="footer-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_140px_140px_140px_140px_200px] gap-8">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <img src="/images/logo.png" alt="Femtomed" className="h-10" />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Передовые технологии офтальмологии для профессионалов
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold text-xs">Компания</h3>
            <nav className="flex flex-col gap-0">
              <Link href="/">
                <Button
                  variant="ghost"
                  className="justify-start px-0 h-auto py-0 min-h-0 text-xs hover:bg-transparent hover:text-current"
                  data-testid="link-footer-home"
                >
                  Главная
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="ghost"
                  className="justify-start px-0 h-auto py-0 min-h-0 text-xs hover:bg-transparent hover:text-current"
                  data-testid="link-footer-about"
                >
                  О нас
                </Button>
              </Link>
              <Link href="/blog">
                <Button
                  variant="ghost"
                  className="justify-start px-0 h-auto py-0 min-h-0 text-xs hover:bg-transparent hover:text-current"
                  data-testid="link-footer-blog"
                >
                  Блог
                </Button>
              </Link>
              <Link href="/clients">
                <Button
                  variant="ghost"
                  className="justify-start px-0 h-auto py-0 min-h-0 text-xs hover:bg-transparent hover:text-current"
                  data-testid="link-footer-clients"
                >
                  Клиентам
                </Button>
              </Link>
            </nav>
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold text-xs">Заболевания</h3>
            <nav className="flex flex-col gap-0">
              <Link href="/cataract">
                <Button
                  variant="ghost"
                  className="justify-start px-0 h-auto py-0 min-h-0 text-xs hover:bg-transparent hover:text-current"
                  data-testid="link-footer-cataract"
                >
                  Катаракта
                </Button>
              </Link>
              <Link href="/products/femto-ldv-z8">
                <Button
                  variant="ghost"
                  className="justify-start px-0 h-auto py-0 min-h-0 text-[10px] text-muted-foreground hover:bg-transparent hover:text-muted-foreground"
                  data-testid="link-footer-femto-cataract"
                >
                  — FEMTO LDV Z8
                </Button>
              </Link>
              <Link href="/products/galilei-g6">
                <Button
                  variant="ghost"
                  className="justify-start px-0 h-auto py-0 min-h-0 text-[10px] text-muted-foreground hover:bg-transparent hover:text-muted-foreground"
                  data-testid="link-footer-galilei-cataract"
                >
                  — GALILEI G6
                </Button>
              </Link>
              <Link href="/refraction">
                <Button
                  variant="ghost"
                  className="justify-start px-0 h-auto py-0 min-h-0 text-xs hover:bg-transparent hover:text-current"
                  data-testid="link-footer-refraction"
                >
                  Рефракция
                </Button>
              </Link>
              <Link href="/products/femto-ldv-z8">
                <Button
                  variant="ghost"
                  className="justify-start px-0 h-auto py-0 min-h-0 text-[10px] text-muted-foreground hover:bg-transparent hover:text-muted-foreground"
                  data-testid="link-footer-femto-refraction"
                >
                  — FEMTO LDV Z8
                </Button>
              </Link>
              <Link href="/products/aquariuz">
                <Button
                  variant="ghost"
                  className="justify-start px-0 h-auto py-0 min-h-0 text-[10px] text-muted-foreground hover:bg-transparent hover:text-muted-foreground"
                  data-testid="link-footer-aquariuz-refraction"
                >
                  — AQUARIUZ
                </Button>
              </Link>
              <Link href="/products/galilei-g6">
                <Button
                  variant="ghost"
                  className="justify-start px-0 h-auto py-0 min-h-0 text-[10px] text-muted-foreground hover:bg-transparent hover:text-muted-foreground"
                  data-testid="link-footer-galilei-refraction"
                >
                  — GALILEI G6
                </Button>
              </Link>
              <Link href="/corneal-grafting">
                <Button
                  variant="ghost"
                  className="justify-start px-0 h-auto py-0 min-h-0 text-xs hover:bg-transparent hover:text-current"
                  data-testid="link-footer-corneal-grafting"
                >
                  Кератопластика
                </Button>
              </Link>
              <Link href="/products/femto-ldv-z8">
                <Button
                  variant="ghost"
                  className="justify-start px-0 h-auto py-0 min-h-0 text-[10px] text-muted-foreground hover:bg-transparent hover:text-muted-foreground"
                  data-testid="link-footer-femto-grafting"
                >
                  — FEMTO LDV Z8
                </Button>
              </Link>
              <Link href="/products/galilei-g6">
                <Button
                  variant="ghost"
                  className="justify-start px-0 h-auto py-0 min-h-0 text-[10px] text-muted-foreground hover:bg-transparent hover:text-muted-foreground"
                  data-testid="link-footer-galilei-grafting"
                >
                  — GALILEI G6
                </Button>
              </Link>
              <Link href="/keratikonus">
                <Button
                  variant="ghost"
                  className="justify-start px-0 h-auto py-0 min-h-0 text-xs hover:bg-transparent hover:text-current"
                  data-testid="link-footer-keratikonus"
                >
                  Кератоконус
                </Button>
              </Link>
              <Link href="/products/galilei-g6">
                <Button
                  variant="ghost"
                  className="justify-start px-0 h-auto py-0 min-h-0 text-[10px] text-muted-foreground hover:bg-transparent hover:text-muted-foreground"
                  data-testid="link-footer-galilei-keratikonus"
                >
                  — GALILEI G6
                </Button>
              </Link>
              <Link href="/products/ferrara-ring">
                <Button
                  variant="ghost"
                  className="justify-start px-0 h-auto py-0 min-h-0 text-[10px] text-muted-foreground hover:bg-transparent hover:text-muted-foreground"
                  data-testid="link-footer-ferrara-ring"
                >
                  — FERRARA RING
                </Button>
              </Link>
              <Link href="/products/x-link">
                <Button
                  variant="ghost"
                  className="justify-start px-0 h-auto py-0 min-h-0 text-[10px] text-muted-foreground hover:bg-transparent hover:text-muted-foreground"
                  data-testid="link-footer-x-link"
                >
                  — X-LINK
                </Button>
              </Link>
            </nav>
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold text-xs">Оборудование</h3>
            <nav className="flex flex-col gap-0">
              <Link href="/products/femto-ldv-z8">
                <Button
                  variant="ghost"
                  className="justify-start px-0 h-auto py-0 min-h-0 text-xs hover:bg-transparent hover:text-current"
                  data-testid="link-footer-femto"
                >
                  FEMTO LDV Z8
                </Button>
              </Link>
              <Link href="/products/galilei-g6">
                <Button
                  variant="ghost"
                  className="justify-start px-0 h-auto py-0 min-h-0 text-xs hover:bg-transparent hover:text-current"
                  data-testid="link-footer-galilei"
                >
                  GALILEI G6
                </Button>
              </Link>
              <Link href="/products/aquariuz">
                <Button
                  variant="ghost"
                  className="justify-start px-0 h-auto py-0 min-h-0 text-xs hover:bg-transparent hover:text-current"
                  data-testid="link-footer-aquariuz"
                >
                  AQUARIUZ
                </Button>
              </Link>
            </nav>
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold text-xs">Технологии</h3>
            <nav className="flex flex-col gap-0">
              <Link href="/clear">
                <Button
                  variant="ghost"
                  className="justify-start px-0 h-auto py-0 min-h-0 text-xs hover:bg-transparent hover:text-current"
                  data-testid="link-footer-clear"
                >
                  CLEAR
                </Button>
              </Link>
              <Link href="/clear-supra">
                <Button
                  variant="ghost"
                  className="justify-start px-0 h-auto py-0 min-h-0 text-xs hover:bg-transparent hover:text-current"
                  data-testid="link-footer-clear-supra"
                >
                  CLEAR SUPRA
                </Button>
              </Link>
              <Link href="/flow-suite">
                <Button
                  variant="ghost"
                  className="justify-start px-0 h-auto py-0 min-h-0 text-xs hover:bg-transparent hover:text-current"
                  data-testid="link-footer-flow-suite"
                >
                  FLOW SUITE
                </Button>
              </Link>
            </nav>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-xs">Контакты</h3>
            <div className="space-y-3 text-xs">
              <a
                href="tel:+79153526688"
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-phone"
              >
                <Phone className="w-3 h-3" />
                +7 (499) 653-77-67
              </a>
              <a
                href="mailto:office@femtomed.ru"
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-email"
              >
                <Mail className="w-3 h-3" />
                office@femtomed.ru
              </a>
              <div className="flex items-start gap-1 text-muted-foreground">
                <MapPin className="w-3 h-3 mt-0.5" />
                <span>г. Москва, ул. Вавилова, д. 69/75, Россия</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t text-center text-xs text-muted-foreground">
          <p>© 2025 Femtomed. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
