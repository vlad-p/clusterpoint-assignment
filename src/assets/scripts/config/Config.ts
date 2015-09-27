module config {
    export class Config {
        private static services = {
            'category.list': 'http://clusterpoint-assignment.comli.com/categories',
            'advert.list': 'http://clusterpoint-assignment.comli.com/adverts'
        };

        static getServiceUrl(service:string):string {
            return Config.services[service];
        }
    }
}