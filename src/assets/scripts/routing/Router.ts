///<reference path='../controllers/HomeController.ts'/>
///<reference path='../controllers/CategoryController.ts'/>
///<reference path='../controllers/AdvertController.ts'/>

module application {
    export class Router extends Backbone.Router {
        private viewController;

        constructor() {
            this.routes = {
                '': this.showHome,
                'category/:categoryId': this.showCategory,
                'category/:categoryId/advert/:advertId': this.showAdvert
            };

            super();

            Backbone.history.start();
        }

        private showHome() {
            this.loadView(HomeController);
        }

        private showCategory(categoryId:string) {
            this.loadView(CategoryController, categoryId);
        }

        private showAdvert(categoryId:string, advertId:string) {
            this.loadView(AdvertController, categoryId, advertId);
        }

        private loadView(Controller, ...args) {
            if (this.viewController && !(this.viewController instanceof Controller)) {
                this.viewController.removeView();
            }

            this.viewController = Controller.getInstance();
            this.viewController.showView.apply(this.viewController, args);
        }
    }
}