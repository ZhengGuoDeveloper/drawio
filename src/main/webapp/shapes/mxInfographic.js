/**
 * $Id: mxBasic.js,v 1.5 2016/04/1 12:32:06 mate Exp $
 * Copyright (c) 2006-2018, JGraph Ltd
 */
//**********************************************************************************************************************************************************
//Numbered entry (vertical)
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeInfographicNumEntryVert(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dy = 0.5;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeInfographicNumEntryVert, mxActor);

mxShapeInfographicNumEntryVert.prototype.cst = {NUM_ENTRY_VERT : 'mxgraph.infographic.numberedEntryVert'};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeInfographicNumEntryVert.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var dy = Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'dy', this.dy))));

	var inset = 5;

	var d = Math.min(dy, w - 2 * inset, h - inset);
	
	c.ellipse(w * 0.5 - d * 0.5, 0, d, d);
	c.fillAndStroke();
	
	c.begin();
	c.moveTo(0, d * 0.5);
	c.lineTo(w * 0.5 - d * 0.5 - inset, d * 0.5);
	c.arcTo(d * 0.5 + inset, d * 0.5 + inset, 0, 0, 0, w * 0.5 + d * 0.5 + inset, d * 0.5);
	c.lineTo(w, d * 0.5);
	c.lineTo(w, h);
	c.lineTo(0, h);
	c.close();
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxShapeInfographicNumEntryVert.prototype.cst.NUM_ENTRY_VERT, mxShapeInfographicNumEntryVert);

mxShapeInfographicNumEntryVert.prototype.constraints = null;

Graph.handleFactory[mxShapeInfographicNumEntryVert.prototype.cst.NUM_ENTRY_VERT] = function(state)
{
	var handles = [Graph.createHandle(state, ['dy'], function(bounds)
	{
		var dy = Math.max(0, Math.min(bounds.width, bounds.width, parseFloat(mxUtils.getValue(this.state.style, 'dy', this.dy))));

		return new mxPoint(bounds.x + bounds.width / 2, bounds.y + dy);
	}, function(bounds, pt)
	{
		this.state.style['dy'] = Math.round(100 * Math.max(0, Math.min(bounds.height, bounds.width, pt.y - bounds.y))) / 100;
	})];
			
	return handles;
};

//**********************************************************************************************************************************************************
//Bending Arch
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeInfographicBendingArch(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.startAngle = 0.25;
	this.endAngle = 0.75;
	this.arcWidth = 0.5;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeInfographicBendingArch, mxActor);

mxShapeInfographicBendingArch.prototype.cst = {BENDING_ARCH : 'mxgraph.infographic.bendingArch'};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeInfographicBendingArch.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var startAngle = 2 * Math.PI * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'startAngle', this.startAngle))));
	var endAngle = 2 * Math.PI * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'endAngle', this.endAngle))));
	var arcWidth = 1 - Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'arcWidth', this.arcWidth))));
	var rx = w * 0.5;
	var ry = h * 0.5;
	var rx2 = rx * arcWidth;
	var ry2 = ry * arcWidth;
	
	var startX = rx + Math.sin(startAngle) * rx;
	var startY = ry - Math.cos(startAngle) * ry;
	var innerStartX = rx + Math.sin(startAngle) * rx2;
	var innerStartY = ry - Math.cos(startAngle) * ry2;
	var endX = rx + Math.sin(endAngle) * rx;
	var endY = ry - Math.cos(endAngle) * ry;
	var innerEndX = rx + Math.sin(endAngle) * rx2;
	var innerEndY = ry - Math.cos(endAngle) * ry2;
	
	var angDiff = endAngle - startAngle;
	
	if (angDiff < 0)
	{
		angDiff = angDiff + Math.PI * 2;
	}
		
	var bigArc = 0;
	
	if (angDiff > Math.PI)
	{
		bigArc = 1;
	}

	var rx3 = rx2 - 5;
	var ry3 = ry2 - 5;

	c.ellipse(w * 0.5 - rx3, h * 0.5 - ry3, 2 * rx3, 2 * ry3);
	c.fillAndStroke();
	
	c.begin();
	c.moveTo(startX, startY);
	c.arcTo(rx, ry, 0, bigArc, 1, endX, endY);
	c.lineTo(innerEndX, innerEndY);
	c.arcTo(rx2, ry2, 0, bigArc, 0, innerStartX, innerStartY);
	c.close();
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxShapeInfographicBendingArch.prototype.cst.BENDING_ARCH, mxShapeInfographicBendingArch);

mxShapeInfographicBendingArch.prototype.constraints = null;

Graph.handleFactory[mxShapeInfographicBendingArch.prototype.cst.BENDING_ARCH] = function(state)
{
	var handles = [Graph.createHandle(state, ['startAngle'], function(bounds)
	{
		var startAngle = 2 * Math.PI * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.state.style, 'startAngle', this.startAngle))));

		return new mxPoint(bounds.x + bounds.width * 0.5 + Math.sin(startAngle) * bounds.width * 0.5, bounds.y + bounds.height * 0.5 - Math.cos(startAngle) * bounds.height * 0.5);
	}, function(bounds, pt)
	{
		var handleX = Math.round(100 * Math.max(-1, Math.min(1, (pt.x - bounds.x - bounds.width * 0.5) / (bounds.width * 0.5)))) / 100;
		var handleY = -Math.round(100 * Math.max(-1, Math.min(1, (pt.y - bounds.y - bounds.height * 0.5) / (bounds.height * 0.5)))) / 100;
		
		var res =  0.5 * Math.atan2(handleX, handleY) / Math.PI;
		
		if (res < 0)
		{
			res = 1 + res;
		}

		this.state.style['startAngle'] = res;
		
	})];

	var handle2 = Graph.createHandle(state, ['endAngle'], function(bounds)
	{
		var endAngle = 2 * Math.PI * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.state.style, 'endAngle', this.endAngle))));

		return new mxPoint(bounds.x + bounds.width * 0.5 + Math.sin(endAngle) * bounds.width * 0.5, bounds.y + bounds.height * 0.5 - Math.cos(endAngle) * bounds.height * 0.5);
	}, function(bounds, pt)
	{
		var handleX = Math.round(100 * Math.max(-1, Math.min(1, (pt.x - bounds.x - bounds.width * 0.5) / (bounds.width * 0.5)))) / 100;
		var handleY = -Math.round(100 * Math.max(-1, Math.min(1, (pt.y - bounds.y - bounds.height * 0.5) / (bounds.height * 0.5)))) / 100;
		
		var res =  0.5 * Math.atan2(handleX, handleY) / Math.PI;
		
		if (res < 0)
		{
			res = 1 + res;
		}
		
		this.state.style['endAngle'] = res;
	});
	
	handles.push(handle2);
	
	var handle3 = Graph.createHandle(state, ['arcWidth'], function(bounds)
	{
		var arcWidth = Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.state.style, 'arcWidth', this.arcWidth))));

		return new mxPoint(bounds.x + bounds.width / 2, bounds.y + arcWidth * bounds.height * 0.5);
	}, function(bounds, pt)
	{
		this.state.style['arcWidth'] = Math.round(100 * Math.max(0, Math.min(bounds.height / 2, bounds.width / 2, (pt.y - bounds.y) / (bounds.height * 0.5)))) / 100;
	});
			
	handles.push(handle3);
	
	return handles;
};

//**********************************************************************************************************************************************************
//Parallelogram
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeInfographicParallelogram(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dx = 10;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeInfographicParallelogram, mxActor);

mxShapeInfographicParallelogram.prototype.cst = {PARALLELOGRAM : 'mxgraph.infographic.parallelogram'};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeInfographicParallelogram.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var dx = Math.max(0, Math.min(w * 0.5, parseFloat(mxUtils.getValue(this.style, 'dx', this.dx))));

	c.begin();
	c.moveTo(0, h);
	c.lineTo(2 * dx, 0);
	c.lineTo(w, 0);
	c.lineTo(w - 2 * dx, h);
	c.close();
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxShapeInfographicParallelogram.prototype.cst.PARALLELOGRAM, mxShapeInfographicParallelogram);

mxShapeInfographicParallelogram.prototype.constraints = null;

Graph.handleFactory[mxShapeInfographicParallelogram.prototype.cst.PARALLELOGRAM] = function(state)
{
	var handles = [Graph.createHandle(state, ['dx'], function(bounds)
	{
		var dx = Math.max(0, Math.min(bounds.width / 2, parseFloat(mxUtils.getValue(this.state.style, 'dx', this.dx))));

		return new mxPoint(bounds.x + dx, bounds.y + bounds.height / 2);
	}, function(bounds, pt)
	{
		this.state.style['dx'] = Math.round(100 * Math.max(0, Math.min(bounds.width / 2, pt.x - bounds.x))) / 100;
	})];
			
	return handles;
};

//**********************************************************************************************************************************************************
//Ribbon Rolled
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeInfographicRibbonRolled(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dx = 0.5;
	this.dy = 0.5;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeInfographicRibbonRolled, mxActor);

mxShapeInfographicRibbonRolled.prototype.cst = {RIBBON_ROLLED : 'mxgraph.infographic.ribbonRolled'};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeInfographicRibbonRolled.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var dx = Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'dx', this.dx))));
	var dy = Math.max(0, Math.min(h * 0.5, parseFloat(mxUtils.getValue(this.style, 'dy', this.dy))));

	c.begin();
	c.moveTo(0, dy);
	c.lineTo(dx, 0);
	c.lineTo(dx, dy);
	c.lineTo(w, dy);
	c.lineTo(w, h - dy);
	c.lineTo(w - dx, h);
	c.lineTo(w - dx, h - dy);
	c.lineTo(0, h - dy);
	c.close();
	c.fillAndStroke();
	
	c.setShadow(false);
	c.setFillAlpha('0.2');
	c.setFillColor('#000000');
	c.begin();
	c.moveTo(0, dy);
	c.lineTo(dx, 0);
	c.lineTo(dx, dy);
	c.close();
	c.moveTo(w, h - dy);
	c.lineTo(w - dx, h);
	c.lineTo(w - dx, h - dy);
	c.close();
	c.fill();
	
	c.begin();
	c.moveTo(0, dy);
	c.lineTo(dx, 0);
	c.lineTo(dx, dy);
	c.lineTo(w, dy);
	c.lineTo(w, h - dy);
	c.lineTo(w - dx, h);
	c.lineTo(w - dx, h - dy);
	c.lineTo(0, h - dy);
	c.close();
	c.stroke();
	
};

mxCellRenderer.registerShape(mxShapeInfographicRibbonRolled.prototype.cst.RIBBON_ROLLED, mxShapeInfographicRibbonRolled);

mxShapeInfographicRibbonRolled.prototype.constraints = null;

Graph.handleFactory[mxShapeInfographicRibbonRolled.prototype.cst.RIBBON_ROLLED] = function(state)
{
	var handles = [Graph.createHandle(state, ['dx', 'dy'], function(bounds)
	{
		var dx = Math.max(0, Math.min(bounds.width, parseFloat(mxUtils.getValue(this.state.style, 'dx', this.dx))));
		var dy = Math.max(0, Math.min(bounds.height / 2, parseFloat(mxUtils.getValue(this.state.style, 'dy', this.dy))));

		return new mxPoint(bounds.x + dx, bounds.y + dy);
	}, function(bounds, pt)
	{
		this.state.style['dx'] = Math.round(100 * Math.max(0, Math.min(bounds.width, pt.x - bounds.x))) / 100;
		this.state.style['dy'] = Math.round(100 * Math.max(0, Math.min(bounds.height / 2, pt.y - bounds.y))) / 100;
	})];
			
	return handles;
};

//**********************************************************************************************************************************************************
//Ribbon Double Folded
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeInfographicRibbonDoubleFolded(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dx = 0.5;
	this.dy = 0.5;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeInfographicRibbonDoubleFolded, mxActor);

mxShapeInfographicRibbonDoubleFolded.prototype.cst = {RIBBON_DOUBLE_FOLDED : 'mxgraph.infographic.ribbonDoubleFolded'};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeInfographicRibbonDoubleFolded.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var dx = Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'dx', this.dx))));
	var dy = Math.max(0, Math.min(h * 0.5, parseFloat(mxUtils.getValue(this.style, 'dy', this.dy))));

	c.begin();
	c.moveTo(0, dy);
	c.lineTo(dx, 0);
	c.lineTo(dx, dy);
	c.lineTo(w, dy);
	c.lineTo(w, h - dy);
	c.lineTo(w - dx, h);
	c.lineTo(w - dx, h - dy);
	c.lineTo(0, h - dy);
	c.close();
	c.fillAndStroke();
	
	c.setShadow(false);
	c.setFillAlpha('0.2');
	c.setFillColor('#000000');
	c.begin();
	c.moveTo(0, dy);
	c.lineTo(dx, 0);
	c.lineTo(dx, h - 2 * dy);
	c.lineTo(0, h - dy);
	c.close();
	c.moveTo(w, h - dy);
	c.lineTo(w - dx, h);
	c.lineTo(w - dx, h - dy);
	c.close();
	c.fill();
	
	c.begin();
	c.moveTo(0, dy);
	c.lineTo(dx, 0);
	c.lineTo(dx, dy);
	c.lineTo(w, dy);
	c.lineTo(w, h - dy);
	c.lineTo(w - dx, h);
	c.lineTo(w - dx, h - dy);
	c.lineTo(0, h - dy);
	c.close();
	c.stroke();
	
};

mxCellRenderer.registerShape(mxShapeInfographicRibbonDoubleFolded.prototype.cst.RIBBON_DOUBLE_FOLDED, mxShapeInfographicRibbonDoubleFolded);

mxShapeInfographicRibbonDoubleFolded.prototype.constraints = null;

Graph.handleFactory[mxShapeInfographicRibbonDoubleFolded.prototype.cst.RIBBON_DOUBLE_FOLDED] = function(state)
{
	var handles = [Graph.createHandle(state, ['dx', 'dy'], function(bounds)
	{
		var dx = Math.max(0, Math.min(bounds.width, parseFloat(mxUtils.getValue(this.state.style, 'dx', this.dx))));
		var dy = Math.max(0, Math.min(bounds.height / 2, parseFloat(mxUtils.getValue(this.state.style, 'dy', this.dy))));

		return new mxPoint(bounds.x + dx, bounds.y + dy);
	}, function(bounds, pt)
	{
		this.state.style['dx'] = Math.round(100 * Math.max(0, Math.min(bounds.width, pt.x - bounds.x))) / 100;
		this.state.style['dy'] = Math.round(100 * Math.max(0, Math.min(bounds.height / 2, pt.y - bounds.y))) / 100;
	})];
			
	return handles;
};

//**********************************************************************************************************************************************************
//Ribbon Front Folded
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeInfographicRibbonFrontFolded(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dx = 0.5;
	this.dy = 0.5;
	this.notch = 0.5;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeInfographicRibbonFrontFolded, mxActor);

mxShapeInfographicRibbonFrontFolded.prototype.cst = {RIBBON_FRONT_FOLDED : 'mxgraph.infographic.ribbonFrontFolded'};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeInfographicRibbonFrontFolded.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var dx = Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'dx', this.dx))));
	var dy = Math.max(0, Math.min(h * 0.5, parseFloat(mxUtils.getValue(this.style, 'dy', this.dy))));
	var notch = Math.max(0, Math.min(w - dx, parseFloat(mxUtils.getValue(this.style, 'notch', this.notch))));

	c.begin();
	c.moveTo(0, dy);
	c.lineTo(dx, 0);
	c.lineTo(dx, dy);
	c.lineTo(w, dy);
	c.lineTo(w - notch, (h - dy) / 2 + dy);
	c.lineTo(w, h);
	c.lineTo(0, h);
	c.close();
	c.fillAndStroke();
	
	c.setShadow(false);
	c.setFillAlpha('0.2');
	c.setFillColor('#000000');
	c.begin();
	c.moveTo(0, dy);
	c.lineTo(dx, 0);
	c.lineTo(dx, h - dy);
	c.lineTo(0, h);
	c.close();
	c.fill();
	
	c.begin();
	c.moveTo(0, dy);
	c.lineTo(dx, 0);
	c.lineTo(dx, dy);
	c.lineTo(w, dy);
	c.lineTo(w - notch, (h - dy) / 2 + dy);
	c.lineTo(w, h);
	c.lineTo(0, h);
	c.close();
	c.stroke();
	
};

mxCellRenderer.registerShape(mxShapeInfographicRibbonFrontFolded.prototype.cst.RIBBON_FRONT_FOLDED, mxShapeInfographicRibbonFrontFolded);

mxShapeInfographicRibbonFrontFolded.prototype.constraints = null;

Graph.handleFactory[mxShapeInfographicRibbonFrontFolded.prototype.cst.RIBBON_FRONT_FOLDED] = function(state)
{
	var handles = [Graph.createHandle(state, ['dx', 'dy'], function(bounds)
	{
		var dx = Math.max(0, Math.min(bounds.width, parseFloat(mxUtils.getValue(this.state.style, 'dx', this.dx))));
		var dy = Math.max(0, Math.min(bounds.height / 2, parseFloat(mxUtils.getValue(this.state.style, 'dy', this.dy))));

		return new mxPoint(bounds.x + dx, bounds.y + dy);
	}, function(bounds, pt)
	{
		this.state.style['dx'] = Math.round(100 * Math.max(0, Math.min(bounds.width, pt.x - bounds.x))) / 100;
		this.state.style['dy'] = Math.round(100 * Math.max(0, Math.min(bounds.height / 2, pt.y - bounds.y))) / 100;
	})];

	var handle2 = Graph.createHandle(state, ['notch'], function(bounds)
	{
		var dy = Math.max(0, Math.min(bounds.height / 2, parseFloat(mxUtils.getValue(this.state.style, 'dy', this.dy))));
		var notch = Math.max(0, Math.min(bounds.width, parseFloat(mxUtils.getValue(this.state.style, 'notch', this.notch))));

		return new mxPoint(bounds.x + bounds.width - notch, bounds.y + dy + (bounds.height - dy) * 0.5);
	}, function(bounds, pt)
	{
		this.state.style['notch'] = Math.round(100 * Math.max(0, Math.min(bounds.width, (bounds.width + bounds.x - pt.x)))) / 100;
	});
			
	handles.push(handle2);
	

	return handles;
};

//**********************************************************************************************************************************************************
//Ribbon Back Folded
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeInfographicRibbonBackFolded(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dx = 0.5;
	this.dy = 0.5;
	this.notch = 0.5;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeInfographicRibbonBackFolded, mxActor);

mxShapeInfographicRibbonBackFolded.prototype.cst = {RIBBON_BACK_FOLDED : 'mxgraph.infographic.ribbonBackFolded'};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeInfographicRibbonBackFolded.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var dx = Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'dx', this.dx))));
	var dy = Math.max(0, Math.min(h * 0.5, parseFloat(mxUtils.getValue(this.style, 'dy', this.dy))));
	var notch = Math.max(0, Math.min(w - dx, parseFloat(mxUtils.getValue(this.style, 'notch', this.notch))));

	c.begin();
	c.moveTo(0, dy);
	c.lineTo(dx, 0);
	c.lineTo(dx, dy);
	c.lineTo(w, dy);
	c.lineTo(w - notch, (h - dy) / 2 + dy);
	c.lineTo(w, h);
	c.lineTo(0, h);
	c.close();
	c.fillAndStroke();
	
	c.setShadow(false);
	c.setFillAlpha('0.2');
	c.setFillColor('#000000');
	c.begin();
	c.moveTo(0, dy);
	c.lineTo(dx, 0);
	c.lineTo(dx, dy);
	c.close();
	c.fill();
	
	c.begin();
	c.moveTo(0, dy);
	c.lineTo(dx, 0);
	c.lineTo(dx, dy);
	c.lineTo(w, dy);
	c.lineTo(w - notch, (h - dy) / 2 + dy);
	c.lineTo(w, h);
	c.lineTo(0, h);
	c.close();
	c.stroke();
	
};

mxCellRenderer.registerShape(mxShapeInfographicRibbonBackFolded.prototype.cst.RIBBON_BACK_FOLDED, mxShapeInfographicRibbonBackFolded);

mxShapeInfographicRibbonBackFolded.prototype.constraints = null;

Graph.handleFactory[mxShapeInfographicRibbonBackFolded.prototype.cst.RIBBON_BACK_FOLDED] = function(state)
{
	var handles = [Graph.createHandle(state, ['dx', 'dy'], function(bounds)
	{
		var dx = Math.max(0, Math.min(bounds.width, parseFloat(mxUtils.getValue(this.state.style, 'dx', this.dx))));
		var dy = Math.max(0, Math.min(bounds.height / 2, parseFloat(mxUtils.getValue(this.state.style, 'dy', this.dy))));

		return new mxPoint(bounds.x + dx, bounds.y + dy);
	}, function(bounds, pt)
	{
		this.state.style['dx'] = Math.round(100 * Math.max(0, Math.min(bounds.width, pt.x - bounds.x))) / 100;
		this.state.style['dy'] = Math.round(100 * Math.max(0, Math.min(bounds.height / 2, pt.y - bounds.y))) / 100;
	})];

	var handle2 = Graph.createHandle(state, ['notch'], function(bounds)
	{
		var dy = Math.max(0, Math.min(bounds.height / 2, parseFloat(mxUtils.getValue(this.state.style, 'dy', this.dy))));
		var notch = Math.max(0, Math.min(bounds.width, parseFloat(mxUtils.getValue(this.state.style, 'notch', this.notch))));

		return new mxPoint(bounds.x + bounds.width - notch, bounds.y + dy + (bounds.height - dy) * 0.5);
	}, function(bounds, pt)
	{
		this.state.style['notch'] = Math.round(100 * Math.max(0, Math.min(bounds.width, (bounds.width + bounds.x - pt.x)))) / 100;
	});
			
	handles.push(handle2);
	
	return handles;
};

//**********************************************************************************************************************************************************
//Banner
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeInfographicBanner(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dx = 0.5;
	this.dy = 0.5;
	this.notch = 0.5;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeInfographicBanner, mxActor);

mxShapeInfographicBanner.prototype.cst = {BANNER : 'mxgraph.infographic.banner'};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeInfographicBanner.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var dx = Math.max(0, Math.min(w / 2, parseFloat(mxUtils.getValue(this.style, 'dx', this.dx))));
	var dy = Math.max(0, Math.min(h * 0.5, parseFloat(mxUtils.getValue(this.style, 'dy', this.dy))));
	var notch = Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'notch', this.notch))));

	dx = Math.min(w / 2 - 2 * dy, dx);
	
	notch = Math.min(dx, notch);
	
	c.begin();
	c.moveTo(0, dy);
	c.lineTo(dx, dy);
	c.lineTo(dx, 0);
	c.lineTo(w - dx, 0);
	c.lineTo(w - dx, dy);
	c.lineTo(w, dy);
	c.lineTo(w - notch, (h - dy) * 0.5 + dy);
	c.lineTo(w, h);
	c.lineTo(w - dx - 2 * dy, h);
	c.lineTo(w - dx - 2 * dy, h - dy);
	c.lineTo(dx + 2 * dy, h - dy);
	c.lineTo(dx + 2 * dy, h);
	c.lineTo(0, h);
	c.lineTo(notch, (h - dy) * 0.5 + dy);
	c.close();
	c.fillAndStroke();
	
	c.setShadow(false);
	c.setFillAlpha('0.2');
	c.setFillColor('#000000');
	c.begin();
	c.moveTo(0,dy);
	c.lineTo(dx, dy);
	c.lineTo(dx, h - dy);
	c.lineTo(dx + 2 * dy, h);
	c.lineTo(0, h);
	c.lineTo(notch, (h - dy) * 0.5 + dy);
	c.close();
	c.moveTo(w,dy);
	c.lineTo(w - dx, dy);
	c.lineTo(w - dx, h - dy);
	c.lineTo(w - dx - 2 * dy, h);
	c.lineTo(w, h);
	c.lineTo(w - notch, (h - dy) * 0.5 + dy);
	c.close();
	c.fill();
	
	c.setFillAlpha('0.4');
	c.begin();
	c.moveTo(dx, h - dy);
	c.lineTo(dx + 2 * dy, h - dy);
	c.lineTo(dx + 2 * dy, h);
	c.close();
	c.moveTo(w - dx, h - dy);
	c.lineTo(w - dx - 2 * dy, h - dy);
	c.lineTo(w - dx - 2 * dy, h);
	c.close();
	c.fill();
	
};

mxCellRenderer.registerShape(mxShapeInfographicBanner.prototype.cst.BANNER, mxShapeInfographicBanner);

mxShapeInfographicBanner.prototype.constraints = null;

Graph.handleFactory[mxShapeInfographicBanner.prototype.cst.BANNER] = function(state)
{
	var handles = [Graph.createHandle(state, ['dx', 'dy'], function(bounds)
	{
		var dx = Math.max(0, Math.min(bounds.width / 2, parseFloat(mxUtils.getValue(this.state.style, 'dx', this.dx))));
		var dy = Math.max(0, Math.min(bounds.height / 2, parseFloat(mxUtils.getValue(this.state.style, 'dy', this.dy))));

		return new mxPoint(bounds.x + bounds.width - dx, bounds.y + dy);
	}, function(bounds, pt)
	{
		this.state.style['dx'] = Math.round(100 * Math.max(0, Math.min(bounds.width / 2, bounds.x + bounds.width - pt.x))) / 100;
		this.state.style['dy'] = Math.round(100 * Math.max(0, Math.min(bounds.height / 2, pt.y - bounds.y))) / 100;
	})];
			
	var handle2 = Graph.createHandle(state, ['notch'], function(bounds)
	{
		var dy = Math.max(0, Math.min(bounds.height / 2, parseFloat(mxUtils.getValue(this.state.style, 'dy', this.dy))));
		var dx = Math.max(0, Math.min(bounds.width / 2, parseFloat(mxUtils.getValue(this.state.style, 'dx', this.dx))));
		var notch = Math.max(0, Math.min(dx, parseFloat(mxUtils.getValue(this.state.style, 'notch', this.notch))));

		return new mxPoint(bounds.x + bounds.width - notch, bounds.y + dy + (bounds.height - dy) * 0.5);
	}, function(bounds, pt)
	{
		this.state.style['notch'] = Math.round(100 * Math.max(0, Math.min(bounds.width, (bounds.width + bounds.x - pt.x)))) / 100;
	});
			
	handles.push(handle2);
	
	return handles;
};

//**********************************************************************************************************************************************************
//Circular Callout
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeInfographicCircularCallout(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dy = 0.5;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeInfographicCircularCallout, mxActor);

mxShapeInfographicCircularCallout.prototype.cst = {CIRCULAR_CALLOUT : 'mxgraph.infographic.circularCallout'};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeInfographicCircularCallout.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var dy = Math.max(0, Math.min(h * 0.5, parseFloat(mxUtils.getValue(this.style, 'dy', this.dy))));
	
	var rx = Math.max(0, Math.min(w * 0.5, w * 0.5 - dy));
	var ry = Math.max(0, Math.min(h * 0.5, h * 0.5 - dy));
	
	c.begin();
	c.moveTo(w, h * 0.5);
	c.arcTo(w * 0.5, h * 0.5, 0, 0, 1, w * 0.5, h);
	c.arcTo(w * 0.5, h * 0.5, 0, 0, 1, 0, h * 0.5);
	c.arcTo(w * 0.5, h * 0.5, 0, 0, 1, w * 0.5, 0);
	c.lineTo(w, 0);
	c.close();
	c.moveTo(w * 0.5, dy);
	c.arcTo(rx, ry, 0, 0, 0, w * 0.5 - rx, h * 0.5);
	c.arcTo(rx, ry, 0, 0, 0, w * 0.5, h * 0.5 + ry);
	c.arcTo(rx, ry, 0, 0, 0, w * 0.5 + rx, h * 0.5);
	c.arcTo(rx, ry, 0, 0, 0, w * 0.5, h * 0.5 - ry);
	c.close();
	c.fillAndStroke();
	
};

mxCellRenderer.registerShape(mxShapeInfographicCircularCallout.prototype.cst.CIRCULAR_CALLOUT, mxShapeInfographicCircularCallout);

mxShapeInfographicCircularCallout.prototype.constraints = null;

Graph.handleFactory[mxShapeInfographicCircularCallout.prototype.cst.CIRCULAR_CALLOUT] = function(state)
{
	var handles = [Graph.createHandle(state, ['dy'], function(bounds)
	{
		var dy = Math.max(0, Math.min(bounds.height / 2, parseFloat(mxUtils.getValue(this.state.style, 'dy', this.dy))));

		return new mxPoint(bounds.x + bounds.width * 0.5, bounds.y + dy);
	}, function(bounds, pt)
	{
		this.state.style['dy'] = Math.round(100 * Math.max(0, Math.min(bounds.height / 2, pt.y - bounds.y))) / 100;
	})];
			
	return handles;
};

//**********************************************************************************************************************************************************
//Shaded triangle
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeInfographicShadedTriangle(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeInfographicShadedTriangle, mxActor);

mxShapeInfographicShadedTriangle.prototype.cst = {SHADED_TRIANGLE : 'mxgraph.infographic.shadedTriangle'};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeInfographicShadedTriangle.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	c.begin();
	c.moveTo(0, h);
	c.lineTo(w * 0.5, 0);
	c.lineTo(w, h);
	c.close();
	c.fillAndStroke();
	
	c.setShadow(false);
	
	c.setFillColor('#ffffff');
	c.setFillAlpha('0.2');
	
	c.begin();
	c.moveTo(0, h);
	c.lineTo(w * 0.5, 0);
	c.lineTo(w * 0.5, h * 0.67);
	c.close();
	c.fill();
	
	c.setFillColor('#000000');

	c.begin();
	c.moveTo(w, h);
	c.lineTo(w * 0.5, h * 0.67);
	c.lineTo(w * 0.5, 0);
	c.close();
	c.fill();
	
	c.begin();
	c.moveTo(0, h);
	c.lineTo(w * 0.5, 0);
	c.lineTo(w, h);
	c.close();
	c.stroke();
	
};

mxCellRenderer.registerShape(mxShapeInfographicShadedTriangle.prototype.cst.SHADED_TRIANGLE, mxShapeInfographicShadedTriangle);

mxShapeInfographicShadedTriangle.prototype.constraints = null;

//**********************************************************************************************************************************************************
//Shaded pyramid
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeInfographicShadedPyramid(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeInfographicShadedPyramid, mxActor);

mxShapeInfographicShadedPyramid.prototype.cst = {SHADED_PYRAMID : 'mxgraph.infographic.shadedPyramid'};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeInfographicShadedPyramid.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var h1 = Math.max(h - w * 0.3, 0);
	c.begin();
	c.moveTo(0, h1);
	c.lineTo(w * 0.5, 0);
	c.lineTo(w, h1);
	c.lineTo(w * 0.5, h);
	c.close();
	c.fillAndStroke();
	
	c.setShadow(false);
	
	c.setFillColor('#ffffff');
	c.setFillAlpha('0.2');
	
	c.begin();
	c.moveTo(0, h1);
	c.lineTo(w * 0.5, 0);
	c.lineTo(w * 0.5, h);
	c.close();
	c.fill();
	
	c.setFillColor('#000000');

	c.begin();
	c.moveTo(w, h1);
	c.lineTo(w * 0.5, h);
	c.lineTo(w * 0.5, 0);
	c.close();
	c.fill();
	
	c.begin();
	c.moveTo(0, h1);
	c.lineTo(w * 0.5, 0);
	c.lineTo(w, h1);
	c.lineTo(w * 0.5, h);
	c.close();
	c.stroke();
};

mxCellRenderer.registerShape(mxShapeInfographicShadedPyramid.prototype.cst.SHADED_PYRAMID, mxShapeInfographicShadedPyramid);

mxShapeInfographicShadedPyramid.prototype.constraints = null;

//**********************************************************************************************************************************************************
//Pyramid step
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeInfographicPyramidStep(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeInfographicPyramidStep, mxActor);

mxShapeInfographicPyramidStep.prototype.cst = {PYRAMID_STEP : 'mxgraph.infographic.pyramidStep'};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeInfographicPyramidStep.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var h1 = Math.max(w * 0.1, 0);
	c.begin();
	c.moveTo(0, h1);
	c.lineTo(w * 0.5, 0);
	c.lineTo(w, h1);
	c.lineTo(w, h);
	c.lineTo(0, h);
	c.close();
	c.fillAndStroke();
	
	c.setShadow(false);
	
	c.setFillColor('#ffffff');
	c.setFillAlpha('0.2');
	
	c.begin();
	c.moveTo(0, h1);
	c.lineTo(w * 0.5, 0);
	c.lineTo(w * 0.5, h);
	c.lineTo(0, h);
	c.close();
	c.fill();
	
	c.setFillColor('#000000');

	c.begin();
	c.moveTo(w, h1);
	c.lineTo(w, h);
	c.lineTo(w * 0.5, h);
	c.lineTo(w * 0.5, 0);
	c.close();
	c.fill();
	
	c.begin();
	c.moveTo(0, h1);
	c.lineTo(w * 0.5, 0);
	c.lineTo(w, h1);
	c.lineTo(w, h);
	c.lineTo(0, h);
	c.close();
	c.stroke();
};

mxCellRenderer.registerShape(mxShapeInfographicPyramidStep.prototype.cst.PYRAMID_STEP, mxShapeInfographicPyramidStep);

mxShapeInfographicPyramidStep.prototype.constraints = null;

//**********************************************************************************************************************************************************
//Cylinder
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeInfographicCylinder(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeInfographicCylinder, mxActor);

mxShapeInfographicCylinder.prototype.cst = {CYLINDER : 'mxgraph.infographic.cylinder'};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeInfographicCylinder.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
//	mxJsCanvas.prototype.setGradient = function(color1, color2, x, y, w, h, direction, alpha1, alpha2)
	
	var dy = 20;
	var rx = w * 0.5;
	var ry = dy * 0.5;
	
	c.begin();
	c.moveTo(0, dy * 0.5);
	c.arcTo(rx, ry, 0, 0, 1, w, ry);
	c.lineTo(w, h - ry);
	c.arcTo(rx, ry, 0, 0, 1, 0, h - ry);
	c.close();
	c.fillAndStroke();
	
	c.setShadow(false);
	c.setGradient('#000000', '#ffffff', 0, 0, w, h, mxConstants.DIRECTION_EAST, 0.4, 0.4);
	
	c.begin();
	c.moveTo(0, dy * 0.5);
	c.arcTo(rx, ry, 0, 0, 0, w, ry);
	c.lineTo(w, h - ry);
	c.arcTo(rx, ry, 0, 0, 1, 0, h - ry);
	c.close();
	c.fill();

	c.begin();
	c.moveTo(0, dy * 0.5);
	c.arcTo(rx, ry, 0, 0, 1, w, ry);
	c.lineTo(w, h - ry);
	c.arcTo(rx, ry, 0, 0, 1, 0, h - ry);
	c.close();
	c.stroke();
};

mxCellRenderer.registerShape(mxShapeInfographicCylinder.prototype.cst.CYLINDER, mxShapeInfographicCylinder);

mxShapeInfographicCylinder.prototype.constraints = null;

//**********************************************************************************************************************************************************
//Circular Callout 2
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeInfographicCircularCallout2(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dy = 0.5;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeInfographicCircularCallout2, mxActor);

mxShapeInfographicCircularCallout2.prototype.cst = {CIRCULAR_CALLOUT_2 : 'mxgraph.infographic.circularCallout2'};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeInfographicCircularCallout2.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var fillColor = mxUtils.getValue(this.style, mxConstants.STYLE_FILLCOLOR, 'none');
	var strokeColor = mxUtils.getValue(this.style, mxConstants.STYLE_STROKECOLOR, 'none');
	c.setFillColor(strokeColor);

	var rx = Math.max(0, Math.min(w * 0.5, h * 0.4, h * 0.5 - 7));

	c.begin();
	c.moveTo(w * 0.5 - 2, 2.15 * rx);
	c.arcTo(rx * 0.23, rx * 0.23, 0, 0, 0, w * 0.5 - rx * 0.2, rx * 1.97);
	c.arcTo(rx, rx, 0, 0, 1, w * 0.5 - rx, rx);
	c.arcTo(rx, rx, 0, 0, 1, w * 0.5, 0);
	c.arcTo(rx, rx, 0, 0, 1, w * 0.5 + rx, rx);
	c.arcTo(rx, rx, 0, 0, 1, w * 0.5 + rx * 0.2, rx * 1.97);
	c.arcTo(rx * 0.23, rx * 0.23, 0, 0, 0, w * 0.5 + 2, 2.15 * rx);

	var rxMin = Math.max(rx * 0.1, 6);
	
	if (rx * 0.04 > 4)
	{
		c.lineTo(w * 0.5 + 2, h - rx * 0.22);
		c.arcTo(rx * 0.05, rx * 0.05, 0, 0, 0, w * 0.5 + rx * 0.04, h - rx * 0.19);
	}
	else
	{
		c.lineTo(w * 0.5 + 2, h - 2 * rxMin);
	}
	
	c.arcTo(rxMin, rxMin, 0, 0, 1, w * 0.5 + rxMin, h - rxMin);
	c.arcTo(rxMin, rxMin, 0, 0, 1, w * 0.5, h);
	c.arcTo(rxMin, rxMin, 0, 0, 1, w * 0.5 - rxMin, h - rxMin);

	if (rx * 0.04 > 4)
	{
		c.arcTo(rxMin, rxMin, 0, 0, 1, w * 0.5 - rx * 0.04, h - rx * 0.19);
		c.arcTo(rxMin * 0.5, rxMin * 0.5, 0, 0, 0, w * 0.5 - 2, h - rx * 0.22);
	}
	else
	{
		c.arcTo(rxMin, rxMin, 0, 0, 1, w * 0.5 - 2, h - 2 * rxMin);
	}
	
	c.close();
	c.moveTo(w * 0.5, rx * 0.2);
	c.arcTo(rx * 0.8, rx * 0.8, 0, 0, 0, w * 0.5 - rx * 0.8, rx * 0.8);
	c.arcTo(rx * 0.8, rx * 0.8, 0, 0, 0, w * 0.5, rx * 1.8);
	c.arcTo(rx * 0.8, rx * 0.8, 0, 0, 0, w * 0.5 + rx * 0.8, rx * 0.8);
	c.arcTo(rx * 0.8, rx * 0.8, 0, 0, 0, w * 0.5, rx * 0.2);
	c.close();
	c.moveTo(w * 0.5, h - rxMin * 1.75);
	c.arcTo(rxMin * 0.75, rxMin * 0.75, 0, 0, 0, w * 0.5 - rxMin * 0.75, h - rxMin );
	c.arcTo(rxMin * 0.75, rxMin * 0.75, 0, 0, 0, w * 0.5, h - rxMin * 0.25);
	c.arcTo(rxMin * 0.75, rxMin * 0.75, 0, 0, 0, w * 0.5 + rxMin * 0.75, h - rxMin);
	c.arcTo(rxMin * 0.75, rxMin * 0.75, 0, 0, 0, w * 0.5, h - rxMin * 1.75);
	c.close();
	c.fill();
	
	c.setFillColor(fillColor);
	c.setShadow(false);
	
	c.begin();
	c.moveTo(w * 0.5, rx * 0.2);
	c.arcTo(rx * 0.8, rx * 0.8, 0, 0, 0, w * 0.5 - rx * 0.8, rx * 0.8);
	c.arcTo(rx * 0.8, rx * 0.8, 0, 0, 0, w * 0.5, rx * 1.8);
	c.arcTo(rx * 0.8, rx * 0.8, 0, 0, 0, w * 0.5 + rx * 0.8, rx * 0.8);
	c.arcTo(rx * 0.8, rx * 0.8, 0, 0, 0, w * 0.5, rx * 0.2);
	c.close();
	c.moveTo(w * 0.5, h - rxMin * 1.75);
	c.arcTo(rxMin * 0.75, rxMin * 0.75, 0, 0, 0, w * 0.5 - rxMin * 0.75, h - rxMin );
	c.arcTo(rxMin * 0.75, rxMin * 0.75, 0, 0, 0, w * 0.5, h - rxMin * 0.25);
	c.arcTo(rxMin * 0.75, rxMin * 0.75, 0, 0, 0, w * 0.5 + rxMin * 0.75, h - rxMin);
	c.arcTo(rxMin * 0.75, rxMin * 0.75, 0, 0, 0, w * 0.5, h - rxMin * 1.75);
	c.close();
	c.fill();
};

mxCellRenderer.registerShape(mxShapeInfographicCircularCallout2.prototype.cst.CIRCULAR_CALLOUT_2, mxShapeInfographicCircularCallout2);

mxShapeInfographicCircularCallout2.prototype.constraints = null;

//**********************************************************************************************************************************************************
//Banner Single Fold
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeInfographicBannerSingleFold(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dx = 0.5;
	this.dy = 0.5;
	this.dx2 = 0.5;
	this.notch = 0.5;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeInfographicBannerSingleFold, mxActor);

mxShapeInfographicBannerSingleFold.prototype.cst = {BANNER_SINGLE_FOLD : 'mxgraph.infographic.bannerSingleFold'};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeInfographicBannerSingleFold.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var dx = Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'dx', this.dx))));
	var dy = Math.max(0, Math.min(h * 0.5, parseFloat(mxUtils.getValue(this.style, 'dy', this.dy))));
	var notch = Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'notch', this.notch))));

	dx = Math.min(w - 2 * dy, dx);

	var dx2 = Math.max(0, Math.min(w - dx - 2 * dy, parseFloat(mxUtils.getValue(this.style, 'dx2', this.dx2))));
//	c.lineTo(w - dx - 2 * dy, h);

	notch = Math.min(dx, notch);
	
	c.begin();
	c.moveTo(dx2, 0);
	c.lineTo(w - dx, 0);
	c.lineTo(w - dx, dy);
	c.lineTo(w, dy);
	c.lineTo(w - notch, (h - dy) * 0.5 + dy);
	c.lineTo(w, h);
	c.lineTo(w - dx - 2 * dy, h);
	c.lineTo(w - dx - 2 * dy, h - dy);
	c.lineTo(dx2, h - dy);
	c.lineTo(0, (h - dy) * 0.5);
	c.close();
	c.fillAndStroke();
	
	c.setShadow(false);
	c.setFillAlpha('0.05');
	c.setFillColor('#000000');
	c.begin();
	c.moveTo(w,dy);
	c.lineTo(w - dx, dy);
	c.lineTo(w - dx, h - dy);
	c.lineTo(w - dx - 2 * dy, h);
	c.lineTo(w, h);
	c.lineTo(w - notch, (h - dy) * 0.5 + dy);
	c.close();
	c.fill();
	
	c.setFillAlpha('0.4');
	c.begin();
	c.moveTo(w - dx, h - dy);
	c.lineTo(w - dx - 2 * dy, h - dy);
	c.lineTo(w - dx - 2 * dy, h);
	c.close();
	c.fill();
	
	c.begin();
	c.moveTo(dx2, 0);
	c.lineTo(w - dx, 0);
	c.lineTo(w - dx, dy);
	c.lineTo(w, dy);
	c.lineTo(w - notch, (h - dy) * 0.5 + dy);
	c.lineTo(w, h);
	c.lineTo(w - dx - 2 * dy, h);
	c.lineTo(w - dx - 2 * dy, h - dy);
	c.lineTo(dx2, h - dy);
	c.lineTo(0, (h - dy) * 0.5);
	c.close();
	c.stroke();
};

mxCellRenderer.registerShape(mxShapeInfographicBannerSingleFold.prototype.cst.BANNER_SINGLE_FOLD, mxShapeInfographicBannerSingleFold);

mxShapeInfographicBannerSingleFold.prototype.constraints = null;

Graph.handleFactory[mxShapeInfographicBannerSingleFold.prototype.cst.BANNER_SINGLE_FOLD] = function(state)
{
	var handles = [Graph.createHandle(state, ['dx', 'dy'], function(bounds)
	{
		var dx = Math.max(0, Math.min(bounds.width, parseFloat(mxUtils.getValue(this.state.style, 'dx', this.dx))));
		var dy = Math.max(0, Math.min(bounds.height / 2, parseFloat(mxUtils.getValue(this.state.style, 'dy', this.dy))));

		return new mxPoint(bounds.x + bounds.width - dx, bounds.y + dy);
	}, function(bounds, pt)
	{
		this.state.style['dx'] = Math.round(100 * Math.max(0, Math.min(bounds.width, bounds.x + bounds.width - pt.x))) / 100;
		this.state.style['dy'] = Math.round(100 * Math.max(0, Math.min(bounds.height / 2, pt.y - bounds.y))) / 100;
	})];
			
	var handle2 = Graph.createHandle(state, ['notch'], function(bounds)
	{
		var dy = Math.max(0, Math.min(bounds.height / 2, parseFloat(mxUtils.getValue(this.state.style, 'dy', this.dy))));
		var dx = Math.max(0, Math.min(bounds.width, parseFloat(mxUtils.getValue(this.state.style, 'dx', this.dx))));
		var notch = Math.max(0, Math.min(dx, parseFloat(mxUtils.getValue(this.state.style, 'notch', this.notch))));

		return new mxPoint(bounds.x + bounds.width - notch, bounds.y + dy + (bounds.height - dy) * 0.5);
	}, function(bounds, pt)
	{
		this.state.style['notch'] = Math.round(100 * Math.max(0, Math.min(bounds.width, (bounds.width + bounds.x - pt.x)))) / 100;
	});
			
	handles.push(handle2);

	var handle3 = Graph.createHandle(state, ['dx2'], function(bounds)
	{
		var dx = Math.max(0, Math.min(bounds.width, parseFloat(mxUtils.getValue(this.state.style, 'dx', this.dx))));
		var dy = Math.max(0, Math.min(bounds.height, parseFloat(mxUtils.getValue(this.state.style, 'dy', this.dy))));
		var dx2 = Math.max(0, Math.min(bounds.width - dx, parseFloat(mxUtils.getValue(this.state.style, 'dx2', this.dx2))));

//		w - dx - 2 * dy
		return new mxPoint(bounds.x + dx2, bounds.y + (bounds.height - dy) * 0.5);
	}, function(bounds, pt)
	{
		var dx = Math.max(0, Math.min(bounds.width, parseFloat(mxUtils.getValue(this.state.style, 'dx', this.dx))));
		var dy = Math.max(0, Math.min(bounds.height, parseFloat(mxUtils.getValue(this.state.style, 'dy', this.dy))));
		
		this.state.style['dx2'] = Math.round(100 * Math.max(0, Math.min(bounds.width - dx - 2 * dy, pt.x - bounds.x))) / 100;
	});
			
	handles.push(handle3);
	

	return handles;
};

//**********************************************************************************************************************************************************
//Shaded Cube
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeBasicShadedCube(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.isoAngle = 15;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeBasicShadedCube, mxActor);

mxShapeBasicShadedCube.prototype.cst = {SHADED_CUBE : 'mxgraph.infographic.shadedCube'};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeBasicShadedCube.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var isoAngle = Math.max(0.01, Math.min(94, parseFloat(mxUtils.getValue(this.style, 'isoAngle', this.isoAngle)))) * Math.PI / 200 ;
	var isoH = Math.min(w * Math.tan(isoAngle), h * 0.5);
	
	c.begin();
	c.moveTo(w * 0.5, 0);
	c.lineTo(w, isoH);
	c.lineTo(w, h - isoH);
	c.lineTo(w * 0.5, h);
	c.lineTo(0, h - isoH);
	c.lineTo(0, isoH);
	c.close();
	c.fillAndStroke();

	c.setShadow(false);
	c.setFillAlpha('0.2');
	c.setFillColor('#000000');
	
	c.begin();
	c.moveTo(w * 0.5, 2 * isoH);
	c.lineTo(w, isoH);
	c.lineTo(w, h - isoH);
	c.lineTo(w * 0.5, h);
	c.close();
	c.fill();

	c.setFillColor('#ffffff');
	c.begin();
	c.moveTo(w * 0.5, 2 * isoH);
	c.lineTo(0, isoH);
	c.lineTo(0, h - isoH);
	c.lineTo(w * 0.5, h);
	c.close();
	c.fill();
};

mxCellRenderer.registerShape(mxShapeBasicShadedCube.prototype.cst.SHADED_CUBE, mxShapeBasicShadedCube);

mxShapeBasicShadedCube.prototype.constraints = null;

Graph.handleFactory[mxShapeBasicShadedCube.prototype.cst.SHADED_CUBE] = function(state)
{
	var handles = [Graph.createHandle(state, ['isoAngle'], function(bounds)
	{
		var isoAngle = Math.max(0.01, Math.min(94, parseFloat(mxUtils.getValue(this.state.style, 'isoAngle', this.isoAngle)))) * Math.PI / 200 ;
		var isoH = Math.min(bounds.width * Math.tan(isoAngle), bounds.height * 0.5);

		return new mxPoint(bounds.x, bounds.y + isoH);
	}, function(bounds, pt)
	{
		this.state.style['isoAngle'] = Math.round(100 * Math.max(0, Math.min(100, pt.y - bounds.y))) / 100;
	})];
			
	return handles;
};

//**********************************************************************************************************************************************************
//Partial Concentric Ellipse
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeBasicPartConcEllipse(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.startAngle = 0.25;
	this.endAngle = 0.75;
	this.arcWidth = 0.5;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeBasicPartConcEllipse, mxActor);

mxShapeBasicPartConcEllipse.prototype.cst = {PART_CONC_ELLIPSE : 'mxgraph.infographic.partConcEllipse'};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeBasicPartConcEllipse.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var startAngle = 2 * Math.PI * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'startAngle', this.startAngle))));
	var endAngle = 2 * Math.PI * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'endAngle', this.endAngle))));
	var arcWidth = 1 - Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'arcWidth', this.arcWidth))));
	var rx = w * 0.5;
	var ry = h * 0.5;
	var rx2 = rx * arcWidth;
	var ry2 = ry * arcWidth;
	
	var angDiff = endAngle - startAngle;
	
	if (angDiff < 0)
	{
		angDiff = angDiff + Math.PI * 2;
	}
	else if (angDiff == Math.PI)
	{
		endAngle = endAngle + 0.00001;
	}
		
	var startX = rx + Math.sin(startAngle) * rx;
	var startY = ry - Math.cos(startAngle) * ry;
	var innerStartX = rx + Math.sin(startAngle) * rx2;
	var innerStartY = ry - Math.cos(startAngle) * ry2;
	var endX = rx + Math.sin(endAngle) * rx;
	var endY = ry - Math.cos(endAngle) * ry;
	var innerEndX = rx + Math.sin(endAngle) * rx2;
	var innerEndY = ry - Math.cos(endAngle) * ry2;
	
	var bigArc = 0;
	
	if (angDiff <= Math.PI)
	{
		bigArc = 1;
	}
		
	c.begin();
	c.moveTo(rx, 0);
	c.arcTo(rx, ry, 0, 0, 1, w, ry);
	c.arcTo(rx, ry, 0, 0, 1, rx, h);
	c.arcTo(rx, ry, 0, 0, 1, 0, ry);
	c.arcTo(rx, ry, 0, 0, 1, rx, 0);
	c.close();
	c.moveTo(rx, h * 0.5 - ry2);
	c.arcTo(rx2, ry2, 0, 0, 0, w * 0.5 - rx2, ry);
	c.arcTo(rx2, ry2, 0, 0, 0, rx, h * 0.5 + ry2);
	c.arcTo(rx2, ry2, 0, 0, 0, w * 0.5 + rx2, ry);
	c.arcTo(rx2, ry2, 0, 0, 0, rx, h * 0.5 - ry2);
	c.close();
	c.fillAndStroke();
	
	c.setShadow(false);
	c.setFillAlpha('0.2');
	c.setFillColor('#ffffff');
	
	c.begin();
	c.moveTo(startX, startY);
	c.arcTo(rx, ry, 0, bigArc, 0, endX, endY);
	c.lineTo(innerEndX, innerEndY);
	c.arcTo(rx2, ry2, 0, bigArc, 1, innerStartX, innerStartY);
	c.close();
	c.fill();

	
	var rx = w * 0.5;
	var ry = h * 0.5;
	var rx2 = rx * arcWidth;
	var ry2 = ry * arcWidth;

	var rx3 = rx2 + (rx - rx2) * 0.25;
	var ry3 = ry2 + (ry - ry2) * 0.25;

	c.setFillColor('#000000');
	
	c.begin();
	c.moveTo(rx, h * 0.5 - ry2);
	c.arcTo(rx2, ry2, 0, 0, 1, w * 0.5 + rx2, ry);
	c.arcTo(rx2, ry2, 0, 0, 1, rx, h * 0.5 + ry2);
	c.arcTo(rx2, ry2, 0, 0, 1, w * 0.5 - rx2, ry);
	c.arcTo(rx2, ry2, 0, 0, 1, rx, h * 0.5 - ry2);
	c.close();
	c.moveTo(rx, h * 0.5 - ry3);
	c.arcTo(rx3, ry3, 0, 0, 0, w * 0.5 - rx3, ry);
	c.arcTo(rx3, ry3, 0, 0, 0, rx, h * 0.5 + ry3);
	c.arcTo(rx3, ry3, 0, 0, 0, w * 0.5 + rx3, ry);
	c.arcTo(rx3, ry3, 0, 0, 0, rx, h * 0.5 - ry3);
	c.close();
	c.fill();
	

};

mxCellRenderer.registerShape(mxShapeBasicPartConcEllipse.prototype.cst.PART_CONC_ELLIPSE, mxShapeBasicPartConcEllipse);

mxShapeBasicPartConcEllipse.prototype.constraints = null;

Graph.handleFactory[mxShapeBasicPartConcEllipse.prototype.cst.PART_CONC_ELLIPSE] = function(state)
{
	var handles = [Graph.createHandle(state, ['startAngle'], function(bounds)
	{
		var startAngle = 2 * Math.PI * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.state.style, 'startAngle', this.startAngle))));

		return new mxPoint(bounds.x + bounds.width * 0.5 + Math.sin(startAngle) * bounds.width * 0.5, bounds.y + bounds.height * 0.5 - Math.cos(startAngle) * bounds.height * 0.5);
	}, function(bounds, pt)
	{
		var handleX = Math.round(100 * Math.max(-1, Math.min(1, (pt.x - bounds.x - bounds.width * 0.5) / (bounds.width * 0.5)))) / 100;
		var handleY = -Math.round(100 * Math.max(-1, Math.min(1, (pt.y - bounds.y - bounds.height * 0.5) / (bounds.height * 0.5)))) / 100;
		
		var res =  0.5 * Math.atan2(handleX, handleY) / Math.PI;
		
		if (res < 0)
		{
			res = 1 + res;
		}

		this.state.style['startAngle'] = res;
		
	})];

	var handle2 = Graph.createHandle(state, ['endAngle'], function(bounds)
	{
		var endAngle = 2 * Math.PI * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.state.style, 'endAngle', this.endAngle))));

		return new mxPoint(bounds.x + bounds.width * 0.5 + Math.sin(endAngle) * bounds.width * 0.5, bounds.y + bounds.height * 0.5 - Math.cos(endAngle) * bounds.height * 0.5);
	}, function(bounds, pt)
	{
		var handleX = Math.round(100 * Math.max(-1, Math.min(1, (pt.x - bounds.x - bounds.width * 0.5) / (bounds.width * 0.5)))) / 100;
		var handleY = -Math.round(100 * Math.max(-1, Math.min(1, (pt.y - bounds.y - bounds.height * 0.5) / (bounds.height * 0.5)))) / 100;
		
		var res =  0.5 * Math.atan2(handleX, handleY) / Math.PI;
		
		if (res < 0)
		{
			res = 1 + res;
		}
		
		this.state.style['endAngle'] = res;
	});
	
	handles.push(handle2);
	
	var handle3 = Graph.createHandle(state, ['arcWidth'], function(bounds)
	{
		var arcWidth = Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.state.style, 'arcWidth', this.arcWidth))));

		return new mxPoint(bounds.x + bounds.width / 2, bounds.y + arcWidth * bounds.height * 0.5);
	}, function(bounds, pt)
	{
		this.state.style['arcWidth'] = Math.round(100 * Math.max(0, Math.min(bounds.height / 2, bounds.width / 2, (pt.y - bounds.y) / (bounds.height * 0.5)))) / 100;
	});
			
	handles.push(handle3);
	
	return handles;
};

//**********************************************************************************************************************************************************
//Banner Half Fold
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeInfographicBannerHalfFold(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dx = 0.5;
	this.dx2 = 0.5;
	this.notch = 0.5;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeInfographicBannerHalfFold, mxActor);

mxShapeInfographicBannerHalfFold.prototype.cst = {BANNER_HALF_FOLD : 'mxgraph.infographic.bannerHalfFold'};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeInfographicBannerHalfFold.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var dx = Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'dx', this.dx))));
	var dx2 = Math.max(0, Math.min(w - dx, parseFloat(mxUtils.getValue(this.style, 'dx2', this.dx2))));
	var notch = Math.max(0, Math.min(h - dx, parseFloat(mxUtils.getValue(this.style, 'notch', this.notch))));

	c.begin();
	c.moveTo(dx2, 0);
	c.lineTo(w - dx, 0);
	c.lineTo(w, dx);
	c.lineTo(w, h);
	c.lineTo(w - dx * 0.5, h - notch);
	c.lineTo(w - dx, h);
	c.lineTo(w - dx, dx);
	c.lineTo(dx2, dx);
	c.lineTo(0, dx * 0.5);
	c.close();
	c.fillAndStroke();
	
	c.setShadow(false);
	c.setFillAlpha('0.2');
	c.setFillColor('#000000');
	c.begin();
	c.moveTo(w - dx, dx);
	c.lineTo(w, dx);
	c.lineTo(w, h);
	c.lineTo(w - dx * 0.5, h - notch);
	c.lineTo(w - dx, h);
	c.lineTo(w - dx, dx);
	c.lineTo(0, dx);
	c.close();
	c.fill();
	
	c.begin();
	c.moveTo(dx2, 0);
	c.lineTo(w - dx, 0);
	c.lineTo(w, dx);
	c.lineTo(w, h);
	c.lineTo(w - dx * 0.5, h - notch);
	c.lineTo(w - dx, h);
	c.lineTo(w - dx, dx);
	c.lineTo(dx2, dx);
	c.lineTo(0, dx * 0.5);
	c.close();
	c.stroke();
	
};

mxCellRenderer.registerShape(mxShapeInfographicBannerHalfFold.prototype.cst.BANNER_HALF_FOLD, mxShapeInfographicBannerHalfFold);

mxShapeInfographicBannerHalfFold.prototype.constraints = null;

Graph.handleFactory[mxShapeInfographicBannerHalfFold.prototype.cst.BANNER_HALF_FOLD] = function(state)
{
	var handles = [Graph.createHandle(state, ['dx'], function(bounds)
	{
		var dx = Math.max(0, Math.min(bounds.width, parseFloat(mxUtils.getValue(this.state.style, 'dx', this.dx))));

		return new mxPoint(bounds.x + bounds.width - dx, bounds.y + dx);
	}, function(bounds, pt)
	{
		this.state.style['dx'] = Math.round(100 * Math.max(0, Math.min(bounds.width, bounds.x + bounds.width - pt.x))) / 100;
	})];
			
	var handle2 = Graph.createHandle(state, ['notch'], function(bounds)
	{
		var dx = Math.max(0, Math.min(bounds.width, parseFloat(mxUtils.getValue(this.state.style, 'dx', this.dx))));
		var notch = Math.max(0, Math.min(bounds.height - dx, parseFloat(mxUtils.getValue(this.state.style, 'notch', this.notch))));

		return new mxPoint(bounds.x + bounds.width - dx * 0.5, bounds.y + bounds.height - notch);
	}, function(bounds, pt)
	{
		this.state.style['notch'] = Math.round(100 * Math.max(0, Math.min(bounds.height, (bounds.height + bounds.y - pt.y)))) / 100;
	});
			
	handles.push(handle2);
	
	var handle3 = Graph.createHandle(state, ['dx2'], function(bounds)
	{
		var dx = Math.max(0, Math.min(bounds.width, parseFloat(mxUtils.getValue(this.state.style, 'dx', this.dx))));
		var dx2 = Math.max(0, Math.min(bounds.width - dx, parseFloat(mxUtils.getValue(this.state.style, 'dx2', this.dx2))));

		return new mxPoint(bounds.x + dx2, bounds.y + dx);
	}, function(bounds, pt)
	{
		var dx = Math.max(0, Math.min(bounds.width, parseFloat(mxUtils.getValue(this.state.style, 'dx', this.dx))));
		
		this.state.style['dx2'] = Math.round(100 * Math.max(0, Math.min(bounds.width - dx, pt.x - bounds.x))) / 100;
	});
			
	handles.push(handle3);
	
	return handles;
};

//**********************************************************************************************************************************************************
//Circular Dial
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeInfographicCircularDial(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dy = 0.5;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeInfographicCircularDial, mxActor);

mxShapeInfographicCircularDial.prototype.cst = {CIRCULAR_DIAL : 'mxgraph.infographic.circularDial'};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeInfographicCircularDial.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var dy = Math.max(0, Math.min(h * 0.5 - 10, w * 0.5, parseFloat(mxUtils.getValue(this.style, 'dy', this.dy))));
	
	var rx = Math.max(0, Math.min(w * 0.5, h * 0.5 - 10));
	var rx2 = rx - dy;
	
	c.begin();
	c.moveTo(w * 0.5 - rx, h);
	c.lineTo(w * 0.5 - rx, rx);
	c.arcTo(rx, rx, 0, 0, 1, w * 0.5, 0);
	c.arcTo(rx, rx, 0, 0, 1, w * 0.5 + rx, rx);
	c.lineTo(w * 0.5 + rx, h);
	c.close();
	c.moveTo(w * 0.5, dy);
	c.arcTo(rx2, rx2, 0, 0, 0, w * 0.5 - rx2, rx);
	c.arcTo(rx2, rx2, 0, 0, 0, w * 0.5, rx + rx2);
	c.arcTo(rx2, rx2, 0, 0, 0, w * 0.5 + rx2, rx);
	c.arcTo(rx2, rx2, 0, 0, 0, w * 0.5, dy);
	c.close();
	c.fillAndStroke();
	
	c.setShadow(false);
	c.setFillAlpha('0.2');
	c.setFillColor('#000000');

	c.begin();
	c.moveTo(w * 0.5 - rx, 2 * rx);
	c.lineTo(w * 0.5 + rx, 2 * rx);
	c.lineTo(w * 0.5 + rx, h);
	c.lineTo(w * 0.5 - rx, h);
	c.close();
	c.fill();
};

mxCellRenderer.registerShape(mxShapeInfographicCircularDial.prototype.cst.CIRCULAR_DIAL, mxShapeInfographicCircularDial);

mxShapeInfographicCircularDial.prototype.constraints = null;

Graph.handleFactory[mxShapeInfographicCircularDial.prototype.cst.CIRCULAR_DIAL] = function(state)
{
	var handles = [Graph.createHandle(state, ['dy'], function(bounds)
	{
		var dy = Math.max(0, Math.min(bounds.height / 2, bounds.width / 2, parseFloat(mxUtils.getValue(this.state.style, 'dy', this.dy))));

		return new mxPoint(bounds.x + bounds.width * 0.5, bounds.y + dy);
	}, function(bounds, pt)
	{
		this.state.style['dy'] = Math.round(100 * Math.max(0, Math.min(bounds.height / 2, bounds.width / 2, pt.y - bounds.y))) / 100;
	})];
			
	return handles;
};

//**********************************************************************************************************************************************************
//Simple ribbon
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeInfographicRibbonSimple(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.notch1 = 0.5;
	this.notch2 = 0.5;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeInfographicRibbonSimple, mxActor);

mxShapeInfographicRibbonSimple.prototype.cst = {RIBBON_SIMPLE : 'mxgraph.infographic.ribbonSimple'};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeInfographicRibbonSimple.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var notch1 = Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'notch1', this.notch2))));
	var notch2 = Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'notch2', this.notch2))));

	c.begin();
	c.moveTo(0, h);
	c.lineTo(notch1, h * 0.5);
	c.lineTo(0, 0);
	c.lineTo(w - notch2, 0);
	c.lineTo(w, h * 0.5);
	c.lineTo(w - notch2, h);
	c.close();
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxShapeInfographicRibbonSimple.prototype.cst.RIBBON_SIMPLE, mxShapeInfographicRibbonSimple);

mxShapeInfographicRibbonSimple.prototype.constraints = null;

Graph.handleFactory[mxShapeInfographicRibbonSimple.prototype.cst.RIBBON_SIMPLE] = function(state)
{
	var handles = [Graph.createHandle(state, ['notch1'], function(bounds)
	{
		var notch1 = Math.max(0, Math.min(bounds.width, parseFloat(mxUtils.getValue(this.state.style, 'notch1', this.notch1))));

		return new mxPoint(bounds.x + notch1, bounds.y + bounds.height * 0.5);
	}, function(bounds, pt)
	{
		this.state.style['notch1'] = Math.round(100 * Math.max(0, Math.min(bounds.width, pt.x - bounds.x))) / 100;
	})];

	var handle2 = Graph.createHandle(state, ['notch2'], function(bounds)
	{
		var notch2 = Math.max(0, Math.min(bounds.width, parseFloat(mxUtils.getValue(this.state.style, 'notch2', this.notch2))));

		return new mxPoint(bounds.x + bounds.width - notch2, bounds.y);
	}, function(bounds, pt)
	{
		this.state.style['notch2'] = Math.round(100 * Math.max(0, Math.min(bounds.width, (bounds.width + bounds.x - pt.x)))) / 100;
	});
			
	handles.push(handle2);
	

	return handles;
};

//**********************************************************************************************************************************************************
//Bar with callout
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeInfographicBarCallout(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dx = 0.5;
	this.dy = 0.5;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeInfographicBarCallout, mxActor);

mxShapeInfographicBarCallout.prototype.cst = {BAR_CALLOUT : 'mxgraph.infographic.barCallout'};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeInfographicBarCallout.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var dx = Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'dx', this.dx))));
	var dy = Math.max(0, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'dy', this.dy))));

	var x1 = Math.max(dx - dy * 0.35, 0);
	var x2 = Math.min(dx + dy * 0.35, w);
	
	c.begin();
	c.moveTo(0, 0);
	c.lineTo(w, 0);
	c.lineTo(w, h - dy);
	c.lineTo(x2, h - dy);
	c.lineTo(dx, h);
	c.lineTo(x1, h - dy);
	c.lineTo(0, h - dy);
	c.close();
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxShapeInfographicBarCallout.prototype.cst.BAR_CALLOUT, mxShapeInfographicBarCallout);

mxShapeInfographicBarCallout.prototype.constraints = null;

Graph.handleFactory[mxShapeInfographicBarCallout.prototype.cst.BAR_CALLOUT] = function(state)
{
	var handles = [Graph.createHandle(state, ['dx', 'dy'], function(bounds)
	{
		var dx = Math.max(0, Math.min(bounds.width, parseFloat(mxUtils.getValue(this.state.style, 'dx', this.dx))));
		var dy = Math.max(0, Math.min(bounds.height, parseFloat(mxUtils.getValue(this.state.style, 'dy', this.dy))));

		return new mxPoint(bounds.x + dx, bounds.y + bounds.height -  dy);
	}, function(bounds, pt)
	{
		this.state.style['dx'] = Math.round(100 * Math.max(0, Math.min(bounds.width, pt.x - bounds.x))) / 100;
		this.state.style['dy'] = Math.round(100 * Math.max(0, Math.min(bounds.height, bounds.y + bounds.height - pt.y))) / 100;
	})];
			
	return handles;
};

//**********************************************************************************************************************************************************
//Flag
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeInfographicFlag(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dx = 0.5;
	this.dy = 0.5;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeInfographicFlag, mxActor);

mxShapeInfographicFlag.prototype.cst = {FLAG : 'mxgraph.infographic.flag'};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeInfographicFlag.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var dx = Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'dx', this.dx))));
	var dy = Math.max(0, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'dy', this.dy))));

	c.begin();
	c.moveTo(0, 0);
	c.lineTo(w, 0);
	c.lineTo(w, h - dy);
	c.lineTo(dx, h - dy);
	c.lineTo(dx * 0.5, h);
	c.lineTo(0, h - dy);
	c.close();
	c.fillAndStroke();
	
	c.setShadow(false);
	c.setFillAlpha('0.2');
	c.setFillColor('#ffffff');
	c.begin();
	c.moveTo(0, 0);
	c.lineTo(dx, 0);
	c.lineTo(dx, h - dy);
	c.lineTo(dx * 0.5, h);
	c.lineTo(0, h - dy);
	c.close();
	c.fill();
	
};

mxCellRenderer.registerShape(mxShapeInfographicFlag.prototype.cst.FLAG, mxShapeInfographicFlag);

mxShapeInfographicFlag.prototype.constraints = null;

Graph.handleFactory[mxShapeInfographicFlag.prototype.cst.FLAG] = function(state)
{
	var handles = [Graph.createHandle(state, ['dx', 'dy'], function(bounds)
	{
		var dx = Math.max(0, Math.min(bounds.width, parseFloat(mxUtils.getValue(this.state.style, 'dx', this.dx))));
		var dy = Math.max(0, Math.min(bounds.height, parseFloat(mxUtils.getValue(this.state.style, 'dy', this.dy))));

		return new mxPoint(bounds.x + dx, bounds.y + bounds.height - dy);
	}, function(bounds, pt)
	{
		this.state.style['dx'] = Math.round(100 * Math.max(0, Math.min(bounds.width, pt.x - bounds.x))) / 100;
		this.state.style['dy'] = Math.round(100 * Math.max(0, Math.min(bounds.height, bounds.y + bounds.height - pt.y))) / 100;
	})];
			
	return handles;
};

