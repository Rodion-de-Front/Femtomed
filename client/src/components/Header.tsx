import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "О нас" },
  { href: "/clear", label: "CLEAR" },
  { href: "/products", label: "Продукты" },
  { href: "/news", label: "Новости" },
  { href: "/vision-test", label: "Тест зрения" },
  { href: "/contacts", label: "Контакты" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateIndicator = () => {
      const activeIndex = navLinks.findIndex((link) => link.href === location);
      if (activeIndex !== -1 && navRefs.current[activeIndex]) {
        const activeElement = navRefs.current[activeIndex];
        const navContainer = activeElement?.closest("nav");
        if (activeElement && navContainer) {
          const containerRect = navContainer.getBoundingClientRect();
          const elementRect = activeElement.getBoundingClientRect();
          setIndicatorStyle({
            left: elementRect.left - containerRect.left,
            width: elementRect.width,
            opacity: 1,
          });
        }
      } else {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    };

    // Двойной requestAnimationFrame для более точного обновления после рендера
    let rafId2: number;
    const rafId1 = requestAnimationFrame(() => {
      rafId2 = requestAnimationFrame(() => {
        updateIndicator();
      });
    });

    window.addEventListener("resize", updateIndicator);
    return () => {
      cancelAnimationFrame(rafId1);
      if (rafId2) cancelAnimationFrame(rafId2);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
      data-testid="header-main"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-3 hover-elevate rounded-md px-3 py-2 transition-all cursor-pointer">
              <img src="/logo.png" alt="Femtomed" className="h-10" />
            </div>
          </Link>

          <nav
            className="hidden lg:flex items-center gap-1 relative"
            data-testid="nav-desktop"
          >
            {navLinks.map((link, index) => (
              <Link key={link.href} href={link.href}>
                <Button
                  ref={(el) => {
                    navRefs.current[index] = el;
                  }}
                  variant="ghost"
                  className={`font-medium transition-colors no-default-hover-elevate ${
                    location === link.href
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  } hover:!bg-transparent hover:!shadow-none hover:!scale-100 active:!bg-transparent active:!shadow-none active:!scale-100`}
                  style={{
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "scale(1)";
                    if (location !== link.href) {
                      e.currentTarget.style.color = "";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                  data-testid={`link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <div
              className="absolute bottom-0 h-1 bg-primary transition-all duration-500 ease-in-out rounded-full shadow-sm"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
                transform: "translateY(0)",
              }}
            />
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Button variant="ghost" size="icon" data-testid="button-phone">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" data-testid="button-email">
              <Mail className="w-4 h-4" />
            </Button>
            <Button variant="default" data-testid="button-trade-in">
              TRADE-IN
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="lg:hidden bg-background border-t"
          data-testid="nav-mobile"
        >
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start transition-colors no-default-hover-elevate ${
                    location === link.href
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:text-primary"
                  } hover:!bg-transparent`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid={`link-mobile-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <Button
              variant="default"
              className="w-full mt-2"
              data-testid="button-mobile-trade-in"
            >
              TRADE-IN
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
