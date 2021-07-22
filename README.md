# <div align='center'> TMJavaScript_Framework </div>
A Small JavaScript Framework based on MVC Concept. This framework allows the features like

* Write `{{{property_name_of_your_model}}}` wherever you want in the body tag of your html.
* Binding those tags which have value attribute with the property of Model. Just put `tm-bind='property_name_of_your_model'` in the tag.
* Set the display of tags using if condition support. Just put `tm-if="property_name_of_your_model=='whatever_value'"` in the tag.
* Draw multiple tag using for loop support. Just put `tm-for='x=1 to 5 step=1'` in the tag you want to repeat with `{{{x}}}` in the textarea of tag where you want. <br>
For Example : 
```
<span tm-for='x=1 to 5 step=1'>
 tm-for 2 'x=1 to 5 step=1' {{{x}}}<br>
</span>
```
* Fill data to the tag using same for loop support. Just put `tm-for="e in employees"` in the tr tag or in whatever tag you want.<br>
For Example : 
```
<tr tm-for="e in employees">
<td>{{{s.no.}}}</td>
<td>{{{e.id}}}</td>
<td>{{{e.name}}}</td>
<td>{{{e.gender}}}</td>
<td>{{{e.salary}}}</td>
</tr>
```
In above code 's.no.' is case-sensitive for serial number and id, name, gender, salary are the properties of 



```
<!DOCTYPE html>
<html lang='en'>
<head>
<meta charset='utf-8'>
<title>set model test case</title>
<script src="/ajax-examples/framework.js"></script>

<script>
function Employee(name,id,salary,gender)
{
this.name=name;
this.id=id;
this.salary=salary;
this.gender=gender;
}

function Model()
{
this.mode='view';
this.employees=[new Employee("Gopal",101,12300000,'M'),
new Employee("Rohan",102,25000000,'M'),
new Employee("Mohan",103,25000000,'M'),
new Employee("Suman",104,35000000,'F'),
new Employee("Ritesh",105,45000000,'M'),
new Employee("Garima",106,55000000,'F')];

this.abcd='';
this.xyz=0;
this.mno=function(){
return "cool stuff";
};
this.jkl='God is great';
}
var model=new Model();

function testIt()
{
$$$.setModel(model);
}

</script>
</head>
<body>{{{mno}}}
Enter Name : 
<input type='text' id='name' name='name' tm-bind='abcd' >
<hr>
Enter Address :{{{abcd}}}
<textarea type='text' id='address' name='address' tm-bind='mno'></textarea>
<hr>
Enter Gender : 
<input type='radio' tm-bind='gdrMale' id='male' name='gender' value='M'>Male{{{maja}}}
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<input type='radio' tm-bind='gdrFemale' id='female' name='gender' value='F'>{{{jklFemale
<hr>
<span tm-for=''>  {{{s.no.}}} {{{e.name}}} {{{e.gender}}} {{{e.salary}}} {{{e.id}}}<br></span>
<hr>
Enter City : {{{jkl}}}
<select id='city' name='city' tm-bind='abcd'>
<option value='-1' selected>&lt;Select City&gt;</option>
<option value='101'>Ujjain</option>
<option value='102'>Bhopal</option>
<option value='103'>Pune</option>
<option value='104'>Mumbai</option>
</select>
<hr>
<span tm-for='x=1 to 5 step=1'>tm-for 2 'x=1 to 5 step=1' {{{x}}}<br></span>
<hr>
<div tm-if="mode=='view' ">tm-if view if
<table border='1'>
<tr>
<th>S.No.</th>
<th>Id.</th>
<th>Name</th>
<th>Gender</th>
<th>Salary</th>
</tr> 
<tr tm-for="e in employees">
<td>{{{s.no.}}}</td>
<td>{{{e.id}}}</td>
<td>{{{e.name}}}</td>
<td>{{{e.gender}}}</td>
<td>{{{e.salary}}}</td>
</tr>
</table>
<button type='button' onclick="model.mode='delete'">show Delete if</button>
</div>
<hr>
<div tm-if="mode=='add' ">tm-if add if
<button type='button' onclick="model.mode='view'">show View if</button>
</div>
<hr>
<div tm-if="mode=='delete' ">tm-if delete if
<button type='button' onclick="model.mode='add'">show Add if </button>
</div>
<hr>
Indian{{{abcd}}}{{{cty}}}whatever{{{mno}}} : 
<input type='checkbox' id='indian' name='indian' value=' Indian '>{{{xyz}
<hr>
<button id='btn' type='button' onclick=testIt()>Traverse{{{xyz}}}</button>
</body>
</html>
```
#### Before triggering the observer
![image](https://user-images.githubusercontent.com/60133190/126603254-ae9e0ef7-830e-48c4-a26b-c79016e621f7.png)
#### After triggering the observer
![image](https://user-images.githubusercontent.com/60133190/126603427-552a751a-ff61-4eeb-8ff9-f3414c55806f.png)
