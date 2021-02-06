

document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');
  
  checkAccess()

  const calendar = new FullCalendar.Calendar(calendarEl, {
    locale: 'pt-br',
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
      const modalDetails = new bootstrap.Modal(document.getElementById('modalDetails'))
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
  btnEditEvent.addEventListener('click',function(){
    document.getElementById("detailEvent").style.display = "none";
    document.getElementById("editEvent").style.display = "block";
  
  })

  const modalDetails = new bootstrap.Modal(document.getElementById('modalDetails'))
  const btnCancelEditEvent = document.getElementById("btnCancelEditEvent")
  btnCancelEditEvent.addEventListener('click',function(){
    
    document.getElementById("editEvent").style.display = "none";
    document.getElementById("detailEvent").style.display = "block";
    modalDetails.show()
  
  })

  

  calendar.render();


  function checkAccess(){
    const acesso = localStorage.getItem("acesso")=="true"
    console.log(acesso)
    if(!localStorage.getItem("acesso")){
      window.location.href = "index.html"
    }
  
  }

  
})



