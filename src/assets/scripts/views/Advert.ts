///<reference path='../utils/TemplateFactory.ts'/>
///<reference path='../core/BaseView.ts'/>
///<reference path='../models/AdvertModel.ts'/>

module application {
    import TemplateFactory = utils.TemplateFactory;
    import BaseView = core.BaseView;

    export class Advert extends BaseView<AdvertModel> {
        constructor(private advertModel:AdvertModel) {
            super(advertModel);
        }

        render() {
            super.render($(TemplateFactory.create('templates/AdvertTemplate', this.advertModel.toJSON())));

            return this;
        }
    }
}
