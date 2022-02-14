const initState = {
  emptyList: [{ id: "", value: "" }, { id: "", value: "全部" }],
  sex: [{ id: "0", value: "男" }, { id: "1", value: "女" }],
  // 全部与空
  idTypeList: [
    { id: "0", value: "身份证" },
    { id: "1", value: "户口本" },
    { id: "", value: "" },
    { id: "", value: "全部" }
  ],
  addressList: [],
  type: "dic模块",
  deep: {
    type: "deep-dic模块"
  },
  menuList: [
    {
      path: "menu1",
      label: "菜单1",
      children: [
        {
          path: "menu1-1",
          label:
            "菜单1-1----------------------------------------------------------"
        },
        {
          path: "menu1-2",
          label: "菜单1-2",
          children: [
            {
              path: "menu1-2-1",
              label:
                "菜单1-2-1------------------------------------------------------------------------------"
            }
          ]
        }
      ]
    },
    {
      path: "menu2",
      label: "菜单2",
      children: [
        {
          path: "menu2-1",
          label: "菜单2-1"
        },
        {
          path: "menu2-2",
          label: "菜单2-2"
        }
      ]
    },
    {
      path: "menu3",
      label: "菜单3"
    },
    {
      path: "menu4",
      label: "菜单4"
    },
    {
      path: "menu5",
      label: "菜单5"
    },
    {
      path: "menu6",
      label: "菜单6"
    },
    {
      path: "menu7",
      label: "菜单7"
    },
    {
      path: "menu8",
      label: "菜单3"
    },
    {
      path: "menu3",
      label: "菜单8"
    },
    {
      path: "menu9",
      label: "菜单9"
    }
  ]
}

export default {
  name: "dic",
  namespaced: true,
  state: JSON.parse(JSON.stringify(initState)),
  mutations: {
    resetState (state) {
      // 重置
      const stateTemp = JSON.parse(JSON.stringify(initState))
      for (const key in stateTemp) {
        state[key] = stateTemp[key]
      }
    },
    setType (state, val) {
      state.deep.type = val
    },
    addressListSet (state, addressList) {
      state.addressList = [...addressList, ...state.emptyList]
    }
  }
}
