<template>
  <div>
    <vue-seamless-scroll :data="list" :classOption="classOption">
      <ul>
        <li v-for="(i, index) in list" :key="index" class="detail-item">
          <el-avatar shape="square" :size="260" fit="cover">
            <img :src="i.headUrl" />
          </el-avatar>
          <div class="box-content">
            <p class="name textgreen">
              {{ i.name }} <span>（{{ i.phone | plusXing(3, 4) }}）</span>
            </p>
            <p class="in-time">进校时间：{{ i.comeTime }}</p>
            <p class="cnt-person">
              审核人： <span class="text-green"> {{ i.authName }}</span>
            </p>
            <p class="cnt-time">审核时间：{{ i.auditTime }}</p>
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
        limitMoveNum: 3,
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
