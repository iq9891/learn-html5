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
  this.sColor = "#6ca0f6"; //海水颜色
  this.aVertexes = []; //顶点坐标
  this.iVerNum = 1000; //顶点数
  this.iInitialDiff = 1000; //初始差分值
  this.iStartingPoint = this.iVerNum / 2; //震荡点
  this.iBuffer = 15;//38; //缓冲 数字太小中间会有不流畅的过渡
  this.iFriction = 0.15; //摩擦力
  this.iDeceleration = 0.95; //减速
  this.oAnimationFrame = null;
};
//设置 canvas 的宽高
Water.prototype.setCanvas = function () {
  this.oCanvas.width = this.iWinWidth;
  this.oCanvas.height = this.iWinHeight;
};
//生成顶点，初始差分值
Water.prototype.initVertex = function () {
  for(var i=0; i< this.iVerNum; i++){
		this.aVertexes[i] = {
    	x: this.iWinWidth / (this.iVerNum-1) * i, // 点的坐标
    	y: this.iWinHeight/2,
    	vy: 0, //竖直方向的速度
      //如果是起震点，就初始差分值
      diffPt: i === this.iStartingPoint ? this.iInitialDiff : 0  //初始差分值
    };
	}
};
//设置 canvas 的水
Water.prototype.drawWater = function () {
  //清空子路径列表开始一个新路径的方法。
  this.oCtx.beginPath();
  //画水
  this.aVertexes.map(function (oVertex, oVertexId) {
    this.oCtx.lineTo(oVertex.x, oVertex.y);
  }.bind(this));
  //从顶点的最后一个点，向( this.iWinWidth, this.iWinHeight )点画线
  this.oCtx.lineTo(this.iWinWidth, this.iWinHeight);
  //从( this.iWinWidth, this.iWinHeight )点，向( 0, this.iWinHeight )点画线
  this.oCtx.lineTo(0, this.iWinHeight);
  //设置颜色
  this.oCtx.fillStyle = this.sColor;
  //填充
  this.oCtx.fill();

};
//顶点恢复
Water.prototype.reset = function(){

  this.aVertexes.map(function (oVertex, oVertexId) {
    oVertex.y = this.iWinHeight/2;
    oVertex.vy = 0; //竖直方向的速度
    //如果是起震点，就初始差分值
    oVertex.diffPt = oVertexId === this.iStartingPoint ? this.iInitialDiff : 0;  //初始差分值
  }.bind(this));

};
//顶点更新
Water.prototype.update = function(){

  this.aVertexes[this.iStartingPoint].diffPt -= this.aVertexes[this.iStartingPoint].diffPt * 0.9;
  //更新Y坐标
  this.aVertexes.map(function (oVertex, oVertexId) {
    if (oVertexId < this.iStartingPoint) {
      this.aVertexes[this.iStartingPoint - oVertexId - 1].diffPt -= ( this.aVertexes[this.iStartingPoint - oVertexId - 1].diffPt - this.aVertexes[this.iStartingPoint - oVertexId].diffPt ) * (1 - 0.01 * (oVertexId > this.iBuffer ? this.iBuffer : oVertexId ));
      if (this.iStartingPoint + oVertexId + 1 < this.aVertexes.length) {
        //右边的 = 左边的
        this.aVertexes[this.iStartingPoint + oVertexId + 1].diffPt = this.aVertexes[this.iStartingPoint - oVertexId - 1].diffPt;
      }
    }
    oVertex.vy += (oVertex.diffPt + this.iWinHeight / 2 - oVertex.y);
  	oVertex.vy *= this.iDeceleration;
  	oVertex.y += oVertex.vy * this.iFriction;
  }.bind(this));

};
//动画
Water.prototype.drawframe =function (){
  //更新坐标点
  this.oCtx.clearRect(0, 0, this.iWinWidth, this.iWinHeight);
  this.update();
  this.drawWater();
  //添加循环帧数
  this.oAnimationFrame = requestAnimationFrame(this.drawframe.bind(this));
  //如果速度为0了就停止动画
  if (Math.abs(this.aVertexes[this.iStartingPoint].vy).toFixed(3) < 0.01) { //75.529 //0.01
    //取消
    cancelAnimationFrame(this.oAnimationFrame);
    this.oAnimationFrame = null;
    this.reset();
    this.drawWater();
  }
};

//所有程序的初始化
new Water();
