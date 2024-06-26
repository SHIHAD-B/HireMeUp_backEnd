"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const controllers_1 = require("../../presentation/controllers");
const authRoutes = (dependencies) => {
    const { signinUser, signupUser, logout, forgot, companySignup, signupWithGoogle, companySignin, adminSignin, tokenRefresh, companyForgot } = (0, controllers_1.controllers)(dependencies);
    const router = (0, express_1.Router)();
    router.route('/signin').post(signinUser);
    router.route('/signup').post(signupUser);
    router.route('/logout').get(logout);
    router.route('/forgot').post(forgot);
    router.route('/signupwithgoogle').post(signupWithGoogle);
    router.route('/companysignup').post(companySignup);
    router.route('/companysignin').post(companySignin);
    router.route('/adminsignin').post(adminSignin);
    router.route('/companyforgot').post(companyForgot);
    router.route('/refreshToken').post(tokenRefresh);
    return router;
};
exports.authRoutes = authRoutes;
