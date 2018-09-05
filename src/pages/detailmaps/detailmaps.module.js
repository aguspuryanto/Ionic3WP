import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailmapsPage } from './detailmaps';
var DetailmapsPageModule = (function () {
    function DetailmapsPageModule() {
    }
    DetailmapsPageModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        DetailmapsPage,
                    ],
                    imports: [
                        IonicPageModule.forChild(DetailmapsPage),
                    ],
                },] },
    ];
    /** @nocollapse */
    DetailmapsPageModule.ctorParameters = function () { return []; };
    return DetailmapsPageModule;
}());
export { DetailmapsPageModule };
//# sourceMappingURL=detailmaps.module.js.map