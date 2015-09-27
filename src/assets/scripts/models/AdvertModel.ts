///<reference path='../core/BaseModel.ts'/>
///<reference path='../collections/AdvertCollection.ts'/>

module application {
    import BaseModel = core.BaseModel;
    import Config = config.Config;
    import BaseCollection = core.BaseCollection;

    export class AdvertModel extends BaseModel {
        constructor(attributes?, options?) {
            super(attributes, options);
        }

        get collection() {
            return new AdvertCollection();
        }

        get title():string {
            return this.get('title');
        }

        get text():string {
            return this.get('text');
        }

        get price():number {
            return this.get('price');
        }

        get categoryId():number {
            return this.get('categoryId');
        }

        get categoryName():string {
            return this.get('categoryName');
        }

        set title(title:string) {
            this.set('title', title);
        }

        set text(text:string) {
            this.set('text', text);
        }

        set price(price:number) {
            this.set('price', price);
        }

        set categoryId(id:number) {
            this.set('categoryId', id);
        }

        set categoryName(name:string) {
            this.set('categoryName', name);
        }
    }
}