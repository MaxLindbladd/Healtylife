const trophies = [
   {name: "Trophy 1", rarity: 0.40},
   {name: "Trophy 2", rarity: 0.20},
   {name: "Trophy 3", rarity: 0.20},
   {name: "Trophy 4", rarity: 0.10},
   {name: "Trophy 5", rarity: 0.10},
   {name: "Trophy 6", rarity: 0.10},
   {name: "Trophy 7", rarity: 0.10},
   {name: "Trophy 8", rarity: 0.05},
   {name: "Trophy 9", rarity: 0.05},
   {name: "Trophy 10", rarity: 0.01},
  ];


 export function getRandomTrophy() {
    const randomIndex = Math.floor(Math.random() * trophies.length);
    
    return trophies[randomIndex];
  }
  