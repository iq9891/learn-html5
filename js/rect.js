function Rect(oCtx) {
  //声明参数
  this.initVar(oCtx);
  //重置
  this.reset();
}
//声明参数
Rect.prototype.initVar = function (oCtx) {
  this.oCtx = oCtx;
  this.iWinWidth = window.innerWidth;
  this.iWinHeight = window.innerHeight;
  this.iPointSize = 2; //点的大小
  this.iBaseTime = 20; //时间基准
  this.sparkChance = 0.2; //火花的出现的几率
  this.iSparkDist = 10; //火花距离线距离随机数的基数
  this.iSparkSize = 2; //火花的大小
  this.iMoveLenth = this.rd(this.iWinWidth / 5, this.iWinWidth / 2); //所有的方块，移动的最大位置基数
  //每条线增加的基本弧度，并且下一个增加的备选索引
  this.aPath = [
    // x,y,下个路径备选[a,b]( 左上->右下, 下一个是[左下<-右上, 水平从左->向右] )
    {
      iX: this.toRadian(60),
      iY: this.toRadian(60),
      aNextIndex: [3, 4]
    },
    // x,y,下个路径备选[a,b]( 左上<-右下, 下一个是[左下->右上, 水平从左<-向右] )
    {
      iX: this.toRadian(120),
      iY: this.toRadian(-60),
      aNextIndex: [2, 5]
    },
    // x,y,下个路径备选[a,b]( 左下->右上, 下一个是[左上<-右下, 水平从左->向右] )
    {
      iX: this.toRadian(60),
      iY: this.toRadian(-60),
      aNextIndex: [1, 4]
    },
    // x,y,下个路径备选[a,b]( 左下<-右上, 下一个是[左上->右下, 水平从左<-向右] )
    {
      iX: this.toRadian(120),
      iY: this.toRadian(60),
      aNextIndex: [0, 5]
    },
    // x,y,下个路径备选[a,b]( 水平从左->向右, 下一个是[左上->右下,左下->右上] )
    {
      iX: 0,
      iY: 0,
      aNextIndex: [0, 2]
    },
    // x,y,下个路径备选[a,b]( 水平从左<-向右, 下一个是[左上<-右下, 左下<-右上] )
    {
      iX: this.toRadian(180),
      iY: 0,
      aNextIndex: [1, 3]
    }
  ];
  //获取弧度的索引
  this.iIndex = this.rd(0, this.aPath.length - 1);

};
//重置
Rect.prototype.reset = function () {
  //本次索引的时间
  this.iTime = this.iBaseTime + 1;
  //累计的时间
  this.iCumulativeTime = 0;

  this.iPointX = this.iWinWidth / 2; //点的起始位置 x
  this.iPointY = this.iWinHeight / 2; //点的起始位置 y
  this.iRadianX = 0; //点 X 位置每次增加的量 / 单位是度数
  this.iRadianY = 0; //点 Y 位置每次增加的量 / 单位是度数

};
//移动
Rect.prototype.move = function () {
  //本次索引的时间
  this.iTime++;
  this.iCumulativeTime++;
  //如果到一定时间了，更换下一个弧度
  if (this.iTime > this.iBaseTime) {
    //重置本次的时间
    this.iTime = 0;
    //获取当前索引的各种弧度
    this.iRadianX = this.aPath[this.iIndex].iX;
    this.iRadianY = this.aPath[this.iIndex].iY;
    //把索引调到下一个
    this.iIndex = this.aPath[this.iIndex].aNextIndex[this.rd(0,1)];
  }
  //更新方块的坐标
  this.iPointX += Math.cos(this.iRadianX);
  this.iPointY += Math.sin(this.iRadianY);
  //改变颜色
  this.oCtx.fillStyle = 'hsl(hue,100%,50%)'.replace( 'hue', this.rd(0, 360) );
  //添加方块
  this.oCtx.fillRect( this.iPointX, this.iPointY, this.iPointSize, this.iPointSize );
  //线边上的点，20%的几率
  if( Math.random() < this.sparkChance ){
    this.oCtx.fillRect( this.iPointX + this.rd(-this.iSparkDist, this.iSparkDist), this.iPointY + this.rd(-this.iSparkDist, this.iSparkDist), this.iSparkSize, this.iSparkSize );
  }
  //如果已经存在的时间超过 movelength
  if (this.iCumulativeTime > this.iMoveLenth) {
    this.reset();
  }

};
/**
 * 获取n至m随机整数
 */
Rect.prototype.rd = function (n,m){
  return Math.floor( Math.random() * ( m - n + 1 ) + n );
};
/**
 * 转成弧度
 */
Rect.prototype.toRadian = function (iAngle) {
  return iAngle * Math.PI / 180;
};
