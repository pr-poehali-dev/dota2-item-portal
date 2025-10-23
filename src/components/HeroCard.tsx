import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface HeroCardProps {
  name: string;
  image: string;
  roles: string[];
  primaryAttribute: 'strength' | 'agility' | 'intelligence';
  onClick: () => void;
}

const attributeColors = {
  strength: 'bg-[#C23C2A]',
  agility: 'bg-[#66C704]',
  intelligence: 'bg-[#00A8E8]'
};

const attributeIcons = {
  strength: 'Zap',
  agility: 'Wind',
  intelligence: 'Sparkles'
};

export default function HeroCard({ name, image, roles, primaryAttribute, onClick }: HeroCardProps) {
  return (
    <Card 
      className="group relative overflow-hidden bg-card border-border hover:border-primary cursor-pointer transition-all duration-300 hover:scale-105"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
      
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      <div className="relative z-20 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground">{name}</h3>
          <div className={`p-2 rounded-full ${attributeColors[primaryAttribute]}`}>
            <Icon name={attributeIcons[primaryAttribute]} size={20} className="text-white" />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {roles.map((role) => (
            <Badge 
              key={role} 
              variant="secondary"
              className="bg-muted text-muted-foreground border-border"
            >
              {role}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}
