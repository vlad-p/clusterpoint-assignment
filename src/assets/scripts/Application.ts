///<reference path='./_declare/external.d.ts'/>
///<reference path='./_declare/backbone.d.ts'/>
///<reference path='./routing/Router.ts'/>

module application {
    export class Application {
        constructor() {
            new Router();
        }
    }
}