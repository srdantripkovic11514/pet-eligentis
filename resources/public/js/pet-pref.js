$('input[type=range]').wrap("<div class='range'></div>");
var i = 1;

$('.range').each(function() {
  var n = this.getElementsByTagName('input')[0].value;
  var x = (n / 4) * (this.getElementsByTagName('input')[0].offsetWidth - 8) - 41;
  this.id = 'range' + i;
  if (this.getElementsByTagName('input')[0].value == 0) {
    this.className = "range"
  } else {
    this.className = "range rangeM"
  }
  this.innerHTML += "<style>#" + this.id + " input[type=range]::-webkit-slider-runnable-track {background:linear-gradient(to right, #209cee 0%, #209cee " + n*18 + "%, #515151 " + n*18 + "%)} #" + this.id + ":hover input[type=range]:before{content:'" + n + "'!important;left: " + x + "px;} #" + this.id + ":hover input[type=range]:after{left: " + x + "px}</style>";
  i++
});

$('input[type=range]').on("input", function() {
  var a = this.value;
  var p = (a / 4) * (this.offsetWidth - 8) - 41;
  if (a == 0) {
    this.parentNode.className = "range"
  } else {
    this.parentNode.className = "range rangeM"
  }
  this.parentNode.getElementsByTagName('style')[0].innerHTML += "#" + this.parentNode.id + " input[type=range]::-webkit-slider-runnable-track {background:linear-gradient(to right, #209cee 0%, #209cee " + (a-1)*25 + "%, #515151 " + a + "%)} #" + this.parentNode.id + ":hover input[type=range]:before{content:'" + a + "'!important;left: " + p + "px;} #" + this.parentNode.id + ":hover input[type=range]:after{left: " + p + "px}";
})