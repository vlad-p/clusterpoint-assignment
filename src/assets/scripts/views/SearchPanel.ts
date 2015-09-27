///<reference path='../utils/TemplateFactory.ts'/>
///<reference path='../core/BaseView.ts'/>
///<reference path='../collections/AdvertCollection.ts'/>

module application {
    import TemplateFactory = utils.TemplateFactory;
    import BaseView = core.BaseView;

    export class SearchPanel extends BaseView<any> {
        private searchTimeoutHandle = null;
        private searchResults = new AdvertCollection();

        private $searchInput:JQuery;

        render() {
            super.render($(TemplateFactory.create('templates/SearchPanelTemplate')));

            this.$searchInput = this.$('.search-panel-input');

            return this;
        }

        private performSearch(e:JQueryEventObject) {
            clearTimeout(this.searchTimeoutHandle);
            this.searchTimeoutHandle = setTimeout(() => {
                var query = (<HTMLInputElement>e.target).value;
                if (!query) {
                    this.clearSearch();
                } else if (query.length >= 3) {
                    this.searchResults.fetch({data: {query: query}}).done(() => {
                        this.trigger('searchFinish', this.searchResults);
                    });
                }
            }, 500);
        }

        private clearSearch() {
            this.$searchInput.val('');
            this.trigger('searchClear');
        }

        events() {
            return <any>{
                'keyup .search-panel-input': this.performSearch,
                'click .search-panel-clear': this.clearSearch
            };
        }
    }
}
