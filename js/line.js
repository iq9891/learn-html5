function Water() {
  //声明参数
  this.initVar();
  //设置 canvas 的宽高
  this.setCanvas();
  //生成一个点
  // this.createPoint();
  //动画
  this.drawframe();

}
//声明参数
Water.prototype.initVar = function () {
  this.oCanvas = document.getElementById('canvas');
  this.oCtx = this.oCanvas.getContext('2d');
  this.iWinWidth = window.innerWidth;
  this.iWinHeight = window.innerHeight;
  this.oAnimationFrame = null; //帧数变化的名字
  this.iPointX = this.iWinWidth / 2; //点的起始位置 x
  this.iPointY = this.iWinHeight / 2; //点的起始位置 y
};
//设置 canvas 的宽高
Water.prototype.setCanvas = function () {
  this.oCanvas.width = this.iWinWidth;
  this.oCanvas.height = this.iWinHeight;
};
//生成一个点
Water.prototype.createPoint = function () {

  this.iPointX -= 6;
  this.iPointY -= 6;
  this.oCtx.fillRect( this.iPointX, this.iPointY, 5, 5 );

};
//动画
Water.prototype.drawframe = function (){
    //添加循环帧数
    this.oAnimationFrame = requestAnimationFrame(this.drawframe.bind(this));
    this.oCtx.globalCompositeOperation = 'source-over';
    this.oCtx.shadowBlur = 0;
    this.oCtx.fillStyle = 'rgba(255,0,0,alp)'.replace( 'alp',0.4 );
    this.oCtx.fillRect( 0, 0, 5, 5 );
    this.oCtx.globalCompositeOperation = 'lighter';

};

//程序的初始化
new Water();
