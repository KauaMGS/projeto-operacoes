
# **Sistema de Cadastro de Operações**


O **Sistema de Cadastro de Operações** é uma aplicação fullstack que possibilita o gerenciamento de operações (ou funcionalidades) de um sistema. Foi desenvolvido utilizando tecnologias modernas para backend, frontend e infraestrutura:

- **Backend**: Quarkus para API REST.
- **Frontend**: Angular para interface de usuário.
- **Containerização**: Docker Compose para orquestrar o ambiente completo.

O sistema é projetado para oferecer uma experiência eficiente no cadastro, busca e manutenção de operações, com um fluxo de etapas bem definido para maior usabilidade e organização.

---

## **Principais Funcionalidades**

### **Cadastro de Operações**
- Fluxo de etapas:
  1. **Informações Iniciais**: Nome, descrição e categoria.
  2. **Contratos**: Especificação de requisição e resposta.
  3. **Segurança**: Configuração de autenticação e permissões.
  4. **Confirmação**: Resumo dos dados inseridos para revisão.
- Validação de dados em cada etapa.

### **Busca e Filtros**
- Pesquisa por:
  - Nome.
  - Descrição.
  - Identificador único.
  - Categoria.
- Ordenação, paginação e exibição detalhada de operações.

### **Ambiente Contêinerizado**
- Backend, frontend e banco de dados em contêineres Docker.
- Configuração facilitada para desenvolvimento e implantação.

---

## **Arquitetura do Sistema**

- **Frontend**: Construído em Angular 15 com Bootstrap para estilização responsiva.
- **Backend**: Desenvolvido em Quarkus, com endpoints REST documentados via Swagger/OpenAPI.
- **Banco de Dados**: Postgres ou MySQL para persistência relacional.
- **Orquestração**: Docker Compose para integração e execução dos serviços.

---

## **Pré-requisitos**

Certifique-se de ter os seguintes itens instalados:

- **Docker e Docker Compose**.
- **Node.js** (para o frontend).
- **Java 17+** (para o backend).

---

## **Configuração e Execução**

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd projeto-operacoes
   ```

2. **Inicie o sistema com Docker Compose:**
   ```bash
   docker-compose up --build
   ```

3. **Acesse a aplicação:**
   - **Frontend**: [http://localhost:4200](http://localhost:4200)
   - **Backend (API)**: [http://localhost:8080](http://localhost:8080)

4. **Documentação da API:**
   Acesse a documentação Swagger em [http://localhost:8080/q/swagger-ui](http://localhost:8080/q/swagger-ui).

---

