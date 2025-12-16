import Vue from 'vue'

Vue.directive('input-idCard',{
    inserted: function(el,binding,vnode){
      el.handler = function (e){
        e = e || window.event
        let tempVal = e.target.value.toUpperCase()
        let val = ''
        for(let i = 0; i< tempVal.length; i++) {
          if(i < 17) {
            val = tempVal.replace(/[^\d]/g,'')
          } else {
            val = tempVal.replace(/[^\dXx]/g,'')
          }
        }
        e.target.value = val.slice(0, 18)
        if(binding.expression){
          if(binding.expression.includes('.')){
            const list = binding.expression.split('.')

            const obj = list[0]
            const prop = list[1]

            if(list.length === 2) {
              vnode.context[obj][prop] = e.target.value
            } else if(list.length === 3) {
              const prop1 = list[2]
              vnode.context[obj][prop][prop1] = e.target.value
            }
          }else{
            vnode.context[binding.expression] = e.target.value
          }
        }
      }
      el.addEventListener('input',el.handler)
    },
    unbind(el){
      el.removeEventListener('input',el.handler)
    }
})
