"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const serve_static_1 = __importDefault(require("serve-static"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const signale_1 = require("signale");
const helmet_1 = __importDefault(require("helmet"));
const Swagger_1 = __importDefault(require("../Swagger"));
const IoC_1 = __importDefault(require("./IoC"));
const Forbidden_1 = require("./api/operation-result/http-status/Forbidden");
const User_1 = require("./domain/entities/User");
const TokenError_1 = require("./api/operation-result/http-status/TokenError");
const config_1 = __importDefault(require("../config"));
const bcrypt = __importStar(require("bcryptjs"));
const express_actuator_1 = __importDefault(require("express-actuator"));
const { url, serve, setup } = Swagger_1.default.Build();
class Startup {
    constructor() {
        IoC_1.default.ContainerRegister();
        this.Express = express_1.default();
        this.Logger();
        this.Router();
        this.Middlewares();
        this.Database();
        this.Server = routing_controllers_1.useExpressServer(this.Express, this.RoutingOptions);
    }
    Middlewares() {
        this.Express.use(express_1.default.json());
        this.Express.use(cors_1.default());
        this.Express.use(morgan_1.default(config_1.default.express.morganFormat));
        this.Express.use(body_parser_1.default.json({ limit: config_1.default.express.bodyParserLimit }));
        this.Express.use(body_parser_1.default.urlencoded({ limit: config_1.default.express.bodyParserLimit, extended: false }));
        this.Express.use(compression_1.default());
        this.Express.use(helmet_1.default());
        this.Express.use(cookie_parser_1.default());
        this.Express.use(config_1.default.express.staticRoute, serve_static_1.default(config_1.default.express.staticFolder));
        this.Express.use(config_1.default.express.faviconPath);
        this.Express.use(express_actuator_1.default(config_1.default.actuatorOptions));
        this.Express.use(url, serve, setup);
    }
    Logger() {
        let _signale = new signale_1.Signale(config_1.default.signale.object);
        _signale.config(config_1.default.signale.config);
        this.Log = _signale;
    }
    Router() {
        this.RoutingOptions = config_1.default.routingOptions(__dirname, this.Authorization);
    }
    async Database() {
        return await typeorm_1.createConnection();
    }
    async Authorization(action, roles) {
        const verifyUserToken = (action) => {
            const token = action.request.headers['authorization'].split('Bearer ')[1];
            const secret = config_1.default.express.secret;
            const decoded = jsonwebtoken_1.default.verify(token, secret, function (err, decoded) {
                if (err)
                    throw new TokenError_1.TokenError(err.name, [err.message]);
                return decoded;
            });
            return decoded;
        };
        const verifyUserRoles = async (data, roles) => {
            const user = await typeorm_1.getRepository(User_1.User)
                .createQueryBuilder()
                .select(['nickname', 'role'])
                .where('nickname = :nickname', { nickname: data.data.nickname })
                .execute();
            if (user.length === 0)
                throw new TokenError_1.TokenError('UserError', ['nickname not found for any users']);
            if (!roles.find((role) => bcrypt.compareSync(role, user[0].role) === true))
                throw new Forbidden_1.Forbidden([...roles.map((i) => `User without permission for role ${i}`)]);
            return true;
        };
        const token = verifyUserToken(action);
        const rolesIsValid = await verifyUserRoles(token, roles);
        return rolesIsValid;
    }
}
exports.default = new Startup();
//# sourceMappingURL=Startup.js.map