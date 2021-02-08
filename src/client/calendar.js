document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');
  const modalDetails = new bootstrap.Modal(document.getElementById('modalDetails'))
  const btnEditEvent = document.getElementById("btnEditEvent")
  const detailEvent = document.getElementById("detailEvent")
  const editEvent = document.getElementById("editEvent")
  const btnCancelEditEvent = document.getElementById("btnCancelEditEvent")
  const btnSaveEvent = document.getElementById("btnSaveEvent")
  const inputId = document.getElementById("inputId")
  const inputDescription = document.getElementById("inputDescription")
  const inputColor = document.getElementById("inputColor")
  const inputStart = document.getElementById("inputStart")
  const inputEnd = document.getElementById("inputEnd")
  const messageNewEvent = document.getElementById("messageNewEvent")

  let events = []
  fetch('http://localhost:8080/list-events')
    .then(response => response.json())
    .then(data => {
      events = data
    })
    .catch(error => console.error(error))

  checkAccess()



  console.log(events)

  const calendar = new FullCalendar.Calendar(calendarEl, {
    locale: 'pt-br',
    themeSystem: 'bootstrap',
    bootstrapFontAwesome: false,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    navLinks: true, // can click day/week names to navigate views
    selectable: true,
    selectMirror: true,
    eventLimit: true,
    select: function (arg) {
      const inputEnd = document.getElementById('inputEnd')
      const inputStart = document.getElementById('inputStart')
      const modalNewEvent = new bootstrap.Modal(document.getElementById('modalNewEvent'))


      inputEnd.value = arg.endStr + 'T00:00'
      inputStart.value = arg.startStr + 'T00:00'

      modalNewEvent.show()

    },
    eventClick: function (arg) {

      const descriptionDetail = document.getElementById('descriptionDetail')
      const startDetail = document.getElementById('startDetail')
      const endDetail = document.getElementById('endDetail')

      descriptionDetail.textContent = arg.event.title
      startDetail.textContent = arg.event.startStr
      endDetail.textContent = arg.event.endStr

      modalDetails.show()
    },
    editable: true,
    dayMaxEvents: true,
    events: events
  })
  calendar.render()



  btnEditEvent.addEventListener('click', _ => {
    detailEvent.style.display = "none";
    editEvent.style.display = "block";

  })



  btnCancelEditEvent.addEventListener('click', _ => {
    editEvent.style.display = "none";
    detailEvent.style.display = "block";
  })

  btnSaveEvent.addEventListener('click', () => {

    console.log(inputStart.value)
    const event = {
      DESCRIPTION_EVENT: inputDescription.value,
      COLOR: inputColor.value,
      START_EVENT: inputStart.value + ':00',
      END_EVENT: inputEnd.value + ':00',
      ID_USER: localStorage.getItem("id")
    }

    console.log(event)

    request('POST', 'http://localhost:8080/new-event', event)
      .then(data => console.log(data))
      .catch(error => console.error(error))
      messageNewEvent.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">Evento cadastrado com sucesso!<button type="button" class="close" data-dismiss="alert" aria-label="Close"></button></div>`

  })




})

function checkAccess() {
  if (!localStorage.getItem("id")) {
    window.location = "index.html"
  }

}

function request(method, url, data) {
  return fetch(url, {
      credentials: 'same-origin',
      method: method,
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    })
    .then(response => response.json())
}