

    function date_time() {
      date = new Date;
      year = date.getFullYear();
      month = date.getMonth();
      months = ['January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'December'];
      d = date.getDate();
      day = date.getDay();
      days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      h = date.getHours();
      if (h < 10) {
          h = "0" + h;
      }
      m = date.getMinutes();
      if (m < 10) {
          m = "0" + m;
      }
      s = date.getSeconds();
      if (s < 10) {
          s = "0" + s;
      }
      result = '' + days[day].substr(0, 3) + ' ' + months[month].substr(0, 3) + ' ' + d + '  ' + ' ' + h + ':' + m + ':' + s;
      document.getElementById('system_time').innerHTML = result;
      result = '' + days[day] + ', ' + months[month] + ' ' + d + ', ' + year;
      document.getElementById('system_date_line').innerHTML = result;
  }