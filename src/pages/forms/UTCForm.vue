<template>
   <row>
    <column class="col-md-6">
        <va-box
          title="Paint Selection"
          theme="box-primary"
          :isBorder="true"
          widgetType="">

            <div slot="content">

            <va-form-group>
              <label>Paint type</label>
              <select id="type" class="form-control" @change="computeSubType">
                <option v-for="(item,index) in paintTypeList" :data="item" :key="index">
                {{ item }}
                </option>
                </select>
            </va-form-group>

            <va-form-group>
              <label>Paint subtype</label>
              <select id="subType" class="form-control" @change="computePaintDetails">
                <option v-for="(item,index) in paintSubTypeList" :data="item" :key="index">
                {{ item }}
                </option>
                </select>
            </va-form-group>

            </div>
        </va-box>

          
    </column>
    <column class="col-md-6">
        <va-box
          title="Paint details"
          theme="box-primary"
          :isBorder="true"
          widgetType="">

            <div v-for="(item,index) in fieldList" :data="item" :key="index" slot="content" >
                <div class="form-group">
              <label :for=action[index] class="col-sm-10 control-label">{{ action[index] }}</label>
                <div class="col-sm-10" >
                    <input
                    :type=action[index]
                    :id=action[index]
                    :placeholder=action[index]
                    :value= temps[index]>
                    </input>
                </div> 
                </div> 
            </div>
            <div slot="footer">
              <button type="button" v-on:click="update" class="btn" :class="[false, 'info', false, false, 10]">
                Update
              <slot></slot>
              </button>
            </div>
        </va-box>
    </column>
   </row>
</template>

<script>
import VABox from '../../widgets/VABox'
import VAInputGroup from '../../components/VAInputGroup'
import VACheckBox from '../../components/VACheckBox'
import VAInput from '../../components/VAInput'
import VAButton from '../../components/VAButton'
import VATextareaGroup from '../../components/VATextareaGroup'
import VAFormGroup from '../../components/VAFormGroup'
import VARadio from '../../components/VARadio'
import VASelect from '../../components/VASelect'
import { services } from '../../vuex/api'
import * as util from '../../util/util.js'

export default {
  name: 'utcform-elements',
  data () {
    return {
      paintTypeList: [],
      jsondata: {},
      action: [],
      temps: [],
      selectedPaintType: '',
      selectedPaintSubType: ''
    }
  },
  computed: {
    fieldList: function () {
      const fieldListVar = util.getPaintDetail(this.jsondata, this.selectedPaintType, this.selectedPaintSubType)
      this.action = fieldListVar.map((elem) => {
        return (Object.keys(elem))
      }).reduce((memo, it) => (memo.concat(it)), [])
      this.temps = fieldListVar.map((elem) => {
        return (Object.values(elem))
      }).reduce((memo, it) => (memo.concat(it)), [])
      return fieldListVar
    },
    paintSubTypeList: function () {
      this.selectedPaintSubType = ''
      return [''].concat(util.getPaintSubType(this.jsondata, this.selectedPaintType))
    }
  },
  methods: {
    computeSubType (event) {
      console.log(event.target.value)
      this.selectedPaintType = event.target.value
      var sel = document.getElementById('subType')
      sel.selectedIndex = 0
    },
    computePaintDetails (event) {
      this.selectedPaintSubType = event.target.value
    },
    update (event) {
      if (this.selectedPaintSubType !== '') {
        console.log(this.action)
        var fields = []
        for (var i = 0; i < this.action.length; i++) {
          var elem = this.action[i]
          var field = document.getElementById(elem)
          var obj = {}
          obj[elem] = field.value
          fields.push(obj)
        }
        console.log(fields)
        services.paintsapi.updatePaints(this.selectedPaintType, this.selectedPaintSubType, fields)
        .then((response) => {
          console.log('paints updated')
        })
        .catch((error) => {
          console.error(error)
        })
      }
    }
  },
  created () {
    services.paintsapi.getPaints()
        .then((response) => {
          console.log(response.data)
          const jsondata = response.data
          const paintTypes = util.getPaintType(jsondata)
          console.log(paintTypes)
          this.paintTypeList = [''].concat(paintTypes)
          this.jsondata = jsondata
        })
    .catch((error) => {
      console.error(error)
    })
  },
  components: {
    'va-box': VABox,
    'va-input-group': VAInputGroup,
    'va-checkbox': VACheckBox,
    'va-input': VAInput,
    'va-button': VAButton,
    'va-textarea-group': VATextareaGroup,
    'va-form-group': VAFormGroup,
    'va-radio': VARadio,
    'va-select': VASelect
  }
}
</script>

<style>
</style>
