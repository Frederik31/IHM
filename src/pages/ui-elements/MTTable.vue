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
          title: 'Version',
          visible: true,
          editable: true,
          filterable: true
        },
        {
          title: 'A/L',
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
          title: 'FAL Need',
          visible: true,
          editable: true,
          filterable: true
        },
        {
          title: 'End ST20',
          visible: true,
          editable: true,
          filterable: true
        },
        {
          title: 'BO prev',
          visible: true,
          editable: true,
          filterable: true
        },
        {
          title: 'End ODD',
          visible: true,
          editable: true,
          filterable: true
        },
        {
          title: 'IC ODD',
          visible: true,
          editable: true,
          filterable: true
        },
        {
          title: 'Max',
          visible: true,
          editable: true,
          filterable: true
        },
        {
          title: 'Start Moteur Prev',
          visible: true,
          editable: true,
          filterable: true
        },
        {
          title: 'IC need',
          visible: true,
          editable: true,
          filterable: true
        },
        {
          title: 'doc',
          visible: true,
          editable: true,
          filterable: true
        },
        {
          title: 'Pacer',
          visible: true,
          editable: true,
          filterable: true
        }
      ],
      values: []
    }
  },
  created () {
    services.mttableapi.getMtTable()
    .then((response) => {
      console.log('testttt')
      console.log(response.data)
      this.values = response.data
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
        'Version': 'A350-941',
        'A/L': 'SIA',
        'PO': 'New Date',
        'FAL Need': 'New Date',
        'End ST20': 'New Date',
        'BO prev': 'New Date',
        'End ODD': 'New Date',
        'IC ODD': 'New Date',
        'Max': 'New Date',
        'Start Moteur Prev': 'New Date',
        'IC need': 'New Date',
        'Fin Moteur': 'New Date',
        'doc': 'New Date',
        'Pacer': 'new pacer'
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
