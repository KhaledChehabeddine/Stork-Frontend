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

  getAllCandidates() {
    return this.Get('/candidate/all');
  }

  getCandidate(id) {
    const params = {};
    params.id = id;
    return this.Get('/candidate/find', params);
  }

  addCandidate(firstName, lastName, country, countryPhone, gender, email, phone, jobPositionId, managerId, status) {
    const data = {};
    data.firstName = firstName;
    data.lastName = lastName;
    data.country = country;
    data.sex = gender;
    data.email = email;
    data.phone = '+' + countryPhone + phone;
    data.jobPositionId = jobPositionId;
    data.managerId = managerId;
    data.status = status;
    data.date = getCurrentDate();
    return this.Post('/candidate/add', data);
  }

  getAllManagers() {
    return this.Get('/manager/all');
  }

  addManager(firstName, lastName, gender, countryPhone, phone, email) {
    const data = {};
    data.firstName = firstName;
    data.lastName = lastName;
    data.gender = gender;
    data.countryPhone = countryPhone
    data.phone = phone;
    data.email = email;
    return this.Post('/manager/add', data);
  }

  deleteManager(id) {
    const data = new FormData();
    data.append('id', id);
    return this.Post('/manager/delete', data);
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

  addInterview(candidateId, dateTime, description, jobPositionId, managerId) {
    const data = {};
    data.candidateId = candidateId;
    data.dateTime = dateTime;
    data.description = description;
    data.jobPositionId = jobPositionId;
    data.managerId = managerId;
    return this.Post('/interview/add', data);
  }

  addVacancy(jobTitle, startDate, country, city, workType, employmentType, notes) {
    const data = {};
    data.jobTitle = jobTitle;
    data.expectedStartDate = startDate;
    data.country = country;
    data.city = city;
    data.workType = workType;
    data.employmentType = employmentType;
    data.jobDescription = notes;
    data.datePosted = getCurrentDate();
    return this.Post('/vacancy/add', data);
  }

  findVacancy(id) {
    const data = {};
    data.id = id;
    return this.Get('/vacancy/find', data);
  }

  deleteVacancy(jobPositionId) {
    const data = new FormData();
    data.append('id', jobPositionId);
    return this.Post('/vacancy/delete', data);
  }

  getAllVacancies() {
    return this.Get('/vacancy/all');
  }

  addAction(title, candidateId) {
    const data = {};
    data.title = title;
    data.candidateId = candidateId;
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
    const params = {};
    params.candidateId = candidateId;
    return this.Get('/interview/candidate/num', params);
  }

  sendEmail(to, subject, body) {
    console.log('Body\n' + body);
    const emailjs = require('@emailjs/browser');

    emailjs.init(this.publicKey);

    const templateParams = {
      subject: subject,
      toEmail: to,
      body: body,
      fromName: window.localStorage.getItem('name')
    }

    emailjs.send(this.serviceId, this.templateId, templateParams)
      .then(response => {
        console.log("Success!", response.status, response.text);
      }, error => {
        console.log(error);
      });
  }

  getInterviewsByManagerId(managerId){
    const data = {};
    data.managerId = managerId;
    return this.Get('/interview/manager', data);
  }
}

export default ApiClient;
