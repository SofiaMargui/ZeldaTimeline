"use strict"

const fetchEvents = async () => {
    const response = await fetch(`https://gist.githubusercontent.com/bertez/8e62741154903c35edb3bfb825a7f052/raw/b5cd5137fd168116cc71740f1fbb75819d0fa82e/zelda-timeline.json`);

    if(response.ok) {
        return await response.json();
    }else{
        throw new Error("No se pudieron obtener los datos");
    }
};

const showEvents = (events) => {
    const sortedEvents = events.sort((a, b) => a.date -b.date);

    const timeline= document.querySelector(`#div-timeline`);
    timeline.innerHTML = "" ;

    sortedEvents.forEach((event) => {
        const timeline = document.querySelector(`#div-timeline`);
        const eventElement = document.createElement(`div`);
        eventElement.classList.add(`event`);
        eventElement.innerHTML = `
            <div class="event-info">
                <h2 class="class-h2">${event.date}</h2>
                <h3 class="class-h3">${event.title}</h3>
                <p>${event.text}</p>
                <img class="class-image" src="${event.image}" alt ="Esto es una imagen de ${event.title}">
            </div>    
            `;

        timeline.appendChild(eventElement);       
        
        
    });
};

fetchEvents().then((events) => showEvents(events));

const form = document.getElementById("addGame");
form.onsubmit = async (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target).entries());
    event.target.reset();

    const events = await fetchEvents();
    events.push({...formData, date: parseInt(formData.date)});
    showEvents(events);
};
