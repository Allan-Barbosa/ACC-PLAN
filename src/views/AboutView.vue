<script setup>
import atividades from './../data/atividades.json'
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
};
const dados = atividades.atividades.map(item => ({ ...item, quantidade: 0 }));
const quantidadeInput = (data, type, row) => {
  if (type === 'display') {
    return `<input type="number" oninput="this.value = Math.min(this.value.replace(/[^0-9]/g, ''), ${row.quant_maxima_por_atividade})"
    min="0" max="${row.quant_maxima_por_atividade}" value="${Math.min(data, row.quant_maxima_por_atividade)}" />`;
  } else {
    return data;
  }
}
</script>
<script>
export default {
  name: 'AboutView',
  data() {
    return {
      progress: 0,
    }
  },
  methods: {
    increment(valor) {
      this.progress = valor
    },
    save() {
      if (this.progress < 100) {
        alert('adicione 100 horas')
      }
      else {
        const dados_table = $('#example').DataTable().data()
        const linhas = []
        for (let i = 0; i < dados_table.length; i++) {
          if (dados_table[i].quantidade != 0) {
            const { quantidade, quant_maxima_por_atividade, ...objSemQuantidade } = dados_table[i];
            for (let j = 0; j < quantidade; j++) {
              const date = new Date();
              const currentYear = date.getFullYear();
              const mes = date.getMonth()
              let semestre
              if (mes < 7) {
                semestre = 1
              } else {
                semestre = 2
              }
              linhas.push({
                ...objSemQuantidade,
                realizada: 'unchecked',
                ano: currentYear,
                semestre: semestre,
              });
            }
          }
        }
        localStorage.clear()
        localStorage.setItem("dados", JSON.stringify(linhas))
        window.location.href = 'minhaLista'
      }
    }
  },
  mounted() {
    const dataTable = $('#example').DataTable();
    const self = this;
    $('#example').on('input', 'input[type="number"]', function () {
      const rowIndex = dataTable.row($(this).closest('tr')).index();
      const qtd = parseInt(event.target.value, 10) || 0
      $('#example').DataTable().row(rowIndex).data().quantidade = qtd
      const inputElement = $(this)
      const rowData = dataTable.row(rowIndex).data();
      const inputValue = parseInt(event.target.value, 10) || 0;
      const dados_table = $('#example').DataTable().data()
      let progresso = 0
      for (let i = 0; i < dados_table.length; i++) {
        const stringHora = dados_table[i].carga_horaria_individual;
        const matches = stringHora.match(/\d+/);
        const valorNumerico = matches ? parseInt(matches[0], 10) : 0;
        progresso += dados_table[i].quantidade * valorNumerico;
      }
      if (progresso <= 100 || self.progress < 100) {
        self.increment(progresso);
      } else {
        $('#example').DataTable().row(rowIndex).data().quantidade = qtd - 1
        inputElement.val(qtd - 1)
        alert('não adicione mais horas que o necessário')
      }
      const quantidade = $('#example').DataTable().row(rowIndex).data().quantidade
      if (quantidade == $('#example').DataTable().row(rowIndex).data().quant_maxima_por_atividade) {
        $(this).closest('tr').addClass('green');
      }
      if (quantidade > 0 && quantidade != $('#example').DataTable().row(rowIndex).data().quant_maxima_por_atividade) {
        $(this).closest('tr').addClass('blue').removeClass('green');
      }
      if (quantidade == 0) {
        $(this).closest('tr').removeClass('blue').removeClass('green');
      }
    });
  }
};

</script>
<template >
  <NavBar />
  <div class="navbar-placeholder"></div>
  <p class="text-center mb-2">
    AVISO: para conclusão das atividades complementares é necessário realizar atividades de pelo menos duas categorias
    de
    atividade e completar 100 horas. Para criar sua lista é necessário colocar a quantidade da atividade que deseja
    realizar no campo ao lado de cada atividade e após isso clicar no botão salvar lista no final da página
  </p>
  <div class="progress mb-2">
    <div class="progress-bar progress-bar-striped progress-bar-animated active rounded-pill" role="progressbar"
      aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" :style="{ width: progress + '%' }">
      {{ progress }}%
    </div>
  </div>
  <DataTable id="example" :data="dados" :columns="[
    { data: 'quantidade', render: quantidadeInput },
    { data: 'tipo' },
    { data: 'categoria' },
    { data: 'carga_horaria_individual' },
    { data: 'quant_maxima_por_atividade' },
    { data: 'carga_horaria_total' },
    { data: 'certificado' }
  ]" :options="dataTableOptions" class="display cell-border compact border table-bordered">
    <thead>
      <tr>
        <th>QTD</th>
        <th>atividade</th>
        <th>tipo</th>
        <th>CH_individual</th>
        <th>QTD_MAX</th>
        <th>CH_total</th>
        <th>certificado</th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <th>QTD</th>
        <th>atividade</th>
        <th>tipo</th>
        <th>CH_individual</th>
        <th>QTD_MAX</th>
        <th>CH_total</th>
        <th>certificado</th>
      </tr>
    </tfoot>
  </DataTable>
  <div style="text-align: center;">
    <button v-on:click="save" id="submit" type="submit" class="btn btn-primary btn-lg mb-2 rounded-pill"
      style="width: 15rem;">
      Criar lista
    </button>
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

.blue {
  background-color: #3498db !important;
  color: white !important;
}

.green {
  background-color: #2ecc71 !important;
  color: white !important;
}
</style>