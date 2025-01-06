<template>
    <div class="min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 class="text-3xl font-bold text-center text-blue-600 mb-4">Consultar localidade pelo IP</h1>
  
        <!-- Campo de Entrada de IP -->
        <div class="mb-4">
          <input 
            v-model="ip" 
            type="text" 
            class="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Digite o IP para consultar"
          />
        </div>
  
        <!-- Botão para Consultar -->
        <button 
          @click="fetchLocation" 
          class="w-full bg-blue-600 text-white p-2 rounded-md"
        >
          Consultar IP
        </button>
  
        <!-- Exibição dos Dados -->
        <div v-if="locationData" class="space-y-4 mt-6">
          <div class="bg-gray-100 p-4 rounded-md shadow-md">
            <h2 class="text-lg font-semibold text-gray-800">Informações de Geolocalização</h2>
            <div class="mt-2">
              <p><strong>IP:</strong> {{ locationData.ip }}</p>
              <p><strong>País:</strong> {{ locationData.country }}</p>
              <p><strong>Cidade:</strong> {{ locationData.city }}</p>
              <p><strong>Região:</strong> {{ locationData.region }}</p>
              <p><strong>Latitude:</strong> {{ locationData.loc.split(',')[0] }}</p>
              <p><strong>Longitude:</strong> {{ locationData.loc.split(',')[1] }}</p>
            </div>
          </div>
        </div>
  
        <!-- Mensagem de Erro -->
        <div v-if="errorMessage" class="mt-6 text-red-600 text-center">
          <p>{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import apiIPGeo from '../services/apiCOnsumo'; // Serviço da API IPInfo
  
  // Variáveis
  const ip = ref(''); // Para armazenar o IP inserido
  const locationData = ref<any>(null); // Para armazenar os dados de geolocalização
  const errorMessage = ref(''); // Para armazenar mensagens de erro
  
  // Função para buscar dados de geolocalização do IP
  const fetchLocation = async () => {
    if (!ip.value) {
      errorMessage.value = 'Por favor, insira um IP para consultar.';
      locationData.value = null;
      return;
    }
    try {
      const response = await apiIPGeo.get(`${ip.value}/json`);
      locationData.value = response.data;
      errorMessage.value = '';
    } catch (error) {
      console.error('Erro ao buscar geolocalização:', error);
      errorMessage.value = 'Erro ao buscar os dados do IP. Verifique se o IP é válido.';
      locationData.value = null;
    }
  };
  </script>
  
  <style scoped>
  /* Estilo adicional para tornar a página mais bonita */
  </style>
  