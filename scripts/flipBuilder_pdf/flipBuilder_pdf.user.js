// ==UserScript==
// @name        FlipBuilder pdf download
// @namespace   Violentmonkey Scripts
// @version     1.0
// @icon        https://www.flipbuilder.com/favicon.ico
// @match       *://*/*
// @require     https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js
// @description Downloades the flip book as a pdf file.
// @author      3m4r5
// @homepageURL https://github.com/3m4r5/3m4r5/tree/main/scripts/flipBuilder_pdf
// @updateURL   https://raw.githubusercontent.com/3m4r5/3m4r5/main/scripts/flipBuilder_pdf/flipBuilder_pdf.user.js
// @downloadURL https://raw.githubusercontent.com/3m4r5/3m4r5/main/scripts/flipBuilder_pdf/flipBuilder_pdf.user.js
// @supportURL  https://github.com/3m4r5/3m4r5/issues
// ==/UserScript==

(async function() { 'use strict';

function imageToBase64(img) {
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
    return canvas.toDataURL("image/jpeg", 1.0);
}

async function fetchImageData(url) {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = url;
    return new Promise((resolve, reject) => {
        img.onload = () => {
            const imgData = imageToBase64(img);
            resolve({ imgData });
        };
        img.onerror = reject;
    });
}

var pdfDimensions = null;
function getImageDimensions(imageUrl) {
    const img = new Image();
    img.onload = function() { pdfDimensions = [this.width, this.height]; };
    img.src = imageUrl;
}

await new Promise(resolve => setTimeout(resolve, 3000));
if (document.head.innerHTML.includes('flipbuilder')) {
    const elements = '<img style="filter: brightness(9); height: 2.5rem;"><span style="color: white; font-size: 1.5rem;"></span>'
    const centerDiv = document.createElement("div");
    centerDiv.style.left = "50%";
    centerDiv.style.translate = "-50%";
    centerDiv.style.display = "flex"
    centerDiv.style.gap = "0.5rem";
    centerDiv.style.alignItems = "center";
    centerDiv.classList.add("logoBar");
    centerDiv.innerHTML = elements;
    const source = document.querySelector(".side-content img").src;
    const url = source.split('1.jpg')[0];
    const pagesCount = parseInt(document.querySelector("#currentPageIndexTextField").value.split('/')[0]);
    const { jsPDF } = window.jspdf;
    getImageDimensions(url + '1.jpg');
    const pdf = new jsPDF('p', 'px', pdfDimensions);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const image = centerDiv.querySelector("img");
    const progressText = centerDiv.querySelector("span");
    image.onclick = async () => {
        document.querySelector("#fbTopBar img").src = "https://online.flipbuilder.com/darghadalajyal/drgx/style/icon/loading.svg";
        for (let i = 1; i <= pagesCount; i++) {
            progressText.style.display = "inline";
            progressText.textContent = `downloading (${i}/${pagesCount})`;
            const { imgData } = await fetchImageData(url + i + '.jpg');
            if (i > 1) pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        }
        document.querySelector("#fbTopBar img").src = "https://www.svgrepo.com/show/525323/download-square.svg";
        pdf.save(new URL(url).hostname + '.pdf');
        setTimeout(() => progressText.style.display = "none", 3000);
    };
    image.setAttribute("src", "https://www.svgrepo.com/show/525323/download-square.svg");
    document.getElementById('fbTopBar').prepend(centerDiv);
}

})();