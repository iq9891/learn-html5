function Hive() {
  //声明参数
  this.initVar();
  //设置 canvas 的宽高
  this.setCanvas();
  //添加背景颜色
  this.bgBlack();
  //动画
  this.drawframe();

}
//声明参数
Hive.prototype.initVar = function () {
  this.oCanvas = document.getElementById('canvas');
  this.oCtx = this.oCanvas.getContext('2d');
  this.iWinWidth = window.innerWidth;
  this.iWinHeight = window.innerHeight;
  this.aLineLenth = 1; //总线数
  this.aRects = []; //所有线的集合
};
//设置 canvas 的宽高
Hive.prototype.setCanvas = function () {
  this.oCanvas.width = this.iWinWidth;
  this.oCanvas.height = this.iWinHeight;
};
//添加背景颜色
Hive.prototype.bgBlack = function () {
  this.oCtx.fillStyle = 'black';
  this.oCtx.fillRect( 0, 0, this.iWinWidth, this.iWinHeight );
};
//帧事件
Hive.prototype.drawframe = function (){
  //添加循环帧数
  requestAnimationFrame(this.drawframe.bind(this));
  //逐帧添加背景，让之前的方块有渐渐消失的效果
  this.oCtx.globalCompositeOperation = 'source-over';
  this.oCtx.fillStyle = 'rgba(0,0,0,0.04)';
  this.oCtx.fillRect( 0, 0, this.iWinWidth, this.iWinHeight );
  this.oCtx.globalCompositeOperation = 'lighter';
  //如果当前线数少于规定的总线数
  if (this.aRects.length < this.aLineLenth) {
    this.aRects.push(new Rect( this.oCtx ));
  }
  //移动所有的方块
  this.aRects.map(function( oRect ){
    oRect.move();
  });

};
//程序的初始化
new Hive();
