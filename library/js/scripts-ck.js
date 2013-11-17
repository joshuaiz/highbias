/*
Bones Scripts File
Author: Eddie Machado

This file should contain any js scripts you want to add to the site.
Instead of calling it in the header or throwing it inside wp_head()
this file will be called automatically in the footer so as not to
slow the page load.

*/// IE8 ployfill for GetComputed Style (for Responsive Script below)
function validate_upload_form() {
    var e = "", t = jQuery("#input_1_9").val();
    if ((jQuery.trim(jQuery("#input_1_9").val()).length <= 0 || jQuery.trim(jQuery("#input_1_9").val()) == "http://") && jQuery("#fileupload").parent().css("display") != "none") {
        alert("You must add a file for upload or provide a URL");
        return !1;
    }
    jQuery.trim(jQuery("#input_1_1").val()).length <= 0 && (e += "Contact Name, ");
    var n = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    n.test(jQuery.trim(jQuery("#input_1_2").val())) || (e += "Email, ");
    jQuery.trim(jQuery("#input_1_3").val()).length <= 0 && (e += "Project Label, ");
    jQuery.trim(jQuery("#input_1_4").val()).length <= 0 && (e += "Project Artist, ");
    jQuery.trim(jQuery("#input_1_5").val()).length <= 0 && (e += "Project Title, ");
    jQuery.trim(jQuery("#input_1_6").val()).length <= 0 && (e += "Catalog Number, ");
    jQuery.trim(jQuery("#input_1_8").val()).length <= 0 && (e += "Number of Tracks, ");
    if (e) {
        e = e.substring(0, e.length - 2);
        e = "The following fields must have a valid entry: " + e;
        alert(e);
        return !1;
    }
    if (!jQuery("#choice_13_1").is(":checked")) {
        alert("Please read and agree to the Terms and Conditions");
        return !1;
    }
    return !0;
}

window.getComputedStyle || (window.getComputedStyle = function(e, t) {
    this.el = e;
    this.getPropertyValue = function(t) {
        var n = /(\-([a-z]){1})/g;
        t == "float" && (t = "styleFloat");
        n.test(t) && (t = t.replace(n, function() {
            return arguments[2].toUpperCase();
        }));
        return e.currentStyle[t] ? e.currentStyle[t] : null;
    };
    return this;
});

jQuery(document).ready(function(e) {
    var t = e(window).width();
    t < 481;
    t > 481;
    t >= 768 && e(".comment img[data-gravatar]").each(function() {
        e(this).attr("src", e(this).attr("data-gravatar"));
    });
    t > 1030;
});

(function(e) {
    function c() {
        n.setAttribute("content", s);
        o = !0;
    }
    function h() {
        n.setAttribute("content", i);
        o = !1;
    }
    function p(t) {
        l = t.accelerationIncludingGravity;
        u = Math.abs(l.x);
        a = Math.abs(l.y);
        f = Math.abs(l.z);
        !e.orientation && (u > 7 || (f > 6 && a < 8 || f < 8 && a > 6) && u > 5) ? o && h() : o || c();
    }
    if (!(/iPhone|iPad|iPod/.test(navigator.platform) && navigator.userAgent.indexOf("AppleWebKit") > -1)) return;
    var t = e.document;
    if (!t.querySelector) return;
    var n = t.querySelector("meta[name=viewport]"), r = n && n.getAttribute("content"), i = r + ",maximum-scale=1", s = r + ",maximum-scale=10", o = !0, u, a, f, l;
    if (!n) return;
    e.addEventListener("orientationchange", c, !1);
    e.addEventListener("devicemotion", p, !1);
})(this);

jQuery(function() {
    jQuery(".file-uploader").insertAfter("#gform_fields_1");
});

jQuery(function() {
    jQuery("#field_1_8.gfield_error").length > 0 && jQuery("#field_1_9").addClass("rightfix");
});

jQuery(function() {
    jQuery("#gform_confirmation_wrapper_1").length > 0 && jQuery("section.file-uploader, .uploader .article-header, .uploader p.intro, #secondary, .upload-trigger").hide();
});

jQuery(".upload-trigger").click(function() {
    jQuery(".uploader").slideToggle(function() {
        jQuery(".upload-trigger").text(jQuery(this).is(":visible") ? "- Hide Uploader" : "+ Show Uploader");
    });
});

jQuery(function() {
    jQuery("body").is(".client, .administrator") && jQuery(".uploader").show(function() {
        jQuery(".upload-trigger").text(jQuery(this).is(":visible") ? "- Hide Uploader" : "+ Show Uploader");
    });
});

jQuery(function() {
    jQuery(".highbiasplus").length == 0 && jQuery("#text-2").show();
});

jQuery(".features-trigger").click(function() {
    jQuery(".hbp-features").slideToggle(function() {
        jQuery(".features-trigger").text(jQuery(this).is(":visible") ? "- Hide Features" : "+ See All Features...");
    });
});

jQuery(document).ready(function() {
    var e = "http://1.gravatar.com/avatar/5c53609dff286449fe601b9c4cf8aaf8?s=57&d=http%3A%2F%2Fhighbiasmastering.com%2Fwp-content%2Fthemes%2Fhighbias%2Flibrary%2Fimages%2Fhbmavatar.png%3Fs%3D57&r=G", t = "http://hbmstatic.com/images/JOSHUA_sq_114_orange.png";
    jQuery('td.avatar img[src="' + e + '"]').attr("src", t);
});

jQuery(function() {
    jQuery("<span class='mobile-upload clearfix'><a href='/upload/'>Upload</a></span>").insertAfter(".top-cart");
});

jQuery(function() {
    jQuery("span.hbpmetaplan:contains('Silver')").css("color", "#999");
    jQuery("span.hbpmetaplan:contains('Gold')").css("color", "#B28F00");
    jQuery("span.hbpmetaplan:contains('Platinum')").css("color", "#8AB8E6");
    jQuery("span.hbpmetaplan:contains('Diamond')").css("color", "#FFF");
});

jQuery(document).ready(function() {
    jQuery("#testimonials .slide");
    setInterval(function() {
        jQuery("#testimonials .slide").filter(":visible").fadeOut(1e3, function() {
            jQuery(this).next(".slide").size() ? jQuery(this).next().fadeIn(1e3) : jQuery("#testimonials .slide").eq(0).fadeIn(1e3);
        });
    }, 8e3);
});

jQuery(function(e) {
    "use strict";
    var t = 0, n = window.location.hostname === "blueimp.github.io" ? "//jquery-file-upload.appspot.com/" : "/uploader/server/php/", r = e("<button/>").addClass("btn upload-button").prop("disabled", !0).text("Processing...").on("click", function() {
        var t = e(this), n = t.data();
        t.off("click").text("Abort").on("click", function() {
            t.remove();
            n.abort();
        });
        n.submit().always(function() {
            t.remove();
        });
    });
    e("#fileupload").fileupload({
        url: n,
        dataType: "json",
        autoUpload: !1,
        maxNumberOfFiles: 1,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png|aif?f|wav|zip|mp3)$/i,
        maxFileSize: 4294967296,
        disableImageResize: /Android(?!.*Chrome)|Opera/.test(window.navigator.userAgent),
        previewMaxWidth: 100,
        previewMaxHeight: 100,
        previewCrop: !0
    }).on("fileuploadadd", function(t, n) {
        n.context = e("<div/>").appendTo("#files");
        e.each(n.files, function(t, i) {
            var s = e("<p/>").append(e("<span/>").text(i.name));
            t || s.append("<br>").append(r.clone(!0).data(n));
            s.appendTo(n.context);
        });
        jQuery("#upload_btn").unbind("click");
        jQuery("#upload_btn").click(function() {
            validate_upload_form() && n.submit();
        });
        e("#fileupload").parent().css("display", "none");
        var i = "http://highbiasmastering.com/uploader/server/php/files/" + encodeURIComponent(n.files[0].name);
        e("#input_1_11").val(i);
    }).on("fileuploadprocessalways", function(t, n) {
        var r = n.index, i = n.files[r], s = e(n.context.children()[r]);
        i.preview && s.prepend("<br>").prepend(i.preview);
        i.error && s.append("<br>").append(i.error);
        r + 1 === n.files.length && n.context.find("button").text("Upload").prop("disabled", !!n.files.error);
    }).on("fileuploadprogressall", function(n, r) {
        var i = parseInt(r.loaded / r.total * 100, 10), s = r.loaded / r.total * 100;
        e("#progress .bar").css("width", i + "%");
        e("#progressIndContainer").length == 0 && e('<p id="progressIndContainer">Progress: <span id="progressIndPercent">0%</span> - <span id="progressIndRemain">??</span> remaining</p>').insertAfter("#progress");
        e("#progressIndPercent").html(i + "%");
        t || (t = (new Date).getTime());
        var o = (new Date).getTime() - t, u = (100 - s) / (s / o);
        u /= 1e3;
        if (!isFinite(u)) u = "??"; else if (u < 60) u = u.toFixed(1) + " seconds"; else {
            u /= 60;
            var a = Math.floor(u), f = Math.floor(u % 1 * 60);
            (new String(f)).length < 2 && (f = "0" + f);
            u = a + "m" + f + "s";
        }
        e("#progressIndRemain").html(u);
    }).on("fileuploaddone", function(t, n) {
        e.each(n.result.files, function(t, r) {
            var i = e("<a>").attr("target", "_blank").prop("href", r.url);
            e(n.context.children()[t]).wrap(i);
        });
        jQuery("#gform_1").submit();
    }).on("fileuploadfail", function(t, n) {
        e.each(n.result.files, function(t, r) {
            var i = e("<span/>").text(r.error);
            e(n.context.children()[t]).append("<br>").append(i);
        });
    }).prop("disabled", !e.support.fileInput).parent().addClass(e.support.fileInput ? undefined : "disabled");
});

jQuery("#upload_btn").click(function() {
    validate_upload_form() && jQuery("#gform_1").submit();
});

jQuery(function() {
    jQuery(".tooltip1").qtip({
        content: {
            text: 'Upgrade to <a href="http://highbiasmastering.com/hbp/">High Bias Plus</a> to get mastering for as low as $20/track! See all <a href="http://highbiasmastering.com/hbp/">High Bias Plus plans</a>',
            title: {
                text: "High Bias Plus"
            }
        },
        style: {
            tip: {
                corner: !0
            }
        },
        position: {
            my: "bottom center",
            at: "top center"
        },
        show: "click mouseenter",
        hide: "unfocus"
    });
});