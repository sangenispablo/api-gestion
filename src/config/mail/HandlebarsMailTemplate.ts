import handlebars from "handlebars";

/*
  Cuando queremos pasar un grupo de variables pero no sabemos cuantas y como se llaman
  podemos usar esta forma para pasarlas
*/
export interface ITemplateVars {
  [key: string]: string | number;
}

export interface IParseMailTemplate {
  template: string,
  vars: ITemplateVars,
}

export class HandlebarsMailTemplate {
  public async parse({ template, vars }: IParseMailTemplate): Promise<string> {
    const parseTemplate = handlebars.compile(template);
    return parseTemplate(vars);
  }
}