import { apiGet } from "../../utils/utils";
import { ROOT_API } from "../../config/config";
export function getImages(query) {
    return apiGet(ROOT_API+query);
  }