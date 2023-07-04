<template>
  <div class="boxall">
    <slot />
    <div class="boxfoot"></div>
  </div>
</template>
<script></script>

<style lang="scss" scoped>
.boxall {
  border: 1px solid #3486da;
  background: rgba(0, 70, 190, 0.1);
  padding: 0.15rem;
  position: relative;
  margin-bottom: 0.25rem;
  z-index: 10;
}
.boxall:before,
.boxall:after {
  position: absolute;
  width: 0.15rem;
  height: 0.15rem;
  content: "";
  border-top: 3px solid #3486da;
  top: -2px;
}
.boxall:before,
.boxfoot:before {
  border-left: 3px solid #3486da;
  left: -2px;
}
.boxall:after,
.boxfoot:after {
  border-right: 3px solid #3486da;
  right: -2px;
}

.boxfoot {
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
}
.boxfoot:before,
.boxfoot:after {
  position: absolute;
  width: 0.15rem;
  height: 0.15rem;
  content: "";
  border-bottom: 3px solid #3486da;
  bottom: -2px;
}

.tit01 {
  background: linear-gradient(to right, rgba(48, 82, 174, 1), rgba(48, 82, 174, 0));
  color: #fff;
  font-size: 0.17rem;
  padding: 0.03rem 0.1rem;
}
.tit02 {
  background: #3aafe8;
  color: #021132;
  position: absolute;
  font-size: 0.25rem;
  padding: 0.02rem 0;
  text-align: center;
  width: 2.4rem;
  left: 50%;
  margin-left: -1.2rem;
  margin-top: -0.35rem;
  letter-spacing: 0.05rem;
}
.tit03 {
  text-align: center;
  color: #fff;
  font-size: 0.25rem;
  line-height: 0.5rem;
  letter-spacing: 0.05rem;
}
.tit04 {
  text-align: center;
  background: #0c2854;
  color: #fff;
  font-size: 0.25rem;
  line-height: 0.6rem;
  letter-spacing: 0.05rem;
}

.wrap {
  height: 2.54rem;
  overflow: hidden;
}
.wrap li {
  line-height: 0.42rem;
  height: 0.42rem;
  font-size: 0.18rem;
  text-indent: 0.24rem;
  margin-bottom: 0.1rem;
}
.wrap li p {
  border: 1px solid rgba(25, 186, 139, 0.17);
  color: rgba(255, 255, 255, 0.6);
}
</style>
