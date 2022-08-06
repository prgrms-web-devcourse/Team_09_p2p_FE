import Api from '~/service/core/Api';

class PlaceApi extends Api {
  private path = '/places';

  // sample
  // create = async (data:...) => {
  //   const response = await this.authInstance(`${this.path}`, data);
  //   ...
  // };
}

export default new PlaceApi();
