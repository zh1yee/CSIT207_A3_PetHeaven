import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { API_ENDPOINTS } from '../config/api';
import './PetsGalleryPage.css';

function PetsGalleryPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedAge, setSelectedAge] = useState('all');
  const [selectedBreed, setSelectedBreed] = useState('all');
  const [selectedSpecial, setSelectedSpecial] = useState('all');

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.GET_PETS);
      
      if (!response.ok) {
        throw new Error('Failed to fetch pets');
      }

      const data = await response.json();
      setPets(data);
      //showToast('Pets loaded successfully!', 'success');
    } catch (error) {
      console.error('Error fetching pets:', error);
      showToast('Unable to load pets. Please try again later.', 'error');
    } finally {
      setLoading(false);
    }
  }


/*
  const fetchPets = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=12');
      
      if (!response.ok) {
        throw new Error('Failed to fetch pets');
      }

      const data = await response.json();
      
      const petsData = data.map((cat, index) => ({
        id: cat.id,
        name: generatePetName(index),
        age: Math.floor(Math.random() * 10) + 1,
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        breed: cat.breeds?.[0]?.name || 'Mixed Breed',
        image: cat.url,
        personality: generatePersonality(),
        specialNeeds: Math.random() > 0.7,
        description: generateDescription()
      }));

      setPets(petsData);
      showToast('Pets loaded successfully!', 'success');
    } catch (error) {
      console.error('[v0] Error fetching pets:', error);
      showToast('Unable to load pets. Please try again later.', 'error');
      // Show some mock data in case of API failure
      setPets(getMockPets());
    } finally {
      setLoading(false);
    }
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

  const getMockPets = () => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: `mock-${i}`,
      name: generatePetName(i),
      age: Math.floor(Math.random() * 10) + 1,
      gender: Math.random() > 0.5 ? 'Male' : 'Female',
      breed: 'Mixed Breed',
      image: '/placeholder.svg?key=0rgjo',
      personality: generatePersonality(),
      specialNeeds: Math.random() > 0.7,
      description: generateDescription()
    }));
  };
  */
  // Extract unique types and breeds from pets
  const uniqueTypes = useMemo(() => {
    const types = [...new Set(pets.map(pet => pet.type).filter(Boolean))];
    return types.sort();
  }, [pets]);

  const uniqueBreeds = useMemo(() => {
    const breeds = [...new Set(pets.map(pet => pet.breed).filter(Boolean))];
    return breeds.sort();
  }, [pets]);

  // Age range filter function
  const matchesAgeRange = (petAge, ageRange) => {
    if (ageRange === 'all') return true;
    const age = parseInt(petAge);
    switch (ageRange) {
      case '0-1': return age >= 0 && age <= 1;
      case '1-3': return age > 1 && age <= 3;
      case '3-5': return age > 3 && age <= 5;
      case '5-10': return age > 5 && age <= 10;
      case '10+': return age > 10;
      default: return true;
    }
  };

  const filteredPets = pets.filter(pet => {
    // Type filter
    const matchesType = selectedType === 'all' || pet.type === selectedType;
    
    // Age filter
    const matchesAge = matchesAgeRange(pet.age, selectedAge);
    
    // Breed filter
    const matchesBreed = selectedBreed === 'all' || pet.breed === selectedBreed;
    
    // Special needs filter
    const matchesSpecial = selectedSpecial === 'all' || 
                          (selectedSpecial === 'yes' && pet.special) ||
                          (selectedSpecial === 'no' && !pet.special);
    
    // Search filter
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pet.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesAge && matchesBreed && matchesSpecial && matchesSearch;
  });

  const clearFilters = () => {
    setSelectedType('all');
    setSelectedAge('all');
    setSelectedBreed('all');
    setSelectedSpecial('all');
    setSearchTerm('');
  };

  return (
    <div className="pets-gallery-page">
      <div className="gallery-header">
        <div className="container">
          <h1>Available Pets for Adoption</h1>
          <p>Find your perfect companion from our loving pets waiting for homes</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="gallery-controls">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by name, breed, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-dropdowns">
              <div className="filter-group">
                <label htmlFor="type-filter">Pet Type</label>
                <select
                  id="type-filter"
                  className="filter-select"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  {uniqueTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="age-filter">Age Range</label>
                <select
                  id="age-filter"
                  className="filter-select"
                  value={selectedAge}
                  onChange={(e) => setSelectedAge(e.target.value)}
                >
                  <option value="all">All Ages</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="breed-filter">Breed</label>
                <select
                  id="breed-filter"
                  className="filter-select"
                  value={selectedBreed}
                  onChange={(e) => setSelectedBreed(e.target.value)}
                >
                  <option value="all">All Breeds</option>
                  {uniqueBreeds.map(breed => (
                    <option key={breed} value={breed}>{breed}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="special-filter">Special Needs</label>
                <select
                  id="special-filter"
                  className="filter-select"
                  value={selectedSpecial}
                  onChange={(e) => setSelectedSpecial(e.target.value)}
                >
                  <option value="all">All Pets</option>
                  <option value="yes">Special Needs Only</option>
                  <option value="no">No Special Needs</option>
                </select>
              </div>

              {(selectedType !== 'all' || selectedAge !== 'all' || selectedBreed !== 'all' || selectedSpecial !== 'all' || searchTerm) && (
                <button className="clear-filters-btn" onClick={clearFilters}>
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : (
            <>
              <div className="pets-count">
                Showing {filteredPets.length} {filteredPets.length === 1 ? 'pet' : 'pets'}
              </div>
              
              <div className="pets-grid">
                {filteredPets.map(pet => (
                  <div key={pet.id} className="pet-card" onClick={() => navigate(`/pet/${pet.id}`, { state: { pet } })}>
                    <div className="pet-image">
                      <img src={pet.image || "/placeholder.svg"} alt={pet.name} />
                      {pet.special && (
                        <span className="special-badge">Special Needs</span>
                      )}
                    </div>
                    <div className="pet-info">
                      <h3>{pet.name}</h3>
                      <p className="pet-breed">{pet.breed}</p>
                      <div className="pet-details">
                        <span>{pet.age} {pet.age === 1 ? 'year' : 'years'} old</span>
                        <span>•</span>
                        <span>{pet.gender}</span>
                      </div>
                      <div className="pet-personality">
                        {pet.personality.map((trait, index) => (
                          <span key={index} className="trait-tag">{trait}</span>
                        ))}
                      </div>
                      <button className="btn btn-primary btn-small">View Details</button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredPets.length === 0 && (
                <div className="no-results">
                  <p>No pets found matching your criteria.</p>
                  <button className="btn btn-secondary" onClick={clearFilters}>
                    Clear Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default PetsGalleryPage;
