var player , random , y , tarnode , curpos , clonenode, dd ,targetnode,dclickimg,myvar;
var contmove = 0;
var noofcalls = 0;
var six = 0;
window.addEventListener("keydown", function(event) {
    if(event.key=="c")
    {
        six = 1;
    }
  }, true);
function play(){
    if(six==0)
    {
        random = Math.floor(Math.random( ) * 6 + 1);
    }
    else
    {
        random=6;
        six=0;
    }
    dd = document.getElementById("dice");
    dd.innerHTML=random;
    dd.removeAttribute("onclick","play()");
    getset();
    check();
}

function getset()
{
    var x = dd.classList[6];
    if(x=="player1")
    {
        player = 0;
        start = 0;
        gohome = 51;
        home = 505;
    }
    else if(x=="player2")
    {
        player = 1;
        start = 26;
        gohome = 25;
        home = 245;
    }
    else if(x=="player3")
    {
        player = 2;
        start = 13;
        gohome = 11;
        home = 115;   
    }
    else if(x=="player4")
    {
        player = 3;
        start = 39;
        gohome = 37;
        home = 375;   
    }
}

function check(){
    var flag = 0;
    if(player==0)
        y = document.getElementsByClassName("redhouse");
    else if(player==1)
        y = document.getElementsByClassName("yellowhouse");
    else if(player==2)
        y = document.getElementsByClassName("bluehouse");
    else if(player==3)
        y = document.getElementsByClassName("greenhouse");

    for(counter=0;counter<4;counter++)
    {
        if(y[counter].classList[2]=="inhouse")
        {
            if(random==6)
            {
                flag = 1;
                y[counter].setAttribute("onclick","move(this)");
            }
        }
        else if((Number(y[counter].classList[2])+random)<=home)
        {
            flag = 1;
            y[counter].setAttribute("onclick","move(this)");
        }
    }

    if(flag==0)
    {
        dd.setAttribute("onclick","play()");
        switchplayer();
    }

    if(random == 6)
        contmove = 1;
}

function move(clickimg)
{
	for(counter=0;counter<4;counter++)
    {
        y[counter].removeAttribute("onclick","move(this)");
    }
	targetnode = clickimg.parentElement;
    dclickimg = clickimg;

    clonenode = clickimg.cloneNode(true);
    curpos = clickimg.classList[2];
    if(curpos=="inhouse")
    {
        tarnode = start;
        clickimg.remove();
        targetnode = document.getElementById(tarnode);
                clonenode.classList.remove(curpos);
                clonenode.classList.add(tarnode);
                targetnode.insertBefore(clonenode,targetnode.firstChild);
    checkmove();
    }
    else
    {
        curpos = Number(curpos);            
        myVar = setInterval(sarkav, 300);
    }
}

function sarkav(){
    noofcalls = noofcalls + 1;
    dclickimg.remove();
    tarnode = curpos + 1;
    if(tarnode==52)
        tarnode = tarnode - 52;
    else if(tarnode == gohome)  
        tarnode = (tarnode-1) * 10;
    targetnode = document.getElementById(tarnode);
    clonenode.classList.remove(curpos);
    clonenode.classList.add(tarnode);
    targetnode.insertBefore(clonenode,targetnode.firstChild);
    dclickimg = targetnode.children[0];
    clonenode = (dclickimg).cloneNode(true);
    curpos = tarnode;
    if(noofcalls == random)
    {
        clearInterval(myVar);
        noofcalls=0;
        checkmove();
    }
}

function checkmove(){
    if(targetnode.childElementCount > 1)
    {
        if(targetnode.children[1].classList[0] != clonenode.classList[0] && tarnode % 13 != 0 && tarnode % 13 != 8)
        {
            var xxx = targetnode.children[1].classList[2];
            targetnode.children[1].classList.remove(xxx);
            targetnode.children[1].classList.add("inhouse");
            document.getElementById(targetnode.children[1].classList[1]).append(targetnode.children[1]);
            contmove = 1;
        }
    }
    else if(tarnode == home)
    {
        contmove = 1;
    }
    
    dd.setAttribute("onclick","play()");
    dd.innerHTML = "-";
    switchplayer();
}

function switchplayer()
{
    if(contmove!=1)
    {
        if(player==0)
        {
            dd.classList.remove("player1");
            dd.classList.add("player2");
            dd.style.color ="#ffd11a";
        }
        else if(player==1)
        {
            dd.classList.remove("player2");
            dd.classList.add("player1");
            dd.style.color ="red";
        }
    }
    contmove = 0;
}