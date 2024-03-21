"use strict"

//Obtener la info de la URL
fetch(`https://gist.githubusercontent.com/bertez/8e62741154903c35edb3bfb825a7f052/raw/b5cd5137fd168116cc71740f1fbb75819d0fa82e/zelda-timeline.json`)
    .then(resp => resp.json())
    .then (data => {

        //Ordenar los eventos por el año
        const sortedEvents=data.sort((a, b) => a.date - b.date);
        //console.log(sortedEvents)

        sortedEvents.forEach(event => {
            const timeline = document.getElementById(`timeline`);

            const eventElement = document.createElement(`div`);
            eventElement.classList.add(`event`);
            eventElement.innerHTML = `
            
            <div class="ev-date" > ${event.date}</div>
            <div class="event-info">
                <h2 class="class-h2">${event.title}</h2>
                <img class="class-image" src="${event.image}" alt ="Esto es una imagen de ${event.title}">
                <p>${event.text}</p>
            </div>    
            `
            timeline.appendChild(eventElement);
        })
    })
    .catch(error => console.error(`Error al obtener el JSON:`, error));
