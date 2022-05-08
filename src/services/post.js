import axios from "axios";
import { getAuth } from "../auth/auth";
import config from "../config";

export const ValidatePurchase = async (userName) => {
  try {
    const response = await axios.post(
      `${config.serverUrl}/api/purchase`,
      {
        user: userName,
        idApp: config.appName,
      },
      { headers: getAuth }
    );
  } catch (err) {
    return { error: String(err) };
  }
};
