export class Book {
  constructor(
    public _id:         string,
    public author:      string,
    public title:       string,
    public edition:     string,
    public keywords:    string[],
    public description: string,
    public themes:      string[],
    public copies:      number,
    public available:  number  
  ) { }
}