"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const signinUserController_1 = require("./signinUserController");
const signupUserController_1 = require("./signupUserController");
const forgotController_1 = require("./forgotController");
const companySignupController_1 = require("./companySignupController");
const logout_1 = require("./logout");
const signupGoogleController_1 = require("./signupGoogleController");
const companySigninController_1 = require("./companySigninController");
const adminSigninController_1 = require("./adminSigninController");
const companyForgotController_1 = require("./companyForgotController");
const tokenRefreshContoller_1 = require("./tokenRefreshContoller");
const controllers = (dependencies) => {
    return {
        signinUser: (0, signinUserController_1.signinUserController)(dependencies),
        signupUser: (0, signupUserController_1.signupUserController)(dependencies),
        forgot: (0, forgotController_1.forgotController)(dependencies),
        logout: (0, logout_1.logout)(),
        companySignup: (0, companySignupController_1.companySignupController)(dependencies),
        signupWithGoogle: (0, signupGoogleController_1.signupGoogleController)(dependencies),
        companySignin: (0, companySigninController_1.companySigninController)(dependencies),
        adminSignin: (0, adminSigninController_1.adminSigninController)(dependencies),
        companyForgot: (0, companyForgotController_1.companyForgotController)(dependencies),
        tokenRefresh: (0, tokenRefreshContoller_1.tokenRefreshController)(dependencies)
    };
};
exports.controllers = controllers;
