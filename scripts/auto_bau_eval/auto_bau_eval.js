// ==UserScript==
// @name        auto bau eval
// @homepageURL https://github.com/3m4r5/3m4r5/tree/main/scripts/auto_bau_eval
// @updateURL   https://raw.githubusercontent.com/3m4r5/3m4r5/main/scripts/auto_bau_eval/auto_bau_eval.js
// @downloadURL https://raw.githubusercontent.com/3m4r5/3m4r5/main/scripts/auto_bau_eval/auto_bau_eval.js
// @namespace   Violentmonkey Scripts
// @match       *://*bau.edu.jo*/eval*
// @grant       none
// @version     1.0
// @author      3m4r5
// @description automatically answers all 19 questions and copies the number into its field.
// ==/UserScript==
(async function() {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    var firstRadio = document.querySelector('input[type="radio"]');
    if (firstRadio) {
        if (firstRadio.checked){
            if (window.location.href.substr(-2) == '19'){
                var forms = document.getElementsByTagName('form');
                var words = forms[forms.length - 1].textContent.split(':');
                var inputElement = document.getElementById("captcha");
                if (inputElement) inputElement.value = words[words.length - 1].trim();
                var button = document.getElementById('btn1');
                await sleep(300);
            } else var button = document.getElementById('btnNext');
            if (button) button.click();
        } else {
            firstRadio.checked = true;
            firstRadio.dispatchEvent(new Event('change'));
        }
    }
})();
