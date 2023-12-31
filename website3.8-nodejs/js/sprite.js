(function(n) {
    if (!String.prototype.trim) String.prototype.trim = function() {
        return this.replace(/^\s+/, "").replace(/\s+$/, "")
    };
    var b = b || {};
    b.hash = {};
    b.defineShapes = {};
    b.init = function() {
        b.initRoot();
        b.initDefs();
        b.initShapes();
        b.interval = Math.floor(1E3 / n.FrameRate)
    };
    b.createTag = function(a) {
        return document.createElementNS("http://www.w3.org/2000/svg", a)
    };
    b.initRoot = function() {
        var a = n.FrameRect;
        b.root = b.createTag("svg");
        b.root.setAttribute("width", a.xmax - a.xmin);
        b.root.setAttribute("height", a.ymax - a.ymin);
        b.root.setAttribute("viewBox", a.xmin + " " + a.ymin + " " + n.FrameWidth + " " + n.FrameHeight);
        b.scene = document.createElement("div");
        b.scene.style.position = "relative";
        b.scene.style.left = "30%";
        b.scene.style.top = "-80%";
        b.scene.style.width = "1px";
        var mq = window.matchMedia( "(max-width: 1440px)" );
        if (mq.matches) {
            b.scene.style.left = "23%";
            b.scene.style.top = "-87%";
        }
        b.scene.appendChild(b.root);
        document.body.appendChild(b.scene)
    };
    b.initDefs = function() {
        var a = b.createTag("g"),
            d = b.createTag("defs");
        a.appendChild(d);
        b.root.appendChild(a);
        b.defs = d
    };
    b.initShapes = function() {
        for (var a = n.tags, d = 0, e = a.length; d < e; d++) {
            var c = a[d];
            switch (c.type) {
                case 2:
                    b.processShape(c);
                    break;
                case 10:
                    b.processFont(c);
                    break;
                case 11:
                    b.processText(c);
                    break;
                case 39:
                    b.processSprite(c);
                    break;
                case 7:
                    b.processButton(c)
            }
            b.hash[c.id] = c
        }
    };
    b.processFont = function(a) {
        var d = b.createTag("font");
        d.setAttribute("id", "ft" + a.id);
        d.setAttribute("horiz-adv-x", 1024);
        var e = b.createTag("font-face");
        e.setAttribute("font-family", "ft" + a.id);
        e.setAttribute("line-height", "1.15");
        e.setAttribute("units-per-em", a.unitsperem);
        e.setAttribute("font-weight", "bold");
        d.appendChild(e);
        e = 0;
        for (var c = a.fonts.length; e < c; e++) {
            var g =
                a.fonts[e],
                f = b.createTag("glyph");
            f.setAttribute("d", g.data);
            f.setAttribute("unicode", g.code);
            "advance" in g && f.setAttribute("horiz-adv-x", g.advance);
            d.appendChild(f)
        }
        b.defs.appendChild(d)
    };
    b.processText = function(a) {
        for (var d = b.createTag("g"), e = b.createTag("defs"), c = b.createTag("g"), g = 0; a.records[g]; g++) {
            var f = a.records[g];
            if (a.texttype == "html") {
                var i = a.bound,
                    o = document.createTextNode(f.text),
                    h = document.createElement("span");
                h.style.fontSize = f.fontsize + "px";
                h.style.color = f.color;
                h.style.fontFamily =
                    f.fontid;
                h.appendChild(o);
                if (g == 0) {
                    text_p = document.createElement("p");
                    text_div = document.createElement("div");
                    text_div.style.textAlign = "left";
                    text_body = document.createElement("body");
                    var k = b.createTag("foreignObject");
                    k.setAttribute("x", i.left);
                    k.setAttribute("y", i.top);
                    k.setAttribute("width", i.right - i.left);
                    k.setAttribute("height", i.bottom - i.top);
                    i = b.createTag("g");
                    i.setAttribute("transform", a.transform);
                    i.setAttribute("translate", f.translate);
                    i.appendChild(k);
                    k.appendChild(text_body);
                    text_body.appendChild(text_div);
                    text_div.appendChild(text_p);
                    text_p.appendChild(h);
                    c.appendChild(i)
                } else k.appendChild(h);
                k = h
            } else {
                h = b.createTag("text");
                if (f.psd === !0) {
                    i = "";
                    o = 0;
                    for (var j = f.text.length; o < j; o++) i += "*";
                    f.text = i
                }
                o = document.createTextNode(f.text);
                h.appendChild(o);
                f.bold && h.setAttribute("font-weight", "bold");
                h.setAttribute("font-size", f.height);
                f.fontid.toString().match(/\d/) ? h.setAttribute("font-family", "ft" + f.fontid) : h.setAttribute("font-family", f.fontid);
                h.setAttribute("fill", f.color);
                h.setAttribute("x", f.x);
                h.setAttribute("y",
                    f.y);
                h.setAttribute("fill-rule", "nonzero");
                h.setAttribute("style", "white-space:pre");
                h.setAttribute("transform", a.transform);
                c.appendChild(h)
            }
        }
        d.appendChild(e);
        d.appendChild(c);
        d.setAttribute("type", "text");
        b.defineShapes[a.id] = d
    };
    b.processSprite = function(a) {
        var d = b.createTag("g"),
            e = b.createTag("defs"),
            c = b.createTag("g");
        d.setAttribute("type", "sprite");
        d.appendChild(e);
        d.appendChild(c);
        b.defineShapes[a.id] = d
    };
    b.processButton = function(a) {
        var d = b.createTag("g"),
            e = b.createTag("defs"),
            c = b.createTag("g");
        d.setAttribute("type", "button");
        d.appendChild(e);
        d.appendChild(c);
        b.defineShapes[a.id] = d
    };
    b.processShape = function() {
        var a = function(a, c, d) {
                if (document.getElementById(c)) return c;
                d = b.createTag(d);
                for (var f in a) typeof a[f] == "object" || f == "type" || d.setAttribute(f, a[f]);
                a = a.stop;
                f = 0;
                for (var i = a.length; f < i; f++) {
                    var o = a[f],
                        h = b.createTag("stop"),
                        k;
                    for (k in o) h.setAttribute(k, o[k]);
                    d.appendChild(h)
                }
                d.setAttribute("id", c);
                b.defs.appendChild(d);
                return c
            },
            d = function(a, c) {
                if (document.getElementById(c)) return c;
                var d = b.createTag("pattern"),
                    f;
                for (f in a) typeof a[f] == "object" || f == "type" || d.setAttribute(f, a[f]);
                var i = b.createTag("image");
                for (f in a.image) f == "xlink:href" ? i.setAttributeNS("http://www.w3.org/1999/xlink", "href", a.image[f]) : i.setAttribute(f, a.image[f]);
                d.appendChild(i);
                d.setAttribute("id", c);
                b.defs.appendChild(d);
                return c
            };
        return function(e) {
            var c = b.createTag("g"),
                g = b.createTag("defs"),
                f = b.createTag("g");
            c.appendChild(g);
            c.appendChild(f);
            g = e.paths;
            for (var i = 0, o = g.length; i < o; i++) {
                var h = g[i],
                    k = b.createTag("path");
                k.setAttribute("d", h.data);
                if (typeof h.fill !== "undefined") {
                    var j = e.FillStyles[h.fill],
                        l = e.id,
                        p = h.fill;
                    if (j) {
                        var q = k,
                            m = l;
                        l = j.type;
                        if (l == 1) q.setAttribute("fill", j.color), q.setAttribute("fill-opacity", typeof j["fill-opacity"] == "undefined" ? 1 : j["fill-opacity"]);
                        else {
                            p = "f" + m + ":" + p;
                            m = "";
                            switch (l) {
                                case 2:
                                    m = a(j, p, "linearGradient");
                                    break;
                                case 3:
                                    m = a(j, p, "radialGradient");
                                    break;
                                case 4:
                                case 5:
                                case 6:
                                case 7:
                                    m = d(j, p)
                            }
                            q.setAttribute("fill", "url(#" + m + ")")
                        }
                    }
                }
                if (typeof h.line !== "undefined") {
                    j = e.LineStyles[h.line];
                    l =
                        e.id;
                    q = k;
                    h = h.line;
                    p = void 0;
                    for (p in j) typeof j[p] != "object" && q.setAttribute(p, j[p]);
                    if ("fill" in j) {
                        h = "l" + l + ":" + h;
                        l = "";
                        switch (j.fill.type) {
                            case 2:
                                l = a(j.fill, h, "linearGradient");
                                break;
                            case 3:
                                l = a(j.fill, h, "radialGradient");
                                break;
                            case 4:
                            case 5:
                            case 6:
                            case 7:
                                l = d(j.fill, h)
                        }
                        q.setAttribute("stroke", "url(#" + l + ")")
                    }
                    q.setAttribute("fill", "none")
                }
                f.appendChild(k)
            }
            c.setAttribute("type", "shape");
            b.defineShapes[e.id] = c
        }
    }();
    b.filterElement = function(a, d) {
        var e = {
                "0": "Shadow",
                "1": "Blur",
                "2": "Glow",
                "3": "Bevel"
            },
            c = function(a) {
                return a ==
                    0 ? "SourceGraphic" : a
            };
        this.defs = a.firstChild;
        this.target = a.firstChild.nextSibling;
        this.id = "filter_" + a.getAttribute("id");
        this.base = 0;
        this.filters = d;
        this.element = b.createTag("filter");
        this.defs.appendChild(this.element);
        this.Rgb = function(a) {
            var d = ["R", "G", "B"],
                c = b.createTag("feComponentTransfer");
            c.setAttribute("in", a);
            this.element.appendChild(c);
            for (a = 0; a < d.length; a++) {
                var e = b.createTag("feFunc" + d[a]);
                e.setAttribute("type", "linear");
                e.setAttribute("slope", 0);
                c.appendChild(e)
            }
            return this
        };
        this.Rgba =
            function(a, d, c) {
                var e = ["R", "G", "B"],
                    h = [d.r, d.g, d.b, d.a];
                d = b.createTag("feComponentTransfer");
                d.setAttribute("result", c);
                this.element.appendChild(d);
                for (c = 0; c < e.length; c++) {
                    var k = b.createTag("feFunc" + e[c]);
                    k.setAttribute("type", "linear");
                    k.setAttribute("intercept", h[c]);
                    d.appendChild(k)
                }
                e = b.createTag("feFuncA");
                e.setAttribute("type", "linear");
                e.setAttribute("slope", a);
                d.appendChild(e);
                return this
            };
        this.Fo = function(a, d) {
            var c = b.createTag("feOffset");
            c.setAttribute("dx", a);
            c.setAttribute("dy", d);
            this.element.appendChild(c);
            return this
        };
        this.Fg = function(a, d) {
            var c = b.createTag("feGaussianBlur");
            c.setAttribute("stdDeviation", [a, d].join(" "));
            this.element.appendChild(c);
            return this
        };
        this.Com = function(a, d, c, e) {
            var h = b.createTag("feComposite");
            h.setAttribute("in2", c);
            h.setAttribute("in", d);
            h.setAttribute("operator", a);
            h.setAttribute("result", e);
            this.element.appendChild(h);
            return this
        };
        this.Shadow = function(a) {
            this.Rgb(c(this.base)).Fg(a.blurx, a.blury).Fo(a.dx, a.dy).Rgba(a.strength, a.color, "shadow").Com("over", c(this.base),
                "shadow", ++this.base)
        };
        this.Blur = function(a) {
            var d = b.createTag("feGaussianBlur");
            d.setAttribute("in", c(this.base));
            d.setAttribute("result", ++this.base);
            d.setAttribute("stdDeviation", [a.blurx, a.blury].join(" "));
            this.element.appendChild(d)
        };
        this.Glow = function(a) {
            this.Rgb(c(this.base)).Fg(a.blurx, a.blury).Rgba(a.strength, a.color, ++this.base).Com("over", c(this.base - 1), this.base, ++this.base)
        };
        this.Bevel = function(a) {
            this.Rgb(c(this.base)).Fg(a.blurx, a.blury).Fo("-" + a.dx, "-" + a.dy).Rgba(a.strength, a.highlightColor,
                ++this.base).Rgb(c(this.base - 1)).Fg(a.blurx, a.blury).Fo(a.dx, a.dy).Rgba(a.strength, a.color, ++this.base).Com("xor", this.base, c(this.base - 1), "shadow").Com("over", "shadow", c(this.base - 2), ++this.base)
        };
        this.init = function() {
            var a = this.filters.rect,
                d = this.filters.record;
            this.element.setAttribute("width", a.w);
            this.element.setAttribute("height", a.h);
            this.element.setAttribute("x", a.x);
            this.element.setAttribute("y", a.y);
            this.element.setAttribute("id", this.id);
            for (a = 0; a < d.length; a++) this.filterDom(d[a]);
            this.attachFilter()
        };
        this.reset = function(a) {
            for (; this.element.firstChild;) this.element.removeChild(this.element.firstChild);
            this.base = 0;
            this.filters = a;
            this.init()
        };
        this.filterDom = function(a) {
            if (e[a.type]) this[e[a.type]](a)
        };
        this.attachFilter = function() {
            this.element.childNodes.length > 0 && this.target.setAttribute("filter", "url(#" + this.id + ")")
        };
        this.init()
    };
    b.sprite = function(a, d) {
        this.placeObjects = a.ShowFrame;
        this.sprites = {};
        this.depths = {};
        this.frame = this.arrayIndex = 0;
        this.par = d;
        this.frames = [];
        for (var e = [], c = 0, g = this.placeObjects.length; c <
            g; c++) {
            var f = this.placeObjects[c];
            f.type == 14 || f.type == 43 || (e.push(f), f.type == 1 && (this.frames.push(e), e = []))
        }
        b.sprite.instances.push(this)
    };
    b.sprite.instances = [];
    b.sprite.prototype.showFrame = function() {
        for (var a = this.frames[this.frame], d = null, b = 0, c = a.length - 1; b < c; b++) d = a[b], this.renderShape(d), this.lastDepth = d.depth;
        this.lastDepth = null;
        this.pause || this.frame++;
        if (this.frame == this.frames.length) this.frame = 0
    };
    b.sprite.prototype.handleAction = function(a) {
        for (var d = 0, b = a.length; d < b; d++) this.action(a[d])
    };
    b.sprite.prototype.action = function(a) {
        a = a.aslist;
        for (var d = 0, b = 0, c = a.length; b < c; b++) switch (d = a[b].code, d) {
            case 7:
                this.stop();
                break;
            case 129:
                this.gotoFrame(a[b].frame);
                break;
            case 6:
                this.play()
        }
    };
    b.sprite.prototype.stop = function() {
        this.pause = !0
    };
    b.sprite.prototype.gotoFrame = function(a) {
        this.frame = a
    };
    b.sprite.prototype.gotoAndStop = function(a) {
        this.frame = a;
        this.pause = !0
    };
    b.sprite.prototype.play = function() {
        this.pause = !1
    };
    b.sprite.prototype.renderShape = function(a) {
        if ("name" in a) this.name = a.name;
        if ("remove" in
            a) return this.removeShape(a.depth);
        this.afterRender("replace" in a ? this.replaceShape(a) : this.getShape(a), a);
        return !0
    };
    b.sprite.prototype.replaceShape = function(a) {
        var d = this.par.firstChild.nextSibling,
            b = this.createShape(a),
            c = a.depth;
        if (this.depths[c]) {
            var g = this.par.getAttribute("id") + ":" + c + ":" + this.depths[c],
                f = document.getElementById(g);
            if (g == b.id) return f;
            d.replaceChild(b, f);
            this.sprites[c + ":" + this.depths[c]] && (this.sprites[c + ":" + this.depths[c]] = null, delete this.sprites[c + ":" + this.depths[c]]);
            this.buttons &&
                this.buttons[c + ":" + this.depths[c]] && (this.buttons[c + ":" + this.depths[c]] = null, delete this.buttons[c + ":" + this.depths[c]])
        } else this.lastDepth ? (g = this.par.getAttribute("id") + ":" + this.lastDepth + ":" + this.depths[this.lastDepth], g = document.getElementById(g).nextSibling) : g = d.firstChild, g ? d.insertBefore(b, g) : d.appendChild(b);
        this.depths[c] = a.id;
        return b
    };
    b.sprite.prototype.removeShape = function(a) {
        if (this.depths[a]) {
            var d = this.depths[a],
                b = this.par.firstChild.nextSibling;
            d = this.par.getAttribute("id") + ":" + a +
                ":" + d;
            d = document.getElementById(d);
            b.removeChild(d);
            this.sprites[a + ":" + this.depths[a]] && (this.sprites[a + ":" + this.depths[a]] = null, delete this.sprites[a + ":" + this.depths[a]]);
            this.buttons && this.buttons[a + ":" + this.depths[a]] && (this.buttons[a + ":" + this.depths[a]] = null, delete this.buttons[a + ":" + this.depths[a]]);
            delete this.depths[a]
        }
        return a
    };
    b.sprite.prototype.getShape = function(a) {
        a = this.par.getAttribute("id") + ":" + a.depth + ":" + a.id;
        return document.getElementById(a)
    };
    b.sprite.prototype.afterRender = function(a,
        d) {
        this.mxTransform(a, d);
        this.cxTransform(a, d);
        this.changeOpacity(a, d);
        this.addFilters(a, d)
    };
    b.sprite.prototype.mxTransform = function(a, d) {
        var b = {
            mask: "moveShape",
            shape: "moveShape",
            text: "moveText",
            sprite: "moveSprite",
            button: "moveButton"
        };
        if ("matrix" in d) {
            var c = a.getAttribute("type");
            this[b[c]](a, d)
        }
    };
    b.sprite.prototype.moveShape = function(a, d) {
        var b = d.matrix;
        if (a.nodeName.toLowerCase() == "g") a.firstChild.nextSibling.setAttribute("transform", "matrix(" + b + ")");
        else
            for (var c = a.childNodes, g = 0, f = c.length; g <
                f; g++) c[g].setAttribute("transform", "matrix(" + b + ")")
    };
    b.sprite.prototype.moveText = function(a, d) {
        for (var e = a.firstChild.nextSibling.childNodes, c = d.matrix, g = 0; e[g]; g++) {
            var f = e[g].getAttribute("transform");
            e[g].oriMx = e[g].oriMx || f;
            f = e[g].oriMx.match(/matrix\(([^(]+)\)/)[1];
            f = b.sprite.concatMatrix(f, c);
            e[g].setAttribute("transform", "matrix(" + f + ")")
        }
    };
    b.sprite.prototype.moveSprite = function(a, d) {
        var e = d.matrix,
            c = d.depth + ":" + d.id;
        this.sprites[c] = this.sprites[c] || new b.sprite(b.hash[d.id], a);
        this.sprites[c].showFrame();
        a.firstChild.nextSibling.setAttribute("transform", "matrix(" + e + ")")
    };
    b.sprite.prototype.moveButton = function(a, d) {
        var e = d.depth,
            c = this.depths[d.depth],
            g = d.matrix,
            f = b.hash[d.id];
        if (!this.buttons) this.buttons = {};
        this.buttons[e + ":" + c] || (this.buttons[e + ":" + c] = new b.sprite.Button(a, f));
        this.buttons[e + ":" + c].element.setAttribute("transform", "matrix(" + g + ")")
    };
    b.bindAsEventListener = function(a, d) {
        var b = Array.prototype.slice.call(arguments, 2);
        return function(c) {
            d.apply(a, [c || window.event].concat(b))
        }
    };
    b.sprite.Button =
        function(a, d) {
            this.pid = a.getAttribute("id");
            this.element = a.firstChild.nextSibling;
            this.states = {};
            this.sprites = {};
            this.init(d);
            this.element.style.cursor = "pointer"
        };
    b.sprite.Button.prototype = {
        init: function(a) {
            for (var d = a.record, e, c, g, f = d.length - 1; f >= 0; f--) e = d[f], g = e.state, c = b.defineShapes[e.shapeid].cloneNode(!0), c.setAttribute("transform", e.transform), c.setAttribute("sid", e.shapeid), c.setAttribute("id", this.pid.concat(":", f, ":", e.shapeid)), this.states[g] || (this.states[g] = []), this.states[g].push(c);
            if ("up" in this.states) {
                c = null;
                f = 0;
                for (d = this.states.up.length; f < d; f++)
                    if (c = this.states.up[f].cloneNode(!0), c.style.display = "block", c.setAttribute("state", "up"), this.element.appendChild(c), c.getAttribute("type") == "sprite") e = c.getAttribute("sid"), this.sprites.up = this.sprites.up || new b.sprite(b.hash[e], c), this.sprites.up.showFrame()
            }
            if ("hit" in this.states) {
                c = null;
                f = 0;
                for (d = this.states.hit.length; f < d; f++)
                    if (c = this.states.hit[f].cloneNode(!0), c.setAttribute("opacity", 0), c.setAttribute("state", "hit"), this.element.appendChild(c),
                        c.getAttribute("type") == "sprite") e = c.getAttribute("sid"), this.sprites.hit = this.sprites.hit || new b.sprite(b.hash[e], c)
            }
            if ("down" in this.states) {
                c = null;
                f = 0;
                for (d = this.states.down.length; f < d; f++)
                    if (c = this.states.down[f].cloneNode(!0), c.style.display = "none", c.setAttribute("state", "down"), this.element.appendChild(c), c.getAttribute("type") == "sprite") e = c.getAttribute("sid"), this.sprites.down = this.sprites.down || new b.sprite(b.hash[e], c), this.sprites.down.showFrame()
            }
            if ("over" in this.states) {
                c = null;
                f = 0;
                for (d =
                    this.states.over.length; f < d; f++)
                    if (c = this.states.over[f].cloneNode(!0), c.style.display = "none", c.setAttribute("state", "over"), this.element.appendChild(c), c.getAttribute("type") == "sprite") e = c.getAttribute("sid"), this.sprites.over = this.sprites.over || new b.sprite(b.hash[e], c), this.sprites.over.showFrame()
            }
            this.normalEvents();
            "action" in a && this.handleAction(a.action)
        },
        normalEvents: function() {
            this.element.addEventListener("mousedown", b.bindAsEventListener(this, this.mousedownHandler), !1);
            this.element.addEventListener("mouseup",
                b.bindAsEventListener(this, this.mouseupHandler), !1);
            this.element.addEventListener("mouseover", b.bindAsEventListener(this, this.mouseoverHandler), !1);
            this.element.addEventListener("mouseout", b.bindAsEventListener(this, this.mouseoutHandler), !1)
        },
        handleAction: function(a) {
            for (var d = 0, b = a.length; d < b; d++) {
                var c = a[d];
                switch (c.cond) {
                    case "OverDownToOverUp":
                    case "IdleToOverUp":
                        this.handleRelease(c.aslist)
                }
            }
        },
        handleRelease: function(a) {
            for (var d = 0, e = a.length; d < e; d++) {
                "url" in a[d] && function(a, d) {
                    a.addEventListener("mouseup",
                        function() {
                            window.open(d)
                        }, !1)
                }(this.element, a[d].url);
                var c = a[d].statement;
                if (/^\S+$/.test(c) && c.indexOf(".") == -1) {
                    c = c.match(/^([^\(]+)\(([^\(]*)\)$/);
                    var g = c[1].trim();
                    (function(a, d, b, c) {
                        d.addEventListener("mouseup", function() {
                            if (b in a) a[b](c)
                        }, !1)
                    })(b.sprite.instances[0], this.element, g, c[2])
                }
            }
        },
        mouseoutHandler: function() {
            "up" in this.states && this.changeState("up")
        },
        mouseoverHandler: function() {
            "over" in this.states && this.changeState("over")
        },
        mousedownHandler: function() {
            "down" in this.states && this.changeState("down")
        },
        mouseupHandler: function() {
            "up" in this.states && this.changeState("up")
        },
        changeState: function(a) {
            if (a in this.states)
                for (var d = this.element.childNodes, b = 0, c; c = d[b]; b++) c.style.display = c.getAttribute("state") == "hit" || c.getAttribute("state") == a ? "block" : "none"
        }
    };
    b.sprite.prototype.cxTransform = function(a, d) {
        "cxform" in d && this.colorTransform(a, d.cxform)
    };
    b.sprite.prototype.colorTransform = function() {
        function a(a, b) {
            var c = a.match(/rgb\(([^(]+)\)/)[1].split(","),
                g = Math.max(0, Math.min((c[0] - 0) * b.RedMultTerm /
                    256 + b.RedAddTerm, 255)),
                f = Math.max(0, Math.min((c[1] - 0) * b.GreenMultTerm / 256 + b.GreenAddTerm, 255));
            c = Math.max(0, Math.min((c[2] - 0) * b.BlueMultTerm / 256 + b.BlueAddTerm, 255));
            g = parseInt(g);
            f = parseInt(f);
            c = parseInt(c);
            return [g, f, c]
        }
        return function(b, e) {
            var c = b.getAttribute("type");
            if ((c == "shape" || c == "text") && b.nodeName.toLowerCase() != "clippath") {
                c = b.firstChild.nextSibling;
                try {
                    for (var g = 0, f = c.childNodes.length; g < f; g++) {
                        var i = c.childNodes[g],
                            o = e,
                            h = i.hasAttribute("stroke") ? "stroke" : "fill",
                            k = i.getAttribute(h);
                        if (k) switch (k.match(/^\S{3}/)[0]) {
                            case "rgb":
                                var j =
                                    i,
                                    l = h;
                                j.oriC = j.oriC || k;
                                var p = a(j.oriC, o);
                                j.setAttribute(l, "rgb(" + p[0] + "," + p[1] + "," + p[2] + ")");
                                break;
                            case "url":
                                j = i;
                                l = h;
                                var q = k.match(/url\(#([^(]+)\)/)[1],
                                    m = "";
                                switch (l) {
                                    case "stroke":
                                        m = "l";
                                        break;
                                    case "fill":
                                        m = "f"
                                }
                                var n = q.indexOf(m);
                                n !== 0 && (q = q.substr(n));
                                var t = document.getElementById(q);
                                if (t.nodeName != "pattern") {
                                    var w = j.parentNode.previousSibling,
                                        r = j.parentNode.parentNode.getAttribute("id") + q;
                                    if (document.getElementById(r)) var s = document.getElementById(r);
                                    else s = t.cloneNode(!0), s.setAttribute("id",
                                        r), w.appendChild(s);
                                    var v = t.childNodes,
                                        x = s.childNodes;
                                    m = 0;
                                    for (var y = v.length; m < y; m++) {
                                        var z = v[m].getAttribute("stop-color"),
                                            u = a(z, o);
                                        x[m].setAttribute("stop-color", "rgb(" + u[0] + "," + u[1] + "," + u[2] + ")")
                                    }
                                    j.setAttribute(l, "url(#" + r + ")")
                                }
                        }
                    }
                } catch (A) {}
            } else if (c == "sprite") {
                f = b.firstChild.nextSibling.childNodes;
                i = 0;
                for (h = f.length; i < h; i++) this.colorTransform(f[i], e)
            }
        }
    }();
    b.sprite.prototype.changeOpacity = function(a, b) {
        var e = 1;
        "opacity" in b && (e = b.opacity);
        a.setAttribute("opacity", e)
    };
    b.sprite.prototype.addFilters =
        function(a, d) {
            if ("filters" in d) {
                var e = d.filters;
                a.filter ? a.filter.reset(e) : a.filter = new b.filterElement(a, e)
            }
        };
    b.sprite.prototype.getNode = function(a) {
        return b.defineShapes[a.id].cloneNode(!0)
    };
    b.sprite.prototype.createShape = function(a) {
        var b = this.getNode(a),
            e = this.par.getAttribute("id") + ":" + a.depth + ":" + a.id;
        "clipDepth" in a ? (this.clipDepthId = e, this.clipDepth = a.clipDepth, this.clipDepthDepth = a.depth, b = this.createClip(a)) : this.clipDepthId && a.depth > this.clipDepthDepth && a.depth <= this.clipDepth && b.setAttribute("clip-path",
            "url(#" + this.clipDepthId + ")");
        b.setAttribute("id", e);
        return b
    };
    b.sprite.prototype.createClip = function(a) {
        var b = this.getNode(a);
        switch (b.getAttribute("type")) {
            case "shape":
                return this.createSimpleClip(b);
            case "sprite":
                return this.createComplexClip(a)
        }
    };
    b.sprite.prototype.createSimpleClip = function(a) {
        var d = b.createTag("clipPath");
        a = a.firstChild.nextSibling.childNodes;
        for (var e = 0, c = a.length; e < c; e++) {
            var g = a[e].cloneNode(!0);
            d.appendChild(g)
        }
        d.setAttribute("clippathunits", "userSpaceOnUse");
        d.setAttribute("type",
            "shape");
        return d
    };
    b.sprite.prototype.createComplexClip = function(a) {
        return this.createSimpleClip(b.defineShapes[b.hash[a.id].ShowFrame[0].id])
    };
    b.sprite.concatMatrix = function(a, b) {
        var e = [];
        a = a.split(",");
        b = b.split(",");
        for (var c = 0; a[c]; c++) a[c] -= 0, b[c] -= 0;
        e.push(a[0] * b[0] + a[1] * b[1]);
        e.push(a[0] * b[1] + a[1] * b[3]);
        e.push(a[1] * b[0] + a[3] * b[1]);
        e.push(a[1] * b[1] + a[3] * b[3]);
        e.push(b[4] * a[0] + b[5] * a[1] + a[4]);
        e.push(b[4] * a[1] + b[5] * a[3] + a[5]);
        return e.join(",")
    };
    b.start = function() {
        var a = b.createTag("g");
        b.setBackground(b.root);
        a.setAttribute("id", "0");
        a.appendChild(b.createTag("defs"));
        a.appendChild(b.createTag("g"));
        b.root.appendChild(a);
        var d = new b.sprite(n.MainFrame, a);
        b.timer = setTimeout(function() {
            d.showFrame();
            setTimeout(arguments.callee, b.interval)
        }, b.interval)
    };
    b.stop = function() {
        clearTimeout(b.timer)
    };
    b.resume = function() {
        b.timer = setTimeout(function() {
            mainMovie.showFrame();
            setTimeout(arguments.callee, b.interval)
        }, b.interval)
    };
    b.setBackground = function(a) {
        var d = b.createTag("rect"),
            e = {
                x: n.FrameRect.xmin,
                y: n.FrameRect.ymin,
                width: n.FrameWidth,
                height: n.FrameHeight,
                fill: n.BackgroundColor
            },
            c;
        for (c in e) d.setAttribute(c, e[c]);
        a.appendChild(d)
    };
    b.init();
    b.start()
})(data);