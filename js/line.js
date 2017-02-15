function Water() {
  //声明参数
  this.initVar();
  //设置 canvas 的宽高
  this.setCanvas();
  this.oCtx.fillStyle = 'black';
  this.oCtx.fillRect( 0, 0, this.iWinWidth, this.iWinHeight );
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
  this.tick = 0;
  this.cumulativeTime = 0;
  this.time = 0;

  this.v = 6;
  this.repaintAlpha = .04;
};
//设置 canvas 的宽高
Water.prototype.setCanvas = function () {
  this.oCanvas.width = this.iWinWidth;
  this.oCanvas.height = this.iWinHeight;
};
//生成一个点
Water.prototype.createPoint = function () {

    ++this.time;
    ++this.cumulativeTime;

  if (this.iPointY < 0) {
    // this.iPointY += this.v;
    // canelAnimationFrame(this.oAnimationFrame)
  }else{
    this.iPointY += -this.v;
  }
  if (this.iPointY < 0) {
    this.iPointX += this.v;
  }else{
    this.iPointX += -this.v;
  }

  this.color = 'hsl(hue,100%,light%)'.replace( 'hue', 100 );
  this.lightInputMultiplier = 0.01 + 0.02 * Math.random();

  // this.oCtx.fillStyle = this.color.replace( 'light',50 + 10 * Math.sin( this.cumulativeTime * this.lightInputMultiplier ) );
  // this.oCtx.fillRect( this.iPointX, this.iPointY, 5, 5 );

  this.oCtx.fillStyle = this.oCtx.shadowColor = this.color.replace( 'light', 50 + 10 * Math.sin( this.cumulativeTime * this.lightInputMultiplier ) );

  this.oCtx.fillRect( this.iPointX, this.iPointY, 5,5 );


};
//动画
Water.prototype.drawframe = function (){
    //添加循环帧数
    this.oAnimationFrame = requestAnimationFrame(this.drawframe.bind(this));
    this.oCtx.globalCompositeOperation = 'source-over';
    this.oCtx.shadowBlur = 0;
    this.oCtx.fillStyle = 'rgba(0,0,0,alp)'.replace( 'alp', this.repaintAlpha );
    this.oCtx.fillRect( 0, 0, this.iWinWidth, this.iWinHeight );
    this.oCtx.globalCompositeOperation = 'lighter';

    //生成一个点
    this.createPoint();
};

//程序的初始化
new Water();
