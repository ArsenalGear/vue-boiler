import MyButton from '@/components/UI/MyButton.vue'
import BaseButton from '@/components/UI/BaseButton/BaseButton.vue'
import FormButton from '@/components/UI/FormButton/FormButton.vue'
import FormInput from '@/components/UI/FormInput/FormInput.vue'
import BaseSelect from '@/components/UI/BaseSelect/BaseSelect.vue'
import BaseText from '@/components/UI/BaseText/BaseText.vue'
// import MyInput from '@/components/UI/MyInput.vue'
// import MyDialog from '@/components/UI/MyDialog.vue'

// export default [MyButton, MyInput, MyDialog]
export default [
  { name: 'MyButton', component: MyButton },
  { name: 'BaseButton', component: BaseButton },
  { name: 'FormButton', component: FormButton },
  { name: 'FormInput', component: FormInput },
  { name: 'BaseSelect', component: BaseSelect },
  { name: 'BaseText', component: BaseText }
]
