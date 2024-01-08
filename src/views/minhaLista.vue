<script setup>
import 'bootstrap';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import NavBar from '../components/Navbar.vue'
import language from 'datatables.net-plugins/i18n/pt-BR.mjs';
import $ from 'jquery';
DataTable.use(DataTablesCore);
const dataTableOptions = {
  language: language,
  pageLength: 4,
  order: [[0, 'desc'], [6, 'asc'], [7, 'asc']],
  columnDefs: [
    {
      className: 'select-checkbox',
      targets: 0
    }
  ],
  createdRow: function (row, data) {
    const realizadaValue = data.realizada;
    const ano = data.ano
    const semestre = data.semestre
    const currentYear = date.getFullYear()
    const mes = date.getMonth()
    if (realizadaValue === 'checked') {
      $(row).addClass('green');
    }
    if (ano < currentYear || ano == currentYear && semestre == 1 && mes > 6) {
      $(row).addClass('red');
    }
  },
};
const linhas = localStorage.getItem("dados")
const linhasObjeto = JSON.parse(linhas);
const date = new Date();
const currentYear = date.getFullYear();
let dados
if (linhasObjeto == null) {
  dados = []
} else {
  dados = linhasObjeto
}
const checkbox = (data, type, row) => {
  if (type === 'display') {
    return `<input type="checkbox" class="larger-checkbox" ${data} />`;
  } else {
    return data;
  }
}
const anoInput = (data, type, row) => {
  if (type === 'display') {
    return `<input id="ano" type="number" oninput="this.value = this.value.replace(/[^0-9]/g, '')"
    min="${currentYear - 6}" max="${currentYear + 6}" value="${data}" />`;
  } else {
    return data;
  }
}
const semestreInput = (data, type, row) => {
  if (type === 'display') {
    return `<input id="semestre" type="number" oninput="this.value = this.value.replace(/[^0-9]/g, '')"
    min="1" max="2" value="${data}" />`;
  } else {
    return data;
  }
}
</script>
<script>
export default {
  name: 'minhaLista',
  data() {
    return {
      progress: JSON.parse(localStorage.getItem("progresso")) || 0,
    }
  },
  methods: {
    increment(valor) {
      localStorage.setItem("progresso", JSON.stringify(valor))
      this.progress = valor
    },
    save() {
      if (this.progress < 100) {
        alert('adicione 100 horas')
      }
      else {
        const dados_table = $('#example2').DataTable().data()
        const linhas = []
        for (let i = 0; i < dados_table.length; i++) {
          if (dados_table[i].quantidade != 0) {
            linhas.push(dados_table[i])
          }
        }
      }
    }
  },
  mounted() {
    const dataTable = $('#example2').DataTable();
    const self = this;
    $('#example2').on('input', 'input[type="checkbox"]', function () {
      const rowIndex = dataTable.row($(this).closest('tr')).index();
      if ($('#example2').DataTable().row(rowIndex).data().realizada == 'unchecked') {
        if (self.progress < 100) {
          $('#example2').DataTable().row(rowIndex).data().realizada = 'checked'
        } else {
          alert('Você já concluir a carga horária necessária')
        }
      } else {
        $('#example2').DataTable().row(rowIndex).data().realizada = 'unchecked'
      }
      const dados_table = $('#example2').DataTable().data()
      let progresso = 0
      for (let i = 0; i < dados_table.length; i++) {
        if (dados_table[i].realizada == 'checked') {
          const stringHora = dados_table[i].carga_horaria_individual;
          const matches = stringHora.match(/\d+/);
          const valorNumerico = matches ? parseInt(matches[0], 10) : 0;
          progresso += valorNumerico;
        }
      }
      self.increment(progresso);
      const linhas = []
      for (let i = 0; i < dados_table.length; i++) {
        linhas.push(dados_table[i]);
      }
      localStorage.removeItem("dados");
      localStorage.setItem("dados", JSON.stringify(linhas))
      $('#example2').DataTable().clear().rows.add(linhas).draw();
    });
    $('#example2').on('input', 'input[type="number"]', function () {
      const rowIndex = dataTable.row($(this).closest('tr')).index();
      const valor = parseInt(event.target.value, 10) || 0
      const inputElement = $(this).attr('id')
      if (inputElement == 'ano') {
        $('#example2').DataTable().row(rowIndex).data().ano = valor
      } else if (inputElement == 'semestre') {
        $('#example2').DataTable().row(rowIndex).data().semestre = valor
      }
      const dados_table = $('#example2').DataTable().data()
      const linhas = []
      for (let i = 0; i < dados_table.length; i++) {
        linhas.push(dados_table[i]);
      }
      localStorage.removeItem("dados");
      localStorage.setItem("dados", JSON.stringify(linhas))
      $('#example2').DataTable().clear().rows.add(linhas).draw();
    });
  }
};
</script>
<template >
  <NavBar />
  <div class="navbar-placeholder"></div>
  <h1 class="text-center mb-2">
    MINHAS ATIVIDADES
  </h1>
  <div class="progress mb-2">
    <div class="progress-bar progress-bar-striped active bg-success progress-bar-animated rounded-pill" role="progressbar"
      aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" :style="{ width: progress + '%' }">
      {{ progress }}%
    </div>
  </div>
  <p class="text-center mb-2">
    Recomendo marcas as atividades como concluídas, apenas após o deferimento no <a href="https://suap.ifpi.edu.br/"
      target="_blank">SUAP</a>, para evitar que possa se confundir.
  </p>
  <div class="mb-2">
    <DataTable id="example2" :data="dados" :columns="[
      { data: 'realizada', render: checkbox, className: 'text-center' },
      { data: 'tipo' },
      { data: 'categoria' },
      { data: 'carga_horaria_individual' },
      { data: 'carga_horaria_total' },
      { data: 'certificado' },
      { data: 'ano', render: anoInput },
      { data: 'semestre', render: semestreInput }
    ]" :options="dataTableOptions" class="display cell-border compact border table-bordered">
      <thead>
        <tr>
          <th>CONC.</th>
          <th>atividade</th>
          <th>tipo</th>
          <th>CH_individual</th>
          <th>CH_total</th>
          <th>certificado</th>
          <th>ano</th>
          <th>semestre</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>CONC.</th>
          <th>atividade</th>
          <th>tipo</th>
          <th>CH_individual</th>
          <th>CH_total</th>
          <th>certificado</th>
          <th>ano</th>
          <th>semestre</th>
        </tr>
      </tfoot>
    </DataTable>
  </div>
</template>
<style>
@import 'datatables.net-dt';
@import 'bootstrap';

header {
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
}

div.dataTables_filter,
div.dataTables_length {
  margin-bottom: 0.5rem;
}

.table-bordered {
  border: 2px solid
}

.navbar-placeholder {
  height: 5rem;
  width: 100%;
}

.larger-checkbox {
  transform: scale(1.5);
}

.red {
  background-color: #e74c3c !important;
  color: white !important;
}

.green {
  background-color: #2ecc71 !important;
  color: white !important;
}
</style>