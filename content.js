//"created by David Tantz david.tantz@gmail.com do not copy",

var container1 ="";
let textColorRotater = 0;
var htmlTagSplitter = /(?<script><script>.+>)|(?<htmlTag><[^>]*>)|(?<htmlCharacter>&[^>]*;)|(?<word>\b\w+\b)|(?<other>.)|/gm;
var reHTMLtag = /(?<htmlTag><[^>]*>)/;
var reHhtmlCharacter = /(?<htmlCharacter>&[^>]*;)/;
var reword = /(?<word>\b\w+\b)/;
var rother = /(?<other>.)/;
var rStartLink = /(?<other>href=)/;
var rEndLink = /(?<endLink><\/a>)/;
let linkText = false;


let paragraphs = document.getElementsByTagName('p');
for (elt of paragraphs) {
    if (elt.innerHTML  != "\n" ){
    elt.innerHTML = splitedTextRender (elt.innerHTML) ;
    }
}
let paragraphsH2 = document.getElementsByTagName('h2');
for (elt of paragraphsH2) {
    if (elt.innerHTML  != "\n" ){
    elt.innerHTML = splitedTextRender (elt.innerHTML) ;
    }
}
let paragraphsH3 = document.getElementsByTagName('h3');
for (elt of paragraphsH3) {
    if (elt.innerHTML  != "\n" ){
    elt.innerHTML = splitedTextRender (elt.innerHTML) ;
    }
}
let paragraphsH4 = document.getElementsByTagName('h4');
for (elt of paragraphsH4) {
    if (elt.innerHTML  != "\n" ){
    elt.innerHTML = splitedTextRender (elt.innerHTML) ;
    }
}
let paragraphsH5 = document.getElementsByTagName('h5');
for (elt of paragraphsH5) {
    if (elt.innerHTML  != "\n" ){
    elt.innerHTML = splitedTextRender (elt.innerHTML) ;
    }
}
let paragraphsH6 = document.getElementsByTagName('h6');
for (elt of paragraphsH6) {
    if (elt.innerHTML  != "\n" ){
    elt.innerHTML = splitedTextRender (elt.innerHTML) ;
    }
}
let paragraphsH1 = document.getElementsByTagName('h1');
for (elt of paragraphsH1) {
    if (elt.innerHTML  != "\n" ){
    elt.innerHTML = splitedTextRender (elt.innerHTML) ;
    }
}
//window.addEventListener('mouseup', mousedUped);
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
    var inputBox =/<[^>]*?input/.test(selectedText);
    if (inputBox == false) {
        var rendordText = splitedTextRender (selectedText);
        containerElement.innerHTML = rendordText;
        }
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
        const syllableRegex = /[^aeiouy]*[aeiouy\d]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?|/gi;
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
function splitedTextRender(match) {
    container1 ="";
    textColorRotater = 0;
    var pizza ;
   // console.log(match);
    pizza = match.match(htmlTagSplitter);
    pizza.forEach (match => {
        //console.log(match);
        if (reHTMLtag.test(match) == true || reHhtmlCharacter.test(match) == true) {
                    if (rStartLink.test(match) == true) {
                        linkText = true;                
                    } else {
                        linkText = false; 
                    }
                container1 = container1 + (match);  
            } 
            else if (reword.test(match) == true) {
                var container = document.createElement("span");
                syllablArray = getSyllables(match);
                syllablArray.forEach((textItem, i) => {
                 //   console.log(textItem);
                var span = document.createElement("span");
                    if (linkText == false) {
                        if (textColorRotater % 2 == 0) {
                            span.style.color = "black";
                        } else {
                            span.style.color = "#696969";
                        }
                        textColorRotater ++;
                    } else {
                        if (textColorRotater % 2 == 0) {
                            span.style.color = "#000099";
                        } else {
                            span.style.color = "#0066ff";
                        }
                        textColorRotater ++;
        
                    }
                span.innerHTML = textItem;
                container.appendChild(span);  
                })
                container1 = container1 + (container.innerHTML); 
            } else if (rother.test(match) == true) {
                container1 = container1 + (match);
            }
            else{
                container1 = container1 + (match);
            }
    })
   // console.log(container1);
    return container1;
}