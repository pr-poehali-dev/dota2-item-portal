import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import ItemCard from './ItemCard';

interface Item {
  name: string;
  image: string;
  cost: number;
  category: string;
}

interface HeroDetailProps {
  hero: {
    name: string;
    image: string;
    roles: string[];
    primaryAttribute: 'strength' | 'agility' | 'intelligence';
    description: string;
    startingItems: Item[];
    coreItems: Item[];
    luxuryItems: Item[];
  };
  onClose: () => void;
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

export default function HeroDetail({ hero, onClose }: HeroDetailProps) {
  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="mb-4"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад к героям
          </Button>

          <Card className="bg-card border-border overflow-hidden">
            <div className="relative h-96">
              <img 
                src={hero.image} 
                alt={hero.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-end justify-between">
                  <div className="space-y-3">
                    <h1 className="text-5xl font-bold text-foreground">{hero.name}</h1>
                    <div className="flex flex-wrap gap-2">
                      {hero.roles.map((role) => (
                        <Badge 
                          key={role} 
                          className="bg-muted text-muted-foreground border-border"
                        >
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-full ${attributeColors[hero.primaryAttribute]}`}>
                    <Icon name={attributeIcons[hero.primaryAttribute]} size={32} className="text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <p className="text-muted-foreground text-lg mb-8">{hero.description}</p>

              <Tabs defaultValue="starting" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-muted">
                  <TabsTrigger value="starting">Стартовые предметы</TabsTrigger>
                  <TabsTrigger value="core">Основные предметы</TabsTrigger>
                  <TabsTrigger value="luxury">Роскошные предметы</TabsTrigger>
                </TabsList>

                <TabsContent value="starting" className="mt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {hero.startingItems.map((item, index) => (
                      <ItemCard key={index} {...item} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="core" className="mt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {hero.coreItems.map((item, index) => (
                      <ItemCard key={index} {...item} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="luxury" className="mt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {hero.luxuryItems.map((item, index) => (
                      <ItemCard key={index} {...item} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
