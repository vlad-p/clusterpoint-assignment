///<reference path='../core/BaseController.ts'/>
///<reference path='../views/Home.ts'/>
///<reference path='../collections/CategoryCollection.ts'/>

module application {
    import BaseController = core.BaseController;

    export class HomeController extends BaseController {
        private $container = $('.app');
        private categories = new CategoryCollection();

        private static instance:HomeController = null;

        showView() {
            this.view = new Home(this.categories);
            this.$container.append(this.view.render().el);
            this.categories.fetch();
        }

        static getInstance():HomeController {
            if(HomeController.instance === null) {
                HomeController.instance = new HomeController();
            }
            return HomeController.instance;
        }
    }
}