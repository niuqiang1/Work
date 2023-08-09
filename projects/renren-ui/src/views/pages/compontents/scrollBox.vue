<template>
  <div>
    <vue-seamless-scroll :data="list" :classOption="classOption">
      <ul class="smjl">
        <li v-for="(i, index) in list" :key="index">
          <span>{{ i.name }}</span>
          <span class="text-green">{{ i.phone | plusXing(3, 4) }}</span>
          <span> {{ { come: i.comeTime, leave: i.leaveTime, wait: plusXing(i.idNo, 3, 4) }[type] }} </span>
        </li>
      </ul>
    </vue-seamless-scroll>
  </div>
</template>
<script>
import vueSeamlessScroll from "vue-seamless-scroll";
import { plusXing } from "@/utils";

export default {
  name: "widget",
  components: {
    vueSeamlessScroll,
  },
  props: {
    type: {
      type: String,
      default: "come",
    },
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      plusXing,
      classOption: {
        step: 0.4,
      },
    };
  },
};
</script>

<style scoped lang="scss">
ul {
  padding: 0;
  margin: 0;
}
.boxnav {
}
.nav01 {
  height: calc(100% - 0.3rem);
  padding-top: 0.2rem;
}
.nav02 {
  height: calc(100%);
  display: flex;
  align-items: center;
}
.nav03 {
  height: calc(100% - 0.47rem);
  padding-top: 0.2rem;
}
.nav04 {
  height: calc(100% - 0.7rem);
}
.nav02 > div {
  width: 100%;
}
.nav02 p {
  text-align: center;
  color: #fff;
}
.nav02 .p1 {
  font-size: 0.3rem;
  letter-spacing: 0.02rem;
}
.p2 {
  font-size: 0.6rem;
  letter-spacing: 0.05rem;
  padding: 0.1rem 0;
  width: 100%;
  text-align: center;
}
.nav02 .p3 span {
  text-align: center;
  color: #fff;
  display: inline-block;
  width: 45%;
  font-size: 0.3rem;
}
.dot {
  width: 0.2rem;
  height: 0.2rem;
  display: inline-block;
  border-radius: 1rem;
  position: relative;
  top: 0.04rem;
  margin-right: 0.1rem;
}
.dot1 {
  background: #ff0006;
}
.dot2 {
  background: #00ea37;
}
.text-green {
  color: #00ea37;
}
.text-red {
  color: #ff0006;
}

.listhead {
  height: 0.55rem;
  display: flex;
  justify-content: space-between;
}
.listnav {
  overflow: hidden;
}
.listnav ul li {
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.listhead span,
.listnav li span {
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  height: 0.55rem;
}
.listhead1 span,
.listnav1 li span {
  border: 1px solid #3486da;
}
.listnav ul li span {
  font-size: 0.18rem;
}
.listnav2 ul li:nth-child(odd) {
  background: #0c2854;
}
.listhead1 span {
  background: #0c2854;
  font-size: 0.2rem;
  color: #3486da;
  font-weight: bold;
}
.listhead2 span {
  font-size: 0.2rem;
  color: #3486da;
  border-bottom: 1px solid #0c2854;
  font-weight: bold;
}

/*Plugin CSS*/
.str_wrap {
  overflow: hidden;
  width: 100%;
  position: relative;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  white-space: nowrap;
}

.str_move {
  white-space: nowrap;
  position: absolute;
  top: 0;
  left: 0;
  cursor: move;
}
.str_move_clone {
  display: inline-block;
  vertical-align: top;
  position: absolute;
  left: 100%;
  top: 0;
}
.str_vertical .str_move_clone {
  left: 0;
  top: 100%;
}
.str_down .str_move_clone {
  left: 0;
  bottom: 100%;
}
.str_vertical .str_move,
.str_down .str_move {
  white-space: normal;
  width: 100%;
}
.str_static .str_move,
.no_drag .str_move,
.noStop .str_move {
  cursor: inherit;
}
.str_wrap img {
  max-width: none !important;
}

.payment-time {
  padding-right: 10px;
}
</style>
