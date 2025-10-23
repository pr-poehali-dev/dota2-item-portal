import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ItemCardProps {
  name: string;
  image: string;
  cost: number;
  category: string;
}

export default function ItemCard({ name, image, cost, category }: ItemCardProps) {
  return (
    <Card className="group relative overflow-hidden bg-card border-border hover:border-secondary cursor-pointer transition-all duration-300 hover:scale-105">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="p-4 space-y-3">
          <div className="relative w-full h-24 flex items-center justify-center bg-muted rounded-lg overflow-hidden">
            <img 
              src={image} 
              alt={name}
              className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground text-center">{name}</h4>
            
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-secondary border-secondary">
                {cost} <span className="ml-1">⚡</span>
              </Badge>
              <Badge variant="secondary" className="bg-muted text-muted-foreground">
                {category}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
