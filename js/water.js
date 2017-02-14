function Water() {
  //声明参数
  this.initVar();
  //生成顶点，初始差分值
  this.initVertex();
  //设置 canvas 的宽高
  this.setCanvas();
  //设置 canvas 的水
  this.drawWater();
  //动画
	this.drawframe();
}
//声明参数
Water.prototype.initVar = function () {
  this.oCanvas = document.getElementById('canvas');
  this.oCtx = this.oCanvas.getContext('2d');
	this.iWinWidth = window.innerWidth;
	this.iWinHeight = window.innerHeight;
  this.color1 = "#6ca0f6"; //海水颜色
  this.vertexes = [];    //顶点坐标
  this.verNum = 250;     //顶点数
  this.diffPt = [];      //差分值
  this.autoDiff = 1000;  //初始差分值
	this.vPos = 125;  //震荡点
	this.iBuffer = 15;     //缓冲
	this.friction = 0.15; //摩擦力
	this.deceleration = 0.95; //减速
  this.oAnimationFrame = null;
};
//设置 canvas 的宽高
Water.prototype.setCanvas = function () {
	this.oCanvas.width = this.iWinWidth;
	this.oCanvas.height = this.iWinHeight;
};
//生成顶点，初始差分值
Water.prototype.initVertex = function () {
  for(var i=0; i< this.verNum; i++){
		this.vertexes[i] = {
    	x: this.iWinWidth / (this.verNum-1) * i, // 点的坐标
    	y: this.iWinHeight/2,
    	vy: 0, //竖直方向的速度
      diffPt: 0
    };
		this.diffPt[i] = 0;
	}
};
//设置 canvas 的水
Water.prototype.drawWater = function () {
  this.oCtx.save();
  this.oCtx.fillStyle = this.color1;
  this.oCtx.beginPath();
  this.oCtx.moveTo(0, this.iWinHeight);
  this.oCtx.lineTo(0, this.iWinHeight / 2);
  for(var i=1; i<this.vertexes.length; i++){
  	this.oCtx.lineTo(this.vertexes[i].x, this.vertexes[i].y);
  }
  this.oCtx.lineTo(this.iWinWidth, this.iWinHeight);
  this.oCtx.lineTo(0, this.iWinHeight);
  this.oCtx.fill();
  this.oCtx.restore();
};
//顶点更新
Water.prototype.update = function(){
  this.autoDiff -= this.autoDiff*0.9;
  this.diffPt[this.vPos] = this.autoDiff;
  //更新左右
  for (var h = 0; h < this.vPos; h++) {
    console.log((this.diffPt[this.vPos - h - 1] - this.diffPt[this.vPos - h]) * (1 - 0.01 * h), (this.diffPt[this.vPos + h + 1] - this.diffPt[this.vPos + h]) * (1 - 0.01 * h));
    //更新零界点左边的
    this.diffPt[this.vPos - h - 1] -= (this.diffPt[this.vPos - h - 1] - this.diffPt[this.vPos - h]) * (1 - 0.01 * h);
    //更新零界点右边的
    this.diffPt[this.vPos + h + 1] -= (this.diffPt[this.vPos + h + 1] - this.diffPt[this.vPos + h]) * (1 - 0.01 * h);
  }
  //更新Y坐标
  for(var i=0; i < this.vertexes.length; i++){
    this.vertexes[i].diffPt -= (this.vertexes[i].diffPt - this.vertexes[i + 1 * ( (i - this.vPos) < 0 ? 1 : -1 )].diffPt) * (1 - 0.01 * i);
    this.vertexes[i].vy += (this.diffPt[i] + this.iWinHeight / 2 - this.vertexes[i].y);
  	this.vertexes[i].vy *= this.deceleration;
  	this.vertexes[i].y += this.vertexes[i].vy * this.friction;
    console.log(this.vertexes[i].diffPt);
  }
  //如果速度为0了就停止动画
  if (Math.abs(this.vertexes[this.vPos].vy).toFixed(3) < '0.001') {
    cancelAnimationFrame(this.oAnimationFrame);
  }

};
//动画
Water.prototype.drawframe =function (){
  var self = this;
  //更新坐标点
  this.oCtx.clearRect(0, 0, this.iWinWidth, this.iWinHeight);
  // this.oAnimationFrame = requestAnimationFrame(function () {
  //   self.drawframe();
  // }, this.oCanvas);
  this.update();
  this.drawWater();
};

//所有程序的初始化
new Water();
