<script setup>
import 'bootstrap';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';

DataTable.use(DataTablesCore);

const data = [
  [1, 2, 3],
  [3, 4, 4],
  [5, 6, 5],
];
</script>
<template>
  <header>
    <nav class="navbar bg-dark navbar-dark navbar-expand-sm fixed-top py-3">
      <div class="container-fluid ">
        <a class="navbar-brand d-flex align-items-center" href="/">
          <i class="fs-1 me-1 d-flex align-items-center"><img alt="logo ACC plan" src="@/assets/Logo.png" width="30"
              height="30"></i>
          ACC plan </a>
          <button class="navbar-toggler" type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#menuNavbar">
        <span class="navbar-toggler-icon"></span></button>        
        <div class="collapse navbar-collapse" id="menuNavbar">
          <div class="navbar-nav ms-auto">
            <a href="#" class="nav-link text-white">lista de ACC</a>
            <a href="#" class="nav-link text-white">minha lista</a>
            <a href="#" class="nav-link text-white">calcular CH</a>
            <a href="#" class="nav-link text-danger">sair</a>
          </div>
        </div>
      </div>

    </nav>
    <!-- Navbar -->
  </header>
  <!-- <DataTable :data="data" class="display">
    <thead>
      <tr>
        <th>A</th>
        <th>B</th>
        <th>C</th>
      </tr>
    </thead>
  </DataTable> -->
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
</style>