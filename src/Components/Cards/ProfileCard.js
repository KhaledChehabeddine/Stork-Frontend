import React from 'react';
import { CCard, CCardBody, CCardTitle, CListGroup, CListGroupItem, CCardLink, CFormCheck, CForm, CFormTextarea, CFormLabel } from "@coreui/react";

const ProfileCard = ({ candidate }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div style={{ width: "40vw", padding: "32px", backgroundColor: "#ff5f5e"}}>
        <CCard align="center">
          <CCardBody align="center">
            <CCardTitle>{candidate.firstName + " " + candidate.lastName}</CCardTitle>
          </CCardBody>
          <CListGroup flush>
            <CListGroupItem><CCardLink href={"mailto:" + candidate.email}>{candidate.email}</CCardLink></CListGroupItem>
            <CListGroupItem><CCardLink href={"tel:" + candidate.phone.split(" ").join()}>{candidate.phone}</CCardLink></CListGroupItem>
          </CListGroup>
          <CCardBody>
            <CCardLink href='/api/v1/print/example.pdf' target='_blank' rel='noopener noreferrer'>{candidate.resume}</CCardLink>
          </CCardBody>
        </CCard>
      </div> 
  

      <div style={{ width: "60vw", paddingTop: "32px", paddingBottom: "32px", paddingLeft: "62px", paddingRight: "32px", 
                  maxHeight: "100vh", overflowY: "auto"}}>
        <CForm align="left" >
          <InterviewFields interviewIndex={1} />
          <InterviewFields interviewIndex={2} />
          <CFormCheck id="flexFinalDecision" label="Final Decision" />
            <CFormTextarea
              placeholder="Leave a final reply"
              id="final_feedback"
              style={{ marginBottom: "64px"}}
            />
        </CForm>
      </div>
    </div>
  );
};

const InterviewFields = ({interviewIndex}) => {
  const id1 = "floatingTextarea" + interviewIndex + "-1";
  const id2 = "floatingTextarea" + interviewIndex + "-2";
  return (
    <div style={{ marginBottom: '55px'}}>
      <CFormCheck id= {"flexInterview" + interviewIndex} label={"Interview " + interviewIndex} />
      <CFormLabel htmlFor={id1}>Feedback</CFormLabel>
      <CFormTextarea
        placeholder="Leave a feedback here"
        id={id1}
      />
      <CFormLabel htmlFor={id2}>Result</CFormLabel>
      <CFormTextarea
        placeholder="Leave a result here"
        id={id2}
      />
    </div>
  );
};

export default ProfileCard;
