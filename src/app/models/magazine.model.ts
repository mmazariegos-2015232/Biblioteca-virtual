export class Magazine {
 constructor(
    public _id:              string,
    public author:           string,
    public title:            string,
    public edition:          string,
    public description:      string,
    public currentFrequency: string,
    public exemplars:        string,
    public keywords:         string[],
    public themes:           string[],
    public copies:           number,
    public available:        number
 ) { }
  }