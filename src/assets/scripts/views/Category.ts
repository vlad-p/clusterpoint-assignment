///<reference path='../utils/TemplateFactory.ts'/>
///<reference path='../core/BaseView.ts'/>
///<reference path='../models/CategoryModel.ts'/>

module application {
    import TemplateFactory = utils.TemplateFactory;
    import BaseView = core.BaseView;

    export class Category extends BaseView<CategoryModel> {
        constructor(private categoryModel:CategoryModel) {
            super(categoryModel);
        }

        render() {
            super.render($(TemplateFactory.create('templates/CategoryTemplate', this.categoryModel.toJSON())));

            return this;
        }
    }
}
