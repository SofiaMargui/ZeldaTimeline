"use strict"

const timeline = document.querySelector('.timeline');
const line = document.querySelector('.line');
let sections;
let isFetchDone = false;
//Obtener la info de la URL
fetch(`https://gist.githubusercontent.com/bertez/8e62741154903c35edb3bfb825a7f052/raw/b5cd5137fd168116cc71740f1fbb75819d0fa82e/zelda-timeline.json`)
    .then(resp => resp.json())
    .then (data => {

        //Ordenar los eventos por el año
        const sortedEvents = data.sort((a, b) => a.date - b.date);
        //console.log(sortedEvents)
        sortedEvents.forEach(event => {
            const timeline = document.querySelector(`.line`);
            const eventElement = document.createElement(`div`);
            eventElement.classList.add(`section`);
            eventElement.innerHTML = `
            <div class="bead"></div>
            <div class="content">
                <h2> ${event.date}</h2>
                    <p class='title'>${event.title} </p></h2>
                <p>
                ${event.text}
                </p>
                <img src="${event.image}" alt ="Esto es una imagen de ${event.title}" class='game-img'>
            </div>
            `;
            timeline.appendChild(eventElement);
        })

        sections = document.querySelectorAll('.section');
        isFetchDone = true;

    })
    .catch(error => console.error(`Error al obtener el JSON:`, error));

    sections = document.querySelectorAll('.section');
    line.style.bottom = `calc(100% - 20px)`;
    let prevScrollY = window.scrollY;
    let up, down;
    let full = false;
    let set = 0;
    const targetY = window.innerHeight * 0.8;

    function scrollHandler(e){

        const{
            scrollY
        } = window;
        up = scrollY < prevScrollY;
        down = !up;
        const timelineRect = timeline.getBoundingClientRect();
        const lineRect = line.getBoundingClientRect(); //CONST LINEHEIGHT = lineRect.bottom - lineRect.top


        // Calculate the height of the timeline manually
        let timelineHeight = 0;
        sections.forEach(section => {
        timelineHeight += section.offsetHeight;
        });

        const dist = targetY - timelineRect.top
        console.log(dist);

        if (down && !full){
            set = Math.max(set, dist);
                line.style.bottom = `calc(100% - ${set}px)`
        }

        // Use the manually calculated height in the condition
        if (dist > timelineHeight + 50 && !full){
          console.log('full');
          full = true;
        }

        sections.forEach(item => {
            console.log(item);
            const rect = item.getBoundingClientRect();

            if(rect.top + item.offsetHeight / 5 < targetY) {
                item.classList.add('show-me')
            }
        });

        prevScrollY = window.scrollY;
    }

    line.style.display = 'block';
    window.addEventListener('scroll', () => {
      // Only execute the handler when the fetch is done
      if (isFetchDone) {
          scrollHandler();
      }
  });

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
