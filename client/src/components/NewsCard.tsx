import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';

interface NewsCardProps {
  title: string;
  date: string;
  location?: string;
  image?: string;
  excerpt: string;
  category?: string;
}

export default function NewsCard({ title, date, location, image, excerpt, category }: NewsCardProps) {
  return (
    <Card
      className="group overflow-hidden hover-elevate transition-all duration-500 cursor-pointer hover:shadow-xl"
      data-testid={`card-news-${title.substring(0, 20).toLowerCase().replace(/\s+/g, '-')}`}
    >
      {image && (
        <div className="relative h-48 overflow-hidden bg-muted">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
          {category && (
            <div className="absolute top-4 left-4 animate-in fade-in slide-in-from-left duration-500">
              <Badge variant="secondary" className="backdrop-blur-sm hover:scale-110 transition-transform duration-300">
                {category}
              </Badge>
            </div>
          )}
        </div>
      )}
      <div className="p-6 space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          {location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          )}
        </div>
        <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed line-clamp-3">{excerpt}</p>
      </div>
    </Card>
  );
}
