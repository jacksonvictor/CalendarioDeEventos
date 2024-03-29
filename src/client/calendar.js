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
  const modalNewEvent = new bootstrap.Modal(mdNewEvent)
  const btnLogout = document.getElementById("btnLogout")

  alertify.set('notifier', 'position', 'top-center')


  checkAccess()

  const loadCalendar = _ => fetch('http://localhost:3000/events/' + localStorage.getItem("id"))
    .then(response => response.json())

    .then(data => {
      const events = data.map(event => {
        return {
          id: event.ID,
          title: event.DESCRIPTION_EVENT,
          start: event.START_EVENT,
          end: event.END_EVENT,
          color: event.COLOR,
          id_user: event.ID_USER
        }
      })



      const calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'pt-br',
        themeSystem: 'bootstrap',
        bootstrapFontAwesome: false,
        navLinks: true,
        selectable: true,
        selectMirror: true,
        eventLimit: true,
        editable: true,
        dayMaxEvents: true,
        events: events,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        buttonicons: {
          prev: 'fa-angle-left',
          next: 'fa-chevron-right'
        },

        select: arg => {
          let today = new Date()
          today.setHours(0)
          today.setMinutes(0)
          today.setSeconds(0)
          today.setMilliseconds(0)

          const oneDayInMs = (24 * 60 * 60 * 1000)


          if (arg.start.getTime() < today) {
            alertify.warning('Não é possível criar um evento no passado!')
          } else {
            const dateEnd = arg.end
            const minutes = new Date().getMinutes().toString().length === 1 ? "0" + new Date().getMinutes() : new Date().getMinutes().toString()
            const endhours = (new Date().getHours() + 1).toString().length === 1 ? '0' + (new Date().getHours() + 1) : (new Date().getHours() + 1).toString()
            const starthours = (new Date().getHours()).toString().length === 1 ? '0' + new Date().getHours() : new Date().getHours().toString()

            const dateEndWithoutHours = new Date(dateEnd.setTime(dateEnd.getTime() - oneDayInMs)).toISOString().substr(0, 10)


            inputDescription.value = ""
            inputColor.value = "#0071c5"
            inputEnd.value = dateEndWithoutHours + `T${endhours === '24' ? '00' : endhours}:${minutes}`
            inputStart.value = arg.startStr + `T${starthours === '24' ? '00' : starthours}:${minutes}`
            modalNewEvent.show()

          }

        },
        eventClick: arg => {


          const start = arg.event.startStr
          const end = arg.event.endStr

          idDetail.value = arg.event.id
          descriptionDetail.textContent = arg.event.title
          startDetail.textContent = arg.event.start.toLocaleString()
          endDetail.textContent = arg.event.end.toLocaleString()
          editId.value = arg.event.id
          editDescription.value = arg.event.title
          editColor.value = arg.event.backgroundColor
          editStart.value = start.substr(0, start.length - 9)
          editEnd.value = end.substr(0, end.length - 9)

          modalDetails.show()
        },
        eventDrop: arg => {

          const start = arg.event.startStr.replace('T', ' ')
          const end = arg.event.endStr.replace('T', ' ')
          const event = {
            DESCRIPTION_EVENT: arg.event.title,
            COLOR: arg.event.color,
            START_EVENT: start.substr(0, start.length - 6),
            END_EVENT: end.substr(0, start.length - 6),
            ID_USER: localStorage.getItem("id")
          }

          
          if (new Date(event.START_EVENT).getTime() < new Date().getTime() || new Date(event.END_EVENT).getTime() < new Date().getTime()) {
            alertify.error('Não é possível criar um evento no passado!')
            loadCalendar()
          } else {

            request('POST', `http://localhost:3000/events/searchEvent/${event.ID_USER}`, event)
              .then(res => {
                if (res.status === 200) {
                  alertify.error('Você ja possui um evento nesse periodo!')
                  arg.event.setDates(arg.oldEvent.start, arg.oldEvent.end)
                } else {

                  request('PATCH', 'http://localhost:3000/events/' + arg.event.id, event)
                    .then(data => console.log(data))
                    .catch(error => console.error(error))

                }
              })
              .catch(error => console.error(error))
          }

        }
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

    let today = new Date()
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    today.setMilliseconds(0)

    if (event.DESCRIPTION_EVENT === "") {
      alertify.error('Coloque uma descrição para o evento!')

    } else if (new Date(event.START_EVENT).getTime() >= new Date(event.END_EVENT).getTime()) {
      alertify.error('A data final deve vir depois da data inicial!')
    } else if (new Date(event.START_EVENT).getTime() < today || new Date(event.END_EVENT).getTime() < today) {
      alertify.error('Não é possível criar um evento no passado!')
    } else {
      request('POST', `http://localhost:3000/events/searchEvent/${event.ID_USER}`, event)
        .then(res => {
          if (res.status === 200) {
            alertify.error('Você ja possui um evento nesse periodo!')
          } else {
            request('POST', 'http://localhost:3000/events', event)
              .then(dt => {
                alertify.success('Evento Cadastrado com Sucesso!')
                modalNewEvent.hide()
              })
              .catch(error => console.error(error))

          }
        })
        .catch(error => console.error(error))
    }

  })

  btnSaveEditEvent.addEventListener('click', _ => {
    const event = {
      ID: idDetail.value,
      DESCRIPTION_EVENT: editDescription.value,
      COLOR: editColor.value,
      START_EVENT: editStart.value + ':00',
      END_EVENT: editEnd.value + ':00',
      ID_USER: localStorage.getItem("id")
    }

    let today = new Date()
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    today.setMilliseconds(0)

    if (editDescription.value === "") {
      alertify.error('Coloque uma descrição para o evento!')

    } else if (new Date(event.START_EVENT).getTime() > new Date(event.END_EVENT).getTime()) {
      alertify.error('A data final deve vir depois da data inicial!')
    } else if (new Date(event.START_EVENT).getTime() < today || new Date(event.END_EVENT).getTime() < today) {
      alertify.error('Não é possível criar um evento no passado!')
    } else {
      request('POST', `http://localhost:3000/events/searchEventEdit/${event.ID_USER}`, event)
        .then(res => {

          if (res.status === 200) {
            alertify.error('Você ja possui um evento nesse periodo!')
          } else {


            request('PATCH', 'http://localhost:3000/events/' + editId.value, event)
              .then(data => console.log(data))
              .catch(error => console.error(error))

            alertify.success('Evento Alterado com Sucesso!')
            loadCalendar()
            modalDetails.hide()
            window.location.reload()

          }
        })
        .catch(error => console.error(error))
    }

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

    alertify.confirm("Confirmação", "Você tem certeza que quer apagar este evento?.",
      _ => {
        alertify.success('Evento Apagado com Sucesso!')
        modalDetails.hide()
      },
      _ => {
        modalDetails.show()
      })

    loadCalendar()

  })

  btnLogout.addEventListener('click', _ => {
    alertify.confirm('Confirmação', 'Você tem certeza que quer deslogar?.',
      _ => {
        localStorage.clear()
        window.location = "index.html"
      },
      _ => {})

  })


  mdDetails.addEventListener('hidden.bs.modal', _ => loadCalendar())
  mdDetails.addEventListener('show.bs.modal', _ => {
    const today = new Date().toISOString().substr(0, new Date().toISOString().length - 8)
    endDetail.min = today
    startDetail.min = today
  })

  mdNewEvent.addEventListener('hidden.bs.modal', _ => loadCalendar())
  mdNewEvent.addEventListener('show.bs.modal', _ => {
    const today = new Date().toISOString().substr(0, new Date().toISOString().length - 8)
    inputStart.min = today
    inputEnd.min = today

  })


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