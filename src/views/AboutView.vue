<script setup>
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
        <!-- Navbar -->
  <nav class="navbar navbar-expand-lg fixed-top navbar-light" padding-left="30" style="background-color: #e3f2fd;">
    <a class="navbar-brand" href="/">
    <img alt="logo ACC plan" src="@/assets/Logo.png" width="30" height="30" class="d-inline-block align-top">
    ACC plan
  </a>
    <div class="container-fluid">
      <button
        data-mdb-collapse-init
        class="navbar-toggler"
        type="button"
        data-mdb-target="#navbarExample01"
        aria-controls="navbarExample01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarExample01">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item active">
            <a class="nav-link" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Features</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Pricing</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">About</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- Navbar -->
    </header>
    <DataTable :data="data" class="display">
        <thead>
            <tr>
                <th>A</th>
                <th>B</th>
                <th>C</th>
            </tr>
        </thead>
    </DataTable>
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