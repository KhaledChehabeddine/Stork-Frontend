import ApiClientBase from "./ApiClientBase";
import {getCurrentDate} from "../Components/Utils/utils";


class ApiClient extends ApiClientBase {
  /* Post method example
  PostExample(endpoint, arg1, arg2) {
    const data = new FormData();
    data.append('arg1', arg1); // the name 'arg1' should be the same name of the entity's attribute
    data.append('arg2', arg2);
    return this.Post(endpoint, data);
  }
    Get method example
  GetExample(endpoint, arg1, arg2) {
    const params = {};
    params.arg1 = arg1;
    params.arg2 = arg2;
    return this.Get(endpoint, params);
  }
   */
  authenticateUser(username, password) {
    return {
      data : {
        name: 'Ahmad Zaaroura',
        email: 'asz07@mail.aub.edu',
        id: 41
      }
    }
  }

  deleteEmployee(id) {
    const data = new FormData();
    data.append('id', id);
    return this.Post('/employee/delete', data);
  }

  getAllCandidates() {
    return this.Get('/candidate/all');
  }

  getCandidate(id) {
    const params = {};
    params.id = id;
    return this.Get('/candidate/find', params);
  }

  addCandidate(firstName, lastName, country, countryPhone, gender, email, phone, jobPosition, status) {
    const data = {};
    data.firstName = firstName;
    data.lastName = lastName;
    data.country = country;
    data.sex = gender;
    data.email = email;
    data.phone = '+' + countryPhone + phone;
    // data.jobPosition = jobPosition;
    data.status = status;
    data.date = getCurrentDate();
    return this.Post('/candidate/add', data);
  }

  addResume(id, resume) {
    const data = new FormData();
    data.append('id', id);
    data.append('resume', resume);
    return this.Post('/resume/add', data);
  }

  findResume(id) {
    const data = {};
    data.id = id;
    return this.Get('/resume/find', data);
  }

  deleteCandidate(id) {
    const data = new FormData();
    data.append('id', id);
    return this.Post('/candidate/delete', data);
  }

  addInterview(candidateId, vacancyId, dateTime, description) {
    const data = {};
    data.candidateId = candidateId;
    data.vacancyId = vacancyId;
    data.dateTime = dateTime;
    data.description = description;
    return this.Post('/interview/add', data);
  }

  addVacancy(jobTitle, country, city, workType, employmentType, notes) {
    const data = {};
    data.jobTitle = jobTitle;
    data.country = country;
    data.city = city;
    data.workType = workType;
    data.employmentType = employmentType;
    data.jobDescription = notes;
    data.datePosted = getCurrentDate();
    return this.Post('/vacancy/add', data);
  }

  getAllVacancies() {
    return this.Get('/vacancy/all');
  }

  addAction(title) {
    const data = {};
    data.title = title;
    data.date = getCurrentDate();
    return this.Post('/action/add', data);
  }

  getAction(id) {
    const params = {};
    params.id = id;
    return this.Get('/action/find', params);
  }

  getActionsByCandidateId(candidateId) {
    const params = {};
    params.candidateId = candidateId;
    return this.Get('/action/all', params);
  }

  getAllInterviews() {
    return this.Get('/interview/all');
  }

  updateStatus(candidate, status) {
    candidate.status = status;
    return this.Put('/candidate/update', candidate);
  }

  getInterviewsByCandidateId(candidateId) {
    const params = {};
    params.candidateId = candidateId;
    return this.Get('/interview/candidate', params);
  }

  getNumInterviewsPerCandidate(candidateId) {
    this.getInterviewsByCandidateId(candidateId)
      .then(response => {return response.data.length})
      .catch(error => console.log(error));
    return 0;
  }

  sendEmail(to, subject, body) {
    const emailjs = require('emailjs');
    const templateParams = {
      subject: subject,
      toEmail: to,
      body: body,
      fromName: window.localStorage.getItem('name')
    }
  }
}

export default ApiClient;
