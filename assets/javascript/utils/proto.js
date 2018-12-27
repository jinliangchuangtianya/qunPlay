/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.pb = (function() {

    /**
     * Namespace pb.
     * @exports pb
     * @namespace
     */
    var pb = {};

    pb.Ping = (function() {

        /**
         * Properties of a Ping.
         * @memberof pb
         * @interface IPing
         * @property {boolean|null} [pong] Ping pong
         */

        /**
         * Constructs a new Ping.
         * @memberof pb
         * @classdesc Represents a Ping.
         * @implements IPing
         * @constructor
         * @param {pb.IPing=} [properties] Properties to set
         */
        function Ping(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Ping pong.
         * @member {boolean} pong
         * @memberof pb.Ping
         * @instance
         */
        Ping.prototype.pong = false;

        /**
         * Creates a new Ping instance using the specified properties.
         * @function create
         * @memberof pb.Ping
         * @static
         * @param {pb.IPing=} [properties] Properties to set
         * @returns {pb.Ping} Ping instance
         */
        Ping.create = function create(properties) {
            return new Ping(properties);
        };

        /**
         * Encodes the specified Ping message. Does not implicitly {@link pb.Ping.verify|verify} messages.
         * @function encode
         * @memberof pb.Ping
         * @static
         * @param {pb.IPing} message Ping message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Ping.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.pong != null && message.hasOwnProperty("pong"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.pong);
            return writer;
        };

        /**
         * Encodes the specified Ping message, length delimited. Does not implicitly {@link pb.Ping.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Ping
         * @static
         * @param {pb.IPing} message Ping message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Ping.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Ping message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Ping
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Ping} Ping
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Ping.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.Ping();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.pong = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Ping message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Ping
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Ping} Ping
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Ping.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Ping message.
         * @function verify
         * @memberof pb.Ping
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Ping.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.pong != null && message.hasOwnProperty("pong"))
                if (typeof message.pong !== "boolean")
                    return "pong: boolean expected";
            return null;
        };

        /**
         * Creates a Ping message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Ping
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Ping} Ping
         */
        Ping.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.Ping)
                return object;
            var message = new $root.pb.Ping();
            if (object.pong != null)
                message.pong = Boolean(object.pong);
            return message;
        };

        /**
         * Creates a plain object from a Ping message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Ping
         * @static
         * @param {pb.Ping} message Ping
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Ping.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.pong = false;
            if (message.pong != null && message.hasOwnProperty("pong"))
                object.pong = message.pong;
            return object;
        };

        /**
         * Converts this Ping to JSON.
         * @function toJSON
         * @memberof pb.Ping
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Ping.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Ping;
    })();

    pb.Login = (function() {

        /**
         * Properties of a Login.
         * @memberof pb
         * @interface ILogin
         * @property {pb.IReqLogin|null} [reqLogin] Login reqLogin
         * @property {pb.IRspLogin|null} [rspLogin] Login rspLogin
         */

        /**
         * Constructs a new Login.
         * @memberof pb
         * @classdesc Represents a Login.
         * @implements ILogin
         * @constructor
         * @param {pb.ILogin=} [properties] Properties to set
         */
        function Login(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Login reqLogin.
         * @member {pb.IReqLogin|null|undefined} reqLogin
         * @memberof pb.Login
         * @instance
         */
        Login.prototype.reqLogin = null;

        /**
         * Login rspLogin.
         * @member {pb.IRspLogin|null|undefined} rspLogin
         * @memberof pb.Login
         * @instance
         */
        Login.prototype.rspLogin = null;

        /**
         * Creates a new Login instance using the specified properties.
         * @function create
         * @memberof pb.Login
         * @static
         * @param {pb.ILogin=} [properties] Properties to set
         * @returns {pb.Login} Login instance
         */
        Login.create = function create(properties) {
            return new Login(properties);
        };

        /**
         * Encodes the specified Login message. Does not implicitly {@link pb.Login.verify|verify} messages.
         * @function encode
         * @memberof pb.Login
         * @static
         * @param {pb.ILogin} message Login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Login.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.reqLogin != null && message.hasOwnProperty("reqLogin"))
                $root.pb.ReqLogin.encode(message.reqLogin, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.rspLogin != null && message.hasOwnProperty("rspLogin"))
                $root.pb.RspLogin.encode(message.rspLogin, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Login message, length delimited. Does not implicitly {@link pb.Login.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Login
         * @static
         * @param {pb.ILogin} message Login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Login.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Login message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Login} Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Login.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.Login();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.reqLogin = $root.pb.ReqLogin.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.rspLogin = $root.pb.RspLogin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Login message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Login} Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Login.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Login message.
         * @function verify
         * @memberof pb.Login
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Login.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.reqLogin != null && message.hasOwnProperty("reqLogin")) {
                var error = $root.pb.ReqLogin.verify(message.reqLogin);
                if (error)
                    return "reqLogin." + error;
            }
            if (message.rspLogin != null && message.hasOwnProperty("rspLogin")) {
                var error = $root.pb.RspLogin.verify(message.rspLogin);
                if (error)
                    return "rspLogin." + error;
            }
            return null;
        };

        /**
         * Creates a Login message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Login
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Login} Login
         */
        Login.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.Login)
                return object;
            var message = new $root.pb.Login();
            if (object.reqLogin != null) {
                if (typeof object.reqLogin !== "object")
                    throw TypeError(".pb.Login.reqLogin: object expected");
                message.reqLogin = $root.pb.ReqLogin.fromObject(object.reqLogin);
            }
            if (object.rspLogin != null) {
                if (typeof object.rspLogin !== "object")
                    throw TypeError(".pb.Login.rspLogin: object expected");
                message.rspLogin = $root.pb.RspLogin.fromObject(object.rspLogin);
            }
            return message;
        };

        /**
         * Creates a plain object from a Login message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Login
         * @static
         * @param {pb.Login} message Login
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Login.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.reqLogin = null;
                object.rspLogin = null;
            }
            if (message.reqLogin != null && message.hasOwnProperty("reqLogin"))
                object.reqLogin = $root.pb.ReqLogin.toObject(message.reqLogin, options);
            if (message.rspLogin != null && message.hasOwnProperty("rspLogin"))
                object.rspLogin = $root.pb.RspLogin.toObject(message.rspLogin, options);
            return object;
        };

        /**
         * Converts this Login to JSON.
         * @function toJSON
         * @memberof pb.Login
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Login.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Login;
    })();

    pb.ReqLogin = (function() {

        /**
         * Properties of a ReqLogin.
         * @memberof pb
         * @interface IReqLogin
         * @property {string|null} [openid] ReqLogin openid
         * @property {string|null} [code] ReqLogin code
         * @property {string|null} [nickname] ReqLogin nickname
         * @property {number|null} [sex] ReqLogin sex
         * @property {string|null} [headhash] ReqLogin headhash
         */

        /**
         * Constructs a new ReqLogin.
         * @memberof pb
         * @classdesc Represents a ReqLogin.
         * @implements IReqLogin
         * @constructor
         * @param {pb.IReqLogin=} [properties] Properties to set
         */
        function ReqLogin(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReqLogin openid.
         * @member {string} openid
         * @memberof pb.ReqLogin
         * @instance
         */
        ReqLogin.prototype.openid = "";

        /**
         * ReqLogin code.
         * @member {string} code
         * @memberof pb.ReqLogin
         * @instance
         */
        ReqLogin.prototype.code = "";

        /**
         * ReqLogin nickname.
         * @member {string} nickname
         * @memberof pb.ReqLogin
         * @instance
         */
        ReqLogin.prototype.nickname = "";

        /**
         * ReqLogin sex.
         * @member {number} sex
         * @memberof pb.ReqLogin
         * @instance
         */
        ReqLogin.prototype.sex = 0;

        /**
         * ReqLogin headhash.
         * @member {string} headhash
         * @memberof pb.ReqLogin
         * @instance
         */
        ReqLogin.prototype.headhash = "";

        /**
         * Creates a new ReqLogin instance using the specified properties.
         * @function create
         * @memberof pb.ReqLogin
         * @static
         * @param {pb.IReqLogin=} [properties] Properties to set
         * @returns {pb.ReqLogin} ReqLogin instance
         */
        ReqLogin.create = function create(properties) {
            return new ReqLogin(properties);
        };

        /**
         * Encodes the specified ReqLogin message. Does not implicitly {@link pb.ReqLogin.verify|verify} messages.
         * @function encode
         * @memberof pb.ReqLogin
         * @static
         * @param {pb.IReqLogin} message ReqLogin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqLogin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.openid != null && message.hasOwnProperty("openid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openid);
            if (message.code != null && message.hasOwnProperty("code"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.code);
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.nickname);
            if (message.sex != null && message.hasOwnProperty("sex"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.sex);
            if (message.headhash != null && message.hasOwnProperty("headhash"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.headhash);
            return writer;
        };

        /**
         * Encodes the specified ReqLogin message, length delimited. Does not implicitly {@link pb.ReqLogin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.ReqLogin
         * @static
         * @param {pb.IReqLogin} message ReqLogin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqLogin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReqLogin message from the specified reader or buffer.
         * @function decode
         * @memberof pb.ReqLogin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.ReqLogin} ReqLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqLogin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.ReqLogin();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.openid = reader.string();
                    break;
                case 2:
                    message.code = reader.string();
                    break;
                case 3:
                    message.nickname = reader.string();
                    break;
                case 4:
                    message.sex = reader.int32();
                    break;
                case 5:
                    message.headhash = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ReqLogin message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.ReqLogin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.ReqLogin} ReqLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqLogin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReqLogin message.
         * @function verify
         * @memberof pb.ReqLogin
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReqLogin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.openid != null && message.hasOwnProperty("openid"))
                if (!$util.isString(message.openid))
                    return "openid: string expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isString(message.code))
                    return "code: string expected";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            if (message.sex != null && message.hasOwnProperty("sex"))
                if (!$util.isInteger(message.sex))
                    return "sex: integer expected";
            if (message.headhash != null && message.hasOwnProperty("headhash"))
                if (!$util.isString(message.headhash))
                    return "headhash: string expected";
            return null;
        };

        /**
         * Creates a ReqLogin message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.ReqLogin
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.ReqLogin} ReqLogin
         */
        ReqLogin.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.ReqLogin)
                return object;
            var message = new $root.pb.ReqLogin();
            if (object.openid != null)
                message.openid = String(object.openid);
            if (object.code != null)
                message.code = String(object.code);
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            if (object.sex != null)
                message.sex = object.sex | 0;
            if (object.headhash != null)
                message.headhash = String(object.headhash);
            return message;
        };

        /**
         * Creates a plain object from a ReqLogin message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.ReqLogin
         * @static
         * @param {pb.ReqLogin} message ReqLogin
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReqLogin.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.openid = "";
                object.code = "";
                object.nickname = "";
                object.sex = 0;
                object.headhash = "";
            }
            if (message.openid != null && message.hasOwnProperty("openid"))
                object.openid = message.openid;
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            if (message.sex != null && message.hasOwnProperty("sex"))
                object.sex = message.sex;
            if (message.headhash != null && message.hasOwnProperty("headhash"))
                object.headhash = message.headhash;
            return object;
        };

        /**
         * Converts this ReqLogin to JSON.
         * @function toJSON
         * @memberof pb.ReqLogin
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReqLogin.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ReqLogin;
    })();

    pb.RspLogin = (function() {

        /**
         * Properties of a RspLogin.
         * @memberof pb
         * @interface IRspLogin
         * @property {number|null} [code] RspLogin code
         * @property {string|null} [msg] RspLogin msg
         * @property {pb.IUserInfo|null} [user] RspLogin user
         */

        /**
         * Constructs a new RspLogin.
         * @memberof pb
         * @classdesc Represents a RspLogin.
         * @implements IRspLogin
         * @constructor
         * @param {pb.IRspLogin=} [properties] Properties to set
         */
        function RspLogin(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RspLogin code.
         * @member {number} code
         * @memberof pb.RspLogin
         * @instance
         */
        RspLogin.prototype.code = 0;

        /**
         * RspLogin msg.
         * @member {string} msg
         * @memberof pb.RspLogin
         * @instance
         */
        RspLogin.prototype.msg = "";

        /**
         * RspLogin user.
         * @member {pb.IUserInfo|null|undefined} user
         * @memberof pb.RspLogin
         * @instance
         */
        RspLogin.prototype.user = null;

        /**
         * Creates a new RspLogin instance using the specified properties.
         * @function create
         * @memberof pb.RspLogin
         * @static
         * @param {pb.IRspLogin=} [properties] Properties to set
         * @returns {pb.RspLogin} RspLogin instance
         */
        RspLogin.create = function create(properties) {
            return new RspLogin(properties);
        };

        /**
         * Encodes the specified RspLogin message. Does not implicitly {@link pb.RspLogin.verify|verify} messages.
         * @function encode
         * @memberof pb.RspLogin
         * @static
         * @param {pb.IRspLogin} message RspLogin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RspLogin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && message.hasOwnProperty("code"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
            if (message.msg != null && message.hasOwnProperty("msg"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.msg);
            if (message.user != null && message.hasOwnProperty("user"))
                $root.pb.UserInfo.encode(message.user, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RspLogin message, length delimited. Does not implicitly {@link pb.RspLogin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.RspLogin
         * @static
         * @param {pb.IRspLogin} message RspLogin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RspLogin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RspLogin message from the specified reader or buffer.
         * @function decode
         * @memberof pb.RspLogin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.RspLogin} RspLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RspLogin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.RspLogin();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.code = reader.int32();
                    break;
                case 2:
                    message.msg = reader.string();
                    break;
                case 3:
                    message.user = $root.pb.UserInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RspLogin message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.RspLogin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.RspLogin} RspLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RspLogin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RspLogin message.
         * @function verify
         * @memberof pb.RspLogin
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RspLogin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.msg != null && message.hasOwnProperty("msg"))
                if (!$util.isString(message.msg))
                    return "msg: string expected";
            if (message.user != null && message.hasOwnProperty("user")) {
                var error = $root.pb.UserInfo.verify(message.user);
                if (error)
                    return "user." + error;
            }
            return null;
        };

        /**
         * Creates a RspLogin message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.RspLogin
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.RspLogin} RspLogin
         */
        RspLogin.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.RspLogin)
                return object;
            var message = new $root.pb.RspLogin();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.msg != null)
                message.msg = String(object.msg);
            if (object.user != null) {
                if (typeof object.user !== "object")
                    throw TypeError(".pb.RspLogin.user: object expected");
                message.user = $root.pb.UserInfo.fromObject(object.user);
            }
            return message;
        };

        /**
         * Creates a plain object from a RspLogin message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.RspLogin
         * @static
         * @param {pb.RspLogin} message RspLogin
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RspLogin.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.code = 0;
                object.msg = "";
                object.user = null;
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.msg != null && message.hasOwnProperty("msg"))
                object.msg = message.msg;
            if (message.user != null && message.hasOwnProperty("user"))
                object.user = $root.pb.UserInfo.toObject(message.user, options);
            return object;
        };

        /**
         * Converts this RspLogin to JSON.
         * @function toJSON
         * @memberof pb.RspLogin
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RspLogin.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RspLogin;
    })();

    pb.UserInfo = (function() {

        /**
         * Properties of a UserInfo.
         * @memberof pb
         * @interface IUserInfo
         * @property {string|null} [openid] UserInfo openid
         * @property {string|null} [nickname] UserInfo nickname
         * @property {number|null} [sex] UserInfo sex
         * @property {string|null} [headhash] UserInfo headhash
         * @property {boolean|null} [isonline] UserInfo isonline
         */

        /**
         * Constructs a new UserInfo.
         * @memberof pb
         * @classdesc Represents a UserInfo.
         * @implements IUserInfo
         * @constructor
         * @param {pb.IUserInfo=} [properties] Properties to set
         */
        function UserInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserInfo openid.
         * @member {string} openid
         * @memberof pb.UserInfo
         * @instance
         */
        UserInfo.prototype.openid = "";

        /**
         * UserInfo nickname.
         * @member {string} nickname
         * @memberof pb.UserInfo
         * @instance
         */
        UserInfo.prototype.nickname = "";

        /**
         * UserInfo sex.
         * @member {number} sex
         * @memberof pb.UserInfo
         * @instance
         */
        UserInfo.prototype.sex = 0;

        /**
         * UserInfo headhash.
         * @member {string} headhash
         * @memberof pb.UserInfo
         * @instance
         */
        UserInfo.prototype.headhash = "";

        /**
         * UserInfo isonline.
         * @member {boolean} isonline
         * @memberof pb.UserInfo
         * @instance
         */
        UserInfo.prototype.isonline = false;

        /**
         * Creates a new UserInfo instance using the specified properties.
         * @function create
         * @memberof pb.UserInfo
         * @static
         * @param {pb.IUserInfo=} [properties] Properties to set
         * @returns {pb.UserInfo} UserInfo instance
         */
        UserInfo.create = function create(properties) {
            return new UserInfo(properties);
        };

        /**
         * Encodes the specified UserInfo message. Does not implicitly {@link pb.UserInfo.verify|verify} messages.
         * @function encode
         * @memberof pb.UserInfo
         * @static
         * @param {pb.IUserInfo} message UserInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.openid != null && message.hasOwnProperty("openid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openid);
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.nickname);
            if (message.sex != null && message.hasOwnProperty("sex"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.sex);
            if (message.headhash != null && message.hasOwnProperty("headhash"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.headhash);
            if (message.isonline != null && message.hasOwnProperty("isonline"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.isonline);
            return writer;
        };

        /**
         * Encodes the specified UserInfo message, length delimited. Does not implicitly {@link pb.UserInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.UserInfo
         * @static
         * @param {pb.IUserInfo} message UserInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserInfo message from the specified reader or buffer.
         * @function decode
         * @memberof pb.UserInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.UserInfo} UserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.UserInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.openid = reader.string();
                    break;
                case 2:
                    message.nickname = reader.string();
                    break;
                case 3:
                    message.sex = reader.int32();
                    break;
                case 4:
                    message.headhash = reader.string();
                    break;
                case 5:
                    message.isonline = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.UserInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.UserInfo} UserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserInfo message.
         * @function verify
         * @memberof pb.UserInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.openid != null && message.hasOwnProperty("openid"))
                if (!$util.isString(message.openid))
                    return "openid: string expected";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            if (message.sex != null && message.hasOwnProperty("sex"))
                if (!$util.isInteger(message.sex))
                    return "sex: integer expected";
            if (message.headhash != null && message.hasOwnProperty("headhash"))
                if (!$util.isString(message.headhash))
                    return "headhash: string expected";
            if (message.isonline != null && message.hasOwnProperty("isonline"))
                if (typeof message.isonline !== "boolean")
                    return "isonline: boolean expected";
            return null;
        };

        /**
         * Creates a UserInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.UserInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.UserInfo} UserInfo
         */
        UserInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.UserInfo)
                return object;
            var message = new $root.pb.UserInfo();
            if (object.openid != null)
                message.openid = String(object.openid);
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            if (object.sex != null)
                message.sex = object.sex | 0;
            if (object.headhash != null)
                message.headhash = String(object.headhash);
            if (object.isonline != null)
                message.isonline = Boolean(object.isonline);
            return message;
        };

        /**
         * Creates a plain object from a UserInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.UserInfo
         * @static
         * @param {pb.UserInfo} message UserInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.openid = "";
                object.nickname = "";
                object.sex = 0;
                object.headhash = "";
                object.isonline = false;
            }
            if (message.openid != null && message.hasOwnProperty("openid"))
                object.openid = message.openid;
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            if (message.sex != null && message.hasOwnProperty("sex"))
                object.sex = message.sex;
            if (message.headhash != null && message.hasOwnProperty("headhash"))
                object.headhash = message.headhash;
            if (message.isonline != null && message.hasOwnProperty("isonline"))
                object.isonline = message.isonline;
            return object;
        };

        /**
         * Converts this UserInfo to JSON.
         * @function toJSON
         * @memberof pb.UserInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserInfo;
    })();

    pb.CreateRoom = (function() {

        /**
         * Properties of a CreateRoom.
         * @memberof pb
         * @interface ICreateRoom
         * @property {pb.IReqCreateRoom|null} [reqCreateRoom] CreateRoom reqCreateRoom
         * @property {pb.IRspCreateRoom|null} [rspCreateRoom] CreateRoom rspCreateRoom
         */

        /**
         * Constructs a new CreateRoom.
         * @memberof pb
         * @classdesc Represents a CreateRoom.
         * @implements ICreateRoom
         * @constructor
         * @param {pb.ICreateRoom=} [properties] Properties to set
         */
        function CreateRoom(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CreateRoom reqCreateRoom.
         * @member {pb.IReqCreateRoom|null|undefined} reqCreateRoom
         * @memberof pb.CreateRoom
         * @instance
         */
        CreateRoom.prototype.reqCreateRoom = null;

        /**
         * CreateRoom rspCreateRoom.
         * @member {pb.IRspCreateRoom|null|undefined} rspCreateRoom
         * @memberof pb.CreateRoom
         * @instance
         */
        CreateRoom.prototype.rspCreateRoom = null;

        /**
         * Creates a new CreateRoom instance using the specified properties.
         * @function create
         * @memberof pb.CreateRoom
         * @static
         * @param {pb.ICreateRoom=} [properties] Properties to set
         * @returns {pb.CreateRoom} CreateRoom instance
         */
        CreateRoom.create = function create(properties) {
            return new CreateRoom(properties);
        };

        /**
         * Encodes the specified CreateRoom message. Does not implicitly {@link pb.CreateRoom.verify|verify} messages.
         * @function encode
         * @memberof pb.CreateRoom
         * @static
         * @param {pb.ICreateRoom} message CreateRoom message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CreateRoom.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.reqCreateRoom != null && message.hasOwnProperty("reqCreateRoom"))
                $root.pb.ReqCreateRoom.encode(message.reqCreateRoom, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.rspCreateRoom != null && message.hasOwnProperty("rspCreateRoom"))
                $root.pb.RspCreateRoom.encode(message.rspCreateRoom, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified CreateRoom message, length delimited. Does not implicitly {@link pb.CreateRoom.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.CreateRoom
         * @static
         * @param {pb.ICreateRoom} message CreateRoom message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CreateRoom.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CreateRoom message from the specified reader or buffer.
         * @function decode
         * @memberof pb.CreateRoom
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.CreateRoom} CreateRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CreateRoom.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.CreateRoom();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.reqCreateRoom = $root.pb.ReqCreateRoom.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.rspCreateRoom = $root.pb.RspCreateRoom.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CreateRoom message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.CreateRoom
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.CreateRoom} CreateRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CreateRoom.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CreateRoom message.
         * @function verify
         * @memberof pb.CreateRoom
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CreateRoom.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.reqCreateRoom != null && message.hasOwnProperty("reqCreateRoom")) {
                var error = $root.pb.ReqCreateRoom.verify(message.reqCreateRoom);
                if (error)
                    return "reqCreateRoom." + error;
            }
            if (message.rspCreateRoom != null && message.hasOwnProperty("rspCreateRoom")) {
                var error = $root.pb.RspCreateRoom.verify(message.rspCreateRoom);
                if (error)
                    return "rspCreateRoom." + error;
            }
            return null;
        };

        /**
         * Creates a CreateRoom message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.CreateRoom
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.CreateRoom} CreateRoom
         */
        CreateRoom.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.CreateRoom)
                return object;
            var message = new $root.pb.CreateRoom();
            if (object.reqCreateRoom != null) {
                if (typeof object.reqCreateRoom !== "object")
                    throw TypeError(".pb.CreateRoom.reqCreateRoom: object expected");
                message.reqCreateRoom = $root.pb.ReqCreateRoom.fromObject(object.reqCreateRoom);
            }
            if (object.rspCreateRoom != null) {
                if (typeof object.rspCreateRoom !== "object")
                    throw TypeError(".pb.CreateRoom.rspCreateRoom: object expected");
                message.rspCreateRoom = $root.pb.RspCreateRoom.fromObject(object.rspCreateRoom);
            }
            return message;
        };

        /**
         * Creates a plain object from a CreateRoom message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.CreateRoom
         * @static
         * @param {pb.CreateRoom} message CreateRoom
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CreateRoom.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.reqCreateRoom = null;
                object.rspCreateRoom = null;
            }
            if (message.reqCreateRoom != null && message.hasOwnProperty("reqCreateRoom"))
                object.reqCreateRoom = $root.pb.ReqCreateRoom.toObject(message.reqCreateRoom, options);
            if (message.rspCreateRoom != null && message.hasOwnProperty("rspCreateRoom"))
                object.rspCreateRoom = $root.pb.RspCreateRoom.toObject(message.rspCreateRoom, options);
            return object;
        };

        /**
         * Converts this CreateRoom to JSON.
         * @function toJSON
         * @memberof pb.CreateRoom
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CreateRoom.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CreateRoom;
    })();

    pb.ReqCreateRoom = (function() {

        /**
         * Properties of a ReqCreateRoom.
         * @memberof pb
         * @interface IReqCreateRoom
         * @property {number|null} [action] ReqCreateRoom action
         * @property {number|null} [hidden] ReqCreateRoom hidden
         * @property {number|null} [number] ReqCreateRoom number
         * @property {string|null} [roomType] ReqCreateRoom roomType
         * @property {Object.<string,string>|null} [ext] ReqCreateRoom ext
         */

        /**
         * Constructs a new ReqCreateRoom.
         * @memberof pb
         * @classdesc Represents a ReqCreateRoom.
         * @implements IReqCreateRoom
         * @constructor
         * @param {pb.IReqCreateRoom=} [properties] Properties to set
         */
        function ReqCreateRoom(properties) {
            this.ext = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReqCreateRoom action.
         * @member {number} action
         * @memberof pb.ReqCreateRoom
         * @instance
         */
        ReqCreateRoom.prototype.action = 0;

        /**
         * ReqCreateRoom hidden.
         * @member {number} hidden
         * @memberof pb.ReqCreateRoom
         * @instance
         */
        ReqCreateRoom.prototype.hidden = 0;

        /**
         * ReqCreateRoom number.
         * @member {number} number
         * @memberof pb.ReqCreateRoom
         * @instance
         */
        ReqCreateRoom.prototype.number = 0;

        /**
         * ReqCreateRoom roomType.
         * @member {string} roomType
         * @memberof pb.ReqCreateRoom
         * @instance
         */
        ReqCreateRoom.prototype.roomType = "";

        /**
         * ReqCreateRoom ext.
         * @member {Object.<string,string>} ext
         * @memberof pb.ReqCreateRoom
         * @instance
         */
        ReqCreateRoom.prototype.ext = $util.emptyObject;

        /**
         * Creates a new ReqCreateRoom instance using the specified properties.
         * @function create
         * @memberof pb.ReqCreateRoom
         * @static
         * @param {pb.IReqCreateRoom=} [properties] Properties to set
         * @returns {pb.ReqCreateRoom} ReqCreateRoom instance
         */
        ReqCreateRoom.create = function create(properties) {
            return new ReqCreateRoom(properties);
        };

        /**
         * Encodes the specified ReqCreateRoom message. Does not implicitly {@link pb.ReqCreateRoom.verify|verify} messages.
         * @function encode
         * @memberof pb.ReqCreateRoom
         * @static
         * @param {pb.IReqCreateRoom} message ReqCreateRoom message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqCreateRoom.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.action != null && message.hasOwnProperty("action"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
            if (message.hidden != null && message.hasOwnProperty("hidden"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.hidden);
            if (message.number != null && message.hasOwnProperty("number"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.number);
            if (message.roomType != null && message.hasOwnProperty("roomType"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.roomType);
            if (message.ext != null && message.hasOwnProperty("ext"))
                for (var keys = Object.keys(message.ext), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 5, wireType 2 =*/42).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.ext[keys[i]]).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ReqCreateRoom message, length delimited. Does not implicitly {@link pb.ReqCreateRoom.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.ReqCreateRoom
         * @static
         * @param {pb.IReqCreateRoom} message ReqCreateRoom message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqCreateRoom.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReqCreateRoom message from the specified reader or buffer.
         * @function decode
         * @memberof pb.ReqCreateRoom
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.ReqCreateRoom} ReqCreateRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqCreateRoom.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.ReqCreateRoom(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.action = reader.int32();
                    break;
                case 2:
                    message.hidden = reader.int32();
                    break;
                case 3:
                    message.number = reader.int32();
                    break;
                case 4:
                    message.roomType = reader.string();
                    break;
                case 5:
                    reader.skip().pos++;
                    if (message.ext === $util.emptyObject)
                        message.ext = {};
                    key = reader.string();
                    reader.pos++;
                    message.ext[key] = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ReqCreateRoom message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.ReqCreateRoom
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.ReqCreateRoom} ReqCreateRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqCreateRoom.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReqCreateRoom message.
         * @function verify
         * @memberof pb.ReqCreateRoom
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReqCreateRoom.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.action != null && message.hasOwnProperty("action"))
                if (!$util.isInteger(message.action))
                    return "action: integer expected";
            if (message.hidden != null && message.hasOwnProperty("hidden"))
                if (!$util.isInteger(message.hidden))
                    return "hidden: integer expected";
            if (message.number != null && message.hasOwnProperty("number"))
                if (!$util.isInteger(message.number))
                    return "number: integer expected";
            if (message.roomType != null && message.hasOwnProperty("roomType"))
                if (!$util.isString(message.roomType))
                    return "roomType: string expected";
            if (message.ext != null && message.hasOwnProperty("ext")) {
                if (!$util.isObject(message.ext))
                    return "ext: object expected";
                var key = Object.keys(message.ext);
                for (var i = 0; i < key.length; ++i)
                    if (!$util.isString(message.ext[key[i]]))
                        return "ext: string{k:string} expected";
            }
            return null;
        };

        /**
         * Creates a ReqCreateRoom message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.ReqCreateRoom
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.ReqCreateRoom} ReqCreateRoom
         */
        ReqCreateRoom.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.ReqCreateRoom)
                return object;
            var message = new $root.pb.ReqCreateRoom();
            if (object.action != null)
                message.action = object.action | 0;
            if (object.hidden != null)
                message.hidden = object.hidden | 0;
            if (object.number != null)
                message.number = object.number | 0;
            if (object.roomType != null)
                message.roomType = String(object.roomType);
            if (object.ext) {
                if (typeof object.ext !== "object")
                    throw TypeError(".pb.ReqCreateRoom.ext: object expected");
                message.ext = {};
                for (var keys = Object.keys(object.ext), i = 0; i < keys.length; ++i)
                    message.ext[keys[i]] = String(object.ext[keys[i]]);
            }
            return message;
        };

        /**
         * Creates a plain object from a ReqCreateRoom message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.ReqCreateRoom
         * @static
         * @param {pb.ReqCreateRoom} message ReqCreateRoom
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReqCreateRoom.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.objects || options.defaults)
                object.ext = {};
            if (options.defaults) {
                object.action = 0;
                object.hidden = 0;
                object.number = 0;
                object.roomType = "";
            }
            if (message.action != null && message.hasOwnProperty("action"))
                object.action = message.action;
            if (message.hidden != null && message.hasOwnProperty("hidden"))
                object.hidden = message.hidden;
            if (message.number != null && message.hasOwnProperty("number"))
                object.number = message.number;
            if (message.roomType != null && message.hasOwnProperty("roomType"))
                object.roomType = message.roomType;
            var keys2;
            if (message.ext && (keys2 = Object.keys(message.ext)).length) {
                object.ext = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.ext[keys2[j]] = message.ext[keys2[j]];
            }
            return object;
        };

        /**
         * Converts this ReqCreateRoom to JSON.
         * @function toJSON
         * @memberof pb.ReqCreateRoom
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReqCreateRoom.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ReqCreateRoom;
    })();

    pb.RspCreateRoom = (function() {

        /**
         * Properties of a RspCreateRoom.
         * @memberof pb
         * @interface IRspCreateRoom
         * @property {number|null} [code] RspCreateRoom code
         * @property {string|null} [msg] RspCreateRoom msg
         * @property {pb.IRoomInfo|null} [roominfo] RspCreateRoom roominfo
         */

        /**
         * Constructs a new RspCreateRoom.
         * @memberof pb
         * @classdesc Represents a RspCreateRoom.
         * @implements IRspCreateRoom
         * @constructor
         * @param {pb.IRspCreateRoom=} [properties] Properties to set
         */
        function RspCreateRoom(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RspCreateRoom code.
         * @member {number} code
         * @memberof pb.RspCreateRoom
         * @instance
         */
        RspCreateRoom.prototype.code = 0;

        /**
         * RspCreateRoom msg.
         * @member {string} msg
         * @memberof pb.RspCreateRoom
         * @instance
         */
        RspCreateRoom.prototype.msg = "";

        /**
         * RspCreateRoom roominfo.
         * @member {pb.IRoomInfo|null|undefined} roominfo
         * @memberof pb.RspCreateRoom
         * @instance
         */
        RspCreateRoom.prototype.roominfo = null;

        /**
         * Creates a new RspCreateRoom instance using the specified properties.
         * @function create
         * @memberof pb.RspCreateRoom
         * @static
         * @param {pb.IRspCreateRoom=} [properties] Properties to set
         * @returns {pb.RspCreateRoom} RspCreateRoom instance
         */
        RspCreateRoom.create = function create(properties) {
            return new RspCreateRoom(properties);
        };

        /**
         * Encodes the specified RspCreateRoom message. Does not implicitly {@link pb.RspCreateRoom.verify|verify} messages.
         * @function encode
         * @memberof pb.RspCreateRoom
         * @static
         * @param {pb.IRspCreateRoom} message RspCreateRoom message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RspCreateRoom.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && message.hasOwnProperty("code"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
            if (message.msg != null && message.hasOwnProperty("msg"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.msg);
            if (message.roominfo != null && message.hasOwnProperty("roominfo"))
                $root.pb.RoomInfo.encode(message.roominfo, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RspCreateRoom message, length delimited. Does not implicitly {@link pb.RspCreateRoom.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.RspCreateRoom
         * @static
         * @param {pb.IRspCreateRoom} message RspCreateRoom message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RspCreateRoom.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RspCreateRoom message from the specified reader or buffer.
         * @function decode
         * @memberof pb.RspCreateRoom
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.RspCreateRoom} RspCreateRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RspCreateRoom.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.RspCreateRoom();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.code = reader.int32();
                    break;
                case 2:
                    message.msg = reader.string();
                    break;
                case 3:
                    message.roominfo = $root.pb.RoomInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RspCreateRoom message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.RspCreateRoom
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.RspCreateRoom} RspCreateRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RspCreateRoom.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RspCreateRoom message.
         * @function verify
         * @memberof pb.RspCreateRoom
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RspCreateRoom.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.msg != null && message.hasOwnProperty("msg"))
                if (!$util.isString(message.msg))
                    return "msg: string expected";
            if (message.roominfo != null && message.hasOwnProperty("roominfo")) {
                var error = $root.pb.RoomInfo.verify(message.roominfo);
                if (error)
                    return "roominfo." + error;
            }
            return null;
        };

        /**
         * Creates a RspCreateRoom message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.RspCreateRoom
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.RspCreateRoom} RspCreateRoom
         */
        RspCreateRoom.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.RspCreateRoom)
                return object;
            var message = new $root.pb.RspCreateRoom();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.msg != null)
                message.msg = String(object.msg);
            if (object.roominfo != null) {
                if (typeof object.roominfo !== "object")
                    throw TypeError(".pb.RspCreateRoom.roominfo: object expected");
                message.roominfo = $root.pb.RoomInfo.fromObject(object.roominfo);
            }
            return message;
        };

        /**
         * Creates a plain object from a RspCreateRoom message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.RspCreateRoom
         * @static
         * @param {pb.RspCreateRoom} message RspCreateRoom
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RspCreateRoom.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.code = 0;
                object.msg = "";
                object.roominfo = null;
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.msg != null && message.hasOwnProperty("msg"))
                object.msg = message.msg;
            if (message.roominfo != null && message.hasOwnProperty("roominfo"))
                object.roominfo = $root.pb.RoomInfo.toObject(message.roominfo, options);
            return object;
        };

        /**
         * Converts this RspCreateRoom to JSON.
         * @function toJSON
         * @memberof pb.RspCreateRoom
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RspCreateRoom.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RspCreateRoom;
    })();

    pb.JoinRoom = (function() {

        /**
         * Properties of a JoinRoom.
         * @memberof pb
         * @interface IJoinRoom
         * @property {pb.IReqJoinRoom|null} [reqJoinRoom] JoinRoom reqJoinRoom
         * @property {pb.IRspJoinRoom|null} [rspJoinRoom] JoinRoom rspJoinRoom
         */

        /**
         * Constructs a new JoinRoom.
         * @memberof pb
         * @classdesc Represents a JoinRoom.
         * @implements IJoinRoom
         * @constructor
         * @param {pb.IJoinRoom=} [properties] Properties to set
         */
        function JoinRoom(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * JoinRoom reqJoinRoom.
         * @member {pb.IReqJoinRoom|null|undefined} reqJoinRoom
         * @memberof pb.JoinRoom
         * @instance
         */
        JoinRoom.prototype.reqJoinRoom = null;

        /**
         * JoinRoom rspJoinRoom.
         * @member {pb.IRspJoinRoom|null|undefined} rspJoinRoom
         * @memberof pb.JoinRoom
         * @instance
         */
        JoinRoom.prototype.rspJoinRoom = null;

        /**
         * Creates a new JoinRoom instance using the specified properties.
         * @function create
         * @memberof pb.JoinRoom
         * @static
         * @param {pb.IJoinRoom=} [properties] Properties to set
         * @returns {pb.JoinRoom} JoinRoom instance
         */
        JoinRoom.create = function create(properties) {
            return new JoinRoom(properties);
        };

        /**
         * Encodes the specified JoinRoom message. Does not implicitly {@link pb.JoinRoom.verify|verify} messages.
         * @function encode
         * @memberof pb.JoinRoom
         * @static
         * @param {pb.IJoinRoom} message JoinRoom message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinRoom.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.reqJoinRoom != null && message.hasOwnProperty("reqJoinRoom"))
                $root.pb.ReqJoinRoom.encode(message.reqJoinRoom, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.rspJoinRoom != null && message.hasOwnProperty("rspJoinRoom"))
                $root.pb.RspJoinRoom.encode(message.rspJoinRoom, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified JoinRoom message, length delimited. Does not implicitly {@link pb.JoinRoom.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.JoinRoom
         * @static
         * @param {pb.IJoinRoom} message JoinRoom message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinRoom.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a JoinRoom message from the specified reader or buffer.
         * @function decode
         * @memberof pb.JoinRoom
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.JoinRoom} JoinRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinRoom.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.JoinRoom();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.reqJoinRoom = $root.pb.ReqJoinRoom.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.rspJoinRoom = $root.pb.RspJoinRoom.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a JoinRoom message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.JoinRoom
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.JoinRoom} JoinRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinRoom.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a JoinRoom message.
         * @function verify
         * @memberof pb.JoinRoom
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        JoinRoom.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.reqJoinRoom != null && message.hasOwnProperty("reqJoinRoom")) {
                var error = $root.pb.ReqJoinRoom.verify(message.reqJoinRoom);
                if (error)
                    return "reqJoinRoom." + error;
            }
            if (message.rspJoinRoom != null && message.hasOwnProperty("rspJoinRoom")) {
                var error = $root.pb.RspJoinRoom.verify(message.rspJoinRoom);
                if (error)
                    return "rspJoinRoom." + error;
            }
            return null;
        };

        /**
         * Creates a JoinRoom message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.JoinRoom
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.JoinRoom} JoinRoom
         */
        JoinRoom.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.JoinRoom)
                return object;
            var message = new $root.pb.JoinRoom();
            if (object.reqJoinRoom != null) {
                if (typeof object.reqJoinRoom !== "object")
                    throw TypeError(".pb.JoinRoom.reqJoinRoom: object expected");
                message.reqJoinRoom = $root.pb.ReqJoinRoom.fromObject(object.reqJoinRoom);
            }
            if (object.rspJoinRoom != null) {
                if (typeof object.rspJoinRoom !== "object")
                    throw TypeError(".pb.JoinRoom.rspJoinRoom: object expected");
                message.rspJoinRoom = $root.pb.RspJoinRoom.fromObject(object.rspJoinRoom);
            }
            return message;
        };

        /**
         * Creates a plain object from a JoinRoom message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.JoinRoom
         * @static
         * @param {pb.JoinRoom} message JoinRoom
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        JoinRoom.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.reqJoinRoom = null;
                object.rspJoinRoom = null;
            }
            if (message.reqJoinRoom != null && message.hasOwnProperty("reqJoinRoom"))
                object.reqJoinRoom = $root.pb.ReqJoinRoom.toObject(message.reqJoinRoom, options);
            if (message.rspJoinRoom != null && message.hasOwnProperty("rspJoinRoom"))
                object.rspJoinRoom = $root.pb.RspJoinRoom.toObject(message.rspJoinRoom, options);
            return object;
        };

        /**
         * Converts this JoinRoom to JSON.
         * @function toJSON
         * @memberof pb.JoinRoom
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        JoinRoom.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return JoinRoom;
    })();

    pb.ReqJoinRoom = (function() {

        /**
         * Properties of a ReqJoinRoom.
         * @memberof pb
         * @interface IReqJoinRoom
         * @property {number|null} [roomid] ReqJoinRoom roomid
         * @property {string|null} [roomtype] ReqJoinRoom roomtype
         */

        /**
         * Constructs a new ReqJoinRoom.
         * @memberof pb
         * @classdesc Represents a ReqJoinRoom.
         * @implements IReqJoinRoom
         * @constructor
         * @param {pb.IReqJoinRoom=} [properties] Properties to set
         */
        function ReqJoinRoom(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReqJoinRoom roomid.
         * @member {number} roomid
         * @memberof pb.ReqJoinRoom
         * @instance
         */
        ReqJoinRoom.prototype.roomid = 0;

        /**
         * ReqJoinRoom roomtype.
         * @member {string} roomtype
         * @memberof pb.ReqJoinRoom
         * @instance
         */
        ReqJoinRoom.prototype.roomtype = "";

        /**
         * Creates a new ReqJoinRoom instance using the specified properties.
         * @function create
         * @memberof pb.ReqJoinRoom
         * @static
         * @param {pb.IReqJoinRoom=} [properties] Properties to set
         * @returns {pb.ReqJoinRoom} ReqJoinRoom instance
         */
        ReqJoinRoom.create = function create(properties) {
            return new ReqJoinRoom(properties);
        };

        /**
         * Encodes the specified ReqJoinRoom message. Does not implicitly {@link pb.ReqJoinRoom.verify|verify} messages.
         * @function encode
         * @memberof pb.ReqJoinRoom
         * @static
         * @param {pb.IReqJoinRoom} message ReqJoinRoom message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqJoinRoom.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roomid != null && message.hasOwnProperty("roomid"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.roomid);
            if (message.roomtype != null && message.hasOwnProperty("roomtype"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.roomtype);
            return writer;
        };

        /**
         * Encodes the specified ReqJoinRoom message, length delimited. Does not implicitly {@link pb.ReqJoinRoom.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.ReqJoinRoom
         * @static
         * @param {pb.IReqJoinRoom} message ReqJoinRoom message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqJoinRoom.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReqJoinRoom message from the specified reader or buffer.
         * @function decode
         * @memberof pb.ReqJoinRoom
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.ReqJoinRoom} ReqJoinRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqJoinRoom.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.ReqJoinRoom();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roomid = reader.int32();
                    break;
                case 2:
                    message.roomtype = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ReqJoinRoom message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.ReqJoinRoom
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.ReqJoinRoom} ReqJoinRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqJoinRoom.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReqJoinRoom message.
         * @function verify
         * @memberof pb.ReqJoinRoom
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReqJoinRoom.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.roomid != null && message.hasOwnProperty("roomid"))
                if (!$util.isInteger(message.roomid))
                    return "roomid: integer expected";
            if (message.roomtype != null && message.hasOwnProperty("roomtype"))
                if (!$util.isString(message.roomtype))
                    return "roomtype: string expected";
            return null;
        };

        /**
         * Creates a ReqJoinRoom message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.ReqJoinRoom
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.ReqJoinRoom} ReqJoinRoom
         */
        ReqJoinRoom.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.ReqJoinRoom)
                return object;
            var message = new $root.pb.ReqJoinRoom();
            if (object.roomid != null)
                message.roomid = object.roomid | 0;
            if (object.roomtype != null)
                message.roomtype = String(object.roomtype);
            return message;
        };

        /**
         * Creates a plain object from a ReqJoinRoom message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.ReqJoinRoom
         * @static
         * @param {pb.ReqJoinRoom} message ReqJoinRoom
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReqJoinRoom.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.roomid = 0;
                object.roomtype = "";
            }
            if (message.roomid != null && message.hasOwnProperty("roomid"))
                object.roomid = message.roomid;
            if (message.roomtype != null && message.hasOwnProperty("roomtype"))
                object.roomtype = message.roomtype;
            return object;
        };

        /**
         * Converts this ReqJoinRoom to JSON.
         * @function toJSON
         * @memberof pb.ReqJoinRoom
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReqJoinRoom.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ReqJoinRoom;
    })();

    pb.RspJoinRoom = (function() {

        /**
         * Properties of a RspJoinRoom.
         * @memberof pb
         * @interface IRspJoinRoom
         * @property {number|null} [code] RspJoinRoom code
         * @property {string|null} [msg] RspJoinRoom msg
         * @property {pb.IRoomInfo|null} [roominfo] RspJoinRoom roominfo
         */

        /**
         * Constructs a new RspJoinRoom.
         * @memberof pb
         * @classdesc Represents a RspJoinRoom.
         * @implements IRspJoinRoom
         * @constructor
         * @param {pb.IRspJoinRoom=} [properties] Properties to set
         */
        function RspJoinRoom(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RspJoinRoom code.
         * @member {number} code
         * @memberof pb.RspJoinRoom
         * @instance
         */
        RspJoinRoom.prototype.code = 0;

        /**
         * RspJoinRoom msg.
         * @member {string} msg
         * @memberof pb.RspJoinRoom
         * @instance
         */
        RspJoinRoom.prototype.msg = "";

        /**
         * RspJoinRoom roominfo.
         * @member {pb.IRoomInfo|null|undefined} roominfo
         * @memberof pb.RspJoinRoom
         * @instance
         */
        RspJoinRoom.prototype.roominfo = null;

        /**
         * Creates a new RspJoinRoom instance using the specified properties.
         * @function create
         * @memberof pb.RspJoinRoom
         * @static
         * @param {pb.IRspJoinRoom=} [properties] Properties to set
         * @returns {pb.RspJoinRoom} RspJoinRoom instance
         */
        RspJoinRoom.create = function create(properties) {
            return new RspJoinRoom(properties);
        };

        /**
         * Encodes the specified RspJoinRoom message. Does not implicitly {@link pb.RspJoinRoom.verify|verify} messages.
         * @function encode
         * @memberof pb.RspJoinRoom
         * @static
         * @param {pb.IRspJoinRoom} message RspJoinRoom message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RspJoinRoom.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && message.hasOwnProperty("code"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
            if (message.msg != null && message.hasOwnProperty("msg"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.msg);
            if (message.roominfo != null && message.hasOwnProperty("roominfo"))
                $root.pb.RoomInfo.encode(message.roominfo, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RspJoinRoom message, length delimited. Does not implicitly {@link pb.RspJoinRoom.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.RspJoinRoom
         * @static
         * @param {pb.IRspJoinRoom} message RspJoinRoom message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RspJoinRoom.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RspJoinRoom message from the specified reader or buffer.
         * @function decode
         * @memberof pb.RspJoinRoom
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.RspJoinRoom} RspJoinRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RspJoinRoom.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.RspJoinRoom();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.code = reader.int32();
                    break;
                case 2:
                    message.msg = reader.string();
                    break;
                case 3:
                    message.roominfo = $root.pb.RoomInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RspJoinRoom message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.RspJoinRoom
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.RspJoinRoom} RspJoinRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RspJoinRoom.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RspJoinRoom message.
         * @function verify
         * @memberof pb.RspJoinRoom
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RspJoinRoom.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.msg != null && message.hasOwnProperty("msg"))
                if (!$util.isString(message.msg))
                    return "msg: string expected";
            if (message.roominfo != null && message.hasOwnProperty("roominfo")) {
                var error = $root.pb.RoomInfo.verify(message.roominfo);
                if (error)
                    return "roominfo." + error;
            }
            return null;
        };

        /**
         * Creates a RspJoinRoom message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.RspJoinRoom
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.RspJoinRoom} RspJoinRoom
         */
        RspJoinRoom.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.RspJoinRoom)
                return object;
            var message = new $root.pb.RspJoinRoom();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.msg != null)
                message.msg = String(object.msg);
            if (object.roominfo != null) {
                if (typeof object.roominfo !== "object")
                    throw TypeError(".pb.RspJoinRoom.roominfo: object expected");
                message.roominfo = $root.pb.RoomInfo.fromObject(object.roominfo);
            }
            return message;
        };

        /**
         * Creates a plain object from a RspJoinRoom message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.RspJoinRoom
         * @static
         * @param {pb.RspJoinRoom} message RspJoinRoom
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RspJoinRoom.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.code = 0;
                object.msg = "";
                object.roominfo = null;
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.msg != null && message.hasOwnProperty("msg"))
                object.msg = message.msg;
            if (message.roominfo != null && message.hasOwnProperty("roominfo"))
                object.roominfo = $root.pb.RoomInfo.toObject(message.roominfo, options);
            return object;
        };

        /**
         * Converts this RspJoinRoom to JSON.
         * @function toJSON
         * @memberof pb.RspJoinRoom
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RspJoinRoom.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RspJoinRoom;
    })();

    pb.GetRooms = (function() {

        /**
         * Properties of a GetRooms.
         * @memberof pb
         * @interface IGetRooms
         * @property {pb.IReqGetRoom|null} [reqGetRoom] GetRooms reqGetRoom
         * @property {pb.IRspGetRoom|null} [rspGetRoom] GetRooms rspGetRoom
         */

        /**
         * Constructs a new GetRooms.
         * @memberof pb
         * @classdesc Represents a GetRooms.
         * @implements IGetRooms
         * @constructor
         * @param {pb.IGetRooms=} [properties] Properties to set
         */
        function GetRooms(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetRooms reqGetRoom.
         * @member {pb.IReqGetRoom|null|undefined} reqGetRoom
         * @memberof pb.GetRooms
         * @instance
         */
        GetRooms.prototype.reqGetRoom = null;

        /**
         * GetRooms rspGetRoom.
         * @member {pb.IRspGetRoom|null|undefined} rspGetRoom
         * @memberof pb.GetRooms
         * @instance
         */
        GetRooms.prototype.rspGetRoom = null;

        /**
         * Creates a new GetRooms instance using the specified properties.
         * @function create
         * @memberof pb.GetRooms
         * @static
         * @param {pb.IGetRooms=} [properties] Properties to set
         * @returns {pb.GetRooms} GetRooms instance
         */
        GetRooms.create = function create(properties) {
            return new GetRooms(properties);
        };

        /**
         * Encodes the specified GetRooms message. Does not implicitly {@link pb.GetRooms.verify|verify} messages.
         * @function encode
         * @memberof pb.GetRooms
         * @static
         * @param {pb.IGetRooms} message GetRooms message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetRooms.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.reqGetRoom != null && message.hasOwnProperty("reqGetRoom"))
                $root.pb.ReqGetRoom.encode(message.reqGetRoom, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.rspGetRoom != null && message.hasOwnProperty("rspGetRoom"))
                $root.pb.RspGetRoom.encode(message.rspGetRoom, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GetRooms message, length delimited. Does not implicitly {@link pb.GetRooms.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.GetRooms
         * @static
         * @param {pb.IGetRooms} message GetRooms message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetRooms.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetRooms message from the specified reader or buffer.
         * @function decode
         * @memberof pb.GetRooms
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.GetRooms} GetRooms
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetRooms.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.GetRooms();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.reqGetRoom = $root.pb.ReqGetRoom.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.rspGetRoom = $root.pb.RspGetRoom.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetRooms message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.GetRooms
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.GetRooms} GetRooms
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetRooms.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetRooms message.
         * @function verify
         * @memberof pb.GetRooms
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetRooms.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.reqGetRoom != null && message.hasOwnProperty("reqGetRoom")) {
                var error = $root.pb.ReqGetRoom.verify(message.reqGetRoom);
                if (error)
                    return "reqGetRoom." + error;
            }
            if (message.rspGetRoom != null && message.hasOwnProperty("rspGetRoom")) {
                var error = $root.pb.RspGetRoom.verify(message.rspGetRoom);
                if (error)
                    return "rspGetRoom." + error;
            }
            return null;
        };

        /**
         * Creates a GetRooms message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.GetRooms
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.GetRooms} GetRooms
         */
        GetRooms.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.GetRooms)
                return object;
            var message = new $root.pb.GetRooms();
            if (object.reqGetRoom != null) {
                if (typeof object.reqGetRoom !== "object")
                    throw TypeError(".pb.GetRooms.reqGetRoom: object expected");
                message.reqGetRoom = $root.pb.ReqGetRoom.fromObject(object.reqGetRoom);
            }
            if (object.rspGetRoom != null) {
                if (typeof object.rspGetRoom !== "object")
                    throw TypeError(".pb.GetRooms.rspGetRoom: object expected");
                message.rspGetRoom = $root.pb.RspGetRoom.fromObject(object.rspGetRoom);
            }
            return message;
        };

        /**
         * Creates a plain object from a GetRooms message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.GetRooms
         * @static
         * @param {pb.GetRooms} message GetRooms
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetRooms.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.reqGetRoom = null;
                object.rspGetRoom = null;
            }
            if (message.reqGetRoom != null && message.hasOwnProperty("reqGetRoom"))
                object.reqGetRoom = $root.pb.ReqGetRoom.toObject(message.reqGetRoom, options);
            if (message.rspGetRoom != null && message.hasOwnProperty("rspGetRoom"))
                object.rspGetRoom = $root.pb.RspGetRoom.toObject(message.rspGetRoom, options);
            return object;
        };

        /**
         * Converts this GetRooms to JSON.
         * @function toJSON
         * @memberof pb.GetRooms
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetRooms.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GetRooms;
    })();

    pb.ReqGetRoom = (function() {

        /**
         * Properties of a ReqGetRoom.
         * @memberof pb
         * @interface IReqGetRoom
         * @property {number|null} [roomid] ReqGetRoom roomid
         */

        /**
         * Constructs a new ReqGetRoom.
         * @memberof pb
         * @classdesc Represents a ReqGetRoom.
         * @implements IReqGetRoom
         * @constructor
         * @param {pb.IReqGetRoom=} [properties] Properties to set
         */
        function ReqGetRoom(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReqGetRoom roomid.
         * @member {number} roomid
         * @memberof pb.ReqGetRoom
         * @instance
         */
        ReqGetRoom.prototype.roomid = 0;

        /**
         * Creates a new ReqGetRoom instance using the specified properties.
         * @function create
         * @memberof pb.ReqGetRoom
         * @static
         * @param {pb.IReqGetRoom=} [properties] Properties to set
         * @returns {pb.ReqGetRoom} ReqGetRoom instance
         */
        ReqGetRoom.create = function create(properties) {
            return new ReqGetRoom(properties);
        };

        /**
         * Encodes the specified ReqGetRoom message. Does not implicitly {@link pb.ReqGetRoom.verify|verify} messages.
         * @function encode
         * @memberof pb.ReqGetRoom
         * @static
         * @param {pb.IReqGetRoom} message ReqGetRoom message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqGetRoom.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roomid != null && message.hasOwnProperty("roomid"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.roomid);
            return writer;
        };

        /**
         * Encodes the specified ReqGetRoom message, length delimited. Does not implicitly {@link pb.ReqGetRoom.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.ReqGetRoom
         * @static
         * @param {pb.IReqGetRoom} message ReqGetRoom message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqGetRoom.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReqGetRoom message from the specified reader or buffer.
         * @function decode
         * @memberof pb.ReqGetRoom
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.ReqGetRoom} ReqGetRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqGetRoom.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.ReqGetRoom();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roomid = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ReqGetRoom message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.ReqGetRoom
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.ReqGetRoom} ReqGetRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqGetRoom.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReqGetRoom message.
         * @function verify
         * @memberof pb.ReqGetRoom
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReqGetRoom.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.roomid != null && message.hasOwnProperty("roomid"))
                if (!$util.isInteger(message.roomid))
                    return "roomid: integer expected";
            return null;
        };

        /**
         * Creates a ReqGetRoom message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.ReqGetRoom
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.ReqGetRoom} ReqGetRoom
         */
        ReqGetRoom.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.ReqGetRoom)
                return object;
            var message = new $root.pb.ReqGetRoom();
            if (object.roomid != null)
                message.roomid = object.roomid | 0;
            return message;
        };

        /**
         * Creates a plain object from a ReqGetRoom message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.ReqGetRoom
         * @static
         * @param {pb.ReqGetRoom} message ReqGetRoom
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReqGetRoom.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.roomid = 0;
            if (message.roomid != null && message.hasOwnProperty("roomid"))
                object.roomid = message.roomid;
            return object;
        };

        /**
         * Converts this ReqGetRoom to JSON.
         * @function toJSON
         * @memberof pb.ReqGetRoom
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReqGetRoom.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ReqGetRoom;
    })();

    pb.RspGetRoom = (function() {

        /**
         * Properties of a RspGetRoom.
         * @memberof pb
         * @interface IRspGetRoom
         * @property {number|null} [code] RspGetRoom code
         * @property {string|null} [msg] RspGetRoom msg
         * @property {Array.<pb.IRoomInfo>|null} [roominfo] RspGetRoom roominfo
         */

        /**
         * Constructs a new RspGetRoom.
         * @memberof pb
         * @classdesc Represents a RspGetRoom.
         * @implements IRspGetRoom
         * @constructor
         * @param {pb.IRspGetRoom=} [properties] Properties to set
         */
        function RspGetRoom(properties) {
            this.roominfo = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RspGetRoom code.
         * @member {number} code
         * @memberof pb.RspGetRoom
         * @instance
         */
        RspGetRoom.prototype.code = 0;

        /**
         * RspGetRoom msg.
         * @member {string} msg
         * @memberof pb.RspGetRoom
         * @instance
         */
        RspGetRoom.prototype.msg = "";

        /**
         * RspGetRoom roominfo.
         * @member {Array.<pb.IRoomInfo>} roominfo
         * @memberof pb.RspGetRoom
         * @instance
         */
        RspGetRoom.prototype.roominfo = $util.emptyArray;

        /**
         * Creates a new RspGetRoom instance using the specified properties.
         * @function create
         * @memberof pb.RspGetRoom
         * @static
         * @param {pb.IRspGetRoom=} [properties] Properties to set
         * @returns {pb.RspGetRoom} RspGetRoom instance
         */
        RspGetRoom.create = function create(properties) {
            return new RspGetRoom(properties);
        };

        /**
         * Encodes the specified RspGetRoom message. Does not implicitly {@link pb.RspGetRoom.verify|verify} messages.
         * @function encode
         * @memberof pb.RspGetRoom
         * @static
         * @param {pb.IRspGetRoom} message RspGetRoom message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RspGetRoom.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && message.hasOwnProperty("code"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
            if (message.msg != null && message.hasOwnProperty("msg"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.msg);
            if (message.roominfo != null && message.roominfo.length)
                for (var i = 0; i < message.roominfo.length; ++i)
                    $root.pb.RoomInfo.encode(message.roominfo[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RspGetRoom message, length delimited. Does not implicitly {@link pb.RspGetRoom.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.RspGetRoom
         * @static
         * @param {pb.IRspGetRoom} message RspGetRoom message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RspGetRoom.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RspGetRoom message from the specified reader or buffer.
         * @function decode
         * @memberof pb.RspGetRoom
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.RspGetRoom} RspGetRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RspGetRoom.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.RspGetRoom();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.code = reader.int32();
                    break;
                case 2:
                    message.msg = reader.string();
                    break;
                case 3:
                    if (!(message.roominfo && message.roominfo.length))
                        message.roominfo = [];
                    message.roominfo.push($root.pb.RoomInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RspGetRoom message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.RspGetRoom
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.RspGetRoom} RspGetRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RspGetRoom.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RspGetRoom message.
         * @function verify
         * @memberof pb.RspGetRoom
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RspGetRoom.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.msg != null && message.hasOwnProperty("msg"))
                if (!$util.isString(message.msg))
                    return "msg: string expected";
            if (message.roominfo != null && message.hasOwnProperty("roominfo")) {
                if (!Array.isArray(message.roominfo))
                    return "roominfo: array expected";
                for (var i = 0; i < message.roominfo.length; ++i) {
                    var error = $root.pb.RoomInfo.verify(message.roominfo[i]);
                    if (error)
                        return "roominfo." + error;
                }
            }
            return null;
        };

        /**
         * Creates a RspGetRoom message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.RspGetRoom
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.RspGetRoom} RspGetRoom
         */
        RspGetRoom.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.RspGetRoom)
                return object;
            var message = new $root.pb.RspGetRoom();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.msg != null)
                message.msg = String(object.msg);
            if (object.roominfo) {
                if (!Array.isArray(object.roominfo))
                    throw TypeError(".pb.RspGetRoom.roominfo: array expected");
                message.roominfo = [];
                for (var i = 0; i < object.roominfo.length; ++i) {
                    if (typeof object.roominfo[i] !== "object")
                        throw TypeError(".pb.RspGetRoom.roominfo: object expected");
                    message.roominfo[i] = $root.pb.RoomInfo.fromObject(object.roominfo[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a RspGetRoom message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.RspGetRoom
         * @static
         * @param {pb.RspGetRoom} message RspGetRoom
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RspGetRoom.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.roominfo = [];
            if (options.defaults) {
                object.code = 0;
                object.msg = "";
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.msg != null && message.hasOwnProperty("msg"))
                object.msg = message.msg;
            if (message.roominfo && message.roominfo.length) {
                object.roominfo = [];
                for (var j = 0; j < message.roominfo.length; ++j)
                    object.roominfo[j] = $root.pb.RoomInfo.toObject(message.roominfo[j], options);
            }
            return object;
        };

        /**
         * Converts this RspGetRoom to JSON.
         * @function toJSON
         * @memberof pb.RspGetRoom
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RspGetRoom.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RspGetRoom;
    })();

    pb.RoomInfo = (function() {

        /**
         * Properties of a RoomInfo.
         * @memberof pb
         * @interface IRoomInfo
         * @property {number|null} [roomId] RoomInfo roomId
         * @property {Object.<string,pb.IUserInfo>|null} [userinfo] RoomInfo userinfo
         * @property {string|null} [master] RoomInfo master
         * @property {Object.<string,number>|null} [userStatus] RoomInfo userStatus
         * @property {number|Long|null} [createTime] RoomInfo createTime
         * @property {string|null} [roomType] RoomInfo roomType
         * @property {number|null} [number] RoomInfo number
         * @property {number|null} [action] RoomInfo action
         * @property {number|null} [hidden] RoomInfo hidden
         * @property {number|null} [roomStatus] RoomInfo roomStatus
         * @property {Object.<string,string>|null} [ext] RoomInfo ext
         */

        /**
         * Constructs a new RoomInfo.
         * @memberof pb
         * @classdesc Represents a RoomInfo.
         * @implements IRoomInfo
         * @constructor
         * @param {pb.IRoomInfo=} [properties] Properties to set
         */
        function RoomInfo(properties) {
            this.userinfo = {};
            this.userStatus = {};
            this.ext = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RoomInfo roomId.
         * @member {number} roomId
         * @memberof pb.RoomInfo
         * @instance
         */
        RoomInfo.prototype.roomId = 0;

        /**
         * RoomInfo userinfo.
         * @member {Object.<string,pb.IUserInfo>} userinfo
         * @memberof pb.RoomInfo
         * @instance
         */
        RoomInfo.prototype.userinfo = $util.emptyObject;

        /**
         * RoomInfo master.
         * @member {string} master
         * @memberof pb.RoomInfo
         * @instance
         */
        RoomInfo.prototype.master = "";

        /**
         * RoomInfo userStatus.
         * @member {Object.<string,number>} userStatus
         * @memberof pb.RoomInfo
         * @instance
         */
        RoomInfo.prototype.userStatus = $util.emptyObject;

        /**
         * RoomInfo createTime.
         * @member {number|Long} createTime
         * @memberof pb.RoomInfo
         * @instance
         */
        RoomInfo.prototype.createTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * RoomInfo roomType.
         * @member {string} roomType
         * @memberof pb.RoomInfo
         * @instance
         */
        RoomInfo.prototype.roomType = "";

        /**
         * RoomInfo number.
         * @member {number} number
         * @memberof pb.RoomInfo
         * @instance
         */
        RoomInfo.prototype.number = 0;

        /**
         * RoomInfo action.
         * @member {number} action
         * @memberof pb.RoomInfo
         * @instance
         */
        RoomInfo.prototype.action = 0;

        /**
         * RoomInfo hidden.
         * @member {number} hidden
         * @memberof pb.RoomInfo
         * @instance
         */
        RoomInfo.prototype.hidden = 0;

        /**
         * RoomInfo roomStatus.
         * @member {number} roomStatus
         * @memberof pb.RoomInfo
         * @instance
         */
        RoomInfo.prototype.roomStatus = 0;

        /**
         * RoomInfo ext.
         * @member {Object.<string,string>} ext
         * @memberof pb.RoomInfo
         * @instance
         */
        RoomInfo.prototype.ext = $util.emptyObject;

        /**
         * Creates a new RoomInfo instance using the specified properties.
         * @function create
         * @memberof pb.RoomInfo
         * @static
         * @param {pb.IRoomInfo=} [properties] Properties to set
         * @returns {pb.RoomInfo} RoomInfo instance
         */
        RoomInfo.create = function create(properties) {
            return new RoomInfo(properties);
        };

        /**
         * Encodes the specified RoomInfo message. Does not implicitly {@link pb.RoomInfo.verify|verify} messages.
         * @function encode
         * @memberof pb.RoomInfo
         * @static
         * @param {pb.IRoomInfo} message RoomInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.roomId);
            if (message.userinfo != null && message.hasOwnProperty("userinfo"))
                for (var keys = Object.keys(message.userinfo), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                    $root.pb.UserInfo.encode(message.userinfo[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                }
            if (message.master != null && message.hasOwnProperty("master"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.master);
            if (message.userStatus != null && message.hasOwnProperty("userStatus"))
                for (var keys = Object.keys(message.userStatus), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 4, wireType 2 =*/34).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 0 =*/16).int32(message.userStatus[keys[i]]).ldelim();
            if (message.createTime != null && message.hasOwnProperty("createTime"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.createTime);
            if (message.roomType != null && message.hasOwnProperty("roomType"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.roomType);
            if (message.number != null && message.hasOwnProperty("number"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.number);
            if (message.action != null && message.hasOwnProperty("action"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.action);
            if (message.hidden != null && message.hasOwnProperty("hidden"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.hidden);
            if (message.roomStatus != null && message.hasOwnProperty("roomStatus"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.roomStatus);
            if (message.ext != null && message.hasOwnProperty("ext"))
                for (var keys = Object.keys(message.ext), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 11, wireType 2 =*/90).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.ext[keys[i]]).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RoomInfo message, length delimited. Does not implicitly {@link pb.RoomInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.RoomInfo
         * @static
         * @param {pb.IRoomInfo} message RoomInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RoomInfo message from the specified reader or buffer.
         * @function decode
         * @memberof pb.RoomInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.RoomInfo} RoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.RoomInfo(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roomId = reader.int32();
                    break;
                case 2:
                    reader.skip().pos++;
                    if (message.userinfo === $util.emptyObject)
                        message.userinfo = {};
                    key = reader.string();
                    reader.pos++;
                    message.userinfo[key] = $root.pb.UserInfo.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.master = reader.string();
                    break;
                case 4:
                    reader.skip().pos++;
                    if (message.userStatus === $util.emptyObject)
                        message.userStatus = {};
                    key = reader.string();
                    reader.pos++;
                    message.userStatus[key] = reader.int32();
                    break;
                case 5:
                    message.createTime = reader.int64();
                    break;
                case 6:
                    message.roomType = reader.string();
                    break;
                case 7:
                    message.number = reader.int32();
                    break;
                case 8:
                    message.action = reader.int32();
                    break;
                case 9:
                    message.hidden = reader.int32();
                    break;
                case 10:
                    message.roomStatus = reader.int32();
                    break;
                case 11:
                    reader.skip().pos++;
                    if (message.ext === $util.emptyObject)
                        message.ext = {};
                    key = reader.string();
                    reader.pos++;
                    message.ext[key] = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RoomInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.RoomInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.RoomInfo} RoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RoomInfo message.
         * @function verify
         * @memberof pb.RoomInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoomInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                if (!$util.isInteger(message.roomId))
                    return "roomId: integer expected";
            if (message.userinfo != null && message.hasOwnProperty("userinfo")) {
                if (!$util.isObject(message.userinfo))
                    return "userinfo: object expected";
                var key = Object.keys(message.userinfo);
                for (var i = 0; i < key.length; ++i) {
                    var error = $root.pb.UserInfo.verify(message.userinfo[key[i]]);
                    if (error)
                        return "userinfo." + error;
                }
            }
            if (message.master != null && message.hasOwnProperty("master"))
                if (!$util.isString(message.master))
                    return "master: string expected";
            if (message.userStatus != null && message.hasOwnProperty("userStatus")) {
                if (!$util.isObject(message.userStatus))
                    return "userStatus: object expected";
                var key = Object.keys(message.userStatus);
                for (var i = 0; i < key.length; ++i)
                    if (!$util.isInteger(message.userStatus[key[i]]))
                        return "userStatus: integer{k:string} expected";
            }
            if (message.createTime != null && message.hasOwnProperty("createTime"))
                if (!$util.isInteger(message.createTime) && !(message.createTime && $util.isInteger(message.createTime.low) && $util.isInteger(message.createTime.high)))
                    return "createTime: integer|Long expected";
            if (message.roomType != null && message.hasOwnProperty("roomType"))
                if (!$util.isString(message.roomType))
                    return "roomType: string expected";
            if (message.number != null && message.hasOwnProperty("number"))
                if (!$util.isInteger(message.number))
                    return "number: integer expected";
            if (message.action != null && message.hasOwnProperty("action"))
                if (!$util.isInteger(message.action))
                    return "action: integer expected";
            if (message.hidden != null && message.hasOwnProperty("hidden"))
                if (!$util.isInteger(message.hidden))
                    return "hidden: integer expected";
            if (message.roomStatus != null && message.hasOwnProperty("roomStatus"))
                if (!$util.isInteger(message.roomStatus))
                    return "roomStatus: integer expected";
            if (message.ext != null && message.hasOwnProperty("ext")) {
                if (!$util.isObject(message.ext))
                    return "ext: object expected";
                var key = Object.keys(message.ext);
                for (var i = 0; i < key.length; ++i)
                    if (!$util.isString(message.ext[key[i]]))
                        return "ext: string{k:string} expected";
            }
            return null;
        };

        /**
         * Creates a RoomInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.RoomInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.RoomInfo} RoomInfo
         */
        RoomInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.RoomInfo)
                return object;
            var message = new $root.pb.RoomInfo();
            if (object.roomId != null)
                message.roomId = object.roomId | 0;
            if (object.userinfo) {
                if (typeof object.userinfo !== "object")
                    throw TypeError(".pb.RoomInfo.userinfo: object expected");
                message.userinfo = {};
                for (var keys = Object.keys(object.userinfo), i = 0; i < keys.length; ++i) {
                    if (typeof object.userinfo[keys[i]] !== "object")
                        throw TypeError(".pb.RoomInfo.userinfo: object expected");
                    message.userinfo[keys[i]] = $root.pb.UserInfo.fromObject(object.userinfo[keys[i]]);
                }
            }
            if (object.master != null)
                message.master = String(object.master);
            if (object.userStatus) {
                if (typeof object.userStatus !== "object")
                    throw TypeError(".pb.RoomInfo.userStatus: object expected");
                message.userStatus = {};
                for (var keys = Object.keys(object.userStatus), i = 0; i < keys.length; ++i)
                    message.userStatus[keys[i]] = object.userStatus[keys[i]] | 0;
            }
            if (object.createTime != null)
                if ($util.Long)
                    (message.createTime = $util.Long.fromValue(object.createTime)).unsigned = false;
                else if (typeof object.createTime === "string")
                    message.createTime = parseInt(object.createTime, 10);
                else if (typeof object.createTime === "number")
                    message.createTime = object.createTime;
                else if (typeof object.createTime === "object")
                    message.createTime = new $util.LongBits(object.createTime.low >>> 0, object.createTime.high >>> 0).toNumber();
            if (object.roomType != null)
                message.roomType = String(object.roomType);
            if (object.number != null)
                message.number = object.number | 0;
            if (object.action != null)
                message.action = object.action | 0;
            if (object.hidden != null)
                message.hidden = object.hidden | 0;
            if (object.roomStatus != null)
                message.roomStatus = object.roomStatus | 0;
            if (object.ext) {
                if (typeof object.ext !== "object")
                    throw TypeError(".pb.RoomInfo.ext: object expected");
                message.ext = {};
                for (var keys = Object.keys(object.ext), i = 0; i < keys.length; ++i)
                    message.ext[keys[i]] = String(object.ext[keys[i]]);
            }
            return message;
        };

        /**
         * Creates a plain object from a RoomInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.RoomInfo
         * @static
         * @param {pb.RoomInfo} message RoomInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoomInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.objects || options.defaults) {
                object.userinfo = {};
                object.userStatus = {};
                object.ext = {};
            }
            if (options.defaults) {
                object.roomId = 0;
                object.master = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.createTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.createTime = options.longs === String ? "0" : 0;
                object.roomType = "";
                object.number = 0;
                object.action = 0;
                object.hidden = 0;
                object.roomStatus = 0;
            }
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                object.roomId = message.roomId;
            var keys2;
            if (message.userinfo && (keys2 = Object.keys(message.userinfo)).length) {
                object.userinfo = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.userinfo[keys2[j]] = $root.pb.UserInfo.toObject(message.userinfo[keys2[j]], options);
            }
            if (message.master != null && message.hasOwnProperty("master"))
                object.master = message.master;
            if (message.userStatus && (keys2 = Object.keys(message.userStatus)).length) {
                object.userStatus = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.userStatus[keys2[j]] = message.userStatus[keys2[j]];
            }
            if (message.createTime != null && message.hasOwnProperty("createTime"))
                if (typeof message.createTime === "number")
                    object.createTime = options.longs === String ? String(message.createTime) : message.createTime;
                else
                    object.createTime = options.longs === String ? $util.Long.prototype.toString.call(message.createTime) : options.longs === Number ? new $util.LongBits(message.createTime.low >>> 0, message.createTime.high >>> 0).toNumber() : message.createTime;
            if (message.roomType != null && message.hasOwnProperty("roomType"))
                object.roomType = message.roomType;
            if (message.number != null && message.hasOwnProperty("number"))
                object.number = message.number;
            if (message.action != null && message.hasOwnProperty("action"))
                object.action = message.action;
            if (message.hidden != null && message.hasOwnProperty("hidden"))
                object.hidden = message.hidden;
            if (message.roomStatus != null && message.hasOwnProperty("roomStatus"))
                object.roomStatus = message.roomStatus;
            if (message.ext && (keys2 = Object.keys(message.ext)).length) {
                object.ext = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.ext[keys2[j]] = message.ext[keys2[j]];
            }
            return object;
        };

        /**
         * Converts this RoomInfo to JSON.
         * @function toJSON
         * @memberof pb.RoomInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoomInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RoomInfo;
    })();

    pb.OutRooms = (function() {

        /**
         * Properties of an OutRooms.
         * @memberof pb
         * @interface IOutRooms
         * @property {pb.IReqOutRoom|null} [reqOutRoom] OutRooms reqOutRoom
         * @property {pb.IRspOutRoom|null} [rspOutRoom] OutRooms rspOutRoom
         */

        /**
         * Constructs a new OutRooms.
         * @memberof pb
         * @classdesc Represents an OutRooms.
         * @implements IOutRooms
         * @constructor
         * @param {pb.IOutRooms=} [properties] Properties to set
         */
        function OutRooms(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * OutRooms reqOutRoom.
         * @member {pb.IReqOutRoom|null|undefined} reqOutRoom
         * @memberof pb.OutRooms
         * @instance
         */
        OutRooms.prototype.reqOutRoom = null;

        /**
         * OutRooms rspOutRoom.
         * @member {pb.IRspOutRoom|null|undefined} rspOutRoom
         * @memberof pb.OutRooms
         * @instance
         */
        OutRooms.prototype.rspOutRoom = null;

        /**
         * Creates a new OutRooms instance using the specified properties.
         * @function create
         * @memberof pb.OutRooms
         * @static
         * @param {pb.IOutRooms=} [properties] Properties to set
         * @returns {pb.OutRooms} OutRooms instance
         */
        OutRooms.create = function create(properties) {
            return new OutRooms(properties);
        };

        /**
         * Encodes the specified OutRooms message. Does not implicitly {@link pb.OutRooms.verify|verify} messages.
         * @function encode
         * @memberof pb.OutRooms
         * @static
         * @param {pb.IOutRooms} message OutRooms message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OutRooms.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.reqOutRoom != null && message.hasOwnProperty("reqOutRoom"))
                $root.pb.ReqOutRoom.encode(message.reqOutRoom, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.rspOutRoom != null && message.hasOwnProperty("rspOutRoom"))
                $root.pb.RspOutRoom.encode(message.rspOutRoom, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified OutRooms message, length delimited. Does not implicitly {@link pb.OutRooms.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.OutRooms
         * @static
         * @param {pb.IOutRooms} message OutRooms message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OutRooms.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an OutRooms message from the specified reader or buffer.
         * @function decode
         * @memberof pb.OutRooms
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.OutRooms} OutRooms
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OutRooms.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.OutRooms();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.reqOutRoom = $root.pb.ReqOutRoom.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.rspOutRoom = $root.pb.RspOutRoom.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an OutRooms message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.OutRooms
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.OutRooms} OutRooms
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OutRooms.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an OutRooms message.
         * @function verify
         * @memberof pb.OutRooms
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        OutRooms.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.reqOutRoom != null && message.hasOwnProperty("reqOutRoom")) {
                var error = $root.pb.ReqOutRoom.verify(message.reqOutRoom);
                if (error)
                    return "reqOutRoom." + error;
            }
            if (message.rspOutRoom != null && message.hasOwnProperty("rspOutRoom")) {
                var error = $root.pb.RspOutRoom.verify(message.rspOutRoom);
                if (error)
                    return "rspOutRoom." + error;
            }
            return null;
        };

        /**
         * Creates an OutRooms message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.OutRooms
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.OutRooms} OutRooms
         */
        OutRooms.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.OutRooms)
                return object;
            var message = new $root.pb.OutRooms();
            if (object.reqOutRoom != null) {
                if (typeof object.reqOutRoom !== "object")
                    throw TypeError(".pb.OutRooms.reqOutRoom: object expected");
                message.reqOutRoom = $root.pb.ReqOutRoom.fromObject(object.reqOutRoom);
            }
            if (object.rspOutRoom != null) {
                if (typeof object.rspOutRoom !== "object")
                    throw TypeError(".pb.OutRooms.rspOutRoom: object expected");
                message.rspOutRoom = $root.pb.RspOutRoom.fromObject(object.rspOutRoom);
            }
            return message;
        };

        /**
         * Creates a plain object from an OutRooms message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.OutRooms
         * @static
         * @param {pb.OutRooms} message OutRooms
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        OutRooms.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.reqOutRoom = null;
                object.rspOutRoom = null;
            }
            if (message.reqOutRoom != null && message.hasOwnProperty("reqOutRoom"))
                object.reqOutRoom = $root.pb.ReqOutRoom.toObject(message.reqOutRoom, options);
            if (message.rspOutRoom != null && message.hasOwnProperty("rspOutRoom"))
                object.rspOutRoom = $root.pb.RspOutRoom.toObject(message.rspOutRoom, options);
            return object;
        };

        /**
         * Converts this OutRooms to JSON.
         * @function toJSON
         * @memberof pb.OutRooms
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        OutRooms.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return OutRooms;
    })();

    pb.ReqOutRoom = (function() {

        /**
         * Properties of a ReqOutRoom.
         * @memberof pb
         * @interface IReqOutRoom
         * @property {string|null} [userid] ReqOutRoom userid
         */

        /**
         * Constructs a new ReqOutRoom.
         * @memberof pb
         * @classdesc Represents a ReqOutRoom.
         * @implements IReqOutRoom
         * @constructor
         * @param {pb.IReqOutRoom=} [properties] Properties to set
         */
        function ReqOutRoom(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReqOutRoom userid.
         * @member {string} userid
         * @memberof pb.ReqOutRoom
         * @instance
         */
        ReqOutRoom.prototype.userid = "";

        /**
         * Creates a new ReqOutRoom instance using the specified properties.
         * @function create
         * @memberof pb.ReqOutRoom
         * @static
         * @param {pb.IReqOutRoom=} [properties] Properties to set
         * @returns {pb.ReqOutRoom} ReqOutRoom instance
         */
        ReqOutRoom.create = function create(properties) {
            return new ReqOutRoom(properties);
        };

        /**
         * Encodes the specified ReqOutRoom message. Does not implicitly {@link pb.ReqOutRoom.verify|verify} messages.
         * @function encode
         * @memberof pb.ReqOutRoom
         * @static
         * @param {pb.IReqOutRoom} message ReqOutRoom message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqOutRoom.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userid != null && message.hasOwnProperty("userid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.userid);
            return writer;
        };

        /**
         * Encodes the specified ReqOutRoom message, length delimited. Does not implicitly {@link pb.ReqOutRoom.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.ReqOutRoom
         * @static
         * @param {pb.IReqOutRoom} message ReqOutRoom message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqOutRoom.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReqOutRoom message from the specified reader or buffer.
         * @function decode
         * @memberof pb.ReqOutRoom
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.ReqOutRoom} ReqOutRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqOutRoom.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.ReqOutRoom();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userid = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ReqOutRoom message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.ReqOutRoom
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.ReqOutRoom} ReqOutRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqOutRoom.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReqOutRoom message.
         * @function verify
         * @memberof pb.ReqOutRoom
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReqOutRoom.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userid != null && message.hasOwnProperty("userid"))
                if (!$util.isString(message.userid))
                    return "userid: string expected";
            return null;
        };

        /**
         * Creates a ReqOutRoom message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.ReqOutRoom
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.ReqOutRoom} ReqOutRoom
         */
        ReqOutRoom.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.ReqOutRoom)
                return object;
            var message = new $root.pb.ReqOutRoom();
            if (object.userid != null)
                message.userid = String(object.userid);
            return message;
        };

        /**
         * Creates a plain object from a ReqOutRoom message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.ReqOutRoom
         * @static
         * @param {pb.ReqOutRoom} message ReqOutRoom
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReqOutRoom.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.userid = "";
            if (message.userid != null && message.hasOwnProperty("userid"))
                object.userid = message.userid;
            return object;
        };

        /**
         * Converts this ReqOutRoom to JSON.
         * @function toJSON
         * @memberof pb.ReqOutRoom
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReqOutRoom.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ReqOutRoom;
    })();

    pb.RspOutRoom = (function() {

        /**
         * Properties of a RspOutRoom.
         * @memberof pb
         * @interface IRspOutRoom
         * @property {number|null} [code] RspOutRoom code
         * @property {string|null} [msg] RspOutRoom msg
         */

        /**
         * Constructs a new RspOutRoom.
         * @memberof pb
         * @classdesc Represents a RspOutRoom.
         * @implements IRspOutRoom
         * @constructor
         * @param {pb.IRspOutRoom=} [properties] Properties to set
         */
        function RspOutRoom(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RspOutRoom code.
         * @member {number} code
         * @memberof pb.RspOutRoom
         * @instance
         */
        RspOutRoom.prototype.code = 0;

        /**
         * RspOutRoom msg.
         * @member {string} msg
         * @memberof pb.RspOutRoom
         * @instance
         */
        RspOutRoom.prototype.msg = "";

        /**
         * Creates a new RspOutRoom instance using the specified properties.
         * @function create
         * @memberof pb.RspOutRoom
         * @static
         * @param {pb.IRspOutRoom=} [properties] Properties to set
         * @returns {pb.RspOutRoom} RspOutRoom instance
         */
        RspOutRoom.create = function create(properties) {
            return new RspOutRoom(properties);
        };

        /**
         * Encodes the specified RspOutRoom message. Does not implicitly {@link pb.RspOutRoom.verify|verify} messages.
         * @function encode
         * @memberof pb.RspOutRoom
         * @static
         * @param {pb.IRspOutRoom} message RspOutRoom message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RspOutRoom.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && message.hasOwnProperty("code"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
            if (message.msg != null && message.hasOwnProperty("msg"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.msg);
            return writer;
        };

        /**
         * Encodes the specified RspOutRoom message, length delimited. Does not implicitly {@link pb.RspOutRoom.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.RspOutRoom
         * @static
         * @param {pb.IRspOutRoom} message RspOutRoom message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RspOutRoom.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RspOutRoom message from the specified reader or buffer.
         * @function decode
         * @memberof pb.RspOutRoom
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.RspOutRoom} RspOutRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RspOutRoom.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.RspOutRoom();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.code = reader.int32();
                    break;
                case 2:
                    message.msg = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RspOutRoom message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.RspOutRoom
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.RspOutRoom} RspOutRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RspOutRoom.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RspOutRoom message.
         * @function verify
         * @memberof pb.RspOutRoom
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RspOutRoom.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.msg != null && message.hasOwnProperty("msg"))
                if (!$util.isString(message.msg))
                    return "msg: string expected";
            return null;
        };

        /**
         * Creates a RspOutRoom message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.RspOutRoom
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.RspOutRoom} RspOutRoom
         */
        RspOutRoom.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.RspOutRoom)
                return object;
            var message = new $root.pb.RspOutRoom();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.msg != null)
                message.msg = String(object.msg);
            return message;
        };

        /**
         * Creates a plain object from a RspOutRoom message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.RspOutRoom
         * @static
         * @param {pb.RspOutRoom} message RspOutRoom
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RspOutRoom.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.code = 0;
                object.msg = "";
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.msg != null && message.hasOwnProperty("msg"))
                object.msg = message.msg;
            return object;
        };

        /**
         * Converts this RspOutRoom to JSON.
         * @function toJSON
         * @memberof pb.RspOutRoom
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RspOutRoom.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RspOutRoom;
    })();

    pb.GamePlay = (function() {

        /**
         * Properties of a GamePlay.
         * @memberof pb
         * @interface IGamePlay
         * @property {pb.IRspGamePlay|null} [rspGamePlay] GamePlay rspGamePlay
         */

        /**
         * Constructs a new GamePlay.
         * @memberof pb
         * @classdesc Represents a GamePlay.
         * @implements IGamePlay
         * @constructor
         * @param {pb.IGamePlay=} [properties] Properties to set
         */
        function GamePlay(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GamePlay rspGamePlay.
         * @member {pb.IRspGamePlay|null|undefined} rspGamePlay
         * @memberof pb.GamePlay
         * @instance
         */
        GamePlay.prototype.rspGamePlay = null;

        /**
         * Creates a new GamePlay instance using the specified properties.
         * @function create
         * @memberof pb.GamePlay
         * @static
         * @param {pb.IGamePlay=} [properties] Properties to set
         * @returns {pb.GamePlay} GamePlay instance
         */
        GamePlay.create = function create(properties) {
            return new GamePlay(properties);
        };

        /**
         * Encodes the specified GamePlay message. Does not implicitly {@link pb.GamePlay.verify|verify} messages.
         * @function encode
         * @memberof pb.GamePlay
         * @static
         * @param {pb.IGamePlay} message GamePlay message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GamePlay.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.rspGamePlay != null && message.hasOwnProperty("rspGamePlay"))
                $root.pb.RspGamePlay.encode(message.rspGamePlay, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GamePlay message, length delimited. Does not implicitly {@link pb.GamePlay.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.GamePlay
         * @static
         * @param {pb.IGamePlay} message GamePlay message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GamePlay.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GamePlay message from the specified reader or buffer.
         * @function decode
         * @memberof pb.GamePlay
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.GamePlay} GamePlay
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GamePlay.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.GamePlay();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.rspGamePlay = $root.pb.RspGamePlay.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GamePlay message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.GamePlay
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.GamePlay} GamePlay
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GamePlay.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GamePlay message.
         * @function verify
         * @memberof pb.GamePlay
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GamePlay.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.rspGamePlay != null && message.hasOwnProperty("rspGamePlay")) {
                var error = $root.pb.RspGamePlay.verify(message.rspGamePlay);
                if (error)
                    return "rspGamePlay." + error;
            }
            return null;
        };

        /**
         * Creates a GamePlay message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.GamePlay
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.GamePlay} GamePlay
         */
        GamePlay.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.GamePlay)
                return object;
            var message = new $root.pb.GamePlay();
            if (object.rspGamePlay != null) {
                if (typeof object.rspGamePlay !== "object")
                    throw TypeError(".pb.GamePlay.rspGamePlay: object expected");
                message.rspGamePlay = $root.pb.RspGamePlay.fromObject(object.rspGamePlay);
            }
            return message;
        };

        /**
         * Creates a plain object from a GamePlay message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.GamePlay
         * @static
         * @param {pb.GamePlay} message GamePlay
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GamePlay.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.rspGamePlay = null;
            if (message.rspGamePlay != null && message.hasOwnProperty("rspGamePlay"))
                object.rspGamePlay = $root.pb.RspGamePlay.toObject(message.rspGamePlay, options);
            return object;
        };

        /**
         * Converts this GamePlay to JSON.
         * @function toJSON
         * @memberof pb.GamePlay
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GamePlay.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GamePlay;
    })();

    pb.RspGamePlay = (function() {

        /**
         * Properties of a RspGamePlay.
         * @memberof pb
         * @interface IRspGamePlay
         * @property {number|null} [code] RspGamePlay code
         * @property {string|null} [msg] RspGamePlay msg
         */

        /**
         * Constructs a new RspGamePlay.
         * @memberof pb
         * @classdesc Represents a RspGamePlay.
         * @implements IRspGamePlay
         * @constructor
         * @param {pb.IRspGamePlay=} [properties] Properties to set
         */
        function RspGamePlay(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RspGamePlay code.
         * @member {number} code
         * @memberof pb.RspGamePlay
         * @instance
         */
        RspGamePlay.prototype.code = 0;

        /**
         * RspGamePlay msg.
         * @member {string} msg
         * @memberof pb.RspGamePlay
         * @instance
         */
        RspGamePlay.prototype.msg = "";

        /**
         * Creates a new RspGamePlay instance using the specified properties.
         * @function create
         * @memberof pb.RspGamePlay
         * @static
         * @param {pb.IRspGamePlay=} [properties] Properties to set
         * @returns {pb.RspGamePlay} RspGamePlay instance
         */
        RspGamePlay.create = function create(properties) {
            return new RspGamePlay(properties);
        };

        /**
         * Encodes the specified RspGamePlay message. Does not implicitly {@link pb.RspGamePlay.verify|verify} messages.
         * @function encode
         * @memberof pb.RspGamePlay
         * @static
         * @param {pb.IRspGamePlay} message RspGamePlay message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RspGamePlay.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && message.hasOwnProperty("code"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
            if (message.msg != null && message.hasOwnProperty("msg"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.msg);
            return writer;
        };

        /**
         * Encodes the specified RspGamePlay message, length delimited. Does not implicitly {@link pb.RspGamePlay.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.RspGamePlay
         * @static
         * @param {pb.IRspGamePlay} message RspGamePlay message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RspGamePlay.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RspGamePlay message from the specified reader or buffer.
         * @function decode
         * @memberof pb.RspGamePlay
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.RspGamePlay} RspGamePlay
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RspGamePlay.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.RspGamePlay();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.code = reader.int32();
                    break;
                case 2:
                    message.msg = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RspGamePlay message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.RspGamePlay
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.RspGamePlay} RspGamePlay
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RspGamePlay.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RspGamePlay message.
         * @function verify
         * @memberof pb.RspGamePlay
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RspGamePlay.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.msg != null && message.hasOwnProperty("msg"))
                if (!$util.isString(message.msg))
                    return "msg: string expected";
            return null;
        };

        /**
         * Creates a RspGamePlay message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.RspGamePlay
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.RspGamePlay} RspGamePlay
         */
        RspGamePlay.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.RspGamePlay)
                return object;
            var message = new $root.pb.RspGamePlay();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.msg != null)
                message.msg = String(object.msg);
            return message;
        };

        /**
         * Creates a plain object from a RspGamePlay message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.RspGamePlay
         * @static
         * @param {pb.RspGamePlay} message RspGamePlay
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RspGamePlay.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.code = 0;
                object.msg = "";
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.msg != null && message.hasOwnProperty("msg"))
                object.msg = message.msg;
            return object;
        };

        /**
         * Converts this RspGamePlay to JSON.
         * @function toJSON
         * @memberof pb.RspGamePlay
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RspGamePlay.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RspGamePlay;
    })();

    pb.GameOver = (function() {

        /**
         * Properties of a GameOver.
         * @memberof pb
         * @interface IGameOver
         * @property {pb.IRspGameOver|null} [rspGameOver] GameOver rspGameOver
         */

        /**
         * Constructs a new GameOver.
         * @memberof pb
         * @classdesc Represents a GameOver.
         * @implements IGameOver
         * @constructor
         * @param {pb.IGameOver=} [properties] Properties to set
         */
        function GameOver(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameOver rspGameOver.
         * @member {pb.IRspGameOver|null|undefined} rspGameOver
         * @memberof pb.GameOver
         * @instance
         */
        GameOver.prototype.rspGameOver = null;

        /**
         * Creates a new GameOver instance using the specified properties.
         * @function create
         * @memberof pb.GameOver
         * @static
         * @param {pb.IGameOver=} [properties] Properties to set
         * @returns {pb.GameOver} GameOver instance
         */
        GameOver.create = function create(properties) {
            return new GameOver(properties);
        };

        /**
         * Encodes the specified GameOver message. Does not implicitly {@link pb.GameOver.verify|verify} messages.
         * @function encode
         * @memberof pb.GameOver
         * @static
         * @param {pb.IGameOver} message GameOver message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameOver.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.rspGameOver != null && message.hasOwnProperty("rspGameOver"))
                $root.pb.RspGameOver.encode(message.rspGameOver, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GameOver message, length delimited. Does not implicitly {@link pb.GameOver.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.GameOver
         * @static
         * @param {pb.IGameOver} message GameOver message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameOver.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameOver message from the specified reader or buffer.
         * @function decode
         * @memberof pb.GameOver
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.GameOver} GameOver
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameOver.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.GameOver();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.rspGameOver = $root.pb.RspGameOver.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameOver message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.GameOver
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.GameOver} GameOver
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameOver.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameOver message.
         * @function verify
         * @memberof pb.GameOver
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameOver.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.rspGameOver != null && message.hasOwnProperty("rspGameOver")) {
                var error = $root.pb.RspGameOver.verify(message.rspGameOver);
                if (error)
                    return "rspGameOver." + error;
            }
            return null;
        };

        /**
         * Creates a GameOver message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.GameOver
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.GameOver} GameOver
         */
        GameOver.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.GameOver)
                return object;
            var message = new $root.pb.GameOver();
            if (object.rspGameOver != null) {
                if (typeof object.rspGameOver !== "object")
                    throw TypeError(".pb.GameOver.rspGameOver: object expected");
                message.rspGameOver = $root.pb.RspGameOver.fromObject(object.rspGameOver);
            }
            return message;
        };

        /**
         * Creates a plain object from a GameOver message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.GameOver
         * @static
         * @param {pb.GameOver} message GameOver
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameOver.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.rspGameOver = null;
            if (message.rspGameOver != null && message.hasOwnProperty("rspGameOver"))
                object.rspGameOver = $root.pb.RspGameOver.toObject(message.rspGameOver, options);
            return object;
        };

        /**
         * Converts this GameOver to JSON.
         * @function toJSON
         * @memberof pb.GameOver
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameOver.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameOver;
    })();

    pb.RspGameOver = (function() {

        /**
         * Properties of a RspGameOver.
         * @memberof pb
         * @interface IRspGameOver
         * @property {number|null} [code] RspGameOver code
         * @property {string|null} [msg] RspGameOver msg
         */

        /**
         * Constructs a new RspGameOver.
         * @memberof pb
         * @classdesc Represents a RspGameOver.
         * @implements IRspGameOver
         * @constructor
         * @param {pb.IRspGameOver=} [properties] Properties to set
         */
        function RspGameOver(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RspGameOver code.
         * @member {number} code
         * @memberof pb.RspGameOver
         * @instance
         */
        RspGameOver.prototype.code = 0;

        /**
         * RspGameOver msg.
         * @member {string} msg
         * @memberof pb.RspGameOver
         * @instance
         */
        RspGameOver.prototype.msg = "";

        /**
         * Creates a new RspGameOver instance using the specified properties.
         * @function create
         * @memberof pb.RspGameOver
         * @static
         * @param {pb.IRspGameOver=} [properties] Properties to set
         * @returns {pb.RspGameOver} RspGameOver instance
         */
        RspGameOver.create = function create(properties) {
            return new RspGameOver(properties);
        };

        /**
         * Encodes the specified RspGameOver message. Does not implicitly {@link pb.RspGameOver.verify|verify} messages.
         * @function encode
         * @memberof pb.RspGameOver
         * @static
         * @param {pb.IRspGameOver} message RspGameOver message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RspGameOver.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && message.hasOwnProperty("code"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
            if (message.msg != null && message.hasOwnProperty("msg"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.msg);
            return writer;
        };

        /**
         * Encodes the specified RspGameOver message, length delimited. Does not implicitly {@link pb.RspGameOver.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.RspGameOver
         * @static
         * @param {pb.IRspGameOver} message RspGameOver message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RspGameOver.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RspGameOver message from the specified reader or buffer.
         * @function decode
         * @memberof pb.RspGameOver
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.RspGameOver} RspGameOver
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RspGameOver.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.RspGameOver();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.code = reader.int32();
                    break;
                case 2:
                    message.msg = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RspGameOver message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.RspGameOver
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.RspGameOver} RspGameOver
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RspGameOver.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RspGameOver message.
         * @function verify
         * @memberof pb.RspGameOver
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RspGameOver.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.msg != null && message.hasOwnProperty("msg"))
                if (!$util.isString(message.msg))
                    return "msg: string expected";
            return null;
        };

        /**
         * Creates a RspGameOver message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.RspGameOver
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.RspGameOver} RspGameOver
         */
        RspGameOver.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.RspGameOver)
                return object;
            var message = new $root.pb.RspGameOver();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.msg != null)
                message.msg = String(object.msg);
            return message;
        };

        /**
         * Creates a plain object from a RspGameOver message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.RspGameOver
         * @static
         * @param {pb.RspGameOver} message RspGameOver
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RspGameOver.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.code = 0;
                object.msg = "";
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.msg != null && message.hasOwnProperty("msg"))
                object.msg = message.msg;
            return object;
        };

        /**
         * Converts this RspGameOver to JSON.
         * @function toJSON
         * @memberof pb.RspGameOver
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RspGameOver.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RspGameOver;
    })();

    pb.Reconnection = (function() {

        /**
         * Properties of a Reconnection.
         * @memberof pb
         * @interface IReconnection
         * @property {pb.IRspReconnection|null} [rspRec] Reconnection rspRec
         */

        /**
         * Constructs a new Reconnection.
         * @memberof pb
         * @classdesc Represents a Reconnection.
         * @implements IReconnection
         * @constructor
         * @param {pb.IReconnection=} [properties] Properties to set
         */
        function Reconnection(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Reconnection rspRec.
         * @member {pb.IRspReconnection|null|undefined} rspRec
         * @memberof pb.Reconnection
         * @instance
         */
        Reconnection.prototype.rspRec = null;

        /**
         * Creates a new Reconnection instance using the specified properties.
         * @function create
         * @memberof pb.Reconnection
         * @static
         * @param {pb.IReconnection=} [properties] Properties to set
         * @returns {pb.Reconnection} Reconnection instance
         */
        Reconnection.create = function create(properties) {
            return new Reconnection(properties);
        };

        /**
         * Encodes the specified Reconnection message. Does not implicitly {@link pb.Reconnection.verify|verify} messages.
         * @function encode
         * @memberof pb.Reconnection
         * @static
         * @param {pb.IReconnection} message Reconnection message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Reconnection.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.rspRec != null && message.hasOwnProperty("rspRec"))
                $root.pb.RspReconnection.encode(message.rspRec, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Reconnection message, length delimited. Does not implicitly {@link pb.Reconnection.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Reconnection
         * @static
         * @param {pb.IReconnection} message Reconnection message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Reconnection.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Reconnection message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Reconnection
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Reconnection} Reconnection
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Reconnection.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.Reconnection();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 2:
                    message.rspRec = $root.pb.RspReconnection.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Reconnection message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Reconnection
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Reconnection} Reconnection
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Reconnection.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Reconnection message.
         * @function verify
         * @memberof pb.Reconnection
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Reconnection.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.rspRec != null && message.hasOwnProperty("rspRec")) {
                var error = $root.pb.RspReconnection.verify(message.rspRec);
                if (error)
                    return "rspRec." + error;
            }
            return null;
        };

        /**
         * Creates a Reconnection message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Reconnection
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Reconnection} Reconnection
         */
        Reconnection.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.Reconnection)
                return object;
            var message = new $root.pb.Reconnection();
            if (object.rspRec != null) {
                if (typeof object.rspRec !== "object")
                    throw TypeError(".pb.Reconnection.rspRec: object expected");
                message.rspRec = $root.pb.RspReconnection.fromObject(object.rspRec);
            }
            return message;
        };

        /**
         * Creates a plain object from a Reconnection message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Reconnection
         * @static
         * @param {pb.Reconnection} message Reconnection
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Reconnection.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.rspRec = null;
            if (message.rspRec != null && message.hasOwnProperty("rspRec"))
                object.rspRec = $root.pb.RspReconnection.toObject(message.rspRec, options);
            return object;
        };

        /**
         * Converts this Reconnection to JSON.
         * @function toJSON
         * @memberof pb.Reconnection
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Reconnection.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Reconnection;
    })();

    pb.RspReconnection = (function() {

        /**
         * Properties of a RspReconnection.
         * @memberof pb
         * @interface IRspReconnection
         * @property {number|null} [code] RspReconnection code
         * @property {string|null} [msg] RspReconnection msg
         * @property {number|null} [roomId] RspReconnection roomId
         * @property {Object.<string,pb.IUserInfo>|null} [userinfo] RspReconnection userinfo
         * @property {Object.<string,string>|null} [ext] RspReconnection ext
         */

        /**
         * Constructs a new RspReconnection.
         * @memberof pb
         * @classdesc Represents a RspReconnection.
         * @implements IRspReconnection
         * @constructor
         * @param {pb.IRspReconnection=} [properties] Properties to set
         */
        function RspReconnection(properties) {
            this.userinfo = {};
            this.ext = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RspReconnection code.
         * @member {number} code
         * @memberof pb.RspReconnection
         * @instance
         */
        RspReconnection.prototype.code = 0;

        /**
         * RspReconnection msg.
         * @member {string} msg
         * @memberof pb.RspReconnection
         * @instance
         */
        RspReconnection.prototype.msg = "";

        /**
         * RspReconnection roomId.
         * @member {number} roomId
         * @memberof pb.RspReconnection
         * @instance
         */
        RspReconnection.prototype.roomId = 0;

        /**
         * RspReconnection userinfo.
         * @member {Object.<string,pb.IUserInfo>} userinfo
         * @memberof pb.RspReconnection
         * @instance
         */
        RspReconnection.prototype.userinfo = $util.emptyObject;

        /**
         * RspReconnection ext.
         * @member {Object.<string,string>} ext
         * @memberof pb.RspReconnection
         * @instance
         */
        RspReconnection.prototype.ext = $util.emptyObject;

        /**
         * Creates a new RspReconnection instance using the specified properties.
         * @function create
         * @memberof pb.RspReconnection
         * @static
         * @param {pb.IRspReconnection=} [properties] Properties to set
         * @returns {pb.RspReconnection} RspReconnection instance
         */
        RspReconnection.create = function create(properties) {
            return new RspReconnection(properties);
        };

        /**
         * Encodes the specified RspReconnection message. Does not implicitly {@link pb.RspReconnection.verify|verify} messages.
         * @function encode
         * @memberof pb.RspReconnection
         * @static
         * @param {pb.IRspReconnection} message RspReconnection message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RspReconnection.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && message.hasOwnProperty("code"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
            if (message.msg != null && message.hasOwnProperty("msg"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.msg);
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.roomId);
            if (message.userinfo != null && message.hasOwnProperty("userinfo"))
                for (var keys = Object.keys(message.userinfo), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 4, wireType 2 =*/34).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                    $root.pb.UserInfo.encode(message.userinfo[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                }
            if (message.ext != null && message.hasOwnProperty("ext"))
                for (var keys = Object.keys(message.ext), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 5, wireType 2 =*/42).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.ext[keys[i]]).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RspReconnection message, length delimited. Does not implicitly {@link pb.RspReconnection.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.RspReconnection
         * @static
         * @param {pb.IRspReconnection} message RspReconnection message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RspReconnection.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RspReconnection message from the specified reader or buffer.
         * @function decode
         * @memberof pb.RspReconnection
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.RspReconnection} RspReconnection
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RspReconnection.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.RspReconnection(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.code = reader.int32();
                    break;
                case 2:
                    message.msg = reader.string();
                    break;
                case 3:
                    message.roomId = reader.int32();
                    break;
                case 4:
                    reader.skip().pos++;
                    if (message.userinfo === $util.emptyObject)
                        message.userinfo = {};
                    key = reader.string();
                    reader.pos++;
                    message.userinfo[key] = $root.pb.UserInfo.decode(reader, reader.uint32());
                    break;
                case 5:
                    reader.skip().pos++;
                    if (message.ext === $util.emptyObject)
                        message.ext = {};
                    key = reader.string();
                    reader.pos++;
                    message.ext[key] = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RspReconnection message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.RspReconnection
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.RspReconnection} RspReconnection
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RspReconnection.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RspReconnection message.
         * @function verify
         * @memberof pb.RspReconnection
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RspReconnection.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.msg != null && message.hasOwnProperty("msg"))
                if (!$util.isString(message.msg))
                    return "msg: string expected";
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                if (!$util.isInteger(message.roomId))
                    return "roomId: integer expected";
            if (message.userinfo != null && message.hasOwnProperty("userinfo")) {
                if (!$util.isObject(message.userinfo))
                    return "userinfo: object expected";
                var key = Object.keys(message.userinfo);
                for (var i = 0; i < key.length; ++i) {
                    var error = $root.pb.UserInfo.verify(message.userinfo[key[i]]);
                    if (error)
                        return "userinfo." + error;
                }
            }
            if (message.ext != null && message.hasOwnProperty("ext")) {
                if (!$util.isObject(message.ext))
                    return "ext: object expected";
                var key = Object.keys(message.ext);
                for (var i = 0; i < key.length; ++i)
                    if (!$util.isString(message.ext[key[i]]))
                        return "ext: string{k:string} expected";
            }
            return null;
        };

        /**
         * Creates a RspReconnection message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.RspReconnection
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.RspReconnection} RspReconnection
         */
        RspReconnection.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.RspReconnection)
                return object;
            var message = new $root.pb.RspReconnection();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.msg != null)
                message.msg = String(object.msg);
            if (object.roomId != null)
                message.roomId = object.roomId | 0;
            if (object.userinfo) {
                if (typeof object.userinfo !== "object")
                    throw TypeError(".pb.RspReconnection.userinfo: object expected");
                message.userinfo = {};
                for (var keys = Object.keys(object.userinfo), i = 0; i < keys.length; ++i) {
                    if (typeof object.userinfo[keys[i]] !== "object")
                        throw TypeError(".pb.RspReconnection.userinfo: object expected");
                    message.userinfo[keys[i]] = $root.pb.UserInfo.fromObject(object.userinfo[keys[i]]);
                }
            }
            if (object.ext) {
                if (typeof object.ext !== "object")
                    throw TypeError(".pb.RspReconnection.ext: object expected");
                message.ext = {};
                for (var keys = Object.keys(object.ext), i = 0; i < keys.length; ++i)
                    message.ext[keys[i]] = String(object.ext[keys[i]]);
            }
            return message;
        };

        /**
         * Creates a plain object from a RspReconnection message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.RspReconnection
         * @static
         * @param {pb.RspReconnection} message RspReconnection
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RspReconnection.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.objects || options.defaults) {
                object.userinfo = {};
                object.ext = {};
            }
            if (options.defaults) {
                object.code = 0;
                object.msg = "";
                object.roomId = 0;
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.msg != null && message.hasOwnProperty("msg"))
                object.msg = message.msg;
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                object.roomId = message.roomId;
            var keys2;
            if (message.userinfo && (keys2 = Object.keys(message.userinfo)).length) {
                object.userinfo = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.userinfo[keys2[j]] = $root.pb.UserInfo.toObject(message.userinfo[keys2[j]], options);
            }
            if (message.ext && (keys2 = Object.keys(message.ext)).length) {
                object.ext = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.ext[keys2[j]] = message.ext[keys2[j]];
            }
            return object;
        };

        /**
         * Converts this RspReconnection to JSON.
         * @function toJSON
         * @memberof pb.RspReconnection
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RspReconnection.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RspReconnection;
    })();

    pb.Boom = (function() {

        /**
         * Properties of a Boom.
         * @memberof pb
         * @interface IBoom
         * @property {Object.<string,pb.IBoomUserXY>|null} [userxy] Boom userxy
         * @property {pb.IBoomBallXY|null} [ballxy] Boom ballxy
         */

        /**
         * Constructs a new Boom.
         * @memberof pb
         * @classdesc Represents a Boom.
         * @implements IBoom
         * @constructor
         * @param {pb.IBoom=} [properties] Properties to set
         */
        function Boom(properties) {
            this.userxy = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Boom userxy.
         * @member {Object.<string,pb.IBoomUserXY>} userxy
         * @memberof pb.Boom
         * @instance
         */
        Boom.prototype.userxy = $util.emptyObject;

        /**
         * Boom ballxy.
         * @member {pb.IBoomBallXY|null|undefined} ballxy
         * @memberof pb.Boom
         * @instance
         */
        Boom.prototype.ballxy = null;

        /**
         * Creates a new Boom instance using the specified properties.
         * @function create
         * @memberof pb.Boom
         * @static
         * @param {pb.IBoom=} [properties] Properties to set
         * @returns {pb.Boom} Boom instance
         */
        Boom.create = function create(properties) {
            return new Boom(properties);
        };

        /**
         * Encodes the specified Boom message. Does not implicitly {@link pb.Boom.verify|verify} messages.
         * @function encode
         * @memberof pb.Boom
         * @static
         * @param {pb.IBoom} message Boom message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Boom.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userxy != null && message.hasOwnProperty("userxy"))
                for (var keys = Object.keys(message.userxy), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                    $root.pb.BoomUserXY.encode(message.userxy[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                }
            if (message.ballxy != null && message.hasOwnProperty("ballxy"))
                $root.pb.BoomBallXY.encode(message.ballxy, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Boom message, length delimited. Does not implicitly {@link pb.Boom.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Boom
         * @static
         * @param {pb.IBoom} message Boom message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Boom.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Boom message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Boom
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Boom} Boom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Boom.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.Boom(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    reader.skip().pos++;
                    if (message.userxy === $util.emptyObject)
                        message.userxy = {};
                    key = reader.string();
                    reader.pos++;
                    message.userxy[key] = $root.pb.BoomUserXY.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.ballxy = $root.pb.BoomBallXY.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Boom message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Boom
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Boom} Boom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Boom.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Boom message.
         * @function verify
         * @memberof pb.Boom
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Boom.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userxy != null && message.hasOwnProperty("userxy")) {
                if (!$util.isObject(message.userxy))
                    return "userxy: object expected";
                var key = Object.keys(message.userxy);
                for (var i = 0; i < key.length; ++i) {
                    var error = $root.pb.BoomUserXY.verify(message.userxy[key[i]]);
                    if (error)
                        return "userxy." + error;
                }
            }
            if (message.ballxy != null && message.hasOwnProperty("ballxy")) {
                var error = $root.pb.BoomBallXY.verify(message.ballxy);
                if (error)
                    return "ballxy." + error;
            }
            return null;
        };

        /**
         * Creates a Boom message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Boom
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Boom} Boom
         */
        Boom.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.Boom)
                return object;
            var message = new $root.pb.Boom();
            if (object.userxy) {
                if (typeof object.userxy !== "object")
                    throw TypeError(".pb.Boom.userxy: object expected");
                message.userxy = {};
                for (var keys = Object.keys(object.userxy), i = 0; i < keys.length; ++i) {
                    if (typeof object.userxy[keys[i]] !== "object")
                        throw TypeError(".pb.Boom.userxy: object expected");
                    message.userxy[keys[i]] = $root.pb.BoomUserXY.fromObject(object.userxy[keys[i]]);
                }
            }
            if (object.ballxy != null) {
                if (typeof object.ballxy !== "object")
                    throw TypeError(".pb.Boom.ballxy: object expected");
                message.ballxy = $root.pb.BoomBallXY.fromObject(object.ballxy);
            }
            return message;
        };

        /**
         * Creates a plain object from a Boom message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Boom
         * @static
         * @param {pb.Boom} message Boom
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Boom.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.objects || options.defaults)
                object.userxy = {};
            if (options.defaults)
                object.ballxy = null;
            var keys2;
            if (message.userxy && (keys2 = Object.keys(message.userxy)).length) {
                object.userxy = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.userxy[keys2[j]] = $root.pb.BoomUserXY.toObject(message.userxy[keys2[j]], options);
            }
            if (message.ballxy != null && message.hasOwnProperty("ballxy"))
                object.ballxy = $root.pb.BoomBallXY.toObject(message.ballxy, options);
            return object;
        };

        /**
         * Converts this Boom to JSON.
         * @function toJSON
         * @memberof pb.Boom
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Boom.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Boom;
    })();

    pb.BoomUserXY = (function() {

        /**
         * Properties of a BoomUserXY.
         * @memberof pb
         * @interface IBoomUserXY
         * @property {number|null} [x] BoomUserXY x
         * @property {number|null} [y] BoomUserXY y
         * @property {number|null} [blood] BoomUserXY blood
         * @property {Array.<pb.IBoomBuff>|null} [buff] BoomUserXY buff
         * @property {number|null} [angle] BoomUserXY angle
         * @property {number|Long|null} [time] BoomUserXY time
         */

        /**
         * Constructs a new BoomUserXY.
         * @memberof pb
         * @classdesc Represents a BoomUserXY.
         * @implements IBoomUserXY
         * @constructor
         * @param {pb.IBoomUserXY=} [properties] Properties to set
         */
        function BoomUserXY(properties) {
            this.buff = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BoomUserXY x.
         * @member {number} x
         * @memberof pb.BoomUserXY
         * @instance
         */
        BoomUserXY.prototype.x = 0;

        /**
         * BoomUserXY y.
         * @member {number} y
         * @memberof pb.BoomUserXY
         * @instance
         */
        BoomUserXY.prototype.y = 0;

        /**
         * BoomUserXY blood.
         * @member {number} blood
         * @memberof pb.BoomUserXY
         * @instance
         */
        BoomUserXY.prototype.blood = 0;

        /**
         * BoomUserXY buff.
         * @member {Array.<pb.IBoomBuff>} buff
         * @memberof pb.BoomUserXY
         * @instance
         */
        BoomUserXY.prototype.buff = $util.emptyArray;

        /**
         * BoomUserXY angle.
         * @member {number} angle
         * @memberof pb.BoomUserXY
         * @instance
         */
        BoomUserXY.prototype.angle = 0;

        /**
         * BoomUserXY time.
         * @member {number|Long} time
         * @memberof pb.BoomUserXY
         * @instance
         */
        BoomUserXY.prototype.time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new BoomUserXY instance using the specified properties.
         * @function create
         * @memberof pb.BoomUserXY
         * @static
         * @param {pb.IBoomUserXY=} [properties] Properties to set
         * @returns {pb.BoomUserXY} BoomUserXY instance
         */
        BoomUserXY.create = function create(properties) {
            return new BoomUserXY(properties);
        };

        /**
         * Encodes the specified BoomUserXY message. Does not implicitly {@link pb.BoomUserXY.verify|verify} messages.
         * @function encode
         * @memberof pb.BoomUserXY
         * @static
         * @param {pb.IBoomUserXY} message BoomUserXY message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BoomUserXY.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.x != null && message.hasOwnProperty("x"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.x);
            if (message.y != null && message.hasOwnProperty("y"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.y);
            if (message.blood != null && message.hasOwnProperty("blood"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.blood);
            if (message.buff != null && message.buff.length)
                for (var i = 0; i < message.buff.length; ++i)
                    $root.pb.BoomBuff.encode(message.buff[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.angle != null && message.hasOwnProperty("angle"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.angle);
            if (message.time != null && message.hasOwnProperty("time"))
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.time);
            return writer;
        };

        /**
         * Encodes the specified BoomUserXY message, length delimited. Does not implicitly {@link pb.BoomUserXY.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.BoomUserXY
         * @static
         * @param {pb.IBoomUserXY} message BoomUserXY message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BoomUserXY.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BoomUserXY message from the specified reader or buffer.
         * @function decode
         * @memberof pb.BoomUserXY
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.BoomUserXY} BoomUserXY
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BoomUserXY.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.BoomUserXY();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.x = reader.int32();
                    break;
                case 2:
                    message.y = reader.int32();
                    break;
                case 3:
                    message.blood = reader.int32();
                    break;
                case 4:
                    if (!(message.buff && message.buff.length))
                        message.buff = [];
                    message.buff.push($root.pb.BoomBuff.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.angle = reader.int32();
                    break;
                case 6:
                    message.time = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BoomUserXY message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.BoomUserXY
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.BoomUserXY} BoomUserXY
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BoomUserXY.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BoomUserXY message.
         * @function verify
         * @memberof pb.BoomUserXY
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BoomUserXY.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (!$util.isInteger(message.x))
                    return "x: integer expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (!$util.isInteger(message.y))
                    return "y: integer expected";
            if (message.blood != null && message.hasOwnProperty("blood"))
                if (!$util.isInteger(message.blood))
                    return "blood: integer expected";
            if (message.buff != null && message.hasOwnProperty("buff")) {
                if (!Array.isArray(message.buff))
                    return "buff: array expected";
                for (var i = 0; i < message.buff.length; ++i) {
                    var error = $root.pb.BoomBuff.verify(message.buff[i]);
                    if (error)
                        return "buff." + error;
                }
            }
            if (message.angle != null && message.hasOwnProperty("angle"))
                if (!$util.isInteger(message.angle))
                    return "angle: integer expected";
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                    return "time: integer|Long expected";
            return null;
        };

        /**
         * Creates a BoomUserXY message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.BoomUserXY
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.BoomUserXY} BoomUserXY
         */
        BoomUserXY.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.BoomUserXY)
                return object;
            var message = new $root.pb.BoomUserXY();
            if (object.x != null)
                message.x = object.x | 0;
            if (object.y != null)
                message.y = object.y | 0;
            if (object.blood != null)
                message.blood = object.blood | 0;
            if (object.buff) {
                if (!Array.isArray(object.buff))
                    throw TypeError(".pb.BoomUserXY.buff: array expected");
                message.buff = [];
                for (var i = 0; i < object.buff.length; ++i) {
                    if (typeof object.buff[i] !== "object")
                        throw TypeError(".pb.BoomUserXY.buff: object expected");
                    message.buff[i] = $root.pb.BoomBuff.fromObject(object.buff[i]);
                }
            }
            if (object.angle != null)
                message.angle = object.angle | 0;
            if (object.time != null)
                if ($util.Long)
                    (message.time = $util.Long.fromValue(object.time)).unsigned = false;
                else if (typeof object.time === "string")
                    message.time = parseInt(object.time, 10);
                else if (typeof object.time === "number")
                    message.time = object.time;
                else if (typeof object.time === "object")
                    message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a BoomUserXY message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.BoomUserXY
         * @static
         * @param {pb.BoomUserXY} message BoomUserXY
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BoomUserXY.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.buff = [];
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
                object.blood = 0;
                object.angle = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.time = options.longs === String ? "0" : 0;
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = message.y;
            if (message.blood != null && message.hasOwnProperty("blood"))
                object.blood = message.blood;
            if (message.buff && message.buff.length) {
                object.buff = [];
                for (var j = 0; j < message.buff.length; ++j)
                    object.buff[j] = $root.pb.BoomBuff.toObject(message.buff[j], options);
            }
            if (message.angle != null && message.hasOwnProperty("angle"))
                object.angle = message.angle;
            if (message.time != null && message.hasOwnProperty("time"))
                if (typeof message.time === "number")
                    object.time = options.longs === String ? String(message.time) : message.time;
                else
                    object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber() : message.time;
            return object;
        };

        /**
         * Converts this BoomUserXY to JSON.
         * @function toJSON
         * @memberof pb.BoomUserXY
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BoomUserXY.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BoomUserXY;
    })();

    pb.BoomBallXY = (function() {

        /**
         * Properties of a BoomBallXY.
         * @memberof pb
         * @interface IBoomBallXY
         * @property {number|null} [x] BoomBallXY x
         * @property {number|null} [y] BoomBallXY y
         * @property {string|null} [userid] BoomBallXY userid
         */

        /**
         * Constructs a new BoomBallXY.
         * @memberof pb
         * @classdesc Represents a BoomBallXY.
         * @implements IBoomBallXY
         * @constructor
         * @param {pb.IBoomBallXY=} [properties] Properties to set
         */
        function BoomBallXY(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BoomBallXY x.
         * @member {number} x
         * @memberof pb.BoomBallXY
         * @instance
         */
        BoomBallXY.prototype.x = 0;

        /**
         * BoomBallXY y.
         * @member {number} y
         * @memberof pb.BoomBallXY
         * @instance
         */
        BoomBallXY.prototype.y = 0;

        /**
         * BoomBallXY userid.
         * @member {string} userid
         * @memberof pb.BoomBallXY
         * @instance
         */
        BoomBallXY.prototype.userid = "";

        /**
         * Creates a new BoomBallXY instance using the specified properties.
         * @function create
         * @memberof pb.BoomBallXY
         * @static
         * @param {pb.IBoomBallXY=} [properties] Properties to set
         * @returns {pb.BoomBallXY} BoomBallXY instance
         */
        BoomBallXY.create = function create(properties) {
            return new BoomBallXY(properties);
        };

        /**
         * Encodes the specified BoomBallXY message. Does not implicitly {@link pb.BoomBallXY.verify|verify} messages.
         * @function encode
         * @memberof pb.BoomBallXY
         * @static
         * @param {pb.IBoomBallXY} message BoomBallXY message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BoomBallXY.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.x != null && message.hasOwnProperty("x"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.x);
            if (message.y != null && message.hasOwnProperty("y"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.y);
            if (message.userid != null && message.hasOwnProperty("userid"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.userid);
            return writer;
        };

        /**
         * Encodes the specified BoomBallXY message, length delimited. Does not implicitly {@link pb.BoomBallXY.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.BoomBallXY
         * @static
         * @param {pb.IBoomBallXY} message BoomBallXY message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BoomBallXY.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BoomBallXY message from the specified reader or buffer.
         * @function decode
         * @memberof pb.BoomBallXY
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.BoomBallXY} BoomBallXY
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BoomBallXY.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.BoomBallXY();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.x = reader.int32();
                    break;
                case 2:
                    message.y = reader.int32();
                    break;
                case 3:
                    message.userid = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BoomBallXY message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.BoomBallXY
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.BoomBallXY} BoomBallXY
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BoomBallXY.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BoomBallXY message.
         * @function verify
         * @memberof pb.BoomBallXY
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BoomBallXY.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (!$util.isInteger(message.x))
                    return "x: integer expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (!$util.isInteger(message.y))
                    return "y: integer expected";
            if (message.userid != null && message.hasOwnProperty("userid"))
                if (!$util.isString(message.userid))
                    return "userid: string expected";
            return null;
        };

        /**
         * Creates a BoomBallXY message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.BoomBallXY
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.BoomBallXY} BoomBallXY
         */
        BoomBallXY.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.BoomBallXY)
                return object;
            var message = new $root.pb.BoomBallXY();
            if (object.x != null)
                message.x = object.x | 0;
            if (object.y != null)
                message.y = object.y | 0;
            if (object.userid != null)
                message.userid = String(object.userid);
            return message;
        };

        /**
         * Creates a plain object from a BoomBallXY message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.BoomBallXY
         * @static
         * @param {pb.BoomBallXY} message BoomBallXY
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BoomBallXY.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
                object.userid = "";
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = message.y;
            if (message.userid != null && message.hasOwnProperty("userid"))
                object.userid = message.userid;
            return object;
        };

        /**
         * Converts this BoomBallXY to JSON.
         * @function toJSON
         * @memberof pb.BoomBallXY
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BoomBallXY.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BoomBallXY;
    })();

    pb.BoomBuff = (function() {

        /**
         * Properties of a BoomBuff.
         * @memberof pb
         * @interface IBoomBuff
         * @property {number|null} [id] BoomBuff id
         * @property {number|Long|null} [time] BoomBuff time
         * @property {number|null} [num] BoomBuff num
         */

        /**
         * Constructs a new BoomBuff.
         * @memberof pb
         * @classdesc Represents a BoomBuff.
         * @implements IBoomBuff
         * @constructor
         * @param {pb.IBoomBuff=} [properties] Properties to set
         */
        function BoomBuff(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BoomBuff id.
         * @member {number} id
         * @memberof pb.BoomBuff
         * @instance
         */
        BoomBuff.prototype.id = 0;

        /**
         * BoomBuff time.
         * @member {number|Long} time
         * @memberof pb.BoomBuff
         * @instance
         */
        BoomBuff.prototype.time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * BoomBuff num.
         * @member {number} num
         * @memberof pb.BoomBuff
         * @instance
         */
        BoomBuff.prototype.num = 0;

        /**
         * Creates a new BoomBuff instance using the specified properties.
         * @function create
         * @memberof pb.BoomBuff
         * @static
         * @param {pb.IBoomBuff=} [properties] Properties to set
         * @returns {pb.BoomBuff} BoomBuff instance
         */
        BoomBuff.create = function create(properties) {
            return new BoomBuff(properties);
        };

        /**
         * Encodes the specified BoomBuff message. Does not implicitly {@link pb.BoomBuff.verify|verify} messages.
         * @function encode
         * @memberof pb.BoomBuff
         * @static
         * @param {pb.IBoomBuff} message BoomBuff message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BoomBuff.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.time != null && message.hasOwnProperty("time"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.time);
            if (message.num != null && message.hasOwnProperty("num"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.num);
            return writer;
        };

        /**
         * Encodes the specified BoomBuff message, length delimited. Does not implicitly {@link pb.BoomBuff.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.BoomBuff
         * @static
         * @param {pb.IBoomBuff} message BoomBuff message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BoomBuff.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BoomBuff message from the specified reader or buffer.
         * @function decode
         * @memberof pb.BoomBuff
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.BoomBuff} BoomBuff
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BoomBuff.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.BoomBuff();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.int32();
                    break;
                case 2:
                    message.time = reader.int64();
                    break;
                case 3:
                    message.num = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BoomBuff message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.BoomBuff
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.BoomBuff} BoomBuff
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BoomBuff.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BoomBuff message.
         * @function verify
         * @memberof pb.BoomBuff
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BoomBuff.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                    return "time: integer|Long expected";
            if (message.num != null && message.hasOwnProperty("num"))
                if (!$util.isInteger(message.num))
                    return "num: integer expected";
            return null;
        };

        /**
         * Creates a BoomBuff message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.BoomBuff
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.BoomBuff} BoomBuff
         */
        BoomBuff.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.BoomBuff)
                return object;
            var message = new $root.pb.BoomBuff();
            if (object.id != null)
                message.id = object.id | 0;
            if (object.time != null)
                if ($util.Long)
                    (message.time = $util.Long.fromValue(object.time)).unsigned = false;
                else if (typeof object.time === "string")
                    message.time = parseInt(object.time, 10);
                else if (typeof object.time === "number")
                    message.time = object.time;
                else if (typeof object.time === "object")
                    message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber();
            if (object.num != null)
                message.num = object.num | 0;
            return message;
        };

        /**
         * Creates a plain object from a BoomBuff message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.BoomBuff
         * @static
         * @param {pb.BoomBuff} message BoomBuff
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BoomBuff.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.time = options.longs === String ? "0" : 0;
                object.num = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.time != null && message.hasOwnProperty("time"))
                if (typeof message.time === "number")
                    object.time = options.longs === String ? String(message.time) : message.time;
                else
                    object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber() : message.time;
            if (message.num != null && message.hasOwnProperty("num"))
                object.num = message.num;
            return object;
        };

        /**
         * Converts this BoomBuff to JSON.
         * @function toJSON
         * @memberof pb.BoomBuff
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BoomBuff.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BoomBuff;
    })();

    pb.BoomOver = (function() {

        /**
         * Properties of a BoomOver.
         * @memberof pb
         * @interface IBoomOver
         */

        /**
         * Constructs a new BoomOver.
         * @memberof pb
         * @classdesc Represents a BoomOver.
         * @implements IBoomOver
         * @constructor
         * @param {pb.IBoomOver=} [properties] Properties to set
         */
        function BoomOver(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new BoomOver instance using the specified properties.
         * @function create
         * @memberof pb.BoomOver
         * @static
         * @param {pb.IBoomOver=} [properties] Properties to set
         * @returns {pb.BoomOver} BoomOver instance
         */
        BoomOver.create = function create(properties) {
            return new BoomOver(properties);
        };

        /**
         * Encodes the specified BoomOver message. Does not implicitly {@link pb.BoomOver.verify|verify} messages.
         * @function encode
         * @memberof pb.BoomOver
         * @static
         * @param {pb.IBoomOver} message BoomOver message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BoomOver.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified BoomOver message, length delimited. Does not implicitly {@link pb.BoomOver.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.BoomOver
         * @static
         * @param {pb.IBoomOver} message BoomOver message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BoomOver.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BoomOver message from the specified reader or buffer.
         * @function decode
         * @memberof pb.BoomOver
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.BoomOver} BoomOver
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BoomOver.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.BoomOver();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BoomOver message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.BoomOver
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.BoomOver} BoomOver
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BoomOver.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BoomOver message.
         * @function verify
         * @memberof pb.BoomOver
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BoomOver.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a BoomOver message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.BoomOver
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.BoomOver} BoomOver
         */
        BoomOver.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.BoomOver)
                return object;
            return new $root.pb.BoomOver();
        };

        /**
         * Creates a plain object from a BoomOver message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.BoomOver
         * @static
         * @param {pb.BoomOver} message BoomOver
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BoomOver.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this BoomOver to JSON.
         * @function toJSON
         * @memberof pb.BoomOver
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BoomOver.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BoomOver;
    })();

    pb.Dice = (function() {

        /**
         * Properties of a Dice.
         * @memberof pb
         * @interface IDice
         * @property {Object.<string,pb.IDiceUser>|null} [usernum] Dice usernum
         * @property {Array.<string>|null} [usersort] Dice usersort
         */

        /**
         * Constructs a new Dice.
         * @memberof pb
         * @classdesc Represents a Dice.
         * @implements IDice
         * @constructor
         * @param {pb.IDice=} [properties] Properties to set
         */
        function Dice(properties) {
            this.usernum = {};
            this.usersort = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Dice usernum.
         * @member {Object.<string,pb.IDiceUser>} usernum
         * @memberof pb.Dice
         * @instance
         */
        Dice.prototype.usernum = $util.emptyObject;

        /**
         * Dice usersort.
         * @member {Array.<string>} usersort
         * @memberof pb.Dice
         * @instance
         */
        Dice.prototype.usersort = $util.emptyArray;

        /**
         * Creates a new Dice instance using the specified properties.
         * @function create
         * @memberof pb.Dice
         * @static
         * @param {pb.IDice=} [properties] Properties to set
         * @returns {pb.Dice} Dice instance
         */
        Dice.create = function create(properties) {
            return new Dice(properties);
        };

        /**
         * Encodes the specified Dice message. Does not implicitly {@link pb.Dice.verify|verify} messages.
         * @function encode
         * @memberof pb.Dice
         * @static
         * @param {pb.IDice} message Dice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Dice.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.usernum != null && message.hasOwnProperty("usernum"))
                for (var keys = Object.keys(message.usernum), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                    $root.pb.DiceUser.encode(message.usernum[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                }
            if (message.usersort != null && message.usersort.length)
                for (var i = 0; i < message.usersort.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.usersort[i]);
            return writer;
        };

        /**
         * Encodes the specified Dice message, length delimited. Does not implicitly {@link pb.Dice.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Dice
         * @static
         * @param {pb.IDice} message Dice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Dice.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Dice message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Dice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Dice} Dice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Dice.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.Dice(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    reader.skip().pos++;
                    if (message.usernum === $util.emptyObject)
                        message.usernum = {};
                    key = reader.string();
                    reader.pos++;
                    message.usernum[key] = $root.pb.DiceUser.decode(reader, reader.uint32());
                    break;
                case 2:
                    if (!(message.usersort && message.usersort.length))
                        message.usersort = [];
                    message.usersort.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Dice message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Dice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Dice} Dice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Dice.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Dice message.
         * @function verify
         * @memberof pb.Dice
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Dice.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.usernum != null && message.hasOwnProperty("usernum")) {
                if (!$util.isObject(message.usernum))
                    return "usernum: object expected";
                var key = Object.keys(message.usernum);
                for (var i = 0; i < key.length; ++i) {
                    var error = $root.pb.DiceUser.verify(message.usernum[key[i]]);
                    if (error)
                        return "usernum." + error;
                }
            }
            if (message.usersort != null && message.hasOwnProperty("usersort")) {
                if (!Array.isArray(message.usersort))
                    return "usersort: array expected";
                for (var i = 0; i < message.usersort.length; ++i)
                    if (!$util.isString(message.usersort[i]))
                        return "usersort: string[] expected";
            }
            return null;
        };

        /**
         * Creates a Dice message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Dice
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Dice} Dice
         */
        Dice.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.Dice)
                return object;
            var message = new $root.pb.Dice();
            if (object.usernum) {
                if (typeof object.usernum !== "object")
                    throw TypeError(".pb.Dice.usernum: object expected");
                message.usernum = {};
                for (var keys = Object.keys(object.usernum), i = 0; i < keys.length; ++i) {
                    if (typeof object.usernum[keys[i]] !== "object")
                        throw TypeError(".pb.Dice.usernum: object expected");
                    message.usernum[keys[i]] = $root.pb.DiceUser.fromObject(object.usernum[keys[i]]);
                }
            }
            if (object.usersort) {
                if (!Array.isArray(object.usersort))
                    throw TypeError(".pb.Dice.usersort: array expected");
                message.usersort = [];
                for (var i = 0; i < object.usersort.length; ++i)
                    message.usersort[i] = String(object.usersort[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a Dice message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Dice
         * @static
         * @param {pb.Dice} message Dice
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Dice.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.usersort = [];
            if (options.objects || options.defaults)
                object.usernum = {};
            var keys2;
            if (message.usernum && (keys2 = Object.keys(message.usernum)).length) {
                object.usernum = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.usernum[keys2[j]] = $root.pb.DiceUser.toObject(message.usernum[keys2[j]], options);
            }
            if (message.usersort && message.usersort.length) {
                object.usersort = [];
                for (var j = 0; j < message.usersort.length; ++j)
                    object.usersort[j] = message.usersort[j];
            }
            return object;
        };

        /**
         * Converts this Dice to JSON.
         * @function toJSON
         * @memberof pb.Dice
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Dice.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Dice;
    })();

    pb.DiceUser = (function() {

        /**
         * Properties of a DiceUser.
         * @memberof pb
         * @interface IDiceUser
         * @property {Array.<number>|null} [number] DiceUser number
         * @property {number|null} [guessNumber] DiceUser guessNumber
         * @property {number|null} [guessPoints] DiceUser guessPoints
         * @property {boolean|null} [open] DiceUser open
         */

        /**
         * Constructs a new DiceUser.
         * @memberof pb
         * @classdesc Represents a DiceUser.
         * @implements IDiceUser
         * @constructor
         * @param {pb.IDiceUser=} [properties] Properties to set
         */
        function DiceUser(properties) {
            this.number = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DiceUser number.
         * @member {Array.<number>} number
         * @memberof pb.DiceUser
         * @instance
         */
        DiceUser.prototype.number = $util.emptyArray;

        /**
         * DiceUser guessNumber.
         * @member {number} guessNumber
         * @memberof pb.DiceUser
         * @instance
         */
        DiceUser.prototype.guessNumber = 0;

        /**
         * DiceUser guessPoints.
         * @member {number} guessPoints
         * @memberof pb.DiceUser
         * @instance
         */
        DiceUser.prototype.guessPoints = 0;

        /**
         * DiceUser open.
         * @member {boolean} open
         * @memberof pb.DiceUser
         * @instance
         */
        DiceUser.prototype.open = false;

        /**
         * Creates a new DiceUser instance using the specified properties.
         * @function create
         * @memberof pb.DiceUser
         * @static
         * @param {pb.IDiceUser=} [properties] Properties to set
         * @returns {pb.DiceUser} DiceUser instance
         */
        DiceUser.create = function create(properties) {
            return new DiceUser(properties);
        };

        /**
         * Encodes the specified DiceUser message. Does not implicitly {@link pb.DiceUser.verify|verify} messages.
         * @function encode
         * @memberof pb.DiceUser
         * @static
         * @param {pb.IDiceUser} message DiceUser message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DiceUser.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.number != null && message.number.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (var i = 0; i < message.number.length; ++i)
                    writer.int32(message.number[i]);
                writer.ldelim();
            }
            if (message.guessNumber != null && message.hasOwnProperty("guessNumber"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.guessNumber);
            if (message.guessPoints != null && message.hasOwnProperty("guessPoints"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.guessPoints);
            if (message.open != null && message.hasOwnProperty("open"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.open);
            return writer;
        };

        /**
         * Encodes the specified DiceUser message, length delimited. Does not implicitly {@link pb.DiceUser.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.DiceUser
         * @static
         * @param {pb.IDiceUser} message DiceUser message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DiceUser.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DiceUser message from the specified reader or buffer.
         * @function decode
         * @memberof pb.DiceUser
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.DiceUser} DiceUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DiceUser.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.DiceUser();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.number && message.number.length))
                        message.number = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.number.push(reader.int32());
                    } else
                        message.number.push(reader.int32());
                    break;
                case 2:
                    message.guessNumber = reader.int32();
                    break;
                case 3:
                    message.guessPoints = reader.int32();
                    break;
                case 4:
                    message.open = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DiceUser message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.DiceUser
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.DiceUser} DiceUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DiceUser.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DiceUser message.
         * @function verify
         * @memberof pb.DiceUser
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DiceUser.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.number != null && message.hasOwnProperty("number")) {
                if (!Array.isArray(message.number))
                    return "number: array expected";
                for (var i = 0; i < message.number.length; ++i)
                    if (!$util.isInteger(message.number[i]))
                        return "number: integer[] expected";
            }
            if (message.guessNumber != null && message.hasOwnProperty("guessNumber"))
                if (!$util.isInteger(message.guessNumber))
                    return "guessNumber: integer expected";
            if (message.guessPoints != null && message.hasOwnProperty("guessPoints"))
                if (!$util.isInteger(message.guessPoints))
                    return "guessPoints: integer expected";
            if (message.open != null && message.hasOwnProperty("open"))
                if (typeof message.open !== "boolean")
                    return "open: boolean expected";
            return null;
        };

        /**
         * Creates a DiceUser message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.DiceUser
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.DiceUser} DiceUser
         */
        DiceUser.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.DiceUser)
                return object;
            var message = new $root.pb.DiceUser();
            if (object.number) {
                if (!Array.isArray(object.number))
                    throw TypeError(".pb.DiceUser.number: array expected");
                message.number = [];
                for (var i = 0; i < object.number.length; ++i)
                    message.number[i] = object.number[i] | 0;
            }
            if (object.guessNumber != null)
                message.guessNumber = object.guessNumber | 0;
            if (object.guessPoints != null)
                message.guessPoints = object.guessPoints | 0;
            if (object.open != null)
                message.open = Boolean(object.open);
            return message;
        };

        /**
         * Creates a plain object from a DiceUser message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.DiceUser
         * @static
         * @param {pb.DiceUser} message DiceUser
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DiceUser.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.number = [];
            if (options.defaults) {
                object.guessNumber = 0;
                object.guessPoints = 0;
                object.open = false;
            }
            if (message.number && message.number.length) {
                object.number = [];
                for (var j = 0; j < message.number.length; ++j)
                    object.number[j] = message.number[j];
            }
            if (message.guessNumber != null && message.hasOwnProperty("guessNumber"))
                object.guessNumber = message.guessNumber;
            if (message.guessPoints != null && message.hasOwnProperty("guessPoints"))
                object.guessPoints = message.guessPoints;
            if (message.open != null && message.hasOwnProperty("open"))
                object.open = message.open;
            return object;
        };

        /**
         * Converts this DiceUser to JSON.
         * @function toJSON
         * @memberof pb.DiceUser
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DiceUser.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DiceUser;
    })();

    pb.DiceOver = (function() {

        /**
         * Properties of a DiceOver.
         * @memberof pb
         * @interface IDiceOver
         * @property {string|null} [openid] DiceOver openid
         */

        /**
         * Constructs a new DiceOver.
         * @memberof pb
         * @classdesc Represents a DiceOver.
         * @implements IDiceOver
         * @constructor
         * @param {pb.IDiceOver=} [properties] Properties to set
         */
        function DiceOver(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DiceOver openid.
         * @member {string} openid
         * @memberof pb.DiceOver
         * @instance
         */
        DiceOver.prototype.openid = "";

        /**
         * Creates a new DiceOver instance using the specified properties.
         * @function create
         * @memberof pb.DiceOver
         * @static
         * @param {pb.IDiceOver=} [properties] Properties to set
         * @returns {pb.DiceOver} DiceOver instance
         */
        DiceOver.create = function create(properties) {
            return new DiceOver(properties);
        };

        /**
         * Encodes the specified DiceOver message. Does not implicitly {@link pb.DiceOver.verify|verify} messages.
         * @function encode
         * @memberof pb.DiceOver
         * @static
         * @param {pb.IDiceOver} message DiceOver message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DiceOver.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.openid != null && message.hasOwnProperty("openid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.openid);
            return writer;
        };

        /**
         * Encodes the specified DiceOver message, length delimited. Does not implicitly {@link pb.DiceOver.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.DiceOver
         * @static
         * @param {pb.IDiceOver} message DiceOver message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DiceOver.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DiceOver message from the specified reader or buffer.
         * @function decode
         * @memberof pb.DiceOver
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.DiceOver} DiceOver
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DiceOver.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.DiceOver();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.openid = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DiceOver message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.DiceOver
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.DiceOver} DiceOver
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DiceOver.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DiceOver message.
         * @function verify
         * @memberof pb.DiceOver
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DiceOver.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.openid != null && message.hasOwnProperty("openid"))
                if (!$util.isString(message.openid))
                    return "openid: string expected";
            return null;
        };

        /**
         * Creates a DiceOver message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.DiceOver
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.DiceOver} DiceOver
         */
        DiceOver.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.DiceOver)
                return object;
            var message = new $root.pb.DiceOver();
            if (object.openid != null)
                message.openid = String(object.openid);
            return message;
        };

        /**
         * Creates a plain object from a DiceOver message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.DiceOver
         * @static
         * @param {pb.DiceOver} message DiceOver
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DiceOver.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.openid = "";
            if (message.openid != null && message.hasOwnProperty("openid"))
                object.openid = message.openid;
            return object;
        };

        /**
         * Converts this DiceOver to JSON.
         * @function toJSON
         * @memberof pb.DiceOver
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DiceOver.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DiceOver;
    })();

    return pb;
})();

module.exports = $root;
