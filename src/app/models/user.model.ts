export class User {
  constructor(
    public _id:             string,
    public studentCode_CUI: string,
    public name:            string,
    public lastname:        string,
    public email:           string,
    public username:        string,
    public role:            string,
    public password:        string,
    public books:           string[],
    public magazines:       string[]
  ) { }
}