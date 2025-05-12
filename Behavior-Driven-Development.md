# Documento de Implementação de BDD (Behavior Driven Development)

## 1. Introdução

Este documento descreve o processo de implementação do BDD (Behavior Driven Development) no desenvolvimento do software **Point Manager**. O objetivo é alinhar a comunicação entre as equipes técnicas e não técnicas, garantindo que os requisitos do negócio sejam compreendidos e implementados corretamente.

## 2. Objetivos do BDD

- Facilitar a comunicação entre stakeholders e a equipe de desenvolvimento.
- Garantir que o software atenda às necessidades do negócio.
- Melhorar a qualidade do código e reduzir retrabalhos.
- Criar uma documentação viva do sistema.

## 3. Ferramentas Utilizadas

- **Linguagem de Programação:** [TypeScript]
- **Framework de Testes:** [Playwright]
- **Gerenciamento de Dependências:** [npm]

## 4. Processo de Implementação

### 4.1. Definição de Histórias de Usuário

As histórias de usuário serão escritas utilizando a estrutura:

- **Título:** Breve descrição da funcionalidade.
- **Narrativa:**
  - Como **[tipo de usuário]**,
  - Quero **[funcionalidade]**,
  - Para **[benefício]**.
- **Cenário**
  - Dado que **[condição ou estado inicial]**,
  - Então **[define o resultado esperado após a ação ter sido realizada]**,
  - Quando **[ação executada pelo usuário ou sistema que dispara o comportamento desejado]**,
  - E **[ ação ou verificação complementar que acontece após ou junto com o resultado principal]**.

### 4.2. Histórias

### Feature: Exibir o mapa com base em diferentes fontes de localização

**Como** um usuário do sistema  
**Quero** que o mapa seja exibido automaticamente em uma localização apropriada  
**Para** facilitar a navegação e o uso do aplicativo

#### Cenário: Exibir o mapa com base na localização atual do navegador

- **Dado que** o usuário não possui nenhuma área cadastrada
- **E** as permissões de localização do navegador estão habilitadas
- **E** não ocorre erro ao obter a localização atual
- **Então** o mapa deve ser exibido com base na localização atual do usuário

#### Cenário: Exibir o mapa com base na localização de uma área cadastrada

- **Dado que** o usuário já possui uma área cadastrada
- **Então** o mapa deve ser exibido com base na localização dessa área
- **E** o foco deve estar centralizado no centro da área cadastrada

#### Cenário: Exibir o mapa com base na localização padrão do sistema

- **Dado que** ocorreu um erro ao obter a localização pelo navegador
- **E** o usuário não possui nenhuma área cadastrada
- **Então** o mapa deve ser exibido em uma localização padrão definida no arquivo `.env`

---

### Feature: Cadastro de área no mapa

**Como** um usuário do sistema  
**Quero** poder cadastrar novas áreas no mapa  
**Para** que eu possa adicionar marcadores dentro dessas áreas

#### Cenário: Cadastro de uma nova área no mapa

- **Dado que** o usuário está na página inicial do aplicativo
- **Quando** ele clica no botão "ADD PERÍMETRO"
- **E** ele clica no mapa para demarcar os pontos da área
- **Então** a área deve ser exibida visualmente com os pontos marcados
- **Quando** ele clica no botão "Salvar"
- **E** ele preenche o nome da área no campo correspondente
- **E** ele clica no botão "Cadastrar"
- **Então** a nova área deve ser exibida no mapa como cadastrada e visível
- **E** listada logo acima no topo, onde apresenta os pontos listados
- **Então** o toast com a solicitação para salvar os pontos deve ser fechado, e o estado deve ser restaurado para a última versão salva.

#### Cenário: Tentativa de cadastro com nome inválido

- **Dado que** o usuário está na página inicial do aplicativo
- **Quando** ele clica no botão "ADD PERÍMETRO"
- **E** ele clica no mapa para demarcar os pontos da área
- **Então** a área deve ser exibida visualmente com os pontos marcados
- **Quando** ele clica no botão "SALVAR"
- **E** ele deixa o campo de nome da área vazio ou preenche de forma inválida
- **Então** o sistema deve impedir o cadastro da nova área
- **E** deve adicionar uma borda vermelha ao input e desabilitar o botao "Cadastro".

#### Cenário: Cancelamento do cadastro de uma nova área

- **Dado que** o usuário está na página inicial do aplicativo
- **Quando** ele clica no botão "ADD PERÍMETRO"
- **E** ele clica no mapa para demarcar os pontos da área
- **Então** a área deve ser exibida visualmente com os pontos marcados
- **Quando** ele clica no botão "SALVAR"
- **Então** o modal de cadastro deve ser aberto
- **E** ele deve clicar em "CANCELAR"
- **Então** ele deve clicar em "DESFAZER" até que todos os pontos da área previamente marcados sejam removidos

---

### Feature: Remover área cadastrada

**Como** um usuário do sistema  
**Quero** poder remover áreas no mapa  
**Para** manter o mapa sempre atualizado com informações relevantes

#### Cenário: Remover uma área com sucesso

- **Dado que** o usuário está com uma área selecionada
- **Quando** ele clica no botão "DELETAR PERÍMETRO"
- **Então** deve ser exibido um modal solicitando a confirmação do usuário
- **Quando** ele clica no botão "EXCLUIR"
- **Então** o modal deve ser fechado
- **E** a área selecionada deve ser removida juntamente com os pins atrelados a ela
- **Então** o toast com a solicitação para salvar os pontos deve ser fechado, e o estado deve ser restaurado para a última versão salva.

##### Cenário: Cancelar a remoção da área

- **Dado que** o usuário está com uma área selecionada
- **Quando** ele clica no botão "DELETAR PERÍMETRO"
- **Então** deve ser exibido um modal solicitando a confirmação do usuário
- **Quando** ele clica no botão "CANCELAR"
- **Então** o modal deve ser fechado
- **E** a área selecionada deve permanecer visível e sem alterações no mapa

### Feature: Adicionar marcadores dentro de uma área

**Como** um usuário do sistema  
**Quero** poder adicionar marcadores em uma área selecionada  
**Para** identificar pontos que necessitam de manejo

#### Cenário: Adicionar um marcador dentro de uma área específica

- **Dado que** o usuário está com uma área selecionada
- **Quando** ele clica no botão "ADICIONAR NOVO"
- **Então** um novo marcador deve ser inserido no centro da área selecionada
- **E** o marcador deve aparecer na listagem de pontos, exibindo seu nome e o momento em que foi criado
- **E** um toast deve ser exibido informando que é necessário salvar as alterações

---

### Feature: Listar marcadores

**Como** um usuário do sistema  
**Quero** visualizar todos os marcadores criados
**Para** identificar pontos que necessitam de manejo

#### Cenário: Listar todos os pontos dentro de suas respectivas áreas

- **Dado que** o usuário possui dados previamente cadastrados
- **Quando** ele acessa a plataforma
- **Então** todas as áreas cadastradas devem ser exibidas
- **E** para cada área listada, os marcadores correspondentes devem ser apresentados
- **E** cada marcador deve exibir seu nome e o momento em que foi criado na listagem de pontos

---

### Feature: Mover marcadores

**Como** um usuário do sistema  
**Quero** poder mover marcadores dentro da área permitida  
**Para** atualizar a posição de pontos que necessitam de manejo

#### Cenário: Mover um marcador dentro de uma área específica

- **Dado que** o usuário acessa a plataforma
- **Então** ele cadastra uma nova área e marcadores
- **E** ao clicar em um marcador, ele deve ser destacado visualmente, diferenciando-se dos demais
- **E** o sistema deve permitir que o marcador seja arrastado dentro dos limites da área à qual pertence
- **Então** ao finalizar o arrasto, um toast deve ser exibido solicitando que o usuário salve as alterações realizadas

#### Cenário: Mover um marcador fora de uma área específica

- **Dado que** o usuário acessa a plataforma
- **Então** ele cadastra uma nova área e marcadores
- **E** ao clicar em um marcador, ele deve ser destacado visualmente, diferenciando-se dos demais
- **E** o sistema deve permitir que o marcador seja arrastado dentro dos limites da área à qual pertence
- **Quando** o usuário arrastar pra fora da area limitante
- **Então** ele deve ser movido para sua area de inicio, e não deve ser exibido um toast solicitando que o usuário salve as alterações realizadas

---

### Feature: Remover marcadores

**Como** um usuário do sistema  
**Quero** poder remover marcadores  
**Para** atualizar os pontos que não necessitam mais de manejo

#### Cenário: Remover marcador selecionado

- **Dado que** o usuário possua áreas e marcadores previamente cadastrados
- **Quando** ele acessa a plataforma
- **Então** todas as áreas e seus respectivos marcadores devem ser listados
- **E** ao clicar em um marcador, ele deve ser destacado visualmente
- **E** deve ser exibido o botão "DELETAR PIN"
- **Quando** ele clica em "DELETAR PIN"
- **Então** um modal de confirmação deve ser exibido
- **Quando** ele confirmar clicando em "EXCLUIR"
- **Então** o marcador selecionado deve ser removido do mapa
- **E** um toast deve ser exibido informando que é necessário salvar as alterações

#### Cenário: Remover todos os marcadores de uma área

- **Dado que** o usuário possua áreas e marcadores previamente cadastrados
- **Quando** ele acessa a plataforma
- **Então** todas as áreas e seus respectivos marcadores devem ser listados
- **E** ao selecionar uma área ou qualquer marcador, deve ser exibido o botão "DELETAR TODOS"
- **Quando** ele clica em "DELETAR TODOS"
- **Então** um modal de confirmação deve ser exibido
- **Quando** ele confirmar clicando em "EXCLUIR"
- **Então** todos os marcadores da área devem ser removidos do mapa
- **E** um toast deve ser exibido informando que é necessário salvar as alterações
