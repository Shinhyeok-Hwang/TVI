chrome.storage.local.get(['initialized'], function(result) {

    if(result.initialized == undefined){
        chrome.storage.local.set({'initialized': 1});
        chrome.storage.local.set({'date': 0});
        chrome.storage.local.set({'activated': 1});
        chrome.storage.local.set({'thanos_power': 3});
        chrome.storage.local.set({'thanos_vacation':30});
        chrome.storage.local.set({'ironman_love':3000});
    }
    chrome.storage.local.get(['activated'], function(result){
        if(result.activated == 1){
            document.getElementById("onoffbutton").checked = true;
        }
        else {
            document.getElementById("onoffbutton").checked = false;
        }
    });
    chrome.storage.local.get(['thanos_power'], function(result){
        document.getElementById("thanos_power_slider").value = result.thanos_power;
        document.getElementById("thanos_power").innerHTML = result.thanos_power;
    });
    chrome.storage.local.get(['thanos_vacation'], function(result){
        document.getElementById("thanos_vacation_slider").value = result.thanos_vacation;
        document.getElementById("thanos_vacation").innerHTML = result.thanos_vacation;
    });
    chrome.storage.local.get(['ironman_love'], function(result){
        document.getElementById("ironman_love_slider").value = result.ironman_love;
        document.getElementById("ironman_love").innerHTML = result.ironman_love;
    });

    var checkbox = document.getElementById("onoffbutton");
    checkbox.addEventListener( 'change', function() {
        if(this.checked) {
            chrome.storage.local.set({'activated': 1});        
        } else {
            chrome.storage.local.set({'activated': 0});       
        }
    });

    var p_slider = document.getElementById("thanos_power_slider");
    var p_output = document.getElementById("thanos_power");

    p_output.innerHTML = p_slider.value;
    p_slider.oninput = function() {
        p_output.innerHTML = this.value;
        chrome.storage.local.set({'thanos_power': this.value});
    }

    var v_slider = document.getElementById("thanos_vacation_slider");
    var v_output = document.getElementById("thanos_vacation");

    v_output.innerHTML = v_slider.value;

    v_slider.oninput = function() {
        v_output.innerHTML = this.value;
        chrome.storage.local.set({'thanos_vacation': this.value});
    }

    var i_slider = document.getElementById("ironman_love_slider");
    var i_output = document.getElementById("ironman_love");

    i_output.innerHTML = i_slider.value;

    i_slider.oninput = function() {
        i_output.innerHTML = this.value;
        chrome.storage.local.set({'ironman_love': this.value});
    }    
});


// var button = document.getElementById("confirm_button");
// button.addEventListener("click",function () {
//     if(document.getElementById("onoffbutton").checked){
//         activated = 1;
//     } else {
//         activated = 0;
//     }
//     chrome.storage.local.set({'activated': activated});
//     chrome.storage.local.set({'thanos_power': thanos_power});
//     chrome.storage.local.set({'thanos_vacation': thanos_vacation});
//     chrome.storage.local.set({'ironman_love': ironman_love});
// })



