<template>
  <div>
    <div class="container" :style="{width:Boxwidth,height:Boxheight}">
      <div class="container-cross" v-show="InputImgshow">
        请选择图片
        <input type="file" name="files" ref="Myfile" @change="changeFile" class="input">
      </div>
      <canvas ref="Mycanvas" class="mycanvas" :width="width" :height="height" v-show="Canvasshow"></canvas>
      <img :src="fileUrl" alt="" ref="Myimg" class="img" v-show="Imgshow">
    </div>
    <slot></slot>
    <button @click="getBgimg">虚化</button>
    <button @click="overturn">翻转</button>
    <button @click="getColor">主色调</button>
    <button @click="confirm">确认</button>
    <a :href="href" :download="imgName">下载</a>
  </div>
</template>
<script>
let Mycanvas, Myimg, cxt, Myfile, width, height;
export default {
  name: "imageprocess",
  data() {
    return {
      href: "",
      fileUrl: "",
      InputImgshow: true,
      Canvasshow: false,
      Imgshow: true,
      Boxwidth: this.width + "px",
      Boxheight: this.height + "px",
      imgName:"",
    };
  },
  props: {
    width: {
      type: String,
      default: "300"
    },
    height: {
      type: String,
      default: "300"
    }
  },
  methods: {
    //上传图片 获取路径、
    changeFile() {
      this.imgName=Myfile.files[0].name;
      let url = window.URL.createObjectURL(Myfile.files[0]);
      this.fileUrl = url;
      this.InputImgshow = false;
    },
    //翻转
    overturn() {
      this.Imgshow = false;
      this.Canvasshow = true;
      Mycanvas.height = height;
      cxt.translate(width, height);
      cxt.rotate((180 * Math.PI) / 180);
      cxt.drawImage(Myimg, 0, 0, width, height);
      this.href = Mycanvas.toDataURL("image/png");
    },

    //图像作为背景色  虚化
    getBgimg() {
      this.Imgshow = false;
      this.Canvasshow = true;
      Mycanvas.height = height;
      cxt.drawImage(Myimg, 0, 0, width, height);
      let imageData = cxt.getImageData(0, 0, width, height);
      for (var i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i + 3] = 100;
      }
      cxt.putImageData(imageData, 0, 0);
      cxt.globalCompositeOperation = "source-over";
      cxt.drawImage(Myimg, width / 4, height / 4, width / 2, height / 2);
      this.href = Mycanvas.toDataURL("image/png");
    },

    //获取主色调
    getColor() {
      this.Imgshow = false;
      this.Canvasshow = true;
      Mycanvas.height = height;
      cxt.drawImage(Myimg, 0, 0);
      let imageData = cxt.getImageData(0, 0, width, height);
      // 取所有像素的平均值
      let r = 0,
        g = 0,
        b = 0;
      for (var row = 0; row < height; ++row) {
        for (var col = 0; col < width; ++col) {
          let x = ((height / 2) * row + col) * 4;
          r += imageData.data[x];
          g += imageData.data[x + 1];
          b += imageData.data[x + 2];
        }
      }
      // 求取平均值
      r /= width * height;
      g /= width * height;
      b /= width * height;
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
      cxt.putImageData(imageData, 0, 0);
      cxt.globalCompositeOperation = "source-over";
      cxt.drawImage(Myimg, width / 4, height / 4, width / 2, height / 2);
      this.href = Mycanvas.toDataURL("image/png");
    },
    //确认
    confirm() {
      Mycanvas.height = 0;
      this.Imgshow = true;
      this.Canvasshow = false;
      this.fileUrl = this.href;
    }
  },
  mounted() {
    Mycanvas = this.$refs.Mycanvas;
    Myimg = this.$refs.Myimg;
    //获取上传图片信息
    Myfile = this.$refs.Myfile;
    cxt = Mycanvas.getContext("2d");
    //画布的width height
    width = this.width;
    height = this.height;
  }
};
</script>
<style scoped>
.container {
  /* width: 300px;
  height: 300px; */
  border: 1px dashed #ccc;
  position: relative;
  background: #eee;
}
.container-cross {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -50px;
  margin-top: -50px;
  text-align: center;
  line-height: 100px;
  position: relative;
  font-weight: 600;
}
.container-cross .input {
  width: 100px;
  height: 100px;
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
}
.img {
  width: 100%;
  height: 100%;
}

.mycanvas {
  border: 1px solid #ccc;
  display: block;
  margin: auto;
}
</style>

