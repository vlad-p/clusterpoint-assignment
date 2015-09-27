///<reference path='../core/BaseModel.ts'/>
///<reference path='../collections/CategoryCollection.ts'/>
///<reference path='../collections/AdvertCollection.ts'/>

module application {
    import BaseModel = core.BaseModel;
    import Config = config.Config;
    import BaseCollection = core.BaseCollection;

    export class CategoryModel extends BaseModel {
        constructor(attributes?, options?) {
            if (attributes && ! (attributes['adverts'] instanceof AdvertCollection)) {
                attributes['adverts'] = new AdvertCollection(attributes['adverts']);
            }

            super(attributes, options);
        }

        get collection() {
            return new CategoryCollection();
        }

        get name():string {
            return this.get('name');
        }

        get adverts():AdvertCollection {
            return this.get('adverts');
        }

        parse(response:any, options?:any):any {
            response['adverts'] = response['adverts'] ? new AdvertCollection(response['adverts']) : new AdvertCollection();
            return response;
        }
    }
}