$.ajaxSetup({ cache: false });

var oldTargetId;

jQuery.fn.center = function (pos, obj) {
    var defaultObj = '#loading-bgr';
    if (obj != undefined) {
        defaultObj = obj;
    }
    var h = $(defaultObj).outerHeight();
    var w = $(defaultObj).outerWidth();
    this.css("position", pos);
    this.css("top", (h / 2) - (this.outerHeight() / 2));
    this.css("left", (w / 2) - (this.outerWidth() / 2));
    return this;
}

jQuery.fn.marginCenter = function (obj) {
    var h = $(obj).outerHeight();
    var w = $(obj).outerWidth();
    this.css("margin-top", (h / 2) - (this.outerHeight() / 2));
    this.css("margin-left", (w / 2) - (this.outerWidth() / 2));
    return this;
}

jQuery.fn.marginLeft = function (obj) {
    var w = $(obj).outerWidth();
    this.css("margin-left", (w / 2) - (this.outerWidth() / 2));
    return this;
}

jQuery.fn.equalHeightTo = function (obj) {
    var w = $(obj).outerHeight();
    this.outerHeight(w);
    return this;
}

var ReadyFiles = function () {
    /*  Document   : readyFiles.js
    *  Author     : pixelcave
    *  Description: Custom javascript code used in Files page
    */
    return {
        init: function (item, option) {
            var mediaFilter = $('.media-filter');
            var mediaItems = $('.media-filter-items');
            var showCategory;
            if (item != undefined) {
                mediaFilter = $('.media-filter-' + item);
                mediaItems = $('.media-filter-items-' + item);
            }
            // When a media filter link is clicked
            mediaFilter.find('a').on('click', function () {
                // Get its data-category value
                showCategory = $(this).data('category');

                // Procceed only if the user clicked on an inactive category
                if (!$(this).parent().hasClass('active')) {
                    // Remove active class from all filter links
                    mediaFilter.find('a').parent().removeClass('active');

                    // Add the active class to the clicked link
                    $(this).parent().addClass('active');

                    // If the value is 'all' hide the current visible items and show them all together, else hide them all and show only from the category we need
                    if (showCategory === 'all') {
                        mediaItems
                            .find('.media-items')
                            .parent()
                            .hide(0, function () {
                                $(this).show(0);
                            });
                    } else {
                        mediaItems
                            .find('.media-items')
                            .parent()
                            .hide(0, function () {
                                mediaItems
                                    .find('[data-category="' + showCategory + '"]')
                                    .parent('div')
                                    .show(0, function () {
                                        if (option != undefined && option != null) {
                                            $('#default-category').attr('value', showCategory);
                                        }
                                    });
                            });
                    }
                }
            });
        }, showCurrentCategory: function (item) {
            var mediaFilter = $('.media-filter');
            var mediaItems = $('.media-filter-items');
            var defaultCategory = $('#default-category');
            var showCategory;
            if (item != undefined) {
                mediaFilter = $('.media-filter-' + item);
                mediaItems = $('.media-filter-items-' + item);
                defaultCategory = $('#default-category-' + item);
            }
            var dcid = defaultCategory.attr("value");
            if (dcid !== 'all') {
                mediaFilter = $('.media-filter');
                mediaItems = $('.media-filter-items');
                mediaItems
                    .find('.media-items')
                                .parent()
                                .hide(0, function () {
                                    mediaItems
                                        .find('[data-category="' + dcid + '"]')
                                        .parent('div')
                                        .show(0, function () {
                                            mediaFilter.find('a').parent().removeClass('active');
                                            mediaFilter.find('[data-category="' + dcid + '"]').parent().addClass('active');
                                        });
                                });
            }
        },
        init2: function (item) {
            var mediaFilter = $('.media-filter');
            var mediaItems = $('.media-filter-items');
            var showCategory;
            var dcid = $('.media-filter  li:first a').data('category');
            if (item != undefined) {
                mediaFilter = $('.media-filter-' + item);
                mediaItems = $('.media-filter-items-' + item);
                dcid = $('.media-filter-' + item + ' li:first a').data('category');
            }
            mediaItems
                .find('.media-items')
                            .parent()
                            .hide(0, function () {
                                mediaItems
                                    .find('[data-category="' + dcid + '"]')
                                    .parent('div')
                                    .show(0);
                            });
            // When a media filter link is clicked
            mediaFilter.find('a').on('click', function () {
                // Get its data-category value
                showCategory = $(this).data('category');

                // Procceed only if the user clicked on an inactive category
                if (!$(this).parent().hasClass('active')) {
                    // Remove active class from all filter links
                    mediaFilter.find('a').parent().removeClass('active');

                    // Add the active class to the clicked link
                    $(this).parent().addClass('active');

                    // show only from the category we need                    
                    mediaItems
                        .find('.media-items')
                        .parent()
                        .hide(0, function () {
                            mediaItems
                                .find('[data-category="' + showCategory + '"]')
                                .parent('div')
                                .show(0, function () {/*do something*/
                                });
                        });
                }
            });
        }
    };
}();

var PopOver = function () {
    return {
        init: function (contain) {  /* Start */

            $('.over-popup').mouseenter(function () {
                var el = this;
                var url = $(el).attr('data-link');
                if (oldTargetId != url) {
                    $('.popover:visible').popover('destroy');
                    $.ajax({
                        url: url,// == undefined ? el.href : url,
                        dataType: "html",
                        cache: false,
                        success: function (data) {
                            $(el).popover({
                                html: true,
                                content: data,
                                container: contain
                            }).popover('show');
                        },
                        error: function (xhr, textStatus, errorThrown) {
                            var text = "Error: " + xhr.status + " " + xhr.statusText;
                            showGrowl(text, 'danger');
                        }
                    });
                    oldTargetId = url;
                }
                else {
                    $(el).popover('show');
                }
            });

            $('.over-popup').mouseout(function () {
                $('.popover:visible').popover('hide');
            });

        },/* End */
        initJson: function (contain, params) {  /* Start */
            $('.over-popup').mouseenter(function () {
                var _params = {};

                if (params != undefined && params != null)
                    _params = params;

                var el = this;
                var url = $(el).attr('data-link');
                if (oldTargetId != url) {
                    $('.popover:visible').popover('destroy');
                    $.ajax({
                        url: url,
                        type: "POST",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify(_params),
                        cache: false,
                        success: function (data) {
                            if (data.Result) {
                                $(el).popover({
                                    html: true,
                                    placement: 'right',
                                    title: data.Title,
                                    content: data.Html,
                                    container: contain
                                }).popover('show');
                            }
                            else {
                                showGrowl(data.Html, 'danger');
                            }
                        },
                        error: function (xhr, textStatus, errorThrown) {
                            var text = "Error: " + xhr.status + " " + xhr.statusText;
                            showGrowl(text, 'danger');
                        }
                    });
                    oldTargetId = url;
                }
                else {
                    $(el).popover('show');
                }
            });

            $('.over-popup').mouseout(function () {
                $('.popover:visible').popover('hide');
            });

        }/* End */
    };
}();

var ZeroCopy = function () {
    return {
        init: function () {
            /*Zero copy*/
            var client = new ZeroClipboard(document.getElementById("copy-button"));
            $('#alert-copy').html("");
            client.on("ready", function (readyEvent) {
                //alert( "ZeroClipboard SWF is ready!" );
                client.setText($('#highlight-code').text());
                client.on("aftercopy", function (event) {
                    $('#alert-copy').html("Copied text to clipboard success!");
                });
            });
        }
    };
}();

var TablesGeneral = function () {
    return {
        init: function () {
            /* Select/Deselect all checkboxes in tables */
            $('thead input:checkbox').click(function () {
                var checkedStatus = $(this).prop('checked');
                var table = $(this).closest('table');

                $('tbody input:checkbox', table).each(function () {
                    $(this).prop('checked', checkedStatus);
                });
            });
        }
    };
}();

var GMApp = new function () {
    var _baseURL = "";
    return {
        Dialog: function (url, e, params, option, zindex, hadresponse) {
            if (e.preventDefault)
                e.preventDefault();

            var _this = $(this)
            var _params = {};
            var defaultModel = '#modal';
            var defaultContent = '#modal-content';
            var defaultZindex = 1999;
            if (params != undefined)
                _params = params;
            if (option != undefined) {
                _params = params;
                defaultModel = '#modal-' + option;
                defaultContent = '#modal-content-' + option;
            }
            if (zindex != undefined) {
                defaultZindex = zindex;
            }

            $("#loading-bgr").show();

            $.ajax({
                type: "GET",
                url: url,
                data: _params,
                cache: false,
                success: function (data) {
                    if (hadresponse) {
                        $('#response-hodler').html(data);
                    }
                    else {
                        $(defaultContent).html(data);
                        $(defaultModel).css('z-index', defaultZindex);
                        $(defaultModel).modal({
                            backdrop: 'static',
                            keyboard: true
                        }, 'show');
                    }
                    $("#loading-bgr").hide();
                },
                error: function (xhr, textStatus, errorThrown) {
                    showAjaxResponse('Error: ' + xhr.status + ' ' + xhr.statusText);
                    $("#loading-bgr").hide();
                }
            });
            return false;
        },
        DialogJson: function (url, e, params, option, zindex, hadresponse) {
            if (e.preventDefault)
                e.preventDefault();
            var mParams = {};
            var defaultModel = '#modal';
            var defaultContent = '#modal-content';
            var defaultZindex = 1999;
            if (params != undefined)
                mParams = params;
            if (option != undefined) {
                mParams = params;
                defaultModel = '#modal-' + option;
                defaultContent = '#modal-content-' + option;
            }
            if (zindex != undefined) {
                defaultZindex = zindex;
            }

            $("#loading-bgr").show();

            $.ajax({
                type: "POST",
                url: url,
                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(mParams),
                cache: false,
                success: function (data) {
                    if (data.Result) {
                        if (hadresponse) {
                            $('#response-hodler').html(data.Html);
                        }
                        else {
                            $(defaultContent).html(data.Html);
                            $(defaultModel).css('z-index', defaultZindex);
                            $(defaultModel).modal({
                                backdrop: 'static',
                                keyboard: true
                            }, 'show');
                        }
                    }
                    else {
                        showGrowl(data.Html, 'danger');
                    }
                    $("#loading-bgr").hide();
                },
                error: function (xhr, textStatus, errorThrown) {
                    showAjaxResponse('Error: ' + xhr.status + ' ' + xhr.statusText);
                    $("#loading-bgr").hide();
                }
            });
            return false;
        },
        DialogJsonBtn: function (content, url, e, params) {
            if (e.preventDefault)
                e.preventDefault();

            var _this = $(this)
            var _params = {};
            var _btn = e.currentTarget;

            $(_btn).button('loading')

            if (params != undefined)
                _params = params;

            _this.attr("disabled", "disabled");

            $.ajax({
                type: "POST",
                url: url,
                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(_params),
                cache: false,
                success: function (data) {
                    if (data != null && data.Html)
                        $(data.Html).prependTo(content);

                    $(_this).removeAttr("disabled");
                    $(_btn).button('reset');
                },
                error: function (xhr, textStatus, errorThrown) {
                    showAjaxResponse('Error: ' + xhr.status + ' ' + xhr.statusText);
                    $(_this).removeAttr("disabled");
                    $(_btn).button('reset');
                }
            });
            return false;
        },
        GetJson: function (content, url, params) {
            var _this = $(content);
            if (_this.length > 0) {
                var _params = {};
                if (params != undefined)
                    _params = params;

                $("#loading-bgr").show();
                $.ajax({
                    type: "POST",
                    url: url,
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify(_params),
                    cache: false,
                    success: function (data) {
                        if (data.Result) {
                            _this.html(data.Html);
                            if (url.indexOf("Avatar") >= 0) {
                                GMApp.initResize('#avatar-empty-body-m', '#avatar-empty-content-m');
                            }
                        }
                        else {
                            showGrowl(data.Html, 'danger');
                        }
                        $("#loading-bgr").hide();
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        showGrowl('Error: ' + xhr.status + ' ' + xhr.statusText, 'danger');
                        $("#loading-bgr").hide();
                    }
                });
            }
            return false;
        },
        GetAjax: function (content, url, params) {
            var _this = $(content);
            if (_this.length > 0) {
                var _params = {};
                if (params != undefined)
                    _params = params;

                $("#loading-bgr").show();
                $.ajax({
                    type: "GET",
                    url: url,
                    data: _params,
                    cache: false,
                    success: function (data) {
                        _this.html(data);
                        if (url.indexOf("Avatar") >= 0) {
                            GMApp.initResize('#avatar-empty-body-m', '#avatar-empty-content-m');
                        }
                        $("#loading-bgr").hide();
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        showGrowl('Error: ' + xhr.status + ' ' + xhr.statusText, 'danger');
                        $("#loading-bgr").hide();
                    }
                });
            }
            return false;
        },
        initResize: function (eleA, eleB) {
            var _eleA = $(eleA);
            var _eleB = $(eleB);
            $(_eleB).marginLeft(_eleA);
            $(window).resize(function () {
                $(_eleB).marginLeft(_eleA);
            });
        },
        initSchema: function (obj) {
            $(obj).bind('click', function (e) {
                var loadurl = $(obj).attr("href");
                $.ajax({
                    url: loadurl,
                    type: 'POST',
                    data: {},
                    success: function (data) {
                        if (data.Result) {
                            showGrowl(data.Html);
                        }
                        else {
                            showGrowl(data.Html, 'danger');
                        }
                        return false;
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        showGrowl(getError(xhr.status, xhr.statusText), 'danger');
                    }
                });
                return false;
            });
        }
    };
}();

var ModelGeneral = function () {
    return {
        init: function (el, model, zindex) {
            var defaultEl = 'a[' + el + ']';
            var defaultModel = '#modal';
            var defaultContent = '#modal-content';
            var defaultZindex = 1999;
            if (model != undefined) {
                defaultModel = '#modal-' + model;
                defaultContent = '#modal-content-' + model;
            }
            if (zindex != undefined) {
                defaultZindex = zindex;
            }
            //call model by tab a
            $(defaultEl).on("click", function (e) {
                $("#loading-bgr").show();
                $(defaultContent).load(this.href, function (response, status, xhr) {
                    if (status === "error") {
                        showAjaxResponse('Error: ' + xhr.status + ' ' + xhr.statusText);
                        $("#loading-bgr").hide();
                    }
                    else {
                        $(defaultModel).css('z-index', defaultZindex);
                        $(defaultModel).modal({
                            backdrop: 'static',
                            keyboard: true
                        }, 'show');
                        $("#loading-bgr").hide();
                    }
                });
                return false;
            });
        },
        initBtn: function (size, zindex, classname) {
            var _el = '.open-model';
            var _model = '#modal';
            var _content = '#modal-content';
            var _zindex = 1999;
            if (size != undefined) {
                _el = '.open-model-' + size;
                _model = '#modal-' + size;
                _content = '#modal-content-' + size;
            }
            if (zindex != undefined) {
                _zindex = zindex;
            }
            if (classname != undefined) {
                _el = '.open-model-' + classname;
            }
            //call model by tab a
            $(_el).on("click", function (e) {
                $("#loading-bgr").show();
                $(_content).load($(this).attr('data-link'), function (response, status, xhr) {
                    if (status == "error") {
                        showAjaxResponse('Error: ' + xhr.status + ' ' + xhr.statusText);
                        $("#loading-bgr").hide();
                    }
                    else {
                        $(_model).css('z-index', _zindex);
                        $(_model).modal({
                            backdrop: 'static',
                            keyboard: true
                        }, 'show');
                        $("#loading-bgr").hide();
                    }
                });
                return false;
            });
        }
    };
}();

function showGrowl(content, type, align, width, delay) {
    var _type = 'success';
    var _align = 'center';
    var _width = 500;
    var _delay = 2500;
    if (type != undefined && type != null) {
        _type = type;
    }
    if (align != undefined && align != null) {
        _align = align;
    }
    if (delay != undefined && delay != null) {
        _delay = delay;
    }
    if (width != undefined && width != null) {
        _width = width;
    }
    $.bootstrapGrowl(content, {
        type: _type,
        align: _align,
        width: _width,
        delay: _delay,
        offset: { from: 'top', amount: 150 },
        allow_dismiss: true
    });
}

function showTips(ele) {
    var content = $(ele).html();
    $.bootstrapGrowl(content, {
        type: 'warning',
        align: 'center',
        width: 500,
        delay: -1,
        offset: { from: 'top', amount: 210 },
        allow_dismiss: true
    });
}
function showAjaxResponse(content) {
    var modelBody = '<div class="modal-header themed-background-coral" style="color:white;">';
    modelBody += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
    modelBody += '<h4 class="modal-title">Error!</h4>';
    modelBody += '</div>';
    modelBody += '<div class="modal-body">';
    modelBody += '  <div class="alert alert-danger">';
    modelBody += content;
    modelBody += '  </div>';
    modelBody += '  <div class="form-actions">';
    modelBody += '    <div class="text-right">';
    modelBody += '         <button type="button" class="btn btn-sm btn-success" data-dismiss="modal">Close</button>';
    modelBody += '    </div>';
    modelBody += '  </div>';
    modelBody += '</div>';
    $('#modal-content-response').html(modelBody);
    $('#modal-response').css('z-index', '99999');
    $('#modal-response').modal({
        backdrop: 'static',
        keyboard: true,
    }, 'show');
    $("#loading-bgr").hide();
}

function getError(status, statusText) {
    return '<div class="text-center"><p class="text-danger">Error: ' + status + ' ' + statusText + '<p><div>'
}

function JSONDateWithTime(dateStr) {
    var jsonDate = dateStr;
    var d = new Date(parseInt(jsonDate.substr(6)));
    var m, day;
    m = d.getMonth() + 1;
    if (m < 10)
        m = '0' + m
    if (d.getDate() < 10)
        day = '0' + d.getDate();
    else
        day = d.getDate();
    var formattedDate = m + "/" + day + "/" + d.getFullYear();
    var hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
    var minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
    var formattedTime = hours + ":" + minutes + ":" + d.getSeconds();
    formattedDate = formattedDate + " " + formattedTime;
    return formattedDate;
}
/*!
 * Function: flyToElement
 * Author: CodexWorld
 * Author URI: http://www.codexworld.com  
 * Author Email: contact@codexworld.com
 * Description: This function is used for adding flying effect to the element.
 */
function flyToElement(flyer, flyingTo) {
     var $func = $(this);
     var divider = 3;
     var flyerClone = $(flyer).clone();
     $(flyerClone).css({ position: 'absolute', top: $(flyer).offset().top + "px", left: $(flyer).offset().left + "px", opacity: 1, 'z-index': 9900, 'width': $(flyer).width() * 3 + 'px', 'height': $(flyer).height() * 3 + 'px' });
     $('body').append($(flyerClone));
     var gotoX = $(flyingTo).offset().left + ($(flyingTo).width() / 2) - ($(flyer).width() / divider) / 2;
     var gotoY = $(flyingTo).offset().top + ($(flyingTo).height() / 2) - ($(flyer).height() / divider) / 2;
 
     $(flyerClone).animate({
         opacity: 0.4,
         left: gotoX,
         top: gotoY,
         width: $(flyer).width() / divider,
         height: $(flyer).height() / divider
     }, 700,
     function () {
         $(flyingTo).fadeOut('fast', function () {
             $(flyingTo).fadeIn('fast', function () {
                 $(flyerClone).fadeOut('fast', function () {
                     $(flyerClone).remove();
                 });
             });
         });
     });   
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1),
        vars = query.split("&"),
        pair;
    for (var i = 0; i < vars.length; i++) {
        pair = vars[i].split("=");
        if (pair[0] == variable) {
            return unescape(pair[1]);
        }
    }
}