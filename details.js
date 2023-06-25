document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const heroId = urlParams.get('id');
  
    const storedData = localStorage.getItem('myData');
    const heroes = JSON.parse(storedData);
  
    const hero = heroes.find(entry => entry.id === parseInt(heroId));
  
    if (hero) {
      const heroDetailsContainer = document.getElementById('heroDetails');
  
      const card = document.createElement('div');
      card.classList.add('card', 'mb-3', 'col-md-6');
  
      const image = document.createElement('img');
      image.src = hero.thumbnail.path + '.' + hero.thumbnail.extension;
      image.classList.add('card-img-top');
      card.appendChild(image);
  
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
      card.appendChild(cardBody);
  
      const title = document.createElement('h5');
      title.classList.add('card-title');
      title.textContent = hero.name;
      cardBody.appendChild(title);
  
      const description = document.createElement('p');
      description.classList.add('card-text');
      description.textContent = hero.description || 'No description available.';
      cardBody.appendChild(description);
  
      heroDetailsContainer.appendChild(card);
    }
  });
  