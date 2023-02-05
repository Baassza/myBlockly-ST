function save_Arduino() {
    var code=document.getElementById("content_arduino").innerText;
    var name=document.getElementById("sketch_name").value;
    var prefix           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 6; i++ ) {
        prefix += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const a = document.createElement('a');
    const file = new Blob([code], {type: 'text/plain'});
    a.href= URL.createObjectURL(file);
    a.download = name+"-"+prefix+".ino";
    a.click();
    URL.revokeObjectURL(a.href);
}

function copy() {
    var code=document.getElementById("content_arduino").innerText;
    navigator.clipboard.writeText(code);
    alert("OK")
}