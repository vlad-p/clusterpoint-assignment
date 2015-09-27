///<reference path='../core/BaseController.ts'/>
///<reference path='../models/AdvertModel.ts'/>
///<reference path='../views/AdvertDetails.ts'/>

module application {
    import BaseController = core.BaseController;

    export class AdvertController extends BaseController {
        private $container = $('.app');

        private static instance:AdvertController = null;

        showView(categoryId:string, advertId:string) {
            var model = new AdvertModel({id: advertId});

            model.fetch().done(() => {
                if (!this.view) {
                    this.view = new AdvertDetails(model);
                }
                this.$container.append(this.view.render().el);
            });
        }

        static getInstance():AdvertController {
            if(AdvertController.instance === null) {
                AdvertController.instance = new AdvertController();
            }
            return AdvertController.instance;
        }
    }
}