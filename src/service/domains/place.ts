import Api from '~/service/core/Api';
import { PlaceFilter } from '~/types/place';
import { ObjectToQuery } from '~/utils/converter';

class PlaceApi extends Api {
  private path = '/places';

  // sample
  // create = async (data:...) => {
  //   const response = await this.authInstance(`${this.path}`, data);
  //   ...
  // };

  getPlaces = async (filter?: PlaceFilter) => {
    let queryString = '';
    if (filter !== undefined) {
      queryString = ObjectToQuery(filter);
    }

    const response = await this.authInstance.get(`${this.path}/${queryString}`);
    console.log(response.data, 'response Data');
    return response.data;
  };
}

export default new PlaceApi();
