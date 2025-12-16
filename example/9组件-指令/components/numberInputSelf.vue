<template>
  <div>
    <!-- 展示input -->
    <Input
      v-if="inputShow"
      type="text"
      :disabled="disabled"
      :maxlength="Number(maxlength)"
      :placeholder="placeholder"
      v-model="inputValue"
      @on-focus="onFocus"
    />
    <!-- 输入input -->
    <Input
      v-else
      type="text"
      :disabled="disabled"
      :maxlength="Number(maxlength)"
      :placeholder="placeholder"
      v-model="realInput"
      @on-keyup="onKeyup($event)"
      @on-blur="onBlur"
    />
  </div>
</template>
<script>
// v-modal

export default {
  name: "numberInputSelf",
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "normal"
    },
    maxlength: {
      type: [String, Number],
      default: Infinity
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputValue: "",
      inputShow: true,
      realInput: ""
    };
  },
  watch: {
    value: {
      handler(newVal) {
        this.inputValue = newVal;
      },
      immediate: true
    }
  },
  methods: {
    onFocus() {
      this.inputShow = false;
      this.realInput = this.inputValue;
    },
    onKeyup(e) {
      try {
        let res = "";
        if (this.type === "num-centre") {
          res = e.target.value.replace(/[^\d-]+/g, "");
        } else if (this.type === "twoDeci") {
          res = e.target.value.replace(/[^0-9.]+/g, "");
          if (res.indexOf(".") !== res.lastIndexOf(".")) {
            res = res.substr(0, res.length - 1);
          }
          const resList = res.split(".");
          if (resList.length > 1 && resList[1].length > 2) {
            res = res.substr(0, res.length - 1);
          }
        } else {
          res = e.target.value.replace(/[^0-9]+/g, "");
        }
        this.realInput = res;
        e.target.value = res;
      } catch (error) {
        this.realInput = "";
        e.target.value = "";
      }
    },
    onBlur() {
      let res = "";
      if (this.type === "twoDeci") {
        if (!["", "."].includes(this.realInput))
          res = Number(this.realInput).toFixed(2) + "";
      } else {
        res = this.realInput;
      }
      this.$emit("input", res);
      this.inputShow = true;
    }
  }
};
</script>
