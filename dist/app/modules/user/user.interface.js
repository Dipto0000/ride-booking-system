"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverStatus = exports.AccountStatus = exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "Admin";
    Role["RIDER"] = "Rider";
    Role["DRIVER"] = "Driver";
})(Role || (exports.Role = Role = {}));
var AccountStatus;
(function (AccountStatus) {
    AccountStatus["ACTIVE"] = "Active";
    AccountStatus["BLOCKED"] = "Blocked";
})(AccountStatus || (exports.AccountStatus = AccountStatus = {}));
var DriverStatus;
(function (DriverStatus) {
    DriverStatus["PENDING"] = "Pending";
    DriverStatus["APPROVED"] = "Approved";
    DriverStatus["SUSPENDED"] = "Suspended";
})(DriverStatus || (exports.DriverStatus = DriverStatus = {}));
