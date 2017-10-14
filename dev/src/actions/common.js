import { request } from "./request";

export const navClicked = (state, actions, data) => {
    let id = data.currentTarget.dataset.id;
    state.nav.main.active = id;
    return state;
};

export const onScroll = (state, actions, { e, callback }) => {
    let ele = e.currentTarget;
    let height = ele.clientHeight;
    let scroll_top = ele.scrollTop;
    let scrollHeight = ele.scrollHeight;

    if (scroll_top + height >= scrollHeight) {
        if (typeof callback == "function") callback(e);
    }
    e.stopPropagation();
    e.preventDefault();
    return false;
};

export const closeModal = (state, actions, name) => {
    state.modals[name].open = false;
    return state;
};

export const resetMessage = (state, actions) => {
    return update => {
        setTimeout(() => {
            if (state.message != "") {
                state.message = "";
                update(state);
            }
        }, 3000);
    };
};

export const setVersion = (state, actions, version) => {
    state.version = version;
    return state;
};

export const deepFind = function(obj, path) {
    for (var i = 0, path = path.split("."), len = path.length; i < len; i++) {
        obj = obj[path[i]];
    }
    return obj;
};

const basePropertyOf = object => {
    return function(key) {
        return object == null ? undefined : object[key];
    };
};

export const escape = str => {
    /** Used to map characters to HTML entities. */
    const htmlEscapes = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    };

    let escapeHtmlChar = basePropertyOf(htmlEscapes);
    let reUnescapedHtml = /[&<>"']/g;
    return str.replace(reUnescapedHtml, escapeHtmlChar);
};

export const unescape = str => {
    /** Used to map HTML entities to characters. */
    const htmlUnescapes = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
    };
    let unescapeHtmlChar = basePropertyOf(htmlUnescapes);
    let reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g;
    return str.replace(reEscapedHtml, unescapeHtmlChar);
};

export const getRandomToken = () => {
    // E.g. 8 * 32 = 256 bits token
    var randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = "";
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
    return hex;
};

export const validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
