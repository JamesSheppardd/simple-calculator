const topBar: any = document.getElementById("calculation-bar-input");

const add = (a:number, b:number) => {
    const result = a + b;
    topBar.value += result.toString();
    console.log(result)
}


export { add };