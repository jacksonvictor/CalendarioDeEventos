document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');
  const mdDetails = document.getElementById("modalDetails")
  const modalDetails = new bootstrap.Modal(mdDetails)
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
  const editId = document.getElementById("editId")
  const editDescription = document.getElementById("editDescription")
  const editColor = document.getElementById("editColor")
  const editStart = document.getElementById("editStart")
  const editEnd = document.getElementById("editEnd")
  const idDetail = document.getElementById("idDetail")
  const descriptionDetail = document.getElementById("descriptionDetail")
  const startDetail = document.getElementById("startDetail")
  const endDetail = document.getElementById("endDetail")
  const btnSaveEditEvent = document.getElementById("btnSaveEditEvent")
  const mdNewEvent = document.getElementById("modalNewEvent")
  const btnDeleteEvent = document.getElementById("btnDeleteEvent")

  checkAccess()

  const loadCalendar = _ => fetch('http://localhost:3000/events/' + localStorage.getItem("id"))
    .then(response => response.json())

    .then(data => {
      const events = data.map(evento => {
        return {
          id: evento.ID,
          title: evento.DESCRIPTION_EVENT,
          start: evento.START_EVENT,
          end: evento.END_EVENT,
          color: evento.COLOR,
          id_user: evento.ID_USER
        }
      })



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
        select: arg => {

          modalNewEvent = new bootstrap.Modal(mdNewEvent)


          inputDescription.value = ""
          inputColor.value = "#0071c5"
          inputEnd.value = arg.endStr + 'T00:00'
          inputStart.value = arg.startStr + 'T00:00'

          modalNewEvent.show()

        },
        eventClick: arg => {


          const start = arg.event.startStr
          const end = arg.event.endStr

          idDetail.value = arg.event.id
          descriptionDetail.textContent = arg.event.title
          startDetail.textContent = arg.event.start.toLocaleString()
          endDetail.textContent = arg.event.end.toLocaleString()

          console.log("start " + start.substr(0, start.length - 9))

          editId.value = arg.event.id
          editDescription.value = arg.event.title
          editColor.value = arg.event.backgroundColor
          editStart.value = start.substr(0, start.length - 9)
          editEnd.value = end.substr(0, end.length - 9)

          modalDetails.show()
        },
        editable: true,
        dayMaxEvents: true,
        events: events
      })

      calendar.render()

    })

  loadCalendar()

  btnEditEvent.addEventListener('click', _ => {
    detailEvent.style.display = "none"
    editEvent.style.display = "block"
  })



  btnCancelEditEvent.addEventListener('click', _ => {
    editEvent.style.display = "none"
    detailEvent.style.display = "block"
  })

  btnSaveEvent.addEventListener('click', _ => {
    const event = {
      DESCRIPTION_EVENT: inputDescription.value,
      COLOR: inputColor.value,
      START_EVENT: inputStart.value + ':00',
      END_EVENT: inputEnd.value + ':00',
      ID_USER: localStorage.getItem("id")
    }


    request('POST', 'http://localhost:3000/events', event)
      .then(data => console.log(data))
      .catch(error => console.error(error))

    
    alertify.success('Evento Cadastrado com Sucesso!')
    modalNewEvent.hide()


  })

  btnSaveEditEvent.addEventListener('click', _ => {
    const event = {
      DESCRIPTION_EVENT: editDescription.value,
      COLOR: editColor.value,
      START_EVENT: editStart.value + ':00',
      END_EVENT: editEnd.value + ':00',
      ID_USER: localStorage.getItem("id")
    }

    request('PATCH', 'http://localhost:3000/events/' + editId.value, event)
      .then(data => console.log(data))
      .catch(error => console.error(error))

    alertify.success('Evento Alterado com Sucesso!')

    loadCalendar()

  })

  btnDeleteEvent.addEventListener('click', _ => {
    const event = {
      DESCRIPTION_EVENT: editDescription.value,
      COLOR: editColor.value,
      START_EVENT: editStart.value + ':00',
      END_EVENT: editEnd.value + ':00',
      ID_USER: localStorage.getItem("id")
    }

    request('DELETE', 'http://localhost:3000/events/' + editId.value, event)
      .then(data => console.log(data))
      .catch(error => console.error(error))

    alertify.confirm("Você tem certeza que quer apagar este evento?.",
      _ => {
        alertify.success('Evento Apagado com Sucesso!')
        modalDetails.hide()
      },
      _ => {
        modalDetails.show()
      })



    loadCalendar()

  })


  mdDetails.addEventListener('hidden.bs.modal', _ => loadCalendar())

  modalNewEvent.addEventListener('hidden.bs.modal', _ => loadCalendar())


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

})



function checkAccess() {
  if (!localStorage.getItem("id")) {
    window.location = "index.html"
  }

}