import CONSTANTS from '../../config/constants.config.js';
import NetworksUtils from '../../utils/networks.utils.js';
import CustomError from '../../custom/error.custom.js';
import DataUtils from '../../utils/data.utils.js';

export default class StoryboardModel {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
    * Get an existing storyboard.
    *
    * This function gets a storyboard Id and return the storyboard from the API.
    * @param {integer} id - The storyboard Id.
    * @return {Promise<object>}
    */
  static async getById(id) {
    // Send a request to the API to get the storyboard by the Id.
    const storyboard = await NetworksUtils.sendRequest({
      url: `${CONSTANTS.DATA.BASE_URL}${id}`,
      method: 'GET',
      isDevMode: false,
    });
    // Check if the storyboard exists.
    if (!storyboard || storyboard.status === 'Error') {
      const { error_message, error_description, error_code } = storyboard.errors[0];
      return new CustomError({ message: `${error_message}: ${error_description}`, status: error_code });
    }
    // Customize all the data to return the client as a merged list of key-value pairs.
    const { data } = storyboard;
    delete storyboard.data;
    const storyFields = Object.keys(storyboard).map((key) => ({
      key: DataUtils.setKey(key),
      label: key,
      value: storyboard[key],
      isData: false,
    }));
    const dataFields = data.map((field) => ({
      key: DataUtils.setKey(field.key),
      label: field.key,
      value: '',
      isData: true,
    }));
    return [...dataFields, ...storyFields];
  }

  /**
    * Generates a new video.
    *
    * This function gets all the key-value pairs data from the client, generates a new
    * video via the API, and return the relevant details.
    * @param {object} data - key-value pairs data from the client.
    * @return {Promise<object>}
    */
  static async create(data) {
    // ToDo: Check again if the storyboard exists.

    /* Collect the data from the client into 2 sources, one for the data fields
       and one for the tech fields. */
    const dataFields = [];
    const techFields = {};
    for (let i = 0; i < data.length; i += 1) {
      const { key, value, isData } = data[i];
      if (isData) {
        dataFields.push({ key, val: value });
      } else {
        techFields[key] = value;
      }
    }
    // Create the API request data to send the API.
    const requestData = {
      output: {
        video:
          [{
            video_type: 'hls', // ToDo: Load from the client.
            quality: 29,
            height: 720,
          }],
        jpg:
          [{
            time: 6,
            height: 720,
          },
          {
            time: 6,
            height: 180,
            suffix:
              'small',
          }],
      },
      data: dataFields,
      storyboard_id: techFields.storyboard_id,
    };
    // Send a request to the API to generate the video.
    const storyboardResult = await NetworksUtils.sendRequest({
      url: `${CONSTANTS.DATA.BASE_URL}generate`,
      method: 'POST',
      isDevMode: true,
      payload: requestData,
    });
    // Check if the video generator result.
    if (!storyboardResult || storyboardResult.status === 'Error') {
      const { error_message, error_description, error_code } = storyboardResult.errors[0];
      return new CustomError({ message: `${error_message}: ${error_description}`, status: error_code });
    }
    // Check that the video was created successfully.
    if (storyboardResult.status !== 'Success') {
      throw new CustomError({ message: 'Failed to generate the video' });
    }
    return {
      checkStatusURL: storyboardResult.check_status_url,
      videoURL: storyboardResult.output.video[0].links.url,
    };
  }
}
