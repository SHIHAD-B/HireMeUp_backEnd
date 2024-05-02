"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const signinUserController_1 = require("./signinUserController");
const signupUserController_1 = require("./signupUserController");
const forgotController_1 = require("./forgotController");
const companySignupController_1 = require("./companySignupController");
const logout_1 = require("./logout");
const controllers = (dependencies) => {
    return {
        signinUser: (0, signinUserController_1.signinUserController)(dependencies),
        signupUser: (0, signupUserController_1.signupUserController)(dependencies),
        forgot: (0, forgotController_1.forgotController)(dependencies),
        logout: (0, logout_1.logout)(),
        companySignup: (0, companySignupController_1.companySignupController)(dependencies)
    };
};
exports.controllers = controllers;
