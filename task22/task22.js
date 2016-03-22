var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d")

var RADIUS = 5;
var COLOR = "#FF0000";
var ANOTHER_COLOR = "#EEEEEE";

var ROOT = new Object();

var MARGIN_X = function(node){
	var wide = canvas.width/(Math.pow(2, getRelativeDepth(node))+1);
	console.log(node);
	console.log(getRelativeDepth(node));
	console.log(Math.pow(2, getRelativeDepth(node))*wide);
	return wide
};
var MARGIN_Y = function(){
	// return canvas.height/getDepth(ROOT, 1)
	return 100
};


function isEmptyObject(anObject) {
    var key;
    for (key in anObject) {
        return false;
    }
    return true;
}

function drawLine(from_x, from_y, to_x, to_y) {
	context.moveTo(from_x, from_y);
	context.lineTo(to_x, to_y);
	context.stroke();
}

function drawCircle(x, y, radius, color) {
	context.fillStyle = color;
	context.beginPath();
	context.arc(x, y, radius, 0, Math.PI*2, true);
	context.closePath();
	context.fill();
	context.stroke();
}

function changeColor(color){
	context.fillStyle = color;
	context.fill();
}

function getRootNode() {
	var node = {
		pos_x: 0,
		pos_y: 0,
		leftChild: new Object(),
		rightChild: new Object()
	};

	return node;
}

function addChild(node){
	if(isEmptyObject(node.leftChild)){
		node.leftChild = {
			pos_x: 0,
			pos_y: 0,
			leftChild: new Object(),
			rightChild: new Object()
		};
	}else if(isEmptyObject(node.rightChild)){
		node.rightChild = {
			pos_x: 0,
			pos_y: 0,
			leftChild: new Object(),
			rightChild: new Object()
		};
	}
}

function showNode(node) {
	context.fillStyle= COLOR;
	context.beginPath();
	context.arc(node.pos_x, node.pos_y, RADIUS, 0, Math.PI*2, true);
	context.closePath();
	context.fill();
}

function showChild(father, child, which){
	if(which == "l"){
		drawLine(father.pos_x, father.pos_y, child.pos_x, child.pos_y);
		drawCircle(child.pos_x, child.pos_y, RADIUS, COLOR);
		// setTimeout("context.fillStyle = ANOTHER_COLOR;context.fill();",1000);
	}else if(which == "r"){
		drawLine(father.pos_x, father.pos_y, child.pos_x, child.pos_y);
		drawCircle(child.pos_x, child.pos_y, RADIUS, COLOR);
		// setTimeout("context.fillStyle = ANOTHER_COLOR;context.fill();",1000);
	};
}

function getDepth(node, depth) {
	if(!isEmptyObject(node.leftChild)){
		depth++;
		var depthFromLeft = getDepth(node.leftChild, depth)
		var depthFromRight = 0;
		if(!isEmptyObject(node.rightChild)){
			depthFromRight = getDepth(node.rightChild, depth);
		}
		return depthFromLeft>depthFromRight?depthFromLeft:depthFromRight;
	}
	return depth
}

function getRelativeDepth(node){
	return getDepth(ROOT, 1)-getDepth(node, 1)
}

function transformTreeToPreOrderArray(node, treeArr){
	treeArr.push(node);
	if(!isEmptyObject(node.leftChild)){
		transformTreeToPreOrderArray(node.leftChild, treeArr);
	};
	if(!isEmptyObject(node.rightChild)){
		transformTreeToPreOrderArray(node.rightChild, treeArr);
	};

	return treeArr
}

function preOrder(node) {
	if(!isEmptyObject(node.leftChild)){
		showChild(node, node.leftChild, "l");
		setTimeout(function(){
			preOrder(node.leftChild);
		}, 1000);
	}
	setTimeout(function(){
		if(!isEmptyObject(node.rightChild)){
			showChild(node, node.rightChild, "r");
			setTimeout(function(){
				preOrder(node.rightChild);
			}, 1000);
		}
	}, 1000)
}

function play() {
	// showNode(ROOT);
	// preOrder(ROOT);

	var treeArr = transformTreeToPreOrderArray(ROOT, []);

	var i = 0;
	var l = treeArr.length
	var int = setInterval(function(){
				if(i >= l){
					clearInterval(int);
				}
				changeColor(ANOTHER_COLOR);
				showNode(treeArr[i]);
				i++;
			}, 500*(i+1));
}

function initTree(){
	ROOT = getRootNode();
	addChild(ROOT);
	addChild(ROOT);
	addChild(ROOT.leftChild);
	addChild(ROOT.leftChild);
	addChild(ROOT.leftChild.rightChild);
	addChild(ROOT.leftChild.rightChild);
	addChild(ROOT.rightChild);
	addChild(ROOT.rightChild);
	addChild(ROOT.rightChild.leftChild);
	addChild(ROOT.rightChild.rightChild);
	addChild(ROOT.rightChild.rightChild);
}

function initPosition(father_x, father_y, child, which){
	child.pos_x = which=="l"?father_x - MARGIN_X(child)/2:which=="r"?father_x + MARGIN_X(child)/2:father_x + MARGIN_X(child);
	child.pos_y = father_y + MARGIN_Y();
	// console.log("("+child.pos_x+","+child.pos_y+")");
	if(!isEmptyObject(child.leftChild)){
		initPosition(child.pos_x, child.pos_y, child.leftChild, "l")
	}
	if(!isEmptyObject(child.rightChild)){
		initPosition(child.pos_x, child.pos_y, child.rightChild, "r")
	}
}

initTree();
initPosition(0, 0, ROOT, "root");
play()











