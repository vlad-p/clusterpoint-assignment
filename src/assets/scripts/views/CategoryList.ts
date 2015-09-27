///<reference path='../utils/TemplateFactory.ts'/>
///<reference path='../core/BaseView.ts'/>
///<reference path='../models/CategoryModel.ts'/>
///<reference path='../collections/CategoryCollection.ts'/>
///<reference path='../views/Category.ts'/>

module application {
    import TemplateFactory = utils.TemplateFactory;
    import BaseView = core.BaseView;

    export class CategoryList extends BaseView<CategoryModel> {
        constructor(public collection:CategoryCollection) {
            super();

            this.listenTo(this.collection, 'add', this.addCategory.bind(this));
        }

        render() {
            super.render($(TemplateFactory.create('templates/CategoryListTemplate')));

            this.collection.each(this.addCategory.bind(this));

            return this;
        }

        private addCategory(model:CategoryModel) {
            var category = new Category(model);
            this.$el.append(category.render().el);
        }
    }
}
