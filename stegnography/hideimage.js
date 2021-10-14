let canvas1, ctx1;
let canvas2, ctx2;
let canvas3, ctx3;
let canvas4, ctx4;
let canvas5, ctx5;
let canvas6, ctx6;
let btn1, btn2;
let n = 2;
let slider;
let bit_label;
let file1;
mse1=0
mse2=0

document.addEventListener('DOMContentLoaded', (ev) => {
    canvas1 = document.getElementById('canvas1');
    ctx1 = canvas1.getContext('2d');
    canvas1.width = 300;
    canvas1.height = 300;

    canvas2 = document.getElementById('canvas2');
    ctx2 = canvas2.getContext('2d');
    canvas2.width = 300;
    canvas2.height = 300;

    canvas3 = document.getElementById('canvas3');
    ctx3 = canvas3.getContext('2d');
    canvas3.width = 300;
    canvas3.height = 300;

    canvas4 = document.getElementById('canvas4');
    ctx4 = canvas4.getContext('2d');
    canvas4.width = 300;
    canvas4.height = 300;

    canvas5 = document.getElementById('canvas5');
    ctx5 = canvas5.getContext('2d');
    canvas5.width = 300;
    canvas5.height = 300;

    canvas6 = document.getElementById('canvas6');
    ctx6 = canvas6.getContext('2d');
    canvas6.width = 300;
    canvas6.height = 300;

    btn1 = document.getElementById("btn1");
    btn2 = document.getElementById("btn2");
    slider = document.getElementById("bits");
    slider.value = 2;
    bit_label = document.getElementById("bits_label");
    file1 = document.getElementById("file1");

    // if (file1){
    //     console.log("yo ")
    //     file1.addEventListener('input', updateImg1);
    // }

    document.getElementById('file1').onchange = function (evt) {
        var tgt = evt.target || window.event.srcElement,  
            files = tgt.files;

        imgObj = new Image();
        
    
        if (FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = function () {
                // document.getElementById(outImage).src = fr.result;
                imgObj.onload = function () {
                    ctx1.drawImage(imgObj, 0, 0, 300, 300);
                    encode();
                };
                imgObj.src = fr.result;
                
            }
            fr.readAsDataURL(files[0]);
        }

        // Not supported
        else {
            // fallback -- perhaps submit the input to an iframe and temporarily store
            // them on the server until the user's session ends.
        }
    }

    document.getElementById('file2').onchange = function (evt) {
        var tgt = evt.target || window.event.srcElement,  
            files = tgt.files;

        imgObj = new Image();
        
    
        if (FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = function () {
                // document.getElementById(outImage).src = fr.result;
                imgObj.onload = function () {
                    ctx2.drawImage(imgObj, 0, 0, 300, 300);
                    encode();
                };
                imgObj.src = fr.result;
                
            }
            fr.readAsDataURL(files[0]);
        }

        // Not supported
        else {
            // fallback -- perhaps submit the input to an iframe and temporarily store
            // them on the server until the user's session ends.
        }
    }




    slider.onchange = function () {
        n = slider.value;
        // bit_label.innerHTML='Hidden bits: '+n.toString;
        update();
        encode();
    }
    // slider.oninput=function(){
    //     bit_label.innerHTML='Hidden bits: ';//+n.toString;
    // }


    let imgObj1 = new Image();
    // imgObj1.setAttribute('crossOrigin', '')
    imgObj1.onload = function () {
        ctx1.drawImage(imgObj1, 0, 0, 300, 300);
    };
    imgObj1.src = './1.jpg';

    let imgObj2 = new Image();
    imgObj2.onload = function () {
        ctx2.drawImage(imgObj2, 0, 0, 300, 300);
    };
    imgObj2.src = '2.jpg';

    btn1.addEventListener('click', encode);


});

function convertToBinary(x) {
    let bin = 0;
    let rem, i = 1, step = 1;
    while (x != 0) {
        rem = x % 2;
        // console.log(
        //     `Step ${step++}: ${x}/2, Remainder = ${rem}, Quotient = ${parseInt(x/2)}`
        // );
        x = parseInt(x / 2);
        bin = bin + rem * i;
        i = i * 10;
    }
    return bin;
}

const encode = function (ev) {
    // console.log("inside");
    img1Data = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    let arr1 = img1Data.data;
    img2Data = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
    let arr2 = img2Data.data;
    let a = new Array(arr1.length);
    for (let i = 0; i < arr1.length; i = i + 1) {
        let p1 = arr1[i];
        let p2 = arr2[i];
        let b1 = '0'.repeat(8 - p1.toString(2).length) + p1.toString(2);
        let b2 = '0'.repeat(8 - p2.toString(2).length) + p2.toString(2);
        let b = b1.slice(0, 8 - n) + b2.slice(0, n);
        let p = parseInt(b, 2);
        arr1[i] = p;
        // console.log(arr1[i],a[i])
    }
    img1Data.data = arr1;
    ctx3.putImageData(img1Data, 0, 0);
    decode();
}

const decode = function (ev) {
    imgData = ctx3.getImageData(0, 0, canvas3.width, canvas3.height);
    arr = imgData.data;
    for (let i = 0; i < arr.length; i = i + 1) {
        p = arr[i];
        b = '0'.repeat(8 - p.toString(2).length) + p.toString(2);
        B = b.slice(8 - n, 8) + '0'.repeat(8 - n);
        p = parseInt(B, 2);
        arr[i] = p;
    }
    imgData.data = arr;
    ctx4.putImageData(imgData, 0, 0);
    // console.log('pls')
    calculate_distortion();
}

const calculate_distortion = function (ev) {
    // console.log("here calculating.")

    mse1=0
    imgData1 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    imgData2 = ctx3.getImageData(0, 0, canvas3.width, canvas3.height);
    arr1 = imgData1.data;
    arr2 = imgData2.data;
    for (let i = 0; i < arr1.length; i = i + 1) {
        mse1=mse1+(arr1[i]-arr2[i])**2;
        arr1[i] = arr1[i]-arr2[i];
        if (arr1[i]<0){arr1[i]=-arr1[i]}
        // arr1[i] = 255

        // if (arr1[i]>0){arr1[i]=255}
        // arr1[i]=100
    }
    mse1=mse1/arr1.length
    console.log("mse1: ",mse1)
    imgData1.data = arr1;
    ctx5.putImageData(imgData1, 0, 0);

    mse2=0
    imgData1 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
    imgData2 = ctx4.getImageData(0, 0, canvas4.width, canvas4.height);
    arr1 = imgData1.data;
    arr2 = imgData2.data;
    for (let i = 0; i < arr1.length; i = i + 1) {
        mse2=mse2+(arr1[i]-arr2[i])**2;
        arr1[i] = (arr1[i]-arr2[i])
        // if (arr1[i]>0){arr1[i]=255}
        // arr1[i]=100
    }
    mse2=mse2/arr1.length
    console.log("mse2: ",mse2)
    imgData1.data = arr1;
    ctx6.putImageData(imgData1, 0, 0);
    update();

}

function update() {
    document.getElementById("bit_label").innerHTML = 'Hidden bits: ' + n;
    document.getElementById("mse1").innerHTML = 'MSE for cover image: ' + mse1.toFixed(2);
    document.getElementById("mse2").innerHTML = 'MSE for hidden image: ' + mse2.toFixed(2);
}

function change1() {
    imgObj = new Image();
    imgObj.onload = function () {
        ctx1.drawImage(imgObj, 0, 0, 300, 300);
        encode();
    };
    n = document.getElementById("select1").value;
    imgObj.src = n + '.jpg';
}

function change2() {
    imgObj = new Image();
    imgObj.onload = function () {
        ctx2.drawImage(imgObj, 0, 0, 300, 300);
        encode();
    };
    n = document.getElementById("select2").value;
    imgObj.src = n + '.jpg';
}


function updateImg1(input) {
    console.log("here i am", input.value);
    // imgObj1.src=file1.value;

    imgObj = new Image();
    imgObj.onload = function () {
        ctx1.drawImage(imgObj, 0, 0, 300, 300);
        encode();
    };
    imgObj.src = input.value;
}


