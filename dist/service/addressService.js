"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
const addressModel_1 = require("../model/addressModel");
const validation_1 = require("../validation/validation");
const addressValidation_1 = require("../validation/addressValidation");
const contactService_1 = require("./contactService");
const database_1 = require("../application/database");
const responseError_1 = require("../error/responseError");
class AddressService {
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(addressValidation_1.AddressValidation.CREATE, request);
            yield contactService_1.ContactService.checkContactMustExists(user.username, request.contact_id);
            const address = yield database_1.prismaClient.address.create({
                data: createRequest
            });
            return (0, addressModel_1.toAddressResponse)(address);
        });
    }
    static checkAddressMustExists(contactId, addressId) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = yield database_1.prismaClient.address.findFirst({
                where: {
                    id: addressId,
                    contact_id: contactId
                }
            });
            if (!address) {
                throw new responseError_1.ResponseError(404, "Address is not found");
            }
            return address;
        });
    }
    static get(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const getRequest = validation_1.Validation.validate(addressValidation_1.AddressValidation.GET, request);
            yield contactService_1.ContactService.checkContactMustExists(user.username, request.contact_id);
            const address = yield this.checkAddressMustExists(getRequest.contact_id, getRequest.id);
            return (0, addressModel_1.toAddressResponse)(address);
        });
    }
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(addressValidation_1.AddressValidation.UPDATE, request);
            yield contactService_1.ContactService.checkContactMustExists(user.username, request.contact_id);
            yield this.checkAddressMustExists(updateRequest.contact_id, updateRequest.id);
            const address = yield database_1.prismaClient.address.update({
                where: {
                    id: updateRequest.id,
                    contact_id: updateRequest.contact_id
                },
                data: updateRequest
            });
            return (0, addressModel_1.toAddressResponse)(address);
        });
    }
    static remove(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const removeRequest = validation_1.Validation.validate(addressValidation_1.AddressValidation.GET, request);
            yield contactService_1.ContactService.checkContactMustExists(user.username, request.contact_id);
            yield this.checkAddressMustExists(removeRequest.contact_id, removeRequest.id);
            const address = yield database_1.prismaClient.address.delete({
                where: {
                    id: removeRequest.id
                }
            });
            return (0, addressModel_1.toAddressResponse)(address);
        });
    }
    static list(user, contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield contactService_1.ContactService.checkContactMustExists(user.username, contactId);
            const addresses = yield database_1.prismaClient.address.findMany({
                where: {
                    contact_id: contactId
                }
            });
            return addresses.map((address) => (0, addressModel_1.toAddressResponse)(address));
        });
    }
}
exports.AddressService = AddressService;
