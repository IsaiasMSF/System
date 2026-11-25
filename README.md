DOCUMENTAÇÃO - SYSTEM: MW MECÂNICA

Resumo: O projeto MW Mecânica está dividido em duas partes principais: frontend e backend. O frontend foi desenvolvido utilizando React Native e TSX, responsável pela interface visual e pela interação com o usuário. Já o backend foi desenvolvido com Node.js e Express, responsável por disponibilizar as rotas e processar as requisições da aplicação. 

Importante: No entanto o backend acabou não sendo muito utilizado, já que segui com o uso dos props para salvamento temporário. É importante ressaltar que o projeto não conta com um banco de dados, sendo assim completamente local.

BACKEND: A pasta do backend contém os arquivos responsáveis pela lógica do servidor e pela comunicação.

node_modules: Pasta gerada automaticamente pelo npm durante a instalação das dependências do projeto. Ela armazena as bibliotecas e os pacotes necessários para o funcionamento do backend, como o Express (framework web mais popular para Node.js, usado no desenvolvimento de aplicações back-end e APIs em JavaScript) e o CORS (uma regra do navegador que autoriza, de forma segura, o site buscar dados de outro domínio diferente do dele). 

ms.js: Arquivo JavaScript auxiliar, cuja finalidade específica deve ser identificada pela análise de seu conteúdo.
package-lock.json: Arquivo responsável por registrar as versões exatas das dependências do backend e suas dependências associadas.
package.json: Contém as dependências e os comandos necessários para executar o backend.
server.js: Arquivo principal do servidor, responsável por configurar o Express, habilitar o CORS. Interpretar dados JSON e definir as rotas da aplicação.


FRONTEND: A pasta frontend contém os arquivos responsáveis pela interface visual da aplicação MW Mecânica, desenvolvida utilizando React Native (importante relembrar que deveria ter sido feito em NativeWind… Após documentação irei preparar o material para a prova final que haverá), TSX e Expo (um ecossistema para React Native que simplifica e acelera o desenvolvimento mobile. Permitindo testar no celular de forma rápida). Essa parte do projeto permite que o usuário navegue entre as telas e interaja com as funcionalidades de gerenciamento da oficina mecânica. 

telas/: Nessa pasta ficam os arquivos de cada tela do projeto,

Clientes.tsx: Tela destinada ao gerenciamento de clientes, permitindo o querido CRUD (create, read, update, delete), conforme as funcionalidades implementadas. 

Inicio.tsx: Tela inicial da aplicação, que apresenta os principais acessos às funcionalidades do sistema e facilita a navegação entre as seções. 

Orcamentos.tsx: Destinada à organização e à apresentação dos orçamentos relacionados aos serviços da oficina. 

OrdensDeServico.tsx: tela voltada ao gerenciamento das ordens de serviço, permitindo organizar as informações referentes aos serviços realizados ou solicitados. 

Veiculos.tsx: Tela destinada ao gerenciamento das informações dos veículos cadastrados no sistema. 

App.tsx: Arquivo principal do frontend, responsável por organizar a aplicação, controlar a navegação 

_________________________________________________________

.gitignore: Faz a especificação dos arquivos e pastas que devem ser ignoradas pelo Git. 
AGENTS.md: Arquivo que contém instruções para agentes de inteligência artificial, definindo padrões de código e orientações para o desenvolvimento e a manutenção do projeto. 

app.json: Armazena configurações gerais do aplicativo Expo. 

babel.config.js: Configura o Babel, responsável pela transformação do código JavaScript e TypeScript durante o processo de desenvolvimento. 

Acredito esses serem os principais, demais acabam sendo boilerplates ou arquivos gerados automaticamente, meramente para funcionar.
