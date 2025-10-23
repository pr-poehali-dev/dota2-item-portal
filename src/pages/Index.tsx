import { useState } from 'react';
import HeroCard from '@/components/HeroCard';
import HeroDetail from '@/components/HeroDetail';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const heroes = [
  {
    name: 'Invoker',
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop',
    roles: ['Mid', 'Carry', 'Disabler'],
    primaryAttribute: 'intelligence' as const,
    description: 'Мастер элементальной магии, способный комбинировать заклинания для создания мощных эффектов.',
    startingItems: [
      { name: 'Tango', image: 'https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?w=100&h=100&fit=crop', cost: 90, category: 'Consumable' },
      { name: 'Faerie Fire', image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=100&h=100&fit=crop', cost: 70, category: 'Consumable' },
      { name: 'Circlet', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop', cost: 155, category: 'Basic' },
      { name: 'Mantle', image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=100&h=100&fit=crop', cost: 140, category: 'Basic' },
    ],
    coreItems: [
      { name: 'Aghanim\'s Scepter', image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=100&h=100&fit=crop', cost: 4200, category: 'Caster' },
      { name: 'Black King Bar', image: 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=100&h=100&fit=crop', cost: 4050, category: 'Armor' },
      { name: 'Blink Dagger', image: 'https://images.unsplash.com/photo-1573511860302-28c524319d2a?w=100&h=100&fit=crop', cost: 2250, category: 'Weapon' },
    ],
    luxuryItems: [
      { name: 'Scythe of Vyse', image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=100&h=100&fit=crop', cost: 5675, category: 'Caster' },
      { name: 'Refresher Orb', image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=100&h=100&fit=crop', cost: 5000, category: 'Caster' },
    ],
  },
  {
    name: 'Phantom Assassin',
    image: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=800&h=600&fit=crop',
    roles: ['Carry', 'Escape'],
    primaryAttribute: 'agility' as const,
    description: 'Смертоносный убийца, наносящий критические удары и уклоняющийся от атак врагов.',
    startingItems: [
      { name: 'Tango', image: 'https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?w=100&h=100&fit=crop', cost: 90, category: 'Consumable' },
      { name: 'Stout Shield', image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=100&h=100&fit=crop', cost: 200, category: 'Basic' },
      { name: 'Slippers', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=100&h=100&fit=crop', cost: 140, category: 'Basic' },
    ],
    coreItems: [
      { name: 'Battle Fury', image: 'https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=100&h=100&fit=crop', cost: 4130, category: 'Weapon' },
      { name: 'Desolator', image: 'https://images.unsplash.com/photo-1557825835-70d97c4aa567?w=100&h=100&fit=crop', cost: 3500, category: 'Weapon' },
      { name: 'Black King Bar', image: 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=100&h=100&fit=crop', cost: 4050, category: 'Armor' },
    ],
    luxuryItems: [
      { name: 'Abyssal Blade', image: 'https://images.unsplash.com/photo-1562813733-b31f71025d54?w=100&h=100&fit=crop', cost: 6250, category: 'Weapon' },
      { name: 'Satanic', image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=100&h=100&fit=crop', cost: 5050, category: 'Armor' },
    ],
  },
  {
    name: 'Axe',
    image: 'https://images.unsplash.com/photo-1599256621730-4f6b0c6d1ea3?w=800&h=600&fit=crop',
    roles: ['Tank', 'Initiator', 'Disabler'],
    primaryAttribute: 'strength' as const,
    description: 'Бесстрашный воин, провоцирующий врагов и наносящий урон всем вокруг.',
    startingItems: [
      { name: 'Tango', image: 'https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?w=100&h=100&fit=crop', cost: 90, category: 'Consumable' },
      { name: 'Stout Shield', image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=100&h=100&fit=crop', cost: 200, category: 'Basic' },
      { name: 'Ring of Protection', image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=100&h=100&fit=crop', cost: 175, category: 'Basic' },
    ],
    coreItems: [
      { name: 'Blink Dagger', image: 'https://images.unsplash.com/photo-1573511860302-28c524319d2a?w=100&h=100&fit=crop', cost: 2250, category: 'Weapon' },
      { name: 'Blade Mail', image: 'https://images.unsplash.com/photo-1560015534-cee980ba7e97?w=100&h=100&fit=crop', cost: 2100, category: 'Armor' },
      { name: 'Vanguard', image: 'https://images.unsplash.com/photo-1614036417651-efe5e4888350?w=100&h=100&fit=crop', cost: 1800, category: 'Armor' },
    ],
    luxuryItems: [
      { name: 'Heart of Tarrasque', image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=100&h=100&fit=crop', cost: 5000, category: 'Armor' },
      { name: 'Shiva\'s Guard', image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=100&h=100&fit=crop', cost: 4700, category: 'Armor' },
    ],
  },
  {
    name: 'Crystal Maiden',
    image: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800&h=600&fit=crop',
    roles: ['Support', 'Disabler', 'Nuker'],
    primaryAttribute: 'intelligence' as const,
    description: 'Ледяная волшебница, замедляющая врагов и восстанавливающая ману союзникам.',
    startingItems: [
      { name: 'Tango', image: 'https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?w=100&h=100&fit=crop', cost: 90, category: 'Consumable' },
      { name: 'Clarity', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100&h=100&fit=crop', cost: 50, category: 'Consumable' },
      { name: 'Observer Ward', image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=100&h=100&fit=crop', cost: 0, category: 'Support' },
    ],
    coreItems: [
      { name: 'Glimmer Cape', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=100&h=100&fit=crop', cost: 1950, category: 'Support' },
      { name: 'Force Staff', image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=100&h=100&fit=crop', cost: 2200, category: 'Caster' },
      { name: 'Black King Bar', image: 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=100&h=100&fit=crop', cost: 4050, category: 'Armor' },
    ],
    luxuryItems: [
      { name: 'Aghanim\'s Scepter', image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=100&h=100&fit=crop', cost: 4200, category: 'Caster' },
      { name: 'Refresher Orb', image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=100&h=100&fit=crop', cost: 5000, category: 'Caster' },
    ],
  },
  {
    name: 'Juggernaut',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop',
    roles: ['Carry', 'Pusher'],
    primaryAttribute: 'agility' as const,
    description: 'Мастер клинка, неуязвимый во время вращения и наносящий быстрые удары.',
    startingItems: [
      { name: 'Tango', image: 'https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?w=100&h=100&fit=crop', cost: 90, category: 'Consumable' },
      { name: 'Quelling Blade', image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=100&h=100&fit=crop', cost: 130, category: 'Basic' },
      { name: 'Stout Shield', image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=100&h=100&fit=crop', cost: 200, category: 'Basic' },
    ],
    coreItems: [
      { name: 'Phase Boots', image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=100&h=100&fit=crop', cost: 1500, category: 'Boots' },
      { name: 'Maelstrom', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop', cost: 2700, category: 'Weapon' },
      { name: 'Diffusal Blade', image: 'https://images.unsplash.com/photo-1542680143-5e5e8d3e0d99?w=100&h=100&fit=crop', cost: 3150, category: 'Weapon' },
    ],
    luxuryItems: [
      { name: 'Butterfly', image: 'https://images.unsplash.com/photo-1558769132-cb1aea9c755b?w=100&h=100&fit=crop', cost: 5450, category: 'Weapon' },
      { name: 'Abyssal Blade', image: 'https://images.unsplash.com/photo-1562813733-b31f71025d54?w=100&h=100&fit=crop', cost: 6250, category: 'Weapon' },
    ],
  },
  {
    name: 'Lina',
    image: 'https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?w=800&h=600&fit=crop',
    roles: ['Support', 'Nuker', 'Disabler'],
    primaryAttribute: 'intelligence' as const,
    description: 'Огненная маг, уничтожающая врагов потоками пламени и молниями.',
    startingItems: [
      { name: 'Tango', image: 'https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?w=100&h=100&fit=crop', cost: 90, category: 'Consumable' },
      { name: 'Faerie Fire', image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=100&h=100&fit=crop', cost: 70, category: 'Consumable' },
      { name: 'Null Talisman', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop', cost: 505, category: 'Basic' },
    ],
    coreItems: [
      { name: 'Eul\'s Scepter', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=100&h=100&fit=crop', cost: 2725, category: 'Caster' },
      { name: 'Kaya', image: 'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?w=100&h=100&fit=crop', cost: 2050, category: 'Caster' },
      { name: 'Black King Bar', image: 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=100&h=100&fit=crop', cost: 4050, category: 'Armor' },
    ],
    luxuryItems: [
      { name: 'Bloodthorn', image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=100&h=100&fit=crop', cost: 6800, category: 'Weapon' },
      { name: 'Aghanim\'s Scepter', image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=100&h=100&fit=crop', cost: 4200, category: 'Caster' },
    ],
  },
  {
    name: 'Pudge',
    image: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=800&h=600&fit=crop',
    roles: ['Tank', 'Disabler', 'Initiator'],
    primaryAttribute: 'strength' as const,
    description: 'Мясник с крюком, притягивающий врагов и поедающий их силу.',
    startingItems: [
      { name: 'Tango', image: 'https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?w=100&h=100&fit=crop', cost: 90, category: 'Consumable' },
      { name: 'Clarity', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100&h=100&fit=crop', cost: 50, category: 'Consumable' },
      { name: 'Gauntlets', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=100&h=100&fit=crop', cost: 140, category: 'Basic' },
    ],
    coreItems: [
      { name: 'Blink Dagger', image: 'https://images.unsplash.com/photo-1573511860302-28c524319d2a?w=100&h=100&fit=crop', cost: 2250, category: 'Weapon' },
      { name: 'Hood of Defiance', image: 'https://images.unsplash.com/photo-1550461716-dbf266b2a8a7?w=100&h=100&fit=crop', cost: 1500, category: 'Armor' },
      { name: 'Aghanim\'s Shard', image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=100&h=100&fit=crop', cost: 1400, category: 'Caster' },
    ],
    luxuryItems: [
      { name: 'Heart of Tarrasque', image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=100&h=100&fit=crop', cost: 5000, category: 'Armor' },
      { name: 'Aghanim\'s Scepter', image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=100&h=100&fit=crop', cost: 4200, category: 'Caster' },
    ],
  },
  {
    name: 'Sniper',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop',
    roles: ['Carry', 'Nuker'],
    primaryAttribute: 'agility' as const,
    description: 'Дальнобойный стрелок с огромной дистанцией атаки.',
    startingItems: [
      { name: 'Tango', image: 'https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?w=100&h=100&fit=crop', cost: 90, category: 'Consumable' },
      { name: 'Slippers', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=100&h=100&fit=crop', cost: 140, category: 'Basic' },
      { name: 'Circlet', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop', cost: 155, category: 'Basic' },
    ],
    coreItems: [
      { name: 'Dragon Lance', image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=100&h=100&fit=crop', cost: 1900, category: 'Weapon' },
      { name: 'Maelstrom', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop', cost: 2700, category: 'Weapon' },
      { name: 'Black King Bar', image: 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=100&h=100&fit=crop', cost: 4050, category: 'Armor' },
    ],
    luxuryItems: [
      { name: 'Mjollnir', image: 'https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=100&h=100&fit=crop', cost: 5600, category: 'Weapon' },
      { name: 'Monkey King Bar', image: 'https://images.unsplash.com/photo-1557825835-70d97c4aa567?w=100&h=100&fit=crop', cost: 4975, category: 'Weapon' },
    ],
  },
  {
    name: 'Earthshaker',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    roles: ['Support', 'Initiator', 'Disabler'],
    primaryAttribute: 'strength' as const,
    description: 'Повелитель землетрясений, сокрушающий врагов мощью земли.',
    startingItems: [
      { name: 'Tango', image: 'https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?w=100&h=100&fit=crop', cost: 90, category: 'Consumable' },
      { name: 'Clarity', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100&h=100&fit=crop', cost: 50, category: 'Consumable' },
      { name: 'Observer Ward', image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=100&h=100&fit=crop', cost: 0, category: 'Support' },
    ],
    coreItems: [
      { name: 'Blink Dagger', image: 'https://images.unsplash.com/photo-1573511860302-28c524319d2a?w=100&h=100&fit=crop', cost: 2250, category: 'Weapon' },
      { name: 'Arcane Boots', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop', cost: 1300, category: 'Boots' },
      { name: 'Force Staff', image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=100&h=100&fit=crop', cost: 2200, category: 'Caster' },
    ],
    luxuryItems: [
      { name: 'Aghanim\'s Scepter', image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=100&h=100&fit=crop', cost: 4200, category: 'Caster' },
      { name: 'Refresher Orb', image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=100&h=100&fit=crop', cost: 5000, category: 'Caster' },
    ],
  },
  {
    name: 'Drow Ranger',
    image: 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=800&h=600&fit=crop',
    roles: ['Carry', 'Pusher'],
    primaryAttribute: 'agility' as const,
    description: 'Ледяная лучница с мощными физическими атаками.',
    startingItems: [
      { name: 'Tango', image: 'https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?w=100&h=100&fit=crop', cost: 90, category: 'Consumable' },
      { name: 'Slippers', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=100&h=100&fit=crop', cost: 140, category: 'Basic' },
      { name: 'Wraith Band', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop', cost: 505, category: 'Basic' },
    ],
    coreItems: [
      { name: 'Dragon Lance', image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=100&h=100&fit=crop', cost: 1900, category: 'Weapon' },
      { name: 'Maelstrom', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop', cost: 2700, category: 'Weapon' },
      { name: 'Yasha', image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=100&h=100&fit=crop', cost: 2050, category: 'Weapon' },
    ],
    luxuryItems: [
      { name: 'Butterfly', image: 'https://images.unsplash.com/photo-1558769132-cb1aea9c755b?w=100&h=100&fit=crop', cost: 5450, category: 'Weapon' },
      { name: 'Daedalus', image: 'https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=100&h=100&fit=crop', cost: 5150, category: 'Weapon' },
    ],
  },
  {
    name: 'Lion',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=600&fit=crop',
    roles: ['Support', 'Disabler', 'Nuker'],
    primaryAttribute: 'intelligence' as const,
    description: 'Демонический маг с мощными контрольными способностями.',
    startingItems: [
      { name: 'Tango', image: 'https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?w=100&h=100&fit=crop', cost: 90, category: 'Consumable' },
      { name: 'Clarity', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100&h=100&fit=crop', cost: 50, category: 'Consumable' },
      { name: 'Observer Ward', image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=100&h=100&fit=crop', cost: 0, category: 'Support' },
    ],
    coreItems: [
      { name: 'Blink Dagger', image: 'https://images.unsplash.com/photo-1573511860302-28c524319d2a?w=100&h=100&fit=crop', cost: 2250, category: 'Weapon' },
      { name: 'Glimmer Cape', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=100&h=100&fit=crop', cost: 1950, category: 'Support' },
      { name: 'Aether Lens', image: 'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?w=100&h=100&fit=crop', cost: 2275, category: 'Caster' },
    ],
    luxuryItems: [
      { name: 'Aghanim\'s Scepter', image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=100&h=100&fit=crop', cost: 4200, category: 'Caster' },
      { name: 'Aeon Disk', image: 'https://images.unsplash.com/photo-1550461716-dbf266b2a8a7?w=100&h=100&fit=crop', cost: 3000, category: 'Armor' },
    ],
  },
  {
    name: 'Anti-Mage',
    image: 'https://images.unsplash.com/photo-1557825835-70d97c4aa567?w=800&h=600&fit=crop',
    roles: ['Carry', 'Escape', 'Nuker'],
    primaryAttribute: 'agility' as const,
    description: 'Убийца магов, сжигающий ману и прыгающий по полю боя.',
    startingItems: [
      { name: 'Tango', image: 'https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?w=100&h=100&fit=crop', cost: 90, category: 'Consumable' },
      { name: 'Quelling Blade', image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=100&h=100&fit=crop', cost: 130, category: 'Basic' },
      { name: 'Stout Shield', image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=100&h=100&fit=crop', cost: 200, category: 'Basic' },
    ],
    coreItems: [
      { name: 'Battle Fury', image: 'https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=100&h=100&fit=crop', cost: 4130, category: 'Weapon' },
      { name: 'Manta Style', image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=100&h=100&fit=crop', cost: 4600, category: 'Weapon' },
      { name: 'Black King Bar', image: 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=100&h=100&fit=crop', cost: 4050, category: 'Armor' },
    ],
    luxuryItems: [
      { name: 'Butterfly', image: 'https://images.unsplash.com/photo-1558769132-cb1aea9c755b?w=100&h=100&fit=crop', cost: 5450, category: 'Weapon' },
      { name: 'Abyssal Blade', image: 'https://images.unsplash.com/photo-1562813733-b31f71025d54?w=100&h=100&fit=crop', cost: 6250, category: 'Weapon' },
    ],
  },
  {
    name: 'Zeus',
    image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&h=600&fit=crop',
    roles: ['Mid', 'Nuker'],
    primaryAttribute: 'intelligence' as const,
    description: 'Повелитель молний, уничтожающий врагов магическим уроном.',
    startingItems: [
      { name: 'Tango', image: 'https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?w=100&h=100&fit=crop', cost: 90, category: 'Consumable' },
      { name: 'Faerie Fire', image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=100&h=100&fit=crop', cost: 70, category: 'Consumable' },
      { name: 'Null Talisman', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop', cost: 505, category: 'Basic' },
    ],
    coreItems: [
      { name: 'Arcane Boots', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop', cost: 1300, category: 'Boots' },
      { name: 'Aether Lens', image: 'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?w=100&h=100&fit=crop', cost: 2275, category: 'Caster' },
      { name: 'Kaya', image: 'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?w=100&h=100&fit=crop', cost: 2050, category: 'Caster' },
    ],
    luxuryItems: [
      { name: 'Refresher Orb', image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=100&h=100&fit=crop', cost: 5000, category: 'Caster' },
      { name: 'Aghanim\'s Scepter', image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=100&h=100&fit=crop', cost: 4200, category: 'Caster' },
    ],
  },
  {
    name: 'Shadow Fiend',
    image: 'https://images.unsplash.com/photo-1592609931095-54a2168ae893?w=800&h=600&fit=crop',
    roles: ['Mid', 'Carry', 'Nuker'],
    primaryAttribute: 'agility' as const,
    description: 'Демон теней, собирающий души врагов для усиления атак.',
    startingItems: [
      { name: 'Tango', image: 'https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?w=100&h=100&fit=crop', cost: 90, category: 'Consumable' },
      { name: 'Wraith Band', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop', cost: 505, category: 'Basic' },
      { name: 'Faerie Fire', image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=100&h=100&fit=crop', cost: 70, category: 'Consumable' },
    ],
    coreItems: [
      { name: 'Shadow Blade', image: 'https://images.unsplash.com/photo-1573511860302-28c524319d2a?w=100&h=100&fit=crop', cost: 3000, category: 'Weapon' },
      { name: 'Black King Bar', image: 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=100&h=100&fit=crop', cost: 4050, category: 'Armor' },
      { name: 'Desolator', image: 'https://images.unsplash.com/photo-1557825835-70d97c4aa567?w=100&h=100&fit=crop', cost: 3500, category: 'Weapon' },
    ],
    luxuryItems: [
      { name: 'Butterfly', image: 'https://images.unsplash.com/photo-1558769132-cb1aea9c755b?w=100&h=100&fit=crop', cost: 5450, category: 'Weapon' },
      { name: 'Satanic', image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=100&h=100&fit=crop', cost: 5050, category: 'Armor' },
    ],
  },
];

const roleFilters = ['All', 'Carry', 'Support', 'Mid', 'Tank', 'Disabler', 'Nuker', 'Pusher', 'Initiator', 'Escape'];

export default function Index() {
  const [selectedHero, setSelectedHero] = useState<typeof heroes[0] | null>(null);
  const [selectedRole, setSelectedRole] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHeroes = heroes.filter(hero => {
    const matchesRole = selectedRole === 'All' || hero.roles.includes(selectedRole);
    const matchesSearch = hero.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  if (selectedHero) {
    return <HeroDetail hero={selectedHero} onClose={() => setSelectedHero(null)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-background"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&h=400&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-4">
            Dota 2 Items Guide
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Полное руководство по закупке предметов для каждого героя
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-6">
          <div className="relative max-w-md">
            <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Поиск героя..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {roleFilters.map((role) => (
              <Button
                key={role}
                variant={selectedRole === role ? "default" : "outline"}
                onClick={() => setSelectedRole(role)}
                className={selectedRole === role ? "bg-primary text-primary-foreground" : ""}
              >
                {role}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHeroes.map((hero) => (
            <HeroCard
              key={hero.name}
              name={hero.name}
              image={hero.image}
              roles={hero.roles}
              primaryAttribute={hero.primaryAttribute}
              onClick={() => setSelectedHero(hero)}
            />
          ))}
        </div>

        {filteredHeroes.length === 0 && (
          <div className="text-center py-16">
            <Icon name="Search" size={64} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-semibold text-foreground mb-2">Герои не найдены</h3>
            <p className="text-muted-foreground">Попробуйте изменить фильтры или поисковый запрос</p>
          </div>
        )}
      </div>
    </div>
  );
}