"use strict";

import NetConnector from "./netConnector.js";

const xml = NetConnector;

const connector = {
    get:xml.get,
    post:xml.post,
    config:xml.config
};

export default connector;

