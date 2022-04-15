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
        username: 'Ahmad Zaaroura',
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

  addCandidate(firstName, lastName, country, countryPhone, gender, email, phone, jobPosition) {
    const data = {};
    data.firstName = firstName;
    data.lastName = lastName;
    data.country = country;
    data.countryPhone = countryPhone;
    data.gender = gender;
    data.email = email;
    data.phone = phone;
    data.jobPosition = jobPosition;
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

  addInterview(candidate_id, vacancy_id, date_time, description) {
    const data = {};
    data.candidate_id = candidate_id;
    data.vacancy_id = vacancy_id;
    data.date_time = date_time;
    data.description = description;
    return this.Post('/interview/add', data);
  }

  addVacancy(jobTitle, country, city, jobDescription, deadline) {
    const data = {};
    data.jobTitle = jobTitle;
    data.country = country;
    data.city = city;
    data.jobDescription = jobDescription;
    data.datePosted = getCurrentDate();
    data.deadline = deadline
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

}

export default ApiClient;
