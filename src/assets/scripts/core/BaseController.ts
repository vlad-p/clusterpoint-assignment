///<reference path='./BaseView.ts'/>
///<reference path='./BaseModel.ts'/>

module core {
    export class BaseController {
        protected view:BaseView<BaseModel>;

        getView() {
            return this.view;
        }

        removeView() {
            var remove = this.view.remove();
            this.view = null;
            return remove;
        }

        showView(...args) {
            throw new Error('This method is abstract and must be implemented in a corresponding subclass.');
        }

        getInstance() {
            throw new Error('This method is abstract and must be implemented in a corresponding subclass.');
        }
    }
}