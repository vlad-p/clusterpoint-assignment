///<reference path='../core/BaseCollection.ts'/>
///<reference path='../models/AdvertModel.ts'/>

module application {
    import BaseCollection = core.BaseCollection;
    import Config = config.Config;

    export class AdvertCollection extends BaseCollection<AdvertModel> {
        url = Config.getServiceUrl('advert.list');

        get model() {
            return AdvertModel;
        }
    }
}