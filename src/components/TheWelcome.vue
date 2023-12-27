<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import HelloWorld from '../components/HelloWorld.vue'
</script>

<template>
  <div class="grid">
        <header>
    <img alt="logo ACC plan" class="logo" src="@/assets/Logo.png" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="ACC plan" />
    </div>
  </header>
  <WelcomeItem >
    <template #heading>ACC plan</template>
    <p class="text-center">
      
      O ACC plan é um site desenvolvido para auxiliar os alunos do curso de ADS do 
    PPC de 2018 do IFPI - Campus Picos no planejamento de suas atividades complementares. 
    Entre suas funções estão a listagem de atividades, criação de uma lista de atividades, organização da lista de atividades e 
    cálculo de quantas horas um certificado valerá (em caso de deferido)
    <span style="color: red">
    . IMPORTANTE: este site não foi desenvolvido pelo IFPI, por tanto não 
    validará suas atividades, devem ser validadas em:
  </span>
    <a href="https://suap.ifpi.edu.br/" target="_blank" rel="noopener">SUAP</a>
  </p>
  <center>
  <router-link type="button" class="btn btn-primary btn-lg" to="/about">Entrar</router-link>
  </center>
  </WelcomeItem>
</div>
</template>

<style scoped>

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.grid{
  align-content: center;
  align-items: center;
  display: grid;
}
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
  .grid{
  display: grid;
  grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
}
}
</style>
