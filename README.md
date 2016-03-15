#ife_2016 百度前端学院 2016 春季班

Notes
===

Task8
---
**1. box-sizing:**

>To solve the problem of extra width or height caused by padding and border, one solution maybe subtract the extra manually. But with box-sizing: border-box, the problem will be solved automatically.

Definition from [CSS3 box-sizing Property](http://www.w3schools.com/cssref/css3_pr_box-sizing.asp)
```
The box-sizing property is used to tell the browser what the sizing properties (width and height) should include.

Should they include the border-box? Or just the content-box (which is the default value of the width and height properties)?
```
Property Values:

| Value	| Description |
| :--- | :--- |
| content-box	| Default. The width and height properties (and min/max properties) includes only the content. Border, padding, or margin are not included |
| border-box |	The width and height properties (and min/max properties) includes content, padding and border, but not the margin initial Sets this property to its default value. Read about initial|
| inherit	| Inherits this property from its parent element. Read about inherit|

Check these sites:

- [在Bootstrap中的box-sizing使用注意](http://www.uedsc.com/bootstrap-box-sizing.html)
- [使用box-sizing让CSS布局更直观](http://www.jb51.net/softjc/309879.html)

**2. CSS calc() Function**

>When margins added to the grids, there is a need to resize the grid(subtrct the extra width or height caused by margin) so that the total width of grids in a row won't be larger than the width of the row. calc() helps us to do that.

Definition from [CSS calc() Function](http://www.w3schools.com/CSSref/func_calc.asp)
```
The calc() function performs a calculation to be used as the property value.
```

For more detail, check [CSS calc() Function](http://www.w3schools.com/CSSref/func_calc.asp). Note that you need to add prefixs(-webkit-, -moz-, or -o-) to make it work in different browsers.

