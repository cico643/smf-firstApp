import buildExtender from "@smartface/extension-utils/lib/router/buildExtender";
import {
    NativeRouter as Router,
    NativeStackRouter as StackRouter,
    Route,
} from "@smartface/router";
import * as Pages from 'pages';
import "@smartface/extension-utils/lib/router/goBack"; // Implements onBackButtonPressed
import System from "@smartface/native/device/system";
import backClose from "@smartface/extension-utils/lib/router/back-close";
import Image from "@smartface/native/ui/image";
import Color from "@smartface/native/ui/color";
import Application from "@smartface/native/application";
import * as DataStore from "store/dataStore";
import { getPassenger } from "services/passenger";

//backClose.setDefaultBackStyle({image: Image.createFromFile("images://arrow_back.png"), hideTitle: true});

backClose.dissmissBuilder = () => {
    return {
        image: Image.createFromFile("images://window_close.png"),
        position: "left",
    };
};

const androidModalDismiss = (router, route) => {
    const { view, action } = route.getState();
    if (System.OS === "Android" && view && action === "POP") {
        view.onShow && view.onShow();
    }
};


const router = Router.of({
    path: "/",
    isRoot: true,
    routes: [
        StackRouter.of({
            path: "/pages",
            routes: [
                Route.of({
                    path: "/pages/page1",
                    build: buildExtender({ 
                        getPageClass: () => Pages.Page1, 
                        headerBarStyle: { visible: true } 
                    }),
                     routeDidEnter: androidModalDismiss
                }),
                Route.of({
                    path: "/pages/pageHome",
                    build: buildExtender({
                        getPageClass: () => Pages.PageHome,
                        headerBarStyle: { visible: true }
                    })
                }),
                Route.of({
                    path: "/pages/pageForgotPassword",
                    build: buildExtender({
                        getPageClass: () => Pages.PageForgotPassword,
                        headerBarStyle: { visible: true }
                    })
                }),
                Route.of({
                    path: "/pages/pageAirlineDetail",
                    build: buildExtender({
                        getPageClass: () => Pages.PageAirlineDetail,
                        headerBarStyle: { visible: true }
                    })
                }),
                StackRouter.of({
                    path: "/pages/auth",
                    modal: true,
                    routes: [
                        Route.of({
                            path: "/pages/auth/pageRegister",
                            build: buildExtender({
                                getPageClass: () => Pages.PageRegister,
                                headerBarStyle: { visible: true }
                            })
                        })
                    ]
                }),
                StackRouter.of({
                    path: "/pages/detail",
                    modal: true,
                    routes: [
                        Route.of({
                            path: "/pages/detail/pageAirlineDetail",
                            build: buildExtender({
                                getPageClass: () => Pages.PageAirlineDetail,
                                headerBarStyle: { visible: true }
                            })
                        })
                    ]
                }),
                StackRouter.of({
                    path: "/pages/settings",
                    to: "/pages/settings/pageSetting",
                    modal: true,
                    routes: [
                        Route.of({
                            path: "/pages/settings/pageSetting",
                            build: buildExtender({
                                getPageClass: () => Pages.PageSetting,
                                headerBarStyle: { visible: false }
                            })
                        })
                    ]
                })
            ]
        })
    ]
});

Application.onApplicationCallReceived = async (e) => {
    // @ts-ignore
    if (System.OS === System.OSType.ANDROID && e.url) {
      /* Your code goes here */

      // @ts-ignore
      let parsedUrl = e.url.split("/");

      // @ts-ignore
      let passengerId = parsedUrl[parsedUrl.length];
      if(DataStore.getIsLoggedIn()) {
        const response = await getPassenger(passengerId + 1);
        const data = Array.isArray(response.data[0].airline) ? response.data[0].airline[0] : response.data[0].airline;
        router.push("/pages/detail/pageAirlineDetail", { data });
      }
      else {
          const interval = setInterval( async () => {
            if(DataStore.getIsLoggedIn()) {
                const response = await getPassenger(passengerId + 1);
                const data = Array.isArray(response.data[0].airline) ? response.data[0].airline[0] : response.data[0].airline;
                router.push("/pages/detail/pageAirlineDetail", { data });
                clearInterval(interval);
            }
          }, 150);
      }

      
    }
}



/*
router.listen((location) => {
    console.log(`[ROUTER] location url: ${location.url}`);
});*/

export default router;
