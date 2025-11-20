import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "О нас" },
  { href: "/products", label: "Оборудование" },
  { href: "/news", label: "Новости" },
  { href: "/vision-test", label: "Тесты" },
  { href: "/contacts", label: "Контакты" },
];

const technologyLinks = [
  { href: "/aquariuz", label: "AQUARIUZ" },
  { href: "/clear", label: "CLEAR" },
  { href: "/flow-suite", label: "FLOW SUITE" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTechnologiesHovered, setIsTechnologiesHovered] = useState(false);
  const [location] = useLocation();
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const technologiesMenuRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const updateIndicator = () => {
      // Проверяем, находимся ли мы на странице одной из технологий
      const isTechnologyPage = technologyLinks.some(
        (link) => link.href === location
      );

      // Если это страница технологии, показываем индикатор на пункте "Технологии"
      if (isTechnologyPage && navRefs.current[2]) {
        const activeElement = navRefs.current[2];
        const navContainer = activeElement?.closest("nav");
        if (activeElement && navContainer) {
          const containerRect = navContainer.getBoundingClientRect();
          const elementRect = activeElement.getBoundingClientRect();
          setIndicatorStyle({
            left: elementRect.left - containerRect.left,
            width: elementRect.width,
            opacity: 1,
          });
          return;
        }
      }

      // Иначе ищем среди обычных ссылок
      const activeIndex = navLinks.findIndex((link) => link.href === location);
      if (
        activeIndex !== -1 &&
        navRefs.current[activeIndex < 2 ? activeIndex : activeIndex + 1]
      ) {
        const adjustedIndex = activeIndex < 2 ? activeIndex : activeIndex + 1;
        const activeElement = navRefs.current[adjustedIndex];
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
            {navLinks.slice(0, 2).map((link, index) => (
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
              className="relative"
              onMouseEnter={() => {
                if (closeTimeoutRef.current) {
                  clearTimeout(closeTimeoutRef.current);
                  closeTimeoutRef.current = null;
                }
                setIsTechnologiesHovered(true);
              }}
              onMouseLeave={() => {
                closeTimeoutRef.current = setTimeout(() => {
                  setIsTechnologiesHovered(false);
                }, 200);
              }}
            >
              <Button
                ref={(el) => {
                  navRefs.current[2] = el;
                }}
                variant="ghost"
                className={`font-medium transition-colors no-default-hover-elevate ${
                  technologyLinks.some((link) => link.href === location)
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                } hover:!bg-transparent hover:!shadow-none hover:!scale-100 active:!bg-transparent active:!shadow-none active:!scale-100`}
                style={{
                  backgroundColor: "transparent",
                }}
                data-testid="link-technologies"
              >
                Технологии
              </Button>
              {isTechnologiesHovered && (
                <div
                  ref={technologiesMenuRef}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[180px] bg-background/95 backdrop-blur-md border rounded-md shadow-lg z-50 py-1"
                  onMouseEnter={() => {
                    if (closeTimeoutRef.current) {
                      clearTimeout(closeTimeoutRef.current);
                      closeTimeoutRef.current = null;
                    }
                  }}
                  onMouseLeave={() => {
                    closeTimeoutRef.current = setTimeout(() => {
                      setIsTechnologiesHovered(false);
                    }, 200);
                  }}
                >
                  {technologyLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <div
                        className={`px-4 py-2 text-sm text-center transition-colors cursor-pointer ${
                          location === link.href
                            ? "text-primary bg-primary/10"
                            : "text-foreground hover:text-primary hover:bg-primary/5"
                        }`}
                      >
                        {link.label}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {navLinks.slice(2).map((link, index) => (
              <Link key={link.href} href={link.href}>
                <Button
                  ref={(el) => {
                    navRefs.current[index + 3] = el;
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
            {/* <Button variant="ghost" size="icon" data-testid="button-phone">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" data-testid="button-email">
              <Mail className="w-4 h-4" />
            </Button> */}
            <Link href="/contacts">
              <Button variant="default" data-testid="button-trade-in">
                TRADE-IN
              </Button>
            </Link>
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
            {navLinks.slice(0, 2).map((link) => (
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
            <div className="w-full">
              <div className="text-sm font-semibold px-2 py-2 text-muted-foreground">
                Технологии
              </div>
              {technologyLinks.map((link) => (
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
            </div>
            {navLinks.slice(2).map((link) => (
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
