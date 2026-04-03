
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "3.6.5";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parse = parse3;
    exports.serialize = serialize;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parse3(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = str.indexOf("=", index);
        if (eqIdx === -1)
          break;
        const colonIdx = str.indexOf(";", index);
        const endIdx = colonIdx === -1 ? len : colonIdx;
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const keyStartIdx = startIndex(str, index, eqIdx);
        const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
        const key = str.slice(keyStartIdx, keyEndIdx);
        if (obj[key] === void 0) {
          let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
          let valEndIdx = endIndex(str, endIdx, valStartIdx);
          const value = dec(str.slice(valStartIdx, valEndIdx));
          obj[key] = value;
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function startIndex(str, index, max) {
      do {
        const code = str.charCodeAt(index);
        if (code !== 32 && code !== 9)
          return index;
      } while (++index < max);
      return max;
    }
    function endIndex(str, index, min) {
      while (index > min) {
        const code = str.charCodeAt(--index);
        if (code !== 32 && code !== 9)
          return index + 1;
      }
      return min;
    }
    function serialize(name, val, options) {
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(name)) {
        throw new TypeError(`argument name is invalid: ${name}`);
      }
      const value = enc(val);
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${val}`);
      }
      let str = name + "=" + value;
      if (!options)
        return str;
      if (options.maxAge !== void 0) {
        if (!Number.isInteger(options.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
        }
        str += "; Max-Age=" + options.maxAge;
      }
      if (options.domain) {
        if (!domainValueRegExp.test(options.domain)) {
          throw new TypeError(`option domain is invalid: ${options.domain}`);
        }
        str += "; Domain=" + options.domain;
      }
      if (options.path) {
        if (!pathValueRegExp.test(options.path)) {
          throw new TypeError(`option path is invalid: ${options.path}`);
        }
        str += "; Path=" + options.path;
      }
      if (options.expires) {
        if (!isDate(options.expires) || !Number.isFinite(options.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${options.expires}`);
        }
        str += "; Expires=" + options.expires.toUTCString();
      }
      if (options.httpOnly) {
        str += "; HttpOnly";
      }
      if (options.secure) {
        str += "; Secure";
      }
      if (options.partitioned) {
        str += "; Partitioned";
      }
      if (options.priority) {
        const priority = typeof options.priority === "string" ? options.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${options.priority}`);
        }
      }
      if (options.sameSite) {
        const sameSite = typeof options.sameSite === "string" ? options.sameSite.toLowerCase() : options.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
        }
      }
      return str;
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const body = await event.arrayBuffer();
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body: shouldHaveBody ? Buffer2.from(body) : void 0,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        return new Response(result.body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
var envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          const origin = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
          for (const [key, value] of Object.entries(globalThis.openNextConfig.functions ?? {}).filter(([key2]) => key2 !== "default")) {
            if (value.patterns.some((pattern) => {
              return new RegExp(
                // transform glob pattern to regex
                `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`
              ).test(_path);
            })) {
              debug("Using origin", key, value.patterns);
              return origin[key];
            }
          }
          if (_path.startsWith("/_next/image") && origin.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return origin.imageOptimizer;
          }
          if (origin.default) {
            debug("Using default origin", origin.default, _path);
            return origin.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { Readable } from "node:stream";
function toReadableStream(value, isBase64) {
  return Readable.toWeb(Readable.from(Buffer.from(value, isBase64 ? "base64" : "utf8")));
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return Readable.toWeb(Readable.from([Buffer.from("SOMETHING")]));
  }
  return Readable.toWeb(Readable.from([]));
}
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// .next/server/edge-runtime-webpack.js
var require_edge_runtime_webpack = __commonJS({
  ".next/server/edge-runtime-webpack.js"() {
    "use strict";
    (() => {
      "use strict";
      var e = {}, r = {};
      function t(o) {
        var n = r[o];
        if (void 0 !== n) return n.exports;
        var i = r[o] = { exports: {} }, a = true;
        try {
          e[o](i, i.exports, t), a = false;
        } finally {
          a && delete r[o];
        }
        return i.exports;
      }
      t.m = e, t.amdO = {}, (() => {
        var e2 = [];
        t.O = (r2, o, n, i) => {
          if (o) {
            i = i || 0;
            for (var a = e2.length; a > 0 && e2[a - 1][2] > i; a--) e2[a] = e2[a - 1];
            e2[a] = [o, n, i];
            return;
          }
          for (var l = 1 / 0, a = 0; a < e2.length; a++) {
            for (var [o, n, i] = e2[a], u = true, f = 0; f < o.length; f++) l >= i && Object.keys(t.O).every((e3) => t.O[e3](o[f])) ? o.splice(f--, 1) : (u = false, i < l && (l = i));
            if (u) {
              e2.splice(a--, 1);
              var s = n();
              void 0 !== s && (r2 = s);
            }
          }
          return r2;
        };
      })(), t.n = (e2) => {
        var r2 = e2 && e2.__esModule ? () => e2.default : () => e2;
        return t.d(r2, { a: r2 }), r2;
      }, t.d = (e2, r2) => {
        for (var o in r2) t.o(r2, o) && !t.o(e2, o) && Object.defineProperty(e2, o, { enumerable: true, get: r2[o] });
      }, t.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
          return this || Function("return this")();
        } catch (e2) {
          if ("object" == typeof window) return window;
        }
      }(), t.o = (e2, r2) => Object.prototype.hasOwnProperty.call(e2, r2), t.r = (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      }, (() => {
        var e2 = { 993: 0 };
        t.O.j = (r3) => 0 === e2[r3];
        var r2 = (r3, o2) => {
          var n, i, [a, l, u] = o2, f = 0;
          if (a.some((r4) => 0 !== e2[r4])) {
            for (n in l) t.o(l, n) && (t.m[n] = l[n]);
            if (u) var s = u(t);
          }
          for (r3 && r3(o2); f < a.length; f++) i = a[f], t.o(e2, i) && e2[i] && e2[i][0](), e2[i] = 0;
          return t.O(s);
        }, o = self.webpackChunk_N_E = self.webpackChunk_N_E || [];
        o.forEach(r2.bind(null, 0)), o.push = r2.bind(null, o.push.bind(o));
      })();
    })();
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// .next/server/src/middleware.js
var require_middleware = __commonJS({
  ".next/server/src/middleware.js"() {
    "use strict";
    (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[727], { 2067: (e) => {
      "use strict";
      e.exports = (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports));
    }, 6195: (e) => {
      "use strict";
      e.exports = (init_node_buffer(), __toCommonJS(node_buffer_exports));
    }, 7525: (e, t, r) => {
      "use strict";
      let n;
      r.r(t), r.d(t, { default: () => eA });
      var a, i, o, s, l, d, u, c, f, p, _, h, g = {};
      async function m() {
        let e2 = "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && (await _ENTRIES.middleware_instrumentation).register;
        if (e2) try {
          await e2();
        } catch (e3) {
          throw e3.message = `An error occurred while loading instrumentation hook: ${e3.message}`, e3;
        }
      }
      r.r(g), r.d(g, { config: () => eO, middleware: () => eE });
      let y = null;
      function w() {
        return y || (y = m()), y;
      }
      function v(e2) {
        return `The edge runtime does not support Node.js '${e2}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== r.g.process && (process.env = r.g.process.env, r.g.process = process), Object.defineProperty(globalThis, "__import_unsupported", { value: function(e2) {
        let t2 = new Proxy(function() {
        }, { get(t3, r2) {
          if ("then" === r2) return {};
          throw Error(v(e2));
        }, construct() {
          throw Error(v(e2));
        }, apply(r2, n2, a2) {
          if ("function" == typeof a2[0]) return a2[0](t2);
          throw Error(v(e2));
        } });
        return new Proxy({}, { get: () => t2 });
      }, enumerable: false, configurable: false }), w();
      var b = r(6416), x = r(6329);
      let S = Symbol("response"), P = Symbol("passThrough"), C = Symbol("waitUntil");
      class R {
        constructor(e2) {
          this[C] = [], this[P] = false;
        }
        respondWith(e2) {
          this[S] || (this[S] = Promise.resolve(e2));
        }
        passThroughOnException() {
          this[P] = true;
        }
        waitUntil(e2) {
          this[C].push(e2);
        }
      }
      class L extends R {
        constructor(e2) {
          super(e2.request), this.sourcePage = e2.page;
        }
        get request() {
          throw new b.qJ({ page: this.sourcePage });
        }
        respondWith() {
          throw new b.qJ({ page: this.sourcePage });
        }
      }
      var E = r(1669), O = r(8241);
      function T(e2, t2) {
        let r2 = "string" == typeof t2 ? new URL(t2) : t2, n2 = new URL(e2, t2), a2 = r2.protocol + "//" + r2.host;
        return n2.protocol + "//" + n2.host === a2 ? n2.toString().replace(a2, "") : n2.toString();
      }
      var M = r(4655);
      let N = [["RSC"], ["Next-Router-State-Tree"], ["Next-Router-Prefetch"]], A = ["__nextFallback", "__nextLocale", "__nextInferredLocaleFromDefault", "__nextDefaultLocale", "__nextIsNotFound", "_rsc"], I = ["__nextDataReq"];
      var k = r(4035), j = r(7217);
      class D extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new D();
        }
      }
      class q extends Headers {
        constructor(e2) {
          super(), this.headers = new Proxy(e2, { get(t2, r2, n2) {
            if ("symbol" == typeof r2) return j.g.get(t2, r2, n2);
            let a2 = r2.toLowerCase(), i2 = Object.keys(e2).find((e3) => e3.toLowerCase() === a2);
            if (void 0 !== i2) return j.g.get(t2, i2, n2);
          }, set(t2, r2, n2, a2) {
            if ("symbol" == typeof r2) return j.g.set(t2, r2, n2, a2);
            let i2 = r2.toLowerCase(), o2 = Object.keys(e2).find((e3) => e3.toLowerCase() === i2);
            return j.g.set(t2, o2 ?? r2, n2, a2);
          }, has(t2, r2) {
            if ("symbol" == typeof r2) return j.g.has(t2, r2);
            let n2 = r2.toLowerCase(), a2 = Object.keys(e2).find((e3) => e3.toLowerCase() === n2);
            return void 0 !== a2 && j.g.has(t2, a2);
          }, deleteProperty(t2, r2) {
            if ("symbol" == typeof r2) return j.g.deleteProperty(t2, r2);
            let n2 = r2.toLowerCase(), a2 = Object.keys(e2).find((e3) => e3.toLowerCase() === n2);
            return void 0 === a2 || j.g.deleteProperty(t2, a2);
          } });
        }
        static seal(e2) {
          return new Proxy(e2, { get(e3, t2, r2) {
            switch (t2) {
              case "append":
              case "delete":
              case "set":
                return D.callable;
              default:
                return j.g.get(e3, t2, r2);
            }
          } });
        }
        merge(e2) {
          return Array.isArray(e2) ? e2.join(", ") : e2;
        }
        static from(e2) {
          return e2 instanceof Headers ? e2 : new q(e2);
        }
        append(e2, t2) {
          let r2 = this.headers[e2];
          "string" == typeof r2 ? this.headers[e2] = [r2, t2] : Array.isArray(r2) ? r2.push(t2) : this.headers[e2] = t2;
        }
        delete(e2) {
          delete this.headers[e2];
        }
        get(e2) {
          let t2 = this.headers[e2];
          return void 0 !== t2 ? this.merge(t2) : null;
        }
        has(e2) {
          return void 0 !== this.headers[e2];
        }
        set(e2, t2) {
          this.headers[e2] = t2;
        }
        forEach(e2, t2) {
          for (let [r2, n2] of this.entries()) e2.call(t2, n2, r2, this);
        }
        *entries() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = e2.toLowerCase(), r2 = this.get(t2);
            yield [t2, r2];
          }
        }
        *keys() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = e2.toLowerCase();
            yield t2;
          }
        }
        *values() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = this.get(e2);
            yield t2;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      var B = r(938), U = r(9452);
      class G extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options");
        }
        static callable() {
          throw new G();
        }
      }
      class V {
        static seal(e2) {
          return new Proxy(e2, { get(e3, t2, r2) {
            switch (t2) {
              case "clear":
              case "delete":
              case "set":
                return G.callable;
              default:
                return j.g.get(e3, t2, r2);
            }
          } });
        }
      }
      let H = Symbol.for("next.mutated.cookies");
      class z {
        static wrap(e2, t2) {
          let r2 = new B.nV(new Headers());
          for (let t3 of e2.getAll()) r2.set(t3);
          let n2 = [], a2 = /* @__PURE__ */ new Set(), i2 = () => {
            let e3 = U.A.getStore();
            if (e3 && (e3.pathWasRevalidated = true), n2 = r2.getAll().filter((e4) => a2.has(e4.name)), t2) {
              let e4 = [];
              for (let t3 of n2) {
                let r3 = new B.nV(new Headers());
                r3.set(t3), e4.push(r3.toString());
              }
              t2(e4);
            }
          };
          return new Proxy(r2, { get(e3, t3, r3) {
            switch (t3) {
              case H:
                return n2;
              case "delete":
                return function(...t4) {
                  a2.add("string" == typeof t4[0] ? t4[0] : t4[0].name);
                  try {
                    e3.delete(...t4);
                  } finally {
                    i2();
                  }
                };
              case "set":
                return function(...t4) {
                  a2.add("string" == typeof t4[0] ? t4[0] : t4[0].name);
                  try {
                    return e3.set(...t4);
                  } finally {
                    i2();
                  }
                };
              default:
                return j.g.get(e3, t3, r3);
            }
          } });
        }
      }
      var $ = r(300);
      !function(e2) {
        e2.handleRequest = "BaseServer.handleRequest", e2.run = "BaseServer.run", e2.pipe = "BaseServer.pipe", e2.getStaticHTML = "BaseServer.getStaticHTML", e2.render = "BaseServer.render", e2.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", e2.renderToResponse = "BaseServer.renderToResponse", e2.renderToHTML = "BaseServer.renderToHTML", e2.renderError = "BaseServer.renderError", e2.renderErrorToResponse = "BaseServer.renderErrorToResponse", e2.renderErrorToHTML = "BaseServer.renderErrorToHTML", e2.render404 = "BaseServer.render404";
      }(a || (a = {})), function(e2) {
        e2.loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", e2.loadComponents = "LoadComponents.loadComponents";
      }(i || (i = {})), function(e2) {
        e2.getRequestHandler = "NextServer.getRequestHandler", e2.getServer = "NextServer.getServer", e2.getServerRequestHandler = "NextServer.getServerRequestHandler", e2.createServer = "createServer.createServer";
      }(o || (o = {})), function(e2) {
        e2.compression = "NextNodeServer.compression", e2.getBuildId = "NextNodeServer.getBuildId", e2.createComponentTree = "NextNodeServer.createComponentTree", e2.clientComponentLoading = "NextNodeServer.clientComponentLoading", e2.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", e2.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", e2.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", e2.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", e2.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", e2.sendRenderResult = "NextNodeServer.sendRenderResult", e2.proxyRequest = "NextNodeServer.proxyRequest", e2.runApi = "NextNodeServer.runApi", e2.render = "NextNodeServer.render", e2.renderHTML = "NextNodeServer.renderHTML", e2.imageOptimizer = "NextNodeServer.imageOptimizer", e2.getPagePath = "NextNodeServer.getPagePath", e2.getRoutesManifest = "NextNodeServer.getRoutesManifest", e2.findPageComponents = "NextNodeServer.findPageComponents", e2.getFontManifest = "NextNodeServer.getFontManifest", e2.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", e2.getRequestHandler = "NextNodeServer.getRequestHandler", e2.renderToHTML = "NextNodeServer.renderToHTML", e2.renderError = "NextNodeServer.renderError", e2.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", e2.render404 = "NextNodeServer.render404", e2.startResponse = "NextNodeServer.startResponse", e2.route = "route", e2.onProxyReq = "onProxyReq", e2.apiResolver = "apiResolver", e2.internalFetch = "internalFetch";
      }(s || (s = {})), (l || (l = {})).startServer = "startServer.startServer", function(e2) {
        e2.getServerSideProps = "Render.getServerSideProps", e2.getStaticProps = "Render.getStaticProps", e2.renderToString = "Render.renderToString", e2.renderDocument = "Render.renderDocument", e2.createBodyResult = "Render.createBodyResult";
      }(d || (d = {})), function(e2) {
        e2.renderToString = "AppRender.renderToString", e2.renderToReadableStream = "AppRender.renderToReadableStream", e2.getBodyResult = "AppRender.getBodyResult", e2.fetch = "AppRender.fetch";
      }(u || (u = {})), (c || (c = {})).executeRoute = "Router.executeRoute", (f || (f = {})).runHandler = "Node.runHandler", (p || (p = {})).runHandler = "AppRouteRouteHandlers.runHandler", function(e2) {
        e2.generateMetadata = "ResolveMetadata.generateMetadata", e2.generateViewport = "ResolveMetadata.generateViewport";
      }(_ || (_ = {})), (h || (h = {})).execute = "Middleware.execute";
      let K = ["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"], F = ["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"], { context: W, propagation: Z, trace: Y, SpanStatusCode: J, SpanKind: X, ROOT_CONTEXT: Q } = n = r(8439), ee = (e2) => null !== e2 && "object" == typeof e2 && "function" == typeof e2.then, et = (e2, t2) => {
        (null == t2 ? void 0 : t2.bubble) === true ? e2.setAttribute("next.bubble", true) : (t2 && e2.recordException(t2), e2.setStatus({ code: J.ERROR, message: null == t2 ? void 0 : t2.message })), e2.end();
      }, er = /* @__PURE__ */ new Map(), en = n.createContextKey("next.rootSpanId"), ea = 0, ei = () => ea++;
      class eo {
        getTracerInstance() {
          return Y.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return W;
        }
        getActiveScopeSpan() {
          return Y.getSpan(null == W ? void 0 : W.active());
        }
        withPropagatedContext(e2, t2, r2) {
          let n2 = W.active();
          if (Y.getSpanContext(n2)) return t2();
          let a2 = Z.extract(n2, e2, r2);
          return W.with(a2, t2);
        }
        trace(...e2) {
          var t2;
          let [r2, n2, a2] = e2, { fn: i2, options: o2 } = "function" == typeof n2 ? { fn: n2, options: {} } : { fn: a2, options: { ...n2 } }, s2 = o2.spanName ?? r2;
          if (!K.includes(r2) && "1" !== process.env.NEXT_OTEL_VERBOSE || o2.hideSpan) return i2();
          let l2 = this.getSpanContext((null == o2 ? void 0 : o2.parentSpan) ?? this.getActiveScopeSpan()), d2 = false;
          l2 ? (null == (t2 = Y.getSpanContext(l2)) ? void 0 : t2.isRemote) && (d2 = true) : (l2 = (null == W ? void 0 : W.active()) ?? Q, d2 = true);
          let u2 = ei();
          return o2.attributes = { "next.span_name": s2, "next.span_type": r2, ...o2.attributes }, W.with(l2.setValue(en, u2), () => this.getTracerInstance().startActiveSpan(s2, o2, (e3) => {
            let t3 = "performance" in globalThis ? globalThis.performance.now() : void 0, n3 = () => {
              er.delete(u2), t3 && process.env.NEXT_OTEL_PERFORMANCE_PREFIX && F.includes(r2 || "") && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-${(r2.split(".").pop() || "").replace(/[A-Z]/g, (e4) => "-" + e4.toLowerCase())}`, { start: t3, end: performance.now() });
            };
            d2 && er.set(u2, new Map(Object.entries(o2.attributes ?? {})));
            try {
              if (i2.length > 1) return i2(e3, (t5) => et(e3, t5));
              let t4 = i2(e3);
              if (ee(t4)) return t4.then((t5) => (e3.end(), t5)).catch((t5) => {
                throw et(e3, t5), t5;
              }).finally(n3);
              return e3.end(), n3(), t4;
            } catch (t4) {
              throw et(e3, t4), n3(), t4;
            }
          }));
        }
        wrap(...e2) {
          let t2 = this, [r2, n2, a2] = 3 === e2.length ? e2 : [e2[0], {}, e2[1]];
          return K.includes(r2) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e3 = n2;
            "function" == typeof e3 && "function" == typeof a2 && (e3 = e3.apply(this, arguments));
            let i2 = arguments.length - 1, o2 = arguments[i2];
            if ("function" != typeof o2) return t2.trace(r2, e3, () => a2.apply(this, arguments));
            {
              let n3 = t2.getContext().bind(W.active(), o2);
              return t2.trace(r2, e3, (e4, t3) => (arguments[i2] = function(e5) {
                return null == t3 || t3(e5), n3.apply(this, arguments);
              }, a2.apply(this, arguments)));
            }
          } : a2;
        }
        startSpan(...e2) {
          let [t2, r2] = e2, n2 = this.getSpanContext((null == r2 ? void 0 : r2.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(t2, r2, n2);
        }
        getSpanContext(e2) {
          return e2 ? Y.setSpan(W.active(), e2) : void 0;
        }
        getRootSpanAttributes() {
          let e2 = W.active().getValue(en);
          return er.get(e2);
        }
      }
      let es = (() => {
        let e2 = new eo();
        return () => e2;
      })(), el = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(el);
      class ed {
        constructor(e2, t2, r2, n2) {
          var a2;
          let i2 = e2 && function(e3, t3) {
            let r3 = q.from(e3.headers);
            return { isOnDemandRevalidate: r3.get($.y3) === t3.previewModeId, revalidateOnlyGenerated: r3.has($.Qq) };
          }(t2, e2).isOnDemandRevalidate, o2 = null == (a2 = r2.get(el)) ? void 0 : a2.value;
          this.isEnabled = !!(!i2 && o2 && e2 && o2 === e2.previewModeId), this._previewModeId = null == e2 ? void 0 : e2.previewModeId, this._mutableCookies = n2;
        }
        enable() {
          if (!this._previewModeId) throw Error("Invariant: previewProps missing previewModeId this should never happen");
          this._mutableCookies.set({ name: el, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" });
        }
        disable() {
          this._mutableCookies.set({ name: el, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) });
        }
      }
      function eu(e2, t2) {
        if ("x-middleware-set-cookie" in e2.headers && "string" == typeof e2.headers["x-middleware-set-cookie"]) {
          let r2 = e2.headers["x-middleware-set-cookie"], n2 = new Headers();
          for (let e3 of (0, x.l$)(r2)) n2.append("set-cookie", e3);
          for (let e3 of new B.nV(n2).getAll()) t2.set(e3);
        }
      }
      let ec = { wrap(e2, { req: t2, res: r2, renderOpts: n2 }, a2) {
        let i2;
        function o2(e3) {
          r2 && r2.setHeader("Set-Cookie", e3);
        }
        n2 && "previewProps" in n2 && (i2 = n2.previewProps);
        let s2 = {}, l2 = { get headers() {
          return s2.headers || (s2.headers = function(e3) {
            let t3 = q.from(e3);
            for (let e4 of N) t3.delete(e4.toString().toLowerCase());
            return q.seal(t3);
          }(t2.headers)), s2.headers;
        }, get cookies() {
          if (!s2.cookies) {
            let e3 = new B.qC(q.from(t2.headers));
            eu(t2, e3), s2.cookies = V.seal(e3);
          }
          return s2.cookies;
        }, get mutableCookies() {
          if (!s2.mutableCookies) {
            let e3 = function(e4, t3) {
              let r3 = new B.qC(q.from(e4));
              return z.wrap(r3, t3);
            }(t2.headers, (null == n2 ? void 0 : n2.onUpdateCookies) || (r2 ? o2 : void 0));
            eu(t2, e3), s2.mutableCookies = e3;
          }
          return s2.mutableCookies;
        }, get draftMode() {
          return s2.draftMode || (s2.draftMode = new ed(i2, t2, this.cookies, this.mutableCookies)), s2.draftMode;
        }, reactLoadableManifest: (null == n2 ? void 0 : n2.reactLoadableManifest) || {}, assetPrefix: (null == n2 ? void 0 : n2.assetPrefix) || "" };
        return e2.run(l2, a2, l2);
      } };
      var ef = r(1053);
      function ep() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID, previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      class e_ extends E.I {
        constructor(e2) {
          super(e2.input, e2.init), this.sourcePage = e2.page;
        }
        get request() {
          throw new b.qJ({ page: this.sourcePage });
        }
        respondWith() {
          throw new b.qJ({ page: this.sourcePage });
        }
        waitUntil() {
          throw new b.qJ({ page: this.sourcePage });
        }
      }
      let eh = { keys: (e2) => Array.from(e2.keys()), get: (e2, t2) => e2.get(t2) ?? void 0 }, eg = (e2, t2) => es().withPropagatedContext(e2.headers, t2, eh), em = false;
      async function ey(e2) {
        let t2, n2;
        !function() {
          if (!em && (em = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
            let { interceptTestApis: e3, wrapRequestHandler: t3 } = r(4177);
            e3(), eg = t3(eg);
          }
        }(), await w();
        let a2 = void 0 !== self.__BUILD_MANIFEST;
        e2.request.url = (0, k.b)(e2.request.url);
        let i2 = new M.c(e2.request.url, { headers: e2.request.headers, nextConfig: e2.request.nextConfig });
        for (let e3 of [...i2.searchParams.keys()]) {
          let t3 = i2.searchParams.getAll(e3);
          (0, x.LI)(e3, (r2) => {
            for (let e4 of (i2.searchParams.delete(r2), t3)) i2.searchParams.append(r2, e4);
            i2.searchParams.delete(e3);
          });
        }
        let o2 = i2.buildId;
        i2.buildId = "";
        let s2 = e2.request.headers["x-nextjs-data"];
        s2 && "/index" === i2.pathname && (i2.pathname = "/");
        let l2 = (0, x.EK)(e2.request.headers), d2 = /* @__PURE__ */ new Map();
        if (!a2) for (let e3 of N) {
          let t3 = e3.toString().toLowerCase();
          l2.get(t3) && (d2.set(t3, l2.get(t3)), l2.delete(t3));
        }
        let u2 = new e_({ page: e2.page, input: function(e3, t3) {
          let r2 = "string" == typeof e3, n3 = r2 ? new URL(e3) : e3;
          for (let e4 of A) n3.searchParams.delete(e4);
          if (t3) for (let e4 of I) n3.searchParams.delete(e4);
          return r2 ? n3.toString() : n3;
        }(i2, true).toString(), init: { body: e2.request.body, geo: e2.request.geo, headers: l2, ip: e2.request.ip, method: e2.request.method, nextConfig: e2.request.nextConfig, signal: e2.request.signal } });
        s2 && Object.defineProperty(u2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCacheShared && e2.IncrementalCache && (globalThis.__incrementalCache = new e2.IncrementalCache({ appDir: true, fetchCache: true, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: e2.request.headers, requestProtocol: "https", getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: ep() }) }));
        let c2 = new L({ request: u2, page: e2.page });
        if ((t2 = await eg(u2, () => "/middleware" === e2.page || "/src/middleware" === e2.page ? es().trace(h.execute, { spanName: `middleware ${u2.method} ${u2.nextUrl.pathname}`, attributes: { "http.target": u2.nextUrl.pathname, "http.method": u2.method } }, () => ec.wrap(ef.O, { req: u2, renderOpts: { onUpdateCookies: (e3) => {
          n2 = e3;
        }, previewProps: ep() } }, () => e2.handler(u2, c2))) : e2.handler(u2, c2))) && !(t2 instanceof Response)) throw TypeError("Expected an instance of Response to be returned");
        t2 && n2 && t2.headers.set("set-cookie", n2);
        let f2 = null == t2 ? void 0 : t2.headers.get("x-middleware-rewrite");
        if (t2 && f2 && !a2) {
          let r2 = new M.c(f2, { forceLocale: true, headers: e2.request.headers, nextConfig: e2.request.nextConfig });
          r2.host === u2.nextUrl.host && (r2.buildId = o2 || r2.buildId, t2.headers.set("x-middleware-rewrite", String(r2)));
          let n3 = T(String(r2), String(i2));
          s2 && t2.headers.set("x-nextjs-rewrite", n3);
        }
        let p2 = null == t2 ? void 0 : t2.headers.get("Location");
        if (t2 && p2 && !a2) {
          let r2 = new M.c(p2, { forceLocale: false, headers: e2.request.headers, nextConfig: e2.request.nextConfig });
          t2 = new Response(t2.body, t2), r2.host === u2.nextUrl.host && (r2.buildId = o2 || r2.buildId, t2.headers.set("Location", String(r2))), s2 && (t2.headers.delete("Location"), t2.headers.set("x-nextjs-redirect", T(String(r2), String(i2))));
        }
        let _2 = t2 || O.x.next(), g2 = _2.headers.get("x-middleware-override-headers"), m2 = [];
        if (g2) {
          for (let [e3, t3] of d2) _2.headers.set(`x-middleware-request-${e3}`, t3), m2.push(e3);
          m2.length > 0 && _2.headers.set("x-middleware-override-headers", g2 + "," + m2.join(","));
        }
        return { response: _2, waitUntil: Promise.all(c2[C]), fetchMetrics: u2.fetchMetrics };
      }
      var ew = r(4635), ev = r(6124), eb = r(9310);
      let ex = (0, r(2813).R)({ locales: ["en-US", "de-DE", "ja-JP", "ko-KR", "pt-BR", "es-ES", "fr-FR"], defaultLocale: "en-US" }), { Link: eS, redirect: eP, usePathname: eC, useRouter: eR, getPathname: eL } = (0, eb.os)(ex);
      function eE(e2) {
        let { pathname: t2 } = e2.nextUrl, { ua: r2 } = (0, ew.userAgent)(e2);
        return t2.startsWith("/api") ? "node" === r2 ? ew.NextResponse.next() : ew.NextResponse.rewrite(new URL("/404", e2.url)) : (0, ev.Z)(ex)(e2);
      }
      let eO = { matcher: ["/api/:path*", "/((?!_next|static|ads).*)"] }, eT = { ...g }, eM = eT.middleware || eT.default, eN = "/src/middleware";
      if ("function" != typeof eM) throw Error(`The Middleware "${eN}" must export a \`middleware\` or a \`default\` function`);
      function eA(e2) {
        return ey({ ...e2, page: eN, handler: eM });
      }
    }, 1354: (e, t, r) => {
      "use strict";
      function n(e2, t2, r2) {
        if (r2 || 2 == arguments.length) for (var n2, a2 = 0, i2 = t2.length; a2 < i2; a2++) !n2 && a2 in t2 || (n2 || (n2 = Array.prototype.slice.call(t2, 0, a2)), n2[a2] = t2[a2]);
        return e2.concat(n2 || Array.prototype.slice.call(t2));
      }
      r.r(t), r.d(t, { LookupSupportedLocales: () => h, ResolveLocale: () => _, match: () => g }), Object.create, Object.create;
      var a, i = ("function" == typeof SuppressedError && SuppressedError, { supplemental: { languageMatching: { "written-new": [{ paradigmLocales: { _locales: "en en_GB es es_419 pt_BR pt_PT" } }, { $enUS: { _value: "AS+CA+GU+MH+MP+PH+PR+UM+US+VI" } }, { $cnsar: { _value: "HK+MO" } }, { $americas: { _value: "019" } }, { $maghreb: { _value: "MA+DZ+TN+LY+MR+EH" } }, { no: { _desired: "nb", _distance: "1" } }, { bs: { _desired: "hr", _distance: "4" } }, { bs: { _desired: "sh", _distance: "4" } }, { hr: { _desired: "sh", _distance: "4" } }, { sr: { _desired: "sh", _distance: "4" } }, { aa: { _desired: "ssy", _distance: "4" } }, { de: { _desired: "gsw", _distance: "4", _oneway: "true" } }, { de: { _desired: "lb", _distance: "4", _oneway: "true" } }, { no: { _desired: "da", _distance: "8" } }, { nb: { _desired: "da", _distance: "8" } }, { ru: { _desired: "ab", _distance: "30", _oneway: "true" } }, { en: { _desired: "ach", _distance: "30", _oneway: "true" } }, { nl: { _desired: "af", _distance: "20", _oneway: "true" } }, { en: { _desired: "ak", _distance: "30", _oneway: "true" } }, { en: { _desired: "am", _distance: "30", _oneway: "true" } }, { es: { _desired: "ay", _distance: "20", _oneway: "true" } }, { ru: { _desired: "az", _distance: "30", _oneway: "true" } }, { ur: { _desired: "bal", _distance: "20", _oneway: "true" } }, { ru: { _desired: "be", _distance: "20", _oneway: "true" } }, { en: { _desired: "bem", _distance: "30", _oneway: "true" } }, { hi: { _desired: "bh", _distance: "30", _oneway: "true" } }, { en: { _desired: "bn", _distance: "30", _oneway: "true" } }, { zh: { _desired: "bo", _distance: "20", _oneway: "true" } }, { fr: { _desired: "br", _distance: "20", _oneway: "true" } }, { es: { _desired: "ca", _distance: "20", _oneway: "true" } }, { fil: { _desired: "ceb", _distance: "30", _oneway: "true" } }, { en: { _desired: "chr", _distance: "20", _oneway: "true" } }, { ar: { _desired: "ckb", _distance: "30", _oneway: "true" } }, { fr: { _desired: "co", _distance: "20", _oneway: "true" } }, { fr: { _desired: "crs", _distance: "20", _oneway: "true" } }, { sk: { _desired: "cs", _distance: "20" } }, { en: { _desired: "cy", _distance: "20", _oneway: "true" } }, { en: { _desired: "ee", _distance: "30", _oneway: "true" } }, { en: { _desired: "eo", _distance: "30", _oneway: "true" } }, { es: { _desired: "eu", _distance: "20", _oneway: "true" } }, { da: { _desired: "fo", _distance: "20", _oneway: "true" } }, { nl: { _desired: "fy", _distance: "20", _oneway: "true" } }, { en: { _desired: "ga", _distance: "20", _oneway: "true" } }, { en: { _desired: "gaa", _distance: "30", _oneway: "true" } }, { en: { _desired: "gd", _distance: "20", _oneway: "true" } }, { es: { _desired: "gl", _distance: "20", _oneway: "true" } }, { es: { _desired: "gn", _distance: "20", _oneway: "true" } }, { hi: { _desired: "gu", _distance: "30", _oneway: "true" } }, { en: { _desired: "ha", _distance: "30", _oneway: "true" } }, { en: { _desired: "haw", _distance: "20", _oneway: "true" } }, { fr: { _desired: "ht", _distance: "20", _oneway: "true" } }, { ru: { _desired: "hy", _distance: "30", _oneway: "true" } }, { en: { _desired: "ia", _distance: "30", _oneway: "true" } }, { en: { _desired: "ig", _distance: "30", _oneway: "true" } }, { en: { _desired: "is", _distance: "20", _oneway: "true" } }, { id: { _desired: "jv", _distance: "20", _oneway: "true" } }, { en: { _desired: "ka", _distance: "30", _oneway: "true" } }, { fr: { _desired: "kg", _distance: "30", _oneway: "true" } }, { ru: { _desired: "kk", _distance: "30", _oneway: "true" } }, { en: { _desired: "km", _distance: "30", _oneway: "true" } }, { en: { _desired: "kn", _distance: "30", _oneway: "true" } }, { en: { _desired: "kri", _distance: "30", _oneway: "true" } }, { tr: { _desired: "ku", _distance: "30", _oneway: "true" } }, { ru: { _desired: "ky", _distance: "30", _oneway: "true" } }, { it: { _desired: "la", _distance: "20", _oneway: "true" } }, { en: { _desired: "lg", _distance: "30", _oneway: "true" } }, { fr: { _desired: "ln", _distance: "30", _oneway: "true" } }, { en: { _desired: "lo", _distance: "30", _oneway: "true" } }, { en: { _desired: "loz", _distance: "30", _oneway: "true" } }, { fr: { _desired: "lua", _distance: "30", _oneway: "true" } }, { hi: { _desired: "mai", _distance: "20", _oneway: "true" } }, { en: { _desired: "mfe", _distance: "30", _oneway: "true" } }, { fr: { _desired: "mg", _distance: "30", _oneway: "true" } }, { en: { _desired: "mi", _distance: "20", _oneway: "true" } }, { en: { _desired: "ml", _distance: "30", _oneway: "true" } }, { ru: { _desired: "mn", _distance: "30", _oneway: "true" } }, { hi: { _desired: "mr", _distance: "30", _oneway: "true" } }, { id: { _desired: "ms", _distance: "30", _oneway: "true" } }, { en: { _desired: "mt", _distance: "30", _oneway: "true" } }, { en: { _desired: "my", _distance: "30", _oneway: "true" } }, { en: { _desired: "ne", _distance: "30", _oneway: "true" } }, { nb: { _desired: "nn", _distance: "20" } }, { no: { _desired: "nn", _distance: "20" } }, { en: { _desired: "nso", _distance: "30", _oneway: "true" } }, { en: { _desired: "ny", _distance: "30", _oneway: "true" } }, { en: { _desired: "nyn", _distance: "30", _oneway: "true" } }, { fr: { _desired: "oc", _distance: "20", _oneway: "true" } }, { en: { _desired: "om", _distance: "30", _oneway: "true" } }, { en: { _desired: "or", _distance: "30", _oneway: "true" } }, { en: { _desired: "pa", _distance: "30", _oneway: "true" } }, { en: { _desired: "pcm", _distance: "20", _oneway: "true" } }, { en: { _desired: "ps", _distance: "30", _oneway: "true" } }, { es: { _desired: "qu", _distance: "30", _oneway: "true" } }, { de: { _desired: "rm", _distance: "20", _oneway: "true" } }, { en: { _desired: "rn", _distance: "30", _oneway: "true" } }, { fr: { _desired: "rw", _distance: "30", _oneway: "true" } }, { hi: { _desired: "sa", _distance: "30", _oneway: "true" } }, { en: { _desired: "sd", _distance: "30", _oneway: "true" } }, { en: { _desired: "si", _distance: "30", _oneway: "true" } }, { en: { _desired: "sn", _distance: "30", _oneway: "true" } }, { en: { _desired: "so", _distance: "30", _oneway: "true" } }, { en: { _desired: "sq", _distance: "30", _oneway: "true" } }, { en: { _desired: "st", _distance: "30", _oneway: "true" } }, { id: { _desired: "su", _distance: "20", _oneway: "true" } }, { en: { _desired: "sw", _distance: "30", _oneway: "true" } }, { en: { _desired: "ta", _distance: "30", _oneway: "true" } }, { en: { _desired: "te", _distance: "30", _oneway: "true" } }, { ru: { _desired: "tg", _distance: "30", _oneway: "true" } }, { en: { _desired: "ti", _distance: "30", _oneway: "true" } }, { ru: { _desired: "tk", _distance: "30", _oneway: "true" } }, { en: { _desired: "tlh", _distance: "30", _oneway: "true" } }, { en: { _desired: "tn", _distance: "30", _oneway: "true" } }, { en: { _desired: "to", _distance: "30", _oneway: "true" } }, { ru: { _desired: "tt", _distance: "30", _oneway: "true" } }, { en: { _desired: "tum", _distance: "30", _oneway: "true" } }, { zh: { _desired: "ug", _distance: "20", _oneway: "true" } }, { ru: { _desired: "uk", _distance: "20", _oneway: "true" } }, { en: { _desired: "ur", _distance: "30", _oneway: "true" } }, { ru: { _desired: "uz", _distance: "30", _oneway: "true" } }, { fr: { _desired: "wo", _distance: "30", _oneway: "true" } }, { en: { _desired: "xh", _distance: "30", _oneway: "true" } }, { en: { _desired: "yi", _distance: "30", _oneway: "true" } }, { en: { _desired: "yo", _distance: "30", _oneway: "true" } }, { zh: { _desired: "za", _distance: "20", _oneway: "true" } }, { en: { _desired: "zu", _distance: "30", _oneway: "true" } }, { ar: { _desired: "aao", _distance: "10", _oneway: "true" } }, { ar: { _desired: "abh", _distance: "10", _oneway: "true" } }, { ar: { _desired: "abv", _distance: "10", _oneway: "true" } }, { ar: { _desired: "acm", _distance: "10", _oneway: "true" } }, { ar: { _desired: "acq", _distance: "10", _oneway: "true" } }, { ar: { _desired: "acw", _distance: "10", _oneway: "true" } }, { ar: { _desired: "acx", _distance: "10", _oneway: "true" } }, { ar: { _desired: "acy", _distance: "10", _oneway: "true" } }, { ar: { _desired: "adf", _distance: "10", _oneway: "true" } }, { ar: { _desired: "aeb", _distance: "10", _oneway: "true" } }, { ar: { _desired: "aec", _distance: "10", _oneway: "true" } }, { ar: { _desired: "afb", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ajp", _distance: "10", _oneway: "true" } }, { ar: { _desired: "apc", _distance: "10", _oneway: "true" } }, { ar: { _desired: "apd", _distance: "10", _oneway: "true" } }, { ar: { _desired: "arq", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ars", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ary", _distance: "10", _oneway: "true" } }, { ar: { _desired: "arz", _distance: "10", _oneway: "true" } }, { ar: { _desired: "auz", _distance: "10", _oneway: "true" } }, { ar: { _desired: "avl", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ayh", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ayl", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ayn", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ayp", _distance: "10", _oneway: "true" } }, { ar: { _desired: "bbz", _distance: "10", _oneway: "true" } }, { ar: { _desired: "pga", _distance: "10", _oneway: "true" } }, { ar: { _desired: "shu", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ssh", _distance: "10", _oneway: "true" } }, { az: { _desired: "azb", _distance: "10", _oneway: "true" } }, { et: { _desired: "vro", _distance: "10", _oneway: "true" } }, { ff: { _desired: "ffm", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fub", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fue", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fuf", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fuh", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fui", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fuq", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fuv", _distance: "10", _oneway: "true" } }, { gn: { _desired: "gnw", _distance: "10", _oneway: "true" } }, { gn: { _desired: "gui", _distance: "10", _oneway: "true" } }, { gn: { _desired: "gun", _distance: "10", _oneway: "true" } }, { gn: { _desired: "nhd", _distance: "10", _oneway: "true" } }, { iu: { _desired: "ikt", _distance: "10", _oneway: "true" } }, { kln: { _desired: "enb", _distance: "10", _oneway: "true" } }, { kln: { _desired: "eyo", _distance: "10", _oneway: "true" } }, { kln: { _desired: "niq", _distance: "10", _oneway: "true" } }, { kln: { _desired: "oki", _distance: "10", _oneway: "true" } }, { kln: { _desired: "pko", _distance: "10", _oneway: "true" } }, { kln: { _desired: "sgc", _distance: "10", _oneway: "true" } }, { kln: { _desired: "tec", _distance: "10", _oneway: "true" } }, { kln: { _desired: "tuy", _distance: "10", _oneway: "true" } }, { kok: { _desired: "gom", _distance: "10", _oneway: "true" } }, { kpe: { _desired: "gkp", _distance: "10", _oneway: "true" } }, { luy: { _desired: "ida", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lkb", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lko", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lks", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lri", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lrm", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lsm", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lto", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lts", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lwg", _distance: "10", _oneway: "true" } }, { luy: { _desired: "nle", _distance: "10", _oneway: "true" } }, { luy: { _desired: "nyd", _distance: "10", _oneway: "true" } }, { luy: { _desired: "rag", _distance: "10", _oneway: "true" } }, { lv: { _desired: "ltg", _distance: "10", _oneway: "true" } }, { mg: { _desired: "bhr", _distance: "10", _oneway: "true" } }, { mg: { _desired: "bjq", _distance: "10", _oneway: "true" } }, { mg: { _desired: "bmm", _distance: "10", _oneway: "true" } }, { mg: { _desired: "bzc", _distance: "10", _oneway: "true" } }, { mg: { _desired: "msh", _distance: "10", _oneway: "true" } }, { mg: { _desired: "skg", _distance: "10", _oneway: "true" } }, { mg: { _desired: "tdx", _distance: "10", _oneway: "true" } }, { mg: { _desired: "tkg", _distance: "10", _oneway: "true" } }, { mg: { _desired: "txy", _distance: "10", _oneway: "true" } }, { mg: { _desired: "xmv", _distance: "10", _oneway: "true" } }, { mg: { _desired: "xmw", _distance: "10", _oneway: "true" } }, { mn: { _desired: "mvf", _distance: "10", _oneway: "true" } }, { ms: { _desired: "bjn", _distance: "10", _oneway: "true" } }, { ms: { _desired: "btj", _distance: "10", _oneway: "true" } }, { ms: { _desired: "bve", _distance: "10", _oneway: "true" } }, { ms: { _desired: "bvu", _distance: "10", _oneway: "true" } }, { ms: { _desired: "coa", _distance: "10", _oneway: "true" } }, { ms: { _desired: "dup", _distance: "10", _oneway: "true" } }, { ms: { _desired: "hji", _distance: "10", _oneway: "true" } }, { ms: { _desired: "id", _distance: "10", _oneway: "true" } }, { ms: { _desired: "jak", _distance: "10", _oneway: "true" } }, { ms: { _desired: "jax", _distance: "10", _oneway: "true" } }, { ms: { _desired: "kvb", _distance: "10", _oneway: "true" } }, { ms: { _desired: "kvr", _distance: "10", _oneway: "true" } }, { ms: { _desired: "kxd", _distance: "10", _oneway: "true" } }, { ms: { _desired: "lce", _distance: "10", _oneway: "true" } }, { ms: { _desired: "lcf", _distance: "10", _oneway: "true" } }, { ms: { _desired: "liw", _distance: "10", _oneway: "true" } }, { ms: { _desired: "max", _distance: "10", _oneway: "true" } }, { ms: { _desired: "meo", _distance: "10", _oneway: "true" } }, { ms: { _desired: "mfa", _distance: "10", _oneway: "true" } }, { ms: { _desired: "mfb", _distance: "10", _oneway: "true" } }, { ms: { _desired: "min", _distance: "10", _oneway: "true" } }, { ms: { _desired: "mqg", _distance: "10", _oneway: "true" } }, { ms: { _desired: "msi", _distance: "10", _oneway: "true" } }, { ms: { _desired: "mui", _distance: "10", _oneway: "true" } }, { ms: { _desired: "orn", _distance: "10", _oneway: "true" } }, { ms: { _desired: "ors", _distance: "10", _oneway: "true" } }, { ms: { _desired: "pel", _distance: "10", _oneway: "true" } }, { ms: { _desired: "pse", _distance: "10", _oneway: "true" } }, { ms: { _desired: "tmw", _distance: "10", _oneway: "true" } }, { ms: { _desired: "urk", _distance: "10", _oneway: "true" } }, { ms: { _desired: "vkk", _distance: "10", _oneway: "true" } }, { ms: { _desired: "vkt", _distance: "10", _oneway: "true" } }, { ms: { _desired: "xmm", _distance: "10", _oneway: "true" } }, { ms: { _desired: "zlm", _distance: "10", _oneway: "true" } }, { ms: { _desired: "zmi", _distance: "10", _oneway: "true" } }, { ne: { _desired: "dty", _distance: "10", _oneway: "true" } }, { om: { _desired: "gax", _distance: "10", _oneway: "true" } }, { om: { _desired: "hae", _distance: "10", _oneway: "true" } }, { om: { _desired: "orc", _distance: "10", _oneway: "true" } }, { or: { _desired: "spv", _distance: "10", _oneway: "true" } }, { ps: { _desired: "pbt", _distance: "10", _oneway: "true" } }, { ps: { _desired: "pst", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qub", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qud", _distance: "10", _oneway: "true" } }, { qu: { _desired: "quf", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qug", _distance: "10", _oneway: "true" } }, { qu: { _desired: "quh", _distance: "10", _oneway: "true" } }, { qu: { _desired: "quk", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qul", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qup", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qur", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qus", _distance: "10", _oneway: "true" } }, { qu: { _desired: "quw", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qux", _distance: "10", _oneway: "true" } }, { qu: { _desired: "quy", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qva", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvc", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qve", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvh", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvi", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvj", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvl", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvm", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvn", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvo", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvp", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvs", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvw", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvz", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qwa", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qwc", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qwh", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qws", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxa", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxc", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxh", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxl", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxn", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxo", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxp", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxr", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxt", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxu", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxw", _distance: "10", _oneway: "true" } }, { sc: { _desired: "sdc", _distance: "10", _oneway: "true" } }, { sc: { _desired: "sdn", _distance: "10", _oneway: "true" } }, { sc: { _desired: "sro", _distance: "10", _oneway: "true" } }, { sq: { _desired: "aae", _distance: "10", _oneway: "true" } }, { sq: { _desired: "aat", _distance: "10", _oneway: "true" } }, { sq: { _desired: "aln", _distance: "10", _oneway: "true" } }, { syr: { _desired: "aii", _distance: "10", _oneway: "true" } }, { uz: { _desired: "uzs", _distance: "10", _oneway: "true" } }, { yi: { _desired: "yih", _distance: "10", _oneway: "true" } }, { zh: { _desired: "cdo", _distance: "10", _oneway: "true" } }, { zh: { _desired: "cjy", _distance: "10", _oneway: "true" } }, { zh: { _desired: "cpx", _distance: "10", _oneway: "true" } }, { zh: { _desired: "czh", _distance: "10", _oneway: "true" } }, { zh: { _desired: "czo", _distance: "10", _oneway: "true" } }, { zh: { _desired: "gan", _distance: "10", _oneway: "true" } }, { zh: { _desired: "hak", _distance: "10", _oneway: "true" } }, { zh: { _desired: "hsn", _distance: "10", _oneway: "true" } }, { zh: { _desired: "lzh", _distance: "10", _oneway: "true" } }, { zh: { _desired: "mnp", _distance: "10", _oneway: "true" } }, { zh: { _desired: "nan", _distance: "10", _oneway: "true" } }, { zh: { _desired: "wuu", _distance: "10", _oneway: "true" } }, { zh: { _desired: "yue", _distance: "10", _oneway: "true" } }, { "*": { _desired: "*", _distance: "80" } }, { "en-Latn": { _desired: "am-Ethi", _distance: "10", _oneway: "true" } }, { "ru-Cyrl": { _desired: "az-Latn", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "bn-Beng", _distance: "10", _oneway: "true" } }, { "zh-Hans": { _desired: "bo-Tibt", _distance: "10", _oneway: "true" } }, { "ru-Cyrl": { _desired: "hy-Armn", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ka-Geor", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "km-Khmr", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "kn-Knda", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "lo-Laoo", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ml-Mlym", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "my-Mymr", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ne-Deva", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "or-Orya", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "pa-Guru", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ps-Arab", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "sd-Arab", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "si-Sinh", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ta-Taml", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "te-Telu", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ti-Ethi", _distance: "10", _oneway: "true" } }, { "ru-Cyrl": { _desired: "tk-Latn", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ur-Arab", _distance: "10", _oneway: "true" } }, { "ru-Cyrl": { _desired: "uz-Latn", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "yi-Hebr", _distance: "10", _oneway: "true" } }, { "sr-Cyrl": { _desired: "sr-Latn", _distance: "5" } }, { "zh-Hans": { _desired: "za-Latn", _distance: "10", _oneway: "true" } }, { "zh-Hans": { _desired: "zh-Hani", _distance: "20", _oneway: "true" } }, { "zh-Hant": { _desired: "zh-Hani", _distance: "20", _oneway: "true" } }, { "ar-Arab": { _desired: "ar-Latn", _distance: "20", _oneway: "true" } }, { "bn-Beng": { _desired: "bn-Latn", _distance: "20", _oneway: "true" } }, { "gu-Gujr": { _desired: "gu-Latn", _distance: "20", _oneway: "true" } }, { "hi-Deva": { _desired: "hi-Latn", _distance: "20", _oneway: "true" } }, { "kn-Knda": { _desired: "kn-Latn", _distance: "20", _oneway: "true" } }, { "ml-Mlym": { _desired: "ml-Latn", _distance: "20", _oneway: "true" } }, { "mr-Deva": { _desired: "mr-Latn", _distance: "20", _oneway: "true" } }, { "ta-Taml": { _desired: "ta-Latn", _distance: "20", _oneway: "true" } }, { "te-Telu": { _desired: "te-Latn", _distance: "20", _oneway: "true" } }, { "zh-Hans": { _desired: "zh-Latn", _distance: "20", _oneway: "true" } }, { "ja-Jpan": { _desired: "ja-Latn", _distance: "5", _oneway: "true" } }, { "ja-Jpan": { _desired: "ja-Hani", _distance: "5", _oneway: "true" } }, { "ja-Jpan": { _desired: "ja-Hira", _distance: "5", _oneway: "true" } }, { "ja-Jpan": { _desired: "ja-Kana", _distance: "5", _oneway: "true" } }, { "ja-Jpan": { _desired: "ja-Hrkt", _distance: "5", _oneway: "true" } }, { "ja-Hrkt": { _desired: "ja-Hira", _distance: "5", _oneway: "true" } }, { "ja-Hrkt": { _desired: "ja-Kana", _distance: "5", _oneway: "true" } }, { "ko-Kore": { _desired: "ko-Hani", _distance: "5", _oneway: "true" } }, { "ko-Kore": { _desired: "ko-Hang", _distance: "5", _oneway: "true" } }, { "ko-Kore": { _desired: "ko-Jamo", _distance: "5", _oneway: "true" } }, { "ko-Hang": { _desired: "ko-Jamo", _distance: "5", _oneway: "true" } }, { "*-*": { _desired: "*-*", _distance: "50" } }, { "ar-*-$maghreb": { _desired: "ar-*-$maghreb", _distance: "4" } }, { "ar-*-$!maghreb": { _desired: "ar-*-$!maghreb", _distance: "4" } }, { "ar-*-*": { _desired: "ar-*-*", _distance: "5" } }, { "en-*-$enUS": { _desired: "en-*-$enUS", _distance: "4" } }, { "en-*-GB": { _desired: "en-*-$!enUS", _distance: "3" } }, { "en-*-$!enUS": { _desired: "en-*-$!enUS", _distance: "4" } }, { "en-*-*": { _desired: "en-*-*", _distance: "5" } }, { "es-*-$americas": { _desired: "es-*-$americas", _distance: "4" } }, { "es-*-$!americas": { _desired: "es-*-$!americas", _distance: "4" } }, { "es-*-*": { _desired: "es-*-*", _distance: "5" } }, { "pt-*-$americas": { _desired: "pt-*-$americas", _distance: "4" } }, { "pt-*-$!americas": { _desired: "pt-*-$!americas", _distance: "4" } }, { "pt-*-*": { _desired: "pt-*-*", _distance: "5" } }, { "zh-Hant-$cnsar": { _desired: "zh-Hant-$cnsar", _distance: "4" } }, { "zh-Hant-$!cnsar": { _desired: "zh-Hant-$!cnsar", _distance: "4" } }, { "zh-Hant-*": { _desired: "zh-Hant-*", _distance: "5" } }, { "*-*-*": { _desired: "*-*-*", _distance: "4" } }] } } }), o = { "001": ["001", "001-status-grouping", "002", "005", "009", "011", "013", "014", "015", "017", "018", "019", "021", "029", "030", "034", "035", "039", "053", "054", "057", "061", "142", "143", "145", "150", "151", "154", "155", "AC", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AS", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CC", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CP", "CQ", "CR", "CU", "CV", "CW", "CX", "CY", "CZ", "DE", "DG", "DJ", "DK", "DM", "DO", "DZ", "EA", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "EU", "EZ", "FI", "FJ", "FK", "FM", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HM", "HN", "HR", "HT", "HU", "IC", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IR", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PW", "PY", "QA", "QO", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SY", "SZ", "TA", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "UM", "UN", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VI", "VN", "VU", "WF", "WS", "XK", "YE", "YT", "ZA", "ZM", "ZW"], "002": ["002", "002-status-grouping", "011", "014", "015", "017", "018", "202", "AO", "BF", "BI", "BJ", "BW", "CD", "CF", "CG", "CI", "CM", "CV", "DJ", "DZ", "EA", "EG", "EH", "ER", "ET", "GA", "GH", "GM", "GN", "GQ", "GW", "IC", "IO", "KE", "KM", "LR", "LS", "LY", "MA", "MG", "ML", "MR", "MU", "MW", "MZ", "NA", "NE", "NG", "RE", "RW", "SC", "SD", "SH", "SL", "SN", "SO", "SS", "ST", "SZ", "TD", "TF", "TG", "TN", "TZ", "UG", "YT", "ZA", "ZM", "ZW"], "003": ["003", "013", "021", "029", "AG", "AI", "AW", "BB", "BL", "BM", "BQ", "BS", "BZ", "CA", "CR", "CU", "CW", "DM", "DO", "GD", "GL", "GP", "GT", "HN", "HT", "JM", "KN", "KY", "LC", "MF", "MQ", "MS", "MX", "NI", "PA", "PM", "PR", "SV", "SX", "TC", "TT", "US", "VC", "VG", "VI"], "005": ["005", "AR", "BO", "BR", "BV", "CL", "CO", "EC", "FK", "GF", "GS", "GY", "PE", "PY", "SR", "UY", "VE"], "009": ["009", "053", "054", "057", "061", "AC", "AQ", "AS", "AU", "CC", "CK", "CP", "CX", "DG", "FJ", "FM", "GU", "HM", "KI", "MH", "MP", "NC", "NF", "NR", "NU", "NZ", "PF", "PG", "PN", "PW", "QO", "SB", "TA", "TK", "TO", "TV", "UM", "VU", "WF", "WS"], "011": ["011", "BF", "BJ", "CI", "CV", "GH", "GM", "GN", "GW", "LR", "ML", "MR", "NE", "NG", "SH", "SL", "SN", "TG"], "013": ["013", "BZ", "CR", "GT", "HN", "MX", "NI", "PA", "SV"], "014": ["014", "BI", "DJ", "ER", "ET", "IO", "KE", "KM", "MG", "MU", "MW", "MZ", "RE", "RW", "SC", "SO", "SS", "TF", "TZ", "UG", "YT", "ZM", "ZW"], "015": ["015", "DZ", "EA", "EG", "EH", "IC", "LY", "MA", "SD", "TN"], "017": ["017", "AO", "CD", "CF", "CG", "CM", "GA", "GQ", "ST", "TD"], "018": ["018", "BW", "LS", "NA", "SZ", "ZA"], "019": ["003", "005", "013", "019", "019-status-grouping", "021", "029", "419", "AG", "AI", "AR", "AW", "BB", "BL", "BM", "BO", "BQ", "BR", "BS", "BV", "BZ", "CA", "CL", "CO", "CR", "CU", "CW", "DM", "DO", "EC", "FK", "GD", "GF", "GL", "GP", "GS", "GT", "GY", "HN", "HT", "JM", "KN", "KY", "LC", "MF", "MQ", "MS", "MX", "NI", "PA", "PE", "PM", "PR", "PY", "SR", "SV", "SX", "TC", "TT", "US", "UY", "VC", "VE", "VG", "VI"], "021": ["021", "BM", "CA", "GL", "PM", "US"], "029": ["029", "AG", "AI", "AW", "BB", "BL", "BQ", "BS", "CU", "CW", "DM", "DO", "GD", "GP", "HT", "JM", "KN", "KY", "LC", "MF", "MQ", "MS", "PR", "SX", "TC", "TT", "VC", "VG", "VI"], "030": ["030", "CN", "HK", "JP", "KP", "KR", "MN", "MO", "TW"], "034": ["034", "AF", "BD", "BT", "IN", "IR", "LK", "MV", "NP", "PK"], "035": ["035", "BN", "ID", "KH", "LA", "MM", "MY", "PH", "SG", "TH", "TL", "VN"], "039": ["039", "AD", "AL", "BA", "ES", "GI", "GR", "HR", "IT", "ME", "MK", "MT", "PT", "RS", "SI", "SM", "VA", "XK"], "053": ["053", "AU", "CC", "CX", "HM", "NF", "NZ"], "054": ["054", "FJ", "NC", "PG", "SB", "VU"], "057": ["057", "FM", "GU", "KI", "MH", "MP", "NR", "PW", "UM"], "061": ["061", "AS", "CK", "NU", "PF", "PN", "TK", "TO", "TV", "WF", "WS"], 142: ["030", "034", "035", "142", "143", "145", "AE", "AF", "AM", "AZ", "BD", "BH", "BN", "BT", "CN", "CY", "GE", "HK", "ID", "IL", "IN", "IQ", "IR", "JO", "JP", "KG", "KH", "KP", "KR", "KW", "KZ", "LA", "LB", "LK", "MM", "MN", "MO", "MV", "MY", "NP", "OM", "PH", "PK", "PS", "QA", "SA", "SG", "SY", "TH", "TJ", "TL", "TM", "TR", "TW", "UZ", "VN", "YE"], 143: ["143", "KG", "KZ", "TJ", "TM", "UZ"], 145: ["145", "AE", "AM", "AZ", "BH", "CY", "GE", "IL", "IQ", "JO", "KW", "LB", "OM", "PS", "QA", "SA", "SY", "TR", "YE"], 150: ["039", "150", "151", "154", "155", "AD", "AL", "AT", "AX", "BA", "BE", "BG", "BY", "CH", "CQ", "CZ", "DE", "DK", "EE", "ES", "FI", "FO", "FR", "GB", "GG", "GI", "GR", "HR", "HU", "IE", "IM", "IS", "IT", "JE", "LI", "LT", "LU", "LV", "MC", "MD", "ME", "MK", "MT", "NL", "NO", "PL", "PT", "RO", "RS", "RU", "SE", "SI", "SJ", "SK", "SM", "UA", "VA", "XK"], 151: ["151", "BG", "BY", "CZ", "HU", "MD", "PL", "RO", "RU", "SK", "UA"], 154: ["154", "AX", "CQ", "DK", "EE", "FI", "FO", "GB", "GG", "IE", "IM", "IS", "JE", "LT", "LV", "NO", "SE", "SJ"], 155: ["155", "AT", "BE", "CH", "DE", "FR", "LI", "LU", "MC", "NL"], 202: ["011", "014", "017", "018", "202", "AO", "BF", "BI", "BJ", "BW", "CD", "CF", "CG", "CI", "CM", "CV", "DJ", "ER", "ET", "GA", "GH", "GM", "GN", "GQ", "GW", "IO", "KE", "KM", "LR", "LS", "MG", "ML", "MR", "MU", "MW", "MZ", "NA", "NE", "NG", "RE", "RW", "SC", "SH", "SL", "SN", "SO", "SS", "ST", "SZ", "TD", "TF", "TG", "TZ", "UG", "YT", "ZA", "ZM", "ZW"], 419: ["005", "013", "029", "419", "AG", "AI", "AR", "AW", "BB", "BL", "BO", "BQ", "BR", "BS", "BV", "BZ", "CL", "CO", "CR", "CU", "CW", "DM", "DO", "EC", "FK", "GD", "GF", "GP", "GS", "GT", "GY", "HN", "HT", "JM", "KN", "KY", "LC", "MF", "MQ", "MS", "MX", "NI", "PA", "PE", "PR", "PY", "SR", "SV", "SX", "TC", "TT", "UY", "VC", "VE", "VG", "VI"], EU: ["AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "ES", "EU", "FI", "FR", "GR", "HR", "HU", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PL", "PT", "RO", "SE", "SI", "SK"], EZ: ["AT", "BE", "CY", "DE", "EE", "ES", "EZ", "FI", "FR", "GR", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PT", "SI", "SK"], QO: ["AC", "AQ", "CP", "DG", "QO", "TA"], UN: ["AD", "AE", "AF", "AG", "AL", "AM", "AO", "AR", "AT", "AU", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BN", "BO", "BR", "BS", "BT", "BW", "BY", "BZ", "CA", "CD", "CF", "CG", "CH", "CI", "CL", "CM", "CN", "CO", "CR", "CU", "CV", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "ER", "ES", "ET", "FI", "FJ", "FM", "FR", "GA", "GB", "GD", "GE", "GH", "GM", "GN", "GQ", "GR", "GT", "GW", "GY", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IN", "IQ", "IR", "IS", "IT", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MG", "MH", "MK", "ML", "MM", "MN", "MR", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NE", "NG", "NI", "NL", "NO", "NP", "NR", "NZ", "OM", "PA", "PE", "PG", "PH", "PK", "PL", "PT", "PW", "PY", "QA", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SI", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SY", "SZ", "TD", "TG", "TH", "TJ", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TZ", "UA", "UG", "UN", "US", "UY", "UZ", "VC", "VE", "VN", "VU", "WS", "YE", "ZA", "ZM", "ZW"] }, s = /-u(?:-[0-9a-z]{2,8})+/gi;
      function l(e2, t2, r2) {
        if (void 0 === r2 && (r2 = Error), !e2) throw new r2(t2);
      }
      function d(e2, t2, r2) {
        var a2 = t2.split("-"), i2 = a2[0], s2 = a2[1], l2 = a2[2], d2 = true;
        if (l2 && "$" === l2[0]) {
          var u2 = "!" !== l2[1], c2 = (u2 ? r2[l2.slice(1)] : r2[l2.slice(2)]).map(function(e3) {
            return o[e3] || [e3];
          }).reduce(function(e3, t3) {
            return n(n([], e3, true), t3, true);
          }, []);
          d2 && (d2 = !(c2.indexOf(e2.region || "") > 1 != u2));
        } else d2 && (d2 = !e2.region || "*" === l2 || l2 === e2.region);
        return d2 && (d2 = !e2.script || "*" === s2 || s2 === e2.script), d2 && (d2 = !e2.language || "*" === i2 || i2 === e2.language), d2;
      }
      function u(e2) {
        return [e2.language, e2.script, e2.region].filter(Boolean).join("-");
      }
      function c(e2, t2, r2) {
        for (var n2 = 0, a2 = r2.matches; n2 < a2.length; n2++) {
          var i2 = a2[n2], o2 = d(e2, i2.desired, r2.matchVariables) && d(t2, i2.supported, r2.matchVariables);
          if (i2.oneway || o2 || (o2 = d(e2, i2.supported, r2.matchVariables) && d(t2, i2.desired, r2.matchVariables)), o2) {
            var s2 = 10 * i2.distance;
            if (r2.paradigmLocales.indexOf(u(e2)) > -1 != r2.paradigmLocales.indexOf(u(t2)) > -1) return s2 - 1;
            return s2;
          }
        }
        throw Error("No matching distance found");
      }
      function f(e2) {
        return Intl.getCanonicalLocales(e2)[0];
      }
      function p(e2, t2) {
        for (var r2 = t2; ; ) {
          if (e2.indexOf(r2) > -1) return r2;
          var n2 = r2.lastIndexOf("-");
          if (!~n2) return;
          n2 >= 2 && "-" === r2[n2 - 2] && (n2 -= 2), r2 = r2.slice(0, n2);
        }
      }
      function _(e2, t2, r2, o2, d2, u2) {
        "lookup" === r2.localeMatcher ? h2 = function(e3, t3, r3) {
          for (var n2 = { locale: "" }, a2 = 0; a2 < t3.length; a2++) {
            var i2 = t3[a2], o3 = i2.replace(s, ""), l2 = p(e3, o3);
            if (l2) return n2.locale = l2, i2 !== o3 && (n2.extension = i2.slice(o3.length, i2.length)), n2;
          }
          return n2.locale = r3(), n2;
        }(Array.from(e2), t2, u2) : (m = Array.from(e2), v = [], b = t2.reduce(function(e3, t3) {
          var r3 = t3.replace(s, "");
          return v.push(r3), e3[r3] = t3, e3;
        }, {}), (void 0 === x && (x = 838), S = 1 / 0, P = { matchedDesiredLocale: "", distances: {} }, v.forEach(function(e3, t3) {
          P.distances[e3] || (P.distances[e3] = {}), m.forEach(function(r3) {
            var o3, s2, l2, d3, u3, f2, p2 = (o3 = new Intl.Locale(e3).maximize(), s2 = new Intl.Locale(r3).maximize(), l2 = { language: o3.language, script: o3.script || "", region: o3.region || "" }, d3 = { language: s2.language, script: s2.script || "", region: s2.region || "" }, u3 = 0, f2 = function() {
              var e4, t4;
              if (!a) {
                var r4 = null === (t4 = null === (e4 = i.supplemental.languageMatching["written-new"][0]) || void 0 === e4 ? void 0 : e4.paradigmLocales) || void 0 === t4 ? void 0 : t4._locales.split(" "), o4 = i.supplemental.languageMatching["written-new"].slice(1, 5);
                a = { matches: i.supplemental.languageMatching["written-new"].slice(5).map(function(e5) {
                  var t5 = Object.keys(e5)[0], r5 = e5[t5];
                  return { supported: t5, desired: r5._desired, distance: +r5._distance, oneway: "true" === r5.oneway };
                }, {}), matchVariables: o4.reduce(function(e5, t5) {
                  var r5 = Object.keys(t5)[0], n2 = t5[r5];
                  return e5[r5.slice(1)] = n2._value.split("+"), e5;
                }, {}), paradigmLocales: n(n([], r4, true), r4.map(function(e5) {
                  return new Intl.Locale(e5.replace(/_/g, "-")).maximize().toString();
                }), true) };
              }
              return a;
            }(), l2.language !== d3.language && (u3 += c({ language: o3.language, script: "", region: "" }, { language: s2.language, script: "", region: "" }, f2)), l2.script !== d3.script && (u3 += c({ language: o3.language, script: l2.script, region: "" }, { language: s2.language, script: l2.script, region: "" }, f2)), l2.region !== d3.region && (u3 += c(l2, d3, f2)), u3 + 0 + 40 * t3);
            P.distances[e3][r3] = p2, p2 < S && (S = p2, P.matchedDesiredLocale = e3, P.matchedSupportedLocale = r3);
          });
        }), S >= x && (P.matchedDesiredLocale = void 0, P.matchedSupportedLocale = void 0), P).matchedSupportedLocale && P.matchedDesiredLocale && (y = P.matchedSupportedLocale, w = b[P.matchedDesiredLocale].slice(P.matchedDesiredLocale.length) || void 0), h2 = y ? { locale: y, extension: w } : { locale: u2() }), null == h2 && (h2 = { locale: u2(), extension: "" });
        var _2, h2, g2, m, y, w, v, b, x, S, P, C = h2.locale, R = d2[C], L = { locale: "en", dataLocale: C };
        g2 = h2.extension ? function(e3) {
          l(e3 === e3.toLowerCase(), "Expected extension to be lowercase"), l("-u-" === e3.slice(0, 3), "Expected extension to be a Unicode locale extension");
          for (var t3, r3 = [], n2 = [], a2 = e3.length, i2 = 3; i2 < a2; ) {
            var o3 = e3.indexOf("-", i2), s2 = void 0;
            s2 = -1 === o3 ? a2 - i2 : o3 - i2;
            var d3 = e3.slice(i2, i2 + s2);
            l(s2 >= 2, "Expected a subtag to have at least 2 characters"), void 0 === t3 && 2 != s2 ? -1 === r3.indexOf(d3) && r3.push(d3) : 2 === s2 ? (t3 = { key: d3, value: "" }, void 0 === n2.find(function(e4) {
              return e4.key === (null == t3 ? void 0 : t3.key);
            }) && n2.push(t3)) : (null == t3 ? void 0 : t3.value) === "" ? t3.value = d3 : (l(void 0 !== t3, "Expected keyword to be defined"), t3.value += "-" + d3), i2 += s2 + 1;
          }
          return { attributes: r3, keywords: n2 };
        }(h2.extension).keywords : [];
        for (var E = [], O = function(e3) {
          var t3, n2, a2 = null !== (_2 = null == R ? void 0 : R[e3]) && void 0 !== _2 ? _2 : [];
          l(Array.isArray(a2), "keyLocaleData for ".concat(e3, " must be an array"));
          var i2 = a2[0];
          l(void 0 === i2 || "string" == typeof i2, "value must be a string or undefined");
          var o3 = void 0, s2 = g2.find(function(t4) {
            return t4.key === e3;
          });
          if (s2) {
            var d3 = s2.value;
            "" !== d3 ? a2.indexOf(d3) > -1 && (o3 = { key: e3, value: i2 = d3 }) : a2.indexOf("true") > -1 && (o3 = { key: e3, value: i2 = "true" });
          }
          var u3 = r2[e3];
          l(null == u3 || "string" == typeof u3, "optionsValue must be a string or undefined"), "string" == typeof u3 && (t3 = e3.toLowerCase(), n2 = u3.toLowerCase(), l(void 0 !== t3, "ukey must be defined"), "" === (u3 = n2) && (u3 = "true")), u3 !== i2 && a2.indexOf(u3) > -1 && (i2 = u3, o3 = void 0), o3 && E.push(o3), L[e3] = i2;
        }, T = 0; T < o2.length; T++) O(o2[T]);
        return E.length > 0 && (C = function(e3, t3, r3) {
          l(-1 === e3.indexOf("-u-"), "Expected locale to not have a Unicode locale extension");
          for (var n2 = "-u", a2 = 0; a2 < t3.length; a2++) {
            var i2 = t3[a2];
            n2 += "-".concat(i2);
          }
          for (var o3 = 0; o3 < r3.length; o3++) {
            var s2 = r3[o3], d3 = s2.key, u3 = s2.value;
            n2 += "-".concat(d3), "" !== u3 && (n2 += "-".concat(u3));
          }
          if ("-u" === n2) return f(e3);
          var c2 = e3.indexOf("-x-");
          return f(-1 === c2 ? e3 + n2 : e3.slice(0, c2) + n2 + e3.slice(c2));
        }(C, [], E)), L.locale = C, L;
      }
      function h(e2, t2) {
        for (var r2 = [], n2 = 0; n2 < t2.length; n2++) {
          var a2 = p(e2, t2[n2].replace(s, ""));
          a2 && r2.push(a2);
        }
        return r2;
      }
      function g(e2, t2, r2, n2) {
        return _(t2, Intl.getCanonicalLocales(e2), { localeMatcher: (null == n2 ? void 0 : n2.algorithm) || "best fit" }, [], {}, function() {
          return r2;
        }).locale;
      }
    }, 5664: (e, t, r) => {
      "use strict";
      var n = r(7897), a = r(7702), i = r(8147), o = r(7873);
      function s(e2) {
        if (!(this instanceof s)) return new s(e2);
        this.request = e2;
      }
      e.exports = s, e.exports.Negotiator = s, s.prototype.charset = function(e2) {
        var t2 = this.charsets(e2);
        return t2 && t2[0];
      }, s.prototype.charsets = function(e2) {
        return n(this.request.headers["accept-charset"], e2);
      }, s.prototype.encoding = function(e2, t2) {
        var r2 = this.encodings(e2, t2);
        return r2 && r2[0];
      }, s.prototype.encodings = function(e2, t2) {
        return a(this.request.headers["accept-encoding"], e2, (t2 || {}).preferred);
      }, s.prototype.language = function(e2) {
        var t2 = this.languages(e2);
        return t2 && t2[0];
      }, s.prototype.languages = function(e2) {
        return i(this.request.headers["accept-language"], e2);
      }, s.prototype.mediaType = function(e2) {
        var t2 = this.mediaTypes(e2);
        return t2 && t2[0];
      }, s.prototype.mediaTypes = function(e2) {
        return o(this.request.headers.accept, e2);
      }, s.prototype.preferredCharset = s.prototype.charset, s.prototype.preferredCharsets = s.prototype.charsets, s.prototype.preferredEncoding = s.prototype.encoding, s.prototype.preferredEncodings = s.prototype.encodings, s.prototype.preferredLanguage = s.prototype.language, s.prototype.preferredLanguages = s.prototype.languages, s.prototype.preferredMediaType = s.prototype.mediaType, s.prototype.preferredMediaTypes = s.prototype.mediaTypes;
    }, 7897: (e) => {
      "use strict";
      e.exports = r, e.exports.preferredCharsets = r;
      var t = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
      function r(e2, r2) {
        var o = function(e3) {
          for (var r3 = e3.split(","), n2 = 0, a2 = 0; n2 < r3.length; n2++) {
            var i2 = function(e4, r4) {
              var n3 = t.exec(e4);
              if (!n3) return null;
              var a3 = n3[1], i3 = 1;
              if (n3[2]) for (var o2 = n3[2].split(";"), s2 = 0; s2 < o2.length; s2++) {
                var l = o2[s2].trim().split("=");
                if ("q" === l[0]) {
                  i3 = parseFloat(l[1]);
                  break;
                }
              }
              return { charset: a3, q: i3, i: r4 };
            }(r3[n2].trim(), n2);
            i2 && (r3[a2++] = i2);
          }
          return r3.length = a2, r3;
        }(void 0 === e2 ? "*" : e2 || "");
        if (!r2) return o.filter(i).sort(n).map(a);
        var s = r2.map(function(e3, t2) {
          return function(e4, t3, r3) {
            for (var n2 = { o: -1, q: 0, s: 0 }, a2 = 0; a2 < t3.length; a2++) {
              var i2 = function(e5, t4, r4) {
                var n3 = 0;
                if (t4.charset.toLowerCase() === e5.toLowerCase()) n3 |= 1;
                else if ("*" !== t4.charset) return null;
                return { i: r4, o: t4.i, q: t4.q, s: n3 };
              }(e4, t3[a2], r3);
              i2 && 0 > (n2.s - i2.s || n2.q - i2.q || n2.o - i2.o) && (n2 = i2);
            }
            return n2;
          }(e3, o, t2);
        });
        return s.filter(i).sort(n).map(function(e3) {
          return r2[s.indexOf(e3)];
        });
      }
      function n(e2, t2) {
        return t2.q - e2.q || t2.s - e2.s || e2.o - t2.o || e2.i - t2.i || 0;
      }
      function a(e2) {
        return e2.charset;
      }
      function i(e2) {
        return e2.q > 0;
      }
    }, 7702: (e) => {
      "use strict";
      e.exports = n, e.exports.preferredEncodings = n;
      var t = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
      function r(e2, t2, r2) {
        var n2 = 0;
        if (t2.encoding.toLowerCase() === e2.toLowerCase()) n2 |= 1;
        else if ("*" !== t2.encoding) return null;
        return { encoding: e2, i: r2, o: t2.i, q: t2.q, s: n2 };
      }
      function n(e2, n2, s) {
        var l = function(e3) {
          for (var n3 = e3.split(","), a2 = false, i2 = 1, o2 = 0, s2 = 0; o2 < n3.length; o2++) {
            var l2 = function(e4, r2) {
              var n4 = t.exec(e4);
              if (!n4) return null;
              var a3 = n4[1], i3 = 1;
              if (n4[2]) for (var o3 = n4[2].split(";"), s3 = 0; s3 < o3.length; s3++) {
                var l3 = o3[s3].trim().split("=");
                if ("q" === l3[0]) {
                  i3 = parseFloat(l3[1]);
                  break;
                }
              }
              return { encoding: a3, q: i3, i: r2 };
            }(n3[o2].trim(), o2);
            l2 && (n3[s2++] = l2, a2 = a2 || r("identity", l2), i2 = Math.min(i2, l2.q || 1));
          }
          return a2 || (n3[s2++] = { encoding: "identity", q: i2, i: o2 }), n3.length = s2, n3;
        }(e2 || ""), d = s ? function(e3, t2) {
          if (e3.q !== t2.q) return t2.q - e3.q;
          var r2 = s.indexOf(e3.encoding), n3 = s.indexOf(t2.encoding);
          return -1 === r2 && -1 === n3 ? t2.s - e3.s || e3.o - t2.o || e3.i - t2.i : -1 !== r2 && -1 !== n3 ? r2 - n3 : -1 === r2 ? 1 : -1;
        } : a;
        if (!n2) return l.filter(o).sort(d).map(i);
        var u = n2.map(function(e3, t2) {
          return function(e4, t3, n3) {
            for (var a2 = { encoding: e4, o: -1, q: 0, s: 0 }, i2 = 0; i2 < t3.length; i2++) {
              var o2 = r(e4, t3[i2], n3);
              o2 && 0 > (a2.s - o2.s || a2.q - o2.q || a2.o - o2.o) && (a2 = o2);
            }
            return a2;
          }(e3, l, t2);
        });
        return u.filter(o).sort(d).map(function(e3) {
          return n2[u.indexOf(e3)];
        });
      }
      function a(e2, t2) {
        return t2.q - e2.q || t2.s - e2.s || e2.o - t2.o || e2.i - t2.i;
      }
      function i(e2) {
        return e2.encoding;
      }
      function o(e2) {
        return e2.q > 0;
      }
    }, 8147: (e) => {
      "use strict";
      e.exports = n, e.exports.preferredLanguages = n;
      var t = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
      function r(e2, r2) {
        var n2 = t.exec(e2);
        if (!n2) return null;
        var a2 = n2[1], i2 = n2[2], o2 = a2;
        i2 && (o2 += "-" + i2);
        var s = 1;
        if (n2[3]) for (var l = n2[3].split(";"), d = 0; d < l.length; d++) {
          var u = l[d].split("=");
          "q" === u[0] && (s = parseFloat(u[1]));
        }
        return { prefix: a2, suffix: i2, q: s, i: r2, full: o2 };
      }
      function n(e2, t2) {
        var n2 = function(e3) {
          for (var t3 = e3.split(","), n3 = 0, a2 = 0; n3 < t3.length; n3++) {
            var i2 = r(t3[n3].trim(), n3);
            i2 && (t3[a2++] = i2);
          }
          return t3.length = a2, t3;
        }(void 0 === e2 ? "*" : e2 || "");
        if (!t2) return n2.filter(o).sort(a).map(i);
        var s = t2.map(function(e3, t3) {
          return function(e4, t4, n3) {
            for (var a2 = { o: -1, q: 0, s: 0 }, i2 = 0; i2 < t4.length; i2++) {
              var o2 = function(e5, t5, n4) {
                var a3 = r(e5);
                if (!a3) return null;
                var i3 = 0;
                if (t5.full.toLowerCase() === a3.full.toLowerCase()) i3 |= 4;
                else if (t5.prefix.toLowerCase() === a3.full.toLowerCase()) i3 |= 2;
                else if (t5.full.toLowerCase() === a3.prefix.toLowerCase()) i3 |= 1;
                else if ("*" !== t5.full) return null;
                return { i: n4, o: t5.i, q: t5.q, s: i3 };
              }(e4, t4[i2], n3);
              o2 && 0 > (a2.s - o2.s || a2.q - o2.q || a2.o - o2.o) && (a2 = o2);
            }
            return a2;
          }(e3, n2, t3);
        });
        return s.filter(o).sort(a).map(function(e3) {
          return t2[s.indexOf(e3)];
        });
      }
      function a(e2, t2) {
        return t2.q - e2.q || t2.s - e2.s || e2.o - t2.o || e2.i - t2.i || 0;
      }
      function i(e2) {
        return e2.full;
      }
      function o(e2) {
        return e2.q > 0;
      }
    }, 7873: (e) => {
      "use strict";
      e.exports = n, e.exports.preferredMediaTypes = n;
      var t = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
      function r(e2, r2) {
        var n2 = t.exec(e2);
        if (!n2) return null;
        var a2 = /* @__PURE__ */ Object.create(null), i2 = 1, o2 = n2[2], d = n2[1];
        if (n2[3]) for (var u = function(e3) {
          for (var t2 = e3.split(";"), r3 = 1, n3 = 0; r3 < t2.length; r3++) s(t2[n3]) % 2 == 0 ? t2[++n3] = t2[r3] : t2[n3] += ";" + t2[r3];
          t2.length = n3 + 1;
          for (var r3 = 0; r3 < t2.length; r3++) t2[r3] = t2[r3].trim();
          return t2;
        }(n2[3]).map(l), c = 0; c < u.length; c++) {
          var f = u[c], p = f[0].toLowerCase(), _ = f[1], h = _ && '"' === _[0] && '"' === _[_.length - 1] ? _.slice(1, -1) : _;
          if ("q" === p) {
            i2 = parseFloat(h);
            break;
          }
          a2[p] = h;
        }
        return { type: d, subtype: o2, params: a2, q: i2, i: r2 };
      }
      function n(e2, t2) {
        var n2 = function(e3) {
          for (var t3 = function(e4) {
            for (var t4 = e4.split(","), r2 = 1, n4 = 0; r2 < t4.length; r2++) s(t4[n4]) % 2 == 0 ? t4[++n4] = t4[r2] : t4[n4] += "," + t4[r2];
            return t4.length = n4 + 1, t4;
          }(e3), n3 = 0, a2 = 0; n3 < t3.length; n3++) {
            var i2 = r(t3[n3].trim(), n3);
            i2 && (t3[a2++] = i2);
          }
          return t3.length = a2, t3;
        }(void 0 === e2 ? "*/*" : e2 || "");
        if (!t2) return n2.filter(o).sort(a).map(i);
        var l2 = t2.map(function(e3, t3) {
          return function(e4, t4, n3) {
            for (var a2 = { o: -1, q: 0, s: 0 }, i2 = 0; i2 < t4.length; i2++) {
              var o2 = function(e5, t5, n4) {
                var a3 = r(e5), i3 = 0;
                if (!a3) return null;
                if (t5.type.toLowerCase() == a3.type.toLowerCase()) i3 |= 4;
                else if ("*" != t5.type) return null;
                if (t5.subtype.toLowerCase() == a3.subtype.toLowerCase()) i3 |= 2;
                else if ("*" != t5.subtype) return null;
                var o3 = Object.keys(t5.params);
                if (o3.length > 0) {
                  if (!o3.every(function(e6) {
                    return "*" == t5.params[e6] || (t5.params[e6] || "").toLowerCase() == (a3.params[e6] || "").toLowerCase();
                  })) return null;
                  i3 |= 1;
                }
                return { i: n4, o: t5.i, q: t5.q, s: i3 };
              }(e4, t4[i2], n3);
              o2 && 0 > (a2.s - o2.s || a2.q - o2.q || a2.o - o2.o) && (a2 = o2);
            }
            return a2;
          }(e3, n2, t3);
        });
        return l2.filter(o).sort(a).map(function(e3) {
          return t2[l2.indexOf(e3)];
        });
      }
      function a(e2, t2) {
        return t2.q - e2.q || t2.s - e2.s || e2.o - t2.o || e2.i - t2.i || 0;
      }
      function i(e2) {
        return e2.type + "/" + e2.subtype;
      }
      function o(e2) {
        return e2.q > 0;
      }
      function s(e2) {
        for (var t2 = 0, r2 = 0; -1 !== (r2 = e2.indexOf('"', r2)); ) t2++, r2++;
        return t2;
      }
      function l(e2) {
        var t2, r2, n2 = e2.indexOf("=");
        return -1 === n2 ? t2 = e2 : (t2 = e2.slice(0, n2), r2 = e2.slice(n2 + 1)), [t2, r2];
      }
    }, 3361: (e, t) => {
      "use strict";
      function r() {
        return (r = Object.assign ? Object.assign.bind() : function(e2) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var r2 = arguments[t2];
            for (var n in r2) ({}).hasOwnProperty.call(r2, n) && (e2[n] = r2[n]);
          }
          return e2;
        }).apply(null, arguments);
      }
      Object.defineProperty(t, "__esModule", { value: true }), t.extends = r;
    }, 6124: (e, t, r) => {
      "use strict";
      var n = r(5975);
      t.Z = n.default;
    }, 623: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = r(7678), a = r(4406);
      t.default = function(e2) {
        var t2;
        let { localizedPathnames: r2, request: i, resolvedLocale: o, routing: s } = e2, l = i.nextUrl.clone(), d = a.getHost(i.headers);
        function u(e3, t3) {
          return e3.pathname = n.normalizeTrailingSlash(e3.pathname), i.nextUrl.basePath && ((e3 = new URL(e3)).pathname = a.applyBasePath(e3.pathname, i.nextUrl.basePath)), "<".concat(e3.toString(), '>; rel="alternate"; hreflang="').concat(t3, '"');
        }
        function c(e3, t3) {
          return r2 && "object" == typeof r2 ? a.formatTemplatePathname(e3, r2[o], r2[t3]) : e3;
        }
        d && (l.port = "", l.host = d), l.protocol = null !== (t2 = i.headers.get("x-forwarded-proto")) && void 0 !== t2 ? t2 : l.protocol, l.pathname = a.getNormalizedPathname(l.pathname, s.locales, s.localePrefix);
        let f = a.getLocalePrefixes(s.locales, s.localePrefix, false).flatMap((e3) => {
          let t3, [n2, i2] = e3;
          function o2(e4) {
            return "/" === e4 ? i2 : i2 + e4;
          }
          if (s.domains) return s.domains.filter((e4) => a.isLocaleSupportedOnDomain(n2, e4)).map((e4) => ((t3 = new URL(l)).port = "", t3.host = e4.domain, t3.pathname = c(l.pathname, n2), n2 === e4.defaultLocale && "always" !== s.localePrefix.mode || (t3.pathname = o2(t3.pathname)), u(t3, n2)));
          {
            let e4;
            e4 = r2 && "object" == typeof r2 ? c(l.pathname, n2) : l.pathname, n2 === s.defaultLocale && "always" !== s.localePrefix.mode || (e4 = o2(e4)), t3 = new URL(e4, l);
          }
          return u(t3, n2);
        });
        if (!s.domains && ("always" !== s.localePrefix.mode || "/" === l.pathname)) {
          let e3 = new URL(c(l.pathname, s.defaultLocale), l);
          f.push(u(e3, "x-default"));
        }
        return f.join(", ");
      };
    }, 5975: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = r(4635), a = r(6136), i = r(3110), o = r(7678), s = r(623), l = r(5752), d = r(9592), u = r(4406);
      t.default = function(e2, t2) {
        var r2, c, f;
        let p = a.receiveRoutingConfig({ ...e2, alternateLinks: null !== (r2 = null == t2 ? void 0 : t2.alternateLinks) && void 0 !== r2 ? r2 : e2.alternateLinks, localeDetection: null !== (c = null == t2 ? void 0 : t2.localeDetection) && void 0 !== c ? c : e2.localeDetection, localeCookie: null !== (f = null == t2 ? void 0 : t2.localeCookie) && void 0 !== f ? f : e2.localeCookie });
        return function(e3) {
          var t3;
          let r3;
          try {
            r3 = decodeURI(e3.nextUrl.pathname);
          } catch (e4) {
            return n.NextResponse.next();
          }
          let a2 = u.sanitizePathname(r3), { domain: c2, locale: f2 } = l.default(p, e3.headers, e3.cookies, a2), _ = c2 ? c2.defaultLocale === f2 : f2 === p.defaultLocale, h = (null === (t3 = p.domains) || void 0 === t3 ? void 0 : t3.filter((e4) => u.isLocaleSupportedOnDomain(f2, e4))) || [], g = null != p.domains && !c2;
          function m(t4) {
            let r4 = new URL(t4, e3.url);
            e3.nextUrl.basePath && (r4.pathname = u.applyBasePath(r4.pathname, e3.nextUrl.basePath));
            let a3 = new Headers(e3.headers);
            return a3.set(i.HEADER_LOCALE_NAME, f2), n.NextResponse.rewrite(r4, { request: { headers: a3 } });
          }
          function y(t4, r4) {
            var a3, i2;
            let s2 = new URL(t4, e3.url);
            if (s2.pathname = o.normalizeTrailingSlash(s2.pathname), h.length > 0 && !r4 && c2) {
              let e4 = u.getBestMatchingDomain(c2, f2, h);
              e4 && (r4 = e4.domain, e4.defaultLocale === f2 && "as-needed" === p.localePrefix.mode && (s2.pathname = u.getNormalizedPathname(s2.pathname, p.locales, p.localePrefix)));
            }
            return r4 && (s2.host = r4, e3.headers.get("x-forwarded-host") && (s2.protocol = null !== (a3 = e3.headers.get("x-forwarded-proto")) && void 0 !== a3 ? a3 : e3.nextUrl.protocol, s2.port = null !== (i2 = e3.headers.get("x-forwarded-port")) && void 0 !== i2 ? i2 : "")), e3.nextUrl.basePath && (s2.pathname = u.applyBasePath(s2.pathname, e3.nextUrl.basePath)), n.NextResponse.redirect(s2.toString());
          }
          let w = u.getNormalizedPathname(a2, p.locales, p.localePrefix), v = u.getPathnameMatch(a2, p.locales, p.localePrefix), b = null != v, x = "never" === p.localePrefix.mode || _ && "as-needed" === p.localePrefix.mode, S, P, C = w, R = p.pathnames;
          if (R) {
            let t4;
            if ([t4, P] = u.getInternalTemplate(R, w, f2), P) {
              let r4 = R[P], n2 = "string" == typeof r4 ? r4 : r4[f2];
              if (o.matchesPathname(n2, w)) C = u.formatTemplatePathname(w, n2, P);
              else {
                let a3;
                a3 = t4 ? "string" == typeof r4 ? r4 : r4[t4] : P;
                let i2 = x ? void 0 : o.getLocalePrefix(f2, p.localePrefix), s2 = u.formatTemplatePathname(w, a3, n2);
                S = y(u.formatPathname(s2, i2, e3.nextUrl.search));
              }
            }
          }
          if (!S) {
            if ("/" !== C || b) {
              let t4 = u.formatPathname(C, u.getLocaleAsPrefix(f2), e3.nextUrl.search);
              if (b) {
                let r4 = u.formatPathname(w, v.prefix, e3.nextUrl.search);
                if ("never" === p.localePrefix.mode) S = y(u.formatPathname(w, void 0, e3.nextUrl.search));
                else if (v.exact) {
                  if (_ && x) S = y(u.formatPathname(w, void 0, e3.nextUrl.search));
                  else if (p.domains) {
                    let e4 = u.getBestMatchingDomain(c2, v.locale, h);
                    S = (null == c2 ? void 0 : c2.domain) === (null == e4 ? void 0 : e4.domain) || g ? m(t4) : y(r4, null == e4 ? void 0 : e4.domain);
                  } else S = m(t4);
                } else S = y(r4);
              } else S = x ? m(t4) : y(u.formatPathname(w, o.getLocalePrefix(f2, p.localePrefix), e3.nextUrl.search));
            } else S = x ? m(u.formatPathname(C, u.getLocaleAsPrefix(f2), e3.nextUrl.search)) : y(u.formatPathname(w, o.getLocalePrefix(f2, p.localePrefix), e3.nextUrl.search));
          }
          return p.localeDetection && p.localeCookie && d.default(e3, S, f2, p.localeCookie), "never" !== p.localePrefix.mode && p.alternateLinks && p.locales.length > 1 && S.headers.set("Link", s.default({ routing: p, localizedPathnames: null != P && R ? R[P] : void 0, request: e3, resolvedLocale: f2 })), S;
        };
      };
    }, 5752: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = r(1354), a = r(5664), i = r(4406), o = function(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      }(a);
      function s(e2, t2, r2) {
        let a2;
        let i2 = new o.default({ headers: { "accept-language": e2.get("accept-language") || void 0 } }).languages();
        try {
          let e3 = t2.slice().sort((e4, t3) => t3.length - e4.length);
          a2 = n.match(i2, e3, r2);
        } catch (e3) {
        }
        return a2;
      }
      function l(e2, t2) {
        if (e2.localeCookie && t2.has(e2.localeCookie.name)) {
          var r2;
          let n2 = null === (r2 = t2.get(e2.localeCookie.name)) || void 0 === r2 ? void 0 : r2.value;
          if (n2 && e2.locales.includes(n2)) return n2;
        }
      }
      function d(e2, t2, r2, n2) {
        var a2;
        let o2;
        return n2 && (o2 = null === (a2 = i.getPathnameMatch(n2, e2.locales, e2.localePrefix)) || void 0 === a2 ? void 0 : a2.locale), !o2 && e2.localeDetection && (o2 = l(e2, r2)), !o2 && e2.localeDetection && (o2 = s(t2, e2.locales, e2.defaultLocale)), o2 || (o2 = e2.defaultLocale), o2;
      }
      t.default = function(e2, t2, r2, n2) {
        return e2.domains ? function(e3, t3, r3, n3) {
          let a2;
          let o2 = function(e4, t4) {
            let r4 = i.getHost(e4);
            if (r4) return t4.find((e5) => e5.domain === r4);
          }(t3, e3.domains);
          if (!o2) return { locale: d(e3, t3, r3, n3) };
          if (n3) {
            var u;
            let t4 = null === (u = i.getPathnameMatch(n3, e3.locales, e3.localePrefix)) || void 0 === u ? void 0 : u.locale;
            if (t4) {
              if (!i.isLocaleSupportedOnDomain(t4, o2)) return { locale: t4, domain: o2 };
              a2 = t4;
            }
          }
          if (!a2 && e3.localeDetection) {
            let t4 = l(e3, r3);
            t4 && i.isLocaleSupportedOnDomain(t4, o2) && (a2 = t4);
          }
          if (!a2 && e3.localeDetection) {
            let r4 = s(t3, o2.locales || e3.locales, o2.defaultLocale);
            r4 && (a2 = r4);
          }
          return a2 || (a2 = o2.defaultLocale), { locale: a2, domain: o2 };
        }(e2, t2, r2, n2) : { locale: d(e2, t2, r2, n2) };
      }, t.getAcceptLanguageLocale = s;
    }, 9592: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.default = function(e2, t2, r, n) {
        var a;
        let { name: i, ...o } = n;
        (null === (a = e2.cookies.get(i)) || void 0 === a ? void 0 : a.value) !== r && t2.cookies.set(i, r, { path: e2.nextUrl.basePath || void 0, ...o });
      };
    }, 4406: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = r(7678);
      function a(e2, t2) {
        let r2 = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], a2 = e2.map((e3) => [e3, n.getLocalePrefix(e3, t2)]);
        return r2 && a2.sort((e3, t3) => t3[1].length - e3[1].length), a2;
      }
      function i(e2, t2) {
        let r2 = n.normalizeTrailingSlash(t2), a2 = n.normalizeTrailingSlash(e2), i2 = n.templateToRegex(a2).exec(r2);
        if (!i2) return;
        let o2 = {};
        for (let e3 = 1; e3 < i2.length; e3++) {
          var s2;
          let t3 = null === (s2 = a2.match(/\[([^\]]+)\]/g)) || void 0 === s2 ? void 0 : s2[e3 - 1].replace(/[[\]]/g, "");
          t3 && (o2[t3] = i2[e3]);
        }
        return o2;
      }
      function o(e2, t2) {
        if (!t2) return e2;
        let r2 = e2 = e2.replace(/\[\[/g, "[").replace(/\]\]/g, "]");
        return Object.entries(t2).forEach((e3) => {
          let [t3, n2] = e3;
          r2 = r2.replace("[".concat(t3, "]"), n2);
        }), r2;
      }
      function s(e2, t2) {
        return t2.defaultLocale === e2 || !t2.locales || t2.locales.includes(e2);
      }
      t.applyBasePath = function(e2, t2) {
        return n.normalizeTrailingSlash(t2 + e2);
      }, t.formatPathname = function(e2, t2, r2) {
        let a2 = e2;
        return t2 && (a2 = n.prefixPathname(t2, a2)), r2 && (a2 += r2), a2;
      }, t.formatPathnameTemplate = o, t.formatTemplatePathname = function(e2, t2, r2, a2) {
        let s2 = "";
        return s2 += o(r2, i(t2, e2)), s2 = n.normalizeTrailingSlash(s2);
      }, t.getBestMatchingDomain = function(e2, t2, r2) {
        let n2;
        return e2 && s(t2, e2) && (n2 = e2), n2 || (n2 = r2.find((e3) => e3.defaultLocale === t2)), n2 || (n2 = r2.find((e3) => {
          var r3;
          return null === (r3 = e3.locales) || void 0 === r3 ? void 0 : r3.includes(t2);
        })), n2 || null != (null == e2 ? void 0 : e2.locales) || (n2 = e2), n2 || (n2 = r2.find((e3) => !e3.locales)), n2;
      }, t.getHost = function(e2) {
        var t2, r2;
        return null !== (t2 = null !== (r2 = e2.get("x-forwarded-host")) && void 0 !== r2 ? r2 : e2.get("host")) && void 0 !== t2 ? t2 : void 0;
      }, t.getInternalTemplate = function(e2, t2, r2) {
        for (let a2 of n.getSortedPathnames(Object.keys(e2))) {
          let i2 = e2[a2];
          if ("string" == typeof i2) {
            if (n.matchesPathname(i2, t2)) return [void 0, a2];
          } else {
            let e3 = Object.entries(i2), o2 = e3.findIndex((e4) => {
              let [t3] = e4;
              return t3 === r2;
            });
            for (let [r3, i3] of (o2 > 0 && e3.unshift(e3.splice(o2, 1)[0]), e3)) if (n.matchesPathname(i3, t2)) return [r3, a2];
          }
        }
        for (let r3 of Object.keys(e2)) if (n.matchesPathname(r3, t2)) return [void 0, r3];
        return [void 0, void 0];
      }, t.getLocaleAsPrefix = function(e2) {
        return "/".concat(e2);
      }, t.getLocalePrefixes = a, t.getNormalizedPathname = function(e2, t2, r2) {
        e2.endsWith("/") || (e2 += "/");
        let i2 = a(t2, r2), o2 = RegExp("^(".concat(i2.map((e3) => {
          let [, t3] = e3;
          return t3.replaceAll("/", "\\/");
        }).join("|"), ")/(.*)"), "i"), s2 = e2.match(o2), l = s2 ? "/" + s2[2] : e2;
        return "/" !== l && (l = n.normalizeTrailingSlash(l)), l;
      }, t.getPathnameMatch = function(e2, t2, r2) {
        for (let [n2, i2] of a(t2, r2)) {
          let t3, r3;
          if (e2 === i2 || e2.startsWith(i2 + "/")) t3 = r3 = true;
          else {
            let n3 = e2.toLowerCase(), a2 = i2.toLowerCase();
            (n3 === a2 || n3.startsWith(a2 + "/")) && (t3 = false, r3 = true);
          }
          if (r3) return { locale: n2, prefix: i2, matchedPrefix: e2.slice(0, i2.length), exact: t3 };
        }
      }, t.getRouteParams = i, t.isLocaleSupportedOnDomain = s, t.sanitizePathname = function(e2) {
        return e2.replace(/\\/g, "%5C").replace(/\/+/g, "/");
      };
    }, 9310: (e, t, r) => {
      "use strict";
      var n = r(626), a = r(7874), i = r(9927);
      n.default, a.default, t.os = i.default;
    }, 6709: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = r(3361), a = r(5023), i = r(3081), o = r(7678), s = r(9697), l = function(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      }(a);
      let d = a.forwardRef(function(e2, t2) {
        let { locale: r2, localePrefix: a2, ...d2 } = e2, u = i.default(), c = r2 || u, f = o.getLocalePrefix(c, a2);
        return l.default.createElement(s.default, n.extends({ ref: t2, locale: c, localePrefixMode: a2.mode, prefix: f }, d2));
      });
      d.displayName = "ClientLink", t.default = d;
    }, 7874: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = r(3361), a = r(5023), i = r(3081), o = r(6136), s = r(8398), l = r(6709), d = r(1435), u = r(7111), c = r(4911), f = function(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      }(a);
      t.default = function(e2) {
        let t2 = o.receiveRoutingConfig(e2), r2 = o.receiveLocaleCookie(e2.localeCookie);
        function p() {
          let e3 = i.default();
          if (!t2.locales.includes(e3)) throw Error(void 0);
          return e3;
        }
        let _ = a.forwardRef(function(e3, a2) {
          let { href: i2, locale: o2, ...d2 } = e3, u2 = p(), c2 = o2 || u2;
          return f.default.createElement(l.default, n.extends({ ref: a2, href: s.compileLocalizedPathname({ locale: c2, pathname: i2, params: "object" == typeof i2 ? i2.params : void 0, pathnames: t2.pathnames }), locale: o2, localeCookie: r2, localePrefix: t2.localePrefix }, d2));
        });
        function h(e3) {
          let { href: r3, locale: n2 } = e3;
          return s.compileLocalizedPathname({ ...s.normalizeNameOrNameWithParams(r3), locale: n2, pathnames: t2.pathnames });
        }
        return _.displayName = "Link", { Link: _, redirect: function(e3) {
          let r3 = h({ href: e3, locale: p() });
          for (var n2 = arguments.length, a2 = Array(n2 > 1 ? n2 - 1 : 0), i2 = 1; i2 < n2; i2++) a2[i2 - 1] = arguments[i2];
          return d.clientRedirect({ pathname: r3, localePrefix: t2.localePrefix }, ...a2);
        }, permanentRedirect: function(e3) {
          let r3 = h({ href: e3, locale: p() });
          for (var n2 = arguments.length, a2 = Array(n2 > 1 ? n2 - 1 : 0), i2 = 1; i2 < n2; i2++) a2[i2 - 1] = arguments[i2];
          return d.clientPermanentRedirect({ pathname: r3, localePrefix: t2.localePrefix }, ...a2);
        }, usePathname: function() {
          let e3 = u.default(t2), r3 = p();
          return a.useMemo(() => e3 ? s.getRoute(r3, e3, t2.pathnames) : e3, [r3, e3]);
        }, useRouter: function() {
          let e3 = c.default(t2.localePrefix, r2), n2 = p();
          return a.useMemo(() => ({ ...e3, push(t3) {
            for (var r3, a2 = arguments.length, i2 = Array(a2 > 1 ? a2 - 1 : 0), o2 = 1; o2 < a2; o2++) i2[o2 - 1] = arguments[o2];
            let s2 = h({ href: t3, locale: (null === (r3 = i2[0]) || void 0 === r3 ? void 0 : r3.locale) || n2 });
            return e3.push(s2, ...i2);
          }, replace(t3) {
            for (var r3, a2 = arguments.length, i2 = Array(a2 > 1 ? a2 - 1 : 0), o2 = 1; o2 < a2; o2++) i2[o2 - 1] = arguments[o2];
            let s2 = h({ href: t3, locale: (null === (r3 = i2[0]) || void 0 === r3 ? void 0 : r3.locale) || n2 });
            return e3.replace(s2, ...i2);
          }, prefetch(t3) {
            for (var r3, a2 = arguments.length, i2 = Array(a2 > 1 ? a2 - 1 : 0), o2 = 1; o2 < a2; o2++) i2[o2 - 1] = arguments[o2];
            let s2 = h({ href: t3, locale: (null === (r3 = i2[0]) || void 0 === r3 ? void 0 : r3.locale) || n2 });
            return e3.prefetch(s2, ...i2);
          } }), [e3, n2]);
        }, getPathname: h };
      };
    }, 9927: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = r(3327), a = r(5023), i = r(3081), o = r(4545), s = r(9391), l = r(8398), d = r(7111);
      t.default = function(e2) {
        function t2() {
          return i.default();
        }
        let { Link: r2, config: u, getPathname: c, ...f } = o.default(t2, e2);
        return { ...f, Link: r2, usePathname: function() {
          let e3 = d.default(u), r3 = t2();
          return a.useMemo(() => e3 && u.pathnames ? l.getRoute(r3, e3, u.pathnames) : e3, [r3, e3]);
        }, useRouter: function() {
          let e3 = n.useRouter(), r3 = t2(), i2 = n.usePathname();
          return a.useMemo(() => {
            function t3(e4) {
              return function(t4, n2) {
                let { locale: a2, ...o2 } = n2 || {}, l2 = [c({ href: t4, locale: a2 || r3, domain: window.location.host })];
                Object.keys(o2).length > 0 && l2.push(o2), e4(...l2), s.default(u.localeCookie, i2, r3, a2);
              };
            }
            return { ...e3, push: t3(e3.push), replace: t3(e3.replace), prefetch: t3(e3.prefetch) };
          }, [r3, i2, e3]);
        }, getPathname: c };
      };
    }, 626: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = r(3361), a = r(5023), i = r(6136), o = r(6709), s = r(1435), l = r(7111), d = r(4911), u = function(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      }(a);
      t.default = function(e2) {
        let t2 = i.receiveLocalePrefixConfig(null == e2 ? void 0 : e2.localePrefix), r2 = i.receiveLocaleCookie(null == e2 ? void 0 : e2.localeCookie), c = a.forwardRef(function(e3, a2) {
          return u.default.createElement(o.default, n.extends({ ref: a2, localeCookie: r2, localePrefix: t2 }, e3));
        });
        return c.displayName = "Link", { Link: c, redirect: function(e3) {
          for (var r3 = arguments.length, n2 = Array(r3 > 1 ? r3 - 1 : 0), a2 = 1; a2 < r3; a2++) n2[a2 - 1] = arguments[a2];
          return s.clientRedirect({ pathname: e3, localePrefix: t2 }, ...n2);
        }, permanentRedirect: function(e3) {
          for (var r3 = arguments.length, n2 = Array(r3 > 1 ? r3 - 1 : 0), a2 = 1; a2 < r3; a2++) n2[a2 - 1] = arguments[a2];
          return s.clientPermanentRedirect({ pathname: e3, localePrefix: t2 }, ...n2);
        }, usePathname: function() {
          return l.default({ localePrefix: t2, defaultLocale: null == e2 ? void 0 : e2.defaultLocale });
        }, useRouter: function() {
          return d.default(t2, r2);
        } };
      };
    }, 1435: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = r(3081), a = r(1467);
      function i(e2) {
        return function(t2) {
          let r2;
          try {
            r2 = n.default();
          } catch (e3) {
            throw e3;
          }
          for (var a2 = arguments.length, i2 = Array(a2 > 1 ? a2 - 1 : 0), o2 = 1; o2 < a2; o2++) i2[o2 - 1] = arguments[o2];
          return e2({ ...t2, locale: r2 }, ...i2);
        };
      }
      let o = i(a.baseRedirect), s = i(a.basePermanentRedirect);
      t.clientPermanentRedirect = s, t.clientRedirect = o;
    }, 7111: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = r(3327), a = r(5023), i = r(3081), o = r(7678);
      t.default = function(e2) {
        let t2 = n.usePathname(), r2 = i.default();
        return a.useMemo(() => {
          if (!t2) return t2;
          let n2 = t2, a2 = o.getLocalePrefix(r2, e2.localePrefix);
          if (o.hasPathnamePrefixed(a2, t2)) n2 = o.unprefixPathname(t2, a2);
          else if ("as-needed" === e2.localePrefix.mode && e2.localePrefix.prefixes) {
            let e3 = o.getLocaleAsPrefix(r2);
            o.hasPathnamePrefixed(e3, t2) && (n2 = o.unprefixPathname(t2, e3));
          }
          return n2;
        }, [e2.localePrefix, r2, t2]);
      };
    }, 4911: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = r(3327), a = r(5023), i = r(3081), o = r(7678), s = r(9391), l = r(8398);
      t.default = function(e2, t2) {
        let r2 = n.useRouter(), d = i.default(), u = n.usePathname();
        return a.useMemo(() => {
          function n2(r3) {
            return function(n3, a2) {
              let { locale: i2, ...c } = a2 || {};
              s.default(t2, u, d, i2);
              let f = [function(t3, r4) {
                let n4 = window.location.pathname, a3 = l.getBasePath(u);
                a3 && (n4 = n4.replace(a3, ""));
                let i3 = r4 || d, s2 = o.getLocalePrefix(i3, e2);
                return o.localizeHref(t3, i3, d, n4, s2);
              }(n3, i2)];
              return Object.keys(c).length > 0 && f.push(c), r3(...f);
            };
          }
          return { ...r2, push: n2(r2.push), replace: n2(r2.replace), prefetch: n2(r2.prefetch) };
        }, [d, t2, e2, u, r2]);
      };
    }, 8137: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = r(3361), a = r(3310), i = r(3327), o = r(5023), s = r(3081), l = r(9391);
      function d(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      }
      var u = d(a), c = d(o), f = o.forwardRef(function(e2, t2) {
        let { defaultLocale: r2, href: a2, locale: d2, localeCookie: f2, onClick: p, prefetch: _, unprefixed: h, ...g } = e2, m = s.default(), y = null != d2 && d2 !== m, w = d2 || m, v = function() {
          let [e3, t3] = o.useState();
          return o.useEffect(() => {
            t3(window.location.host);
          }, []), e3;
        }(), b = v && h && (h.domains[v] === w || !Object.keys(h.domains).includes(v) && m === r2 && !d2) ? h.pathname : a2, x = i.usePathname();
        return y && (_ = false), c.default.createElement(u.default, n.extends({ ref: t2, href: b, hrefLang: y ? d2 : void 0, onClick: function(e3) {
          l.default(f2, x, m, d2), p && p(e3);
        }, prefetch: _ }, g));
      });
      t.default = f;
    }, 9697: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = r(3361), a = r(3327), i = r(5023), o = r(3081), s = r(7678), l = r(8137), d = function(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      }(i);
      let u = i.forwardRef(function(e2, t2) {
        let { href: r2, locale: u2, localeCookie: c, localePrefixMode: f, prefix: p, ..._ } = e2, h = a.usePathname(), g = o.default(), m = u2 !== g, [y, w] = i.useState(() => s.isLocalizableHref(r2) && ("never" !== f || m) ? s.prefixHref(r2, p) : r2);
        return i.useEffect(() => {
          h && w(s.localizeHref(r2, u2, g, h, p));
        }, [g, r2, u2, h, p]), d.default.createElement(l.default, n.extends({ ref: t2, href: y, locale: u2, localeCookie: c }, _));
      });
      u.displayName = "ClientLink", t.default = u;
    }, 4545: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = r(3361), a = r(3327), i = r(5023), o = r(6136), s = r(7678), l = r(8137), d = r(8398), u = function(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      }(i);
      t.default = function(e2, t2) {
        let r2 = o.receiveRoutingConfig(t2 || {}), c = r2.pathnames, f = "as-needed" === r2.localePrefix.mode && r2.domains || void 0, p = i.forwardRef(function(t3, a2) {
          let o2, d2, { href: p2, locale: h2, ...g } = t3;
          "object" == typeof p2 ? (o2 = p2.pathname, d2 = p2.params) : o2 = p2;
          let m = s.isLocalizableHref(p2), y = e2(), w = y instanceof Promise ? i.use(y) : y, v = m ? _({ locale: h2 || w, href: null == c ? o2 : { pathname: o2, params: d2 } }, null != h2 || f || void 0) : o2;
          return u.default.createElement(l.default, n.extends({ ref: a2, defaultLocale: r2.defaultLocale, href: "object" == typeof p2 ? { ...p2, pathname: v } : v, locale: h2, localeCookie: r2.localeCookie, unprefixed: f && m ? { domains: r2.domains.reduce((e3, t4) => (e3[t4.domain] = t4.defaultLocale, e3), {}), pathname: _({ locale: w, href: null == c ? o2 : { pathname: o2, params: d2 } }, false) } : void 0 }, g));
        });
        function _(e3, t3) {
          let n2;
          let { href: a2, locale: i2 } = e3;
          return null == c ? "object" == typeof a2 ? (n2 = a2.pathname, a2.query && (n2 += d.serializeSearchParams(a2.query))) : n2 = a2 : n2 = d.compileLocalizedPathname({ locale: i2, ...d.normalizeNameOrNameWithParams(a2), pathnames: r2.pathnames }), d.applyPathnamePrefix(n2, i2, r2, e3.domain, t3);
        }
        function h(e3) {
          return function(t3) {
            for (var r3 = arguments.length, n2 = Array(r3 > 1 ? r3 - 1 : 0), a2 = 1; a2 < r3; a2++) n2[a2 - 1] = arguments[a2];
            return e3(_(t3, t3.domain ? void 0 : f), ...n2);
          };
        }
        return { config: r2, Link: p, redirect: h(a.redirect), permanentRedirect: h(a.permanentRedirect), getPathname: _ };
      };
    }, 1467: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = r(3327), a = r(7678);
      function i(e2) {
        return function(t2) {
          let r2 = a.getLocalePrefix(t2.locale, t2.localePrefix), n2 = "never" !== t2.localePrefix.mode && a.isLocalizableHref(t2.pathname) ? a.prefixPathname(r2, t2.pathname) : t2.pathname;
          for (var i2 = arguments.length, o2 = Array(i2 > 1 ? i2 - 1 : 0), s2 = 1; s2 < i2; s2++) o2[s2 - 1] = arguments[s2];
          return e2(n2, ...o2);
        };
      }
      let o = i(n.redirect), s = i(n.permanentRedirect);
      t.basePermanentRedirect = s, t.baseRedirect = o;
    }, 9391: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = r(8398);
      t.default = function(e2, t2, r2, a) {
        if (!e2 || !(a !== r2 && null != a) || !t2) return;
        let i = n.getBasePath(t2), { name: o, ...s } = e2;
        s.path || (s.path = "" !== i ? i : "/");
        let l = "".concat(o, "=").concat(a, ";");
        for (let [e3, t3] of Object.entries(s)) l += "".concat("maxAge" === e3 ? "max-age" : e3), "boolean" != typeof t3 && (l += "=" + t3), l += ";";
        document.cookie = l;
      };
    }, 8398: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = r(7678);
      function a(e2) {
        let t2 = new URLSearchParams();
        for (let [r2, n2] of Object.entries(e2)) Array.isArray(n2) ? n2.forEach((e3) => {
          t2.append(r2, String(e3));
        }) : t2.set(r2, String(n2));
        return "?" + t2.toString();
      }
      t.applyPathnamePrefix = function(e2, t2, r2, a2, i) {
        let o;
        let { mode: s } = r2.localePrefix;
        if (void 0 !== i) o = i;
        else if (n.isLocalizableHref(e2)) {
          if ("always" === s) o = true;
          else if ("as-needed" === s) {
            let e3 = r2.defaultLocale;
            if (r2.domains) {
              let t3 = r2.domains.find((e4) => e4.domain === a2);
              t3 && (e3 = t3.defaultLocale);
            }
            o = e3 !== t2;
          }
        }
        return o ? n.prefixPathname(n.getLocalePrefix(t2, r2.localePrefix), e2) : e2;
      }, t.compileLocalizedPathname = function(e2) {
        let { pathname: t2, locale: r2, params: i, pathnames: o, query: s } = e2;
        function l(e3) {
          let t3 = o[e3];
          return t3 || (t3 = e3), t3;
        }
        function d(e3) {
          let t3 = "string" == typeof e3 ? e3 : e3[r2];
          return i && Object.entries(i).forEach((e4) => {
            let r3, n2, [a2, i2] = e4;
            Array.isArray(i2) ? (r3 = "(\\[)?\\[...".concat(a2, "\\](\\])?"), n2 = i2.map((e5) => String(e5)).join("/")) : (r3 = "\\[".concat(a2, "\\]"), n2 = String(i2)), t3 = t3.replace(RegExp(r3, "g"), n2);
          }), t3 = t3.replace(/\[\[\.\.\..+\]\]/g, ""), t3 = n.normalizeTrailingSlash(t3), s && (t3 += a(s)), t3;
        }
        if ("string" == typeof t2) return d(l(t2));
        {
          let { pathname: e3, ...r3 } = t2;
          return { ...r3, pathname: d(l(e3)) };
        }
      }, t.getBasePath = function(e2) {
        let t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window.location.pathname;
        return "/" === e2 ? t2 : t2.replace(e2, "");
      }, t.getRoute = function(e2, t2, r2) {
        let a2 = n.getSortedPathnames(Object.keys(r2)), i = decodeURI(t2);
        for (let t3 of a2) {
          let a3 = r2[t3];
          if ("string" == typeof a3) {
            if (n.matchesPathname(a3, i)) return t3;
          } else if (n.matchesPathname(a3[e2], i)) return t3;
        }
        return t2;
      }, t.normalizeNameOrNameWithParams = function(e2) {
        return "string" == typeof e2 ? { pathname: e2 } : e2;
      }, t.serializeSearchParams = a;
    }, 3081: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = r(3327), a = r(4202), i = r(3110);
      t.default = function() {
        let e2;
        let t2 = n.useParams();
        try {
          e2 = a.useLocale();
        } catch (r2) {
          if ("string" != typeof (null == t2 ? void 0 : t2[i.LOCALE_SEGMENT_NAME])) throw r2;
          e2 = t2[i.LOCALE_SEGMENT_NAME];
        }
        return e2;
      };
    }, 2813: (e, t, r) => {
      "use strict";
      var n = r(6113);
      t.R = n.default;
    }, 6136: (e, t) => {
      "use strict";
      function r(e2) {
        return !(null != e2 && !e2) && { name: "NEXT_LOCALE", maxAge: 31536e3, sameSite: "lax", ..."object" == typeof e2 && e2 };
      }
      function n(e2) {
        return "object" == typeof e2 ? e2 : { mode: e2 || "always" };
      }
      Object.defineProperty(t, "__esModule", { value: true }), t.receiveLocaleCookie = r, t.receiveLocalePrefixConfig = n, t.receiveRoutingConfig = function(e2) {
        var t2, a;
        return { ...e2, localePrefix: n(e2.localePrefix), localeCookie: r(e2.localeCookie), localeDetection: null === (t2 = e2.localeDetection) || void 0 === t2 || t2, alternateLinks: null === (a = e2.alternateLinks) || void 0 === a || a };
      };
    }, 6113: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.default = function(e2) {
        return e2;
      };
    }, 3110: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.HEADER_LOCALE_NAME = "X-NEXT-INTL-LOCALE", t.LOCALE_SEGMENT_NAME = "locale";
    }, 7678: (e, t) => {
      "use strict";
      function r(e2) {
        return ("object" == typeof e2 ? null == e2.host && null == e2.hostname : !/^[a-z]+:/i.test(e2)) && !function(e3) {
          let t2 = "object" == typeof e3 ? e3.pathname : e3;
          return null != t2 && !t2.startsWith("/");
        }(e2);
      }
      function n(e2, t2) {
        let r2;
        return "string" == typeof e2 ? r2 = a(t2, e2) : (r2 = { ...e2 }, e2.pathname && (r2.pathname = a(t2, e2.pathname))), r2;
      }
      function a(e2, t2) {
        let r2 = e2;
        return /^\/(\?.*)?$/.test(t2) && (t2 = t2.slice(1)), r2 += t2;
      }
      function i(e2, t2) {
        return t2 === e2 || t2.startsWith("".concat(e2, "/"));
      }
      function o(e2) {
        let t2 = function() {
          try {
            return "true" === process.env._next_intl_trailing_slash;
          } catch (e3) {
            return false;
          }
        }();
        if ("/" !== e2) {
          let r2 = e2.endsWith("/");
          t2 && !r2 ? e2 += "/" : !t2 && r2 && (e2 = e2.slice(0, -1));
        }
        return e2;
      }
      function s(e2) {
        return "/" + e2;
      }
      function l(e2) {
        let t2 = e2.replace(/\[\[(\.\.\.[^\]]+)\]\]/g, "?(.*)").replace(/\[(\.\.\.[^\]]+)\]/g, "(.+)").replace(/\[([^\]]+)\]/g, "([^/]+)");
        return new RegExp("^".concat(t2, "$"));
      }
      function d(e2) {
        return e2.includes("[[...");
      }
      function u(e2) {
        return e2.includes("[...");
      }
      function c(e2) {
        return e2.includes("[");
      }
      function f(e2, t2) {
        let r2 = e2.split("/"), n2 = t2.split("/"), a2 = Math.max(r2.length, n2.length);
        for (let e3 = 0; e3 < a2; e3++) {
          let t3 = r2[e3], a3 = n2[e3];
          if (!t3 && a3) return -1;
          if (t3 && !a3) return 1;
          if (t3 || a3) {
            if (!c(t3) && c(a3)) return -1;
            if (c(t3) && !c(a3)) return 1;
            if (!u(t3) && u(a3)) return -1;
            if (u(t3) && !u(a3)) return 1;
            if (!d(t3) && d(a3)) return -1;
            if (d(t3) && !d(a3)) return 1;
          }
        }
        return 0;
      }
      Object.defineProperty(t, "__esModule", { value: true }), t.getLocaleAsPrefix = s, t.getLocalePrefix = function(e2, t2) {
        var r2;
        return "never" !== t2.mode && (null === (r2 = t2.prefixes) || void 0 === r2 ? void 0 : r2[e2]) || s(e2);
      }, t.getSortedPathnames = function(e2) {
        return e2.sort(f);
      }, t.hasPathnamePrefixed = i, t.isLocalizableHref = r, t.localizeHref = function(e2, t2) {
        let a2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : t2, o2 = arguments.length > 3 ? arguments[3] : void 0, s2 = arguments.length > 4 ? arguments[4] : void 0;
        if (!r(e2)) return e2;
        let l2 = i(s2, o2);
        return (t2 !== a2 || l2) && null != s2 ? n(e2, s2) : e2;
      }, t.matchesPathname = function(e2, t2) {
        let r2 = o(e2), n2 = o(t2);
        return l(r2).test(n2);
      }, t.normalizeTrailingSlash = o, t.prefixHref = n, t.prefixPathname = a, t.templateToRegex = l, t.unprefixPathname = function(e2, t2) {
        return e2.replace(new RegExp("^".concat(t2)), "") || "/";
      };
    }, 5945: (e) => {
      "use strict";
      var t = Object.defineProperty, r = Object.getOwnPropertyDescriptor, n = Object.getOwnPropertyNames, a = Object.prototype.hasOwnProperty, i = {};
      function o(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), n2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? n2 : `${n2}; ${r2.join("; ")}`;
      }
      function s(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [n2, a2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(n2, decodeURIComponent(null != a2 ? a2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function l(e2) {
        var t2, r2;
        if (!e2) return;
        let [[n2, a2], ...i2] = s(e2), { domain: o2, expires: l2, httponly: c2, maxage: f2, path: p, samesite: _, secure: h, partitioned: g, priority: m } = Object.fromEntries(i2.map(([e3, t3]) => [e3.toLowerCase(), t3]));
        return function(e3) {
          let t3 = {};
          for (let r3 in e3) e3[r3] && (t3[r3] = e3[r3]);
          return t3;
        }({ name: n2, value: decodeURIComponent(a2), domain: o2, ...l2 && { expires: new Date(l2) }, ...c2 && { httpOnly: true }, ..."string" == typeof f2 && { maxAge: Number(f2) }, path: p, ..._ && { sameSite: d.includes(t2 = (t2 = _).toLowerCase()) ? t2 : void 0 }, ...h && { secure: true }, ...m && { priority: u.includes(r2 = (r2 = m).toLowerCase()) ? r2 : void 0 }, ...g && { partitioned: true } });
      }
      ((e2, r2) => {
        for (var n2 in r2) t(e2, n2, { get: r2[n2], enumerable: true });
      })(i, { RequestCookies: () => c, ResponseCookies: () => f, parseCookie: () => s, parseSetCookie: () => l, stringifyCookie: () => o }), e.exports = ((e2, i2, o2, s2) => {
        if (i2 && "object" == typeof i2 || "function" == typeof i2) for (let l2 of n(i2)) a.call(e2, l2) || l2 === o2 || t(e2, l2, { get: () => i2[l2], enumerable: !(s2 = r(i2, l2)) || s2.enumerable });
        return e2;
      })(t({}, "__esModule", { value: true }), i);
      var d = ["strict", "lax", "none"], u = ["low", "medium", "high"], c = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let t2 = e2.get("cookie");
          if (t2) for (let [e3, r2] of s(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === n2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, n2 = this._parsed;
          return n2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(n2).map(([e3, t3]) => o(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => o(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, f = class {
        constructor(e2) {
          var t2, r2, n2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let a2 = null != (n2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? n2 : [];
          for (let e3 of Array.isArray(a2) ? a2 : function(e4) {
            if (!e4) return [];
            var t3, r3, n3, a3, i2, o2 = [], s2 = 0;
            function l2() {
              for (; s2 < e4.length && /\s/.test(e4.charAt(s2)); ) s2 += 1;
              return s2 < e4.length;
            }
            for (; s2 < e4.length; ) {
              for (t3 = s2, i2 = false; l2(); ) if ("," === (r3 = e4.charAt(s2))) {
                for (n3 = s2, s2 += 1, l2(), a3 = s2; s2 < e4.length && "=" !== (r3 = e4.charAt(s2)) && ";" !== r3 && "," !== r3; ) s2 += 1;
                s2 < e4.length && "=" === e4.charAt(s2) ? (i2 = true, s2 = a3, o2.push(e4.substring(t3, n3)), t3 = s2) : s2 = n3 + 1;
              } else s2 += 1;
              (!i2 || s2 >= e4.length) && o2.push(e4.substring(t3, e4.length));
            }
            return o2;
          }(a2)) {
            let t3 = l(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === n2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, n2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, a2 = this._parsed;
          return a2.set(t2, function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          }({ name: t2, value: r2, ...n2 })), function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = o(r3);
              t3.append("set-cookie", e4);
            }
          }(a2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2, n2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0].path, e2[0].domain];
          return this.set({ name: t2, path: r2, domain: n2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(o).join("; ");
        }
      };
    }, 8439: (e, t, r) => {
      (() => {
        "use strict";
        var t2 = { 491: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ContextAPI = void 0;
          let n2 = r2(223), a2 = r2(172), i2 = r2(930), o = "context", s = new n2.NoopContextManager();
          class l {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new l()), this._instance;
            }
            setGlobalContextManager(e3) {
              return (0, a2.registerGlobal)(o, e3, i2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e3, t4, r3, ...n3) {
              return this._getContextManager().with(e3, t4, r3, ...n3);
            }
            bind(e3, t4) {
              return this._getContextManager().bind(e3, t4);
            }
            _getContextManager() {
              return (0, a2.getGlobal)(o) || s;
            }
            disable() {
              this._getContextManager().disable(), (0, a2.unregisterGlobal)(o, i2.DiagAPI.instance());
            }
          }
          t3.ContextAPI = l;
        }, 930: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagAPI = void 0;
          let n2 = r2(56), a2 = r2(912), i2 = r2(957), o = r2(172);
          class s {
            constructor() {
              function e3(e4) {
                return function(...t5) {
                  let r3 = (0, o.getGlobal)("diag");
                  if (r3) return r3[e4](...t5);
                };
              }
              let t4 = this;
              t4.setLogger = (e4, r3 = { logLevel: i2.DiagLogLevel.INFO }) => {
                var n3, s2, l;
                if (e4 === t4) {
                  let e5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t4.error(null !== (n3 = e5.stack) && void 0 !== n3 ? n3 : e5.message), false;
                }
                "number" == typeof r3 && (r3 = { logLevel: r3 });
                let d = (0, o.getGlobal)("diag"), u = (0, a2.createLogLevelDiagLogger)(null !== (s2 = r3.logLevel) && void 0 !== s2 ? s2 : i2.DiagLogLevel.INFO, e4);
                if (d && !r3.suppressOverrideMessage) {
                  let e5 = null !== (l = Error().stack) && void 0 !== l ? l : "<failed to generate stacktrace>";
                  d.warn(`Current logger will be overwritten from ${e5}`), u.warn(`Current logger will overwrite one already registered from ${e5}`);
                }
                return (0, o.registerGlobal)("diag", u, t4, true);
              }, t4.disable = () => {
                (0, o.unregisterGlobal)("diag", t4);
              }, t4.createComponentLogger = (e4) => new n2.DiagComponentLogger(e4), t4.verbose = e3("verbose"), t4.debug = e3("debug"), t4.info = e3("info"), t4.warn = e3("warn"), t4.error = e3("error");
            }
            static instance() {
              return this._instance || (this._instance = new s()), this._instance;
            }
          }
          t3.DiagAPI = s;
        }, 653: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.MetricsAPI = void 0;
          let n2 = r2(660), a2 = r2(172), i2 = r2(930), o = "metrics";
          class s {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new s()), this._instance;
            }
            setGlobalMeterProvider(e3) {
              return (0, a2.registerGlobal)(o, e3, i2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, a2.getGlobal)(o) || n2.NOOP_METER_PROVIDER;
            }
            getMeter(e3, t4, r3) {
              return this.getMeterProvider().getMeter(e3, t4, r3);
            }
            disable() {
              (0, a2.unregisterGlobal)(o, i2.DiagAPI.instance());
            }
          }
          t3.MetricsAPI = s;
        }, 181: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.PropagationAPI = void 0;
          let n2 = r2(172), a2 = r2(874), i2 = r2(194), o = r2(277), s = r2(369), l = r2(930), d = "propagation", u = new a2.NoopTextMapPropagator();
          class c {
            constructor() {
              this.createBaggage = s.createBaggage, this.getBaggage = o.getBaggage, this.getActiveBaggage = o.getActiveBaggage, this.setBaggage = o.setBaggage, this.deleteBaggage = o.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new c()), this._instance;
            }
            setGlobalPropagator(e3) {
              return (0, n2.registerGlobal)(d, e3, l.DiagAPI.instance());
            }
            inject(e3, t4, r3 = i2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e3, t4, r3);
            }
            extract(e3, t4, r3 = i2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e3, t4, r3);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, n2.unregisterGlobal)(d, l.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, n2.getGlobal)(d) || u;
            }
          }
          t3.PropagationAPI = c;
        }, 997: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceAPI = void 0;
          let n2 = r2(172), a2 = r2(846), i2 = r2(139), o = r2(607), s = r2(930), l = "trace";
          class d {
            constructor() {
              this._proxyTracerProvider = new a2.ProxyTracerProvider(), this.wrapSpanContext = i2.wrapSpanContext, this.isSpanContextValid = i2.isSpanContextValid, this.deleteSpan = o.deleteSpan, this.getSpan = o.getSpan, this.getActiveSpan = o.getActiveSpan, this.getSpanContext = o.getSpanContext, this.setSpan = o.setSpan, this.setSpanContext = o.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new d()), this._instance;
            }
            setGlobalTracerProvider(e3) {
              let t4 = (0, n2.registerGlobal)(l, this._proxyTracerProvider, s.DiagAPI.instance());
              return t4 && this._proxyTracerProvider.setDelegate(e3), t4;
            }
            getTracerProvider() {
              return (0, n2.getGlobal)(l) || this._proxyTracerProvider;
            }
            getTracer(e3, t4) {
              return this.getTracerProvider().getTracer(e3, t4);
            }
            disable() {
              (0, n2.unregisterGlobal)(l, s.DiagAPI.instance()), this._proxyTracerProvider = new a2.ProxyTracerProvider();
            }
          }
          t3.TraceAPI = d;
        }, 277: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.deleteBaggage = t3.setBaggage = t3.getActiveBaggage = t3.getBaggage = void 0;
          let n2 = r2(491), a2 = (0, r2(780).createContextKey)("OpenTelemetry Baggage Key");
          function i2(e3) {
            return e3.getValue(a2) || void 0;
          }
          t3.getBaggage = i2, t3.getActiveBaggage = function() {
            return i2(n2.ContextAPI.getInstance().active());
          }, t3.setBaggage = function(e3, t4) {
            return e3.setValue(a2, t4);
          }, t3.deleteBaggage = function(e3) {
            return e3.deleteValue(a2);
          };
        }, 993: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.BaggageImpl = void 0;
          class r2 {
            constructor(e3) {
              this._entries = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
            }
            getEntry(e3) {
              let t4 = this._entries.get(e3);
              if (t4) return Object.assign({}, t4);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e3, t4]) => [e3, t4]);
            }
            setEntry(e3, t4) {
              let n2 = new r2(this._entries);
              return n2._entries.set(e3, t4), n2;
            }
            removeEntry(e3) {
              let t4 = new r2(this._entries);
              return t4._entries.delete(e3), t4;
            }
            removeEntries(...e3) {
              let t4 = new r2(this._entries);
              for (let r3 of e3) t4._entries.delete(r3);
              return t4;
            }
            clear() {
              return new r2();
            }
          }
          t3.BaggageImpl = r2;
        }, 830: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.baggageEntryMetadataSymbol = void 0, t3.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 369: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.baggageEntryMetadataFromString = t3.createBaggage = void 0;
          let n2 = r2(930), a2 = r2(993), i2 = r2(830), o = n2.DiagAPI.instance();
          t3.createBaggage = function(e3 = {}) {
            return new a2.BaggageImpl(new Map(Object.entries(e3)));
          }, t3.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (o.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: i2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 67: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.context = void 0;
          let n2 = r2(491);
          t3.context = n2.ContextAPI.getInstance();
        }, 223: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopContextManager = void 0;
          let n2 = r2(780);
          class a2 {
            active() {
              return n2.ROOT_CONTEXT;
            }
            with(e3, t4, r3, ...n3) {
              return t4.call(r3, ...n3);
            }
            bind(e3, t4) {
              return t4;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          }
          t3.NoopContextManager = a2;
        }, 780: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ROOT_CONTEXT = t3.createContextKey = void 0, t3.createContextKey = function(e3) {
            return Symbol.for(e3);
          };
          class r2 {
            constructor(e3) {
              let t4 = this;
              t4._currentContext = e3 ? new Map(e3) : /* @__PURE__ */ new Map(), t4.getValue = (e4) => t4._currentContext.get(e4), t4.setValue = (e4, n2) => {
                let a2 = new r2(t4._currentContext);
                return a2._currentContext.set(e4, n2), a2;
              }, t4.deleteValue = (e4) => {
                let n2 = new r2(t4._currentContext);
                return n2._currentContext.delete(e4), n2;
              };
            }
          }
          t3.ROOT_CONTEXT = new r2();
        }, 506: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.diag = void 0;
          let n2 = r2(930);
          t3.diag = n2.DiagAPI.instance();
        }, 56: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagComponentLogger = void 0;
          let n2 = r2(172);
          class a2 {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return i2("debug", this._namespace, e3);
            }
            error(...e3) {
              return i2("error", this._namespace, e3);
            }
            info(...e3) {
              return i2("info", this._namespace, e3);
            }
            warn(...e3) {
              return i2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return i2("verbose", this._namespace, e3);
            }
          }
          function i2(e3, t4, r3) {
            let a3 = (0, n2.getGlobal)("diag");
            if (a3) return r3.unshift(t4), a3[e3](...r3);
          }
          t3.DiagComponentLogger = a2;
        }, 972: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagConsoleLogger = void 0;
          let r2 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          class n2 {
            constructor() {
              for (let e3 = 0; e3 < r2.length; e3++) this[r2[e3].n] = /* @__PURE__ */ function(e4) {
                return function(...t4) {
                  if (console) {
                    let r3 = console[e4];
                    if ("function" != typeof r3 && (r3 = console.log), "function" == typeof r3) return r3.apply(console, t4);
                  }
                };
              }(r2[e3].c);
            }
          }
          t3.DiagConsoleLogger = n2;
        }, 912: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createLogLevelDiagLogger = void 0;
          let n2 = r2(957);
          t3.createLogLevelDiagLogger = function(e3, t4) {
            function r3(r4, n3) {
              let a2 = t4[r4];
              return "function" == typeof a2 && e3 >= n3 ? a2.bind(t4) : function() {
              };
            }
            return e3 < n2.DiagLogLevel.NONE ? e3 = n2.DiagLogLevel.NONE : e3 > n2.DiagLogLevel.ALL && (e3 = n2.DiagLogLevel.ALL), t4 = t4 || {}, { error: r3("error", n2.DiagLogLevel.ERROR), warn: r3("warn", n2.DiagLogLevel.WARN), info: r3("info", n2.DiagLogLevel.INFO), debug: r3("debug", n2.DiagLogLevel.DEBUG), verbose: r3("verbose", n2.DiagLogLevel.VERBOSE) };
          };
        }, 957: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagLogLevel = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.ERROR = 30] = "ERROR", e3[e3.WARN = 50] = "WARN", e3[e3.INFO = 60] = "INFO", e3[e3.DEBUG = 70] = "DEBUG", e3[e3.VERBOSE = 80] = "VERBOSE", e3[e3.ALL = 9999] = "ALL";
          }(t3.DiagLogLevel || (t3.DiagLogLevel = {}));
        }, 172: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.unregisterGlobal = t3.getGlobal = t3.registerGlobal = void 0;
          let n2 = r2(200), a2 = r2(521), i2 = r2(130), o = a2.VERSION.split(".")[0], s = Symbol.for(`opentelemetry.js.api.${o}`), l = n2._globalThis;
          t3.registerGlobal = function(e3, t4, r3, n3 = false) {
            var i3;
            let o2 = l[s] = null !== (i3 = l[s]) && void 0 !== i3 ? i3 : { version: a2.VERSION };
            if (!n3 && o2[e3]) {
              let t5 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r3.error(t5.stack || t5.message), false;
            }
            if (o2.version !== a2.VERSION) {
              let t5 = Error(`@opentelemetry/api: Registration of version v${o2.version} for ${e3} does not match previously registered API v${a2.VERSION}`);
              return r3.error(t5.stack || t5.message), false;
            }
            return o2[e3] = t4, r3.debug(`@opentelemetry/api: Registered a global for ${e3} v${a2.VERSION}.`), true;
          }, t3.getGlobal = function(e3) {
            var t4, r3;
            let n3 = null === (t4 = l[s]) || void 0 === t4 ? void 0 : t4.version;
            if (n3 && (0, i2.isCompatible)(n3)) return null === (r3 = l[s]) || void 0 === r3 ? void 0 : r3[e3];
          }, t3.unregisterGlobal = function(e3, t4) {
            t4.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${a2.VERSION}.`);
            let r3 = l[s];
            r3 && delete r3[e3];
          };
        }, 130: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.isCompatible = t3._makeCompatibilityCheck = void 0;
          let n2 = r2(521), a2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function i2(e3) {
            let t4 = /* @__PURE__ */ new Set([e3]), r3 = /* @__PURE__ */ new Set(), n3 = e3.match(a2);
            if (!n3) return () => false;
            let i3 = { major: +n3[1], minor: +n3[2], patch: +n3[3], prerelease: n3[4] };
            if (null != i3.prerelease) return function(t5) {
              return t5 === e3;
            };
            function o(e4) {
              return r3.add(e4), false;
            }
            return function(e4) {
              if (t4.has(e4)) return true;
              if (r3.has(e4)) return false;
              let n4 = e4.match(a2);
              if (!n4) return o(e4);
              let s = { major: +n4[1], minor: +n4[2], patch: +n4[3], prerelease: n4[4] };
              return null != s.prerelease || i3.major !== s.major ? o(e4) : 0 === i3.major ? i3.minor === s.minor && i3.patch <= s.patch ? (t4.add(e4), true) : o(e4) : i3.minor <= s.minor ? (t4.add(e4), true) : o(e4);
            };
          }
          t3._makeCompatibilityCheck = i2, t3.isCompatible = i2(n2.VERSION);
        }, 886: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.metrics = void 0;
          let n2 = r2(653);
          t3.metrics = n2.MetricsAPI.getInstance();
        }, 901: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ValueType = void 0, function(e3) {
            e3[e3.INT = 0] = "INT", e3[e3.DOUBLE = 1] = "DOUBLE";
          }(t3.ValueType || (t3.ValueType = {}));
        }, 102: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createNoopMeter = t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t3.NOOP_OBSERVABLE_GAUGE_METRIC = t3.NOOP_OBSERVABLE_COUNTER_METRIC = t3.NOOP_UP_DOWN_COUNTER_METRIC = t3.NOOP_HISTOGRAM_METRIC = t3.NOOP_COUNTER_METRIC = t3.NOOP_METER = t3.NoopObservableUpDownCounterMetric = t3.NoopObservableGaugeMetric = t3.NoopObservableCounterMetric = t3.NoopObservableMetric = t3.NoopHistogramMetric = t3.NoopUpDownCounterMetric = t3.NoopCounterMetric = t3.NoopMetric = t3.NoopMeter = void 0;
          class r2 {
            constructor() {
            }
            createHistogram(e3, r3) {
              return t3.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r3) {
              return t3.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r3) {
              return t3.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r3) {
              return t3.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r3) {
              return t3.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r3) {
              return t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t4) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t3.NoopMeter = r2;
          class n2 {
          }
          t3.NoopMetric = n2;
          class a2 extends n2 {
            add(e3, t4) {
            }
          }
          t3.NoopCounterMetric = a2;
          class i2 extends n2 {
            add(e3, t4) {
            }
          }
          t3.NoopUpDownCounterMetric = i2;
          class o extends n2 {
            record(e3, t4) {
            }
          }
          t3.NoopHistogramMetric = o;
          class s {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t3.NoopObservableMetric = s;
          class l extends s {
          }
          t3.NoopObservableCounterMetric = l;
          class d extends s {
          }
          t3.NoopObservableGaugeMetric = d;
          class u extends s {
          }
          t3.NoopObservableUpDownCounterMetric = u, t3.NOOP_METER = new r2(), t3.NOOP_COUNTER_METRIC = new a2(), t3.NOOP_HISTOGRAM_METRIC = new o(), t3.NOOP_UP_DOWN_COUNTER_METRIC = new i2(), t3.NOOP_OBSERVABLE_COUNTER_METRIC = new l(), t3.NOOP_OBSERVABLE_GAUGE_METRIC = new d(), t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new u(), t3.createNoopMeter = function() {
            return t3.NOOP_METER;
          };
        }, 660: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NOOP_METER_PROVIDER = t3.NoopMeterProvider = void 0;
          let n2 = r2(102);
          class a2 {
            getMeter(e3, t4, r3) {
              return n2.NOOP_METER;
            }
          }
          t3.NoopMeterProvider = a2, t3.NOOP_METER_PROVIDER = new a2();
        }, 200: function(e2, t3, r2) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t4[r3];
            } });
          } : function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), e3[n3] = t4[r3];
          }), a2 = this && this.__exportStar || function(e3, t4) {
            for (var r3 in e3) "default" === r3 || Object.prototype.hasOwnProperty.call(t4, r3) || n2(t4, e3, r3);
          };
          Object.defineProperty(t3, "__esModule", { value: true }), a2(r2(46), t3);
        }, 651: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3._globalThis = void 0, t3._globalThis = "object" == typeof globalThis ? globalThis : r.g;
        }, 46: function(e2, t3, r2) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t4[r3];
            } });
          } : function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), e3[n3] = t4[r3];
          }), a2 = this && this.__exportStar || function(e3, t4) {
            for (var r3 in e3) "default" === r3 || Object.prototype.hasOwnProperty.call(t4, r3) || n2(t4, e3, r3);
          };
          Object.defineProperty(t3, "__esModule", { value: true }), a2(r2(651), t3);
        }, 939: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.propagation = void 0;
          let n2 = r2(181);
          t3.propagation = n2.PropagationAPI.getInstance();
        }, 874: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTextMapPropagator = void 0;
          class r2 {
            inject(e3, t4) {
            }
            extract(e3, t4) {
              return e3;
            }
            fields() {
              return [];
            }
          }
          t3.NoopTextMapPropagator = r2;
        }, 194: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.defaultTextMapSetter = t3.defaultTextMapGetter = void 0, t3.defaultTextMapGetter = { get(e3, t4) {
            if (null != e3) return e3[t4];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t3.defaultTextMapSetter = { set(e3, t4, r2) {
            null != e3 && (e3[t4] = r2);
          } };
        }, 845: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.trace = void 0;
          let n2 = r2(997);
          t3.trace = n2.TraceAPI.getInstance();
        }, 403: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NonRecordingSpan = void 0;
          let n2 = r2(476);
          class a2 {
            constructor(e3 = n2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t4) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t4) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t4) {
            }
          }
          t3.NonRecordingSpan = a2;
        }, 614: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTracer = void 0;
          let n2 = r2(491), a2 = r2(607), i2 = r2(403), o = r2(139), s = n2.ContextAPI.getInstance();
          class l {
            startSpan(e3, t4, r3 = s.active()) {
              if (null == t4 ? void 0 : t4.root) return new i2.NonRecordingSpan();
              let n3 = r3 && (0, a2.getSpanContext)(r3);
              return "object" == typeof n3 && "string" == typeof n3.spanId && "string" == typeof n3.traceId && "number" == typeof n3.traceFlags && (0, o.isSpanContextValid)(n3) ? new i2.NonRecordingSpan(n3) : new i2.NonRecordingSpan();
            }
            startActiveSpan(e3, t4, r3, n3) {
              let i3, o2, l2;
              if (arguments.length < 2) return;
              2 == arguments.length ? l2 = t4 : 3 == arguments.length ? (i3 = t4, l2 = r3) : (i3 = t4, o2 = r3, l2 = n3);
              let d = null != o2 ? o2 : s.active(), u = this.startSpan(e3, i3, d), c = (0, a2.setSpan)(d, u);
              return s.with(c, l2, void 0, u);
            }
          }
          t3.NoopTracer = l;
        }, 124: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTracerProvider = void 0;
          let n2 = r2(614);
          class a2 {
            getTracer(e3, t4, r3) {
              return new n2.NoopTracer();
            }
          }
          t3.NoopTracerProvider = a2;
        }, 125: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ProxyTracer = void 0;
          let n2 = new (r2(614)).NoopTracer();
          class a2 {
            constructor(e3, t4, r3, n3) {
              this._provider = e3, this.name = t4, this.version = r3, this.options = n3;
            }
            startSpan(e3, t4, r3) {
              return this._getTracer().startSpan(e3, t4, r3);
            }
            startActiveSpan(e3, t4, r3, n3) {
              let a3 = this._getTracer();
              return Reflect.apply(a3.startActiveSpan, a3, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : n2;
            }
          }
          t3.ProxyTracer = a2;
        }, 846: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ProxyTracerProvider = void 0;
          let n2 = r2(125), a2 = new (r2(124)).NoopTracerProvider();
          class i2 {
            getTracer(e3, t4, r3) {
              var a3;
              return null !== (a3 = this.getDelegateTracer(e3, t4, r3)) && void 0 !== a3 ? a3 : new n2.ProxyTracer(this, e3, t4, r3);
            }
            getDelegate() {
              var e3;
              return null !== (e3 = this._delegate) && void 0 !== e3 ? e3 : a2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t4, r3) {
              var n3;
              return null === (n3 = this._delegate) || void 0 === n3 ? void 0 : n3.getTracer(e3, t4, r3);
            }
          }
          t3.ProxyTracerProvider = i2;
        }, 996: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SamplingDecision = void 0, function(e3) {
            e3[e3.NOT_RECORD = 0] = "NOT_RECORD", e3[e3.RECORD = 1] = "RECORD", e3[e3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
          }(t3.SamplingDecision || (t3.SamplingDecision = {}));
        }, 607: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.getSpanContext = t3.setSpanContext = t3.deleteSpan = t3.setSpan = t3.getActiveSpan = t3.getSpan = void 0;
          let n2 = r2(780), a2 = r2(403), i2 = r2(491), o = (0, n2.createContextKey)("OpenTelemetry Context Key SPAN");
          function s(e3) {
            return e3.getValue(o) || void 0;
          }
          function l(e3, t4) {
            return e3.setValue(o, t4);
          }
          t3.getSpan = s, t3.getActiveSpan = function() {
            return s(i2.ContextAPI.getInstance().active());
          }, t3.setSpan = l, t3.deleteSpan = function(e3) {
            return e3.deleteValue(o);
          }, t3.setSpanContext = function(e3, t4) {
            return l(e3, new a2.NonRecordingSpan(t4));
          }, t3.getSpanContext = function(e3) {
            var t4;
            return null === (t4 = s(e3)) || void 0 === t4 ? void 0 : t4.spanContext();
          };
        }, 325: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceStateImpl = void 0;
          let n2 = r2(564);
          class a2 {
            constructor(e3) {
              this._internalState = /* @__PURE__ */ new Map(), e3 && this._parse(e3);
            }
            set(e3, t4) {
              let r3 = this._clone();
              return r3._internalState.has(e3) && r3._internalState.delete(e3), r3._internalState.set(e3, t4), r3;
            }
            unset(e3) {
              let t4 = this._clone();
              return t4._internalState.delete(e3), t4;
            }
            get(e3) {
              return this._internalState.get(e3);
            }
            serialize() {
              return this._keys().reduce((e3, t4) => (e3.push(t4 + "=" + this.get(t4)), e3), []).join(",");
            }
            _parse(e3) {
              !(e3.length > 512) && (this._internalState = e3.split(",").reverse().reduce((e4, t4) => {
                let r3 = t4.trim(), a3 = r3.indexOf("=");
                if (-1 !== a3) {
                  let i2 = r3.slice(0, a3), o = r3.slice(a3 + 1, t4.length);
                  (0, n2.validateKey)(i2) && (0, n2.validateValue)(o) && e4.set(i2, o);
                }
                return e4;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let e3 = new a2();
              return e3._internalState = new Map(this._internalState), e3;
            }
          }
          t3.TraceStateImpl = a2;
        }, 564: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.validateValue = t3.validateKey = void 0;
          let r2 = "[_0-9a-z-*/]", n2 = `[a-z]${r2}{0,255}`, a2 = `[a-z0-9]${r2}{0,240}@[a-z]${r2}{0,13}`, i2 = RegExp(`^(?:${n2}|${a2})$`), o = /^[ -~]{0,255}[!-~]$/, s = /,|=/;
          t3.validateKey = function(e3) {
            return i2.test(e3);
          }, t3.validateValue = function(e3) {
            return o.test(e3) && !s.test(e3);
          };
        }, 98: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createTraceState = void 0;
          let n2 = r2(325);
          t3.createTraceState = function(e3) {
            return new n2.TraceStateImpl(e3);
          };
        }, 476: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.INVALID_SPAN_CONTEXT = t3.INVALID_TRACEID = t3.INVALID_SPANID = void 0;
          let n2 = r2(475);
          t3.INVALID_SPANID = "0000000000000000", t3.INVALID_TRACEID = "00000000000000000000000000000000", t3.INVALID_SPAN_CONTEXT = { traceId: t3.INVALID_TRACEID, spanId: t3.INVALID_SPANID, traceFlags: n2.TraceFlags.NONE };
        }, 357: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SpanKind = void 0, function(e3) {
            e3[e3.INTERNAL = 0] = "INTERNAL", e3[e3.SERVER = 1] = "SERVER", e3[e3.CLIENT = 2] = "CLIENT", e3[e3.PRODUCER = 3] = "PRODUCER", e3[e3.CONSUMER = 4] = "CONSUMER";
          }(t3.SpanKind || (t3.SpanKind = {}));
        }, 139: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.wrapSpanContext = t3.isSpanContextValid = t3.isValidSpanId = t3.isValidTraceId = void 0;
          let n2 = r2(476), a2 = r2(403), i2 = /^([0-9a-f]{32})$/i, o = /^[0-9a-f]{16}$/i;
          function s(e3) {
            return i2.test(e3) && e3 !== n2.INVALID_TRACEID;
          }
          function l(e3) {
            return o.test(e3) && e3 !== n2.INVALID_SPANID;
          }
          t3.isValidTraceId = s, t3.isValidSpanId = l, t3.isSpanContextValid = function(e3) {
            return s(e3.traceId) && l(e3.spanId);
          }, t3.wrapSpanContext = function(e3) {
            return new a2.NonRecordingSpan(e3);
          };
        }, 847: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SpanStatusCode = void 0, function(e3) {
            e3[e3.UNSET = 0] = "UNSET", e3[e3.OK = 1] = "OK", e3[e3.ERROR = 2] = "ERROR";
          }(t3.SpanStatusCode || (t3.SpanStatusCode = {}));
        }, 475: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceFlags = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.SAMPLED = 1] = "SAMPLED";
          }(t3.TraceFlags || (t3.TraceFlags = {}));
        }, 521: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.VERSION = void 0, t3.VERSION = "1.6.0";
        } }, n = {};
        function a(e2) {
          var r2 = n[e2];
          if (void 0 !== r2) return r2.exports;
          var i2 = n[e2] = { exports: {} }, o = true;
          try {
            t2[e2].call(i2.exports, i2, i2.exports, a), o = false;
          } finally {
            o && delete n[e2];
          }
          return i2.exports;
        }
        a.ab = "//";
        var i = {};
        (() => {
          Object.defineProperty(i, "__esModule", { value: true }), i.trace = i.propagation = i.metrics = i.diag = i.context = i.INVALID_SPAN_CONTEXT = i.INVALID_TRACEID = i.INVALID_SPANID = i.isValidSpanId = i.isValidTraceId = i.isSpanContextValid = i.createTraceState = i.TraceFlags = i.SpanStatusCode = i.SpanKind = i.SamplingDecision = i.ProxyTracerProvider = i.ProxyTracer = i.defaultTextMapSetter = i.defaultTextMapGetter = i.ValueType = i.createNoopMeter = i.DiagLogLevel = i.DiagConsoleLogger = i.ROOT_CONTEXT = i.createContextKey = i.baggageEntryMetadataFromString = void 0;
          var e2 = a(369);
          Object.defineProperty(i, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
            return e2.baggageEntryMetadataFromString;
          } });
          var t3 = a(780);
          Object.defineProperty(i, "createContextKey", { enumerable: true, get: function() {
            return t3.createContextKey;
          } }), Object.defineProperty(i, "ROOT_CONTEXT", { enumerable: true, get: function() {
            return t3.ROOT_CONTEXT;
          } });
          var r2 = a(972);
          Object.defineProperty(i, "DiagConsoleLogger", { enumerable: true, get: function() {
            return r2.DiagConsoleLogger;
          } });
          var n2 = a(957);
          Object.defineProperty(i, "DiagLogLevel", { enumerable: true, get: function() {
            return n2.DiagLogLevel;
          } });
          var o = a(102);
          Object.defineProperty(i, "createNoopMeter", { enumerable: true, get: function() {
            return o.createNoopMeter;
          } });
          var s = a(901);
          Object.defineProperty(i, "ValueType", { enumerable: true, get: function() {
            return s.ValueType;
          } });
          var l = a(194);
          Object.defineProperty(i, "defaultTextMapGetter", { enumerable: true, get: function() {
            return l.defaultTextMapGetter;
          } }), Object.defineProperty(i, "defaultTextMapSetter", { enumerable: true, get: function() {
            return l.defaultTextMapSetter;
          } });
          var d = a(125);
          Object.defineProperty(i, "ProxyTracer", { enumerable: true, get: function() {
            return d.ProxyTracer;
          } });
          var u = a(846);
          Object.defineProperty(i, "ProxyTracerProvider", { enumerable: true, get: function() {
            return u.ProxyTracerProvider;
          } });
          var c = a(996);
          Object.defineProperty(i, "SamplingDecision", { enumerable: true, get: function() {
            return c.SamplingDecision;
          } });
          var f = a(357);
          Object.defineProperty(i, "SpanKind", { enumerable: true, get: function() {
            return f.SpanKind;
          } });
          var p = a(847);
          Object.defineProperty(i, "SpanStatusCode", { enumerable: true, get: function() {
            return p.SpanStatusCode;
          } });
          var _ = a(475);
          Object.defineProperty(i, "TraceFlags", { enumerable: true, get: function() {
            return _.TraceFlags;
          } });
          var h = a(98);
          Object.defineProperty(i, "createTraceState", { enumerable: true, get: function() {
            return h.createTraceState;
          } });
          var g = a(139);
          Object.defineProperty(i, "isSpanContextValid", { enumerable: true, get: function() {
            return g.isSpanContextValid;
          } }), Object.defineProperty(i, "isValidTraceId", { enumerable: true, get: function() {
            return g.isValidTraceId;
          } }), Object.defineProperty(i, "isValidSpanId", { enumerable: true, get: function() {
            return g.isValidSpanId;
          } });
          var m = a(476);
          Object.defineProperty(i, "INVALID_SPANID", { enumerable: true, get: function() {
            return m.INVALID_SPANID;
          } }), Object.defineProperty(i, "INVALID_TRACEID", { enumerable: true, get: function() {
            return m.INVALID_TRACEID;
          } }), Object.defineProperty(i, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
            return m.INVALID_SPAN_CONTEXT;
          } });
          let y = a(67);
          Object.defineProperty(i, "context", { enumerable: true, get: function() {
            return y.context;
          } });
          let w = a(506);
          Object.defineProperty(i, "diag", { enumerable: true, get: function() {
            return w.diag;
          } });
          let v = a(886);
          Object.defineProperty(i, "metrics", { enumerable: true, get: function() {
            return v.metrics;
          } });
          let b = a(939);
          Object.defineProperty(i, "propagation", { enumerable: true, get: function() {
            return b.propagation;
          } });
          let x = a(845);
          Object.defineProperty(i, "trace", { enumerable: true, get: function() {
            return x.trace;
          } }), i.default = { context: y.context, diag: w.diag, metrics: v.metrics, propagation: b.propagation, trace: x.trace };
        })(), e.exports = i;
      })();
    }, 1133: (e) => {
      (() => {
        "use strict";
        "undefined" != typeof __nccwpck_require__ && (__nccwpck_require__.ab = "//");
        var t = {};
        (() => {
          t.parse = function(t2, r2) {
            if ("string" != typeof t2) throw TypeError("argument str must be a string");
            for (var a2 = {}, i = t2.split(n), o = (r2 || {}).decode || e2, s = 0; s < i.length; s++) {
              var l = i[s], d = l.indexOf("=");
              if (!(d < 0)) {
                var u = l.substr(0, d).trim(), c = l.substr(++d, l.length).trim();
                '"' == c[0] && (c = c.slice(1, -1)), void 0 == a2[u] && (a2[u] = function(e3, t3) {
                  try {
                    return t3(e3);
                  } catch (t4) {
                    return e3;
                  }
                }(c, o));
              }
            }
            return a2;
          }, t.serialize = function(e3, t2, n2) {
            var i = n2 || {}, o = i.encode || r;
            if ("function" != typeof o) throw TypeError("option encode is invalid");
            if (!a.test(e3)) throw TypeError("argument name is invalid");
            var s = o(t2);
            if (s && !a.test(s)) throw TypeError("argument val is invalid");
            var l = e3 + "=" + s;
            if (null != i.maxAge) {
              var d = i.maxAge - 0;
              if (isNaN(d) || !isFinite(d)) throw TypeError("option maxAge is invalid");
              l += "; Max-Age=" + Math.floor(d);
            }
            if (i.domain) {
              if (!a.test(i.domain)) throw TypeError("option domain is invalid");
              l += "; Domain=" + i.domain;
            }
            if (i.path) {
              if (!a.test(i.path)) throw TypeError("option path is invalid");
              l += "; Path=" + i.path;
            }
            if (i.expires) {
              if ("function" != typeof i.expires.toUTCString) throw TypeError("option expires is invalid");
              l += "; Expires=" + i.expires.toUTCString();
            }
            if (i.httpOnly && (l += "; HttpOnly"), i.secure && (l += "; Secure"), i.sameSite) switch ("string" == typeof i.sameSite ? i.sameSite.toLowerCase() : i.sameSite) {
              case true:
              case "strict":
                l += "; SameSite=Strict";
                break;
              case "lax":
                l += "; SameSite=Lax";
                break;
              case "none":
                l += "; SameSite=None";
                break;
              default:
                throw TypeError("option sameSite is invalid");
            }
            return l;
          };
          var e2 = decodeURIComponent, r = encodeURIComponent, n = /; */, a = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        })(), e.exports = t;
      })();
    }, 340: (e, t, r) => {
      var n;
      (() => {
        var a = { 226: function(a2, i2) {
          !function(o2, s2) {
            "use strict";
            var l = "function", d = "undefined", u = "object", c = "string", f = "major", p = "model", _ = "name", h = "type", g = "vendor", m = "version", y = "architecture", w = "console", v = "mobile", b = "tablet", x = "smarttv", S = "wearable", P = "embedded", C = "Amazon", R = "Apple", L = "ASUS", E = "BlackBerry", O = "Browser", T = "Chrome", M = "Firefox", N = "Google", A = "Huawei", I = "Microsoft", k = "Motorola", j = "Opera", D = "Samsung", q = "Sharp", B = "Sony", U = "Xiaomi", G = "Zebra", V = "Facebook", H = "Chromium OS", z = "Mac OS", $ = function(e2, t2) {
              var r2 = {};
              for (var n2 in e2) t2[n2] && t2[n2].length % 2 == 0 ? r2[n2] = t2[n2].concat(e2[n2]) : r2[n2] = e2[n2];
              return r2;
            }, K = function(e2) {
              for (var t2 = {}, r2 = 0; r2 < e2.length; r2++) t2[e2[r2].toUpperCase()] = e2[r2];
              return t2;
            }, F = function(e2, t2) {
              return typeof e2 === c && -1 !== W(t2).indexOf(W(e2));
            }, W = function(e2) {
              return e2.toLowerCase();
            }, Z = function(e2, t2) {
              if (typeof e2 === c) return e2 = e2.replace(/^\s\s*/, ""), typeof t2 === d ? e2 : e2.substring(0, 350);
            }, Y = function(e2, t2) {
              for (var r2, n2, a3, i3, o3, d2, c2 = 0; c2 < t2.length && !o3; ) {
                var f2 = t2[c2], p2 = t2[c2 + 1];
                for (r2 = n2 = 0; r2 < f2.length && !o3 && f2[r2]; ) if (o3 = f2[r2++].exec(e2)) for (a3 = 0; a3 < p2.length; a3++) d2 = o3[++n2], typeof (i3 = p2[a3]) === u && i3.length > 0 ? 2 === i3.length ? typeof i3[1] == l ? this[i3[0]] = i3[1].call(this, d2) : this[i3[0]] = i3[1] : 3 === i3.length ? typeof i3[1] !== l || i3[1].exec && i3[1].test ? this[i3[0]] = d2 ? d2.replace(i3[1], i3[2]) : void 0 : this[i3[0]] = d2 ? i3[1].call(this, d2, i3[2]) : void 0 : 4 === i3.length && (this[i3[0]] = d2 ? i3[3].call(this, d2.replace(i3[1], i3[2])) : void 0) : this[i3] = d2 || s2;
                c2 += 2;
              }
            }, J = function(e2, t2) {
              for (var r2 in t2) if (typeof t2[r2] === u && t2[r2].length > 0) {
                for (var n2 = 0; n2 < t2[r2].length; n2++) if (F(t2[r2][n2], e2)) return "?" === r2 ? s2 : r2;
              } else if (F(t2[r2], e2)) return "?" === r2 ? s2 : r2;
              return e2;
            }, X = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, Q = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [m, [_, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [m, [_, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [_, m], [/opios[\/ ]+([\w\.]+)/i], [m, [_, j + " Mini"]], [/\bopr\/([\w\.]+)/i], [m, [_, j]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [_, m], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [m, [_, "UC" + O]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [m, [_, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [m, [_, "WeChat"]], [/konqueror\/([\w\.]+)/i], [m, [_, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [m, [_, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [m, [_, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[_, /(.+)/, "$1 Secure " + O], m], [/\bfocus\/([\w\.]+)/i], [m, [_, M + " Focus"]], [/\bopt\/([\w\.]+)/i], [m, [_, j + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [m, [_, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [m, [_, "Dolphin"]], [/coast\/([\w\.]+)/i], [m, [_, j + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [m, [_, "MIUI " + O]], [/fxios\/([-\w\.]+)/i], [m, [_, M]], [/\bqihu|(qi?ho?o?|360)browser/i], [[_, "360 " + O]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[_, /(.+)/, "$1 " + O], m], [/(comodo_dragon)\/([\w\.]+)/i], [[_, /_/g, " "], m], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [_, m], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [_], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[_, V], m], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [_, m], [/\bgsa\/([\w\.]+) .*safari\//i], [m, [_, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [m, [_, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [m, [_, T + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[_, T + " WebView"], m], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [m, [_, "Android " + O]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [_, m], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [m, [_, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [m, _], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [_, [m, J, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [_, m], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[_, "Netscape"], m], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [m, [_, M + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [_, m], [/(cobalt)\/([\w\.]+)/i], [_, [m, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[y, "amd64"]], [/(ia32(?=;))/i], [[y, W]], [/((?:i[346]|x)86)[;\)]/i], [[y, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[y, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[y, "armhf"]], [/windows (ce|mobile); ppc;/i], [[y, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[y, /ower/, "", W]], [/(sun4\w)[;\)]/i], [[y, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[y, W]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [p, [g, D], [h, b]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [p, [g, D], [h, v]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [p, [g, R], [h, v]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [p, [g, R], [h, b]], [/(macintosh);/i], [p, [g, R]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [p, [g, q], [h, v]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [p, [g, A], [h, b]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [p, [g, A], [h, v]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[p, /_/g, " "], [g, U], [h, v]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[p, /_/g, " "], [g, U], [h, b]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [p, [g, "OPPO"], [h, v]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [p, [g, "Vivo"], [h, v]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [p, [g, "Realme"], [h, v]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [p, [g, k], [h, v]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [p, [g, k], [h, b]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [p, [g, "LG"], [h, b]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [p, [g, "LG"], [h, v]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [p, [g, "Lenovo"], [h, b]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[p, /_/g, " "], [g, "Nokia"], [h, v]], [/(pixel c)\b/i], [p, [g, N], [h, b]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [p, [g, N], [h, v]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [p, [g, B], [h, v]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[p, "Xperia Tablet"], [g, B], [h, b]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [p, [g, "OnePlus"], [h, v]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [p, [g, C], [h, b]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[p, /(.+)/g, "Fire Phone $1"], [g, C], [h, v]], [/(playbook);[-\w\),; ]+(rim)/i], [p, g, [h, b]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [p, [g, E], [h, v]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [p, [g, L], [h, b]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [p, [g, L], [h, v]], [/(nexus 9)/i], [p, [g, "HTC"], [h, b]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [g, [p, /_/g, " "], [h, v]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [p, [g, "Acer"], [h, b]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [p, [g, "Meizu"], [h, v]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [g, p, [h, v]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [g, p, [h, b]], [/(surface duo)/i], [p, [g, I], [h, b]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [p, [g, "Fairphone"], [h, v]], [/(u304aa)/i], [p, [g, "AT&T"], [h, v]], [/\bsie-(\w*)/i], [p, [g, "Siemens"], [h, v]], [/\b(rct\w+) b/i], [p, [g, "RCA"], [h, b]], [/\b(venue[\d ]{2,7}) b/i], [p, [g, "Dell"], [h, b]], [/\b(q(?:mv|ta)\w+) b/i], [p, [g, "Verizon"], [h, b]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [p, [g, "Barnes & Noble"], [h, b]], [/\b(tm\d{3}\w+) b/i], [p, [g, "NuVision"], [h, b]], [/\b(k88) b/i], [p, [g, "ZTE"], [h, b]], [/\b(nx\d{3}j) b/i], [p, [g, "ZTE"], [h, v]], [/\b(gen\d{3}) b.+49h/i], [p, [g, "Swiss"], [h, v]], [/\b(zur\d{3}) b/i], [p, [g, "Swiss"], [h, b]], [/\b((zeki)?tb.*\b) b/i], [p, [g, "Zeki"], [h, b]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[g, "Dragon Touch"], p, [h, b]], [/\b(ns-?\w{0,9}) b/i], [p, [g, "Insignia"], [h, b]], [/\b((nxa|next)-?\w{0,9}) b/i], [p, [g, "NextBook"], [h, b]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[g, "Voice"], p, [h, v]], [/\b(lvtel\-)?(v1[12]) b/i], [[g, "LvTel"], p, [h, v]], [/\b(ph-1) /i], [p, [g, "Essential"], [h, v]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [p, [g, "Envizen"], [h, b]], [/\b(trio[-\w\. ]+) b/i], [p, [g, "MachSpeed"], [h, b]], [/\btu_(1491) b/i], [p, [g, "Rotor"], [h, b]], [/(shield[\w ]+) b/i], [p, [g, "Nvidia"], [h, b]], [/(sprint) (\w+)/i], [g, p, [h, v]], [/(kin\.[onetw]{3})/i], [[p, /\./g, " "], [g, I], [h, v]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [p, [g, G], [h, b]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [p, [g, G], [h, v]], [/smart-tv.+(samsung)/i], [g, [h, x]], [/hbbtv.+maple;(\d+)/i], [[p, /^/, "SmartTV"], [g, D], [h, x]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[g, "LG"], [h, x]], [/(apple) ?tv/i], [g, [p, R + " TV"], [h, x]], [/crkey/i], [[p, T + "cast"], [g, N], [h, x]], [/droid.+aft(\w)( bui|\))/i], [p, [g, C], [h, x]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [p, [g, q], [h, x]], [/(bravia[\w ]+)( bui|\))/i], [p, [g, B], [h, x]], [/(mitv-\w{5}) bui/i], [p, [g, U], [h, x]], [/Hbbtv.*(technisat) (.*);/i], [g, p, [h, x]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[g, Z], [p, Z], [h, x]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[h, x]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [g, p, [h, w]], [/droid.+; (shield) bui/i], [p, [g, "Nvidia"], [h, w]], [/(playstation [345portablevi]+)/i], [p, [g, B], [h, w]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [p, [g, I], [h, w]], [/((pebble))app/i], [g, p, [h, S]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [p, [g, R], [h, S]], [/droid.+; (glass) \d/i], [p, [g, N], [h, S]], [/droid.+; (wt63?0{2,3})\)/i], [p, [g, G], [h, S]], [/(quest( 2| pro)?)/i], [p, [g, V], [h, S]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [g, [h, P]], [/(aeobc)\b/i], [p, [g, C], [h, P]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [p, [h, v]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [p, [h, b]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[h, b]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[h, v]], [/(android[-\w\. ]{0,9});.+buil/i], [p, [g, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [m, [_, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [m, [_, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [_, m], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [m, _]], os: [[/microsoft (windows) (vista|xp)/i], [_, m], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [_, [m, J, X]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[_, "Windows"], [m, J, X]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[m, /_/g, "."], [_, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[_, z], [m, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [m, _], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [_, m], [/\(bb(10);/i], [m, [_, E]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [m, [_, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [m, [_, M + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [m, [_, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [m, [_, "watchOS"]], [/crkey\/([\d\.]+)/i], [m, [_, T + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[_, H], m], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [_, m], [/(sunos) ?([\w\.\d]*)/i], [[_, "Solaris"], m], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [_, m]] }, ee = function(e2, t2) {
              if (typeof e2 === u && (t2 = e2, e2 = s2), !(this instanceof ee)) return new ee(e2, t2).getResult();
              var r2 = typeof o2 !== d && o2.navigator ? o2.navigator : s2, n2 = e2 || (r2 && r2.userAgent ? r2.userAgent : ""), a3 = r2 && r2.userAgentData ? r2.userAgentData : s2, i3 = t2 ? $(Q, t2) : Q, w2 = r2 && r2.userAgent == n2;
              return this.getBrowser = function() {
                var e3, t3 = {};
                return t3[_] = s2, t3[m] = s2, Y.call(t3, n2, i3.browser), t3[f] = typeof (e3 = t3[m]) === c ? e3.replace(/[^\d\.]/g, "").split(".")[0] : s2, w2 && r2 && r2.brave && typeof r2.brave.isBrave == l && (t3[_] = "Brave"), t3;
              }, this.getCPU = function() {
                var e3 = {};
                return e3[y] = s2, Y.call(e3, n2, i3.cpu), e3;
              }, this.getDevice = function() {
                var e3 = {};
                return e3[g] = s2, e3[p] = s2, e3[h] = s2, Y.call(e3, n2, i3.device), w2 && !e3[h] && a3 && a3.mobile && (e3[h] = v), w2 && "Macintosh" == e3[p] && r2 && typeof r2.standalone !== d && r2.maxTouchPoints && r2.maxTouchPoints > 2 && (e3[p] = "iPad", e3[h] = b), e3;
              }, this.getEngine = function() {
                var e3 = {};
                return e3[_] = s2, e3[m] = s2, Y.call(e3, n2, i3.engine), e3;
              }, this.getOS = function() {
                var e3 = {};
                return e3[_] = s2, e3[m] = s2, Y.call(e3, n2, i3.os), w2 && !e3[_] && a3 && "Unknown" != a3.platform && (e3[_] = a3.platform.replace(/chrome os/i, H).replace(/macos/i, z)), e3;
              }, this.getResult = function() {
                return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
              }, this.getUA = function() {
                return n2;
              }, this.setUA = function(e3) {
                return n2 = typeof e3 === c && e3.length > 350 ? Z(e3, 350) : e3, this;
              }, this.setUA(n2), this;
            };
            ee.VERSION = "1.0.35", ee.BROWSER = K([_, m, f]), ee.CPU = K([y]), ee.DEVICE = K([p, g, h, w, v, x, b, S, P]), ee.ENGINE = ee.OS = K([_, m]), typeof i2 !== d ? (a2.exports && (i2 = a2.exports = ee), i2.UAParser = ee) : r.amdO ? void 0 !== (n = function() {
              return ee;
            }.call(t, r, t, e)) && (e.exports = n) : typeof o2 !== d && (o2.UAParser = ee);
            var et = typeof o2 !== d && (o2.jQuery || o2.Zepto);
            if (et && !et.ua) {
              var er = new ee();
              et.ua = er.getResult(), et.ua.get = function() {
                return er.getUA();
              }, et.ua.set = function(e2) {
                er.setUA(e2);
                var t2 = er.getResult();
                for (var r2 in t2) et.ua[r2] = t2[r2];
              };
            }
          }("object" == typeof window ? window : this);
        } }, i = {};
        function o(e2) {
          var t2 = i[e2];
          if (void 0 !== t2) return t2.exports;
          var r2 = i[e2] = { exports: {} }, n2 = true;
          try {
            a[e2].call(r2.exports, r2, r2.exports, o), n2 = false;
          } finally {
            n2 && delete i[e2];
          }
          return r2.exports;
        }
        o.ab = "//";
        var s = o(226);
        e.exports = s;
      })();
    }, 3310: (e, t, r) => {
      "use strict";
      r.r(t), r.d(t, { default: () => M });
      var n, a, i = r(3), o = r(5023);
      function s(e2) {
        return "string" != typeof e2 && ("number" != typeof e2 || isNaN(e2)) && "boolean" != typeof e2 ? "" : String(e2);
      }
      let l = /https?|ftp|gopher|file/;
      function d(e2) {
        let { auth: t2, hostname: r2 } = e2, n2 = e2.protocol || "", a2 = e2.pathname || "", i2 = e2.hash || "", o2 = e2.query || "", d2 = false;
        t2 = t2 ? encodeURIComponent(t2).replace(/%3A/i, ":") + "@" : "", e2.host ? d2 = t2 + e2.host : r2 && (d2 = t2 + (~r2.indexOf(":") ? "[" + r2 + "]" : r2), e2.port && (d2 += ":" + e2.port)), o2 && "object" == typeof o2 && (o2 = String(function(e3) {
          let t3 = new URLSearchParams();
          return Object.entries(e3).forEach((e4) => {
            let [r3, n3] = e4;
            Array.isArray(n3) ? n3.forEach((e5) => t3.append(r3, s(e5))) : t3.set(r3, s(n3));
          }), t3;
        }(o2)));
        let u2 = e2.search || o2 && "?" + o2 || "";
        return n2 && !n2.endsWith(":") && (n2 += ":"), e2.slashes || (!n2 || l.test(n2)) && false !== d2 ? (d2 = "//" + (d2 || ""), a2 && "/" !== a2[0] && (a2 = "/" + a2)) : d2 || (d2 = ""), i2 && "#" !== i2[0] && (i2 = "#" + i2), u2 && "?" !== u2[0] && (u2 = "?" + u2), "" + n2 + d2 + (a2 = a2.replace(/[?#]/g, encodeURIComponent)) + (u2 = u2.replace("#", "%23")) + i2;
      }
      let u = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/, c = (e2) => u.test(e2);
      "undefined" != typeof performance && ["mark", "measure", "getEntriesByName"].every((e2) => "function" == typeof performance[e2]);
      class f extends Error {
      }
      var p = r(2906), _ = r(8834);
      let h = (e2) => {
        if (!e2.startsWith("/")) return e2;
        let { pathname: t2, query: r2, hash: n2 } = (0, _.c)(e2);
        return "" + (0, p.Q)(t2) + r2 + n2;
      };
      var g = r(778);
      function m(e2) {
        if (!c(e2)) return true;
        try {
          var t2;
          let r2 = function() {
            let { protocol: e3, hostname: t3, port: r3 } = window.location;
            return e3 + "//" + t3 + (r3 ? ":" + r3 : "");
          }(), n2 = new URL(e2, r2);
          return n2.origin === r2 && (t2 = n2.pathname, (0, g.Y)(t2, ""));
        } catch (e3) {
          return false;
        }
      }
      var y = r(4035);
      let w = ["(..)(..)", "(.)", "(..)", "(...)"], v = /\/\[[^/]+?\](?=\/|$)/;
      r(300);
      let b = /[|\\{}()[\]^$+*?.-]/, x = /[|\\{}()[\]^$+*?.-]/g;
      function S(e2) {
        return b.test(e2) ? e2.replace(x, "\\$&") : e2;
      }
      function P(e2) {
        let t2 = e2.startsWith("[") && e2.endsWith("]");
        t2 && (e2 = e2.slice(1, -1));
        let r2 = e2.startsWith("...");
        return r2 && (e2 = e2.slice(3)), { key: e2, repeat: r2, optional: t2 };
      }
      function C(e2, t2, r2) {
        let n2;
        let a2 = "string" == typeof t2 ? t2 : d(t2), i2 = a2.match(/^[a-zA-Z]{1,}:\/\//), o2 = i2 ? a2.slice(i2[0].length) : a2;
        if ((o2.split("?", 1)[0] || "").match(/(\/\/|\\)/)) {
          console.error("Invalid href '" + a2 + "' passed to next/router in page: '" + e2.pathname + "'. Repeated forward-slashes (//) or backslashes \\ are not valid in the href.");
          let t3 = function(e3) {
            let t4 = e3.split("?");
            return t4[0].replace(/\\/g, "/").replace(/\/\/+/g, "/") + (t4[1] ? "?" + t4.slice(1).join("?") : "");
          }(o2);
          a2 = (i2 ? i2[0] : "") + t3;
        }
        if (!m(a2)) return r2 ? [a2] : a2;
        try {
          n2 = new URL(a2.startsWith("#") ? e2.asPath : e2.pathname, "http://n");
        } catch (e3) {
          n2 = new URL("/", "http://n");
        }
        try {
          var s2, l2;
          let e3 = new URL(a2, n2);
          e3.pathname = h(e3.pathname);
          let t3 = "";
          if (s2 = e3.pathname, void 0 !== s2.split("/").find((e4) => w.find((t4) => e4.startsWith(t4))) && (s2 = function(e4) {
            let t4, r3, n3;
            for (let a3 of e4.split("/")) if (r3 = w.find((e5) => a3.startsWith(e5))) {
              [t4, n3] = e4.split(r3, 2);
              break;
            }
            if (!t4 || !r3 || !n3) throw Error(`Invalid interception route: ${e4}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`);
            switch (t4 = (0, y.w)(t4), r3) {
              case "(.)":
                n3 = "/" === t4 ? `/${n3}` : t4 + "/" + n3;
                break;
              case "(..)":
                if ("/" === t4) throw Error(`Invalid interception route: ${e4}. Cannot use (..) marker at the root level, use (.) instead.`);
                n3 = t4.split("/").slice(0, -1).concat(n3).join("/");
                break;
              case "(...)":
                n3 = "/" + n3;
                break;
              case "(..)(..)":
                let a3 = t4.split("/");
                if (a3.length <= 2) throw Error(`Invalid interception route: ${e4}. Cannot use (..)(..) marker at the root level or one level up.`);
                n3 = a3.slice(0, -2).concat(n3).join("/");
                break;
              default:
                throw Error("Invariant: unexpected marker");
            }
            return { interceptingRoute: t4, interceptedRoute: n3 };
          }(s2).interceptedRoute), v.test(s2) && e3.searchParams && r2) {
            let r3 = function(e4) {
              let t4 = {};
              return e4.forEach((e5, r4) => {
                void 0 === t4[r4] ? t4[r4] = e5 : Array.isArray(t4[r4]) ? t4[r4].push(e5) : t4[r4] = [t4[r4], e5];
              }), t4;
            }(e3.searchParams), { result: n3, params: a3 } = function(e4, t4, r4) {
              let n4 = "", a4 = function(e5) {
                let { parameterizedRoute: t5, groups: r5 } = function(e6) {
                  let t6 = (0, p.Q)(e6).slice(1).split("/"), r6 = {}, n5 = 1;
                  return { parameterizedRoute: t6.map((e7) => {
                    let t7 = w.find((t8) => e7.startsWith(t8)), a5 = e7.match(/\[((?:\[.*\])|.+)\]/);
                    if (t7 && a5) {
                      let { key: e8, optional: i5, repeat: o4 } = P(a5[1]);
                      return r6[e8] = { pos: n5++, repeat: o4, optional: i5 }, "/" + S(t7) + "([^/]+?)";
                    }
                    if (!a5) return "/" + S(e7);
                    {
                      let { key: e8, repeat: t8, optional: i5 } = P(a5[1]);
                      return r6[e8] = { pos: n5++, repeat: t8, optional: i5 }, t8 ? i5 ? "(?:/(.+?))?" : "/(.+?)" : "/([^/]+?)";
                    }
                  }).join(""), groups: r6 };
                }(e5);
                return { re: RegExp("^" + t5 + "(?:/)?$"), groups: r5 };
              }(e4), i4 = a4.groups, o3 = (t4 !== e4 ? function(e5) {
                let { re: t5, groups: r5 } = e5;
                return (e6) => {
                  let n5 = t5.exec(e6);
                  if (!n5) return false;
                  let a5 = (e7) => {
                    try {
                      return decodeURIComponent(e7);
                    } catch (e8) {
                      throw new f("failed to decode param");
                    }
                  }, i5 = {};
                  return Object.keys(r5).forEach((e7) => {
                    let t6 = r5[e7], o4 = n5[t6.pos];
                    void 0 !== o4 && (i5[e7] = ~o4.indexOf("/") ? o4.split("/").map((e8) => a5(e8)) : t6.repeat ? [a5(o4)] : a5(o4));
                  }), i5;
                };
              }(a4)(t4) : "") || r4;
              n4 = e4;
              let s3 = Object.keys(i4);
              return s3.every((e5) => {
                let t5 = o3[e5] || "", { repeat: r5, optional: a5 } = i4[e5], s4 = "[" + (r5 ? "..." : "") + e5 + "]";
                return a5 && (s4 = (t5 ? "" : "/") + "[" + s4 + "]"), r5 && !Array.isArray(t5) && (t5 = [t5]), (a5 || e5 in o3) && (n4 = n4.replace(s4, r5 ? t5.map((e6) => encodeURIComponent(e6)).join("/") : encodeURIComponent(t5)) || "/");
              }) || (n4 = ""), { params: s3, result: n4 };
            }(e3.pathname, e3.pathname, r3);
            n3 && (l2 = { pathname: n3, hash: e3.hash, query: function(e4, t4) {
              let r4 = {};
              return Object.keys(e4).forEach((n4) => {
                t4.includes(n4) || (r4[n4] = e4[n4]);
              }), r4;
            }(r3, a3) }, t3 = d(l2));
          }
          let i3 = e3.origin === n2.origin ? e3.href.slice(e3.origin.length) : e3.href;
          return r2 ? [i3, t3 || i3] : i3;
        } catch (e3) {
          return r2 ? [a2] : a2;
        }
      }
      let R = function(e2) {
        for (var t2 = arguments.length, r2 = Array(t2 > 1 ? t2 - 1 : 0), n2 = 1; n2 < t2; n2++) r2[n2 - 1] = arguments[n2];
        return e2;
      }, L = o.createContext(null);
      var E = r(8754);
      "undefined" != typeof self && self.requestIdleCallback && self.requestIdleCallback.bind(window), "undefined" != typeof self && self.cancelIdleCallback && self.cancelIdleCallback.bind(window);
      var O = r(366);
      function T(e2) {
        return "string" == typeof e2 ? e2 : d(e2);
      }
      !function(e2) {
        e2.AUTO = "auto", e2.FULL = "full", e2.TEMPORARY = "temporary";
      }(n || (n = {})), function(e2) {
        e2.fresh = "fresh", e2.reusable = "reusable", e2.expired = "expired", e2.stale = "stale";
      }(a || (a = {}));
      let M = o.forwardRef(function(e2, t2) {
        let r2, a2;
        let { href: s2, as: l2, children: d2, prefetch: u2 = null, passHref: f2, replace: p2, shallow: _2, scroll: g2, locale: y2, onClick: w2, onMouseEnter: v2, onTouchStart: b2, legacyBehavior: x2 = false, ...S2 } = e2;
        r2 = d2, x2 && ("string" == typeof r2 || "number" == typeof r2) && (r2 = (0, i.jsx)("a", { children: r2 }));
        let P2 = o.useContext(L), M2 = o.useContext(E.pk), N = null != P2 ? P2 : M2, A = !P2, I = false !== u2, k = null === u2 ? n.AUTO : n.FULL, { href: j, as: D } = o.useMemo(() => {
          if (!P2) {
            let e4 = T(s2);
            return { href: e4, as: l2 ? T(l2) : e4 };
          }
          let [e3, t3] = C(P2, s2, true);
          return { href: e3, as: l2 ? C(P2, l2) : t3 || e3 };
        }, [P2, s2, l2]), q = o.useRef(j), B = o.useRef(D);
        x2 && (a2 = o.Children.only(r2));
        let U = x2 ? a2 && "object" == typeof a2 && a2.ref : t2, [G, V, H] = function(e3) {
          let { rootRef: t3, rootMargin: r3, disabled: n2 } = e3, [a3, i2] = (0, o.useState)(false), s3 = (0, o.useRef)(null);
          return [(0, o.useCallback)((e4) => {
            s3.current = e4;
          }, []), a3, (0, o.useCallback)(() => {
            i2(false);
          }, [])];
        }({ rootMargin: "200px" }), z = o.useCallback((e3) => {
          (B.current !== D || q.current !== j) && (H(), B.current = D, q.current = j), G(e3), U && ("function" == typeof U ? U(e3) : "object" == typeof U && (U.current = e3));
        }, [D, U, j, H, G]);
        o.useEffect(() => {
        }, [D, j, V, y2, I, null == P2 ? void 0 : P2.locale, N, A, k]);
        let $ = { ref: z, onClick(e3) {
          x2 || "function" != typeof w2 || w2(e3), x2 && a2.props && "function" == typeof a2.props.onClick && a2.props.onClick(e3), N && !e3.defaultPrevented && function(e4, t3, r3, n2, a3, i2, s3, l3, d3) {
            let { nodeName: u3 } = e4.currentTarget;
            if ("A" === u3.toUpperCase() && (function(e5) {
              let t4 = e5.currentTarget.getAttribute("target");
              return t4 && "_self" !== t4 || e5.metaKey || e5.ctrlKey || e5.shiftKey || e5.altKey || e5.nativeEvent && 2 === e5.nativeEvent.which;
            }(e4) || !d3 && !m(r3))) return;
            e4.preventDefault();
            let c2 = () => {
              let e5 = null == s3 || s3;
              "beforePopState" in t3 ? t3[a3 ? "replace" : "push"](r3, n2, { shallow: i2, locale: l3, scroll: e5 }) : t3[a3 ? "replace" : "push"](n2 || r3, { scroll: e5 });
            };
            d3 ? o.startTransition(c2) : c2();
          }(e3, N, j, D, p2, _2, g2, y2, A);
        }, onMouseEnter(e3) {
          x2 || "function" != typeof v2 || v2(e3), x2 && a2.props && "function" == typeof a2.props.onMouseEnter && a2.props.onMouseEnter(e3);
        }, onTouchStart: function(e3) {
          x2 || "function" != typeof b2 || b2(e3), x2 && a2.props && "function" == typeof a2.props.onTouchStart && a2.props.onTouchStart(e3);
        } };
        if (c(D)) $.href = D;
        else if (!x2 || f2 || "a" === a2.type && !("href" in a2.props)) {
          var K;
          let e3 = void 0 !== y2 ? y2 : null == P2 ? void 0 : P2.locale, t3 = (null == P2 ? void 0 : P2.isLocaleDomain) && (null == P2 || P2.locales, null == P2 || P2.domainLocales, false);
          $.href = t3 || (K = R(D, e3, null == P2 ? void 0 : P2.defaultLocale), h((0, O.V)(K, "")));
        }
        return x2 ? o.cloneElement(a2, $) : (0, i.jsx)("a", { ...S2, ...$, children: r2 });
      });
    }, 3327: (e, t, r) => {
      "use strict";
      r.r(t), r.d(t, { ReadonlyURLSearchParams: () => v, RedirectType: () => a, ServerInsertedHTMLContext: () => b, notFound: () => y, permanentRedirect: () => g, redirect: () => h, useParams: () => R, usePathname: () => P, useRouter: () => C, useSearchParams: () => S, useSelectedLayoutSegment: () => E, useSelectedLayoutSegments: () => L, useServerInsertedHTML: () => x });
      var n, a, i = r(5023), o = r(8754);
      let s = (0, i.createContext)(null), l = (0, i.createContext)(null), d = (0, i.createContext)(null);
      var u = r(4552), c = r(1053);
      let f = (0, r(5228).P)();
      !function(e2) {
        e2[e2.SeeOther = 303] = "SeeOther", e2[e2.TemporaryRedirect = 307] = "TemporaryRedirect", e2[e2.PermanentRedirect = 308] = "PermanentRedirect";
      }(n || (n = {}));
      let p = "NEXT_REDIRECT";
      function _(e2, t2, r2) {
        void 0 === r2 && (r2 = n.TemporaryRedirect);
        let a2 = Error(p);
        a2.digest = p + ";" + t2 + ";" + e2 + ";" + r2 + ";";
        let i2 = c.O.getStore();
        return i2 && (a2.mutableCookies = i2.mutableCookies), a2;
      }
      function h(e2, t2) {
        void 0 === t2 && (t2 = "replace");
        let r2 = f.getStore();
        throw _(e2, t2, (null == r2 ? void 0 : r2.isAction) ? n.SeeOther : n.TemporaryRedirect);
      }
      function g(e2, t2) {
        void 0 === t2 && (t2 = "replace");
        let r2 = f.getStore();
        throw _(e2, t2, (null == r2 ? void 0 : r2.isAction) ? n.SeeOther : n.PermanentRedirect);
      }
      !function(e2) {
        e2.push = "push", e2.replace = "replace";
      }(a || (a = {}));
      let m = "NEXT_NOT_FOUND";
      function y() {
        let e2 = Error(m);
        throw e2.digest = m, e2;
      }
      class w extends Error {
        constructor() {
          super("Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams");
        }
      }
      class v extends URLSearchParams {
        append() {
          throw new w();
        }
        delete() {
          throw new w();
        }
        set() {
          throw new w();
        }
        sort() {
          throw new w();
        }
      }
      let b = i.createContext(null);
      function x(e2) {
        let t2 = (0, i.useContext)(b);
        t2 && t2(e2);
      }
      function S() {
        let e2 = (0, i.useContext)(s), t2 = (0, i.useMemo)(() => e2 ? new v(e2) : null, [e2]);
        {
          let { bailoutToClientRendering: e3 } = r(2912);
          e3("useSearchParams()");
        }
        return t2;
      }
      function P() {
        return (0, i.useContext)(l);
      }
      function C() {
        let e2 = (0, i.useContext)(o.pk);
        if (null === e2) throw Error("invariant expected app router to be mounted");
        return e2;
      }
      function R() {
        return (0, i.useContext)(d);
      }
      function L(e2) {
        void 0 === e2 && (e2 = "children");
        let t2 = (0, i.useContext)(o.ZM);
        return t2 ? function e3(t3, r2, n2, a2) {
          var i2, o2;
          let s2;
          if (void 0 === n2 && (n2 = true), void 0 === a2 && (a2 = []), n2) s2 = t3[1][r2];
          else {
            let e4 = t3[1];
            s2 = null != (i2 = e4.children) ? i2 : Object.values(e4)[0];
          }
          if (!s2) return a2;
          let l2 = Array.isArray(o2 = s2[0]) ? o2[1] : o2;
          return !l2 || l2.startsWith(u.GC) ? a2 : (a2.push(l2), e3(s2, r2, false, a2));
        }(t2.tree, e2) : null;
      }
      function E(e2) {
        void 0 === e2 && (e2 = "children");
        let t2 = L(e2);
        if (!t2 || 0 === t2.length) return null;
        let r2 = "children" === e2 ? t2[0] : t2[t2.length - 1];
        return r2 === u.av ? null : r2;
      }
    }, 4635: (e, t, r) => {
      "use strict";
      function n() {
        throw Error('ImageResponse moved from "next/server" to "next/og" since Next.js 14, please import from "next/og" instead');
      }
      r.r(t), r.d(t, { ImageResponse: () => n, NextRequest: () => a.I, NextResponse: () => i.x, URLPattern: () => u, userAgent: () => d, userAgentFromString: () => l });
      var a = r(1669), i = r(8241), o = r(340), s = r.n(o);
      function l(e2) {
        return { ...s()(e2), isBot: void 0 !== e2 && /Googlebot|Mediapartners-Google|AdsBot-Google|googleweblight|Storebot-Google|Google-PageRenderer|Google-InspectionTool|Bingbot|BingPreview|Slurp|DuckDuckBot|baiduspider|yandex|sogou|LinkedInBot|bitlybot|tumblr|vkShare|quora link preview|facebookexternalhit|facebookcatalog|Twitterbot|applebot|redditbot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|ia_archiver/i.test(e2) };
      }
      function d({ headers: e2 }) {
        return l(e2.get("user-agent") || void 0);
      }
      let u = "undefined" == typeof URLPattern ? void 0 : URLPattern;
    }, 2912: (e, t, r) => {
      "use strict";
      r.r(t), r.d(t, { bailoutToClientRendering: () => i });
      class n extends Error {
        constructor(e2) {
          super("Bail out to client-side rendering: " + e2), this.reason = e2, this.digest = "BAILOUT_TO_CLIENT_SIDE_RENDERING";
        }
      }
      var a = r(9452);
      function i(e2) {
        let t2 = a.A.getStore();
        if ((null == t2 || !t2.forceStatic) && (null == t2 ? void 0 : t2.isStaticGeneration)) throw new n(e2);
      }
    }, 1053: (e, t, r) => {
      "use strict";
      r.d(t, { O: () => n });
      let n = (0, r(5228).P)();
    }, 9452: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => n });
      let n = (0, r(5228).P)();
    }, 300: (e, t, r) => {
      "use strict";
      r.d(t, { Qq: () => o, dN: () => n, u7: () => a, y3: () => i });
      let n = "nxtP", a = "nxtI", i = "x-prerender-revalidate", o = "x-prerender-revalidate-if-generated", s = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", api: "api", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", appMetadataRoute: "app-metadata-route", appRouteHandler: "app-route-handler" };
      ({ ...s, GROUP: { serverOnly: [s.reactServerComponents, s.actionBrowser, s.appMetadataRoute, s.appRouteHandler, s.instrument], clientOnly: [s.serverSideRendering, s.appPagesBrowser], nonClientServerTarget: [s.middleware, s.api], app: [s.reactServerComponents, s.actionBrowser, s.appMetadataRoute, s.appRouteHandler, s.serverSideRendering, s.appPagesBrowser, s.shared, s.instrument] } });
    }, 6416: (e, t, r) => {
      "use strict";
      r.d(t, { Y5: () => i, cR: () => a, qJ: () => n });
      class n extends Error {
        constructor({ page: e2 }) {
          super(`The middleware "${e2}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class a extends Error {
        constructor() {
          super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
        }
      }
      class i extends Error {
        constructor() {
          super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
        }
      }
    }, 4655: (e, t, r) => {
      "use strict";
      r.d(t, { c: () => f });
      var n = r(2906), a = r(366), i = r(8834);
      function o(e2, t2) {
        if (!e2.startsWith("/") || !t2) return e2;
        let { pathname: r2, query: n2, hash: a2 } = (0, i.c)(e2);
        return "" + r2 + t2 + n2 + a2;
      }
      var s = r(778);
      function l(e2, t2) {
        let r2;
        let n2 = e2.split("/");
        return (t2 || []).some((t3) => !!n2[1] && n2[1].toLowerCase() === t3.toLowerCase() && (r2 = t3, n2.splice(1, 1), e2 = n2.join("/") || "/", true)), { pathname: e2, detectedLocale: r2 };
      }
      let d = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
      function u(e2, t2) {
        return new URL(String(e2).replace(d, "localhost"), t2 && String(t2).replace(d, "localhost"));
      }
      let c = Symbol("NextURLInternal");
      class f {
        constructor(e2, t2, r2) {
          let n2, a2;
          "object" == typeof t2 && "pathname" in t2 || "string" == typeof t2 ? (n2 = t2, a2 = r2 || {}) : a2 = r2 || t2 || {}, this[c] = { url: u(e2, n2 ?? a2.base), options: a2, basePath: "" }, this.analyze();
        }
        analyze() {
          var e2, t2, r2, n2, a2;
          let i2 = function(e3, t3) {
            var r3, n3;
            let { basePath: a3, i18n: i3, trailingSlash: o3 } = null != (r3 = t3.nextConfig) ? r3 : {}, d3 = { pathname: e3, trailingSlash: "/" !== e3 ? e3.endsWith("/") : o3 };
            a3 && (0, s.Y)(d3.pathname, a3) && (d3.pathname = function(e4, t4) {
              if (!(0, s.Y)(e4, t4)) return e4;
              let r4 = e4.slice(t4.length);
              return r4.startsWith("/") ? r4 : "/" + r4;
            }(d3.pathname, a3), d3.basePath = a3);
            let u2 = d3.pathname;
            if (d3.pathname.startsWith("/_next/data/") && d3.pathname.endsWith(".json")) {
              let e4 = d3.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/"), r4 = e4[0];
              d3.buildId = r4, u2 = "index" !== e4[1] ? "/" + e4.slice(1).join("/") : "/", true === t3.parseData && (d3.pathname = u2);
            }
            if (i3) {
              let e4 = t3.i18nProvider ? t3.i18nProvider.analyze(d3.pathname) : l(d3.pathname, i3.locales);
              d3.locale = e4.detectedLocale, d3.pathname = null != (n3 = e4.pathname) ? n3 : d3.pathname, !e4.detectedLocale && d3.buildId && (e4 = t3.i18nProvider ? t3.i18nProvider.analyze(u2) : l(u2, i3.locales)).detectedLocale && (d3.locale = e4.detectedLocale);
            }
            return d3;
          }(this[c].url.pathname, { nextConfig: this[c].options.nextConfig, parseData: true, i18nProvider: this[c].options.i18nProvider }), o2 = function(e3, t3) {
            let r3;
            if ((null == t3 ? void 0 : t3.host) && !Array.isArray(t3.host)) r3 = t3.host.toString().split(":", 1)[0];
            else {
              if (!e3.hostname) return;
              r3 = e3.hostname;
            }
            return r3.toLowerCase();
          }(this[c].url, this[c].options.headers);
          this[c].domainLocale = this[c].options.i18nProvider ? this[c].options.i18nProvider.detectDomainLocale(o2) : function(e3, t3, r3) {
            if (e3) for (let i3 of (r3 && (r3 = r3.toLowerCase()), e3)) {
              var n3, a3;
              if (t3 === (null == (n3 = i3.domain) ? void 0 : n3.split(":", 1)[0].toLowerCase()) || r3 === i3.defaultLocale.toLowerCase() || (null == (a3 = i3.locales) ? void 0 : a3.some((e4) => e4.toLowerCase() === r3))) return i3;
            }
          }(null == (t2 = this[c].options.nextConfig) ? void 0 : null == (e2 = t2.i18n) ? void 0 : e2.domains, o2);
          let d2 = (null == (r2 = this[c].domainLocale) ? void 0 : r2.defaultLocale) || (null == (a2 = this[c].options.nextConfig) ? void 0 : null == (n2 = a2.i18n) ? void 0 : n2.defaultLocale);
          this[c].url.pathname = i2.pathname, this[c].defaultLocale = d2, this[c].basePath = i2.basePath ?? "", this[c].buildId = i2.buildId, this[c].locale = i2.locale ?? d2, this[c].trailingSlash = i2.trailingSlash;
        }
        formatPathname() {
          var e2;
          let t2;
          return t2 = function(e3, t3, r2, n2) {
            if (!t3 || t3 === r2) return e3;
            let i2 = e3.toLowerCase();
            return !n2 && ((0, s.Y)(i2, "/api") || (0, s.Y)(i2, "/" + t3.toLowerCase())) ? e3 : (0, a.V)(e3, "/" + t3);
          }((e2 = { basePath: this[c].basePath, buildId: this[c].buildId, defaultLocale: this[c].options.forceLocale ? void 0 : this[c].defaultLocale, locale: this[c].locale, pathname: this[c].url.pathname, trailingSlash: this[c].trailingSlash }).pathname, e2.locale, e2.buildId ? void 0 : e2.defaultLocale, e2.ignorePrefix), (e2.buildId || !e2.trailingSlash) && (t2 = (0, n.Q)(t2)), e2.buildId && (t2 = o((0, a.V)(t2, "/_next/data/" + e2.buildId), "/" === e2.pathname ? "index.json" : ".json")), t2 = (0, a.V)(t2, e2.basePath), !e2.buildId && e2.trailingSlash ? t2.endsWith("/") ? t2 : o(t2, "/") : (0, n.Q)(t2);
        }
        formatSearch() {
          return this[c].url.search;
        }
        get buildId() {
          return this[c].buildId;
        }
        set buildId(e2) {
          this[c].buildId = e2;
        }
        get locale() {
          return this[c].locale ?? "";
        }
        set locale(e2) {
          var t2, r2;
          if (!this[c].locale || !(null == (r2 = this[c].options.nextConfig) ? void 0 : null == (t2 = r2.i18n) ? void 0 : t2.locales.includes(e2))) throw TypeError(`The NextURL configuration includes no locale "${e2}"`);
          this[c].locale = e2;
        }
        get defaultLocale() {
          return this[c].defaultLocale;
        }
        get domainLocale() {
          return this[c].domainLocale;
        }
        get searchParams() {
          return this[c].url.searchParams;
        }
        get host() {
          return this[c].url.host;
        }
        set host(e2) {
          this[c].url.host = e2;
        }
        get hostname() {
          return this[c].url.hostname;
        }
        set hostname(e2) {
          this[c].url.hostname = e2;
        }
        get port() {
          return this[c].url.port;
        }
        set port(e2) {
          this[c].url.port = e2;
        }
        get protocol() {
          return this[c].url.protocol;
        }
        set protocol(e2) {
          this[c].url.protocol = e2;
        }
        get href() {
          let e2 = this.formatPathname(), t2 = this.formatSearch();
          return `${this.protocol}//${this.host}${e2}${t2}${this.hash}`;
        }
        set href(e2) {
          this[c].url = u(e2), this.analyze();
        }
        get origin() {
          return this[c].url.origin;
        }
        get pathname() {
          return this[c].url.pathname;
        }
        set pathname(e2) {
          this[c].url.pathname = e2;
        }
        get hash() {
          return this[c].url.hash;
        }
        set hash(e2) {
          this[c].url.hash = e2;
        }
        get search() {
          return this[c].url.search;
        }
        set search(e2) {
          this[c].url.search = e2;
        }
        get password() {
          return this[c].url.password;
        }
        set password(e2) {
          this[c].url.password = e2;
        }
        get username() {
          return this[c].url.username;
        }
        set username(e2) {
          this[c].url.username = e2;
        }
        get basePath() {
          return this[c].basePath;
        }
        set basePath(e2) {
          this[c].basePath = e2.startsWith("/") ? e2 : `/${e2}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new f(String(this), this[c].options);
        }
      }
    }, 7217: (e, t, r) => {
      "use strict";
      r.d(t, { g: () => n });
      class n {
        static get(e2, t2, r2) {
          let n2 = Reflect.get(e2, t2, r2);
          return "function" == typeof n2 ? n2.bind(e2) : n2;
        }
        static set(e2, t2, r2, n2) {
          return Reflect.set(e2, t2, r2, n2);
        }
        static has(e2, t2) {
          return Reflect.has(e2, t2);
        }
        static deleteProperty(e2, t2) {
          return Reflect.deleteProperty(e2, t2);
        }
      }
    }, 938: (e, t, r) => {
      "use strict";
      r.d(t, { Q7: () => n.stringifyCookie, nV: () => n.ResponseCookies, qC: () => n.RequestCookies });
      var n = r(5945);
    }, 1669: (e, t, r) => {
      "use strict";
      r.d(t, { I: () => l });
      var n = r(4655), a = r(6329), i = r(6416), o = r(938);
      let s = Symbol("internal request");
      class l extends Request {
        constructor(e2, t2 = {}) {
          let r2 = "string" != typeof e2 && "url" in e2 ? e2.url : String(e2);
          (0, a.r4)(r2), e2 instanceof Request ? super(e2, t2) : super(r2, t2);
          let i2 = new n.c(r2, { headers: (0, a.lb)(this.headers), nextConfig: t2.nextConfig });
          this[s] = { cookies: new o.qC(this.headers), geo: t2.geo || {}, ip: t2.ip, nextUrl: i2, url: i2.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, geo: this.geo, ip: this.ip, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[s].cookies;
        }
        get geo() {
          return this[s].geo;
        }
        get ip() {
          return this[s].ip;
        }
        get nextUrl() {
          return this[s].nextUrl;
        }
        get page() {
          throw new i.cR();
        }
        get ua() {
          throw new i.Y5();
        }
        get url() {
          return this[s].url;
        }
      }
    }, 8241: (e, t, r) => {
      "use strict";
      r.d(t, { x: () => u });
      var n = r(938), a = r(4655), i = r(6329), o = r(7217);
      let s = Symbol("internal response"), l = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function d(e2, t2) {
        var r2;
        if (null == e2 ? void 0 : null == (r2 = e2.request) ? void 0 : r2.headers) {
          if (!(e2.request.headers instanceof Headers)) throw Error("request.headers must be an instance of Headers");
          let r3 = [];
          for (let [n2, a2] of e2.request.headers) t2.set("x-middleware-request-" + n2, a2), r3.push(n2);
          t2.set("x-middleware-override-headers", r3.join(","));
        }
      }
      class u extends Response {
        constructor(e2, t2 = {}) {
          super(e2, t2);
          let r2 = this.headers, l2 = new Proxy(new n.nV(r2), { get(e3, a2, i2) {
            switch (a2) {
              case "delete":
              case "set":
                return (...i3) => {
                  let o2 = Reflect.apply(e3[a2], e3, i3), s2 = new Headers(r2);
                  return o2 instanceof n.nV && r2.set("x-middleware-set-cookie", o2.getAll().map((e4) => (0, n.Q7)(e4)).join(",")), d(t2, s2), o2;
                };
              default:
                return o.g.get(e3, a2, i2);
            }
          } });
          this[s] = { cookies: l2, url: t2.url ? new a.c(t2.url, { headers: (0, i.lb)(r2), nextConfig: t2.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[s].cookies;
        }
        static json(e2, t2) {
          let r2 = Response.json(e2, t2);
          return new u(r2.body, r2);
        }
        static redirect(e2, t2) {
          let r2 = "number" == typeof t2 ? t2 : (null == t2 ? void 0 : t2.status) ?? 307;
          if (!l.has(r2)) throw RangeError('Failed to execute "redirect" on "response": Invalid status code');
          let n2 = "object" == typeof t2 ? t2 : {}, a2 = new Headers(null == n2 ? void 0 : n2.headers);
          return a2.set("Location", (0, i.r4)(e2)), new u(null, { ...n2, headers: a2, status: r2 });
        }
        static rewrite(e2, t2) {
          let r2 = new Headers(null == t2 ? void 0 : t2.headers);
          return r2.set("x-middleware-rewrite", (0, i.r4)(e2)), d(t2, r2), new u(null, { ...t2, headers: r2 });
        }
        static next(e2) {
          let t2 = new Headers(null == e2 ? void 0 : e2.headers);
          return t2.set("x-middleware-next", "1"), d(e2, t2), new u(null, { ...e2, headers: t2 });
        }
      }
    }, 6329: (e, t, r) => {
      "use strict";
      r.d(t, { EK: () => a, LI: () => l, l$: () => i, lb: () => o, r4: () => s });
      var n = r(300);
      function a(e2) {
        let t2 = new Headers();
        for (let [r2, n2] of Object.entries(e2)) for (let e3 of Array.isArray(n2) ? n2 : [n2]) void 0 !== e3 && ("number" == typeof e3 && (e3 = e3.toString()), t2.append(r2, e3));
        return t2;
      }
      function i(e2) {
        var t2, r2, n2, a2, i2, o2 = [], s2 = 0;
        function l2() {
          for (; s2 < e2.length && /\s/.test(e2.charAt(s2)); ) s2 += 1;
          return s2 < e2.length;
        }
        for (; s2 < e2.length; ) {
          for (t2 = s2, i2 = false; l2(); ) if ("," === (r2 = e2.charAt(s2))) {
            for (n2 = s2, s2 += 1, l2(), a2 = s2; s2 < e2.length && "=" !== (r2 = e2.charAt(s2)) && ";" !== r2 && "," !== r2; ) s2 += 1;
            s2 < e2.length && "=" === e2.charAt(s2) ? (i2 = true, s2 = a2, o2.push(e2.substring(t2, n2)), t2 = s2) : s2 = n2 + 1;
          } else s2 += 1;
          (!i2 || s2 >= e2.length) && o2.push(e2.substring(t2, e2.length));
        }
        return o2;
      }
      function o(e2) {
        let t2 = {}, r2 = [];
        if (e2) for (let [n2, a2] of e2.entries()) "set-cookie" === n2.toLowerCase() ? (r2.push(...i(a2)), t2[n2] = 1 === r2.length ? r2[0] : r2) : t2[n2] = a2;
        return t2;
      }
      function s(e2) {
        try {
          return String(new URL(String(e2)));
        } catch (t2) {
          throw Error(`URL is malformed "${String(e2)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t2 });
        }
      }
      function l(e2, t2) {
        for (let r2 of [n.dN, n.u7]) e2 !== r2 && e2.startsWith(r2) && t2(e2.substring(r2.length));
      }
    }, 8754: (e, t, r) => {
      "use strict";
      r.d(t, { ZM: () => i, pk: () => a });
      var n = r(5023);
      let a = n.createContext(null), i = n.createContext(null);
    }, 366: (e, t, r) => {
      "use strict";
      r.d(t, { V: () => a });
      var n = r(8834);
      function a(e2, t2) {
        if (!e2.startsWith("/") || !t2) return e2;
        let { pathname: r2, query: a2, hash: i } = (0, n.c)(e2);
        return "" + t2 + r2 + a2 + i;
      }
    }, 4035: (e, t, r) => {
      "use strict";
      r.d(t, { w: () => a, b: () => i });
      var n = r(4552);
      function a(e2) {
        var t2;
        return (t2 = e2.split("/").reduce((e3, t3, r2, a2) => !t3 || (0, n.lv)(t3) || "@" === t3[0] || ("page" === t3 || "route" === t3) && r2 === a2.length - 1 ? e3 : e3 + "/" + t3, "")).startsWith("/") ? t2 : "/" + t2;
      }
      function i(e2) {
        return e2.replace(/\.rsc($|\?)/, "$1");
      }
    }, 8834: (e, t, r) => {
      "use strict";
      function n(e2) {
        let t2 = e2.indexOf("#"), r2 = e2.indexOf("?"), n2 = r2 > -1 && (t2 < 0 || r2 < t2);
        return n2 || t2 > -1 ? { pathname: e2.substring(0, n2 ? r2 : t2), query: n2 ? e2.substring(r2, t2 > -1 ? t2 : void 0) : "", hash: t2 > -1 ? e2.slice(t2) : "" } : { pathname: e2, query: "", hash: "" };
      }
      r.d(t, { c: () => n });
    }, 778: (e, t, r) => {
      "use strict";
      r.d(t, { Y: () => a });
      var n = r(8834);
      function a(e2, t2) {
        if ("string" != typeof e2) return false;
        let { pathname: r2 } = (0, n.c)(e2);
        return r2 === t2 || r2.startsWith(t2 + "/");
      }
    }, 2906: (e, t, r) => {
      "use strict";
      function n(e2) {
        return e2.replace(/\/$/, "") || "/";
      }
      r.d(t, { Q: () => n });
    }, 4552: (e, t, r) => {
      "use strict";
      function n(e2) {
        return "(" === e2[0] && e2.endsWith(")");
      }
      r.d(t, { GC: () => a, av: () => i, lv: () => n });
      let a = "__PAGE__", i = "__DEFAULT__";
    }, 8488: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { getTestReqInfo: function() {
        return o;
      }, withRequest: function() {
        return i;
      } });
      let n = new (r(2067)).AsyncLocalStorage();
      function a(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (r2) return { url: t2.url(e2), proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function i(e2, t2, r2) {
        let i2 = a(e2, t2);
        return i2 ? n.run(i2, r2) : r2();
      }
      function o(e2, t2) {
        return n.getStore() || (e2 && t2 ? a(e2, t2) : void 0);
      }
    }, 375: (e, t, r) => {
      "use strict";
      var n = r(6195).Buffer;
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { handleFetch: function() {
        return s;
      }, interceptFetch: function() {
        return l;
      }, reader: function() {
        return i;
      } });
      let a = r(8488), i = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function o(e2, t2) {
        let { url: r2, method: a2, headers: i2, body: o2, cache: s2, credentials: l2, integrity: d, mode: u, redirect: c, referrer: f, referrerPolicy: p } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: a2, headers: [...Array.from(i2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: o2 ? n.from(await t2.arrayBuffer()).toString("base64") : null, cache: s2, credentials: l2, integrity: d, mode: u, redirect: c, referrer: f, referrerPolicy: p } };
      }
      async function s(e2, t2) {
        let r2 = (0, a.getTestReqInfo)(t2, i);
        if (!r2) return e2(t2);
        let { testData: s2, proxyPort: l2 } = r2, d = await o(s2, t2), u = await e2(`http://localhost:${l2}`, { method: "POST", body: JSON.stringify(d), next: { internal: true } });
        if (!u.ok) throw Error(`Proxy request failed: ${u.status}`);
        let c = await u.json(), { api: f } = c;
        switch (f) {
          case "continue":
            return e2(t2);
          case "abort":
          case "unhandled":
            throw Error(`Proxy request aborted [${t2.method} ${t2.url}]`);
        }
        return function(e3) {
          let { status: t3, headers: r3, body: a2 } = e3.response;
          return new Response(a2 ? n.from(a2, "base64") : null, { status: t3, headers: new Headers(r3) });
        }(c);
      }
      function l(e2) {
        return r.g.fetch = function(t2, r2) {
          var n2;
          return (null == r2 ? void 0 : null == (n2 = r2.next) ? void 0 : n2.internal) ? e2(t2, r2) : s(e2, new Request(t2, r2));
        }, () => {
          r.g.fetch = e2;
        };
      }
    }, 4177: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { interceptTestApis: function() {
        return i;
      }, wrapRequestHandler: function() {
        return o;
      } });
      let n = r(8488), a = r(375);
      function i() {
        return (0, a.interceptFetch)(r.g.fetch);
      }
      function o(e2) {
        return (t2, r2) => (0, n.withRequest)(t2, a.reader, () => e2(t2, r2));
      }
    }, 9355: (e, t, r) => {
      "use strict";
      var n = r(5023), a = Symbol.for("react.element"), i = (Symbol.for("react.fragment"), Object.prototype.hasOwnProperty), o = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, s = { key: true, ref: true, __self: true, __source: true };
      t.jsx = function(e2, t2, r2) {
        var n2, l = {}, d = null, u = null;
        for (n2 in void 0 !== r2 && (d = "" + r2), void 0 !== t2.key && (d = "" + t2.key), void 0 !== t2.ref && (u = t2.ref), t2) i.call(t2, n2) && !s.hasOwnProperty(n2) && (l[n2] = t2[n2]);
        if (e2 && e2.defaultProps) for (n2 in t2 = e2.defaultProps) void 0 === l[n2] && (l[n2] = t2[n2]);
        return { $$typeof: a, type: e2, key: d, ref: u, props: l, _owner: o.current };
      };
    }, 4835: (e, t) => {
      "use strict";
      var r = Symbol.for("react.element"), n = Symbol.for("react.portal"), a = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), s = Symbol.for("react.provider"), l = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), c = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), p = Symbol.iterator, _ = { isMounted: function() {
        return false;
      }, enqueueForceUpdate: function() {
      }, enqueueReplaceState: function() {
      }, enqueueSetState: function() {
      } }, h = Object.assign, g = {};
      function m(e2, t2, r2) {
        this.props = e2, this.context = t2, this.refs = g, this.updater = r2 || _;
      }
      function y() {
      }
      function w(e2, t2, r2) {
        this.props = e2, this.context = t2, this.refs = g, this.updater = r2 || _;
      }
      m.prototype.isReactComponent = {}, m.prototype.setState = function(e2, t2) {
        if ("object" != typeof e2 && "function" != typeof e2 && null != e2) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, e2, t2, "setState");
      }, m.prototype.forceUpdate = function(e2) {
        this.updater.enqueueForceUpdate(this, e2, "forceUpdate");
      }, y.prototype = m.prototype;
      var v = w.prototype = new y();
      v.constructor = w, h(v, m.prototype), v.isPureReactComponent = true;
      var b = Array.isArray, x = Object.prototype.hasOwnProperty, S = { current: null }, P = { key: true, ref: true, __self: true, __source: true };
      function C(e2, t2, n2) {
        var a2, i2 = {}, o2 = null, s2 = null;
        if (null != t2) for (a2 in void 0 !== t2.ref && (s2 = t2.ref), void 0 !== t2.key && (o2 = "" + t2.key), t2) x.call(t2, a2) && !P.hasOwnProperty(a2) && (i2[a2] = t2[a2]);
        var l2 = arguments.length - 2;
        if (1 === l2) i2.children = n2;
        else if (1 < l2) {
          for (var d2 = Array(l2), u2 = 0; u2 < l2; u2++) d2[u2] = arguments[u2 + 2];
          i2.children = d2;
        }
        if (e2 && e2.defaultProps) for (a2 in l2 = e2.defaultProps) void 0 === i2[a2] && (i2[a2] = l2[a2]);
        return { $$typeof: r, type: e2, key: o2, ref: s2, props: i2, _owner: S.current };
      }
      function R(e2) {
        return "object" == typeof e2 && null !== e2 && e2.$$typeof === r;
      }
      var L = /\/+/g;
      function E(e2, t2) {
        var r2, n2;
        return "object" == typeof e2 && null !== e2 && null != e2.key ? (r2 = "" + e2.key, n2 = { "=": "=0", ":": "=2" }, "$" + r2.replace(/[=:]/g, function(e3) {
          return n2[e3];
        })) : t2.toString(36);
      }
      function O(e2, t2, a2) {
        if (null == e2) return e2;
        var i2 = [], o2 = 0;
        return !function e3(t3, a3, i3, o3, s2) {
          var l2, d2, u2, c2 = typeof t3;
          ("undefined" === c2 || "boolean" === c2) && (t3 = null);
          var f2 = false;
          if (null === t3) f2 = true;
          else switch (c2) {
            case "string":
            case "number":
              f2 = true;
              break;
            case "object":
              switch (t3.$$typeof) {
                case r:
                case n:
                  f2 = true;
              }
          }
          if (f2) return s2 = s2(f2 = t3), t3 = "" === o3 ? "." + E(f2, 0) : o3, b(s2) ? (i3 = "", null != t3 && (i3 = t3.replace(L, "$&/") + "/"), e3(s2, a3, i3, "", function(e4) {
            return e4;
          })) : null != s2 && (R(s2) && (l2 = s2, d2 = i3 + (!s2.key || f2 && f2.key === s2.key ? "" : ("" + s2.key).replace(L, "$&/") + "/") + t3, s2 = { $$typeof: r, type: l2.type, key: d2, ref: l2.ref, props: l2.props, _owner: l2._owner }), a3.push(s2)), 1;
          if (f2 = 0, o3 = "" === o3 ? "." : o3 + ":", b(t3)) for (var _2 = 0; _2 < t3.length; _2++) {
            var h2 = o3 + E(c2 = t3[_2], _2);
            f2 += e3(c2, a3, i3, h2, s2);
          }
          else if ("function" == typeof (h2 = null === (u2 = t3) || "object" != typeof u2 ? null : "function" == typeof (u2 = p && u2[p] || u2["@@iterator"]) ? u2 : null)) for (t3 = h2.call(t3), _2 = 0; !(c2 = t3.next()).done; ) h2 = o3 + E(c2 = c2.value, _2++), f2 += e3(c2, a3, i3, h2, s2);
          else if ("object" === c2) throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === (a3 = String(t3)) ? "object with keys {" + Object.keys(t3).join(", ") + "}" : a3) + "). If you meant to render a collection of children, use an array instead.");
          return f2;
        }(e2, i2, "", "", function(e3) {
          return t2.call(a2, e3, o2++);
        }), i2;
      }
      function T(e2) {
        if (-1 === e2._status) {
          var t2 = e2._result;
          (t2 = t2()).then(function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 1, e2._result = t3);
          }, function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 2, e2._result = t3);
          }), -1 === e2._status && (e2._status = 0, e2._result = t2);
        }
        if (1 === e2._status) return e2._result.default;
        throw e2._result;
      }
      var M = { current: null }, N = { transition: null };
      function A() {
        throw Error("act(...) is not supported in production builds of React.");
      }
      t.Children = { map: O, forEach: function(e2, t2, r2) {
        O(e2, function() {
          t2.apply(this, arguments);
        }, r2);
      }, count: function(e2) {
        var t2 = 0;
        return O(e2, function() {
          t2++;
        }), t2;
      }, toArray: function(e2) {
        return O(e2, function(e3) {
          return e3;
        }) || [];
      }, only: function(e2) {
        if (!R(e2)) throw Error("React.Children.only expected to receive a single React element child.");
        return e2;
      } }, t.Component = m, t.Fragment = a, t.Profiler = o, t.PureComponent = w, t.StrictMode = i, t.Suspense = u, t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = { ReactCurrentDispatcher: M, ReactCurrentBatchConfig: N, ReactCurrentOwner: S }, t.act = A, t.cloneElement = function(e2, t2, n2) {
        if (null == e2) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e2 + ".");
        var a2 = h({}, e2.props), i2 = e2.key, o2 = e2.ref, s2 = e2._owner;
        if (null != t2) {
          if (void 0 !== t2.ref && (o2 = t2.ref, s2 = S.current), void 0 !== t2.key && (i2 = "" + t2.key), e2.type && e2.type.defaultProps) var l2 = e2.type.defaultProps;
          for (d2 in t2) x.call(t2, d2) && !P.hasOwnProperty(d2) && (a2[d2] = void 0 === t2[d2] && void 0 !== l2 ? l2[d2] : t2[d2]);
        }
        var d2 = arguments.length - 2;
        if (1 === d2) a2.children = n2;
        else if (1 < d2) {
          l2 = Array(d2);
          for (var u2 = 0; u2 < d2; u2++) l2[u2] = arguments[u2 + 2];
          a2.children = l2;
        }
        return { $$typeof: r, type: e2.type, key: i2, ref: o2, props: a2, _owner: s2 };
      }, t.createContext = function(e2) {
        return (e2 = { $$typeof: l, _currentValue: e2, _currentValue2: e2, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }).Provider = { $$typeof: s, _context: e2 }, e2.Consumer = e2;
      }, t.createElement = C, t.createFactory = function(e2) {
        var t2 = C.bind(null, e2);
        return t2.type = e2, t2;
      }, t.createRef = function() {
        return { current: null };
      }, t.forwardRef = function(e2) {
        return { $$typeof: d, render: e2 };
      }, t.isValidElement = R, t.lazy = function(e2) {
        return { $$typeof: f, _payload: { _status: -1, _result: e2 }, _init: T };
      }, t.memo = function(e2, t2) {
        return { $$typeof: c, type: e2, compare: void 0 === t2 ? null : t2 };
      }, t.startTransition = function(e2) {
        var t2 = N.transition;
        N.transition = {};
        try {
          e2();
        } finally {
          N.transition = t2;
        }
      }, t.unstable_act = A, t.useCallback = function(e2, t2) {
        return M.current.useCallback(e2, t2);
      }, t.useContext = function(e2) {
        return M.current.useContext(e2);
      }, t.useDebugValue = function() {
      }, t.useDeferredValue = function(e2) {
        return M.current.useDeferredValue(e2);
      }, t.useEffect = function(e2, t2) {
        return M.current.useEffect(e2, t2);
      }, t.useId = function() {
        return M.current.useId();
      }, t.useImperativeHandle = function(e2, t2, r2) {
        return M.current.useImperativeHandle(e2, t2, r2);
      }, t.useInsertionEffect = function(e2, t2) {
        return M.current.useInsertionEffect(e2, t2);
      }, t.useLayoutEffect = function(e2, t2) {
        return M.current.useLayoutEffect(e2, t2);
      }, t.useMemo = function(e2, t2) {
        return M.current.useMemo(e2, t2);
      }, t.useReducer = function(e2, t2, r2) {
        return M.current.useReducer(e2, t2, r2);
      }, t.useRef = function(e2) {
        return M.current.useRef(e2);
      }, t.useState = function(e2) {
        return M.current.useState(e2);
      }, t.useSyncExternalStore = function(e2, t2, r2) {
        return M.current.useSyncExternalStore(e2, t2, r2);
      }, t.useTransition = function() {
        return M.current.useTransition();
      }, t.version = "18.3.1";
    }, 5023: (e, t, r) => {
      "use strict";
      e.exports = r(4835);
    }, 3: (e, t, r) => {
      "use strict";
      e.exports = r(9355);
    }, 4202: (e, t, r) => {
      "use strict";
      e.exports = r(7647);
    }, 6592: (e, t, r) => {
      "use strict";
      let n = r(5023).createContext(void 0);
      t.IntlContext = n;
    }, 2824: (e, t, r) => {
      "use strict";
      var n = r(5023), a = r(6592);
      function i() {
        let e2 = n.useContext(a.IntlContext);
        if (!e2) throw Error(void 0);
        return e2;
      }
      t.useIntlContext = i, t.useLocale = function() {
        return i().locale;
      };
    }, 7647: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = r(2824);
      r(5023), r(6592), t.useLocale = n.useLocale;
    }, 5228: (e, t, r) => {
      "use strict";
      r.d(t, { P: () => o });
      let n = Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");
      class a {
        disable() {
          throw n;
        }
        getStore() {
        }
        run() {
          throw n;
        }
        exit() {
          throw n;
        }
        enterWith() {
          throw n;
        }
      }
      let i = globalThis.AsyncLocalStorage;
      function o() {
        return i ? new i() : new a();
      }
    } }, (e) => {
      var t = e(e.s = 7525);
      (_ENTRIES = "undefined" == typeof _ENTRIES ? {} : _ENTRIES)["middleware_src/middleware"] = t;
    }]);
  }
});

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path3)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "src/middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/api(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(.json)?[\\/#\\?]?$", "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next|static|ads).*))(.json)?[\\/#\\?]?$"] }];
    require_edge_runtime_webpack();
    require_middleware();
  }
});

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil }, fn) {
  return globalThis.__openNextAls.run({
    requestId: Math.random().toString(36),
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const override = config[handler3.type]?.override;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto from "node:crypto";
import { Readable as Readable2 } from "node:stream";

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "eslint": { "ignoreDuringBuilds": false }, "typescript": { "ignoreBuildErrors": false, "tsconfigPath": "tsconfig.json" }, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.mjs", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "analyticsId": "", "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [16, 32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 60, "formats": ["image/webp"], "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "inline", "localPatterns": [{ "pathname": "/static/images/**", "search": "" }, { "pathname": "/_next/static/media/**", "search": "" }], "remotePatterns": [{ "protocol": "https", "hostname": "*" }], "unoptimized": true }, "devIndicators": { "buildActivity": true, "buildActivityPosition": "bottom-right" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "amp": { "canonicalBase": "" }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "optimizeFonts": true, "excludeDefaultMomentLocales": true, "serverRuntimeConfig": {}, "publicRuntimeConfig": {}, "reactProductionProfiling": false, "reactStrictMode": null, "httpAgentOptions": { "keepAlive": true }, "outputFileTracing": true, "staticPageGenerationTimeout": 60, "swcMinify": true, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "experimental": { "multiZoneDraftMode": false, "prerenderEarlyExit": false, "serverMinification": true, "serverSourceMaps": false, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "middlewarePrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 15, "memoryBasedWorkersCount": false, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "outputFileTracingRoot": "E:\\jia\\slopegames", "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "adjustFontFallbacks": false, "adjustFontFallbacksWithSizeAdjust": false, "typedRoutes": false, "instrumentationHook": false, "bundlePagesExternals": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "missingSuspenseWithCSRBailout": true, "optimizeServerReact": true, "useEarlyImport": false, "staleTimes": { "dynamic": 30, "static": 300 }, "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "configFileName": "next.config.mjs", "logging": { "fetches": { "fullUrl": true } } };
var BuildId = "bwr6weEd76zhzX3iRgKyy";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }], "dynamic": [{ "page": "/[locale]", "regex": "^/([^/]+?)(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)(?:/)?$" }, { "page": "/[locale]/category/[slug]", "regex": "^/([^/]+?)/category/([^/]+?)(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale", "nxtPslug": "nxtPslug" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/category/(?<nxtPslug>[^/]+?)(?:/)?$" }, { "page": "/[locale]/detail/[slug]", "regex": "^/([^/]+?)/detail/([^/]+?)(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale", "nxtPslug": "nxtPslug" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/detail/(?<nxtPslug>[^/]+?)(?:/)?$" }, { "page": "/[locale]/play/[id]", "regex": "^/([^/]+?)/play/([^/]+?)(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale", "nxtPid": "nxtPid" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/play/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/[locale]/[...rest]", "regex": "^/([^/]+?)/(.+?)(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale", "nxtPrest": "nxtPrest" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/(?<nxtPrest>.+?)(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": {}, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "eba147342a2cb849d329b82ddace9123", "previewModeSigningKey": "9c599fb900c2329d779807cbf736e731aff55552ce90424538569acf6debeaa1", "previewModeEncryptionKey": "4ed36eeff1b865cc9b8b9763fb05a79f3e74d00359bc18adcba564ff58768a58" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge-runtime-webpack.js", "server/src/middleware.js"], "name": "src/middleware", "page": "/", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/api(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(.json)?[\\/#\\?]?$", "originalSource": "/api/:path*" }, { "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next|static|ads).*))(.json)?[\\/#\\?]?$", "originalSource": "/((?!_next|static|ads).*)" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "bwr6weEd76zhzX3iRgKyy", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "TGT4BovkCpYQUvXKKApU9bZt5wQarJAxn66/Oj+Ejmw=", "__NEXT_PREVIEW_MODE_ID": "eba147342a2cb849d329b82ddace9123", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "4ed36eeff1b865cc9b8b9763fb05a79f3e74d00359bc18adcba564ff58768a58", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "9c599fb900c2329d779807cbf736e731aff55552ce90424538569acf6debeaa1" } } }, "functions": {}, "sortedMiddleware": ["/"] };
var AppPathRoutesManifest = { "/_not-found/page": "/_not-found", "/page": "/", "/[locale]/[...rest]/page": "/[locale]/[...rest]", "/[locale]/detail/[slug]/page": "/[locale]/detail/[slug]", "/[locale]/page": "/[locale]", "/[locale]/category/[slug]/page": "/[locale]/category/[slug]", "/[locale]/play/[id]/page": "/[locale]/play/[id]" };
var FunctionsConfigManifest = { "version": 1, "functions": {} };
var PagesManifest = { "/_app": "pages/_app.js", "/_error": "pages/_error.js", "/_document": "pages/_document.js" };
process.env.NEXT_BUILD_ID = BuildId;

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: constructNextUrl(internalEvent.url, `/${detectedLocale}`)
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (host) {
    return pattern.test(url) && !url.includes(host);
  }
  return pattern.test(url);
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
  return readable;
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    return value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
async function computeCacheControl(path3, body, host, revalidate, lastModified) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest.routes).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  if (finalRevalidate !== CACHE_ONE_YEAR) {
    const sMaxAge = Math.max(finalRevalidate - age, 1);
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate
    });
    const isStale = sMaxAge === 1;
    if (isStale) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
async function generateResult(event, localizedPath, cachedValue, lastModified) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  switch (cachedValue.type) {
    case "app":
      isDataRequest = Boolean(event.headers.rsc);
      body = isDataRequest ? cachedValue.rsc : cachedValue.html;
      type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
      break;
    case "page":
      isDataRequest = Boolean(event.query.__nextDataReq);
      body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
      type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
      break;
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified);
  return {
    type: "core",
    statusCode: 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => {
    try {
      return escapePathDelimiters(decodeURIComponent(segment), true);
    } catch (e) {
      return segment;
    }
  }).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  localizedPath = decodePathParams(localizedPath);
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest.routes).includes(localizedPath ?? "/") || Object.values(PrerenderManifest.dynamicRoutes).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath ?? "/index");
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      if (cachedData.value?.type === "app") {
        const tags = getTagsFromValue(cachedData.value);
        const _hasBeenRevalidated = await hasBeenRevalidated(localizedPath, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => route.startsWith("/api/") || route === "/api" && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !event.headers["x-nextjs-data"] && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const dataPattern = `${NextConfig.basePath ?? ""}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/");
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes, routes } = prerenderManifest;
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest.preview.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite
  };
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
function applyMiddlewareHeaders(eventHeaders, middlewareHeaders, setPrefix = true) {
  const keyPrefix = setPrefix ? MIDDLEWARE_HEADER_PREFIX : "";
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      eventHeaders[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      if (key.startsWith(INTERNAL_HEADER_PREFIX) || key.startsWith(MIDDLEWARE_HEADER_PREFIX)) {
        delete event.headers[key];
      }
    }
    const nextHeaders = getNextConfigHeaders(event, ConfigHeaders);
    let internalEvent = fixDataPage(event, BuildId);
    if ("statusCode" in internalEvent) {
      return internalEvent;
    }
    const redirect = handleRedirects(internalEvent, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = new URL(redirect.headers.Location).href;
      debug("redirect", redirect);
      return redirect;
    }
    const eventOrResult = await handleMiddleware(
      internalEvent,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    const isResult = "statusCode" in eventOrResult;
    if (isResult) {
      return eventOrResult;
    }
    const middlewareResponseHeaders = eventOrResult.responseHeaders;
    let isExternalRewrite = eventOrResult.isExternalRewrite ?? false;
    internalEvent = eventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrites = handleRewrites(internalEvent, RoutesManifest.rewrites.beforeFiles);
      internalEvent = beforeRewrites.internalEvent;
      isExternalRewrite = beforeRewrites.isExternalRewrite;
    }
    const foundStaticRoute = staticRouteMatcher(internalEvent.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrites = handleRewrites(internalEvent, RoutesManifest.rewrites.afterFiles);
      internalEvent = afterRewrites.internalEvent;
      isExternalRewrite = afterRewrites.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(internalEvent, PrerenderManifest);
      internalEvent = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(internalEvent.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(internalEvent, RoutesManifest.rewrites.fallback);
      internalEvent = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = internalEvent.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(internalEvent.rawPath).length > 0 || dynamicRouteMatcher(internalEvent.rawPath).length > 0)) {
      internalEvent = {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !("statusCode" in internalEvent)) {
      debug("Cache interception enabled");
      internalEvent = await cacheInterceptor(internalEvent);
      if ("statusCode" in internalEvent) {
        applyMiddlewareHeaders(internalEvent.headers, {
          ...middlewareResponseHeaders,
          ...nextHeaders
        }, false);
        return internalEvent;
      }
    }
    applyMiddlewareHeaders(internalEvent.headers, {
      ...middlewareResponseHeaders,
      ...nextHeaders
    });
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(internalEvent, NextConfig.i18n) : void 0
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const originResolver = await resolveOriginResolver(globalThis.openNextConfig.middleware?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(globalThis.openNextConfig.middleware?.override?.proxyExternalRequest);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil
  }, async () => {
    const result = await routingHandler(internalEvent);
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
