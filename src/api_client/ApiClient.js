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
    const data = {};
    data.username = username;
    data.password = password;
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

  addEmployee(endpoint, id, firstName, lastName, email, jobTitle, phone, address, imageUrl) {
    const data = {};
    data.id = id;
    data.firstName = firstName;
    data.lastName = lastName;
    data.email = email;
    data.jobTitle = jobTitle;
    data.phone = phone;
    data.address = address;
    data.imageUrl = imageUrl;
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

  addCandidate(endpoint, firstName, lastName, email, phone, address, resume, imageUrl) {
    const data = {};
    data.firstName = firstName;
    data.lastName = lastName;
    data.email = email;
    data.phone = phone;
    data.address = address;
    data.resume = resume;
    data.imageUrl = imageUrl;
    let date = Date().toString().split(' ');
    data.date = date[3] + '/' + date[2] + ' at ' + date[4];
    return this.Post('/candidate/add', data);
  }

  deleteCandidate(id) {
    const data = new FormData();
    data.append('id', id);
    return this.Post('/candidate/delete', data);
  }

  scheduleInterview(date, time, location, vacancyId, interviewers, candidateId) {
    const data = {};
    data.date = date;
    data.time = time;
    data.location = location;
    data.vacancyId = vacancyId;
    data.interviewers = interviewers;
    data.candidateId = candidateId;
    return this.Post('/interview/schedule', data);
  }

  addVacancy(jobTitle, country, city, jobDescription) {
    const data = {};
    data.jobTitle = jobTitle;
    data.country = country;
    data.city = city;
    data.jobDescription = jobDescription;
    return this.Post('/vacancy/add', data);
  }

  getAllVacancies() {
    return this.Get('/vacancy/all');
  }

}

export default ApiClient;
