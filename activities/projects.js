'use strict';
const api = require('./common/api');

module.exports = async function (activity) {
  try {
    const response = await api('/projects');

    if (Activity.isErrorResponse(response)) return;

    activity.Response.Data = convertProjects(response);
  } catch (error) {
    Activity.handleError(error);
  }
};

//**maps response data*/
function convertProjects(response) {
  let items = [];
  let data = response.body.data;

  for (let i = 0; i < data.length; i++) {
    let raw = data[i];
    let item = { id: raw.id, title: raw.name, description: raw.name, link: `https://app.asana.com/0/${raw.id}`, raw: raw }
    items.push(item);
  }

  return { items: items };
}
