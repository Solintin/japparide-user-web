<template>
  <div class="lds-hourloader"></div>
</template>

<script>
export default {};
</script>

<style >
.lds-hourloader {
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
  transform: translateY(-5px);
}
.lds-hourloader:after {
  content: " ";
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 0px;
  box-sizing: border-box;
  border: 15px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-hourloader 1.2s infinite;
}
@keyframes lds-hourloader {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}
</style>
