<template>
  <header>
    <nav class="navbar bg-dark navbar-dark navbar-expand-sm fixed-top py-3">
      <div class="container-fluid ">
        <a class="navbar-brand d-flex align-items-center" href="/">
          <i class="fs-1 me-1 d-flex align-items-center"><img alt="logo ACC plan" src="@/assets/Logo.png" width="30"
              height="30"></i>
          ACC plan </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuNavbar">
          <span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="menuNavbar">
          <div class="navbar-nav ms-auto">
            <router-link to="/listaAtividades" class="nav-link text-white">lista de ACC</router-link>
            <router-link to="/minhaLista" class="nav-link text-white">minha lista</router-link>
            <a href="/" class="nav-link text-danger">sair</a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>