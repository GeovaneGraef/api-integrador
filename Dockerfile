# Estágio de Compilação
# ==============================================================================
# Use a imagem base do Node.js 22 para compilação.
FROM node:22-alpine AS builder

# Define o diretório de trabalho dentro do container.
WORKDIR /app

# Copia os arquivos de configuração do projeto e instala as dependências.
# Isso permite que o Docker utilize o cache para as camadas de dependências,
# o que agiliza a recompilação se apenas o código-fonte for alterado.
COPY package*.json ./
RUN npm install

# Copia todo o código-fonte para o container.
COPY . .

# Compila o projeto NestJS para JavaScript.
RUN npm run build

# ==============================================================================
# Estágio de Produção
# ==============================================================================
# Use uma imagem base menor e mais segura para o ambiente de produção.
FROM node:22-alpine AS production

# Define o diretório de trabalho.
WORKDIR /app

# Copia apenas as dependências de produção.
COPY package*.json ./
RUN npm install --omit=dev

# Copia os arquivos compilados do estágio de compilação.
COPY --from=builder /app/dist ./dist

# Expõe a porta que sua aplicação NestJS utiliza.
# Altere para a porta que você configurou no seu projeto (ex: 3000).
EXPOSE 3000

# Comando para iniciar a aplicação quando o container é executado.
# Use 'node dist/main' ou aponte para o arquivo de entrada do seu projeto
# se for diferente.
CMD [ "node", "dist/main" ]