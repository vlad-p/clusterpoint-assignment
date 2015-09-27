///<reference path='../utils/TemplateFactory.ts'/>
///<reference path='../core/BaseView.ts'/>
///<reference path='../models/AdvertModel.ts'/>
///<reference path='../collections/AdvertCollection.ts'/>
///<reference path='../views/Advert.ts'/>

module application {
    import TemplateFactory = utils.TemplateFactory;
    import BaseView = core.BaseView;

    export class AdvertList extends BaseView<AdvertModel> {
        constructor(public collection:AdvertCollection) {
            super();

            this.listenTo(this.collection, 'add', this.addAdvert.bind(this));
        }

        render() {
            super.render($(TemplateFactory.create('templates/AdvertListTemplate')));

            this.collection.each(this.addAdvert.bind(this));

            return this;
        }

        private addAdvert(model:AdvertModel) {
            var advert = new Advert(model);
            this.$el.append(advert.render().el);
        }
    }
}
