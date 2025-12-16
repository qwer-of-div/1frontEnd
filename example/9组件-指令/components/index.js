import Vue from 'vue'
Vue.directive('input-number',{
    inserted: function(el,binding,vnode){
      el.handler = function (e){
        e = e || window.event
        const val = `${e.target.value}`.replace(/\D/g,'')
        e.target.value = val
        if(binding.expression){ // v-input-number="formData.spellName"
          console.log(binding, vnode, 369)
          if(binding.expression.includes('.')){
            const obj = binding.expression.split('.')[0]
            const prop = binding.expression.split('.')[1]
            vnode.context[obj][prop] = e.target.value
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
