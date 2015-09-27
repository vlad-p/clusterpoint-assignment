///<reference path='../core/BaseController.ts'/>
///<reference path='../models/CategoryModel.ts'/>
///<reference path='../views/CategoryDetails.ts'/>

module application {
    import BaseController = core.BaseController;

    export class CategoryController extends BaseController {
        private $container = $('.app');

        private static instance:CategoryController = null;

        showView(categoryId:string) {
            var model = new CategoryModel({id: categoryId});

            model.fetch().done(() => {
                if (!this.view) {
                    this.view = new CategoryDetails(model);
                }
                this.$container.append(this.view.render().el);
            });
        }

        static getInstance():CategoryController {
            if(CategoryController.instance === null) {
                CategoryController.instance = new CategoryController();
            }
            return CategoryController.instance;
        }
    }
}