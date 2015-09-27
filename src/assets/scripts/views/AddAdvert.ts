///<reference path='../utils/TemplateFactory.ts'/>
///<reference path='../core/BaseView.ts'/>
///<reference path='../collections/CategoryCollection.ts'/>
///<reference path='../models/CategoryModel.ts'/>
///<reference path='../models/AdvertModel.ts'/>

module application {
    import TemplateFactory = utils.TemplateFactory;
    import BaseView = core.BaseView;

    export class AddAdvert extends BaseView<any> {
        private $addAdvertCategoryInput:JQuery;
        private $addAdvertTitleInput:JQuery;
        private $addAdvertTextInput:JQuery;
        private $addAdvertPriceInput:JQuery;
        private $addAdvertMessage:JQuery;

        private advertModel = new AdvertModel();

        constructor(private categoryCollection:CategoryCollection) {
            super();

            this.listenTo(this.categoryCollection, 'sync', this.renderCategoryOptions.bind(this));
        }

        render() {
            super.render($(TemplateFactory.create('templates/AddAdvertTemplate', this.advertModel)));

            this.$addAdvertCategoryInput = this.$('.add-advert-category-input');
            this.$addAdvertTitleInput = this.$('.add-advert-title-input');
            this.$addAdvertTextInput = this.$('.add-advert-text-input');
            this.$addAdvertPriceInput = this.$('.add-advert-price-input');
            this.$addAdvertMessage = this.$('.add-advert-message');

            if (this.categoryCollection.length) {
                this.renderCategoryOptions();
            }

            return this;
        }

        private renderCategoryOptions() {
            this.$addAdvertCategoryInput = this.$('.add-advert-category-input');

            var options = '';
            this.categoryCollection.each((model:CategoryModel) => {
                options += '<option value="' + model.id + '">' + model.name + '</option>';
            });

            this.$addAdvertCategoryInput.html(options);
        }

        private addAdvert(e:JQueryEventObject) {
            e.preventDefault();

            this.advertModel.categoryId = this.$addAdvertCategoryInput.val();
            this.advertModel.categoryName = (<CategoryModel>this.categoryCollection.get(this.advertModel.categoryId)).name;
            this.advertModel.title = this.$addAdvertTitleInput.val();
            this.advertModel.text = this.$addAdvertTextInput.val();
            this.advertModel.price = this.$addAdvertPriceInput.val();

            this.advertModel.save().done(() => {
                this.render();
                this.$addAdvertMessage.show();

                setTimeout(() => {
                    this.$addAdvertMessage.hide();
                }, 15000);
            });
        }

        events() {
            return <any>{
                'submit': this.addAdvert
            };
        }
    }
}
