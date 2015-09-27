module utils {
    export class TemplateFactory {
        public static TEMPLATES = JST;

        public static create(templatePath:string, data:Object = null):string {
            var templateFunction:Function = TemplateFactory.TEMPLATES[templatePath];

            return templateFunction(data);
        }
    }
}