text = document.getElementById("text");
button = document.getElementById("button");

button.onclick = () => {
        content1 = "Hello world";
        content2 = "world Hello";
        if (text.getHTML() === content1) text.innerHTML = content2;
        else text.innerHTML = content1;
}
