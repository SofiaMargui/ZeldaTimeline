"use strict"

const fetchEvents = async () => {
    const response = await fetch(`https://gist.githubusercontent.com/bertez/8e62741154903c35edb3bfb825a7f052/raw/b5cd5137fd168116cc71740f1fbb75819d0fa82e/zelda-timeline.json`);

    if(response.ok) {
        return await response.json();
    }else{
        throw new Error("No se pudieron obtener los datos");
    }
};

const renderEvents = (events) => {
    const sortedEvents = events.sort((a, b) => a.date -b.date);

    const timeline= document.querySelector(`.timeline`);
    timeline.innerHTML = "";

    sortedEvents.forEach((event) => {
        const timeline = document.querySelector(`.timeline`);
        const eventElement = document.createElement(`section`);
        eventElement.classList.add(`event`);
        eventElement.innerHTML = `
            <div class= "event-info">
                <div class= "date">
                    <h2 class= "h2">${event.date}</h2>
                </div>
                <div class= "title">    
                    <h3 class= "h3">${event.title}</h3>
                </div>
                <div class= "text">    
                    <p class= "p" >${event.text}</p>
                </div>
                <div class= "image">
                    <img class="class-image" src="${event.image}" alt ="Esto es una imagen de ${event.title}">
                </div>    
            </div>     
            `;

        timeline.appendChild(eventElement);       
        
        
    });
};

fetchEvents().then((events) => renderEvents(events));

// Setup event listener
const form = document.getElementById(`addGame`);
form.onsubmit = async (event) => {
  event.preventDefault();
  const formData = Object.fromEntries(new FormData(event.target).entries());
  event.target.reset();

  const events = await fetchEvents();
  events.push({ ...formData, date: parseInt(formData.date) });
  renderEvents(events);
};

