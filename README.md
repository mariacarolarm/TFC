# TFC - Futebol Classificações e Partidas

O TFC é um site informativo sobre partidas e classificações de futebol! ⚽️

No projeto do TFC, eu desenvolvi uma API utilizando o método TDD e também integrei - através do docker-compose - as aplicações de front-end e back-end para que elas funcionem consumindo um banco de dados.

Construí um back-end dockerizado utilizando modelagem de dados através do Sequelize. 

Os dados modelados no back-end populam adequadamente a tabela disponível no front-end que é exibida para a pessoa usuária do sistema.

## Tecnologias Utilizadas

- **Docker Compose** - para manejar responsabilidades do front-end e do back-end.
- **Sequelize** - para lidar com a modelagem de dados.

## Rotas Desenvolvidas

- **GET /teams** - Lista todos os times.
- **GET /teams/:id** - Lista um time específico pelo ID.
- **POST /login** - Realiza login de um usuário.
- **GET /login/role** - Utiliza verificação de token para retornar a role do usuário.
- **GET /matches** - Lista todas as partidas, com possibilidade de filtragem por partidas finalizadas ou em andamento.
- **PATCH /matches/:id/finish** - Permite finalizar uma partida com atualização de dados no banco de dados.
- **PATCH /matches/:id** - Permite atualizar partidas em andamento.
- **POST /matches** - Cadastra uma nova partida.
- **GET /leaderboard/home** - Filtra os times da casa de acordo com os scores obtidos.
- **GET /leaderboard/away** - Filtra os times convidados de acordo com os scores obtidos.
