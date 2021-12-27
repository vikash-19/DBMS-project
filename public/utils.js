async function searchPNR() {
    let coll=document.querySelectorAll("fieldset input")
    let query="/PNRSearch?"

    for(let a of coll){
        query=`${query}${a.name}='${a.value}'&`
    }
    query= query.substring(0,query.length-1)
    console.log(query)
    let doc = document.querySelector("body")
    doc.removeChild(doc.childNodes[doc.childNodes.length-1])
    fetch(query).then((res)=>res.json())
    .then((data)=>{
    let resTable=document.createElement("table");
    let keys=Object.keys(data[0])
    let Head=document.createElement("tr")
    for(let hd of keys){
        let th=document.createElement('th');
        th.innerText=hd
        Head.appendChild(th);
    }
    resTable.appendChild(Head);
    doc.appendChild(resTable);
    for(let dat of data){
        console.log(dat)
        Head=document.createElement("tr")
        for(let hd of keys){
        let th=document.createElement('td');
        th.innerText=dat[hd]
        Head.appendChild(th);
    }
    resTable.appendChild(Head);
    }
    
    }

    )
}



////////////////////////////////////////////////////////////////////////////
// JS FOR TRAIN SEARCHING



async function enquiryTrain() {
    let coll=document.getElementsByClassName("stat")
    let query="/enquiryTrain?"

    for(let a of coll){
        query=`${query}${a.name}='${a.value}'&`
    }
    query= query.substring(0,query.length-1)
    console.log(query)
    let doc = document.querySelector("body")
    doc.removeChild(doc.childNodes[doc.childNodes.length-1])
    fetch(query).then((res)=>res.json())
    .then((data)=>{
    let resTable=document.createElement("table");
    let keys=Object.keys(data[0])
    let Head=document.createElement("tr")
    for(let hd of keys){
        let th=document.createElement('th');
        th.innerText=hd
        Head.appendChild(th);
    }
    resTable.appendChild(Head);
    doc.appendChild(resTable);
    for(let dat of data){
        console.log(dat)
        Head=document.createElement("tr")
        for(let hd of keys){
        let th=document.createElement('td');
        th.innerText=dat[hd]
        Head.appendChild(th);
    }
    resTable.appendChild(Head);
    }
    
    }

    )
}

