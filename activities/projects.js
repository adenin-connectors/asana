'use strict';
const api = require('./common/api');

module.exports = async function (activity) {
  try {
    api.initialize(activity);
    const response = await api('/projects');

    if ($.isErrorResponse(activity,response)) return;

    activity.Response.Data = convertProjects(response);
  } catch (error) {
    $.handleError(activity,error);
  }
};

//**maps response data*/
function convertProjects(response) {
  let items = [];
  let data = response.body.data;

  for (let i = 0; i < data.length; i++) {
    let raw = data[i];
    let item = {
      id: raw.id,
      title: raw.name,
      description: raw.name,
      link: `https://app.asana.com/0/${raw.id}`,
      raw: raw
    };
    items.push(item);
  }

  return { items: items };
}
