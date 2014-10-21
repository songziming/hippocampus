function search(){
	var searchContent=document.getElementById("search-input").value;
	if(searchContent=="" || searchContent==null)
	{
		return null;
	}
	else
	{
		var searchResult=Array();
		var allCards=window.allcards;
		console.log(allCards);
		for(var x in allCards)
		{
			if(x.title.indexof(searchContent) || x.content.indexof(searchContent))
			{
				searchResult.push(x);
			}
		}
		return searchResult;
	}	
}