

document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');
  const modalDetails = new bootstrap.Modal(document.getElementById('modalDetails'))
  
  checkAccess()

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

      inputEnd.value = arg.end.toLocaleString()
      inputStart.value = arg.start.toLocaleString()

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
    events: [{
      title: 'Evento',
      start: '2021-02-09'
    }]
  })


  const btnEditEvent = document.getElementById("btnEditEvent")
  const detailEvent = document.getElementById("detailEvent")
  const editEvent = document.getElementById("editEvent")
  btnEditEvent.addEventListener('click',function(){
    detailEvent.style.display = "none";
    editEvent.style.display = "block";
  
  })

  
  const btnCancelEditEvent = document.getElementById("btnCancelEditEvent")
  btnCancelEditEvent.addEventListener('click',function(){  
    editEvent.style.display = "none";
    detailEvent.style.display = "block";
  })

  

  calendar.render();


  function checkAccess(){
    const acesso = localStorage.getItem("acesso")=="true"
    console.log(acesso)
    if(!localStorage.getItem("acesso")){
      window.location = "index.html"
    }
  
  }

  
})



