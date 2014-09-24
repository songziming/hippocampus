function Ajax()
{
	var xmlhttp;
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	return xmlhttp;
}

function getArg(url)
{
	var arg=url.split("?");
	if(!arg[1])return;

	var ans=arg[1].split("=");
	return ans[1];
}

function logOut()
{
	for(key in localStorage)
	{
        if(key.substr(0,5) == "penta")
		  localStorage.removeItem(key);
	}
	alert("成功退出");
	location.reload(true);
}

function isLogin()
{
	if(localStorage.getItem('penta_email') == null)
		return false;
	return true;
}

function showLocalStorage()
{
	var str;
	for(key in localStorage)
	{
		str += key;
		str += localStorage[key];
		str += '\n';
	}
	alert(str);
}

function getPageDepth()
{
	var strHref = location.href;
	var pageName = strHref.slice(strHref.lastIndexOf('/')+1);
	if(pageName == "index.html" || pageName == "index.html#"
		|| pageName == "#" || pageName == ""){
		return 1;
	}
	else return 2;
}

function getPageName()
{
	var strHref = location.href;
	return strHref.slice(strHref.lastIndexOf('/')+1);
}


