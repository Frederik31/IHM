<template>
  <div class="table-style">
      <div>
        <button @click="addItem" class="btn btn-primary"><i class="glyphicon glyphicon-plus-sign"></i> Add  item</button>
      </div>
      <br>
      <div v-if="!loading">
        <vue-bootstrap-table
              :columns="columns"
              :values="values"
              :show-filter="true"
              :show-column-picker="true"
              :sortable="true"
              :paginated="true"
              :multi-column-sortable="true"
              :filter-case-sensitive="false"
        >


      </vue-bootstrap-table>
    </div>
</div>
</template>

<script>

import VueBootstrapTable from 'vue2-bootstrap-table2'
import { services } from '../../vuex/api'

export default {
  name: 'Table',
  components: {
    'vue-bootstrap-table': VueBootstrapTable
  },
  data () {
    return {
      loading: true,
      columns: [
        {
          title: 'MSN',
          visible: true,
          editable: true,
          filterable: true
        },
        {
          title: 'Type Porteur',
          visible: true,
          editable: true,
          filterable: true
        },
        {
          title: 'Airline',
          visible: true,
          editable: true,
          filterable: true
        },
        {
          title: 'PO',
          visible: true,
          editable: true,
          filterable: true
        },
        {
          title: 'BO',
          visible: true,
          editable: true,
          filterable: true
        },
        {
          title: 'Cycle Paint',
          visible: true,
          editable: true,
          filterable: true
        },
        {
          title: 'Manut',
          visible: true,
          editable: true,
          filterable: true
        },
        {
          title: 'Poncage',
          visible: true,
          editable: true,
          filterable: true
        },
        {
          title: 'Start Cabine',
          visible: true,
          editable: true,
          filterable: true
        },
        {
          title: 'Fin Cabine',
          visible: true,
          editable: true,
          filterable: true
        },
        {
          title: 'Fin Paint',
          visible: true,
          editable: true,
          filterable: true
        },
        {
          title: 'Start Moteur',
          visible: true,
          editable: true,
          filterable: true
        },
        {
          title: 'Fin Moteur',
          visible: true,
          editable: true,
          filterable: true
        },
        {
          title: 'Fin Prod',
          visible: true,
          editable: true,
          filterable: true
        }
      ],
      values: []
    }
  },
  created () {
    services.planningTableapi.getPlanningTable()
    .then((response) => {
      console.log('dfdsfsd')
      var stringified = JSON.stringify(response.data)
      stringified = stringified.replace(/type_porteur/g, 'Type Porteur')
      var jsonObject = JSON.parse(stringified)
      console.log(jsonObject)
      this.values = jsonObject
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      this.loading = false
    })
  },
  methods: {
    addItem: function () {
      var item = {
        'MSN': 'New Item',
        'Type Porteur': 'A350-941',
        'Airline': 'CES',
        'PO': '2018-09-18',
        'BO': '2018-09-14',
        'Cycle Paint': '1.21',
        'Manut': '2018-09-04',
        'Poncage': '2018-09-04',
        'Start Cabine': '2019-03-15',
        'Fin Cabine': '2019-03-19',
        'Fin Paint': '2019-03-20',
        'Start Moteur': '2019-03-19',
        'Fin Moteur': '2019-03-25',
        'Doc': '2019-03-25',
        'Fin Prod': '2019-03-26'
      }
      this.values.push(item)

      console.log(this.values)
    }
  }
}
</script>

<style>

thead {
    background: #397598a3;
}

.table-bordered {
    border-style: solid;
    border-width: 2px;
    border-color: #1d0e0e4f;
}

.table-striped>tbody>tr:nth-of-type(odd) {
    background-color: #99999947;
}

.dropdown-menu {
    right: 0;
    left:unset;
}

</style>
