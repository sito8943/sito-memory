import axios from "axios";
import { getAuth } from "../auth/auth";
import config from "../config";

/**
 *
 * @param {string} what data to fetch
 * @param {object} opts options
 * @returns data from server
 */
export const FetchFromServer = async (what, opts) => {
  let options = "";
  Object.keys(opts).forEach((item, i) => {
    options += `${item}=${opts[item]}`;
  });
  try {
    const response = await axios.get(
      `${config.serverUrl}/api/load/${what}?${options}`,
      {
        headers: getAuth,
      }
    );
    const data = await response.data;
    if (data.error === undefined) return data;
    return { error: response.statusText };
  } catch (err) {
    return { error: String(err) };
  }
};
