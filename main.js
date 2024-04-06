const canvas=document.getElementById("Sign");
const context=canvas.getContext('2d');
let isDrawing=false;
let lastX=0;
let lastY=0;

canvas.addEventListener('mousedown',(e)=>{
    isDrawing=true;
    [lastX,lastY]=[e.offsetX,e.offsetY];
})

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        const penSize = document.getElementById('pensize').value;
        const textColor = document.getElementById('textColor').value;
        context.lineWidth = penSize;
        context.lineCap = 'round';
        context.strokeStyle = textColor;
        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
});


canvas.addEventListener('mouseup',(e)=>{
    isDrawing=false;
})

function clearform(){
context.clearRect(0,0,canvas.width,canvas.height);
}

function savesign(){
    if (context.getImageData(0, 0, canvas.width, canvas.height).data.some(channel => channel !== 0)) {
        const URL=canvas.toDataURL();
        const a=document.createElement('a');
        a.href=URL;
        a.download='signature.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } else {
        alert("Canvas is empty. Please draw something before saving.");
    }
}