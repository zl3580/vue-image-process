<template>
  <div>
    <img :src="imgUrl" alt="" srcset="" ref="Myimg">

    <button @click="getBgimg">虚化</button>
    <button @click="overturn">翻转</button>
    <button @click="getColor">主色调</button>
    <canvas ref="Mycanvas" class="mycanvas" width="1000" height="333"></canvas>
    <a :href="href" download="aaa">下载</a>
  </div>
</template>
<script>
let Mycanvas, Myimg, cxt;
export default {
  data() {
    return {
      imgUrl: require("../assets/1.jpg"),
      href: ""
    };
  },
  methods: {
    //翻转
    overturn() {
      Mycanvas.height = 333;
      cxt.translate(500, 333);
      cxt.rotate((180 * Math.PI) / 180);
      cxt.drawImage(Myimg, 0, 0, 500, 333);
      this.href = Mycanvas.toDataURL("image/png");
    },
    
    //图像作为背景色  虚化
    getBgimg() {
      Mycanvas.height = 333;
      cxt.drawImage(Myimg, 0, 0,500,333);

      let imageData = cxt.getImageData(0, 0, 500, 333);
      for (var i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i + 3] = 100;
      }
      // cxt.globalAlpha=1;
      cxt.putImageData(imageData, 500, 0,);
      // cxt.globalAlpha=0.5;
      cxt.globalCompositeOperation = "source-over";
      cxt.drawImage(Myimg, 590, 50, 300, 200);
    },

    //获取主色调
    getColor(){
       Mycanvas.height = 333;
      cxt.drawImage(Myimg, 0, 0,);
      let imageData = cxt.getImageData(0, 0, 500, 333);
      // 取所有像素的平均值
      let r = 0,
        g = 0,
        b = 0;
      for (var row = 0; row < 333; ++row) {
        for (var col = 0; col < 500; ++col) {
          let x = (250 * row + col) * 4;
          r += imageData.data[x];
          g += imageData.data[x + 1];
          b += imageData.data[x + 2];
        }
      }
      // 求取平均值
      r /= 500 * 333;
      g /= 500 * 333;
      b /= 500 * 333;
      // 将最终的值取整
      r = Math.round(r);
      g = Math.round(g);
      b = Math.round(b);
      for (var i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] = r;
        imageData.data[i + 1] = g;
        imageData.data[i + 2] = b;
        imageData.data[i + 3] = 150;
      }
      // cxt.globalAlpha=1;
      cxt.putImageData(imageData, 500, 0,);
      // cxt.globalAlpha=0.5;
      cxt.globalCompositeOperation = "source-over";
      cxt.drawImage(Myimg, 590, 50, 300, 200);
    },
    //获取某一点的颜色
    // getPX(event){
    //     event=event || window.event;
    
    // }

  },
  mounted() {
    Mycanvas = this.$refs.Mycanvas;
    Myimg = this.$refs.Myimg;
    cxt = Mycanvas.getContext("2d");
  //  document.onmousemove=function(event){
  //    console.log(event.screenX)
  //  }
  }
};
</script>
<style scoped>
.mycanvas {
  border: 1px solid #ccc;
  display: block;
  margin: auto;
}
</style>

