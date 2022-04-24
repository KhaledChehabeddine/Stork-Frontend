import React from "react";
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

const Calendar = (props) => {
  return (
    <FullCalendar events={props.events}
      plugins={[ dayGridPlugin ]}
      initialView="dayGridWeek"
    />
  );
};

// in order to be able to import in another file, ex. default no braces
export default Calendar;