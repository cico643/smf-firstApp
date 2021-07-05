import buildExtender from "sf-extension-utils/lib/router/buildExtender";
import {
    NativeRouter as Router,
    NativeStackRouter as StackRouter,
    Route,
} from "@smartface/router";
import * as Pages from 'pages';
import "sf-extension-utils/lib/router/goBack"; // Implements onBackButtonPressed
import System from "sf-core/device/system";

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
                    path: "/pages/page2",
                    build: buildExtender({ 
                        getPageClass: () => Pages.Page2, 
                        headerBarStyle: { visible: true } 
                    })
                }),
                StackRouter.of({
                    path: "/pages",
                    modal: true,
                    routes: [
                        Route.of({
                            path: "/pages/pageRegister",
                            build: buildExtender({
                                getPageClass: () => Pages.PageRegister,
                                headerBarStyle: { visible: true }
                            })
                        })
                    ]
                }),
                Route.of({
                    path: "/pages/pageForgotPassword",
                    build: buildExtender({
                        getPageClass: () => Pages.PageForgotPassword,
                        headerBarStyle: { visible: true }
                    })
                })
            ]
        })
    ]
});

export default router;
