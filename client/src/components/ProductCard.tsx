import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  features?: string[];
}

export default function ProductCard({ title, description, image, features }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="group overflow-hidden transition-all duration-500 hover-elevate cursor-pointer hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-product-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="relative h-64 overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? 'scale-110 rotate-1' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
        {features && features.length > 0 && (
          <ul className="space-y-2">
            {features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: `${idx * 50}ms` }}>
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 group-hover:scale-150 transition-transform duration-300" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        )}
        <Button variant="ghost" className="group/btn w-full justify-between hover:scale-105 transition-all duration-300" data-testid="button-learn-more">
          Узнать больше
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
        </Button>
      </div>
    </Card>
  );
}
