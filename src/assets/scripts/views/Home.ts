///<reference path='../utils/TemplateFactory.ts'/>
///<reference path='../core/BaseView.ts'/>
///<reference path='../collections/CategoryCollection.ts'/>
///<reference path='../collections/AdvertCollection.ts'/>
///<reference path='../views/CategoryList.ts'/>
///<reference path='../views/AdvertList.ts'/>
///<reference path='../views/SearchPanel.ts'/>
///<reference path='../views/AddAdvert.ts'/>

module application {
    import TemplateFactory = utils.TemplateFactory;
    import BaseView = core.BaseView;
    import IInnerViewMap = core.IInnerViewMap;

    export class Home extends BaseView<any> {
        private $categories:JQuery;
        private $search:JQuery;
        private $searchResults:JQuery;
        private $addAdvert:JQuery;

        protected innerViews:IInnerViewMap = {
            categories: new CategoryList(this.categoryCollection),
            searchPanel: new SearchPanel(),
            addAdvertPanel: new AddAdvert(this.categoryCollection)
        };

        constructor(private categoryCollection:CategoryCollection) {
            super();

            this.listenTo(this.innerViews['searchPanel'], 'searchFinish', (searchResults:AdvertCollection) => {
                this.innerViews['searchResults'] = new AdvertList(searchResults);
                this.$searchResults
                    .html(this.innerViews['searchResults'].render().el)
                    .show();
                this.$categories.hide();
            });

            this.listenTo(this.innerViews['searchPanel'], 'searchClear', () => {
                this.$searchResults.empty().hide();
                this.$categories.show();
            });
        }

        render() {
            super.render($(TemplateFactory.create('templates/HomeTemplate')));

            this.$categories = this.$('.categories');
            this.$categories.html(this.innerViews['categories'].render().el);

            this.$search = this.$('.search');
            this.$search.html(this.innerViews['searchPanel'].render().el);

            this.$searchResults = this.$('.search-results');

            this.$addAdvert = this.$('.add-new');
            this.$addAdvert.html(this.innerViews['addAdvertPanel'].render().el);

            return this;
        }
    }
}
