import React from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Calendar = (props) => {
  return (
    <FullCalendar events={props.events}
      plugins={[ dayGridPlugin ]}
      initialView="dayGridWeek"
    />
  );
};

export default Calendar;