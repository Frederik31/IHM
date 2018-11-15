<template>
  <div class="table-style">
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
</template>

<script>

import VueBootstrapTable from 'vue2-bootstrap-table2'

export default {
  name: 'Table',
  components: {
    'vue-bootstrap-table': VueBootstrapTable
  },
  data () {
    return {
      columns: [
        {
          title: 'MSN',
          visible: true,
          editable: true,
          filterable: true
        },
        {
          title: 'Aircraft Model',
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
          title: 'Cycle Paint(jours)',
          visible: true,
          editable: true,
          filterable: true
        },
        {
          title: 'SN TR',
          visible: true,
          editable: true,
          filterable: true
        }
      ],
      values: [
        {
          'MSN': '261-1',
          'Aircraft Model': 'A350-941',
          'Airline': 'CES',
          'PO': '18-Sep-18',
          'BO': '14-Sep-18',
          'Cycle Paint(jours)': 1.21,
          'SN TR': '521'
        },
        {
          'MSN': '261-2',
          'Aircraft Model': 'A350-941',
          'Airline': 'CES',
          'PO': '18-Sep-18',
          'BO': '14-Sep-18',
          'Cycle Paint(jours)': 1.21,
          'SN TR': '520'
        },
        {
          'MSN': 'TR-900',
          'Aircraft Model': 'A350-941',
          'Airline': 'AMS',
          'PO': '24-Sep-18',
          'BO': '18-Sep-18',
          'Cycle Paint(jours)': 0.56,
          'SN TR': '510/509'
        },
        {
          'MSN': '269-1',
          'Aircraft Model': 'A350-941',
          'Airline': 'CES',
          'PO': '21-Sep-18',
          'BO': '19-Sep-18',
          'Cycle Paint(jours)': 1.21,
          'SN TR': '523'
        },
        {
          'MSN': '269-2',
          'Aircraft Model': 'A350-941',
          'Airline': 'CES',
          'PO': '21-Sep-18',
          'BO': '19-Sep-18',
          'Cycle Paint(jours)': 1.21,
          'SN TR': '522'
        },
        {
          'MSN': '265-1',
          'Aircraft Model': 'A350-941',
          'Airline': 'LAN',
          'PO': '24-Sep-18',
          'BO': '20-Sep-18',
          'Cycle Paint(jours)': 0.56,
          'SN TR': '519'
        },
        {
          'MSN': '265-2',
          'Aircraft Model': 'A350-941',
          'Airline': 'LAN',
          'PO': '24-Sep-18',
          'BO': '20-Sep-18',
          'Cycle Paint(jours)': 0.56,
          'SN TR': '514'
        },
        {
          'MSN': '263-1',
          'Aircraft Model': 'A350-941',
          'Airline': 'SIAPPG',
          'PO': '25-Sep-18',
          'BO': '21-Sep-18',
          'Cycle Paint(jours)': 0.69,
          'SN TR': '525'
        },
        {
          'MSN': '263-2',
          'Aircraft Model': 'A350-941',
          'Airline': 'SIAPPG',
          'PO': '25-Sep-18',
          'BO': '21-Sep-18',
          'Cycle Paint(jours)': 0.69,
          'SN TR': '526'
        },
        {
          'MSN': '267-1',
          'Aircraft Model': 'A350-941',
          'Airline': 'DAL',
          'PO': '27-Sep-18',
          'BO': '25-Sep-18',
          'Cycle Paint(jours)': 0.69,
          'SN TR': '527'
        }
      ]
    }
  },
  created () {

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
