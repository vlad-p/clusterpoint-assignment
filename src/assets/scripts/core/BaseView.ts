///<reference path='./BaseModel.ts'/>

module core {
    export interface IInnerViewMap {
        [name:string]: BaseView<BaseModel>
    }

    export class BaseView<T extends BaseModel> extends Backbone.View<T> {
        protected innerViews:IInnerViewMap = {};

        remove() {
            _.each(this.innerViews, (view:BaseView<BaseModel>) => {
                view.remove();
            });

            return super.remove();
        }

        render($newEl?:JQuery) {
            if ($newEl) {
                var $oldEl = this.$el;
                this.setElement($newEl);
                $oldEl.replaceWith($newEl);
            }

            return super.render();
        }
    }
}