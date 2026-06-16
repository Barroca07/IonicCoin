# 💱 IonicCoin

![Ionic](https://img.shields.io/badge/Ionic-8.x-3880ff?style=for-the-badge&logo=ionic&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-20.x-dd0031?style=for-the-badge&logo=angular&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-8.x-11bdee?style=for-the-badge&logo=capacitor&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=for-the-badge&logo=typescript&logoColor=white)

O **IonicCoin** é um aplicativo móvel híbrido elegante e responsivo, desenvolvido para facilitar a conversão rápida de moedas. Projetado com **Ionic Framework** e **Angular**, ele consome dados em tempo real e possui suporte robusto para uso offline.

---

## 📸 Telas do Aplicativo
*(Substitua os links abaixo pelas URLs reais das suas imagens)*

<div align="center">
<img width="1600" height="900" alt="Tela Conversao" src="https://github.com/user-attachments/assets/af8e34e1-2d28-4035-a4de-8f712e587ce1" />
  &nbsp;&nbsp;&nbsp;
<img width="1600" height="900" alt="Tela Historico" src="https://github.com/user-attachments/assets/e841c3cd-0f97-4c54-833c-a91c445fc42c" />
  &nbsp;&nbsp;&nbsp;
<img width="1600" height="900" alt="Tela Configuração" src="https://github.com/user-attachments/assets/5e1ca346-0fbd-4c50-a3f7-96787a692bb2" />
</div>

---

## ✨ Principais Funcionalidades

- **🔄 Conversão em Tempo Real:** Suporte a múltiplas moedas mundiais consumindo a *ExchangeRate-API*.
- **📶 Modo Offline (Cache Inteligente):** O aplicativo salva as últimas taxas de câmbio buscadas localmente. Um *badge* na tela inicial indica se o usuário está `Online` ou `Offline`, garantindo o uso contínuo mesmo sem internet.
- **📜 Histórico de Transações:** Acompanhamento automático das últimas 50 conversões (Data, Valor, Moeda de Origem e Destino, e Taxa aplicada), com opção de limpeza rápida.
- **🔀 Inversão Rápida:** Botão intuitivo para trocar instantaneamente a moeda de origem pela moeda de destino.
- **🔍 Busca Integrada:** Barras de pesquisa nativas do Ionic para filtrar e encontrar moedas rapidamente na lista.

---

## 🛠️ Tecnologias e Arquitetura

O projeto foi estruturado utilizando as melhores práticas do ecossistema Angular e Ionic:

- **Frontend:** Angular 20.3, utilizando a reatividade do `RxJS` (7.8).
- **UI/UX:** Componentes nativos do Ionic 8 (`ion-card`, `ion-select`, `ion-searchbar`, `ion-badge`).
- **Nativo (Mobile):** Capacitor 8 para integração fácil com iOS e Android, incluindo controle de *Status Bar*, *Keyboard* e *Haptics*.
- **Armazenamento:** Implementação customizada via `StorageService` utilizando o `localStorage` do dispositivo para salvar histórico (`conversion_history`), taxas cacheadas (`cached_rates`) e configurações (`app_settings`).

---

## 📂 Estrutura do Projeto

Os arquivos principais da lógica de negócios estão organizados da seguinte forma:



```text
src/
└── app/
    ├── pages/
    │   ├── home/         # Lógica central (Conversão, Online/Offline, Inversão)
    │   ├── history/      # Listagem e gestão do histórico de conversões
    │   └── settings/     # Configurações do app (Frequência de atualização)
    ├── services/
    │   ├── currency.service.ts # Integração HTTP com a ExchangeRate-API
    │   └── storage.service.ts  # Gestão de cache e LocalStorage





