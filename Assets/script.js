// ensures that the code isn't run until the browser has finished rendering all the elements in the html.
$(document).ready(function() {
  
  // Displays the current date & Time in the header of the page
  function updateTime() {
    const currentDate = dayjs().format('MMM D, YYYY (hh:mm:ss)')
    $('#currentDay').html(currentDate);
  }

  //Background colors change based on hour in the day. Past hours, present hours, and future hours.
  function scheduleColorChange () {
    const currentHour = dayjs().hour()
    for (let i=9; i<= 17; i++) {
      if (i < currentHour) {
        $(`textarea[data-hour="${i}"]`).addClass('past');
      } else if (i === currentHour) {
        $(`textarea[data-hour="${i}"]`).addClass('present');
      } else {
        $(`textarea[data-hour="${i}"]`).addClass('future');
      }
    }
  }

$(document).on('click', '.saveBtn', function() {
  const taskData = $(this).siblings('.description').val();
  const hour = $(this).siblings('.hour').text();

  localStorage.setItem(hour, taskData);
});

// Function to load saved tasks from local storage
function loadTasks() {
  $('.description').each(function() {
      const hour = parseInt($(this).attr('data-hour'));
      const savedTask = localStorage.getItem(hour);
      if (savedTask) {
          $(this).val(savedTask);
      }
  });
}

  //call functions when page is rendered
  scheduleColorChange() //calls color change function
  setInterval(updateTime, 1000);//Constantly updates time on page
  loadTasks(); // Load saved tasks from local storage when the page loads
});
