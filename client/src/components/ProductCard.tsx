import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  features?: string[];
  slug?: string;
  brochure?: string;
}

export default function ProductCard({
  title,
  description,
  image,
  features,
  slug,
  brochure,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="group flex flex-col overflow-hidden transition-all duration-500 hover-elevate hover:shadow-xl h-full w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-product-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <Link href={slug ? `/products/${slug}` : "/products"} className="block">
        <div className="relative h-52 sm:h-60 overflow-hidden bg-muted flex-shrink-0 cursor-pointer">
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-contain transition-transform duration-700 ${
              isHovered ? "scale-105" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </Link>
      <div className="p-5 sm:p-6 flex flex-col flex-1 space-y-3 overflow-visible">
        <Link
          href={slug ? `/products/${slug}` : "/products"}
          className="block space-y-2"
        >
          <h3 className="text-xl sm:text-2xl font-bold group-hover:text-primary transition-colors duration-300 cursor-pointer">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            {description}
          </p>
        </Link>
        {features && features.length > 0 && (
          <ul className="space-y-1.5">
            {features.slice(0, 3).map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm group-hover:translate-x-1 transition-transform duration-300"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 group-hover:scale-150 transition-transform duration-300 flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="space-y-2 mt-auto pt-2">
          <Link
            href={slug ? `/products/${slug}` : "/products"}
            className="flex items-center justify-between text-primary group-hover:translate-x-1 transition-transform duration-300"
          >
            <span className="text-sm font-medium">Узнать больше</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (brochure) {
                window.open(brochure, "_blank");
              }
            }}
          >
            <Download className="w-4 h-4 mr-2" />
            Скачать брошюру
          </Button>
        </div>
      </div>
    </Card>
  );
}
