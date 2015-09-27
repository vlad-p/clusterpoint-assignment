///<reference path='../utils/TemplateFactory.ts'/>
///<reference path='../core/BaseView.ts'/>
///<reference path='../models/CategoryModel.ts'/>
///<reference path='../views/AdvertList.ts'/>

module application {
    import TemplateFactory = utils.TemplateFactory;
    import BaseView = core.BaseView;
    import IInnerViewMap = core.IInnerViewMap;

    export class CategoryDetails extends BaseView<CategoryModel> {
        protected innerViews:IInnerViewMap = {
            adverts: new AdvertList(this.categoryModel.adverts)
        };

        private $adverts:JQuery;

        constructor(private categoryModel:CategoryModel) {
            super(categoryModel);
        }

        render() {
            super.render($(TemplateFactory.create('templates/CategoryDetailsTemplate', this.categoryModel.toJSON())));

            this.$adverts = this.$('.adverts');
            this.$adverts.html(this.innerViews['adverts'].render().el);

            return this;
        }
    }
}
