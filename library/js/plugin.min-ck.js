// jQuery File Upload
!function(e) {
    "function" == typeof define && define.amd ? define([ "jquery" ], e) : e(jQuery);
}(function(e, t) {
    var n = 0, r = Array.prototype.slice, i = e.cleanData;
    e.cleanData = function(t) {
        for (var n, r = 0; null != (n = t[r]); r++) try {
            e(n).triggerHandler("remove");
        } catch (s) {}
        i(t);
    }, e.widget = function(t, n, r) {
        var i, s, o, u, f = {}, l = t.split(".")[0];
        t = t.split(".")[1], i = l + "-" + t, r || (r = n, n = e.Widget), e.expr[":"][i.toLowerCase()] = function(t) {
            return !!e.data(t, i);
        }, e[l] = e[l] || {}, s = e[l][t], o = e[l][t] = function(e, t) {
            return this._createWidget ? (arguments.length && this._createWidget(e, t), void 0) : new o(e, t);
        }, e.extend(o, s, {
            version: r.version,
            _proto: e.extend({}, r),
            _childConstructors: []
        }), u = new n, u.options = e.widget.extend({}, u.options), e.each(r, function(t, r) {
            return e.isFunction(r) ? (f[t] = function() {
                var e = function() {
                    return n.prototype[t].apply(this, arguments);
                }, i = function(e) {
                    return n.prototype[t].apply(this, e);
                };
                return function() {
                    var t, n = this._super, s = this._superApply;
                    return this._super = e, this._superApply = i, t = r.apply(this, arguments), this._super = n, this._superApply = s, t;
                };
            }(), void 0) : (f[t] = r, void 0);
        }), o.prototype = e.widget.extend(u, {
            widgetEventPrefix: s ? u.widgetEventPrefix : t
        }, f, {
            constructor: o,
            namespace: l,
            widgetName: t,
            widgetFullName: i
        }), s ? (e.each(s._childConstructors, function(t, n) {
            var r = n.prototype;
            e.widget(r.namespace + "." + r.widgetName, o, n._proto);
        }), delete s._childConstructors) : n._childConstructors.push(o), e.widget.bridge(t, o);
    }, e.widget.extend = function(n) {
        for (var i, s, o = r.call(arguments, 1), u = 0, f = o.length; f > u; u++) for (i in o[u]) s = o[u][i], o[u].hasOwnProperty(i) && s !== t && (n[i] = e.isPlainObject(s) ? e.isPlainObject(n[i]) ? e.widget.extend({}, n[i], s) : e.widget.extend({}, s) : s);
        return n;
    }, e.widget.bridge = function(n, i) {
        var s = i.prototype.widgetFullName || n;
        e.fn[n] = function(o) {
            var u = "string" == typeof o, l = r.call(arguments, 1), h = this;
            return o = !u && l.length ? e.widget.extend.apply(null, [ o ].concat(l)) : o, u ? this.each(function() {
                var r, i = e.data(this, s);
                return i ? e.isFunction(i[o]) && "_" !== o.charAt(0) ? (r = i[o].apply(i, l), r !== i && r !== t ? (h = r && r.jquery ? h.pushStack(r.get()) : r, !1) : void 0) : e.error("no such method '" + o + "' for " + n + " widget instance") : e.error("cannot call methods on " + n + " prior to initialization; " + "attempted to call method '" + o + "'");
            }) : this.each(function() {
                var t = e.data(this, s);
                t ? t.option(o || {})._init() : e.data(this, s, new i(o, this));
            }), h;
        };
    }, e.Widget = function() {}, e.Widget._childConstructors = [], e.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(t, r) {
            r = e(r || this.defaultElement || this)[0], this.element = e(r), this.uuid = n++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this.bindings = e(), this.hoverable = e(), this.focusable = e(), r !== this && (e.data(r, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(e) {
                    e.target === r && this.destroy();
                }
            }), this.document = e(r.style ? r.ownerDocument : r.document || r), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init();
        },
        _getCreateOptions: e.noop,
        _getCreateEventData: e.noop,
        _create: e.noop,
        _init: e.noop,
        destroy: function() {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus");
        },
        _destroy: e.noop,
        widget: function() {
            return this.element;
        },
        option: function(n, r) {
            var i, s, o, u = n;
            if (0 === arguments.length) return e.widget.extend({}, this.options);
            if ("string" == typeof n) if (u = {}, i = n.split("."), n = i.shift(), i.length) {
                for (s = u[n] = e.widget.extend({}, this.options[n]), o = 0; o < i.length - 1; o++) s[i[o]] = s[i[o]] || {}, s = s[i[o]];
                if (n = i.pop(), r === t) return s[n] === t ? null : s[n];
                s[n] = r;
            } else {
                if (r === t) return this.options[n] === t ? null : this.options[n];
                u[n] = r;
            }
            return this._setOptions(u), this;
        },
        _setOptions: function(e) {
            var t;
            for (t in e) this._setOption(t, e[t]);
            return this;
        },
        _setOption: function(e, t) {
            return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this;
        },
        enable: function() {
            return this._setOption("disabled", !1);
        },
        disable: function() {
            return this._setOption("disabled", !0);
        },
        _on: function(t, n, r) {
            var i, s = this;
            "boolean" != typeof t && (r = n, n = t, t = !1), r ? (n = i = e(n), this.bindings = this.bindings.add(n)) : (r = n, n = this.element, i = this.widget()), e.each(r, function(r, o) {
                function u() {
                    return t || s.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? s[o] : o).apply(s, arguments) : void 0;
                }
                "string" != typeof o && (u.guid = o.guid = o.guid || u.guid || e.guid++);
                var l = r.match(/^(\w+)\s*(.*)$/), h = l[1] + s.eventNamespace, p = l[2];
                p ? i.delegate(p, h, u) : n.bind(h, u);
            });
        },
        _off: function(e, t) {
            t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(t).undelegate(t);
        },
        _delay: function(e, t) {
            function n() {
                return ("string" == typeof e ? r[e] : e).apply(r, arguments);
            }
            var r = this;
            return setTimeout(n, t || 0);
        },
        _hoverable: function(t) {
            this.hoverable = this.hoverable.add(t), this._on(t, {
                mouseenter: function(t) {
                    e(t.currentTarget).addClass("ui-state-hover");
                },
                mouseleave: function(t) {
                    e(t.currentTarget).removeClass("ui-state-hover");
                }
            });
        },
        _focusable: function(t) {
            this.focusable = this.focusable.add(t), this._on(t, {
                focusin: function(t) {
                    e(t.currentTarget).addClass("ui-state-focus");
                },
                focusout: function(t) {
                    e(t.currentTarget).removeClass("ui-state-focus");
                }
            });
        },
        _trigger: function(t, n, r) {
            var i, s, o = this.options[t];
            if (r = r || {}, n = e.Event(n), n.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), n.target = this.element[0], s = n.originalEvent) for (i in s) i in n || (n[i] = s[i]);
            return this.element.trigger(n, r), !(e.isFunction(o) && o.apply(this.element[0], [ n ].concat(r)) === !1 || n.isDefaultPrevented());
        }
    }, e.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(t, n) {
        e.Widget.prototype["_" + t] = function(r, i, s) {
            "string" == typeof i && (i = {
                effect: i
            });
            var o, u = i ? i === !0 || "number" == typeof i ? n : i.effect || n : t;
            i = i || {}, "number" == typeof i && (i = {
                duration: i
            }), o = !e.isEmptyObject(i), i.complete = s, i.delay && r.delay(i.delay), o && e.effects && e.effects.effect[u] ? r[t](i) : u !== t && r[u] ? r[u](i.duration, i.easing, s) : r.queue(function(n) {
                e(this)[t](), s && s.call(r[0]), n();
            });
        };
    });
}), function(e) {
    "use strict";
    var t = function(e, n, r) {
        var i, s, o = document.createElement("img");
        if (o.onerror = n, o.onload = function() {
            !s || r && r.noRevoke || t.revokeObjectURL(s), n && n(t.scale(o, r));
        }, t.isInstanceOf("Blob", e) || t.isInstanceOf("File", e)) i = s = t.createObjectURL(e), o._type = e.type; else {
            if ("string" != typeof e) return !1;
            i = e, r && r.crossOrigin && (o.crossOrigin = r.crossOrigin);
        }
        return i ? (o.src = i, o) : t.readFile(e, function(e) {
            var t = e.target;
            t && t.result ? o.src = t.result : n && n(e);
        });
    }, n = window.createObjectURL && window || window.URL && URL.revokeObjectURL && URL || window.webkitURL && webkitURL;
    t.isInstanceOf = function(e, t) {
        return Object.prototype.toString.call(t) === "[object " + e + "]";
    }, t.transformCoordinates = function() {}, t.getTransformedOptions = function(e) {
        return e;
    }, t.renderImageToCanvas = function(e, t, n, r, i, s, o, u, a, f) {
        return e.getContext("2d").drawImage(t, n, r, i, s, o, u, a, f), e;
    }, t.hasCanvasOption = function(e) {
        return e.canvas || e.crop;
    }, t.scale = function(e, n) {
        n = n || {};
        var r, i, s, o, u, a, f, l, c, h = document.createElement("canvas"), p = e.getContext || t.hasCanvasOption(n) && h.getContext, d = e.naturalWidth || e.width, v = e.naturalHeight || e.height, m = d, g = v, y = function() {
            var e = Math.max((s || m) / m, (o || g) / g);
            e > 1 && (m = Math.ceil(m * e), g = Math.ceil(g * e));
        }, w = function() {
            var e = Math.min((r || m) / m, (i || g) / g);
            1 > e && (m = Math.ceil(m * e), g = Math.ceil(g * e));
        };
        return p && (n = t.getTransformedOptions(n), f = n.left || 0, l = n.top || 0, n.sourceWidth ? (u = n.sourceWidth, void 0 !== n.right && void 0 === n.left && (f = d - u - n.right)) : u = d - f - (n.right || 0), n.sourceHeight ? (a = n.sourceHeight, void 0 !== n.bottom && void 0 === n.top && (l = v - a - n.bottom)) : a = v - l - (n.bottom || 0), m = u, g = a), r = n.maxWidth, i = n.maxHeight, s = n.minWidth, o = n.minHeight, p && r && i && n.crop ? (m = r, g = i, c = u / a - r / i, 0 > c ? (a = i * u / r, void 0 === n.top && void 0 === n.bottom && (l = (v - a) / 2)) : c > 0 && (u = r * a / i, void 0 === n.left && void 0 === n.right && (f = (d - u) / 2))) : ((n.contain || n.cover) && (s = r = r || s, o = i = i || o), n.cover ? (w(), y()) : (y(), w())), p ? (h.width = m, h.height = g, t.transformCoordinates(h, n), t.renderImageToCanvas(h, e, f, l, u, a, 0, 0, m, g)) : (e.width = m, e.height = g, e);
    }, t.createObjectURL = function(e) {
        return n ? n.createObjectURL(e) : !1;
    }, t.revokeObjectURL = function(e) {
        return n ? n.revokeObjectURL(e) : !1;
    }, t.readFile = function(e, t, n) {
        if (window.FileReader) {
            var r = new FileReader;
            if (r.onload = r.onerror = t, n = n || "readAsDataURL", r[n]) return r[n](e), r;
        }
        return !1;
    }, "function" == typeof define && define.amd ? define(function() {
        return t;
    }) : e.loadImage = t;
}(this), function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define([ "load-image" ], e) : e(window.loadImage);
}(function(e) {
    "use strict";
    if (window.navigator && window.navigator.platform && /iP(hone|od|ad)/.test(window.navigator.platform)) {
        var t = e.renderImageToCanvas;
        e.detectSubsampling = function(e) {
            var t, n;
            return e.width * e.height > 1048576 ? (t = document.createElement("canvas"), t.width = t.height = 1, n = t.getContext("2d"), n.drawImage(e, -e.width + 1, 0), 0 === n.getImageData(0, 0, 1, 1).data[3]) : !1;
        }, e.detectVerticalSquash = function(e, t) {
            var n, r, i, s, o, u = e.naturalHeight || e.height, a = document.createElement("canvas"), f = a.getContext("2d");
            for (t && (u /= 2), a.width = 1, a.height = u, f.drawImage(e, 0, 0), n = f.getImageData(0, 0, 1, u).data, r = 0, i = u, s = u; s > r; ) o = n[4 * (s - 1) + 3], 0 === o ? i = s : r = s, s = i + r >> 1;
            return s / u || 1;
        }, e.renderImageToCanvas = function(n, r, i, s, o, u, f, l, c, h) {
            if ("image/jpeg" === r._type) {
                var p, d, v, m, g = n.getContext("2d"), y = document.createElement("canvas"), w = 1024, E = y.getContext("2d");
                if (y.width = w, y.height = w, g.save(), p = e.detectSubsampling(r), p && (i /= 2, s /= 2, o /= 2, u /= 2), d = e.detectVerticalSquash(r, p), p || 1 !== d) {
                    for (s *= d, c = Math.ceil(w * c / o), h = Math.ceil(w * h / u / d), l = 0, m = 0; u > m; ) {
                        for (f = 0, v = 0; o > v; ) E.clearRect(0, 0, w, w), E.drawImage(r, i, s, o, u, -v, -m, o, u), g.drawImage(y, 0, 0, w, w, f, l, c, h), v += w, f += c;
                        m += w, l += h;
                    }
                    return g.restore(), n;
                }
            }
            return t(n, r, i, s, o, u, f, l, c, h);
        };
    }
}), function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define([ "load-image" ], e) : e(window.loadImage);
}(function(e) {
    "use strict";
    var t = e.hasCanvasOption;
    e.hasCanvasOption = function(e) {
        return t(e) || e.orientation;
    }, e.transformCoordinates = function(e, t) {
        var n = e.getContext("2d"), r = e.width, i = e.height, s = t.orientation;
        if (s) switch (s > 4 && (e.width = i, e.height = r), s) {
          case 2:
            n.translate(r, 0), n.scale(-1, 1);
            break;
          case 3:
            n.translate(r, i), n.rotate(Math.PI);
            break;
          case 4:
            n.translate(0, i), n.scale(1, -1);
            break;
          case 5:
            n.rotate(.5 * Math.PI), n.scale(1, -1);
            break;
          case 6:
            n.rotate(.5 * Math.PI), n.translate(0, -i);
            break;
          case 7:
            n.rotate(.5 * Math.PI), n.translate(r, -i), n.scale(-1, 1);
            break;
          case 8:
            n.rotate(-0.5 * Math.PI), n.translate(-r, 0);
        }
    }, e.getTransformedOptions = function(e) {
        if (!e.orientation || 1 === e.orientation) return e;
        var t, n = {};
        for (t in e) e.hasOwnProperty(t) && (n[t] = e[t]);
        switch (e.orientation) {
          case 2:
            n.left = e.right, n.right = e.left;
            break;
          case 3:
            n.left = e.right, n.top = e.bottom, n.right = e.left, n.bottom = e.top;
            break;
          case 4:
            n.top = e.bottom, n.bottom = e.top;
            break;
          case 5:
            n.left = e.top, n.top = e.left, n.right = e.bottom, n.bottom = e.right;
            break;
          case 6:
            n.left = e.top, n.top = e.right, n.right = e.bottom, n.bottom = e.left;
            break;
          case 7:
            n.left = e.bottom, n.top = e.right, n.right = e.top, n.bottom = e.left;
            break;
          case 8:
            n.left = e.bottom, n.top = e.left, n.right = e.top, n.bottom = e.right;
        }
        return e.orientation > 4 && (n.maxWidth = e.maxHeight, n.maxHeight = e.maxWidth, n.minWidth = e.minHeight, n.minHeight = e.minWidth, n.sourceWidth = e.sourceHeight, n.sourceHeight = e.sourceWidth), n;
    };
}), function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define([ "load-image" ], e) : e(window.loadImage);
}(function(e) {
    "use strict";
    var t = window.Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice);
    e.blobSlice = t && function() {
        var e = this.slice || this.webkitSlice || this.mozSlice;
        return e.apply(this, arguments);
    }, e.metaDataParsers = {
        jpeg: {
            65505: []
        }
    }, e.parseMetaData = function(t, n, r) {
        r = r || {};
        var i = this, s = r.maxMetaDataSize || 262144, o = {}, u = !(window.DataView && t && t.size >= 12 && "image/jpeg" === t.type && e.blobSlice);
        (u || !e.readFile(e.blobSlice.call(t, 0, s), function(t) {
            var s, u, f, l, h = t.target.result, p = new DataView(h), v = 2, m = p.byteLength - 4, y = v;
            if (65496 === p.getUint16(0)) {
                for (; m > v && (s = p.getUint16(v), s >= 65504 && 65519 >= s || 65534 === s); ) {
                    if (u = p.getUint16(v + 2) + 2, v + u > p.byteLength) {
                        console.log("Invalid meta data: Invalid segment size.");
                        break;
                    }
                    if (f = e.metaDataParsers.jpeg[s]) for (l = 0; f.length > l; l += 1) f[l].call(i, p, v, u, o, r);
                    v += u, y = v;
                }
                !r.disableImageHead && y > 6 && (o.imageHead = h.slice ? h.slice(0, y) : (new Uint8Array(h)).subarray(0, y));
            } else console.log("Invalid JPEG file: Missing JPEG marker.");
            n(o);
        }, "readAsArrayBuffer")) && n(o);
    };
}), function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define([ "load-image", "load-image-meta" ], e) : e(window.loadImage);
}(function(e) {
    "use strict";
    e.ExifMap = function() {
        return this;
    }, e.ExifMap.prototype.map = {
        Orientation: 274
    }, e.ExifMap.prototype.get = function(e) {
        return this[e] || this[this.map[e]];
    }, e.getExifThumbnail = function(e, t, n) {
        var r, i, s;
        if (!n || t + n > e.byteLength) return console.log("Invalid Exif data: Invalid thumbnail data."), void 0;
        for (r = [], i = 0; n > i; i += 1) s = e.getUint8(t + i), r.push((16 > s ? "0" : "") + s.toString(16));
        return "data:image/jpeg,%" + r.join("%");
    }, e.exifTagTypes = {
        1: {
            getValue: function(e, t) {
                return e.getUint8(t);
            },
            size: 1
        },
        2: {
            getValue: function(e, t) {
                return String.fromCharCode(e.getUint8(t));
            },
            size: 1,
            ascii: !0
        },
        3: {
            getValue: function(e, t, n) {
                return e.getUint16(t, n);
            },
            size: 2
        },
        4: {
            getValue: function(e, t, n) {
                return e.getUint32(t, n);
            },
            size: 4
        },
        5: {
            getValue: function(e, t, n) {
                return e.getUint32(t, n) / e.getUint32(t + 4, n);
            },
            size: 8
        },
        9: {
            getValue: function(e, t, n) {
                return e.getInt32(t, n);
            },
            size: 4
        },
        10: {
            getValue: function(e, t, n) {
                return e.getInt32(t, n) / e.getInt32(t + 4, n);
            },
            size: 8
        }
    }, e.exifTagTypes[7] = e.exifTagTypes[1], e.getExifValue = function(t, n, r, i, s, o) {
        var u, f, l, c, h, p, d = e.exifTagTypes[i];
        if (!d) return console.log("Invalid Exif data: Invalid tag type."), void 0;
        if (u = d.size * s, f = u > 4 ? n + t.getUint32(r + 8, o) : r + 8, f + u > t.byteLength) return console.log("Invalid Exif data: Invalid data offset."), void 0;
        if (1 === s) return d.getValue(t, f, o);
        for (l = [], c = 0; s > c; c += 1) l[c] = d.getValue(t, f + c * d.size, o);
        if (d.ascii) {
            for (h = "", c = 0; l.length > c && (p = l[c], "\0" !== p); c += 1) h += p;
            return h;
        }
        return l;
    }, e.parseExifTag = function(t, n, r, i, s) {
        var o = t.getUint16(r, i);
        s.exif[o] = e.getExifValue(t, n, r, t.getUint16(r + 2, i), t.getUint32(r + 4, i), i);
    }, e.parseExifTags = function(e, t, n, r, i) {
        var s, o, u;
        if (n + 6 > e.byteLength) return console.log("Invalid Exif data: Invalid directory offset."), void 0;
        if (s = e.getUint16(n, r), o = n + 2 + 12 * s, o + 4 > e.byteLength) return console.log("Invalid Exif data: Invalid directory size."), void 0;
        for (u = 0; s > u; u += 1) this.parseExifTag(e, t, n + 2 + 12 * u, r, i);
        return e.getUint32(o, r);
    }, e.parseExifData = function(t, n, r, i, s) {
        if (!s.disableExif) {
            var o, u, f, l = n + 10;
            if (1165519206 === t.getUint32(n + 4)) {
                if (l + 8 > t.byteLength) return console.log("Invalid Exif data: Invalid segment size."), void 0;
                if (0 !== t.getUint16(n + 8)) return console.log("Invalid Exif data: Missing byte alignment offset."), void 0;
                switch (t.getUint16(l)) {
                  case 18761:
                    o = !0;
                    break;
                  case 19789:
                    o = !1;
                    break;
                  default:
                    return console.log("Invalid Exif data: Invalid byte alignment marker."), void 0;
                }
                if (42 !== t.getUint16(l + 2, o)) return console.log("Invalid Exif data: Missing TIFF marker."), void 0;
                u = t.getUint32(l + 4, o), i.exif = new e.ExifMap, u = e.parseExifTags(t, l, l + u, o, i), u && !s.disableExifThumbnail && (f = {
                    exif: {}
                }, u = e.parseExifTags(t, l, l + u, o, f), f.exif[513] && (i.exif.Thumbnail = e.getExifThumbnail(t, l + f.exif[513], f.exif[514]))), i.exif[34665] && !s.disableExifSub && e.parseExifTags(t, l, l + i.exif[34665], o, i), i.exif[34853] && !s.disableExifGps && e.parseExifTags(t, l, l + i.exif[34853], o, i);
            }
        }
    }, e.metaDataParsers.jpeg[65505].push(e.parseExifData);
}), function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define([ "load-image", "load-image-exif" ], e) : e(window.loadImage);
}(function(e) {
    "use strict";
    var t, n, r;
    e.ExifMap.prototype.tags = {
        256: "ImageWidth",
        257: "ImageHeight",
        34665: "ExifIFDPointer",
        34853: "GPSInfoIFDPointer",
        40965: "InteroperabilityIFDPointer",
        258: "BitsPerSample",
        259: "Compression",
        262: "PhotometricInterpretation",
        274: "Orientation",
        277: "SamplesPerPixel",
        284: "PlanarConfiguration",
        530: "YCbCrSubSampling",
        531: "YCbCrPositioning",
        282: "XResolution",
        283: "YResolution",
        296: "ResolutionUnit",
        273: "StripOffsets",
        278: "RowsPerStrip",
        279: "StripByteCounts",
        513: "JPEGInterchangeFormat",
        514: "JPEGInterchangeFormatLength",
        301: "TransferFunction",
        318: "WhitePoint",
        319: "PrimaryChromaticities",
        529: "YCbCrCoefficients",
        532: "ReferenceBlackWhite",
        306: "DateTime",
        270: "ImageDescription",
        271: "Make",
        272: "Model",
        305: "Software",
        315: "Artist",
        33432: "Copyright",
        36864: "ExifVersion",
        40960: "FlashpixVersion",
        40961: "ColorSpace",
        40962: "PixelXDimension",
        40963: "PixelYDimension",
        42240: "Gamma",
        37121: "ComponentsConfiguration",
        37122: "CompressedBitsPerPixel",
        37500: "MakerNote",
        37510: "UserComment",
        40964: "RelatedSoundFile",
        36867: "DateTimeOriginal",
        36868: "DateTimeDigitized",
        37520: "SubSecTime",
        37521: "SubSecTimeOriginal",
        37522: "SubSecTimeDigitized",
        33434: "ExposureTime",
        33437: "FNumber",
        34850: "ExposureProgram",
        34852: "SpectralSensitivity",
        34855: "PhotographicSensitivity",
        34856: "OECF",
        34864: "SensitivityType",
        34865: "StandardOutputSensitivity",
        34866: "RecommendedExposureIndex",
        34867: "ISOSpeed",
        34868: "ISOSpeedLatitudeyyy",
        34869: "ISOSpeedLatitudezzz",
        37377: "ShutterSpeedValue",
        37378: "ApertureValue",
        37379: "BrightnessValue",
        37380: "ExposureBias",
        37381: "MaxApertureValue",
        37382: "SubjectDistance",
        37383: "MeteringMode",
        37384: "LightSource",
        37385: "Flash",
        37396: "SubjectArea",
        37386: "FocalLength",
        41483: "FlashEnergy",
        41484: "SpatialFrequencyResponse",
        41486: "FocalPlaneXResolution",
        41487: "FocalPlaneYResolution",
        41488: "FocalPlaneResolutionUnit",
        41492: "SubjectLocation",
        41493: "ExposureIndex",
        41495: "SensingMethod",
        41728: "FileSource",
        41729: "SceneType",
        41730: "CFAPattern",
        41985: "CustomRendered",
        41986: "ExposureMode",
        41987: "WhiteBalance",
        41988: "DigitalZoomRatio",
        41989: "FocalLengthIn35mmFilm",
        41990: "SceneCaptureType",
        41991: "GainControl",
        41992: "Contrast",
        41993: "Saturation",
        41994: "Sharpness",
        41995: "DeviceSettingDescription",
        41996: "SubjectDistanceRange",
        42016: "ImageUniqueID",
        42032: "CameraOwnerName",
        42033: "BodySerialNumber",
        42034: "LensSpecification",
        42035: "LensMake",
        42036: "LensModel",
        42037: "LensSerialNumber",
        0: "GPSVersionID",
        1: "GPSLatitudeRef",
        2: "GPSLatitude",
        3: "GPSLongitudeRef",
        4: "GPSLongitude",
        5: "GPSAltitudeRef",
        6: "GPSAltitude",
        7: "GPSTimeStamp",
        8: "GPSSatellites",
        9: "GPSStatus",
        10: "GPSMeasureMode",
        11: "GPSDOP",
        12: "GPSSpeedRef",
        13: "GPSSpeed",
        14: "GPSTrackRef",
        15: "GPSTrack",
        16: "GPSImgDirectionRef",
        17: "GPSImgDirection",
        18: "GPSMapDatum",
        19: "GPSDestLatitudeRef",
        20: "GPSDestLatitude",
        21: "GPSDestLongitudeRef",
        22: "GPSDestLongitude",
        23: "GPSDestBearingRef",
        24: "GPSDestBearing",
        25: "GPSDestDistanceRef",
        26: "GPSDestDistance",
        27: "GPSProcessingMethod",
        28: "GPSAreaInformation",
        29: "GPSDateStamp",
        30: "GPSDifferential",
        31: "GPSHPositioningError"
    }, e.ExifMap.prototype.stringValues = {
        ExposureProgram: {
            0: "Undefined",
            1: "Manual",
            2: "Normal program",
            3: "Aperture priority",
            4: "Shutter priority",
            5: "Creative program",
            6: "Action program",
            7: "Portrait mode",
            8: "Landscape mode"
        },
        MeteringMode: {
            0: "Unknown",
            1: "Average",
            2: "CenterWeightedAverage",
            3: "Spot",
            4: "MultiSpot",
            5: "Pattern",
            6: "Partial",
            255: "Other"
        },
        LightSource: {
            0: "Unknown",
            1: "Daylight",
            2: "Fluorescent",
            3: "Tungsten (incandescent light)",
            4: "Flash",
            9: "Fine weather",
            10: "Cloudy weather",
            11: "Shade",
            12: "Daylight fluorescent (D 5700 - 7100K)",
            13: "Day white fluorescent (N 4600 - 5400K)",
            14: "Cool white fluorescent (W 3900 - 4500K)",
            15: "White fluorescent (WW 3200 - 3700K)",
            17: "Standard light A",
            18: "Standard light B",
            19: "Standard light C",
            20: "D55",
            21: "D65",
            22: "D75",
            23: "D50",
            24: "ISO studio tungsten",
            255: "Other"
        },
        Flash: {
            0: "Flash did not fire",
            1: "Flash fired",
            5: "Strobe return light not detected",
            7: "Strobe return light detected",
            9: "Flash fired, compulsory flash mode",
            13: "Flash fired, compulsory flash mode, return light not detected",
            15: "Flash fired, compulsory flash mode, return light detected",
            16: "Flash did not fire, compulsory flash mode",
            24: "Flash did not fire, auto mode",
            25: "Flash fired, auto mode",
            29: "Flash fired, auto mode, return light not detected",
            31: "Flash fired, auto mode, return light detected",
            32: "No flash function",
            65: "Flash fired, red-eye reduction mode",
            69: "Flash fired, red-eye reduction mode, return light not detected",
            71: "Flash fired, red-eye reduction mode, return light detected",
            73: "Flash fired, compulsory flash mode, red-eye reduction mode",
            77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
            79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
            89: "Flash fired, auto mode, red-eye reduction mode",
            93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
            95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
        },
        SensingMethod: {
            1: "Undefined",
            2: "One-chip color area sensor",
            3: "Two-chip color area sensor",
            4: "Three-chip color area sensor",
            5: "Color sequential area sensor",
            7: "Trilinear sensor",
            8: "Color sequential linear sensor"
        },
        SceneCaptureType: {
            0: "Standard",
            1: "Landscape",
            2: "Portrait",
            3: "Night scene"
        },
        SceneType: {
            1: "Directly photographed"
        },
        CustomRendered: {
            0: "Normal process",
            1: "Custom process"
        },
        WhiteBalance: {
            0: "Auto white balance",
            1: "Manual white balance"
        },
        GainControl: {
            0: "None",
            1: "Low gain up",
            2: "High gain up",
            3: "Low gain down",
            4: "High gain down"
        },
        Contrast: {
            0: "Normal",
            1: "Soft",
            2: "Hard"
        },
        Saturation: {
            0: "Normal",
            1: "Low saturation",
            2: "High saturation"
        },
        Sharpness: {
            0: "Normal",
            1: "Soft",
            2: "Hard"
        },
        SubjectDistanceRange: {
            0: "Unknown",
            1: "Macro",
            2: "Close view",
            3: "Distant view"
        },
        FileSource: {
            3: "DSC"
        },
        ComponentsConfiguration: {
            0: "",
            1: "Y",
            2: "Cb",
            3: "Cr",
            4: "R",
            5: "G",
            6: "B"
        },
        Orientation: {
            1: "top-left",
            2: "top-right",
            3: "bottom-right",
            4: "bottom-left",
            5: "left-top",
            6: "right-top",
            7: "right-bottom",
            8: "left-bottom"
        }
    }, e.ExifMap.prototype.getText = function(e) {
        var t = this.get(e);
        switch (e) {
          case "LightSource":
          case "Flash":
          case "MeteringMode":
          case "ExposureProgram":
          case "SensingMethod":
          case "SceneCaptureType":
          case "SceneType":
          case "CustomRendered":
          case "WhiteBalance":
          case "GainControl":
          case "Contrast":
          case "Saturation":
          case "Sharpness":
          case "SubjectDistanceRange":
          case "FileSource":
          case "Orientation":
            return this.stringValues[e][t];
          case "ExifVersion":
          case "FlashpixVersion":
            return String.fromCharCode(t[0], t[1], t[2], t[3]);
          case "ComponentsConfiguration":
            return this.stringValues[e][t[0]] + this.stringValues[e][t[1]] + this.stringValues[e][t[2]] + this.stringValues[e][t[3]];
          case "GPSVersionID":
            return t[0] + "." + t[1] + "." + t[2] + "." + t[3];
        }
        return t + "";
    }, t = e.ExifMap.prototype.tags, n = e.ExifMap.prototype.map;
    for (r in t) t.hasOwnProperty(r) && (n[t[r]] = r);
    e.ExifMap.prototype.getAll = function() {
        var e, n, r = {};
        for (e in this) this.hasOwnProperty(e) && (n = t[e], n && (r[n] = this.getText(n)));
        return r;
    };
}), !function(e) {
    "use strict";
    var t = e.HTMLCanvasElement && e.HTMLCanvasElement.prototype, n = e.Blob && function() {
        try {
            return Boolean(new Blob);
        } catch (e) {
            return !1;
        }
    }(), r = n && e.Uint8Array && function() {
        try {
            return 100 === (new Blob([ new Uint8Array(100) ])).size;
        } catch (e) {
            return !1;
        }
    }(), i = e.BlobBuilder || e.WebKitBlobBuilder || e.MozBlobBuilder || e.MSBlobBuilder, s = (n || i) && e.atob && e.ArrayBuffer && e.Uint8Array && function(e) {
        var t, s, o, u, a, f;
        for (t = e.split(",")[0].indexOf("base64") >= 0 ? atob(e.split(",")[1]) : decodeURIComponent(e.split(",")[1]), s = new ArrayBuffer(t.length), o = new Uint8Array(s), u = 0; u < t.length; u += 1) o[u] = t.charCodeAt(u);
        return a = e.split(",")[0].split(":")[1].split(";")[0], n ? new Blob([ r ? o : s ], {
            type: a
        }) : (f = new i, f.append(s), f.getBlob(a));
    };
    e.HTMLCanvasElement && !t.toBlob && (t.mozGetAsFile ? t.toBlob = function(e, n, r) {
        r && t.toDataURL && s ? e(s(this.toDataURL(n, r))) : e(this.mozGetAsFile("blob", n));
    } : t.toDataURL && s && (t.toBlob = function(e, t, n) {
        e(s(this.toDataURL(t, n)));
    })), "function" == typeof define && define.amd ? define(function() {
        return s;
    }) : e.dataURLtoBlob = s;
}(this), function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define([ "jquery", "jquery.ui.widget" ], e) : e(window.jQuery);
}(function(e) {
    "use strict";
    e.support.fileInput = !(new RegExp("(Android (1\\.[0156]|2\\.[01]))|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)|(w(eb)?OSBrowser)|(webOS)|(Kindle/(1\\.0|2\\.[05]|3\\.0))")).test(window.navigator.userAgent) && !e('<input type="file">').prop("disabled"), e.support.xhrFileUpload = !!window.XMLHttpRequestUpload && !!window.FileReader, e.support.xhrFormDataFileUpload = !!window.FormData, e.support.blobSlice = window.Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice), e.widget("blueimp.fileupload", {
        options: {
            dropZone: e(document),
            pasteZone: e(document),
            fileInput: void 0,
            replaceFileInput: !0,
            paramName: void 0,
            singleFileUploads: !0,
            limitMultiFileUploads: void 0,
            sequentialUploads: !1,
            limitConcurrentUploads: void 0,
            forceIframeTransport: !1,
            redirect: void 0,
            redirectParamName: void 0,
            postMessage: void 0,
            multipart: !0,
            maxChunkSize: void 0,
            uploadedBytes: void 0,
            recalculateProgress: !0,
            progressInterval: 100,
            bitrateInterval: 500,
            autoUpload: !0,
            messages: {
                uploadedBytes: "Uploaded bytes exceed file size"
            },
            i18n: function(t, n) {
                return t = this.messages[t] || t.toString(), n && e.each(n, function(e, n) {
                    t = t.replace("{" + e + "}", n);
                }), t;
            },
            formData: function(e) {
                return e.serializeArray();
            },
            add: function(t, n) {
                (n.autoUpload || n.autoUpload !== !1 && e(this).fileupload("option", "autoUpload")) && n.process().done(function() {
                    n.submit();
                });
            },
            processData: !1,
            contentType: !1,
            cache: !1
        },
        _specialOptions: [ "fileInput", "dropZone", "pasteZone", "multipart", "forceIframeTransport" ],
        _blobSlice: e.support.blobSlice && function() {
            var e = this.slice || this.webkitSlice || this.mozSlice;
            return e.apply(this, arguments);
        },
        _BitrateTimer: function() {
            this.timestamp = Date.now ? Date.now() : (new Date).getTime(), this.loaded = 0, this.bitrate = 0, this.getBitrate = function(e, t, n) {
                var r = e - this.timestamp;
                return (!this.bitrate || !n || r > n) && (this.bitrate = 8 * (t - this.loaded) * (1e3 / r), this.loaded = t, this.timestamp = e), this.bitrate;
            };
        },
        _isXHRUpload: function(t) {
            return !t.forceIframeTransport && (!t.multipart && e.support.xhrFileUpload || e.support.xhrFormDataFileUpload);
        },
        _getFormData: function(t) {
            var n;
            return "function" == typeof t.formData ? t.formData(t.form) : e.isArray(t.formData) ? t.formData : "object" === e.type(t.formData) ? (n = [], e.each(t.formData, function(e, t) {
                n.push({
                    name: e,
                    value: t
                });
            }), n) : [];
        },
        _getTotal: function(t) {
            var n = 0;
            return e.each(t, function(e, t) {
                n += t.size || 1;
            }), n;
        },
        _initProgressObject: function(t) {
            var n = {
                loaded: 0,
                total: 0,
                bitrate: 0
            };
            t._progress ? e.extend(t._progress, n) : t._progress = n;
        },
        _initResponseObject: function(e) {
            var t;
            if (e._response) for (t in e._response) e._response.hasOwnProperty(t) && delete e._response[t]; else e._response = {};
        },
        _onProgress: function(e, t) {
            if (e.lengthComputable) {
                var n, r = Date.now ? Date.now() : (new Date).getTime();
                if (t._time && t.progressInterval && r - t._time < t.progressInterval && e.loaded !== e.total) return;
                t._time = r, n = Math.floor(e.loaded / e.total * (t.chunkSize || t._progress.total)) + (t.uploadedBytes || 0), this._progress.loaded += n - t._progress.loaded, this._progress.bitrate = this._bitrateTimer.getBitrate(r, this._progress.loaded, t.bitrateInterval), t._progress.loaded = t.loaded = n, t._progress.bitrate = t.bitrate = t._bitrateTimer.getBitrate(r, n, t.bitrateInterval), this._trigger("progress", e, t), this._trigger("progressall", e, this._progress);
            }
        },
        _initProgressListener: function(t) {
            var n = this, r = t.xhr ? t.xhr() : e.ajaxSettings.xhr();
            r.upload && (e(r.upload).bind("progress", function(e) {
                var r = e.originalEvent;
                e.lengthComputable = r.lengthComputable, e.loaded = r.loaded, e.total = r.total, n._onProgress(e, t);
            }), t.xhr = function() {
                return r;
            });
        },
        _isInstanceOf: function(e, t) {
            return Object.prototype.toString.call(t) === "[object " + e + "]";
        },
        _initXHRData: function(t) {
            var n, r = this, i = t.files[0], s = t.multipart || !e.support.xhrFileUpload, o = t.paramName[0];
            t.headers = t.headers || {}, t.contentRange && (t.headers["Content-Range"] = t.contentRange), s && !t.blob && this._isInstanceOf("File", i) || (t.headers["Content-Disposition"] = 'attachment; filename="' + encodeURI(i.name) + '"'), s ? e.support.xhrFormDataFileUpload && (t.postMessage ? (n = this._getFormData(t), t.blob ? n.push({
                name: o,
                value: t.blob
            }) : e.each(t.files, function(e, r) {
                n.push({
                    name: t.paramName[e] || o,
                    value: r
                });
            })) : (r._isInstanceOf("FormData", t.formData) ? n = t.formData : (n = new FormData, e.each(this._getFormData(t), function(e, t) {
                n.append(t.name, t.value);
            })), t.blob ? n.append(o, t.blob, i.name) : e.each(t.files, function(e, i) {
                (r._isInstanceOf("File", i) || r._isInstanceOf("Blob", i)) && n.append(t.paramName[e] || o, i, i.name);
            })), t.data = n) : (t.contentType = i.type, t.data = t.blob || i), t.blob = null;
        },
        _initIframeSettings: function(t) {
            var n = e("<a></a>").prop("href", t.url).prop("host");
            t.dataType = "iframe " + (t.dataType || ""), t.formData = this._getFormData(t), t.redirect && n && n !== location.host && t.formData.push({
                name: t.redirectParamName || "redirect",
                value: t.redirect
            });
        },
        _initDataSettings: function(e) {
            this._isXHRUpload(e) ? (this._chunkedUpload(e, !0) || (e.data || this._initXHRData(e), this._initProgressListener(e)), e.postMessage && (e.dataType = "postmessage " + (e.dataType || ""))) : this._initIframeSettings(e);
        },
        _getParamName: function(t) {
            var n = e(t.fileInput), r = t.paramName;
            return r ? e.isArray(r) || (r = [ r ]) : (r = [], n.each(function() {
                for (var t = e(this), n = t.prop("name") || "files[]", i = (t.prop("files") || [ 1 ]).length; i; ) r.push(n), i -= 1;
            }), r.length || (r = [ n.prop("name") || "files[]" ])), r;
        },
        _initFormSettings: function(t) {
            t.form && t.form.length || (t.form = e(t.fileInput.prop("form")), t.form.length || (t.form = e(this.options.fileInput.prop("form")))), t.paramName = this._getParamName(t), t.url || (t.url = t.form.prop("action") || location.href), t.type = (t.type || t.form.prop("method") || "").toUpperCase(), "POST" !== t.type && "PUT" !== t.type && "PATCH" !== t.type && (t.type = "POST"), t.formAcceptCharset || (t.formAcceptCharset = t.form.attr("accept-charset"));
        },
        _getAJAXSettings: function(t) {
            var n = e.extend({}, this.options, t);
            return this._initFormSettings(n), this._initDataSettings(n), n;
        },
        _getDeferredState: function(e) {
            return e.state ? e.state() : e.isResolved() ? "resolved" : e.isRejected() ? "rejected" : "pending";
        },
        _enhancePromise: function(e) {
            return e.success = e.done, e.error = e.fail, e.complete = e.always, e;
        },
        _getXHRPromise: function(t, n, r) {
            var i = e.Deferred(), s = i.promise();
            return n = n || this.options.context || s, t === !0 ? i.resolveWith(n, r) : t === !1 && i.rejectWith(n, r), s.abort = i.promise, this._enhancePromise(s);
        },
        _addConvenienceMethods: function(t, n) {
            var r = this, i = function(t) {
                return e.Deferred().resolveWith(r, [ t ]).promise();
            };
            n.process = function(e, t) {
                return (e || t) && (n._processQueue = this._processQueue = (this._processQueue || i(this)).pipe(e, t)), this._processQueue || i(this);
            }, n.submit = function() {
                return "pending" !== this.state() && (n.jqXHR = this.jqXHR = r._trigger("submit", t, this) !== !1 && r._onSend(t, this)), this.jqXHR || r._getXHRPromise();
            }, n.abort = function() {
                return this.jqXHR ? this.jqXHR.abort() : r._getXHRPromise();
            }, n.state = function() {
                return this.jqXHR ? r._getDeferredState(this.jqXHR) : this._processQueue ? r._getDeferredState(this._processQueue) : void 0;
            }, n.progress = function() {
                return this._progress;
            }, n.response = function() {
                return this._response;
            };
        },
        _getUploadedBytes: function(e) {
            var t = e.getResponseHeader("Range"), n = t && t.split("-"), r = n && n.length > 1 && parseInt(n[1], 10);
            return r && r + 1;
        },
        _chunkedUpload: function(t, n) {
            t.uploadedBytes = t.uploadedBytes || 0;
            var r, i, s = this, o = t.files[0], u = o.size, f = t.uploadedBytes, l = t.maxChunkSize || u, c = this._blobSlice, h = e.Deferred(), p = h.promise();
            return this._isXHRUpload(t) && c && (f || u > l) && !t.data ? n ? !0 : f >= u ? (o.error = t.i18n("uploadedBytes"), this._getXHRPromise(!1, t.context, [ null, "error", o.error ])) : (i = function() {
                var n = e.extend({}, t), p = n._progress.loaded;
                n.blob = c.call(o, f, f + l, o.type), n.chunkSize = n.blob.size, n.contentRange = "bytes " + f + "-" + (f + n.chunkSize - 1) + "/" + u, s._initXHRData(n), s._initProgressListener(n), r = (s._trigger("chunksend", null, n) !== !1 && e.ajax(n) || s._getXHRPromise(!1, n.context)).done(function(r, o, l) {
                    f = s._getUploadedBytes(l) || f + n.chunkSize, p + n.chunkSize - n._progress.loaded && s._onProgress(e.Event("progress", {
                        lengthComputable: !0,
                        loaded: f - n.uploadedBytes,
                        total: f - n.uploadedBytes
                    }), n), t.uploadedBytes = n.uploadedBytes = f, n.result = r, n.textStatus = o, n.jqXHR = l, s._trigger("chunkdone", null, n), s._trigger("chunkalways", null, n), u > f ? i() : h.resolveWith(n.context, [ r, o, l ]);
                }).fail(function(e, t, r) {
                    n.jqXHR = e, n.textStatus = t, n.errorThrown = r, s._trigger("chunkfail", null, n), s._trigger("chunkalways", null, n), h.rejectWith(n.context, [ e, t, r ]);
                });
            }, this._enhancePromise(p), p.abort = function() {
                return r.abort();
            }, i(), p) : !1;
        },
        _beforeSend: function(e, t) {
            0 === this._active && (this._trigger("start"), this._bitrateTimer = new this._BitrateTimer, this._progress.loaded = this._progress.total = 0, this._progress.bitrate = 0), this._initResponseObject(t), this._initProgressObject(t), t._progress.loaded = t.loaded = t.uploadedBytes || 0, t._progress.total = t.total = this._getTotal(t.files) || 1, t._progress.bitrate = t.bitrate = 0, this._active += 1, this._progress.loaded += t.loaded, this._progress.total += t.total;
        },
        _onDone: function(t, n, r, i) {
            var s = i._progress.total, o = i._response;
            i._progress.loaded < s && this._onProgress(e.Event("progress", {
                lengthComputable: !0,
                loaded: s,
                total: s
            }), i), o.result = i.result = t, o.textStatus = i.textStatus = n, o.jqXHR = i.jqXHR = r, this._trigger("done", null, i);
        },
        _onFail: function(e, t, n, r) {
            var i = r._response;
            r.recalculateProgress && (this._progress.loaded -= r._progress.loaded, this._progress.total -= r._progress.total), i.jqXHR = r.jqXHR = e, i.textStatus = r.textStatus = t, i.errorThrown = r.errorThrown = n, this._trigger("fail", null, r);
        },
        _onAlways: function(e, t, n, r) {
            this._trigger("always", null, r);
        },
        _onSend: function(t, n) {
            n.submit || this._addConvenienceMethods(t, n);
            var r, i, s, o, u = this, f = u._getAJAXSettings(n), l = function() {
                return u._sending += 1, f._bitrateTimer = new u._BitrateTimer, r = r || ((i || u._trigger("send", t, f) === !1) && u._getXHRPromise(!1, f.context, i) || u._chunkedUpload(f) || e.ajax(f)).done(function(e, t, n) {
                    u._onDone(e, t, n, f);
                }).fail(function(e, t, n) {
                    u._onFail(e, t, n, f);
                }).always(function(e, t, n) {
                    if (u._onAlways(e, t, n, f), u._sending -= 1, u._active -= 1, f.limitConcurrentUploads && f.limitConcurrentUploads > u._sending) for (var r = u._slots.shift(); r; ) {
                        if ("pending" === u._getDeferredState(r)) {
                            r.resolve();
                            break;
                        }
                        r = u._slots.shift();
                    }
                    0 === u._active && u._trigger("stop");
                });
            };
            return this._beforeSend(t, f), this.options.sequentialUploads || this.options.limitConcurrentUploads && this.options.limitConcurrentUploads <= this._sending ? (this.options.limitConcurrentUploads > 1 ? (s = e.Deferred(), this._slots.push(s), o = s.pipe(l)) : (this._sequence = this._sequence.pipe(l, l), o = this._sequence), o.abort = function() {
                return i = [ void 0, "abort", "abort" ], r ? r.abort() : (s && s.rejectWith(f.context, i), l());
            }, this._enhancePromise(o)) : l();
        },
        _onAdd: function(t, n) {
            var r, i, s, o, u = this, f = !0, l = e.extend({}, this.options, n), c = l.limitMultiFileUploads, h = this._getParamName(l);
            if ((l.singleFileUploads || c) && this._isXHRUpload(l)) if (!l.singleFileUploads && c) for (s = [], r = [], o = 0; o < n.files.length; o += c) s.push(n.files.slice(o, o + c)), i = h.slice(o, o + c), i.length || (i = h), r.push(i); else r = h; else s = [ n.files ], r = [ h ];
            return n.originalFiles = n.files, e.each(s || n.files, function(i, o) {
                var l = e.extend({}, n);
                return l.files = s ? o : [ o ], l.paramName = r[i], u._initResponseObject(l), u._initProgressObject(l), u._addConvenienceMethods(t, l), f = u._trigger("add", t, l);
            }), f;
        },
        _replaceFileInput: function(t) {
            var n = t.clone(!0);
            e("<form></form>").append(n)[0].reset(), t.after(n).detach(), e.cleanData(t.unbind("remove")), this.options.fileInput = this.options.fileInput.map(function(e, r) {
                return r === t[0] ? n[0] : r;
            }), t[0] === this.element[0] && (this.element = n);
        },
        _handleFileTreeEntry: function(t, n) {
            var r, i = this, s = e.Deferred(), o = function(e) {
                e && !e.entry && (e.entry = t), s.resolve([ e ]);
            };
            return n = n || "", t.isFile ? t._file ? (t._file.relativePath = n, s.resolve(t._file)) : t.file(function(e) {
                e.relativePath = n, s.resolve(e);
            }, o) : t.isDirectory ? (r = t.createReader(), r.readEntries(function(e) {
                i._handleFileTreeEntries(e, n + t.name + "/").done(function(e) {
                    s.resolve(e);
                }).fail(o);
            }, o)) : s.resolve([]), s.promise();
        },
        _handleFileTreeEntries: function(t, n) {
            var r = this;
            return e.when.apply(e, e.map(t, function(e) {
                return r._handleFileTreeEntry(e, n);
            })).pipe(function() {
                return Array.prototype.concat.apply([], arguments);
            });
        },
        _getDroppedFiles: function(t) {
            t = t || {};
            var n = t.items;
            return n && n.length && (n[0].webkitGetAsEntry || n[0].getAsEntry) ? this._handleFileTreeEntries(e.map(n, function(e) {
                var t;
                return e.webkitGetAsEntry ? (t = e.webkitGetAsEntry(), t && (t._file = e.getAsFile()), t) : e.getAsEntry();
            })) : e.Deferred().resolve(e.makeArray(t.files)).promise();
        },
        _getSingleFileInputFiles: function(t) {
            t = e(t);
            var n, r, i = t.prop("webkitEntries") || t.prop("entries");
            if (i && i.length) return this._handleFileTreeEntries(i);
            if (n = e.makeArray(t.prop("files")), n.length) void 0 === n[0].name && n[0].fileName && e.each(n, function(e, t) {
                t.name = t.fileName, t.size = t.fileSize;
            }); else {
                if (r = t.prop("value"), !r) return e.Deferred().resolve([]).promise();
                n = [ {
                    name: r.replace(/^.*\\/, "")
                } ];
            }
            return e.Deferred().resolve(n).promise();
        },
        _getFileInputFiles: function(t) {
            return t instanceof e && 1 !== t.length ? e.when.apply(e, e.map(t, this._getSingleFileInputFiles)).pipe(function() {
                return Array.prototype.concat.apply([], arguments);
            }) : this._getSingleFileInputFiles(t);
        },
        _onChange: function(t) {
            var n = this, r = {
                fileInput: e(t.target),
                form: e(t.target.form)
            };
            this._getFileInputFiles(r.fileInput).always(function(e) {
                r.files = e, n.options.replaceFileInput && n._replaceFileInput(r.fileInput), n._trigger("change", t, r) !== !1 && n._onAdd(t, r);
            });
        },
        _onPaste: function(t) {
            var n = t.originalEvent && t.originalEvent.clipboardData && t.originalEvent.clipboardData.items, r = {
                files: []
            };
            return n && n.length && (e.each(n, function(e, t) {
                var n = t.getAsFile && t.getAsFile();
                n && r.files.push(n);
            }), this._trigger("paste", t, r) === !1 || this._onAdd(t, r) === !1) ? !1 : void 0;
        },
        _onDrop: function(e) {
            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
            var t = this, n = e.dataTransfer, r = {};
            n && n.files && n.files.length && (e.preventDefault(), this._getDroppedFiles(n).always(function(n) {
                r.files = n, t._trigger("drop", e, r) !== !1 && t._onAdd(e, r);
            }));
        },
        _onDragOver: function(t) {
            t.dataTransfer = t.originalEvent && t.originalEvent.dataTransfer;
            var n = t.dataTransfer;
            if (n) {
                if (this._trigger("dragover", t) === !1) return !1;
                -1 !== e.inArray("Files", n.types) && (n.dropEffect = "copy", t.preventDefault());
            }
        },
        _initEventHandlers: function() {
            this._isXHRUpload(this.options) && (this._on(this.options.dropZone, {
                dragover: this._onDragOver,
                drop: this._onDrop
            }), this._on(this.options.pasteZone, {
                paste: this._onPaste
            })), e.support.fileInput && this._on(this.options.fileInput, {
                change: this._onChange
            });
        },
        _destroyEventHandlers: function() {
            this._off(this.options.dropZone, "dragover drop"), this._off(this.options.pasteZone, "paste"), this._off(this.options.fileInput, "change");
        },
        _setOption: function(t, n) {
            var r = -1 !== e.inArray(t, this._specialOptions);
            r && this._destroyEventHandlers(), this._super(t, n), r && (this._initSpecialOptions(), this._initEventHandlers());
        },
        _initSpecialOptions: function() {
            var t = this.options;
            void 0 === t.fileInput ? t.fileInput = this.element.is('input[type="file"]') ? this.element : this.element.find('input[type="file"]') : t.fileInput instanceof e || (t.fileInput = e(t.fileInput)), t.dropZone instanceof e || (t.dropZone = e(t.dropZone)), t.pasteZone instanceof e || (t.pasteZone = e(t.pasteZone));
        },
        _getRegExp: function(e) {
            var t = e.split("/"), n = t.pop();
            return t.shift(), new RegExp(t.join("/"), n);
        },
        _isRegExpOption: function(t, n) {
            return "url" !== t && "string" === e.type(n) && /^\/.*\/[igm]{0,3}$/.test(n);
        },
        _initDataAttributes: function() {
            var t = this, n = this.options;
            e.each(e(this.element[0].cloneNode(!1)).data(), function(e, r) {
                t._isRegExpOption(e, r) && (r = t._getRegExp(r)), n[e] = r;
            });
        },
        _create: function() {
            this._initDataAttributes(), this._initSpecialOptions(), this._slots = [], this._sequence = this._getXHRPromise(!0), this._sending = this._active = 0, this._initProgressObject(this), this._initEventHandlers();
        },
        active: function() {
            return this._active;
        },
        progress: function() {
            return this._progress;
        },
        add: function(t) {
            var n = this;
            t && !this.options.disabled && (t.fileInput && !t.files ? this._getFileInputFiles(t.fileInput).always(function(e) {
                t.files = e, n._onAdd(null, t);
            }) : (t.files = e.makeArray(t.files), this._onAdd(null, t)));
        },
        send: function(t) {
            if (t && !this.options.disabled) {
                if (t.fileInput && !t.files) {
                    var n, r, i = this, s = e.Deferred(), o = s.promise();
                    return o.abort = function() {
                        return r = !0, n ? n.abort() : (s.reject(null, "abort", "abort"), o);
                    }, this._getFileInputFiles(t.fileInput).always(function(e) {
                        if (!r) {
                            if (!e.length) return s.reject(), void 0;
                            t.files = e, n = i._onSend(null, t).then(function(e, t, n) {
                                s.resolve(e, t, n);
                            }, function(e, t, n) {
                                s.reject(e, t, n);
                            });
                        }
                    }), this._enhancePromise(o);
                }
                if (t.files = e.makeArray(t.files), t.files.length) return this._onSend(null, t);
            }
            return this._getXHRPromise(!1, t && t.context);
        }
    });
}), function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define([ "jquery", "./jquery.fileupload" ], e) : e(window.jQuery);
}(function(e) {
    "use strict";
    var t = e.blueimp.fileupload.prototype.options.add;
    e.widget("blueimp.fileupload", e.blueimp.fileupload, {
        options: {
            processQueue: [],
            add: function(n, r) {
                var i = e(this);
                r.process(function() {
                    return i.fileupload("process", r);
                }), t.call(this, n, r);
            }
        },
        processActions: {},
        _processFile: function(t) {
            var n = this, r = e.Deferred().resolveWith(n, [ t ]), i = r.promise();
            return this._trigger("process", null, t), e.each(t.processQueue, function(e, t) {
                var r = function(e) {
                    return n.processActions[t.action].call(n, e, t);
                };
                i = i.pipe(r, t.always && r);
            }), i.done(function() {
                n._trigger("processdone", null, t), n._trigger("processalways", null, t);
            }).fail(function() {
                n._trigger("processfail", null, t), n._trigger("processalways", null, t);
            }), i;
        },
        _transformProcessQueue: function(t) {
            var n = [];
            e.each(t.processQueue, function() {
                var r = {}, i = this.action, s = this.prefix === !0 ? i : this.prefix;
                e.each(this, function(n, i) {
                    r[n] = "string" === e.type(i) && "@" === i.charAt(0) ? t[i.slice(1) || (s ? s + n.charAt(0).toUpperCase() + n.slice(1) : n)] : i;
                }), n.push(r);
            }), t.processQueue = n;
        },
        processing: function() {
            return this._processing;
        },
        process: function(t) {
            var n = this, r = e.extend({}, this.options, t);
            return r.processQueue && r.processQueue.length && (this._transformProcessQueue(r), 0 === this._processing && this._trigger("processstart"), e.each(t.files, function(t) {
                var i = t ? e.extend({}, r) : r, s = function() {
                    return n._processFile(i);
                };
                i.index = t, n._processing += 1, n._processingQueue = n._processingQueue.pipe(s, s).always(function() {
                    n._processing -= 1, 0 === n._processing && n._trigger("processstop");
                });
            })), this._processingQueue;
        },
        _create: function() {
            this._super(), this._processing = 0, this._processingQueue = e.Deferred().resolveWith(this).promise();
        }
    });
}), function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define([ "jquery", "load-image", "load-image-meta", "load-image-exif", "load-image-ios", "canvas-to-blob", "./jquery.fileupload-process" ], e) : e(window.jQuery, window.loadImage);
}(function(e, t) {
    "use strict";
    e.blueimp.fileupload.prototype.options.processQueue.unshift({
        action: "loadImageMetaData",
        disableImageHead: "@",
        disableExif: "@",
        disableExifThumbnail: "@",
        disableExifSub: "@",
        disableExifGps: "@",
        disabled: "@disableImageMetaDataLoad"
    }, {
        action: "loadImage",
        prefix: !0,
        fileTypes: "@",
        maxFileSize: "@",
        noRevoke: "@",
        disabled: "@disableImageLoad"
    }, {
        action: "resizeImage",
        prefix: "image",
        maxWidth: "@",
        maxHeight: "@",
        minWidth: "@",
        minHeight: "@",
        crop: "@",
        disabled: "@disableImageResize"
    }, {
        action: "saveImage",
        disabled: "@disableImageResize"
    }, {
        action: "saveImageMetaData",
        disabled: "@disableImageMetaDataSave"
    }, {
        action: "resizeImage",
        prefix: "preview",
        maxWidth: "@",
        maxHeight: "@",
        minWidth: "@",
        minHeight: "@",
        crop: "@",
        orientation: "@",
        thumbnail: "@",
        canvas: "@",
        disabled: "@disableImagePreview"
    }, {
        action: "setImage",
        name: "@imagePreviewName",
        disabled: "@disableImagePreview"
    }), e.widget("blueimp.fileupload", e.blueimp.fileupload, {
        options: {
            loadImageFileTypes: /^image\/(gif|jpeg|png)$/,
            loadImageMaxFileSize: 1e7,
            imageMaxWidth: 1920,
            imageMaxHeight: 1080,
            imageCrop: !1,
            disableImageResize: !0,
            previewMaxWidth: 80,
            previewMaxHeight: 80,
            previewOrientation: !0,
            previewThumbnail: !0,
            previewCrop: !1,
            previewCanvas: !0
        },
        processActions: {
            loadImage: function(n, r) {
                if (r.disabled) return n;
                var i = this, s = n.files[n.index], o = e.Deferred();
                return "number" === e.type(r.maxFileSize) && s.size > r.maxFileSize || r.fileTypes && !r.fileTypes.test(s.type) || !t(s, function(e) {
                    e.src && (n.img = e), o.resolveWith(i, [ n ]);
                }, r) ? n : o.promise();
            },
            resizeImage: function(n, r) {
                if (r.disabled) return n;
                var i, s, o, u = this, f = e.Deferred(), l = function(e) {
                    n[e.getContext ? "canvas" : "img"] = e, f.resolveWith(u, [ n ]);
                };
                return r = e.extend({
                    canvas: !0
                }, r), n.exif && (r.orientation === !0 && (r.orientation = n.exif.get("Orientation")), r.thumbnail && (i = n.exif.get("Thumbnail"))) ? (t(i, l, r), f.promise()) : (s = r.canvas && n.canvas || n.img, s && (o = t.scale(s, r), o.width !== s.width || o.height !== s.height) ? (l(o), f.promise()) : n);
            },
            saveImage: function(t, n) {
                if (!t.canvas || n.disabled) return t;
                var r = this, i = t.files[t.index], s = i.name, o = e.Deferred(), u = function(e) {
                    e.name || (i.type === e.type ? e.name = i.name : i.name && (e.name = i.name.replace(/\..+$/, "." + e.type.substr(6)))), t.files[t.index] = e, o.resolveWith(r, [ t ]);
                };
                if (t.canvas.mozGetAsFile) u(t.canvas.mozGetAsFile(/^image\/(jpeg|png)$/.test(i.type) && s || (s && s.replace(/\..+$/, "") || "blob") + ".png", i.type)); else {
                    if (!t.canvas.toBlob) return t;
                    t.canvas.toBlob(u, i.type);
                }
                return o.promise();
            },
            loadImageMetaData: function(n, r) {
                if (r.disabled) return n;
                var i = this, s = e.Deferred();
                return t.parseMetaData(n.files[n.index], function(t) {
                    e.extend(n, t), s.resolveWith(i, [ n ]);
                }, r), s.promise();
            },
            saveImageMetaData: function(e, t) {
                if (!(e.imageHead && e.canvas && e.canvas.toBlob) || t.disabled) return e;
                var n = e.files[e.index], r = new Blob([ e.imageHead, this._blobSlice.call(n, 20) ], {
                    type: n.type
                });
                return r.name = n.name, e.files[e.index] = r, e;
            },
            setImage: function(e, t) {
                var n = e.canvas || e.img;
                return n && !t.disabled && (e.files[e.index][t.name || "preview"] = n), e;
            }
        }
    });
}), function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define([ "jquery", "load-image", "./jquery.fileupload-process" ], e) : e(window.jQuery, window.loadImage);
}(function(e, t) {
    "use strict";
    e.blueimp.fileupload.prototype.options.processQueue.unshift({
        action: "loadAudio",
        prefix: !0,
        fileTypes: "@",
        maxFileSize: "@",
        disabled: "@disableAudioPreview"
    }, {
        action: "setAudio",
        name: "@audioPreviewName",
        disabled: "@disableAudioPreview"
    }), e.widget("blueimp.fileupload", e.blueimp.fileupload, {
        options: {
            loadAudioFileTypes: /^audio\/.*$/
        },
        _audioElement: document.createElement("audio"),
        processActions: {
            loadAudio: function(n, r) {
                if (r.disabled) return n;
                var i, s, o = n.files[n.index];
                return this._audioElement.canPlayType && this._audioElement.canPlayType(o.type) && ("number" !== e.type(r.maxFileSize) || o.size <= r.maxFileSize) && (!r.fileTypes || r.fileTypes.test(o.type)) && (i = t.createObjectURL(o)) ? (s = this._audioElement.cloneNode(!1), s.src = i, s.controls = !0, n.audio = s, n) : n;
            },
            setAudio: function(e, t) {
                return e.audio && !t.disabled && (e.files[e.index][t.name || "preview"] = e.audio), e;
            }
        }
    });
}), function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define([ "jquery", "./jquery.fileupload-process" ], e) : e(window.jQuery);
}(function(e) {
    "use strict";
    e.blueimp.fileupload.prototype.options.processQueue.push({
        action: "validate",
        always: !0,
        acceptFileTypes: "@",
        maxFileSize: "@",
        minFileSize: "@",
        maxNumberOfFiles: "@",
        disabled: "@disableValidation"
    }), e.widget("blueimp.fileupload", e.blueimp.fileupload, {
        options: {
            getNumberOfFiles: e.noop,
            messages: {
                maxNumberOfFiles: "Maximum number of files exceeded",
                acceptFileTypes: "File type not allowed",
                maxFileSize: "File is too large",
                minFileSize: "File is too small"
            }
        },
        processActions: {
            validate: function(t, n) {
                if (n.disabled) return t;
                var r = e.Deferred(), i = this.options, s = t.files[t.index], o = i.getNumberOfFiles();
                return o && "number" === e.type(n.maxNumberOfFiles) && o + t.files.length > n.maxNumberOfFiles ? s.error = i.i18n("maxNumberOfFiles") : !n.acceptFileTypes || n.acceptFileTypes.test(s.type) || n.acceptFileTypes.test(s.name) ? n.maxFileSize && s.size > n.maxFileSize ? s.error = i.i18n("maxFileSize") : "number" === e.type(s.size) && s.size < n.minFileSize ? s.error = i.i18n("minFileSize") : delete s.error : s.error = i.i18n("acceptFileTypes"), s.error || t.files.error ? (t.files.error = !0, r.rejectWith(this, [ t ])) : r.resolveWith(this, [ t ]), r.promise();
            }
        }
    });
});

(function(e, t, n) {
    (function(e) {
        "use strict";
        "function" == typeof define && define.amd ? define([ "jquery" ], e) : jQuery && !jQuery.fn.qtip && e(jQuery);
    })(function(r) {
        "use strict";
        function o(e, t, n, i) {
            this.id = n, this.target = e, this.tooltip = D, this.elements = {
                target: e
            }, this._id = V + "-" + n, this.timers = {
                img: {}
            }, this.options = t, this.plugins = {}, this.cache = {
                event: {},
                target: r(),
                disabled: _,
                attr: i,
                onTooltip: _,
                lastClass: ""
            }, this.rendered = this.destroyed = this.disabled = this.waiting = this.hiddenDuringWait = this.positioning = this.triggering = _;
        }
        function u(e) {
            return e === D || "object" !== r.type(e);
        }
        function a(e) {
            return !(r.isFunction(e) || e && e.attr || e.length || "object" === r.type(e) && (e.jquery || e.then));
        }
        function f(e) {
            var t, n, i, s;
            return u(e) ? _ : (u(e.metadata) && (e.metadata = {
                type: e.metadata
            }), "content" in e && (t = e.content, u(t) || t.jquery || t.done ? t = e.content = {
                text: n = a(t) ? _ : t
            } : n = t.text, "ajax" in t && (i = t.ajax, s = i && i.once !== _, delete t.ajax, t.text = function(e, t) {
                var o = n || r(this).attr(t.options.content.attr) || "Loading...", u = r.ajax(r.extend({}, i, {
                    context: t
                })).then(i.success, D, i.error).then(function(e) {
                    return e && s && t.set("content.text", e), e;
                }, function(e, n, r) {
                    t.destroyed || 0 === e.status || t.set("content.text", n + ": " + r);
                });
                return s ? o : (t.set("content.text", o), u);
            }), "title" in t && (u(t.title) || (t.button = t.title.button, t.title = t.title.text), a(t.title || _) && (t.title = _))), "position" in e && u(e.position) && (e.position = {
                my: e.position,
                at: e.position
            }), "show" in e && u(e.show) && (e.show = e.show.jquery ? {
                target: e.show
            } : e.show === M ? {
                ready: M
            } : {
                event: e.show
            }), "hide" in e && u(e.hide) && (e.hide = e.hide.jquery ? {
                target: e.hide
            } : {
                event: e.hide
            }), "style" in e && u(e.style) && (e.style = {
                classes: e.style
            }), r.each(X, function() {
                this.sanitize && this.sanitize(e);
            }), e);
        }
        function l(e, t) {
            for (var n, r = 0, i = e, s = t.split("."); i = i[s[r++]]; ) s.length > r && (n = i);
            return [ n || e, s.pop() ];
        }
        function c(e, t) {
            var n, r, i;
            for (n in this.checks) for (r in this.checks[n]) (i = RegExp(r, "i").exec(e)) && (t.push(i), ("builtin" === n || this.plugins[n]) && this.checks[n][r].apply(this.plugins[n] || this, t));
        }
        function h(e) {
            return K.concat("").join(e ? "-" + e + " " : " ");
        }
        function p(e, t) {
            return t > 0 ? setTimeout(r.proxy(e, this), t) : (e.call(this), n);
        }
        function d(e) {
            return this.tooltip.hasClass(nt) ? _ : (clearTimeout(this.timers.show), clearTimeout(this.timers.hide), this.timers.show = p.call(this, function() {
                this.toggle(M, e);
            }, this.options.show.delay), n);
        }
        function v(e) {
            if (this.tooltip.hasClass(nt)) return _;
            var t = r(e.relatedTarget), n = t.closest(Q)[0] === this.tooltip[0], i = t[0] === this.options.show.target[0];
            if (clearTimeout(this.timers.show), clearTimeout(this.timers.hide), this !== t[0] && "mouse" === this.options.position.target && n || this.options.hide.fixed && /mouse(out|leave|move)/.test(e.type) && (n || i)) try {
                e.preventDefault(), e.stopImmediatePropagation();
            } catch (s) {} else this.timers.hide = p.call(this, function() {
                this.toggle(_, e);
            }, this.options.hide.delay, this);
        }
        function m(e) {
            return this.tooltip.hasClass(nt) || !this.options.hide.inactive ? _ : (clearTimeout(this.timers.inactive), this.timers.inactive = p.call(this, function() {
                this.hide(e);
            }, this.options.hide.inactive), n);
        }
        function g(e) {
            this.rendered && this.tooltip[0].offsetWidth > 0 && this.reposition(e);
        }
        function y(e, n, i) {
            r(t.body).delegate(e, (n.split ? n : n.join(ft + " ")) + ft, function() {
                var e = C.api[r.attr(this, J)];
                e && !e.disabled && i.apply(e, arguments);
            });
        }
        function b(e, n, i) {
            var s, u, a, l, c, h = r(t.body), p = e[0] === t ? h : e, d = e.metadata ? e.metadata(i.metadata) : D, v = "html5" === i.metadata.type && d ? d[i.metadata.name] : D, m = e.data(i.metadata.name || "qtipopts");
            try {
                m = "string" == typeof m ? r.parseJSON(m) : m;
            } catch (g) {}
            if (l = r.extend(M, {}, C.defaults, i, "object" == typeof m ? f(m) : D, f(v || d)), u = l.position, l.id = n, "boolean" == typeof l.content.text) {
                if (a = e.attr(l.content.attr), l.content.attr === _ || !a) return _;
                l.content.text = a;
            }
            if (u.container.length || (u.container = h), u.target === _ && (u.target = p), l.show.target === _ && (l.show.target = p), l.show.solo === M && (l.show.solo = u.container.closest("body")), l.hide.target === _ && (l.hide.target = p), l.position.viewport === M && (l.position.viewport = u.container), u.container = u.container.eq(0), u.at = new L(u.at, M), u.my = new L(u.my), e.data(V)) if (l.overwrite) e.qtip("destroy", !0); else if (l.overwrite === _) return _;
            return e.attr($, n), l.suppress && (c = e.attr("title")) && e.removeAttr("title").attr(it, c).attr("title", ""), s = new o(e, l, n, !!a), e.data(V, s), e.one("remove.qtip-" + n + " removeqtip.qtip-" + n, function() {
                var e;
                (e = r(this).data(V)) && e.destroy();
            }), s;
        }
        function w(e) {
            return e.charAt(0).toUpperCase() + e.slice(1);
        }
        function E(e, t) {
            var r, i, o = t.charAt(0).toUpperCase() + t.slice(1), u = (t + " " + wt.join(o + " ") + o).split(" "), a = 0;
            if (bt[t]) return e.css(bt[t]);
            for (; r = u[a++]; ) if ((i = e.css(r)) !== n) return bt[t] = r, i;
        }
        function S(e, t) {
            return Math.ceil(parseFloat(E(e, t)));
        }
        function x(e, t) {
            this._ns = "tip", this.options = t, this.offset = t.offset, this.size = [ t.width, t.height ], this.init(this.qtip = e);
        }
        function T(e, t) {
            this.options = t, this._ns = "-modal", this.init(this.qtip = e);
        }
        function N(e) {
            this._ns = "ie6", this.init(this.qtip = e);
        }
        var C, k, L, A, O, M = !0, _ = !1, D = null, P = "x", H = "y", B = "width", j = "height", F = "top", I = "left", q = "bottom", R = "right", U = "center", z = "flipinvert", W = "shift", X = {}, V = "qtip", $ = "data-hasqtip", J = "data-qtip-id", K = [ "ui-widget", "ui-tooltip" ], Q = "." + V, G = "click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "), Y = V + "-fixed", Z = V + "-default", et = V + "-focus", tt = V + "-hover", nt = V + "-disabled", rt = "_replacedByqTip", it = "oldtitle", st = {
            ie: function() {
                for (var e = 3, n = t.createElement("div"); (n.innerHTML = "<!--[if gt IE " + ++e + "]><i></i><![endif]-->") && n.getElementsByTagName("i")[0]; ) ;
                return e > 4 ? e : 0 / 0;
            }(),
            iOS: parseFloat(("" + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [ 0, "" ])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) || _
        };
        k = o.prototype, k.render = function(e) {
            if (this.rendered || this.destroyed) return this;
            var t, n = this, i = this.options, s = this.cache, o = this.elements, u = i.content.text, a = i.content.title, f = i.content.button, l = i.position, c = ("." + this._id + " ", []);
            return r.attr(this.target[0], "aria-describedby", this._id), this.tooltip = o.tooltip = t = r("<div/>", {
                id: this._id,
                "class": [ V, Z, i.style.classes, V + "-pos-" + i.position.my.abbrev() ].join(" "),
                width: i.style.width || "",
                height: i.style.height || "",
                tracking: "mouse" === l.target && l.adjust.mouse,
                role: "alert",
                "aria-live": "polite",
                "aria-atomic": _,
                "aria-describedby": this._id + "-content",
                "aria-hidden": M
            }).toggleClass(nt, this.disabled).attr(J, this.id).data(V, this).appendTo(l.container).append(o.content = r("<div />", {
                "class": V + "-content",
                id: this._id + "-content",
                "aria-atomic": M
            })), this.rendered = -1, this.positioning = M, a && (this._createTitle(), r.isFunction(a) || c.push(this._updateTitle(a, _))), f && this._createButton(), r.isFunction(u) || c.push(this._updateContent(u, _)), this.rendered = M, this._setWidget(), r.each(X, function(e) {
                var t;
                "render" === this.initialize && (t = this(n)) && (n.plugins[e] = t);
            }), this._unassignEvents(), this._assignEvents(), r.when.apply(r, c).then(function() {
                n._trigger("render"), n.positioning = _, n.hiddenDuringWait || !i.show.ready && !e || n.toggle(M, s.event, _), n.hiddenDuringWait = _;
            }), C.api[this.id] = this, this;
        }, k.destroy = function(e) {
            function t() {
                if (!this.destroyed) {
                    this.destroyed = M;
                    var e = this.target, t = e.attr(it);
                    this.rendered && this.tooltip.stop(1, 0).find("*").remove().end().remove(), r.each(this.plugins, function() {
                        this.destroy && this.destroy();
                    }), clearTimeout(this.timers.show), clearTimeout(this.timers.hide), this._unassignEvents(), e.removeData(V).removeAttr(J).removeAttr("aria-describedby"), this.options.suppress && t && e.attr("title", t).removeAttr(it), this._unbind(e), this.options = this.elements = this.cache = this.timers = this.plugins = this.mouse = D, delete C.api[this.id];
                }
            }
            return this.destroyed ? this.target : (e !== M && this.rendered ? (this.tooltip.one("tooltiphidden", r.proxy(t, this)), !this.triggering && this.hide()) : t.call(this), this.target);
        }, A = k.checks = {
            builtin: {
                "^id$": function(e, t, n, i) {
                    var s = n === M ? C.nextid : n, o = V + "-" + s;
                    s !== _ && s.length > 0 && !r("#" + o).length ? (this._id = o, this.rendered && (this.tooltip[0].id = this._id, this.elements.content[0].id = this._id + "-content", this.elements.title[0].id = this._id + "-title")) : e[t] = i;
                },
                "^prerender": function(e, t, n) {
                    n && !this.rendered && this.render(this.options.show.ready);
                },
                "^content.text$": function(e, t, n) {
                    this._updateContent(n);
                },
                "^content.attr$": function(e, t, n, r) {
                    this.options.content.text === this.target.attr(r) && this._updateContent(this.target.attr(n));
                },
                "^content.title$": function(e, t, r) {
                    return r ? (r && !this.elements.title && this._createTitle(), this._updateTitle(r), n) : this._removeTitle();
                },
                "^content.button$": function(e, t, n) {
                    this._updateButton(n);
                },
                "^content.title.(text|button)$": function(e, t, n) {
                    this.set("content." + t, n);
                },
                "^position.(my|at)$": function(e, t, n) {
                    "string" == typeof n && (e[t] = new L(n, "at" === t));
                },
                "^position.container$": function(e, t, n) {
                    this.tooltip.appendTo(n);
                },
                "^show.ready$": function(e, t, n) {
                    n && (!this.rendered && this.render(M) || this.toggle(M));
                },
                "^style.classes$": function(e, t, n, r) {
                    this.tooltip.removeClass(r).addClass(n);
                },
                "^style.(width|height)": function(e, t, n) {
                    this.tooltip.css(t, n);
                },
                "^style.widget|content.title": function() {
                    this._setWidget();
                },
                "^style.def": function(e, t, n) {
                    this.tooltip.toggleClass(Z, !!n);
                },
                "^events.(render|show|move|hide|focus|blur)$": function(e, t, n) {
                    this.tooltip[(r.isFunction(n) ? "" : "un") + "bind"]("tooltip" + t, n);
                },
                "^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)": function() {
                    var e = this.options.position;
                    this.tooltip.attr("tracking", "mouse" === e.target && e.adjust.mouse), this._unassignEvents(), this._assignEvents();
                }
            }
        }, k.get = function(e) {
            if (this.destroyed) return this;
            var t = l(this.options, e.toLowerCase()), n = t[0][t[1]];
            return n.precedance ? n.string() : n;
        };
        var ot = /^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i, ut = /^prerender|show\.ready/i;
        k.set = function(e, t) {
            if (this.destroyed) return this;
            var i, o = this.rendered, u = _, a = this.options;
            return this.checks, "string" == typeof e ? (i = e, e = {}, e[i] = t) : e = r.extend({}, e), r.each(e, function(t, i) {
                if (!o && !ut.test(t)) return delete e[t], n;
                var f, c = l(a, t.toLowerCase());
                f = c[0][c[1]], c[0][c[1]] = i && i.nodeType ? r(i) : i, u = ot.test(t) || u, e[t] = [ c[0], c[1], i, f ];
            }), f(a), this.positioning = M, r.each(e, r.proxy(c, this)), this.positioning = _, this.rendered && this.tooltip[0].offsetWidth > 0 && u && this.reposition("mouse" === a.position.target ? D : this.cache.event), this;
        }, k._update = function(e, t) {
            var n = this, i = this.cache;
            return this.rendered && e ? (r.isFunction(e) && (e = e.call(this.elements.target, i.event, this) || ""), r.isFunction(e.then) ? (i.waiting = M, e.then(function(e) {
                return i.waiting = _, n._update(e, t);
            }, D, function(e) {
                return n._update(e, t);
            })) : e === _ || !e && "" !== e ? _ : (e.jquery && e.length > 0 ? t.children().detach().end().append(e.css({
                display: "block"
            })) : t.html(e), i.waiting = M, (r.fn.imagesLoaded ? t.imagesLoaded() : r.Deferred().resolve(r([]))).done(function(e) {
                i.waiting = _, e.length && n.rendered && n.tooltip[0].offsetWidth > 0 && n.reposition(i.event, !e.length);
            }).promise())) : _;
        }, k._updateContent = function(e, t) {
            this._update(e, this.elements.content, t);
        }, k._updateTitle = function(e, t) {
            this._update(e, this.elements.title, t) === _ && this._removeTitle(_);
        }, k._createTitle = function() {
            var e = this.elements, t = this._id + "-title";
            e.titlebar && this._removeTitle(), e.titlebar = r("<div />", {
                "class": V + "-titlebar " + (this.options.style.widget ? h("header") : "")
            }).append(e.title = r("<div />", {
                id: t,
                "class": V + "-title",
                "aria-atomic": M
            })).insertBefore(e.content).delegate(".qtip-close", "mousedown keydown mouseup keyup mouseout", function(e) {
                r(this).toggleClass("ui-state-active ui-state-focus", "down" === e.type.substr(-4));
            }).delegate(".qtip-close", "mouseover mouseout", function(e) {
                r(this).toggleClass("ui-state-hover", "mouseover" === e.type);
            }), this.options.content.button && this._createButton();
        }, k._removeTitle = function(e) {
            var t = this.elements;
            t.title && (t.titlebar.remove(), t.titlebar = t.title = t.button = D, e !== _ && this.reposition());
        }, k.reposition = function(n, i) {
            if (!this.rendered || this.positioning || this.destroyed) return this;
            this.positioning = M;
            var s, o, u = this.cache, a = this.tooltip, f = this.options.position, l = f.target, c = f.my, h = f.at, p = f.viewport, d = f.container, v = f.adjust, m = v.method.split(" "), g = a.outerWidth(_), y = a.outerHeight(_), b = 0, w = 0, E = a.css("position"), S = {
                left: 0,
                top: 0
            }, x = a[0].offsetWidth > 0, T = n && "scroll" === n.type, N = r(e), C = d[0].ownerDocument, k = this.mouse;
            if (r.isArray(l) && 2 === l.length) h = {
                x: I,
                y: F
            }, S = {
                left: l[0],
                top: l[1]
            }; else if ("mouse" === l) h = {
                x: I,
                y: F
            }, !k || !k.pageX || !v.mouse && n && n.pageX ? n && n.pageX || (!n || "resize" !== n.type && "scroll" !== n.type ? (!v.mouse || this.options.show.distance) && u.origin && u.origin.pageX && (n = u.origin) : n = u.event) : n = k, "static" !== E && (S = d.offset()), C.body.offsetWidth !== (e.innerWidth || C.documentElement.clientWidth) && (o = r(t.body).offset()), S = {
                left: n.pageX - S.left + (o && o.left || 0),
                top: n.pageY - S.top + (o && o.top || 0)
            }, v.mouse && T && (S.left -= (k.scrollX || 0) - N.scrollLeft(), S.top -= (k.scrollY || 0) - N.scrollTop()); else {
                if ("event" === l && n && n.target && "scroll" !== n.type && "resize" !== n.type ? u.target = r(n.target) : "event" !== l && (u.target = r(l.jquery ? l : this.elements.target)), l = u.target, l = r(l).eq(0), 0 === l.length) return this;
                l[0] === t || l[0] === e ? (b = st.iOS ? e.innerWidth : l.width(), w = st.iOS ? e.innerHeight : l.height(), l[0] === e && (S = {
                    top: (p || l).scrollTop(),
                    left: (p || l).scrollLeft()
                })) : X.imagemap && l.is("area") ? s = X.imagemap(this, l, h, X.viewport ? m : _) : X.svg && l[0].ownerSVGElement ? s = X.svg(this, l, h, X.viewport ? m : _) : (b = l.outerWidth(_), w = l.outerHeight(_), S = l.offset()), s && (b = s.width, w = s.height, o = s.offset, S = s.position), S = this.reposition.offset(l, S, d), (st.iOS > 3.1 && 4.1 > st.iOS || st.iOS >= 4.3 && 4.33 > st.iOS || !st.iOS && "fixed" === E) && (S.left -= N.scrollLeft(), S.top -= N.scrollTop()), (!s || s && s.adjustable !== _) && (S.left += h.x === R ? b : h.x === U ? b / 2 : 0, S.top += h.y === q ? w : h.y === U ? w / 2 : 0);
            }
            return S.left += v.x + (c.x === R ? -g : c.x === U ? -g / 2 : 0), S.top += v.y + (c.y === q ? -y : c.y === U ? -y / 2 : 0), X.viewport ? (S.adjusted = X.viewport(this, S, f, b, w, g, y), o && S.adjusted.left && (S.left += o.left), o && S.adjusted.top && (S.top += o.top)) : S.adjusted = {
                left: 0,
                top: 0
            }, this._trigger("move", [ S, p.elem || p ], n) ? (delete S.adjusted, i === _ || !x || isNaN(S.left) || isNaN(S.top) || "mouse" === l || !r.isFunction(f.effect) ? a.css(S) : r.isFunction(f.effect) && (f.effect.call(a, this, r.extend({}, S)), a.queue(function(e) {
                r(this).css({
                    opacity: "",
                    height: ""
                }), st.ie && this.style.removeAttribute("filter"), e();
            })), this.positioning = _, this) : this;
        }, k.reposition.offset = function(e, n, i) {
            function s(e, t) {
                n.left += t * e.scrollLeft(), n.top += t * e.scrollTop();
            }
            if (!i[0]) return n;
            var o, u, a, f, l = r(e[0].ownerDocument), c = !!st.ie && "CSS1Compat" !== t.compatMode, h = i[0];
            do "static" !== (u = r.css(h, "position")) && ("fixed" === u ? (a = h.getBoundingClientRect(), s(l, -1)) : (a = r(h).position(), a.left += parseFloat(r.css(h, "borderLeftWidth")) || 0, a.top += parseFloat(r.css(h, "borderTopWidth")) || 0), n.left -= a.left + (parseFloat(r.css(h, "marginLeft")) || 0), n.top -= a.top + (parseFloat(r.css(h, "marginTop")) || 0), o || "hidden" === (f = r.css(h, "overflow")) || "visible" === f || (o = r(h))); while (h = h.offsetParent);
            return o && (o[0] !== l[0] || c) && s(o, 1), n;
        };
        var at = (L = k.reposition.Corner = function(e, t) {
            e = ("" + e).replace(/([A-Z])/, " $1").replace(/middle/gi, U).toLowerCase(), this.x = (e.match(/left|right/i) || e.match(/center/) || [ "inherit" ])[0].toLowerCase(), this.y = (e.match(/top|bottom|center/i) || [ "inherit" ])[0].toLowerCase(), this.forceY = !!t;
            var n = e.charAt(0);
            this.precedance = "t" === n || "b" === n ? H : P;
        }).prototype;
        at.invert = function(e, t) {
            this[e] = this[e] === I ? R : this[e] === R ? I : t || this[e];
        }, at.string = function() {
            var e = this.x, t = this.y;
            return e === t ? e : this.precedance === H || this.forceY && "center" !== t ? t + " " + e : e + " " + t;
        }, at.abbrev = function() {
            var e = this.string().split(" ");
            return e[0].charAt(0) + (e[1] && e[1].charAt(0) || "");
        }, at.clone = function() {
            return new L(this.string(), this.forceY);
        }, k.toggle = function(e, n) {
            var i = this.cache, s = this.options, o = this.tooltip;
            if (n) {
                if (/over|enter/.test(n.type) && /out|leave/.test(i.event.type) && s.show.target.add(n.target).length === s.show.target.length && o.has(n.relatedTarget).length) return this;
                i.event = r.extend({}, n);
            }
            if (this.waiting && !e && (this.hiddenDuringWait = M), !this.rendered) return e ? this.render(1) : this;
            if (this.destroyed || this.disabled) return this;
            var u, a, f, l = e ? "show" : "hide", c = this.options[l], h = (this.options[e ? "hide" : "show"], this.options.position), p = this.options.content, d = this.tooltip.css("width"), v = this.tooltip[0].offsetWidth > 0, m = e || 1 === c.target.length, g = !n || 2 > c.target.length || i.target[0] === n.target;
            return (typeof e).search("boolean|number") && (e = !v), u = !o.is(":animated") && v === e && g, a = u ? D : !!this._trigger(l, [ 90 ]), a !== _ && e && this.focus(n), !a || u ? this : (r.attr(o[0], "aria-hidden", !e), e ? (i.origin = r.extend({}, this.mouse), r.isFunction(p.text) && this._updateContent(p.text, _), r.isFunction(p.title) && this._updateTitle(p.title, _), !O && "mouse" === h.target && h.adjust.mouse && (r(t).bind("mousemove." + V, this._storeMouse), O = M), d || o.css("width", o.outerWidth(_)), this.reposition(n, arguments[2]), d || o.css("width", ""), c.solo && ("string" == typeof c.solo ? r(c.solo) : r(Q, c.solo)).not(o).not(c.target).qtip("hide", r.Event("tooltipsolo"))) : (clearTimeout(this.timers.show), delete i.origin, O && !r(Q + '[tracking="true"]:visible', c.solo).not(o).length && (r(t).unbind("mousemove." + V), O = _), this.blur(n)), f = r.proxy(function() {
                e ? (st.ie && o[0].style.removeAttribute("filter"), o.css("overflow", ""), "string" == typeof c.autofocus && r(this.options.show.autofocus, o).focus(), this.options.show.target.trigger("qtip-" + this.id + "-inactive")) : o.css({
                    display: "",
                    visibility: "",
                    opacity: "",
                    left: "",
                    top: ""
                }), this._trigger(e ? "visible" : "hidden");
            }, this), c.effect === _ || m === _ ? (o[l](), f()) : r.isFunction(c.effect) ? (o.stop(1, 1), c.effect.call(o, this), o.queue("fx", function(e) {
                f(), e();
            })) : o.fadeTo(90, e ? 1 : 0, f), e && c.target.trigger("qtip-" + this.id + "-inactive"), this);
        }, k.show = function(e) {
            return this.toggle(M, e);
        }, k.hide = function(e) {
            return this.toggle(_, e);
        }, k.focus = function(e) {
            if (!this.rendered || this.destroyed) return this;
            var t = r(Q), n = this.tooltip, i = parseInt(n[0].style.zIndex, 10), s = C.zindex + t.length;
            return n.hasClass(et) || this._trigger("focus", [ s ], e) && (i !== s && (t.each(function() {
                this.style.zIndex > i && (this.style.zIndex = this.style.zIndex - 1);
            }), t.filter("." + et).qtip("blur", e)), n.addClass(et)[0].style.zIndex = s), this;
        }, k.blur = function(e) {
            return !this.rendered || this.destroyed ? this : (this.tooltip.removeClass(et), this._trigger("blur", [ this.tooltip.css("zIndex") ], e), this);
        }, k.disable = function(e) {
            return this.destroyed ? this : ("boolean" != typeof e && (e = this.rendered ? !this.tooltip.hasClass(nt) : !this.disabled), this.rendered && this.tooltip.toggleClass(nt, e).attr("aria-disabled", e), this.disabled = !!e, this);
        }, k.enable = function() {
            return this.disable(_);
        }, k._createButton = function() {
            var e = this, t = this.elements, n = t.tooltip, i = this.options.content.button, s = "string" == typeof i, o = s ? i : "Close tooltip";
            t.button && t.button.remove(), t.button = i.jquery ? i : r("<a />", {
                "class": "qtip-close " + (this.options.style.widget ? "" : V + "-icon"),
                title: o,
                "aria-label": o
            }).prepend(r("<span />", {
                "class": "ui-icon ui-icon-close",
                html: "&times;"
            })), t.button.appendTo(t.titlebar || n).attr("role", "button").click(function(t) {
                return n.hasClass(nt) || e.hide(t), _;
            });
        }, k._updateButton = function(e) {
            if (!this.rendered) return _;
            var t = this.elements.button;
            e ? this._createButton() : t.remove();
        }, k._setWidget = function() {
            var e = this.options.style.widget, t = this.elements, n = t.tooltip, r = n.hasClass(nt);
            n.removeClass(nt), nt = e ? "ui-state-disabled" : "qtip-disabled", n.toggleClass(nt, r), n.toggleClass("ui-helper-reset " + h(), e).toggleClass(Z, this.options.style.def && !e), t.content && t.content.toggleClass(h("content"), e), t.titlebar && t.titlebar.toggleClass(h("header"), e), t.button && t.button.toggleClass(V + "-icon", !e);
        }, k._storeMouse = function(n) {
            this.mouse = {
                pageX: n.pageX,
                pageY: n.pageY,
                type: "mousemove",
                scrollX: e.pageXOffset || t.body.scrollLeft || t.documentElement.scrollLeft,
                scrollY: e.pageYOffset || t.body.scrollTop || t.documentElement.scrollTop
            };
        }, k._bind = function(e, t, n, i, s) {
            var o = "." + this._id + (i ? "-" + i : "");
            t.length && r(e).bind((t.split ? t : t.join(o + " ")) + o, r.proxy(n, s || this));
        }, k._unbind = function(e, t) {
            r(e).unbind("." + this._id + (t ? "-" + t : ""));
        };
        var ft = "." + V;
        r(function() {
            y(Q, [ "mouseenter", "mouseleave" ], function(e) {
                var t = "mouseenter" === e.type, n = r(e.currentTarget), i = r(e.relatedTarget || e.target), s = this.options;
                t ? (this.focus(e), n.hasClass(Y) && !n.hasClass(nt) && clearTimeout(this.timers.hide)) : "mouse" === s.position.target && s.hide.event && s.show.target && !i.closest(s.show.target[0]).length && this.hide(e), n.toggleClass(tt, t);
            }), y("[" + J + "]", G, m);
        }), k._trigger = function(e, t, n) {
            var i = r.Event("tooltip" + e);
            return i.originalEvent = n && r.extend({}, n) || this.cache.event || D, this.triggering = M, this.tooltip.trigger(i, [ this ].concat(t || [])), this.triggering = _, !i.isDefaultPrevented();
        }, k._assignInitialEvents = function(e) {
            function t(e) {
                return this.disabled ? _ : (this.cache.event = r.extend({}, e), this.cache.target = e ? r(e.target) : [ n ], clearTimeout(this.timers.show), this.timers.show = p.call(this, function() {
                    this.render("object" == typeof e || i.show.ready);
                }, i.show.delay), n);
            }
            var i = this.options, o = i.show.target, u = i.hide.target, a = i.show.event ? r.trim("" + i.show.event).split(" ") : [], f = i.hide.event ? r.trim("" + i.hide.event).split(" ") : [];
            /mouse(over|enter)/i.test(i.show.event) && !/mouse(out|leave)/i.test(i.hide.event) && f.push("mouseleave"), this._bind(o, "mousemove", function(e) {
                this._storeMouse(e), this.cache.onTarget = M;
            }), this._bind(o, a, t), i.show.event !== i.hide.event && this._bind(u, f, function() {
                clearTimeout(this.timers.show);
            }), (i.show.ready || i.prerender) && t.call(this, e);
        }, k._assignEvents = function() {
            var i = this, o = this.options, u = o.position, a = this.tooltip, f = o.show.target, l = o.hide.target, c = u.container, h = u.viewport, p = r(t), y = (r(t.body), r(e)), b = o.show.event ? r.trim("" + o.show.event).split(" ") : [], w = o.hide.event ? r.trim("" + o.hide.event).split(" ") : [], E = [];
            r.each(o.events, function(e, t) {
                i._bind(a, "toggle" === e ? [ "tooltipshow", "tooltiphide" ] : [ "tooltip" + e ], t, null, a);
            }), /mouse(out|leave)/i.test(o.hide.event) && "window" === o.hide.leave && this._bind(p, [ "mouseout", "blur" ], function(e) {
                /select|option/.test(e.target.nodeName) || e.relatedTarget || this.hide(e);
            }), o.hide.fixed ? l = l.add(a.addClass(Y)) : /mouse(over|enter)/i.test(o.show.event) && this._bind(l, "mouseleave", function() {
                clearTimeout(this.timers.show);
            }), ("" + o.hide.event).indexOf("unfocus") > -1 && this._bind(c.closest("html"), [ "mousedown", "touchstart" ], function(e) {
                var t = r(e.target), n = this.rendered && !this.tooltip.hasClass(nt) && this.tooltip[0].offsetWidth > 0, i = t.parents(Q).filter(this.tooltip[0]).length > 0;
                t[0] === this.target[0] || t[0] === this.tooltip[0] || i || this.target.has(t[0]).length || !n || this.hide(e);
            }), "number" == typeof o.hide.inactive && (this._bind(f, "qtip-" + this.id + "-inactive", m), this._bind(l.add(a), C.inactiveEvents, m, "-inactive")), w = r.map(w, function(e) {
                var t = r.inArray(e, b);
                return t > -1 && l.add(f).length === l.length ? (E.push(b.splice(t, 1)[0]), n) : e;
            }), this._bind(f, b, d), this._bind(l, w, v), this._bind(f, E, function(e) {
                (this.tooltip[0].offsetWidth > 0 ? v : d).call(this, e);
            }), this._bind(f.add(a), "mousemove", function(e) {
                if ("number" == typeof o.hide.distance) {
                    var t = this.cache.origin || {}, n = this.options.hide.distance, r = Math.abs;
                    (r(e.pageX - t.pageX) >= n || r(e.pageY - t.pageY) >= n) && this.hide(e);
                }
                this._storeMouse(e);
            }), "mouse" === u.target && u.adjust.mouse && (o.hide.event && this._bind(f, [ "mouseenter", "mouseleave" ], function(e) {
                this.cache.onTarget = "mouseenter" === e.type;
            }), this._bind(p, "mousemove", function(e) {
                this.rendered && this.cache.onTarget && !this.tooltip.hasClass(nt) && this.tooltip[0].offsetWidth > 0 && this.reposition(e);
            })), (u.adjust.resize || h.length) && this._bind(r.event.special.resize ? h : y, "resize", g), u.adjust.scroll && this._bind(y.add(u.container), "scroll", g);
        }, k._unassignEvents = function() {
            var n = [ this.options.show.target[0], this.options.hide.target[0], this.rendered && this.tooltip[0], this.options.position.container[0], this.options.position.viewport[0], this.options.position.container.closest("html")[0], e, t ];
            this._unbind(r([]).pushStack(r.grep(n, function(e) {
                return "object" == typeof e;
            })));
        }, C = r.fn.qtip = function(e, t, i) {
            var o = ("" + e).toLowerCase(), u = D, a = r.makeArray(arguments).slice(1), l = a[a.length - 1], c = this[0] ? r.data(this[0], V) : D;
            return !arguments.length && c || "api" === o ? c : "string" == typeof e ? (this.each(function() {
                var e = r.data(this, V);
                if (!e) return M;
                if (l && l.timeStamp && (e.cache.event = l), !t || "option" !== o && "options" !== o) e[o] && e[o].apply(e, a); else {
                    if (i === n && !r.isPlainObject(t)) return u = e.get(t), _;
                    e.set(t, i);
                }
            }), u !== D ? u : this) : "object" != typeof e && arguments.length ? n : (c = f(r.extend(M, {}, e)), this.each(function(e) {
                var t, i, o, u;
                return u = r.isArray(c.id) ? c.id[e] : c.id, u = !u || u === _ || 1 > u.length || C.api[u] ? C.nextid++ : u, i = ".qtip-" + u + "-create", o = b(r(this), u, c), o === _ ? M : (C.api[u] = o, t = o.options, r.each(X, function() {
                    "initialize" === this.initialize && this(o);
                }), o._assignInitialEvents(l), n);
            }));
        }, C.api = {}, r.each({
            attr: function(e, t) {
                if (this.length) {
                    var n = this[0], i = "title", s = r.data(n, "qtip");
                    if (e === i && s && "object" == typeof s && s.options.suppress) return 2 > arguments.length ? r.attr(n, it) : (s && s.options.content.attr === i && s.cache.attr && s.set("content.text", t), this.attr(it, t));
                }
                return r.fn["attr" + rt].apply(this, arguments);
            },
            clone: function(e) {
                var t = (r([]), r.fn["clone" + rt].apply(this, arguments));
                return e || t.filter("[" + it + "]").attr("title", function() {
                    return r.attr(this, it);
                }).removeAttr(it), t;
            }
        }, function(e, t) {
            if (!t || r.fn[e + rt]) return M;
            var n = r.fn[e + rt] = r.fn[e];
            r.fn[e] = function() {
                return t.apply(this, arguments) || n.apply(this, arguments);
            };
        }), r.ui || (r["cleanData" + rt] = r.cleanData, r.cleanData = function(e) {
            for (var t, n = 0; (t = r(e[n])).length; n++) if (t.attr($)) try {
                t.triggerHandler("removeqtip");
            } catch (i) {}
            r["cleanData" + rt].apply(this, arguments);
        }), C.version = "2.0.1-174", C.nextid = 0, C.inactiveEvents = G, C.zindex = 15e3, C.defaults = {
            prerender: _,
            id: _,
            overwrite: M,
            suppress: M,
            content: {
                text: M,
                attr: "title",
                title: _,
                button: _
            },
            position: {
                my: "top left",
                at: "bottom right",
                target: _,
                container: _,
                viewport: _,
                adjust: {
                    x: 0,
                    y: 0,
                    mouse: M,
                    scroll: M,
                    resize: M,
                    method: "flipinvert flipinvert"
                },
                effect: function(e, t) {
                    r(this).animate(t, {
                        duration: 200,
                        queue: _
                    });
                }
            },
            show: {
                target: _,
                event: "mouseenter",
                effect: M,
                delay: 90,
                solo: _,
                ready: _,
                autofocus: _
            },
            hide: {
                target: _,
                event: "mouseleave",
                effect: M,
                delay: 0,
                fixed: _,
                inactive: _,
                leave: "window",
                distance: _
            },
            style: {
                classes: "",
                widget: _,
                width: _,
                height: _,
                def: M
            },
            events: {
                render: D,
                move: D,
                show: D,
                hide: D,
                toggle: D,
                visible: D,
                hidden: D,
                focus: D,
                blur: D
            }
        };
        var lt, ct = "margin", ht = "border", pt = "color", dt = "background-color", vt = "transparent", mt = " !important", gt = !!t.createElement("canvas").getContext, yt = /rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i, bt = {}, wt = [ "Webkit", "O", "Moz", "ms" ];
        gt || (createVML = function(e, t, n) {
            return "<qtipvml:" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" ' + (t || "") + ' style="behavior: url(#default#VML); ' + (n || "") + '" />';
        }), r.extend(x.prototype, {
            init: function(e) {
                var t, n;
                n = this.element = e.elements.tip = r("<div />", {
                    "class": V + "-tip"
                }).prependTo(e.tooltip), gt ? (t = r("<canvas />").appendTo(this.element)[0].getContext("2d"), t.lineJoin = "miter", t.miterLimit = 1e5, t.save()) : (t = createVML("shape", 'coordorigin="0,0"', "position:absolute;"), this.element.html(t + t), e._bind(r("*", n).add(n), [ "click", "mousedown" ], function(e) {
                    e.stopPropagation();
                }, this._ns)), e._bind(e.tooltip, "tooltipmove", this.reposition, this._ns, this), this.create();
            },
            _swapDimensions: function() {
                this.size[0] = this.options.height, this.size[1] = this.options.width;
            },
            _resetDimensions: function() {
                this.size[0] = this.options.width, this.size[1] = this.options.height;
            },
            _useTitle: function(e) {
                var t = this.qtip.elements.titlebar;
                return t && (e.y === F || e.y === U && this.element.position().top + this.size[1] / 2 + this.options.offset < t.outerHeight(M));
            },
            _parseCorner: function(e) {
                var t = this.qtip.options.position.my;
                return e === _ || t === _ ? e = _ : e === M ? e = new L(t.string()) : e.string || (e = new L(e), e.fixed = M), e;
            },
            _parseWidth: function(e, t, n) {
                var r = this.qtip.elements, i = ht + w(t) + "Width";
                return (n ? S(n, i) : S(r.content, i) || S(this._useTitle(e) && r.titlebar || r.content, i) || S(r.tooltip, i)) || 0;
            },
            _parseRadius: function(e) {
                var t = this.qtip.elements, n = ht + w(e.y) + w(e.x) + "Radius";
                return 9 > st.ie ? 0 : S(this._useTitle(e) && t.titlebar || t.content, n) || S(t.tooltip, n) || 0;
            },
            _invalidColour: function(e, t, n) {
                var r = e.css(t);
                return !r || n && r === e.css(n) || yt.test(r) ? _ : r;
            },
            _parseColours: function(e) {
                var t = this.qtip.elements, n = this.element.css("cssText", ""), i = ht + w(e[e.precedance]) + w(pt), s = this._useTitle(e) && t.titlebar || t.content, o = this._invalidColour, u = [];
                return u[0] = o(n, dt) || o(s, dt) || o(t.content, dt) || o(t.tooltip, dt) || n.css(dt), u[1] = o(n, i, pt) || o(s, i, pt) || o(t.content, i, pt) || o(t.tooltip, i, pt) || t.tooltip.css(i), r("*", n).add(n).css("cssText", dt + ":" + vt + mt + ";" + ht + ":0" + mt + ";"), u;
            },
            _calculateSize: function(e) {
                var t, n, r, i = e.precedance === H, s = this.options.width, o = this.options.height, u = "c" === e.abbrev(), a = (i ? s : o) * (u ? .5 : 1), f = Math.pow, l = Math.round, c = Math.sqrt(f(a, 2) + f(o, 2)), h = [ this.border / a * c, this.border / o * c ];
                return h[2] = Math.sqrt(f(h[0], 2) - f(this.border, 2)), h[3] = Math.sqrt(f(h[1], 2) - f(this.border, 2)), t = c + h[2] + h[3] + (u ? 0 : h[0]), n = t / c, r = [ l(n * s), l(n * o) ], i ? r : r.reverse();
            },
            _calculateTip: function(e) {
                var t = this.size[0], n = this.size[1], r = Math.ceil(t / 2), i = Math.ceil(n / 2), s = {
                    br: [ 0, 0, t, n, t, 0 ],
                    bl: [ 0, 0, t, 0, 0, n ],
                    tr: [ 0, n, t, 0, t, n ],
                    tl: [ 0, 0, 0, n, t, n ],
                    tc: [ 0, n, r, 0, t, n ],
                    bc: [ 0, 0, t, 0, r, n ],
                    rc: [ 0, 0, t, i, 0, n ],
                    lc: [ t, 0, t, n, 0, i ]
                };
                return s.lt = s.br, s.rt = s.bl, s.lb = s.tr, s.rb = s.tl, s[e.abbrev()];
            },
            _drawCoords: function(e, t) {
                e.beginPath(), e.moveTo(t[0], t[1]), e.lineTo(t[2], t[3]), e.lineTo(t[4], t[5]), e.closePath();
            },
            create: function() {
                var e = this.corner = (gt || st.ie) && this._parseCorner(this.options.corner);
                return (this.enabled = !!this.corner && "c" !== this.corner.abbrev()) && (this.qtip.cache.corner = e.clone(), this.update()), this.element.toggle(this.enabled), this.corner;
            },
            update: function(e, t) {
                if (!this.enabled) return this;
                var n, i, s, o, u, a, f, l, c = (this.qtip.elements, this.element), h = c.children(), p = this.options, d = this.size, v = p.mimic, m = Math.round;
                e || (e = this.qtip.cache.corner || this.corner), v === _ ? v = e : (v = new L(v), v.precedance = e.precedance, "inherit" === v.x ? v.x = e.x : "inherit" === v.y ? v.y = e.y : v.x === v.y && (v[e.precedance] = e[e.precedance])), i = v.precedance, e.precedance === P ? this._swapDimensions() : this._resetDimensions(), n = this.color = this._parseColours(e), n[1] !== vt ? (l = this.border = this._parseWidth(e, e[e.precedance]), p.border && 1 > l && (n[0] = n[1]), this.border = l = p.border !== M ? p.border : l) : this.border = l = 0, o = this._calculateTip(v), f = this.size = this._calculateSize(e), c.css({
                    width: f[0],
                    height: f[1],
                    lineHeight: f[1] + "px"
                }), gt && (u = this._calculateTip(v)), a = e.precedance === H ? [ m(v.x === I ? l : v.x === R ? f[0] - d[0] - l : (f[0] - d[0]) / 2), m(v.y === F ? f[1] - d[1] : 0) ] : [ m(v.x === I ? f[0] - d[0] : 0), m(v.y === F ? l : v.y === q ? f[1] - d[1] - l : (f[1] - d[1]) / 2) ], gt ? (h.attr(B, f[0]).attr(j, f[1]), s = h[0].getContext("2d"), s.restore(), s.save(), s.clearRect(0, 0, 6e3, 6e3), this._drawCoords(s, u), s.fillStyle = n[1], s.fill(), s.translate(a[0], a[1]), this._drawCoords(s, o), s.fillStyle = n[0], s.fill()) : (o = "m" + o[0] + "," + o[1] + " l" + o[2] + "," + o[3] + " " + o[4] + "," + o[5] + " xe", a[2] = l && /^(r|b)/i.test(e.string()) ? 8 === st.ie ? 2 : 1 : 0, h.css({
                    coordsize: f[0] + l + " " + (f[1] + l),
                    antialias: "" + (v.string().indexOf(U) > -1),
                    left: a[0] - a[2] * Number(i === P),
                    top: a[1] - a[2] * Number(i === H),
                    width: f[0] + l,
                    height: f[1] + l
                }).each(function(e) {
                    var t = r(this);
                    t[t.prop ? "prop" : "attr"]({
                        coordsize: f[0] + l + " " + (f[1] + l),
                        path: o,
                        fillcolor: n[0],
                        filled: !!e,
                        stroked: !e
                    }).toggle(!!l || !!e), !e && t.html(createVML("stroke", 'weight="' + 2 * l + 'px" color="' + n[1] + '" miterlimit="1000" joinstyle="miter"'));
                })), t !== _ && this.calculate(e, f);
            },
            calculate: function(e, t) {
                if (!this.enabled) return _;
                var n, i, s = this, o = this.qtip.elements, u = this.element, a = this.options.offset, f = (o.tooltip.hasClass("ui-widget"), {});
                return e = e || this.corner, n = e.precedance, t = t || this._calculateSize(e), i = [ e.x, e.y ], n === P && i.reverse(), r.each(i, function(r, i) {
                    var u, l, c;
                    i === U ? (u = n === H ? I : F, f[u] = "50%", f[ct + "-" + u] = -Math.round(t[n === H ? 0 : 1] / 2) + a) : (u = s._parseWidth(e, i, o.tooltip), l = s._parseWidth(e, i, o.content), c = s._parseRadius(e), f[i] = Math.max(-s.border, r ? l : a + (c > u ? c : -u)));
                }), f[e[n]] -= t[n === P ? 0 : 1], u.css({
                    margin: "",
                    top: "",
                    bottom: "",
                    left: "",
                    right: ""
                }).css(f), f;
            },
            reposition: function(e, t, r) {
                function i(e, t, n, r, i) {
                    e === W && l.precedance === t && c[r] && l[n] !== U ? l.precedance = l.precedance === P ? H : P : e !== W && c[r] && (l[t] = l[t] === U ? c[r] > 0 ? r : i : l[t] === r ? i : r);
                }
                function o(e, t, i) {
                    l[e] === U ? m[ct + "-" + t] = v[e] = u[ct + "-" + t] - c[t] : (a = u[i] !== n ? [ c[t], -u[t] ] : [ -c[t], u[t] ], (v[e] = Math.max(a[0], a[1])) > a[0] && (r[t] -= c[t], v[t] = _), m[u[i] !== n ? i : t] = v[e]);
                }
                if (this.enabled) {
                    var u, a, f = t.cache, l = this.corner.clone(), c = r.adjusted, h = t.options.position.adjust.method.split(" "), p = h[0], d = h[1] || h[0], v = {
                        left: _,
                        top: _,
                        x: 0,
                        y: 0
                    }, m = {};
                    this.corner.fixed !== M && (i(p, P, H, I, R), i(d, H, P, F, q), l.string() === f.corner.string() || f.cornerTop === c.top && f.cornerLeft === c.left || this.update(l, _)), u = this.calculate(l), u.right !== n && (u.left = -u.right), u.bottom !== n && (u.top = -u.bottom), u.user = this.offset, (v.left = p === W && !!c.left) && o(P, I, R), (v.top = d === W && !!c.top) && o(H, F, q), this.element.css(m).toggle(!(v.x && v.y || l.x === U && v.y || l.y === U && v.x)), r.left -= u.left.charAt ? u.user : p !== W || v.top || !v.left && !v.top ? u.left + this.border : 0, r.top -= u.top.charAt ? u.user : d !== W || v.left || !v.left && !v.top ? u.top + this.border : 0, f.cornerLeft = c.left, f.cornerTop = c.top, f.corner = l.clone();
                }
            },
            destroy: function() {
                this.qtip._unbind(this.qtip.tooltip, this._ns), this.qtip.elements.tip && this.qtip.elements.tip.find("*").remove().end().remove();
            }
        }), lt = X.tip = function(e) {
            return new x(e, e.options.style.tip);
        }, lt.initialize = "render", lt.sanitize = function(e) {
            if (e.style && "tip" in e.style) {
                var t = e.style.tip;
                "object" != typeof t && (t = e.style.tip = {
                    corner: t
                }), /string|boolean/i.test(typeof t.corner) || (t.corner = M);
            }
        }, A.tip = {
            "^position.my|style.tip.(corner|mimic|border)$": function() {
                this.create(), this.qtip.reposition();
            },
            "^style.tip.(height|width)$": function(e) {
                this.size = [ e.width, e.height ], this.update(), this.qtip.reposition();
            },
            "^content.title|style.(classes|widget)$": function() {
                this.update();
            }
        }, r.extend(M, C.defaults, {
            style: {
                tip: {
                    corner: M,
                    mimic: _,
                    width: 6,
                    height: 6,
                    border: M,
                    offset: 0
                }
            }
        });
        var Et, St, xt = "qtip-modal", Tt = "." + xt;
        St = function() {
            function n(e) {
                if (r.expr[":"].focusable) return r.expr[":"].focusable;
                var t, n, i, s = !isNaN(r.attr(e, "tabindex")), o = e.nodeName && e.nodeName.toLowerCase();
                return "area" === o ? (t = e.parentNode, n = t.name, e.href && n && "map" === t.nodeName.toLowerCase() ? (i = r("img[usemap=#" + n + "]")[0], !!i && i.is(":visible")) : !1) : /input|select|textarea|button|object/.test(o) ? !e.disabled : "a" === o ? e.href || s : s;
            }
            function i(e) {
                1 > c.length && e.length ? e.not("body").blur() : c.first().focus();
            }
            function s(e) {
                if (f.is(":visible")) {
                    var t, n = r(e.target), s = o.tooltip, a = n.closest(Q);
                    t = 1 > a.length ? _ : parseInt(a[0].style.zIndex, 10) > parseInt(s[0].style.zIndex, 10), t || n.closest(Q)[0] === s[0] || i(n), u = e.target === c[c.length - 1];
                }
            }
            var o, u, a, f, l = this, c = {};
            r.extend(l, {
                init: function() {
                    function n() {
                        var t = r(e);
                        f.css({
                            height: t.height(),
                            width: t.width()
                        });
                    }
                    return f = l.elem = r("<div />", {
                        id: "qtip-overlay",
                        html: "<div></div>",
                        mousedown: function() {
                            return _;
                        }
                    }).hide(), r(e).bind("resize" + Tt, n), n(), r(t.body).bind("focusin" + Tt, s), r(t).bind("keydown" + Tt, function(e) {
                        o && o.options.show.modal.escape && 27 === e.keyCode && o.hide(e);
                    }), f.bind("click" + Tt, function(e) {
                        o && o.options.show.modal.blur && o.hide(e);
                    }), l;
                },
                update: function(e) {
                    o = e, c = e.options.show.modal.stealfocus !== _ ? e.tooltip.find("*").filter(function() {
                        return n(this);
                    }) : [];
                },
                toggle: function(e, n, s) {
                    var u = (r(t.body), e.tooltip), c = e.options.show.modal, h = c.effect, p = n ? "show" : "hide", d = f.is(":visible"), v = r(Tt).filter(":visible:not(:animated)").not(u);
                    return l.update(e), n && c.stealfocus !== _ && i(r(":focus")), f.toggleClass("blurs", c.blur), n && f.css({
                        left: 0,
                        top: 0
                    }).appendTo(t.body), f.is(":animated") && d === n && a !== _ || !n && v.length ? l : (f.stop(M, _), r.isFunction(h) ? h.call(f, n) : h === _ ? f[p]() : f.fadeTo(parseInt(s, 10) || 90, n ? 1 : 0, function() {
                        n || f.hide();
                    }), n || f.queue(function(e) {
                        f.css({
                            left: "",
                            top: ""
                        }), r(Tt).length || f.detach(), e();
                    }), a = n, o.destroyed && (o = D), l);
                }
            }), l.init();
        }, St = new St, r.extend(T.prototype, {
            init: function(e) {
                var t = e.tooltip;
                return this.options.on ? (e.elements.overlay = St.elem, t.addClass(xt).css("z-index", C.modal_zindex + r(Tt).length), e._bind(t, [ "tooltipshow", "tooltiphide" ], function(e, n, i) {
                    var s = e.originalEvent;
                    if (e.target === t[0]) if (s && "tooltiphide" === e.type && /mouse(leave|enter)/.test(s.type) && r(s.relatedTarget).closest(overlay[0]).length) try {
                        e.preventDefault();
                    } catch (o) {} else (!s || s && !s.solo) && this.toggle(e, "tooltipshow" === e.type, i);
                }, this._ns, this), e._bind(t, "tooltipfocus", function(e, n) {
                    if (!e.isDefaultPrevented() && e.target === t[0]) {
                        var i = r(Tt), s = C.modal_zindex + i.length, o = parseInt(t[0].style.zIndex, 10);
                        St.elem[0].style.zIndex = s - 1, i.each(function() {
                            this.style.zIndex > o && (this.style.zIndex -= 1);
                        }), i.filter("." + et).qtip("blur", e.originalEvent), t.addClass(et)[0].style.zIndex = s, St.update(n);
                        try {
                            e.preventDefault();
                        } catch (u) {}
                    }
                }, this._ns, this), e._bind(t, "tooltiphide", function(e) {
                    e.target === t[0] && r(Tt).filter(":visible").not(t).last().qtip("focus", e);
                }, this._ns, this), n) : this;
            },
            toggle: function(e, t, r) {
                return e && e.isDefaultPrevented() ? this : (St.toggle(this.qtip, !!t, r), n);
            },
            destroy: function() {
                this.qtip.tooltip.removeClass(xt), this.qtip._unbind(this.qtip.tooltip, this._ns), St.toggle(this.qtip, _), delete this.qtip.elements.overlay;
            }
        }), Et = X.modal = function(e) {
            return new T(e, e.options.show.modal);
        }, Et.sanitize = function(e) {
            e.show && ("object" != typeof e.show.modal ? e.show.modal = {
                on: !!e.show.modal
            } : e.show.modal.on === n && (e.show.modal.on = M));
        }, C.modal_zindex = C.zindex - 200, Et.initialize = "render", A.modal = {
            "^show.modal.(on|blur)$": function() {
                this.destroy(), this.init(), this.qtip.elems.overlay.toggle(this.qtip.tooltip[0].offsetWidth > 0);
            }
        }, r.extend(M, C.defaults, {
            show: {
                modal: {
                    on: _,
                    effect: M,
                    blur: M,
                    stealfocus: M,
                    escape: M
                }
            }
        }), X.viewport = function(n, r, i, s, o, u, a) {
            function f(e, t, n, i, s, o, u, a, f) {
                var l = r[s], h = v[e], p = m[e], d = n === W, g = -S.offset[s] + E.offset[s] + E["scroll" + s], y = h === s ? f : h === o ? -f : -f / 2, b = p === s ? a : p === o ? -a : -a / 2, w = g - l, x = l + f - E[u] - g, T = y - (v.precedance === e || h === v[t] ? b : 0) - (p === U ? a / 2 : 0);
                return d ? (T = (h === s ? 1 : -1) * y, r[s] += w > 0 ? w : x > 0 ? -x : 0, r[s] = Math.max(-S.offset[s] + E.offset[s], l - T, Math.min(Math.max(-S.offset[s] + E.offset[s] + E[u], l + T), r[s]))) : (i *= n === z ? 2 : 0, w > 0 && (h !== s || x > 0) ? (r[s] -= T + i, c.invert(e, s)) : x > 0 && (h !== o || w > 0) && (r[s] -= (h === U ? -T : T) + i, c.invert(e, o)), g > r[s] && -r[s] > x && (r[s] = l, c = v.clone())), r[s] - l;
            }
            var l, c, h, p = i.target, d = n.elements.tooltip, v = i.my, m = i.at, g = i.adjust, y = g.method.split(" "), b = y[0], w = y[1] || y[0], E = i.viewport, S = i.container, x = n.cache, T = {
                left: 0,
                top: 0
            };
            return E.jquery && p[0] !== e && p[0] !== t.body && "none" !== g.method ? (l = "fixed" === d.css("position"), E = {
                elem: E,
                width: E[0] === e ? E.width() : E.outerWidth(_),
                height: E[0] === e ? E.height() : E.outerHeight(_),
                scrollleft: l ? 0 : E.scrollLeft(),
                scrolltop: l ? 0 : E.scrollTop(),
                offset: E.offset() || {
                    left: 0,
                    top: 0
                }
            }, S = {
                elem: S,
                scrollLeft: S.scrollLeft(),
                scrollTop: S.scrollTop(),
                offset: S.offset() || {
                    left: 0,
                    top: 0
                }
            }, ("shift" !== b || "shift" !== w) && (c = v.clone()), T = {
                left: "none" !== b ? f(P, H, b, g.x, I, R, B, s, u) : 0,
                top: "none" !== w ? f(H, P, w, g.y, F, q, j, o, a) : 0
            }, c && x.lastClass !== (h = V + "-pos-" + c.abbrev()) && d.removeClass(n.cache.lastClass).addClass(n.cache.lastClass = h), T) : T;
        }, X.polys = {
            polygon: function(e, t) {
                var n, r, i, s = {
                    width: 0,
                    height: 0,
                    position: {
                        top: 1e10,
                        right: 0,
                        bottom: 0,
                        left: 1e10
                    },
                    adjustable: _
                }, o = 0, u = [], a = 1, f = 1, l = 0, c = 0;
                for (o = e.length; o--; ) n = [ parseInt(e[--o], 10), parseInt(e[o + 1], 10) ], n[0] > s.position.right && (s.position.right = n[0]), n[0] < s.position.left && (s.position.left = n[0]), n[1] > s.position.bottom && (s.position.bottom = n[1]), n[1] < s.position.top && (s.position.top = n[1]), u.push(n);
                if (r = s.width = Math.abs(s.position.right - s.position.left), i = s.height = Math.abs(s.position.bottom - s.position.top), "c" === t.abbrev()) s.position = {
                    left: s.position.left + s.width / 2,
                    top: s.position.top + s.height / 2
                }; else {
                    for (; r > 0 && i > 0 && a > 0 && f > 0; ) for (r = Math.floor(r / 2), i = Math.floor(i / 2), t.x === I ? a = r : t.x === R ? a = s.width - r : a += Math.floor(r / 2), t.y === F ? f = i : t.y === q ? f = s.height - i : f += Math.floor(i / 2), o = u.length; o-- && !(2 > u.length); ) l = u[o][0] - s.position.left, c = u[o][1] - s.position.top, (t.x === I && l >= a || t.x === R && a >= l || t.x === U && (a > l || l > s.width - a) || t.y === F && c >= f || t.y === q && f >= c || t.y === U && (f > c || c > s.height - f)) && u.splice(o, 1);
                    s.position = {
                        left: u[0][0],
                        top: u[0][1]
                    };
                }
                return s;
            },
            rect: function(e, t, n, r) {
                return {
                    width: Math.abs(n - e),
                    height: Math.abs(r - t),
                    position: {
                        left: Math.min(e, n),
                        top: Math.min(t, r)
                    }
                };
            },
            _angles: {
                tc: 1.5,
                tr: 7 / 4,
                tl: 5 / 4,
                bc: .5,
                br: .25,
                bl: .75,
                rc: 2,
                lc: 1,
                c: 0
            },
            ellipse: function(e, t, n, r, i) {
                var s = X.polys._angles[i.abbrev()], o = n * Math.cos(s * Math.PI), u = r * Math.sin(s * Math.PI);
                return {
                    width: 2 * n - Math.abs(o),
                    height: 2 * r - Math.abs(u),
                    position: {
                        left: e + o,
                        top: t + u
                    },
                    adjustable: _
                };
            },
            circle: function(e, t, n, r) {
                return X.polys.ellipse(e, t, n, n, r);
            }
        }, X.svg = function(e, n, s) {
            for (var o, u, a, f = r(t), l = n[0], c = {}; !l.getBBox; ) l = l.parentNode;
            if (!l.getBBox || !l.parentNode) return _;
            switch (l.nodeName) {
              case "rect":
                u = X.svg.toPixel(l, l.x.baseVal.value, l.y.baseVal.value), a = X.svg.toPixel(l, l.x.baseVal.value + l.width.baseVal.value, l.y.baseVal.value + l.height.baseVal.value), c = X.polys.rect(u[0], u[1], a[0], a[1], s);
                break;
              case "ellipse":
              case "circle":
                u = X.svg.toPixel(l, l.cx.baseVal.value, l.cy.baseVal.value), c = X.polys.ellipse(u[0], u[1], (l.rx || l.r).baseVal.value, (l.ry || l.r).baseVal.value, s);
                break;
              case "line":
              case "polygon":
              case "polyline":
                var h, p, d = l.points || [ {
                    x: l.x1.baseVal.value,
                    y: l.y1.baseVal.value
                }, {
                    x: l.x2.baseVal.value,
                    y: l.y2.baseVal.value
                } ];
                for (c = [], i = -1, h = d.numberOfItems || d.length; h > ++i; ) p = d.getItem ? d.getItem(i) : d[i], c.push.apply(c, X.svg.toPixel(l, p.x, p.y));
                c = X.polys.polygon(c, s);
                break;
              default:
                if (o = l.getBBox(), mtx = l.getScreenCTM(), root = l.farthestViewportElement || l, !root.createSVGPoint) return _;
                point = root.createSVGPoint(), point.x = o.x, point.y = o.y, tPoint = point.matrixTransform(mtx), c.position = {
                    left: tPoint.x,
                    top: tPoint.y
                }, point.x += o.width, point.y += o.height, tPoint = point.matrixTransform(mtx), c.width = tPoint.x - c.position.left, c.height = tPoint.y - c.position.top;
            }
            return c.position.left += f.scrollLeft(), c.position.top += f.scrollTop(), c;
        }, X.svg.toPixel = function(e, t, n) {
            var r, i, s = e.getScreenCTM(), o = e.farthestViewportElement || e;
            return o.createSVGPoint ? (i = o.createSVGPoint(), i.x = t, i.y = n, r = i.matrixTransform(s), [ r.x, r.y ]) : _;
        }, X.imagemap = function(e, t, n) {
            t.jquery || (t = r(t));
            var i, s, o, u, a, f = t.attr("shape").toLowerCase().replace("poly", "polygon"), l = r('img[usemap="#' + t.parent("map").attr("name") + '"]'), c = t.attr("coords"), h = c.split(",");
            if (!l.length) return _;
            if ("polygon" === f) u = X.polys.polygon(h, n); else {
                if (!X.polys[f]) return _;
                for (o = -1, a = h.length, s = []; a > ++o; ) s.push(parseInt(h[o], 10));
                u = X.polys[f].apply(this, s.concat(n));
            }
            return i = l.offset(), i.left += Math.ceil((l.outerWidth(_) - l.width()) / 2), i.top += Math.ceil((l.outerHeight(_) - l.height()) / 2), u.position.left += i.left, u.position.top += i.top, u;
        };
        var Nt, Ct = '<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';"  style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>';
        r.extend(N.prototype, {
            _scroll: function() {
                var t = this.qtip.elements.overlay;
                t && (t[0].style.top = r(e).scrollTop() + "px");
            },
            init: function(n) {
                var i = n.tooltip;
                1 > r("select, object").length && (this.bgiframe = n.elements.bgiframe = r(Ct).appendTo(i), n._bind(i, "tooltipmove", this.adjustBGIFrame, this._ns, this)), this.redrawContainer = r("<div/>", {
                    id: V + "-rcontainer"
                }).appendTo(t.body), n.elements.overlay && n.elements.overlay.addClass("qtipmodal-ie6fix") && (n._bind(e, [ "scroll", "resize" ], this._scroll, this._ns, this), n._bind(i, [ "tooltipshow" ], this._scroll, this._ns, this)), this.redraw();
            },
            adjustBGIFrame: function() {
                var e, t, n = this.qtip.tooltip, r = {
                    height: n.outerHeight(_),
                    width: n.outerWidth(_)
                }, i = this.qtip.plugins.tip, s = this.qtip.elements.tip;
                t = parseInt(n.css("borderLeftWidth"), 10) || 0, t = {
                    left: -t,
                    top: -t
                }, i && s && (e = "x" === i.corner.precedance ? [ B, I ] : [ j, F ], t[e[1]] -= s[e[0]]()), this.bgiframe.css(t).css(r);
            },
            redraw: function() {
                if (1 > this.qtip.rendered || this.drawing) return self;
                var e, t, n, r, i = this.qtip.tooltip, s = this.qtip.options.style, o = this.qtip.options.position.container;
                return this.qtip.drawing = 1, s.height && i.css(j, s.height), s.width ? i.css(B, s.width) : (i.css(B, "").appendTo(this.redrawContainer), t = i.width(), 1 > t % 2 && (t += 1), n = i.css("maxWidth") || "", r = i.css("minWidth") || "", e = (n + r).indexOf("%") > -1 ? o.width() / 100 : 0, n = (n.indexOf("%") > -1 ? e : 1) * parseInt(n, 10) || t, r = (r.indexOf("%") > -1 ? e : 1) * parseInt(r, 10) || 0, t = n + r ? Math.min(Math.max(t, r), n) : t, i.css(B, Math.round(t)).appendTo(o)), this.drawing = 0, self;
            },
            destroy: function() {
                this.bgiframe && this.bgiframe.remove(), this.qtip._unbind([ e, this.qtip.tooltip ], this._ns);
            }
        }), Nt = X.ie6 = function(e) {
            return 6 === st.ie ? new N(e) : _;
        }, Nt.initialize = "render", A.ie6 = {
            "^content|style$": function() {
                this.redraw();
            }
        };
    });
})(window, document);

jQuery(document).ready(function(e) {
    function t(t, n) {
        e(".lwa-loading").remove();
        n = e(n);
        if (t.result === !0) n.attr("class", "lwa-status lwa-status-confirm").html(t.message); else if (t.result === !1) {
            n.attr("class", "lwa-status lwa-status-invalid").html(t.error);
            n.find("a").click(function(t) {
                t.preventDefault();
                e(this).parents(".lwa").find("form.lwa-remember").show("slow");
            });
        } else n.attr("class", "lwa-status lwa-status-invalid").html("An error has occured. Please try again.");
    }
    if (e("#LoginWithAjax").length > 0) {
        e("#LoginWithAjax").addClass("lwa");
        e("#LoginWithAjax_Status").addClass("lwa-status");
        e("#LoginWithAjax_Register").addClass("lwa-register");
        e("#LoginWithAjax_Remember").addClass("lwa-remember");
        e("#LoginWithAjax_Links_Remember").addClass("lwa-links-remember");
        e("#LoginWithAjax_Links_Remember_Cancel").addClass("lwa-links-remember-cancel");
        e("#LoginWithAjax_Form").addClass("lwa-form");
    }
    e("form.lwa-form, form.lwa-remember, div.lwa-register form").submit(function(n) {
        n.preventDefault();
        var r = e(this), i = r.find(".lwa-status");
        if (i.length == 0) {
            i = e('<span class="lwa-status"></span>');
            r.prepend(i);
        }
        var s = r.find(".lwa-ajax");
        if (s.length == 0) {
            s = e('<input class="lwa-ajax" name="lwa" type="hidden" value="1" />');
            r.prepend(s);
        }
        e('<div class="lwa-loading"></div>').prependTo(r);
        e.post(r.attr("action"), r.serialize(), function(n) {
            t(n, i);
            e(document).trigger("lwa_" + n.action, [ n, r ]);
        }, "jsonp");
    });
    e(document).on("lwa_login", function(t, n, r) {
        n.result === !0 && (n.widget != null ? e.get(n.widget, function(t) {
            var n = e(t);
            r.parent(".lwa").replaceWith(n);
            var i = n.find(".").show(), s = n.parent().find(".lwa-title");
            s.replaceWith(i);
        }) : n.redirect == null ? window.location.reload() : window.location = n.redirect);
    });
    e(".lwa-modal").each(function(t, n) {
        var r = e(n);
        r.parents(".lwa").data("modal", r);
        e("body").append(e('<div class="lwa"></div>').append(r));
    });
    e(document).on("click", ".lwa-links-modal", function(t) {
        t.preventDefault();
        target = e(this).parents(".lwa").data("modal");
        target.reveal({
            modalbgclass: "lwa-modal-bg",
            dismissmodalclass: "lwa-modal-close"
        });
    });
    e(".lwa-links-register-inline").click(function(t) {
        t.preventDefault();
        e(this).parents(".lwa").find(".lwa-register").show("slow");
    });
    e(".lwa-links-register-inline-cancel").click(function(t) {
        t.preventDefault();
        e(this).parents(".lwa-register").hide("slow");
    });
    e(document).on("click", ".lwa-links-remember", function(t) {
        t.preventDefault();
        e(this).parents(".lwa").find(".lwa-remember").show("slow");
    });
    e(document).on("click", ".lwa-links-remember-cancel", function(t) {
        t.preventDefault();
        e(this).parents(".lwa-remember").hide("slow");
    });
});

(function(e) {
    e("a[data-reveal-id]").on("click", function(t) {
        t.preventDefault();
        var n = e(this).attr("data-reveal-id");
        e("#" + n).reveal(e(this).data());
    });
    e.fn.reveal = function(t) {
        var n = {
            animation: "fadeAndPop",
            animationspeed: 300,
            closeonbackgroundclick: !0,
            dismissmodalclass: "close-reveal-modal",
            modalbgclass: "reveal-modal-bg"
        }, t = e.extend({}, n, t);
        return this.each(function() {
            function n() {
                u = !1;
            }
            function r() {
                u = !0;
            }
            var i = e(this), s = parseInt(i.css("top")), o = i.height() + s, u = !1, a = e("." + t.modalbgclass);
            a.length == 0 && (a = e('<div class="' + t.modalbgclass + '" />').insertAfter(i));
            i.find("." + t.dismissmodalclass).length == 0 && i.append('<a class="' + t.dismissmodalclass + '">&#215;</a>');
            i.bind("reveal:open", function() {
                a.unbind("click.modalEvent");
                e("." + t.dismissmodalclass).unbind("click.modalEvent");
                if (!u) {
                    r();
                    if (t.animation == "fadeAndPop") {
                        i.css({
                            top: e(document).scrollTop() - o,
                            opacity: 0,
                            visibility: "visible",
                            display: "block"
                        });
                        a.fadeIn(t.animationspeed / 2);
                        i.delay(t.animationspeed / 2).animate({
                            top: e(document).scrollTop() + s + "px",
                            opacity: 1
                        }, t.animationspeed, n());
                    }
                    if (t.animation == "fade") {
                        i.css({
                            opacity: 0,
                            visibility: "visible",
                            top: e(document).scrollTop() + s,
                            display: "block"
                        });
                        a.fadeIn(t.animationspeed / 2);
                        i.delay(t.animationspeed / 2).animate({
                            opacity: 1
                        }, t.animationspeed, n());
                    }
                    if (t.animation == "none") {
                        i.css({
                            visibility: "visible",
                            top: e(document).scrollTop() + s,
                            display: "block"
                        });
                        a.css({
                            display: "block"
                        });
                        n();
                    }
                }
                i.unbind("reveal:open");
            });
            i.bind("reveal:close", function() {
                if (!u) {
                    r();
                    if (t.animation == "fadeAndPop") {
                        a.delay(t.animationspeed).fadeOut(t.animationspeed);
                        i.animate({
                            top: e(document).scrollTop() - o + "px",
                            opacity: 0
                        }, t.animationspeed / 2, function() {
                            i.css({
                                top: s,
                                opacity: 1,
                                visibility: "hidden"
                            });
                            n();
                        });
                    }
                    if (t.animation == "fade") {
                        a.delay(t.animationspeed).fadeOut(t.animationspeed);
                        i.animate({
                            opacity: 0
                        }, t.animationspeed, function() {
                            i.css({
                                opacity: 1,
                                visibility: "hidden",
                                top: s
                            });
                            n();
                        });
                    }
                    if (t.animation == "none") {
                        i.css({
                            visibility: "hidden",
                            top: s
                        });
                        a.css({
                            display: "none"
                        });
                    }
                }
                i.unbind("reveal:close");
            });
            i.trigger("reveal:open");
            var f = e("." + t.dismissmodalclass).bind("click.modalEvent", function() {
                i.trigger("reveal:close");
            });
            if (t.closeonbackgroundclick) {
                a.css({
                    cursor: "pointer"
                });
                a.bind("click.modalEvent", function() {
                    i.trigger("reveal:close");
                });
            }
            e("body").keyup(function(e) {
                e.which === 27 && i.trigger("reveal:close");
            });
        });
    };
})(jQuery);

window.Modernizr = function(e, t, n) {
    function r(e) {
        g.cssText = e;
    }
    function i(e, t) {
        return r(E.join(e + ";") + (t || ""));
    }
    function s(e, t) {
        return typeof e === t;
    }
    function o(e, t) {
        return !!~("" + e).indexOf(t);
    }
    function u(e, t) {
        for (var r in e) {
            var i = e[r];
            if (!o(i, "-") && g[i] !== n) return t == "pfx" ? i : !0;
        }
        return !1;
    }
    function a(e, t, r) {
        for (var i in e) {
            var o = t[e[i]];
            if (o !== n) return r === !1 ? e[i] : s(o, "function") ? o.bind(r || t) : o;
        }
        return !1;
    }
    function f(e, t, n) {
        var r = e.charAt(0).toUpperCase() + e.slice(1), i = (e + " " + x.join(r + " ") + r).split(" ");
        return s(t, "string") || s(t, "undefined") ? u(i, t) : (i = (e + " " + T.join(r + " ") + r).split(" "), a(i, t, n));
    }
    function l() {
        h.input = function(n) {
            for (var r = 0, i = n.length; r < i; r++) L[n[r]] = n[r] in y;
            return L.list && (L.list = !!t.createElement("datalist") && !!e.HTMLDataListElement), L;
        }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), h.inputtypes = function(e) {
            for (var r = 0, i, s, o, u = e.length; r < u; r++) y.setAttribute("type", s = e[r]), i = y.type !== "text", i && (y.value = b, y.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(s) && y.style.WebkitAppearance !== n ? (d.appendChild(y), o = t.defaultView, i = o.getComputedStyle && o.getComputedStyle(y, null).WebkitAppearance !== "textfield" && y.offsetHeight !== 0, d.removeChild(y)) : /^(search|tel)$/.test(s) || (/^(url|email)$/.test(s) ? i = y.checkValidity && y.checkValidity() === !1 : i = y.value != b)), k[e[r]] = !!i;
            return k;
        }("search tel url email datetime date month week time datetime-local number range color".split(" "));
    }
    var c = "2.6.2", h = {}, p = !0, d = t.documentElement, v = "modernizr", m = t.createElement(v), g = m.style, y = t.createElement("input"), b = ":)", w = {}.toString, E = " -webkit- -moz- -o- -ms- ".split(" "), S = "Webkit Moz O ms", x = S.split(" "), T = S.toLowerCase().split(" "), N = {
        svg: "http://www.w3.org/2000/svg"
    }, C = {}, k = {}, L = {}, A = [], O = A.slice, M, _ = function(e, n, r, i) {
        var s, o, u, a, f = t.createElement("div"), l = t.body, c = l || t.createElement("body");
        if (parseInt(r, 10)) while (r--) u = t.createElement("div"), u.id = i ? i[r] : v + (r + 1), f.appendChild(u);
        return s = [ "&#173;", '<style id="s', v, '">', e, "</style>" ].join(""), f.id = v, (l ? f : c).innerHTML += s, c.appendChild(f), l || (c.style.background = "", c.style.overflow = "hidden", a = d.style.overflow, d.style.overflow = "hidden", d.appendChild(c)), o = n(f, e), l ? f.parentNode.removeChild(f) : (c.parentNode.removeChild(c), d.style.overflow = a), !!o;
    }, D = function(t) {
        var n = e.matchMedia || e.msMatchMedia;
        if (n) return n(t).matches;
        var r;
        return _("@media " + t + " { #" + v + " { position: absolute; } }", function(t) {
            r = (e.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle)["position"] == "absolute";
        }), r;
    }, P = function() {
        function e(e, i) {
            i = i || t.createElement(r[e] || "div"), e = "on" + e;
            var o = e in i;
            return o || (i.setAttribute || (i = t.createElement("div")), i.setAttribute && i.removeAttribute && (i.setAttribute(e, ""), o = s(i[e], "function"), s(i[e], "undefined") || (i[e] = n), i.removeAttribute(e))), i = null, o;
        }
        var r = {
            select: "input",
            change: "input",
            submit: "form",
            reset: "form",
            error: "img",
            load: "img",
            abort: "img"
        };
        return e;
    }(), H = {}.hasOwnProperty, B;
    !s(H, "undefined") && !s(H.call, "undefined") ? B = function(e, t) {
        return H.call(e, t);
    } : B = function(e, t) {
        return t in e && s(e.constructor.prototype[t], "undefined");
    }, Function.prototype.bind || (Function.prototype.bind = function(e) {
        var t = this;
        if (typeof t != "function") throw new TypeError;
        var n = O.call(arguments, 1), r = function() {
            if (this instanceof r) {
                var i = function() {};
                i.prototype = t.prototype;
                var s = new i, o = t.apply(s, n.concat(O.call(arguments)));
                return Object(o) === o ? o : s;
            }
            return t.apply(e, n.concat(O.call(arguments)));
        };
        return r;
    }), C.flexbox = function() {
        return f("flexWrap");
    }, C.webgl = function() {
        return !!e.WebGLRenderingContext;
    }, C.touch = function() {
        var n;
        return "ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch ? n = !0 : _([ "@media (", E.join("touch-enabled),("), v, ")", "{#modernizr{top:9px;position:absolute}}" ].join(""), function(e) {
            n = e.offsetTop === 9;
        }), n;
    }, C.geolocation = function() {
        return "geolocation" in navigator;
    }, C.hashchange = function() {
        return P("hashchange", e) && (t.documentMode === n || t.documentMode > 7);
    }, C.history = function() {
        return !!e.history && !!history.pushState;
    }, C.websockets = function() {
        return "WebSocket" in e || "MozWebSocket" in e;
    }, C.rgba = function() {
        return r("background-color:rgba(150,255,150,.5)"), o(g.backgroundColor, "rgba");
    }, C.hsla = function() {
        return r("background-color:hsla(120,40%,100%,.5)"), o(g.backgroundColor, "rgba") || o(g.backgroundColor, "hsla");
    }, C.multiplebgs = function() {
        return r("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(g.background);
    }, C.backgroundsize = function() {
        return f("backgroundSize");
    }, C.borderimage = function() {
        return f("borderImage");
    }, C.textshadow = function() {
        return t.createElement("div").style.textShadow === "";
    }, C.opacity = function() {
        return i("opacity:.55"), /^0.55$/.test(g.opacity);
    }, C.cssanimations = function() {
        return f("animationName");
    }, C.csscolumns = function() {
        return f("columnCount");
    }, C.cssgradients = function() {
        var e = "background-image:", t = "gradient(linear,left top,right bottom,from(#9f9),to(white));", n = "linear-gradient(left top,#9f9, white);";
        return r((e + "-webkit- ".split(" ").join(t + e) + E.join(n + e)).slice(0, -e.length)), o(g.backgroundImage, "gradient");
    }, C.cssreflections = function() {
        return f("boxReflect");
    }, C.csstransforms = function() {
        return !!f("transform");
    }, C.csstransforms3d = function() {
        var e = !!f("perspective");
        return e && "webkitPerspective" in d.style && _("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(t, n) {
            e = t.offsetLeft === 9 && t.offsetHeight === 3;
        }), e;
    }, C.csstransitions = function() {
        return f("transition");
    }, C.fontface = function() {
        var e;
        return _('@font-face {font-family:"font";src:url("https://")}', function(n, r) {
            var i = t.getElementById("smodernizr"), s = i.sheet || i.styleSheet, o = s ? s.cssRules && s.cssRules[0] ? s.cssRules[0].cssText : s.cssText || "" : "";
            e = /src/i.test(o) && o.indexOf(r.split(" ")[0]) === 0;
        }), e;
    }, C.generatedcontent = function() {
        var e;
        return _([ "#", v, "{font:0/0 a}#", v, ':after{content:"', b, '";visibility:hidden;font:3px/1 a}' ].join(""), function(t) {
            e = t.offsetHeight >= 3;
        }), e;
    }, C.video = function() {
        var e = t.createElement("video"), n = !1;
        try {
            if (n = !!e.canPlayType) n = new Boolean(n), n.ogg = e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), n.h264 = e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), n.webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, "");
        } catch (r) {}
        return n;
    }, C.audio = function() {
        var e = t.createElement("audio"), n = !1;
        try {
            if (n = !!e.canPlayType) n = new Boolean(n), n.ogg = e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), n.mp3 = e.canPlayType("audio/mpeg;").replace(/^no$/, ""), n.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), n.m4a = (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, "");
        } catch (r) {}
        return n;
    }, C.localstorage = function() {
        try {
            return localStorage.setItem(v, v), localStorage.removeItem(v), !0;
        } catch (e) {
            return !1;
        }
    }, C.applicationcache = function() {
        return !!e.applicationCache;
    }, C.svg = function() {
        return !!t.createElementNS && !!t.createElementNS(N.svg, "svg").createSVGRect;
    }, C.svgclippaths = function() {
        return !!t.createElementNS && /SVGClipPath/.test(w.call(t.createElementNS(N.svg, "clipPath")));
    };
    for (var j in C) B(C, j) && (M = j.toLowerCase(), h[M] = C[j](), A.push((h[M] ? "" : "no-") + M));
    return h.input || l(), h.addTest = function(e, t) {
        if (typeof e == "object") for (var r in e) B(e, r) && h.addTest(r, e[r]); else {
            e = e.toLowerCase();
            if (h[e] !== n) return h;
            t = typeof t == "function" ? t() : t, typeof p != "undefined" && p && (d.className += " " + (t ? "" : "no-") + e), h[e] = t;
        }
        return h;
    }, r(""), m = y = null, function(e, t) {
        function n(e, t) {
            var n = e.createElement("p"), r = e.getElementsByTagName("head")[0] || e.documentElement;
            return n.innerHTML = "x<style>" + t + "</style>", r.insertBefore(n.lastChild, r.firstChild);
        }
        function r() {
            var e = g.elements;
            return typeof e == "string" ? e.split(" ") : e;
        }
        function i(e) {
            var t = v[e[p]];
            return t || (t = {}, d++, e[p] = d, v[d] = t), t;
        }
        function s(e, n, r) {
            n || (n = t);
            if (m) return n.createElement(e);
            r || (r = i(n));
            var s;
            return r.cache[e] ? s = r.cache[e].cloneNode() : c.test(e) ? s = (r.cache[e] = r.createElem(e)).cloneNode() : s = r.createElem(e), s.canHaveChildren && !l.test(e) ? r.frag.appendChild(s) : s;
        }
        function o(e, n) {
            e || (e = t);
            if (m) return e.createDocumentFragment();
            n = n || i(e);
            var s = n.frag.cloneNode(), o = 0, u = r(), a = u.length;
            for (; o < a; o++) s.createElement(u[o]);
            return s;
        }
        function u(e, t) {
            t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function(n) {
                return g.shivMethods ? s(n, e, t) : t.createElem(n);
            }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + r().join().replace(/\w+/g, function(e) {
                return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")';
            }) + ");return n}")(g, t.frag);
        }
        function a(e) {
            e || (e = t);
            var r = i(e);
            return g.shivCSS && !h && !r.hasCSS && (r.hasCSS = !!n(e, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), m || u(e, r), e;
        }
        var f = e.html5 || {}, l = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, c = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, h, p = "_html5shiv", d = 0, v = {}, m;
        (function() {
            try {
                var e = t.createElement("a");
                e.innerHTML = "<xyz></xyz>", h = "hidden" in e, m = e.childNodes.length == 1 || function() {
                    t.createElement("a");
                    var e = t.createDocumentFragment();
                    return typeof e.cloneNode == "undefined" || typeof e.createDocumentFragment == "undefined" || typeof e.createElement == "undefined";
                }();
            } catch (n) {
                h = !0, m = !0;
            }
        })();
        var g = {
            elements: f.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
            shivCSS: f.shivCSS !== !1,
            supportsUnknownElements: m,
            shivMethods: f.shivMethods !== !1,
            type: "default",
            shivDocument: a,
            createElement: s,
            createDocumentFragment: o
        };
        e.html5 = g, a(t);
    }(this, t), h._version = c, h._prefixes = E, h._domPrefixes = T, h._cssomPrefixes = x, h.mq = D, h.hasEvent = P, h.testProp = function(e) {
        return u([ e ]);
    }, h.testAllProps = f, h.testStyles = _, h.prefixed = function(e, t, n) {
        return t ? f(e, t, n) : f(e, "pfx");
    }, d.className = d.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (p ? " js " + A.join(" ") : ""), h;
}(this, this.document), function(e, t, n) {
    function r(e) {
        return "[object Function]" == d.call(e);
    }
    function i(e) {
        return "string" == typeof e;
    }
    function s() {}
    function o(e) {
        return !e || "loaded" == e || "complete" == e || "uninitialized" == e;
    }
    function u() {
        var e = v.shift();
        m = 1, e ? e.t ? h(function() {
            ("c" == e.t ? k.injectCss : k.injectJs)(e.s, 0, e.a, e.x, e.e, 1);
        }, 0) : (e(), u()) : m = 0;
    }
    function a(e, n, r, i, s, a, f) {
        function l(t) {
            if (!d && o(c.readyState) && (w.r = d = 1, !m && u(), c.onload = c.onreadystatechange = null, t)) {
                "img" != e && h(function() {
                    b.removeChild(c);
                }, 50);
                for (var r in T[n]) T[n].hasOwnProperty(r) && T[n][r].onload();
            }
        }
        var f = f || k.errorTimeout, c = t.createElement(e), d = 0, g = 0, w = {
            t: r,
            s: n,
            e: s,
            a: a,
            x: f
        };
        1 === T[n] && (g = 1, T[n] = []), "object" == e ? c.data = n : (c.src = n, c.type = e), c.width = c.height = "0", c.onerror = c.onload = c.onreadystatechange = function() {
            l.call(this, g);
        }, v.splice(i, 0, w), "img" != e && (g || 2 === T[n] ? (b.insertBefore(c, y ? null : p), h(l, f)) : T[n].push(c));
    }
    function f(e, t, n, r, s) {
        return m = 0, t = t || "j", i(e) ? a("c" == t ? E : w, e, t, this.i++, n, r, s) : (v.splice(this.i++, 0, e), 1 == v.length && u()), this;
    }
    function l() {
        var e = k;
        return e.loader = {
            load: f,
            i: 0
        }, e;
    }
    var c = t.documentElement, h = e.setTimeout, p = t.getElementsByTagName("script")[0], d = {}.toString, v = [], m = 0, g = "MozAppearance" in c.style, y = g && !!t.createRange().compareNode, b = y ? c : p.parentNode, c = e.opera && "[object Opera]" == d.call(e.opera), c = !!t.attachEvent && !c, w = g ? "object" : c ? "script" : "img", E = c ? "script" : w, S = Array.isArray || function(e) {
        return "[object Array]" == d.call(e);
    }, x = [], T = {}, N = {
        timeout: function(e, t) {
            return t.length && (e.timeout = t[0]), e;
        }
    }, C, k;
    k = function(e) {
        function t(e) {
            var e = e.split("!"), t = x.length, n = e.pop(), r = e.length, n = {
                url: n,
                origUrl: n,
                prefixes: e
            }, i, s, o;
            for (s = 0; s < r; s++) o = e[s].split("="), (i = N[o.shift()]) && (n = i(n, o));
            for (s = 0; s < t; s++) n = x[s](n);
            return n;
        }
        function o(e, i, s, o, u) {
            var a = t(e), f = a.autoCallback;
            a.url.split(".").pop().split("?").shift(), a.bypass || (i && (i = r(i) ? i : i[e] || i[o] || i[e.split("/").pop().split("?")[0]]), a.instead ? a.instead(e, i, s, o, u) : (T[a.url] ? a.noexec = !0 : T[a.url] = 1, s.load(a.url, a.forceCSS || !a.forceJS && "css" == a.url.split(".").pop().split("?").shift() ? "c" : n, a.noexec, a.attrs, a.timeout), (r(i) || r(f)) && s.load(function() {
                l(), i && i(a.origUrl, u, o), f && f(a.origUrl, u, o), T[a.url] = 2;
            })));
        }
        function u(e, t) {
            function n(e, n) {
                if (e) {
                    if (i(e)) n || (f = function() {
                        var e = [].slice.call(arguments);
                        l.apply(this, e), c();
                    }), o(e, f, t, 0, u); else if (Object(e) === e) for (p in h = function() {
                        var t = 0, n;
                        for (n in e) e.hasOwnProperty(n) && t++;
                        return t;
                    }(), e) e.hasOwnProperty(p) && (!n && !--h && (r(f) ? f = function() {
                        var e = [].slice.call(arguments);
                        l.apply(this, e), c();
                    } : f[p] = function(e) {
                        return function() {
                            var t = [].slice.call(arguments);
                            e && e.apply(this, t), c();
                        };
                    }(l[p])), o(e[p], f, t, p, u));
                } else !n && c();
            }
            var u = !!e.test, a = e.load || e.both, f = e.callback || s, l = f, c = e.complete || s, h, p;
            n(u ? e.yep : e.nope, !!a), a && n(a);
        }
        var a, f, c = this.yepnope.loader;
        if (i(e)) o(e, 0, c, 0); else if (S(e)) for (a = 0; a < e.length; a++) f = e[a], i(f) ? o(f, 0, c, 0) : S(f) ? k(f) : Object(f) === f && u(f, c); else Object(e) === e && u(e, c);
    }, k.addPrefix = function(e, t) {
        N[e] = t;
    }, k.addFilter = function(e) {
        x.push(e);
    }, k.errorTimeout = 1e4, null == t.readyState && t.addEventListener && (t.readyState = "loading", t.addEventListener("DOMContentLoaded", C = function() {
        t.removeEventListener("DOMContentLoaded", C, 0), t.readyState = "complete";
    }, 0)), e.yepnope = l(), e.yepnope.executeStack = u, e.yepnope.injectJs = function(e, n, r, i, a, f) {
        var l = t.createElement("script"), c, d, i = i || k.errorTimeout;
        l.src = e;
        for (d in r) l.setAttribute(d, r[d]);
        n = f ? u : n || s, l.onreadystatechange = l.onload = function() {
            !c && o(l.readyState) && (c = 1, n(), l.onload = l.onreadystatechange = null);
        }, h(function() {
            c || (c = 1, n(1));
        }, i), a ? l.onload() : p.parentNode.insertBefore(l, p);
    }, e.yepnope.injectCss = function(e, n, r, i, o, a) {
        var i = t.createElement("link"), f, n = a ? u : n || s;
        i.href = e, i.rel = "stylesheet", i.type = "text/css";
        for (f in r) i.setAttribute(f, r[f]);
        o || (p.parentNode.insertBefore(i, p), h(n, 0));
    };
}(this, document), Modernizr.load = function() {
    yepnope.apply(window, [].slice.call(arguments, 0));
}, Modernizr.addTest("mediaqueries", Modernizr.mq("only all")), Modernizr.addTest("regions", function() {
    var e = Modernizr.prefixed("flowFrom"), t = Modernizr.prefixed("flowInto");
    if (!e || !t) return !1;
    var n = document.createElement("div"), r = document.createElement("div"), i = document.createElement("div"), s = "modernizr_flow_for_regions_check";
    r.innerText = "M", n.style.cssText = "top: 150px; left: 150px; padding: 0px;", i.style.cssText = "width: 50px; height: 50px; padding: 42px;", i.style[e] = s, n.appendChild(r), n.appendChild(i), document.documentElement.appendChild(n);
    var o, u, a = r.getBoundingClientRect();
    return r.style[t] = s, o = r.getBoundingClientRect(), u = o.left - a.left, document.documentElement.removeChild(n), r = i = n = undefined, u == 42;
}), Modernizr.addTest("supports", "CSSSupportsRule" in window);