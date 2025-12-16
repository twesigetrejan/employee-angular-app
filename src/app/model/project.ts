
export class ProjectModel {
  "projectId": number;
  "projectName": string;
  "clientName": string;
  "startDate": Date;
  "leadByEmpId" : number;
  "contactPerson" : string;
  "contactNo": string;
  "emailId": string;
  "employeeName" : string;

  constructor(){
    this.projectId = 0;
    this.projectName = "";
    this.clientName = "";
    this.startDate = new Date();
    this.leadByEmpId = 0;
    this.contactPerson = "";
    this.contactNo = "";
    this.emailId = "";


  }
}
