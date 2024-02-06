
## :car: Controle de Utilização de Automóveis

Projeto desenvolvido para gerenciar a utilização de automóveis em uma empresa, possibilitando o controle de cadastro de automóveis, motoristas e registros de utilização.

### :clipboard: Funcionalidades

#### Cadastro de Automóvel
- Cadastrar um novo automóvel
- Atualizar um automóvel cadastrado
- Excluir um automóvel cadastrado
- Recuperar um automóvel pelo id
- Listar automóveis

#### Cadastro de Motoristas
- Cadastrar um novo motorista
- Atualizar um motorista cadastrado
- Excluir um motorista cadastrado
- Recuperar um motorista pelo id
- Listar motoristas

#### Utilização de Automóvel
- Registrar a utilização de um automóvel por um motorista, com data de início e motivo
- Finalizar a utilização de um automóvel por um motorista, registrando a data de finalização
- Listar os registros de utilização com nome do motorista e informações do automóvel utilizado

### :file_folder: Estrutura de Recursos

#### Automóvel
- Placa
- Cor
- Marca

#### Motorista
- Nome

#### Utilização do Automóvel
- Data de início da utilização
- Data de término da utilização
- Motorista que utilizou
- Automóvel utilizado
- Motivo de utilização

### :hammer_and_wrench: Tecnologias Utilizadas

- [NodeJS](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [Jest](https://jestjs.io/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)

<!-- GETTING STARTED -->
## :rocket: Iniciando

Guia prático de como rodar o projeto localmente.
### Pré-requisitos

É necessário ter instalado no seu computador o [NodeJS](https://nodejs.org/en/) e também um banco de dados para fazer a conexão com a API. 
As configurações de conexão com o banco de dados podem ser alteradas facilmente no arquivo chamado "ormconfig.json" e também no arquivo "index.ts" do diretório "/shared/typeorm/index.ts". 
É importante ressaltar que nesse projeto foi utilizado o banco de dados [Postgresql](https://www.postgresql.org/).

### Instalação e Inicialização

1. Clone o repositório
   ```sh
   git clone https://github.com/lubpolita/carManagement.git
   ```
2. Entre no diretório principal 
   ```sh
   cd carManagement
   ```
3. Crie o banco de dados
   ```sh
   docker run --name postgres -e POSTGRES_PASSWORD=12345 -p 5432:5432 -d postgres
   ```
4. Instale as dependências
   ```sh
   npm install
   ```
5. Rode os testes automatizados implementados
   ```sh
   npm run test
   ```
   Caso queira visualizar os logs dos testes automatizados digite o seguinte comando:
   ```sh
   npm run test:verbose
   ```

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contato

Luiza Polita: https://www.linkedin.com/in/luizapolita/ 