function $$$()
{}

function LastValues()
{}

var modelDS='';
var lastValues=new LastValues();

$$$.setModel=function(model){
if(model==modelDS.model) return;
var curlyBracesCollection=[];
var properties=[];
var text='';
var property='';
<!-- curly braces part starts -->
var childNodes=document.body.childNodes;
for(var childNode of childNodes)
{
text=childNode.textContent;
for(var j=0;j<text.length;j++)
{

property='';
if(text[j]=='{' && text[j+1]=='{' && text[j+2]=='{')
{

for(j=j+3;(text[j]!='}') && j<text.length;j++) property=property+text[j];
if(j<text.length && text[j]=='}' && (text[j+1]=='}') && (text[j+2]=='}') && property in model)
{

var found=false;
for(let p of properties)
{
if(p==property) 
{
found=true;
break;
}
}

if(found==false)
{ 
lastValues['obj'+property]='';
properties.push(property);
}

found=false;
for(var curly of curlyBracesCollection)
{
if(curly.element==childNode)
{
for(let p of curly.property)
{
if(p.localeCompare(property)==0)
{
found=true;
break;
}
}
if(found==false)
{
curly.property.push(property);
found=true;
break;
}
}
}

if(found==false)
{
curlyBracesCollection.push({
"property":[property],
"text":text,
"element":childNode,
});
}

}
}

}<!-- second for -->
}<!-- first for -->
<!-- curly braces part ends -->


var tmBindDS=[];
var tmIfDS=[];
var tableDS=[];
var tmForStepDS=[];
var tmForInDS=[];

var tableModel='';
var tm_bind='';
var tm_if='';
var tm_for='';

for(var tag of document.all)
{
<!-- curly braces part starts -->

if(tag.hasAttribute('tableModel') && tag.hasAttribute('tm-bind'))
{
tableModel=tag.getAttribute('tableModel').trim();
tm_bind=tag.getAttribute('tm-bind').trim();
if((tableModel.length!=0) && (tm_bind.length!=0) && (tableModel in model) && (tm_bind in model))
{
tableDS.push(tag);
}
tableModel='';
tm_bind='';
}

if(tag.hasAttribute('tm-bind') && (tag.hasAttribute('tableModel')==false))
{
tm_bind=tag.getAttribute('tm-bind').trim();
if(tm_bind.length!=0 && (tm_bind in model))
{
tmBindDS.push(tag);
lastValues['obj'+tm_bind]='';
}
tm_bind='';
}

if(tag.hasAttribute('tm-if'))
{
tm_if=tag.getAttribute('tm-if').trim();
if(tm_if.length>8)
{
let correctString="mode=='";
let wrong=false;
let i=0;
while(i<7)
{
if(correctString[i]!=tm_if[i])
{ 
wrong=true;
break;
}
++i;
}
if(wrong==false)
{
let index=tm_if.indexOf("'",i);
if(index!=-1 && tm_if.length-1>index) wrong=true;
//else wrong=true;
}
if(wrong==false) tmIfDS.push(tag);
}
tm_if='';
}

if(tag.hasAttribute('tm-for'))
{
tm_for=tag.getAttribute('tm-for').trim();
if(tm_for.length>3)
{
if(tm_for.includes('=') && (tm_for.includes('to') || tm_for.includes('step')))
{
let step=1;
let startPoint=0;
let endPoint=0;
let variableName='';
let expression=tm_for;
expression=expression.split('step=');
let to=expression[0].split('to').map(subString=>subString.trim());
let equalTo=to[0].split('=').map(subString=>subString.trim());
let alphabets='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let numbers='0123456789';
if(expression.length==1 || expression.length==2)
{
if(to.length==1 || to.length==2)
{
if(equalTo.length==2)
{
let notACharacterOrANumber=false;
if(equalTo[0].length==0 || equalTo[1].length==0) throw  new SyntaxError('Variable Name or Start Point not given');
for(let character of equalTo[0])
{
if(alphabets.indexOf(character)==-1)
{
notACharacterOrANumber=true;
break;
}
}
if(notACharacterOrANumber) throw new SyntaxError("Unexpected Identifier caught expected alphabet given symbol");
for(let character of equalTo[1])
{
if(numbers.indexOf(character)==-1)
{
notACharacterOrANumber=true;
break;
}
}
if(notACharacterOrANumber) throw new SyntaxError("Unexpected Identifier caught expected integer given character");
endPoint=eval(equalTo[1]);
startPoint=0;
variableName=equalTo[0];
} //equalTo.length==2;
else
{
throw new SyntaxError("Missing assignment part (variable name and value) before 'to' or more than one '=' are given.");
}
if(to.length==2)
{
if(to[1].length==0) throw new SyntaxError("End point not given after 'to'");
let notANumber=false;
for(let character of to[1])
{
if(numbers.indexOf(character)==-1)
{
notANumber=true;
break;
}
}
if(notANumber) throw new SyntaxError("Unexpected Identifier caught expected integer given character");
startPoint=endPoint;
endPoint=eval(to[1]);
}
} //to.length==1|| to.length==2;
else
{
throw new SyntaxError("Range not given or more than one 'to' found");
}
if(expression.length==2)
{
if(expression[1].length==0) throw new SyntaxError("Step Missing, step part is not given");
let notANumber=false;
for(let character of expression[1].trim())
{
if(numbers.indexOf(character)==-1)
{
notANumber=true;
break;
}
}
if(notANumber) throw new SyntaxError("Unexpected Identifier caught expected integer given character");
step=eval(expression[1]);
}
} //expression.length==1 || expression.length==2;
else
{
throw new SyntaxError("Invalid Syntax of given expression of tm_for");
}

let childNodes=tag.childNodes;
let text='';
let tagChilds=[];

for(let i=0;i<childNodes.length;i++)
{
text=childNodes[i].textContent;
if(text.includes('{{{'+variableName+'}}}'))
{
tagChilds.push({
"text":text,
"index":i,
});
} // if(text.includes('{{{'+variableName+'}}}')) ends
} // first for(var i=0;i<childNodes.length;i++) ends

tmForStepDS.push({
"variableName":variableName,
"start":startPoint,
"end":endPoint,
"step":step,
"tag":tag,
"tagChilds":tagChilds,
"cloneTagsArray":'',
"processed":false,
});

}
else if(tm_for.includes('in'))
{
let expression=tm_for;
let variableName='';
let propertyName='';
expression=expression.split('in').map(subString=>subString.trim());
let alphabets='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
if(expression.length==2)
{
if(expression[0].length==0 || expression[1].length==0)
{
throw new SyntaxError("variable name or list is not given.");
}
let notACharacter=false;
for(let subPart of expression)
{
for(var character of subPart)
{
if(alphabets.indexOf(character)==-1)
{
notACharacter=true;
break;
}
}
if(notACharacter) break;
}
if(notACharacter) throw new SyntaxError("Unexpected Identifier caught expected alphabet given '"+character+"'");
if(!(expression[1] in model))
{
throw new SyntaxError("'"+expression[1]+"' not found in given model");
}
}
else
{
throw new SyntaxError("Invalid Syntax of given expression of tm_for");
}
variableName=expression[0];
propertyName=expression[1];

let property='';
let tagChilds=[];

var firstElement=eval('model.'+propertyName+'[0]');
if(typeof firstElement=='object')
{
let childNodes=tag.childNodes;
for(let i=0;i<childNodes.length;i++)
{

text=childNodes[i].textContent;
for(var j=0;j<text.length;j++)
{

property='';
if(text[j]=='{' && text[j+1]=='{' && text[j+2]=='{')
{

for(j=j+3;(text[j]!='}') && j<text.length;++j) property=property+text[j];

let inPart=property.split('.');
let isPropertyIsSNO=false;
if(property.localeCompare('s.no.')==0)
{
property='s.no.';
isPropertyIsSNO=true;
}
else if(inPart.length==2) 
{
property=inPart[1];
}

if((inPart.length==2 || isPropertyIsSNO==true) && j<text.length && text[j]=='}' && (text[j+1]=='}') && (text[j+2]=='}') && ((inPart[0].localeCompare(variableName)==0 && property in firstElement) || isPropertyIsSNO==true))
{
var tagAndPropertyFound=false;
for(let tag of tagChilds)
{
if(tag.index==i)
{
for(let p of tag.properties)
{
if(p.localeCompare(property)==0)
{
tagAndPropertyFound=true;
break;
}
}
if(tagAndPropertyFound==false)
{
tag.properties.push(property);
tagAndPropertyFound=true;
break;
}
}
}

if(tagAndPropertyFound==false)
{
tagChilds.push({
"properties":[property],
"text":text,
"index":i,
});
} //tagAndPropertyFound==false ends

} //if(inPart.length==2 && j<text.length && text[j]=='}' && (text[j+1]=='}') && (text[j+2]=='}') && inPart[0].localeCompare(variableName)==0 && inPart[1] in firstElement) ends
} //if(text[j]=='{' && text[j+1]=='{' && text[j+2]=='{') ends
} // second for(var j=0;j<text.length;j++) ends
} // first for(var i=0;i<childNodes.length;i++) ends

tmForInDS.push({
"variableName":variableName,
"propertyName":propertyName,
"tag":tag,
"tagChilds":tagChilds,
"cloneTagsArray":'',
});

} // if(typeof firstElement=='object') ends

}
else
{
throw new SyntaxError("Invalid tm-for expression");
}
}
tm_for='';
}

}<!-- for close -->

modelDS={
"model":model,
"tableDS":tableDS,
"tmBindDS":tmBindDS,
"tmIfDS":tmIfDS,
"tmForDS":{"tmForInDS":tmForInDS, "tmForStepDS":tmForStepDS,},
"curlyBracesDS":curlyBracesCollection,
"properties":properties,
};

$$$.observer();
}<!--setModel close -->


<!-- observer function starts -->
$$$.observer=function(){
var model=modelDS.model;
var tables=modelDS.tableDS;
var binds=modelDS.tmBindDS;
var tmIf=modelDS.tmIfDS;
var tmForInDS=modelDS.tmForDS.tmForInDS;
var tmForStepDS=modelDS.tmForDS.tmForStepDS;
var curlyBraces=modelDS.curlyBracesDS;
var properties=modelDS.properties;
var property='';

<!--bind part starts -->
for(let tag of binds)
{
if(tag.value.length==0)
{
continue;
}
property=tag.getAttribute('tm-bind').trim();
let propertyValue=model[property];
if(tag.value.localeCompare(propertyValue)!=0)
{
if(lastValues['obj'+property].toString().localeCompare(propertyValue)!=0)
{
lastValues['obj'+property]=propertyValue;
lastValues['compo'+property]=propertyValue;
}
model[property]=tag.value;
}
}<!-- for loop ends -->
<!-- bind part ends -->

<!-- curly braces part starts -->
let check=0;
for(let p of properties) 
{
if(lastValues['obj'+p].toString().localeCompare(model[p])!=0)
{
check++;
}
}
if(check!=0) 
{
let expression='';
let text='';
for(let changeText of curlyBraces)
{
text=changeText.text;
for(let p of changeText.property)
{
expression='{{{'+p+'}}}';
text=text.replace(new RegExp(expression,'g'),model[p]);
lastValues['obj'+p]=model[p];
}
changeText.element.textContent=text;
}
}
<!-- curly braces part ends -->

<!-- tm-if part starts -->
for(let tag of tmIf)
{
let expression=tag.getAttribute('tm-if').trim();
if(eval("model."+expression))
{
tag.style.display='';
}
else
{
tag.style.display='none';
}
}
<!-- tm-if part ends -->

<!-- tm-for part starts -->

// tmForStepDS starts
for(let tmForStep of tmForStepDS)
{
if(tmForStep.processed==false)
{
tmForStep.processed=true;
while(tmForStep.cloneTagsArray.length>0) tmForStep.cloneTagsArray.pop().remove();
let cloneNodeToBeAddedAfter=tmForStep.tag;
let cloneTagsArray=[];
let cloneTag=tmForStep.tag;

// code to edit main tag starts
for(let tagChild of tmForStep.tagChilds)
{
let changedText=tagChild.text;
let expression='{{{'+tmForStep.variableName+'}}}';
changedText=changedText.replace(new RegExp(expression,'g' ),1);
cloneTag.childNodes[tagChild.index].textContent=changedText;
}
//code to edit main tag ends

for(let i=tmForStep.start;i<tmForStep.end;i+=tmForStep.step)
{
cloneTag=tmForStep.tag.cloneNode(true);
for(let tagChild of tmForStep.tagChilds)
{
let changedText=tagChild.text;
let expression='{{{'+tmForStep.variableName+'}}}';
changedText=changedText.replace(new RegExp(expression,'g' ),i);
cloneTag.childNodes[tagChild.index].textContent=changedText;
}
tmForStep.tag.parentNode.insertBefore(cloneTag,cloneNodeToBeAddedAfter.nextSibling);
cloneNodeToBeAddedAfter=cloneTag;
cloneTagsArray.push(cloneTag);
}
tmForStep.cloneTagsArray=cloneTagsArray;
}
}
// tmForStepDS ends

// tmForInDS starts
for(let tmForIn of tmForInDS)
{
if(eval("model."+tmForIn.propertyName)!=eval("lastValues.obj"+tmForIn.propertyName))
{
if(tmForIn.cloneTagsArray.length!=0)
{
while(tmForIn.cloneTagsArray.length>0) tmForIn.cloneTagsArray.pop().remove();
}

let cloneNodeToBeAddedAfter=tmForIn.tag;
let cloneTagsArray=[];
let listOrArray=eval("model."+tmForIn.propertyName);
let cloneTag=tmForIn.tag;

// code to edit main tag starts
for(let tagChild of tmForIn.tagChilds)
{
let changedText=tagChild.text;
let expression='';
for(let p of tagChild.properties)
{
if(p.localeCompare('s.no.')==0)
{ 
expression='{{{'+p+'}}}';
changedText=changedText.replace(new RegExp(expression,'g' ),1);
}
else 
{
expression='{{{'+tmForIn.variableName+'.'+p+'}}}';
changedText=changedText.replace(new RegExp(expression,'g' ),eval('listOrArray[0].'+p));
}
}
cloneTag.childNodes[tagChild.index].textContent=changedText;
}
//code to edit main tag ends

for(let i=1;i<listOrArray.length;++i)
{
cloneTag=tmForIn.tag.cloneNode(true);
for(let tagChild of tmForIn.tagChilds)
{
let changedText=tagChild.text;
let expression='';
for(let p of tagChild.properties)
{
if(p.localeCompare('s.no.')==0)
{ 
expression='{{{'+p+'}}}';
changedText=changedText.replace(new RegExp(expression,'g' ),i+1);
}
else
{
expression='{{{'+tmForIn.variableName+'.'+p+'}}}';
changedText=changedText.replace(new RegExp(expression,'g' ),eval('listOrArray['+i+'].'+p));
}
}
cloneTag.childNodes[tagChild.index].textContent=changedText;
}
tmForIn.tag.parentNode.insertBefore(cloneTag,cloneNodeToBeAddedAfter.nextSibling);
cloneNodeToBeAddedAfter=cloneTag;
cloneTagsArray.push(cloneTag);
}
tmForIn.cloneTagsArray=cloneTagsArray;
lastValues['obj'+tmForIn.propertyName]=listOrArray;
}
}
// tmForInDS ends
<!-- tm-for part ends -->

setTimeout($$$.observer,1000);
}
<!-- observer function ends -->

