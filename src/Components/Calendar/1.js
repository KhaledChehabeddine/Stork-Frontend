import React from "react";
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventSettingsModel } from "@syncfusion/ej2-react-schedule";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";

const Calendar = ({ events }) => {
  // const localData = {
  //   dataSource: [{
  //     EndTime: new Date(2022, 0, 11, 6, 30),
  //     StartTime: new Date(2022, 0, 11, 4, 0),
  //     Subject: 'Testing'
  //   }]
  // };

  const remoteData = new DataManager({
    url: 'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData', 
    adaptor: new WebApiAdaptor,
    crossDomain: true
  });

  return <ScheduleComponent eventSettings={{ dataSource: remoteData }}>
    <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
  </ScheduleComponent>
};

// in order to be able to import in another file, ex. default no braces
export default Calendar;