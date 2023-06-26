"use strict";

import XMLConnector from "./xmlConnector.js";
import Checker from "../checker/checker.js";
import {API, API_PARA} from "./api.js";

const xml = new XMLConnector();

const NetConnector = {
    get:xml.get,
    post:xml.post,
};

export default NetConnector;