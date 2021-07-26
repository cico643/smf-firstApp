/* globals lang */
import "i18n/i18n"; // Generates global lang object
import Application from "@smartface/native/application";
import { errorStackBySourceMap } from "error-by-sourcemap";
import System from "@smartface/native/device/system";
import * as DataStore from "store/dataStore";


// Set uncaught exception handler, all exceptions that are not caught will
// trigger onUnhandledError callback.
Application.onUnhandledError = function (e: UnhandledError) {
    const error = errorStackBySourceMap(e);
    alert({
        title: e.type || lang.applicationError,
        message: System.OS === "Android" ? error.stack : (e.message + "\n\n*" + error.stack)
    });
};

import "theme";
import "@smartface/extension-utils";
import router from "routes";



Application.onApplicationCallReceived = e => {
    // @ts-ignore
    if (System.OS === System.OSType.ANDROID && e.url) {
      /* Your code goes here */
      
    }
}

router.push("/pages/page1");
