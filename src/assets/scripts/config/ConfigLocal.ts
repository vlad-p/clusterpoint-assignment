module config {
    export class Config {
        private static services = {
            'category.list': 'http://localhost/clusterpoint-assignment-backend/categories',
            'advert.list': 'http://localhost/clusterpoint-assignment-backend/adverts'
        };

        static getServiceUrl(service:string):string {
            return Config.services[service];
        }
    }
}