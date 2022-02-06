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
  getAllEmployees() {
    return this.Get('/employee/all');
  }

  findEmployee(id) {
    const params = {};
    params.id = id;
    return this.Get('/employee/find', params);
  }

  addEmployee(endpoint, id, name, email, jobTitle, phone, imageUrl) {
    const params = {};
    params.id = id;
    params.name = name;
    params.email = email;
    params.jobTitle = jobTitle;
    params.phone = phone;
    params.imageUrl = imageUrl;
    return this.Post('/employee' + endpoint, params);
  }

  deleteEmployee(id) {
    const params = {};
    params.id = id;
    return this.Post('/employee/delete', params);
  }

  /* -----------to be implemented--------------- */
  getAllApplicants() {

  }

  findApplicant() {

  }

  addApplicant(endpoint, name, email, phone, sex, imageUrl) {

  }

  deleteApplicant() {

  }
  /* ------------------------------------------- */

}

export default ApiClient;
