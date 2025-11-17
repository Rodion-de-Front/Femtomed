import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Grid3x3, Palette, Target, Contrast } from 'lucide-react';

interface VisionTestCardProps {
  title: string;
  description: string;
  icon: 'eye' | 'grid' | 'palette' | 'target' | 'contrast';
  testId: string;
}

const icons = {
  eye: Eye,
  grid: Grid3x3,
  palette: Palette,
  target: Target,
  contrast: Contrast,
};

export default function VisionTestCard({ title, description, icon, testId }: VisionTestCardProps) {
  const Icon = icons[icon];

  return (
    <Card className="group p-6 hover-elevate transition-all duration-300 cursor-pointer" data-testid={`card-test-${testId}`}>
      <div className="space-y-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
        <Button variant="ghost" className="w-full justify-start group/btn" data-testid={`button-start-${testId}`}>
          Начать тест
          <div className="ml-auto w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover/btn:bg-primary/20 transition-colors">
            <span className="text-primary text-sm">→</span>
          </div>
        </Button>
      </div>
    </Card>
  );
}
