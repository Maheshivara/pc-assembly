# PC Assembly

## Introdução

Back End da aplicação _Pc Assembly_ criada para as disciplinas de Programação Web e Projeto Integrador do 5º período de Sistemas de Informação no Instituto Federal de Alagoas (IFAL) campus Arapiraca durante o semestre 2025.1.

### Desenvolvedores

- [José Bezerra](https://github.com/JBPinheiro86)
- [Luis Gabriel](https://github.com/Maheshivara)
- [Matheus Ferreira](https://github.com/theusFL)
- [Wallace Souza](https://github.com/RochaSWallace)

## Ferramentas Utilizadas

<table>
  <thead>
    <tr>
      <th>NestJS</th>
      <th>Prisma</th>
      <th>Docker</th>
      <th>PostgreSQL</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://nestjs.com/" target="_blank">
          <img src="https://nestjs.com/img/logo-small.svg" alt="NestJS" width="40"/><br/>
        </a>
      </td>
      <td align="center">
        <a href="https://www.prisma.io/" target="_blank">
          <img src="https://www.prisma.io/docs/ai_button.svg" alt="Prisma" width="40"/><br/>
        </a>
      </td>
      <td align="center">
        <a href="https://www.docker.com/" target="_blank">
          <img src="https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png" alt="Docker" width="40"/><br/>
        </a>
      </td>
      <td align="center">
        <a href="https://www.postgresql.org/" target="_blank">
          <img src="https://www.postgresql.org/media/img/about/press/elephant.png" alt="PostgreSQL" width="40"/><br/>
        </a>
      </td>
    </tr>
  </tbody>
</table>

## Como Rodar

> [!IMPORTANT]
> Para rodar esse projeto é necessário possuir o NodeJS em versão igual ou superior à 22, você pode encontrar mais informações sobre o Node em: [https://nodejs.org/](https://nodejs.org/).

> [!IMPORTANT]
> Embora seja possível rodar o projeto sem possuir Docker, esse tutorial assumirá que você possui o Docker e Docker Compose Plugin em sua máquina, você pode encontra-los em: [https://www.docker.com/](https://www.docker.com/).

> [!TIP]
> Embora não seja necessário para rodar o projeto, é recomendado que se use o Git para clonar esse repositório, mais informações podem ser encontradas em: [https://git-scm.com](https://git-scm.com).

1. Clone esse repositório (ou realize download do código e extraía) no local desejado
2. Na pasta principal do código (onde se encontra o arquivo [package.json](./package.json)) realize download das dependências com:
   ```bash
   yarn install
   ```
3. Copie o arquivo [.env.example](./.env.example) para um arquivo nomeado **.env**
   1. Altere as variáveis de ambiente no arquivo .env conforme as suas necessidades, priorizando as **JWT_SECRET** e **REFRESH_TOKEN_SECRET** já que se tratam dos segredos utilizados para assinar as informações do JWT (JSON Web Token)
4. Suba o container do banco de dados com:

   ```bash
   docker compose up -d
   ```

   - O **-d** é opcional, apenas para não ocupar o terminal com o container em execução

5. Execute as migrações do prisma para o banco de dados com o comando:
   ```bash
   yarn prisma migrate deploy
   ```
6. Gere o Prisma Client com:
   ```bash
   yarn prisma generate
   ```
7. Inicie a aplicação:
   - Em modo de desenvolvimento:
   ```bash
   yarn start:dev
   ```
   Ou
   - Em modo de produção:
   ```bash
   yarn build && yarn start:prod
   ```
8. Acesse os End-Points no endereço [http://localhost:3000](http://localhost:3000).
   1. Caso tenha alterado a variável de ambiente **APP_PORT** a porta será o valor para o qual foi alterado.
