<template>
  <div id="modal-overlay2">
    <div class="alert">
      <div class="modal-title">
        <h6>搜索公司</h6>
        <button v-on:click="closeAlert2"></button>
      </div>
      <ul class="modal-container" v-bind:class="{ modalContainerShow : reveal.modal }">
        <li>
          <h6>公司名称</h6>
          <input v-model="input.value" type="text" placeholder="请输入公司名称">
          <button  v-on:click="search">
            <img src="../../../assets/img/personal/workexperience/icon.search.png" alt="">
            <p>搜索</p>
          </button>
        </li>
        <li>
          <h6>搜索结果</h6>
          <p v-if="!reveal.modal">抱歉，未找到该公司，请从新搜索</p>
          <div v-if="reveal.modal">
            <p v-for="(item,index) in num" v-on:click="selectCompanyName(index)">
              <span>{{item}}</span>
              <i v-bind:class="{iSelectActive:reveal.iSelectActive[index]}"></i>
            </p>
          </div>
        </li>
        <li>
          自定义添加公司
        </li>
        <li>
          <button v-on:click="confirm">确认</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>

</script>
