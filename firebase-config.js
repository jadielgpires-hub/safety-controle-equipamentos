/*
  Safety - Controle de Equipamentos V1
  Configuração do projeto Firebase exclusivo do Safety - Controle de Equipamentos.
  As coleções deste app usam o prefixo ce_.
*/
window.SAFETY_CE_CONFIG = {
  firebase: {
    apiKey: "AIzaSyBTRYBX61wu453YibT1o22W2dKxGqWLCsM",
    authDomain: "safety-equipamentos-sistema.firebaseapp.com",
    projectId: "safety-equipamentos-sistema",
    storageBucket: "safety-equipamentos-sistema.firebasestorage.app",
    messagingSenderId: "1080170832848",
    appId: "1:1080170832848:web:570a92f676ee06bc5e0fd5"
  },
  prefix: "ce_",
  requestNotificationWebhook: "", // opcional: endpoint para notificar a Safety quando chegar nova solicitação pública
  company: {
    name: "SAFETY ASSISTÊNCIA TÉCNICA E EQUIPAMENTO LTDA.",
    tradeName: "Safety Equipamentos",
    cnpj: "22.015.773/0001-84",
    email: "safetyequipamentos@outlook.com",
    phone: "(21) 2756-5524 / 98889-4088",
    address: "Rua José de Queiroz, 196 - Bento Ribeiro - Rio de Janeiro/RJ"
  }
};
