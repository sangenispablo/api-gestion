import handlebars from "handlebars";

interface ITemplateVars {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  template: string,
  vars: ITemplateVars,
}

class HandlebarsMailTemplate {
  public async parse({template, vars}: IParseMailTemplate): Promise<string> {
    const parseTemplate = handlebars.compile(template);
    return parseTemplate(vars);
  }
}

export default HandlebarsMailTemplate;