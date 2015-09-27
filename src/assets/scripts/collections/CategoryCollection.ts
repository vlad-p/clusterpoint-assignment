///<reference path='../core/BaseCollection.ts'/>
///<reference path='../models/CategoryModel.ts'/>

module application {
    import BaseCollection = core.BaseCollection;
    import Config = config.Config;

    export class CategoryCollection extends BaseCollection<CategoryModel> {
        url = Config.getServiceUrl('category.list');

        get model() {
            return CategoryModel;
        }
    }
}