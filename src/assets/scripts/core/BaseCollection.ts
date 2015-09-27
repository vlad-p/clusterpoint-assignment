///<reference path='./BaseModel.ts'/>

module core {
    export class BaseCollection<T extends BaseModel> extends Backbone.Collection<T> {
        constructor(models?: T[], options?: any) {
            super(models, options);

            this.on('reset', (collection:BaseCollection<T>, options: {previousModels:Array<T>}) => {
                _.each(options.previousModels, (model:T) => {
                    model.trigger('remove');
                });
            });
        }
    }
}