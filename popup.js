var p_slider = document.getElementById("thanos_power_slider");
var p_output = document.getElementById("thanos_power");

p_output.innerHTML = p_slider.value;

p_slider.oninput = function() {
  p_output.innerHTML = this.value;
}

var v_slider = document.getElementById("thanos_vacation_slider");
var v_output = document.getElementById("thanos_vacation");

v_output.innerHTML = v_slider.value;

v_slider.oninput = function() {
  v_output.innerHTML = this.value;
}

var i_slider = document.getElementById("ironman_love_slider");
var i_output = document.getElementById("ironman_love");

i_output.innerHTML = i_slider.value;

i_slider.oninput = function() {
  i_output.innerHTML = this.value;
}