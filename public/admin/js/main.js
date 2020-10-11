var adminPage = document.querySelector('.widget-menu .active a span').innerHTML;
document.getElementById('title-admin').append(adminPage)

var VietnameseSigns = [ "aAeEoOuUiIdDyY-",
	"áàạảãâấầậẩẫăắằặẳẵ",
	"ÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴ",
	"éèẹẻẽêếềệểễ",
	"ÉÈẸẺẼÊẾỀỆỂỄ",
	"óòọỏõôốồộổỗơớờợởỡ",
	"ÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠ",
	"úùụủũưứừựửữ",
	"ÚÙỤỦŨƯỨỪỰỬỮ",
	"íìịỉĩ",
	"ÍÌỊỈĨ",
	"đ",
	"Đ",
	"ýỳỵỷỹ",
	"ÝỲỴỶỸ",
	" "
];
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
var vietnameseStringToUrl = function(str) {
    for (var i = 1; i < VietnameseSigns.length; i++)
    {
        for (var j = 0; j < VietnameseSigns[i].length; j++)
            str = str.replaceAll(VietnameseSigns[i][j], VietnameseSigns[0][i - 1]);
    }
    return str.toLowerCase();
}
