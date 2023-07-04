<template>
  <div class="big-screen">
    <div class="head">
      <h1>智慧校园访问系统</h1>
    </div>
    <div class="mainbox">
      <ul class="clearfix">
        <li>
          <widgetBox style="height: calc(100% - 0.25rem); padding: 0">
            <div class="tit04">已进校（13）</div>

            <div class="boxnav nav04">
              <div class="listhead listhead2">
                <span>姓名</span>
                <span>手机号</span>
                <span>进校时间</span>
              </div>
              <widget :list="new Array(100).fill(1)" class="listnav listnav2 scrollDiv"> </widget>
            </div>
          </widgetBox>
        </li>
        <li>
          <widgetBox style="height: calc(33.33333% - 0.25rem)">
            <div class="tit02">今日统计</div>
            <div class="boxnav nav02">
              <div class="box-infos">
                <section class="s1">
                  <div>
                    <p>未到访</p>
                    <p>10000</p>
                  </div>
                </section>
                <section class="s2">
                  <div>
                    <p>已进校</p>
                    <p>10000</p>
                  </div>
                </section>
                <section class="s3">
                  <div>
                    <p>已离校</p>
                    <p>10000</p>
                  </div>
                </section>
              </div>
              <div class="box-time">{{ times }}</div>
            </div>
          </widgetBox>
          <widgetBox style="height: calc(66.666666% - 0.25rem)">
            <div class="tit03">进校人员信息</div>
            <div class="boxnav nav03">
              <!-- <div class="listhead listhead1">
                <span>字段1</span>
                <span>字段名称</span>
                <span>字段名称</span>
                <span>字段名称</span>
                <span>字段名称</span>
                <span>字段名称</span>
              </div> -->
              <widget2 :list="new Array(100).fill(1)" class="listnav listnav1 scrollDiv small"> </widget2>
            </div>
          </widgetBox>
        </li>
        <li>
          <widgetBox style="height: calc((100% - 0.5rem) / 2); padding: 0">
            <div class="tit04">今日未到访（82）</div>
            <div class="boxnav nav04">
              <div class="listhead listhead2">
                <span>姓名</span>
                <span>手机号</span>
                <span>身份证</span>
              </div>
              <widget :list="new Array(100).fill(1)" class="listnav listnav2 scrollDiv"> </widget>
            </div>
            <div class="boxfoot"></div>
          </widgetBox>
          <widgetBox style="height: calc((100% - 0.5rem) / 2); padding: 0; margin-bottom: 0">
            <div class="tit04">今日已离校（100）</div>
            <div class="boxnav nav04">
              <div class="listhead listhead2">
                <span>姓名</span>
                <span>手机号</span>
                <span>离校时间</span>
              </div>
              <widget :list="new Array(100).fill(1)" class="listnav listnav2 scrollDiv"> </widget>
            </div>
            <div class="boxfoot"></div>
          </widgetBox>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import widget from "./compontents/scrollBox.vue";
import widget2 from "./compontents/detailBox.vue";
import widgetBox from "./compontents/widgetBox.vue";
export default {
  name: "dashbord",
  components: {
    widget,
    widgetBox,
    widget2,
  },
  data() {
    return {
      times: "",
    };
  },
  mounted() {
    this.$nextTick(() => {
      const hht = document.querySelector("html");
      const whei = hht.clientWidth;
      console.dir(whei);

      hht.style.fontSize = whei / 20 + "px";
      hht.style.backgroundColor = "#eee";
    });

    setInterval(() => {
      let date = new Date();
      this.times = date.toLocaleString();
    }, 1000);
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/modules/bigscreen.scss";
.box-time {
  font-size: 0.3rem;
  text-align: center;
  margin-top: 20px;
}
.box-infos {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.4rem;
  padding-top: 0.25rem;
  > section {
    display: flex;
    justify-content: center;
    padding: 0.15rem;
    border-radius: 3px;
    &.s1 {
      background-color: rgb(0, 234, 55, 0.5);
    }
    &.s2 {
      background-color: rgba(0, 74, 234, 0.5);
    }
    &.s3 {
      background-color: rgba(234, 0, 0, 0.5);
    }

    p {
      &:first-child {
        font-size: 0.4rem;
        letter-spacing: 0.02rem;
        margin-bottom: 0.25rem;
      }
      &:last-child {
        font-size: 0.3rem;
        letter-spacing: 0.02rem;
      }
    }
  }
}
</style>
