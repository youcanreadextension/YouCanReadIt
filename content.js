
var container1 ="";
let textColorRotater = 0;
window.addEventListener('mouseup', mousedUped);
function mousedUped() {
    container1 ="";
    var text = "", containerElement = null;
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var node = sel.getRangeAt(0).commonAncestorContainer;
            containerElement = node.nodeType == 1 ? node : node.parentNode;
            text = sel.toString();
        }
    } else if (typeof document.selection != "undefined" &&
               document.selection.type != "Control") {
        var textRange = document.selection.createRange();
        containerElement = textRange.parentElement();
        text = textRange.text;
    }
  let selectedText = containerElement.innerHTML;
  selectedText.replace (htmlTagSplitter,splitedTextRender);  
  containerElement.innerHTML = container1;
}
function getSyllables(word){
    var response = [];
    var isSpecialCase = false;
    var nums = (word.match(/[aeiou]/gi) || []).length;
    if (isSpecialCase == false && (word.match(/[0123456789<>=+/"]/gi) || []).length == word.length ){
        // has digits
        response.push(word);
        isSpecialCase = true;
    }
    if (isSpecialCase == false && word.length < 4){
        // three letters or less
        response.push(word);
        isSpecialCase = true;
    } 
    if (isSpecialCase == false && word.charAt(word.length-1) == "e"){
        if (isVowel(word.charAt(word.length-2)) == false){
            var cnt = (word.match(/[aeiou]/gi) || []).length;
            if (cnt == 3){
                if (hasDoubleVowels(word)){
                    // words like "piece, fleece, grease"
                    response.push(word);
                    isSpecialCase = true;
                }
            }
            if (cnt == 2){
                // words like "phase, phrase, blaze, name", 
                if (hasRecurringConsonant(word) == false) {
                // but not like "syllable"
                response.push(word);
                isSpecialCase = true;
                }
  
            }                    
        }
    }
    if (isSpecialCase == false){
        const syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/g;
        response = word.match(syllableRegex);
    }
    return response;
  } 
  function isVowel(someChar){
    var vowels = new Array('a', 'e', 'u', 'i', 'o');
      for(var j = 0; j < 5; j++){
          if(vowels[j] === someChar){
              return true;
          }
      }
      return false;
  }
  function hasDoubleVowels(word){
    return / [aeiou]{2}/.test(word);
  }
  function hasRecurringConsonant(word){
    return / ([b-df-hj-np-tv-z])\1{1,}/.test(word);
  }
var htmlTagSplitter = /(?<htmlTag><[^>]*>)|(?<word>\b\w+\b)|(?<other>.)|/gm;
function splitedTextRender(match) {
   // console.log(match);
    var reHTMLtag = /(?<htmlTag><[^>]*>)/;
    var reword = /(?<word>\b\w+\b)/;
    if (reHTMLtag.test(match) == true) {
        container1 = container1 + (match);  
    } else if (reword.test(match) == true) {
        var container = document.createElement("span");
        match = getSyllables(match);
        match.forEach((textItem, i) => {
        var span = document.createElement("span");
          if (textColorRotater % 2 == 0) {
              span.style.color = "black";
          } else {
              span.style.color = "#696969";
          }
          textColorRotater ++;
          span.innerHTML = textItem;
          container.appendChild(span);  
        })
        container1 = container1 + (container.innerHTML); 
} else {
    container1 = container1 + (match);
}
}