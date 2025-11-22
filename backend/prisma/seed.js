require("dotenv/config");
const _ = require('lodash');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const getPetsImage = async () => {
    // fetch cat images
    const cat_api = await fetch('https://api.thecatapi.com/v1/images/search?limit=8');
      
      if (!cat_api.ok) {
        throw new Error('Failed to fetch cat pets');
      }
  const cat_data = await cat_api.json();
  const cat_images = cat_data.map((item) => ({ url: item.url, type: 'Cat' }));

    // fetch dog images
    const dog_api = await fetch('https://api.thedogapi.com/v1/images/search?limit=7');

    if (!dog_api.ok) {
        throw new Error('Failed to fetch dog pets');
      } 
      const dog_data = await dog_api.json();
    const dog_images = dog_data.map((item) => ({ url: item.url, type: 'Dog' }));

    const images = [...cat_images, ...dog_images];

    return _.shuffle(images);
};

const generatePetName = (index) => {
    const names = ['Luna', 'Max', 'Bella', 'Charlie', 'Lucy', 'Cooper', 'Daisy', 'Rocky', 
                   'Molly', 'Buddy', 'Sophie', 'Jack', 'Chloe', 'Duke', 'Lola', 'Bear'];
    return names[index % names.length];
  };

const generatePersonality = () => {
const traits = [
    ['Playful', 'Energetic', 'Friendly'],
    ['Calm', 'Affectionate', 'Gentle'],
    ['Curious', 'Independent', 'Smart'],
    ['Loyal', 'Protective', 'Active']
];
return traits[Math.floor(Math.random() * traits.length)];
};

const generateDescription = () => {
const descriptions = [
    'A wonderful companion looking for a loving home.',
    'Very friendly and gets along well with children.',
    'Enjoys playtime and cuddles equally.',
    'Would thrive in a quiet, loving environment.',
    'Active and loves outdoor activities.',
    'Perfect for families or individuals.'
];
return descriptions[Math.floor(Math.random() * descriptions.length)];
};

async function main () {
    console.log('🌱 Starting seed...');
    
    const petImages = await getPetsImage();
    console.log(`📸 Fetched ${petImages.length} pet images`);
    
  const petData = petImages.map((imageObj, index) => ({
    image: imageObj.url,
    name: generatePetName(index),
    type: imageObj.type || 'Unknown',
    age: Math.floor(Math.random() * 10) + 1, 
    gender: Math.random() > 0.5 ? 'Male' : 'Female',
    breed: 'Mixed Breed',
    personality: generatePersonality(),
    description: generateDescription(),
    special: Math.random() > 0.7 ? true : false
  }));

    await prisma.pets.createMany({
        data: petData
    });
    
    console.log(`✅ Successfully seeded ${petData.length} pets!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

