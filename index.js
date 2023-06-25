
var herodata = []
var favorites = [];

fetch('https://gateway.marvel.com/v1/public/characters?ts=1&apikey=8087dfd6639cc16c3127f8337ccc1d13&hash=dad077a7cf4f173db4b6cf3ed166c3f5')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {


    localStorage.setItem('myData', JSON.stringify(data.data.results));



    const dataContainer = document.getElementById('dataContainer');

    data.data.results.forEach(entry => {
      if (entry.name) { // Check if the entry has a valid name
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3', 'col-md-6');
        if (entry.thumbnail) {
          const image = document.createElement('img');
          image.src = entry.thumbnail.path + '.' + entry.thumbnail.extension;
          image.classList.add('card-img-top');
          card.appendChild(image);
        }


        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        card.appendChild(cardBody);

        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = entry.name;
        cardBody.appendChild(title);

        // const description = document.createElement('p');
        // description.classList.add('card-text');
        // description.textContent = entry.description;
        // cardBody.appendChild(description);

        const buttonFavourite = document.createElement('button');
        buttonFavourite.classList.add("btn", 'btn-primary', 'mb-5')
        buttonFavourite.textContent = "Add to favourite"
        cardBody.appendChild(buttonFavourite);

        const buttonProfile = document.createElement('button');
        buttonProfile.classList.add("btn", 'btn-primary', 'mb-5')
        buttonProfile.textContent = "View details"
        buttonProfile.href = `details.html?id=${entry.id}`; // Pass the hero ID as a query parameter
        cardBody.appendChild(buttonProfile);

        dataContainer.appendChild(card);


        //add to favourites
        buttonFavourite.addEventListener('click', function () {
          const entryId = entry.id; // Use a unique identifier for the entry (e.g., entry.id)
          console.log(entry.id);
          // Check if the entry is already in favorites
          const index = favorites.findIndex(item => item.id === entryId);
          if (index > -1) {
            // Entry already exists in favorites, remove it
            favorites.splice(index, 1);
            buttonFavourite.textContent = "Add to favourite"; // Update button text
            // Show popup indicating removal from favorites
            alert("Removed from favorites");
          } else {
            // Entry doesn't exist in favorites, add it
            favorites.push(entry);
            buttonFavourite.textContent = "Added"; // Update button text
            // Show popup indicating addition to favorites
            alert("Added to favorites");
          }

          // Update the favorites array in localStorage
          localStorage.setItem('favorites', JSON.stringify(favorites));
        });


        console.log(card);
      }
    });
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Error:', error);
  });
