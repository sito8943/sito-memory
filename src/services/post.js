import axios from "axios";
import { getAuth } from "../auth/auth";
import config from "../config";

export const ValidatePurchase = async (userName) => {
  try {
    const response = await axios.post(
      `${config.serverUrl}/api/purchase`,
      {
        user: userName,
      },
      { headers: getAuth }
    );
    const data = await response.data;
    if (data.error === undefined) return data;
    return { error: response.statusText };
  } catch (err) {
    return { error: String(err) };
  }
};

export const PurchaseCoins = async () => {
  try {
    const response = await axios.post(
      `${config.serverUrl}/api/buy-coins`,
      {},
      { headers: getAuth }
    );
    const data = await response.data;
    if (data.error === undefined) return data;
    return { error: response.statusText };
  } catch (err) {
    return { error: String(err) };
  }
};
