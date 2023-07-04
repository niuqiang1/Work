<template>
  <div>
    <vue-seamless-scroll :data="list" :classOption="classOption">
      <ul>
        <li v-for="(i, index) in list" :key="index" class="detail-item">
          <el-avatar shape="square" :size="260" :fit="fit" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-avatar>
          <div class="box-content">
            <p class="name textgreen">张三丰 <span>（184****3421）</span></p>
            <p class="in-time">进校时间：2023-10-10 09:34</p>
            <p class="cnt-person">审核人： <span class="text-green"> 章文</span></p>
            <p class="cnt-time">审核时间：2023-10-10 09:34</p>
          </div>
        </li>
      </ul>
    </vue-seamless-scroll>
  </div>
</template>
<script>
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  name: "widget2",
  components: {
    vueSeamlessScroll,
  },
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
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

.listnav {
  overflow: hidden;
}
.detail-item {
  border: 1px solid #3486da;
  padding: 0.125rem 0.5rem;
  display: flex;
  align-items: center;
  .box-content {
    display: flex;
    flex-direction: column;
    margin-left: 0.5rem;
    p {
      margin: 0;
      font-size: 0.3rem;

      + p {
        margin-top: 0.3rem;
      }
      &.name {
        font-size: 0.3rem;
        color: #00ea37;
        span {
          font-size: 0.25rem;
        }
      }
    }
  }

  + .detail-item {
    margin-top: 0.25rem;
  }
}
.text-green {
  color: #ea4600;
}
</style>
