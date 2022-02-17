import ApiClientBase from "./ApiClientBase";

class ApiClient extends ApiClientBase {
  /* Post method example
  PostExample(endpoint, arg1, arg2) {
    const data = new FormData();
    data.append('arg1', arg1); // the name 'arg1' should be the same name of the entity's attribute
    data.append('arg2', arg2);
    return this.Post(endpoint, data);
  }
    Get method example
  GetExample(enpoint, arg1, arg2) {
    const params = {};
    params.arg1 = arg1;
    params.arg2 = arg2;
    return this.Get(endpoint, params);
  }
   */
  login(username, password) {
    const data = new FormData();
    data.append('username', username);
    data.append('password', password);
    return this.Post('/login', data);
  }

  getAllEmployees() {
    return this.Get('/employee/all');
  }

  getEmployee(id) {
    const data = new FormData();
    data.append('id', id);
    return this.Get('/employee/find', data);
  }

  addEmployee(endpoint, id, name, email, jobTitle, phone, imageUrl) {
    const data = new FormData();
    data.append('id', id);
    data.append('name', name);
    data.append('email', email);
    data.append('jobTitle', jobTitle);
    data.append('phone', phone);
    data.append('imageUrl', imageUrl);
    return this.Post('/employee' + endpoint, data);
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

  addCandidate(endpoint, name, email, phone, resume, imageUrl) {
    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('phone', phone);
    data.append('resume', resume);
    data.append('imageUrl', imageUrl);
    return this.Post('/candidate/add', data);
  }

  deleteCandidate(id) {
    const data = new FormData();
    data.append('id', id);
    return this.Post('/candidate/delete', data);
  }

  scheduleInterview(date, time, location, vacancyId, interviewers, candidateId) {
    const data = new FormData();
    data.append('date', date);
    data.append('time', time);
    data.append('location', location);
    data.append('vacancyId', vacancyId);
    data.append('interviewers', interviewers);
    data.append('candidateId', candidateId);
    return this.Post('/interview/schedule', data);
  }

}

export default ApiClient;
