var config = {
    app: {
        server_name: 'Gunny 3.8',
        host: 'http://103.200.22.248:3005/api/',
        createRoute: function createRoute(route) {
            return this.host + route;
        },
        fanpage: 'https://www.facebook.com/gunvietpc',
        groupPage: 'https://www.facebook.com/groups/gunviet3cham0/',
        launcher: 'GunViet.rar'
    }
};
var supportsTemplateLiterals = false;
try {
    eval("`foo`");
    supportsTemplateLiterals = true;
} catch (e) { }
var CARD_PROCESSING = 0;
var CARD_SUCCESS = 1;
var CARD_FAIL = 2;
var CARD_NOT_FOUND = 3;
var heSoCoin = 1;
var xuBonus = 0;
var server_list = [];
document.title = config.app.server_name + ' | Gunny 3.0 Hay Nhất 2022';
function openFanpage() {
    window.open(config.app.fanpage, '_blank');
}
function openLauncherLink() {
    window.open(config.app.launcher, '_blank');
}
function openGroupPage() {
    window.open(config.app.groupPage, '_blank');
}
function getUserInfo() {
    if (!checkLogin()) {
        return false;
    } else {
        reloadUserInfo();
        return JSON.parse(localStorage.getItem('user'));
    }
}
function reloadUserInfo() {
    if (!checkLogin()) {
        return false;
    } else {
        var token = getToken();
        $.ajax({
            url: config.app.createRoute('current-user'),
            headers: {
                'Authorization': 'Bearer ' + token
            },
            type: "get",
            dateType: "json",
            success: function success(response) {
                localStorage.setItem('user', JSON.stringify(response));
            }
        });
    }
}
function getToken() {
    try {
        var token = localStorage.getItem('token');
        return token;
    } catch (error) {
        return '';
    }
}
function userLogout() {
    var token = getToken();
    localStorage.setItem('token', null);
    localStorage.setItem('user', null);
    $.ajax({
        url: config.app.createRoute('logout'),
        headers: {
            'Authorization': 'Bearer ' + token
        },
        type: "post",
        dateType: "text",
        success: function success(t) {
            $("#sign-in-error").html(t), window.location = 'index.htm';
        }
    });
    userInterface();
}
function userInterface() {
    var info;
    try {
        info = getUserInfo();
    } catch (e) {
        localStorage.setItem('token', null);
        localStorage.setItem('user', null);
        console.log('can\'t get user info', e);
    }
    if (info) {
        $('#login').html("\n                <div class=\"clearfix\">\n                <div style=\"float: left; max-width: 70%; line-height: 1; overflow: hidden;\">\n                    <p style=\"font-size: 35px; color: #555; display: flex;flex-direction: column;align-items: flex-start;justify-content: flex-end;\">\n                        <small style=\"font-size: .5em;font-family: 'BreeSerif';margin: 0;\">Ch\xE0o m\u1EEBng Gunner</small>\n                        <span style=\"font-family: 'BreeSerif';margin: 0;\">".concat(info.username, "</span>\n                        <img style=\"margin: 0;\" src=\"/assets/img/vip/vip0_small.png\">\n                    </p>\n\n                </div>\n                <button class=\"login animElement slide-right in-view\" onclick=\"window.location='select-server.htm'\" style=\"float: right;font-family: BreeSerif\">\n                    Play\n                </button>\n            </div>\n            <div class=\"button-functional\">\n                <a class=\"item animElement slide-left in-view\" href=\"javascript:rechargeSection()\" style=\"display: inline-flex; background-color: rgb(245,98,0);font-family: 'BreeSerif'; border-color: rgb(250,83,0); justify-content: center; align-items: center;\">\n                    <img src=\"/assets/svgs/sync-alt.svg\" style=\"fill:white;\" alt=\"nap_tien\"> N\u1EA1p Ti\u1EC1n\n                </a>\n                <a class=\"item animElement slide-right in-view\" href=\"javascript:accountSection()\" style=\"display: inline-flex; text-align: center; background-color: #349517;font-family: 'BreeSerif'; border-color: #048507; align-items: center;\">\n                    <img src=\"/assets/svgs/id-card.svg\" alt=\"\" style=\"margin-left: 11px;\">\n                    T\xE0i Kho\u1EA3n\n                </a>\n            </div>\n            <div class=\"button-functional\">\n                <a class=\"item animElement slide-left in-view\" href=\"javascript:openLauncherLink()\" style=\"display: inline-flex; background-color: #4775f7;font-family: 'BreeSerif'; border-color: #4775f7; justify-content: center; align-items: center;\">\n                    <img src=\"/assets/svgs/rocket.svg\" alt=\"\"> Launcher\n                </a>\n                <a class=\"item animElement slide-right in-view\" href=\"javascript:userLogout()\" style=\"display: inline-flex; text-align: center; background-color: #F28A1a;font-family: 'BreeSerif'; border-color: #F28A1a; align-items: center;\">\n                    <img src=\"/assets/svgs/sign-out-alt.svg\" alt=\"\" style=\"margin-left: 11px;\">\n                    \u0110\u0103ng xu\u1EA5t\n                </a>\n            </div>\n        "));
    } else {
        $('#login').html("\n\n        <input class=\"animElement slide-left time-300 in-view\" id=\"usernamelogin\" placeholder=\"T\xE0i Kho\u1EA3n\" autocomplete=\"off\">\n        <input class=\"animElement slide-left time-300 in-view\" id=\"passwordlogin\" type=\"password\" placeholder=\"M\u1EADt Kh\u1EA9u\" autocomplete=\"new-password\">\n\n        <button class=\"login animElement slide-right in-view\" id=\"loginbtn\" type=\"submit\">Login</button>\n        <div class=\"footer\" id=\"sign-in-error\" style=\"display: none;text-align: center;font-family: 'BreeSerif'\">\n        </div>\n\n        <div class=\"footer\">\n        <a class=\"left animElement just-show in-view\" href=\"javascript:forgetPassSection()\">Qu\xEAn m\u1EADt kh\u1EA9u?</a>\n        <a class=\"right animElement just-show in-view\" href=\"javascript:registerSection()\">\u0110\u0103ng k\xFD</a>\n        </div>\n\n\n\n        <div class=\"footer\" style=\"display: flex\">\n            <a style=\"font-weight: bold\" class=\"animElement just-show in-view\" href=\"javascript:void(0)\">\u0110\u0102NG NH\u1EACP PUFFIN IOS</a>\n        </div>\n        ");

        //rebind login event
        $('#usernamelogin').bind("keypress", function (e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                login();
            }
        });
        $('#passwordlogin').bind("keypress", function (e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                login();
            }
        });
        $("#loginbtn").click(function () {
            try {
                login();
            }catch (e){
                $("#sign-in-error").css('color', '#ff7004');
                $("#sign-in-error").html("<img src=\"/assets/img/loader.gif\" style=\"width: 26px;height: 26px;\"/><p style=\"font-weight: bold\"> \u0110ang \u0111\u0103ng nh\u1EADp, vui l\xF2ng \u0111\u1EE3i...</p>");
                $("#sign-in-error").show();
                var username = $("#usernamelogin").val();
                var password = $("#passwordlogin").val();
                $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: config.app.createRoute('login'),
                type: "post",
                dateType: "json",
                cache: false,
                async: false,
                data: {
                    username: username,
                    password: password
                },
                success: function success(t) {
                    $("#sign-in-error").css('color', 'green');
                    $("#sign-in-error").html("<p>Đăng nhập thành công!</p><p>Trang sẽ tự động tải lại ngay.</p>");
                    $("#sign-in-error").show();
                    console.log(t);
                    localStorage.setItem("user", JSON.stringify(t.user));
                    localStorage.setItem("token", t.token);
                    setTimeout(function () {
                    if (typeof t.ref != 'undefined') {
                        window.location = t.ref;
                        return;
                    }
                    userInterface();
                    // window.location = "/"
                    }, 1e3);
                },
                error: function error(t) {
                    var statusCode = t.status;
                    if (statusCode == 401) {
                    $("#sign-in-error").css('color', 'red');
                    $("#sign-in-error").html("<p>" + t.responseJSON.msg + "</p>");
                    $("#passwordlogin").val("");
                    } else if (statusCode == 422) {
                    var errorMsg = "<p style='padding-bottom: 5px'>Lỗi:</p>";
                    $.each(t.responseJSON.errors, function (key, value) {
                        errorMsg += "<p> - ".concat(value, " </p>");
                    });
                    $("#sign-in-error").css('color', 'red');
                    $("#sign-in-error").html(errorMsg);
                    $("#passwordlogin").val("");
                    }
                }
                });
            }
            
            
        });
    }
    getServerList();
}
function chooseServerInterface() {
    var info = getUserInfo();
    if (info) {
        $('#usernameTxt').html(info.username);
    }
}
function getServerList() {
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: config.app.createRoute('get_new_server'),
        type: "post",
        dateType: "json",
        cache: false,
        async: false,
        success: function success(t) {
            server_list = t;
            $("select#serverid").html(t.map(function (item) {
                return "<option value=\"".concat(item.sid, "\">").concat(item.servername, "</option>");
            }));
            $("ul#servers-list-container").html(t.map(function (item) {
                return "<li>\n                    <a href=\"#\">\n                        <span class=\"tag green\">ON</span>".concat(item.servername, "\n                    </a>\n                </li>");
            }));
        },
        error: function error(t) {
            $("select#serverid").html("<option value=\"\">Kh\xF4ng th\u1EC3 t\u1EA3i danh s\xE1ch m\xE1y ch\u1EE7</option>");
            $("ul#servers-list-container").html("<li>\n                <a href=\"#\">\n                    <span class=\"tag red\">OFF</span>Kh\xF4ng th\u1EC3 t\u1EA3i!\n                </a>\n            </li>");
        }
    });
}
function registerSection() {
    $('section').html("\n    <section class=\"box register\">\n        <div class=\"title-new\">\n            <h1 style=\"color: #c3332a\">\u0110\u0102NG K\xDD T\xC0I KHO\u1EA2N</h1>\n        </div>\n        <div class=\"tabsContent\">\n            <div class=\"active biglist animElement slide-left in-view\">\n                <form id=\"createAccountForm\" class=\"account\">\n                    <label>\n                        <span>T\xE0i Kho\u1EA3n</span>\n                        <input id=\"txtUserReg\" placeholder=\"T\xEAn t\xE0i kho\u1EA3n\" autocomplete=\"off\" required=\"\">\n                        <div id=\"usernameError\" class=\"error-check\" style=\"display:none;\">\n                            <div id=\"formtip_inner\" class=\"error-check-mess\"></div>\n                        </div>\n                    </label>\n\n                    <label>\n                        <span>Email</span>\n                        <input id=\"txtEmailReg\" placeholder=\"Ex.: abc@gmail.com\" autocomplete=\"off\" required=\"\">\n                        <div id=\"emailError\" class=\"error-check\" style=\"display:none;\"></div>\n                    </label>\n                    <label>\n                        <span>M\u1EADt Kh\u1EA9u</span>\n                        <input type=\"password\" id=\"txtPasswordReg\" onchange=\"checkPassReg();\" placeholder=\"\u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022\" autocomplete=\"off\" required=\"\">\n                        <div id=\"regacc_passs_tooltip\" class=\"error-check\" style=\"display:none;\"></div>\n                    </label>\n\n                    <label>\n                        <span>Nh\u1EADp L\u1EA1i M\u1EADt Kh\u1EA9u</span>\n                        <input type=\"password\" id=\"txtRePassword-Reg\" onchange=\"checkRePassReg();\" placeholder=\"\u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022\" autocomplete=\"off\" required=\"\">\n                        <div id=\"regacc_repasss_tooltip\" class=\"error-check\" style=\"display:none;\"></div>\n                    </label>\n\n                    <label class=\"errors-register-form\" style=\"display: none;color: red\"></label>\n\n                    <button class=\"button\" id=\"register\" type=\"button\"> <span class=\"icon\"></span> \u0110\u0102NG K\xDD </button>\n                </form>\n            </div>\n        </div>\n    </section>\n    ");
    var time = 0;
    $('#txtUserReg').on('input', function (e) {
        clearTimeout(time);
        time = setTimeout(function () {
            $('#usernameError').html(" ");
            $('#usernameError').css("display", "none");
            var username = $("#txtUserReg").val();
            if (username.length > 2) {
                $('#usernameError').show();
                $('#usernameError').css('color', 'orange');
                $('#usernameError').html("Đang kiểm tra tên tài khoản...");
                $.ajax({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    url: config.app.createRoute('username_check'),
                    type: 'post',
                    dataType: 'json',
                    data: {
                        Email: username
                    },
                    success: function success(res) {
                        if (res.state == 0) {
                            $('#usernameError').show();
                            $('#usernameError').css('color', 'red');
                            $('#usernameError').html(res.msg);
                            return;
                        }
                        $('#usernameError').show();
                        $('#usernameError').css('color', 'green');
                        $('#usernameError').html(res.msg);
                    },
                    error: function error(e, xhq, stt) {
                        var statusCode = e.status;
                        $('#usernameError').show();
                        $('#usernameError').css('color', 'red');
                        if (statusCode == 400) $('#usernameError').html(e.responseJSON.msg);
                        if (statusCode == 422) $('#usernameError').html("Tên tài khoản không hợp lệ");
                    }
                });
            }
        }, 500);
    });
    var time2 = 0;
    $('#txtEmailReg').on('input', function (e) {
        clearTimeout(time2);
        time2 = setTimeout(function () {
            $('#txtEmailReg').html(" ");
            $('#emailError').css("display", "none");
            var email = $("#txtEmailReg").val();
            if (email.length > 4) {
                $('#emailError').show();
                $('#emailError').css('color', 'orange');
                $('#emailError').html("Đang kiểm tra email...");
                $.ajax({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    url: config.app.createRoute('email_check'),
                    type: 'post',
                    dataType: 'json',
                    data: {
                        e: email
                    },
                    success: function success(res) {
                        if (res.state == 0) {
                            $('#emailError').show();
                            $('#emailError').css('color', 'red');
                            $('#emailError').html(res.msg);
                            return;
                        }
                        $('#emailError').show();
                        $('#emailError').css('color', 'green');
                        $('#emailError').html(res.msg);
                    },
                    error: function error(e, xhq, stt) {
                        var statusCode = e.status;
                        $('#emailError').show();
                        $('#emailError').css('color', 'red');
                        if (statusCode == 400) $('#emailError').html(e.responseJSON.msg);
                        if (statusCode == 422) $('#emailError').html("Email không hợp lệ");
                    }
                });
            }
        }, 500);
    });
    $("#register").click(function () {
        $(".errors-register-form").css('color', 'orange');
        $(".errors-register-form").html('Đang xử lý, vui lòng đợi trong giây lát...<img src="/assets/img/loader.gif" style="width: 16px;height: 16px;"/>');
        $(".errors-register-form").show(), $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: config.app.createRoute('register'),
            type: "post",
            dateType: "json",
            data: {
                username: $("#txtUserReg").val(),
                password: $("#txtPasswordReg").val(),
                email: $("#txtEmailReg").val()
                // phone_number: $("#txtPhoneReg").val(),
            },

            success: function success(t) {
                reloadCaptcha();
                $(".errors-register-form").html(" ");
                $(".errors-register-form").hide();
                $('#usernameError').html(" ");
                $('#usernameError').css("display", "none");
                $(".errors-register-form").css('color', 'green');
                $(".errors-register-form").html("Đăng ký thành công. Hệ thống sẽ chuyển đến trang đăng nhập sau giây lát.");
                $(".errors-register-form").show();
                $('#emailError').css("display", "none");
                $('#createAccountForm').trigger("reset");
                setTimeout(function () {
                    window.location.reload();
                }, 1e3);
            },
            error: function error(t) {
                reloadCaptcha();
                var errorMsg = "Đăng ký không thành công: </br>";
                $.each(t.responseJSON.message, function (key, value) {
                    errorMsg += " - ".concat(value, " </br>");
                });
                $(".errors-register-form").css('color', 'red');
                $(".errors-register-form").html(errorMsg);
                $(".errors-register-form").show();
            }
        });
    });
    function checkPassReg() {
        $("#txtPassword-Reg").val().length < 6 ? ($("#regacc_passs_tooltip").css("display", "block"), $("#regacc_passs_tooltip").html("Mật khẩu phải từ 6 kí tự trở lên")) : $("#regacc_passs_tooltip").css("display", "none");
    }
    function checkRePassReg() {
        $("#txtRePassword-Reg").val() != $("#txtPassword-Reg").val() ? ($("#regacc_repasss_tooltip").css("display", "block"), $("#regacc_repasss_tooltip").html("Xác nhận mật khẩu không khớp")) : $("#regacc_repasss_tooltip").css("display", "none");
    }
}
function forgetPassSection() {
    $('section').html("<section class=\"box register\">\n    <div class=\"title-new\">\n        <h1 style=\"color: #c3332a\">QU\xCAN M\u1EACT KH\u1EA8U</h1>\n    </div>\n    <div class=\"tabsContent\">\n        <div class=\"active biglist\">\n            <form id=\"createAccountForm\" class=\"account\">\n                <label>Nh\u1EADp t\xEAn t\xE0i kho\u1EA3n v\xE0 email, sau \u0111\xF3 nh\u1EADp m\u1EADt kh\u1EA9u m\u1EDBi \u0111\u1EC3 thay \u0111\u1ED5i m\u1EADt kh\u1EA9u.</label>\n                <label>\n                    <span>T\xEAn t\xE0i kho\u1EA3n</span>\n                    <input id=\"txtUsername\" type=\"text\" placeholder=\"T\xEAn t\xE0i kho\u1EA3n c\u1EA7n l\u1EA5y l\u1EA1i\" autocomplete=\"off\" required=\"\">\n                </label>\n                <label>\n                    <span>Email c\u1EE7a b\u1EA1n</span>\n                    <input type=\"text\" id=\"txtEmail\" placeholder=\"Email c\u1EE7a b\u1EA1n\" autocomplete=\"off\" required=\"\">\n                </label>\n                <label>\n                    <span>M\u1EADt kh\u1EA9u m\u1EDBi</span>\n                    <input type=\"password\" id=\"txtPassword\" placeholder=\"M\u1EADt kh\u1EA9u m\u1EDBi\" autocomplete=\"off\" required=\"\">\n                </label>\n                <label class=\"errors-register-form\" style=\"color: orange;\"></label>\n                <button class=\"button\" id=\"forgotPasswordBtn\" type=\"button\"> <span class=\"icon\"></span> X\xC1C NH\u1EACN </button>\n            </form>\n        </div>\n    </div>\n</section>");
    $("#forgotPasswordBtn").click(function () {
        $(".errors-register-form").css('color', 'orange');
        $(".errors-register-form").html('Đang xử lý, vui lòng đợi trong giây lát...<img src="/assets/img/loader.gif" style="width: 16px;height: 16px;"/>');
        $(".errors-register-form").show(), $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: config.app.createRoute('forgot-password'),
            type: "post",
            // dateType: "json",
            data: {
                username: $("#txtUsername").val(),
                email: $("#txtEmail").val(),
                password: $("#txtPassword").val()
            },
            success: function success(t) {
                reloadCaptcha();
                $(".errors-register-form").html(" ");
                $(".errors-register-form").hide();
                $('#usernameError').html(" ");
                $('#usernameError').css("display", "none");
                $(".errors-register-form").css('color', 'green');
                $(".errors-register-form").html(t);
                $(".errors-register-form").show();
                $('#emailError').css("display", "none");
                $('#createAccountForm').trigger("reset");
                // $("#create-account-error").html(t), "Đăng ký thành công!" == t && setTimeout(function() {
                //     window.location = "/"
                // }, 1e3), setbackgourndCaptcha("captchaImageReg")
            },

            error: function error(t) {
                reloadCaptcha();
                if (t.status == 422) {
                    var errorMsg = "Email không đúng!";
                    $("#txtCaptcha").val("");
                    $(".errors-register-form").css('color', 'red');
                    $(".errors-register-form").html(errorMsg);
                    $(".errors-register-form").show();
                }
                if (t.status == 401 || t.status == 401) {
                    $("#txtCaptcha").val("");
                    $(".errors-register-form").css('color', 'red');
                    $(".errors-register-form").html('Tài khoản không tồn tại!');
                    $(".errors-register-form").show();
                }
            }
        });
    });
}
function checkLogin() {
    if (localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token').length < 10) {
        return false;
    }
    return true;
}
function accountSection() {
    info = getUserInfo();
    var censorWord = function censorWord(str) {
        return str[0] + "*".repeat(str.length - 3) + str.slice(-2);
    };
    var censorEmail = function censorEmail(email) {
        var arr = email.split("@");
        return censorWord(arr[0]) + "@" + censorWord(arr[1]);
    };
    $('section').html("\n    <section class=\"box register\">\n        <div class=\"title-new\">\n            <h1 style=\"color: #c3332a\">T\xC0I KHO\u1EA2N C\u1EE6A B\u1EA0N</h1>\n        </div>\n        <div class=\"tabsContent\">\n            <div class=\"active biglist animElement slide-left in-view\">\n                <form class=\"detail-account\">\n                    <label style=\"padding-top: 5px\">\n                        <span style=\"width: 25%;\">T\xEAn t\xE0i kho\u1EA3n:</span>\n                        <span>".concat(info.username, "</span>\n                    </label>\n                     <label>\n                        <span style=\"width: 25%;\">Coin:</span>\n                        <span>").concat(info.money, " Coin</span>\n                    </label>\n                    <label>\n                        <span style=\"width: 25%;\">Vip:</span>\n                        <span><img style=\"margin: 0;\" src=\"/assets/img/vip/vip0_big.png\"> (Bonus 0% khi chuy\u1EC3n xu)</span>\n                    </label>\n                    <label>\n                        <span style=\"width: 25%;\">Exp Vip:</span>\n                        <span>0</span>\n                    </label>\n                    <label>\n                        <span style=\"width: 25%;\">Email:</span>\n                        <span>").concat(info.email ? censorEmail(info.email) : '', "</span>\n                    </label>\n                    <label>\n                        <span style=\"width: 25%;\">Tr\u1EA1ng th\xE1i 2FA:</span>\n                        <span>Ch\u01B0a k\xEDch ho\u1EA1t</span>\n                    </label>\n                    <div class=\"title-new\">\n                        <h2 style=\"color: #c3332a;font-size: 23.4px;padding-top: 15px\">THI\u1EBET L\u1EACP T\xC0I KHO\u1EA2N </h2>\n                    </div>\n                    <div>\n                                            </div>\n                    <div class=\"button-functional-account\">\n                        <button onclick=\"changePasswordSection()\" type=\"button\" class=\"item animElement slide-left in-view\" id=\"changePasswordViewCaller\" style=\"background-color: #0dcaf0; border-color: #0dcaf0;\">\n                            <img src=\"/assets/svgs/key.svg\" style=\"fill:white;\" alt=\"nap_tien\"> \u0110\u1ED5i m\u1EADt kh\u1EA9u\n                        </button>\n                        <a class=\"item animElement slide-left in-view\" id=\"changePhoneCaller\" style=\"background-color: #d84949; border-color: #d84949;\">\n                            <img src=\"/assets/svgs/envelope.svg\" style=\"fill:white;\" alt=\"nap_tien\"> \u0110\u1ED5i S\u0110T\n                        </a>\n                    </div>\n                    <div class=\"title-new\">\n                        <h2 style=\"color: #c3332a;font-size: 23.4px;padding-top: 15px\">CH\u1EE8C N\u0102NG KH\xC1C</h2>\n                    </div>\n                    <div>\n                                            </div>\n                    <div class=\"button-functional-account\">\n                        <a href=\"javascript:rechargeSection()\" class=\"item animElement slide-left in-view\" id=\"rechargeCaller\" style=\"background-color: rgb(245,98,0); border-color: rgb(250,83,0);\">\n                            <img src=\"/assets/svgs/sync-alt.svg\" style=\"fill:white;\" alt=\"nap_tien\"> N\u1EA1p Ti\u1EC1n\n                        </a>\n                        <a href=\"javascript:chargeMoneySection()\" class=\"item animElement slide-left in-view\" id=\"convertCoinCaller\" style=\"background-color: #6c757d; border-color: #6c757d;\">\n                            <img src=\"/assets/svgs/exchange-alt.svg\" style=\"fill:white;\" alt=\"nap_tien\"> Chuy\u1EC3n xu\n                        </a>\n                        <a href=\"javascript:cardHistorySection()\" class=\"item animElement slide-left in-view\" id=\"historyRechargeCaller\" style=\"background-color: #343a40; border-color: #343a40;\">\n                            <img src=\"/assets/svgs/file-invoice-dollar.svg\" style=\"fill:white;\" alt=\"nap_tien\"> L\u1ECBch s\u1EED n\u1EA1p ti\u1EC1n\n                        </a>\n                        <a class=\"item animElement slide-left in-view\" id=\"playWithoutAuthenticateCaller\" style=\"background-color: #3d6c9a; border-color: #3d6c9a;\">\n                            <img src=\"/assets/svgs/rocket.svg\" style=\"fill:white;\" alt=\"nap_tien\"> Link ch\u01A1i game\n                        </a>\n                    </div>\n                    <!--<div class=\"button-functional-account\">\n                        <a class=\"item animElement slide-left in-view\" id=\"changeNickNameCaller\" style=\"background-color: #f5009f; border-color: #f5009f;\">\n                            <img src=\"/assets/svgs/bold.svg\" style=\"fill:white;\" alt=\"doi_ten\"> \u0110\u1ED5i t\xEAn\n                        </a>\n                        <a class=\"item animElement slide-left in-view\" id=\"checkinCaller\" style=\"background-color: #f5009f; border-color: #f5009f;\">\n                            <img src=\"/assets/svgs/user-check.svg\" style=\"fill:white;\" alt=\"checkin\"> \u0110i\u1EC3m danh\n                        </a>\n                    </div>-->\n                </form>\n            </div>\n        </div>\n    </section>\n    <div id=\"dynamicContentView\" style=\"float: left\"></div>\n "));
}
function rechargeSection() {
    accountSection();
    var info = getUserInfo();
    $("#dynamicContentView").html("<section class=\"box register\"><div class=\"title-new\"><h1 style=\"color: #c3332a\">\u0110ANG T\u1EA2I TRANG...</h1></div></section>");
    $('#dynamicContentView').html("\n    <script type=\"text/javascript\">\n    $(document).ready(function() {\n\n        $('.tags').on('click', 'a', function(e) {\n            //console.log(this);\n            var val = $(this).attr('href').slice(1);\n            $(this).parent().find('a').removeClass('selected');\n            $(this).toggleClass('selected');\n            if (val != \"paypal\" && val != \"stripe\" && val != \"card\" && val != \"ex1\") {\n                $('#valor').val(val);\n            }\n            e.preventDefault();\n        });\n    });\n</script>\n<section class=\"box register\">\n    <div class=\"title-new\">\n        <h1 style=\"color: #c3332a\">N\u1EA0P TI\u1EC0N</h1>\n    </div>\n    <div class=\"tabsContent\">\n        <div class=\"active biglist\">\n            <div class=\"tab\">\n                <button class=\"tablinks active\" onclick=\"openPage(event, 'napmomo')\">N\u1EA0P MOMO</button>\n                <button class=\"tablinks\" onclick=\"openPage(event, 'napatm')\">N\u1EA0P ATM</button>\n            </div>\n                <div id=\"napmomo\" class=\"tabcontent\" style=\"display: block;\">\n                    <div class=\"card-body\">\n                        <img class=\"img-thumbnail\" style=\"width: 40vh;\"\n                        src=\"/assets/img/momo.jpg\">\n\t\t\t\t\t\t<br>\n                        Chuy\u1EC3n kho\u1EA3n MOMO t\u1EDBi s\u1ED1 : <b>0344.29.37.32</b> <br>\n                        T\xEAn T\xE0i Kho\u1EA3n : <b>LE VINH HUNG</b><br>\n                        N\u1ED9i dung : <b>".concat(info.username, "</b><br>\n                        <br>\n                        <b>\n                            <font color=\"red\">Vui l\xF2ng chuy\u1EC3n kho\u1EA3n \u0111\xFAng n\u1ED9i dung \u0111\u1EC3 h\u1EC7 th\u1ED1ng t\u1EF1 \u0111\u1ED9ng c\xF4ng coin\n                                ( &lt; 100 gi\xE2y)</font>\n\t\t\t\t\t\t<br />\n\t\t\t\t\t\t<br />\n\t\t\t\t\t\t- T\u1EC9 l\u1EC7 n\u1EA1p MoMo v\xE0 ATM l\xE0 10:3 (10.000 VN\u0110 = 3.000 Coin).<br />\n\t\t\t\t\t\t- Coin na\u0323p s\u01B0\u0309 du\u0323ng trong > M\u1EE5c <font color=\"red\">\"Chuy\u1EC3n xu\"</font>.<br />\n\t\t\t\t\t\t- N\u1EBFu nh\u1EADp <font color=\"red\">\"Sai n\u1ED9i dung\"</font>, vui l\xF2ng ch\u1EE5p bill g\u1EEDi v\xE0o FanPage \u0111\u1EC3 th\xF4ng b\xE1o cho Admin add coin cho b\u1EA1n.<br />\n                        </b>\n                    </div>\n                </div>\n\n                <div id=\"napatm\" class=\"tabcontent\" style=\"display: none;\">\n                    <div class=\"card-body\">\n\t\t\t\t\t\t<div class=\"card-body\">\n                            <img class=\"img-thumbnail\" onclick=\"setTypecard(7)\" style=\"width: 40vh;\"\n                                 src=\"/assets/img/atm.png\">\n\t\t\t\t\t\t<br>\n                        Chuy\u1EC3n kho\u1EA3n ATM t\u1EDBi: 1903678180010<br/>  (-- Ngân Hàng : Techcombank - Lê Vĩnh Hưng-- )<br />\n                        N\u1ED9i dung: <b>").concat(info.username, "</b><br>\n                        <br>\n\t\t\t\t\t\t<br />\n                        <b>\n                            <font color=\"red\">Vui l\xF2ng chuy\u1EC3n kho\u1EA3n \u0111\xFAng n\u1ED9i dung \u0111\u1EC3 h\u1EC7 th\u1ED1ng c\xF3 th\u1EC3 ki\u1EC3m tra nhanh nh\u1EA5t\n                                ( &lt; 90 gi\xE2y)</font>\n\t\t\t\t\t\t<br />\n\t\t\t\t\t\t<br />\n\t\t\t\t\t\t- T\u1EC9 l\u1EC7 n\u1EA1p MoMo v\xE0 ATM l\xE0 10:3 (10.000 VN\u0110 = 3.000 Coin).<br />\n\t\t\t\t\t\t- Coin na\u0323p s\u01B0\u0309 du\u0323ng trong > M\u1EE5c <font color=\"red\">\"Chuy\u1EC3n xu\"</font>.<br />\n\t\t\t\t\t\t- N\u1EA1p xong vui l\xF2ng ch\u1EE5p bill g\u1EEDi v\xE0o FanPage \u0111\u1EC3 th\xF4ng b\xE1o cho Admin add coin cho b\u1EA1n.<br />\n                        </b>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </div>\n    <script type=\"text/javascript\">\n        var typeCard = 0;\n\n        function setTypecard(type) {\n            typeCard = type;\n        };\n    </script>\n</section>\n\n "));
    scrollToRoute();
}
function chargeMoneySection() {
    accountSection();
    $("#dynamicContentView").html("\n    <section class=\"box register\">\n        <div class=\"title-new\">\n            <h1 style=\"color: #c3332a\">Chuy\u1EC3n xu</h1>\n        </div>\n        <div class=\"tabsContent\">\n            <div class=\"active biglist\">\n                <form id=\"convertCoinFrm\" class=\"account\">\n                    <label>\n                        <span>Ch\u1ECDn m\xE1y ch\u1EE7</span> <br>\n                        <select id=\"txtServer\" name=\"txtServer\" class=\"select-phoenix\">\n                            <option value=\"0\">-- Ch\u1ECDn m\xE1y ch\u1EE7 --</option>\n                            ".concat(server_list.map(function (server) {
        return "<option value=\"".concat(server.sid, "\">").concat(server.servername, "</option>");
    }).join(''), "\n                        </select>\n                    </label>\n\n                    <label>\n                        <span>Nh\xE2n v\u1EADt</span>\n                        <input type=\"text\" id=\"txtPlayerNickName\" placeholder=\"\" readonly=\"\" disabled=\"\" required=\"\">\n                        <select type=\"text\" id=\"selectPlayerNickName\" required=\"\" class=\"form-control d-none\">\n                        </select>\n                    </label>\n\n                    <label style=\"margin: 5px 0!important;\">\n                        <div style=\"width: 100%;margin: 5px 0!important;\">\n                            <div style=\"width: 49%;float: left\">\n                                <p style=\"padding-bottom: 5px;\">Coin chuy\u1EC3n</p>\n                                <input type=\"number\" style=\"width: 99%;\" id=\"txtCoinConvert\" placeholder=\"Nh\u1EADp Coin mu\u1ED1n chuy\u1EC7n\" autocomplete=\"off\" required=\"\">\n                            </div>\n                            <div style=\"width: 49%;float: left\">\n                                <p style=\"padding-bottom: 5px;\">Xu nh\u1EADn \u0111\u01B0\u1EE3c</p>\n                                <input type=\"number\" style=\"width: 99%\" id=\"txtMoneyReceive\" placeholder=\"Coin s\u1EBD nh\u1EADn \u0111\u01B0\u1EE3c\" readonly=\"\" disabled=\"\" autocomplete=\"off\" required=\"\">\n                            </div>\n                        </div>\n                    </label>\n\n                    <div class=\"button-functional-account\">\n                        <a id=\"convertCoinBtn\" class=\"item\" style=\"background-color: rgb(245,98,0); border-color: rgb(250,83,0);\">Chuy\u1EC3n xu\n                        </a>\n                    </div>\n                    <div class=\"errors-convert-coin-form\" style=\"display: none;color: red\"></div>\n                </form>\n            </div>\n        </div>\n    </section>\n    "));
    scrollToRoute();
}
function changePasswordSection() {
    $("#dynamicContentView").html("\n    <section class=\"box register\">\n        <div class=\"title-new\">\n            <h1 style=\"color: #c3332a\">Thay \u0111\u1ED5i m\u1EADt kh\u1EA9u</h1>\n        </div>\n        <div class=\"tabsContent\">\n            <div class=\"active biglist\">\n                <form id=\"changePasswordFrm\" class=\"account\">\n                    <label>\n                        <span>M\u1EADt kh\u1EA9u c\u0169</span>\n                        <input type=\"password\" id=\"txtOldPassword\" placeholder=\"\u2022\u2022\u2022\u2022\u2022\u2022\" autocomplete=\"off\" required=\"\">\n                        <div id=\"usernameError\" class=\"error-check\" style=\"display:none;\">\n                            <div id=\"formtip_inner\" class=\"error-check-mess\"></div>\n                        </div>\n                    </label>\n\n                    <label>\n                        <span>M\u1EADt kh\u1EA9u m\u1EDBi</span>\n                        <input id=\"txtNewPassword\" type=\"password\" placeholder=\"\u2022\u2022\u2022\u2022\u2022\u2022\" autocomplete=\"off\" required=\"\" aria-autocomplete=\"list\">\n                        <div id=\"emailError\" class=\"error-check\" style=\"display:none;\"></div>\n                    </label>\n\n                    <label>\n                        <span>X\xE1c nh\u1EADn m\u1EADt kh\u1EA9u m\u1EDBi</span>\n                        <input type=\"password\" id=\"txtConfirmPassword\" placeholder=\"\u2022\u2022\u2022\u2022\u2022\u2022\" autocomplete=\"off\" required=\"\">\n                        <div id=\"regacc_passs_tooltip\" class=\"error-check\" style=\"display:none;\"></div>\n                    </label>\n\n                    <div class=\"button-functional-account\">\n                        <a id=\"changePasswordBtn\" class=\"item\" style=\"background-color: rgb(245,98,0); border-color: rgb(250,83,0);\">Thay \u0111\u1ED5i m\u1EADt kh\u1EA9u\n                        </a>\n                    </div>\n                    <div class=\"errors-change-password-form\" style=\"color: green;\"></div>\n                </form>\n            </div>\n        </div>\n    </section>\n    ");
    scrollToRoute();
}
function scrollToRoute() {
    $(function () {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#dynamicContentView").offset().top
        }, 2000);
    });
}
function cardHistorySection() {
    $("#dynamicContentView").html("\n        <section class=\"box register\">\n            <div class=\"title-new\">\n                <h1 style=\"color: #c3332a\">L\u1ECACH S\u1EEC N\u1EA0P TH\u1EBA</h1>\n            </div>\n            <div class=\"tabsContent\">\n                <div class=\"active biglist\">\n                    <form id=\"createAccountForm\" class=\"account\">\n                        <div class=\"content\">\n                                                <table class=\"MyTable\">\n                                <thead>\n                                <tr>\n                                    <th>Lo\u1EA1i th\u1EBB</th>\n                                    <th>Serial</th>\n                                    <th>M\xE3 Th\u1EBB</th>\n                                    <th>M\u1EC7nh Gi\xE1</th>\n                                    <th>Th\u1EDDi Gian</th>\n                                    <th>Tr\u1EA1ng th\xE1i</th>\n                                </tr>\n                                </thead>\n                                <tbody id=\"cardHistoryTBody\">\n                                    <tr>\n                                        <td colspan=6> <h1 style=\"color: #c3332a\">\u0110ANG T\u1EA2I TRANG...</h1> </td>\n                                    </tr>\n                                </tbody>\n                            </table>\n                                            </div>\n                    </form>\n                </div>\n            </div>\n        </section>\n    ");
    function cardStatus(status) {
        if (status == CARD_SUCCESS) {
            return "<span style=\"color: green\">Th\xE0nh c\xF4ng</span>";
        } else if (status == CARD_FAIL) {
            return "<span style=\"color: red\">Th\u1EA5t b\u1EA1i</span>";
        } else {
            //CARD_PROCESSING
            return "<span style=\"color: blue\">\u0110ang x\u1EED l\xFD</span>";
        }
    }
    $.ajax({
        url: config.app.createRoute('get_log_card'),
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        type: "post",
        dateType: "json",
        success: function success(cards) {
            if (cards.length <= 0) {
                $('#cardHistoryTBody').html("<tr>\n                    <td colspan=6> <h1 style=\"color: #c3332a\">B\u1EA1n kh\xF4ng c\xF3 th\u1EBB n\u1EA1p n\xE0o</h1> </td>\n                </tr>");
            } else {
                $('#cardHistoryTBody').html(cards.map(function (item) {
                    return '<tr>' + +'<td>' + item.card_name + '</td>' + +'<td>' + item.card_seri + '</td>' + +'<td>' + item.card_code + '</td>' + +'<td>' + numberWithCommas(item.money) + 'đ</td>' + +'<td>' + new Date(item.create_at).toLocaleString("vi-VN") + '</td>' + +'<td>' + cardStatus(item.status) + '</td>' + +'</tr>';
                }).join('\n'));
            }
        }
    });
    scrollToRoute();
}
function playServer(sid) {
    var token = getToken();
    $.ajax({
        url: config.app.createRoute('create-flashvars/' + sid),
        headers: {
            'Authorization': 'Bearer ' + token
        },
        type: "get",
        dateType: "json",
        success: function success(t) {
            if (!isNaN(t)) {
                alert('Không thể chọn máy chủ! Vui lòng liên hệ Admin để được hỗ trợ!');
            } else {
                localStorage.setItem('flashData', JSON.stringify(t));
                window.location.href = 'play.htm';
            }
        }
    });
}
function playInterface() {
    var info = getUserInfo();
    if (info) {
        $('#usernameTxt').html(info.username);
        $('#txtCash').html(`Coin: ${info.money}`);
    }
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}