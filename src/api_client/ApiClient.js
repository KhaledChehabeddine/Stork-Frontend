import ApiClientBase from "./ApiClientBase";
import {getCurrentDate, getPasswordHash} from "../Components/Utils/utils";


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
    const data = new FormData();
    data.append('username', username);
    data.append('passwordHash', getPasswordHash(password));
    return this.Post('/user/auth', data);
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

  deleteCandidatesByJobPositionId(jobPositionId) {
    const data = {};
    data.jobPositionId = jobPositionId;
    this.getCandidatesByJobPositionId(jobPositionId)
      .then(response => {
        if (response.status === 200) {
          for (let i = 0; i < response.data.length; ++i) {
            this.deleteCandidate(response.data[i].id)
              .then(response => console.log(response));
          }
        }
      }).catch(error => console.log(error));
    return this.Post('/candidate/delete/all/job', data);
  }

  getCandidatesByJobPositionId(jobPositionId) {
    const data = {};
    data.jobPositionId = jobPositionId;
    return this.Get('/candidate/all/jobPosition', data);
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
    this.deleteFeedbackByManagerId(id);
    this.deleteInterviewsByManagerId(id);
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
    this.deleteInterviewsByCandidateId(id);
    this.deleteFeedbackByCandidateId(id);
    this.deleteActionsByCandidateId(id);
    this.deleteResumeByCandidateId(id);
    return this.Post('/candidate/delete', data);
  }

  addInterview(candidateId, dateTime, description, jobPositionId, managerId) {
    const data = {};
    data.candidateId = candidateId;
    data.dateTime = dateTime;
    data.description = description;
    data.vacancyId = jobPositionId;
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
    this.deleteCandidatesByJobPositionId(jobPositionId);
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

  deleteActionsByCandidateId(candidateId) {
    const data = {};
    data.candidateId = candidateId;
    return this.Post('/action/delete/all', data);
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

  addFeedback(candidateId, notes) {
    const data = {};
    data.candidateID = candidateId;
    data.notes = notes;
    return this.Post('/feedback/add', data);
  }

  deleteFeedback(id) {
    const data = {};
    data.id = id;
    return this.Post('/feedback/delete', data);
  }

  deleteFeedbackByCandidateId(candidateId) {
    const data = {};
    data.candidateId = candidateId;
    return this.Post('/feedback/delete/all/candidate', data);
  }

  deleteFeedbackByManagerId(managerId) {
    const data = {};
    data.managerId = managerId;
    return this.Post('/feedback/delete/all/manager', data);
  }

  deleteInterviewsByCandidateId(candidateId) {
    const data = {};
    data.candidateId = candidateId;
    return this.Post('/interview/candidate/delete', data);
  }

  deleteInterviewsByManagerId(managerId) {
    const data = {};
    data.managerId = managerId;
    return this.Post('/interview/manager/delete', data);
  }

  deleteResumeByCandidateId(candidateId) {
    const data = {};
    data.candidateId = candidateId;
    return this.Post('/resume/delete/candidate', data);
  }

  deleteResume(id) {
    const data = {};
    data.id = id;
    return this.Post('/resume/delete', data);
  }

  updateJobPosition(jobPosition) {
    return this.Put('/vacancy/update', jobPosition);
  }

  updateCandidate(candidate) {
    return this.Put('/candidate/update', candidate);
  }

  getInterviewsByManagerId(managerId) {
    const data = {};
    data.managerId = managerId;
    return this.Get('/interview/manager', data);
  }

  getFeedbacksByCandidateId(candidateId) {
    const data = {};
    data.candidateId = candidateId;
    return this.Get('/feedback/all/candidate', data);
  }

  getManager(managerId) {
    const data = {};
    data.id = managerId;
    return this.Get('/manager/find', data);
  }
}

export default ApiClient;
